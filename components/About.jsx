import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutImg from "../public/assets/download.png";

const AboutWorkspacePly = dynamic(() => import("./AboutWorkspacePly"), {
	ssr: false,
	loading: () => (
		<div
			className="flex h-[min(52vw,340px)] w-full items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-slate-950/30 sm:h-[300px] md:h-[320px]"
			aria-hidden
		>
			<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
				Loading workspace…
			</span>
		</div>
	),
});

const PORTRAIT_SRC = typeof AboutImg === "string" ? AboutImg : AboutImg.src;

const highlights = [
	{ label: "Focus", value: "Responsive UI · API integration · product delivery" },
	{ label: "Core stack", value: "React · Next.js · HTML · CSS · JavaScript" },
	{ label: "Since", value: "2016 — CMS e‑commerce to full custom apps" },
];

const SCENES = [
	{ id: "intro", label: "Intro", code: "01" },
	{ id: "capabilities", label: "Stack", code: "02" },
	{ id: "story", label: "Story", code: "03" },
	{ id: "workspace", label: "Desk", code: "04" },
];

const corner =
	"pointer-events-none absolute z-20 h-8 w-8 border-cyan-400/80 dark:border-cyan-400/70";

function HudCorners() {
	return (
		<>
			<span className={`${corner} left-3 top-3 border-l-2 border-t-2`} aria-hidden />
			<span className={`${corner} right-3 top-3 border-r-2 border-t-2`} aria-hidden />
			<span className={`${corner} bottom-3 left-3 border-b-2 border-l-2`} aria-hidden />
			<span className={`${corner} bottom-3 right-3 border-b-2 border-r-2`} aria-hidden />
		</>
	);
}

function PortraitScanGlitch({ src, active }) {
	if (!active) return null;
	return (
		<>
			<motion.div
				className="pointer-events-none absolute inset-0 z-[6] bg-cover opacity-0 mix-blend-screen"
				style={{ backgroundImage: `url(${src})`, backgroundPosition: "center top" }}
				animate={{
					x: [0, 0, -6, 5, -3, 0],
					opacity: [0, 0, 0.55, 0.4, 0, 0],
				}}
				transition={{ duration: 6.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
				aria-hidden
			/>
			<motion.div
				className="pointer-events-none absolute inset-x-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.55)]"
				initial={{ top: "-2%" }}
				animate={{ top: ["-2%", "102%", "-2%"] }}
				transition={{ duration: 5.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
				aria-hidden
			/>
		</>
	);
}

function PortraitFrame({ reduceMotion }) {
	return (
		<div className="about-portrait-frame relative mx-auto w-full max-w-[340px] lg:max-w-[380px]">
			<div
				className="about-orbit-ring pointer-events-none absolute -inset-8 rounded-full border border-cyan-400/25"
				aria-hidden
			/>
			<div
				className="about-orbit-ring about-orbit-ring--slow pointer-events-none absolute -inset-14 rounded-full border border-violet-400/18"
				aria-hidden
			/>
			<div
				className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-400/40 via-transparent to-violet-500/40 blur-md"
				aria-hidden
			/>
			<div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100/50 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_28px_70px_-24px_rgba(0,0,0,0.55)] dark:border-white/12 dark:bg-slate-900/40">
				<HudCorners />
				<div className="relative aspect-[3/4] w-full overflow-hidden">
					<Image
						src={AboutImg}
						alt="Nahom — developer portrait"
						layout="fill"
						objectFit="cover"
						objectPosition="top"
						priority
						sizes="(max-width: 1024px) 80vw, 380px"
					/>
					<PortraitScanGlitch src={PORTRAIT_SRC} active={!reduceMotion} />
					<div
						className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
						aria-hidden
					/>
				</div>
				<div className="flex items-center justify-between border-t border-slate-200/80 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-slate-950/50">
					<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
						Optical / Portrait
					</span>
					<span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
						<span className="relative flex h-1.5 w-1.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
							<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
						</span>
						Live
					</span>
				</div>
			</div>
		</div>
	);
}

function IntroScene() {
	return (
		<>
			<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				01 · Intro
			</p>
			<h3 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl lg:text-[2.5rem]">
				Builder who ships{" "}
				<span className="text-gradient-future">interfaces that feel alive.</span>
			</h3>
			<p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
				Full-stack minded front-end engineer — I connect polished UI to real backends
				so products stay fast, accessible, and ready to scale.
			</p>
		</>
	);
}

function CapabilitiesScene({ highlightRefs }) {
	return (
		<>
			<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				02 · Capabilities
			</p>
			<h3 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
				What I bring to the <span className="text-gradient-future">build.</span>
			</h3>
			<div className="mt-8 space-y-3">
				{highlights.map((row, i) => (
					<div
						key={row.label}
						ref={(el) => {
							highlightRefs.current[i] = el;
						}}
						className="about-highlight-row rounded-xl border border-slate-200/80 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-950/40"
					>
						<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fuchsia-600 dark:text-fuchsia-400">
							0{i + 1} · {row.label}
						</p>
						<p className="mt-2 text-sm font-medium leading-snug text-slate-700 dark:text-slate-300 md:text-base">
							{row.value}
						</p>
					</div>
				))}
			</div>
		</>
	);
}

function StoryScene({ bioExpanded, setBioExpanded, bioParaRefs }) {
	return (
		<>
			<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				03 · Story
			</p>
			<h3 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
				The <span className="text-gradient-future">narrative.</span>
			</h3>
			<div className="relative mt-6">
				<div
					id="about-bio-text"
					className={`space-y-4 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-400 md:text-base ${
						bioExpanded
							? "max-h-none"
							: "max-h-[min(34vh,12rem)] overflow-hidden sm:max-h-[min(38vh,14rem)]"
					}`}
				>
					<p ref={(el) => { bioParaRefs.current[0] = el; }}>
						I specialize in building high-performance, mobile-responsive front-end
						applications that seamlessly integrate with APIs and backend systems. I
						focus on efficient data handling, optimized server communication, and
						scalable architecture, ensuring applications remain fast, reliable, and
						cost-effective as they grow.
					</p>
					<p ref={(el) => { bioParaRefs.current[1] = el; }}>
						I am passionate about continuously learning and adopting new technologies,
						and I approach problem-solving with the mindset that there is always more
						than one effective solution. My core expertise lies in React, Next.js, and
						JavaScript, and I am highly adaptable when working with new tools and
						frameworks.
					</p>
					<p ref={(el) => { bioParaRefs.current[2] = el; }}>
						Beyond development, I actively work on improving application performance
						and reducing operational costs by optimizing API calls, minimizing
						unnecessary server requests, and implementing efficient state management
						and caching strategies.
					</p>
					<p ref={(el) => { bioParaRefs.current[3] = el; }}>
						I began my journey in 2016 managing multiple e-commerce websites on CMS
						platforms. Over time, I have expanded my experience by working on
						procurement platforms and Human Capital Management (HCM) systems. I have
						also worked directly with clients, transforming wireframes into
						production-ready applications such as Muyalogy, Afriwork LMS, Jiret LMS,
						Green Bag, Afrocado, AR Solutions, Peragos, Loop State, and Bazra
						E-Wallet.
					</p>
				</div>
				{!bioExpanded ? (
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent"
						aria-hidden
					/>
				) : null}
				<button
					type="button"
					onClick={() => setBioExpanded((v) => !v)}
					aria-expanded={bioExpanded}
					aria-controls="about-bio-text"
					className="unstyled relative z-[2] mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/[0.07] px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:border-cyan-400/35 dark:bg-cyan-500/10 dark:text-cyan-300"
				>
					{bioExpanded ? "Show less" : "Read full story"}
				</button>
			</div>
		</>
	);
}

function WorkspaceScene({ workspaceRef }) {
	return (
		<>
			<p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				04 · Workspace
			</p>
			<h3 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
				My <span className="text-gradient-future">desk in 3D.</span>
			</h3>
			<p className="mt-2 max-w-lg text-sm text-slate-600 dark:text-slate-400">
				Tap the preview to open your personal projects archive.
			</p>
			<div
				ref={workspaceRef}
				className="about-workspace-stage mt-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-950/90 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_32px_80px_-24px_rgba(0,0,0,0.45)] dark:border-white/10"
			>
				<HudCorners />
				<div className="relative p-1 sm:p-2">
					<AboutWorkspacePly />
				</div>
			</div>
			<div className="mt-6 flex flex-wrap items-center gap-4">
				<Link href="/#projects" className="group inline-flex">
					<span className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 font-semibold text-cyan-700 transition hover:border-cyan-400/70 hover:bg-cyan-500/20 dark:text-cyan-300">
						Latest projects
						<span className="transition-transform group-hover:translate-x-0.5">→</span>
					</span>
				</Link>
				<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
					Route / #projects
				</p>
			</div>
		</>
	);
}

function MobileScene({ children, sceneRef }) {
	return (
		<article
			ref={sceneRef}
			className="about-mobile-scene rounded-2xl border border-slate-200/85 bg-white/60 p-6 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50 dark:shadow-card-dark md:p-8"
		>
			{children}
		</article>
	);
}

const About = () => {
	const reduceMotion = useReducedMotion();
	const [bioExpanded, setBioExpanded] = useState(false);
	const [activeScene, setActiveScene] = useState(0);

	const sectionRef = useRef(null);
	const heroRef = useRef(null);
	const whoSplitRef = useRef(null);
	const amSplitRef = useRef(null);
	const theatreRef = useRef(null);
	const pinRef = useRef(null);
	const portraitWrapRef = useRef(null);
	const scanBeamRef = useRef(null);
	const bgWhoRef = useRef(null);
	const bgAmRef = useRef(null);
	const sceneStageRef = useRef(null);
	const sceneRefs = useRef([]);
	const chapterRefs = useRef([]);
	const segmentRefs = useRef([]);
	const highlightRefs = useRef([]);
	const bioParaRefs = useRef([]);
	const workspaceRef = useRef(null);
	const mobileSceneRefs = useRef([]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			if (heroRef.current) {
				gsap.from(heroRef.current.querySelectorAll("[data-about-reveal]"), {
					y: 56,
					opacity: 0,
					duration: 1,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: heroRef.current,
						start: "top 88%",
					},
				});
			}

			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				const panels = sceneRefs.current.filter(Boolean);
				const chapters = chapterRefs.current.filter(Boolean);
				const segments = segmentRefs.current.filter(Boolean);
				if (!panels.length || !pinRef.current || !theatreRef.current) return;

				gsap.set(panels, { autoAlpha: 0, x: 72, filter: "blur(10px)" });
				gsap.set(panels[0], { autoAlpha: 1, x: 0, filter: "blur(0px)" });
				gsap.set(chapters, { autoAlpha: 0, scale: 0.88 });
				if (chapters[0]) gsap.set(chapters[0], { autoAlpha: 0.14, scale: 1 });

				const scrollLen = () => window.innerHeight * 3.4;

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: theatreRef.current,
						start: "top top+=88",
						end: () => `+=${scrollLen()}`,
						pin: pinRef.current,
						scrub: 0.65,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onUpdate: (self) => {
							const idx = Math.min(
								panels.length - 1,
								Math.floor(self.progress * panels.length)
							);
							setActiveScene(idx);
							segments.forEach((seg, i) => {
								if (!seg) return;
								seg.classList.toggle("is-active", i === idx);
								seg.classList.toggle("is-passed", i < idx);
							});
						},
					},
				});

				const step = 1 / (panels.length - 1);

				for (let i = 1; i < panels.length; i++) {
					const t = (i - 1) * step;
					const prev = panels[i - 1];
					const curr = panels[i];
					const prevChapter = chapters[i - 1];
					const currChapter = chapters[i];

					tl.to(
						prev,
						{
							autoAlpha: 0,
							x: -64,
							filter: "blur(12px)",
							duration: step * 0.42,
							ease: "power2.in",
						},
						t
					);
					tl.fromTo(
						curr,
						{ autoAlpha: 0, x: 72, filter: "blur(12px)" },
						{
							autoAlpha: 1,
							x: 0,
							filter: "blur(0px)",
							duration: step * 0.42,
							ease: "power2.out",
						},
						t
					);

					if (prevChapter && currChapter) {
						tl.to(
							prevChapter,
							{ autoAlpha: 0, scale: 0.82, duration: step * 0.2 },
							t
						);
						tl.to(
							currChapter,
							{ autoAlpha: 0.14, scale: 1, duration: step * 0.25 },
							t + step * 0.08
						);
					}

					if (portraitWrapRef.current) {
						tl.to(
							portraitWrapRef.current,
							{
								scale: 1 + i * 0.018,
								rotateY: i % 2 === 0 ? -4 : 4,
								duration: step,
								ease: "none",
							},
							t
						);
					}
				}

				if (scanBeamRef.current) {
					gsap.fromTo(
						scanBeamRef.current,
						{ top: "0%" },
						{
							top: "100%",
							ease: "none",
							scrollTrigger: {
								trigger: theatreRef.current,
								start: "top top+=88",
								end: () => `+=${scrollLen()}`,
								scrub: 0.4,
							},
						}
					);
				}

				if (bgWhoRef.current && bgAmRef.current) {
					gsap.to(bgWhoRef.current, {
						x: -120,
						opacity: 0.04,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top top+=88",
							end: () => `+=${scrollLen()}`,
							scrub: 0.6,
						},
					});
					gsap.to(bgAmRef.current, {
						x: 120,
						opacity: 0.04,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top top+=88",
							end: () => `+=${scrollLen()}`,
							scrub: 0.6,
						},
					});
				}

				if (whoSplitRef.current && amSplitRef.current && theatreRef.current) {
					gsap.to(whoSplitRef.current, {
						x: -48,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top bottom",
							end: "top top+=88",
							scrub: 0.5,
						},
					});
					gsap.to(amSplitRef.current, {
						x: 48,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top bottom",
							end: "top top+=88",
							scrub: 0.5,
						},
					});
				}
			});

			mm.add("(max-width: 1023px)", () => {
				mobileSceneRefs.current.filter(Boolean).forEach((el, i) => {
					gsap.fromTo(
						el,
						{ y: 48, opacity: 0, scale: 0.97 },
						{
							y: 0,
							opacity: 1,
							scale: 1,
							duration: 0.85,
							ease: "power3.out",
							scrollTrigger: {
								trigger: el,
								start: "top 90%",
							},
						}
					);
					ScrollTrigger.create({
						trigger: el,
						start: "top center",
						end: "bottom center",
						onEnter: () => setActiveScene(i),
						onEnterBack: () => setActiveScene(i),
					});
				});
			});
		}, sectionRef);

		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 650);

		return () => {
			window.clearTimeout(refreshTimer);
			ctx.revert();
		};
	}, [reduceMotion]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;
		const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
		return () => window.clearTimeout(id);
	}, [bioExpanded, reduceMotion]);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="about-section relative w-full scroll-mt-24 overflow-hidden"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.16]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -left-1/3 top-0 h-[min(100vw,800px)] w-[min(100vw,800px)] rounded-full bg-cyan-400/10 blur-[130px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -right-1/4 bottom-0 h-[min(80vw,600px)] w-[min(80vw,600px)] rounded-full bg-fuchsia-500/8 blur-[110px] dark:bg-fuchsia-500/12"
				aria-hidden
			/>

			<div className="relative z-10 px-4 pb-8 pt-20 md:pb-12 md:pt-28">
				<div className="mx-auto max-w-[1240px]">
					{/* Title — splits apart as theatre approaches */}
					<div ref={heroRef} className="about-hero mb-10 md:mb-14">
						<p className="section-eyebrow mb-5" data-about-reveal>
							<span
								className="h-px w-8 bg-gradient-to-r from-cyan-400 to-violet-500"
								aria-hidden
							/>
							About
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 01
							</span>
						</p>
						<h2
							className="about-title-split font-display font-bold leading-[0.88] tracking-tight text-slate-900 dark:text-white"
							aria-label="Who I Am"
						>
							<span
								ref={whoSplitRef}
								className="about-title-who inline-block text-[clamp(2.6rem,10vw,5.5rem)]"
							>
								WHO I
							</span>{" "}
							<span
								ref={amSplitRef}
								className="about-title-am inline-block text-[clamp(3rem,12vw,7rem)] text-gradient-future"
							>
								AM
							</span>
						</h2>
						<div
							className="mt-8 flex flex-wrap items-end justify-between gap-6"
							data-about-reveal
						>
							<p className="max-w-lg text-lg font-medium text-slate-700 dark:text-slate-200 md:text-xl">
								I am not your typical developer.
							</p>
							<div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
								<span className="rounded border border-slate-300/80 bg-white/60 px-3 py-1.5 dark:border-white/15 dark:bg-slate-950/40">
									ID · NAHOM_D
								</span>
								<span className="text-cyan-600 dark:text-cyan-400">
									Status / Available for build
								</span>
							</div>
						</div>
						<p
							className="mt-6 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 lg:block dark:text-slate-500"
							data-about-reveal
						>
							Scroll to scan identity layers · 4 scenes
						</p>
					</div>

					{/* Desktop: pinned identity theatre */}
					<div ref={theatreRef} className="about-theatre hidden lg:block">
						<div
							ref={pinRef}
							className="about-theatre-pin relative min-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/40 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_40px_100px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60"
						>
							<div
								ref={scanBeamRef}
								className="about-scan-beam pointer-events-none absolute inset-x-0 z-30 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.75)]"
								aria-hidden
							/>
							<div
								className="about-theatre-grid pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
								style={{
									backgroundImage:
										"linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.12) 1px, transparent 1px)",
									backgroundSize: "64px 64px",
								}}
								aria-hidden
							/>
							<span
								ref={bgWhoRef}
								className="about-bg-type pointer-events-none absolute left-[4%] top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(5rem,14vw,11rem)] font-bold leading-none text-slate-900/[0.07] dark:text-white/[0.06]"
								aria-hidden
							>
								WHO
							</span>
							<span
								ref={bgAmRef}
								className="about-bg-type pointer-events-none absolute right-[4%] top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(5rem,14vw,11rem)] font-bold leading-none text-gradient-future opacity-[0.12]"
								aria-hidden
							>
								AM
							</span>

							<div className="relative z-10 grid h-full min-h-[calc(100dvh-5.5rem)] grid-cols-[minmax(280px,38%)_1fr] gap-8 p-8 xl:gap-12 xl:p-10">
								<div className="relative flex flex-col justify-center">
									{SCENES.map((scene, i) => (
										<span
											key={scene.code}
											ref={(el) => {
												chapterRefs.current[i] = el;
											}}
											className="about-chapter-ghost pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 font-display text-[clamp(6rem,16vw,12rem)] font-bold leading-none text-slate-900 dark:text-white"
											aria-hidden
										>
											{scene.code}
										</span>
									))}
									<div ref={portraitWrapRef} className="about-portrait-wrap relative z-10">
										<PortraitFrame reduceMotion={reduceMotion} />
									</div>
									<p className="relative z-10 mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
										Layer · {SCENES[activeScene]?.label}
									</p>
								</div>

								<div
									ref={sceneStageRef}
									className="about-scene-stage relative flex items-center overflow-hidden"
								>
									<div
										className="pointer-events-none absolute left-0 top-0 z-20 h-full w-px bg-gradient-to-b from-cyan-400/60 via-violet-500/40 to-fuchsia-500/30"
										aria-hidden
									/>
									<div className="relative h-full w-full py-4">
										<div
											ref={(el) => {
												sceneRefs.current[0] = el;
											}}
											className="about-scene-panel absolute inset-0 flex flex-col justify-center pr-4"
										>
											<IntroScene />
										</div>
										<div
											ref={(el) => {
												sceneRefs.current[1] = el;
											}}
											className="about-scene-panel absolute inset-0 flex flex-col justify-center overflow-y-auto pr-4"
										>
											<CapabilitiesScene highlightRefs={highlightRefs} />
										</div>
										<div
											ref={(el) => {
												sceneRefs.current[2] = el;
											}}
											className="about-scene-panel absolute inset-0 flex flex-col justify-center overflow-y-auto pr-4"
										>
											<StoryScene
												bioExpanded={bioExpanded}
												setBioExpanded={setBioExpanded}
												bioParaRefs={bioParaRefs}
											/>
										</div>
										<div
											ref={(el) => {
												sceneRefs.current[3] = el;
											}}
											className="about-scene-panel absolute inset-0 flex flex-col justify-center overflow-y-auto pr-4"
										>
											<WorkspaceScene workspaceRef={workspaceRef} />
										</div>
									</div>
								</div>
							</div>

							<div
								className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
								aria-hidden
							>
								{SCENES.map((scene, i) => (
									<div key={scene.id} className="flex items-center gap-2">
										<span
											ref={(el) => {
												segmentRefs.current[i] = el;
											}}
											className={`about-scene-segment h-1.5 w-10 rounded-full bg-slate-300/80 transition-all duration-300 dark:bg-white/15 ${
												activeScene === i ? "is-active" : ""
											}`}
										/>
										<span className="hidden font-mono text-[9px] uppercase tracking-wider text-slate-400 xl:inline">
											{scene.code}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Mobile + reduced-motion: stacked scenes */}
					<div className="about-mobile-stack space-y-6 lg:hidden">
						<MobileScene sceneRef={(el) => { mobileSceneRefs.current[0] = el; }}>
							<IntroScene />
						</MobileScene>
						<MobileScene sceneRef={(el) => { mobileSceneRefs.current[1] = el; }}>
							<CapabilitiesScene highlightRefs={highlightRefs} />
						</MobileScene>
						<div className="flex justify-center">
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
								{String(activeScene + 1).padStart(2, "0")} ·{" "}
								{activeScene === 2
									? "Portrait"
									: activeScene > 2
										? SCENES[activeScene - 1]?.label
										: SCENES[activeScene]?.label}
							</p>
						</div>
						<MobileScene sceneRef={(el) => { mobileSceneRefs.current[2] = el; }}>
							<PortraitFrame reduceMotion={reduceMotion} />
						</MobileScene>
						<MobileScene sceneRef={(el) => { mobileSceneRefs.current[3] = el; }}>
							<StoryScene
								bioExpanded={bioExpanded}
								setBioExpanded={setBioExpanded}
								bioParaRefs={bioParaRefs}
							/>
						</MobileScene>
						<MobileScene sceneRef={(el) => { mobileSceneRefs.current[4] = el; }}>
							<WorkspaceScene workspaceRef={workspaceRef} />
						</MobileScene>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
