import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useLenis } from "./LenisProvider";
import { scheduleScrollTriggerRefresh } from "../lib/gsapScroll";

const SCROLL_OFFSET = -32;

export default function HomeHashScroll() {
	const router = useRouter();
	const lenis = useLenis();
	const lenisRef = useRef(lenis);
	lenisRef.current = lenis;

	useEffect(() => {
		if (router.pathname !== "/") return undefined;

		let cancelled = false;
		let pollTimer = null;

		const scrollToHash = () => {
			if (cancelled) return false;

			const hash = window.location.hash;
			if (!hash || hash.length < 2) return false;

			const target = document.getElementById(hash.slice(1));
			if (!target) return false;

			const run = () => {
				if (cancelled) return;
				const el = document.getElementById(hash.slice(1));
				if (!el) return;
				const y =
					el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET;
				const instance = lenisRef.current;
				if (instance) {
					instance.scrollTo(y, { duration: 1.15 });
				} else {
					window.scrollTo({ top: y, behavior: "smooth" });
				}
				scheduleScrollTriggerRefresh(200);
			};

			run();
			if (!lenisRef.current) {
				window.addEventListener("lenis-ready", run, { once: true });
			}
			return true;
		};

		let attempts = 0;
		const poll = () => {
			if (cancelled) return;
			if (scrollToHash()) return;
			if (attempts++ < 60) {
				pollTimer = window.setTimeout(poll, 100);
			}
		};

		const start = () => {
			attempts = 0;
			if (pollTimer) window.clearTimeout(pollTimer);
			poll();
		};

		start();
		router.events.on("routeChangeComplete", start);

		return () => {
			cancelled = true;
			if (pollTimer) window.clearTimeout(pollTimer);
			router.events.off("routeChangeComplete", start);
		};
	}, [router, lenis]);

	return null;
}
