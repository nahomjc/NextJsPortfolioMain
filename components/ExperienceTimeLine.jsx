import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
	FaAward,
	FaBriefcase,
	FaGraduationCap,
	FaCode,
	FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import SectionShell, { monoMetaClass, linkAccentClass } from "./section/SectionShell";

const FILTERS = [
	{ id: "all", label: "All" },
	{ id: "Work", label: "Work" },
	{ id: "Education", label: "Education" },
	{ id: "Cert", label: "Certs" },
];

const presentRoles = [
	{
		id: "p1",
		org: "Muyalogy",
		role: "Full Stack Engineer & Tech Lead",
		since: "Since 2022",
		blurb: "Platform lead, performance, Telegram + AI integrations.",
		accent: "from-cyan-500/20 to-transparent",
	},
	{
		id: "p2",
		org: "Peragos Systems",
		role: "Full Stack Developer",
		since: "Since 2025",
		blurb: "Remote product shipping across time zones.",
		accent: "from-sky-500/20 to-transparent",
	},
	{
		id: "p3",
		org: "Green Bag Ethiopia",
		role: "Full Stack Developer",
		since: "Since 2025",
		blurb: "Next.js commerce with AI-backed Telegram support.",
		accent: "from-teal-500/20 to-transparent",
	},
];

const archive = [
	{
		id: 5,
		type: "Work",
		title: "Web Development Instructor",
		organization: "Muyalogy",
		date: "2025",
		year: "2025",
		description:
			"Created and teaching a comprehensive web development course in Amharic.",
		tags: ["Teaching", "Course design"],
		icon: FaCode,
	},
	{
		id: 4,
		type: "Work",
		title: "Full Stack Developer",
		organization: "Jiret LMS",
		date: "2024",
		year: "2024",
		description:
			"Built learning management system using Next.js, Drizzle ORM, PostgreSQL, and Supabase.",
		tags: ["Next.js", "PostgreSQL", "Drizzle"],
		icon: FaBriefcase,
	},
	{
		id: 2,
		type: "Work",
		title: "Full Stack Web Engineer & Tech Lead",
		organization: "Muyalogy",
		date: "2022 to Present",
		year: "2022",
		description:
			"Led development of a scalable platform using Next.js, TypeScript, and Supabase. Focused on performance, API efficiency, and cost reduction. Implemented automation with Trigger.dev and integrated a Telegram bot for real-time user interaction.",
		tags: ["Next.js", "Telegram + AI", "OpenRouter", "Supabase"],
		image: "/assets/channel-admin.jpg",
		imageAlt: "Telegram channel admin context for Muyalogy bot and community",
		icon: FaBriefcase,
		featured: true,
	},
	{
		id: 3,
		type: "Cert",
		title: "Meta Advanced React Certification",
		organization: "Meta (Facebook)",
		date: "2022",
		year: "2022",
		description:
			"Advanced certification in React.js development, covering modern patterns and best practices.",
		tags: ["React", "Patterns"],
		icon: FaAward,
	},
	{
		id: 8,
		type: "Work",
		title: "Front-End Developer",
		organization: "Bazra Motors",
		date: "2021",
		year: "2021",
		description:
			"Worked on Bazra's e-wallet product, shipping features and UI with React.js and Spring boot, focused on reliable money movement and a clear user experience.",
		tags: ["React.js", "Spring Boot", "E-wallet"],
		icon: FaBriefcase,
	},
	{
		id: 1,
		type: "Education",
		title: "BSc in Computer Science",
		organization: "Admas University",
		date: "2019",
		year: "2019",
		description:
			"Graduated with Very Great Distinction, achieving a 3.9 GPA. Focused on software engineering and advanced programming concepts.",
		tags: ["3.9 GPA", "Very Great Distinction"],
		icon: FaGraduationCap,
	},
];

const STATS = [
	{ label: "Building since", value: "2016" },
	{ label: "Roles shipped", value: "08+" },
	{ label: "CS GPA", value: "3.9" },
];

function useReveal(ref) {
	const [on, setOn] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return undefined;
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					setOn(true);
					io.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [ref]);
	return on;
}

const ExperienceTimeLine = () => {
	const reduceMotion = useReducedMotion();
	const [filter, setFilter] = useState("all");
	const [focusId, setFocusId] = useState(2);
	const listRef = useRef(null);
	const revealed = useReveal(listRef);

	const visible = useMemo(() => {
		if (filter === "all") return archive;
		return archive.filter((e) => e.type === filter);
	}, [filter]);

	const focused = useMemo(
		() => visible.find((e) => e.id === focusId) || visible[0] || archive[0],
		[visible, focusId],
	);

	useEffect(() => {
		if (!visible.some((e) => e.id === focusId)) {
			setFocusId(visible[0]?.id ?? archive[0].id);
		}
	}, [visible, focusId]);

	return (
		<SectionShell
			id="experience"
			index="03"
			eyebrow="career"
			title="Experience & education"
			description="From campus distinction to shipping ERP, LMS, and AI-backed products."
			wide
		>
			{/* Stats */}
			<ul className="mb-12 grid grid-cols-3 gap-3 sm:mb-14 sm:gap-4 md:max-w-xl">
				{STATS.map((stat) => (
					<li
						key={stat.label}
						className="rounded-2xl border border-slate-900/10 bg-gradient-to-br from-white/80 to-white/40 px-3 py-4 dark:border-white/10 dark:from-white/[0.06] dark:to-transparent sm:px-5"
					>
						<p className={monoMetaClass}>{stat.label}</p>
						<p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
							{stat.value}
						</p>
					</li>
				))}
			</ul>

			{/* Present roles */}
			<div className="mb-16 md:mb-20">
				<div className="mb-5 flex items-end justify-between gap-4">
					<div>
						<p className={`${monoMetaClass} text-cyan-700 dark:text-cyan-400`}>
							Present
						</p>
						<h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
							Where I am now
						</h3>
					</div>
					<p className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 sm:block">
						3 active lanes
					</p>
				</div>
				<ul className="grid gap-3 md:grid-cols-3">
					{presentRoles.map((role, i) => (
						<li key={role.id}>
							<article
								className={`xp-present group relative h-full overflow-hidden rounded-2xl border border-slate-900/10 bg-white/70 p-5 transition duration-500 hover:-translate-y-1 hover:border-cyan-500/35 hover:shadow-[0_28px_60px_-36px_rgba(34,211,238,0.45)] dark:border-white/10 dark:bg-[#0a1220]/75 sm:p-6`}
								style={{ transitionDelay: reduceMotion ? "0ms" : `${i * 40}ms` }}
							>
								<div
									className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${role.accent} opacity-80`}
									aria-hidden
								/>
								<div className="relative">
									<div className="flex items-center justify-between gap-2">
										<span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
											<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
											Live
										</span>
										<span className={monoMetaClass}>{role.since}</span>
									</div>
									<h4 className="mt-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
										{role.org}
									</h4>
									<p className="mt-1 text-sm font-medium text-cyan-800/80 dark:text-cyan-300/90">
										{role.role}
									</p>
									<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
										{role.blurb}
									</p>
								</div>
							</article>
						</li>
					))}
				</ul>
			</div>

			{/* Archive */}
			<div ref={listRef} className="xp-archive">
				<div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-900/10 pb-5 dark:border-white/10">
					<div>
						<p className={monoMetaClass}>Archive</p>
						<h3 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
							Path so far
						</h3>
					</div>
					<div
						className="flex flex-wrap gap-1.5"
						role="tablist"
						aria-label="Archive filters"
					>
						{FILTERS.map((f) => {
							const on = filter === f.id;
							return (
								<button
									key={f.id}
									type="button"
									role="tab"
									aria-selected={on}
									onClick={() => setFilter(f.id)}
									className={`unstyled rounded-full px-3.5 py-1.5 text-sm transition ${
										on
											? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
											: "text-slate-600 hover:bg-slate-900/5 dark:text-slate-400 dark:hover:bg-white/5"
									}`}
								>
									{f.label}
								</button>
							);
						})}
					</div>
				</div>

				<div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)] lg:gap-10">
					{/* Timeline list */}
					<ol className="relative space-y-3">
						<div
							className="pointer-events-none absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-cyan-400/50 via-slate-900/10 to-transparent dark:via-white/10 sm:left-[17px]"
							aria-hidden
						/>
						<AnimatePresence mode="popLayout">
							{visible.map((item, i) => {
								const Icon = item.icon;
								const on = focused?.id === item.id;
								return (
									<motion.li
										key={item.id}
										layout
										initial={
											reduceMotion || !revealed
												? false
												: { opacity: 0, y: 16 }
										}
										animate={{ opacity: 1, y: 0 }}
										exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
										transition={{
											duration: 0.4,
											delay: reduceMotion ? 0 : Math.min(i * 0.05, 0.25),
											ease: [0.22, 1, 0.36, 1],
										}}
									>
										<button
											type="button"
											onMouseEnter={() => setFocusId(item.id)}
											onFocus={() => setFocusId(item.id)}
											onClick={() => setFocusId(item.id)}
											className={`xp-row unstyled group relative flex w-full gap-4 rounded-2xl border p-4 text-left transition duration-300 sm:gap-5 sm:p-5 ${
												on
													? "border-cyan-500/30 bg-white shadow-[0_24px_50px_-30px_rgba(15,23,42,0.35)] dark:border-cyan-400/30 dark:bg-white/[0.05] dark:shadow-[0_24px_50px_-28px_rgba(34,211,238,0.25)]"
													: "border-transparent hover:border-slate-900/10 hover:bg-white/60 dark:hover:border-white/10 dark:hover:bg-white/[0.03]"
											}`}
											aria-current={on ? "true" : undefined}
										>
											<span
												className={`relative z-[1] mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
													on
														? "border-cyan-500/50 bg-cyan-500/15 text-cyan-700 ring-4 ring-cyan-500/10 dark:text-cyan-300"
														: "border-slate-900/10 bg-white text-slate-500 dark:border-white/15 dark:bg-[#0a1220] dark:text-slate-400"
												}`}
											>
												<Icon className="text-sm" aria-hidden />
											</span>
											<span className="min-w-0 flex-1">
												<span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
													<span className="font-mono text-sm tabular-nums text-cyan-700 dark:text-cyan-400">
														{item.year}
													</span>
													<span className={`${monoMetaClass}`}>{item.type}</span>
												</span>
												<span className="mt-1.5 block text-base font-semibold tracking-tight text-slate-900 dark:text-white sm:text-lg">
													{item.title}
												</span>
												<span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">
													{item.organization}
												</span>
												<span
													className={`mt-2 block overflow-hidden text-sm leading-relaxed text-slate-600 transition-[max-height,opacity] duration-400 dark:text-slate-400 ${
														on
															? "max-h-40 opacity-100"
															: "max-h-0 opacity-0 lg:max-h-0"
													}`}
												>
													{item.description}
												</span>
												{on && item.tags?.length ? (
													<ul className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
														{item.tags.map((tag) => (
															<li
																key={tag}
																className="rounded-full border border-slate-900/10 px-2.5 py-0.5 text-xs text-slate-600 dark:border-white/10 dark:text-slate-400"
															>
																{tag}
															</li>
														))}
													</ul>
												) : null}
											</span>
											<span
												className={`mt-1 hidden text-cyan-600 transition sm:block dark:text-cyan-400 ${
													on ? "opacity-100" : "opacity-0 group-hover:opacity-60"
												}`}
												aria-hidden
											>
												<FaArrowUpRightFromSquare className="text-xs" />
											</span>
										</button>
									</motion.li>
								);
							})}
						</AnimatePresence>
					</ol>

					{/* Sticky preview panel (desktop) */}
					<aside className="hidden lg:block">
						<div className="sticky top-28">
							<AnimatePresence mode="wait">
								<motion.div
									key={focused.id}
									initial={
										reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(4px)" }
									}
									animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
									exit={
										reduceMotion
											? { opacity: 0 }
											: { opacity: 0, y: -8, filter: "blur(4px)" }
									}
									transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
									className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white/80 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-[#0a1220]/90"
								>
									{focused.image ? (
										<div className="relative aspect-[16/10] w-full bg-slate-950">
											<Image
												src={focused.image}
												alt={focused.imageAlt || focused.title}
												fill
												className="object-cover"
												sizes="420px"
											/>
											<div
												className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
												aria-hidden
											/>
											<div className="absolute bottom-0 left-0 right-0 p-5">
												<p className={`${monoMetaClass} text-cyan-300`}>
													{focused.date}
												</p>
												<p className="mt-1 text-lg font-semibold text-white">
													{focused.organization}
												</p>
											</div>
										</div>
									) : null}
									<div className="p-5">
										{!focused.image ? (
											<p className={`${monoMetaClass} mb-2 text-cyan-700 dark:text-cyan-400`}>
												{focused.date}
											</p>
										) : null}
										<p className={monoMetaClass}>{focused.type}</p>
										<h4 className="mt-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
											{focused.title}
										</h4>
										{!focused.image ? (
											<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
												{focused.organization}
											</p>
										) : null}
										<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
											{focused.description}
										</p>
										{focused.tags?.length ? (
											<ul className="mt-4 flex flex-wrap gap-1.5">
												{focused.tags.map((tag) => (
													<li
														key={tag}
														className="rounded-full border border-slate-900/10 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:text-slate-400"
													>
														{tag}
													</li>
												))}
											</ul>
										) : null}
										<p className={`mt-5 text-sm font-medium ${linkAccentClass}`}>
											Hover the list to preview entries
										</p>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>
					</aside>
				</div>
			</div>
		</SectionShell>
	);
};

export default ExperienceTimeLine;
