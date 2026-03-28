import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import AboutWorkspaceProjectsModal from "./AboutWorkspaceProjectsModal";

const MODEL_PATH = `/assets/${encodeURIComponent("object_0 (11).glb")}`;

/** Larger target size in scene units (higher = bigger on screen). */
const MODEL_FIT_SIZE = 4.55;

/** Camera distance multiplier vs bounding-sphere fit (lower = closer / more zoom). */
const CAMERA_DISTANCE_MULT = 0.86;

/** Full Y rotation period in seconds when auto-rotating (idle). */
const ROTATION_PERIOD_SEC = 52;

/** Treat pointer-up as a tap (open modal) if movement and duration are small. */
const TAP_MAX_MS = 420;
const TAP_MAX_SLIP_PX = 12;

/** First robotic tap hint appears after this delay (ms). */
const HINT_FIRST_WAIT_MS = 3000;

/** Robotic tap hint: wait before later peeks (ms). */
const HINT_WAIT_MIN_MS = 26_000;
const HINT_WAIT_MAX_MS = 58_000;
/** How long the hint stays visible (ms). */
const HINT_VISIBLE_MIN_MS = 4800;
const HINT_VISIBLE_MAX_MS = 8200;

function disposeObject3D(obj) {
	if (!obj) return;
	obj.traverse((child) => {
		if (child.isMesh) {
			child.geometry?.dispose();
			const m = child.material;
			if (Array.isArray(m)) {
				for (const mat of m) mat.dispose();
			} else {
				m?.dispose();
			}
		}
	});
}

/**
 * GLB viewer: bright lighting, auto spin when idle, drag (orbit) with cursor / touch.
 */
function randBetween(min, max) {
	return min + Math.random() * (max - min);
}

function AboutWorkspacePly() {
	const mountRef = useRef(null);
	const reduceMotion = useReducedMotion();
	const [projectsModalOpen, setProjectsModalOpen] = useState(false);
	const [showTapHint, setShowTapHint] = useState(false);
	const hintTimeoutRef = useRef(null);
	const hintFirstCycleRef = useRef(true);
	const openProjectsModalRef = useRef(() => {});
	openProjectsModalRef.current = () => setProjectsModalOpen(true);

	const clearHintTimer = () => {
		if (hintTimeoutRef.current != null) {
			window.clearTimeout(hintTimeoutRef.current);
			hintTimeoutRef.current = null;
		}
	};

	useEffect(() => {
		if (projectsModalOpen) {
			clearHintTimer();
			setShowTapHint(false);
			return;
		}

		const arm = () => {
			clearHintTimer();
			const waitMs = hintFirstCycleRef.current
				? HINT_FIRST_WAIT_MS
				: reduceMotion
					? randBetween(55_000, 95_000)
					: randBetween(HINT_WAIT_MIN_MS, HINT_WAIT_MAX_MS);
			if (hintFirstCycleRef.current) {
				hintFirstCycleRef.current = false;
			}
			hintTimeoutRef.current = window.setTimeout(() => {
				setShowTapHint(true);
				const visibleMs = reduceMotion
					? randBetween(4000, 5500)
					: randBetween(HINT_VISIBLE_MIN_MS, HINT_VISIBLE_MAX_MS);
				hintTimeoutRef.current = window.setTimeout(() => {
					setShowTapHint(false);
					arm();
				}, visibleMs);
			}, waitMs);
		};

		arm();
		return () => clearHintTimer();
	}, [projectsModalOpen, reduceMotion]);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		let modelRoot = null;
		let rafId = 0;
		let loaderCancelled = false;
		let envRenderTarget = null;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 200);
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: "high-performance",
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.82;
		renderer.setClearColor(0x000000, 0);

		const pmrem = new THREE.PMREMGenerator(renderer);
		envRenderTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
		scene.environment = envRenderTarget.texture;
		pmrem.dispose();
		renderer.domElement.style.display = "block";
		renderer.domElement.style.width = "100%";
		renderer.domElement.style.height = "100%";
		renderer.domElement.style.touchAction = "none";
		mount.appendChild(renderer.domElement);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.06;
		controls.target.set(0, 0, 0);
		controls.enablePan = false;
		controls.enableZoom = true;
		controls.minPolarAngle = Math.PI * 0.22;
		controls.maxPolarAngle = Math.PI * 0.88;
		controls.autoRotate = !reduceMotion;
		controls.autoRotateSpeed = 60 / ROTATION_PERIOD_SEC;

		const canvas = renderer.domElement;
		const setGrab = () => {
			canvas.style.cursor = "grab";
		};
		const setGrabbing = () => {
			canvas.style.cursor = "grabbing";
		};
		setGrab();

		let ptrDown = null;
		const slipSq = TAP_MAX_SLIP_PX * TAP_MAX_SLIP_PX;

		const onPointerDown = (e) => {
			setGrabbing();
			ptrDown = {
				x: e.clientX,
				y: e.clientY,
				t: performance.now(),
				id: e.pointerId,
			};
		};
		const onPointerUp = (e) => {
			setGrab();
			if (!ptrDown || e.pointerId !== ptrDown.id) {
				ptrDown = null;
				return;
			}
			const dt = performance.now() - ptrDown.t;
			const dx = e.clientX - ptrDown.x;
			const dy = e.clientY - ptrDown.y;
			ptrDown = null;
			if (dt > TAP_MAX_MS) return;
			if (dx * dx + dy * dy > slipSq) return;
			openProjectsModalRef.current();
		};
		const onPointerCancel = () => {
			setGrab();
			ptrDown = null;
		};
		const onPointerLeave = () => {
			setGrab();
		};

		canvas.addEventListener("pointerdown", onPointerDown);
		canvas.addEventListener("pointerup", onPointerUp);
		canvas.addEventListener("pointercancel", onPointerCancel);
		canvas.addEventListener("pointerleave", onPointerLeave);

		const hemi = new THREE.HemisphereLight(0xffffff, 0xb8b8c8, 0.78);
		hemi.position.set(0, 1.2, 0);
		scene.add(hemi);
		const ambient = new THREE.AmbientLight(0xf5f7ff, 1.08);
		scene.add(ambient);
		const key = new THREE.DirectionalLight(0xffffff, 1.95);
		key.position.set(2.6, 4.2, 3.2);
		scene.add(key);
		const fill = new THREE.DirectionalLight(0xf0f4ff, 0.95);
		fill.position.set(-2.8, 1.6, -1.4);
		scene.add(fill);
		const rim = new THREE.DirectionalLight(0xfff0fc, 0.78);
		rim.position.set(0.4, 2.2, -3.6);
		scene.add(rim);
		const bounce = new THREE.DirectionalLight(0xe8ecff, 0.52);
		bounce.position.set(0, -2.8, 2.2);
		scene.add(bounce);
		const frontPt = new THREE.PointLight(0xffffff, 3.2, 28, 1.8);
		frontPt.position.set(0.2, 1.4, 4.2);
		scene.add(frontPt);
		const coolPt = new THREE.PointLight(0xc4e8ff, 2.1, 22, 1.85);
		coolPt.position.set(-2.6, 0.8, 2.4);
		scene.add(coolPt);
		const warmPt = new THREE.PointLight(0xfff4e8, 1.35, 18, 2);
		warmPt.position.set(2.4, 1.1, 1.8);
		scene.add(warmPt);

		const syncSize = () => {
			const w = Math.max(1, Math.floor(mount.clientWidth));
			const h = Math.max(1, Math.floor(mount.clientHeight));
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h, false);
		};

		const ro = new ResizeObserver(() => syncSize());
		ro.observe(mount);
		syncSize();

		const loader = new GLTFLoader();
		loader.load(
			MODEL_PATH,
			(gltf) => {
				if (loaderCancelled) {
					disposeObject3D(gltf.scene);
					return;
				}
				const model = gltf.scene;
				model.updateMatrixWorld(true);
				const box = new THREE.Box3().setFromObject(model);
				const center = new THREE.Vector3();
				const size = new THREE.Vector3();
				box.getCenter(center);
				box.getSize(size);
				model.position.sub(center);
				const maxDim = Math.max(size.x, size.y, size.z, 1e-4);
				model.scale.setScalar(MODEL_FIT_SIZE / maxDim);
				scene.add(model);
				modelRoot = model;

				model.traverse((child) => {
					if (!child.isMesh) return;
					const mats = Array.isArray(child.material)
						? child.material
						: [child.material];
					for (const m of mats) {
						if (m && "envMapIntensity" in m) {
							m.envMapIntensity = (m.envMapIntensity ?? 1) * 1.22;
						}
					}
				});

				model.updateMatrixWorld(true);
				const fitBox = new THREE.Box3().setFromObject(model);
				const sphere = fitBox.getBoundingSphere(new THREE.Sphere());
				const vFov = (camera.fov * Math.PI) / 180;
				const dist =
					Math.abs(sphere.radius / Math.sin(vFov / 2)) *
						CAMERA_DISTANCE_MULT +
					0.01;
				camera.position.set(0, sphere.radius * 0.12, dist);
				controls.target.copy(sphere.center);
				camera.lookAt(controls.target);
				controls.update();

				const baseDist = camera.position.distanceTo(controls.target);
				controls.minDistance = Math.max(0.08, baseDist * 0.42);
				controls.maxDistance = baseDist * 4.2;
			},
			undefined,
			(err) => {
				console.error("AboutWorkspacePly: failed to load GLB", err);
			}
		);

		const tick = () => {
			rafId = requestAnimationFrame(tick);
			controls.autoRotate = !reduceMotion;
			controls.update();
			renderer.render(scene, camera);
		};
		tick();

		return () => {
			loaderCancelled = true;
			scene.environment = null;
			envRenderTarget?.dispose();
			envRenderTarget = null;
			cancelAnimationFrame(rafId);
			canvas.removeEventListener("pointerdown", onPointerDown);
			canvas.removeEventListener("pointerup", onPointerUp);
			canvas.removeEventListener("pointercancel", onPointerCancel);
			canvas.removeEventListener("pointerleave", onPointerLeave);
			controls.dispose();
			ro.disconnect();
			if (renderer.domElement.parentNode === mount) {
				mount.removeChild(renderer.domElement);
			}
			renderer.dispose();
			disposeObject3D(modelRoot);
			modelRoot = null;
			scene.clear();
		};
	}, [reduceMotion]);

	return (
		<>
			<div
				className="relative h-[min(58vw,380px)] w-full sm:h-[320px] md:h-[350px] lg:h-[380px]"
				role="region"
				aria-label="3D workspace model viewer"
			>
				<span className="sr-only">
					Interactive 3D workspace model. Drag to rotate the view. Scroll or pinch
					to zoom. Rotates automatically when idle. Quick tap opens a personal
					projects archive.
				</span>
				<div ref={mountRef} className="h-full w-full" />
				<AnimatePresence>
					{showTapHint && !projectsModalOpen ? (
						<motion.div
							key="workspace-tap-hint"
							className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center px-2 sm:bottom-3"
							initial={
								reduceMotion
									? { opacity: 0 }
									: { opacity: 0, y: 14, scale: 0.96 }
							}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={
								reduceMotion
									? { opacity: 0 }
									: { opacity: 0, y: 10, scale: 0.98 }
							}
							transition={{
								type: "spring",
								stiffness: 420,
								damping: 28,
							}}
							aria-live="polite"
						>
							<button
								type="button"
								className="unstyled pointer-events-auto group max-w-[min(100%,20rem)] border-2 border-cyan-500/55 bg-slate-950/90 px-3 py-2.5 text-left shadow-[0_0_0_1px_rgba(217,70,239,0.15),0_0_28px_rgba(34,211,238,0.14),0_12px_40px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md transition hover:border-fuchsia-400/55 hover:shadow-[0_0_32px_rgba(217,70,239,0.2)] dark:border-cyan-400/45 dark:bg-black/88 sm:max-w-none sm:px-4"
								onClick={() => {
									clearHintTimer();
									setShowTapHint(false);
									setProjectsModalOpen(true);
								}}
							>
								<span className="flex flex-col gap-1.5">
									<span className="flex items-center gap-2">
										<span
											className="relative flex h-1.5 w-1.5 shrink-0"
											aria-hidden
										>
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/45" />
											<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
										</span>
										<span className="font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-400/95">
											UPLINK // PERSONAL.VAULT
										</span>
									</span>
									<span className="font-display text-sm font-bold leading-tight text-white sm:text-base">
										Click me —{" "}
										<span className="text-gradient-future">see projects</span>
									</span>
									<span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
										Tap workspace or this panel · deploy dossier
									</span>
									<span className="mt-0.5 flex items-center gap-2 border-t border-cyan-500/25 pt-1.5 font-mono text-[9px] text-fuchsia-400/85">
										<span className="text-cyan-400/80">[EXEC]</span>
										<span className="tracking-wider group-hover:text-fuchsia-300">
											OPEN_ARCHIVE →
										</span>
									</span>
								</span>
								<span
									className="pointer-events-none absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l-2 border-t-2 border-cyan-400/80"
									aria-hidden
								/>
								<span
									className="pointer-events-none absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r-2 border-t-2 border-cyan-400/80"
									aria-hidden
								/>
								<span
									className="pointer-events-none absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-b-2 border-l-2 border-fuchsia-500/50"
									aria-hidden
								/>
								<span
									className="pointer-events-none absolute bottom-1.5 right-1.5 h-2.5 w-2.5 border-b-2 border-r-2 border-fuchsia-500/50"
									aria-hidden
								/>
							</button>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>
			<AboutWorkspaceProjectsModal
				open={projectsModalOpen}
				onClose={() => setProjectsModalOpen(false)}
			/>
		</>
	);
}

export default AboutWorkspacePly;
