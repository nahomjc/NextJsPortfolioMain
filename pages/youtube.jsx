import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["React", "Next.js", "Tailwind", "JavaScript", "Vercel"];

export default function Youtube() {
	return (
		<ProjectDetailLayout
			title="YouTube Clone"
			stack="Next.js · React · Tailwind · Vercel"
			hero="/assets/projects/youtube.jpg"
			heroAlt="YouTube clone"
			technologies={TECH}
			eyebrow="Sandbox dossier · S05"
			pkgCode="S5"
			variant="sandbox"
			demoUrl="https://youtube-clone-with-next-js-react-js-and-tail-wind-css-39au.vercel.app/"
			codeUrl="https://github.com/nahomjc/deployYoutubeClone"
			overview={
				<p>
					A YouTube landing UI clone built in Next.js and hosted on Vercel —
					watch, browse, and explore flows styled with Tailwind CSS.
				</p>
			}
		/>
	);
}
