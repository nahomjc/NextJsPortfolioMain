import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/** Halfwidth katakana + hex + symbols — reads “Matrix” without extra font files */
const GLYPHS =
	"ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFﾞﾟ｢｣､･";

function pickGlyph() {
	return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/** Tight column spacing = dense vertical Matrix rain */
function buildColumns(cssW, cssH, fontSize, colStep) {
	const n = Math.max(1, Math.ceil(cssW / colStep));
	const cols = [];
	for (let i = 0; i < n; i++) {
		const len = 22 + Math.floor(Math.random() * 48);
		cols.push({
			y: Math.random() * cssH * 1.2 - cssH * 0.15,
			speed: 0.45 + Math.random() * 1.35,
			len,
			headTick: 0,
			chars: Array.from({ length: len }, pickGlyph),
			limeBias: Math.random() < 0.1,
			colStep,
		});
	}
	return cols;
}

const MatrixRain = () => {
	const canvasRef = useRef(null);
	const rafRef = useRef(0);
	const colsRef = useRef([]);
	const reducedRef = useRef(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
		if (!ctx) return undefined;

		reducedRef.current =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const cssSize = () => {
			const vv = window.visualViewport;
			const w = Math.max(1, Math.round(vv?.width ?? window.innerWidth));
			const h = Math.max(1, Math.round(vv?.height ?? window.innerHeight));
			return { w, h };
		};

		let fontSize = 15;
		let lastW = 0;
		let lastH = 0;

		const applySize = () => {
			const { w, h } = cssSize();
			lastW = w;
			lastH = h;
			fontSize = w < 480 ? 13 : w < 900 ? 14 : 15;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.textBaseline = "top";
			ctx.font = `600 ${fontSize}px ui-monospace, "Cascadia Code", "Segoe UI Mono", "Consolas", monospace`;
			const colStep = fontSize * 0.56;
			colsRef.current = buildColumns(w, h, fontSize, colStep);
		};

		applySize();

		let last = performance.now();

		const tick = (now) => {
			const w = lastW;
			const h = lastH;
			const dt = Math.min((now - last) / 16.67, 2.4);
			last = now;

			if (reducedRef.current) {
				ctx.fillStyle = "#030712";
				ctx.fillRect(0, 0, w, h);
				ctx.fillStyle = "rgba(0, 255, 80, 0.035)";
				const step = fontSize * 2;
				for (let x = 0; x < w; x += step) {
					for (let y = 0; y < h; y += step) {
						if ((x + y) % (step * 2) === 0) ctx.fillRect(x, y, 1, 1);
					}
				}
				return;
			}

			ctx.fillStyle = "rgba(0, 8, 2, 0.2)";
			ctx.fillRect(0, 0, w, h);

			const cols = colsRef.current;

			for (let i = 0; i < cols.length; i++) {
				const col = cols[i];
				const colStep = col.colStep ?? fontSize * 0.56;
				col.y += col.speed * dt * fontSize * 0.42;

				const resetAbove = col.y - col.len * fontSize > h + fontSize * 6;
				if (resetAbove) {
					col.y = -Math.random() * h * 0.5 - col.len * fontSize;
					col.speed = 0.45 + Math.random() * 1.35;
					col.len = 22 + Math.floor(Math.random() * 48);
					col.chars = Array.from({ length: col.len }, pickGlyph);
				}

				col.headTick += dt;
				if (col.headTick >= 1) {
					col.headTick = 0;
					col.chars[0] = pickGlyph();
				}
				if (Math.random() < 0.045) {
					const idx = 1 + Math.floor(Math.random() * Math.min(col.len - 1, 16));
					col.chars[idx] = pickGlyph();
				}

				const x = i * colStep;

				for (let r = col.len - 1; r >= 0; r--) {
					const y = col.y - r * fontSize;
					if (y < -fontSize || y > h + fontSize) continue;

					const ch = col.chars[r] ?? pickGlyph();
					const isHead = r === 0;
					const depth = r / Math.max(col.len - 1, 1);

					ctx.shadowBlur = 0;

					if (isHead) {
						ctx.shadowColor = "rgba(120, 255, 140, 0.95)";
						ctx.shadowBlur = 16;
						ctx.fillStyle = "#f0fff4";
						ctx.fillText(ch, x, y);
						ctx.shadowBlur = 9;
						ctx.fillStyle = "rgba(185, 255, 170, 0.45)";
						ctx.fillText(ch, x, y);
					} else {
						const limeFlash =
							col.limeBias && r > 0 && r < 10 && (r + i * 3) % 4 === 0;
						if (limeFlash) {
							ctx.fillStyle = `rgba(200, 255, 140, ${0.2 + (1 - depth) * 0.55})`;
						} else {
							const a = 0.1 + (1 - depth) * 0.78;
							ctx.fillStyle = `rgba(0, 220, 95, ${a * (0.5 + depth * 0.5)})`;
						}
						ctx.fillText(ch, x, y);
					}
				}
			}

			ctx.shadowBlur = 0;
			rafRef.current = requestAnimationFrame(tick);
		};

		const onResize = () => {
			applySize();
			if (reducedRef.current) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = requestAnimationFrame(tick);
			}
		};
		window.addEventListener("resize", onResize);
		window.visualViewport?.addEventListener("resize", onResize);

		rafRef.current = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(rafRef.current);
			window.removeEventListener("resize", onResize);
			window.visualViewport?.removeEventListener("resize", onResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="matrix-rain-canvas pointer-events-none fixed inset-0 z-0 h-full w-full min-h-[100dvh]"
			aria-hidden
		/>
	);
};

const WELCOME_LINE = "Welcome to the Matrix";

const FingerPrintLoader = ({ onLoadingComplete }) => {
	const rootRef = useRef(null);
	const welcomeRef = useRef(null);
	const scannerRef = useRef(null);
	const scanLineRef = useRef(null);
	const statusRef = useRef(null);
	const progressRef = useRef(null);

	useEffect(() => {
		document.documentElement.classList.add("intro-loading");

		const reduced =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				onComplete: () => {
					onLoadingComplete?.();
				},
			});

			if (reduced) {
				tl.set(welcomeRef.current, { opacity: 1 })
					.set(statusRef.current, { opacity: 1, textContent: "Welcome to the Matrix" })
					.to(rootRef.current, { opacity: 0, duration: 0.6, delay: 1.2 });
				return;
			}

			const chars = welcomeRef.current?.querySelectorAll(".matrix-welcome-char");
			const scanDuration = 2.6;

			tl.set(welcomeRef.current, { opacity: 1 })
				.set(scannerRef.current, { opacity: 0, scale: 0.88, visibility: "hidden" })
				.set(statusRef.current, { opacity: 0 })
				.set(progressRef.current, { width: "0%" })
				.from(chars, {
					opacity: 0,
					y: 28,
					rotateX: -72,
					filter: "blur(6px)",
					stagger: 0.035,
					duration: 0.55,
					ease: "power3.out",
					transformOrigin: "50% 100%",
				})
				.to(chars, {
					textShadow: "0 0 16px rgba(57,255,20,0.9), 0 0 32px rgba(0,220,90,0.5)",
					duration: 0.35,
					stagger: 0.02,
					ease: "power2.out",
				})
				.to(
					chars,
					{
						opacity: 0.35,
						duration: 0.04,
						stagger: { each: 0.018, from: "random", repeat: 3, yoyo: true },
					},
					"+=0.35",
				)
				.to(
					welcomeRef.current,
					{
						opacity: 0,
						y: -32,
						scale: 0.96,
						duration: 0.55,
						ease: "power2.in",
					},
					"+=0.55",
				)
				.set(scannerRef.current, { visibility: "visible" })
				.to(
					scannerRef.current,
					{ opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
					"-=0.15",
				)
				.to(statusRef.current, { opacity: 1, duration: 0.35 }, "-=0.45")
				.fromTo(
					scanLineRef.current,
					{ attr: { y1: 0, y2: 0 } },
					{
						attr: { y1: 100, y2: 100 },
						duration: scanDuration,
						ease: "none",
					},
					"-=0.2",
				)
				.to(
					progressRef.current,
					{ width: "100%", duration: scanDuration, ease: "none" },
					"<",
				)
				.to(
					statusRef.current,
					{
						duration: 0.01,
						onStart: () => {
							if (statusRef.current) {
								statusRef.current.textContent = "IDENTITY CONFIRMED";
							}
						},
					},
					`-=${scanDuration * 0.12}`,
				)
				.to(scannerRef.current, { scale: 1.12, duration: 0.55, ease: "power2.inOut" })
				.to(rootRef.current, { opacity: 0, duration: 0.95, ease: "power2.inOut" }, "+=0.25");
		}, rootRef);

		return () => {
			ctx.revert();
			document.documentElement.classList.remove("intro-loading");
		};
	}, [onLoadingComplete]);

	return (
		<div
			ref={rootRef}
			className="intro-matrix-loader intro-loader-screen fixed inset-0 flex items-center justify-center bg-black z-50"
			role="status"
			aria-live="polite"
			aria-label="Loading portfolio"
		>
			<MatrixRain />

			<div className="matrix-phosphor pointer-events-none absolute inset-0 z-[1]" aria-hidden />
			<div className="matrix-crt-flicker pointer-events-none absolute inset-0 z-[1]" aria-hidden />
			<div className="matrix-scan-sweep pointer-events-none absolute inset-0 z-[1]" aria-hidden />
			<div
				className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,rgba(0,12,4,0.5)_68%,rgba(0,8,2,0.92)_100%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 z-[1] opacity-[0.11]"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(57,255,20,0.14) 1px, rgba(57,255,20,0.14) 2px)",
				}}
				aria-hidden
			/>
			<div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-transparent to-black/70" />

			<div
				ref={welcomeRef}
				className="pointer-events-none absolute z-20 max-w-[92vw] px-4 text-center opacity-0"
				aria-hidden
			>
				<p className="matrix-status-text font-mono text-xl uppercase tracking-[0.22em] text-[#b8ffc8] sm:text-2xl md:text-3xl">
					{WELCOME_LINE.split("").map((char, i) => (
						<span
							key={`welcome-${char.codePointAt(0)}-${i}`}
							className="matrix-welcome-char inline-block will-change-transform"
							style={{ transformPerspective: 600 }}
						>
							{char === " " ? "\u00A0" : char}
						</span>
					))}
				</p>
			</div>

			<div className="relative z-10 flex flex-col items-center">
				<div ref={scannerRef} className="fingerprint-scanner opacity-0">
					<svg
						width="200"
						height="200"
						viewBox="0 0 100 100"
						className="fingerprint"
						aria-hidden
					>
						{/* Core whorl pattern */}
						<path
							className="scan-path core"
							d="M50,50 C50,45 55,45 55,50 C55,55 50,55 50,50"
						/>

						{/* Inner loops */}
						<path
							className="scan-path"
							d="M45,50 C45,40 55,40 55,50 C55,60 45,60 45,50"
						/>
						<path
							className="scan-path"
							d="M40,50 C40,35 60,35 60,50 C60,65 40,65 40,50"
						/>

						{/* Middle loops */}
						<path
							className="scan-path"
							d="M35,50 C35,30 65,30 65,50 C65,70 35,70 35,50"
						/>
						<path
							className="scan-path"
							d="M30,50 C30,25 70,25 70,50 C70,75 30,75 30,50"
						/>

						{/* Outer loops */}
						<path
							className="scan-path"
							d="M25,50 C25,20 75,20 75,50 C75,80 25,80 25,50"
						/>

						{/* Ridge details - left side */}
						<path className="scan-path detail" d="M35,40 C38,42 40,45 40,50" />
						<path className="scan-path detail" d="M30,35 C35,38 38,42 38,50" />
						<path className="scan-path detail" d="M28,45 C32,48 35,52 35,55" />

						{/* Ridge details - right side */}
						<path className="scan-path detail" d="M65,40 C62,42 60,45 60,50" />
						<path className="scan-path detail" d="M70,35 C65,38 62,42 62,50" />
						<path className="scan-path detail" d="M72,45 C68,48 65,52 65,55" />

						{/* Digital circuit patterns */}
						<path className="circuit-path" d="M20,50 L25,50" />
						<path className="circuit-path" d="M75,50 L80,50" />
						<path className="circuit-path" d="M50,20 L50,25" />
						<path className="circuit-path" d="M50,75 L50,80" />

						<rect
							className="scan-area"
							x="0"
							y="0"
							width="100"
							height="100"
							opacity="0.14"
						/>

						<line
							ref={scanLineRef}
							x1="0"
							y1="0"
							x2="100"
							y2="0"
							className="scan-line"
						/>

						{[...Array(12)].map((_, i) => (
							<circle
								key={`scan-node-${i}`}
								className="data-point"
								cx={50 + 25 * Math.cos((i * Math.PI) / 6)}
								cy={50 + 25 * Math.sin((i * Math.PI) / 6)}
								r="1"
								opacity="0.85"
							/>
						))}
					</svg>
				</div>

				<div className="mt-8 w-full text-center">
					<p
						ref={statusRef}
						className="matrix-status-text mb-3 font-mono text-base uppercase tracking-[0.14em] text-[#7dff9a] opacity-0 sm:text-lg"
					>
						&lt;Kingdom Code/&gt;
					</p>
					<div className="mx-auto h-1 w-48 overflow-hidden rounded-sm bg-black/40">
						<div
							ref={progressRef}
							className="matrix-progress-bar h-full w-0"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FingerPrintLoader;
