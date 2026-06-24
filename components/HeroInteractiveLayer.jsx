import React, { useEffect, useRef } from "react";
import { bindVisibilityPause, isCoarsePointer } from "../lib/animationControl";

const PARTICLE_COUNT_DESKTOP = 40;
const PARTICLE_COUNT_MOBILE = 16;
const LINK_DIST = 108;
const MOUSE_RADIUS = 140;

function HeroInteractiveLayer({ containerRef, reduceMotion }) {
	const canvasRef = useRef(null);
	const spotlightRef = useRef(null);
	const rafRef = useRef(0);

	useEffect(() => {
		const container = containerRef?.current;
		const canvas = canvasRef.current;
		const spotlight = spotlightRef.current;
		if (!container || !canvas || reduceMotion) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const coarse = isCoarsePointer();
		const count = coarse ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
		const drawLinks = !coarse;

		const mouse = { x: -9999, y: -9999, active: false };
		let w = 0;
		let h = 0;
		let paused = false;
		let running = true;

		const particles = Array.from({ length: count }, () => ({
			x: Math.random(),
			y: Math.random(),
			bx: Math.random(),
			by: Math.random(),
			r: Math.random() * 1.2 + 0.5,
			hue: Math.random() > 0.5 ? "cyan" : "fuchsia",
			phase: Math.random() * Math.PI * 2,
		}));

		const resize = () => {
			const rect = container.getBoundingClientRect();
			w = Math.max(1, rect.width);
			h = Math.max(1, rect.height);
			const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5);
			canvas.width = w * dpr;
			canvas.height = h * dpr;
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const onPointerMove = (e) => {
			const rect = container.getBoundingClientRect();
			mouse.x = e.clientX - rect.left;
			mouse.y = e.clientY - rect.top;
			mouse.active = true;
			if (spotlight) {
				spotlight.style.opacity = "1";
				spotlight.style.transform = `translate(${mouse.x - 220}px, ${mouse.y - 220}px)`;
			}
		};

		const onPointerLeave = () => {
			mouse.active = false;
			mouse.x = -9999;
			mouse.y = -9999;
			if (spotlight) spotlight.style.opacity = "0";
		};

		const schedule = () => {
			if (!running || paused) return;
			rafRef.current = requestAnimationFrame(tick);
		};

		const tick = (t) => {
			if (!running || paused) return;

			ctx.clearRect(0, 0, w, h);
			const isDark = document.documentElement.classList.contains("dark");
			const particleAlpha = isDark ? 0.35 : 0.55;
			const fuchsiaAlpha = isDark ? 0.28 : 0.45;

			for (const p of particles) {
				const px = p.bx * w + Math.sin(t * 0.00035 + p.phase) * 10;
				const py = p.by * h + Math.cos(t * 0.00028 + p.phase) * 8;

				if (mouse.active) {
					const dx = px - mouse.x;
					const dy = py - mouse.y;
					const dist = Math.hypot(dx, dy);
					if (dist < MOUSE_RADIUS && dist > 0.001) {
						const force = (1 - dist / MOUSE_RADIUS) * 22;
						p.x += (dx / dist) * force * 0.04;
						p.y += (dy / dist) * force * 0.04;
					}
				}

				p.x = px + (p.x - px) * 0.08;
				p.y = py + (p.y - py) * 0.08;

				const pulse = 0.55 + Math.sin(t * 0.003 + p.phase) * 0.35;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2);
				ctx.fillStyle =
					p.hue === "cyan"
						? `rgba(34, 211, 238, ${particleAlpha + pulse * (isDark ? 0.35 : 0.25)})`
						: `rgba(217, 70, 239, ${fuchsiaAlpha + pulse * (isDark ? 0.32 : 0.22)})`;
				ctx.fill();
			}

			if (drawLinks) {
				for (let i = 0; i < particles.length; i++) {
					for (let j = i + 1; j < particles.length; j++) {
						const a = particles[i];
						const b = particles[j];
						const dx = a.x - b.x;
						const dy = a.y - b.y;
						const dist = Math.hypot(dx, dy);
						if (dist < LINK_DIST) {
							const alpha = (1 - dist / LINK_DIST) * (isDark ? 0.2 : 0.14);
							ctx.beginPath();
							ctx.moveTo(a.x, a.y);
							ctx.lineTo(b.x, b.y);
							ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
							ctx.lineWidth = 0.6;
							ctx.stroke();
						}
					}
				}
			}

			if (mouse.active) {
				const grad = ctx.createRadialGradient(
					mouse.x,
					mouse.y,
					0,
					mouse.x,
					mouse.y,
					MOUSE_RADIUS * 0.85,
				);
				grad.addColorStop(0, "rgba(34, 211, 238, 0.07)");
				grad.addColorStop(0.45, "rgba(217, 70, 239, 0.04)");
				grad.addColorStop(1, "transparent");
				ctx.fillStyle = grad;
				ctx.fillRect(0, 0, w, h);
			}

			schedule();
		};

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(container);
		container.addEventListener("pointermove", onPointerMove, { passive: true });
		container.addEventListener("pointerleave", onPointerLeave);

		const unbindVisibility = bindVisibilityPause(container, {
			onPause: () => {
				paused = true;
				cancelAnimationFrame(rafRef.current);
			},
			onResume: () => {
				paused = false;
				schedule();
			},
		});

		schedule();

		return () => {
			running = false;
			unbindVisibility();
			cancelAnimationFrame(rafRef.current);
			ro.disconnect();
			container.removeEventListener("pointermove", onPointerMove);
			container.removeEventListener("pointerleave", onPointerLeave);
		};
	}, [containerRef, reduceMotion]);

	return (
		<>
			<canvas
				ref={canvasRef}
				className="hero-interactive-canvas pointer-events-none absolute inset-0 z-[1]"
				aria-hidden
			/>
			{!reduceMotion ? (
				<div
					ref={spotlightRef}
					className="hero-cursor-spotlight pointer-events-none absolute left-0 top-0 z-[2] h-[440px] w-[440px] opacity-0 transition-opacity duration-300"
					aria-hidden
				/>
			) : null}
		</>
	);
}

export default HeroInteractiveLayer;
