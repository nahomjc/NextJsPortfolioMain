import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTelegram, FaKey, FaLock } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { HiOutlineChatAlt2, HiOutlinePhotograph } from "react-icons/hi";

const cardSpring = { type: "spring", stiffness: 320, damping: 28 };

const capabilities = [
	{
		title: "OpenAI · Image generation",
		icon: HiOutlinePhotograph,
		body: "Built workflows that call the OpenAI API for image generation, with keys and requests kept server-side (environment variables only — never exposed in the client).",
		accent: "from-emerald-400/90 to-cyan-500/80",
	},
	{
		title: "OpenRouter · Chat assistants",
		icon: HiOutlineChatAlt2,
		body: "Integrated OpenRouter to power conversational UIs and bots with flexible model routing, so replies stay fast and costs stay predictable across providers.",
		accent: "from-violet-400/90 to-fuchsia-500/80",
	},
	{
		title: "Telegram · AI-backed bots",
		icon: FaTelegram,
		body: "Connected Telegram bot flows to AI backends for guided answers, course context, and automation — pairing chat UX with secure server logic.",
		accent: "from-sky-400/90 to-blue-500/80",
	},
];

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.08, delayChildren: 0.05 },
	},
};

const itemVar = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: cardSpring },
};

const AISection = () => {
	return (
		<section
			id="ai"
			className="relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.17]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-1/2 top-1/3 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/12"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 right-1/4 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-violet-500/12 blur-[100px] dark:bg-violet-500/16"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent dark:via-emerald-400/40"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-6xl">
				<motion.div
					className="mx-auto mb-14 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-16 md:pb-12"
					initial={{ opacity: 0, y: 18 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={cardSpring}
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-emerald-400 to-violet-500"
								aria-hidden
							/>
							AI integrations
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 05
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl">
						Intelligent{" "}
						<span className="text-gradient-future">systems</span>
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
						Production-minded AI wiring: OpenAI for images, OpenRouter for chat,
						and Telegram as a front door — always with secrets on the server.
					</p>
					<div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
						<span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 dark:border-white/10 dark:bg-slate-900/50">
							<FaLock className="text-emerald-600 dark:text-emerald-400" aria-hidden />
							Keys in env / server only
						</span>
						<span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 dark:border-white/10 dark:bg-slate-900/50">
							<FaKey className="text-violet-600 dark:text-violet-400" aria-hidden />
							No client-exposed secrets
						</span>
					</div>
				</motion.div>

				<div className="mb-14 grid gap-6 lg:grid-cols-2 lg:gap-10">
					<motion.div
						className="relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark"
						initial={{ opacity: 0, x: -16 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={cardSpring}
					>
						<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
						<div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-emerald-400/50" />
						<div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-violet-400/50" />
						<div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-950/50">
							<Image
								src="/assets/channel-admin.jpg"
								alt="Telegram channel and bot context — AI-integrated community workflows"
								layout="fill"
								objectFit="cover"
								className="opacity-95"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/20" />
							<div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/90 text-white shadow-lg">
									<FaTelegram className="text-xl" aria-hidden />
								</div>
								<div>
									<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/90">
										Telegram × AI
									</p>
									<p className="text-sm font-semibold text-white drop-shadow">
										Bot + channel ops with model-backed replies
									</p>
								</div>
							</div>
						</div>
						<div className="relative space-y-3 p-5 md:p-6">
							<p className="leading-relaxed text-slate-600 dark:text-slate-400">
								At <strong className="text-slate-800 dark:text-slate-200">Muyalogy</strong> I
								shipped a Telegram bot alongside the main Next.js product — wired into AI
								services so learners get contextual help without leaving the app ecosystem.
							</p>
							<Link
								href="/#projects"
								className="inline-flex text-sm font-semibold text-cyan-600 underline decoration-cyan-500/35 underline-offset-4 transition hover:text-violet-600 hover:decoration-violet-400/50 dark:text-cyan-400 dark:hover:text-violet-300"
							>
								See related builds →
							</Link>
						</div>
					</motion.div>

					<motion.div
						variants={container}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: "-40px" }}
						className="flex flex-col gap-4"
					>
						<motion.div
							variants={itemVar}
							className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-900/45"
						>
							<SiOpenai className="text-2xl text-slate-800 dark:text-emerald-300" aria-hidden />
							<div>
								<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
									Vendors
								</p>
								<p className="text-sm font-medium text-slate-800 dark:text-slate-200">
									OpenAI · OpenRouter · Telegram Bot API
								</p>
							</div>
						</motion.div>

						{capabilities.map((cap) => (
							<motion.div
								key={cap.title}
								variants={itemVar}
								className="group relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 p-5 shadow-sm backdrop-blur-md transition hover:border-cyan-400/30 hover:shadow-glow dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-cyan-400/25"
							>
								<div
									className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${cap.accent} opacity-15 blur-2xl transition group-hover:opacity-25`}
									aria-hidden
								/>
								<div className="relative flex gap-4">
									<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100/90 text-slate-800 dark:border-white/10 dark:bg-slate-950/60 dark:text-cyan-300">
										<cap.icon className="text-xl" aria-hidden />
									</div>
									<div>
										<h3 className="font-display text-base font-bold text-slate-900 dark:text-white md:text-lg">
											{cap.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
											{cap.body}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				<motion.p
					className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
				>
					Try the on-site assistant · RoboDog chat widget
				</motion.p>
			</div>
		</section>
	);
};

export default AISection;
