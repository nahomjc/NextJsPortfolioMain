import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
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

const skills = {
	frontend: [
		{ name: "React.js & Next.js", level: 89, icon: SiNextdotjs },
		{ name: "TailwindCSS & Mantine UI", level: 90, icon: SiTailwindcss },
		{ name: "TypeScript", level: 85, icon: SiTypescript },
		{ name: "Redux & Context API", level: 88, icon: FaReact },
		{ name: "Responsive Design", level: 80, icon: FaTools },
	],
	backend: [
		{ name: "Node.js & Express", level: 85, icon: FaNode },
		{ name: "Hono", level: 80, icon: FaBolt },
		{ name: "RESTful APIs", level: 90, icon: FaServer },
		{ name: "Authentication & Authorization", level: 88, icon: FaTools },
	],
	database: [
		{ name: "PostgreSQL", level: 85, icon: SiPostgresql },
		{ name: "MongoDB", level: 82, icon: SiMongodb },
		{ name: "Drizzle ORM", level: 82, imageSrc: "/assets/skills/drizzle.svg" },
		{ name: "Supabase", level: 90, icon: SiSupabase },
		{ name: "Firebase", level: 70, icon: SiFirebase },
	],
};

const panelTransition = {
	type: "spring",
	stiffness: 300,
	damping: 28,
};

function SkillCategory({ title, categoryKey, items, icon: Icon }) {
	const reduceMotion = useReducedMotion();

	return (
		<motion.div
			className="relative"
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={panelTransition}
		>
			<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/15 via-transparent to-violet-500/15 opacity-60 blur-sm dark:opacity-80" />
			<div className="relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark">
				<div
					className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-cyan-400/45 dark:border-cyan-400/35"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-violet-400/45 dark:border-violet-400/35"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-violet-400/35 dark:border-violet-400/25"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-cyan-400/30 dark:border-cyan-400/25"
					aria-hidden
				/>

				<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />

				<div className="relative border-b border-slate-200/80 px-5 py-4 dark:border-white/10 md:px-6 md:py-5">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-100/90 text-cyan-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-cyan-400">
							<Icon className="text-xl" aria-hidden />
						</div>
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
								{categoryKey}
							</p>
							<h3 className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">
								{title}
							</h3>
						</div>
					</div>
				</div>

				<div className="relative space-y-5 p-5 md:space-y-6 md:p-6">
					{items.map((skill, index) => (
						<motion.div
							key={skill.name}
							initial={{ opacity: 0, x: -12 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{
								delay: index * 0.05,
								type: "spring",
								stiffness: 400,
								damping: 32,
							}}
						>
							<div className="mb-2 flex items-center gap-3">
								{skill.imageSrc ? (
									<Image
										src={skill.imageSrc}
										width={22}
										height={22}
										alt=""
										unoptimized
										className="shrink-0 object-contain opacity-90 dark:opacity-95"
									/>
								) : (
									<skill.icon
										className="shrink-0 text-lg text-violet-600 dark:text-violet-400"
										aria-hidden
									/>
								)}
								<div className="flex w-full items-baseline justify-between gap-3">
									<span className="text-sm font-medium text-slate-800 dark:text-slate-100 md:text-base">
										{skill.name}
									</span>
									<span className="font-mono text-xs tabular-nums text-cyan-600 dark:text-cyan-400">
										{skill.level}
										<span className="text-slate-400 dark:text-slate-500">%</span>
									</span>
								</div>
							</div>
							<div className="relative h-2.5 overflow-hidden rounded-full border border-slate-200/80 bg-slate-100/90 shadow-inner dark:border-white/10 dark:bg-slate-950/70">
								<motion.div
									initial={{ width: 0 }}
									whileInView={{ width: `${skill.level}%` }}
									transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
									viewport={{ once: true, amount: 0.3 }}
									className="relative h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(34,211,238,0.25)]"
								>
									{!reduceMotion ? (
										<motion.div
											className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
											animate={{ x: ["-100%", "120%"] }}
											transition={{
												repeat: Infinity,
												duration: 2.4,
												ease: "linear",
											}}
										/>
									) : null}
								</motion.div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}

const SkillsProgress = () => {
	return (
		<div className="relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28">
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

			<div className="relative z-10 mx-auto max-w-6xl">
				<motion.div
					className="mx-auto mb-14 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-16 md:pb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={panelTransition}
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500"
								aria-hidden
							/>
							Proficiency
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 03
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl">
						Technical{" "}
						<span className="text-gradient-future">Skills</span>
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
						Depth across the stack — UI, services, data, and auth — with
						measured proficiency on each pillar.
					</p>
					<p className="mx-auto mt-3 max-w-xl font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
						Readout · relative scale · not certification
					</p>
				</motion.div>

				<div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
					<div className="space-y-8 lg:space-y-10">
						<SkillCategory
							title="Frontend Development"
							categoryKey="FE / UI"
							items={skills.frontend}
							icon={FaReact}
						/>
						<SkillCategory
							title="Backend Development"
							categoryKey="BE / API"
							items={skills.backend}
							icon={FaServer}
						/>
					</div>
					<div>
						<SkillCategory
							title="Database & Cloud"
							categoryKey="DATA / OPS"
							items={skills.database}
							icon={FaDatabase}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkillsProgress;
