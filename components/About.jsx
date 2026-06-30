import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
	motion,
	useMotionValue,
	useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutImg from "../public/assets/download.png";
import MatrixPortraitImg from "../public/assets/matrix.png";
import { useLenis } from "./LenisProvider";
import { scrollTriggerBase, scrollToProgress } from "../lib/gsapScroll";

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

const highlights = [
	{
		label: "Product delivery",
		value:
			"Production web applications — ERP, HCM, CRM, LMS, e-commerce, and portfolio platforms built for scale.",
	},
	{
		label: "AI & automation",
		value:
			"Custom AI agents, LLM-powered assistants (OpenRouter, OpenAI), and bot integrations for Telegram, web, and internal tools.",
	},
	{
		label: "Core stack",
		value: "React · Next.js · TypeScript · Node.js · PostgreSQL · Supabase · Hono",
	},
	{
		label: "Track record",
		value: "2016–present — from CMS e-commerce to enterprise systems and intelligent product interfaces.",
	},
];

const SCENES = [
	{ id: "intro", label: "Intro", code: "01" },
	{ id: "capabilities", label: "Expertise", code: "02" },
	{ id: "story", label: "Background", code: "03" },
	{ id: "workspace", label: "Desk", code: "04" },
];

const corner =
	"pointer-events-none absolute z-20 h-8 w-8 border-cyan-400/80 dark:border-cyan-400/70";

function HudCorners() {
	return (
		<>
			<span
				className={`${corner} left-3 top-3 border-l-2 border-t-2`}
				aria-hidden
			/>
			<span
				className={`${corner} right-3 top-3 border-r-2 border-t-2`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-3 left-3 border-b-2 border-l-2`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-3 right-3 border-b-2 border-r-2`}
				aria-hidden
			/>
		</>
	);
}

function PortraitMatrixGlitch({ matrixSrc, active }) {
	const opacity = useMotionValue(0);
	const glitchX = useMotionValue(0);
	const glitchSkew = useMotionValue(0);
	const matrixSrcUrl =
		typeof matrixSrc === "string" ? matrixSrc : matrixSrc.src;

	useEffect(() => {
		if (!active) return undefined;

		let alive = true;
		const timeouts = new Set();

		const wait = (ms) =>
			new Promise((resolve) => {
				const id = window.setTimeout(resolve, ms);
				timeouts.add(id);
			});

		const hide = () => {
			opacity.set(0);
			glitchX.set(0);
			glitchSkew.set(0);
		};

		const flash = () => {
			glitchX.set((Math.random() - 0.5) * 22);
			glitchSkew.set((Math.random() - 0.5) * 4);
			opacity.set(0.5 + Math.random() * 0.5);
		};

		const loop = async () => {
			hide();
			await wait(350 + Math.random() * 1600);
			while (alive) {
				const burstCount = 1 + Math.floor(Math.random() * 4);

				for (let i = 0; i < burstCount && alive; i += 1) {
					flash();
					await wait(40 + Math.random() * 130);
					if (!alive) break;
					hide();
					if (i < burstCount - 1) {
						await wait(20 + Math.random() * 65);
					}
				}

				if (!alive) break;

				if (Math.random() > 0.62) {
					flash();
					await wait(160 + Math.random() * 340);
					if (!alive) break;
					hide();
				}

				await wait(280 + Math.random() * 1900);
			}
		};

		loop();

		return () => {
			alive = false;
			for (const id of timeouts) {
				window.clearTimeout(id);
			}
			hide();
		};
	}, [active, opacity, glitchX, glitchSkew]);

	if (!active) return null;

	return (
		<motion.div
			className="about-portrait-matrix-layer pointer-events-none absolute inset-0 z-[6] overflow-hidden"
			style={{
				opacity,
				x: glitchX,
				skewX: glitchSkew,
			}}
			aria-hidden
		>
			<div className="about-portrait-matrix-glitch-wrap absolute inset-0">
				<Image
					src={matrixSrc}
					alt=""
					layout="fill"
					objectFit="cover"
					objectPosition="top"
					sizes="(max-width: 1024px) 80vw, 380px"
					priority
				/>
				<div
					className="about-portrait-matrix-rgb about-portrait-matrix-rgb--cyan"
					style={{ backgroundImage: `url(${matrixSrcUrl})` }}
				/>
				<div
					className="about-portrait-matrix-rgb about-portrait-matrix-rgb--magenta"
					style={{ backgroundImage: `url(${matrixSrcUrl})` }}
				/>
				<div className="about-portrait-matrix-slices" aria-hidden>
					{[8, 24, 41, 58, 72, 86].map((top) => (
						<span
							key={top}
							className="about-portrait-matrix-slice"
							style={{ top: `${top}%` }}
						/>
					))}
				</div>
				<div className="about-portrait-matrix-lines absolute inset-0 opacity-40 mix-blend-screen" />
				<div className="about-portrait-matrix-noise absolute inset-0 opacity-[0.2]" />
			</div>
		</motion.div>
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
				className="about-portrait-aura absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyan-400/40 via-transparent to-violet-500/40 blur-md"
				aria-hidden
			/>
			<div className="about-portrait-inner relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100/50 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_28px_70px_-24px_rgba(0,0,0,0.55)] dark:border-white/12 dark:bg-slate-900/40">
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
					<PortraitMatrixGlitch
						matrixSrc={MatrixPortraitImg}
						active={!reduceMotion}
					/>
					<div
						className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
						aria-hidden
					/>
				</div>
				<div className="flex items-center justify-between border-t border-slate-200/80 bg-white/40 px-4 py-2 dark:border-white/10 dark:bg-slate-950/50">
					<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
						Profile / Engineer
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
			<p className="about-scene-eyebrow font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				01 · Intro
			</p>
			<h3 className="about-scene-heading mt-4 font-display text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl lg:text-[2.5rem]">
				Full-stack engineer building{" "}
				<span className="text-gradient-future">
					software and AI-powered products.
				</span>
			</h3>
			<p className="about-scene-body mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
				I design and ship production-grade web applications — from polished
				interfaces to robust backends — and extend them with custom AI agents,
				intelligent assistants, and bot integrations that automate support,
				onboarding, and workflows.
			</p>
		</>
	);
}

function CapabilitiesScene({ highlightRefs }) {
	return (
		<>
			<p className="about-scene-eyebrow font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				02 · Expertise
			</p>
			<h3 className="about-scene-heading mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
				What I deliver on{" "}
				<span className="text-gradient-future">every engagement.</span>
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
			<p className="about-scene-eyebrow font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				03 · Background
			</p>
			<h3 className="about-scene-heading mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
				Professional <span className="text-gradient-future">background.</span>
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
					<p
						ref={(el) => {
							bioParaRefs.current[0] = el;
						}}
					>
						I specialize in high-performance, mobile-responsive applications
						that integrate cleanly with APIs, databases, and third-party
						services. My work spans ERP, HCM, and CRM systems, learning
						platforms, e-commerce, and client-facing portfolio sites — always
						with a focus on reliability, accessibility, and maintainable
						architecture.
					</p>
					<p
						ref={(el) => {
							bioParaRefs.current[1] = el;
						}}
					>
						Alongside product development, I design and implement AI agents and
						intelligent bot experiences: LLM-backed assistants, portfolio and
						support chatbots, and Telegram integrations wired to business logic.
						I work with OpenRouter, OpenAI, and modern agent patterns to deliver
						responses that are context-aware, secure, and aligned with each
						product&apos;s goals.
					</p>
					<p
						ref={(el) => {
							bioParaRefs.current[2] = el;
						}}
					>
						Performance and operational efficiency are core to how I build. I
						optimize API usage, state management, and caching so applications
						stay fast and cost-effective as they scale. I stay current with
						React, Next.js, TypeScript, and emerging AI tooling, and adapt
						quickly when a project calls for a new stack or integration.
					</p>
					<p
						ref={(el) => {
							bioParaRefs.current[3] = el;
						}}
					>
						Since 2016 I have progressed from managing CMS-based e-commerce
						sites to leading full-stack delivery on platforms such as Sourcepin,
						HCM, Muyalogy, Jiret LMS, Afriwork Learn, Green Bag Ethiopia,
						Afrocado Exports, AR Solutions, Peragos, Loop State, and Bazra
						E-Wallet — partnering with clients and teams to turn requirements
						into production-ready software, including AI-enhanced features where
						they add clear value.
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

function WorkspaceScene({ workspaceRef, activeScene = 0 }) {
	const [isMobileLayout, setIsMobileLayout] = useState(false);
	const [nearViewport, setNearViewport] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return undefined;
		const mq = window.matchMedia("(max-width: 1023px)");
		const sync = () => setIsMobileLayout(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		if (!isMobileLayout) return undefined;
		const el = workspaceRef?.current;
		if (!el) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setNearViewport(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "240px 0px", threshold: 0 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [isMobileLayout, workspaceRef]);

	const mount3d = isMobileLayout ? nearViewport : activeScene >= 2;
	return (
		<>
			<p className="about-scene-eyebrow font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">
				04 · Workspace
			</p>
			<h3 className="about-scene-heading mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
				My <span className="text-gradient-future">desk in 3D.</span>
			</h3>
			<p className="about-scene-body mt-2 max-w-lg text-sm text-slate-600 dark:text-slate-400">
				Interactive workspace preview — tap to browse selected builds, including
				AI-assisted and bot-integrated projects.
			</p>
			<div
				ref={workspaceRef}
				className="about-workspace-stage mt-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-950/90 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_32px_80px_-24px_rgba(0,0,0,0.45)] dark:border-white/10"
			>
				<HudCorners />
				<div className="relative p-1 sm:p-2">
					{mount3d ? (
						<AboutWorkspacePly />
					) : (
						<div
							className="flex h-[min(52vw,340px)] w-full items-center justify-center sm:h-[300px] md:h-[320px]"
							aria-hidden
						>
							<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
								Scroll to load workspace…
							</span>
						</div>
					)}
				</div>
			</div>
			<div className="mt-6 flex flex-wrap items-center gap-4">
				<Link href="/#projects" className="group inline-flex">
					<span className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 font-semibold text-cyan-700 transition hover:border-cyan-400/70 hover:bg-cyan-500/20 dark:text-cyan-300">
						Latest projects
						<span className="transition-transform group-hover:translate-x-0.5">
							→
						</span>
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
	const lenis = useLenis();
	const [bioExpanded, setBioExpanded] = useState(false);
	const [activeScene, setActiveScene] = useState(0);

	const sectionRef = useRef(null);
	const heroRef = useRef(null);
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
	const sceneStageRef = useRef(null);
	const sceneRefs = useRef([]);
	const chapterRefs = useRef([]);
	const segmentRefs = useRef([]);
	const highlightRefs = useRef([]);
	const bioParaRefs = useRef([]);
	const workspaceRef = useRef(null);
	const mobileSceneRefs = useRef([]);

	const jumpToScene = useCallback(
		(index) => {
			if (index < 0 || index >= SCENES.length) return;
			const progress = index / (SCENES.length - 1);
			scrollToProgress(progress, { lenis, duration: 1.2 });
		},
		[lenis],
	);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const cleanups = [];

		const ctx = gsap.context(() => {
			if (heroRef.current) {
				const heroTl = gsap.timeline({
					scrollTrigger: scrollTriggerBase({
						trigger: heroRef.current,
						start: "top 86%",
						toggleActions: "play none none reverse",
					}),
				});

				heroTl
					.from(".about-eyebrow-line", {
						scaleX: 0,
						transformOrigin: "left center",
						duration: 0.8,
						ease: "power2.inOut",
					})
					.from(
						".about-eyebrow-text",
						{ opacity: 0, x: -20, duration: 0.5 },
						"-=0.45",
					)
					.from(
						".about-title-word",
						{
							y: 120,
							opacity: 0,
							rotateX: -78,
							transformOrigin: "50% 100%",
							stagger: 0.12,
							duration: 1.05,
							ease: "power3.out",
						},
						"-=0.15",
					)
					.from(
						".about-title-char",
						{
							scale: 0.2,
							opacity: 0,
							rotateY: -95,
							transformOrigin: "50% 50%",
							stagger: 0.16,
							duration: 0.9,
							ease: "back.out(1.8)",
						},
						"-=0.6",
					)
					.from(
						".about-hero-sub",
						{ opacity: 0, y: 24, filter: "blur(10px)", duration: 0.65 },
						"-=0.35",
					)
					.from(
						".about-hero-tag",
						{
							x: 16,
							opacity: 0,
							stagger: 0.12,
							duration: 0.55,
							ease: "power3.out",
						},
						"-=0.4",
					)
					.from(
						".about-hero-hint",
						{ opacity: 0, y: 12, duration: 0.45 },
						"-=0.2",
					);
			}

			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				const panels = sceneRefs.current.filter(Boolean);
				const chapters = chapterRefs.current.filter(Boolean);
				const segments = segmentRefs.current.filter(Boolean);
				if (!panels.length || !pinRef.current || !theatreRef.current) return;

				gsap.set(panels, {
					autoAlpha: 0,
					x: 88,
					rotateY: -14,
					scale: 0.92,
					filter: "blur(14px)",
					clipPath: "inset(0 0 0 100% round 14px)",
				});
				gsap.set(panels[0], {
					autoAlpha: 1,
					x: 0,
					rotateY: 0,
					scale: 1,
					filter: "blur(0px)",
					clipPath: "inset(0 0% 0 0 round 14px)",
				});
				gsap.set(chapters, { autoAlpha: 0, scale: 0.75, rotate: -6 });
				if (chapters[0])
					gsap.set(chapters[0], { autoAlpha: 0.16, scale: 1, rotate: 0 });

				if (stageDividerRef.current) {
					gsap.set(stageDividerRef.current, {
						scaleY: 0,
						transformOrigin: "top center",
					});
				}

				const scrollLen = () => window.innerHeight * 3.1;
				const pinTrigger = scrollTriggerBase({
					trigger: theatreRef.current,
					start: "top top+=88",
					end: () => `+=${scrollLen()}`,
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						...pinTrigger,
						id: "about-theatre-pin",
						pin: pinRef.current,
						scrub: 0.42,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onUpdate: (self) => {
							const idx = Math.min(
								panels.length - 1,
								Math.floor(self.progress * panels.length),
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
				const portraitMoves = [
					{ scale: 1, rotateY: 0, rotateX: 0, y: 0 },
					{ scale: 1.035, rotateY: -7, rotateX: -4, y: -10 },
					{ scale: 1.055, rotateY: 6, rotateX: 3, y: 6 },
					{ scale: 1.075, rotateY: -9, rotateX: -5, y: -14 },
				];

				const firstPanel = panels[0];
				const firstEyebrow = firstPanel?.querySelector(".about-scene-eyebrow");
				const firstHeading = firstPanel?.querySelector(".about-scene-heading");
				const firstBody = firstPanel?.querySelector(".about-scene-body");
				if (firstEyebrow && firstHeading) {
					tl.from(
						[firstEyebrow, firstHeading, firstBody].filter(Boolean),
						{
							y: 36,
							opacity: 0,
							stagger: 0.07,
							duration: step * 0.35,
							ease: "power3.out",
						},
						0.02,
					);
				}

				if (stageDividerRef.current) {
					tl.to(
						stageDividerRef.current,
						{ scaleY: 1, duration: step * 0.5, ease: "power2.out" },
						0,
					);
				}

				for (let i = 1; i < panels.length; i++) {
					const t = (i - 1) * step;
					const prev = panels[i - 1];
					const curr = panels[i];
					const prevChapter = chapters[i - 1];
					const currChapter = chapters[i];
					const move =
						portraitMoves[i] ?? portraitMoves[portraitMoves.length - 1];

					tl.to(
						prev,
						{
							autoAlpha: 0,
							x: -96,
							rotateY: 14,
							scale: 0.9,
							filter: "blur(18px)",
							clipPath: "inset(0 100% 0 0 round 14px)",
							duration: step * 0.48,
							ease: "power2.in",
						},
						t,
					);
					tl.fromTo(
						curr,
						{
							autoAlpha: 0,
							x: 96,
							rotateY: -16,
							scale: 0.88,
							filter: "blur(18px)",
							clipPath: "inset(0 0 0 100% round 14px)",
						},
						{
							autoAlpha: 1,
							x: 0,
							rotateY: 0,
							scale: 1,
							filter: "blur(0px)",
							clipPath: "inset(0 0% 0 0 round 14px)",
							duration: step * 0.48,
							ease: "power3.out",
						},
						t,
					);

					const eyebrow = curr.querySelector(".about-scene-eyebrow");
					const heading = curr.querySelector(".about-scene-heading");
					const body = curr.querySelector(".about-scene-body");
					if (eyebrow && heading) {
						tl.fromTo(
							[eyebrow, heading, body].filter(Boolean),
							{ y: 40, opacity: 0 },
							{
								y: 0,
								opacity: 1,
								stagger: 0.06,
								duration: step * 0.28,
								ease: "power2.out",
							},
							t + step * 0.14,
						);
					}

					if (i === 1) {
						const rows = highlightRefs.current.filter(Boolean);
						tl.fromTo(
							rows,
							{ x: 64, opacity: 0, scale: 0.92 },
							{
								x: 0,
								opacity: 1,
								scale: 1,
								stagger: 0.08,
								duration: step * 0.34,
								ease: "power3.out",
							},
							t + step * 0.2,
						);
					}

					if (i === 2) {
						const paras = bioParaRefs.current.filter(Boolean);
						tl.fromTo(
							paras,
							{ y: 28, opacity: 0, filter: "blur(6px)" },
							{
								y: 0,
								opacity: 1,
								filter: "blur(0px)",
								stagger: 0.07,
								duration: step * 0.32,
								ease: "power2.out",
							},
							t + step * 0.18,
						);
					}

					if (i === 3 && workspaceRef.current) {
						tl.fromTo(
							workspaceRef.current,
							{ y: 48, scale: 0.88, opacity: 0, rotateX: 10 },
							{
								y: 0,
								scale: 1,
								opacity: 1,
								rotateX: 0,
								duration: step * 0.38,
								ease: "power3.out",
								transformOrigin: "50% 100%",
							},
							t + step * 0.16,
						);
					}

					if (prevChapter && currChapter) {
						tl.to(
							prevChapter,
							{ autoAlpha: 0, scale: 0.7, rotate: 8, duration: step * 0.22 },
							t,
						);
						tl.fromTo(
							currChapter,
							{ autoAlpha: 0, scale: 1.2, rotate: -10 },
							{ autoAlpha: 0.18, scale: 1, rotate: 0, duration: step * 0.3 },
							t + step * 0.1,
						);
					}

					if (portraitWrapRef.current) {
						tl.to(
							portraitWrapRef.current,
							{ ...move, duration: step, ease: "none" },
							t,
						);
					}
				}

				if (scanBeamRef.current) {
					gsap.to(scanBeamRef.current, {
						top: "100%",
						duration: 2.8,
						ease: "none",
						repeat: -1,
						yoyo: true,
					});
				}

				if (theatreGlowRef.current) {
					gsap.fromTo(
						theatreGlowRef.current,
						{ opacity: 0.25, scale: 0.92 },
						{
							opacity: 0.85,
							scale: 1.08,
							ease: "none",
							scrollTrigger: { ...pinTrigger, scrub: 0.6 },
						},
					);
				}

				const theatreGrid = pinRef.current?.querySelector(
					".about-theatre-grid",
				);
				if (theatreGrid) {
					gsap.to(theatreGrid, {
						backgroundPosition: "128px 96px",
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.7 },
					});
				}

				gsap.utils.toArray(".about-particle").forEach((p, i) => {
					gsap.to(p, {
						y: i % 2 === 0 ? -24 : 18,
						x: i % 3 === 0 ? 12 : -10,
						opacity: 0.9,
						duration: 2.8 + i * 0.4,
						ease: "sine.inOut",
						yoyo: true,
						repeat: -1,
					});
				});

				if (bgWhoRef.current && bgAmRef.current) {
					gsap.to(bgWhoRef.current, {
						x: -160,
						y: -40,
						opacity: 0.05,
						rotate: -4,
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.65 },
					});
					gsap.to(bgAmRef.current, {
						x: 160,
						y: 40,
						opacity: 0.06,
						rotate: 4,
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.65 },
					});
				}

				if (whoSplitRef.current && amSplitRef.current) {
					gsap.to(whoSplitRef.current, {
						x: -72,
						y: -12,
						ease: "none",
						scrollTrigger: scrollTriggerBase({
							trigger: theatreRef.current,
							start: "top bottom",
							end: "top top+=88",
							scrub: 0.45,
						}),
					});
					gsap.to(amSplitRef.current, {
						x: 72,
						y: 12,
						scale: 1.06,
						ease: "none",
						scrollTrigger: scrollTriggerBase({
							trigger: theatreRef.current,
							start: "top bottom",
							end: "top top+=88",
							scrub: 0.45,
						}),
					});
				}

				gsap.to(".about-scroll-cue", {
					y: 10,
					opacity: 0.45,
					duration: 1.1,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				});

				if (portraitWrapRef.current) {
					const portrait = portraitWrapRef.current;
					const inner = portrait.querySelector(".about-portrait-inner");
					const aura = portrait.querySelector(".about-portrait-aura");

					const onMove = (e) => {
						const rect = portrait.getBoundingClientRect();
						const x = (e.clientX - rect.left) / rect.width - 0.5;
						const y = (e.clientY - rect.top) / rect.height - 0.5;
						if (inner) {
							gsap.to(inner, {
								rotateY: x * 14,
								rotateX: -y * 10,
								y: -y * 8,
								duration: 0.5,
								ease: "power2.out",
								overwrite: "auto",
							});
						}
						if (aura) {
							gsap.to(aura, {
								x: x * 16,
								y: y * 16,
								scale: 1.08,
								duration: 0.5,
								overwrite: "auto",
							});
						}
					};

					const onLeave = () => {
						if (inner) {
							gsap.to(inner, {
								rotateY: 0,
								rotateX: 0,
								y: 0,
								duration: 0.75,
								ease: "elastic.out(1, 0.55)",
							});
						}
						if (aura) {
							gsap.to(aura, {
								x: 0,
								y: 0,
								scale: 1,
								duration: 0.65,
								ease: "power2.out",
							});
						}
					};

					portrait.addEventListener("mousemove", onMove);
					portrait.addEventListener("mouseleave", onLeave);
					cleanups.push(() => {
						portrait.removeEventListener("mousemove", onMove);
						portrait.removeEventListener("mouseleave", onLeave);
					});
				}
			});

			mm.add("(max-width: 1023px)", () => {
				mobileSceneRefs.current.filter(Boolean).forEach((el, i) => {
					gsap.fromTo(
						el,
						{ y: 64, opacity: 0, scale: 0.94, rotateX: 8 },
						{
							y: 0,
							opacity: 1,
							scale: 1,
							rotateX: 0,
							duration: 0.95,
							ease: "power3.out",
							transformOrigin: "50% 100%",
							scrollTrigger: scrollTriggerBase({
								trigger: el,
								start: "top 88%",
								toggleActions: "play none none reverse",
							}),
						},
					);

					const children = el.querySelectorAll(
						".about-scene-eyebrow, .about-scene-heading, .about-scene-body, .about-highlight-row, .about-portrait-frame",
					);
					gsap.from(children, {
						y: 28,
						opacity: 0,
						stagger: 0.07,
						duration: 0.6,
						ease: "power2.out",
						scrollTrigger: scrollTriggerBase({
							trigger: el,
							start: "top 85%",
							toggleActions: "play none none reverse",
						}),
					});

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

		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 700);
		const onLenisReady = () => ScrollTrigger.refresh();
		window.addEventListener("lenis-ready", onLenisReady);

		return () => {
			window.clearTimeout(refreshTimer);
			window.removeEventListener("lenis-ready", onLenisReady);
			for (const fn of cleanups) fn();
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
				className="pointer-events-none absolute left-0 top-0 h-[min(80vw,600px)] w-[min(80vw,600px)] -translate-x-1/4 rounded-full bg-cyan-400/10 blur-[130px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute right-0 bottom-0 h-[min(70vw,500px)] w-[min(70vw,500px)] translate-x-1/4 rounded-full bg-fuchsia-500/8 blur-[110px] dark:bg-fuchsia-500/12"
				aria-hidden
			/>

			<div className="relative z-10 px-4 pb-8 pt-10 md:pb-12 md:pt-28">
				<div className="mx-auto max-w-[1240px]">
					{/* Title — splits apart as theatre approaches */}
					<div
						ref={heroRef}
						className="about-hero about-hero-perspective mb-10 md:mb-14"
					>
						<p className="section-eyebrow mb-5">
							<span
								className="about-eyebrow-line h-px w-8 bg-gradient-to-r from-cyan-400 to-violet-500"
								aria-hidden
							/>
							<span className="about-eyebrow-text">
								About
								<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
									{" "}
									/ SEC 01
								</span>
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
								<span className="about-title-word inline-block">WHO</span>{" "}
								<span className="about-title-word inline-block">I</span>
							</span>{" "}
							<span
								ref={amSplitRef}
								className="about-title-am inline-block text-[clamp(3rem,12vw,7rem)] text-gradient-future"
							>
								{["A", "M"].map((char) => (
									<span key={char} className="about-title-char inline-block">
										{char}
									</span>
								))}
							</span>
						</h2>
						<div className="mt-8 flex flex-wrap items-end justify-between gap-6">
							<p className="about-hero-sub max-w-lg text-lg font-medium text-slate-700 dark:text-slate-200 md:text-xl">
								Full-stack developer and tech lead — building enterprise
								software, AI agents, and intelligent bot integrations.
							</p>
							<div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
								<span className="about-hero-tag rounded border border-slate-300/80 bg-white/60 px-3 py-1.5 dark:border-white/15 dark:bg-slate-950/40">
									ID · NAHOM_D
								</span>
								<span className="about-hero-tag text-cyan-600 dark:text-cyan-400">
									Status / Open for projects
								</span>
							</div>
						</div>
						<p className="about-hero-hint mt-6 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400 lg:block dark:text-slate-500">
							Desktop: scroll the pinned panel or tap scene buttons · 4 layers
						</p>
					</div>

					{/* Desktop: pinned identity theatre */}
					<div ref={theatreRef} className="about-theatre hidden lg:block">
						<div
							ref={pinRef}
							className="about-theatre-pin relative min-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/40 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_40px_100px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60"
						>
							<div
								ref={theatreGlowRef}
								className="about-theatre-glow pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(34,211,238,0.14),transparent_70%)] opacity-40"
								aria-hidden
							/>
							{[
								{ top: "12%", left: "18%" },
								{ top: "28%", left: "72%" },
								{ top: "58%", left: "12%" },
								{ top: "72%", left: "82%" },
								{ top: "44%", left: "48%" },
								{ top: "85%", left: "38%" },
							].map((pos, i) => (
								<span
									key={`particle-${i}`}
									className="about-particle pointer-events-none absolute z-[1] h-2 w-2 rounded-full bg-cyan-400/80 shadow-[0_0_14px_rgba(34,211,238,0.95)]"
									style={{ top: pos.top, left: pos.left }}
									aria-hidden
								/>
							))}
							<div
								ref={scanBeamRef}
								className="about-scan-beam pointer-events-none absolute inset-x-0 z-30 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_32px_rgba(34,211,238,0.9)]"
								aria-hidden
							/>
							<nav
								className="about-theatre-nav absolute right-6 top-5 z-40 flex flex-wrap justify-end gap-2"
								aria-label="Jump to identity scene"
							>
								{SCENES.map((scene, i) => (
									<button
										key={scene.id}
										type="button"
										onClick={() => jumpToScene(i)}
										className={`unstyled about-scene-pill rounded-lg border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] transition duration-300 ${
											activeScene === i
												? "border-cyan-400/60 bg-cyan-500/15 text-cyan-600 shadow-[0_0_20px_rgba(34,211,238,0.25)] dark:text-cyan-300"
												: "border-slate-300/60 bg-white/50 text-slate-500 hover:border-cyan-400/40 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-400"
										}`}
									>
										{scene.code} · {scene.label}
									</button>
								))}
							</nav>
							<div
								className="about-scene-badge absolute left-6 top-5 z-40 rounded-lg border border-violet-400/35 bg-violet-500/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300"
								aria-live="polite"
							>
								Scene {SCENES[activeScene]?.code} / 04
							</div>
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

							<div className="relative z-10 grid h-full min-h-[calc(100dvh-5.5rem)] grid-cols-[minmax(280px,38%)_1fr] gap-10 p-8 xl:gap-14 xl:p-10">
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
									<div
										ref={portraitWrapRef}
										className="about-portrait-wrap relative z-10"
									>
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
										ref={stageDividerRef}
										className="about-stage-divider pointer-events-none absolute left-0 top-0 z-20 h-full w-px origin-top bg-gradient-to-b from-cyan-400/60 via-violet-500/40 to-fuchsia-500/30"
										aria-hidden
									/>
									<div className="relative h-full w-full py-4 pl-8 xl:pl-12">
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
											<WorkspaceScene
												workspaceRef={workspaceRef}
												activeScene={activeScene}
											/>
										</div>
									</div>
								</div>
							</div>

							<div
								className="about-scroll-cue pointer-events-none absolute bottom-24 left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2"
								aria-hidden
							>
								<span className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
									Scroll or tap scenes above
								</span>
								<span className="text-lg text-cyan-400">↓</span>
							</div>

							<div
								className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
								role="tablist"
								aria-label="Scene progress"
							>
								{SCENES.map((scene, i) => (
									<div key={scene.id} className="flex items-center gap-2">
										<button
											type="button"
											role="tab"
											aria-selected={activeScene === i}
											aria-label={`Go to scene ${scene.code}: ${scene.label}`}
											onClick={() => jumpToScene(i)}
											ref={(el) => {
												segmentRefs.current[i] = el;
											}}
											className={`about-scene-segment unstyled h-2 w-10 rounded-full bg-slate-300/80 transition-all duration-300 dark:bg-white/15 ${
												activeScene === i ? "is-active" : ""
											} ${i < activeScene ? "is-passed" : ""}`}
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
						<MobileScene
							sceneRef={(el) => {
								mobileSceneRefs.current[0] = el;
							}}
						>
							<IntroScene />
						</MobileScene>
						<MobileScene
							sceneRef={(el) => {
								mobileSceneRefs.current[1] = el;
							}}
						>
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
						<MobileScene
							sceneRef={(el) => {
								mobileSceneRefs.current[2] = el;
							}}
						>
							<PortraitFrame reduceMotion={reduceMotion} />
						</MobileScene>
						<MobileScene
							sceneRef={(el) => {
								mobileSceneRefs.current[3] = el;
							}}
						>
							<StoryScene
								bioExpanded={bioExpanded}
								setBioExpanded={setBioExpanded}
								bioParaRefs={bioParaRefs}
							/>
						</MobileScene>
						<MobileScene
							sceneRef={(el) => {
								mobileSceneRefs.current[4] = el;
							}}
						>
							<WorkspaceScene
								workspaceRef={workspaceRef}
								activeScene={activeScene}
							/>
						</MobileScene>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
