import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SMOKE_DURATION_MS = 5200;

function isDocumentDark() {
	if (typeof document === "undefined") return false;
	return document.documentElement.classList.contains("dark");
}

/** Simple multi-frequency drift for turbulent motion (no external noise lib). */
function turbField(x, y, t) {
	const n1 =
		Math.sin(x * 0.004 + t * 0.0013) * Math.cos(y * 0.003 - t * 0.0009);
	const n2 = Math.sin(x * 0.011 - t * 0.0018) * 0.45;
	const n3 = Math.cos(y * 0.009 + t * 0.0011 + x * 0.001) * 0.35;
	return n1 + n2 + n3;
}

class SmokePlume {
	constructor(w, h, opts) {
		const {
			zone = "floor",
			sizeMin = 35,
			sizeMax = 110,
			buoyancy = 1,
			alphaMul = 1,
		} = opts;
		this.zone = zone;
		this.sizeMin = sizeMin;
		this.sizeMax = sizeMax;
		this.buoyancy = buoyancy;
		this.alphaMul = alphaMul;
		this.w = w;
		this.h = h;
		this._respawn(w, h, true);
	}

	_respawn(w, h, initial) {
		this.w = w;
		this.h = h;
		let x;
		if (this.zone === "left") {
			x = w * (-0.02 + Math.random() * 0.22);
		} else if (this.zone === "right") {
			x = w * (0.78 + Math.random() * 0.22);
		} else {
			x = w * (Math.random() * 1.05 - 0.025);
		}
		const depth = initial ? Math.random() * h * 0.35 : 0;
		this.x = x;
		this.y = h + 40 + Math.random() * 180 + depth;
		const baseR = this.sizeMin + Math.random() * (this.sizeMax - this.sizeMin);
		this.rx = baseR * (0.85 + Math.random() * 0.25);
		this.ry = baseR * (0.42 + Math.random() * 0.28);
		this.vx = (Math.random() - 0.5) * (0.8 + Math.random() * 0.7);
		this.vy = (-1.1 - Math.random() * 1.6) * this.buoyancy;
		this.rot = Math.random() * Math.PI * 2;
		this.vrot = (Math.random() - 0.5) * 0.0022;
		this.puffRx = 0.22 + Math.random() * 0.28;
		this.puffRy = 0.16 + Math.random() * 0.22;
		this.life = 1;
		this.decay = 0.9972 + Math.random() * 0.0018;
		this.alphaBase =
			(0.045 + Math.random() * 0.055) *
			this.alphaMul *
			(0.75 + Math.random() * 0.5);
	}

	update(t, globalFade, w, h) {
		const turb = turbField(this.x, this.y, t);
		this.vx += turb * 0.055 + (Math.random() - 0.5) * 0.045;
		this.vy += (Math.random() - 0.5) * 0.035 - 0.028 * this.buoyancy;
		this.vx *= 0.988;
		this.vy *= 0.992;
		this.x += this.vx;
		this.y += this.vy;
		this.rx += this.puffRx * (0.55 + Math.abs(turb) * 0.15);
		this.ry += this.puffRy * (0.48 + Math.abs(turb) * 0.12);
		this.rot += this.vrot + turb * 0.0004;
		this.life *= this.decay;
		this.alpha =
			this.alphaBase *
			this.life *
			globalFade *
			(0.88 + 0.12 * Math.sin(t * 0.001 + this.x));

		const outY = this.y < -Math.max(this.rx, this.ry) * 2.2;
		const outX = this.x < -this.rx * 2.5 || this.x > w + this.rx * 2.5;
		const dead = this.life < 0.035;
		if (outY || outX || dead) {
			this._respawn(w, h, false);
		}
	}

	draw(ctx, dark) {
		const c0 = dark ? [236, 238, 245] : [255, 255, 255];
		const c1 = dark ? [165, 175, 192] : [248, 250, 252];
		const c2 = dark ? [95, 105, 125] : [220, 226, 234];
		const a = this.alpha;
		const maxR = Math.max(this.rx, this.ry) * 1.15;
		const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, maxR);
		g.addColorStop(
			0,
			`rgba(${c0[0]},${c0[1]},${c0[2]},${Math.min(0.95, a * 1.05)})`,
		);
		g.addColorStop(0.28, `rgba(${c1[0]},${c1[1]},${c1[2]},${a * 0.52})`);
		g.addColorStop(0.55, `rgba(${c2[0]},${c2[1]},${c2[2]},${a * 0.22})`);
		g.addColorStop(0.82, `rgba(${c2[0]},${c2[1]},${c2[2]},${a * 0.06})`);
		g.addColorStop(1, "rgba(0,0,0,0)");

		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rot);
		ctx.translate(-this.x, -this.y);
		ctx.globalCompositeOperation = dark ? "screen" : "source-over";
		ctx.fillStyle = g;
		ctx.beginPath();
		ctx.ellipse(this.x, this.y, this.rx, this.ry, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}
}

function SmokeCanvas({ phase }) {
	const canvasRef = useRef(null);
	const rafRef = useRef(0);
	const startRef = useRef(0);
	const plumesRef = useRef([]);
	const phaseRef = useRef(phase);
	phaseRef.current = phase;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;
		const ctx = canvas.getContext("2d", { alpha: true });

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = window.innerWidth;
			const h = window.innerHeight;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const count = Math.min(95, Math.floor(42 + (w * h) / 22000));
			const sideCount = Math.floor(count * 0.22);
			const floorCount = count - sideCount * 2;
			plumesRef.current = [];
			for (let i = 0; i < floorCount; i++) {
				plumesRef.current.push(
					new SmokePlume(w, h, {
						zone: "floor",
						sizeMin: 32,
						sizeMax: 118,
						buoyancy: 0.92 + Math.random() * 0.2,
						alphaMul: 1,
					}),
				);
			}
			for (let i = 0; i < sideCount; i++) {
				plumesRef.current.push(
					new SmokePlume(w, h, {
						zone: "left",
						sizeMin: 40,
						sizeMax: 135,
						buoyancy: 1.05 + Math.random() * 0.25,
						alphaMul: 1.12,
					}),
				);
				plumesRef.current.push(
					new SmokePlume(w, h, {
						zone: "right",
						sizeMin: 40,
						sizeMax: 135,
						buoyancy: 1.05 + Math.random() * 0.25,
						alphaMul: 1.12,
					}),
				);
			}
			for (let i = 0; i < 36; i++) {
				plumesRef.current.push(
					new SmokePlume(w, h, {
						zone: Math.random() > 0.5 ? "left" : "right",
						sizeMin: 8,
						sizeMax: 38,
						buoyancy: 1.35 + Math.random() * 0.5,
						alphaMul: 0.42,
					}),
				);
			}
		};

		resize();
		window.addEventListener("resize", resize);

		startRef.current = performance.now();

		const tick = (now) => {
			if (!canvasRef.current) return;
			const w = window.innerWidth;
			const h = window.innerHeight;
			const t = now - startRef.current;
			const dark = isDocumentDark();

			let globalFade = 1;
			if (t < 280) {
				globalFade = t / 280;
			} else if (t > SMOKE_DURATION_MS - 1400) {
				const e = (t - (SMOKE_DURATION_MS - 1400)) / 1400;
				const exitBoost = phaseRef.current === "exit" ? 0.15 : 0;
				globalFade = Math.max(0, 1 - e * e * (1.15 - exitBoost));
			}

			ctx.clearRect(0, 0, w, h);

			const plumes = plumesRef.current;
			for (let i = 0; i < plumes.length; i++) {
				plumes[i].update(t, globalFade, w, h);
			}
			plumes.sort((a, b) => a.rx * a.ry - b.rx * b.ry);
			for (let i = 0; i < plumes.length; i++) {
				plumes[i].draw(ctx, dark);
			}

			if (t < SMOKE_DURATION_MS + 400) {
				rafRef.current = requestAnimationFrame(tick);
			}
		};

		rafRef.current = requestAnimationFrame(tick);

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 h-full w-full"
			aria-hidden
		/>
	);
}

/**
 * Arena-style entrance: volumetric-style smoke via canvas plumes + spotlights.
 */
const EntranceSmoke = ({ onComplete }) => {
	const [phase, setPhase] = useState("enter");

	useEffect(() => {
		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) {
			onComplete?.();
			return;
		}

		const t = setTimeout(() => {
			setPhase("exit");
		}, SMOKE_DURATION_MS - 1000);
		const done = setTimeout(() => {
			onComplete?.();
		}, SMOKE_DURATION_MS);
		return () => {
			clearTimeout(t);
			clearTimeout(done);
		};
	}, [onComplete]);

	return (
		<motion.div
			className="pointer-events-none fixed inset-0 z-[250] overflow-hidden"
			initial={{ opacity: 0 }}
			animate={{ opacity: phase === "exit" ? 0 : 1 }}
			transition={{
				duration: phase === "exit" ? 1 : 0.35,
				ease: "easeInOut",
			}}
		>
			{/* Depth: slight floor shadow so smoke reads volumetric on bright pages */}
			<div
				className="absolute inset-0 bg-gradient-to-t from-slate-800/[0.18] via-transparent to-slate-900/20 dark:from-black/55 dark:via-black/15 dark:to-black/35"
				aria-hidden
			/>

			<SmokeCanvas phase={phase} />

			{/* Heat haze at floor — very soft, complements canvas */}
			<div
				className="absolute inset-x-0 bottom-0 h-[38%] opacity-[0.35] dark:opacity-[0.5]"
				style={{
					background:
						"linear-gradient(to top, rgba(120,130,145,0.12) 0%, transparent 75%)",
					filter: "blur(32px)",
				}}
				aria-hidden
			/>

			{/* Arena spots through haze */}
			<motion.div
				className="absolute -top-28 left-[4%] h-[55vh] w-[38vw] origin-top rotate-[16deg] bg-gradient-to-b from-cyan-300/30 via-cyan-400/12 to-transparent blur-3xl dark:from-cyan-400/25 dark:via-cyan-500/8"
				animate={{
					opacity: [0, 0.5, 0.22, 0],
					scaleY: [0.82, 1.12, 1.05],
				}}
				transition={{ duration: 3.5, times: [0, 0.22, 0.58, 1] }}
				aria-hidden
			/>
			<motion.div
				className="absolute -top-28 right-[4%] h-[55vh] w-[38vw] origin-top -rotate-[16deg] bg-gradient-to-b from-violet-300/28 via-fuchsia-400/12 to-transparent blur-3xl dark:from-violet-400/22 dark:via-fuchsia-500/8"
				animate={{
					opacity: [0, 0.5, 0.22, 0],
					scaleY: [0.82, 1.12, 1.05],
				}}
				transition={{ duration: 3.5, times: [0, 0.22, 0.58, 1], delay: 0.06 }}
				aria-hidden
			/>
		</motion.div>
	);
};

export default EntranceSmoke;
