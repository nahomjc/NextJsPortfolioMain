import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import AboutImg from "../public/assets/download.png";
import { highlights, HERO_SUBTEXT, HERO_STATS } from "./about/aboutData";
import SectionShell, {
	monoMetaClass,
	linkAccentClass,
	btnPrimary,
} from "./section/SectionShell";

const AboutWorkspacePly = dynamic(() => import("./AboutWorkspacePly"), {
	ssr: false,
	loading: () => (
		<div className="about-desk-canvas about-desk-canvas--immersive flex items-center justify-center" aria-hidden>
			<span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
				Initializing desk…
			</span>
		</div>
	),
});

const BIO_SHORT = [
	"I specialize in high-performance, mobile-responsive applications that integrate cleanly with APIs, databases, and third-party services: ERP, HCM, CRM, LMS, e-commerce, and client-facing platforms.",
	"I also design AI agents and intelligent bots: LLM-backed assistants, portfolio chat, and Telegram flows wired to business logic with OpenRouter and OpenAI. Keys stay server-side.",
	"Since 2016 I've gone from CMS e-commerce to leading full-stack delivery on Sourcepin, HCM, Muyalogy, Jiret, Afriwork Learn, Green Bag, Afrocado, AR Solutions, Peragos, Loop State, and Bazra E-Wallet.",
];

const DESK_NOTES = [
	{ key: "Focus", action: "Ship production systems" },
	{ key: "Stack", action: "Full-stack · AI · bots" },
	{ key: "Base", action: "Addis Ababa · remote" },
];

function PortraitLightbox({ open, onClose }) {
	const reduceMotion = useReducedMotion();
	const [mounted, setMounted] = useState(false);
	const closeTimer = useRef(null);
	const panelRef = useRef(null);
	const openedAt = useRef(0);

	const scheduleClose = () => {
		clearTimeout(closeTimer.current);
		closeTimer.current = window.setTimeout(() => onClose(), 160);
	};

	const cancelClose = () => {
		clearTimeout(closeTimer.current);
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!open) return undefined;
		openedAt.current = performance.now();
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};

		const onMove = (e) => {
			// Grace period so the open under-cursor doesn't instantly dismiss
			if (performance.now() - openedAt.current < 280) return;
			const panel = panelRef.current;
			if (!panel) return;
			const r = panel.getBoundingClientRect();
			const inside =
				e.clientX >= r.left &&
				e.clientX <= r.right &&
				e.clientY >= r.top &&
				e.clientY <= r.bottom;
			if (inside) cancelClose();
			else scheduleClose();
		};

		document.addEventListener("keydown", onKey);
		document.addEventListener("pointermove", onMove);
		return () => {
			document.removeEventListener("keydown", onKey);
			document.removeEventListener("pointermove", onMove);
			clearTimeout(closeTimer.current);
		};
	}, [open, onClose]);

	if (!mounted) return null;

	const ease = [0.22, 1, 0.36, 1];

	return createPortal(
		<AnimatePresence mode="wait">
			{open ? (
				<motion.div
					key="about-portrait-lightbox"
					className="about-portrait-overlay fixed inset-0 z-[270] flex items-center justify-center p-4 sm:p-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: reduceMotion ? 0.12 : 0.28, ease }}
					role="dialog"
					aria-modal="true"
					aria-label="Portrait, Nahom Tesfaye"
				>
					{/* Dim layer — click to dismiss */}
					<motion.button
						type="button"
						className="unstyled absolute inset-0 bg-slate-950/80"
						aria-label="Close portrait"
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{ duration: reduceMotion ? 0.1 : 0.32, ease }}
						onClick={onClose}
					/>

					{/* Scan sweep */}
					{!reduceMotion ? (
						<motion.div
							className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
							initial={{ y: 0, opacity: 0 }}
							animate={{ y: "100vh", opacity: [0, 0.85, 0] }}
							transition={{ duration: 0.85, ease }}
							aria-hidden
						/>
					) : null}

					<motion.div
						ref={panelRef}
						className="about-portrait-panel relative z-[2] w-full max-w-md sm:max-w-lg md:max-w-xl"
						initial={
							reduceMotion
								? { opacity: 0 }
								: { opacity: 0, scale: 0.88, y: 28, filter: "blur(8px)" }
						}
						animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
						exit={
							reduceMotion
								? { opacity: 0 }
								: { opacity: 0, scale: 0.94, y: 10, filter: "blur(6px)" }
						}
						transition={{ duration: reduceMotion ? 0.12 : 0.45, ease }}
						onMouseEnter={cancelClose}
						onMouseLeave={scheduleClose}
					>
						<button
							type="button"
							onClick={onClose}
							className="absolute -right-1 -top-11 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-white/15 hover:text-white sm:-right-2"
							aria-label="Close"
						>
							<FaTimes className="text-sm" aria-hidden />
						</button>

						<div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#060b14] shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_40px_100px_-28px_rgba(0,0,0,0.9),0_0_60px_-20px_rgba(34,211,238,0.25)]">
							<div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
								<div className="flex items-center gap-2">
									<span className="relative flex h-1.5 w-1.5" aria-hidden>
										<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/40" />
										<span className="relative h-1.5 w-1.5 rounded-full bg-cyan-400" />
									</span>
									<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/90">
										portrait.exe
									</span>
								</div>
								<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
									leave to close
								</span>
							</div>

							<motion.div
								className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900"
								initial={reduceMotion ? false : { clipPath: "inset(8% 8% 8% 8%)" }}
								animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
								exit={reduceMotion ? undefined : { clipPath: "inset(4% 4% 4% 4%)" }}
								transition={{ duration: reduceMotion ? 0.1 : 0.5, ease }}
							>
								<Image
									src={AboutImg}
									alt="Nahom Tesfaye, full portrait"
									fill
									className="object-cover object-top"
									sizes="(max-width: 768px) 100vw, 576px"
									priority
								/>
								<div
									className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060b14]/80 via-transparent to-cyan-400/[0.04]"
									aria-hidden
								/>
								{!reduceMotion ? (
									<motion.div
										className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-cyan-300/10 to-transparent"
										initial={{ top: "-10%", opacity: 0 }}
										animate={{ top: "110%", opacity: [0, 0.7, 0] }}
										transition={{ duration: 0.9, ease, delay: 0.12 }}
										aria-hidden
									/>
								) : null}
							</motion.div>

							<motion.div
								className="border-t border-white/10 px-5 py-4"
								initial={reduceMotion ? false : { opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35, ease, delay: reduceMotion ? 0 : 0.18 }}
							>
								<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
									Subject ID · 01
								</p>
								<p className="mt-1 text-lg font-semibold tracking-tight text-white">
									Nahom Tesfaye
								</p>
								<p className="text-sm text-slate-400">
									Full-stack · AI · Ethiopia
								</p>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body,
	);
}

const About = () => {
	const [bioExpanded, setBioExpanded] = useState(false);
	const [mountDesk, setMountDesk] = useState(false);
	const [portraitOpen, setPortraitOpen] = useState(false);
	const deskRef = useRef(null);
	const hoverOpenTimer = useRef(null);

	const openPortrait = () => setPortraitOpen(true);
	const closePortrait = () => setPortraitOpen(false);

	const onPortraitEnter = () => {
		if (typeof window === "undefined") return;
		if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
		clearTimeout(hoverOpenTimer.current);
		hoverOpenTimer.current = window.setTimeout(() => {
			setPortraitOpen(true);
		}, 120);
	};

	const onPortraitLeave = () => {
		clearTimeout(hoverOpenTimer.current);
		// If lightbox isn't open yet, cancel pending open.
		// Once open, lightbox handles leave-to-close on the panel.
		if (!portraitOpen) return;
	};

	useEffect(() => {
		return () => clearTimeout(hoverOpenTimer.current);
	}, []);

	useEffect(() => {
		const el = deskRef.current;
		if (!el || typeof window === "undefined") return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setMountDesk(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "320px 0px", threshold: 0 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<SectionShell
			id="about"
			index="01"
			eyebrow="about.tsx"
			title="Built for production, not demos."
			description={HERO_SUBTEXT}
			wide
		>
			{/* Identity strip */}
			<div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-4 sm:gap-5">
					<button
						type="button"
						onClick={openPortrait}
						onMouseEnter={onPortraitEnter}
						onMouseLeave={onPortraitLeave}
						onFocus={onPortraitEnter}
						className="unstyled group relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-cyan-400/30 transition duration-300 hover:ring-2 hover:ring-cyan-400/60 hover:shadow-[0_0_28px_-6px_rgba(34,211,238,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 sm:h-20 sm:w-20"
						aria-label="View larger portrait"
						aria-haspopup="dialog"
						aria-expanded={portraitOpen}
					>
						<Image
							src={AboutImg}
							alt="Nahom Tesfaye"
							fill
							className="object-cover object-top transition duration-500 group-hover:scale-110"
							sizes="80px"
							priority
						/>
						<span
							className="pointer-events-none absolute inset-0 bg-slate-950/0 transition group-hover:bg-slate-950/25"
							aria-hidden
						/>
						<span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-slate-950/80 to-transparent px-1.5 pb-1.5 pt-4 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-cyan-200 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-[9px]">
							Expand
						</span>
					</button>
					<div>
						<p className={`${monoMetaClass} text-cyan-700 dark:text-cyan-400`}>
							Nahom Tesfaye
						</p>
						<p className="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-white sm:text-xl">
							Full-stack · AI · Ethiopia
						</p>
					</div>
				</div>
				<ul className="flex flex-wrap gap-2 sm:justify-end">
					{HERO_STATS.map((stat) => (
						<li
							key={stat.label}
							className="rounded-xl border border-slate-900/10 bg-white/70 px-3.5 py-2.5 dark:border-white/10 dark:bg-white/[0.04]"
						>
							<p className={monoMetaClass}>{stat.label}</p>
							<p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
								{stat.value}
							</p>
						</li>
					))}
				</ul>
			</div>

			<PortraitLightbox open={portraitOpen} onClose={closePortrait} />

			{/* Immersive 3D desk — centerpiece */}
			<div ref={deskRef} className="about-desk-stage relative">
				<div className="about-desk-stage__glow" aria-hidden />
				<div className="about-desk-stage__grid" aria-hidden />

				<div className="relative z-[1] grid gap-0 overflow-hidden rounded-[1.35rem] border border-slate-900/10 dark:border-white/[0.09] lg:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)]">
					{/* Side rail */}
					<aside className="flex flex-col justify-between gap-8 border-b border-slate-900/10 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-[#070d18]/90 sm:p-6 lg:border-b-0 lg:border-r">
						<div>
							<p className={`${monoMetaClass} text-cyan-700 dark:text-cyan-400`}>
								Workspace
							</p>
							<h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
								The desk
							</h3>
							<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
								Where production work gets done. Explore selected builds that
								shipped from this setup.
							</p>
						</div>

						<div>
							<p className={`${monoMetaClass} mb-3`}>At a glance</p>
							<ul className="space-y-2.5">
								{DESK_NOTES.map((item) => (
									<li
										key={item.key}
										className="flex items-center justify-between gap-3 text-sm"
									>
										<kbd className="rounded-md border border-slate-900/10 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-700 dark:border-white/12 dark:bg-white/[0.06] dark:text-slate-200">
											{item.key}
										</kbd>
										<span className="text-right text-slate-500 dark:text-slate-400">
											{item.action}
										</span>
									</li>
								))}
							</ul>
						</div>

						<div className="space-y-3">
							<Link href="/#projects" className={`${btnPrimary} ui-btn--block`}>
								View projects
							</Link>
						</div>
					</aside>

					{/* Canvas well */}
					<div className="about-desk-well relative min-h-[320px] bg-[#050a12]">
						<div className="about-desk-well__vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />
						<div className="about-desk-well__floor pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3" aria-hidden />
						{mountDesk ? (
							<AboutWorkspacePly size="immersive" />
						) : (
							<div
								className="about-desk-canvas about-desk-canvas--immersive flex items-center justify-center"
								aria-hidden
							>
								<span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
									Scroll to load workspace…
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Bio + highlights under the stage */}
			<div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
				<div>
					<p className={monoMetaClass}>Background</p>
					<div
						id="about-bio-text"
						className={`mt-4 space-y-4 text-[1.05rem] leading-[1.75] text-slate-600 dark:text-slate-300 ${
							bioExpanded ? "" : "relative max-h-[11.5rem] overflow-hidden"
						}`}
					>
						{BIO_SHORT.map((para, i) => (
							<p key={i}>{para}</p>
						))}
						{!bioExpanded ? (
							<div
								className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-100 via-slate-100/85 to-transparent dark:from-future-surface dark:via-future-surface/85"
								aria-hidden
							/>
						) : null}
					</div>
					<button
						type="button"
						onClick={() => setBioExpanded((v) => !v)}
						aria-expanded={bioExpanded}
						aria-controls="about-bio-text"
						className={`unstyled mt-4 ${linkAccentClass} font-mono text-[11px] uppercase tracking-[0.16em]`}
					>
						{bioExpanded ? "← collapse" : "read more →"}
					</button>
				</div>

				<ol className="space-y-0 border-t border-slate-900/10 dark:border-white/10">
					{highlights.map((item, i) => (
						<li
							key={item.label}
							className="border-b border-slate-900/10 py-4 dark:border-white/10"
						>
							<p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-400">
								{String(i + 1).padStart(2, "0")} · {item.label}
							</p>
							<p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
								{item.value}
							</p>
						</li>
					))}
				</ol>
			</div>
		</SectionShell>
	);
};

export default About;
