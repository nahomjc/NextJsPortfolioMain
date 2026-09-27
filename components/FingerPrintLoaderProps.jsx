import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
	bindVisibilityPause,
	getCanvasDpr,
	isLowPowerDevice,
} from "../lib/animationControl";
import { preloadHeroAssets } from "../lib/preloadHeroAssets";

/** Halfwidth katakana + hex + symbols — reads “Matrix” without extra font files */
const GLYPHS =
	"ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFﾞﾟ｢｣､･";

function pickGlyph() {
	return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/** Tight column spacing = dense vertical Matrix rain */
function buildColumns(cssW, cssH, fontSize, colStep) {
	const lowPower = isLowPowerDevice();
	const step = lowPower ? colStep * 1.12 : colStep;
	const n = Math.max(1, Math.ceil(cssW / step));
	const cols = [];
	for (let i = 0; i < n; i++) {
		const len = lowPower
			? 18 + Math.floor(Math.random() * 36)
			: 22 + Math.floor(Math.random() * 48);
		cols.push({
			y: Math.random() * cssH * 1.2 - cssH * 0.15,
			speed: 0.45 + Math.random() * 1.35,
			len,
			headTick: 0,
			chars: Array.from({ length: len }, pickGlyph),
			limeBias: Math.random() < 0.12,
			colStep: step,
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

		const lowPower = isLowPowerDevice();

		const applySize = () => {
			const { w, h } = cssSize();
			lastW = w;
			lastH = h;
			fontSize = w < 480 ? 13 : w < 900 ? 14 : 15;
			const dpr = getCanvasDpr(lowPower ? 1.25 : 2);
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
		let running = true;
		let paused = false;
		let lastFrameAt = 0;

		const schedule = () => {
			if (!running || paused) return;
			rafRef.current = requestAnimationFrame(tick);
		};

		const tick = (now) => {
			if (!running || paused) return;

			const frameGap = lowPower ? 33 : 0;
			if (frameGap > 0 && now - lastFrameAt < frameGap) {
				schedule();
				return;
			}
			lastFrameAt = now;

			const w = lastW;
			const h = lastH;
			const dt = Math.min((now - last) / 16.67, 2.4);
			last = now;

			if (reducedRef.current) {
				ctx.fillStyle = "#06030c";
				ctx.fillRect(0, 0, w, h);
				ctx.fillStyle = "rgba(34, 211, 238, 0.035)";
				const step = fontSize * 2;
				for (let x = 0; x < w; x += step) {
					for (let y = 0; y < h; y += step) {
						if ((x + y) % (step * 2) === 0) ctx.fillRect(x, y, 1, 1);
					}
				}
				return;
			}

			ctx.fillStyle = "rgba(6, 3, 12, 0.22)";
			ctx.fillRect(0, 0, w, h);

			const cols = colsRef.current;
			const headShadow = lowPower ? 10 : 16;
			const headShadowSoft = lowPower ? 6 : 9;

			for (let i = 0; i < cols.length; i++) {
				const col = cols[i];
				const colStep = col.colStep ?? fontSize * 0.56;
				col.y += col.speed * dt * fontSize * 0.42;

				const resetAbove = col.y - col.len * fontSize > h + fontSize * 6;
				if (resetAbove) {
					col.y = -Math.random() * h * 0.5 - col.len * fontSize;
					col.speed = 0.45 + Math.random() * 1.35;
					col.len = lowPower
						? 18 + Math.floor(Math.random() * 36)
						: 22 + Math.floor(Math.random() * 48);
					col.chars = Array.from({ length: col.len }, pickGlyph);
				}

				col.headTick += dt;
				if (col.headTick >= 1) {
					col.headTick = 0;
					col.chars[0] = pickGlyph();
				}
				if (Math.random() < (lowPower ? 0.03 : 0.045)) {
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
						ctx.shadowColor = "rgba(34, 211, 238, 0.95)";
						ctx.shadowBlur = headShadow;
						ctx.fillStyle = "#ecfeff";
						ctx.fillText(ch, x, y);
						ctx.shadowBlur = headShadowSoft;
						ctx.fillStyle = "rgba(167, 243, 252, 0.45)";
						ctx.fillText(ch, x, y);
					} else {
						const accentFlash =
							col.limeBias && r > 0 && r < 10 && (r + i * 3) % 4 === 0;
						if (accentFlash) {
							ctx.fillStyle = `rgba(167, 139, 250, ${0.2 + (1 - depth) * 0.55})`;
						} else {
							const a = 0.1 + (1 - depth) * 0.78;
							ctx.fillStyle = `rgba(34, 211, 238, ${a * (0.45 + depth * 0.55)})`;
						}
						ctx.fillText(ch, x, y);
					}
				}
			}

			ctx.shadowBlur = 0;
			schedule();
		};

		const onResize = () => {
			applySize();
			if (reducedRef.current) {
				cancelAnimationFrame(rafRef.current);
				schedule();
			}
		};
		window.addEventListener("resize", onResize);
		window.visualViewport?.addEventListener("resize", onResize);

		const unbindVisibility = bindVisibilityPause(canvas, {
			onPause: () => {
				paused = true;
				cancelAnimationFrame(rafRef.current);
			},
			onResume: () => {
				paused = false;
				last = performance.now();
				schedule();
			},
		});

		const onVisibility = () => {
			if (document.hidden) {
				paused = true;
				cancelAnimationFrame(rafRef.current);
				return;
			}
			paused = false;
			last = performance.now();
			schedule();
		};
		document.addEventListener("visibilitychange", onVisibility);

		schedule();

		return () => {
			running = false;
			unbindVisibility();
			document.removeEventListener("visibilitychange", onVisibility);
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

		const kickPreload = () => preloadHeroAssets();
		let preloadIdleId = 0;
		let preloadTimerId = 0;
		if (typeof window !== "undefined") {
			if ("requestIdleCallback" in window) {
				preloadIdleId = window.requestIdleCallback(kickPreload, {
					timeout: 500,
				});
			} else {
				preloadTimerId = window.setTimeout(kickPreload, 180);
			}
		}

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
					textShadow:
						"0 0 16px rgba(34,211,238,0.9), 0 0 32px rgba(139,92,246,0.5)",
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
			if (preloadIdleId && "cancelIdleCallback" in window) {
				window.cancelIdleCallback(preloadIdleId);
			}
			if (preloadTimerId) window.clearTimeout(preloadTimerId);
		};
	}, [onLoadingComplete]);

	return (
		<div
			ref={rootRef}
			className="intro-matrix-loader intro-loader-screen fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#06030c] via-[#07040f] to-[#06030c]"
			role="status"
			aria-live="polite"
			aria-label="Loading portfolio"
		>
			<MatrixRain />

			<div className="matrix-phosphor pointer-events-none absolute inset-0 z-[1]" aria-hidden />
			<div className="matrix-crt-flicker pointer-events-none absolute inset-0 z-[1]" aria-hidden />
			<div className="matrix-scan-sweep pointer-events-none absolute inset-0 z-[1]" aria-hidden />
			<div
				className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_0%,rgba(6,3,12,0.45)_68%,rgba(6,3,12,0.92)_100%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-0 z-[1] opacity-[0.11]"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(34,211,238,0.14) 1px, rgba(34,211,238,0.14) 2px)",
				}}
				aria-hidden
			/>
			<div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#06030c]/45 via-transparent to-[#06030c]/70" />
			<div
				className="pointer-events-none absolute left-[10%] top-[18%] z-[1] h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute right-[8%] bottom-[12%] z-[1] h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[110px]"
				aria-hidden
			/>

			<div
				ref={welcomeRef}
				className="pointer-events-none absolute z-20 max-w-[92vw] px-4 text-center opacity-0"
				aria-hidden
			>
				<p className="matrix-status-text font-mono text-xl uppercase tracking-[0.22em] text-cyan-200 sm:text-2xl md:text-3xl">
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

				<div className="mt-8 w-full max-w-sm px-2 text-center sm:max-w-md">
					<p
						ref={statusRef}
						className="matrix-status-text mb-4 font-mono text-base uppercase tracking-[0.14em] text-cyan-300/90 opacity-0 sm:text-lg"
					>
						&lt;Kingdom Code/&gt;
					</p>

					<div className="intro-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-label="Boot progress">
						<div className="intro-progress__meta">
							<span className="intro-progress__tag">SYS · BOOT</span>
							<span className="intro-progress__tag intro-progress__tag--dim">UPLINK</span>
						</div>

						<div className="intro-progress__rail">
							<span className="intro-progress__bracket intro-progress__bracket--l" aria-hidden />
							<span className="intro-progress__bracket intro-progress__bracket--r" aria-hidden />

							<div className="intro-progress__track">
								<div className="intro-progress__ticks" aria-hidden>
									{Array.from({ length: 21 }).map((_, i) => (
										<span
											key={`tick-${i}`}
											className={`intro-progress__tick ${i % 5 === 0 ? "is-major" : ""}`}
										/>
									))}
								</div>
								<div
									ref={progressRef}
									className="intro-progress__fill matrix-progress-bar w-0"
								>
									<span className="intro-progress__sheen" aria-hidden />
									<span className="intro-progress__head" aria-hidden />
								</div>
							</div>
						</div>

						<div className="intro-progress__footer">
							<span className="intro-progress__seg" aria-hidden>
								▌▌▌▌▌░░░░░
							</span>
							<span className="intro-progress__hint">authenticating…</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FingerPrintLoader;
