import React, { useEffect, useRef } from "react";
import { useLenis } from "./LenisProvider";

const ScrollProgress = () => {
	const lenis = useLenis();
	const barRef = useRef(null);

	useEffect(() => {
		const setWidth = (pct) => {
			if (barRef.current) {
				barRef.current.style.width = `${pct}%`;
			}
		};

		const updateFromWindow = () => {
			const scrollPx = document.documentElement.scrollTop;
			const winHeightPx =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			const pct = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
			setWidth(pct);
		};

		if (!lenis) {
			updateFromWindow();
			window.addEventListener("scroll", updateFromWindow, { passive: true });
			return () => window.removeEventListener("scroll", updateFromWindow);
		}

		const onScroll = (instance) => {
			setWidth(instance.progress * 100);
		};

		lenis.on("scroll", onScroll);
		onScroll(lenis);

		return () => {
			lenis.off("scroll", onScroll);
		};
	}, [lenis]);

	return (
		<div className="fixed top-0 left-0 z-[110] h-0.5 w-full bg-slate-200/80 dark:bg-white/5">
			<div
				ref={barRef}
				className="h-full w-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(34,211,238,0.45)]"
			/>
		</div>
	);
};

export default ScrollProgress;
