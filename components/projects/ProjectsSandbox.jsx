import ProjectItem from "../ProjectItem";
import HudCorners from "../about/HudCorners";
import { personalProjects } from "./projectsData";

export default function ProjectsSandbox({ sandboxRef, cardRefs }) {
	return (
		<div ref={sandboxRef} className="projects-sandbox-vault relative mt-16 hidden lg:block md:mt-24">
			<div className="projects-command-vault about-command-vault relative overflow-hidden rounded-[1.5rem]">
				<div className="about-command-vault__noise pointer-events-none absolute inset-0" aria-hidden />
				<div className="about-theatre-glow pointer-events-none absolute inset-0 opacity-50" aria-hidden />

				<div className="about-command-vault__header relative z-10 flex items-center justify-between border-b border-cyan-400/15 px-6 py-4">
					<div className="flex items-center gap-3">
						<span className="about-command-vault__logo flex h-8 w-8 items-center justify-center rounded-md border border-violet-400/40 bg-violet-500/10 font-mono text-xs font-bold text-violet-200">
							SB
						</span>
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[0.28em] text-violet-200">
								Sandbox Archive
							</p>
							<p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
								Experiments · UI · 3D · AI apps
							</p>
						</div>
					</div>
					<span className="rounded-full border border-fuchsia-400/35 bg-fuchsia-500/10 px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fuchsia-200">
						{personalProjects.length} routes
					</span>
				</div>

				<div className="relative z-10 p-6 md:p-8">
					<header className="projects-subheader projects-subheader--vault relative mb-8">
						<p className="section-eyebrow">
							<span
								className="h-px w-10 bg-gradient-to-r from-fuchsia-400 to-cyan-400"
								aria-hidden
							/>
							<span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300">
								Portfolio <span className="text-slate-500">/ 04B</span>
							</span>
						</p>
						<h3 className="mt-4 font-display text-2xl font-bold text-white md:text-3xl">
							Personal{" "}
							<span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
								Projects
							</span>
						</h3>
						<p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
							Sandbox builds, data viz, and experiments — UI patterns, 3D, and
							AI-assisted apps.
						</p>
						<div
							className="projects-subheader-line mt-5 h-px origin-left bg-gradient-to-r from-fuchsia-400/70 via-cyan-400/50 to-transparent"
							aria-hidden
						/>
					</header>

					<div className="projects-sandbox-grid relative">
						<HudCorners />
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
							{personalProjects.map((project, index) => (
								<ProjectItem
									key={project.projectUrl}
									ref={(el) => {
										cardRefs.current[index] = el;
									}}
									index={index}
									variant="personal"
									{...project}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
