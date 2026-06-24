import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBriefcase, FaGraduationCap, FaCode, FaAward } from "react-icons/fa";

const experiences = [
	{
		id: 1,
		type: "education",
		title: "BSc in Computer Science",
		organization: "Admas University",
		date: "2019",
		description:
			"Graduated with Very Great Distinction, achieving a 3.9 GPA. Focused on software engineering and advanced programming concepts.",
		achievements: ["3.9 GPA", "Very Great Distinction"],
		icon: FaGraduationCap,
		color: "#10B981",
	},
	{
		id: 8,
		type: "work",
		title: "Front-End Developer",
		organization: "Bazra Motors",
		date: "2021",
		description:
			"Worked on Bazra’s e-wallet product — shipping features and UI with React.js and Spring boot, focused on reliable money movement and a clear user experience.",
		skills: ["React.js", "Sprint Bot", "E-wallet"],
		icon: FaBriefcase,
		color: "#6366f1",
	},
	{
		id: 2,
		type: "work",
		title: "Full Stack Web Engineer",
		organization: "Muyalogy",
		date: "2022 - Present",
		description:
			"Full Stack Engineer & Tech Lead — Muyalogy Led development of a scalable platform using Next.js, TypeScript, and Supabase. Focused on performance optimization, API efficiency, and cost reduction. Implemented automation with Trigger.dev and integrated a Telegram bot for real-time user interaction.",
		skills: [
			"Next.js",
			"Telegram Bot + AI",
			"OpenAI API",
			"OpenRouter",
			"TailwindCSS",
			"Mantine UI",
			"Supabase",
		],
		icon: FaBriefcase,
		color: "#22d3ee",
		image: "/assets/channel-admin.jpg",
		imageAlt: "Telegram channel admin context for Muyalogy bot and community",
	},
	{
		id: 3,
		type: "certification",
		title: "Meta Advanced React Certification",
		organization: "Meta (Facebook)",
		date: "2022",
		description:
			"Advanced certification in React.js development, covering modern patterns and best practices.",
		icon: FaAward,
		color: "#3B82F6",
	},
	{
		id: 4,
		type: "work",
		title: "Full Stack Developer",
		organization: "Jiret LMS",
		date: "2024",
		description:
			"Built learning management system using Next.js, Drizzle ORM, PostgreSQL, and Supabase.",
		skills: ["Next.js", "PostgreSQL", "Drizzle ORM"],
		icon: FaBriefcase,
		color: "#8b5cf6",
	},
	{
		id: 5,
		type: "work",
		title: "Web Development Instructor",
		organization: "Muyalogy",
		date: "2025",
		description:
			"Created and teaching comprehensive web development course in Amharic.",
		skills: ["Teaching", "Web Development", "Course Creation"],
		icon: FaCode,
		color: "#a78bfa",
	},
	{
		id: 6,
		type: "work",
		title: "Full Stack Developer",
		organization: "Peragos Systems",
		date: "2025 – Present",
		description:
			"Working remotely with Peragos Systems on full-stack product work — collaborating with the team across time zones, shipping features, and maintaining quality in production.",
		skills: ["Remote", "Full-stack", "Collaboration"],
		icon: FaBriefcase,
		color: "#14b8a6",
	},
	{
		id: 7,
		type: "work",
		title: "Full Stack Developer",
		organization: "Green Bag Ethiopia",
		date: "2025 – Present",
		description:
			"Developed full-stack features with Next.js; built and integrated a Telegram bot wired to AI backends for learner support and automation. Used OpenAI for image-generation flows (server-side API keys only) and OpenRouter for conversational routing. UI with Tailwind CSS and Mantine; Supabase for backend.",
		skills: [
			"Next.js",
			"Telegram Bot",
			"OpenAI",
			"OpenRouter",
			"Tailwind CSS",
			"Mantine",
			"Supabase",
		],
		icon: FaBriefcase,
		color: "#22c55e",
	},
];

const TYPE_META = {
	education: { label: "EDU", accent: "text-emerald-400" },
	work: { label: "OPS", accent: "text-cyan-400" },
	certification: { label: "CERT", accent: "text-blue-400" },
};

const corner =
	"pointer-events-none absolute z-10 h-3 w-3 border-cyan-400/75 dark:border-cyan-400/65";

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

function ExperienceCard({ item, index, cardRef, indexRef }) {
	const meta = TYPE_META[item.type] || TYPE_META.work;
	const Icon = item.icon;
	const isEven = index % 2 === 0;

	return (
		<article
			ref={cardRef}
			className={`experience-card relative w-full md:w-[calc(50%-2.75rem)] ${
				isEven ? "md:mr-auto md:pr-2" : "md:ml-auto md:pl-2"
			}`}
			data-index={index}
		>
			<div
				ref={indexRef}
				className="experience-index-node pointer-events-none absolute top-8 z-20 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.65)] dark:border-slate-950 md:left-1/2 md:block"
				style={{ left: isEven ? undefined : undefined }}
				aria-hidden
			/>

			<div
				className="experience-card-inner relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark"
				style={{
					boxShadow: `0 0 0 1px ${item.color}18, 0 20px 50px -24px rgba(15,23,42,0.35)`,
				}}
			>
				<div
					className="pointer-events-none absolute inset-y-0 left-0 w-1"
					style={{ backgroundColor: item.color }}
					aria-hidden
				/>
				<HudCorners />
				<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]" />

				<div className="relative p-5 sm:p-6 md:p-7">
					<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
						<div className="flex items-center gap-3">
							<div
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 shadow-lg"
								style={{
									backgroundColor: item.color,
									boxShadow: `0 0 24px ${item.color}44`,
								}}
							>
								<Icon className="text-lg text-white" />
							</div>
							<div>
								<p
									className={`font-mono text-[10px] uppercase tracking-[0.22em] ${meta.accent}`}
								>
									{meta.label} · LOG {String(index + 1).padStart(2, "0")}
								</p>
								<p className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
									{item.date}
								</p>
							</div>
						</div>
						<span
							className="rounded border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
							style={{
								borderColor: `${item.color}55`,
								color: item.color,
								backgroundColor: `${item.color}12`,
							}}
						>
							{item.date.split(" ")[0]}
						</span>
					</div>

					<h3 className="font-display text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
						{item.title}
					</h3>
					<p className="mt-1 font-medium text-slate-600 dark:text-slate-300">
						{item.organization}
					</p>
					<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[0.95rem]">
						{item.description}
					</p>

					{item.image ? (
						<div className="relative mt-5 aspect-video w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10">
							<Image
								src={item.image}
								alt={item.imageAlt || `${item.organization} — ${item.title}`}
								layout="fill"
								objectFit="cover"
								sizes="(max-width: 768px) 100vw, 560px"
							/>
						</div>
					) : null}

					{item.skills ? (
						<div className="mt-4 flex flex-wrap gap-2">
							{item.skills.map((skill) => (
								<span
									key={skill}
									className="rounded-md border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide"
									style={{
										borderColor: `${item.color}35`,
										color: item.color,
										backgroundColor: `${item.color}10`,
									}}
								>
									{skill}
								</span>
							))}
						</div>
					) : null}

					{item.achievements ? (
						<div className="mt-4 flex flex-wrap gap-2">
							{item.achievements.map((achievement) => (
								<span
									key={achievement}
									className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-emerald-600 dark:text-emerald-400"
								>
									<FaAward className="text-[10px]" />
									{achievement}
								</span>
							))}
						</div>
					) : null}
				</div>
			</div>
		</article>
	);
}

function Timeline() {
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const trackRef = useRef(null);
	const spineFillRef = useRef(null);
	const spineBeamRef = useRef(null);
	const cardRefs = useRef([]);
	const indexRefs = useRef([]);
	const sidebarRefs = useRef([]);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const headerEls = headerRef.current?.querySelectorAll("[data-reveal]");
			if (headerEls?.length) {
				gsap.from(headerEls, {
					y: 48,
					opacity: 0,
					duration: 0.9,
					stagger: 0.12,
					ease: "power3.out",
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 82%",
					},
				});
			}

			if (spineFillRef.current && trackRef.current) {
				gsap.fromTo(
					spineFillRef.current,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: "none",
						scrollTrigger: {
							trigger: trackRef.current,
							start: "top 65%",
							end: "bottom 75%",
							scrub: 0.45,
						},
					}
				);
			}

			if (spineBeamRef.current && trackRef.current) {
				gsap.fromTo(
					spineBeamRef.current,
					{ top: "0%" },
					{
						top: "100%",
						ease: "none",
						scrollTrigger: {
							trigger: trackRef.current,
							start: "top 65%",
							end: "bottom 75%",
							scrub: 0.35,
						},
					}
				);
			}

			cardRefs.current.forEach((card, i) => {
				if (!card) return;
				const inner = card.querySelector(".experience-card-inner");
				const fromX = i % 2 === 0 ? -72 : 72;

				gsap.fromTo(
					inner || card,
					{
						opacity: 0.15,
						x: fromX,
						y: 56,
						filter: "blur(10px)",
						rotateY: i % 2 === 0 ? 6 : -6,
					},
					{
						opacity: 1,
						x: 0,
						y: 0,
						filter: "blur(0px)",
						rotateY: 0,
						ease: "power2.out",
						scrollTrigger: {
							trigger: card,
							start: "top 88%",
							end: "top 52%",
							scrub: 0.85,
						},
					}
				);

				ScrollTrigger.create({
					trigger: card,
					start: "top 58%",
					end: "bottom 42%",
					onEnter: () => setActiveSidebar(i),
					onEnterBack: () => setActiveSidebar(i),
				});
			});

			function setActiveSidebar(active) {
				sidebarRefs.current.forEach((el, j) => {
					if (!el) return;
					el.classList.toggle("is-active", j === active);
				});
				indexRefs.current.forEach((node, j) => {
					if (!node) return;
					node.classList.toggle("is-lit", j === active);
					node.classList.toggle("is-dim", j !== active);
				});
			}

			setActiveSidebar(0);
		}, sectionRef);

		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400);

		return () => {
			window.clearTimeout(refreshTimer);
			ctx.revert();
		};
	}, [reduceMotion]);

	return (
		<section
			id="experience"
			ref={sectionRef}
			className="experience-section relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.16]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -left-1/4 top-1/3 h-[min(90vw,640px)] w-[min(90vw,640px)] rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-6xl">
				<header ref={headerRef} className="mb-14 md:mb-20">
					<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						<div className="max-w-2xl space-y-4">
							<p
								data-reveal
								className="section-eyebrow"
							>
								<span
									className="h-px w-8 bg-gradient-to-r from-cyan-400 to-violet-500"
									aria-hidden
								/>
								Journey
								<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
									/ SEC 03
								</span>
							</p>
							<h2
								data-reveal
								className="font-display text-3xl text-slate-900 dark:text-white md:text-4xl lg:text-[2.65rem]"
							>
								Experience &{" "}
								<span className="text-gradient-future">Education</span>
							</h2>
							<p
								data-reveal
								className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg"
							>
								A scroll-driven mission log — degrees, product roles, and
								credentials that shaped how I build and ship.
							</p>
						</div>

						<div
							data-reveal
							className="experience-stats grid grid-cols-3 gap-3 sm:gap-4 lg:max-w-sm"
						>
							{[
								{ k: "YRS", v: "6+" },
								{ k: "ROLES", v: String(experiences.filter((e) => e.type === "work").length) },
								{ k: "GPA", v: "3.9" },
							].map((stat) => (
								<div
									key={stat.k}
									className="rounded-xl border border-slate-200/80 bg-white/60 px-3 py-3 text-center dark:border-white/10 dark:bg-slate-950/40"
								>
									<p className="font-mono text-[9px] tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
										{stat.k}
									</p>
									<p className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
										{stat.v}
									</p>
								</div>
							))}
						</div>
					</div>
				</header>

				<div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
					<aside className="hidden lg:block">
						<div className="experience-sidebar sticky top-28 space-y-1 border-l border-cyan-500/25 pl-4">
							<p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
								Index / timeline
							</p>
							{experiences.map((item, i) => (
								<div
									key={item.id}
									ref={(el) => {
										sidebarRefs.current[i] = el;
									}}
									className="experience-sidebar-item border-l-2 border-transparent py-2 pl-3 transition-colors duration-300"
								>
									<p className="font-mono text-[10px] text-slate-400">
										{String(i + 1).padStart(2, "0")}
									</p>
									<p className="font-display text-sm font-semibold text-slate-700 dark:text-slate-200">
										{item.date.split(" ")[0]}
									</p>
									<p className="truncate text-xs text-slate-500 dark:text-slate-400">
										{item.organization}
									</p>
								</div>
							))}
						</div>
					</aside>

					<div ref={trackRef} className="experience-track relative">
						<div
							className="experience-spine pointer-events-none absolute bottom-0 left-3 top-0 w-px bg-slate-300/80 dark:bg-white/10 md:left-1/2 md:-translate-x-1/2"
							aria-hidden
						>
							<div
								ref={spineFillRef}
								className="experience-spine-fill absolute inset-0 bg-gradient-to-b from-cyan-400 via-violet-500 to-fuchsia-500"
							/>
							<div
								ref={spineBeamRef}
								className="experience-spine-beam pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
								aria-hidden
							>
								<div className="absolute left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/25 blur-md" />
								<div className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
							</div>
						</div>

						<div className="relative space-y-10 pb-8 pl-8 md:space-y-14 md:pl-0">
							{experiences.map((item, index) => (
								<ExperienceCard
									key={item.id}
									item={item}
									index={index}
									cardRef={(el) => {
										cardRefs.current[index] = el;
									}}
									indexRef={(el) => {
										indexRefs.current[index] = el;
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Timeline;
