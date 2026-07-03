import muyalogyOverView from "../public/assets/projects/muyalogy-view.png";
import ImageCarousel from "../components/ImageCarousel";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";
import ProjectDetailGallery from "../components/project-detail/ProjectDetailGallery";

const TECH = ["Next.js", "Tailwind", "Mantine", "Supabase", "JavaScript", "Firebase"];

const CAROUSEL = [
	{ src: "/assets/project-view/muyalogy-view.png", alt: "Muyalogy overview", caption: "Course details" },
	{ src: "/assets/project-view/muyalogy-view2.png", alt: "Course cart", caption: "Course cart overview" },
	{ src: "/assets/project-view/muyalogy-view3.png", alt: "Instructor dashboard", caption: "Instructor dashboard" },
];

export default function Muyalogy() {
	return (
		<ProjectDetailLayout
			title="Muyalogy"
			stack="React · Next.js · Tailwind · Vercel"
			hero={muyalogyOverView}
			heroAlt="Muyalogy learning platform"
			technologies={TECH}
			eyebrow="Production dossier · PKG-07"
			pkgCode="07"
			demoUrl="https://muyalogy.com"
			overview={
				<p>
					Muyalogy is an Ethiopian digital learning platform dedicated to providing
					accessible, skills-based education to address the country&apos;s job market
					skills gap. It offers online courses in technology, business, and personal
					development, aiming to equip individuals with practical skills aligned with
					industry demands, thereby empowering them for employment and
					entrepreneurship.
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
