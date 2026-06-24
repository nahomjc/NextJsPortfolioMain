import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBolt, FaNewspaper, FaTelegram, FaUsers } from "react-icons/fa";

const TELEGRAM_URL = "https://t.me/kingdom_code";

const features = [
	{ icon: FaUsers, label: "Active Community", code: "COMMUNITY" },
	{ icon: FaNewspaper, label: "Daily Updates", code: "FEED" },
	{ icon: FaBolt, label: "Instant Notifications", code: "PUSH" },
	{ icon: FaTelegram, label: "Exclusive Content", code: "VAULT" },
];

const stats = [
	{ value: "100+", label: "Members" },
	{ value: "Daily", label: "Updates" },
	{ value: "100+", label: "Posts" },
	{ value: "24/7", label: "Support" },
];

const TelegramPromo = () => {
	const reduceMotion = useReducedMotion();
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const theatreRef = useRef(null);
	const contentRef = useRef(null);
	const statsRef = useRef(null);
	const avatarRef = useRef(null);
	const spineFillRef = useRef(null);
	const signalDotRef = useRef(null);
	const scanBeamRef = useRef(null);
	const orbSkyRef = useRef(null);
	const orbCyanRef = useRef(null);
	const featureRefs = useRef([]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(".tg-header-block", {
				y: 52,
				opacity: 0,
				filter: "blur(12px)",
				duration: 0.95,
				ease: "power3.out",
				scrollTrigger: {
					trigger: headerRef.current,
					start: "top 88%",
					toggleActions: "play none none reverse",
				},
			});

			gsap.from(".tg-stat-chip", {
				y: 28,
				opacity: 0,
				scale: 0.9,
				stagger: 0.09,
				duration: 0.65,
				ease: "back.out(1.4)",
				scrollTrigger: {
					trigger: headerRef.current,
					start: "top 82%",
					toggleActions: "play none none reverse",
				},
			});

			if (avatarRef.current) {
				const avatarReveal = avatarRef.current.querySelector(".tg-avatar-reveal");
				const avatarRing = avatarRef.current.querySelector(".tg-avatar-ring");

				if (avatarReveal) {
					gsap.fromTo(
						avatarReveal,
						{ scale: 0.6, opacity: 0, filter: "blur(10px)" },
						{
							scale: 1,
							opacity: 1,
							filter: "blur(0px)",
							ease: "back.out(1.6)",
							scrollTrigger: {
								trigger: avatarRef.current,
								start: "top 88%",
								end: "top 58%",
								scrub: 0.55,
							},
						}
					);
				}

				if (avatarRing) {
					gsap.fromTo(
						avatarRing,
						{ rotate: -90, scale: 0.85 },
						{
							rotate: 0,
							scale: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: avatarRef.current,
								start: "top 86%",
								end: "top 56%",
								scrub: 0.5,
							},
						}
					);
				}

				if (scanBeamRef.current) {
					gsap.fromTo(
						scanBeamRef.current,
						{ top: "-10%", opacity: 0.15 },
						{
							top: "110%",
							opacity: 0.85,
							ease: "none",
							scrollTrigger: {
								trigger: avatarRef.current,
								start: "top 82%",
								end: "top 42%",
								scrub: 0.65,
							},
						}
					);
				}
			}

			const contentReveal = contentRef.current?.querySelector(".tg-content-reveal");
			if (contentReveal) {
				gsap.fromTo(
					contentReveal,
					{ clipPath: "inset(0 100% 0 0 round 18px)", opacity: 0.45 },
					{
						clipPath: "inset(0 0% 0 0 round 18px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: contentRef.current,
							start: "top 86%",
							end: "top 54%",
							scrub: 0.62,
						},
					}
				);
			}

			const contentInner = contentRef.current?.querySelector(".tg-content-inner");
			if (contentInner) {
				gsap.fromTo(
					contentInner,
					{ x: -56, rotateY: 12, opacity: 0.25 },
					{
						x: 0,
						rotateY: 0,
						opacity: 1,
						ease: "power2.out",
						transformOrigin: "100% 50%",
						scrollTrigger: {
							trigger: contentRef.current,
							start: "top 84%",
							end: "top 52%",
							scrub: 0.6,
						},
					}
				);
			}

			featureRefs.current.forEach((item, i) => {
				if (!item) return;
				gsap.from(item, {
					x: -36,
					opacity: 0,
					scale: 0.92,
					duration: 0.55,
					delay: i * 0.05,
					ease: "back.out(1.4)",
					scrollTrigger: {
						trigger: item,
						start: "top 90%",
						toggleActions: "play none none reverse",
					},
				});
			});

			gsap.from(".tg-cta-btn", {
				y: 28,
				opacity: 0,
				scale: 0.94,
				duration: 0.65,
				ease: "back.out(1.35)",
				scrollTrigger: {
					trigger: contentRef.current,
					start: "top 68%",
					toggleActions: "play none none reverse",
				},
			});

			const statsReveal = statsRef.current?.querySelector(".tg-stats-reveal");
			const statsInner = statsRef.current?.querySelector(".tg-stats-inner");

			if (statsReveal) {
				gsap.fromTo(
					statsReveal,
					{ clipPath: "inset(0 0 0 100% round 18px)", opacity: 0.5 },
					{
						clipPath: "inset(0 0 0 0% round 18px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: statsRef.current,
							start: "top 86%",
							end: "top 54%",
							scrub: 0.64,
						},
					}
				);
			}

			if (statsInner) {
				gsap.fromTo(
					statsInner,
					{ x: 56, rotateY: -14 },
					{
						x: 0,
						rotateY: 0,
						ease: "power2.out",
						transformOrigin: "0% 50%",
						scrollTrigger: {
							trigger: statsRef.current,
							start: "top 84%",
							end: "top 52%",
							scrub: 0.62,
						},
					}
				);
			}

			statsRef.current?.querySelectorAll(".tg-stat-cell").forEach((cell, i) => {
				gsap.from(cell, {
					y: 24,
					opacity: 0,
					scale: 0.88,
					duration: 0.5,
					delay: i * 0.06,
					ease: "back.out(1.5)",
					scrollTrigger: {
						trigger: cell,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			if (spineFillRef.current && theatreRef.current) {
				gsap.fromTo(
					spineFillRef.current,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top 68%",
							end: "bottom 32%",
							scrub: 0.45,
						},
					}
				);
			}

			if (signalDotRef.current && theatreRef.current) {
				gsap.fromTo(
					signalDotRef.current,
					{ top: "0%", opacity: 0.35 },
					{
						top: "100%",
						opacity: 1,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top 66%",
							end: "bottom 34%",
							scrub: 0.5,
						},
					}
				);
			}

			theatreRef.current?.querySelectorAll(".tg-spine-mark").forEach((mark, i) => {
				gsap.from(mark, {
					x: -24,
					opacity: 0,
					scale: 0.85,
					duration: 0.5,
					delay: i * 0.05,
					ease: "back.out(1.5)",
					scrollTrigger: {
						trigger: mark,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			gsap.from(".tg-offer-banner", {
				y: 32,
				opacity: 0,
				filter: "blur(8px)",
				duration: 0.7,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".tg-offer-banner",
					start: "top 90%",
					toggleActions: "play none none reverse",
				},
			});

			const watermark = sectionRef.current?.querySelector(".tg-bg-watermark");
			if (watermark) {
				gsap.fromTo(
					watermark,
					{ x: 70, opacity: 0.02 },
					{
						x: -45,
						opacity: 0.07,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 75%",
							end: "bottom 25%",
							scrub: 0.5,
						},
					}
				);
			}

			if (orbSkyRef.current) {
				gsap.fromTo(
					orbSkyRef.current,
					{ y: 35, x: -20 },
					{
						y: -50,
						x: 30,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					}
				);
			}

			if (orbCyanRef.current) {
				gsap.fromTo(
					orbCyanRef.current,
					{ y: -35, x: 25 },
					{
						y: 55,
						x: -40,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					}
				);
			}

			gsap.from(".tg-footer-cue", {
				y: 14,
				opacity: 0,
				duration: 0.55,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "bottom 90%",
					toggleActions: "play none none reverse",
				},
			});
		}, sectionRef);

		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400);

		return () => {
			window.clearTimeout(refreshTimer);
			ctx.revert();
		};
	}, [reduceMotion]);

	return (
		<section
			id="telegram"
			ref={sectionRef}
			className="tg-section relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.17]"
				aria-hidden
			/>
			<div
				ref={orbSkyRef}
				className="pointer-events-none absolute left-1/4 top-0 h-[min(85vw,480px)] w-[min(85vw,480px)] -translate-y-1/3 rounded-full bg-sky-500/14 blur-[120px] dark:bg-sky-400/16"
				aria-hidden
			/>
			<div
				ref={orbCyanRef}
				className="pointer-events-none absolute bottom-0 right-0 h-[min(70vw,400px)] w-[min(70vw,400px)] translate-y-1/4 rounded-full bg-cyan-500/12 blur-[100px] dark:bg-cyan-400/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent dark:via-cyan-400/35"
				aria-hidden
			/>
			<p
				className="tg-bg-watermark pointer-events-none absolute right-[4%] top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(4rem,13vw,9rem)] font-bold leading-none text-slate-900/[0.04] dark:text-white/[0.035]"
				aria-hidden
			>
				TG
			</p>

			<div className="relative z-10 mx-auto max-w-6xl">
				<header
					ref={headerRef}
					className="tg-header-block mx-auto mb-10 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-12 md:pb-12"
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-sky-500 to-cyan-400"
								aria-hidden
							/>
							Community
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ Telegram
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl lg:text-[2.65rem]">
						Join Our{" "}
						<span className="text-gradient-future">Telegram Community</span>
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
						Stay updated with tech news, coding tips, and exclusive content — a
						growing hub for developers and builders.
					</p>

					<div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2.5">
						{[
							{ label: "Members", value: "100+" },
							{ label: "Cadence", value: "Daily" },
							{ label: "Access", value: "24/7" },
						].map(({ label, value }) => (
							<div
								key={label}
								className="tg-stat-chip rounded-xl border border-slate-200/80 bg-white/60 px-3 py-2.5 dark:border-white/10 dark:bg-slate-950/40"
							>
								<p className="font-mono text-[9px] tracking-[0.18em] text-sky-600 dark:text-sky-400">
									{label}
								</p>
								<p className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
									{value}
								</p>
							</div>
						))}
					</div>
				</header>

				<div
					ref={avatarRef}
					className="tg-avatar-block relative mx-auto mb-10 flex max-w-sm flex-col items-center text-center md:mb-12"
				>
					<div className="tg-avatar-reveal relative">
						<div
							className="tg-avatar-ring pointer-events-none absolute -inset-3 rounded-full border border-dashed border-sky-400/40 dark:border-sky-400/30"
							aria-hidden
						/>
						<div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-sky-400/50 shadow-[0_0_40px_-8px_rgba(14,165,233,0.55)] ring-4 ring-sky-500/10 dark:border-sky-400/40 dark:ring-sky-400/15 md:h-32 md:w-32">
							<Image
								src="/assets/channel-admin.jpg"
								alt="Nahom JC — Telegram channel admin"
								layout="fill"
								objectFit="cover"
								className="transition duration-500 hover:scale-105"
								sizes="128px"
							/>
							<div
								ref={scanBeamRef}
								className="tg-scan-beam pointer-events-none absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-0"
								aria-hidden
							/>
						</div>
						<div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500 text-white shadow-lg">
							<FaTelegram className="text-lg" aria-hidden />
						</div>
					</div>
					<h3 className="mt-5 font-display text-lg font-semibold text-slate-900 dark:text-white">
						Nahom JC
					</h3>
					<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
						Channel Admin · Full Stack Developer
					</p>
				</div>

				<div
					ref={theatreRef}
					className="tg-theatre relative grid items-start gap-8 lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[4rem_minmax(0,1fr)]"
				>
					<div className="tg-spine-wrap relative hidden min-h-[280px] lg:block" aria-hidden>
						<div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-slate-300/70 dark:bg-white/10" />
						<div
							ref={spineFillRef}
							className="tg-spine-fill absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-sky-400 via-cyan-400 to-sky-500"
						/>
						<div
							ref={signalDotRef}
							className="tg-signal-dot pointer-events-none absolute left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-slate-900 bg-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.75)] dark:border-slate-950"
						/>
						{features.map((feat, i) => (
							<div
								key={feat.code}
								className="tg-spine-mark absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
								style={{ top: `${12 + i * 22}%` }}
							>
								<span className="h-2 w-2 rounded-full border border-sky-400/50 bg-slate-950 dark:bg-slate-900" />
								<span className="whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.16em] text-sky-600/80 dark:text-sky-400/80">
									{feat.code}
								</span>
							</div>
						))}
					</div>

					<div className="grid gap-8 lg:col-span-1 lg:grid-cols-2 lg:gap-10">
						<div ref={contentRef} className="tg-content-panel relative">
							<div className="tg-content-reveal overflow-hidden rounded-2xl">
								<div className="tg-content-inner relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 p-6 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark md:p-8">
									<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
									<div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-sky-400/50" />
									<div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-cyan-400/50" />

									<div className="relative flex items-center gap-4">
										<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-[0_0_30px_-6px_rgba(14,165,233,0.65)]">
											<FaTelegram className="text-2xl" aria-hidden />
										</div>
										<div>
											<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
												Kingdom Code
											</p>
											<p className="font-display text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
												Developer channel
											</p>
										</div>
									</div>

									<p className="relative mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
										Get practical coding insights, project drops, and community
										discussion — built for devs who ship, not just scroll.
									</p>

									<div className="relative mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
										{features.map((feat, i) => {
											const Icon = feat.icon;
											return (
												<div
													key={feat.code}
													ref={(el) => {
														featureRefs.current[i] = el;
													}}
													className="tg-feature-item flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-3 transition hover:border-sky-400/35 hover:bg-sky-500/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-sky-400/30"
												>
													<Icon className="shrink-0 text-lg text-sky-600 dark:text-sky-400" aria-hidden />
													<div className="min-w-0">
														<p className="text-sm font-medium text-slate-800 dark:text-slate-200">
															{feat.label}
														</p>
														<p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-400">
															{feat.code}
														</p>
													</div>
												</div>
											);
										})}
									</div>

									<a
										href={TELEGRAM_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="tg-cta-btn relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 font-display text-sm font-bold text-white shadow-[0_0_32px_-8px_rgba(14,165,233,0.75)] transition hover:brightness-110 hover:shadow-[0_0_40px_-6px_rgba(14,165,233,0.85)]"
									>
										Join Now
										<span aria-hidden>→</span>
									</a>
								</div>
							</div>
						</div>

						<div ref={statsRef} className="tg-stats-panel relative">
							<div className="tg-stats-reveal overflow-hidden rounded-2xl">
								<div className="tg-stats-inner relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark">
									<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
									<div className="border-b border-slate-200/80 px-6 py-4 text-center dark:border-white/10">
										<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
											Channel metrics
										</p>
										<h3 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white">
											Live snapshot
										</h3>
									</div>
									<div className="grid grid-cols-2 gap-px bg-slate-200/80 dark:bg-white/10">
										{stats.map((stat) => (
											<div
												key={stat.label}
												className="tg-stat-cell bg-white/80 px-4 py-5 text-center transition hover:bg-sky-500/5 dark:bg-slate-900/70 dark:hover:bg-sky-500/10"
											>
												<p className="font-display text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
													{stat.value}
												</p>
												<p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
													{stat.label}
												</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="tg-offer-banner relative mt-10 overflow-hidden rounded-2xl border border-sky-400/25 bg-gradient-to-r from-sky-500/10 via-cyan-500/8 to-sky-500/10 px-6 py-5 text-center backdrop-blur-sm dark:border-sky-400/20 dark:from-sky-500/15 dark:via-cyan-500/10 dark:to-sky-500/15 md:mt-12">
					<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.08)_0%,transparent_50%,rgba(34,211,238,0.06)_100%)]" />
					<p className="relative text-sm text-slate-700 dark:text-slate-300 md:text-base">
						<span className="mr-1" aria-hidden>
							🎉
						</span>
						<span className="font-semibold text-sky-700 dark:text-sky-300">
							Special offer:
						</span>{" "}
						Join now and get access to exclusive resources and early drops.
					</p>
				</div>

				<p className="tg-footer-cue mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
					t.me/kingdom_code · open channel
				</p>
			</div>
		</section>
	);
};

export default TelegramPromo;
