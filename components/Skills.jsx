import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	FaDatabase,
	FaNode,
	FaReact,
	FaServer,
	FaTools,
	FaBolt,
} from "react-icons/fa";
import {
	SiFirebase,
	SiMongodb,
	SiNextdotjs,
	SiPostgresql,
	SiSupabase,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import Css from "../public/assets/skills/css.png";
import Javascript from "../public/assets/skills/javascript.png";
import ReactImg from "../public/assets/skills/react.png";
import Tailwind from "../public/assets/skills/tailwind.png";
import Github from "../public/assets/skills/github1.png";
import Firebase from "../public/assets/skills/firebase.png";
import NextJS from "../public/assets/skills/nextjs.png";
import SectionShell, { monoMetaClass } from "./section/SectionShell";

const LANES = [
	{ id: "all", label: "All", code: "00" },
	{ id: "frontend", label: "Frontend", code: "01" },
	{ id: "backend", label: "Backend", code: "02" },
	{ id: "data", label: "Data", code: "03" },
	{ id: "tools", label: "Tools", code: "04" },
];

const skillItems = [
	{ title: "React", image: ReactImg, category: "frontend", level: 92, tag: "UI core" },
	{ title: "Next.js", image: NextJS, category: "frontend", level: 90, tag: "App framework" },
	{ title: "TypeScript", src: "/assets/skills/typescript.svg", category: "frontend", level: 85, tag: "Type safety" },
	{ title: "JavaScript", image: Javascript, category: "frontend", level: 90, tag: "Language" },
	{ title: "CSS", image: Css, category: "frontend", level: 88, tag: "Styling" },
	{ title: "Tailwind", image: Tailwind, category: "frontend", level: 90, tag: "Utility CSS" },
	{ title: "WordPress", src: "/assets/skills/wordpress.svg", category: "frontend", level: 72, tag: "CMS" },
	{ title: "Node.js", src: "/assets/skills/nodejs.svg", category: "backend", level: 85, tag: "Runtime" },
	{ title: "Express.js", src: "/assets/skills/express.svg", category: "backend", level: 82, tag: "HTTP layer" },
	{ title: "Hono", src: "/assets/skills/hono.svg", category: "backend", level: 80, tag: "Edge APIs" },
	{ title: "PostgreSQL", src: "/assets/skills/postgresql.svg", category: "data", level: 85, tag: "Primary SQL" },
	{ title: "Drizzle ORM", src: "/assets/skills/drizzle.svg", category: "data", level: 82, tag: "Type-safe ORM" },
	{ title: "MySQL", src: "/assets/skills/mysql.svg", category: "data", level: 78, tag: "Relational" },
	{ title: "Firebase", image: Firebase, category: "data", level: 70, tag: "Realtime" },
	{ title: "GitHub", image: Github, category: "tools", level: 88, tag: "Version control" },
	{ title: "GitLab", src: "/assets/skills/gitlab.svg", category: "tools", level: 75, tag: "CI / repos" },
];

const PILLARS = [
	{
		id: "frontend",
		title: "Frontend",
		icon: FaReact,
		color: "#22d3ee",
		items: [
			{ name: "React.js & Next.js", level: 89, icon: SiNextdotjs },
			{ name: "TailwindCSS & Mantine UI", level: 90, icon: SiTailwindcss },
			{ name: "TypeScript", level: 85, icon: SiTypescript },
			{ name: "Redux & Context API", level: 88, icon: FaReact },
			{ name: "Responsive Design", level: 80, icon: FaTools },
		],
	},
	{
		id: "backend",
		title: "Backend",
		icon: FaServer,
		color: "#38bdf8",
		items: [
			{ name: "Node.js & Express", level: 85, icon: FaNode },
			{ name: "Hono", level: 80, icon: FaBolt },
			{ name: "RESTful APIs", level: 90, icon: FaServer },
			{ name: "Auth & Authorization", level: 88, icon: FaTools },
		],
	},
	{
		id: "database",
		title: "Data & Cloud",
		icon: FaDatabase,
		color: "#67e8f9",
		items: [
			{ name: "PostgreSQL", level: 85, icon: SiPostgresql },
			{ name: "MongoDB", level: 82, icon: SiMongodb },
			{ name: "Drizzle ORM", level: 82, imageSrc: "/assets/skills/drizzle.svg" },
			{ name: "Supabase", level: 90, icon: SiSupabase },
			{ name: "Firebase", level: 70, icon: SiFirebase },
		],
	},
];

function SkillIcon({ item, size = 36 }) {
	const common = "object-contain";
	const alt = item.title ? `${item.title} logo` : "";
	if (item.image) {
		return (
			<Image
				src={item.image}
				width={size}
				height={size}
				alt={alt}
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
			alt={alt}
			unoptimized
			className={common}
			style={{ width: size, height: size }}
		/>
	);
}

function useInViewOnce(ref, rootMargin = "0px 0px -10% 0px") {
	const [inView, setInView] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el || typeof window === "undefined") return undefined;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					io.disconnect();
				}
			},
			{ rootMargin, threshold: 0.15 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [ref, rootMargin]);
	return inView;
}

function RingMeter({ value, reduceMotion, active }) {
	const r = 42;
	const c = 2 * Math.PI * r;
	const offset = c - (value / 100) * c;

	return (
		<svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100" aria-hidden>
			<circle
				cx="50"
				cy="50"
				r={r}
				fill="none"
				stroke="currentColor"
				strokeWidth="6"
				className="text-white/10"
			/>
			<circle
				cx="50"
				cy="50"
				r={r}
				fill="none"
				stroke="url(#stackRingGrad)"
				strokeWidth="6"
				strokeLinecap="round"
				strokeDasharray={c}
				strokeDashoffset={reduceMotion || active ? offset : c}
				style={{
					transition: reduceMotion
						? "none"
						: "stroke-dashoffset 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
				}}
			/>
			<defs>
				<linearGradient id="stackRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#22d3ee" />
					<stop offset="100%" stopColor="#38bdf8" />
				</linearGradient>
			</defs>
		</svg>
	);
}

const Skills = () => {
	const reduceMotion = useReducedMotion();
	const [lane, setLane] = useState("all");
	const [activeTitle, setActiveTitle] = useState("React");
	const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });
	const [barsLive, setBarsLive] = useState(false);
	const matrixRef = useRef(null);
	const pillarsRef = useRef(null);
	const pillarsInView = useInViewOnce(pillarsRef);

	const visible = useMemo(() => {
		if (lane === "all") return skillItems;
		return skillItems.filter((s) => s.category === lane);
	}, [lane]);

	const active = useMemo(
		() => skillItems.find((s) => s.title === activeTitle) || skillItems[0],
		[activeTitle],
	);

	const activeLane = LANES.find((l) => l.id === lane) || LANES[0];

	useEffect(() => {
		if (!visible.some((s) => s.title === activeTitle)) {
			setActiveTitle(visible[0]?.title || skillItems[0].title);
		}
	}, [visible, activeTitle]);

	useEffect(() => {
		if (pillarsInView) setBarsLive(true);
	}, [pillarsInView]);

	const onMatrixMove = (e) => {
		const el = matrixRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		const x = ((e.clientX - r.left) / r.width) * 100;
		const y = ((e.clientY - r.top) / r.height) * 100;
		setSpotlight({ x, y });
	};

	return (
		<SectionShell
			id="skills"
			index="02"
			eyebrow="skills.config"
			title="The stack I ship with"
			description="Interfaces, APIs, and data layers picked for speed, clarity, and maintainability."
			wide
		>
			<div className="stack-matrix relative overflow-hidden rounded-[1.35rem] border border-cyan-500/20 bg-[#050a12] shadow-[0_0_0_1px_rgba(34,211,238,0.06),0_40px_100px_-40px_rgba(0,0,0,0.85)]">
				<div className="stack-matrix__grid" aria-hidden />
				<div
					className="stack-matrix__spot"
					style={{
						background: `radial-gradient(520px circle at ${spotlight.x}% ${spotlight.y}%, rgba(34,211,238,0.16), transparent 55%)`,
					}}
					aria-hidden
				/>

				{/* Top bar */}
				<div className="relative z-[1] flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
					<div className="flex items-center gap-2">
						<span className="relative flex h-2 w-2" aria-hidden>
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/45" />
							<span className="relative h-2 w-2 rounded-full bg-cyan-400" />
						</span>
						<span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/90">
							stack.matrix · live
						</span>
					</div>
					<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
						lane {activeLane.code} · {visible.length} nodes
					</p>
				</div>

				<div className="relative z-[1] grid lg:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)]">
					{/* Interactive grid */}
					<div
						ref={matrixRef}
						onMouseMove={onMatrixMove}
						className="border-b border-white/10 p-4 sm:p-6 lg:border-b-0 lg:border-r"
					>
						<div
							className="mb-5 flex flex-wrap gap-1.5"
							role="tablist"
							aria-label="Skill categories"
						>
							{LANES.map((item) => {
								const on = lane === item.id;
								return (
									<button
										key={item.id}
										type="button"
										role="tab"
										aria-selected={on}
										onClick={() => setLane(item.id)}
										className={`unstyled rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition ${
											on
												? "border-cyan-400/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_20px_-8px_rgba(34,211,238,0.7)]"
												: "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
										}`}
									>
										<span className="mr-1.5 text-cyan-500/70">{item.code}</span>
										{item.label}
									</button>
								);
							})}
						</div>

						<ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
							<AnimatePresence mode="popLayout">
								{visible.map((item, i) => {
									const selected = item.title === active.title;
									return (
										<motion.li
											key={item.title}
											layout
											initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											exit={reduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
											transition={{
												duration: reduceMotion ? 0.12 : 0.35,
												delay: reduceMotion ? 0 : Math.min(i * 0.03, 0.24),
												ease: [0.22, 1, 0.36, 1],
											}}
										>
											<button
												type="button"
												onClick={() => setActiveTitle(item.title)}
												onMouseEnter={() => setActiveTitle(item.title)}
												className={`stack-node unstyled group relative w-full overflow-hidden rounded-xl border p-3 text-left transition sm:p-3.5 ${
													selected
														? "border-cyan-400/55 bg-cyan-400/10 shadow-[0_0_28px_-10px_rgba(34,211,238,0.75)]"
														: "border-white/10 bg-white/[0.03] hover:border-cyan-400/35 hover:bg-white/[0.06]"
												}`}
												aria-pressed={selected}
											>
												<span
													className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent opacity-0 transition group-hover:opacity-100"
													aria-hidden
												/>
												<span className="flex items-center gap-3">
													<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-950/60">
														<SkillIcon item={item} size={28} />
													</span>
													<span className="min-w-0">
														<span className="block truncate text-sm font-semibold text-white">
															{item.title}
														</span>
														<span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
															{item.category}
														</span>
													</span>
												</span>
												<span className="mt-3 flex items-center justify-between gap-2">
													<span className="font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-400/80">
														{item.tag}
													</span>
													<span className="font-mono text-[11px] tabular-nums text-cyan-300">
														{item.level}
													</span>
												</span>
												<span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-white/10">
													<span
														className="block h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-[width] duration-700"
														style={{
															width: selected || barsLive ? `${item.level}%` : "0%",
														}}
													/>
												</span>
											</button>
										</motion.li>
									);
								})}
							</AnimatePresence>
						</ul>
					</div>

					{/* Focus readout */}
					<aside className="flex flex-col justify-between gap-6 p-5 sm:p-6">
						<div>
							<p className={`${monoMetaClass} text-cyan-400`}>Active node</p>
							<AnimatePresence mode="wait">
								<motion.div
									key={active.title}
									initial={reduceMotion ? false : { opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
									transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
									className="mt-4"
								>
									<div className="flex items-start gap-4">
										<div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
											<RingMeter
												value={active.level}
												reduceMotion={reduceMotion}
												active={barsLive || Boolean(active)}
											/>
											<div className="absolute inset-0 flex flex-col items-center justify-center">
												<span className="font-mono text-2xl font-semibold tabular-nums text-white">
													{active.level}
												</span>
												<span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
													score
												</span>
											</div>
										</div>
										<div className="min-w-0 pt-2">
											<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10">
												<SkillIcon item={active} size={32} />
											</div>
											<h3 className="text-xl font-semibold tracking-tight text-white">
												{active.title}
											</h3>
											<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
												{active.category} · {active.tag}
											</p>
											<p className="mt-3 text-sm leading-relaxed text-slate-400">
												Hover or tap a node to inspect. Filters remap the matrix
												without leaving the console.
											</p>
										</div>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>

						<div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
							<p className={`${monoMetaClass} mb-3 text-slate-500`}>Signal map</p>
							<ul className="space-y-2">
								{LANES.filter((l) => l.id !== "all").map((l) => {
									const count = skillItems.filter((s) => s.category === l.id).length;
									const avg = Math.round(
										skillItems
											.filter((s) => s.category === l.id)
											.reduce((sum, s) => sum + s.level, 0) / count,
									);
									const on = lane === l.id || lane === "all";
									return (
										<li key={l.id}>
											<button
												type="button"
												onClick={() => setLane(l.id)}
												className={`unstyled flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-left transition ${
													lane === l.id
														? "bg-cyan-400/10 text-cyan-200"
														: "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
												}`}
											>
												<span className="font-mono text-[11px] uppercase tracking-[0.12em]">
													{l.label}
												</span>
												<span className="flex items-center gap-2">
													<span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
														<span
															className="block h-full rounded-full bg-cyan-400/80 transition-[width] duration-700"
															style={{ width: on && barsLive ? `${avg}%` : "0%" }}
														/>
													</span>
													<span className="w-7 text-right font-mono text-[10px] tabular-nums">
														{avg}
													</span>
												</span>
											</button>
										</li>
									);
								})}
							</ul>
						</div>
					</aside>
				</div>
			</div>

			{/* Proficiency pillars */}
			<div ref={pillarsRef} className="mt-16 md:mt-20">
				<div className="mb-8 flex items-end justify-between gap-4 border-b border-slate-900/10 pb-4 dark:border-white/10">
					<div>
						<p className={monoMetaClass}>Proficiency</p>
						<h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
							Depth by pillar
						</h3>
					</div>
					<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
						scrub on view
					</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-3">
					{PILLARS.map((pillar) => {
						const Icon = pillar.icon;
						return (
							<div
								key={pillar.id}
								className="stack-pillar group relative overflow-hidden rounded-2xl border border-slate-900/10 bg-white/60 p-5 dark:border-white/10 dark:bg-[#0a1220]/70 sm:p-6"
							>
								<div
									className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-3xl transition group-hover:opacity-70"
									style={{ background: pillar.color }}
									aria-hidden
								/>
								<div className="relative mb-6 flex items-center gap-3">
									<span
										className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
										style={{ color: pillar.color }}
									>
										<Icon aria-hidden />
									</span>
									<h4 className="text-base font-semibold text-slate-900 dark:text-white">
										{pillar.title}
									</h4>
								</div>
								<ul className="relative space-y-5">
									{pillar.items.map((skill) => {
										const SkillIconCmp = skill.icon;
										return (
											<li key={skill.name}>
												<div className="mb-2 flex items-center justify-between gap-2">
													<span className="flex min-w-0 items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
														{SkillIconCmp ? (
															<SkillIconCmp
																className="shrink-0 text-slate-400"
																aria-hidden
															/>
														) : skill.imageSrc ? (
															<Image
																src={skill.imageSrc}
																width={14}
																height={14}
																alt=""
																unoptimized
																className="shrink-0"
															/>
														) : null}
														<span className="truncate">{skill.name}</span>
													</span>
													<span className="font-mono text-[11px] tabular-nums text-cyan-700 dark:text-cyan-400">
														{skill.level}
													</span>
												</div>
												<div className="h-1.5 overflow-hidden rounded-full bg-slate-200/90 dark:bg-white/10">
													<div
														className="h-full rounded-full transition-[width] duration-1000 ease-out"
														style={{
															width: barsLive ? `${skill.level}%` : "0%",
															background: `linear-gradient(90deg, ${pillar.color}, #38bdf8)`,
														}}
													/>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</SectionShell>
	);
};

export default Skills;
