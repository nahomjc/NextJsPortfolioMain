import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDockActions } from "./DockActionsContext";
import { CHAT_SUGGESTIONS, portfolioKnowledge } from "../lib/portfolioKnowledge";

const MODEL_LABEL = "deepseek";
const PROVIDER_LABEL = "openrouter";
const PANEL_WIDTH = 560;
const PANEL_GAP = 14;
const USER_PROMPT = "visitor@portfolio";
const ASSISTANT_PROMPT = "assistant@nahom";

const WELCOME =
	"Hi — I'm Nahom's portfolio assistant. Ask about his experience, stack, projects, education, or how to collaborate.";

function TerminalTitleBar({ onClose, onToggleFullscreen, isFullscreen }) {
	return (
		<div className="terminal-titlebar relative flex shrink-0 items-center border-b border-emerald-500/15 bg-[#0c1018] px-3.5 py-2">
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onClose}
					className="terminal-dot terminal-dot--red"
					aria-label="Close"
				/>
				<span className="terminal-dot terminal-dot--yellow" aria-hidden />
				<button
					type="button"
					onClick={onToggleFullscreen}
					className="terminal-dot terminal-dot--green"
					aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
					aria-pressed={isFullscreen}
				/>
			</div>
			<div className="pointer-events-none absolute inset-x-0 flex items-center justify-center px-16">
				<p
					id="portfolio-assistant-title"
					className="truncate font-mono text-[11px] text-slate-400"
				>
					<span className="text-emerald-400">nahom-assistant</span>
					<span className="text-slate-600"> — </span>
					<span className="text-slate-500">bash</span>
				</p>
			</div>
		</div>
	);
}

function useChatPanelPosition(chatOpen, chatAnchor, isFullscreen) {
	const [layout, setLayout] = useState({
		left: 16,
		bottom: 92,
		width: PANEL_WIDTH,
		height: 560,
		originX: "50%",
	});

	useEffect(() => {
		if (!chatOpen || isFullscreen || typeof window === "undefined") return;

		const update = () => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const width = Math.min(PANEL_WIDTH, vw - 24);

			let left;
			let bottom;

			if (chatAnchor) {
				left = chatAnchor.centerX - width / 2;
				left = Math.max(12, Math.min(left, vw - width - 12));
				bottom = Math.max(12, vh - chatAnchor.top + PANEL_GAP);
			} else {
				left = vw - width - 16;
				bottom = 92;
			}

			const height = Math.min(580, vh - bottom - 16);
			const anchorX = chatAnchor?.centerX ?? left + width / 2;
			const originX = `${Math.max(8, Math.min(92, ((anchorX - left) / width) * 100))}%`;

			setLayout({ left, bottom, width, height, originX });
		};

		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [chatOpen, chatAnchor, isFullscreen]);

	return layout;
}

function PromptPrefix({ user = false }) {
	return (
		<span className="shrink-0 select-none">
			<span className={user ? "text-fuchsia-400" : "text-cyan-400"}>
				{user ? USER_PROMPT : ASSISTANT_PROMPT}
			</span>
			<span className="text-slate-600">:</span>
			<span className="text-emerald-400">~</span>
			<span className="text-slate-500">{user ? "$" : ">"}</span>
			<span className="text-slate-600"> </span>
		</span>
	);
}

function TerminalLine({ message }) {
	const isUser = message.role === "user";

	return (
		<motion.div
			initial={{ opacity: 0, y: 4 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.15 }}
			className="font-mono text-[12px] leading-relaxed"
		>
			<div className="flex min-w-0 gap-0">
				<PromptPrefix user={isUser} />
				<p className="min-w-0 break-words whitespace-pre-wrap text-slate-300 [overflow-wrap:anywhere]">
					{message.content}
					{message.streaming ? (
						<span className="terminal-cursor ml-0.5 inline text-emerald-400">▊</span>
					) : null}
				</p>
			</div>
		</motion.div>
	);
}

function BootLines() {
	return (
		<div className="space-y-1 border-b border-emerald-500/10 px-4 py-2.5 font-mono text-[10px] leading-relaxed text-slate-500">
			<p>
				<span className="text-emerald-500/80">$</span> init session — portfolio assistant v1.0
			</p>
			<p>
				<span className="text-emerald-500/80">$</span> model:{" "}
				<span className="text-cyan-400/90">{MODEL_LABEL}</span>
				<span className="text-slate-600"> · </span>
				provider: <span className="text-cyan-400/90">{PROVIDER_LABEL}</span>
			</p>
			<p>
				<span className="text-emerald-500/80">$</span> status:{" "}
				<span className="text-emerald-400">[ONLINE]</span>
				<span className="text-slate-600"> · </span>
				type a question or pick a suggestion below
			</p>
		</div>
	);
}

const AIChat = () => {
	const { chatOpen, closeChat, chatAnchor } = useDockActions();
	const [isFullscreen, setIsFullscreen] = useState(false);
	const panelLayout = useChatPanelPosition(chatOpen, chatAnchor, isFullscreen);
	const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME }]);
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const chatBoxRef = useRef(null);
	const inputRef = useRef(null);

	useEffect(() => {
		if (!chatOpen) setIsFullscreen(false);
	}, [chatOpen]);

	useEffect(() => {
		if (chatOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [chatOpen]);

	useEffect(() => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	}, [messages, isLoading, error]);

	const removeEmptyStreamingReply = () => {
		setMessages((prev) => {
			const last = prev[prev.length - 1];
			if (last?.role === "assistant" && last.streaming && !last.content) {
				return prev.slice(0, -1);
			}
			return prev;
		});
	};

	const sendMessage = async (text) => {
		const trimmed = text.trim();
		if (!trimmed || isLoading) return;

		setError("");
		const userMessage = { role: "user", content: trimmed };
		const nextMessages = [...messages, userMessage];
		setMessages([
			...nextMessages,
			{ role: "assistant", content: "", streaming: true },
		]);
		setInputMessage("");
		setIsLoading(true);

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					messages: nextMessages.map(({ role, content }) => ({ role, content })),
				}),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error || "Something went wrong.");
			}

			if (!res.body) {
				throw new Error("Streaming is not supported in this browser.");
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";
			let streamedContent = "";

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";

				for (const line of lines) {
					if (!line.startsWith("data: ")) continue;

					const payload = line.slice(6).trim();
					if (payload === "[DONE]") continue;

					try {
						const parsed = JSON.parse(payload);
						if (parsed.content) {
							streamedContent += parsed.content;
							const content = streamedContent;
							setMessages((prev) => {
								const updated = [...prev];
								const lastIdx = updated.length - 1;
								if (updated[lastIdx]?.role === "assistant") {
									updated[lastIdx] = {
										role: "assistant",
										content,
										streaming: true,
									};
								}
								return updated;
							});
						}
					} catch {
						// skip malformed chunks
					}
				}
			}

			const finalContent = streamedContent.trim();
			if (!finalContent) {
				removeEmptyStreamingReply();
				throw new Error("Empty response from AI service.");
			}

			setMessages((prev) => {
				const updated = [...prev];
				const lastIdx = updated.length - 1;
				if (updated[lastIdx]?.role === "assistant") {
					updated[lastIdx] = { role: "assistant", content: finalContent };
				}
				return updated;
			});
		} catch (err) {
			removeEmptyStreamingReply();
			setError(err.message || "Failed to send message.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		sendMessage(inputMessage);
	};

	return (
		<AnimatePresence>
			{chatOpen && (
				<motion.div
					role="dialog"
					aria-modal="true"
					aria-labelledby="portfolio-assistant-title"
					initial={{ opacity: 0, y: 16, scale: 0.92 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 12, scale: 0.94 }}
					transition={{ type: "spring", damping: 26, stiffness: 380 }}
					className={`portfolio-chat terminal-chat fixed z-50 flex flex-col overflow-hidden rounded-lg border border-emerald-500/20 bg-[#0a0e14] font-mono shadow-[0_0_0_1px_rgba(16,185,129,0.08),0_24px_80px_rgba(0,0,0,0.65)] ${
						isFullscreen ? "portfolio-chat--fullscreen" : ""
					}`}
					style={
						isFullscreen
							? undefined
							: {
									left: panelLayout.left,
									bottom: panelLayout.bottom,
									width: panelLayout.width,
									height: panelLayout.height,
									transformOrigin: `${panelLayout.originX} 100%`,
								}
					}
				>
					<TerminalTitleBar
						onClose={closeChat}
						onToggleFullscreen={() => setIsFullscreen((v) => !v)}
						isFullscreen={isFullscreen}
					/>

					<div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
						<BootLines />

						<div
							ref={chatBoxRef}
							className="portfolio-chat-messages terminal-chat-output relative min-h-0 min-w-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-3"
						>
							{messages.map((message, index) => (
								<TerminalLine key={`${message.role}-${index}`} message={message} />
							))}
						</div>

						{error ? (
							<div className="mx-4 mb-2 border border-red-500/30 bg-red-500/10 px-3 py-2 font-mono text-[11px] text-red-400">
								<span className="text-red-500">[ERROR]</span> {error}
							</div>
						) : null}

						<div className="relative shrink-0 border-t border-emerald-500/10 px-4 py-2.5">
							<p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
								# suggestions
							</p>
							<div className="flex flex-wrap gap-1.5">
								{CHAT_SUGGESTIONS.map((question) => (
									<button
										key={question}
										type="button"
										disabled={isLoading}
										onClick={() => sendMessage(question)}
										className="border border-emerald-500/15 bg-emerald-500/[0.06] px-2.5 py-1 font-mono text-[10px] text-emerald-400/90 transition hover:border-emerald-400/35 hover:bg-emerald-500/10 hover:text-emerald-300 disabled:opacity-40"
									>
										{question}
									</button>
								))}
							</div>
						</div>

						<form
							onSubmit={handleSubmit}
							className="relative shrink-0 border-t border-emerald-500/15 bg-[#080b10] px-4 py-3"
						>
							<div className="flex min-w-0 items-center font-mono text-[12px]">
								<PromptPrefix user />
								<span className="relative flex min-w-0 flex-1 items-center">
									<input
										ref={inputRef}
										type="text"
										value={inputMessage}
										onChange={(e) => setInputMessage(e.target.value)}
										disabled={isLoading}
										placeholder=""
										className="w-full min-w-0 bg-transparent text-slate-200 caret-emerald-400 focus:outline-none disabled:opacity-50"
										autoComplete="off"
										spellCheck={false}
									/>
									{!inputMessage && !isLoading ? (
										<span className="terminal-cursor pointer-events-none absolute left-0 text-emerald-400">
											▊
										</span>
									) : null}
								</span>
							</div>
							<p className="mt-1.5 font-mono text-[9px] text-slate-600">
								press <kbd className="rounded border border-slate-700 bg-slate-800/60 px-1 text-slate-400">Enter</kbd> to send
							</p>
						</form>

						<footer className="relative flex shrink-0 items-center justify-between gap-2 border-t border-emerald-500/10 bg-[#0c1018] px-4 py-2">
							<p className="font-mono text-[9px] uppercase tracking-wider text-slate-600">
								{PROVIDER_LABEL} · {MODEL_LABEL}
							</p>
							<div className="flex gap-2">
								<a
									href={portfolioKnowledge.quickLinks.github}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-7 w-7 items-center justify-center border border-slate-700/80 text-slate-500 transition hover:border-cyan-500/40 hover:text-cyan-400"
									aria-label="GitHub"
								>
									<FaGithub size={13} />
								</a>
								<a
									href={portfolioKnowledge.quickLinks.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-7 w-7 items-center justify-center border border-slate-700/80 text-slate-500 transition hover:border-fuchsia-500/40 hover:text-fuchsia-400"
									aria-label="LinkedIn"
								>
									<FaLinkedin size={13} />
								</a>
							</div>
						</footer>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AIChat;
