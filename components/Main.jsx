import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { PERSON, CV_PATH, CV_DOWNLOAD_NAME } from "../lib/seo";
import { AiOutlineMail, AiOutlineDownload } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { isLowPowerDevice, bindVisibilityPause, getCanvasDpr, shouldCapIdleFps } from "../lib/animationControl";
import { scrollTriggerBase, ensureGsapScrollSetup } from "../lib/gsapScroll";
import { btnIconSm } from "./section/SectionShell";
import HeroRobotHalo from "./HeroRobotHalo";

const HeroGltfRobot = dynamic(() => import("./HeroGltfRobot"), { ssr: false });
const HeroInteractiveLayer = dynamic(() => import("./HeroInteractiveLayer"), {
	ssr: false,
});

const HERO_STATS = [
	{ label: "Building since", value: 2019, suffix: "", static: "2019" },
	{ label: "Apps shipped", value: 15, suffix: "+" },
	{ label: "CS degree", value: 3.9, suffix: " GPA", decimals: 1 },
];

const STACK_HIGHLIGHTS = [
	"TypeScript",
	"Next.js",
	"TanStack Start",
	"Hono",
	"PostgreSQL",
	"AI/LLM",
];

const HERO_ROBOT_PLACEHOLDER_CLASS =
	"relative z-20 mx-auto h-[min(320px,72vw)] w-full max-w-[min(100%,24rem)] opacity-40 sm:h-[min(400px,65vw)] sm:max-w-lg md:h-[min(520px,58vh)] md:max-w-2xl lg:h-[min(580px,62vh)] lg:max-w-3xl";

const sparklePositions = [
	[12, 8],
	[88, 6],
	[22, 24],
	[76, 18],
	[45, 12],
	[8, 42],
	[34, 55],
	[67, 48],
	[52, 72],
	[70, 14],
];

const corner =
	"pointer-events-none absolute z-20 h-10 w-10 border-cyan-500/50 dark:border-cyan-400/70";

function HeroHudFrame() {
	return (
		<>
			<span
				className={`${corner} left-2 top-14 border-l-2 border-t-2 sm:left-3 md:left-4 md:top-16`}
				aria-hidden
			/>
			<span
				className={`${corner} right-2 top-14 border-r-2 border-t-2 sm:right-3 md:right-4 md:top-16`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-6 left-2 border-b-2 border-l-2 sm:left-3 md:bottom-8 md:left-4`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-6 right-2 border-b-2 border-r-2 sm:right-3 md:bottom-8 md:right-4`}
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
	const robotColRef = useRef(null);
	const bootFlashRef = useRef(null);
	const scanLineRef = useRef(null);
	const orbCyanRef = useRef(null);
	const orbFuchsiaRef = useRef(null);
	const gridRef = useRef(null);
	const vignetteRef = useRef(null);
	const scrollCueRef = useRef(null);
	const scrollExitRef = useRef(null);
	const heroPortalRef = useRef(null);
	const heroExitVeilRef = useRef(null);
	const heroFractureRef = useRef(null);
	const headlineRef = useRef(null);
	const subheadRef = useRef(null);
	const ctaRowRef = useRef(null);
	const statRefs = useRef([]);
	const statValueRefs = useRef([]);
	const pointerRafRef = useRef(0);
	const pendingPointerRef = useRef(null);

	const [sparkleOffset, setSparkleOffset] = useState({ x: 0, y: 0 });
	const [bootComplete, setBootComplete] = useState(false);
	const [mountHeavyHero, setMountHeavyHero] = useState(false);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") {
			setMountHeavyHero(true);
			return undefined;
		}
		if (!bootComplete) return undefined;

		const enable = () => setMountHeavyHero(true);
		if ("requestIdleCallback" in window) {
			const id = window.requestIdleCallback(enable, { timeout: 700 });
			return () => window.cancelIdleCallback(id);
		}
		const t = window.setTimeout(enable, 350);
		return () => window.clearTimeout(t);
	}, [bootComplete, reduceMotion]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") {
			setBootComplete(true);
			HERO_STATS.forEach((stat, i) => {
				const el = statValueRefs.current[i];
				if (!el || stat.static) return;
				el.textContent =
					stat.decimals != null
						? stat.value.toFixed(stat.decimals)
						: String(Math.round(stat.value));
			});
			return;
		}

		ensureGsapScrollSetup();

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

			if (headlineRef.current) {
				intro.fromTo(
					headlineRef.current,
					{ y: 48, opacity: 0, scale: 0.96 },
					{ y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
					0.35,
				);
			}

			if (subheadRef.current) {
				intro.fromTo(
					subheadRef.current,
					{ y: 32, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
					0.5,
				);
			}

			if (robotColRef.current) {
				intro.fromTo(
					robotColRef.current,
					{ y: 72, opacity: 0, scale: 0.88 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 1.15,
						ease: "power3.out",
					},
					0.55,
				);
			}

			statRefs.current.filter(Boolean).forEach((el, i) => {
				const stat = HERO_STATS[i];
				if (stat.static) {
					intro.from(el, { y: 20, opacity: 0, duration: 0.55 }, 0.85 + i * 0.08);
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
							const el = statValueRefs.current[i];
							if (!el) return;
							el.textContent =
								stat.decimals != null
									? obj.val.toFixed(stat.decimals)
									: String(Math.round(obj.val));
						},
					},
					0.9 + i * 0.08,
				);
				intro.from(el, { y: 20, opacity: 0, duration: 0.55 }, 0.85 + i * 0.08);
			});

			if (ctaRowRef.current) {
				intro.fromTo(
					ctaRowRef.current,
					{ y: 28, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
					1.0,
				);
			}

			if (scrollCueRef.current) {
				intro.from(
					scrollCueRef.current,
					{ opacity: 0, y: 16, duration: 0.6 },
					1.25,
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

			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				if (heroInnerRef.current && heroRef.current) {
					const exitTl = gsap.timeline({
						scrollTrigger: scrollTriggerBase({
							trigger: heroRef.current,
							start: "top top",
							end: "bottom top",
							scrub: 0.85,
						}),
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
								y: -80,
								scale: 0.72,
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
							scrollTrigger: scrollTriggerBase({
								trigger: heroRef.current,
								start: "top top",
								end: "bottom top",
								scrub: 0.35,
							}),
						},
					);
				}
			});
		}, heroRef);

		return () => ctx.revert();
	}, [reduceMotion]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;
		const hero = heroRef.current;
		if (!hero) return;

		const applyPointer = (e) => {
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
				{ ref: robotColRef, x: nx * 10, y: ny * 6 },
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

		const onMove = (e) => {
			pendingPointerRef.current = e;
			if (pointerRafRef.current) return;
			pointerRafRef.current = requestAnimationFrame(() => {
				pointerRafRef.current = 0;
				const event = pendingPointerRef.current;
				if (event) applyPointer(event);
			});
		};

		hero.addEventListener("pointermove", onMove, { passive: true });
		return () => {
			hero.removeEventListener("pointermove", onMove);
			if (pointerRafRef.current) {
				cancelAnimationFrame(pointerRafRef.current);
			}
		};
	}, [reduceMotion]);

	return (
		<div
			id="home"
			ref={heroRef}
			className="hero-section hero-theatre relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 pb-8 pt-16 text-slate-900 sm:px-6 md:pb-12 md:pt-20 lg:min-h-[100dvh] lg:px-8 dark:from-[#06030c] dark:via-[#07040f] dark:to-[#06030c] dark:text-slate-100"
		>
			<HeroInteractiveLayer
				containerRef={heroRef}
				reduceMotion={reduceMotion}
				active={mountHeavyHero}
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
				className="pointer-events-none absolute right-0 top-1/2 z-0 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-y-1/2 translate-x-[12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.18),rgba(124,58,237,0.08)_45%,transparent_68%)] blur-3xl dark:bg-[radial-gradient(circle_at_center,rgba(192,38,211,0.42),rgba(124,58,237,0.14)_45%,transparent_68%)]"
				aria-hidden
			/>
			<div
				ref={orbCyanRef}
				className="pointer-events-none absolute left-[10%] top-[20%] z-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px] dark:bg-cyan-500/10"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-0 top-1/3 z-0 h-[min(55vw,420px)] w-[min(55vw,420px)] -translate-x-[8%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_62%)] blur-3xl motion-reduce:hidden dark:bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_62%)]"
				aria-hidden
			/>
			<HeroSparkles offsetX={sparkleOffset.x} offsetY={sparkleOffset.y} />

			{/* HUD status rail */}
			<div
				data-hero-hud
				className="absolute left-2 right-2 top-4 z-20 mx-auto flex max-w-[96rem] items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:left-3 sm:right-3 md:left-4 md:right-4 md:top-5 md:text-[10px]"
			>
				<span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400/90">
					<span className="relative flex h-1.5 w-1.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
						<span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
					</span>
					Available
				</span>
				<span className="hidden text-cyan-600/80 sm:inline dark:text-cyan-400/70">
					CMC, Addis Ababa
				</span>
				<span className="text-fuchsia-600/75 dark:text-fuchsia-400/70">
					Full Stack · AI
				</span>
			</div>

			<div
				ref={heroInnerRef}
				className="hero-inner relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center will-change-transform"
			>
				{/* Headline Section */}
				<header
					ref={headlineRef}
					data-hero-exit="headline"
					className="mb-4 text-center opacity-0 sm:mb-6"
				>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-600/80 sm:text-xs dark:text-cyan-400/70">
						{PERSON.name}
					</p>
					<h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
						Full Stack Engineer
					</h1>
					<p
						ref={subheadRef}
						data-hero-exit="mid"
						className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600 opacity-0 sm:mt-4 sm:text-base md:text-lg dark:text-slate-400"
					>
						Building production web, mobile &amp; desktop software since 2019.
						<br className="hidden sm:block" />
						<span className="text-slate-500 dark:text-slate-500">
							TypeScript · Next.js · PostgreSQL · AI/LLM integration
						</span>
					</p>
				</header>

				{/* Centered 3D Robot */}
				<div
					ref={robotColRef}
					className="hero-robot-col relative flex w-full items-center justify-center opacity-0"
					style={{ transformStyle: "preserve-3d", perspective: 1200 }}
				>
					<HeroRobotHalo />
					<div className="relative z-10 w-full">
						{mountHeavyHero ? (
							<HeroGltfRobot />
						) : (
							<div className={HERO_ROBOT_PLACEHOLDER_CLASS} aria-hidden />
						)}
					</div>

					{/* Floating stats overlays */}
					<div className="pointer-events-none absolute inset-0 z-20">
						{/* Left floating stat */}
						<div
							ref={(el) => { statRefs.current[0] = el; }}
							data-hero-exit="fast"
							className="absolute left-[2%] top-[18%] hidden opacity-0 lg:block"
						>
							<div className="hero-stat-pill rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
								<p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
									{HERO_STATS[0].label}
								</p>
								<p className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
									{HERO_STATS[0].static}
								</p>
							</div>
						</div>

						{/* Right floating stats */}
						<div
							ref={(el) => { statRefs.current[1] = el; }}
							data-hero-exit="fast"
							className="absolute right-[2%] top-[22%] hidden opacity-0 lg:block"
						>
							<div className="hero-stat-pill rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
								<p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
									{HERO_STATS[1].label}
								</p>
								<p className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
									<span ref={(el) => { statValueRefs.current[1] = el; }}>0</span>
									<span className="text-sm font-semibold text-cyan-600 dark:text-cyan-300/90">
										{HERO_STATS[1].suffix}
									</span>
								</p>
							</div>
						</div>

						{/* Bottom right stat */}
						<div
							ref={(el) => { statRefs.current[2] = el; }}
							data-hero-exit="fast"
							className="absolute bottom-[15%] right-[5%] hidden opacity-0 lg:block"
						>
							<div className="hero-stat-pill rounded-lg border border-slate-200/80 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]">
								<p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
									{HERO_STATS[2].label}
								</p>
								<p className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
									<span ref={(el) => { statValueRefs.current[2] = el; }}>0</span>
									<span className="text-sm font-semibold text-cyan-600 dark:text-cyan-300/90">
										{HERO_STATS[2].suffix}
									</span>
								</p>
							</div>
						</div>
					</div>

					{/* Mobile stats row */}
					<div
						data-hero-exit="fast"
						className="absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:hidden"
					>
						{HERO_STATS.map((stat, i) => (
							<div
								key={stat.label}
								ref={(el) => {
									if (!statRefs.current[i]) statRefs.current[i] = el;
								}}
								className="hero-stat-pill rounded-md border border-slate-200/80 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.06]"
							>
								<p className="font-mono text-[7px] uppercase tracking-[0.15em] text-slate-500">
									{stat.label}
								</p>
								<p className="font-display text-xs font-bold text-slate-900 dark:text-white">
									{stat.static ?? (
										<>
											<span
												ref={(el) => {
													statValueRefs.current[i] = el;
												}}
											>
												0
											</span>
											<span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-300/90">
												{stat.suffix}
											</span>
										</>
									)}
								</p>
							</div>
						))}
					</div>

					<p className="pointer-events-none absolute -bottom-6 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 lg:block">
						Click robot to chat · AI voice assistant
					</p>
				</div>

				{/* Stack highlights */}
				<div
					data-hero-exit="mid"
					className="mt-6 flex flex-wrap justify-center gap-1.5 sm:mt-8 sm:gap-2"
				>
					{STACK_HIGHLIGHTS.map((tech) => (
						<span
							key={tech}
							className="rounded-md border border-slate-200/80 bg-white/80 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-600 shadow-sm backdrop-blur-sm sm:px-2.5 sm:py-1.5 sm:text-[10px] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
						>
							{tech}
						</span>
					))}
				</div>

				{/* CTA Row */}
				<div
					ref={ctaRowRef}
					data-hero-exit="cta"
					className="mt-6 flex flex-wrap items-center justify-center gap-3 opacity-0 sm:mt-8 sm:gap-4"
				>
					<MagneticWrap reduceMotion={reduceMotion}>
						<Link
							href="/#projects"
							className="hero-cta-btn group inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-slate-900 shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/30 sm:px-6 sm:py-3"
						>
							View Work
							<HiOutlineArrowRight className="transition-transform group-hover:translate-x-0.5" />
						</Link>
					</MagneticWrap>
					<MagneticWrap reduceMotion={reduceMotion}>
						<Link
							href="/#contact"
							className="hero-cta-btn inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-5 py-2.5 font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:border-slate-400 hover:bg-white sm:px-6 sm:py-3 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/[0.1]"
						>
							<AiOutlineMail className="text-lg" />
							Contact
						</Link>
					</MagneticWrap>
					<MagneticWrap reduceMotion={reduceMotion}>
						<a
							href={CV_PATH}
							download={CV_DOWNLOAD_NAME}
							className="hero-cta-btn inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white/80 px-5 py-2.5 font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:border-slate-400 hover:bg-white sm:px-6 sm:py-3 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/[0.1]"
						>
							<AiOutlineDownload className="text-lg" />
							Download CV
						</a>
					</MagneticWrap>
				</div>

				{/* Social links */}
				<div
					data-hero-exit="fast"
					className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-6"
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
					].map(({ href, label, icon: Icon, external }) => (
						<MagneticWrap key={label} reduceMotion={reduceMotion}>
							{external ? (
								<a
									href={href}
									target="_blank"
									rel="noreferrer"
									className={`hero-social-btn ${btnIconSm}`}
									aria-label={label}
								>
									<Icon className="text-lg" />
								</a>
							) : (
								<Link
									href={href}
									className={`hero-social-btn ${btnIconSm}`}
									aria-label={label}
								>
									<Icon className="text-lg" />
								</Link>
							)}
						</MagneticWrap>
					))}
					<span className="ml-2 font-mono text-[9px] text-slate-500 sm:text-[10px]">
						<a
							href="https://build-with-nahom.com"
							target="_blank"
							rel="noreferrer"
							className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
						>
							build-with-nahom.com
						</a>
						{" · "}
						<a
							href="https://github.com/nahomjc"
							target="_blank"
							rel="noreferrer"
							className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
						>
							github.com/nahomjc
						</a>
					</span>
				</div>

				{/* Scroll cue */}
				<div
					ref={scrollCueRef}
					data-hero-exit="fast"
					className="mt-8 flex flex-col items-center gap-1.5 opacity-0 sm:mt-10"
				>
					<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
						Scroll to explore
					</span>
					<span className="flex flex-col items-center gap-1">
						<span className="h-8 w-px bg-gradient-to-b from-cyan-400/80 via-fuchsia-400/60 to-transparent" />
						<span className="text-cyan-600/80 dark:text-cyan-400/80">↓</span>
					</span>
				</div>
			</div>

			<div className="absolute bottom-4 left-2 right-2 z-20 mx-auto max-w-[96rem] sm:left-3 sm:right-3 md:bottom-6 md:left-4 md:right-4">
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
