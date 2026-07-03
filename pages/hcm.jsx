import hcmHero from "../public/assets/Screenshot 2026-03-28 005041.png";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["Next.js", "Hono", "Neon", "PostgreSQL", "Drizzle ORM"];

export default function HumanCapitalManagement() {
	return (
		<ProjectDetailLayout
			title="Human Capital Management"
			stack="Next.js · Hono · Neon · PostgreSQL · Drizzle ORM"
			hero={hcmHero}
			heroAlt="Human capital management system"
			technologies={TECH}
			eyebrow="Production dossier · PKG-03"
			pkgCode="03"
			overview={
				<p>
					A{" "}
					<strong>human capital management (HCM)</strong> platform for core HR
					operations—employee records, org structure, time-off and workflows where
					applicable—with a focus on reliable data and a fast product surface. The
					app is built with <strong>Next.js</strong> on the front end and{" "}
					<strong>Hono</strong> for APIs. Data lives in{" "}
					<strong>PostgreSQL</strong> on <strong>Neon</strong> (serverless
					Postgres), accessed through <strong>Drizzle ORM</strong> for typed,
					migration-friendly persistence.
				</p>
			}
		/>
	);
}
