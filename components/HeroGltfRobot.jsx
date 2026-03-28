import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import HeroRobotIntroModal from "./HeroRobotIntroModal";
import { HUD_DEFAULT_VARIANT, pickHudVariantKey } from "./heroRobotHudVariants";

const MODEL_PATH = `/assets/${encodeURIComponent("object_0 (8).glb")}`;

function disposeObject3D(obj) {
	obj.traverse((child) => {
		if (child.isMesh) {
			child.geometry?.dispose();
			const mat = child.material;
			if (Array.isArray(mat)) {
				for (const m of mat) m.dispose();
			} else {
				mat?.dispose();
			}
		}
	});
}

const HeroGltfRobot = () => {
	const wrapRef = useRef(null);
	const pivotRef = useRef(null);
	const [loaded, setLoaded] = useState(false);
	const [introOpen, setIntroOpen] = useState(false);
	const [introAnchor, setIntroAnchor] = useState(null);
	const setIntroOpenRef = useRef(setIntroOpen);
	const setIntroAnchorRef = useRef(setIntroAnchor);
	setIntroOpenRef.current = setIntroOpen;
	setIntroAnchorRef.current = setIntroAnchor;
	const rafRef = useRef(0);

	useEffect(() => {
		const wrap = wrapRef.current;
		if (!wrap) return;

		const rayPickCtx = {
			camera: null,
			renderer: null,
			modelRoot: null,
		};

		const variantKeyFromClick = (clientX, clientY) => {
			const { camera, renderer, modelRoot } = rayPickCtx;
			const gridFromRect = (rect) => {
				const nx = (clientX - rect.left) / Math.max(rect.width, 1);
				const ny = (clientY - rect.top) / Math.max(rect.height, 1);
				return pickHudVariantKey(nx, 1 - ny);
			};
			if (!modelRoot || !renderer?.domElement || !camera) {
				const rect = wrap.getBoundingClientRect();
				return gridFromRect(rect);
			}
			const canvas = renderer.domElement;
			const rect = canvas.getBoundingClientRect();
			if (rect.width < 1 || rect.height < 1) {
				return HUD_DEFAULT_VARIANT;
			}
			const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
			const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1;
			const raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
			modelRoot.updateMatrixWorld(true);
			const hits = raycaster.intersectObject(modelRoot, true);
			if (hits.length > 0) {
				const box = new THREE.Box3().setFromObject(modelRoot);
				const p = hits[0].point;
				const sx = Math.max(box.max.x - box.min.x, 1e-6);
				const sy = Math.max(box.max.y - box.min.y, 1e-6);
				const tx = (p.x - box.min.x) / sx;
				const ty = (p.y - box.min.y) / sy;
				return pickHudVariantKey(tx, ty);
			}
			return gridFromRect(rect);
		};

		let cancelled = false;
		const rawNdc = { x: 0, y: 0 };
		let hoverInside = false;
		/** Mouse/pen has moved at least once — rotation tracks viewport cursor, not “only inside” the GLB box */
		let finePointerActive = false;
		let captureId = null;
		let activePointerType = null;
		/** While dragging on touch, freeze aim-at-cursor so finger motion only drives drag */
		let rawNdcFrozen = null;
		let lastTouchClientX = 0;
		let lastTouchClientY = 0;
		/** Mouse / pen: drag to orbit (full yaw, clamped pitch) */
		let lastMouseClientX = 0;
		let lastMouseClientY = 0;
		let dragYawAcc = 0;
		let dragPitchAcc = 0;
		/** Extra rotation / pan from one-finger drag (mobile) */
		let touchYawOff = 0;
		let touchPitchOff = 0;
		let touchPanXOff = 0;
		let touchPanYOff = 0;
		let clickStart = null;
		/** Slow turntable after pointer stays still (mouse/pen move or any touch activity resets) */
		let idleAutoYaw = 0;
		let lastPointerActivityAt = performance.now();
		let lastActivityX = -1e9;
		let lastActivityY = -1e9;
		const IDLE_SPIN_DELAY_MS = 1400;
		/** ~29s per full 360° at 60fps average */
		const IDLE_SPIN_RAD_PER_SEC = 0.215;

		const pingActivity = () => {
			lastPointerActivityAt = performance.now();
		};

		const pingActivityIfMouseMoved = (e) => {
			if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
			if (
				Math.hypot(e.clientX - lastActivityX, e.clientY - lastActivityY) > 0.55
			) {
				lastActivityX = e.clientX;
				lastActivityY = e.clientY;
				lastPointerActivityAt = performance.now();
			}
		};

		let cursorYaw = 0;
		let cursorPitch = 0;
		let cursorRoll = 0;
		let parallaxX = 0;
		let parallaxY = 0;
		const baseYaw = 0.15;
		const reduceMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		/** Aim from robot center on screen toward cursor — works anywhere in the viewport */
		const syncNdcLookAtCursor = (e) => {
			const rect = wrap.getBoundingClientRect();
			if (rect.width < 1 || rect.height < 1) return;
			const cx = rect.left + rect.width * 0.5;
			const cy = rect.top + rect.height * 0.5;
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const scaleX = Math.max(vw * 0.46, rect.width * 0.7);
			const scaleY = Math.max(vh * 0.46, rect.height * 0.7);
			rawNdc.x = THREE.MathUtils.clamp(dx / scaleX, -1, 1);
			rawNdc.y = THREE.MathUtils.clamp(dy / scaleY, -1, 1);
		};

		const pointerInfluence = () =>
			finePointerActive || hoverInside || captureId !== null;

		const onWindowPointerMove = (e) => {
			if (reduceMotion) return;
			if (e.pointerType === "mouse" || e.pointerType === "pen") {
				pingActivityIfMouseMoved(e);
				finePointerActive = true;
			} else if (e.pointerType === "touch") {
				pingActivity();
			}
			if (rawNdcFrozen !== null) return;
			syncNdcLookAtCursor(e);
		};

		const onPointerEnter = (e) => {
			hoverInside = true;
			if (!reduceMotion) syncNdcLookAtCursor(e);
		};

		const onPointerMove = (e) => {
			if (reduceMotion) return;
			if (
				(e.pointerType === "mouse" || e.pointerType === "pen") &&
				captureId === e.pointerId &&
				e.buttons & 1
			) {
				const dx = e.clientX - lastMouseClientX;
				const dy = e.clientY - lastMouseClientY;
				lastMouseClientX = e.clientX;
				lastMouseClientY = e.clientY;
				if (dx !== 0 || dy !== 0) {
					const rect = wrap.getBoundingClientRect();
					const invW = 1 / Math.max(rect.width, 1);
					const invH = 1 / Math.max(rect.height, 1);
					const yawGain = 6.8;
					const pitchGain = 4.2;
					dragYawAcc += dx * invW * yawGain;
					const pitchLimit = 1.35;
					dragPitchAcc = THREE.MathUtils.clamp(
						dragPitchAcc + dy * invH * pitchGain * 0.62,
						-pitchLimit,
						pitchLimit,
					);
				}
				if (
					clickStart &&
					(clickStart.pointerType === "mouse" ||
						clickStart.pointerType === "pen")
				) {
					const dx0 = e.clientX - clickStart.x;
					const dy0 = e.clientY - clickStart.y;
					if (Math.hypot(dx0, dy0) > 14) clickStart = null;
				}
				if (dx !== 0 || dy !== 0) pingActivity();
				return;
			}
			if (
				e.pointerType === "touch" &&
				captureId === e.pointerId &&
				rawNdcFrozen !== null
			) {
				const dx = e.clientX - lastTouchClientX;
				const dy = e.clientY - lastTouchClientY;
				lastTouchClientX = e.clientX;
				lastTouchClientY = e.clientY;
				const rect = wrap.getBoundingClientRect();
				const invW = 1 / Math.max(rect.width, 1);
				const invH = 1 / Math.max(rect.height, 1);
				const yawGain = 2.35;
				const pitchGain = 2.35;
				const panGainX = 0.52;
				const panGainY = 0.38;
				touchYawOff += dx * invW * yawGain * 0.72;
				touchPitchOff += dy * invH * pitchGain * 0.42;
				touchPanXOff += dx * invW * panGainX * 0.2;
				touchPanYOff += dy * invH * panGainY * 0.045;
				touchYawOff = THREE.MathUtils.clamp(touchYawOff, -0.88, 0.88);
				touchPitchOff = THREE.MathUtils.clamp(touchPitchOff, -0.58, 0.58);
				touchPanXOff = THREE.MathUtils.clamp(touchPanXOff, -0.32, 0.32);
				touchPanYOff = THREE.MathUtils.clamp(touchPanYOff, -0.12, 0.12);
				pingActivity();
				return;
			}
			syncNdcLookAtCursor(e);
		};

		const onPointerLeave = () => {
			if (captureId === null) hoverInside = false;
		};

		const onPointerDown = (e) => {
			if (reduceMotion) return;
			pingActivity();
			lastActivityX = e.clientX;
			lastActivityY = e.clientY;
			activePointerType = e.pointerType;
			if (e.pointerType === "touch") {
				syncNdcLookAtCursor(e);
				rawNdcFrozen = { x: rawNdc.x, y: rawNdc.y };
				touchYawOff = 0;
				touchPitchOff = 0;
				touchPanXOff = 0;
				touchPanYOff = 0;
				lastTouchClientX = e.clientX;
				lastTouchClientY = e.clientY;
			} else {
				rawNdcFrozen = null;
				syncNdcLookAtCursor(e);
			}
			if (e.button === 0) {
				clickStart = {
					x: e.clientX,
					y: e.clientY,
					t: performance.now(),
					pointerType: e.pointerType,
				};
			}
			if (e.pointerType === "mouse" || e.pointerType === "pen") {
				lastMouseClientX = e.clientX;
				lastMouseClientY = e.clientY;
			}
			try {
				wrap.setPointerCapture(e.pointerId);
				captureId = e.pointerId;
			} catch {
				captureId = e.pointerId;
			}
		};

		const onPointerUp = (e) => {
			if (clickStart && e.button === 0) {
				const elapsed = performance.now() - clickStart.t;
				const dx = e.clientX - clickStart.x;
				const dy = e.clientY - clickStart.y;
				const tapSlop = clickStart.pointerType === "touch" ? 22 : 16;
				if (elapsed < 650 && Math.hypot(dx, dy) < tapSlop) {
					const variantKey = variantKeyFromClick(clickStart.x, clickStart.y);
					setIntroAnchorRef.current({
						x: clickStart.x,
						y: clickStart.y,
						variantKey,
					});
					setIntroOpenRef.current(true);
				}
				clickStart = null;
			}
			if (captureId === e.pointerId) {
				try {
					wrap.releasePointerCapture(e.pointerId);
				} catch {
					/* noop */
				}
				captureId = null;
			}
			if (e.pointerType === "touch") {
				rawNdcFrozen = null;
			}
			activePointerType = null;
			const rect = wrap.getBoundingClientRect();
			const over =
				e.clientX >= rect.left &&
				e.clientX <= rect.right &&
				e.clientY >= rect.top &&
				e.clientY <= rect.bottom;
			hoverInside = over;
		};

		const onPointerCancel = (e) => {
			clickStart = null;
			rawNdcFrozen = null;
			activePointerType = null;
			onPointerUp(e);
			hoverInside = false;
		};

		window.addEventListener("pointermove", onWindowPointerMove, {
			passive: true,
		});
		wrap.addEventListener("pointerenter", onPointerEnter);
		wrap.addEventListener("pointermove", onPointerMove);
		wrap.addEventListener("pointerleave", onPointerLeave);
		wrap.addEventListener("pointerdown", onPointerDown);
		wrap.addEventListener("pointerup", onPointerUp);
		wrap.addEventListener("pointercancel", onPointerCancel);

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 100);
		camera.position.set(0, 0.07, 3.95);
		/* Look above model origin so the mesh sits lower in frame — clears navbar / decorative top */
		camera.lookAt(0, 0.14, 0);
		rayPickCtx.camera = camera;

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: "high-performance",
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.42;
		renderer.setClearColor(0x000000, 0);
		rayPickCtx.renderer = renderer;

		const hemi = new THREE.HemisphereLight(0xf5f0ff, 0x2a2038, 0.95);
		hemi.position.set(0, 1.5, 0);
		scene.add(hemi);

		scene.add(new THREE.AmbientLight(0xe8e0ff, 0.72));
		const key = new THREE.DirectionalLight(0xffffff, 1.75);
		key.position.set(2.5, 4, 3);
		scene.add(key);
		const fillDir = new THREE.DirectionalLight(0xeef2ff, 1.1);
		fillDir.position.set(-2.2, 2.5, 2.8);
		scene.add(fillDir);
		const front = new THREE.DirectionalLight(0xffffff, 0.95);
		front.position.set(0, 0.2, 4.5);
		scene.add(front);
		const rim = new THREE.DirectionalLight(0xf5d0fe, 0.95);
		rim.position.set(-3.5, 1.5, -2);
		scene.add(rim);
		const magenta = new THREE.PointLight(0xf472f6, 3.2, 11);
		magenta.position.set(0.6, 1.1, 1.8);
		scene.add(magenta);
		const fill = new THREE.PointLight(0x7dd3fc, 1.35, 10);
		fill.position.set(-2, 0.3, 2);
		scene.add(fill);

		const pivot = new THREE.Group();
		scene.add(pivot);
		pivotRef.current = pivot;

		let mixer = null;
		const clock = new THREE.Clock();
		const loader = new GLTFLoader();

		loader.load(
			MODEL_PATH,
			(gltf) => {
				if (cancelled) {
					disposeObject3D(gltf.scene);
					return;
				}
				const model = gltf.scene;
				model.updateMatrixWorld(true);
				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());
				model.position.sub(center);
				const size = box.getSize(new THREE.Vector3());
				const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
				model.scale.setScalar(3.25 / maxDim);
				pivot.add(model);
				rayPickCtx.modelRoot = model;

				if (gltf.animations?.length) {
					mixer = new THREE.AnimationMixer(model);
					for (const clip of gltf.animations) {
						mixer.clipAction(clip).play();
					}
				}

				setLoaded(true);
			},
			undefined,
			(err) => {
				console.error("Hero GLB load failed:", err);
			},
		);

		const maxYaw = 0.72;
		const maxPitch = 0.42;
		const maxParallaxX = 0.18;
		/** Keep small — Y parallax pushes into the top of the frustum when looking up */
		const maxParallaxY = 0.045;

		const tick = () => {
			rafRef.current = requestAnimationFrame(tick);
			const dt = clock.getDelta();
			const t = clock.elapsedTime;
			if (mixer) mixer.update(dt);

			const touchDragging = captureId !== null && activePointerType === "touch";
			const mouseOrbiting =
				captureId !== null &&
				(activePointerType === "mouse" || activePointerType === "pen");
			const pointerQuietMs = performance.now() - lastPointerActivityAt;
			const canIdleSpin =
				!reduceMotion &&
				!mouseOrbiting &&
				!touchDragging &&
				pointerQuietMs >= IDLE_SPIN_DELAY_MS;
			if (canIdleSpin) {
				idleAutoYaw += IDLE_SPIN_RAD_PER_SEC * dt;
			}
			if (!touchDragging) {
				touchYawOff = THREE.MathUtils.damp(touchYawOff, 0, 5.5, dt);
				touchPitchOff = THREE.MathUtils.damp(touchPitchOff, 0, 5.5, dt);
				touchPanXOff = THREE.MathUtils.damp(touchPanXOff, 0, 5.5, dt);
				touchPanYOff = THREE.MathUtils.damp(touchPanYOff, 0, 5.5, dt);
			}

			const srcNdc = rawNdcFrozen ?? rawNdc;
			const active = !reduceMotion && pointerInfluence();
			let targetYaw = 0;
			let targetPitch = 0;
			let targetRoll = 0;
			let targetPx = 0;
			let targetPy = 0;
			if (active && !mouseOrbiting) {
				targetYaw = srcNdc.x * maxYaw + touchYawOff;
				targetPitch = srcNdc.y * maxPitch + touchPitchOff;
				targetRoll = srcNdc.x * 0.1;
				targetPx = srcNdc.x * maxParallaxX + touchPanXOff;
				targetPy = srcNdc.y * maxParallaxY + touchPanYOff;
			}

			const ptrOn = pointerInfluence();
			/** Eased follow while tracking cursor — slower easing when idle */
			const followLambda = ptrOn ? 14 : 5;

			cursorYaw = THREE.MathUtils.damp(cursorYaw, targetYaw, followLambda, dt);
			cursorPitch = THREE.MathUtils.damp(
				cursorPitch,
				targetPitch,
				followLambda,
				dt,
			);
			cursorRoll = THREE.MathUtils.damp(
				cursorRoll,
				targetRoll,
				followLambda,
				dt,
			);
			parallaxX = THREE.MathUtils.damp(parallaxX, targetPx, followLambda, dt);
			parallaxY = THREE.MathUtils.damp(parallaxY, targetPy, followLambda, dt);

			if (pivotRef.current) {
				/** Bob / wiggle only before first mouse/pen move or when touch is outside hero */
				const idleMotion = !reduceMotion && !ptrOn;
				const bobY = idleMotion ? Math.sin(t * 1.15) * 0.035 : 0;

				if (reduceMotion) {
					pivotRef.current.position.set(0, 0, 0);
					pivotRef.current.rotation.y = 0.15;
					pivotRef.current.rotation.x = 0;
					pivotRef.current.rotation.z = 0;
				} else {
					const wigglePitch = idleMotion ? Math.sin(t * 0.42) * 0.05 : 0;
					const wiggleRoll = idleMotion ? Math.sin(t * 0.22) * 0.04 : 0;
					pivotRef.current.position.x = parallaxX;
					pivotRef.current.position.y = bobY + parallaxY;
					pivotRef.current.position.z = 0;
					pivotRef.current.rotation.y =
						baseYaw + cursorYaw + dragYawAcc + idleAutoYaw;
					pivotRef.current.rotation.x =
						wigglePitch + cursorPitch + dragPitchAcc;
					pivotRef.current.rotation.z = wiggleRoll + cursorRoll;
				}
			}
			renderer.render(scene, camera);
		};

		wrap.appendChild(renderer.domElement);
		const css = renderer.domElement.style;
		css.display = "block";
		css.width = "100%";
		css.height = "100%";
		css.touchAction = "none";
		tick();

		const resize = () => {
			if (!wrapRef.current) return;
			const w = Math.max(280, wrapRef.current.clientWidth);
			const h = Math.max(260, wrapRef.current.clientHeight);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h, false);
		};

		const ro = new ResizeObserver(resize);
		ro.observe(wrap);
		resize();

		return () => {
			cancelled = true;
			cancelAnimationFrame(rafRef.current);
			ro.disconnect();
			window.removeEventListener("pointermove", onWindowPointerMove);
			wrap.removeEventListener("pointerenter", onPointerEnter);
			wrap.removeEventListener("pointermove", onPointerMove);
			wrap.removeEventListener("pointerleave", onPointerLeave);
			wrap.removeEventListener("pointerdown", onPointerDown);
			wrap.removeEventListener("pointerup", onPointerUp);
			wrap.removeEventListener("pointercancel", onPointerCancel);
			disposeObject3D(pivot);
			renderer.dispose();
			if (wrap.contains(renderer.domElement)) {
				wrap.removeChild(renderer.domElement);
			}
			pivotRef.current = null;
			mixer = null;
		};
	}, []);

	return (
		<>
			<div
				ref={wrapRef}
				role="button"
				tabIndex={0}
				aria-label="Hero robot — drag to rotate, click for a quick introduction"
				aria-haspopup="dialog"
				aria-expanded={introOpen}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						const el = wrapRef.current;
						if (el) {
							const r = el.getBoundingClientRect();
							const cx = r.left + r.width / 2;
							const cy = r.top + r.height / 2;
							setIntroAnchor({
								x: cx,
								y: cy,
								variantKey: pickHudVariantKey(0.5, 0.5),
							});
						} else {
							setIntroAnchor({
								x: window.innerWidth / 2,
								y: window.innerHeight / 2,
								variantKey: HUD_DEFAULT_VARIANT,
							});
						}
						setIntroOpen(true);
					}
				}}
				className={`relative z-20 mx-auto h-[min(500px,74vw)] w-full max-w-2xl cursor-grab touch-none outline-none transition-opacity duration-500 focus-visible:ring-2 focus-visible:ring-fuchsia-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06030c] active:cursor-grabbing md:h-[min(580px,60vh)] ${
					loaded ? "opacity-100" : "opacity-40"
				}`}
			/>
			<HeroRobotIntroModal
				open={introOpen}
				anchor={introAnchor}
				onClose={() => setIntroOpen(false)}
			/>
		</>
	);
};

export default HeroGltfRobot;
