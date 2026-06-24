import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTelegram, FaKey, FaLock } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { HiOutlineChatAlt2, HiOutlinePhotograph } from "react-icons/hi";

const capabilities = [
	{
		title: "OpenAI · Image generation",
		icon: HiOutlinePhotograph,
		body: "Built workflows that call the OpenAI API for image generation, with keys and requests kept server-side (environment variables only — never exposed in the client).",
		accent: "from-emerald-400/90 to-cyan-500/80",
		code: "IMG_GEN",
	},
	{
		title: "OpenRouter · Chat assistants",
		icon: HiOutlineChatAlt2,
		body: "Integrated OpenRouter to power conversational UIs and bots with flexible model routing, so replies stay fast and costs stay predictable across providers.",
		accent: "from-violet-400/90 to-fuchsia-500/80",
		code: "CHAT_ROUTE",
	},
	{
		title: "Telegram · AI-backed bots",
		icon: FaTelegram,
		body: "Connected Telegram bot flows to AI backends for guided answers, course context, and automation — pairing chat UX with secure server logic.",
		accent: "from-sky-400/90 to-blue-500/80",
		code: "BOT_UPLINK",
	},
];

const AISection = () => {
	const reduceMotion = useReducedMotion();
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const showcaseRef = useRef(null);
	const stackRef = useRef(null);
	const synapseFillRef = useRef(null);
	const signalPacketRef = useRef(null);
	const orbRef = useRef(null);
	const cardRefs = useRef([]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			if (headerRef.current) {
				gsap.from(".ai-header-block", {
					y: 52,
					opacity: 0,
					filter: "blur(12px)",
					duration: 0.95,
					ease: "power3.out",
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 85%",
						toggleActions: "play none none reverse",
					},
				});

				gsap.from(".ai-header-line", {
					scaleX: 0,
					duration: 1.15,
					ease: "power2.inOut",
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 82%",
						toggleActions: "play none none reverse",
					},
				});

				gsap.from(".ai-trust-badge", {
					y: 20,
					opacity: 0,
					stagger: 0.08,
					duration: 0.6,
					ease: "power3.out",
					delay: 0.15,
					scrollTrigger: {
						trigger: headerRef.current,
						start: "top 82%",
						toggleActions: "play none none reverse",
					},
				});
			}

			if (orbRef.current && sectionRef.current) {
				gsap.fromTo(
					orbRef.current,
					{ scale: 0.75, opacity: 0.35 },
					{
						scale: 1.15,
						opacity: 0.65,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: 0.6,
						},
					}
				);
			}

			if (showcaseRef.current) {
				const reveal = showcaseRef.current.querySelector(".ai-showcase-reveal");
				const content = showcaseRef.current.querySelector(".ai-showcase-content");
				const image = showcaseRef.current.querySelector(".ai-showcase-image");
				const scan = showcaseRef.current.querySelector(".ai-scan-beam");

				if (reveal) {
					gsap.fromTo(
						reveal,
						{ clipPath: "inset(0 0 100% 0 round 16px)" },
						{
							clipPath: "inset(0 0 0% 0 round 16px)",
							ease: "power2.out",
							scrollTrigger: {
								trigger: showcaseRef.current,
								start: "top 88%",
								end: "top 48%",
								scrub: 0.68,
							},
						}
					);
				}

				if (scan) {
					gsap.fromTo(
						scan,
						{ top: "0%", opacity: 0.95 },
						{
							top: "100%",
							opacity: 0,
							ease: "power1.inOut",
							scrollTrigger: {
								trigger: showcaseRef.current,
								start: "top 85%",
								end: "top 50%",
								scrub: 0.45,
							},
						}
					);
				}

				if (image) {
					gsap.fromTo(
						image,
						{ scale: 1.14, y: "-5%" },
						{
							scale: 1,
							y: "5%",
							ease: "none",
							scrollTrigger: {
								trigger: showcaseRef.current,
								start: "top bottom",
								end: "bottom top",
								scrub: true,
							},
						}
					);
				}

				if (content) {
					gsap.from(content, {
						y: 40,
						opacity: 0,
						duration: 0.75,
						ease: "power3.out",
						scrollTrigger: {
							trigger: showcaseRef.current,
							start: "top 72%",
							toggleActions: "play none none reverse",
						},
					});
				}
			}

			if (stackRef.current && synapseFillRef.current) {
				gsap.fromTo(
					synapseFillRef.current,
					{ scaleY: 0 },
					{
						scaleY: 1,
						ease: "none",
						scrollTrigger: {
							trigger: stackRef.current,
							start: "top 78%",
							end: "bottom 35%",
							scrub: 0.5,
						},
					}
				);

				if (signalPacketRef.current) {
					gsap.fromTo(
						signalPacketRef.current,
						{ top: "0%", opacity: 0 },
						{
							top: "100%",
							opacity: 1,
							ease: "none",
							scrollTrigger: {
								trigger: stackRef.current,
								start: "top 75%",
								end: "bottom 35%",
								scrub: 0.5,
							},
						}
					);
				}
			}

			const vendor = stackRef.current?.querySelector(".ai-vendor-chip");
			if (vendor) {
				gsap.from(vendor, {
					y: -32,
					opacity: 0,
					scale: 0.94,
					duration: 0.65,
					ease: "power3.out",
					scrollTrigger: {
						trigger: vendor,
						start: "top 88%",
						toggleActions: "play none none reverse",
					},
				});
			}

			cardRefs.current.filter(Boolean).forEach((card, i) => {
				const reveal = card.querySelector(".ai-card-reveal");
				const icon = card.querySelector(".ai-card-icon");
				const glow = card.querySelector(".ai-card-glow");
				const node = card.querySelector(".ai-synapse-node");
				const fromClip =
					i % 2 === 0
						? "inset(0 100% 0 0 round 16px)"
						: "inset(0 0 0 100% round 16px)";

				if (reveal) {
					gsap.fromTo(
						reveal,
						{ clipPath: fromClip, opacity: 0.55 },
						{
							clipPath: "inset(0 0 0 0 round 16px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 90%",
								end: "top 58%",
								scrub: 0.62,
							},
						}
					);
				}

				if (icon) {
					gsap.from(icon, {
						scale: 0.4,
						rotate: -120,
						opacity: 0,
						duration: 0.7,
						ease: "back.out(1.6)",
						scrollTrigger: {
							trigger: card,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					});
				}

				if (glow) {
					gsap.fromTo(
						glow,
						{ opacity: 0.08, scale: 0.85 },
						{
							opacity: 0.22,
							scale: 1.1,
							ease: "none",
							scrollTrigger: {
								trigger: card,
								start: "top 85%",
								end: "top 45%",
								scrub: 0.55,
							},
						}
					);
				}

				if (node) {
					gsap.fromTo(
						node,
						{ scale: 0.6, boxShadow: "0 0 0 rgba(52,211,153,0)" },
						{
							scale: 1,
							boxShadow: "0 0 18px rgba(52,211,153,0.85)",
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 78%",
								end: "top 62%",
								scrub: 0.4,
							},
						}
					);
				}
			});

			const footer = sectionRef.current?.querySelector(".ai-footer-cue");
			if (footer) {
				gsap.from(footer, {
					y: 16,
					opacity: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: footer,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			}
		}, sectionRef);

		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 450);
		return () => {
			window.clearTimeout(refreshTimer);
			ctx.revert();
		};
	}, [reduceMotion]);

	return (
		<section
			id="ai"
			ref={sectionRef}
			className="ai-section relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.025)_1px,transparent_1px)] bg-[length:44px_44px] opacity-70 dark:opacity-45"
				aria-hidden
			/>
			<div
				ref={orbRef}
				className="pointer-events-none absolute left-1/2 top-1/3 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/12"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 right-1/4 h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-violet-500/12 blur-[100px] dark:bg-violet-500/16"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent dark:via-emerald-400/40"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-6xl">
				<header
					ref={headerRef}
					className="ai-header-block mx-auto mb-14 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-16 md:pb-12"
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-emerald-400 to-violet-500"
								aria-hidden
							/>
							AI integrations
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 05
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl">
						Intelligent{" "}
						<span className="text-gradient-future">systems</span>
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
						Production-minded AI wiring: OpenAI for images, OpenRouter for chat,
						and Telegram as a front door — always with secrets on the server.
					</p>
					<div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
						<span className="ai-trust-badge inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 dark:border-white/10 dark:bg-slate-900/50">
							<FaLock className="text-emerald-600 dark:text-emerald-400" aria-hidden />
							Keys in env / server only
						</span>
						<span className="ai-trust-badge inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1.5 dark:border-white/10 dark:bg-slate-900/50">
							<FaKey className="text-violet-600 dark:text-violet-400" aria-hidden />
							No client-exposed secrets
						</span>
					</div>
					<div
						className="ai-header-line mx-auto mt-6 h-px max-w-md origin-center bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
						aria-hidden
					/>
				</header>

				<div className="mb-14 grid gap-6 lg:grid-cols-2 lg:gap-10">
					<div
						ref={showcaseRef}
						className="ai-showcase-panel relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark"
					>
						<div className="ai-showcase-reveal relative">
							<div className="noise-texture pointer-events-none absolute inset-0 z-[2] opacity-[0.05] dark:opacity-[0.08]" />
							<div className="pointer-events-none absolute left-3 top-3 z-[3] h-4 w-4 border-l-2 border-t-2 border-emerald-400/50" />
							<div className="pointer-events-none absolute right-3 top-3 z-[3] h-4 w-4 border-r-2 border-t-2 border-violet-400/50" />
							<div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-950/50">
								<Image
									src="/assets/channel-admin.jpg"
									alt="Telegram channel and bot context — AI-integrated community workflows"
									layout="fill"
									objectFit="cover"
									className="ai-showcase-image opacity-95"
									sizes="(max-width: 1024px) 100vw, 50vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/20" />
								<div
									className="ai-scan-beam pointer-events-none absolute inset-x-0 top-0 z-[4] h-[2px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-0 shadow-[0_0_24px_rgba(52,211,153,0.8)]"
									aria-hidden
								/>
								<div className="absolute bottom-4 left-4 right-4 z-[3] flex items-center gap-2">
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/90 text-white shadow-lg">
										<FaTelegram className="text-xl" aria-hidden />
									</div>
									<div>
										<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-200/90">
											Telegram × AI
										</p>
										<p className="text-sm font-semibold text-white drop-shadow">
											Bot + channel ops with model-backed replies
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="ai-showcase-content relative space-y-3 p-5 md:p-6">
							<p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
								At{" "}
								<strong className="text-slate-800 dark:text-slate-200">
									Muyalogy
								</strong>{" "}
								I shipped a Telegram bot alongside the main Next.js product — wired
								into AI services so learners get contextual help without leaving the
								app ecosystem.
							</p>
							<Link
								href="/#projects"
								className="inline-flex text-sm font-semibold text-cyan-600 underline decoration-cyan-500/35 underline-offset-4 transition hover:text-violet-600 hover:decoration-violet-400/50 dark:text-cyan-400 dark:hover:text-violet-300"
							>
								See related builds →
							</Link>
						</div>
					</div>

					<div ref={stackRef} className="ai-capability-stack relative pl-0 lg:pl-8">
						<div
							className="ai-synapse-rail pointer-events-none absolute bottom-4 left-3 top-4 hidden w-px lg:block"
							aria-hidden
						>
							<div className="absolute inset-0 bg-slate-200/80 dark:bg-white/10" />
							<div
								ref={synapseFillRef}
								className="ai-synapse-fill absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-emerald-400 via-violet-400 to-fuchsia-500"
							/>
							<div
								ref={signalPacketRef}
								className="ai-signal-packet absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-300 opacity-0 shadow-[0_0_16px_rgba(52,211,153,0.95)]"
							/>
						</div>

						<div className="ai-vendor-chip relative mb-4 flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-slate-900/45 lg:ml-6">
							<span
								className="ai-synapse-node absolute -left-[1.65rem] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-emerald-400/60 bg-slate-950 lg:block"
								aria-hidden
							/>
							<SiOpenai
								className="text-2xl text-slate-800 dark:text-emerald-300"
								aria-hidden
							/>
							<div>
								<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
									Vendors
								</p>
								<p className="text-sm font-medium text-slate-800 dark:text-slate-200">
									OpenAI · OpenRouter · Telegram Bot API
								</p>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							{capabilities.map((cap, i) => (
								<article
									key={cap.title}
									ref={(el) => {
										cardRefs.current[i] = el;
									}}
									className="ai-capability-card group relative lg:ml-6"
								>
									<span
										className="ai-synapse-node absolute -left-[1.65rem] top-8 hidden h-2.5 w-2.5 rounded-full border-2 border-violet-400/50 bg-slate-950 lg:block"
										aria-hidden
									/>
									<div className="ai-card-reveal relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 p-5 shadow-sm backdrop-blur-md transition hover:border-cyan-400/30 hover:shadow-glow dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-cyan-400/25">
										<div
											className={`ai-card-glow pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${cap.accent} opacity-15 blur-2xl`}
											aria-hidden
										/>
										<div className="relative flex gap-4">
											<div className="ai-card-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-slate-100/90 text-slate-800 dark:border-white/10 dark:bg-slate-950/60 dark:text-cyan-300">
												<cap.icon className="text-xl" aria-hidden />
											</div>
											<div>
												<p className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-600/80 dark:text-emerald-400/80">
													{cap.code}
												</p>
												<h3 className="font-display text-base font-bold text-slate-900 dark:text-white md:text-lg">
													{cap.title}
												</h3>
												<p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
													{cap.body}
												</p>
											</div>
										</div>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>

				<p className="ai-footer-cue text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
					Try the on-site assistant · RoboDog chat widget
				</p>
			</div>
		</section>
	);
};

export default AISection;
