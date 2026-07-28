import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let configured = false;

/** One-time GSAP/ScrollTrigger tuning — fewer redundant scroll callbacks. */
export function ensureGsapScrollSetup() {
	if (configured || typeof window === "undefined") return;
	configured = true;
	gsap.registerPlugin(ScrollTrigger);
	ScrollTrigger.config({
		limitCallbacks: true,
		ignoreMobileResize: true,
	});
}

/** Lenis + ScrollTrigger shared config (scrollerProxy targets documentElement). */
export function getScroller() {
	if (typeof document === "undefined") return undefined;
	return document.documentElement;
}

export function scrollTriggerBase(extra = {}) {
	ensureGsapScrollSetup();
	const scroller = getScroller();
	return scroller ? { scroller, ...extra } : extra;
}

let refreshTimer = null;

/** Debounce expensive layout passes when many sections mount. */
export function scheduleScrollTriggerRefresh(delay = 200) {
	if (typeof window === "undefined") return;
	window.clearTimeout(refreshTimer);
	refreshTimer = window.setTimeout(() => {
		ScrollTrigger.refresh();
	}, delay);
}

export function scrollToProgress(progress, { duration = 1.1, lenis, pinId = "about-theatre-pin" } = {}) {
	if (typeof window === "undefined") return;
	const st = ScrollTrigger.getById(pinId);
	if (!st) return;

	const clamped = Math.max(0, Math.min(1, progress));
	const y = st.start + clamped * (st.end - st.start);

	if (lenis?.scrollTo) {
		lenis.scrollTo(y, { duration });
		return;
	}

	window.scrollTo({ top: y, behavior: duration > 0 ? "smooth" : "auto" });
}
