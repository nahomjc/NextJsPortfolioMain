import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useDockActions } from "./DockActionsContext";
import { PHONE_TEL_HREF } from "../lib/contactConfig";
import { detectCallIntent, detectScheduleIntent, detectTerminateIntent } from "../lib/voiceIntents";
import {
	createScheduleSession,
	getScheduleSnapshot,
	processScheduleInput,
	resetSchedule,
	SCHEDULE_TYPED_STEPS,
	startSchedule,
	submitVoiceAppointment,
	triggerPhoneCall,
} from "../lib/voiceScheduleFlow";
import { createVoiceSession } from "../lib/voiceCapture";
import { createVoicePlayback } from "../lib/voicePlayback";
import {
	isGroqTtsFallbackCode,
	markGroqTtsRateLimited,
	prefersBrowserTts,
} from "../lib/voiceTtsRoute";
import {
	isEmptyTranscript,
	normalizeVoiceTranscript,
} from "../lib/voiceTranscriptNormalize";

const POP_W = 440;
const POP_H_EST = 560;
const POP_MAX_H = 680;
const MOBILE_DOCK_CLEARANCE = 88;
const PAD = 12;
const HUD_CLIP_INSET = 14;

const VOICE_GREETING =
	"Hey. I'm Nahom's assistant. Ask about his work, book a meeting, say call to reach him, or say terminate to close.";

const STATUS_LABELS = {
	initializing: "Initializing voice link…",
	listening: "Listening. Speak anytime",
	capturing: "Hearing you…",
	transcribing: "Transcribing…",
	thinking: "Thinking…",
	speaking: "Speaking…",
	scheduling: "Booking appointment…",
	calling: "Opening dialer…",
	error: "Link interrupted",
	mic_denied: "Microphone blocked",
};

function blobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = reader.result;
			if (typeof result !== "string") {
				reject(new Error("Failed to read audio."));
				return;
			}
			const comma = result.indexOf(",");
			resolve(comma >= 0 ? result.slice(comma + 1) : result);
		};
		reader.onerror = () => reject(new Error("Failed to read audio."));
		reader.readAsDataURL(blob);
	});
}

function computePosition(clientX, clientY) {
	if (typeof window === "undefined") {
		return { left: 16, top: 16, originX: "0%", originY: "0%" };
	}
	const vw = window.innerWidth;
	const vh = window.innerHeight;
	const isMobile = vw < 640;
	const panelW = isMobile ? vw - PAD * 2 : Math.min(POP_W, vw - PAD * 2);

	if (isMobile) {
		const maxCardH = Math.min(vh * 0.85, POP_MAX_H);
		const top = Math.max(
			PAD,
			Math.min(vh - maxCardH - MOBILE_DOCK_CLEARANCE, vh * 0.1),
		);
		return {
			left: (vw - panelW) / 2,
			top,
			originX: "50%",
			originY: "0%",
		};
	}

	const spaceR = vw - clientX - PAD;
	const spaceL = clientX - PAD;
	const spaceB = vh - clientY - PAD;
	const spaceT = clientY - PAD;

	const openRight = spaceR >= panelW || spaceR >= spaceL;
	const openDown = spaceB >= POP_H_EST || spaceB >= spaceT;

	let left = openRight ? clientX + 12 : clientX - panelW - 12;
	let top = openDown ? clientY + 12 : clientY - POP_H_EST - 12;

	left = Math.min(Math.max(PAD, left), vw - panelW - PAD);
	top = Math.min(Math.max(PAD, top), vh - POP_H_EST - PAD);

	const originX = openRight ? "0%" : "100%";
	const originY = openDown ? "0%" : "100%";

	return { left, top, originX, originY };
}

function closestPanelCorner(ax, ay, left, top, w, h) {
	const corners = [
		[left, top],
		[left + w, top],
		[left, top + h],
		[left + w, top + h],
	];
	let bx = corners[0][0];
	let by = corners[0][1];
	let best = Number.POSITIVE_INFINITY;
	for (const [cx, cy] of corners) {
		const d = (cx - ax) ** 2 + (cy - ay) ** 2;
		if (d < best) {
			best = d;
			bx = cx;
			by = cy;
		}
	}
	return { x: bx, y: by };
}

function HudCorner({ className }) {
	return (
		<span
			className={`pointer-events-none absolute z-10 h-3 w-3 border-cyan-400/90 ${className}`}
			aria-hidden
		/>
	);
}

function StatusOrb({ state, reduceMotion }) {
	const active =
		state === "listening" ||
		state === "capturing" ||
		state === "transcribing" ||
		state === "thinking" ||
		state === "speaking";

	const color =
		state === "speaking"
			? "bg-fuchsia-400 shadow-[0_0_16px_rgba(217,70,239,0.7)]"
			: state === "capturing" || state === "listening"
				? "bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.7)]"
				: state === "thinking" || state === "transcribing"
					? "bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
					: "bg-slate-500";

	return (
		<div className="relative flex h-10 w-10 items-center justify-center" aria-hidden>
			{active && !reduceMotion ? (
				<motion.span
					className={`absolute inset-0 rounded-full border ${state === "speaking" ? "border-fuchsia-400/50" : "border-emerald-400/50"}`}
					animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0.15, 0.7] }}
					transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
				/>
			) : null}
			<span className={`relative h-3 w-3 rounded-full ${color}`} />
		</div>
	);
}

function TranscriptBubble({ label, accentBar, labelClass, borderClass, bgClass, children }) {
	return (
		<div
			className={`relative rounded-sm border px-2.5 py-2 pl-3.5 text-slate-100/95 ${borderClass} ${bgClass}`}
		>
			<span
				className={`absolute bottom-2 left-1.5 top-2 w-0.5 rounded-full ${accentBar}`}
				aria-hidden
			/>
			<p className={`text-[9px] font-semibold uppercase tracking-wider ${labelClass}`}>
				{label}
			</p>
			<div className="mt-1 break-words text-[11px] leading-relaxed sm:text-xs">
				{children}
			</div>
		</div>
	);
}

function BookingPanel({ snapshot }) {
	if (!snapshot?.active) return null;
	const { progress, name, email, phone, day, timeWindow, topic } = snapshot;
	const pct = Math.round((progress.step / progress.total) * 100);

	return (
		<div className="rounded-sm border border-violet-500/30 bg-violet-950/25 px-2.5 py-2.5">
			<div className="flex items-center justify-between gap-2">
				<p className="text-[9px] font-semibold uppercase tracking-wider text-violet-300/90">
					Booking · step {progress.step}/{progress.total}
				</p>
				{progress.label ? (
					<span className="truncate font-mono text-[9px] text-violet-400/75">
						{progress.label}
					</span>
				) : null}
			</div>
			<div
				className="mt-2 h-1 overflow-hidden rounded-full bg-violet-950/80"
				role="progressbar"
				aria-valuenow={progress.step}
				aria-valuemin={1}
				aria-valuemax={progress.total}
			>
				<div
					className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-500"
					style={{ width: `${pct}%` }}
				/>
			</div>
			<dl className="mt-2 space-y-1 text-[10px] text-slate-300">
				{name ? (
					<div className="grid grid-cols-[3.5rem_1fr] gap-2">
						<dt className="text-slate-500">Name</dt>
						<dd className="break-words text-slate-100">{name}</dd>
					</div>
				) : null}
				{email ? (
					<div className="grid grid-cols-[3.5rem_1fr] gap-2">
						<dt className="text-slate-500">Email</dt>
						<dd className="break-all text-cyan-200/95">{email}</dd>
					</div>
				) : null}
				{phone ? (
					<div className="grid grid-cols-[3.5rem_1fr] gap-2">
						<dt className="text-slate-500">Phone</dt>
						<dd className="break-words text-slate-100">{phone}</dd>
					</div>
				) : null}
				{day ? (
					<div className="grid grid-cols-[3.5rem_1fr] gap-2">
						<dt className="text-slate-500">Day</dt>
						<dd className="break-words text-slate-100">{day}</dd>
					</div>
				) : null}
				{timeWindow ? (
					<div className="grid grid-cols-[3.5rem_1fr] gap-2">
						<dt className="text-slate-500">Time</dt>
						<dd className="break-words text-slate-100">{timeWindow}</dd>
					</div>
				) : null}
				{topic ? (
					<div className="grid grid-cols-[3.5rem_1fr] gap-2">
						<dt className="text-slate-500">Topic</dt>
						<dd className="break-words text-slate-100">{topic}</dd>
					</div>
				) : null}
			</dl>
		</div>
	);
}

const TYPED_FIELD_CONFIG = {
	name: {
		label: "Your name",
		type: "text",
		autoComplete: "name",
		placeholder: "Type your name",
	},
	email: {
		label: "Your email",
		type: "text",
		inputMode: "email",
		autoComplete: "email",
		placeholder: "you@example.com",
	},
	phone: {
		label: "Your phone",
		type: "tel",
		autoComplete: "tel",
		placeholder: "+251 9XX XXX XXX",
	},
};

function ScheduleTypedInput({ step, onSubmit, onSkip, onFocus, onBlur }) {
	const [draft, setDraft] = useState("");
	const config = TYPED_FIELD_CONFIG[step];

	useEffect(() => {
		setDraft("");
	}, [step]);

	if (!config) return null;

	const submitDraft = () => {
		const value = draft.trim();
		if (!value) return;
		onSubmit(value);
		setDraft("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		submitDraft();
	};

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="voice-schedule-typed rounded-sm border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-2.5"
		>
			<p className="font-mono text-[9px] font-semibold uppercase tracking-wider text-cyan-400/80">
				Or type it
			</p>
			<label className="mt-2 block">
				<span className="sr-only">{config.label}</span>
				<input
					type={config.type}
					name={`schedule-${step}`}
					value={draft}
					onChange={(e) => setDraft(e.target.value)}
					onFocus={onFocus}
					onBlur={onBlur}
					autoComplete={config.autoComplete}
					inputMode={config.inputMode}
					autoCapitalize={step === "email" ? "none" : undefined}
					autoCorrect={step === "email" ? "off" : undefined}
					spellCheck={step === "email" ? false : undefined}
					placeholder={config.placeholder}
					className="voice-schedule-typed__input mt-1 w-full rounded-sm border border-cyan-500/25 bg-black/50 px-2.5 py-2 font-mono text-base text-cyan-50 placeholder:text-slate-500 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
				/>
			</label>
			<div className="mt-2 flex flex-wrap items-center gap-2">
				<button
					type="button"
					onClick={submitDraft}
					disabled={!draft.trim()}
					className="rounded-sm border border-cyan-500/45 bg-cyan-950/50 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan-100 transition enabled:hover:border-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Continue
				</button>
				{step === "phone" ? (
					<button
						type="button"
						onClick={onSkip}
						className="rounded-sm border border-white/15 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 transition hover:border-slate-400/40 hover:text-slate-200"
					>
						Skip
					</button>
				) : null}
			</div>
		</form>
	);
}

const HeroVoiceAgentModal = ({ open, onClose, anchor, onVoiceSpeakingChange }) => {
	const [mounted, setMounted] = useState(false);
	const [, setLayoutVersion] = useState(0);
	const [agentState, setAgentState] = useState("initializing");
	const [lastUserText, setLastUserText] = useState("");
	const [lastAssistantText, setLastAssistantText] = useState(VOICE_GREETING);
	const [errorMessage, setErrorMessage] = useState("");
	const [scheduleSnapshot, setScheduleSnapshot] = useState(null);
	const { openChat } = useDockActions();

	const messagesRef = useRef([]);
	const scheduleRef = useRef(createScheduleSession());
	const sessionRef = useRef(null);
	const playbackRef = useRef(null);
	const processingRef = useRef(false);
	const greetedRef = useRef(false);
	const openRef = useRef(open);
	const handleUtteranceRef = useRef(null);
	const speakTextRef = useRef(null);
	const closeVoiceSessionRef = useRef(null);
	const transcriptRef = useRef(null);

	const reduceMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const pos =
		open && anchor && typeof window !== "undefined"
			? computePosition(anchor.x, anchor.y)
			: { left: 0, top: 0, originX: "0%", originY: "0%" };

	const tether = useMemo(() => {
		if (!open || !anchor || typeof window === "undefined") return null;
		const w = Math.min(POP_W, window.innerWidth - PAD * 2);
		const { x: tx, y: ty } = closestPanelCorner(
			anchor.x,
			anchor.y,
			pos.left,
			pos.top,
			w,
			POP_H_EST,
		);
		return {
			d: `M ${anchor.x} ${anchor.y} L ${tx} ${ty}`,
		};
	}, [open, anchor, pos.left, pos.top]);

	const setPausedListening = useCallback((paused) => {
		sessionRef.current?.setPaused(paused);
	}, []);

	const closeVoiceSession = useCallback(() => {
		playbackRef.current?.stop();
		sessionRef.current?.destroy();
		sessionRef.current = null;
		resetSchedule(scheduleRef.current);
		setScheduleSnapshot(null);
		processingRef.current = false;
		onClose();
	}, [onClose]);

	const speakText = useCallback(async (text) => {
		if (!playbackRef.current) {
			playbackRef.current = createVoicePlayback();
		}
		setAgentState("speaking");
		setPausedListening(true);

		const speakBrowser = async () => {
			if (typeof window !== "undefined" && window.speechSynthesis) {
				await playbackRef.current.speakWithBrowser(text);
				return true;
			}
			return false;
		};

		if (prefersBrowserTts()) {
			if (await speakBrowser()) return;
			throw new Error("Browser speech is not available.");
		}

		try {
			const controller = new AbortController();
			const timeout = window.setTimeout(() => controller.abort(), 15000);
			const res = await fetch("/api/speech", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text }),
				signal: controller.signal,
			});
			window.clearTimeout(timeout);
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				if (data.code === "rate_limit_exceeded") {
					markGroqTtsRateLimited(data.retryAfterSeconds);
				}
				const err = new Error(data.error || "Speech synthesis failed.");
				err.code = data.code;
				throw err;
			}
			const { chunks } = await res.json();
			if (!chunks?.length) {
				throw new Error("No audio returned.");
			}
			try {
				await playbackRef.current.playWavChunks(chunks);
			} catch {
				if (await speakBrowser()) return;
				throw new Error("Could not play audio.");
			}
		} catch (groqErr) {
			if (await speakBrowser()) return;
			throw groqErr;
		}
	}, [setPausedListening]);

	const speakAndResume = useCallback(
		async (reply) => {
			setLastAssistantText(reply);
			try {
				await speakText(reply);
			} catch (speechErr) {
				if (isGroqTtsFallbackCode(speechErr.code)) return;
				const hint =
					speechErr.code === "model_terms_required"
						? " Accept Orpheus terms in Groq Console for Groq voices."
						: "";
				setErrorMessage(
					(speechErr.message || "Could not play audio.") + " Read the reply below." + hint,
				);
			}
			if (openRef.current) {
				setAgentState(scheduleRef.current.active ? "scheduling" : "listening");
				setPausedListening(false);
			}
		},
		[speakText, setPausedListening],
	);

	const syncScheduleHud = useCallback(() => {
		setScheduleSnapshot(getScheduleSnapshot(scheduleRef.current));
	}, []);

	const handleScheduleTurn = useCallback(
		async (trimmed, options = {}) => {
			setLastUserText(trimmed);
			setAgentState("scheduling");
			setPausedListening(true);

			const result = processScheduleInput(scheduleRef.current, trimmed, options);
			syncScheduleHud();

			if (result.kind === "terminate") {
				closeVoiceSession();
				return;
			}

			if (result.kind === "submit") {
				setAgentState("thinking");
				try {
					await submitVoiceAppointment(result.data);
					resetSchedule(scheduleRef.current);
					setScheduleSnapshot(null);
					await speakAndResume(
						"Done! Your request is in Nahom's inbox. He usually replies within a day or two.",
					);
				} catch (err) {
					setErrorMessage(err.message || "Could not send appointment.");
					await speakAndResume(
						"Sorry, I couldn't send that. Try the contact form on the site.",
					);
				}
				return;
			}

			if (result.kind === "reply") {
				await speakAndResume(result.reply);
				return;
			}
		},
		[speakAndResume, setPausedListening, syncScheduleHud, closeVoiceSession],
	);

	const handleTypedScheduleSubmit = useCallback(
		async (value) => {
			if (processingRef.current || !openRef.current) return;
			processingRef.current = true;
			try {
				await handleScheduleTurn(value, { typed: true });
			} finally {
				processingRef.current = false;
			}
		},
		[handleScheduleTurn],
	);

	const handleTypedScheduleSkip = useCallback(async () => {
		if (processingRef.current || !openRef.current) return;
		processingRef.current = true;
		try {
			await handleScheduleTurn("skip", { typed: true });
		} finally {
			processingRef.current = false;
		}
	}, [handleScheduleTurn]);

	const handleUtterance = useCallback(
		async (blob, mimeType) => {
			if (!openRef.current || processingRef.current) return;
			processingRef.current = true;
			setErrorMessage("");
			setPausedListening(true);
			setAgentState("transcribing");

			try {
				const audio = await blobToBase64(blob);
				const transcribeRes = await fetch("/api/transcribe", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ audio, mimeType }),
				});
				if (!transcribeRes.ok) {
					const data = await transcribeRes.json().catch(() => ({}));
					throw new Error(data.error || "Transcription failed.");
				}
				const { text } = await transcribeRes.json();
				const trimmed = normalizeVoiceTranscript(text);
				if (isEmptyTranscript(trimmed)) {
					processingRef.current = false;
					setLastAssistantText("Didn't catch that. Try again.");
					setAgentState("listening");
					setPausedListening(false);
					return;
				}

				setLastUserText(trimmed);

				if (detectTerminateIntent(trimmed)) {
					processingRef.current = false;
					closeVoiceSession();
					return;
				}

				if (scheduleRef.current.active) {
					await handleScheduleTurn(trimmed);
					return;
				}

				if (detectCallIntent(trimmed)) {
					const reply = "Connecting you to Nahom now.";
					setLastAssistantText(reply);
					setAgentState("calling");
					try {
						await speakText(reply);
					} catch {
						// dialer still opens
					}
					triggerPhoneCall(PHONE_TEL_HREF);
					if (openRef.current) {
						setAgentState("listening");
						setPausedListening(false);
					}
					return;
				}

				if (detectScheduleIntent(trimmed)) {
					const reply = startSchedule(scheduleRef.current);
					syncScheduleHud();
					setLastAssistantText(reply);
					setAgentState("scheduling");
					try {
						await speakText(reply);
					} catch {
						// text shown in HUD
					}
					if (openRef.current) {
						setAgentState("scheduling");
						setPausedListening(false);
					}
					return;
				}

				const nextMessages = [
					...messagesRef.current,
					{ role: "user", content: trimmed },
				].slice(-10);
				messagesRef.current = nextMessages;

				setAgentState("thinking");
				const chatRes = await fetch("/api/chat", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ messages: nextMessages, voice: true }),
				});
				if (!chatRes.ok) {
					const data = await chatRes.json().catch(() => ({}));
					throw new Error(data.error || "Assistant request failed.");
				}
				const { content } = await chatRes.json();
				const reply = (content || "").trim();
				if (!reply) {
					throw new Error("Empty assistant reply.");
				}

				setLastAssistantText(reply);
				messagesRef.current = [
					...nextMessages,
					{ role: "assistant", content: reply },
				].slice(-10);

				try {
					await speakText(reply);
				} catch (speechErr) {
					if (isGroqTtsFallbackCode(speechErr.code)) {
						// Browser TTS fallback failed; show error below.
					} else {
					const hint =
						speechErr.code === "model_terms_required"
							? " Accept Orpheus terms in Groq Console for Groq voices."
							: "";
					setErrorMessage(
						(speechErr.message || "Could not play audio.") +
							" Read the reply below." +
							hint,
					);
					}
				}

				if (openRef.current) {
					setAgentState("listening");
					setPausedListening(false);
				}
			} catch (err) {
				setErrorMessage(err.message || "Voice session failed.");
				setAgentState("error");
			} finally {
				processingRef.current = false;
			}
		},
		[speakText, setPausedListening, handleScheduleTurn, syncScheduleHud, closeVoiceSession],
	);

	useEffect(() => {
		handleUtteranceRef.current = handleUtterance;
		speakTextRef.current = speakText;
		closeVoiceSessionRef.current = closeVoiceSession;
	}, [handleUtterance, speakText, closeVoiceSession]);

	useEffect(() => {
		openRef.current = open;
	}, [open]);

	useEffect(() => {
		onVoiceSpeakingChange?.(open && agentState === "speaking");
	}, [open, agentState, onVoiceSpeakingChange]);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const el = transcriptRef.current;
		if (!el) return;
		el.scrollTop = el.scrollHeight;
	}, [lastUserText, lastAssistantText, scheduleSnapshot, errorMessage]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		const onResize = () => setLayoutVersion((n) => n + 1);
		document.addEventListener("keydown", onKey);
		window.addEventListener("resize", onResize);
		return () => {
			document.removeEventListener("keydown", onKey);
			window.removeEventListener("resize", onResize);
		};
	}, [open, onClose]);

	useEffect(() => {
		if (!open) {
			playbackRef.current?.stop();
			sessionRef.current?.destroy();
			sessionRef.current = null;
			processingRef.current = false;
			greetedRef.current = false;
			messagesRef.current = [];
			resetSchedule(scheduleRef.current);
			setScheduleSnapshot(null);
			setAgentState("initializing");
			setLastUserText("");
			setLastAssistantText(VOICE_GREETING);
			setErrorMessage("");
			return;
		}

		let cancelled = false;
		playbackRef.current = createVoicePlayback();

		const session = createVoiceSession({
			onUtterance: (blob, mimeType) => {
				if (!cancelled) handleUtteranceRef.current?.(blob, mimeType);
			},
			onIdleTimeout: () => {
				if (cancelled || processingRef.current) return;
				closeVoiceSessionRef.current?.();
			},
			onError: (err) => {
				if (cancelled) return;
				const denied =
					err?.name === "NotAllowedError" || err?.name === "PermissionDeniedError";
				setAgentState(denied ? "mic_denied" : "error");
				setErrorMessage(
					denied
						? "Microphone access was denied. Allow the mic or use text chat instead."
						: err?.message || "Could not access microphone.",
				);
			},
			onStateChange: (state) => {
				if (cancelled || processingRef.current) return;
				if (state === "listening") setAgentState("listening");
				if (state === "capturing") setAgentState("capturing");
			},
		});

		sessionRef.current = session;

		(async () => {
			setAgentState("initializing");
			setErrorMessage("");
			try {
				await session.start();
				if (cancelled) return;
				setPausedListening(true);
				setLastAssistantText(VOICE_GREETING);
				try {
					await speakTextRef.current?.(VOICE_GREETING);
				} catch (speechErr) {
					const hint =
						speechErr?.code === "model_terms_required"
							? " Accept Orpheus terms in Groq Console for Groq voices."
							: "";
					setErrorMessage(
						`${speechErr?.message || "Could not play greeting."} Read the text below.${hint}`,
					);
				}
			} catch {
				// onError handler sets mic_denied / error state
			} finally {
				if (!cancelled) {
					greetedRef.current = true;
					setAgentState((state) =>
						state === "mic_denied" || state === "error" ? state : "listening",
					);
					setPausedListening(false);
				}
			}
		})();

		return () => {
			cancelled = true;
			playbackRef.current?.stop();
			session.destroy();
			sessionRef.current = null;
		};
	}, [open, setPausedListening]);

	if (!mounted) return null;

	const statusLabel = STATUS_LABELS[agentState] || STATUS_LABELS.listening;

	return createPortal(
		<AnimatePresence>
			{open && anchor ? (
				<motion.div
					key="voice-hud-layer"
					className="pointer-events-none fixed inset-0 z-[200]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: reduceMotion ? 0.12 : 0.28 }}
				>
					<div
						className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.4)_55%,rgba(2,6,23,0.75)_100%)]"
						aria-hidden
					/>
					<motion.div
						className="pointer-events-none absolute inset-0 opacity-[0.07]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.07 }}
						style={{
							backgroundImage:
								"linear-gradient(rgba(34,211,238,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.2) 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
						aria-hidden
					/>

					{tether && !reduceMotion ? (
						<svg
							className="pointer-events-none fixed inset-0 z-[199] h-full w-full"
							aria-hidden
						>
							<title>Voice link tether</title>
							<defs>
								<linearGradient
									id="voice-hud-tether-grad"
									x1="0%"
									y1="0%"
									x2="100%"
									y2="0%"
								>
									<stop offset="0%" stopColor="rgba(34,211,238,0.85)" />
									<stop offset="55%" stopColor="rgba(217,70,239,0.55)" />
									<stop offset="100%" stopColor="rgba(34,211,238,0.35)" />
								</linearGradient>
							</defs>
							<motion.path
								d={tether.d}
					fill="none"
								stroke="url(#voice-hud-tether-grad)"
								strokeWidth={1.25}
								strokeLinecap="round"
								initial={{ pathLength: 0, opacity: 0 }}
								animate={{ pathLength: 1, opacity: 0.75 }}
								transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
							/>
							<motion.circle
								cx={anchor.x}
								cy={anchor.y}
								r={3}
					fill="rgba(34,211,238,0.95)"
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.35, duration: 0.2 }}
							/>
						</svg>
					) : null}

					<div
						className="pointer-events-none absolute perspective-[960px]"
						style={{ left: pos.left, top: pos.top }}
					>
						<motion.div
							role="dialog"
							aria-modal="true"
							aria-labelledby="hero-voice-hud-title"
							aria-describedby="hero-voice-hud-body"
							className="pointer-events-auto w-[min(440px,calc(100vw-24px))] max-w-[calc(100vw-24px)]"
							style={{ transformOrigin: `${pos.originX} ${pos.originY}` }}
							initial={
								reduceMotion
									? { opacity: 0 }
									: {
											opacity: 0,
											scale: 0.86,
											y: 8,
											rotateX: 7,
											filter: "blur(8px)",
										}
							}
							animate={{
								opacity: 1,
								scale: 1,
								y: 0,
								rotateX: 0,
								filter: "blur(0px)",
							}}
							transition={{
								type: "spring",
								damping: 26,
								stiffness: 380,
								mass: 0.72,
								delay: reduceMotion ? 0 : 0.06,
							}}
						>
								<div
									className="relative flex max-h-[min(85vh,42rem)] min-h-[min(52vh,28rem)] flex-col overflow-hidden rounded-[2px] border border-cyan-400/45 bg-[#030712]/95 shadow-[0_0_0_1px_rgba(217,70,239,0.25),0_0_60px_rgba(34,211,238,0.14),0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl"
									style={{
										clipPath: `polygon(0 ${HUD_CLIP_INSET}px, ${HUD_CLIP_INSET}px 0, calc(100% - ${HUD_CLIP_INSET}px) 0, 100% ${HUD_CLIP_INSET}px, 100% calc(100% - ${HUD_CLIP_INSET}px), calc(100% - ${HUD_CLIP_INSET}px) 100%, ${HUD_CLIP_INSET}px 100%, 0 calc(100% - ${HUD_CLIP_INSET}px))`,
									}}
								>
								<div
									className="pointer-events-none absolute inset-0 opacity-[0.04]"
									style={{
										backgroundImage:
											"linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.25) 1px, transparent 1px)",
										backgroundSize: "20px 20px",
									}}
									aria-hidden
								/>
								<HudCorner className="left-2 top-2 border-l-2 border-t-2" />
								<HudCorner className="right-2 top-2 border-r-2 border-t-2" />
								<HudCorner className="bottom-2 left-2 border-b-2 border-l-2" />
								<HudCorner className="bottom-2 right-2 border-b-2 border-r-2" />

								<div
									className="relative flex min-h-0 flex-1 flex-col pb-3"
									style={{
										paddingTop: HUD_CLIP_INSET + 4,
										paddingRight: HUD_CLIP_INSET + 2,
										paddingLeft: HUD_CLIP_INSET,
									}}
								>
									<div className="shrink-0 px-4 pb-2 pt-1 sm:px-4">
									<div className="flex items-start justify-between gap-3 border-b border-cyan-500/15 pb-2">
										<div className="flex min-w-0 flex-1 items-center gap-2.5">
											<StatusOrb state={agentState} reduceMotion={reduceMotion} />
											<div className="min-w-0">
												<p
													id="hero-voice-hud-title"
													className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan-200"
												>
													Voice link
												</p>
												<p className="mt-0.5 font-mono text-[10px] text-emerald-400/90">
													{statusLabel}
												</p>
											</div>
										</div>
										<button
											type="button"
											onClick={onClose}
											className="ml-1 shrink-0 rounded-sm border border-cyan-500/35 bg-cyan-950/40 p-1.5 text-cyan-200/90 transition hover:border-fuchsia-400/50 hover:text-fuchsia-100"
											aria-label="Close voice session"
										>
											<AiOutlineClose className="h-4 w-4" />
										</button>
									</div>
									</div>

									<div
										ref={transcriptRef}
										id="hero-voice-hud-body"
										className="voice-hud-scroll relative min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 pb-2 font-mono"
									>
										<BookingPanel snapshot={scheduleSnapshot} />
										{scheduleSnapshot?.active &&
										SCHEDULE_TYPED_STEPS.has(scheduleSnapshot.step) ? (
											<ScheduleTypedInput
												step={scheduleSnapshot.step}
												onSubmit={handleTypedScheduleSubmit}
												onSkip={handleTypedScheduleSkip}
												onFocus={() => setPausedListening(true)}
												onBlur={() => {
													if (
														openRef.current &&
														!processingRef.current &&
														agentState !== "speaking"
													) {
														setPausedListening(false);
													}
												}}
											/>
										) : null}
										{lastUserText ? (
											<TranscriptBubble
												label="You"
												accentBar="bg-fuchsia-400/80"
												labelClass="text-fuchsia-400/80"
												borderClass="border-fuchsia-500/25"
												bgClass="bg-fuchsia-950/25"
											>
												{lastUserText}
											</TranscriptBubble>
										) : null}
										<TranscriptBubble
											label="Assistant"
											accentBar="bg-cyan-400/80"
											labelClass="text-cyan-400/80"
											borderClass="border-cyan-500/25"
											bgClass="bg-black/55 shadow-[inset_0_0_24px_rgba(34,211,238,0.04)]"
										>
											<span className="text-cyan-500/70">&gt; </span>
											{lastAssistantText}
										</TranscriptBubble>
									</div>

									{errorMessage ? (
										<div className="shrink-0 px-4 pb-1">
										<div className="rounded-sm border border-red-500/30 bg-red-500/10 px-2.5 py-2 font-mono text-[10px] text-red-300">
											{errorMessage}
										</div>
										</div>
									) : null}

									<div className="shrink-0 border-t border-cyan-500/10 px-4 py-3">
									<div className="flex flex-wrap items-center gap-2">
										{agentState === "mic_denied" || agentState === "error" ? (
											<button
												type="button"
												onClick={() => {
													onClose();
													openChat();
												}}
												className="rounded-sm border border-fuchsia-500/50 bg-fuchsia-950/40 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fuchsia-100 transition hover:border-fuchsia-400/80"
											>
												Open text chat
											</button>
										) : null}
										<button
											type="button"
											onClick={onClose}
											className="rounded-sm border border-white/20 bg-white/[0.03] px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-200/90"
										>
											[ terminate ]
										</button>
									</div>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body,
	);
};

export default HeroVoiceAgentModal;
