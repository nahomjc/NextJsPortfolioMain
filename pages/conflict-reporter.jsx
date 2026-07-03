import conflictHero from "../public/assets/global-conflict.vercel.app_ (1).png";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["Next.js", "3D visualization", "OpenRouter"];

export default function ConflictReporter() {
	return (
		<ProjectDetailLayout
			title="Conflict Reporter"
			stack="Situational reflection · Next.js · 3D visualization · OpenRouter"
			hero={conflictHero}
			heroAlt="Conflict Reporter — situational reflection dashboard with 3D globe"
			technologies={TECH}
			eyebrow="Sandbox dossier · S01"
			pkgCode="S1"
			variant="sandbox"
			demoUrl="https://global-conflict.vercel.app"
			demoLabel="Open live demo"
			overview={
				<>
					<p className="text-lg font-medium text-white">
						Turn confusing, scattered conflict news into something visual and
						explorable.
					</p>
					<p className="mt-4">
						<strong>Conflict Reporter</strong> aggregates signals into a single
						surface: stats, filters, a <strong>3D globe</strong> for trajectories
						and regions, and a live-style feed where <strong>OpenRouter</strong>{" "}
						helps structure and label AI-assisted summaries tied to real sources.
						Built with <strong>Next.js</strong> end-to-end for routing, data
						fetching, and the immersive UI.
					</p>
				</>
			}
		/>
	);
}
