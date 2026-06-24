import React, { useEffect, useState } from "react";
import { useLenis } from "./LenisProvider";

const ScrollProgress = () => {
	const lenis = useLenis();
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const updateFromWindow = () => {
			const scrollPx = document.documentElement.scrollTop;
			const winHeightPx =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			const pct = winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0;
			setScrollProgress(pct);
		};

		if (!lenis) {
			updateFromWindow();
			window.addEventListener("scroll", updateFromWindow, { passive: true });
			return () => window.removeEventListener("scroll", updateFromWindow);
		}

		const onScroll = (instance) => {
			setScrollProgress(instance.progress * 100);
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
				className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(34,211,238,0.45)] transition-[width] duration-150 ease-out"
				style={{ width: `${scrollProgress}%` }}
			/>
		</div>
	);
};

export default ScrollProgress;
