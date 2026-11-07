import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { bindVisibilityPause, getCanvasDpr, shouldCapIdleFps } from "../lib/animationControl";
import { createWebGLRendererSafe } from "../lib/webgl";

const CAROUSEL_IMAGES = [
	{ src: "/assets/projects/jiret.png", href: "/jiret", title: "Jiret LMS" },
	{ src: "/assets/projects/muyaloyg.png", href: "/muyalogy", title: "Muyalogy" },
	{ src: "/assets/Screenshot 2026-03-28 023643.png", href: "/greenbag", title: "Green Bag Ethiopia" },
	{ src: "/assets/projects/afriwork.png", href: "/afriwork", title: "Afriwork" },
	{ src: "/assets/projects/loop-state.png", href: "/loopState", title: "Loop State" },
	{ src: "/assets/projects/prime-bank.png", href: "/prime", title: "Prime Bank" },
	{ src: "/assets/global-conflict.vercel.app_ (1).png", href: "/conflict-reporter", title: "Conflict Reporter" },
	{ src: "/assets/projects/netflix.jpg", href: "/netflixClone", title: "Netflix Clone" },
	{ src: "/assets/Screenshot 2026-03-28 004531.png", href: "/sourcepin", title: "Sourcepin" },
	{ src: "/assets/Screenshot 2026-03-28 005041.png", href: "/hcm", title: "HCM System" },
];

const MOBILE_IMAGE_COUNT = 6;
const DESKTOP_IMAGE_COUNT = 10;

function HeroProjectCarousel({ active = true, onPanelClick }) {
	const containerRef = useRef(null);
	const reduceMotion = useReducedMotion();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	const imageCount = isMobile ? MOBILE_IMAGE_COUNT : DESKTOP_IMAGE_COUNT;
	const images = useMemo(() => CAROUSEL_IMAGES.slice(0, imageCount), [imageCount]);

	useEffect(() => {
		if (!active || typeof window === "undefined") return;
		const container = containerRef.current;
		if (!container) return;

		const renderer = createWebGLRendererSafe(true);
		if (!renderer) return;

		let cancelled = false;
		let paused = false;
		let rafId = 0;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
		camera.position.set(0, 0, 0);

		renderer.setPixelRatio(getCanvasDpr(1.25));
		renderer.setClearColor(0x000000, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;

		const panelGroup = new THREE.Group();
		scene.add(panelGroup);

		const panelWidth = 1.6;
		const panelHeight = 0.9;
		const radius = isMobile ? 3.2 : 4.0;
		const tiltAngle = Math.PI * 0.08;

		const textureLoader = new THREE.TextureLoader();
		const panels = [];
		const panelData = [];

		images.forEach((img, i) => {
			const angle = (i / images.length) * Math.PI * 2;

			const geometry = new THREE.PlaneGeometry(panelWidth, panelHeight, 1, 1);
			const material = new THREE.MeshBasicMaterial({
				color: 0x111827,
				transparent: true,
				opacity: 0.85,
				side: THREE.DoubleSide,
			});

			const mesh = new THREE.Mesh(geometry, material);

			mesh.position.x = Math.sin(angle) * radius;
			mesh.position.z = Math.cos(angle) * radius;
			mesh.position.y = Math.sin(angle * 0.5) * 0.15;

			mesh.rotation.y = angle + Math.PI;
			mesh.rotation.x = tiltAngle;

			panelGroup.add(mesh);
			panels.push(mesh);
			panelData.push({ mesh, img, angle });

			textureLoader.load(
				img.src,
				(texture) => {
					if (cancelled) return;
					texture.colorSpace = THREE.SRGBColorSpace;
					texture.minFilter = THREE.LinearFilter;
					texture.magFilter = THREE.LinearFilter;
					texture.generateMipmaps = false;
					material.map = texture;
					material.color.setHex(0xffffff);
					material.needsUpdate = true;
				},
				undefined,
				() => {
					material.color.setHex(0x1e293b);
				}
			);

			const frameGeo = new THREE.EdgesGeometry(geometry);
			const frameMat = new THREE.LineBasicMaterial({
				color: 0x22d3ee,
				transparent: true,
				opacity: 0.4,
			});
			const frame = new THREE.LineSegments(frameGeo, frameMat);
			mesh.add(frame);

			const glowGeo = new THREE.PlaneGeometry(panelWidth + 0.1, panelHeight + 0.1);
			const glowMat = new THREE.MeshBasicMaterial({
				color: 0x22d3ee,
				transparent: true,
				opacity: 0.08,
				side: THREE.DoubleSide,
			});
			const glow = new THREE.Mesh(glowGeo, glowMat);
			glow.position.z = -0.01;
			mesh.add(glow);
		});

		panelGroup.position.y = 0.1;

		const starCount = 120;
		const starGeo = new THREE.BufferGeometry();
		const starPositions = new Float32Array(starCount * 3);
		for (let i = 0; i < starCount; i++) {
			starPositions[i * 3] = (Math.random() - 0.5) * 20;
			starPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
			starPositions[i * 3 + 2] = -8 - Math.random() * 8;
		}
		starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
		const starMat = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 0.03,
			transparent: true,
			opacity: 0.6,
		});
		const stars = new THREE.Points(starGeo, starMat);
		scene.add(stars);

		const clock = new THREE.Clock();
		let lastRenderAt = 0;
		const rotationSpeed = reduceMotion ? 0 : 0.08;

		const resize = () => {
			if (!container) return;
			const w = container.clientWidth;
			const h = container.clientHeight;
			if (w < 1 || h < 1) return;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h, false);
		};

		const tick = () => {
			if (cancelled || paused) return;
			const now = performance.now();

			if (shouldCapIdleFps(now - 5000) && now - lastRenderAt < 50) {
				rafId = requestAnimationFrame(tick);
				return;
			}
			lastRenderAt = now;

			const dt = clock.getDelta();
			panelGroup.rotation.y += rotationSpeed * dt;

			panels.forEach((panel, i) => {
				const worldPos = new THREE.Vector3();
				panel.getWorldPosition(worldPos);
				const distZ = worldPos.z;
				const opacity = THREE.MathUtils.mapLinear(distZ, -radius, radius, 0.3, 1.0);
				panel.material.opacity = THREE.MathUtils.clamp(opacity, 0.3, 0.95);

				const scale = THREE.MathUtils.mapLinear(distZ, -radius, radius, 0.7, 1.1);
				panel.scale.setScalar(THREE.MathUtils.clamp(scale, 0.7, 1.1));
			});

			renderer.render(scene, camera);
			rafId = requestAnimationFrame(tick);
		};

		container.appendChild(renderer.domElement);
		const css = renderer.domElement.style;
		css.display = "block";
		css.width = "100%";
		css.height = "100%";
		css.pointerEvents = "none";

		const ro = new ResizeObserver(resize);
		ro.observe(container);
		resize();

		const unbindVisibility = bindVisibilityPause(container, {
			onPause: () => {
				paused = true;
				cancelAnimationFrame(rafId);
			},
			onResume: () => {
				paused = false;
				clock.getDelta();
				rafId = requestAnimationFrame(tick);
			},
		});

		rafId = requestAnimationFrame(tick);

		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();

		const handleClick = (e) => {
			if (!onPanelClick) return;
			const rect = container.getBoundingClientRect();
			mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

			raycaster.setFromCamera(mouse, camera);
			const intersects = raycaster.intersectObjects(panels, false);

			if (intersects.length > 0) {
				const hitMesh = intersects[0].object;
				const data = panelData.find((p) => p.mesh === hitMesh);
				if (data) {
					onPanelClick(data.img);
				}
			}
		};

		renderer.domElement.style.pointerEvents = "auto";
		renderer.domElement.addEventListener("click", handleClick);

		return () => {
			cancelled = true;
			unbindVisibility();
			cancelAnimationFrame(rafId);
			ro.disconnect();
			renderer.domElement.removeEventListener("click", handleClick);

			panels.forEach((panel) => {
				panel.geometry.dispose();
				panel.material.dispose();
				if (panel.material.map) panel.material.map.dispose();
			});
			starGeo.dispose();
			starMat.dispose();

			renderer.forceContextLoss();
			renderer.dispose();
			if (container.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
		};
	}, [active, images, isMobile, reduceMotion, onPanelClick]);

	if (reduceMotion) {
		return (
			<div
				ref={containerRef}
				className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
				aria-hidden
			>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="grid grid-cols-3 gap-2 opacity-20 blur-sm md:grid-cols-5">
						{images.slice(0, 5).map((img) => (
							<div
								key={img.src}
								className="h-16 w-28 rounded border border-cyan-500/20 bg-slate-800/50 md:h-20 md:w-36"
							/>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
			aria-hidden
		/>
	);
}

export default HeroProjectCarousel;
