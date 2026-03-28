import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import AboutImg from "../public/assets/download.png";

const PORTRAIT_SRC =
	typeof AboutImg === "string" ? AboutImg : AboutImg.src;

const cornerBase =
	"pointer-events-none absolute z-20 h-10 w-10 border-cyan-400/80 dark:border-cyan-400/70";

function HudCorners() {
	return (
		<>
			<div
				className={`${cornerBase} left-3 top-3 border-l-2 border-t-2`}
				aria-hidden
			/>
			<div
				className={`${cornerBase} right-3 top-3 border-r-2 border-t-2`}
				aria-hidden
			/>
			<div
				className={`${cornerBase} bottom-3 left-3 border-b-2 border-l-2`}
				aria-hidden
			/>
			<div
				className={`${cornerBase} bottom-3 right-3 border-b-2 border-r-2`}
				aria-hidden
			/>
		</>
	);
}

const highlights = [
	{
		label: "Focus",
		value: "Responsive UI · API integration · product delivery",
	},
	{
		label: "Core stack",
		value: "React · Next.js · HTML · CSS · JavaScript",
	},
	{
		label: "Since",
		value: "2016 — CMS e‑commerce to full custom apps",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.08, delayChildren: 0.06 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 18 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 320, damping: 26 },
	},
};

/** Robotic scan / glitch layers over portrait — decorative only */
function PortraitScanGlitch({ src, active }) {
	if (!active) return null;
	return (
		<>
			<motion.div
				className="pointer-events-none absolute inset-0 z-[6] bg-cover opacity-0 mix-blend-screen"
				style={{
					backgroundImage: `url(${src})`,
					backgroundPosition: "center top",
				}}
				animate={{
					x: [0, 0, -6, 5, -3, 0, 0, 0, 4, -5, 0, 0],
					y: [0, 0, 0, 1, -2, 0, 0, 1, 0, 0],
					opacity: [0, 0, 0, 0.55, 0.4, 0, 0, 0, 0, 0.5, 0.25, 0, 0],
				}}
				transition={{
					duration: 6.5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
				aria-hidden
			/>
			<motion.div
				className="pointer-events-none absolute inset-0 z-[6] bg-cover opacity-0 mix-blend-screen"
				style={{
					backgroundImage: `url(${src})`,
					backgroundPosition: "center top",
					filter: "hue-rotate(175deg) saturate(2.8) contrast(1.15)",
				}}
				animate={{
					x: [0, 0, 0, 7, -5, 2, 0, 0, 0, -6, 4, 0],
					opacity: [0, 0, 0, 0, 0.5, 0.35, 0, 0, 0.45, 0, 0, 0],
				}}
				transition={{
					duration: 6.5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
					delay: 0.15,
				}}
				aria-hidden
			/>
			<motion.div
				className="pointer-events-none absolute inset-0 z-[7] mix-blend-overlay"
				style={{
					background:
						"repeating-linear-gradient(180deg, transparent 0px, transparent 3px, rgba(34,211,238,0.04) 3px, rgba(34,211,238,0.04) 4px)",
				}}
				animate={{ opacity: [0.2, 0.42, 0.28, 0.38, 0.22] }}
				transition={{ duration: 2.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
				aria-hidden
			/>
			<motion.div
				className="pointer-events-none absolute inset-0 z-[8] bg-cover"
				style={{
					backgroundImage: `url(${src})`,
					backgroundPosition: "center top",
				}}
				animate={{
					clipPath: [
						"inset(38% 0 58% 0)",
						"inset(38% 0 58% 0)",
						"inset(62% 0 32% 0)",
						"inset(62% 0 32% 0)",
						"inset(15% 0 80% 0)",
						"inset(100% 0 0% 0)",
					],
					x: [0, -4, 4, 0, 0, 0],
					opacity: [0, 0.85, 0.75, 0, 0, 0],
				}}
				transition={{
					duration: 4.2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
					times: [0, 0.08, 0.12, 0.2, 0.28, 1],
				}}
				aria-hidden
			/>
		</>
	);
}

const About = () => {
	const reduceMotion = useReducedMotion();

	return (
		<div
			id="about"
			className="relative w-full scroll-mt-24 overflow-hidden px-4 py-20 md:min-h-screen md:py-28"
		>
			{/* Futuristic field background */}
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.35] dark:opacity-[0.22]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -left-1/4 top-1/2 h-[min(90vw,720px)] w-[min(90vw,720px)] -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-500/15"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -right-1/4 top-0 h-[min(70vw,520px)] w-[min(70vw,520px)] rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/18"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent dark:via-cyan-400/30"
				aria-hidden
			/>

			<motion.div
				className="relative z-10 m-auto max-w-[1240px]"
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, margin: "-60px" }}
			>
				{/* Section chrome */}
				<motion.div
					variants={itemVariants}
					className="mb-10 flex flex-col gap-6 border-b border-slate-200/80 pb-8 dark:border-white/10 md:mb-14 md:flex-row md:items-end md:justify-between md:pb-10"
				>
					<div className="space-y-3">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-cyan-400 to-violet-500"
								aria-hidden
							/>
							About
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 01
							</span>
						</p>
						<h2 className="max-w-xl font-display text-slate-900 dark:text-white">
							Who I <span className="text-gradient-future">Am</span>
						</h2>
						<p className="max-w-lg text-lg font-medium leading-snug text-slate-700 dark:text-slate-200">
							I am not your typical developer.
						</p>
					</div>
					<div className="flex flex-col items-start gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 sm:items-end">
						<span className="rounded border border-slate-300/80 bg-white/60 px-3 py-1.5 dark:border-white/15 dark:bg-slate-950/40">
							ID · NAHOM_D
						</span>
						<span className="text-cyan-600/90 dark:text-cyan-400/90">
							Status / Available for build
						</span>
					</div>
				</motion.div>

				<div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
					{/* Portrait module */}
					<motion.div
						variants={itemVariants}
						className="relative lg:col-span-5"
					>
						<div
							className="relative mx-auto w-full max-w-[400px] lg:mx-0 lg:max-w-none"
							style={{ perspective: "1400px" }}
						>
							<motion.div
								className="relative"
								style={{ transformStyle: "preserve-3d" }}
								initial={reduceMotion ? false : { rotateY: -6 }}
								whileInView={reduceMotion ? undefined : { rotateY: 0 }}
								transition={{
									type: "spring",
									stiffness: 80,
									damping: 18,
								}}
								viewport={{ once: true }}
							>
								<div
									className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-400/50 via-transparent to-violet-500/50 opacity-70 blur-sm dark:opacity-90"
									aria-hidden
								/>
								<div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100/50 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_25px_60px_-20px_rgba(15,23,42,0.35)] dark:border-white/12 dark:bg-slate-900/40 dark:shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_28px_70px_-24px_rgba(0,0,0,0.65)]">
									<HudCorners />
									<div className="relative aspect-[3/4] w-full overflow-hidden">
										<motion.div
											className="absolute inset-0"
											animate={
												reduceMotion
													? undefined
													: {
															x: [0, 0, -1, 1, -2, 2, 0, 0],
															filter: [
																"brightness(1) contrast(1)",
																"brightness(1) contrast(1)",
																"brightness(1.06) contrast(1.05) drop-shadow(2px 0 0 rgba(255,0,170,0.35)) drop-shadow(-2px 0 0 rgba(0,240,255,0.35))",
																"brightness(1) contrast(1)",
																"brightness(1.12) contrast(1.08) drop-shadow(3px 0 0 rgba(255,0,170,0.45)) drop-shadow(-3px 0 0 rgba(0,240,255,0.4))",
																"brightness(1) contrast(1)",
																"brightness(1) contrast(1)",
																"brightness(1) contrast(1)",
															],
														}
											}
											transition={
												reduceMotion
													? undefined
													: {
															duration: 5.5,
															repeat: Number.POSITIVE_INFINITY,
															ease: "linear",
														}
											}
										>
											<Image
												src={AboutImg}
												alt="Nahom — developer portrait"
												layout="fill"
												objectFit="cover"
												objectPosition="top"
												priority
												sizes="(max-width: 1024px) 100vw, 400px"
											/>
										</motion.div>
										<PortraitScanGlitch
											src={PORTRAIT_SRC}
											active={!reduceMotion}
										/>
										<div
											className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/10 mix-blend-multiply dark:from-future-surface/80 dark:via-transparent dark:to-future-surface/20"
											aria-hidden
										/>
										{!reduceMotion ? (
											<>
												<motion.div
													className="absolute inset-x-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.55)] dark:via-cyan-400/85"
													initial={{ top: "-2%" }}
													animate={{ top: ["-2%", "102%", "-2%"] }}
													transition={{
														duration: 5.2,
														repeat: Number.POSITIVE_INFINITY,
														ease: "linear",
													}}
													aria-hidden
												/>
												<motion.div
													className="absolute inset-x-[8%] z-10 h-px bg-gradient-to-r from-transparent via-fuchsia-400/70 to-transparent opacity-80 shadow-[0_0_12px_rgba(217,70,239,0.4)]"
													initial={{ top: "0%" }}
													animate={{ top: ["0%", "100%", "0%"] }}
													transition={{
														duration: 7.5,
														repeat: Number.POSITIVE_INFINITY,
														ease: "linear",
														delay: 0.7,
													}}
													aria-hidden
												/>
											</>
										) : null}
										<div
											className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
											style={{
												backgroundImage:
													"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.06) 2px, rgba(255,255,255,0.06) 3px)",
											}}
											aria-hidden
										/>
									</div>
									<div className="flex items-center justify-between border-t border-slate-200/80 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-slate-950/50">
										<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
											Optical / Portrait
										</span>
										<span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
											<span className="relative flex h-1.5 w-1.5">
												<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
												<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
											</span>
											Live
										</span>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Narrative panel */}
					<motion.div
						variants={itemVariants}
						className="relative lg:col-span-7"
					>
						<div className="pointer-events-none absolute -left-1 top-8 bottom-8 hidden w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-violet-500/0 md:block" />

						<div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/65 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark">
							<div
								className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/15"
								aria-hidden
							/>
							<div
								className="absolute bottom-0 left-0 h-28 w-28 -translate-x-6 translate-y-6 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15"
								aria-hidden
							/>

							<div className="noise-texture pointer-events-none absolute inset-0 rounded-2xl" />

							{/* Inner structural outline */}
							<div
								className="pointer-events-none absolute left-4 top-4 z-10 h-5 w-5 border-l border-t border-cyan-400/50 dark:border-cyan-400/40"
								aria-hidden
							/>
							<div
								className="pointer-events-none absolute right-4 top-4 z-10 h-5 w-5 border-r border-t border-violet-400/50 dark:border-violet-400/40"
								aria-hidden
							/>
							<div
								className="pointer-events-none absolute bottom-4 left-4 z-10 h-5 w-5 border-b border-l border-violet-400/40 dark:border-violet-400/35"
								aria-hidden
							/>
							<div
								className="pointer-events-none absolute bottom-4 right-4 z-10 h-5 w-5 border-b border-r border-violet-400/40 dark:border-cyan-400/35"
								aria-hidden
							/>

							<div className="relative z-10 space-y-6 p-6 md:p-9 md:pl-10">
								<div className="grid gap-3 sm:grid-cols-3">
									{highlights.map((row) => (
										<div
											key={row.label}
											className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-3 dark:border-white/10 dark:bg-slate-950/35"
										>
											<p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-600 dark:text-cyan-400">
												{row.label}
											</p>
											<p className="mt-1.5 text-xs font-medium leading-snug text-slate-700 dark:text-slate-300">
												{row.value}
											</p>
										</div>
									))}
								</div>

								<div className="space-y-4 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-400">
									<p>
										I specialize in building mobile-responsive front-end UI
										applications that seamlessly integrate with APIs and backend
										technologies. Passionate about learning and adopting new
										technologies, I believe there is always more than one way to
										solve a problem. While I am most proficient in React,
										Next.js, HTML, CSS, and JavaScript, I am a fast learner who
										can adapt to new tech stacks as needed. For me, being a
										great developer is not about using a single language but
										selecting the right tool for the job.
									</p>
									<p>
										I began my journey in 2016, managing multiple e-commerce
										websites on CMS platforms. Over the years, I have worked
										directly with clients, taking mock wireframes all the way to
										fully deployed applications like Muyalogy and Afriwork.
									</p>
								</div>

								<div className="flex flex-wrap items-center gap-4 border-t border-slate-200/80 pt-6 dark:border-white/10">
									<Link href="/#projects" className="group inline-flex">
										<span className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-5 py-2.5 font-semibold text-cyan-700 transition hover:border-cyan-400/70 hover:from-cyan-500/15 hover:to-violet-500/15 dark:border-cyan-400/35 dark:text-cyan-300 dark:hover:border-cyan-300/60">
											Latest projects
											<span
												className="transition-transform group-hover:translate-x-0.5"
												aria-hidden
											>
												→
											</span>
										</span>
									</Link>
									<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
										Route / #projects
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default About;
