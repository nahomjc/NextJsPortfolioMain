import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import { aiAgentProducts } from "./aiAgents/aiAgentsData";
import AgentRobotFigure from "./aiAgents/AgentRobotFigure";
import { monoMetaClass, btnPrimary, btnGhost } from "./section/SectionShell";

function AgentRobotUnit({ agent, isActive, onSelect, index }) {
	const isOnline = Boolean(agent.liveUrl);

	return (
		<button
			type="button"
			onClick={() => onSelect(agent.id)}
			className={`agent-robot-unit unstyled w-full text-left normal-case tracking-normal shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-500 ${
				isActive ? "agent-robot-unit--active" : ""
			}`}
			aria-pressed={isActive}
			aria-labelledby={`agent-robot-name-${agent.id}`}
		>
			<AgentRobotFigure
				agent={agent}
				isActive={isActive}
				isOnline={isOnline}
				index={index}
			/>
			<div className="agent-robot-unit__meta">
				<p className={monoMetaClass}>{agent.role}</p>
				<h3
					id={`agent-robot-name-${agent.id}`}
					className="mt-1 font-display text-base font-semibold tracking-wide text-slate-900 dark:text-white md:text-lg"
				>
					{agent.name}
				</h3>
				<p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400 md:text-sm">
					{agent.tagline}
				</p>
			</div>
		</button>
	);
}

export default function AIAgentsShowcase() {
	const [activeId, setActiveId] = useState(aiAgentProducts[0].id);
	const active =
		aiAgentProducts.find((a) => a.id === activeId) ?? aiAgentProducts[0];

	return (
		<div id="ai-agents" className="scroll-mt-28">
			<div className="mb-10 max-w-2xl">
				<p className={monoMetaClass}>
					<span className="text-cyan-700 dark:text-cyan-300">agent.lab</span>
				</p>
				<h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-3xl">
					Deployed agent units
				</h3>
				<p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-[15px]">
					Tap a robot for details — job hunting, gym ops, and ETB finance agents
					with tool-backed AI.
				</p>
			</div>

			<div className="agent-robot-bay__grid">
				{aiAgentProducts.map((agent, i) => (
					<AgentRobotUnit
						key={agent.id}
						agent={agent}
						index={i}
						isActive={agent.id === activeId}
						onSelect={setActiveId}
					/>
				))}
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={active.id}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
					className="agent-mission-brief mt-12 border-t border-slate-900/10 pt-10 dark:border-white/10 md:mt-14 md:pt-12"
				>
					<div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
						<div>
							<p className={monoMetaClass}>
								Mission brief · {active.unitId}
							</p>
							<p className="mt-1 font-display text-lg font-semibold text-slate-900 dark:text-white">
								{active.name}
							</p>
							<p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">
								{active.summary}
							</p>
							<ul className="mt-6 space-y-2.5">
								{active.highlights.map((item) => (
									<li
										key={item}
										className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
									>
										<span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-500" aria-hidden />
										{item}
									</li>
								))}
							</ul>
						</div>

						<div className="flex flex-col gap-6">
							<div>
								<p className={monoMetaClass}>Core stack</p>
								<p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
									{active.stack.join(" · ")}
								</p>
							</div>

							<div>
								<p className={`${monoMetaClass} text-cyan-700 dark:text-cyan-300`}>
									Runtime
								</p>
								<p className="mt-2 font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-400 md:text-sm">
									{active.id === "job-hunter"
										? "LOAD profile FROM db · REQUIRE cv · HUNT boards · REPORT counts"
										: active.id === "gym-green"
											? "SCOPE gym_id · ANSWER roster|renewals|ETB · TELEGRAM channels"
											: "CONTEXT etb · TRACK expenses · PLAN budget · ETB plans"}
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								{active.liveUrl ? (
									<Link
										href={active.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={`${btnPrimary} gap-2`}
									>
										Open live app
										<HiOutlineExternalLink className="text-sm" aria-hidden />
									</Link>
								) : (
									<span
										className={`${btnGhost} cursor-default opacity-80`}
										title="Demo available on request"
									>
										Lab build — on request
									</span>
								)}
								<Link href="/#contact" className={btnGhost}>
									Ask about this agent
								</Link>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
