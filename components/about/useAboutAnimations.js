import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollTriggerBase, scheduleScrollTriggerRefresh, ensureGsapScrollSetup } from "../../lib/gsapScroll";
import { HERO_SUBTEXT } from "./aboutData";

const DECODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function setupHeroDecode(heroSubRef) {
	const el = heroSubRef.current;
	if (!el) return;

	const finalText = HERO_SUBTEXT;
	el.textContent = finalText;

	const proxy = { progress: 0 };
	gsap.to(proxy, {
		progress: 1,
		duration: 1.2,
		ease: "power2.out",
		scrollTrigger: scrollTriggerBase({
			trigger: el,
			start: "top 90%",
			toggleActions: "play none none reverse",
		}),
		onUpdate: () => {
			const len = finalText.length;
			const reveal = Math.floor(proxy.progress * len);
			let out = "";
			for (let i = 0; i < len; i += 1) {
				if (finalText[i] === " ") {
					out += " ";
				} else if (i < reveal) {
					out += finalText[i];
				} else {
					out +=
						DECODE_CHARS[Math.floor(Math.random() * DECODE_CHARS.length)];
				}
			}
			el.textContent = out;
		},
		onComplete: () => {
			el.textContent = finalText;
		},
	});
}

export default function useAboutAnimations({
	sectionRef,
	refs,
	reduceMotion,
	setActiveScene,
}) {
	const {
		heroRef,
		heroSubRef,
		whoSplitRef,
		amSplitRef,
		theatreRef,
		pinRef,
		theatreGlowRef,
		scanBeamRef,
		bgWhoRef,
		bgAmRef,
		hudRailRef,
		circuitBgRef,
		portraitWrapRef,
		stageDividerRef,
		sceneRefs,
		chapterRefs,
		segmentRefs,
		highlightRefs,
		bioParaRefs,
		workspaceRef,
		mobileSceneRefs,
	} = refs;

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		ensureGsapScrollSetup();

		const cleanups = [];

		const ctx = gsap.context(() => {
			if (heroRef.current) {
				const heroTl = gsap.timeline({
					scrollTrigger: scrollTriggerBase({
						trigger: heroRef.current,
						start: "top 86%",
						toggleActions: "play none none reverse",
					}),
				});

				heroTl
					.from(".about-eyebrow-line", {
						scaleX: 0,
						transformOrigin: "left center",
						duration: 0.8,
						ease: "power2.inOut",
					})
					.from(
						".about-eyebrow-text",
						{ opacity: 0, x: -20, duration: 0.5 },
						"-=0.45",
					)
					.from(
						".about-title-word",
						{
							y: 120,
							opacity: 0,
							rotateX: -78,
							skewX: -8,
							transformOrigin: "50% 100%",
							stagger: 0.12,
							duration: 1.05,
							ease: "power3.out",
						},
						"-=0.15",
					)
					.from(
						".about-title-char",
						{
							scale: 0.2,
							opacity: 0,
							rotateY: -95,
							z: -80,
							transformOrigin: "50% 50%",
							stagger: 0.16,
							duration: 0.9,
							ease: "back.out(1.8)",
						},
						"-=0.6",
					)
					.from(
						".about-hero-sub",
						{ opacity: 0, y: 24, filter: "blur(10px)", duration: 0.65 },
						"-=0.35",
					)
					.from(
						".about-hero-stat",
						{
							y: 20,
							opacity: 0,
							stagger: 0.1,
							duration: 0.55,
							ease: "power3.out",
						},
						"-=0.35",
					)
					.from(
						".about-hero-hint",
						{ opacity: 0, y: 12, duration: 0.45 },
						"-=0.15",
					);

				setupHeroDecode(heroSubRef);
			}

			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				const panels = sceneRefs.current.filter(Boolean);
				const chapters = chapterRefs.current.filter(Boolean);
				const segments = segmentRefs.current.filter(Boolean);
				if (!panels.length || !pinRef.current || !theatreRef.current) return;

				gsap.set(panels, {
					autoAlpha: 0,
					x: 88,
					rotateY: -14,
					scale: 0.92,
					filter: "blur(14px)",
					clipPath: "inset(0 0 0 100% round 14px)",
				});
				gsap.set(panels[0], {
					autoAlpha: 1,
					x: 0,
					rotateY: 0,
					scale: 1,
					filter: "blur(0px)",
					clipPath: "inset(0 0% 0 0 round 14px)",
				});
				gsap.set(chapters, { autoAlpha: 0, scale: 0.75, rotate: -6 });
				if (chapters[0]) {
					gsap.set(chapters[0], { autoAlpha: 0.16, scale: 1, rotate: 0 });
				}

				if (stageDividerRef.current) {
					gsap.set(stageDividerRef.current, {
						scaleY: 0,
						transformOrigin: "top center",
					});
				}

				if (hudRailRef.current) {
					const fill =
						hudRailRef.current.querySelector(".about-scene-rail__fill") ||
						hudRailRef.current.querySelector(".about-hud-rail__fill");
					if (fill) gsap.set(fill, { scaleY: 0, transformOrigin: "top center" });
				}

				const scrollLen = () => window.innerHeight * 3.1;
				const pinTrigger = scrollTriggerBase({
					trigger: theatreRef.current,
					start: "top top+=88",
					end: () => `+=${scrollLen()}`,
				});

				const tl = gsap.timeline({
					scrollTrigger: {
						...pinTrigger,
						id: "about-theatre-pin",
						pin: pinRef.current,
						scrub: 0.42,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						snap: {
							snapTo: "labels",
							duration: { min: 0.15, max: 0.4 },
							delay: 0.05,
							ease: "power1.inOut",
						},
						onUpdate: (self) => {
							const idx = Math.min(
								panels.length - 1,
								Math.floor(self.progress * panels.length),
							);
							setActiveScene(idx);
							segments.forEach((seg, i) => {
								if (!seg) return;
								seg.classList.toggle("is-active", i === idx);
								seg.classList.toggle("is-passed", i < idx);
							});
						},
					},
				});

				const step = 1 / (panels.length - 1);
				const portraitMoves = [
					{ scale: 1, rotateY: 0, rotateX: 0, y: 0 },
					{ scale: 1.035, rotateY: -7, rotateX: -4, y: -10 },
					{ scale: 1.055, rotateY: 6, rotateX: 3, y: 6 },
					{ scale: 1.075, rotateY: -9, rotateX: -5, y: -14 },
				];

				tl.addLabel("scene0", 0);
				tl.addLabel("scene1", step);
				tl.addLabel("scene2", step * 2);
				tl.addLabel("scene3", 1);

				const firstPanel = panels[0];
				const firstEyebrow = firstPanel?.querySelector(".about-scene-eyebrow");
				const firstHeading = firstPanel?.querySelector(".about-scene-heading");
				const firstBody = firstPanel?.querySelector(".about-scene-body");
				if (firstEyebrow && firstHeading) {
					tl.from(
						[firstEyebrow, firstHeading, firstBody].filter(Boolean),
						{
							y: 36,
							opacity: 0,
							stagger: 0.07,
							duration: step * 0.35,
							ease: "power3.out",
						},
						0.02,
					);
				}

				if (stageDividerRef.current) {
					tl.to(
						stageDividerRef.current,
						{ scaleY: 1, duration: step * 0.5, ease: "power2.out" },
						0,
					);
				}

				if (hudRailRef.current) {
					const fill =
						hudRailRef.current.querySelector(".about-scene-rail__fill") ||
						hudRailRef.current.querySelector(".about-hud-rail__fill");
					if (fill) {
						tl.to(
							fill,
							{ scaleY: 1, duration: step * 3.2, ease: "none" },
							0,
						);
					}
				}

				for (let i = 1; i < panels.length; i++) {
					const t = (i - 1) * step;
					const prev = panels[i - 1];
					const curr = panels[i];
					const prevChapter = chapters[i - 1];
					const currChapter = chapters[i];
					const move =
						portraitMoves[i] ?? portraitMoves[portraitMoves.length - 1];

					tl.to(
						prev,
						{
							autoAlpha: 0,
							x: -96,
							rotateY: 14,
							scale: 0.9,
							filter: "blur(18px)",
							clipPath: "inset(0 100% 0 0 round 14px)",
							duration: step * 0.48,
							ease: "power2.in",
						},
						t,
					)
						.to(
							prev,
							{
								x: "-=12",
								duration: step * 0.08,
								ease: "steps(3)",
							},
							t,
						)
						.fromTo(
							curr,
							{
								autoAlpha: 0,
								x: 96,
								rotateY: -16,
								scale: 0.88,
								filter: "blur(18px)",
								clipPath: "inset(0 0 0 100% round 14px)",
							},
							{
								autoAlpha: 1,
								x: 0,
								rotateY: 0,
								scale: 1,
								filter: "blur(0px)",
								clipPath: "inset(0 0% 0 0 round 14px)",
								duration: step * 0.48,
								ease: "power3.out",
							},
							t,
						);

					const eyebrow = curr.querySelector(".about-scene-eyebrow");
					const heading = curr.querySelector(".about-scene-heading");
					const body = curr.querySelector(".about-scene-body");
					if (eyebrow && heading) {
						tl.fromTo(
							[eyebrow, heading, body].filter(Boolean),
							{ y: 40, opacity: 0 },
							{
								y: 0,
								opacity: 1,
								stagger: 0.06,
								duration: step * 0.28,
								ease: "power2.out",
							},
							t + step * 0.14,
						);
					}

					if (i === 1) {
						const rows = highlightRefs.current.filter(Boolean);
						tl.fromTo(
							rows,
							{
								x: 64,
								opacity: 0,
								scale: 0.92,
								rotateX: 12,
								transformOrigin: "50% 100%",
							},
							{
								x: 0,
								opacity: 1,
								scale: 1,
								rotateX: 0,
								stagger: 0.08,
								duration: step * 0.34,
								ease: "power3.out",
							},
							t + step * 0.2,
						);
					}

					if (i === 2) {
						const paras = bioParaRefs.current.filter(Boolean);
						tl.fromTo(
							paras,
							{ y: 28, opacity: 0, filter: "blur(6px)" },
							{
								y: 0,
								opacity: 1,
								filter: "blur(0px)",
								stagger: 0.07,
								duration: step * 0.32,
								ease: "power2.out",
							},
							t + step * 0.18,
						);
						const scanner = curr.querySelector(".about-scanner__beam");
						if (scanner) {
							tl.fromTo(
								scanner,
								{ top: "0%", opacity: 0.9 },
								{
									top: "100%",
									opacity: 0,
									duration: step * 0.4,
									ease: "power2.inOut",
								},
								t + step * 0.12,
							);
						}
					}

					if (i === 3 && workspaceRef.current) {
						tl.fromTo(
							workspaceRef.current,
							{ y: 48, scale: 0.88, opacity: 0, rotateX: 10 },
							{
								y: 0,
								scale: 1,
								opacity: 1,
								rotateX: 0,
								duration: step * 0.38,
								ease: "power3.out",
								transformOrigin: "50% 100%",
							},
							t + step * 0.16,
						);
					}

					if (prevChapter && currChapter) {
						tl.to(
							prevChapter,
							{ autoAlpha: 0, scale: 0.7, rotate: 8, duration: step * 0.22 },
							t,
						);
						tl.fromTo(
							currChapter,
							{ autoAlpha: 0, scale: 1.2, rotate: -10 },
							{ autoAlpha: 0.18, scale: 1, rotate: 0, duration: step * 0.3 },
							t + step * 0.1,
						);
					}

					if (portraitWrapRef.current) {
						tl.to(
							portraitWrapRef.current,
							{ ...move, duration: step, ease: "none" },
							t,
						);
					}
				}

				if (scanBeamRef.current) {
					gsap.to(scanBeamRef.current, {
						top: "100%",
						duration: 2.8,
						ease: "none",
						repeat: -1,
						yoyo: true,
					});
				}

				if (theatreGlowRef.current) {
					gsap.fromTo(
						theatreGlowRef.current,
						{ opacity: 0.25, scale: 0.92 },
						{
							opacity: 0.85,
							scale: 1.08,
							ease: "none",
							scrollTrigger: { ...pinTrigger, scrub: 0.6 },
						},
					);
				}

				const theatreGrid = pinRef.current?.querySelector(".about-theatre-grid");
				if (theatreGrid) {
					gsap.to(theatreGrid, {
						backgroundPosition: "128px 96px",
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.7 },
					});
				}

				if (circuitBgRef.current) {
					gsap.to(circuitBgRef.current, {
						y: -48,
						opacity: 0.9,
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.55 },
					});
				}

				gsap.utils.toArray(".about-particle").forEach((p, i) => {
					gsap.to(p, {
						y: i % 2 === 0 ? -24 : 18,
						x: i % 3 === 0 ? 12 : -10,
						opacity: 0.9,
						duration: 2.8 + i * 0.4,
						ease: "sine.inOut",
						yoyo: true,
						repeat: -1,
					});
				});

				if (bgWhoRef.current && bgAmRef.current) {
					gsap.to(bgWhoRef.current, {
						x: -160,
						y: -40,
						opacity: 0.05,
						rotate: -4,
						skewX: -3,
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.65 },
					});
					gsap.to(bgAmRef.current, {
						x: 160,
						y: 40,
						opacity: 0.06,
						rotate: 4,
						skewX: 3,
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.65 },
					});
				}

				if (whoSplitRef.current && amSplitRef.current) {
					gsap.to(whoSplitRef.current, {
						x: -72,
						y: -12,
						skewX: -4,
						z: 40,
						ease: "none",
						scrollTrigger: scrollTriggerBase({
							trigger: theatreRef.current,
							start: "top bottom",
							end: "top top+=88",
							scrub: 0.45,
						}),
					});
					gsap.to(amSplitRef.current, {
						x: 72,
						y: 12,
						scale: 1.06,
						skewX: 4,
						z: 40,
						ease: "none",
						scrollTrigger: scrollTriggerBase({
							trigger: theatreRef.current,
							start: "top bottom",
							end: "top top+=88",
							scrub: 0.45,
						}),
					});
				}

				gsap.to(".about-scroll-cue", {
					y: 10,
					opacity: 0.45,
					duration: 1.1,
					ease: "sine.inOut",
					yoyo: true,
					repeat: -1,
				});

				if (portraitWrapRef.current) {
					const portrait = portraitWrapRef.current;
					const inner = portrait.querySelector(".about-portrait-inner");
					const aura = portrait.querySelector(".about-portrait-aura");

					const onMove = (e) => {
						const rect = portrait.getBoundingClientRect();
						const x = (e.clientX - rect.left) / rect.width - 0.5;
						const y = (e.clientY - rect.top) / rect.height - 0.5;
						if (inner) {
							gsap.to(inner, {
								rotateY: x * 14,
								rotateX: -y * 10,
								y: -y * 8,
								duration: 0.5,
								ease: "power2.out",
								overwrite: "auto",
							});
						}
						if (aura) {
							gsap.to(aura, {
								x: x * 16,
								y: y * 16,
								scale: 1.08,
								duration: 0.5,
								overwrite: "auto",
							});
						}
					};

					const onLeave = () => {
						if (inner) {
							gsap.to(inner, {
								rotateY: 0,
								rotateX: 0,
								y: 0,
								duration: 0.75,
								ease: "elastic.out(1, 0.55)",
							});
						}
						if (aura) {
							gsap.to(aura, {
								x: 0,
								y: 0,
								scale: 1,
								duration: 0.65,
								ease: "power2.out",
							});
						}
					};

					portrait.addEventListener("mousemove", onMove);
					portrait.addEventListener("mouseleave", onLeave);
					cleanups.push(() => {
						portrait.removeEventListener("mousemove", onMove);
						portrait.removeEventListener("mouseleave", onLeave);
					});
				}
			});

			mm.add("(max-width: 1023px)", () => {
				const cards = mobileSceneRefs.current.filter(Boolean);

				ScrollTrigger.batch(cards, {
					...scrollTriggerBase(),
					start: "top 88%",
					onEnter: (batch) => {
						gsap.fromTo(
							batch,
							{
								y: 80,
								opacity: 0,
								scale: 0.92,
								rotateX: 8,
								clipPath: "inset(100% 0 0 0 round 12px)",
							},
							{
								y: 0,
								opacity: 1,
								scale: 1,
								rotateX: 0,
								clipPath: "inset(0% 0 0 0 round 16px)",
								duration: 0.95,
								ease: "power3.out",
								transformOrigin: "50% 100%",
								stagger: 0.12,
								overwrite: true,
							},
						);
					},
					onLeaveBack: (batch) => {
						gsap.to(batch, {
							y: 48,
							opacity: 0,
							scale: 0.96,
							duration: 0.5,
							ease: "power2.in",
							overwrite: true,
						});
					},
				});

				cards.forEach((el, i) => {
					const children = el.querySelectorAll(
						".about-scene-eyebrow, .about-scene-heading, .about-scene-body, .about-highlight-row, .about-holo-tile, .about-portrait-frame, .about-cap-grid__icon",
					);
					gsap.from(children, {
						y: 28,
						opacity: 0,
						stagger: 0.08,
						duration: 0.6,
						ease: "power2.out",
						scrollTrigger: scrollTriggerBase({
							trigger: el,
							start: "top 85%",
							toggleActions: "play none none reverse",
						}),
					});

					ScrollTrigger.create({
						...scrollTriggerBase({
							trigger: el,
							start: "top center",
							end: "bottom center",
						}),
						onEnter: () => setActiveScene(i),
						onEnterBack: () => setActiveScene(i),
					});
				});
			});
		}, sectionRef);

		scheduleScrollTriggerRefresh(700);
		const onLenisReady = () => scheduleScrollTriggerRefresh(0);
		window.addEventListener("lenis-ready", onLenisReady);

		return () => {
			window.removeEventListener("lenis-ready", onLenisReady);
			for (const fn of cleanups) fn();
			ctx.revert();
		};
	}, [reduceMotion, setActiveScene, sectionRef, refs]);
}
