/** Shared helpers to trim animation work on low-power or inactive views. */

export function prefersEffects() {
	if (typeof window === "undefined") return true;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isCoarsePointer() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(hover: none)").matches;
}

export function isLowPowerDevice() {
	if (typeof window === "undefined") return false;
	const cores = navigator.hardwareConcurrency ?? 4;
	const mem = navigator.deviceMemory ?? 4;
	return cores <= 4 || mem <= 4;
}

export function getCanvasDpr(max = 2) {
	if (typeof window === "undefined") return 1;
	const dpr = window.devicePixelRatio || 1;
	if (isLowPowerDevice()) return Math.min(dpr, 1);
	return Math.min(dpr, max);
}

/** Throttle ambient canvas loops after idle — motion stays smooth at ~30fps. */
export function shouldCapIdleFps(
	lastActivityAt,
	{ active = false, idleMs = 1800 } = {},
) {
	if (active || typeof performance === "undefined") return false;
	return performance.now() - lastActivityAt > idleMs;
}

/** Full-screen particle canvas + custom cursor — skip on mobile, reduced motion, or weak hardware. */
export function shouldRunAmbientEffects() {
	if (typeof window === "undefined") return false;
	return !prefersEffects() && !isCoarsePointer() && !isLowPowerDevice();
}

export function shouldRunSmoothScroll() {
	if (typeof window === "undefined") return false;
	if (prefersEffects() || isCoarsePointer()) return false;
	return !isLowPowerDevice();
}

/** Pause a RAF loop when the tab is hidden or the element leaves the viewport. */
export function bindVisibilityPause(element, { onPause, onResume }) {
	if (typeof window === "undefined" || !element) {
		return () => {};
	}

	let paused = document.hidden;
	let inView = true;

	const sync = () => {
		const shouldPause = paused || !inView;
		if (shouldPause) onPause?.();
		else onResume?.();
	};

	const onVisibility = () => {
		paused = document.hidden;
		sync();
	};

	const observer = new IntersectionObserver(
		([entry]) => {
			inView = entry.isIntersecting;
			sync();
		},
		{ root: null, rootMargin: "120px 0px", threshold: 0 },
	);

	document.addEventListener("visibilitychange", onVisibility);
	observer.observe(element);

	if (document.hidden) onPause?.();

	return () => {
		document.removeEventListener("visibilitychange", onVisibility);
		observer.disconnect();
		onPause?.();
	};
}
