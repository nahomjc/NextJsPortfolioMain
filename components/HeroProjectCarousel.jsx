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

function createHoloPanelMaterial() {
	return new THREE.ShaderMaterial({
		uniforms: {
			uTexture: { value: null },
			uTime: { value: 0 },
			uHover: { value: 0 },
			uOpacity: { value: 1 },
		},
		vertexShader: `
			varying vec2 vUv;
			varying vec3 vWorldPos;
			void main() {
				vUv = uv;
				vec4 worldPos = modelMatrix * vec4(position, 1.0);
				vWorldPos = worldPos.xyz;
				gl_Position = projectionMatrix * viewMatrix * worldPos;
			}
		`,
		fragmentShader: `
			uniform sampler2D uTexture;
			uniform float uTime;
			uniform float uHover;
			uniform float uOpacity;
			varying vec2 vUv;
			varying vec3 vWorldPos;

			void main() {
				vec4 texColor = texture2D(uTexture, vUv);
				
				// Scanlines
				float scanline = sin(vUv.y * 180.0 + uTime * 2.0) * 0.03 + 0.97;
				texColor.rgb *= scanline;
				
				// Chromatic aberration at edges
				float edgeDist = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)) * 2.0;
				float chromaStrength = edgeDist * edgeDist * 0.015 * (1.0 + uHover * 0.5);
				vec2 redOffset = vec2(chromaStrength, 0.0);
				vec2 blueOffset = vec2(-chromaStrength, 0.0);
				float r = texture2D(uTexture, vUv + redOffset).r;
				float b = texture2D(uTexture, vUv + blueOffset).b;
				texColor.r = mix(texColor.r, r, 0.5);
				texColor.b = mix(texColor.b, b, 0.5);
				
				// Edge glow (cyan/violet)
				float edgeGlow = smoothstep(0.35, 0.5, edgeDist);
				vec3 glowColor = mix(vec3(0.13, 0.83, 0.93), vec3(0.55, 0.36, 0.96), vUv.y);
				texColor.rgb += glowColor * edgeGlow * (0.15 + uHover * 0.25);
				
				// Holographic shimmer
				float shimmer = sin(vUv.x * 40.0 + vUv.y * 20.0 + uTime * 3.0) * 0.02;
				texColor.rgb += shimmer * (0.5 + uHover * 0.5);
				
				// Slight blue tint for hologram feel
				texColor.rgb = mix(texColor.rgb, texColor.rgb * vec3(0.9, 0.95, 1.1), 0.15);
				
				texColor.a *= uOpacity;
				gl_FragColor = texColor;
			}
		`,
		transparent: true,
		side: THREE.DoubleSide,
	});
}

function createGridFloorMaterial() {
	return new THREE.ShaderMaterial({
		uniforms: {
			uTime: { value: 0 },
		},
		vertexShader: `
			varying vec2 vUv;
			varying vec3 vWorldPos;
			void main() {
				vUv = uv;
				vec4 worldPos = modelMatrix * vec4(position, 1.0);
				vWorldPos = worldPos.xyz;
				gl_Position = projectionMatrix * viewMatrix * worldPos;
			}
		`,
		fragmentShader: `
			uniform float uTime;
			varying vec2 vUv;
			varying vec3 vWorldPos;

			void main() {
				vec2 grid = abs(fract(vWorldPos.xz * 0.5) - 0.5);
				float line = min(grid.x, grid.y);
				float gridLine = 1.0 - smoothstep(0.0, 0.03, line);
				
				// Distance fade
				float dist = length(vWorldPos.xz);
				float fade = 1.0 - smoothstep(2.0, 8.0, dist);
				
				// Pulse effect
				float pulse = sin(dist * 0.5 - uTime * 1.5) * 0.3 + 0.7;
				
				// Cyan color with violet hints
				vec3 color = mix(vec3(0.13, 0.83, 0.93), vec3(0.55, 0.36, 0.96), vUv.y * 0.3);
				
				float alpha = gridLine * fade * pulse * 0.4;
				gl_FragColor = vec4(color, alpha);
			}
		`,
		transparent: true,
		side: THREE.DoubleSide,
		depthWrite: false,
	});
}

function HeroProjectCarousel({ active = true, onPanelClick, mousePosition }) {
	const containerRef = useRef(null);
	const reduceMotion = useReducedMotion();
	const [isMobile, setIsMobile] = useState(false);
	const mousePosRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		if (mousePosition) {
			mousePosRef.current = mousePosition;
		}
	}, [mousePosition]);

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
		camera.position.set(0, 0.8, 0);
		camera.lookAt(0, 0, 0);

		renderer.setPixelRatio(getCanvasDpr(1.5));
		renderer.setClearColor(0x000000, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;

		const panelGroup = new THREE.Group();
		scene.add(panelGroup);

		const panelWidth = isMobile ? 1.4 : 1.8;
		const panelHeight = isMobile ? 0.8 : 1.0;
		const radius = isMobile ? 3.5 : 4.5;
		const tiltAngle = Math.PI * 0.12;

		const textureLoader = new THREE.TextureLoader();
		const panels = [];
		const panelData = [];
		const holoMaterials = [];

		images.forEach((img, i) => {
			const angle = (i / images.length) * Math.PI * 2;

			const geometry = new THREE.PlaneGeometry(panelWidth, panelHeight, 1, 1);
			const material = createHoloPanelMaterial();
			holoMaterials.push(material);

			const mesh = new THREE.Mesh(geometry, material);

			mesh.position.x = Math.sin(angle) * radius;
			mesh.position.z = Math.cos(angle) * radius;
			mesh.position.y = 0.2 + Math.sin(angle * 2) * 0.1;

			mesh.rotation.y = angle + Math.PI;
			mesh.rotation.x = tiltAngle;

			panelGroup.add(mesh);
			panels.push(mesh);
			panelData.push({ mesh, img, angle, material });

			textureLoader.load(
				img.src,
				(texture) => {
					if (cancelled) return;
					texture.colorSpace = THREE.SRGBColorSpace;
					texture.minFilter = THREE.LinearFilter;
					texture.magFilter = THREE.LinearFilter;
					texture.generateMipmaps = false;
					material.uniforms.uTexture.value = texture;
				},
				undefined,
				() => {}
			);

			// Neon frame glow
			const frameGeo = new THREE.EdgesGeometry(geometry);
			const frameMat = new THREE.LineBasicMaterial({
				color: 0x22d3ee,
				transparent: true,
				opacity: 0.8,
			});
			const frame = new THREE.LineSegments(frameGeo, frameMat);
			mesh.add(frame);

			// Outer glow bloom effect
			const glowGeo = new THREE.PlaneGeometry(panelWidth + 0.15, panelHeight + 0.15);
			const glowMat = new THREE.ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					uColor1: { value: new THREE.Color(0x22d3ee) },
					uColor2: { value: new THREE.Color(0x8b5cf6) },
				},
				vertexShader: `
					varying vec2 vUv;
					void main() {
						vUv = uv;
						gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
					}
				`,
				fragmentShader: `
					uniform float uTime;
					uniform vec3 uColor1;
					uniform vec3 uColor2;
					varying vec2 vUv;
					void main() {
						float dist = length(vUv - 0.5) * 2.0;
						float edge = smoothstep(0.7, 1.0, dist);
						vec3 color = mix(uColor1, uColor2, sin(uTime + vUv.x * 3.14) * 0.5 + 0.5);
						float alpha = edge * 0.25 * (0.8 + sin(uTime * 2.0) * 0.2);
						gl_FragColor = vec4(color, alpha);
					}
				`,
				transparent: true,
				side: THREE.DoubleSide,
				depthWrite: false,
			});
			const glow = new THREE.Mesh(glowGeo, glowMat);
			glow.position.z = -0.02;
			mesh.add(glow);
			mesh.userData.glowMat = glowMat;

			// Reflection plane (subtle)
			const reflectGeo = new THREE.PlaneGeometry(panelWidth * 0.9, panelHeight * 0.3);
			const reflectMat = new THREE.MeshBasicMaterial({
				color: 0x22d3ee,
				transparent: true,
				opacity: 0.05,
				side: THREE.DoubleSide,
			});
			const reflect = new THREE.Mesh(reflectGeo, reflectMat);
			reflect.position.y = -panelHeight * 0.7;
			reflect.rotation.x = Math.PI * 0.1;
			mesh.add(reflect);
		});

		panelGroup.position.y = -0.3;

		// Perspective grid floor
		const gridMat = createGridFloorMaterial();
		const gridGeo = new THREE.PlaneGeometry(20, 20);
		const gridFloor = new THREE.Mesh(gridGeo, gridMat);
		gridFloor.rotation.x = -Math.PI / 2;
		gridFloor.position.y = -1.2;
		scene.add(gridFloor);

		// Horizon glow
		const horizonGeo = new THREE.PlaneGeometry(25, 3);
		const horizonMat = new THREE.ShaderMaterial({
			uniforms: { uTime: { value: 0 } },
			vertexShader: `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform float uTime;
				varying vec2 vUv;
				void main() {
					float glow = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
					glow *= smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
					vec3 color = mix(vec3(0.13, 0.83, 0.93), vec3(0.55, 0.36, 0.96), sin(uTime * 0.5) * 0.5 + 0.5);
					float pulse = 0.15 + sin(uTime) * 0.05;
					gl_FragColor = vec4(color, glow * pulse);
				}
			`,
			transparent: true,
			depthWrite: false,
		});
		const horizon = new THREE.Mesh(horizonGeo, horizonMat);
		horizon.position.set(0, -1.0, -6);
		scene.add(horizon);

		// Starfield with varying sizes
		const starCount = 200;
		const starGeo = new THREE.BufferGeometry();
		const starPositions = new Float32Array(starCount * 3);
		const starSizes = new Float32Array(starCount);
		for (let i = 0; i < starCount; i++) {
			starPositions[i * 3] = (Math.random() - 0.5) * 25;
			starPositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
			starPositions[i * 3 + 2] = -10 - Math.random() * 10;
			starSizes[i] = Math.random() * 2 + 0.5;
		}
		starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
		starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
		const starMat = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 0.04,
			transparent: true,
			opacity: 0.7,
			sizeAttenuation: true,
		});
		const stars = new THREE.Points(starGeo, starMat);
		scene.add(stars);

		// Energy ring around center
		const ringGeo = new THREE.TorusGeometry(2.5, 0.015, 8, 64);
		const ringMat = new THREE.MeshBasicMaterial({
			color: 0x22d3ee,
			transparent: true,
			opacity: 0.3,
		});
		const energyRing = new THREE.Mesh(ringGeo, ringMat);
		energyRing.rotation.x = Math.PI / 2;
		energyRing.position.y = -0.8;
		scene.add(energyRing);

		const ring2Geo = new THREE.TorusGeometry(3.2, 0.008, 8, 64);
		const ring2Mat = new THREE.MeshBasicMaterial({
			color: 0x8b5cf6,
			transparent: true,
			opacity: 0.2,
		});
		const energyRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
		energyRing2.rotation.x = Math.PI / 2;
		energyRing2.position.y = -0.9;
		scene.add(energyRing2);

		const clock = new THREE.Clock();
		let lastRenderAt = 0;
		const rotationSpeed = reduceMotion ? 0 : 0.06;

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
			const elapsed = clock.elapsedTime;

			panelGroup.rotation.y += rotationSpeed * dt;

			// Mouse parallax effect
			const mx = mousePosRef.current.x * 0.15;
			const my = mousePosRef.current.y * 0.08;
			panelGroup.position.x = THREE.MathUtils.lerp(panelGroup.position.x, mx, 0.05);
			panelGroup.position.z = THREE.MathUtils.lerp(panelGroup.position.z, my * 0.5, 0.05);

			// Update materials
			holoMaterials.forEach((mat) => {
				mat.uniforms.uTime.value = elapsed;
			});

			gridMat.uniforms.uTime.value = elapsed;
			horizonMat.uniforms.uTime.value = elapsed;

			// Energy rings rotation
			energyRing.rotation.z = elapsed * 0.3;
			energyRing2.rotation.z = -elapsed * 0.2;

			panels.forEach((panel) => {
				const worldPos = new THREE.Vector3();
				panel.getWorldPosition(worldPos);
				const distZ = worldPos.z;
				const opacity = THREE.MathUtils.mapLinear(distZ, -radius, radius, 0.4, 1.0);
				panel.material.uniforms.uOpacity.value = THREE.MathUtils.clamp(opacity, 0.4, 1.0);

				const scale = THREE.MathUtils.mapLinear(distZ, -radius, radius, 0.75, 1.15);
				panel.scale.setScalar(THREE.MathUtils.clamp(scale, 0.75, 1.15));

				if (panel.userData.glowMat) {
					panel.userData.glowMat.uniforms.uTime.value = elapsed;
				}
			});

			// Subtle star twinkle
			stars.material.opacity = 0.6 + Math.sin(elapsed * 2) * 0.15;

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
				if (panel.material.uniforms?.uTexture?.value) {
					panel.material.uniforms.uTexture.value.dispose();
				}
			});
			starGeo.dispose();
			starMat.dispose();
			gridGeo.dispose();
			gridMat.dispose();
			horizonGeo.dispose();
			horizonMat.dispose();
			ringGeo.dispose();
			ringMat.dispose();
			ring2Geo.dispose();
			ring2Mat.dispose();

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
								className="h-16 w-28 rounded border border-cyan-500/30 bg-slate-900/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] md:h-20 md:w-36"
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
