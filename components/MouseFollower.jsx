import React, { useEffect, useRef, useState } from "react";
import { FaCode } from "react-icons/fa";
import { prefersEffects } from "../lib/animationControl";

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

		const animate = () => {
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
			animationFrameRef.current = requestAnimationFrame(animate);
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
			} else {
				setIsVisible(true);
				if (mouseRef.current.x) {
					cursorRef.current = { ...mouseRef.current };
					applyTransform();
				}
			}
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("mouseenter", handleMouseEnter);
		window.addEventListener("mouseleave", handleMouseLeave);
		document.addEventListener("visibilitychange", handleVisibilityChange);

		animate();

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
			className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ease-out hidden md:block ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			style={{ willChange: "transform" }}
		>
			<div
				className={`relative transition-all duration-300 ${
					isHovering ? "scale-150" : "scale-100"
				}`}
			>
				<div
					className={`w-8 h-8 rounded-full bg-[#5651e5] shadow-lg transition-all duration-300 ${
						isHovering ? "bg-opacity-80" : "bg-opacity-100"
					}`}
				>
					<div
						className={`absolute inset-0 m-1 rounded-full bg-white transition-all duration-300 ${
							isHovering ? "scale-75" : "scale-100"
						}`}
					>
						<div
							className={`absolute inset-0 flex items-center justify-center text-[#5651e5] transition-all duration-300 ${
								isHovering ? "scale-125" : "scale-100"
							}`}
						>
							<FaCode className="w-4 h-4" />
						</div>
					</div>
				</div>

				<div
					className={`absolute inset-0 rounded-full bg-[#5651e5] blur-sm transition-all duration-300 ${
						isHovering ? "scale-150 opacity-30" : "scale-100 opacity-20"
					}`}
				/>
			</div>
		</div>
	);
};

export default MouseFollower;
