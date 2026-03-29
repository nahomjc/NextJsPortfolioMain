import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowRight, HiOutlineLightningBolt } from "react-icons/hi";
import { motion, useReducedMotion } from "framer-motion";

const HeroGltfRobot = dynamic(() => import("./HeroGltfRobot"), { ssr: false });

const sparklePositions = [
	[12, 8],
	[88, 6],
	[22, 24],
	[76, 18],
	[45, 12],
	[91, 38],
	[8, 42],
	[34, 55],
	[67, 48],
	[15, 68],
	[82, 62],
	[52, 72],
	[73, 88],
	[28, 82],
	[61, 30],
	[94, 52],
	[5, 58],
	[38, 38],
	[55, 90],
	[70, 14],
];

function HeroSparkles() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
			{sparklePositions.map(([x, y]) => (
				<span
					key={`${x}-${y}`}
					className="absolute h-1 w-1 rounded-sm bg-white/80 shadow-[0_0_6px_rgba(217,70,239,0.85)] motion-safe:animate-pulse"
					style={{
						left: `${x}%`,
						top: `${y}%`,
						animationDelay: `${(x + y) * 0.018}s`,
						transform: "rotate(45deg)",
					}}
				/>
			))}
		</div>
	);
}

const heroStagger = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.11, delayChildren: 0.06 },
	},
};

const heroItem = {
	hidden: { opacity: 0, y: 26 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 380, damping: 28 },
	},
};

const heroStaggerReduced = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.04, delayChildren: 0 },
	},
};

const heroItemReduced = {
	hidden: { opacity: 0, y: 8 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
	},
};

const Main = () => {
	const reduceMotionHero = useReducedMotion();

	return (
		<div
			id="home"
			className="relative flex min-h-screen w-full items-center overflow-x-hidden overflow-y-visible bg-[#06030c] px-4 pb-10 pt-28 text-slate-100 md:pb-12 md:pt-32 lg:h-[100dvh] lg:max-h-[100dvh] lg:min-h-0 lg:overflow-hidden"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[length:48px_48px] opacity-[0.22]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(217, 70, 239, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
				}}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -right-[20%] top-1/2 h-[min(120vw,840px)] w-[min(120vw,840px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.42),rgba(124,58,237,0.14)_45%,transparent_68%)] blur-3xl"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-[-8%] top-1/3 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_62%)] blur-3xl motion-reduce:hidden"
				aria-hidden
			/>
			<HeroSparkles />

			<div className="relative z-10 mx-auto grid w-full min-h-0 max-h-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:py-0">
				<motion.div
					variants={reduceMotionHero ? heroStaggerReduced : heroStagger}
					initial="hidden"
					animate="show"
					className="relative order-2 flex min-h-0 flex-col text-center lg:order-1 lg:min-h-0 lg:text-left"
				>
					<div
						className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-fuchsia-600/[0.08] opacity-90 blur-xl motion-reduce:opacity-0 lg:block"
						aria-hidden
					/>

					<motion.span
						variants={reduceMotionHero ? heroItemReduced : heroItem}
						className="mb-6 inline-flex items-center justify-center gap-2.5 self-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-fuchsia-100/95 shadow-[0_0_40px_rgba(217,70,239,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md lg:self-start"
					>
						<span
							className="relative flex h-2 w-2 shrink-0"
							aria-hidden
						>
							<span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-cyan-400/50" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
						</span>
						<HiOutlineLightningBolt
							className="text-base text-cyan-300/90"
							aria-hidden
						/>
						Lightning-fast UI, solid engineering
					</motion.span>

					<motion.h1
						variants={reduceMotionHero ? heroItemReduced : heroItem}
						className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.35)] sm:text-4xl md:text-5xl lg:text-[2.95rem]"
					>
						Build, ship, and polish{" "}
						<span className="relative inline">
							<span className="relative z-[1] bg-gradient-to-r from-cyan-200 via-fuchsia-300 to-fuchsia-400 bg-clip-text text-transparent">
								interfaces
							</span>
							<span
								className="absolute -inset-x-1 -bottom-1 top-[0.65em] -z-0 rounded-sm bg-gradient-to-r from-cyan-400/25 via-fuchsia-500/20 to-transparent blur-md"
								aria-hidden
							/>
						</span>{" "}
						that feel alive.
					</motion.h1>

					<motion.div
						variants={reduceMotionHero ? heroItemReduced : heroItem}
						className="mx-auto mt-7 w-full max-w-xl lg:mx-0"
					>
						<div className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-fuchsia-500/[0.06] p-[1px] shadow-[0_0_48px_rgba(34,211,238,0.08),0_20px_50px_-24px_rgba(0,0,0,0.5)]">
							<div className="rounded-[0.94rem] bg-[#080512]/80 px-5 py-4 backdrop-blur-md sm:px-6 sm:py-5">
								<p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-400/75">
									Core offer
								</p>
								<p className="mt-2 text-left text-lg font-semibold leading-snug text-white sm:text-xl">
									I build{" "}
									<span className="text-gradient-future">modern websites</span>{" "}
									with{" "}
									<span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text font-bold text-transparent">
										Next.js
									</span>
								</p>
								<div
									className="mt-3 flex flex-wrap gap-2"
									aria-hidden
								>
									<span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
										App Router
									</span>
									<span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
										Performance
									</span>
									<span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-400">
										SEO-ready
									</span>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.p
						variants={reduceMotionHero ? heroItemReduced : heroItem}
						className="mx-auto mt-6 max-w-xl border-l-2 border-cyan-400/35 pl-5 text-left text-base leading-relaxed text-slate-400 lg:mx-0 md:text-lg"
					>
						Full-stack minded front-end engineer — I connect polished UI to real
						backends so products stay fast, accessible, and ready to scale.
					</motion.p>

					<motion.div
						variants={reduceMotionHero ? heroItemReduced : heroItem}
						className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
					>
						<motion.div
							whileHover={reduceMotionHero ? undefined : { scale: 1.02 }}
							whileTap={reduceMotionHero ? undefined : { scale: 0.98 }}
							className="sm:flex-initial"
						>
							<Link href="/#contact" passHref legacyBehavior>
								<a className="unstyled group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-fuchsia-200 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.4),0_0_28px_rgba(217,70,239,0.22),inset_0_1px_0_rgba(255,255,255,0.5)] ring-2 ring-cyan-300/40 transition duration-300 hover:shadow-[0_0_52px_rgba(34,211,238,0.5),0_0_36px_rgba(217,70,239,0.28)] sm:w-auto">
									<span
										className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition duration-500 group-hover:translate-x-full"
										aria-hidden
									/>
									Hire me
									<HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
								</a>
							</Link>
						</motion.div>
						<Link
							href="/#projects"
							className="unstyled inline-flex w-full items-center justify-center rounded-full border-2 border-white/80 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-white hover:bg-white/10 sm:w-auto"
						>
							View work
						</Link>
						<Link
							href="/#about"
							className="unstyled inline-flex w-full items-center justify-center rounded-full border border-fuchsia-400/35 bg-gradient-to-r from-fuchsia-500/20 via-violet-500/15 to-transparent px-7 py-3.5 text-sm font-semibold text-fuchsia-50 shadow-[0_0_28px_rgba(217,70,239,0.2)] transition hover:border-fuchsia-400/55 hover:brightness-110 sm:w-auto"
						>
							About me
						</Link>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.55 }}
						className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
					>
						<a
							href="https://www.linkedin.com/in/nahom-tesfaye-35b97420b/"
							target="_blank"
							rel="noreferrer"
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-fuchsia-400/50 hover:text-fuchsia-200"
							aria-label="LinkedIn"
						>
							<FaLinkedinIn className="text-lg" />
						</a>
						<a
							href="https://github.com/nahomjc"
							target="_blank"
							rel="noreferrer"
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-fuchsia-400/50 hover:text-fuchsia-200"
							aria-label="GitHub"
						>
							<FaGithub className="text-lg" />
						</a>
						<Link
							href="/#contact"
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-fuchsia-400/50 hover:text-fuchsia-200"
							aria-label="Email"
						>
							<AiOutlineMail className="text-lg" />
						</Link>
						<Link
							href="/resume"
							className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-fuchsia-400/50 hover:text-fuchsia-200"
							aria-label="Resume"
						>
							<BsFillPersonLinesFill className="text-lg" />
						</Link>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.75 }}
						className="mt-12 flex flex-col items-center gap-2 text-slate-500 lg:items-start"
					>
						<span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
							Scroll
						</span>
						<span className="h-9 w-px bg-gradient-to-b from-cyan-400/70 via-fuchsia-400/60 to-transparent" />
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.94, y: 12 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.12 }}
					className="relative order-1 flex min-h-[min(320px,52vw)] items-center justify-center pt-8 sm:pt-10 lg:order-2 lg:min-h-0 lg:pt-8"
				>
					<div className="pointer-events-none absolute inset-x-[2%] bottom-[4%] top-[26%] z-0 rounded-[2rem] bg-gradient-to-b from-cyan-400/[0.06] via-white/[0.03] to-transparent ring-1 ring-cyan-400/15" />
					<div
						className="pointer-events-none absolute inset-x-[6%] bottom-[8%] top-[34%] z-0 rounded-[1.75rem] bg-gradient-to-t from-fuchsia-500/[0.05] to-transparent"
						aria-hidden
					/>
					<HeroGltfRobot />
				</motion.div>
			</div>
		</div>
	);
};

export default Main;
