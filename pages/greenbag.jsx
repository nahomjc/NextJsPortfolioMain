import greenbagHero from "../public/assets/Screenshot 2026-03-28 023643.png";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["Next.js", "TypeScript", "Telegram bot", "OpenRoute", "E-commerce"];

export default function GreenBag() {
	return (
		<ProjectDetailLayout
			title="Green Bag Ethiopia"
			stack="Next.js · TypeScript · Telegram · OpenRoute · AI-assisted commerce"
			hero={greenbagHero}
			heroAlt="Green Bag Ethiopia — eco-friendly paper bags e-commerce"
			technologies={TECH}
			eyebrow="Production dossier · PKG-04"
			pkgCode="04"
			liveUrl="https://greenbag-ethiopia.com/"
			overview={
				<p>
					<strong>Green Bag Ethiopia</strong> is a production{" "}
					<strong>e-commerce</strong> platform for eco-friendly paper bags and
					packaging — wholesale, custom designs, and retail flows — built for the
					Ethiopian market. I worked on it as a{" "}
					<strong>full-stack engineer</strong>, shipping features across the{" "}
					<strong>Next.js</strong> and <strong>TypeScript</strong> stack,
					integrating a <strong>Telegram bot</strong> for notifications and
					assistant-style flows, and wiring <strong>OpenRoute</strong> for routing
					and location-aware experiences alongside AI-powered shopping features on
					the live storefront.
				</p>
			}
		/>
	);
}
