import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import muyalogyImg from "../public/assets/projects/muyaloyg.png";
import ProjectItem from "./ProjectItem";
import afriworkImg from "../public/assets/projects/afriwork.png";
import loopstateImg from "../public/assets/projects/loop-state.png";
import primebankImg from "../public/assets/projects/prime-bank.png";
import jiretImg from "../public/assets/projects/jiret.png";
import sourcepinImg from "../public/assets/Screenshot 2026-03-28 004531.png";
import hcmImg from "../public/assets/Screenshot 2026-03-28 005041.png";
import conflictReporterImg from "../public/assets/global-conflict.vercel.app_ (1).png";
import greenbagImg from "../public/assets/Screenshot 2026-03-28 023643.png";
import arSolutionsImg from "../public/assets/Screenshot 2026-03-28 024007.png";
import afrocadoImg from "../public/assets/Screenshot 2026-03-28 024200.png";

const productionProjects = [
	{
		title: "Sourcepin",
		backgroundImg: sourcepinImg,
		projectUrl: "/sourcepin",
		tech: "Multi-tenant procurement · Ethiopia & Malawi · Next.js · Hono · Drizzle · TypeScript",
		featured: true,
	},
	{
		title: "Jiret",
		backgroundImg: jiretImg,
		projectUrl: "/jiret",
	},
	{
		title: "Human Capital Management",
		backgroundImg: hcmImg,
		projectUrl: "/hcm",
		tech: "HCM / HR operations · Next.js · Hono · Neon · PostgreSQL · Drizzle",
	},
	{
		title: "Green Bag Ethiopia",
		backgroundImg: greenbagImg,
		projectUrl: "/greenbag",
		tech: "E-commerce · Next.js · TypeScript · Telegram bot · OpenRoute · AI commerce",
	},
	{
		title: "AR solution trading PLC",
		backgroundImg: arSolutionsImg,
		projectUrl: "/ar-solutions",
		tech: "Digital marketing & web · Next.js · TypeScript · Brand site — Ethiopia",
	},
	{
		title: "Afrocado Exports",
		backgroundImg: afrocadoImg,
		projectUrl: "/afrocado",
		tech: "Premium produce export · Next.js · TypeScript · Lead generation",
	},
	{
		title: "Muyalogy",
		backgroundImg: muyalogyImg,
		projectUrl: "/muyalogy",
	},
	{
		title: "Afriwork",
		backgroundImg: afriworkImg,
		projectUrl: "/afriwork",
	},
	{
		title: "Loop state",
		backgroundImg: loopstateImg,
		projectUrl: "/loopState",
	},
	{
		title: "Prime bank",
		backgroundImg: primebankImg,
		projectUrl: "/prime",
	},
];

const personalProjects = [
	{
		title: "Conflict Reporter",
		backgroundImg: conflictReporterImg,
		projectUrl: "/conflict-reporter",
		tech: "Next.js · 3D globe · OpenRouter — situational reflection dashboard",
	},
	{
		title: "Netflix clone",
		backgroundImg: "/assets/projects/netflix.jpg",
		projectUrl: "/netflixClone",
	},
	{
		title: "Airbnb clone",
		backgroundImg: "/assets/projects/Airbnb1.jpg",
		projectUrl: "/airbnb",
	},
	{
		title: "Crypto App",
		backgroundImg: "/assets/projects/crypto1.jpg",
		projectUrl: "/crypto",
	},
	{
		title: "Youtube clone",
		backgroundImg: "/assets/projects/youtube.jpg",
		projectUrl: "/youtube",
	},
	{
		title: "Covid-19 Tracker",
		backgroundImg: "/assets/projects/covidl.jpg",
		projectUrl: "/covid",
	},
];

function SubsectionHeader({ eyebrow, secLabel, title, titleGradient, description, headerRef, className = "" }) {
	return (
		<header
			ref={headerRef}
			className={`projects-subheader mb-10 border-b border-slate-200/80 pb-8 dark:border-white/10 md:mb-12 md:pb-10 ${className}`}
		>
			<p data-reveal className="section-eyebrow">
				<span
					className="h-px w-8 bg-gradient-to-r from-fuchsia-400 to-cyan-400"
					aria-hidden
				/>
				{eyebrow}
				<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
					{secLabel}
				</span>
			</p>
			<h3
				data-reveal
				className="projects-subheader-title mt-3 font-display text-2xl text-slate-900 dark:text-white md:text-3xl"
			>
				{title} <span className="text-gradient-future">{titleGradient}</span>
			</h3>
			{description ? (
				<p
					data-reveal
					className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base"
				>
					{description}
				</p>
			) : null}
			<div
				data-reveal
				className="projects-subheader-line mt-6 h-px origin-left bg-gradient-to-r from-fuchsia-400/80 via-cyan-400/60 to-transparent"
				aria-hidden
			/>
		</header>
	);
}

const Projects = () => {
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const builtBlockRef = useRef(null);
	const prodHeaderRef = useRef(null);
	const personalHeaderRef = useRef(null);
	const personalBlockRef = useRef(null);
	const prodCardRefs = useRef([]);
	const personalCardRefs = useRef([]);
	const headerScanRef = useRef(null);
	const headerIndexRef = useRef(null);
	const prodSpineFillRef = useRef(null);
	const prodSignalRef = useRef(null);

	const [featuredProject, ...restProduction] = productionProjects;

	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			if (headerRef.current) {
				gsap.fromTo(
					".projects-header-eyebrow",
					{ y: 28, opacity: 0, letterSpacing: "0.35em" },
					{
						y: 0,
						opacity: 1,
						letterSpacing: "0.25em",
						ease: "power3.out",
						scrollTrigger: {
							trigger: headerRef.current,
							start: "top 86%",
							end: "top 68%",
							scrub: 0.55,
						},
					}
				);

				gsap.fromTo(
					".projects-title-word",
					{
						y: 72,
						rotateX: -38,
						opacity: 0,
						filter: "blur(8px)",
						transformOrigin: "50% 100%",
					},
					{
						y: 0,
						rotateX: 0,
						opacity: 1,
						filter: "blur(0px)",
						stagger: 0.12,
						ease: "power3.out",
						scrollTrigger: {
							trigger: headerRef.current,
							start: "top 84%",
							end: "top 52%",
							scrub: 0.68,
						},
					}
				);

				gsap.fromTo(
					".projects-header-desc",
					{ y: 32, opacity: 0, filter: "blur(6px)" },
					{
						y: 0,
						opacity: 1,
						filter: "blur(0px)",
						ease: "power2.out",
						scrollTrigger: {
							trigger: headerRef.current,
							start: "top 78%",
							end: "top 58%",
							scrub: 0.5,
						},
					}
				);

				gsap.fromTo(
					".projects-stat-chip",
					{ y: 44, opacity: 0, scale: 0.86, rotateX: 18 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						rotateX: 0,
						stagger: 0.1,
						ease: "back.out(1.35)",
						transformOrigin: "50% 100%",
						scrollTrigger: {
							trigger: headerRef.current,
							start: "top 74%",
							end: "top 48%",
							scrub: 0.58,
						},
					}
				);

				gsap.fromTo(
					".projects-header-line",
					{ scaleX: 0, opacity: 0.4 },
					{
						scaleX: 1,
						opacity: 1,
						ease: "power2.inOut",
						scrollTrigger: {
							trigger: headerRef.current,
							start: "top 72%",
							end: "top 50%",
							scrub: 0.48,
						},
					}
				);

				if (headerScanRef.current) {
					gsap.fromTo(
						headerScanRef.current,
						{ left: "-110%", opacity: 0.2 },
						{
							left: "110%",
							opacity: 0.95,
							ease: "none",
							scrollTrigger: {
								trigger: headerRef.current,
								start: "top 80%",
								end: "top 45%",
								scrub: 0.72,
							},
						}
					);
				}

				if (headerIndexRef.current) {
					gsap.fromTo(
						headerIndexRef.current,
						{ x: 60, opacity: 0.02, scale: 0.92 },
						{
							x: -30,
							opacity: 0.08,
							scale: 1,
							ease: "none",
							scrollTrigger: {
								trigger: headerRef.current,
								start: "top 85%",
								end: "bottom 60%",
								scrub: 0.45,
							},
						}
					);
				}
			}

			if (builtBlockRef.current && prodSpineFillRef.current) {
				gsap.fromTo(
					prodSpineFillRef.current,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: "none",
						scrollTrigger: {
							trigger: builtBlockRef.current,
							start: "top 75%",
							end: "bottom 25%",
							scrub: 0.42,
						},
					}
				);
			}

			if (builtBlockRef.current && prodSignalRef.current) {
				gsap.fromTo(
					prodSignalRef.current,
					{ top: "0%", opacity: 0.35 },
					{
						top: "100%",
						opacity: 1,
						ease: "none",
						scrollTrigger: {
							trigger: builtBlockRef.current,
							start: "top 72%",
							end: "bottom 28%",
							scrub: 0.5,
						},
					}
				);
			}

			const animateSubheader = (ref, extraClass) => {
				if (!ref.current) return;
				const title = ref.current.querySelector(".projects-subheader-title");
				const line = ref.current.querySelector(".projects-subheader-line");
				const reveals = ref.current.querySelectorAll("[data-reveal]");

				if (extraClass && ref.current) {
					gsap.fromTo(
						ref.current,
						{ clipPath: "inset(0 100% 0 0 round 0px)", opacity: 0.5 },
						{
							clipPath: "inset(0 0% 0 0 round 0px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: ref.current,
								start: "top 90%",
								end: "top 58%",
								scrub: 0.62,
							},
						}
					);
				}

				if (reveals.length) {
					gsap.from(reveals, {
						y: 32,
						opacity: 0,
						duration: 0.7,
						stagger: 0.07,
						ease: "power3.out",
						scrollTrigger: {
							trigger: ref.current,
							start: "top 84%",
							toggleActions: "play none none reverse",
						},
					});
				}

				if (title) {
					gsap.from(title, {
						y: 28,
						opacity: 0,
						duration: 0.85,
						ease: "power3.out",
						scrollTrigger: {
							trigger: ref.current,
							start: "top 82%",
							toggleActions: "play none none reverse",
						},
					});
				}

				if (line) {
					gsap.fromTo(
						line,
						{ scaleX: 0 },
						{
							scaleX: 1,
							ease: "power2.inOut",
							scrollTrigger: {
								trigger: ref.current,
								start: "top 78%",
								end: "top 55%",
								scrub: 0.45,
							},
						}
					);
				}
			};

			animateSubheader(prodHeaderRef, true);
			animateSubheader(personalHeaderRef, false);

			const animateFeaturedCard = (card) => {
				if (!card) return;
				const reveal = card.querySelector(".project-card-reveal");
				const inner = card.querySelector(".project-card-inner");
				const content = card.querySelector(".project-card-content");
				const media = card.querySelector(".project-card-image");
				const scan = card.querySelector(".project-card-scan");
				const glow = card.querySelector(".project-card-glow");

				if (reveal) {
					gsap.fromTo(
						reveal,
						{
							clipPath: "inset(100% 100% 0 0 round 18px)",
							opacity: 0.35,
						},
						{
							clipPath: "inset(0 0 0 0 round 18px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 90%",
								end: "top 42%",
								scrub: 0.75,
							},
						}
					);
				}

				if (inner) {
					gsap.fromTo(
						inner,
						{ y: 64, scale: 1.08, rotateX: 14, rotateY: -6 },
						{
							y: 0,
							scale: 1,
							rotateX: 0,
							rotateY: 0,
							ease: "power2.out",
							transformOrigin: "50% 100%",
							scrollTrigger: {
								trigger: card,
								start: "top 88%",
								end: "top 46%",
								scrub: 0.7,
							},
						}
					);
				}

				if (glow) {
					gsap.fromTo(
						glow,
						{ opacity: 0, scale: 0.85 },
						{
							opacity: 0.55,
							scale: 1.05,
							ease: "none",
							scrollTrigger: {
								trigger: card,
								start: "top 85%",
								end: "top 40%",
								scrub: 0.6,
							},
						}
					);
				}

				if (content) {
					gsap.fromTo(
						content,
						{ y: 72, opacity: 0, filter: "blur(6px)" },
						{
							y: 0,
							opacity: 1,
							filter: "blur(0px)",
							ease: "power3.out",
							scrollTrigger: {
								trigger: card,
								start: "top 70%",
								end: "top 48%",
								scrub: 0.55,
							},
						}
					);
				}

				if (scan) {
					gsap.fromTo(
						scan,
						{ top: "0%", opacity: 0.95 },
						{
							top: "100%",
							opacity: 0,
							ease: "power1.inOut",
							scrollTrigger: {
								trigger: card,
								start: "top 82%",
								end: "top 44%",
								scrub: 0.58,
							},
						}
					);
				}

				if (media) {
					gsap.fromTo(
						media,
						{ scale: 1.18, y: "-6%" },
						{
							scale: 1,
							y: "6%",
							ease: "none",
							scrollTrigger: {
								trigger: card,
								start: "top bottom",
								end: "bottom top",
								scrub: true,
							},
						}
					);
				}
			};

			const animateGridCard = (card, i) => {
				if (!card) return;
				const reveal = card.querySelector(".project-card-reveal");
				const inner = card.querySelector(".project-card-inner");
				const content = card.querySelector(".project-card-content");
				const media = card.querySelector(".project-card-image");
				const scan = card.querySelector(".project-card-scan");
				const glow = card.querySelector(".project-card-glow");
				const fromLeft = i % 2 === 0;
				const clipFrom = fromLeft
					? "inset(0 100% 0 0 round 16px)"
					: "inset(0 0 0 100% round 16px)";
				const fromX = fromLeft ? -80 : 80;
				const rotateY = fromLeft ? 14 : -14;
				const scrubEnd = 56 - (i % 3) * 4;

				if (reveal) {
					gsap.fromTo(
						reveal,
						{ clipPath: clipFrom, opacity: 0.45 },
						{
							clipPath: "inset(0 0 0 0 round 16px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 92%",
								end: `top ${scrubEnd}%`,
								scrub: 0.66,
							},
						}
					);
				}

				if (inner) {
					gsap.fromTo(
						inner,
						{
							x: fromX,
							y: 32,
							rotateY,
							scale: 0.94,
							transformOrigin: fromLeft ? "100% 50%" : "0% 50%",
						},
						{
							x: 0,
							y: 0,
							rotateY: 0,
							scale: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 90%",
								end: `top ${scrubEnd - 2}%`,
								scrub: 0.64,
							},
						}
					);
				}

				if (glow) {
					gsap.fromTo(
						glow,
						{ opacity: 0 },
						{
							opacity: 0.35,
							ease: "none",
							scrollTrigger: {
								trigger: card,
								start: "top 88%",
								end: "top 50%",
								scrub: 0.5,
							},
						}
					);
				}

				if (content) {
					gsap.fromTo(
						content,
						{ y: 40, opacity: 0 },
						{
							y: 0,
							opacity: 1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: card,
								start: "top 76%",
								end: "top 56%",
								scrub: 0.45,
							},
						}
					);
				}

				if (scan) {
					gsap.fromTo(
						scan,
						{ top: "0%", opacity: 0.7 },
						{
							top: "100%",
							opacity: 0,
							ease: "power1.inOut",
							scrollTrigger: {
								trigger: card,
								start: "top 88%",
								end: "top 58%",
								scrub: 0.52,
							},
						}
					);
				}

				if (media) {
					gsap.fromTo(
						media,
						{ y: "-10%", scale: 1.08 },
						{
							y: "10%",
							scale: 1,
							ease: "none",
							scrollTrigger: {
								trigger: card,
								start: "top bottom",
								end: "bottom top",
								scrub: true,
							},
						}
					);
				}
			};

			const animatePersonalCard = (card, i) => {
				if (!card) return;
				const reveal = card.querySelector(".project-card-reveal");
				const inner = card.querySelector(".project-card-inner");
				const content = card.querySelector(".project-card-content");
				const media = card.querySelector(".project-card-image");
				const scan = card.querySelector(".project-card-scan");
				const glow = card.querySelector(".project-card-glow");
				const col = i % 3;
				const clipFrom =
					col === 0
						? "inset(100% 0 0 0 round 16px)"
						: col === 1
							? "inset(0 0 100% 0 round 16px)"
							: "inset(0 100% 0 0 round 16px)";

				if (reveal) {
					gsap.fromTo(
						reveal,
						{ clipPath: clipFrom, opacity: 0.4 },
						{
							clipPath: "inset(0 0 0 0 round 16px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 94%",
								end: "top 60%",
								scrub: 0.6,
							},
						}
					);
				}

				if (inner) {
					gsap.fromTo(
						inner,
						{ y: 64, scale: 0.9, rotateX: 10 },
						{
							y: 0,
							scale: 1,
							rotateX: 0,
							ease: "power2.out",
							transformOrigin: "50% 100%",
							scrollTrigger: {
								trigger: card,
								start: "top 92%",
								end: "top 58%",
								scrub: 0.58,
							},
						}
					);
				}

				if (glow) {
					gsap.fromTo(
						glow,
						{ opacity: 0 },
						{
							opacity: 0.28,
							scrollTrigger: {
								trigger: card,
								start: "top 90%",
								end: "top 55%",
								scrub: 0.45,
							},
						}
					);
				}

				if (content) {
					gsap.fromTo(
						content,
						{ y: 32, opacity: 0 },
						{
							y: 0,
							opacity: 1,
							ease: "power3.out",
							scrollTrigger: {
								trigger: card,
								start: "top 82%",
								end: "top 62%",
								scrub: 0.42,
							},
						}
					);
				}

				if (scan) {
					gsap.fromTo(
						scan,
						{ top: "0%", opacity: 0.55 },
						{
							top: "100%",
							opacity: 0,
							scrollTrigger: {
								trigger: card,
								start: "top 90%",
								end: "top 62%",
								scrub: 0.48,
							},
						}
					);
				}

				if (media) {
					gsap.fromTo(
						media,
						{ y: "-6%", scale: 1.05 },
						{
							y: "6%",
							scale: 1,
							ease: "none",
							scrollTrigger: {
								trigger: card,
								start: "top bottom",
								end: "bottom top",
								scrub: true,
							},
						}
					);
				}
			};

			animateFeaturedCard(prodCardRefs.current[0]);

			prodCardRefs.current.slice(1).forEach((card, i) => {
				animateGridCard(card, i);
			});

			personalCardRefs.current.forEach((card, i) => {
				animatePersonalCard(card, i);
			});

			if (builtBlockRef.current) {
				gsap.from(".projects-built-glow", {
					opacity: 0,
					scale: 0.85,
					duration: 1.2,
					ease: "power2.out",
					scrollTrigger: {
						trigger: builtBlockRef.current,
						start: "top 90%",
						toggleActions: "play none none reverse",
					},
				});
			}
		}, sectionRef);

		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 450);

		return () => {
			window.clearTimeout(refreshTimer);
			ctx.revert();
		};
	}, [reduceMotion]);

	return (
		<section
			id="projects"
			ref={sectionRef}
			className="projects-section relative w-full scroll-mt-24 overflow-hidden"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.17]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-1/4 top-20 h-[min(85vw,560px)] w-[min(85vw,560px)] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px] dark:bg-fuchsia-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-20 right-0 h-[min(75vw,480px)] w-[min(75vw,480px)] translate-x-1/3 rounded-full bg-cyan-400/10 blur-[105px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/25 to-transparent dark:via-fuchsia-400/35"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-[1240px] px-4 py-20 md:py-28">
				<p
					ref={headerIndexRef}
					className="projects-bg-index pointer-events-none absolute right-[2%] top-32 z-0 font-display text-[clamp(6rem,18vw,13rem)] font-bold leading-none text-slate-900/[0.04] dark:text-white/[0.035] md:top-24"
					aria-hidden
				>
					04
				</p>

				<header
					ref={headerRef}
					className="projects-header-block relative mx-auto mb-14 max-w-3xl overflow-hidden border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-20 md:pb-12 [perspective:1200px]"
				>
					<div
						ref={headerScanRef}
						className="projects-header-scan pointer-events-none absolute inset-y-0 z-[2] w-[45%] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent opacity-0"
						aria-hidden
					/>
					<div className="relative z-[1] flex justify-center">
						<p className="projects-header-eyebrow section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500"
								aria-hidden
							/>
							Build log
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 04
							</span>
						</p>
					</div>
					<h2 className="projects-header-title relative z-[1] mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl lg:text-[2.65rem]">
						<span className="projects-title-word inline-block [transform-style:preserve-3d]">
							Selected{" "}
						</span>
						<span className="projects-title-word inline-block text-gradient-future [transform-style:preserve-3d]">
							work
						</span>
					</h2>
					<p className="projects-header-desc relative z-[1] mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
						Production platforms, client shipping, and high-fidelity experiments —
						each deployment ships with a dedicated case route.
					</p>
					<div className="relative z-[1] mx-auto mt-6 grid max-w-lg grid-cols-3 gap-3">
						{[
							{ k: "PROD", v: String(productionProjects.length) },
							{ k: "SANDBOX", v: String(personalProjects.length) },
							{ k: "ROUTES", v: String(productionProjects.length + personalProjects.length) },
						].map((stat) => (
							<div
								key={stat.k}
								className="projects-stat-chip rounded-xl border border-slate-200/80 bg-white/60 px-2 py-2.5 [transform-style:preserve-3d] dark:border-white/10 dark:bg-slate-950/40"
							>
								<p className="font-mono text-[9px] tracking-[0.18em] text-fuchsia-600 dark:text-fuchsia-400">
									{stat.k}
								</p>
								<p className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
									{stat.v}
								</p>
							</div>
						))}
					</div>
					<div
						className="projects-header-line relative z-[1] mx-auto mt-6 h-px max-w-md origin-center bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
						aria-hidden
					/>
				</header>

				<div ref={builtBlockRef} className="projects-block relative lg:pl-10 xl:pl-12">
					<div
						className="projects-prod-spine pointer-events-none absolute bottom-0 left-0 top-0 hidden w-8 lg:block"
						aria-hidden
					>
						<div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-slate-300/70 dark:bg-white/10" />
						<div
							ref={prodSpineFillRef}
							className="projects-spine-fill absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-fuchsia-400 via-cyan-400 to-violet-400"
						/>
						<div
							ref={prodSignalRef}
							className="projects-signal-dot absolute left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.7)] dark:border-slate-950"
						/>
					</div>
					<div
						className="projects-built-glow pointer-events-none absolute -left-8 top-0 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-[80px] dark:bg-fuchsia-500/15"
						aria-hidden
					/>
					<SubsectionHeader
						headerRef={prodHeaderRef}
						className="projects-built-header relative"
						eyebrow="Projects"
						secLabel="/ 04A"
						title={"What I've"}
						titleGradient="Built"
						description="Real products and partnerships — e-commerce, export and marketing sites, procurement, HR / human capital, LMS, learning products, fintech experiments, and more."
					/>

					<div className="mb-8">
						<ProjectItem
							ref={(el) => {
								prodCardRefs.current[0] = el;
							}}
							index={0}
							variant="production"
							featured
							{...featuredProject}
						/>
					</div>

					<div className="grid gap-6 md:grid-cols-2 md:gap-8">
						{restProduction.map((project, index) => (
							<ProjectItem
								key={project.projectUrl}
								ref={(el) => {
									prodCardRefs.current[index + 1] = el;
								}}
								index={index + 1}
								variant="production"
								{...project}
							/>
						))}
					</div>
				</div>

				<div ref={personalBlockRef} className="projects-block relative mt-24 md:mt-32">
					<SubsectionHeader
						headerRef={personalHeaderRef}
						eyebrow="Portfolio"
						secLabel="/ 04B"
						title="Personal"
						titleGradient="Projects"
						description="Sandbox builds, data viz, and experiments — UI patterns, 3D, and AI-assisted apps."
					/>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
						{personalProjects.map((project, index) => (
							<ProjectItem
								key={project.projectUrl}
								ref={(el) => {
									personalCardRefs.current[index] = el;
								}}
								index={index}
								variant="personal"
								{...project}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Projects;
