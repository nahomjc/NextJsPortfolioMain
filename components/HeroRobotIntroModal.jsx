import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import {
	HUD_DEFAULT_VARIANT,
	HUD_VARIANTS,
} from "./heroRobotHudVariants";

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

const POP_W = 300;
const POP_H_EST = 248;
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
	let best = Infinity;
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

const HeroRobotIntroModal = ({ open, onClose, anchor }) => {
	const [mounted, setMounted] = useState(false);
	const [, setLayoutVersion] = useState(0);

	const reduceMotion =
		typeof window !== "undefined" &&
		window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	const variantKey =
		anchor?.variantKey && HUD_VARIANTS[anchor.variantKey]
			? anchor.variantKey
			: HUD_DEFAULT_VARIANT;
	const hud = HUD_VARIANTS[variantKey];
	const bodyText = hud.body;

	const typed = useTypewriter(bodyText, open, reduceMotion);
	const doneTyping = typed.length >= bodyText.length;

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
			tx,
			ty,
		};
	}, [open, anchor, pos.left, pos.top]);

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
					transition={{ duration: reduceMotion ? 0.12 : 0.28 }}
				>
					{/* Tactical vignette */}
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

					{/* Data tether */}
					{tether && !reduceMotion ? (
						<svg
							className="pointer-events-none fixed inset-0 z-[199] h-full w-full"
							aria-hidden
						>
							<defs>
								<linearGradient
									id="hud-tether-grad"
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
								stroke="url(#hud-tether-grad)"
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

					{/* Origin reticle */}
					<div
						className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
						style={{ left: anchor.x, top: anchor.y }}
						aria-hidden
					>
						<motion.div
							className="relative h-[4.5rem] w-[4.5rem]"
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								duration: reduceMotion ? 0.05 : 0.4,
								ease: [0.22, 1, 0.36, 1],
							}}
						>
							{!reduceMotion ? (
								<motion.div
									className="absolute inset-0 rounded-full border border-dashed border-cyan-400/50"
									animate={{ rotate: 360 }}
									transition={{
										duration: 14,
										repeat: Infinity,
										ease: "linear",
									}}
								/>
							) : null}
							<motion.div
								className="absolute inset-[6px] rounded-full border border-fuchsia-500/40"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.08, duration: 0.35 }}
							/>
							<motion.div
								className="absolute inset-[14px] rounded-full border-2 border-cyan-400/70 shadow-[0_0_18px_rgba(34,211,238,0.5)]"
								style={{
									boxShadow:
										"inset 0 0 14px rgba(217,70,239,0.2), 0 0 20px rgba(34,211,238,0.45)",
								}}
								animate={
									reduceMotion
										? {}
										: {
												boxShadow: [
													"inset 0 0 14px rgba(217,70,239,0.2), 0 0 16px rgba(34,211,238,0.4)",
													"inset 0 0 18px rgba(217,70,239,0.35), 0 0 28px rgba(34,211,238,0.65)",
													"inset 0 0 14px rgba(217,70,239,0.2), 0 0 16px rgba(34,211,238,0.4)",
												],
											}
								}
								transition={{
									duration: 2.2,
									repeat: reduceMotion ? 0 : Infinity,
									ease: "easeInOut",
								}}
							/>
							{/* Crosshair */}
							<div className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/90 to-transparent" />
							<div className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-gradient-to-t from-cyan-300/90 to-transparent" />
							<div className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-gradient-to-r from-cyan-300/90 to-transparent" />
							<div className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-gradient-to-l from-cyan-300/90 to-transparent" />
						</motion.div>
					</div>

					<div
						className="pointer-events-none absolute perspective-[960px]"
						style={{ left: pos.left, top: pos.top }}
					>
						<motion.div
							role="dialog"
							aria-modal="true"
							aria-labelledby="hero-robot-hud-title"
							aria-describedby="hero-robot-hud-body"
							className="pointer-events-auto w-[min(300px,calc(100vw-20px))] max-w-[calc(100vw-20px)]"
							style={{
								transformOrigin: `${pos.originX} ${pos.originY}`,
							}}
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
							className="relative overflow-hidden rounded-[2px] border border-cyan-400/45 bg-[#030712]/95 shadow-[0_0_0_1px_rgba(217,70,239,0.25),0_0_60px_rgba(34,211,238,0.14),0_0_100px_rgba(124,58,237,0.08),0_20px_50px_rgba(0,0,0,0.65)] backdrop-blur-xl"
							style={{
								clipPath:
									"polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))",
							}}
						>
							{/* Scan sweep */}
							{!reduceMotion ? (
								<motion.div
									className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[42%] bg-gradient-to-b from-cyan-400/12 via-transparent to-transparent"
									initial={{ top: "-45%" }}
									animate={{ top: "100%" }}
									transition={{
										duration: 0.85,
										ease: [0.22, 1, 0.36, 1],
										delay: 0.12,
									}}
									aria-hidden
								/>
							) : null}

							<div
								className="pointer-events-none absolute inset-0 opacity-[0.12]"
								style={{
									backgroundImage:
										"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,211,238,0.05) 2px, rgba(34,211,238,0.05) 3px)",
								}}
								aria-hidden
							/>
							<div
								className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-transparent to-fuchsia-600/[0.07]"
								aria-hidden
							/>

							<HudCorner className="left-2 top-2 border-l-2 border-t-2" />
							<HudCorner className="right-2 top-2 border-r-2 border-t-2" />
							<HudCorner className="bottom-2 left-2 border-b-2 border-l-2" />
							<HudCorner className="bottom-2 right-2 border-b-2 border-r-2" />

							<div className="relative px-3.5 pb-3 pt-2 sm:px-4 sm:pb-3.5 sm:pt-2.5">
								<div className="mb-1.5 flex items-center justify-between gap-2 border-b border-cyan-500/25 pb-1.5">
									<div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[8px] uppercase tracking-wider text-cyan-500/90">
										<span className="inline-flex items-center gap-1 text-emerald-400/95">
											<span className="relative flex h-1.5 w-1.5">
												<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-60 motion-reduce:animate-none" />
												<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
											</span>
											online
										</span>
										<span className="text-white/25">|</span>
										<span className="text-fuchsia-400/80">enc: AES-256</span>
										<span className="text-white/25">|</span>
										<span className="truncate text-cyan-300/70">ch-{variantKey.slice(0, 6)}</span>
									</div>
								</div>

								<div className="mb-2 flex items-start justify-between gap-2 border-b border-cyan-500/15 pb-2">
									<div className="min-w-0">
										<p
											id="hero-robot-hud-title"
											className="font-mono text-[9px] font-semibold uppercase tracking-[0.32em] text-cyan-200 [text-shadow:0_0_12px_rgba(34,211,238,0.35)]"
										>
											{hud.title}
										</p>
										<p className="mt-0.5 font-mono text-[10px] leading-snug text-fuchsia-300/85">
											{hud.subject}
										</p>
									</div>
									<button
										type="button"
										onClick={onClose}
										className="shrink-0 rounded-sm border border-cyan-500/35 bg-cyan-950/40 p-1 text-cyan-200/90 shadow-[0_0_12px_rgba(34,211,238,0.15)] transition hover:border-fuchsia-400/50 hover:bg-fuchsia-950/30 hover:text-fuchsia-100 hover:shadow-[0_0_16px_rgba(217,70,239,0.25)]"
										aria-label="Close"
									>
										<AiOutlineClose className="h-3.5 w-3.5" />
									</button>
								</div>

								<div
									id="hero-robot-hud-body"
									className="relative max-h-[200px] overflow-y-auto rounded-sm border border-cyan-500/20 bg-black/55 px-2.5 py-2 font-mono text-[11px] leading-relaxed text-slate-100/95 shadow-[inset_0_0_24px_rgba(34,211,238,0.04)] sm:text-xs"
								>
									<div
										className="pointer-events-none absolute left-0 top-0 z-[1] h-3 w-full bg-gradient-to-b from-cyan-400/10 to-transparent"
										aria-hidden
									/>
									<p className="relative z-[2] whitespace-pre-wrap">
										<span className="text-cyan-500/70">&gt; </span>
										{typed}
										{!doneTyping && (
											<span className="ml-px inline-block h-3.5 w-0.5 translate-y-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] motion-safe:animate-pulse" />
										)}
									</p>
								</div>

								<div className="mt-2.5 flex flex-wrap items-center gap-2">
									<Link
										href="/#projects"
										className="unstyled inline-block"
										onClick={onClose}
									>
										<span className="group relative inline-flex items-center overflow-hidden rounded-sm border border-fuchsia-500/50 bg-gradient-to-r from-fuchsia-950/50 to-violet-950/40 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-100 shadow-[0_0_20px_rgba(217,70,239,0.2)] transition hover:border-fuchsia-400/80 hover:shadow-[0_0_28px_rgba(217,70,239,0.35)]">
											<span
												className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-500 group-hover:translate-x-full"
												aria-hidden
											/>
											<span className="relative">Deploy → projects</span>
										</span>
									</Link>
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

export default HeroRobotIntroModal;
