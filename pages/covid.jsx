import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";

const TECH = ["React", "CSS", "JavaScript", "Firebase", "WHO API"];

export default function Covid() {
	return (
		<ProjectDetailLayout
			title="Covid-19 Tracker"
			stack="React · CSS · Firebase · WHO data"
			hero="/assets/projects/covidl.jpg"
			heroAlt="Covid-19 tracker"
			technologies={TECH}
			eyebrow="Sandbox dossier · S06"
			pkgCode="S6"
			variant="sandbox"
			demoUrl="https://covid-tracker-5f81e.web.app/"
			codeUrl="https://github.com/nahomjc/covid-19-tracker"
			overview={
				<p>
					Built with React and CSS, hosted on Firebase. Tracks worldwide Covid-19
					live data using the World Health Organization API.
				</p>
			}
		/>
	);
}
