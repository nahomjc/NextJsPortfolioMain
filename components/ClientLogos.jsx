import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLIENT_LOGOS } from "../lib/clientLogos";
import { scrollTriggerBase, scheduleScrollTriggerRefresh } from "../lib/gsapScroll";

function LogoCell({ logo }) {
	return (
		<div className="client-logo-cell group relative mx-3 flex h-[5.5rem] w-[11.5rem] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan-400/15 bg-white/55 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:shadow-[0_0_28px_rgba(34,211,238,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] dark:border-white/10 dark:bg-slate-950/45 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:hover:border-cyan-400/35 dark:hover:shadow-[0_0_32px_rgba(34,211,238,0.14)]">
			<span
				className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l border-t border-cyan-400/50 opacity-60 transition-opacity group-hover:opacity-100"
				aria-hidden
			/>
			<span
				className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r border-t border-cyan-400/50 opacity-60 transition-opacity group-hover:opacity-100"
				aria-hidden
			/>
			<span
				className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-indigo-400/40 opacity-50 transition-opacity group-hover:opacity-90"
				aria-hidden
			/>
			<span
				className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-indigo-400/40 opacity-50 transition-opacity group-hover:opacity-90"
				aria-hidden
			/>
			<div
				className="client-logo-cell-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				aria-hidden
			/>
			<div className="relative flex h-10 w-full items-center justify-center">
				<Image
					src={logo.src}
					alt={`${logo.name} logo`}
					width={128}
					height={48}
					className="client-logo-img max-h-10 w-auto object-contain opacity-75 grayscale transition-[opacity,filter,transform] duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
				/>
			</div>
			<div className="flex w-full items-center justify-between gap-2 border-t border-slate-200/70 pt-2 dark:border-white/10">
				<span className="truncate font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-slate-600 dark:text-slate-300">
					{logo.name}
				</span>
				<span className="shrink-0 rounded border border-cyan-400/25 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-cyan-700 dark:text-cyan-300">
					{logo.tag}
				</span>
			</div>
		</div>
	);
}

function LogoMarquee({ reverse = false }) {
	const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

	return (
		<div
			className={`client-logo-marquee relative overflow-hidden ${
				reverse ? "client-logo-marquee--reverse" : ""
			}`}
		>
			<div
				className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-100 via-slate-100/90 to-transparent dark:from-[#06030c] dark:via-[#06030c]/90"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-100 via-slate-100/90 to-transparent dark:from-[#06030c] dark:via-[#06030c]/90"
				aria-hidden
			/>
			<div className="client-logo-marquee-track flex w-max py-1">
				{track.map((logo, i) => (
					<LogoCell key={`${logo.name}-${i}`} logo={logo} />
				))}
			</div>
		</div>
	);
}

const ClientLogos = () => {
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const panelRef = useRef(null);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (typeof window === "undefined") return undefined;
		gsap.registerPlugin(ScrollTrigger);

		if (reduceMotion) return undefined;

		const ctx = gsap.context(() => {
			const header = headerRef.current;
			if (header) {
				gsap.from(header.querySelectorAll("[data-reveal]"), {
					y: 28,
					opacity: 0,
					duration: 0.75,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						...scrollTriggerBase,
						trigger: header,
						start: "top 82%",
					},
				});
			}

			const panel = panelRef.current;
			if (panel) {
				gsap.from(panel, {
					y: 36,
					opacity: 0,
					duration: 0.85,
					ease: "power3.out",
					scrollTrigger: {
						...scrollTriggerBase,
						trigger: panel,
						start: "top 88%",
					},
				});
			}
		}, sectionRef);

		scheduleScrollTriggerRefresh(400);
		return () => {
			ctx.revert();
		};
	}, [reduceMotion]);

	return (
		<section
			id="clients"
			ref={sectionRef}
			className="client-logos-section relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[length:40px_40px] opacity-80 dark:opacity-50"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-1/2 top-1/4 h-[min(85vw,480px)] w-[min(85vw,480px)] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[110px] dark:bg-cyan-500/12"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(60vw,380px)] w-[min(60vw,380px)] rounded-full bg-indigo-500/10 blur-[90px] dark:bg-indigo-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-6xl">
				<p
					className="pointer-events-none absolute right-[3%] top-8 z-0 font-display text-[clamp(5rem,14vw,10rem)] font-bold leading-none text-slate-900/[0.035] dark:text-white/[0.03]"
					aria-hidden
				>
					DEPLOY
				</p>

				<header
					ref={headerRef}
					className="relative mx-auto mb-12 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-14 md:pb-12"
				>
					<div className="flex justify-center">
						<p data-reveal className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-cyan-400 to-indigo-500"
								aria-hidden
							/>
							In production
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ TRUST NET
							</span>
						</p>
					</div>
					<h2
						data-reveal
						className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl"
					>
						Platforms powered by{" "}
						<span className="text-gradient-future">my builds</span>
					</h2>
					<p
						data-reveal
						className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base"
					>
						Teams and products running ERP, LMS, and platform systems I helped
						engineer — live in the field, not slide-deck demos.
					</p>
					<div
						data-reveal
						className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-3"
					>
						<span className="client-trust-pill inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
							{CLIENT_LOGOS.length} active deployments
						</span>
						<span className="client-trust-pill inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300">
							ET · SaaS · EdTech
						</span>
					</div>
					<div
						className="mx-auto mt-6 h-px max-w-md bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
						aria-hidden
					/>
				</header>

				<div
					ref={panelRef}
					className="client-logo-panel relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/40 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/35 md:p-6"
				>
					<div
						className="pointer-events-none absolute left-4 top-4 z-10 font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-600/70 dark:text-cyan-400/65"
						aria-hidden
					>
						node.sync · verified
					</div>
					<div
						className="client-logo-panel-scan pointer-events-none absolute inset-x-8 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
						aria-hidden
					/>
					<div className="space-y-4 pt-6">
						<LogoMarquee />
						<LogoMarquee reverse />
					</div>
				</div>
			</div>
		</section>
	);
};

export default ClientLogos;
