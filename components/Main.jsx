import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { PERSON } from "../lib/seo";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { bindVisibilityPause } from "../lib/animationControl";
import { scrollTriggerBase, ensureGsapScrollSetup } from "../lib/gsapScroll";
import { btnIconSm } from "./section/SectionShell";
import HeroRobotHalo from "./HeroRobotHalo";

const HeroGltfRobot = dynamic(() => import("./HeroGltfRobot"), { ssr: false });
const HeroInteractiveLayer = dynamic(() => import("./HeroInteractiveLayer"), {
	ssr: false,
});
const HeroProjectCarousel = dynamic(() => import("./HeroProjectCarousel"), {
	ssr: false,
});

const HERO_STAT = { label: "INIT_YEAR", value: 2019, static: "2019" };


const HERO_ROBOT_PLACEHOLDER_CLASS =
	"relative z-20 mx-auto h-[min(320px,72vw)] w-full max-w-[min(100%,24rem)] opacity-40 sm:h-[min(400px,65vw)] sm:max-w-lg md:h-[min(520px,58vh)] md:max-w-2xl lg:h-[min(580px,62vh)] lg:max-w-3xl";

const HUD_CORNER = "pointer-events-none absolute z-30";

function HeroHudFrame() {
	return (
		<>
			{/* Top-left HUD corner */}
			<div className={`${HUD_CORNER} left-3 top-16 sm:left-4 md:left-6 md:top-20`}>
				<div className="flex items-start gap-2">
					<div className="h-12 w-12 border-l-2 border-t-2 border-cyan-400/60" />
					<div className="mt-1">
						<p className="font-mono text-[8px] uppercase tracking-[0.3em] text-cyan-400/70">SYS.STATUS</p>
						<p className="font-mono text-[10px] text-emerald-400">● ONLINE</p>
					</div>
				</div>
			</div>
			{/* Top-right HUD corner */}
			<div className={`${HUD_CORNER} right-3 top-16 sm:right-4 md:right-6 md:top-20`}>
				<div className="flex items-start gap-2">
					<div className="mt-1 text-right">
						<p className="font-mono text-[8px] uppercase tracking-[0.3em] text-fuchsia-400/70">LOC.DATA</p>
						<p className="font-mono text-[10px] text-slate-400">CMC, ADDIS</p>
					</div>
					<div className="h-12 w-12 border-r-2 border-t-2 border-fuchsia-400/60" />
				</div>
			</div>
			{/* Bottom-left HUD corner */}
			<div className={`${HUD_CORNER} bottom-10 left-3 sm:left-4 md:bottom-14 md:left-6`}>
				<div className="flex items-end gap-2">
					<div className="h-12 w-12 border-b-2 border-l-2 border-cyan-400/60" />
					<div className="mb-1">
						<p className="font-mono text-[8px] uppercase tracking-[0.3em] text-cyan-400/70">STACK.VER</p>
						<p className="font-mono text-[10px] text-slate-400">TS.5 NX.16</p>
					</div>
				</div>
			</div>
			{/* Bottom-right HUD corner */}
			<div className={`${HUD_CORNER} bottom-10 right-3 sm:right-4 md:bottom-14 md:right-6`}>
				<div className="flex items-end gap-2">
					<div className="mb-1 text-right">
						<p className="font-mono text-[8px] uppercase tracking-[0.3em] text-fuchsia-400/70">MODE</p>
						<p className="font-mono text-[10px] text-violet-400">CREATIVE</p>
					</div>
					<div className="h-12 w-12 border-b-2 border-r-2 border-fuchsia-400/60" />
				</div>
			</div>
			{/* Tech lines */}
			<div className="pointer-events-none absolute left-0 right-0 top-[45%] z-20 hidden lg:block">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
					<div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-400/40 to-cyan-400/20" />
					<div className="h-px w-16 bg-gradient-to-l from-transparent via-fuchsia-400/40 to-fuchsia-400/20" />
				</div>
			</div>
		</>
	);
}

function GlitchText({ text, className = "", as: Tag = "span" }) {
	return (
		<Tag className={`hero-glitch-text relative inline-block ${className}`} data-text={text}>
			<span className="hero-glitch-text__main">{text}</span>
			<span className="hero-glitch-text__clone hero-glitch-text__clone--1" aria-hidden>{text}</span>
			<span className="hero-glitch-text__clone hero-glitch-text__clone--2" aria-hidden>{text}</span>
		</Tag>
	);
}

function AnimatedCounter({ target, duration = 2, suffix = "" }) {
	const [value, setValue] = useState(0);
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					let start = 0;
					const startTime = performance.now();
					const animate = (now) => {
						const elapsed = (now - startTime) / 1000;
						const progress = Math.min(elapsed / duration, 1);
						const eased = 1 - Math.pow(1 - progress, 3);
						setValue(Math.floor(target * eased));
						if (progress < 1) requestAnimationFrame(animate);
					};
					requestAnimationFrame(animate);
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [target, duration]);

	return <span ref={ref}>{value}{suffix}</span>;
}

function ParticleField() {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animId = 0;
		let particles = [];
		const particleCount = 60;

		const resize = () => {
			canvas.width = canvas.offsetWidth * (window.devicePixelRatio > 1 ? 1.5 : 1);
			canvas.height = canvas.offsetHeight * (window.devicePixelRatio > 1 ? 1.5 : 1);
			ctx.scale(window.devicePixelRatio > 1 ? 1.5 : 1, window.devicePixelRatio > 1 ? 1.5 : 1);
		};
		resize();

		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
				size: Math.random() * 2 + 0.5,
				alpha: Math.random() * 0.5 + 0.2,
				color: Math.random() > 0.5 ? "34, 211, 238" : "139, 92, 246",
			});
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
				if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
				ctx.fill();

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.15})`;
				ctx.fill();
			});
			animId = requestAnimationFrame(animate);
		};
		animate();

		window.addEventListener("resize", resize);
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-60"
			aria-hidden
		/>
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
			gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.55)" });
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
	const router = useRouter();
	const reduceMotion = useReducedMotion();
	const heroRef = useRef(null);
	const heroInnerRef = useRef(null);
	const robotColRef = useRef(null);
	const bootFlashRef = useRef(null);
	const scanLineRef = useRef(null);
	const gridRef = useRef(null);
	const scrollCueRef = useRef(null);
	const scrollExitRef = useRef(null);
	const headlineRef = useRef(null);
	const subheadRef = useRef(null);
	const ctaRowRef = useRef(null);
	const statRef = useRef(null);

	const [bootComplete, setBootComplete] = useState(false);
	const [mountHeavyHero, setMountHeavyHero] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [headlineRevealed, setHeadlineRevealed] = useState(false);

	const handleCarouselPanelClick = useCallback((panelData) => {
		if (panelData?.href) {
			router.push(panelData.href);
		}
	}, [router]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") {
			setMountHeavyHero(true);
			setHeadlineRevealed(true);
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
			return;
		}

		ensureGsapScrollSetup();

		const ctx = gsap.context(() => {
			const intro = gsap.timeline({
				delay: 0.3,
				onComplete: () => {
					setBootComplete(true);
					setTimeout(() => setHeadlineRevealed(true), 200);
				},
			});

			if (bootFlashRef.current) {
				intro.fromTo(
					bootFlashRef.current,
					{ opacity: 0.9 },
					{ opacity: 0, duration: 1.2, ease: "power2.out" },
					0
				);
			}

			if (scanLineRef.current) {
				intro.fromTo(
					scanLineRef.current,
					{ top: "-4%", opacity: 0.95 },
					{ top: "104%", opacity: 0, duration: 1.4, ease: "power2.inOut" },
					0.05
				);
			}

			intro.from(
				"[data-hero-hud]",
				{ y: -24, opacity: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" },
				0.25
			);

			if (headlineRef.current) {
				intro.fromTo(
					headlineRef.current,
					{ y: 60, opacity: 0, scale: 0.94 },
					{ y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
					0.4
				);
			}

			if (subheadRef.current) {
				intro.fromTo(
					subheadRef.current,
					{ y: 32, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
					0.6
				);
			}

			if (robotColRef.current) {
				intro.fromTo(
					robotColRef.current,
					{ y: 80, opacity: 0, scale: 0.85 },
					{ y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
					0.5
				);
			}

			if (statRef.current) {
				intro.from(statRef.current, { y: 20, opacity: 0, duration: 0.6 }, 0.9);
			}

			if (ctaRowRef.current) {
				intro.fromTo(
					ctaRowRef.current,
					{ y: 30, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
					1.0
				);
			}

			if (scrollCueRef.current) {
				intro.from(scrollCueRef.current, { opacity: 0, y: 16, duration: 0.6 }, 1.3);
				gsap.to(scrollCueRef.current, {
					y: 8,
					opacity: 0.5,
					duration: 1.3,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					delay: 2,
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

					exitTl.to("[data-hero-exit='fast']", { y: -80, opacity: 0, stagger: 0.04, ease: "power2.in" }, 0);
					exitTl.to("[data-hero-exit='headline']", { y: -100, opacity: 0, ease: "power2.in" }, 0.06);
					exitTl.to("[data-hero-exit='mid']", { y: -70, opacity: 0, stagger: 0.05, ease: "power2.in" }, 0.1);
					exitTl.to("[data-hero-exit='cta']", { y: 50, opacity: 0, stagger: 0.03, ease: "power2.in" }, 0.14);

					if (robotColRef.current) {
						exitTl.to(robotColRef.current, { y: -90, scale: 0.7, opacity: 0, ease: "power2.inOut" }, 0);
					}
					if (gridRef.current) {
						exitTl.to(gridRef.current, { scale: 1.65, opacity: 0, ease: "power1.in" }, 0.12);
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
						}
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

		const onMove = (e) => {
			const rect = hero.getBoundingClientRect();
			const nx = (e.clientX - rect.left) / rect.width - 0.5;
			const ny = (e.clientY - rect.top) / rect.height - 0.5;
			setMousePos({ x: nx * 2, y: ny * 2 });

			if (gridRef.current) {
				gsap.to(gridRef.current, {
					x: nx * 20,
					y: ny * 15,
					duration: 0.8,
					ease: "power2.out",
					overwrite: "auto",
				});
			}
			if (robotColRef.current) {
				gsap.to(robotColRef.current, {
					x: nx * 12,
					y: ny * 8,
					duration: 0.8,
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
			className="hero-section hero-theatre hero-futuristic relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#030712] px-4 pb-8 pt-16 text-slate-100 sm:px-6 md:pb-12 md:pt-20 lg:min-h-[100dvh] lg:px-8"
		>
			{/* Background layers */}
			<div className="hero-bg-gradient pointer-events-none absolute inset-0 z-0" aria-hidden />
			<ParticleField />
			
			<HeroInteractiveLayer
				containerRef={heroRef}
				reduceMotion={reduceMotion}
				active={mountHeavyHero}
			/>
			<HeroHudFrame />

			{/* Boot flash */}
			<div
				ref={bootFlashRef}
				className="pointer-events-none absolute inset-0 z-[40] bg-gradient-to-b from-cyan-400/30 via-white/20 to-violet-400/20 opacity-0"
				aria-hidden
			/>
			{/* Scan line */}
			<div
				ref={scanLineRef}
				className="pointer-events-none absolute inset-x-0 z-[35] h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 shadow-[0_0_40px_rgba(34,211,238,0.9),0_0_80px_rgba(34,211,238,0.5)]"
				aria-hidden
			/>

			{/* Perspective grid background */}
			<div
				ref={gridRef}
				className="hero-grid-floor pointer-events-none absolute inset-0 z-0"
				aria-hidden
			/>

			{/* Radial glows */}
			<div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.12)_0%,transparent_50%)]" aria-hidden />
			<div className="pointer-events-none absolute left-[20%] top-[30%] z-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_50%)]" aria-hidden />
			<div className="pointer-events-none absolute bottom-[20%] right-[20%] z-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,121,249,0.08)_0%,transparent_50%)]" aria-hidden />

			{/* HUD status rail */}
			<div
				data-hero-hud
				className="absolute left-3 right-3 top-4 z-20 mx-auto flex max-w-[96rem] items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:left-4 sm:right-4 md:top-5 md:text-[10px]"
			>
				<span className="flex items-center gap-2 text-emerald-400">
					<span className="relative flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
						<span className="relative h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
					</span>
					AVAILABLE
				</span>
				<span className="hidden text-cyan-400/80 sm:inline">
					<span className="text-slate-500">COORD:</span> 9.0°N 38.8°E
				</span>
				<span className="text-fuchsia-400/80">
					<span className="text-slate-500">MODE:</span> FULL_STACK
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
					className="mb-6 text-center opacity-0 sm:mb-8"
				>
					<p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400/80 sm:text-xs">
						<span className="mr-2 inline-block h-px w-4 bg-cyan-400/60 align-middle" />
						{PERSON.name}
						<span className="ml-2 inline-block h-px w-4 bg-cyan-400/60 align-middle" />
					</p>
					<h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
						{headlineRevealed ? (
							<GlitchText
								text="FULL STACK"
								className="hero-headline-glow bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent"
							/>
						) : (
							<span className="hero-headline-decode font-mono text-cyan-400/60">
								{">>INIT_"}
							</span>
						)}
						<br />
						{headlineRevealed ? (
							<GlitchText
								text="ENGINEER"
								className="hero-headline-glow bg-gradient-to-r from-fuchsia-300 via-white to-cyan-300 bg-clip-text text-transparent"
							/>
						) : (
							<span className="hero-headline-decode font-mono text-fuchsia-400/60">
								{"LOADING..."}
							</span>
						)}
					</h1>
					<p
						ref={subheadRef}
						data-hero-exit="mid"
						className="mx-auto mt-4 text-sm text-slate-400 opacity-0 sm:mt-5 sm:text-base"
					>
						Building the web since <span className="font-mono text-cyan-400">2019</span>.
					</p>
				</header>

				{/* Centered 3D Robot with Project Carousel */}
				<div
					ref={robotColRef}
					className="hero-robot-col relative flex w-full items-center justify-center opacity-0"
					style={{ transformStyle: "preserve-3d", perspective: 1200 }}
				>
					{/* 3D Project Carousel - behind robot */}
					<div className="absolute inset-0 -inset-x-[25%] z-0 md:-inset-x-[35%] lg:-inset-x-[45%]">
						{mountHeavyHero && (
							<HeroProjectCarousel
								active={bootComplete}
								onPanelClick={handleCarouselPanelClick}
								mousePosition={mousePos}
							/>
						)}
					</div>

					<HeroRobotHalo />
					<div className="relative z-10 w-full">
						{mountHeavyHero ? (
							<HeroGltfRobot />
						) : (
							<div className={HERO_ROBOT_PLACEHOLDER_CLASS} aria-hidden />
						)}
					</div>

					{/* Building since stat - HUD style */}
					<div
						ref={statRef}
						data-hero-exit="fast"
						className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2"
					>
						<div className="hero-hud-panel relative rounded border border-cyan-400/30 bg-slate-900/80 px-6 py-3 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-md">
							<div className="hero-hud-panel__scanline" aria-hidden />
							<p className="text-center font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400/70 sm:text-[10px]">
								{HERO_STAT.label}
							</p>
							<p className="mt-1 text-center font-display text-2xl font-bold text-white sm:text-3xl">
								<AnimatedCounter target={HERO_STAT.value} duration={1.5} />
							</p>
							{/* Corner accents */}
							<span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-cyan-400" />
							<span className="absolute -right-px -top-px h-2 w-2 border-r border-t border-cyan-400" />
							<span className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-cyan-400" />
							<span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-cyan-400" />
						</div>
					</div>

					<p className="pointer-events-none absolute -bottom-10 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400/50 lg:block">
						<span className="mr-1">◈</span> CLICK UNIT FOR VOICE.AI <span className="ml-1">◈</span>
					</p>
				</div>

				{/* CTA Row */}
				<div
					ref={ctaRowRef}
					data-hero-exit="cta"
					className="mt-6 flex items-center justify-center gap-4 opacity-0 sm:mt-8"
				>
					<MagneticWrap reduceMotion={reduceMotion}>
						<Link
							href="/#projects"
							className="hero-cta-primary group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 px-6 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] sm:px-7 sm:py-3"
						>
							<span className="relative z-10 flex items-center gap-2">
								View Work
								<HiOutlineArrowRight className="transition-transform group-hover:translate-x-0.5" />
							</span>
							<span className="hero-cta-primary__shine" aria-hidden />
						</Link>
					</MagneticWrap>
					<MagneticWrap reduceMotion={reduceMotion}>
						<Link
							href="/#contact"
							className="hero-cta-secondary inline-flex items-center gap-2 rounded-lg border border-slate-600/50 bg-slate-800/50 px-6 py-2.5 font-semibold text-slate-200 shadow-lg backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-slate-800/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] sm:px-7 sm:py-3"
						>
							Contact
						</Link>
					</MagneticWrap>
				</div>

				{/* Social links */}
				<div
					data-hero-exit="fast"
					className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8"
				>
					{[
						{ href: "https://www.linkedin.com/in/nahom-tesfaye-35b97420b/", label: "LinkedIn", icon: FaLinkedinIn },
						{ href: "https://github.com/nahomjc", label: "GitHub", icon: FaGithub },
					].map(({ href, label, icon: Icon }) => (
						<MagneticWrap key={label} reduceMotion={reduceMotion}>
							<a
								href={href}
								target="_blank"
								rel="noreferrer"
								className="hero-social-btn flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600/40 bg-slate-800/40 text-slate-400 shadow-md backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
								aria-label={label}
							>
								<Icon className="text-lg" />
							</a>
						</MagneticWrap>
					))}
					<span className="ml-2 font-mono text-[9px] text-slate-500 sm:text-[10px]">
						<a
							href="https://build-with-nahom.com"
							target="_blank"
							rel="noreferrer"
							className="transition-colors hover:text-cyan-400"
						>
							build-with-nahom.com
						</a>
					</span>
				</div>

				{/* Scroll cue */}
				<div
					ref={scrollCueRef}
					data-hero-exit="fast"
					className="mt-10 flex flex-col items-center gap-2 opacity-0 sm:mt-12"
				>
					<span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
						Scroll to explore
					</span>
					<span className="flex flex-col items-center gap-1">
						<span className="h-10 w-px bg-gradient-to-b from-cyan-400/80 via-fuchsia-400/60 to-transparent" />
						<span className="text-sm text-cyan-400/80">↓</span>
					</span>
				</div>
			</div>

			{/* Progress bar */}
			<div className="absolute bottom-4 left-3 right-3 z-20 mx-auto max-w-[96rem] sm:left-4 sm:right-4 md:bottom-6">
				<div className="h-px overflow-hidden rounded-full bg-slate-800">
					<div
						ref={scrollExitRef}
						className="h-full origin-left bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
						aria-hidden
					/>
				</div>
			</div>
		</div>
	);
};

export default Main;
