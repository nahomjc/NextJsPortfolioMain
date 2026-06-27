import * as THREE from "three";

/** Lightweight probe — avoids spinning up THREE.WebGLRenderer when GPU is blocked. */
export function isWebGLAvailable() {
	if (typeof document === "undefined") return false;
	try {
		const canvas = document.createElement("canvas");
		const gl =
			canvas.getContext("webgl2") ||
			canvas.getContext("webgl") ||
			canvas.getContext("experimental-webgl");
		return !!gl;
	} catch {
		return false;
	}
}

/** Try several WebGL presets — returns null instead of throwing when unavailable. */
export function createWebGLRendererSafe(preferPerformance = false) {
	if (!isWebGLAvailable()) return null;

	const presets = preferPerformance
		? [
				{
					alpha: true,
					antialias: false,
					powerPreference: "high-performance",
					failIfMajorPerformanceCaveat: false,
				},
				{
					alpha: true,
					antialias: false,
					powerPreference: "default",
					failIfMajorPerformanceCaveat: false,
				},
			]
		: [
				{
					alpha: true,
					antialias: true,
					powerPreference: "high-performance",
					failIfMajorPerformanceCaveat: false,
				},
				{
					alpha: true,
					antialias: true,
					powerPreference: "default",
					failIfMajorPerformanceCaveat: false,
				},
				{
					alpha: true,
					antialias: false,
					powerPreference: "default",
					failIfMajorPerformanceCaveat: false,
				},
			];

	for (const options of presets) {
		try {
			const renderer = new THREE.WebGLRenderer(options);
			const gl = renderer.getContext();
			if (gl && !gl.isContextLost()) return renderer;
			renderer.dispose();
		} catch {
			/* try next preset */
		}
	}
	return null;
}
