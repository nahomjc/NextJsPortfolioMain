import React, { useEffect, useRef, useState } from "react";
import { prefersEffects } from "../lib/animationControl";

/** Sci-fi HUD reticle — replaces the old </> code glyph */
function SciFiReticle({ active }) {
	return (
		<svg
			viewBox="0 0 40 40"
			className="h-full w-full"
			aria-hidden
			fill="none"
		>
			{/* Outer ring */}
			<circle
				cx="20"
				cy="20"
				r="15.5"
				stroke="currentColor"
				strokeWidth="1"
				opacity={active ? 0.9 : 0.55}
				strokeDasharray={active ? "4 3" : "none"}
			/>
			{/* Inner ring */}
			<circle
				cx="20"
				cy="20"
				r="7.5"
				stroke="currentColor"
				strokeWidth="1.25"
				opacity={0.85}
			/>
			{/* Corner brackets */}
			<path
				d="M8 14 V8 H14"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M26 8 H32 V14"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M32 26 V32 H26"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			<path
				d="M14 32 H8 V26"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="square"
			/>
			{/* Crosshair ticks */}
			<line x1="20" y1="2" x2="20" y2="7" stroke="currentColor" strokeWidth="1.25" />
			<line x1="20" y1="33" x2="20" y2="38" stroke="currentColor" strokeWidth="1.25" />
			<line x1="2" y1="20" x2="7" y2="20" stroke="currentColor" strokeWidth="1.25" />
			<line x1="33" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="1.25" />
			{/* Center core */}
			<circle cx="20" cy="20" r="1.75" fill="currentColor" />
			{active ? (
				<circle
					cx="20"
					cy="20"
					r="4"
					stroke="currentColor"
					strokeWidth="1"
					opacity="0.5"
				/>
			) : null}
		</svg>
	);
}

const MouseFollower = () => {
	const outerRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const [isMobile, setIsMobile] = useState(true);
	const cursorRef = useRef({ x: 0, y: 0 });
	const mouseRef = useRef({ x: 0, y: 0 });
	const animationFrameRef = useRef(null);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(
				window.matchMedia("(hover: none)").matches || prefersEffects(),
			);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (isMobile) return;

		const applyTransform = () => {
			if (!outerRef.current) return;
			outerRef.current.style.transform = `translate(${cursorRef.current.x}px, ${cursorRef.current.y}px) translate(-50%, -50%)`;
		};

		const lerp = (start, end, factor) => start + (end - start) * factor;

		const schedule = () => {
			if (!animationFrameRef.current) {
				animationFrameRef.current = requestAnimationFrame(animate);
			}
		};

		const animate = () => {
			if (document.hidden) {
				animationFrameRef.current = null;
				return;
			}

			const smoothing = 0.35;

			cursorRef.current.x = lerp(
				cursorRef.current.x,
				mouseRef.current.x,
				smoothing,
			);
			cursorRef.current.y = lerp(
				cursorRef.current.y,
				mouseRef.current.y,
				smoothing,
			);

			applyTransform();

			const dx = Math.abs(cursorRef.current.x - mouseRef.current.x);
			const dy = Math.abs(cursorRef.current.y - mouseRef.current.y);
			if (dx > 0.15 || dy > 0.15) {
				animationFrameRef.current = requestAnimationFrame(animate);
			} else {
				animationFrameRef.current = null;
			}
		};

		const handleMouseMove = (e) => {
			mouseRef.current = {
				x: e.clientX,
				y: e.clientY,
			};

			if (cursorRef.current.x === 0) {
				cursorRef.current = {
					x: e.clientX,
					y: e.clientY,
				};
				applyTransform();
			}

			schedule();
		};

		const handleMouseEnter = () => {
			setIsHovering(true);
			setIsVisible(true);
		};

		const handleMouseLeave = () => {
			setIsHovering(false);
			setIsVisible(false);
		};

		const handleVisibilityChange = () => {
			if (document.hidden) {
				setIsVisible(false);
				if (animationFrameRef.current) {
					cancelAnimationFrame(animationFrameRef.current);
					animationFrameRef.current = null;
				}
			} else {
				setIsVisible(true);
				if (mouseRef.current.x) {
					cursorRef.current = { ...mouseRef.current };
					applyTransform();
				}
				schedule();
			}
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("mouseenter", handleMouseEnter);
		window.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseenter", handleMouseEnter);
			window.removeEventListener("mouseleave", handleMouseLeave);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isMobile]);

	if (isMobile) return null;

	return (
		<div
			ref={outerRef}
			className={`pointer-events-none fixed z-[9999] hidden transition-opacity duration-300 ease-out md:block ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			style={{ willChange: "transform" }}
			aria-hidden
		>
			<div
				className={`relative h-10 w-10 text-cyan-500 transition-transform duration-300 dark:text-cyan-300 ${
					isHovering ? "scale-125" : "scale-100"
				}`}
			>
				{/* Soft glow */}
				<div
					className={`absolute inset-0 rounded-full bg-cyan-400/25 blur-md transition-opacity duration-300 dark:bg-cyan-400/35 ${
						isHovering ? "opacity-90" : "opacity-50"
					}`}
				/>
				{/* Reticle */}
				<div className="relative h-full w-full drop-shadow-[0_0_6px_rgba(34,211,238,0.65)]">
					<SciFiReticle active={isHovering} />
				</div>
			</div>
		</div>
	);
};

export default MouseFollower;
