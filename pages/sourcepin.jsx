import sourcepinHero from "../public/assets/Screenshot 2026-03-28 004531.png";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["Next.js", "Hono", "Drizzle ORM", "TypeScript", "Multi-tenant"];

export default function Sourcepin() {
	return (
		<ProjectDetailLayout
			title="Sourcepin"
			stack="Next.js · Hono · Drizzle ORM · TypeScript"
			hero={sourcepinHero}
			heroAlt="Sourcepin — procurement platform"
			technologies={TECH}
			eyebrow="Production dossier · PKG-01"
			pkgCode="01"
			overview={
				<p>
					Sourcepin is a <strong>multi-tenant procurement</strong> system for
					organizations in <strong>Ethiopia and Malawi</strong>—supporting
					sourcing, supplier onboarding, approvals, and tenant-isolated data so
					each customer runs on the same platform without leaking context. The
					stack pairs a <strong>Next.js</strong> front end with a{" "}
					<strong>Hono</strong> API layer and <strong>Drizzle ORM</strong> for
					type-safe, maintainable persistence in <strong>TypeScript</strong>.
				</p>
			}
		/>
	);
}
