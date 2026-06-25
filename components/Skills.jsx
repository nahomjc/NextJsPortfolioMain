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
		border: "border-cyan-400/30",
		bg: "from-cyan-500/12 to-cyan-400/5",
		text: "text-cyan-600 dark:text-cyan-400",
		glow: "group-hover:border-cyan-400/45 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]",
		lane: "skills-lane--cyan",
	},
	violet: {
		border: "border-violet-400/30",
		bg: "from-violet-500/12 to-violet-400/5",
		text: "text-violet-600 dark:text-violet-400",
		glow: "group-hover:border-violet-400/45 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.12)]",
		lane: "skills-lane--violet",
	},
	fuchsia: {
		border: "border-fuchsia-400/30",
		bg: "from-fuchsia-500/12 to-fuchsia-400/5",
		text: "text-fuchsia-600 dark:text-fuchsia-400",
		glow: "group-hover:border-fuchsia-400/45 group-hover:shadow-[0_0_24px_rgba(217,70,239,0.12)]",
		lane: "skills-lane--fuchsia",
	},
	emerald: {
		border: "border-emerald-400/30",
		bg: "from-emerald-500/12 to-emerald-400/5",
		text: "text-emerald-600 dark:text-emerald-400",
		glow: "group-hover:border-emerald-400/45 group-hover:shadow-[0_0_24px_rgba(52,211,153,0.12)]",
		lane: "skills-lane--emerald",
	},
};

function SkillIcon({ item, size = 56 }) {
	const common = "shrink-0 object-contain transition duration-300 group-hover:scale-105";
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

function SkillToken({ item, accentKey }) {
	const accent = ACCENT[accentKey];
	return (
		<div
			className={`skills-token group flex shrink-0 items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1.5 shadow-sm backdrop-blur-sm transition duration-300 sm:gap-2.5 sm:px-3 sm:py-2 dark:border-white/10 dark:bg-slate-900/60 ${accent.glow}`}
		>
			<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100/90 sm:h-8 sm:w-8 dark:bg-slate-950/80">
				<SkillIcon item={item} size={18} />
			</span>
			<span className="whitespace-nowrap text-xs font-medium text-slate-800 sm:text-sm dark:text-slate-100">
				{item.title}
			</span>
			<span className="hidden font-mono text-[9px] uppercase tracking-wider text-slate-400 sm:inline">
				{item.tag}
			</span>
		</div>
	);
}

function FeaturedCard({ item }) {
	const accent = ACCENT[item.category === "data" ? "fuchsia" : item.category === "backend" ? "violet" : item.category === "tools" ? "emerald" : "cyan"];
	return (
		<article
			className={`skills-featured-card group relative shrink-0 snap-center overflow-hidden rounded-2xl border bg-gradient-to-br p-[1px] ${accent.border} ${accent.bg}`}
		>
			<div className="relative flex h-full w-[8.75rem] flex-col rounded-[0.94rem] bg-white/80 p-3.5 dark:bg-slate-950/85 sm:w-[10.5rem] sm:p-4">
				<span className={`font-mono text-[9px] uppercase tracking-[0.18em] ${accent.text}`}>
					Core
				</span>
				<div className="mx-auto my-3 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100/90 dark:bg-slate-900/70">
					<SkillIcon item={item} size={36} />
				</div>
				<h3 className="text-center text-sm font-semibold text-slate-900 dark:text-white">
					{item.title}
				</h3>
				<p className="mt-1 text-center font-mono text-[9px] uppercase tracking-wider text-slate-400">
					{item.tag}
				</p>
			</div>
		</article>
	);
}

function SkillLane({ lane, items, laneRef }) {
	const accent = ACCENT[lane.accent];
	return (
		<article
			ref={laneRef}
			id={`skills-lane-${lane.id}`}
			className={`skills-lane ${accent.lane} relative scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/45 dark:border-white/10 dark:bg-slate-950/35 sm:scroll-mt-32`}
		>
			<span
				className="skills-lane-watermark pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 font-display text-[3.25rem] font-bold leading-none text-slate-900/[0.04] sm:-right-2 sm:text-[5.5rem] dark:text-white/[0.04]"
				aria-hidden
			>
				{lane.index}
			</span>
			<div className="skills-lane-inner relative flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
				<div className="skills-lane-meta shrink-0 sm:w-44 lg:w-52">
					<p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${accent.text}`}>
						{lane.index} · {lane.label}
					</p>
					<h3 className="mt-1 font-display text-base font-bold text-slate-900 sm:text-lg dark:text-white">
						{lane.label}
					</h3>
					<p className="mt-1 text-[11px] leading-relaxed text-slate-500 sm:text-xs dark:text-slate-400">
						{lane.subtitle}
					</p>
					<p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-slate-400">
						{items.length} modules
						<span className="sm:hidden"> · swipe</span>
					</p>
				</div>
				<div className="skills-lane-track min-w-0 flex-1 overflow-hidden">
					<div className="skills-lane-tokens flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-x-visible sm:pb-0 sm:gap-2.5">
						{items.map((item) => (
							<SkillToken key={item.title} item={item} accentKey={lane.accent} />
						))}
					</div>
				</div>
			</div>
			<div
				className={`skills-lane-beam pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${accent.bg} opacity-80`}
				aria-hidden
			/>
		</article>
	);
}

const Skills = () => {
	const reduceMotion = useReducedMotion();
	const [activeLane, setActiveLane] = useState("frontend");
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const featuredRef = useRef(null);
	const laneRefs = useRef([]);
	const indexFillRef = useRef(null);

	const featured = useMemo(() => skillItems.filter((s) => s.featured), []);
	const lanesWithItems = useMemo(
		() =>
			LANES.map((lane) => ({
				lane,
				items: skillItems.filter((s) => s.category === lane.id),
			})),
		[]
	);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const isMobileLayout = window.matchMedia("(max-width: 639px)").matches;

		const ctx = gsap.context(() => {
			gsap.from(".skills-header-block", {
				y: 48,
				opacity: 0,
				filter: "blur(10px)",
				duration: 0.9,
				ease: "power3.out",
				scrollTrigger: {
					trigger: headerRef.current,
					start: "top 88%",
					toggleActions: "play none none reverse",
				},
			});

			if (featuredRef.current) {
				gsap.from(".skills-featured-card", {
					y: 56,
					opacity: 0,
					rotateX: 12,
					stagger: 0.08,
					duration: 0.75,
					ease: "power3.out",
					transformOrigin: "50% 100%",
					scrollTrigger: {
						trigger: featuredRef.current,
						start: "top 86%",
						toggleActions: "play none none reverse",
					},
				});
			}

			laneRefs.current.filter(Boolean).forEach((laneEl, i) => {
				const tokens = laneEl.querySelectorAll(".skills-token");
				const meta = laneEl.querySelector(".skills-lane-meta");
				const watermark = laneEl.querySelector(".skills-lane-watermark");
				const fromX = i % 2 === 0 ? -72 : 72;

				if (isMobileLayout) {
					gsap.from(laneEl, {
						y: 28,
						opacity: 0,
						duration: 0.55,
						ease: "power3.out",
						scrollTrigger: {
							trigger: laneEl,
							start: "top 92%",
							toggleActions: "play none none reverse",
						},
					});
				} else {
					gsap.fromTo(
						laneEl,
						{ clipPath: "inset(0 100% 0 0 round 16px)", opacity: 0.5 },
						{
							clipPath: "inset(0 0% 0 0 round 16px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: laneEl,
								start: "top 90%",
								end: "top 58%",
								scrub: 0.65,
							},
						},
					);
				}

				if (meta) {
					gsap.from(meta, {
						x: fromX * 0.35,
						opacity: 0,
						duration: 0.65,
						ease: "power3.out",
						scrollTrigger: {
							trigger: laneEl,
							start: "top 82%",
							toggleActions: "play none none reverse",
						},
					});
				}

				gsap.from(tokens, {
					x: fromX,
					opacity: 0,
					stagger: 0.045,
					duration: 0.55,
					ease: "power3.out",
					scrollTrigger: {
						trigger: laneEl,
						start: "top 80%",
						toggleActions: "play none none reverse",
					},
				});

				if (watermark) {
					gsap.fromTo(
						watermark,
						{ x: 40, opacity: 0.02 },
						{
							x: 0,
							opacity: 0.06,
							ease: "none",
							scrollTrigger: {
								trigger: laneEl,
								start: "top 85%",
								end: "top 35%",
								scrub: 0.5,
							},
						}
					);
				}
			});

			if (indexFillRef.current && sectionRef.current) {
				gsap.fromTo(
					indexFillRef.current,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 70%",
							end: "bottom 30%",
							scrub: 0.4,
						},
					}
				);
			}
		}, sectionRef);

		return () => ctx.revert();
	}, [reduceMotion]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		let observer;
		const raf = requestAnimationFrame(() => {
			const laneEls = laneRefs.current.filter(Boolean);
			if (!laneEls.length) return;

			observer = new IntersectionObserver(
				(entries) => {
					const visible = entries
						.filter((entry) => entry.isIntersecting)
						.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
					if (!visible.length) return;
					const id = visible[0].target.id.replace("skills-lane-", "");
					setActiveLane(id);
				},
				{ rootMargin: "-35% 0px -40% 0px", threshold: [0.15, 0.4] },
			);

			for (const el of laneEls) observer.observe(el);
		});

		return () => {
			cancelAnimationFrame(raf);
			observer?.disconnect();
		};
	}, [lanesWithItems.length]);

	const scrollToLane = (id) => {
		setActiveLane(id);
		const el = document.getElementById(`skills-lane-${id}`);
		el?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
	};

	return (
		<section
			id="skills"
			ref={sectionRef}
			className="skills-section relative w-full scroll-mt-28 overflow-x-clip px-4 py-16 sm:scroll-mt-32 sm:py-20 lg:min-h-screen lg:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.025)_1px,transparent_1px)] bg-[length:40px_40px] opacity-60 dark:opacity-40"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-cyan-400/10 blur-[100px]"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1180px]">
				<div className="grid gap-10 lg:grid-cols-[4.5rem_1fr] lg:gap-12">
					<aside className="skills-index hidden lg:flex lg:flex-col lg:items-center lg:pt-2">
						<div className="relative flex h-full min-h-[18rem] flex-col items-center">
							<div className="absolute inset-y-0 w-px bg-slate-200/80 dark:bg-white/10" />
							<div
								ref={indexFillRef}
								className="skills-index-fill absolute inset-x-0 top-0 w-px origin-top bg-gradient-to-b from-cyan-400 via-violet-400 to-fuchsia-500"
								aria-hidden
							/>
							{LANES.map((lane) => (
								<button
									key={lane.id}
									type="button"
									onClick={() => scrollToLane(lane.id)}
									className="skills-index-dot relative z-[1] my-5 flex flex-col items-center gap-1.5"
									aria-label={`Jump to ${lane.label}`}
								>
									<span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 font-mono text-[10px] text-slate-500 transition hover:border-cyan-400/40 hover:text-cyan-600 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-400 dark:hover:text-cyan-400">
										{lane.index}
									</span>
								</button>
							))}
						</div>
					</aside>

					<div className="min-w-0">
						<header ref={headerRef} className="skills-header-block mb-8 md:mb-12">
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
							<p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
								Production stack across UI engineering, APIs, data layers, and
								delivery tooling — organized by how I actually ship work.
							</p>
							<div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
								<span className="rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:border-white/10 dark:bg-slate-950/50">
									{skillItems.length} technologies
								</span>
								<span className="rounded-full border border-emerald-400/25 bg-emerald-500/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
									Production ready
								</span>
							</div>
						</header>

						<nav
							className="skills-mobile-nav mb-8 flex gap-2 overflow-x-auto pb-1 lg:hidden"
							aria-label="Skill categories"
						>
							{LANES.map((lane) => {
								const accent = ACCENT[lane.accent];
								const isActive = activeLane === lane.id;
								return (
									<button
										key={lane.id}
										type="button"
										onClick={() => scrollToLane(lane.id)}
										className={`unstyled shrink-0 rounded-full border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition ${
											isActive
												? `border-cyan-400/40 bg-cyan-500/10 ${accent.text}`
												: "border-slate-200/80 text-slate-500 dark:border-white/10 dark:text-slate-400"
										}`}
									>
										{lane.label}
									</button>
								);
							})}
						</nav>

						<div ref={featuredRef} className="skills-featured-strip mb-8 md:mb-12">
							<div className="mb-3 flex items-center justify-between gap-3">
								<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
									Primary stack
								</p>
								<p className="font-mono text-[9px] uppercase tracking-wider text-slate-400 sm:hidden">
									Swipe →
								</p>
								<p className="hidden font-mono text-[9px] uppercase tracking-wider text-slate-400 sm:block">
									Scroll →
								</p>
							</div>
							<div className="-mx-4 px-4 sm:mx-0 sm:px-0">
								<div className="skills-featured-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
									{featured.map((item) => (
										<FeaturedCard key={item.title} item={item} />
									))}
								</div>
							</div>
						</div>

						<div className="space-y-4 md:space-y-5">
							{lanesWithItems.map(({ lane, items }, i) => (
								<SkillLane
									key={lane.id}
									lane={lane}
									items={items}
									laneRef={(el) => {
										laneRefs.current[i] = el;
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Skills;
