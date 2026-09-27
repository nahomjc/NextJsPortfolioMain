import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTelegram, FaLock } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { HiOutlineChatAlt2, HiOutlinePhotograph } from "react-icons/hi";
import SectionShell, {
	panelClass,
	monoMetaClass,
	linkAccentClass,
} from "./section/SectionShell";

const capabilities = [
	{
		title: "OpenAI · Image generation",
		icon: HiOutlinePhotograph,
		body: "Workflows that call the OpenAI API for image generation, with keys and requests kept server-side. Never exposed in the client.",
	},
	{
		title: "OpenRouter · Chat assistants",
		icon: HiOutlineChatAlt2,
		body: "Conversational UIs and bots with flexible model routing so replies stay fast and costs stay predictable across providers.",
	},
	{
		title: "Telegram · AI-backed bots",
		icon: FaTelegram,
		body: "Bot flows connected to AI backends for guided answers, course context, and automation. Chat UX with secure server logic.",
	},
];

const AISection = () => {
	return (
		<SectionShell
			id="ai"
			index="05"
			eyebrow="ai.agents"
			title="AI that ships in product"
			description="Agents, bots, and model-backed features. Keys stay on the server."
		>
			<div className="mb-10 flex flex-wrap gap-3">
				<span
					className={`${panelClass} inline-flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300`}
				>
					<SiOpenai className="text-cyan-700 dark:text-cyan-300" aria-hidden />
					OpenAI · OpenRouter · Telegram
				</span>
				<span
					className={`${panelClass} inline-flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300`}
				>
					<FaLock className="text-cyan-700 dark:text-cyan-300" aria-hidden />
					Server-side keys only
				</span>
			</div>

			<div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
				<div className="overflow-hidden rounded-2xl border border-slate-900/10 dark:border-white/10">
					<div className="relative aspect-[16/10] w-full bg-slate-950">
						<Image
							src="/assets/channel-admin.jpg"
							alt="Telegram channel and bot context, AI-integrated community workflows"
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
						<div
							className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"
							aria-hidden
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6">
							<p className={`${monoMetaClass} text-cyan-300`}>Case · Muyalogy</p>
							<p className="mt-1 text-lg font-semibold text-white">
								Telegram bot + model-backed learner support
							</p>
						</div>
					</div>
					<div className="border-t border-slate-900/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
						<p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
							Shipped a Telegram bot alongside the main Next.js product, wired into
							AI services so learners get contextual help without leaving the app
							ecosystem.
						</p>
						<Link
							href="/#projects"
							className={`mt-4 inline-flex text-sm font-semibold ${linkAccentClass}`}
						>
							See related builds →
						</Link>
					</div>
				</div>

				<ul className="flex flex-col gap-4">
					{capabilities.map((cap, i) => {
						const Icon = cap.icon;
						return (
							<li
								key={cap.title}
								className={`${panelClass} group p-5 transition hover:border-cyan-500/30`}
							>
								<div className="flex items-start gap-4">
									<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
										<Icon className="text-lg" aria-hidden />
									</span>
									<div>
										<p className={monoMetaClass}>
											{String(i + 1).padStart(2, "0")}
										</p>
										<h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
											{cap.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
											{cap.body}
										</p>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</SectionShell>
	);
};

export default AISection;
