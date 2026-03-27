import React from "react";
import { motion } from "framer-motion";
import muyalogyImg from "../public/assets/projects/muyaloyg.png";
import ProjectItem from "./ProjectItem";
import afriworkImg from "../public/assets/projects/afriwork.png";
import loopstateImg from "../public/assets/projects/loop-state.png";
import primebankImg from "../public/assets/projects/prime-bank.png";
import jiretImg from "../public/assets/projects/jiret.png";
import sourcepinImg from "../public/assets/Screenshot 2026-03-28 004531.png";
import hcmImg from "../public/assets/Screenshot 2026-03-28 005041.png";
import conflictReporterImg from "../public/assets/global-conflict.vercel.app_ (1).png";
import greenbagImg from "../public/assets/Screenshot 2026-03-28 023643.png";
import arSolutionsImg from "../public/assets/Screenshot 2026-03-28 024007.png";
import afrocadoImg from "../public/assets/Screenshot 2026-03-28 024200.png";

const panelTransition = {
	type: "spring",
	stiffness: 300,
	damping: 28,
};

const cardContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.08, delayChildren: 0.04 },
	},
};

const cardItem = {
	hidden: { opacity: 0, y: 22 },
	show: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 320, damping: 28 },
	},
};

function SubsectionHeader({
	eyebrow,
	secLabel,
	title,
	titleGradient,
	description,
}) {
	return (
		<motion.div
			className="mb-10 border-b border-slate-200/80 pb-8 dark:border-white/10 md:mb-12 md:pb-10"
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={panelTransition}
		>
			<p className="section-eyebrow">
				<span
					className="h-px w-8 bg-gradient-to-r from-fuchsia-400 to-cyan-400"
					aria-hidden
				/>
				{eyebrow}
				<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
					{secLabel}
				</span>
			</p>
			<h2 className="mt-3 font-display text-slate-900 dark:text-white">
				{title} <span className="text-gradient-future">{titleGradient}</span>
			</h2>
			{description ? (
				<p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
					{description}
				</p>
			) : null}
		</motion.div>
	);
}

const Projects = () => {
	return (
		<div id="projects" className="relative w-full scroll-mt-24 overflow-hidden">
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.17]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-1/4 top-20 h-[min(85vw,560px)] w-[min(85vw,560px)] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px] dark:bg-fuchsia-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-20 right-0 h-[min(75vw,480px)] w-[min(75vw,480px)] translate-x-1/3 rounded-full bg-cyan-400/10 blur-[105px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/25 to-transparent dark:via-fuchsia-400/35"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1240px] px-4 py-20 md:py-28">
				<motion.div
					className="mx-auto mb-16 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-20 md:pb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-30px" }}
					transition={panelTransition}
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500"
								aria-hidden
							/>
							Build log
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 04
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl">
						Selected <span className="text-gradient-future">work</span>
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
						Production platforms, client shipping, and high-fidelity clones —
						each with a dedicated case route.
					</p>
					<p className="mx-auto mt-3 max-w-xl font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
						Index · internal routes · hover for preview
					</p>
				</motion.div>

				<SubsectionHeader
					eyebrow="Projects"
					secLabel="/ 04A"
					title={"What I've"}
					titleGradient="Built"
					description="Real products and partnerships — e-commerce, export and marketing sites, procurement, HR / human capital, LMS, learning products, fintech experiments, and more."
				/>
				<motion.div
					className="grid gap-6 md:grid-cols-2 md:gap-8"
					variants={cardContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-50px" }}
				>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Sourcepin"
							backgroundImg={sourcepinImg}
							projectUrl="/sourcepin"
							tech="Multi-tenant procurement · Ethiopia & Malawi · Next.js · Hono · Drizzle · TypeScript"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Jiret"
							backgroundImg={jiretImg}
							projectUrl="/jiret"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Human Capital Management"
							backgroundImg={hcmImg}
							projectUrl="/hcm"
							tech="HCM / HR operations · Next.js · Hono · Neon · PostgreSQL · Drizzle"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Green Bag Ethiopia"
							backgroundImg={greenbagImg}
							projectUrl="/greenbag"
							tech="E-commerce · Next.js · TypeScript · Telegram bot · OpenRoute · AI commerce"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="AR solution trading PLC"
							backgroundImg={arSolutionsImg}
							projectUrl="/ar-solutions"
							tech="Digital marketing & web · Next.js · TypeScript · Brand site — Ethiopia"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Afrocado Exports"
							backgroundImg={afrocadoImg}
							projectUrl="/afrocado"
							tech="Premium produce export · Next.js · TypeScript · Lead generation"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Muyalogy"
							backgroundImg={muyalogyImg}
							projectUrl="/muyalogy"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Afriwork"
							backgroundImg={afriworkImg}
							projectUrl="/afriwork"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Loop state"
							backgroundImg={loopstateImg}
							projectUrl="/loopState"
						/>
					</motion.div>
					<motion.div variants={cardItem}>
						<ProjectItem
							title="Prime bank"
							backgroundImg={primebankImg}
							projectUrl="/prime"
						/>
					</motion.div>
				</motion.div>

				<div className="mt-24 md:mt-32">
					<SubsectionHeader
						eyebrow="Portfolio"
						secLabel="/ 04B"
						title="Personal"
						titleGradient="Projects"
						description="Sandbox builds, data viz, and experiments — UI patterns, 3D, and AI-assisted apps."
					/>
					<motion.div
						className="grid gap-6 md:grid-cols-2 md:gap-8"
						variants={cardContainer}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-50px" }}
					>
						<motion.div variants={cardItem}>
							<ProjectItem
								title="Conflict Reporter"
								backgroundImg={conflictReporterImg}
								projectUrl="/conflict-reporter"
								tech="Next.js · 3D globe · OpenRouter — situational reflection dashboard"
							/>
						</motion.div>
						<motion.div variants={cardItem}>
							<ProjectItem
								title="Netflix clone"
								backgroundImg="/assets/projects/netflix.jpg"
								projectUrl="/netflixClone"
							/>
						</motion.div>
						<motion.div variants={cardItem}>
							<ProjectItem
								title="Airbnb clone"
								backgroundImg="/assets/projects/Airbnb1.jpg"
								projectUrl="/airbnb"
							/>
						</motion.div>
						<motion.div variants={cardItem}>
							<ProjectItem
								title="Crypto App"
								backgroundImg="/assets/projects/crypto1.jpg"
								projectUrl="/crypto"
							/>
						</motion.div>
						<motion.div variants={cardItem}>
							<ProjectItem
								title="Youtube clone"
								backgroundImg="/assets/projects/youtube.jpg"
								projectUrl="/youtube"
							/>
						</motion.div>
						<motion.div variants={cardItem}>
							<ProjectItem
								title="Covid -19 Tracker"
								backgroundImg="/assets/projects/covidl.jpg"
								projectUrl="/covid"
							/>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default Projects;
