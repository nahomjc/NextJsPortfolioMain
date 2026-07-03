export default function ProjectsArchiveRail({
	projects,
	activeIndex,
	jumpToProject,
	segmentRefs,
	hudRailRef,
}) {
	return (
		<nav
			className="projects-archive-rail about-scene-rail relative z-40 flex flex-col"
			aria-label="Production archive"
		>
			<p className="mb-4 font-mono text-[8px] uppercase tracking-[0.24em] text-cyan-500/70">
				Deployments
			</p>
			<div className="about-scene-rail__track relative flex flex-1 flex-col gap-0.5 overflow-y-auto pr-1">
				<div
					ref={hudRailRef}
					className="about-scene-rail__progress pointer-events-none absolute bottom-0 left-[1.125rem] top-0 w-px"
					aria-hidden
				>
					<span className="about-hud-rail__fill about-scene-rail__fill block h-full w-full origin-top" />
				</div>
				{projects.map((project, i) => {
					const active = activeIndex === i;
					const passed = i < activeIndex;
					const code = String(i + 1).padStart(2, "0");
					return (
						<button
							key={project.projectUrl}
							type="button"
							onClick={() => jumpToProject(i)}
							aria-current={active ? "true" : undefined}
							ref={(el) => {
								segmentRefs.current[i] = el;
							}}
							className={`about-scene-rail__node unstyled group relative flex items-center gap-2.5 rounded-lg py-1.5 pl-1 pr-2 text-left transition duration-300 ${
								active ? "is-active" : passed ? "is-passed" : ""
							}`}
						>
							<span
								className={`about-scene-rail__dot relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[9px] font-bold transition duration-300 ${
									active
										? "border-cyan-300 bg-cyan-400/20 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.55)]"
										: passed
											? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300/80"
											: "border-white/10 bg-black/30 text-slate-500 group-hover:border-cyan-400/40 group-hover:text-cyan-200"
								}`}
							>
								{code}
							</span>
							<span className="min-w-0">
								<span
									className={`block font-mono text-[7px] uppercase tracking-[0.16em] ${
										active ? "text-cyan-300" : "text-slate-500"
									}`}
								>
									{project.featured ? "Flagship" : "Prod"}
								</span>
								<span
									className={`block truncate text-[11px] font-semibold ${
										active ? "text-white" : "text-slate-400"
									}`}
								>
									{project.title}
								</span>
							</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
}
