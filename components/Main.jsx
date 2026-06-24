import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PERSON } from "../lib/seo";

const HeroGltfRobot = dynamic(() => import("./HeroGltfRobot"), { ssr: false });
const HeroInteractiveLayer = dynamic(() => import("./HeroInteractiveLayer"), {
	ssr: false,
});

const ROTATING_WORDS = [
	"scalable",
	"accessible",
	"performant",
	"production-ready",
];
const TERMINAL_LINES = [
	"nahom@dev ~ react · next · typescript",
	"wire → apis · postgres · supabase",
	"ship → perf · seo · clean ux",
	"status → open to collaborate",
];

const HERO_STATS = [
	{ label: "Building", value: 6, suffix: "+ yrs" },
	{ label: "Delivered", value: 15, suffix: "+ apps" },
	{ label: "CS degree", value: 3.9, suffix: " GPA", decimals: 1 },
];

const HERO_TRAITS = [
	"UI engineering",
	"API integration",
	"Performance",
	"Scalable architecture",
];

const sparklePositions = [
	[12, 8],
	[88, 6],
	[22, 24],
	[76, 18],
	[45, 12],
	[91, 38],
	[8, 42],
	[34, 55],
	[67, 48],
	[15, 68],
	[82, 62],
	[52, 72],
	[73, 88],
	[28, 82],
	[61, 30],
	[94, 52],
	[5, 58],
	[38, 38],
	[55, 90],
	[70, 14],
];

const corner =
	"pointer-events-none absolute z-20 h-10 w-10 border-cyan-500/50 dark:border-cyan-400/70";

function HeroHudFrame() {
	return (
		<>
			<span
				className={`${corner} left-3 top-14 border-l-2 border-t-2 md:left-5 md:top-16`}
				aria-hidden
			/>
			<span
				className={`${corner} right-3 top-14 border-r-2 border-t-2 md:right-5 md:top-16`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-6 left-3 border-b-2 border-l-2 md:bottom-8 md:left-5`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-6 right-3 border-b-2 border-r-2 md:bottom-8 md:right-5`}
				aria-hidden
			/>
		</>
	);
}

function HeroSparkles({ offsetX = 0, offsetY = 0 }) {
	return (
		<div
			className="pointer-events-none absolute inset-0 overflow-hidden"
			aria-hidden
		>
			{sparklePositions.map(([x, y]) => (
				<span
					key={`${x}-${y}`}
					className="hero-sparkle absolute h-1 w-1 rounded-sm bg-cyan-500/70 shadow-[0_0_6px_rgba(34,211,238,0.55)] motion-safe:animate-pulse dark:bg-white/80 dark:shadow-[0_0_6px_rgba(217,70,239,0.85)]"
					style={{
						left: `calc(${x}% + ${offsetX * 0.012}px)`,
						top: `calc(${y}% + ${offsetY * 0.012}px)`,
						animationDelay: `${(x + y) * 0.018}s`,
						transform: "rotate(45deg)",
					}}
				/>
			))}
		</div>
	);
}

function IntroWords({ text, className = "" }) {
	return text.split(" ").map((word, i) => (
		<span
			key={`${word}-${i}`}
			className="hero-word-wrap inline-block overflow-hidden align-bottom"
		>
			<span className={`hero-intro-word inline-block ${className}`}>
				{word}&nbsp;
			</span>
		</span>
	));
}

function MagneticWrap({ children, reduceMotion, className = "" }) {
	const ref = useRef(null);

	useEffect(() => {
		if (reduceMotion) return;
		const el = ref.current;
		if (!el) return;

		const onMove = (e) => {
			const rect = el.getBoundingClientRect();
			const x = e.clientX - rect.left - rect.width / 2;
			const y = e.clientY - rect.top - rect.height / 2;
			gsap.to(el, {
				x: x * 0.22,
				y: y * 0.22,
				duration: 0.35,
				ease: "power2.out",
				overwrite: "auto",
			});
		};

		const onLeave = () => {
			gsap.to(el, {
				x: 0,
				y: 0,
				duration: 0.65,
				ease: "elastic.out(1, 0.55)",
			});
		};

		el.addEventListener("mousemove", onMove);
		el.addEventListener("mouseleave", onLeave);
		return () => {
			el.removeEventListener("mousemove", onMove);
			el.removeEventListener("mouseleave", onLeave);
		};
	}, [reduceMotion]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}

const Main = () => {
	const reduceMotion = useReducedMotion();
	const heroRef = useRef(null);
	const heroInnerRef = useRef(null);
	const contentRef = useRef(null);
	const robotColRef = useRef(null);
	const bootFlashRef = useRef(null);
	const scanLineRef = useRef(null);
	const orbCyanRef = useRef(null);
	const orbFuchsiaRef = useRef(null);
	const gridRef = useRef(null);
	const vignetteRef = useRef(null);
	const rotatingWordRef = useRef(null);
	const terminalRef = useRef(null);
	const scrollCueRef = useRef(null);
	const scrollExitRef = useRef(null);
	const heroPortalRef = useRef(null);
	const heroExitVeilRef = useRef(null);
	const heroFractureRef = useRef(null);
	const statRefs = useRef([]);

	const [sparkleOffset, setSparkleOffset] = useState({ x: 0, y: 0 });
	const [terminalText, setTerminalText] = useState("");
	const [statDisplay, setStatDisplay] = useState(HERO_STATS.map(() => 0));
	const [bootComplete, setBootComplete] = useState(false);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") {
			setBootComplete(true);
			setStatDisplay(HERO_STATS.map((s) => s.value));
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			const intro = gsap.timeline({
				delay: 0.4,
				onComplete: () => setBootComplete(true),
			});

			if (bootFlashRef.current) {
				intro.fromTo(
					bootFlashRef.current,
					{ opacity: 0.85 },
					{ opacity: 0, duration: 1.1, ease: "power2.out" },
					0,
				);
			}

			if (scanLineRef.current) {
				intro.fromTo(
					scanLineRef.current,
					{ top: "-4%", opacity: 0.9 },
					{ top: "104%", opacity: 0, duration: 1.35, ease: "power2.inOut" },
					0.05,
				);
			}

			intro.from(
				"[data-hero-hud]",
				{
					y: -24,
					opacity: 0,
					duration: 0.7,
					stagger: 0.06,
					ease: "power3.out",
				},
				0.25,
			);

			intro.from(
				"[data-hero-intro]",
				{
					y: 36,
					opacity: 0,
					duration: 0.75,
					stagger: 0.07,
					ease: "power3.out",
				},
				0.45,
			);

			intro.from(
				".hero-intro-word",
				{
					yPercent: 120,
					opacity: 0,
					duration: 0.7,
					stagger: 0.028,
					ease: "power4.out",
				},
				0.55,
			);

			if (robotColRef.current) {
				intro.fromTo(
					robotColRef.current,
					{ x: 72, opacity: 0, scale: 0.88, rotateY: -12 },
					{
						x: 0,
						opacity: 1,
						scale: 1,
						rotateY: 0,
						duration: 1.15,
						ease: "power3.out",
					},
					0.42,
				);
			}

			statRefs.current.filter(Boolean).forEach((el, i) => {
				const stat = HERO_STATS[i];
				if (stat.static) {
					intro.from(el, { y: 20, opacity: 0, duration: 0.55 }, 0.7 + i * 0.1);
					return;
				}
				const target = stat.value;
				const obj = { val: 0 };
				intro.to(
					obj,
					{
						val: target,
						duration: 1.4,
						ease: "power2.out",
						onUpdate: () => {
							setStatDisplay((prev) => {
								const next = [...prev];
								next[i] =
									stat.decimals != null
										? Number(obj.val.toFixed(stat.decimals))
										: Math.round(obj.val);
								return next;
							});
						},
					},
					0.75 + i * 0.1,
				);
				intro.from(el, { y: 20, opacity: 0, duration: 0.55 }, 0.7 + i * 0.1);
			});

			if (scrollCueRef.current) {
				intro.from(
					scrollCueRef.current,
					{ opacity: 0, y: 16, duration: 0.6 },
					1.15,
				);
				gsap.to(scrollCueRef.current, {
					y: 8,
					opacity: 0.5,
					duration: 1.3,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay: 1.8,
				});
			}

			if (heroInnerRef.current && heroRef.current) {
				const exitTl = gsap.timeline({
					scrollTrigger: {
						trigger: heroRef.current,
						start: "top top",
						end: "bottom top",
						scrub: 0.85,
					},
				});

				exitTl.to(
					"[data-hero-exit='fast']",
					{
						y: -72,
						opacity: 0,
						stagger: 0.04,
						ease: "power2.in",
					},
					0,
				);

				exitTl.to(
					"[data-hero-exit='headline']",
					{
						y: -96,
						rotateX: -14,
						opacity: 0,
						transformOrigin: "50% 100%",
						ease: "power2.in",
					},
					0.06,
				);

				exitTl.to(
					"[data-hero-exit='mid']",
					{
						y: -64,
						x: -32,
						opacity: 0,
						stagger: 0.05,
						ease: "power2.in",
					},
					0.1,
				);

				exitTl.to(
					"[data-hero-exit='cta']",
					{
						y: 48,
						opacity: 0,
						stagger: 0.03,
						ease: "power2.in",
					},
					0.14,
				);

				if (robotColRef.current) {
					exitTl.to(
						robotColRef.current,
						{
							x: 140,
							y: -24,
							scale: 0.72,
							rotateY: -22,
							opacity: 0,
							ease: "power2.inOut",
						},
						0,
					);
				}

				if (gridRef.current) {
					exitTl.to(
						gridRef.current,
						{ scale: 1.65, opacity: 0, ease: "power1.in" },
						0.12,
					);
				}

				if (orbCyanRef.current) {
					exitTl.to(
						orbCyanRef.current,
						{ x: -90, y: -50, opacity: 0, ease: "power1.in" },
						0.08,
					);
				}

				if (orbFuchsiaRef.current) {
					exitTl.to(
						orbFuchsiaRef.current,
						{ x: 100, opacity: 0, ease: "power1.in" },
						0.08,
					);
				}

				if (heroFractureRef.current) {
					exitTl.fromTo(
						heroFractureRef.current,
						{ opacity: 0.55 },
						{ opacity: 0, ease: "power2.in" },
						0.22,
					);
					exitTl.to(
						".hero-fracture-line",
						{
							scaleY: 6,
							opacity: 0,
							stagger: { each: 0.02, from: "center" },
							ease: "power3.in",
						},
						0.18,
					);
				}

				if (heroPortalRef.current) {
					exitTl.fromTo(
						heroPortalRef.current,
						{ scale: 0.35, opacity: 0.85 },
						{ scale: 2.8, opacity: 0, ease: "power2.out" },
						0.28,
					);
				}

				if (heroExitVeilRef.current) {
					exitTl.fromTo(
						heroExitVeilRef.current,
						{ yPercent: 100 },
						{ yPercent: 0, ease: "power2.inOut" },
						0.42,
					);
				}

				if (heroInnerRef.current) {
					exitTl.fromTo(
						heroInnerRef.current,
						{ filter: "brightness(1)" },
						{ filter: "brightness(0.55)", ease: "power1.in" },
						0.35,
					);
				}
			}

			if (scrollExitRef.current && heroRef.current) {
				gsap.fromTo(
					scrollExitRef.current,
					{ scaleX: 0 },
					{
						scaleX: 1,
						ease: "none",
						scrollTrigger: {
							trigger: heroRef.current,
							start: "top top",
							end: "bottom top",
							scrub: 0.35,
						},
					},
				);
			}
		}, heroRef);

		return () => ctx.revert();
	}, [reduceMotion]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;
		const el = rotatingWordRef.current;
		if (!el || !bootComplete) return;

		let idx = 0;
		let timer;

		const swap = () => {
			const next = (idx + 1) % ROTATING_WORDS.length;
			gsap.to(el, {
				yPercent: -110,
				opacity: 0,
				duration: 0.32,
				ease: "power2.in",
				onComplete: () => {
					el.textContent = ROTATING_WORDS[next];
					idx = next;
					gsap.fromTo(
						el,
						{ yPercent: 110, opacity: 0 },
						{ yPercent: 0, opacity: 1, duration: 0.42, ease: "power3.out" },
					);
				},
			});
			timer = window.setTimeout(swap, 2800);
		};

		timer = window.setTimeout(swap, 2800);
		return () => window.clearTimeout(timer);
	}, [reduceMotion, bootComplete]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") {
			setTerminalText(TERMINAL_LINES[0]);
			return;
		}
		if (!bootComplete) return;

		let lineIdx = 0;
		let charIdx = 0;
		let cancelled = false;
		let timeoutId;

		const type = () => {
			if (cancelled) return;
			const line = TERMINAL_LINES[lineIdx];
			if (charIdx <= line.length) {
				setTerminalText(line.slice(0, charIdx));
				charIdx += 1;
				timeoutId = window.setTimeout(type, 28 + Math.random() * 22);
			} else {
				timeoutId = window.setTimeout(() => {
					lineIdx = (lineIdx + 1) % TERMINAL_LINES.length;
					charIdx = 0;
					setTerminalText("");
					type();
				}, 2200);
			}
		};

		type();
		return () => {
			cancelled = true;
			window.clearTimeout(timeoutId);
		};
	}, [reduceMotion, bootComplete]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;
		const hero = heroRef.current;
		if (!hero) return;

		const onMove = (e) => {
			const rect = hero.getBoundingClientRect();
			const nx = (e.clientX - rect.left) / rect.width - 0.5;
			const ny = (e.clientY - rect.top) / rect.height - 0.5;

			setSparkleOffset({ x: nx * 28, y: ny * 28 });

			const targets = [
				{ ref: orbCyanRef, x: nx * 48, y: ny * 32 },
				{ ref: orbFuchsiaRef, x: nx * -42, y: ny * -26 },
				{
					ref: gridRef,
					x: nx * 16,
					y: ny * 12,
					rotateX: ny * -5,
					rotateY: nx * 5,
				},
				{ ref: contentRef, x: nx * -10, y: ny * -6 },
				{ ref: robotColRef, x: nx * 14, y: ny * 8, rotateY: nx * -6 },
			];

			for (const t of targets) {
				if (!t.ref.current) continue;
				gsap.to(t.ref.current, {
					x: t.x,
					y: t.y,
					rotateX: t.rotateX ?? 0,
					rotateY: t.rotateY ?? 0,
					duration: 0.75,
					ease: "power2.out",
					overwrite: "auto",
				});
			}
		};

		hero.addEventListener("pointermove", onMove, { passive: true });
		return () => hero.removeEventListener("pointermove", onMove);
	}, [reduceMotion]);

	return (
		<div
			id="home"
			ref={heroRef}
			className="hero-section hero-theatre relative flex min-h-screen w-full items-center overflow-x-hidden overflow-y-visible bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 pb-10 pt-12 text-slate-900 md:pb-12 md:pt-16 lg:h-[100dvh] lg:max-h-[100dvh] lg:min-h-0 lg:overflow-hidden dark:from-[#06030c] dark:via-[#07040f] dark:to-[#06030c] dark:text-slate-100"
		>
			<HeroInteractiveLayer
				containerRef={heroRef}
				reduceMotion={reduceMotion}
			/>
			<HeroHudFrame />

			<div
				ref={bootFlashRef}
				className="hero-boot-flash pointer-events-none absolute inset-0 z-[40] opacity-0"
				aria-hidden
			/>
			<div
				ref={scanLineRef}
				className="hero-boot-scan pointer-events-none absolute inset-x-0 z-[35] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 shadow-[0_0_28px_rgba(34,211,238,0.85)]"
				aria-hidden
			/>
			<div
				ref={vignetteRef}
				className="hero-vignette pointer-events-none absolute inset-0 z-[3] opacity-25 dark:opacity-40"
				aria-hidden
			/>

			<div
				ref={heroFractureRef}
				className="hero-fracture pointer-events-none absolute inset-0 z-[4] flex items-stretch justify-center gap-[min(8vw,3.5rem)] opacity-0"
				aria-hidden
			>
				{Array.from({ length: 9 }).map((_, i) => (
					<span
						key={i}
						className="hero-fracture-line w-px origin-center bg-gradient-to-b from-transparent via-cyan-300/50 to-transparent"
					/>
				))}
			</div>

			<div
				ref={heroPortalRef}
				className="hero-scroll-portal pointer-events-none absolute bottom-[18%] left-1/2 z-[5] h-[min(42vw,280px)] w-[min(42vw,280px)] -translate-x-1/2 rounded-full opacity-0"
				aria-hidden
			/>

			<div
				ref={heroExitVeilRef}
				className="hero-exit-veil pointer-events-none absolute inset-0 z-[45] translate-y-full"
				aria-hidden
			/>

			<div
				ref={gridRef}
				className="hero-parallax-grid pointer-events-none absolute inset-0 z-0 bg-[length:48px_48px] opacity-[0.35] dark:opacity-[0.22]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(217, 70, 239, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)",
					transformStyle: "preserve-3d",
				}}
				aria-hidden
			/>
			<div
				ref={orbFuchsiaRef}
				className="pointer-events-none absolute -right-[20%] top-1/2 z-0 h-[min(120vw,840px)] w-[min(120vw,840px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.18),rgba(124,58,237,0.08)_45%,transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.42),rgba(124,58,237,0.14)_45%,transparent_68%)]"
				aria-hidden
			/>
			<div
				ref={orbCyanRef}
				className="pointer-events-none absolute left-[10%] top-[20%] z-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px] dark:bg-cyan-500/10"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-[-8%] top-1/3 z-0 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_62%)] blur-3xl motion-reduce:hidden dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_62%)]"
				aria-hidden
			/>
			<HeroSparkles offsetX={sparkleOffset.x} offsetY={sparkleOffset.y} />

			{/* HUD status rail */}
			<div
				data-hero-hud
				className="absolute left-4 right-4 top-4 z-20 mx-auto flex max-w-6xl items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 md:left-6 md:right-6 md:top-5 md:text-[10px]"
			>
				<span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400/90">
					<span className="relative flex h-1.5 w-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
						<span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
					</span>
					Sys online
				</span>
				<span className="hidden text-cyan-600/80 sm:inline dark:text-cyan-400/70">
					React · Next.js · TypeScript
				</span>
				<span className="text-fuchsia-600/75 dark:text-fuchsia-400/70">
					Uplink ready
				</span>
			</div>

			<div
				ref={heroInnerRef}
				className="hero-inner relative z-10 mx-auto w-full min-h-0 max-h-full max-w-6xl will-change-transform"
			>
				<div className="grid w-full min-h-0 max-h-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10 lg:py-0">
					<div
						ref={contentRef}
						className="relative order-2 flex min-h-0 flex-col text-center [perspective:1200px] lg:order-1 lg:min-h-0 lg:text-left"
						style={{ transformStyle: "preserve-3d" }}
					>
						<div
							className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-500/[0.07] via-transparent to-fuchsia-600/[0.08] opacity-90 blur-xl motion-reduce:opacity-0 lg:block"
							aria-hidden
						/>

						<span
							data-hero-intro
							data-hero-exit="fast"
							className="mb-4 inline-flex items-center justify-center gap-2 self-center rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600 shadow-sm backdrop-blur-md sm:text-[11px] lg:self-start dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:shadow-[0_0_32px_rgba(217,70,239,0.1),inset_0_1px_0_rgba(255,255,255,0.06)]"
						>
							<span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
								<span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-cyan-400/50" />
								<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-br from-cyan-300 to-fuchsia-400" />
							</span>
							Full-stack minded · front-end engineer
						</span>

						<h1
							data-hero-intro
							data-hero-exit="headline"
							className="font-display text-[1.65rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-[1.85rem] md:text-[2.15rem] lg:text-[2.35rem] dark:text-white"
						>
							<span className="block text-slate-600 dark:text-slate-300/90">
								{PERSON.name}
							</span>
							<span className="mt-1 block">
								<IntroWords
									text="Crafts"
									className="text-slate-900 dark:text-white/95"
								/>
								<span className="relative inline-block overflow-hidden align-bottom">
									<span
										ref={rotatingWordRef}
										className="hero-rotating-word relative z-[1] inline-block bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-fuchsia-700 bg-clip-text text-transparent dark:from-cyan-200 dark:via-fuchsia-300 dark:to-fuchsia-400"
									>
										{ROTATING_WORDS[0]}
									</span>
								</span>{" "}
								<IntroWords
									text="web products."
									className="text-slate-900 dark:text-white/95"
								/>
							</span>
						</h1>

						<p
							data-hero-intro
							data-hero-exit="headline"
							className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm lg:mx-0 dark:text-slate-400"
						>
							React, Next.js & TypeScript — polished UI wired to real APIs,
							optimized data flow, and architecture that scales.
						</p>

						<div
							data-hero-intro
							data-hero-exit="fast"
							className="mx-auto mt-4 flex w-full max-w-md flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start"
						>
							{HERO_STATS.map((stat, i) => (
								<div
									key={stat.label}
									ref={(el) => {
										statRefs.current[i] = el;
									}}
									className="hero-stat-pill rounded-lg border border-slate-200/80 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]"
								>
									<p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
										{stat.label}
									</p>
									<p className="mt-0.5 font-display text-sm font-bold text-slate-900 dark:text-white">
										{stat.static ?? (
											<>
												{statDisplay[i]}
												<span className="text-xs font-semibold text-cyan-600 dark:text-cyan-300/90">
													{stat.suffix}
												</span>
											</>
										)}
									</p>
								</div>
							))}
						</div>

						<div
							data-hero-intro
							data-hero-exit="mid"
							className="mx-auto mt-5 w-full max-w-md lg:mx-0"
						>
							<div className="hero-signal-panel rounded-xl border border-cyan-400/25 bg-white/85 px-4 py-3 shadow-sm backdrop-blur-md dark:border-cyan-400/20 dark:bg-[#080512]/75">
								<p className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-600/80 dark:text-cyan-400/70">
									Core focus
								</p>
								<div className="mt-2 flex flex-wrap gap-1.5">
									{HERO_TRAITS.map((trait) => (
										<span
											key={trait}
											className="hero-tech-chip rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
										>
											{trait}
										</span>
									))}
								</div>
								<div className="mt-3 rounded-md border border-slate-200/80 bg-slate-100/90 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-slate-600 dark:border-white/8 dark:bg-black/35 dark:text-slate-400">
									<span className="text-cyan-600 dark:text-cyan-400">&gt;</span>{" "}
									<span ref={terminalRef}>{terminalText}</span>
									<span className="hero-terminal-cursor ml-0.5 inline-block w-[6px] text-cyan-600 dark:text-cyan-400">
										_
									</span>
								</div>
							</div>
						</div>

						<p
							data-hero-intro
							data-hero-exit="mid"
							className="mx-auto mt-4 max-w-md text-left text-[11px] leading-relaxed text-slate-500 sm:text-xs lg:mx-0"
						>
							CS graduate · Meta React certified · teaching web dev on Muyalogy.
							I turn complex requirements into fast, reliable interfaces — from
							e-commerce roots to production SaaS.
						</p>

						<div
							data-hero-intro
							data-hero-exit="cta"
							className="mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start"
						>
							<MagneticWrap
								reduceMotion={reduceMotion}
								className="sm:flex-initial"
							>
								<Link href="/#contact" passHref legacyBehavior>
									<a className="unstyled group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-fuchsia-200 px-6 py-2.5 text-xs font-bold text-slate-900 shadow-[0_0_32px_rgba(34,211,238,0.35)] ring-1 ring-cyan-300/40 transition duration-300 hover:shadow-[0_0_44px_rgba(34,211,238,0.45)] sm:w-auto sm:text-sm">
										<span
											className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition duration-500 group-hover:translate-x-full"
											aria-hidden
										/>
										Hire me
										<HiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5" />
									</a>
								</Link>
							</MagneticWrap>
							<MagneticWrap reduceMotion={reduceMotion}>
								<Link
									href="/#projects"
									className="unstyled inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white/90 px-5 py-2.5 text-xs font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto sm:text-sm dark:border-white/70 dark:bg-white/[0.03] dark:text-white dark:hover:border-white dark:hover:bg-white/10"
								>
									View work
								</Link>
							</MagneticWrap>
							<MagneticWrap reduceMotion={reduceMotion}>
								<Link
									href="/#about"
									className="unstyled inline-flex w-full items-center justify-center rounded-full border border-fuchsia-400/40 bg-fuchsia-50 px-5 py-2.5 text-xs font-semibold text-fuchsia-800 transition hover:border-fuchsia-400/55 hover:bg-fuchsia-100/80 sm:w-auto sm:text-sm dark:border-fuchsia-400/35 dark:bg-fuchsia-500/15 dark:text-fuchsia-50 dark:hover:border-fuchsia-400/55"
								>
									About me
								</Link>
							</MagneticWrap>
						</div>

						<div
							data-hero-intro
							data-hero-exit="fast"
							className="mt-6 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
						>
							{[
								{
									href: "https://www.linkedin.com/in/nahom-tesfaye-35b97420b/",
									label: "LinkedIn",
									icon: FaLinkedinIn,
									external: true,
								},
								{
									href: "https://github.com/nahomjc",
									label: "GitHub",
									icon: FaGithub,
									external: true,
								},
								{ href: "/#contact", label: "Email", icon: AiOutlineMail },
								{
									href: "/resume",
									label: "Resume",
									icon: BsFillPersonLinesFill,
								},
							].map(({ href, label, icon: Icon, external }) => (
								<MagneticWrap key={label} reduceMotion={reduceMotion}>
									{external ? (
										<a
											href={href}
											target="_blank"
											rel="noreferrer"
											className="hero-social-btn flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/85 text-slate-700 shadow-sm transition hover:border-fuchsia-400/50 hover:text-fuchsia-600 dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:text-fuchsia-200"
											aria-label={label}
										>
											<Icon className="text-lg" />
										</a>
									) : (
										<Link
											href={href}
											className="hero-social-btn flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/85 text-slate-700 shadow-sm transition hover:border-fuchsia-400/50 hover:text-fuchsia-600 dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:text-fuchsia-200"
											aria-label={label}
										>
											<Icon className="text-lg" />
										</Link>
									)}
								</MagneticWrap>
							))}
						</div>

						<div
							ref={scrollCueRef}
							data-hero-exit="fast"
							className="mt-7 flex flex-col items-center gap-1.5 opacity-0 lg:mt-8 lg:items-start"
						>
							<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
								Scroll to explore
							</span>
							<span className="flex flex-col items-center gap-1 lg:items-start">
								<span className="h-8 w-px bg-gradient-to-b from-cyan-400/80 via-fuchsia-400/60 to-transparent" />
								<span className="text-cyan-600/80 dark:text-cyan-400/80">
									↓
								</span>
							</span>
						</div>
					</div>

					<div
						ref={robotColRef}
						className="hero-robot-col relative order-1 flex min-h-[min(320px,52vw)] items-center justify-center pt-8 opacity-0 sm:pt-10 lg:order-2 lg:min-h-0 lg:pt-8"
						style={{ transformStyle: "preserve-3d", perspective: 1200 }}
					>
						<div
							className="hero-robot-ring pointer-events-none absolute inset-[8%] rounded-[2rem] border border-cyan-400/20"
							aria-hidden
						/>
						<div
							className="hero-robot-ring hero-robot-ring--reverse pointer-events-none absolute inset-[2%] rounded-[2.25rem] border border-fuchsia-400/15"
							aria-hidden
						/>
						<div className="pointer-events-none absolute inset-x-[2%] bottom-[4%] top-[26%] z-0 rounded-[2rem] bg-gradient-to-b from-cyan-400/[0.1] via-slate-200/30 to-transparent ring-1 ring-cyan-400/25 dark:from-cyan-400/[0.08] dark:via-white/[0.04] dark:ring-cyan-400/20" />
						<div
							className="pointer-events-none absolute inset-x-[6%] bottom-[8%] top-[34%] z-0 rounded-[1.75rem] bg-gradient-to-t from-fuchsia-500/[0.06] to-transparent"
							aria-hidden
						/>
						<div className="relative z-10 w-full">
							<HeroGltfRobot />
						</div>
						<p className="pointer-events-none absolute -bottom-1 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 lg:block">
							Interactive · drag · tap
						</p>
					</div>
				</div>
			</div>

			<div className="absolute bottom-4 left-4 right-4 z-20 mx-auto max-w-6xl md:bottom-6">
				<div className="h-px overflow-hidden rounded-full bg-white/10">
					<div
						ref={scrollExitRef}
						className="hero-scroll-exit h-full origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
						aria-hidden
					/>
				</div>
			</div>
		</div>
	);
};

export default Main;
