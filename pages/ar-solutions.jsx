import arHero from "../public/assets/Screenshot 2026-03-28 024007.png";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["Next.js", "TypeScript", "Responsive UI", "SEO & content"];

export default function ARSolutions() {
	return (
		<ProjectDetailLayout
			title="AR solution trading PLC"
			stack="Next.js · TypeScript · Marketing & brand web experience"
			hero={arHero}
			heroAlt="AR solution trading PLC — digital marketing and web development"
			technologies={TECH}
			eyebrow="Production dossier · PKG-05"
			pkgCode="05"
			liveUrl="https://www.ar-solutions-plc.com/"
			overview={
				<p>
					<strong>AR solution trading PLC</strong> is a{" "}
					<strong>digital marketing and trading solutions</strong> company in
					Ethiopia. I contributed as a <strong>full-stack engineer</strong> on
					their public site — hero, services, testimonials, and contact flows —
					built with <strong>Next.js</strong> and <strong>TypeScript</strong>,
					emphasizing performance, SEO-friendly structure, and a polished brand
					presentation aligned with their positioning around digital strategy,
					brand development, and web development offerings.
				</p>
			}
		/>
	);
}
