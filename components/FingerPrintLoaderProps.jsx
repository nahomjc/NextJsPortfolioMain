import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
	bindVisibilityPause,
	getCanvasDpr,
	isLowPowerDevice,
} from "../lib/animationControl";
import { preloadHeroAssets } from "../lib/preloadHeroAssets";

const TITLE = "Kingdom Code";
const SUBTITLE = "Loading…";

const ORB_RING_R = 46;
const ORB_RING_C = 2 * Math.PI * ORB_RING_R;

/** Puff clusters — back layer (slower, softer) */
const CLOUDS_BACK = [
	{ left: "-6%", bottom: "18%", w: 280, s: 1.15, d: 0 },
	{ left: "22%", bottom: "8%", w: 320, s: 1.05, d: -3 },
	{ left: "48%", bottom: "14%", w: 260, s: 0.95, d: -6 },
	{ left: "68%", bottom: "6%", w: 300, s: 1.1, d: -2 },
	{ left: "82%", bottom: "16%", w: 240, s: 1, d: -8 },
];

/** Front layer — brighter, closer */
const CLOUDS_FRONT = [
	{ left: "-4%", bottom: "-2%", w: 340, s: 1.25, d: -1 },
	{ left: "14%", bottom: "4%", w: 380, s: 1.35, d: -5 },
	{ left: "38%", bottom: "-4%", w: 420, s: 1.4, d: -3 },
	{ left: "58%", bottom: "2%", w: 360, s: 1.2, d: -7 },
	{ left: "76%", bottom: "-6%", w: 400, s: 1.3, d: -4 },
	{ left: "92%", bottom: "6%", w: 280, s: 1.1, d: -9 },
];

function buildStars(w, h, count) {
	const stars = [];
	for (let i = 0; i < count; i++) {
		stars.push({
			x: Math.random() * w,
			y: Math.random() * h * 0.88,
			r: Math.random() < 0.1 ? 1.6 : 0.5 + Math.random() * 0.9,
			base: 0.2 + Math.random() * 0.65,
			phase: Math.random() * Math.PI * 2,
			speed: 0.35 + Math.random() * 1.4,
		});
	}
	return stars;
}

function spawnShooter(w, h) {
	const angle = 0.55 + Math.random() * 0.35;
	return {
		x: Math.random() * w * 0.85 + w * 0.05,
		y: Math.random() * h * 0.42,
		angle,
		speed: 420 + Math.random() * 380,
		len: 55 + Math.random() * 95,
		life: 0,
		maxLife: 0.35 + Math.random() * 0.45,
	};
}

function buildOrbBlobs() {
	return [
		{ ox: 0.42, oy: 0.38, r: 0.34, phase: 0, fx: 1.1, fy: 0.85, amp: 0.14 },
		{ ox: 0.58, oy: 0.55, r: 0.28, phase: 1.4, fx: 0.9, fy: 1.15, amp: 0.12 },
		{ ox: 0.35, oy: 0.62, r: 0.26, phase: 2.6, fx: 1.25, fy: 0.95, amp: 0.11 },
		{ ox: 0.62, oy: 0.32, r: 0.22, phase: 3.8, fx: 0.75, fy: 1.2, amp: 0.1 },
		{ ox: 0.48, oy: 0.48, r: 0.38, phase: 5.1, fx: 1.05, fy: 1.05, amp: 0.08 },
	];
}

const OrbFluid = () => {
	const canvasRef = useRef(null);
	const rafRef = useRef(0);
	const blobsRef = useRef(buildOrbBlobs());

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
		if (!ctx) return undefined;

		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const lowPower = isLowPowerDevice();
		const targetFrameMs = lowPower ? 50 : 32;

		let size = 0;
		let running = true;
		let paused = false;
		let lastFrameAt = 0;
		let t0 = performance.now();

		const applySize = () => {
			const parent = canvas.parentElement;
			const rect = parent?.getBoundingClientRect();
			size = Math.max(48, Math.round(rect?.width ?? 96));
			const dpr = getCanvasDpr(lowPower ? 1 : 1.5);
			canvas.width = Math.floor(size * dpr);
			canvas.height = Math.floor(size * dpr);
			canvas.style.width = `${size}px`;
			canvas.style.height = `${size}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		applySize();

		const draw = (now) => {
			const t = (now - t0) / 1000;
			ctx.clearRect(0, 0, size, size);

			const bg = ctx.createRadialGradient(
				size * 0.38,
				size * 0.32,
				size * 0.05,
				size * 0.5,
				size * 0.5,
				size * 0.52,
			);
			bg.addColorStop(0, "#5eb8e8");
			bg.addColorStop(0.45, "#3d7cb8");
			bg.addColorStop(1, "#1a3358");
			ctx.fillStyle = bg;
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
			ctx.fill();

			ctx.save();
			ctx.filter = lowPower ? "blur(10px)" : "blur(14px)";
			ctx.globalCompositeOperation = "screen";

			const blobs = blobsRef.current;
			for (let i = 0; i < blobs.length; i++) {
				const b = blobs[i];
				const wobble = reduced
					? 0
					: Math.sin(t * b.fx + b.phase) * b.amp;
				const wobbleY = reduced
					? 0
					: Math.cos(t * b.fy + b.phase * 1.3) * b.amp;
				const cx = (b.ox + wobble) * size;
				const cy = (b.oy + wobbleY) * size;
				const rad = b.r * size * (0.92 + (reduced ? 0 : Math.sin(t * 0.8 + i) * 0.06));
				const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
				g.addColorStop(0, "rgba(255, 255, 255, 0.95)");
				g.addColorStop(0.35, "rgba(220, 245, 255, 0.55)");
				g.addColorStop(1, "rgba(180, 220, 255, 0)");
				ctx.fillStyle = g;
				ctx.beginPath();
				ctx.arc(cx, cy, rad, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.restore();

			ctx.save();
			ctx.globalCompositeOperation = "source-over";
			const sheen = ctx.createRadialGradient(
				size * 0.28,
				size * 0.22,
				0,
				size * 0.35,
				size * 0.3,
				size * 0.45,
			);
			sheen.addColorStop(0, "rgba(255, 255, 255, 0.5)");
			sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
			ctx.fillStyle = sheen;
			ctx.beginPath();
			ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		};

		const tick = (now) => {
			if (!running || paused) return;
			if (now - lastFrameAt < targetFrameMs) {
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			lastFrameAt = now;
			draw(now);
			rafRef.current = requestAnimationFrame(tick);
		};

		const onResize = () => {
			applySize();
			draw(performance.now());
		};
		window.addEventListener("resize", onResize, { passive: true });

		const unbindVisibility = bindVisibilityPause(canvas, {
			onPause: () => {
				paused = true;
				cancelAnimationFrame(rafRef.current);
			},
			onResume: () => {
				paused = false;
				t0 = performance.now();
				rafRef.current = requestAnimationFrame(tick);
			},
		});

		draw(performance.now());
		if (!reduced) rafRef.current = requestAnimationFrame(tick);

		return () => {
			running = false;
			unbindVisibility();
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="intro-cosmic-orb__fluid pointer-events-none absolute inset-0 h-full w-full"
			aria-hidden
		/>
	);
};

const CloudPuff = ({ left, bottom, w, s, d, layer }) => (
	<div
		className={`intro-cosmic-puff-track intro-cosmic-puff-track--${layer}`}
		style={{ left, bottom, animationDelay: `${d}s` }}
		aria-hidden
	>
		<div
			className="intro-cosmic-puff"
			style={{ width: w, transform: `scale(${s})` }}
		>
			<i />
			<i />
			<i />
			<i />
			<i />
		</div>
	</div>
);

const Starfield = () => {
	const canvasRef = useRef(null);
	const rafRef = useRef(0);
	const starsRef = useRef([]);
	const shootersRef = useRef([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const ctx = canvas.getContext("2d", {
			alpha: true,
			desynchronized: true,
		});
		if (!ctx) return undefined;

		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const lowPower = isLowPowerDevice();
		const targetFrameMs = lowPower ? 48 : 36;

		let w = 0;
		let h = 0;
		let running = true;
		let paused = false;
		let lastFrameAt = 0;
		let t0 = performance.now();
		let last = performance.now();
		let spawnCooldown = 0;

		const viewport = () => {
			const vv = window.visualViewport;
			return {
				w: Math.max(1, Math.round(vv?.width ?? window.innerWidth)),
				h: Math.max(1, Math.round(vv?.height ?? window.innerHeight)),
			};
		};

		const applySize = () => {
			const size = viewport();
			w = size.w;
			h = size.h;
			const dpr = getCanvasDpr(lowPower ? 1 : 1.5);
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = lowPower ? 90 : w < 480 ? 120 : 180;
			starsRef.current = buildStars(w, h, count);
		};

		applySize();

		const maxShooters = lowPower ? 2 : 4;

		const drawShooters = (dt) => {
			if (reduced) return;
			spawnCooldown -= dt;
			const shooters = shootersRef.current;
			if (spawnCooldown <= 0 && shooters.length < maxShooters) {
				shooters.push(spawnShooter(w, h));
				spawnCooldown = lowPower ? 1.1 + Math.random() * 1.4 : 0.45 + Math.random() * 0.85;
			}
			for (let i = shooters.length - 1; i >= 0; i--) {
				const sh = shooters[i];
				sh.life += dt;
				const t = sh.life / sh.maxLife;
				if (t >= 1) {
					shooters.splice(i, 1);
					continue;
				}
				const dx = Math.cos(sh.angle);
				const dy = Math.sin(sh.angle);
				sh.x += dx * sh.speed * dt;
				sh.y += dy * sh.speed * dt;
				const fade = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
				const alpha = Math.max(0, fade) * 0.9;
				const tailX = sh.x - dx * sh.len;
				const tailY = sh.y - dy * sh.len;
				const grad = ctx.createLinearGradient(tailX, tailY, sh.x, sh.y);
				grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
				grad.addColorStop(0.55, `rgba(200, 230, 255, ${(alpha * 0.35).toFixed(3)})`);
				grad.addColorStop(1, `rgba(255, 255, 255, ${alpha.toFixed(3)})`);
				ctx.strokeStyle = grad;
				ctx.lineWidth = 1.6;
				ctx.lineCap = "round";
				ctx.beginPath();
				ctx.moveTo(tailX, tailY);
				ctx.lineTo(sh.x, sh.y);
				ctx.stroke();
				ctx.beginPath();
				ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
				ctx.arc(sh.x, sh.y, 1.8, 0, Math.PI * 2);
				ctx.fill();
			}
		};

		const draw = (now, dt) => {
			ctx.clearRect(0, 0, w, h);
			const elapsed = (now - t0) / 1000;
			const stars = starsRef.current;
			for (let i = 0; i < stars.length; i++) {
				const s = stars[i];
				const twinkle = reduced
					? 1
					: 0.5 + 0.5 * Math.sin(elapsed * s.speed + s.phase);
				const a = s.base * twinkle;
				ctx.beginPath();
				ctx.fillStyle = `rgba(255, 255, 255, ${a.toFixed(3)})`;
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}
			drawShooters(dt);
		};

		const tick = (now) => {
			if (!running || paused) return;
			if (now - lastFrameAt < targetFrameMs) {
				rafRef.current = requestAnimationFrame(tick);
				return;
			}
			const dt = Math.min((now - last) / 1000, 0.05);
			last = now;
			lastFrameAt = now;
			draw(now, dt);
			rafRef.current = requestAnimationFrame(tick);
		};

		const onResize = () => {
			applySize();
			shootersRef.current = [];
			draw(performance.now(), 0);
		};
		window.addEventListener("resize", onResize, { passive: true });
		window.visualViewport?.addEventListener("resize", onResize, { passive: true });

		const unbindVisibility = bindVisibilityPause(canvas, {
			onPause: () => {
				paused = true;
				cancelAnimationFrame(rafRef.current);
			},
			onResume: () => {
				paused = false;
				t0 = performance.now();
				rafRef.current = requestAnimationFrame(tick);
			},
		});

		draw(performance.now(), 0);
		if (!reduced) rafRef.current = requestAnimationFrame(tick);

		return () => {
			running = false;
			unbindVisibility();
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("resize", onResize);
			window.visualViewport?.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="intro-cosmic-stars pointer-events-none absolute inset-0 z-[2] h-full w-full"
			aria-hidden
		/>
	);
};

const FingerPrintLoader = ({ onLoadingComplete }) => {
	const rootRef = useRef(null);
	const contentRef = useRef(null);
	const orbRef = useRef(null);
	const titleRef = useRef(null);
	const subRef = useRef(null);
	const ringRef = useRef(null);

	useEffect(() => {
		document.documentElement.classList.add("intro-loading");

		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const lowPower = isLowPowerDevice();

		const kickPreload = () => preloadHeroAssets();
		let preloadIdleId = 0;
		let preloadTimerId = 0;
		if (typeof window !== "undefined") {
			const delay = lowPower ? 1200 : 700;
			if ("requestIdleCallback" in window) {
				preloadIdleId = window.requestIdleCallback(kickPreload, {
					timeout: delay,
				});
			} else {
				preloadTimerId = window.setTimeout(kickPreload, delay);
			}
		}

		const ctx = gsap.context(() => {
			const loadDuration = lowPower ? 2.2 : 2.6;

			const tl = gsap.timeline({
				onComplete: () => {
					onLoadingComplete?.();
				},
			});

			if (reduced) {
				tl.set([contentRef.current, orbRef.current, titleRef.current, subRef.current], {
					opacity: 1,
				})
					.set(ringRef.current, { strokeDashoffset: 0 })
					.to(rootRef.current, { opacity: 0, duration: 0.6, delay: 1.1 });
				return;
			}

			tl.set(contentRef.current, { opacity: 0, y: 28 })
				.set(orbRef.current, { opacity: 0, scale: 0.65 })
				.set(titleRef.current, { opacity: 0, y: 20 })
				.set(subRef.current, { opacity: 0, y: 14 })
				.set(ringRef.current, { strokeDashoffset: ORB_RING_C })
				.to(contentRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.9,
					ease: "power3.out",
				})
				.to(
					orbRef.current,
					{ opacity: 1, scale: 1, duration: 1.05, ease: "back.out(1.4)" },
					"-=0.65",
				)
				.to(
					titleRef.current,
					{ opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
					"-=0.5",
				)
				.to(
					subRef.current,
					{ opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
					"-=0.4",
				)
				.to(
					ringRef.current,
					{
						strokeDashoffset: 0,
						duration: loadDuration,
						ease: "power1.inOut",
					},
					"-=0.15",
				)
				.to(
					rootRef.current,
					{ opacity: 0, duration: 0.8, ease: "power2.inOut" },
					`+=0.35`,
				);
		}, rootRef);

		return () => {
			ctx.revert();
			document.documentElement.classList.remove("intro-loading");
			if (preloadIdleId && "cancelIdleCallback" in window) {
				window.cancelIdleCallback(preloadIdleId);
			}
			if (preloadTimerId) window.clearTimeout(preloadTimerId);
		};
	}, [onLoadingComplete]);

	return (
		<div
			ref={rootRef}
			className="intro-cosmic-loader intro-loader-screen fixed inset-0 z-50 overflow-hidden"
			role="status"
			aria-live="polite"
			aria-label="Loading portfolio"
		>
			<div className="intro-cosmic-sky pointer-events-none absolute inset-0 z-0" aria-hidden />
			<div className="intro-cosmic-aurora pointer-events-none absolute inset-0 z-[1]" aria-hidden />
			<Starfield />
			<div className="intro-cosmic-nebula pointer-events-none absolute inset-0 z-[3]" aria-hidden />
			<div className="intro-cosmic-horizon pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[55%]" aria-hidden />

			<div
				className="intro-cosmic-clouds intro-cosmic-clouds--back pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[50%]"
				aria-hidden
			>
				{CLOUDS_BACK.map((c, i) => (
					<CloudPuff key={`cb-${i}`} {...c} layer="back" />
				))}
			</div>
			<div
				className="intro-cosmic-clouds intro-cosmic-clouds--front pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[48%]"
				aria-hidden
			>
				{CLOUDS_FRONT.map((c, i) => (
					<CloudPuff key={`cf-${i}`} {...c} layer="front" />
				))}
			</div>

			<div className="intro-cosmic-vignette pointer-events-none absolute inset-0 z-[7]" aria-hidden />

			<div
				ref={contentRef}
				className="intro-cosmic-content relative z-10 h-full opacity-0"
			>
				<div className="intro-cosmic-orb-anchor">
					<div
						ref={orbRef}
						className="intro-cosmic-orb relative opacity-0"
						role="progressbar"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label="Loading"
					>
						<div className="intro-cosmic-orb__motion intro-cosmic-orb__motion--alive">
							<svg
								className="intro-cosmic-orb__loader"
								viewBox="0 0 100 100"
								aria-hidden
							>
								<defs>
									<linearGradient
										id="intro-orb-ring-grad"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="100%"
									>
										<stop offset="0%" stopColor="#7dd3fc" />
										<stop offset="50%" stopColor="#c4b5fd" />
										<stop offset="100%" stopColor="#e0f2fe" />
									</linearGradient>
								</defs>
								<circle
									className="intro-cosmic-orb__loader-track"
									cx="50"
									cy="50"
									r={ORB_RING_R}
									fill="none"
								/>
								<circle
									ref={ringRef}
									className="intro-cosmic-orb__loader-progress"
									cx="50"
									cy="50"
									r={ORB_RING_R}
									fill="none"
									stroke="url(#intro-orb-ring-grad)"
									strokeDasharray={ORB_RING_C}
									strokeDashoffset={ORB_RING_C}
									transform="rotate(-90 50 50)"
								/>
							</svg>
							<div className="intro-cosmic-orb__inner">
								<div className="intro-cosmic-orb__halo" />
								<div className="intro-cosmic-orb__wisps" aria-hidden>
									<span className="intro-cosmic-orb__wisp intro-cosmic-orb__wisp--1" />
									<span className="intro-cosmic-orb__wisp intro-cosmic-orb__wisp--2" />
									<span className="intro-cosmic-orb__wisp intro-cosmic-orb__wisp--3" />
								</div>
								<div className="intro-cosmic-orb__sphere">
									<OrbFluid />
									<div className="intro-cosmic-orb__glass" aria-hidden />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="intro-cosmic-copy px-6">
					<h1
						ref={titleRef}
						className="intro-cosmic-title text-center text-[clamp(1.35rem,4.5vw,1.85rem)] font-semibold tracking-tight text-white opacity-0"
					>
						{TITLE}
					</h1>

					<p
						ref={subRef}
						className="intro-cosmic-sub mt-2 text-center text-sm font-light tracking-wide text-white/75 opacity-0 sm:text-base"
					>
						{SUBTITLE}
					</p>
				</div>
			</div>
		</div>
	);
};

export default FingerPrintLoader;
