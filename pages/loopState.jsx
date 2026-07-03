import loopStateOverView from "../public/assets/projects/loop-state-view.png";
import ImageCarousel from "../components/ImageCarousel";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";
import ProjectDetailGallery from "../components/project-detail/ProjectDetailGallery";

const TECH = ["Next.js", "Vercel", "Clerk", "Tailwind", "Supabase"];

const CAROUSEL = [
	{ src: "/assets/project-view/loop-state-view.png", alt: "Loop platform overview", caption: "Course details" },
	{ src: "/assets/project-view/loop-state-view2.png", alt: "Course cart", caption: "Course cart overview" },
	{ src: "/assets/project-view/loop-state-view3.png", alt: "Instructor dashboard", caption: "Instructor dashboard" },
	{ src: "/assets/project-view/loop-state-view4.png", alt: "Instructor dashboard", caption: "Instructor dashboard" },
];

export default function LoopState() {
	return (
		<ProjectDetailLayout
			title="Loop State"
			stack="React · Next.js · Tailwind · Vercel"
			hero={loopStateOverView}
			heroAlt="Loop State fractional real estate"
			technologies={TECH}
			eyebrow="Production dossier · PKG-09"
			pkgCode="09"
			demoUrl="https://crowd-funded-stake.vercel.app/"
			overview={
				<p>
					Loop facilitates fractional real estate ownership, enabling individuals
					to confidently invest in real estate and build wealth by purchasing shares
					of properties alongside other investors. This approach democratizes real
					estate investment, lowering the barrier to entry and allowing for
					diversified portfolios.
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
