import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Lenis + ScrollTrigger shared config (scrollerProxy targets documentElement). */
export function getScroller() {
	if (typeof document === "undefined") return undefined;
	return document.documentElement;
}

export function scrollTriggerBase(extra = {}) {
	const scroller = getScroller();
	return scroller ? { scroller, ...extra } : extra;
}

export function scrollToProgress(progress, { duration = 1.1, lenis } = {}) {
	if (typeof window === "undefined") return;
	const st = ScrollTrigger.getById("about-theatre-pin");
	if (!st) return;

	const clamped = Math.max(0, Math.min(1, progress));
	const y = st.start + clamped * (st.end - st.start);

	if (lenis?.scrollTo) {
		lenis.scrollTo(y, { duration });
		return;
	}

	window.scrollTo({ top: y, behavior: duration > 0 ? "smooth" : "auto" });
}
