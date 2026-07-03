import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "./LenisProvider";
import { scrollToProgress, scheduleScrollTriggerRefresh } from "../lib/gsapScroll";
import { productionProjects } from "./projects/projectsData";
import ProjectsHero from "./projects/ProjectsHero";
import ProjectsTheatre from "./projects/ProjectsTheatre";
import ProjectsMobile from "./projects/ProjectsMobile";
import ProjectsSandbox from "./projects/ProjectsSandbox";
import ProjectsProductionBento from "./projects/ProjectsProductionBento";
import useProjectsAnimations from "./projects/useProjectsAnimations";

const Projects = () => {
	const reduceMotion = useReducedMotion();
	const lenis = useLenis();
	const [activeIndex, setActiveIndex] = useState(0);

	const sectionRef = useRef(null);
	const heroRef = useRef(null);
	const heroDescRef = useRef(null);
	const heroScanRef = useRef(null);
	const bgIndexRef = useRef(null);
	const theatreRef = useRef(null);
	const pinRef = useRef(null);
	const theatreGlowRef = useRef(null);
	const scanBeamRef = useRef(null);
	const circuitBgRef = useRef(null);
	const bgBuildRef = useRef(null);
	const bgShipRef = useRef(null);
	const hudRailRef = useRef(null);
	const stageDividerRef = useRef(null);
	const previewRefs = useRef([]);
	const dossierRefs = useRef([]);
	const ghostRefs = useRef([]);
	const segmentRefs = useRef([]);
	const sandboxRef = useRef(null);
	const sandboxCardRefs = useRef([]);
	const bentoRef = useRef(null);
	const bentoCardRefs = useRef([]);
	const mobileCardRefs = useRef([]);

	const animationRefs = useRef({
		heroRef,
		heroDescRef,
		heroScanRef,
		bgIndexRef,
		theatreRef,
		pinRef,
		theatreGlowRef,
		scanBeamRef,
		circuitBgRef,
		bgBuildRef,
		bgShipRef,
		hudRailRef,
		stageDividerRef,
		previewRefs,
		dossierRefs,
		ghostRefs,
		segmentRefs,
		sandboxRef,
		sandboxCardRefs,
		bentoRef,
		bentoCardRefs,
		mobileCardRefs,
	});

	const jumpToProject = useCallback(
		(index) => {
			const count = productionProjects.length;
			if (index < 0 || index >= count) return;
			const progress = count > 1 ? index / (count - 1) : 0;
			scrollToProgress(progress, {
				lenis,
				duration: 1.1,
				pinId: "projects-theatre-pin",
			});
		},
		[lenis],
	);

	useProjectsAnimations({
		sectionRef,
		refs: animationRefs.current,
		reduceMotion,
		setActiveIndex,
	});

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;
		scheduleScrollTriggerRefresh(400);
	}, [reduceMotion]);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="projects-section projects-section--vault about-section--interface relative w-full scroll-mt-24 overflow-hidden text-slate-100"
		>
			<div
				className="projects-section__mesh about-section__mesh pointer-events-none absolute inset-0"
				aria-hidden
			/>
			<div
				className="projects-section__vignette about-section__vignette pointer-events-none absolute inset-0"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-0 top-0 h-[min(75vw,560px)] w-[min(75vw,560px)] -translate-x-1/4 rounded-full bg-cyan-400/10 blur-[120px]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute right-0 bottom-0 h-[min(65vw,480px)] w-[min(65vw,480px)] translate-x-1/4 rounded-full bg-fuchsia-500/8 blur-[100px]"
				aria-hidden
			/>

			<div className="relative z-10 px-4 pb-16 pt-10 md:pb-24 md:pt-20">
				<div className="mx-auto max-w-[1240px]">
					<ProjectsHero
						heroRef={heroRef}
						heroDescRef={heroDescRef}
						heroScanRef={heroScanRef}
						bgIndexRef={bgIndexRef}
					/>

					<ProjectsTheatre
						theatreRef={theatreRef}
						pinRef={pinRef}
						theatreGlowRef={theatreGlowRef}
						scanBeamRef={scanBeamRef}
						circuitBgRef={circuitBgRef}
						bgBuildRef={bgBuildRef}
						bgShipRef={bgShipRef}
						hudRailRef={hudRailRef}
						stageDividerRef={stageDividerRef}
						previewRefs={previewRefs}
						dossierRefs={dossierRefs}
						ghostRefs={ghostRefs}
						segmentRefs={segmentRefs}
						activeIndex={activeIndex}
						jumpToProject={jumpToProject}
					/>

					<ProjectsProductionBento
						bentoRef={bentoRef}
						cardRefs={bentoCardRefs}
					/>

					<ProjectsMobile mobileCardRefs={mobileCardRefs} />

					<ProjectsSandbox
						sandboxRef={sandboxRef}
						cardRefs={sandboxCardRefs}
					/>
				</div>
			</div>
		</section>
	);
};

export default Projects;
