import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLowPowerDevice } from "../lib/animationControl";

const LenisContext = createContext(null);

export function useLenis() {
	return useContext(LenisContext);
}

/** Hash scroll offset — no top navbar; small top breathing room */
const SCROLL_OFFSET = -32;

export default function LenisProvider({ children }) {
	const tickerRef = useRef(null);
	const [lenis, setLenis] = useState(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const prefersReduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const coarsePointer = window.matchMedia("(hover: none)").matches;
		if (prefersReduced || coarsePointer || isLowPowerDevice()) return;

		gsap.registerPlugin(ScrollTrigger);

		const lenisInstance = new Lenis({
			lerp: 0.085,
			duration: 1.15,
			smoothWheel: true,
			wheelMultiplier: 0.95,
			touchMultiplier: 1.1,
		});

		setLenis(lenisInstance);

		lenisInstance.on("scroll", ScrollTrigger.update);

		const ticker = (time) => {
			lenisInstance.raf(time * 1000);
		};
		tickerRef.current = ticker;
		gsap.ticker.add(ticker);
		gsap.ticker.lagSmoothing(0);

		ScrollTrigger.scrollerProxy(document.documentElement, {
			scrollTop(value) {
				if (arguments.length) {
					lenisInstance.scrollTo(value, { immediate: true });
				}
				return lenisInstance.scroll;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			pinType: "transform",
		});

		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
			window.dispatchEvent(new Event("lenis-ready"));
		});

		const onRefresh = () => lenisInstance.resize();
		const onLoad = () => ScrollTrigger.refresh();

		ScrollTrigger.addEventListener("refresh", onRefresh);
		window.addEventListener("load", onLoad);

		const onAnchorClick = (e) => {
			const anchor = e.target.closest('a[href*="#"]');
			if (!anchor) return;

			const href = anchor.getAttribute("href");
			if (!href || href === "#") return;

			let url;
			try {
				url = new URL(href, window.location.href);
			} catch {
				return;
			}

			if (url.pathname !== window.location.pathname) return;

			const hash = url.hash;
			if (!hash) return;

			const target = document.querySelector(hash);
			if (!target) return;

			e.preventDefault();
			lenisInstance.scrollTo(target, {
				offset: SCROLL_OFFSET,
				duration: 1.15,
			});
		};

		document.addEventListener("click", onAnchorClick, { passive: false });

		return () => {
			document.removeEventListener("click", onAnchorClick);
			window.removeEventListener("load", onLoad);
			ScrollTrigger.removeEventListener("refresh", onRefresh);
			if (tickerRef.current) {
				gsap.ticker.remove(tickerRef.current);
			}
			lenisInstance.destroy();
			setLenis(null);
			ScrollTrigger.scrollerProxy(document.documentElement, {});
		};
	}, []);

	return (
		<LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
	);
}
