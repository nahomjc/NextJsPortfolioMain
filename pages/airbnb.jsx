import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["React", "CSS", "JavaScript", "Firebase"];

export default function Airbnb() {
	return (
		<ProjectDetailLayout
			title="Airbnb Clone"
			stack="React · CSS · Firebase"
			hero="/assets/projects/Airbnb1.jpg"
			heroAlt="Airbnb clone UI"
			technologies={TECH}
			eyebrow="Sandbox dossier · S03"
			pkgCode="S3"
			variant="sandbox"
			demoUrl="https://airbnb-clone-e2296.web.app/"
			codeUrl="https://github.com/nahomjc/airbnb-clone-website"
			overview={
				<p>
					Airbnb lets property owners rent out their spaces to travelers — this is
					a UI clone built with React and hosted on Firebase, styled with CSS.
				</p>
			}
		/>
	);
}
