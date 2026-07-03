import afrocadoHero from "../public/assets/Screenshot 2026-03-28 024200.png";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["Next.js", "TypeScript", "Responsive UI", "Lead / contact flows"];

export default function Afrocado() {
	return (
		<ProjectDetailLayout
			title="Afrocado Exports"
			stack="Next.js · TypeScript · Export & product storytelling"
			hero={afrocadoHero}
			heroAlt="Afrocado Exports — Ethiopia premium produce export"
			technologies={TECH}
			eyebrow="Production dossier · PKG-06"
			pkgCode="06"
			liveUrl="https://afrocadoexports.com/"
			overview={
				<p>
					<strong>Afrocado Exports</strong> presents{" "}
					<strong>Ethiopia&apos;s premium produce</strong> to international buyers
					— farmer-direct sourcing, logistics, and trust-led branding. As a{" "}
					<strong>full-stack engineer</strong>, I helped ship the marketing site on{" "}
					<strong>Next.js</strong> and <strong>TypeScript</strong>: product and
					values sections, contact and lead paths, and a visual language that
					matches their export positioning (quality, freshness, and global reach).
				</p>
			}
		/>
	);
}
