import ProjectItem from "../ProjectItem";
import { TerminalFrame } from "../about/DeckChrome";
import { personalProjects, productionProjects } from "./projectsData";

function MobileVaultCard({ children, label, code, cardRef }) {
	return (
		<article ref={cardRef} className="projects-mobile-vault about-mobile-vault relative">
			<span
				className="about-mobile-vault__watermark pointer-events-none absolute -right-2 top-2 font-display text-7xl font-bold leading-none text-cyan-400/[0.06]"
				aria-hidden
			>
				{code}
			</span>
			<TerminalFrame title={`mobile / ${label}`}>{children}</TerminalFrame>
		</article>
	);
}

export default function ProjectsMobile({ mobileCardRefs }) {
	let cardIndex = 0;

	return (
		<div className="projects-mobile-stack space-y-6 lg:hidden">
			<div className="about-mobile-vault__intro text-center">
				<p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-400">
					Build stream
				</p>
				<p className="mt-1 text-sm text-slate-400">
					Production + sandbox dossiers
				</p>
			</div>

			{productionProjects.map((project, index) => {
				const refIndex = cardIndex;
				cardIndex += 1;
				return (
					<MobileVaultCard
						key={project.projectUrl}
						label={project.title.toLowerCase()}
						code={String(index + 1).padStart(2, "0")}
						cardRef={(el) => {
							mobileCardRefs.current[refIndex] = el;
						}}
					>
						<ProjectItem
							index={index}
							variant="production"
							featured={project.featured}
							{...project}
						/>
					</MobileVaultCard>
				);
			})}

			<div className="pt-4 text-center">
				<p className="font-mono text-[10px] uppercase tracking-[0.28em] text-fuchsia-400/80">
					Sandbox archive
				</p>
			</div>

			{personalProjects.map((project, index) => {
				const refIndex = cardIndex;
				cardIndex += 1;
				return (
					<MobileVaultCard
						key={project.projectUrl}
						label={project.title.toLowerCase()}
						code={`S${String(index + 1).padStart(2, "0")}`}
						cardRef={(el) => {
							mobileCardRefs.current[refIndex] = el;
						}}
					>
						<ProjectItem index={index} variant="personal" {...project} />
					</MobileVaultCard>
				);
			})}
		</div>
	);
}
