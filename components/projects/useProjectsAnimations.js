import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollTriggerBase, scheduleScrollTriggerRefresh, ensureGsapScrollSetup } from "../../lib/gsapScroll";
import { PROJECTS_HERO_DESC, productionProjects } from "./projectsData";

const DECODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function setupHeroDecode(heroDescRef) {
	const el = heroDescRef.current;
	if (!el) return;

	const finalText = PROJECTS_HERO_DESC;
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

export default function useProjectsAnimations({
	sectionRef,
	refs,
	reduceMotion,
	setActiveIndex,
}) {
	const {
		heroRef,
		heroDescRef,
		heroScanRef,
		bgIndexRef,
		theatreRef,
		pinRef,
		theatreGlowRef,
		scanBeamRef,
		circuitBgRef,
		bgBuildRef,
		bgShipRef,
		hudRailRef,
		stageDividerRef,
		previewRefs,
		dossierRefs,
		ghostRefs,
		segmentRefs,
		sandboxRef,
		sandboxCardRefs,
		mobileCardRefs,
	} = refs;

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		ensureGsapScrollSetup();

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
					.from(".projects-eyebrow-line", {
						scaleX: 0,
						transformOrigin: "left center",
						duration: 0.8,
						ease: "power2.inOut",
					})
					.from(
						".projects-eyebrow-text",
						{ opacity: 0, x: -20, duration: 0.5 },
						"-=0.45",
					)
					.from(
						".projects-title-word",
						{
							y: 100,
							opacity: 0,
							rotateX: -72,
							skewX: -6,
							transformOrigin: "50% 100%",
							duration: 0.95,
							ease: "power3.out",
						},
						"-=0.15",
					)
					.from(
						".projects-title-char",
						{
							scale: 0.15,
							opacity: 0,
							rotateY: -90,
							z: -60,
							transformOrigin: "50% 50%",
							stagger: 0.1,
							duration: 0.85,
							ease: "back.out(1.7)",
						},
						"-=0.55",
					)
					.from(
						".projects-header-desc",
						{ opacity: 0, y: 24, filter: "blur(10px)", duration: 0.65 },
						"-=0.35",
					)
					.from(
						".projects-stat-chip",
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
						".projects-hero-hint",
						{ opacity: 0, y: 12, duration: 0.45 },
						"-=0.15",
					);

				if (bgIndexRef.current) {
					gsap.fromTo(
						bgIndexRef.current,
						{ x: 40, opacity: 0.02 },
						{
							x: -20,
							opacity: 0.07,
							ease: "none",
							scrollTrigger: scrollTriggerBase({
								trigger: heroRef.current,
								start: "top 85%",
								end: "bottom 50%",
								scrub: 0.45,
							}),
						},
					);
				}

				setupHeroDecode(heroDescRef);
			}

			const mm = gsap.matchMedia();

			mm.add("(min-width: 1024px)", () => {
				const dossiers = dossierRefs.current.filter(Boolean);
				const previews = previewRefs.current.filter(Boolean);
				const ghosts = ghostRefs.current.filter(Boolean);
				const segments = segmentRefs.current.filter(Boolean);
				const count = dossiers.length;
				if (!count || !pinRef.current || !theatreRef.current) return;

				gsap.set([...dossiers, ...previews], {
					autoAlpha: 0,
					x: 72,
					rotateY: -12,
					scale: 0.92,
					filter: "blur(12px)",
					clipPath: "inset(0 0 0 100% round 12px)",
				});
				gsap.set([dossiers[0], previews[0]], {
					autoAlpha: 1,
					x: 0,
					rotateY: 0,
					scale: 1,
					filter: "blur(0px)",
					clipPath: "inset(0 0% 0 0 round 12px)",
				});
				gsap.set(ghosts, { autoAlpha: 0, scale: 0.8, rotate: -4 });
				if (ghosts[0]) gsap.set(ghosts[0], { autoAlpha: 0.14, scale: 1, rotate: 0 });

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

				const scrollLen = () => window.innerHeight * (count * 0.38 + 0.8);
				const pinTrigger = scrollTriggerBase({
					trigger: theatreRef.current,
					start: "top top+=88",
					end: () => `+=${scrollLen()}`,
				});

				const step = count > 1 ? 1 / (count - 1) : 1;
				const tl = gsap.timeline({
					scrollTrigger: {
						...pinTrigger,
						id: "projects-theatre-pin",
						pin: pinRef.current,
						scrub: 0.4,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						snap: {
							snapTo: (value) => {
								if (count <= 1) return 0;
								return Math.round(value / step) * step;
							},
							duration: { min: 0.12, max: 0.35 },
							delay: 0.04,
							ease: "power1.inOut",
						},
						onUpdate: (self) => {
							const idx = Math.min(
								count - 1,
								Math.round(self.progress * (count - 1)),
							);
							setActiveIndex(idx);
							segments.forEach((seg, i) => {
								if (!seg) return;
								seg.classList.toggle("is-active", i === idx);
								seg.classList.toggle("is-passed", i < idx);
							});
						},
					},
				});

				for (let i = 0; i < count; i += 1) {
					tl.addLabel(`pkg${i}`, i * step);
				}

				if (stageDividerRef.current) {
					tl.to(
						stageDividerRef.current,
						{ scaleY: 1, duration: step * 0.4, ease: "power2.out" },
						0,
					);
				}

				if (hudRailRef.current) {
					const fill =
						hudRailRef.current.querySelector(".about-scene-rail__fill") ||
						hudRailRef.current.querySelector(".about-hud-rail__fill");
					if (fill) {
						tl.to(fill, { scaleY: 1, duration: step * (count - 1), ease: "none" }, 0);
					}
				}

				const firstDossier = dossiers[0];
				const firstEyebrow = firstDossier?.querySelector(".projects-dossier-eyebrow");
				const firstTitle = firstDossier?.querySelector(".projects-dossier-title");
				if (firstEyebrow && firstTitle) {
					tl.from(
						[firstEyebrow, firstTitle, firstDossier.querySelector(".projects-dossier-tech")].filter(Boolean),
						{ y: 32, opacity: 0, stagger: 0.06, duration: step * 0.35, ease: "power3.out" },
						0.02,
					);
				}

				for (let i = 1; i < count; i += 1) {
					const t = (i - 1) * step;
					const prevD = dossiers[i - 1];
					const currD = dossiers[i];
					const prevP = previews[i - 1];
					const currP = previews[i];
					const prevGhost = ghosts[i - 1];
					const currGhost = ghosts[i];

					const transitionOut = {
						autoAlpha: 0,
						x: -80,
						rotateY: 12,
						scale: 0.9,
						filter: "blur(16px)",
						clipPath: "inset(0 100% 0 0 round 12px)",
						duration: step * 0.42,
						ease: "power2.in",
					};
					const transitionIn = {
						autoAlpha: 1,
						x: 0,
						rotateY: 0,
						scale: 1,
						filter: "blur(0px)",
						clipPath: "inset(0 0% 0 0 round 12px)",
						duration: step * 0.42,
						ease: "power3.out",
					};

					tl.to(prevD, transitionOut, t)
						.to(prevP, transitionOut, t)
						.fromTo(
							currD,
							{
								autoAlpha: 0,
								x: 80,
								rotateY: -14,
								scale: 0.88,
								filter: "blur(16px)",
								clipPath: "inset(0 0 0 100% round 12px)",
							},
							transitionIn,
							t,
						)
						.fromTo(
							currP,
							{
								autoAlpha: 0,
								x: 80,
								rotateY: -14,
								scale: 0.88,
								filter: "blur(16px)",
								clipPath: "inset(0 0 0 100% round 12px)",
							},
							transitionIn,
							t,
						);

					if (prevGhost && currGhost) {
						tl.to(prevGhost, { autoAlpha: 0, scale: 0.75, duration: step * 0.2 }, t).to(
							currGhost,
							{ autoAlpha: 0.14, scale: 1, rotate: 0, duration: step * 0.28 },
							t + step * 0.12,
						);
					}

					const eyebrow = currD.querySelector(".projects-dossier-eyebrow");
					const title = currD.querySelector(".projects-dossier-title");
					if (eyebrow && title) {
						tl.fromTo(
							[eyebrow, title, currD.querySelector(".projects-dossier-tech")].filter(Boolean),
							{ y: 28, opacity: 0 },
							{ y: 0, opacity: 1, stagger: 0.05, duration: step * 0.25, ease: "power2.out" },
							t + step * 0.14,
						);
					}
				}

				if (scanBeamRef.current) {
					gsap.to(scanBeamRef.current, {
						top: "100%",
						ease: "none",
						scrollTrigger: {
							...pinTrigger,
							scrub: 0.35,
						},
					});
				}

				if (theatreGlowRef.current) {
					gsap.fromTo(
						theatreGlowRef.current,
						{ opacity: 0.4 },
						{
							opacity: 0.85,
							ease: "none",
							scrollTrigger: { ...pinTrigger, scrub: 0.5 },
						},
					);
				}

				if (circuitBgRef.current) {
					gsap.to(circuitBgRef.current, {
						backgroundPosition: "120% 80%",
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.6 },
					});
				}

				if (bgBuildRef.current && bgShipRef.current) {
					gsap.to(bgBuildRef.current, {
						x: -30,
						y: 20,
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.45 },
					});
					gsap.to(bgShipRef.current, {
						x: 24,
						y: -16,
						ease: "none",
						scrollTrigger: { ...pinTrigger, scrub: 0.45 },
					});
				}
			});

			mm.add("(max-width: 1023px)", () => {
				const cards = mobileCardRefs.current.filter(Boolean);
				if (!cards.length) return;

				gsap.set(cards, { y: 48, opacity: 0, scale: 0.96 });
				ScrollTrigger.batch(cards, {
					start: "top 92%",
					onEnter: (batch) => {
						gsap.to(batch, {
							y: 0,
							opacity: 1,
							scale: 1,
							stagger: 0.08,
							duration: 0.75,
							ease: "power3.out",
							overwrite: true,
						});
					},
					onLeaveBack: (batch) => {
						gsap.to(batch, {
							y: 48,
							opacity: 0,
							scale: 0.96,
							stagger: 0.05,
							duration: 0.4,
							overwrite: true,
						});
					},
				});
			});

			if (sandboxRef.current) {
				const sandboxCards = sandboxCardRefs.current.filter(Boolean);
				gsap.from(sandboxRef.current.querySelector(".projects-subheader"), {
					y: 36,
					opacity: 0,
					duration: 0.85,
					ease: "power3.out",
					scrollTrigger: scrollTriggerBase({
						trigger: sandboxRef.current,
						start: "top 88%",
						toggleActions: "play none none reverse",
					}),
				});

				sandboxCards.forEach((card, i) => {
					if (!card) return;
					const reveal = card.querySelector(".project-card-reveal");
					const inner = card.querySelector(".project-card-inner");
					const fromLeft = i % 3 === 0;
					const clipFrom = fromLeft
						? "inset(0 100% 0 0 round 14px)"
						: i % 3 === 1
							? "inset(0 0 100% 0 round 14px)"
							: "inset(0 0 0 100% round 14px)";

					if (reveal) {
						gsap.fromTo(
							reveal,
							{ clipPath: clipFrom, opacity: 0.4 },
							{
								clipPath: "inset(0 0 0 0 round 14px)",
								opacity: 1,
								ease: "power2.out",
								scrollTrigger: scrollTriggerBase({
									trigger: card,
									start: "top 92%",
									end: "top 62%",
									scrub: 0.55,
								}),
							},
						);
					}

					if (inner) {
						gsap.fromTo(
							inner,
							{ y: 48, scale: 0.92, rotateX: 8 },
							{
								y: 0,
								scale: 1,
								rotateX: 0,
								ease: "power2.out",
								transformOrigin: "50% 100%",
								scrollTrigger: scrollTriggerBase({
									trigger: card,
									start: "top 90%",
									end: "top 60%",
									scrub: 0.5,
								}),
							},
						);
					}
				});
			}
		}, sectionRef);

		scheduleScrollTriggerRefresh(500);

		return () => ctx.revert();
	}, [reduceMotion, setActiveIndex, sectionRef, refs]);
}
