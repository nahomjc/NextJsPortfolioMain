import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

/** Short lines — fits the micro HUD */
const FULL_MESSAGE = `Uplink established.

Nahom — front-end engineer with full-stack instincts. React · Next · TypeScript · Node. Ships fast, accessible UI wired to real backends.

Signal ends here — dig into projects when ready.`;

function useTypewriter(text, active, reducedMotion) {
	const [shown, setShown] = useState("");
	const idxRef = useRef(0);
	const rafRef = useRef(0);

	useEffect(() => {
		if (!active) {
			setShown("");
			idxRef.current = 0;
			return;
		}
		if (reducedMotion) {
			setShown(text);
			return;
		}
		setShown("");
		idxRef.current = 0;
		let last = performance.now();
		const step = (now) => {
			const delta = now - last;
			if (delta >= 14) {
				last = now;
				idxRef.current += 1;
				setShown(text.slice(0, idxRef.current));
				if (idxRef.current >= text.length) return;
			}
			rafRef.current = requestAnimationFrame(step);
		};
		rafRef.current = requestAnimationFrame(step);
		return () => cancelAnimationFrame(rafRef.current);
	}, [active, text, reducedMotion]);

	return shown;
}

const POP_W = 288;
const POP_H_EST = 220;
const PAD = 10;

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

	let left = openRight ? clientX + 10 : clientX - POP_W - 10;
	let top = openDown ? clientY + 10 : clientY - POP_H_EST - 10;

	left = Math.min(Math.max(PAD, left), vw - POP_W - PAD);
	top = Math.min(Math.max(PAD, top), vh - POP_H_EST - PAD);

	const originX = openRight ? "0%" : "100%";
	const originY = openDown ? "0%" : "100%";

	return { left, top, originX, originY };
}

const HeroRobotIntroModal = ({ open, onClose, anchor }) => {
	const [mounted, setMounted] = useState(false);
	const [, setLayoutVersion] = useState(0);

	const reduceMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const typed = useTypewriter(FULL_MESSAGE, open, reduceMotion);
	const doneTyping = typed.length >= FULL_MESSAGE.length;

	const pos =
		open && anchor && typeof window !== "undefined"
			? computePosition(anchor.x, anchor.y)
			: { left: 0, top: 0, originX: "0%", originY: "0%" };

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

	if (!mounted) return null;

	return createPortal(
		<AnimatePresence>
			{open && anchor ? (
				<motion.div
					key="robot-hud-layer"
					className="pointer-events-none fixed inset-0 z-[200]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.22 }}
				>
					<motion.div
						aria-hidden
						className="pointer-events-none absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
						style={{ left: anchor.x, top: anchor.y }}
						initial={{ opacity: 0, scale: 0.2 }}
						animate={{ opacity: [0, 0.9, 0.35], scale: [0.2, 1.15, 1.6] }}
						transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: "easeOut" }}
					>
						<div
							className="h-full w-full rounded-full border border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.45)]"
							style={{ boxShadow: "inset 0 0 12px rgba(217,70,239,0.25)" }}
						/>
					</motion.div>

					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="hero-robot-hud-title"
						aria-describedby="hero-robot-hud-body"
						className="pointer-events-auto absolute w-[min(288px,calc(100vw-20px))] max-w-[calc(100vw-20px)]"
						style={{
							left: pos.left,
							top: pos.top,
							transformOrigin: `${pos.originX} ${pos.originY}`,
						}}
						initial={
							reduceMotion
								? { opacity: 0 }
								: { opacity: 0, scale: 0.82, filter: "blur(6px)" }
						}
						animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
						transition={{
							type: "spring",
							damping: 22,
							stiffness: 420,
							mass: 0.65,
						}}
					>
						<div
							className="relative overflow-hidden border border-cyan-400/35 bg-[#07051c]/92 shadow-[0_0_0_1px_rgba(217,70,239,0.2),0_0_40px_rgba(34,211,238,0.12),0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
							style={{
								clipPath:
									"polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))",
							}}
						>
							<div
								className="pointer-events-none absolute inset-0 opacity-[0.15] motion-safe:animate-pulse"
								style={{
									backgroundImage:
										"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.06) 2px, rgba(34,211,238,0.06) 3px)",
								}}
								aria-hidden
							/>
							<div
								className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent"
								aria-hidden
							/>

							<div className="relative px-3.5 pb-3 pt-2.5 sm:px-4 sm:pb-3.5 sm:pt-3">
								<div className="mb-2 flex items-center justify-between gap-2 border-b border-cyan-500/20 pb-2">
									<div>
										<p
											id="hero-robot-hud-title"
											className="font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-cyan-300/90"
										>
											Uplink · unit.07
										</p>
										<p className="font-mono text-[10px] text-fuchsia-300/80">
											subject: Nahom
										</p>
									</div>
									<button
										type="button"
										onClick={onClose}
										className="rounded border border-white/20 p-1 text-cyan-200/90 transition hover:border-cyan-400/50 hover:bg-cyan-500/10"
										aria-label="Close"
									>
										<AiOutlineClose className="h-3.5 w-3.5" />
									</button>
								</div>

								<div
									id="hero-robot-hud-body"
									className="max-h-[200px] overflow-y-auto rounded-sm border border-white/5 bg-black/40 px-2.5 py-2 font-mono text-[11px] leading-relaxed text-slate-200/95 sm:text-xs"
								>
									<p className="whitespace-pre-wrap">
										{typed}
										{!doneTyping && (
											<span className="ml-px inline-block h-3 w-px translate-y-0.5 bg-cyan-400 motion-safe:animate-pulse" />
										)}
									</p>
								</div>

								<div className="mt-2 flex flex-wrap items-center gap-1.5">
									<Link
										href="/#projects"
										className="unstyled inline-flex items-center rounded border border-fuchsia-500/40 bg-fuchsia-500/15 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-fuchsia-100 transition hover:bg-fuchsia-500/25"
										onClick={onClose}
									>
										Projects →
									</Link>
									<button
										type="button"
										onClick={onClose}
										className="rounded border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-400 transition hover:border-white/30 hover:text-slate-200"
									>
										[ dismiss ]
									</button>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body,
	);
};

export default HeroRobotIntroModal;
