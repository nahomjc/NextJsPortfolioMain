import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "./LenisProvider";
import { scrollToProgress, scheduleScrollTriggerRefresh } from "../lib/gsapScroll";
import { SCENES } from "./about/aboutData";
import AboutHero from "./about/AboutHero";
import AboutTheatre from "./about/AboutTheatre";
import AboutMobile from "./about/AboutMobile";
import useAboutAnimations from "./about/useAboutAnimations";

const About = () => {
	const reduceMotion = useReducedMotion();
	const lenis = useLenis();
	const [bioExpanded, setBioExpanded] = useState(false);
	const [activeScene, setActiveScene] = useState(0);

	const sectionRef = useRef(null);
	const heroRef = useRef(null);
	const heroSubRef = useRef(null);
	const whoSplitRef = useRef(null);
	const amSplitRef = useRef(null);
	const theatreRef = useRef(null);
	const pinRef = useRef(null);
	const theatreGlowRef = useRef(null);
	const stageDividerRef = useRef(null);
	const portraitWrapRef = useRef(null);
	const scanBeamRef = useRef(null);
	const bgWhoRef = useRef(null);
	const bgAmRef = useRef(null);
	const hudRailRef = useRef(null);
	const circuitBgRef = useRef(null);
	const sceneRefs = useRef([]);
	const chapterRefs = useRef([]);
	const segmentRefs = useRef([]);
	const highlightRefs = useRef([]);
	const bioParaRefs = useRef([]);
	const workspaceRef = useRef(null);
	const mobileSceneRefs = useRef([]);

	const animationRefs = useRef({
		heroRef,
		heroSubRef,
		whoSplitRef,
		amSplitRef,
		theatreRef,
		pinRef,
		theatreGlowRef,
		scanBeamRef,
		bgWhoRef,
		bgAmRef,
		hudRailRef,
		circuitBgRef,
		portraitWrapRef,
		stageDividerRef,
		sceneRefs,
		chapterRefs,
		segmentRefs,
		highlightRefs,
		bioParaRefs,
		workspaceRef,
		mobileSceneRefs,
	});

	const jumpToScene = useCallback(
		(index) => {
			if (index < 0 || index >= SCENES.length) return;
			const progress = index / (SCENES.length - 1);
			scrollToProgress(progress, { lenis, duration: 1.2 });
		},
		[lenis],
	);

	useAboutAnimations({
		sectionRef,
		refs: animationRefs.current,
		reduceMotion,
		setActiveScene,
	});

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;
		scheduleScrollTriggerRefresh(400);
		return () => {};
	}, [bioExpanded, reduceMotion]);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="about-section about-section--interface relative w-full scroll-mt-24 overflow-hidden text-slate-100"
		>
			<div
				className="about-section__mesh pointer-events-none absolute inset-0"
				aria-hidden
			/>
			<div
				className="about-section__vignette pointer-events-none absolute inset-0"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.35] dark:opacity-[0.22]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-0 top-0 h-[min(80vw,600px)] w-[min(80vw,600px)] -translate-x-1/4 rounded-full bg-cyan-400/10 blur-[130px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute right-0 bottom-0 h-[min(70vw,500px)] w-[min(70vw,500px)] translate-x-1/4 rounded-full bg-fuchsia-500/8 blur-[110px] dark:bg-fuchsia-500/12"
				aria-hidden
			/>

			<div className="relative z-10 px-4 pb-8 pt-10 md:pb-12 md:pt-28">
				<div className="mx-auto max-w-[1240px]">
					<AboutHero
						heroRef={heroRef}
						whoSplitRef={whoSplitRef}
						amSplitRef={amSplitRef}
						heroSubRef={heroSubRef}
					/>

					<AboutTheatre
						theatreRef={theatreRef}
						pinRef={pinRef}
						theatreGlowRef={theatreGlowRef}
						scanBeamRef={scanBeamRef}
						bgWhoRef={bgWhoRef}
						bgAmRef={bgAmRef}
						hudRailRef={hudRailRef}
						circuitBgRef={circuitBgRef}
						portraitWrapRef={portraitWrapRef}
						stageDividerRef={stageDividerRef}
						sceneRefs={sceneRefs}
						chapterRefs={chapterRefs}
						segmentRefs={segmentRefs}
						highlightRefs={highlightRefs}
						bioParaRefs={bioParaRefs}
						workspaceRef={workspaceRef}
						activeScene={activeScene}
						bioExpanded={bioExpanded}
						setBioExpanded={setBioExpanded}
						reduceMotion={reduceMotion}
						jumpToScene={jumpToScene}
					/>

					<AboutMobile
						mobileSceneRefs={mobileSceneRefs}
						highlightRefs={highlightRefs}
						bioParaRefs={bioParaRefs}
						workspaceRef={workspaceRef}
						bioExpanded={bioExpanded}
						setBioExpanded={setBioExpanded}
						activeScene={activeScene}
						reduceMotion={reduceMotion}
					/>
				</div>
			</div>
		</section>
	);
};

export default About;
