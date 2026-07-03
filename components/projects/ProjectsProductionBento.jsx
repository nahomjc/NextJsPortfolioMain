import ProjectItem from "../ProjectItem";
import { productionProjects } from "./projectsData";

export default function ProjectsProductionBento({ bentoRef, cardRefs }) {
	const [featured, ...rest] = productionProjects;

	return (
		<div ref={bentoRef} className="projects-bento-vault relative mt-16 hidden lg:block">
			<div className="projects-bento-vault__header relative mb-8 overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-transparent to-fuchsia-500/10 px-6 py-5">
				<div className="projects-bento-vault__header-glow pointer-events-none absolute inset-0" aria-hidden />
				<p className="relative z-10 font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-300">
					Full production archive
				</p>
				<h3 className="relative z-10 mt-2 font-display text-2xl font-bold text-white md:text-3xl">
					What I&apos;ve{" "}
					<span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
						Built
					</span>
				</h3>
				<p className="relative z-10 mt-2 max-w-2xl text-sm text-slate-400">
					Real products and partnerships — e-commerce, export, procurement, HCM,
					LMS, fintech, and more.
				</p>
			</div>

			<div className="projects-bento-grid grid gap-5 lg:grid-cols-3 lg:gap-6">
				<div className="projects-bento-featured lg:col-span-2">
					<ProjectItem
						ref={(el) => {
							cardRefs.current[0] = el;
						}}
						index={0}
						variant="production"
						featured
						{...featured}
					/>
				</div>

				{rest.map((project, index) => (
					<div key={project.projectUrl}>
						<ProjectItem
							ref={(el) => {
								cardRefs.current[index + 1] = el;
							}}
							index={index + 1}
							variant="production"
							{...project}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
