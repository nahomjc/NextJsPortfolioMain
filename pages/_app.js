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
import { motion } from "framer-motion";
import EntranceSmoke from "../components/EntranceSmoke";
import { useState, useCallback, useEffect } from "react";
import { shouldRunAmbientEffects } from "../lib/animationControl";

const FingerPrintLoader = dynamic(
	() => import("../components/FingerPrintLoaderProps"),
	{ ssr: false },
);
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
		setShowDecorations(shouldRunAmbientEffects());
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
				{isLoading ? (
					<FingerPrintLoader
						key="fingerprint-loader"
						onLoadingComplete={handleLoadingComplete}
					/>
				) : null}
				<motion.div
					key="app-shell"
					className={`relative min-h-screen overflow-x-clip pb-[4.25rem] sm:pb-[5.75rem] ${
						isLoading ? "invisible h-0 overflow-hidden" : ""
					}`}
					aria-hidden={isLoading}
					initial={false}
					animate={isLoading ? undefined : { opacity: 1 }}
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
				{/* Outside loader gate so smoke isn’t tied to swap timing / stacking quirks (esp. mobile Safari) */}
				{!isLoading && showEntranceSmoke ? (
					<EntranceSmoke onComplete={handleEntranceSmokeComplete} />
				) : null}
			</>
		</ThemeProvider>
	);
}

export default MyApp;
