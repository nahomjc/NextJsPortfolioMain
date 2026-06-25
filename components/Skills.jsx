import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
	},
};

function accentForCategory(category) {
	if (category === "backend") return ACCENT.violet;
	if (category === "data") return ACCENT.fuchsia;
	if (category === "tools") return ACCENT.emerald;
	return ACCENT.cyan;
}

function SkillIcon({ item, size = 56 }) {
	const common = "shrink-0 object-contain transition duration-300 group-hover:scale-110";
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
			<div className="relative flex h-full flex-col rounded-[0.94rem] bg-white/85 p-4 dark:bg-slate-950/90 sm:p-5">
				<div
					className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${accent.bgSolid} opacity-60`}
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
					className={`mx-auto flex items-center justify-center rounded-2xl bg-slate-100/80 dark:bg-slate-900/70 ${large ? "my-5 h-20 w-20" : "my-4 h-14 w-14"}`}
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
			className={`skills-card group relative overflow-hidden rounded-xl border border-slate-200/70 bg-white/70 p-3.5 transition duration-300 dark:border-white/8 dark:bg-slate-950/55 sm:p-4 ${accent.glow}`}
		>
			<div
				className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-0 transition duration-300 group-hover:opacity-30 ${accent.text}`}
				aria-hidden
			/>
			<div className="flex items-center gap-3">
				<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-900/80">
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
				className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br p-px ${accent.border} ${accent.bg}`}
			>
				<div className="relative rounded-[0.94rem] bg-white/80 p-4 dark:bg-slate-950/85 sm:p-6">
					<header className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200/60 pb-4 dark:border-white/8">
						<div>
							<p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${accent.text}`}>
								{lane.index} — {lane.label}
							</p>
							<h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
								{lane.subtitle}
							</h3>
						</div>
						<span
							className={`rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-wider ${accent.border} ${accent.bgSolid} ${accent.text}`}
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

const Skills = () => {
	const reduceMotion = useReducedMotion();
	const [activeLane, setActiveLane] = useState("frontend");
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const featuredRef = useRef(null);
	const tabsRef = useRef(null);

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

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(".skills-header-block", {
				y: 40,
				opacity: 0,
				filter: "blur(8px)",
				duration: 0.85,
				ease: "power3.out",
				scrollTrigger: {
					trigger: headerRef.current,
					start: "top 88%",
					toggleActions: "play none none reverse",
				},
			});

			if (featuredRef.current) {
				gsap.from(".skills-featured-tile", {
					y: 36,
					opacity: 0,
					scale: 0.96,
					stagger: 0.07,
					duration: 0.7,
					ease: "power3.out",
					scrollTrigger: {
						trigger: featuredRef.current,
						start: "top 86%",
						toggleActions: "play none none reverse",
					},
				});
			}

			if (tabsRef.current) {
				gsap.from(".skills-tab", {
					y: 16,
					opacity: 0,
					stagger: 0.06,
					duration: 0.5,
					ease: "power3.out",
					scrollTrigger: {
						trigger: tabsRef.current,
						start: "top 88%",
						toggleActions: "play none none reverse",
					},
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [reduceMotion]);

	return (
		<section
			id="skills"
			ref={sectionRef}
			className="skills-section relative w-full scroll-mt-28 overflow-x-clip px-4 py-16 sm:scroll-mt-32 sm:py-20 lg:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[min(100%,48rem)] -translate-x-1/2 translate-y-1/2 rounded-full bg-cyan-400/8 blur-[100px]"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1100px]">
				<header ref={headerRef} className="skills-header-block mb-10 md:mb-12">
					<p className="section-eyebrow">
						<span
							className="h-px w-8 bg-gradient-to-r from-violet-400 to-cyan-400"
							aria-hidden
						/>
						Skills
						<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
							/ SEC 02
						</span>
					</p>
					<h2 className="mt-3 font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white md:text-3xl lg:text-[2.35rem]">
						What I{" "}
						<span className="text-gradient-future">Can Do</span>
					</h2>
					<p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-400">
						Production stack across UI engineering, APIs, data layers, and
						delivery tooling — pick a lane to explore.
					</p>
				</header>

				<div ref={featuredRef} className="skills-featured-bento mb-8 md:mb-10">
					<p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
						Primary stack
					</p>
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
						{featured.map((item, i) => (
							<FeaturedTile key={item.title} item={item} large={i < 2} />
						))}
					</div>
				</div>

				<div
					ref={tabsRef}
					className="skills-tabs mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
					role="tablist"
					aria-label="Skill categories"
				>
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
								onClick={() => setActiveLane(lane.id)}
								className={`skills-tab unstyled group relative overflow-hidden rounded-xl border px-3 py-3 text-left transition duration-300 sm:px-4 sm:py-3.5 ${
									isActive
										? `${accent.borderActive} ${accent.bgSolid} ring-1 ${accent.ring}`
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
								{isActive && (
									<span
										className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${accent.dot}`}
										aria-hidden
									/>
								)}
							</button>
						);
					})}
				</div>

				<div className="skills-panels">
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
					<p className="mt-6 text-center font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
						Showing {activeLaneData.items.length} in {activeLaneData.lane.label}
					</p>
				)}
			</div>
		</section>
	);
};

export default Skills;
