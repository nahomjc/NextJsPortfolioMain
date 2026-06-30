import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useDockActions } from "./DockActionsContext";
import { PHONE_TEL_HREF } from "../lib/contactConfig";
import { detectCallIntent, detectScheduleIntent } from "../lib/voiceIntents";
import {
	createScheduleSession,
	getScheduleSnapshot,
	processScheduleInput,
	resetSchedule,
	startSchedule,
	submitVoiceAppointment,
	triggerPhoneCall,
} from "../lib/voiceScheduleFlow";
import { createVoiceSession } from "../lib/voiceCapture";
import { createVoicePlayback } from "../lib/voicePlayback";

const POP_W = 320;
const POP_H_EST = 380;
const PAD = 10;

const VOICE_GREETING =
	"Hi, I'm Nahom's assistant. Ask about his work, say book a meeting to schedule, or say call Nahom to reach him by phone.";

const STATUS_LABELS = {
	initializing: "Initializing voice link…",
	listening: "Listening — speak anytime",
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

	const spaceR = vw - clientX - PAD;
	const spaceL = clientX - PAD;
	const spaceB = vh - clientY - PAD;
	const spaceT = clientY - PAD;

	const openRight = spaceR >= POP_W || spaceR >= spaceL;
	const openDown = spaceB >= POP_H_EST || spaceB >= spaceT;

	let left = openRight ? clientX + 12 : clientX - POP_W - 12;
	let top = openDown ? clientY + 12 : clientY - POP_H_EST - 12;

	left = Math.min(Math.max(PAD, left), vw - POP_W - PAD);
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

function BookingPanel({ snapshot }) {
	if (!snapshot?.active) return null;
	const { progress, name, email, phone, day, timeWindow, topic } = snapshot;

	return (
		<div className="rounded-sm border border-violet-500/25 bg-violet-950/20 px-2.5 py-2">
			<p className="text-[9px] uppercase tracking-wider text-violet-400/90">
				Booking · step {progress.step} of {progress.total}
				{progress.label ? ` — ${progress.label}` : ""}
			</p>
			<dl className="mt-1.5 space-y-0.5 text-[10px] text-slate-300">
				{name ? (
					<div className="flex gap-2">
						<dt className="text-slate-500">Name</dt>
						<dd className="min-w-0 truncate text-slate-100">{name}</dd>
					</div>
				) : null}
				{email ? (
					<div className="flex gap-2">
						<dt className="text-slate-500">Email</dt>
						<dd className="min-w-0 break-all text-cyan-200/95">{email}</dd>
					</div>
				) : null}
				{phone ? (
					<div className="flex gap-2">
						<dt className="text-slate-500">Phone</dt>
						<dd className="text-slate-100">{phone}</dd>
					</div>
				) : null}
				{day ? (
					<div className="flex gap-2">
						<dt className="text-slate-500">Day</dt>
						<dd className="text-slate-100">{day}</dd>
					</div>
				) : null}
				{timeWindow ? (
					<div className="flex gap-2">
						<dt className="text-slate-500">Time</dt>
						<dd className="text-slate-100">{timeWindow}</dd>
					</div>
				) : null}
				{topic ? (
					<div className="flex gap-2">
						<dt className="text-slate-500">Topic</dt>
						<dd className="min-w-0 text-slate-100">{topic}</dd>
					</div>
				) : null}
			</dl>
		</div>
	);
}

const HeroVoiceAgentModal = ({ open, onClose, anchor }) => {
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

	const reduceMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const pos =
		open && anchor && typeof window !== "undefined"
			? computePosition(anchor.x, anchor.y)
			: { left: 0, top: 0, originX: "0%", originY: "0%" };

	const tether = useMemo(() => {
		if (!open || !anchor || typeof window === "undefined") return null;
		const w = Math.min(POP_W, window.innerWidth - 20);
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

	const speakText = useCallback(async (text) => {
		if (!playbackRef.current) {
			playbackRef.current = createVoicePlayback();
		}
		setAgentState("speaking");
		setPausedListening(true);

		try {
			const res = await fetch("/api/speech", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text }),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				const err = new Error(data.error || "Speech synthesis failed.");
				err.code = data.code;
				throw err;
			}
			const { chunks } = await res.json();
			if (!chunks?.length) {
				throw new Error("No audio returned.");
			}
			await playbackRef.current.playWavChunks(chunks);
		} catch (groqErr) {
			if (typeof window !== "undefined" && window.speechSynthesis) {
				try {
					await playbackRef.current.speakWithBrowser(text);
					return;
				} catch {
					// fall through to surface Groq error
				}
			}
			throw groqErr;
		}
	}, [setPausedListening]);

	const speakAndResume = useCallback(
		async (reply) => {
			setLastAssistantText(reply);
			try {
				await speakText(reply);
			} catch (speechErr) {
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
		async (trimmed) => {
			setLastUserText(trimmed);
			setAgentState("scheduling");
			setPausedListening(true);

			const result = processScheduleInput(scheduleRef.current, trimmed);
			syncScheduleHud();

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
		[speakAndResume, setPausedListening, syncScheduleHud],
	);

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
				const trimmed = (text || "").trim();
				if (!trimmed) {
					processingRef.current = false;
					setAgentState("listening");
					setPausedListening(false);
					return;
				}

				setLastUserText(trimmed);

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
		[speakText, setPausedListening, handleScheduleTurn, syncScheduleHud],
	);

	useEffect(() => {
		openRef.current = open;
	}, [open]);

	useEffect(() => {
		setMounted(true);
	}, []);

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
				if (!cancelled) handleUtterance(blob, mimeType);
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
			try {
				await session.start();
				if (cancelled) return;
				setPausedListening(true);

				if (!greetedRef.current) {
					greetedRef.current = true;
					setLastAssistantText(VOICE_GREETING);
					try {
						await speakText(VOICE_GREETING);
					} catch {
						// greeting TTS is optional; text fallback is shown
					}
				}

				if (!cancelled) {
					setAgentState("listening");
					setPausedListening(false);
				}
			} catch {
				// onError handler sets UI state
			}
		})();

		return () => {
			cancelled = true;
			playbackRef.current?.stop();
			session.destroy();
			sessionRef.current = null;
		};
	}, [open, handleUtterance, speakText, setPausedListening]);

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
							className="pointer-events-auto w-[min(320px,calc(100vw-20px))] max-w-[calc(100vw-20px)]"
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
								className="relative overflow-hidden rounded-[2px] border border-cyan-400/45 bg-[#030712]/95 shadow-[0_0_0_1px_rgba(217,70,239,0.25),0_0_60px_rgba(34,211,238,0.14),0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl"
								style={{
									clipPath:
										"polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))",
								}}
							>
								<HudCorner className="left-2 top-2 border-l-2 border-t-2" />
								<HudCorner className="right-2 top-2 border-r-2 border-t-2" />
								<HudCorner className="bottom-2 left-2 border-b-2 border-l-2" />
								<HudCorner className="bottom-2 right-2 border-b-2 border-r-2" />

								<div className="relative px-3.5 pb-3 pt-2 sm:px-4 sm:pb-3.5 sm:pt-2.5">
									<div className="mb-2 flex items-start justify-between gap-2 border-b border-cyan-500/15 pb-2">
										<div className="flex min-w-0 items-center gap-2.5">
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
											className="shrink-0 rounded-sm border border-cyan-500/35 bg-cyan-950/40 p-1 text-cyan-200/90 transition hover:border-fuchsia-400/50 hover:text-fuchsia-100"
											aria-label="Close voice session"
										>
											<AiOutlineClose className="h-3.5 w-3.5" />
										</button>
									</div>

									<div
										id="hero-voice-hud-body"
										className="space-y-2 font-mono text-[11px] leading-relaxed sm:text-xs"
									>
										<BookingPanel snapshot={scheduleSnapshot} />
										{lastUserText ? (
											<div className="rounded-sm border border-fuchsia-500/20 bg-fuchsia-950/20 px-2.5 py-2 text-slate-100/95">
												<p className="text-[9px] uppercase tracking-wider text-fuchsia-400/80">
													You
												</p>
												<p className="mt-1">{lastUserText}</p>
											</div>
										) : null}
										<div className="rounded-sm border border-cyan-500/20 bg-black/55 px-2.5 py-2 text-slate-100/95 shadow-[inset_0_0_24px_rgba(34,211,238,0.04)]">
											<p className="text-[9px] uppercase tracking-wider text-cyan-400/80">
												Assistant
											</p>
											<p className="mt-1">
												<span className="text-cyan-500/70">&gt; </span>
												{lastAssistantText}
											</p>
										</div>
									</div>

									{errorMessage ? (
										<div className="mt-2 rounded-sm border border-red-500/30 bg-red-500/10 px-2.5 py-2 font-mono text-[10px] text-red-300">
											{errorMessage}
										</div>
									) : null}

									<div className="mt-2.5 flex flex-wrap items-center gap-2">
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
						</motion.div>
					</div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body,
	);
};

export default HeroVoiceAgentModal;
