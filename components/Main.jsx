import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

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

const Main = () => {
	return (
		<div
			id="home"
			className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#06030c] px-4 pt-24 pb-16 text-slate-100 md:pt-28"
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
			<HeroSparkles />

			<div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
				<motion.div
					initial={{ opacity: 0, y: 18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55 }}
					className="order-2 flex flex-col text-center lg:order-1 lg:text-left"
				>
					<span className="mb-5 inline-flex items-center justify-center gap-2 self-center rounded-full border border-fuchsia-500/35 bg-fuchsia-500/15 px-4 py-1.5 text-xs font-semibold text-fuchsia-100/95 shadow-[0_0_24px_rgba(217,70,239,0.2)] lg:self-start">
						Lightning-fast UI, solid engineering
					</span>

					<h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.85rem]">
						Build, ship, and polish{" "}
						<span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-fuchsia-400 bg-clip-text text-transparent">
							interfaces
						</span>{" "}
						that feel alive.
					</h1>

					<p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 lg:mx-0 md:text-lg">
						Full-stack minded front-end engineer — I connect polished UI to real
						backends so products stay fast, accessible, and ready to scale.
					</p>

					<div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
						<Link
							href="/#projects"
							className="unstyled inline-flex items-center justify-center rounded-full border-2 border-white/85 bg-transparent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,255,255,0.08)] transition hover:border-white hover:bg-white/5"
						>
							View work
						</Link>
						<Link
							href="/#about"
							className="unstyled inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-200 via-white to-violet-100 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_0_32px_rgba(217,70,239,0.35)] transition hover:brightness-105"
						>
							About me
						</Link>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.45, delay: 0.2 }}
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
						transition={{ delay: 0.5 }}
						className="mt-12 flex flex-col items-center gap-2 text-slate-500 lg:items-start"
					>
						<span className="text-xs font-medium uppercase tracking-[0.2em]">
							Scroll
						</span>
						<span className="h-8 w-px bg-gradient-to-b from-fuchsia-400/80 to-transparent" />
					</motion.div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.65, delay: 0.08 }}
					className="relative order-1 flex min-h-[min(320px,50vw)] items-center justify-center lg:order-2"
				>
					<div className="pointer-events-none absolute inset-x-[4%] bottom-[8%] top-[12%] z-0 rounded-[2rem] bg-gradient-to-b from-white/[0.07] to-transparent ring-1 ring-white/10" />
					<HeroGltfRobot />
				</motion.div>
			</div>
		</div>
	);
};

export default Main;
