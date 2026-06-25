import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import LenisProvider from "../components/LenisProvider";
import { DockActionsProvider } from "../components/DockActionsContext";
import "../styles/globals.css";
import "lenis/dist/lenis.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ThemeProvider } from "../components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import FingerPrintLoader from "../components/FingerPrintLoaderProps";
import EntranceSmoke from "../components/EntranceSmoke";
import { useState, useCallback, useEffect } from "react";

const AnimatedBackground = dynamic(
	() => import("../components/AnimatedBackground"),
	{ ssr: false },
);
const MouseFollower = dynamic(() => import("../components/MouseFollower"), {
	ssr: false,
});

function MyApp({ Component, pageProps }) {
	const [isLoading, setIsLoading] = useState(true);
	const [showEntranceSmoke, setShowEntranceSmoke] = useState(false);
	const [showDecorations, setShowDecorations] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const coarse = window.matchMedia("(hover: none)").matches;
		setShowDecorations(!reduced && !coarse);
	}, []);

	const handleLoadingComplete = useCallback(() => {
		setIsLoading(false);
		const skipSmoke =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!skipSmoke) setShowEntranceSmoke(true);
	}, []);

	const handleEntranceSmokeComplete = useCallback(() => {
		setShowEntranceSmoke(false);
	}, []);

	return (
		<ThemeProvider>
			<>
				<AnimatePresence mode="wait">
					{isLoading ? (
						<FingerPrintLoader
							key="fingerprint-loader"
							onLoadingComplete={handleLoadingComplete}
						/>
					) : (
						<motion.div
							key="app-shell"
							className="relative min-h-screen pb-[4.75rem] sm:pb-[5.75rem]"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 1 }}
						>
							<LenisProvider>
								<DockActionsProvider>
									{showDecorations ? <AnimatedBackground /> : null}
									<ScrollProgress />
									<Navbar />
									{showDecorations ? <MouseFollower /> : null}
									<Component {...pageProps} />
								</DockActionsProvider>
							</LenisProvider>
						</motion.div>
					)}
				</AnimatePresence>
				{/* Outside AnimatePresence so smoke isn’t tied to swap timing / stacking quirks (esp. mobile Safari) */}
				{!isLoading && showEntranceSmoke ? (
					<EntranceSmoke onComplete={handleEntranceSmokeComplete} />
				) : null}
			</>
		</ThemeProvider>
	);
}

export default MyApp;
