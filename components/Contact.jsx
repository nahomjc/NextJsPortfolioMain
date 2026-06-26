import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp, HiDownload } from "react-icons/hi";
import { CV_DOWNLOAD_NAME, CV_PATH } from "../lib/seo";

const LINKEDIN = "https://www.linkedin.com/in/nahom-tesfaye-35b97420b/";
const GITHUB = "https://github.com/nahomjc";

const fieldClass =
	"contact-field rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500/55 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] dark:border-white/12 dark:bg-slate-950/55 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-fuchsia-400/45 dark:focus:shadow-[0_0_0_3px_rgba(232,121,249,0.12)]";

const connectLinks = [
	{ href: LINKEDIN, label: "LinkedIn", icon: FaLinkedinIn, accent: "hover:border-sky-400/50 hover:text-sky-500 dark:hover:text-sky-400" },
	{ href: GITHUB, label: "GitHub", icon: FaGithub, accent: "hover:border-violet-400/50 hover:text-violet-600 dark:hover:text-violet-400" },
	{ href: "#contact", label: "Email", icon: AiOutlineMail, accent: "hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-400" },
	{ href: "/resume", label: "Resume", icon: BsFillPersonLinesFill, accent: "hover:border-fuchsia-400/50 hover:text-fuchsia-600 dark:hover:text-fuchsia-400" },
];

const intentChips = [
	{ label: "Freelance", code: "CONTRACT" },
	{ label: "Full-time", code: "HIRE" },
	{ label: "Collaboration", code: "COLLAB" },
];

const Contact = () => {
	const reduceMotion = useReducedMotion();
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const theatreRef = useRef(null);
	const profileRef = useRef(null);
	const formRef = useRef(null);
	const spineFillRef = useRef(null);
	const signalDotRef = useRef(null);
	const scanBeamRef = useRef(null);
	const orbCyanRef = useRef(null);
	const orbFuchsiaRef = useRef(null);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(".contact-header-block", {
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

			gsap.from(".contact-intent-chip", {
				y: 24,
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

			theatreRef.current?.querySelectorAll(".contact-spine-mark").forEach((mark, i) => {
				gsap.from(mark, {
					x: -24,
					opacity: 0,
					scale: 0.85,
					duration: 0.5,
					delay: i * 0.06,
					ease: "back.out(1.5)",
					scrollTrigger: {
						trigger: mark,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			const profileReveal = profileRef.current?.querySelector(".contact-profile-reveal");
			const profileInner = profileRef.current?.querySelector(".contact-profile-inner");
			const profileMedia = profileRef.current?.querySelector(".contact-profile-media");

			if (profileReveal) {
				gsap.fromTo(
					profileReveal,
					{ clipPath: "inset(0 100% 0 0 round 18px)", opacity: 0.45 },
					{
						clipPath: "inset(0 0% 0 0 round 18px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: profileRef.current,
							start: "top 88%",
							end: "top 54%",
							scrub: 0.62,
						},
					}
				);
			}

			if (profileInner) {
				gsap.fromTo(
					profileInner,
					{ x: -56, rotateY: 12, opacity: 0.25 },
					{
						x: 0,
						rotateY: 0,
						opacity: 1,
						ease: "power2.out",
						transformOrigin: "100% 50%",
						scrollTrigger: {
							trigger: profileRef.current,
							start: "top 86%",
							end: "top 52%",
							scrub: 0.6,
						},
					}
				);
			}

			if (profileMedia) {
				gsap.fromTo(
					profileMedia,
					{ y: "-6%", scale: 1.05 },
					{
						y: "4%",
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: profileRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					}
				);
			}

			if (scanBeamRef.current && profileRef.current) {
				gsap.fromTo(
					scanBeamRef.current,
					{ top: "-10%", opacity: 0.15 },
					{
						top: "110%",
						opacity: 0.85,
						ease: "none",
						scrollTrigger: {
							trigger: profileRef.current,
							start: "top 82%",
							end: "top 42%",
							scrub: 0.65,
						},
					}
				);
			}

			profileRef.current?.querySelectorAll(".contact-social-link").forEach((link, i) => {
				gsap.from(link, {
					scale: 0.7,
					opacity: 0,
					duration: 0.45,
					delay: i * 0.06,
					ease: "back.out(1.6)",
					scrollTrigger: {
						trigger: link,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			gsap.from(".contact-cv-btn", {
				y: 24,
				opacity: 0,
				scale: 0.94,
				duration: 0.65,
				ease: "back.out(1.35)",
				scrollTrigger: {
					trigger: profileRef.current,
					start: "top 68%",
					toggleActions: "play none none reverse",
				},
			});

			const formReveal = formRef.current?.querySelector(".contact-form-reveal");
			const formInner = formRef.current?.querySelector(".contact-form-inner");

			if (formReveal) {
				gsap.fromTo(
					formReveal,
					{ clipPath: "inset(0 0 0 100% round 18px)", opacity: 0.5 },
					{
						clipPath: "inset(0 0 0 0% round 18px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: formRef.current,
							start: "top 88%",
							end: "top 54%",
							scrub: 0.64,
						},
					}
				);
			}

			if (formInner) {
				gsap.fromTo(
					formInner,
					{ x: 56, rotateY: -14, opacity: 0.25 },
					{
						x: 0,
						rotateY: 0,
						opacity: 1,
						ease: "power2.out",
						transformOrigin: "0% 50%",
						scrollTrigger: {
							trigger: formRef.current,
							start: "top 86%",
							end: "top 52%",
							scrub: 0.62,
						},
					}
				);
			}

			formRef.current?.querySelectorAll(".contact-field-group").forEach((group, i) => {
				gsap.from(group, {
					y: 22,
					opacity: 0,
					duration: 0.5,
					delay: i * 0.05,
					ease: "power3.out",
					scrollTrigger: {
						trigger: group,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			gsap.from(".contact-submit-btn", {
				y: 28,
				opacity: 0,
				scale: 0.94,
				duration: 0.65,
				ease: "back.out(1.35)",
				scrollTrigger: {
					trigger: formRef.current,
					start: "top 62%",
					toggleActions: "play none none reverse",
				},
			});

			const watermark = sectionRef.current?.querySelector(".contact-bg-watermark");
			if (watermark) {
				gsap.fromTo(
					watermark,
					{ x: 70, opacity: 0.02 },
					{
						x: -45,
						opacity: 0.08,
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

			if (orbCyanRef.current) {
				gsap.fromTo(
					orbCyanRef.current,
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

			if (orbFuchsiaRef.current) {
				gsap.fromTo(
					orbFuchsiaRef.current,
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

			gsap.from(".contact-back-top", {
				y: 20,
				opacity: 0,
				scale: 0.9,
				duration: 0.55,
				ease: "back.out(1.4)",
				scrollTrigger: {
					trigger: ".contact-back-top",
					start: "top 95%",
					toggleActions: "play none none reverse",
				},
			});

			gsap.from(".contact-footer-cue", {
				y: 14,
				opacity: 0,
				duration: 0.55,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "bottom 92%",
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
			id="contact"
			ref={sectionRef}
			className="contact-section relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28 lg:min-h-screen"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.17]"
				aria-hidden
			/>
			<div
				ref={orbCyanRef}
				className="pointer-events-none absolute right-0 top-1/4 h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-cyan-400/12 blur-[110px] dark:bg-cyan-500/14"
				aria-hidden
			/>
			<div
				ref={orbFuchsiaRef}
				className="pointer-events-none absolute bottom-1/4 left-0 h-[min(80vw,440px)] w-[min(80vw,440px)] rounded-full bg-fuchsia-500/12 blur-[100px] dark:bg-fuchsia-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent dark:via-fuchsia-400/25"
				aria-hidden
			/>
			<p
				className="contact-bg-watermark pointer-events-none absolute right-[4%] top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(4rem,13vw,9rem)] font-bold leading-none text-slate-900/[0.04] dark:text-white/[0.035]"
				aria-hidden
			>
				HELLO
			</p>

			<div className="relative z-10 mx-auto max-w-6xl">
				<header
					ref={headerRef}
					className="contact-header-block mx-auto mb-12 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-14 md:pb-12"
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500"
								aria-hidden
							/>
							Contact
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ open channel
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl lg:text-[2.65rem]">
						Get in <span className="text-gradient-future">touch</span>
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
						Freelance, full-time, or collaboration — drop a message and I&apos;ll
						respond as soon as I can.
					</p>

					<div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2.5">
						{intentChips.map(({ label, code }) => (
							<div
								key={code}
								className="contact-intent-chip rounded-xl border border-slate-200/80 bg-white/60 px-3 py-2.5 dark:border-white/10 dark:bg-slate-950/40"
							>
								<p className="font-mono text-[9px] tracking-[0.18em] text-cyan-600 dark:text-cyan-400">
									{code}
								</p>
								<p className="mt-0.5 font-display text-sm font-bold text-slate-900 dark:text-white">
									{label}
								</p>
							</div>
						))}
					</div>
				</header>

				<div
					ref={theatreRef}
					className="contact-theatre relative grid items-start gap-8 lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[4rem_minmax(0,1fr)]"
				>
					<div className="contact-spine-wrap relative hidden min-h-[320px] lg:block" aria-hidden>
						<div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-slate-300/70 dark:bg-white/10" />
						<div
							ref={spineFillRef}
							className="contact-spine-fill absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-violet-500"
						/>
						<div
							ref={signalDotRef}
							className="contact-signal-dot pointer-events-none absolute left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.75)] dark:border-slate-950"
						/>
						{intentChips.map((chip, i) => (
							<div
								key={chip.code}
								className="contact-spine-mark absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
								style={{ top: `${18 + i * 28}%` }}
							>
								<span className="h-2 w-2 rounded-full border border-cyan-400/50 bg-slate-950 dark:bg-slate-900" />
								<span className="whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.16em] text-cyan-600/80 dark:text-cyan-400/80">
									{chip.code}
								</span>
							</div>
						))}
					</div>

					<div className="grid gap-8 lg:col-span-1 lg:grid-cols-5 lg:gap-10">
						<div ref={profileRef} className="contact-profile lg:col-span-2">
							<div className="contact-profile-reveal overflow-hidden rounded-2xl">
								<div className="contact-profile-inner relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark">
									<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
									<div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-cyan-400/50" />
									<div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-fuchsia-400/50" />

									<div className="p-5 md:p-6">
										<div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl ring-1 ring-slate-200/70 dark:ring-white/10">
											<div className="contact-profile-media relative h-[110%] w-full">
												<Image
													className="object-cover"
													src="/assets/contact-me.jpg"
													alt="Nahom Tesfaye"
													layout="fill"
													objectFit="cover"
													sizes="(max-width: 1024px) 100vw, 384px"
												/>
											</div>
											<div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-cyan-500/5" />
											<div
												ref={scanBeamRef}
												className="contact-scan-beam pointer-events-none absolute inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0"
												aria-hidden
											/>
											<div className="absolute bottom-3 left-3 z-10">
												<p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/90">
													Available
												</p>
												<p className="font-display text-lg font-bold text-white drop-shadow">
													Nahom Tesfaye
												</p>
											</div>
										</div>

										<div className="mt-5">
											<p className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text font-semibold text-transparent dark:from-cyan-400 dark:to-fuchsia-400">
												Full Stack Developer
											</p>
											<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
												Open to freelance projects, full-time roles, and
												collaboration on products that matter.
											</p>
										</div>

										<div className="mt-5 border-t border-slate-200/80 pt-5 dark:border-white/10">
											<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
												Connect
											</p>
											<div className="mt-3 flex flex-wrap gap-2.5">
												{connectLinks.map(({ href, label, icon: Icon, accent }) => (
													<a
														key={label}
														href={href}
														target={href.startsWith("http") ? "_blank" : undefined}
														rel={href.startsWith("http") ? "noreferrer" : undefined}
														className={`contact-social-link flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 text-slate-700 shadow-sm transition dark:border-white/15 dark:bg-slate-950/60 dark:text-slate-200 ${accent}`}
														aria-label={label}
													>
														<Icon className="text-lg" aria-hidden />
													</a>
												))}
											</div>
											<a
												href={CV_PATH}
												download={CV_DOWNLOAD_NAME}
												className="contact-cv-btn unstyled mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 dark:shadow-violet-900/35"
											>
												Download CV
												<HiDownload className="text-lg" aria-hidden />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div ref={formRef} className="contact-form-panel lg:col-span-3">
							<div className="contact-form-reveal overflow-hidden rounded-2xl">
								<div className="contact-form-inner relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark">
									<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
									<div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-fuchsia-400/50" />
									<div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-cyan-400/50" />

									<div className="border-b border-slate-200/80 px-6 py-4 dark:border-white/10 md:px-8">
										<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fuchsia-600 dark:text-fuchsia-400">
											Message uplink
										</p>
										<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
											All fields route to my inbox — typical reply within 24–48h.
										</p>
									</div>

									<form
										action="https://formspree.io/f/mjgpgqjd"
										method="POST"
										className="p-6 md:p-8"
									>
										<div className="grid w-full gap-4 md:grid-cols-2">
											<div className="contact-field-group flex flex-col">
												<label
													htmlFor="contact-name"
													className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-700/90 dark:text-cyan-400/90"
												>
													Name
												</label>
												<input
													id="contact-name"
													className={fieldClass}
													type="text"
													name="name"
													autoComplete="name"
													required
												/>
											</div>
											<div className="contact-field-group flex flex-col">
												<label
													htmlFor="contact-phone"
													className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-700/90 dark:text-cyan-400/90"
												>
													Phone
												</label>
												<input
													id="contact-phone"
													className={fieldClass}
													type="tel"
													name="phone"
													autoComplete="tel"
												/>
											</div>
										</div>

										<div className="contact-field-group mt-4 flex flex-col">
											<label
												htmlFor="contact-email"
												className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-700/90 dark:text-cyan-400/90"
											>
												Email
											</label>
											<input
												id="contact-email"
												className={fieldClass}
												type="email"
												name="email"
												autoComplete="email"
												required
											/>
										</div>

										<div className="contact-field-group mt-4 flex flex-col">
											<label
												htmlFor="contact-subject"
												className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-700/90 dark:text-cyan-400/90"
											>
												Subject
											</label>
											<input
												id="contact-subject"
												className={fieldClass}
												type="text"
												name="subject"
												placeholder="Freelance · Full-time · Collaboration"
												required
											/>
										</div>

										<div className="contact-field-group mt-4 flex flex-col">
											<label
												htmlFor="contact-message"
												className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-700/90 dark:text-cyan-400/90"
											>
												Message
											</label>
											<textarea
												id="contact-message"
												className={`${fieldClass} min-h-[10rem] resize-y`}
												rows={8}
												name="message"
												placeholder="Tell me about your project, role, or idea…"
												required
											/>
										</div>

										<button
											type="submit"
											className="contact-submit-btn unstyled mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-600 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 dark:shadow-violet-900/40"
										>
											Send message
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="contact-back-top mt-12 flex flex-col items-center gap-4 md:mt-14">
					<Link
						href="/#home"
						className="flex items-center justify-center rounded-full border border-slate-200/90 bg-white/90 p-4 shadow-md transition hover:border-cyan-400/45 hover:shadow-glow dark:border-white/12 dark:bg-slate-900/70 dark:hover:border-fuchsia-400/35"
						aria-label="Back to top"
					>
						<HiOutlineChevronDoubleUp
							className="text-2xl text-cyan-600 dark:text-cyan-400"
							size={28}
							aria-hidden
						/>
					</Link>
					<p className="contact-footer-cue font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
						End of line · back to top
					</p>
				</div>
			</div>
		</section>
	);
};

export default Contact;
