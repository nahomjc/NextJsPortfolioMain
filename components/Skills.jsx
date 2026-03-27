import Image from "next/image";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Css from "../public/assets/skills/css.png";
import Javascript from "../public/assets/skills/javascript.png";
import ReactImg from "../public/assets/skills/react.png";
import Tailwind from "../public/assets/skills/tailwind.png";
import Github from "../public/assets/skills/github1.png";
import Firebase from "../public/assets/skills/firebase.png";
import NextJS from "../public/assets/skills/nextjs.png";

/** PNG from import or public SVG path */
const skillItems = [
	{ title: "CSS", image: Css },
	{ title: "JavaScript", image: Javascript },
	{ title: "TypeScript", src: "/assets/skills/typescript.svg" },
	{ title: "React", image: ReactImg },
	{ title: "Tailwind", image: Tailwind },
	{ title: "Next.js", image: NextJS },
	{ title: "Firebase", image: Firebase },
	{ title: "GitHub", image: Github },
	{ title: "GitLab", src: "/assets/skills/gitlab.svg" },
	{ title: "Node.js", src: "/assets/skills/nodejs.svg" },
	{ title: "Express.js", src: "/assets/skills/express.svg" },
	{ title: "Hono", src: "/assets/skills/hono.svg" },
	{ title: "Drizzle ORM", src: "/assets/skills/drizzle.svg" },
	{ title: "PostgreSQL", src: "/assets/skills/postgresql.svg" },
	{ title: "MySQL", src: "/assets/skills/mysql.svg" },
	{ title: "WordPress", src: "/assets/skills/wordpress.svg" },
];

function SkillIcon({ item }) {
	const common =
		"h-14 w-14 shrink-0 object-contain transition duration-300 group-hover:scale-110";
	if (item.image) {
		return (
			<Image
				src={item.image}
				width={56}
				height={56}
				alt=""
				className={common}
			/>
		);
	}
	return (
		<Image
			src={item.src}
			width={56}
			height={56}
			alt=""
			unoptimized
			className={common}
		/>
	);
}

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.06, delayChildren: 0.04 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 320, damping: 28 },
	},
};

const Skills = () => {
	const reduceMotion = useReducedMotion();

	return (
		<div
			id="skills"
			className="relative w-full scroll-mt-24 overflow-hidden px-4 py-20 lg:min-h-screen lg:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.32] dark:opacity-[0.2]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-0 top-1/4 h-[min(80vw,480px)] w-[min(80vw,480px)] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[110px] dark:bg-violet-500/16"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 right-0 h-[min(70vw,420px)] w-[min(70vw,420px)] translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-400/10 blur-[100px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent dark:via-violet-400/35"
				aria-hidden
			/>

			<motion.div
				className="relative z-10 mx-auto flex max-w-[1240px] flex-col justify-center"
				variants={containerVariants}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true, margin: "-50px" }}
			>
				<motion.div
					variants={cardVariants}
					className="mb-12 border-b border-slate-200/80 pb-10 dark:border-white/10 md:mb-14"
				>
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
					<div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
						<h2 className="font-display text-slate-900 dark:text-white">
							What I <span className="text-gradient-future">Can Do</span>
						</h2>
						<p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] text-slate-500 dark:text-slate-400">
							Stack modules · delivery-ready UI & APIs
						</p>
					</div>
				</motion.div>

				<div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
					{skillItems.map((item) => (
						<motion.div
							key={item.title}
							variants={cardVariants}
							whileHover={
								reduceMotion
									? undefined
									: { y: -4, transition: { duration: 0.2 } }
							}
							className="group relative"
						>
							<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/0 via-cyan-400/30 to-violet-500/0 opacity-0 blur-[1px] transition duration-300 group-hover:opacity-100 dark:via-cyan-400/40" />
							<div className="relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 p-5 shadow-card-light backdrop-blur-xl transition duration-300 group-hover:border-cyan-400/35 group-hover:shadow-glow dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark dark:group-hover:border-cyan-400/30 dark:group-hover:shadow-glow">
								<div
									className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-cyan-400/40 dark:border-cyan-400/35"
									aria-hidden
								/>
								<div
									className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-violet-400/40 dark:border-violet-400/35"
									aria-hidden
								/>
								<div
									className="noise-texture pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
									aria-hidden
								/>

								<div className="relative flex flex-col items-center gap-3 text-center">
									<div className="flex h-[3.75rem] w-full items-center justify-center rounded-xl bg-slate-100/80 dark:bg-slate-950/50">
										<SkillIcon item={item} />
									</div>
									<h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 md:text-base">
										{item.title}
									</h3>
								</div>

								<div
									className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent opacity-0 transition group-hover:opacity-100"
									aria-hidden
								/>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default Skills;
