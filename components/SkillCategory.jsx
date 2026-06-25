import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollTriggerBase } from "../lib/gsapScroll";
import {
	FaBolt,
	FaDatabase,
	FaNode,
	FaReact,
	FaServer,
	FaTools,
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

const PILLARS = [
	{
		id: "frontend",
		title: "Frontend Development",
		categoryKey: "FE / UI",
		icon: FaReact,
		color: "#22d3ee",
		accent: "cyan",
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
		title: "Backend Development",
		categoryKey: "BE / API",
		icon: FaServer,
		color: "#8b5cf6",
		accent: "violet",
		items: [
			{ name: "Node.js & Express", level: 85, icon: FaNode },
			{ name: "Hono", level: 80, icon: FaBolt },
			{ name: "RESTful APIs", level: 90, icon: FaServer },
			{ name: "Authentication & Authorization", level: 88, icon: FaTools },
		],
	},
	{
		id: "database",
		title: "Database & Cloud",
		categoryKey: "DATA / OPS",
		icon: FaDatabase,
		color: "#e879f9",
		accent: "fuchsia",
		items: [
			{ name: "PostgreSQL", level: 85, icon: SiPostgresql },
			{ name: "MongoDB", level: 82, icon: SiMongodb },
			{
				name: "Drizzle ORM",
				level: 82,
				imageSrc: "/assets/skills/drizzle.svg",
			},
			{ name: "Supabase", level: 90, icon: SiSupabase },
			{ name: "Firebase", level: 70, icon: SiFirebase },
		],
	},
];

const corner =
	"pointer-events-none absolute z-20 h-5 w-5 border-cyan-400/70 dark:border-cyan-400/55";

function HudCorners() {
	return (
		<>
			<span className={`${corner} left-2 top-2 border-l-2 border-t-2`} aria-hidden />
			<span className={`${corner} right-2 top-2 border-r-2 border-t-2`} aria-hidden />
			<span className={`${corner} bottom-2 left-2 border-b-2 border-l-2`} aria-hidden />
			<span className={`${corner} bottom-2 right-2 border-b-2 border-r-2`} aria-hidden />
		</>
	);
}

function SplitWords({ text, className = "" }) {
	return text.split(" ").map((word, i) => (
		<span key={`${word}-${i}`} className="tech-word-wrap inline-block overflow-hidden">
			<span
				className={`tech-word inline-block text-slate-900 dark:text-white ${className}`}
			>
				{word}&nbsp;
			</span>
		</span>
	));
}

function tierForLevel(level) {
	if (level >= 90) return { label: "Master", tone: "text-fuchsia-500 dark:text-fuchsia-400" };
	if (level >= 85) return { label: "Expert", tone: "text-cyan-600 dark:text-cyan-400" };
	if (level >= 80) return { label: "Advanced", tone: "text-violet-600 dark:text-violet-400" };
	return { label: "Proficient", tone: "text-slate-500 dark:text-slate-400" };
}

function avgLevel(items) {
	return Math.round(items.reduce((s, i) => s + i.level, 0) / items.length);
}

function StackRing({ value, reduceMotion }) {
	const ringRef = useRef(null);
	const numRef = useRef(null);
	const circumference = 2 * Math.PI * 54;

	useEffect(() => {
		if (reduceMotion || !ringRef.current) return;

		const ctx = gsap.context(() => {
			const offset = circumference - (value / 100) * circumference;
			gsap.fromTo(
				ringRef.current,
				{ strokeDashoffset: circumference },
				{
					strokeDashoffset: offset,
					duration: 1.6,
					ease: "power2.out",
					scrollTrigger: scrollTriggerBase({
						trigger: ringRef.current,
						start: "top 88%",
					}),
				}
			);
			if (numRef.current) {
				const obj = { val: 0 };
				gsap.to(obj, {
					val: value,
					duration: 1.6,
					ease: "power2.out",
					scrollTrigger: scrollTriggerBase({
						trigger: ringRef.current,
						start: "top 88%",
					}),
					onUpdate: () => {
						if (numRef.current) numRef.current.textContent = String(Math.round(obj.val));
					},
				});
			}
		});

		return () => ctx.revert();
	}, [value, reduceMotion, circumference]);

	return (
		<div className="tech-stack-ring relative mx-auto flex h-[140px] w-[140px] items-center justify-center">
			<svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
				<circle
					cx="60"
					cy="60"
					r="54"
					fill="none"
					stroke="currentColor"
					strokeWidth="6"
					className="text-slate-400/40 dark:text-white/10"
				/>
				<circle
					ref={ringRef}
					cx="60"
					cy="60"
					r="54"
					fill="none"
					stroke="url(#techRingGrad)"
					strokeWidth="6"
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={reduceMotion ? circumference - (value / 100) * circumference : circumference}
				/>
				<defs>
					<linearGradient id="techRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#22d3ee" />
						<stop offset="50%" stopColor="#8b5cf6" />
						<stop offset="100%" stopColor="#e879f9" />
					</linearGradient>
				</defs>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<span
					ref={numRef}
					className="font-display text-3xl font-bold tabular-nums text-slate-900 dark:text-white"
				>
					{reduceMotion ? value : 0}
				</span>
				<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
					Stack avg
				</span>
			</div>
		</div>
	);
}

function SkillMeter({ skill, pillarColor, reduceMotion }) {
	const rowRef = useRef(null);
	const fillRef = useRef(null);
	const numRef = useRef(null);
	const [hovered, setHovered] = useState(false);
	const tier = tierForLevel(skill.level);
	const Icon = skill.icon;

	useEffect(() => {
		if (reduceMotion || !rowRef.current || !fillRef.current) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				fillRef.current,
				{ scaleX: 0 },
				{
					scaleX: skill.level / 100,
					ease: "power2.out",
					duration: 1.1,
					scrollTrigger: scrollTriggerBase({
						trigger: rowRef.current,
						start: "top 92%",
					}),
				}
			);

			if (numRef.current) {
				const obj = { val: 0 };
				gsap.to(obj, {
					val: skill.level,
					duration: 1.1,
					ease: "power2.out",
					scrollTrigger: scrollTriggerBase({
						trigger: rowRef.current,
						start: "top 92%",
					}),
					onUpdate: () => {
						if (numRef.current) numRef.current.textContent = String(Math.round(obj.val));
					},
				});
			}
		}, rowRef);

		return () => ctx.revert();
	}, [skill.level, reduceMotion]);

	return (
		<div
			ref={rowRef}
			className="tech-skill-row group relative rounded-xl border border-transparent p-3 transition hover:border-slate-200/80 hover:bg-white/50 dark:hover:border-white/10 dark:hover:bg-slate-950/40"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="mb-3 flex items-center gap-3">
				<div
					className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200/80 bg-slate-100/90 dark:border-white/10 dark:bg-slate-950/60"
					style={{
						boxShadow: hovered ? `0 0 20px ${pillarColor}44` : undefined,
					}}
				>
					{skill.imageSrc ? (
						<Image
							src={skill.imageSrc}
							width={22}
							height={22}
							alt=""
							unoptimized
							className="object-contain"
						/>
					) : (
						<Icon className="text-lg" style={{ color: pillarColor }} aria-hidden />
					)}
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-baseline justify-between gap-2">
						<span className="truncate text-sm font-medium text-slate-900 dark:text-slate-50 md:text-base">
							{skill.name}
						</span>
						<span className="font-mono text-xs tabular-nums text-cyan-600 dark:text-cyan-400">
							<span ref={numRef}>{reduceMotion ? skill.level : 0}</span>
							<span className="text-slate-400 dark:text-slate-500">%</span>
						</span>
					</div>
					<p className={`mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${tier.tone}`}>
						{tier.label}
					</p>
				</div>
				<div
					className="tech-skill-ring hidden h-11 w-11 shrink-0 sm:block"
					aria-hidden
				>
					<svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
						<circle
							cx="18"
							cy="18"
							r="15"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							className="text-slate-400/40 dark:text-white/10"
						/>
						<circle
							cx="18"
							cy="18"
							r="15"
							fill="none"
							stroke={pillarColor}
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeDasharray={94.2}
							strokeDashoffset={94.2 - (skill.level / 100) * 94.2}
							className="transition-all duration-500 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]"
						/>
					</svg>
				</div>
			</div>
			<div className="relative h-2.5 overflow-hidden rounded-full border border-slate-200/80 bg-slate-100/90 shadow-inner dark:border-white/10 dark:bg-slate-950/70">
				<div
					ref={fillRef}
					className="tech-skill-fill absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
					style={{
						transform: reduceMotion ? `scaleX(${skill.level / 100})` : undefined,
					}}
				>
					{!reduceMotion ? (
						<span
							className="tech-skill-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
							aria-hidden
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}

function PillarPanel({ pillar, panelRef, reduceMotion }) {
	const Icon = pillar.icon;
	const average = avgLevel(pillar.items);

	return (
		<article
			ref={panelRef}
			id={`tech-pillar-${pillar.id}`}
			className="tech-pillar-panel scroll-mt-32"
			data-pillar={pillar.id}
		>
			<div className="relative">
				<div
					className="absolute -inset-[1px] rounded-2xl opacity-60 blur-sm"
					style={{
						background: `linear-gradient(135deg, ${pillar.color}22, transparent 55%, ${pillar.color}18)`,
					}}
					aria-hidden
				/>
				<div className="relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark">
					<HudCorners />
					<div
						className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute inset-y-0 left-0 w-1"
						style={{ backgroundColor: pillar.color }}
						aria-hidden
					/>

					<div className="relative border-b border-slate-200/80 px-5 py-4 dark:border-white/10 md:px-6 md:py-5">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<div className="flex items-center gap-3">
								<div
									className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 shadow-lg"
									style={{
										backgroundColor: pillar.color,
										boxShadow: `0 0 24px ${pillar.color}44`,
									}}
								>
									<Icon className="text-xl text-white" aria-hidden />
								</div>
								<div>
									<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
										{pillar.categoryKey}
									</p>
									<h3 className="font-display text-lg font-bold text-slate-900 dark:text-white md:text-xl">
										{pillar.title}
									</h3>
								</div>
							</div>
							<div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-2 text-right dark:border-white/10 dark:bg-slate-950/50">
								<p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
									Pillar avg
								</p>
								<p
									className="font-display text-2xl font-bold tabular-nums"
									style={{ color: pillar.color }}
								>
									{average}
									<span className="text-sm font-semibold text-slate-400">%</span>
								</p>
							</div>
						</div>
					</div>

					<div className="relative space-y-2 p-4 md:space-y-3 md:p-6">
						{pillar.items.map((skill) => (
							<SkillMeter
								key={skill.name}
								skill={skill}
								pillarColor={pillar.color}
								reduceMotion={reduceMotion}
							/>
						))}
					</div>
				</div>
			</div>
		</article>
	);
}

const SkillsProgress = () => {
	const reduceMotion = useReducedMotion();
	const [activePillar, setActivePillar] = useState("frontend");

	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const progressRef = useRef(null);
	const bodyGridRef = useRef(null);
	const diagnosticsRef = useRef(null);
	const panelsColRef = useRef(null);
	const panelRefs = useRef([]);
	const sidebarRefs = useRef([]);

	const allSkills = useMemo(
		() => PILLARS.flatMap((p) => p.items),
		[]
	);
	const stackAverage = useMemo(() => avgLevel(allSkills), [allSkills]);

	const scrollToPillar = (id) => {
		const el = document.getElementById(`tech-pillar-${id}`);
		if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
		setActivePillar(id);
	};

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				if (
					!diagnosticsRef.current ||
					!panelsColRef.current ||
					!bodyGridRef.current
				) {
					return;
				}

				const pinStart = "top 7.5rem";

				ScrollTrigger.create(
					scrollTriggerBase({
						trigger: panelsColRef.current,
						start: pinStart,
						end: () => {
							const cardH = diagnosticsRef.current?.offsetHeight ?? 0;
							return `bottom-=${cardH} top`;
						},
						pin: diagnosticsRef.current,
						pinSpacing: false,
						invalidateOnRefresh: true,
						anticipatePin: 1,
						onToggle: (self) => {
							diagnosticsRef.current?.classList.toggle(
								"is-floating",
								self.isActive,
							);
						},
					}),
				);
			});

			gsap.fromTo(
				".tech-word",
				{ yPercent: 110, opacity: 0 },
				{
					yPercent: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.04,
					ease: "power3.out",
					scrollTrigger: scrollTriggerBase({
						trigger: headerRef.current,
						start: "top 88%",
						toggleActions: "play none none none",
					}),
				},
			);

			if (progressRef.current && sectionRef.current) {
				gsap.fromTo(
					progressRef.current,
					{ scaleX: 0 },
					{
						scaleX: 1,
						ease: "none",
						scrollTrigger: scrollTriggerBase({
							trigger: sectionRef.current,
							start: "top 75%",
							end: "bottom 25%",
							scrub: 0.45,
						}),
					},
				);
			}

			panelRefs.current.forEach((panel, i) => {
				if (!panel) return;
				ScrollTrigger.create(
					scrollTriggerBase({
						trigger: panel,
						start: "top 55%",
						end: "bottom 45%",
						onEnter: () => setActivePillar(PILLARS[i].id),
						onEnterBack: () => setActivePillar(PILLARS[i].id),
					}),
				);
			});
		}, sectionRef);

		const onLenisReady = () => ScrollTrigger.refresh();
		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 800);
		window.addEventListener("lenis-ready", onLenisReady);

		return () => {
			window.clearTimeout(refreshTimer);
			window.removeEventListener("lenis-ready", onLenisReady);
			ctx.revert();
		};
	}, [reduceMotion]);

	return (
		<section
			id="technical-skills"
			ref={sectionRef}
			className="tech-skills-section relative scroll-mt-24 px-4 py-20 md:py-28 lg:min-h-screen"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.3] dark:opacity-[0.18]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute right-0 top-1/3 h-[min(90vw,520px)] w-[min(90vw,520px)] translate-x-1/4 rounded-full bg-cyan-400/10 blur-[115px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-1/4 left-0 h-[min(75vw,440px)] w-[min(75vw,440px)] -translate-x-1/3 rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/16"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent dark:via-cyan-400/25"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1240px]">
				<div
					ref={headerRef}
					className="mb-10 border-b border-slate-200/80 pb-10 dark:border-white/10 md:mb-12 lg:mb-14"
				>
					<p className="section-eyebrow justify-center lg:justify-start">
						<span
							className="h-px w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500"
							aria-hidden
						/>
						Proficiency
						<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
							/ SEC 03
						</span>
					</p>
					<div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
						<div className="text-center lg:text-left">
							<h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white md:text-4xl lg:text-[2.75rem]">
								<SplitWords text="Technical" />
								<span className="text-gradient-future">
									<SplitWords text="Skills" />
								</span>
							</h2>
							<p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400 lg:mx-0">
								Depth across the stack — UI, services, data, and auth. Hover each
								readout for tier labels; bars animate as you scroll.
							</p>
							<p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
								Readout · relative scale · not certification
							</p>
						</div>
						<div className="flex justify-center gap-3 lg:justify-end">
							<div className="rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-950/40">
								<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
									Skills tracked
								</p>
								<p className="mt-1 font-display text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
									{allSkills.length}
								</p>
							</div>
							<div className="rounded-xl border border-violet-400/25 bg-violet-500/[0.06] px-4 py-3">
								<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet-600/80 dark:text-violet-400/80">
									Pillars
								</p>
								<p className="mt-1 font-display text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
									{PILLARS.length}
								</p>
							</div>
						</div>
					</div>
					<div
						ref={progressRef}
						className="tech-section-progress mt-8 h-px origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
						aria-hidden
					/>
				</div>

				<div
					ref={bodyGridRef}
					className="tech-skills-body grid gap-10 lg:grid-cols-[minmax(240px,280px)_1fr] lg:gap-12 xl:gap-16"
				>
					<aside className="tech-skills-sidebar relative">
						<div
							ref={diagnosticsRef}
							className="tech-diagnostics-card mx-auto w-full max-w-[280px] rounded-2xl border border-slate-200/85 bg-white/70 p-5 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark lg:mx-0 lg:max-h-[min(32rem,calc(100dvh-8.5rem))] lg:overflow-y-auto"
						>
							<HudCorners />
							<p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
								Diagnostics
							</p>
							<StackRing value={stackAverage} reduceMotion={reduceMotion} />

							<nav
								className="mt-6 space-y-2"
								aria-label="Skill pillars"
							>
								{PILLARS.map((pillar, i) => {
									const Icon = pillar.icon;
									const avg = avgLevel(pillar.items);
									const isActive = activePillar === pillar.id;
									return (
										<button
											key={pillar.id}
											type="button"
											ref={(el) => {
												sidebarRefs.current[i] = el;
											}}
											onClick={() => scrollToPillar(pillar.id)}
											className={`tech-pillar-nav unstyled flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition ${
												isActive
													? "border-cyan-400/35 bg-cyan-500/[0.08] shadow-[0_0_20px_rgba(34,211,238,0.08)]"
													: "border-transparent bg-transparent hover:border-slate-200/80 hover:bg-white/50 dark:hover:border-white/10 dark:hover:bg-slate-950/40"
											}`}
										>
											<div
												className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
												style={{
													backgroundColor: `${pillar.color}22`,
													color: pillar.color,
												}}
											>
												<Icon className="text-sm" aria-hidden />
											</div>
											<div className="min-w-0 flex-1">
												<p className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
													{pillar.categoryKey}
												</p>
												<p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-50">
													{pillar.title.split(" ")[0]}
												</p>
											</div>
											<span
												className="font-mono text-sm font-bold tabular-nums"
												style={{ color: pillar.color }}
											>
												{avg}%
											</span>
										</button>
									);
								})}
							</nav>

							<div className="mt-5 border-t border-slate-200/80 pt-4 dark:border-white/10">
								<p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
									Signal
								</p>
								<p className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
									<span className="relative flex h-1.5 w-1.5">
										<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
										<span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
									</span>
									Calibrated
								</p>
							</div>
						</div>

						<div className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
							{PILLARS.map((pillar) => (
								<button
									key={pillar.id}
									type="button"
									onClick={() => scrollToPillar(pillar.id)}
									className={`unstyled shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] ${
										activePillar === pillar.id
											? "border-cyan-400/40 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
											: "border-slate-200/80 text-slate-500 dark:border-white/10"
									}`}
								>
									{pillar.categoryKey}
								</button>
							))}
						</div>
					</aside>

					<div ref={panelsColRef} className="tech-skills-panels space-y-8 lg:space-y-10">
						{PILLARS.map((pillar, i) => (
							<PillarPanel
								key={pillar.id}
								pillar={pillar}
								reduceMotion={reduceMotion}
								panelRef={(el) => {
									panelRefs.current[i] = el;
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default SkillsProgress;
