import React, { useEffect, useRef, useState } from "react";
import {
	bindVisibilityPause,
	isCoarsePointer,
	isLowPowerDevice,
	prefersEffects,
} from "../lib/animationControl";

const AnimatedBackground = () => {
	const canvasRef = useRef(null);
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		setEnabled(!prefersEffects() && !isCoarsePointer());
	}, []);

	useEffect(() => {
		if (!enabled) return undefined;

		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const ctx = canvas.getContext("2d");
		if (!ctx) return undefined;

		let animationFrameId = 0;
		let running = true;
		let paused = false;
		let lines = [];
		const mouse = { x: null, y: null, radius: 100 };
		const lowPower = isLowPowerDevice();

		const palette = {
			line: [
				"rgba(34, 211, 238, ",
				"rgba(139, 92, 246, ",
				"rgba(232, 121, 249, ",
			],
			hot: "rgba(34, 211, 238, 0.55)",
			link: (a) => `rgba(34, 211, 238, ${a})`,
		};

		const setCanvasSize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);
			canvas.width = Math.floor(window.innerWidth * dpr);
			canvas.height = Math.floor(window.innerHeight * dpr);
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		setCanvasSize();
		window.addEventListener("resize", setCanvasSize);

		const trackMouse = (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
		const clearMouse = () => {
			mouse.x = null;
			mouse.y = null;
		};
		window.addEventListener("mousemove", trackMouse, { passive: true });
		window.addEventListener("mouseleave", clearMouse);

		class Line {
			constructor() {
				this.x = Math.random() * window.innerWidth;
				this.y = Math.random() * window.innerHeight;
				this.length = Math.random() * 70 + 30;
				this.angle = Math.random() * Math.PI * 2;
				this.speed = Math.random() * 0.015 + 0.006;
				const channel =
					palette.line[Math.floor(Math.random() * palette.line.length)];
				const alpha = Math.random() * 0.18 + 0.06;
				this.color = `${channel}${alpha})`;
				this.originalColor = this.color;
			}

			update() {
				this.angle += this.speed;
				this.x += Math.cos(this.angle) * 0.35;
				this.y += Math.sin(this.angle) * 0.35;

				const w = window.innerWidth;
				const h = window.innerHeight;
				if (this.x < 0) this.x = w;
				if (this.x > w) this.x = 0;
				if (this.y < 0) this.y = h;
				if (this.y > h) this.y = 0;

				if (mouse.x != null && mouse.y != null) {
					const dx = mouse.x - this.x;
					const dy = mouse.y - this.y;
					const distance = Math.hypot(dx, dy);

					if (distance < mouse.radius) {
						const angle = Math.atan2(dy, dx);
						this.x -= Math.cos(angle) * 1.6;
						this.y -= Math.sin(angle) * 1.6;
						this.color = palette.hot;
					} else {
						this.color = this.originalColor;
					}
				}
			}

			draw() {
				ctx.beginPath();
				ctx.strokeStyle = this.color;
				ctx.lineWidth = 1;

				const endX = this.x + Math.cos(this.angle) * this.length;
				const endY = this.y + Math.sin(this.angle) * this.length;

				ctx.moveTo(this.x, this.y);
				ctx.lineTo(endX, endY);
				ctx.stroke();
			}
		}

		const createLines = () => {
			lines = [];
			const area = window.innerWidth * window.innerHeight;
			const count = Math.min(
				lowPower ? 22 : 32,
				Math.max(16, Math.floor(area / 28000)),
			);
			for (let i = 0; i < count; i++) {
				lines.push(new Line());
			}
		};
		createLines();

		const schedule = () => {
			if (!running || paused) return;
			animationFrameId = requestAnimationFrame(animate);
		};

		let linkFrame = 0;
		const animate = () => {
			if (!running || paused) return;

			ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

			const drawLinks = !lowPower && linkFrame % 2 === 0;
			if (drawLinks) {
				for (let i = 0; i < lines.length; i++) {
					const line1 = lines[i];
					for (let j = i + 1; j < lines.length; j++) {
						const line2 = lines[j];
						const dx = line1.x - line2.x;
						const dy = line1.y - line2.y;
						const distance = Math.hypot(dx, dy);

						if (distance < 120) {
							ctx.beginPath();
							const opacity = 0.14 * (1 - distance / 120);
							ctx.strokeStyle = palette.link(opacity);
							ctx.lineWidth = 0.5;
							ctx.moveTo(line1.x, line1.y);
							ctx.lineTo(line2.x, line2.y);
							ctx.stroke();
						}
					}
				}
			}
			linkFrame += 1;

			for (const line of lines) {
				line.update();
				line.draw();
			}

			schedule();
		};

		const unbindVisibility = bindVisibilityPause(canvas, {
			onPause: () => {
				paused = true;
				cancelAnimationFrame(animationFrameId);
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
			window.removeEventListener("resize", setCanvasSize);
			window.removeEventListener("mousemove", trackMouse);
			window.removeEventListener("mouseleave", clearMouse);
			cancelAnimationFrame(animationFrameId);
		};
	}, [enabled]);

	if (!enabled) return null;

	return (
		<canvas
			ref={canvasRef}
			className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
			style={{ background: "transparent" }}
			aria-hidden
		/>
	);
};

export default AnimatedBackground;
