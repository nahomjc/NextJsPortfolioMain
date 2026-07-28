/** Warm hero WebGL chunks during the intro loader — same UI, faster robot reveal. */

let preloadPromise = null;

export function preloadHeroAssets() {
	if (typeof window === "undefined") return Promise.resolve();
	if (preloadPromise) return preloadPromise;

	preloadPromise = Promise.all([
		import("../components/HeroGltfRobot"),
		import("../components/HeroInteractiveLayer"),
		import("three"),
	]).catch(() => {});

	return preloadPromise;
}

export function isHeroAssetsPreloading() {
	return preloadPromise != null;
}
