import primeOverView from "../public/assets/projects/prime-bank.png";
import ImageCarousel from "../components/ImageCarousel";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";
import ProjectDetailGallery from "../components/project-detail/ProjectDetailGallery";

const TECH = ["Next.js", "Drizzle ORM", "Tailwind", "Mantine", "Supabase"];

const CAROUSEL = [
	{ src: "/assets/project-view/prime-view.png", alt: "Prime platform overview", caption: "Course details" },
	{ src: "/assets/project-view/prime-view2.png", alt: "Classroom", caption: "Classroom overview" },
];

export default function Prime() {
	return (
		<ProjectDetailLayout
			title="Prime Integrated Services"
			stack="React · Next.js · Tailwind · Vercel"
			hero={primeOverView}
			heroAlt="Prime Integrated Services"
			technologies={TECH}
			eyebrow="Production dossier · PKG-10"
			pkgCode="10"
			demoUrl="https://prime.jiret.site/"
			overview={
				<p>
					Prime Integrated Services PLC provides professional development courses
					designed to boost business performance. Their offerings include
					Relationship Management, Sales Force Effectiveness, Branch Management, and
					Compliance Risk Management, each tailored to enhance skills and drive
					success within the Ethiopian market.
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
