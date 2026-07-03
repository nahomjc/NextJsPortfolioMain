import jiretOverView from "../public/assets/projects/jiret-view.png";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["Next.js", "Tailwind", "Mantine"];

export default function Jiret() {
	return (
		<ProjectDetailLayout
			title="Jiret Learning Platform"
			stack="React · Next.js · Tailwind · Vercel"
			hero={jiretOverView}
			heroAlt="Jiret learning platform"
			technologies={TECH}
			eyebrow="Production dossier · PKG-02"
			pkgCode="02"
			demoUrl="https://jiret.com"
			overview={
				<p>
					Jiret is an online learning platform that empowers creators to design
					and deliver immersive educational experiences. It provides tools for
					building dynamic courses, offering downloadable resources, streaming live
					broadcasts, and offering personalized coaching. The platform aims to offer
					both creators and learners a versatile, engaging, and accessible
					environment where individuals can grow, interact, and succeed in their
					learning journeys.
				</p>
			}
		/>
	);
}
