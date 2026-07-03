import afriworkOverView from "../public/assets/projects/afriwork-view.png";
import ImageCarousel from "../components/ImageCarousel";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";
import ProjectDetailGallery from "../components/project-detail/ProjectDetailGallery";

const TECH = ["Next.js", "Tailwind", "Mantine", "Supabase", "Drizzle"];

const CAROUSEL = [
	{ src: "/assets/project-view/afriwork-view2.png", alt: "Afriwork platform overview", caption: "Learning platform overview" },
	{ src: "/assets/project-view/afriwork-view.png", alt: "Course management", caption: "Course management" },
	{ src: "/assets/project-view/afriwork-view3.png", alt: "Course curriculum", caption: "Course curriculum drag and drop" },
];

export default function Afriwork() {
	return (
		<ProjectDetailLayout
			title="Afriwork"
			stack="React · Next.js · Tailwind · Vercel"
			hero={afriworkOverView}
			heroAlt="Afriwork Learn LMS"
			technologies={TECH}
			eyebrow="Production dossier · PKG-08"
			pkgCode="08"
			demoUrl="https://learn.afriworket.com/"
			overview={
				<p>
					Afriwork Learn&apos;s LMS platform provides a comprehensive Job
					Readiness course designed to empower individuals to elevate their
					careers. Led by experienced industry professionals, the curriculum
					delivers a structured, step-by-step learning experience, equipping
					participants with the essential skills and confidence needed to navigate
					the job search successfully.
				</p>
			}
		>
			<ProjectDetailGallery title="Platform screens">
				<ImageCarousel
					images={CAROUSEL}
					autoPlayInterval={6000}
					showCaption
					showControls
					showDots
					showPlayPause
				/>
			</ProjectDetailGallery>
		</ProjectDetailLayout>
	);
}
