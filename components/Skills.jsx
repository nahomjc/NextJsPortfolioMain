import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollTriggerBase } from "../lib/gsapScroll";
import Css from "../public/assets/skills/css.png";
import Javascript from "../public/assets/skills/javascript.png";
import ReactImg from "../public/assets/skills/react.png";
import Tailwind from "../public/assets/skills/tailwind.png";
import Github from "../public/assets/skills/github1.png";
import Firebase from "../public/assets/skills/firebase.png";
import NextJS from "../public/assets/skills/nextjs.png";

const LANES = [
	{
		id: "frontend",
		index: "01",
		label: "Frontend",
		subtitle: "Interfaces, routing & client performance",
		accent: "cyan",
	},
	{
		id: "backend",
		index: "02",
		label: "Backend",
		subtitle: "APIs, auth & server-side logic",
		accent: "violet",
	},
	{
		id: "data",
		index: "03",
		label: "Data",
		subtitle: "Databases, ORMs & data flow",
		accent: "fuchsia",
	},
	{
		id: "tools",
		index: "04",
		label: "Tools",
		subtitle: "Version control, CI & deployment",
		accent: "emerald",
	},
];

const skillItems = [
	{
		title: "React",
		image: ReactImg,
		category: "frontend",
		featured: true,
		tag: "UI core",
	},
	{
		title: "Next.js",
		image: NextJS,
		category: "frontend",
		featured: true,
		tag: "App framework",
	},
	{
		title: "TypeScript",
		src: "/assets/skills/typescript.svg",
		category: "frontend",
		featured: true,
		tag: "Type safety",
	},
	{
		title: "JavaScript",
		image: Javascript,
		category: "frontend",
		featured: true,
		tag: "Language",
	},
	{ title: "CSS", image: Css, category: "frontend", tag: "Styling" },
	{ title: "Tailwind", image: Tailwind, category: "frontend", tag: "Utility CSS" },
	{
		title: "WordPress",
		src: "/assets/skills/wordpress.svg",
		category: "frontend",
		tag: "CMS",
	},
	{
		title: "Node.js",
		src: "/assets/skills/nodejs.svg",
		category: "backend",
		featured: true,
		tag: "Runtime",
	},
	{
		title: "Express.js",
		src: "/assets/skills/express.svg",
		category: "backend",
		tag: "HTTP layer",
	},
	{ title: "Hono", src: "/assets/skills/hono.svg", category: "backend", tag: "Edge APIs" },
	{
		title: "PostgreSQL",
		src: "/assets/skills/postgresql.svg",
		category: "data",
		featured: true,
		tag: "Primary SQL",
	},
	{
		title: "Drizzle ORM",
		src: "/assets/skills/drizzle.svg",
		category: "data",
		tag: "Type-safe ORM",
	},
	{ title: "MySQL", src: "/assets/skills/mysql.svg", category: "data", tag: "Relational" },
	{ title: "Firebase", image: Firebase, category: "data", tag: "Realtime" },
	{ title: "GitHub", image: Github, category: "tools", tag: "Version control" },
	{ title: "GitLab", src: "/assets/skills/gitlab.svg", category: "tools", tag: "CI / repos" },
];

const ACCENT = {
	cyan: {
		border: "border-cyan-400/25",
		borderActive: "border-cyan-400/50",
		bg: "from-cyan-500/14 via-cyan-400/6 to-transparent",
		bgSolid: "bg-cyan-500/10",
		text: "text-cyan-600 dark:text-cyan-400",
		glow: "group-hover:shadow-[0_8px_32px_rgba(34,211,238,0.14)] group-hover:border-cyan-400/40",
		dot: "bg-cyan-400",
		ring: "ring-cyan-400/30",
		panel: "skills-panel--cyan",
		indicator: "skills-tab-indicator--cyan",
	},
	violet: {
		border: "border-violet-400/25",
		borderActive: "border-violet-400/50",
		bg: "from-violet-500/14 via-violet-400/6 to-transparent",
		bgSolid: "bg-violet-500/10",
		text: "text-violet-600 dark:text-violet-400",
		glow: "group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.14)] group-hover:border-violet-400/40",
		dot: "bg-violet-400",
		ring: "ring-violet-400/30",
		panel: "skills-panel--violet",
		indicator: "skills-tab-indicator--violet",
	},
	fuchsia: {
		border: "border-fuchsia-400/25",
		borderActive: "border-fuchsia-400/50",
		bg: "from-fuchsia-500/14 via-fuchsia-400/6 to-transparent",
		bgSolid: "bg-fuchsia-500/10",
		text: "text-fuchsia-600 dark:text-fuchsia-400",
		glow: "group-hover:shadow-[0_8px_32px_rgba(217,70,239,0.14)] group-hover:border-fuchsia-400/40",
		dot: "bg-fuchsia-400",
		ring: "ring-fuchsia-400/30",
		panel: "skills-panel--fuchsia",
		indicator: "skills-tab-indicator--fuchsia",
	},
	emerald: {
		border: "border-emerald-400/25",
		borderActive: "border-emerald-400/50",
		bg: "from-emerald-500/14 via-emerald-400/6 to-transparent",
		bgSolid: "bg-emerald-500/10",
		text: "text-emerald-600 dark:text-emerald-400",
		glow: "group-hover:shadow-[0_8px_32px_rgba(52,211,153,0.14)] group-hover:border-emerald-400/40",
		dot: "bg-emerald-400",
		ring: "ring-emerald-400/30",
		panel: "skills-panel--emerald",
		indicator: "skills-tab-indicator--emerald",
	},
};

function accentForCategory(category) {
	if (category === "backend") return ACCENT.violet;
	if (category === "data") return ACCENT.fuchsia;
	if (category === "tools") return ACCENT.emerald;
	return ACCENT.cyan;
}

function SkillIcon({ item, size = 56 }) {
	const common = "shrink-0 object-contain";
	if (item.image) {
		return (
			<Image
				src={item.image}
				width={size}
				height={size}
				alt=""
				className={common}
				style={{ width: size, height: size }}
			/>
		);
	}
	return (
		<Image
			src={item.src}
			width={size}
			height={size}
			alt=""
			unoptimized
			className={common}
			style={{ width: size, height: size }}
		/>
	);
}

function FeaturedTile({ item, large = false }) {
	const accent = accentForCategory(item.category);
	return (
		<article
			className={`skills-featured-tile group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-px ${accent.border} ${accent.bg} ${large ? "skills-featured-tile--large" : ""}`}
		>
			<div className="skills-featured-tile-inner relative flex h-full flex-col rounded-[0.94rem] bg-white/85 p-4 dark:bg-slate-950/90 sm:p-5">
				<div
					className={`skills-featured-glow pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${accent.bgSolid} opacity-60`}
					aria-hidden
				/>
				<div className="flex items-start justify-between gap-2">
					<span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${accent.text}`}>
						Core
					</span>
					<span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
						{item.tag}
					</span>
				</div>
				<div
					className={`skills-featured-icon mx-auto flex items-center justify-center rounded-2xl bg-slate-100/80 dark:bg-slate-900/70 ${large ? "my-5 h-20 w-20" : "my-4 h-14 w-14"}`}
				>
					<SkillIcon item={item} size={large ? 48 : 36} />
				</div>
				<h3
					className={`text-center font-semibold text-slate-900 dark:text-white ${large ? "text-base sm:text-lg" : "text-sm"}`}
				>
					{item.title}
				</h3>
			</div>
		</article>
	);
}

function SkillCard({ item, accentKey }) {
	const accent = ACCENT[accentKey];
	return (
		<article
			className={`skills-card group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/70 p-3.5 dark:border-white/8 dark:bg-slate-950/55 sm:p-4 ${accent.glow}`}
		>
			<div
				className={`skills-card-shine pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 ${accent.text}`}
				aria-hidden
			/>
			<div className="flex items-center gap-3">
				<div className="skills-card-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-900/80">
					<SkillIcon item={item} size={26} />
				</div>
				<div className="min-w-0">
					<h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
						{item.title}
					</h3>
					<p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-400">
						{item.tag}
					</p>
				</div>
			</div>
		</article>
	);
}

function CategoryPanel({ lane, items, isActive }) {
	const accent = ACCENT[lane.accent];
	return (
		<div
			id={`skills-panel-${lane.id}`}
			role="tabpanel"
			aria-labelledby={`skills-tab-${lane.id}`}
			hidden={!isActive}
			className={`skills-panel ${accent.panel} ${isActive ? "skills-panel--active" : ""}`}
		>
			<div
				className={`skills-panel-shell relative overflow-hidden rounded-2xl border bg-gradient-to-br p-px ${accent.border} ${accent.bg}`}
			>
				<div
					className="skills-panel-scan pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 dark:via-cyan-400/15"
					aria-hidden
				/>
				<div className="relative rounded-[0.94rem] bg-white/80 p-4 dark:bg-slate-950/85 sm:p-6">
					<header className="skills-panel-header mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200/60 pb-4 dark:border-white/8">
						<div>
							<p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${accent.text}`}>
								{lane.index} — {lane.label}
							</p>
							<h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
								{lane.subtitle}
							</h3>
						</div>
						<span
							className={`skills-panel-count rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-wider ${accent.border} ${accent.bgSolid} ${accent.text}`}
						>
							{items.length} tools
						</span>
					</header>
					<div className="skills-card-grid grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{items.map((item) => (
							<SkillCard key={item.title} item={item} accentKey={lane.accent} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

const TITLE_WORDS = ["What", "I", "Can", "Do"];

const Skills = () => {
	const reduceMotion = useReducedMotion();
	const [activeLane, setActiveLane] = useState("frontend");
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const featuredRef = useRef(null);
	const tabsRef = useRef(null);
	const indicatorRef = useRef(null);
	const statusRef = useRef(null);
	const panelTweenRef = useRef(null);

	const featured = useMemo(() => skillItems.filter((s) => s.featured), []);
	const lanesWithItems = useMemo(
		() =>
			LANES.map((lane) => ({
				lane,
				items: skillItems.filter((s) => s.category === lane.id),
			})),
		[],
	);

	const activeLaneData = lanesWithItems.find(({ lane }) => lane.id === activeLane);

	const activeLaneRef = useRef(activeLane);
	activeLaneRef.current = activeLane;

	const moveTabIndicator = useCallback(
		(laneId, immediate = false) => {
			const tab = document.getElementById(`skills-tab-${laneId}`);
			const tabs = tabsRef.current;
			const indicator = indicatorRef.current;
			if (!tab || !tabs || !indicator) return;

			const tabRect = tab.getBoundingClientRect();
			const tabsRect = tabs.getBoundingClientRect();
			const lane = LANES.find((l) => l.id === laneId);
			const accentClass = lane ? ACCENT[lane.accent].indicator : "";

			indicator.className = `skills-tab-indicator pointer-events-none absolute left-0 top-0 rounded-xl border ${accentClass}`;

			gsap.to(indicator, {
				x: tabRect.left - tabsRect.left,
				y: tabRect.top - tabsRect.top,
				width: tabRect.width,
				height: tabRect.height,
				duration: immediate ? 0 : 0.55,
				ease: immediate ? "none" : "power3.inOut",
				overwrite: true,
			});
		},
		[],
	);

	const animatePanel = useCallback(
		(laneId) => {
			if (reduceMotion) return;

			panelTweenRef.current?.kill();
			gsap.utils.toArray(".skills-panel-scan").forEach((scan) => gsap.killTweensOf(scan));

			const panel = document.getElementById(`skills-panel-${laneId}`);
			if (!panel) return;

			const shell = panel.querySelector(".skills-panel-shell");
			const headerParts = panel.querySelectorAll(".skills-panel-header > *");
			const cards = panel.querySelectorAll(".skills-card");
			const scan = panel.querySelector(".skills-panel-scan");

			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			tl.fromTo(
				shell,
				{
					clipPath: "inset(0 100% 0 0 round 16px)",
					opacity: 0.5,
					scale: 0.98,
				},
				{
					clipPath: "inset(0 0% 0 0 round 16px)",
					opacity: 1,
					scale: 1,
					duration: 0.7,
				},
			)
				.from(
					headerParts,
					{ x: -28, opacity: 0, stagger: 0.07, duration: 0.45 },
					"-=0.4",
				)
				.from(
					cards,
					{
						y: 36,
						opacity: 0,
						scale: 0.9,
						rotateX: 14,
						transformOrigin: "50% 100%",
						stagger: { amount: 0.45, from: "start" },
						duration: 0.5,
					},
					"-=0.3",
				);

			if (scan) {
				gsap.fromTo(
					scan,
					{ xPercent: -120, opacity: 0 },
					{
						xPercent: 220,
						opacity: 0.7,
						duration: 2.2,
						ease: "power2.inOut",
						repeat: -1,
						repeatDelay: 3.5,
					},
				);
			}

			panelTweenRef.current = tl;
		},
		[reduceMotion],
	);

	const handleTabClick = useCallback(
		(laneId) => {
			if (laneId === activeLane) return;

			const tab = document.getElementById(`skills-tab-${laneId}`);
			if (tab && !reduceMotion) {
				gsap.fromTo(
					tab,
					{ scale: 0.94 },
					{ scale: 1, duration: 0.5, ease: "elastic.out(1, 0.55)" },
				);
			}

			setActiveLane(laneId);
			moveTabIndicator(laneId);
		},
		[activeLane, moveTabIndicator, reduceMotion],
	);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const cleanups = [];

		const ctx = gsap.context(() => {
			const headerTl = gsap.timeline({
				scrollTrigger: scrollTriggerBase({
					trigger: headerRef.current,
					start: "top 86%",
					toggleActions: "play none none reverse",
				}),
			});

			headerTl
				.from(".skills-eyebrow-line", {
					scaleX: 0,
					transformOrigin: "left center",
					duration: 0.7,
					ease: "power2.inOut",
				})
				.from(
					".skills-eyebrow-text",
					{ opacity: 0, x: -16, duration: 0.45 },
					"-=0.4",
				)
				.from(
					".skills-title-word",
					{
						y: 72,
						opacity: 0,
						rotateX: -55,
						transformOrigin: "50% 100%",
						stagger: 0.09,
						duration: 0.85,
					},
					"-=0.15",
				)
				.from(
					".skills-header-desc",
					{ opacity: 0, y: 20, filter: "blur(6px)", duration: 0.55 },
					"-=0.35",
				);

			if (featuredRef.current) {
				gsap.from(".skills-featured-label", {
					opacity: 0,
					x: -20,
					duration: 0.5,
					scrollTrigger: scrollTriggerBase({
						trigger: featuredRef.current,
						start: "top 88%",
						toggleActions: "play none none reverse",
					}),
				});

				gsap.from(".skills-featured-tile", {
					y: 90,
					opacity: 0,
					scale: 0.82,
					rotateY: (i) => (i % 2 === 0 ? -18 : 18),
					transformOrigin: "50% 100%",
					stagger: { amount: 0.55, from: "center" },
					duration: 0.95,
					ease: "power3.out",
					scrollTrigger: scrollTriggerBase({
						trigger: featuredRef.current,
						start: "top 85%",
						toggleActions: "play none none reverse",
					}),
				});

				gsap.utils.toArray(".skills-featured-tile").forEach((tile, i) => {
					gsap.to(tile, {
						y: i % 2 === 0 ? -18 : -28,
						ease: "none",
						scrollTrigger: scrollTriggerBase({
							trigger: featuredRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.9,
						}),
					});
				});

				gsap.to(".skills-featured-icon", {
					y: -7,
					duration: 2.4,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
					stagger: { each: 0.35, from: "random" },
				});

				gsap.utils.toArray(".skills-featured-tile").forEach((tile) => {
					const inner = tile.querySelector(".skills-featured-tile-inner");
					const glow = tile.querySelector(".skills-featured-glow");
					if (!inner) return;

					const onMove = (e) => {
						const rect = tile.getBoundingClientRect();
						const x = (e.clientX - rect.left) / rect.width - 0.5;
						const y = (e.clientY - rect.top) / rect.height - 0.5;
						gsap.to(inner, {
							rotateY: x * 12,
							rotateX: -y * 10,
							y: -6,
							duration: 0.45,
							ease: "power2.out",
							overwrite: "auto",
						});
						if (glow) {
							gsap.to(glow, {
								x: x * 20,
								y: y * 20,
								scale: 1.2,
								duration: 0.45,
								overwrite: "auto",
							});
						}
					};

					const onLeave = () => {
						gsap.to(inner, {
							rotateY: 0,
							rotateX: 0,
							y: 0,
							duration: 0.65,
							ease: "elastic.out(1, 0.6)",
						});
						if (glow) {
							gsap.to(glow, {
								x: 0,
								y: 0,
								scale: 1,
								duration: 0.65,
								ease: "power2.out",
							});
						}
					};

					tile.addEventListener("mousemove", onMove);
					tile.addEventListener("mouseleave", onLeave);
					cleanups.push(() => {
						tile.removeEventListener("mousemove", onMove);
						tile.removeEventListener("mouseleave", onLeave);
					});
				});
			}

			if (tabsRef.current) {
				gsap.from(".skills-tab", {
					y: 24,
					opacity: 0,
					scale: 0.92,
					stagger: 0.08,
					duration: 0.55,
					ease: "back.out(1.4)",
					scrollTrigger: scrollTriggerBase({
						trigger: tabsRef.current,
						start: "top 90%",
						toggleActions: "play none none reverse",
					}),
					onComplete: () => moveTabIndicator(activeLaneRef.current, true),
				});
			}

			gsap.to(".skills-orb-1", {
				y: -100,
				x: 40,
				ease: "none",
				scrollTrigger: scrollTriggerBase({
					trigger: sectionRef.current,
					start: "top bottom",
					end: "bottom top",
					scrub: 1.2,
				}),
			});

			gsap.to(".skills-orb-2", {
				y: 80,
				x: -50,
				ease: "none",
				scrollTrigger: scrollTriggerBase({
					trigger: sectionRef.current,
					start: "top bottom",
					end: "bottom top",
					scrub: 0.8,
				}),
			});

			gsap.utils.toArray(".skills-card").forEach((card) => {
				const icon = card.querySelector(".skills-card-icon");
				const shine = card.querySelector(".skills-card-shine");

				const onEnter = () => {
					gsap.to(card, {
						y: -5,
						scale: 1.02,
						duration: 0.35,
						ease: "power2.out",
						overwrite: "auto",
					});
					if (icon) {
						gsap.to(icon, {
							rotate: 8,
							scale: 1.08,
							duration: 0.35,
							ease: "back.out(2)",
							overwrite: "auto",
						});
					}
					if (shine) {
						gsap.to(shine, { opacity: 0.45, duration: 0.3 });
					}
				};

				const onLeave = () => {
					gsap.to(card, {
						y: 0,
						scale: 1,
						duration: 0.4,
						ease: "power2.out",
						overwrite: "auto",
					});
					if (icon) {
						gsap.to(icon, {
							rotate: 0,
							scale: 1,
							duration: 0.4,
							ease: "power2.out",
							overwrite: "auto",
						});
					}
					if (shine) {
						gsap.to(shine, { opacity: 0, duration: 0.3 });
					}
				};

				card.addEventListener("mouseenter", onEnter);
				card.addEventListener("mouseleave", onLeave);
				cleanups.push(() => {
					card.removeEventListener("mouseenter", onEnter);
					card.removeEventListener("mouseleave", onLeave);
				});
			});
		}, sectionRef);

		const onResize = () => moveTabIndicator(activeLaneRef.current, true);
		const onLenisReady = () => ScrollTrigger.refresh();
		window.addEventListener("resize", onResize);
		window.addEventListener("lenis-ready", onLenisReady);

		requestAnimationFrame(() => {
			moveTabIndicator(activeLaneRef.current, true);
			if (indicatorRef.current) {
				gsap.set(indicatorRef.current, { opacity: 1 });
			}
		});

		return () => {
			window.removeEventListener("resize", onResize);
			window.removeEventListener("lenis-ready", onLenisReady);
			panelTweenRef.current?.kill();
			for (const fn of cleanups) fn();
			ctx.revert();
		};
	}, [reduceMotion, moveTabIndicator]);

	useEffect(() => {
		if (reduceMotion) return;

		const raf = requestAnimationFrame(() => {
			animatePanel(activeLane);

			if (statusRef.current) {
				gsap.fromTo(
					statusRef.current,
					{ opacity: 0, y: 8 },
					{ opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
				);
			}
		});

		return () => cancelAnimationFrame(raf);
	}, [activeLane, animatePanel, reduceMotion]);

	return (
		<section
			id="skills"
			ref={sectionRef}
			className="skills-section relative w-full scroll-mt-28 overflow-x-clip px-4 py-16 sm:scroll-mt-32 sm:py-20 lg:py-28"
		>
			<div
				className="skills-orb-1 pointer-events-none absolute left-[8%] top-[12%] h-56 w-56 rounded-full bg-violet-500/12 blur-[90px]"
				aria-hidden
			/>
			<div
				className="skills-orb-2 pointer-events-none absolute bottom-[18%] right-[5%] h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1100px]">
				<header
					ref={headerRef}
					className="skills-header-block skills-header-perspective mb-10 md:mb-12"
				>
					<p className="section-eyebrow">
						<span
							className="skills-eyebrow-line h-px w-8 bg-gradient-to-r from-violet-400 to-cyan-400"
							aria-hidden
						/>
						<span className="skills-eyebrow-text">
							Skills
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								{" "}
								/ SEC 02
							</span>
						</span>
					</p>
					<h2 className="mt-3 font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white md:text-3xl lg:text-[2.35rem]">
						{TITLE_WORDS.map((word, i) => (
							<span
								key={word}
								className={`skills-title-word inline-block ${i >= 2 ? "text-gradient-future" : ""}`}
							>
								{word}
								{i < TITLE_WORDS.length - 1 ? "\u00a0" : ""}
							</span>
						))}
					</h2>
					<p className="skills-header-desc mt-3 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-400">
						Production stack across UI engineering, APIs, data layers, and
						delivery tooling — pick a lane to explore.
					</p>
				</header>

				<div ref={featuredRef} className="skills-featured-bento mb-8 md:mb-10">
					<p className="skills-featured-label mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
						Primary stack
					</p>
					<div className="skills-featured-grid grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
						{featured.map((item, i) => (
							<FeaturedTile key={item.title} item={item} large={i < 2} />
						))}
					</div>
				</div>

				<div
					ref={tabsRef}
					className="skills-tabs relative mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
					role="tablist"
					aria-label="Skill categories"
				>
					<div ref={indicatorRef} className="skills-tab-indicator" aria-hidden />
					{LANES.map((lane) => {
						const accent = ACCENT[lane.accent];
						const isActive = activeLane === lane.id;
						const count = skillItems.filter((s) => s.category === lane.id).length;
						return (
							<button
								key={lane.id}
								id={`skills-tab-${lane.id}`}
								type="button"
								role="tab"
								aria-selected={isActive}
								aria-controls={`skills-panel-${lane.id}`}
								onClick={() => handleTabClick(lane.id)}
								className={`skills-tab unstyled relative z-[1] overflow-hidden rounded-xl border px-3 py-3 text-left transition-colors duration-300 sm:px-4 sm:py-3.5 ${
									isActive
										? `border-transparent bg-transparent ${accent.text}`
										: "border-slate-200/70 bg-white/50 hover:border-slate-300/80 dark:border-white/8 dark:bg-slate-950/40 dark:hover:border-white/15"
								}`}
							>
								<span
									className={`font-mono text-[9px] uppercase tracking-[0.18em] transition ${isActive ? accent.text : "text-slate-400"}`}
								>
									{lane.index}
								</span>
								<span
									className={`mt-1 block text-sm font-semibold transition ${isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}
								>
									{lane.label}
								</span>
								<span className="mt-0.5 block font-mono text-[9px] text-slate-400">
									{count} skills
								</span>
							</button>
						);
					})}
				</div>

				<div className="skills-panels skills-panels-perspective">
					{lanesWithItems.map(({ lane, items }) => (
						<CategoryPanel
							key={lane.id}
							lane={lane}
							items={items}
							isActive={activeLane === lane.id}
						/>
					))}
				</div>

				{activeLaneData && (
					<p
						ref={statusRef}
						key={activeLane}
						className="skills-status mt-6 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400"
					>
						Showing {activeLaneData.items.length} in {activeLaneData.lane.label}
					</p>
				)}
			</div>
		</section>
	);
};

export default Skills;
