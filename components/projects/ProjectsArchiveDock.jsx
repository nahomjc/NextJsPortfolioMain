export default function ProjectsArchiveDock({
	projects,
	activeIndex,
	jumpToProject,
	segmentRefs,
}) {
	return (
		<div className="projects-archive-dock relative z-20 border-t border-cyan-400/15 bg-black/40 px-4 py-3 backdrop-blur-md sm:px-6">
			<div className="mb-2 flex items-center justify-between gap-2">
				<p className="font-mono text-[8px] uppercase tracking-[0.22em] text-cyan-400/70">
					Deployment index
				</p>
				<p className="font-mono text-[8px] text-slate-500">
					{String(activeIndex + 1).padStart(2, "0")} /{" "}
					{String(projects.length).padStart(2, "0")}
				</p>
			</div>
			<div className="projects-archive-dock__track flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
				{projects.map((project, i) => {
					const active = activeIndex === i;
					return (
						<button
							key={project.projectUrl}
							type="button"
							onClick={() => jumpToProject(i)}
							aria-current={active ? "true" : undefined}
							ref={(el) => {
								segmentRefs.current[i] = el;
							}}
							className={`projects-dock-pill unstyled group relative shrink-0 overflow-hidden rounded-lg border px-3 py-2 text-left transition duration-300 ${
								active
									? "is-active border-cyan-400/60 bg-cyan-500/15 shadow-[0_0_24px_rgba(34,211,238,0.25)]"
									: "border-white/10 bg-white/5 hover:border-cyan-400/35 hover:bg-cyan-500/8"
							}`}
						>
							<span className="block font-mono text-[7px] uppercase tracking-[0.14em] text-slate-500">
								PKG-{String(i + 1).padStart(2, "0")}
							</span>
							<span
								className={`mt-0.5 block max-w-[9rem] truncate text-xs font-semibold ${
									active ? "text-white" : "text-slate-400 group-hover:text-cyan-100"
								}`}
							>
								{project.title}
							</span>
							{active ? (
								<span
									className="projects-dock-pill__glow pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
									aria-hidden
								/>
							) : null}
						</button>
					);
				})}
			</div>
		</div>
	);
}
