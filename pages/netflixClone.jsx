import ImageCarousel from "../components/ImageCarousel";
import ProjectDetailLayout from "../components/project-detail/ProjectDetailLayout";
import ProjectDetailGallery from "../components/project-detail/ProjectDetailGallery";

const TECH = ["Next.js", "React", "Tailwind CSS", "Shadcn", "TMDB API", "Vercel"];

const CAROUSEL = [
	{ src: "/assets/project-view/netflix-view1.png", alt: "Netflix landing", caption: "Netflix landing page" },
	{ src: "/assets/project-view/netflix-view2.png", alt: "Genre page", caption: "Netflix genre page" },
	{ src: "/assets/project-view/netflix-view3.png", alt: "Login page", caption: "Netflix login page" },
	{ src: "/assets/project-view/netflix-view4.png", alt: "Mobile view", caption: "Responsive view" },
];

export default function NetflixClone() {
	return (
		<ProjectDetailLayout
			title="Netflix Clone"
			stack="Next.js · React · Tailwind · TMDB API"
			hero="/assets/projects/netflix.jpg"
			heroAlt="Netflix clone"
			technologies={TECH}
			eyebrow="Sandbox dossier · S02"
			pkgCode="S2"
			variant="sandbox"
			demoUrl="https://netflix-clone-ai.vercel.app/"
			overview={
				<p>
					A Netflix clone built using Next.js, Shadcn, and Tailwind CSS. It
					leverages the TMDB API to fetch movie lists and allows for movie
					searching — streamlined access to movies with a fast and smooth user
					experience.
				</p>
			}
		>
			<ProjectDetailGallery title="UI screens">
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
