import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheck, FaPlay, FaTimes } from "react-icons/fa";

import myCourse from "../public/assets/my-course.png";

const cardSpring = { type: "spring", stiffness: 300, damping: 28 };

const features = [
	"Learn modern web development techniques",
	"Hands-on projects and real-world applications",
	"24/7 support and community access",
];

const MODULE_MARKS = [
	{ id: "01", label: "HTML" },
	{ id: "02", label: "CSS" },
	{ id: "03", label: "JS" },
	{ id: "04", label: "Layout" },
	{ id: "05", label: "Responsive" },
	{ id: "06", label: "Deploy" },
	{ id: "07", label: "Projects" },
	{ id: "08", label: "Ship" },
];

const VideoModal = ({ isOpen, onClose }) => {
	const videoUrl = "/assets/my-course-video.mp4";

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/90 p-4 backdrop-blur-md"
					onClick={onClose}
					role="presentation"
				>
					<motion.div
						initial={{ scale: 0.92, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.92, opacity: 0 }}
						transition={cardSpring}
						className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-950/90 shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)] ring-1 ring-white/10"
						onClick={(e) => e.stopPropagation()}
						aria-modal="true"
						aria-labelledby="course-video-modal-title"
					>
						<h2 id="course-video-modal-title" className="sr-only">
							Course preview video
						</h2>
						<div
							className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.06)_0%,transparent_45%,rgba(139,92,246,0.06)_100%)]"
							aria-hidden
						/>
						<button
							type="button"
							onClick={onClose}
							className="absolute right-3 top-3 z-10 rounded-full border border-white/15 bg-white/10 p-2.5 text-white backdrop-blur-md transition hover:border-fuchsia-400/40 hover:bg-white/15"
							aria-label="Close video"
						>
							<FaTimes className="text-lg" aria-hidden />
						</button>

						<div className="relative pt-[56.25%]">
							<iframe
								src={videoUrl}
								title="Muyalogy course preview"
								className="absolute inset-0 h-full w-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const CoursePromo = () => {
	const reduceMotion = useReducedMotion();
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const theatreRef = useRef(null);
	const videoStageRef = useRef(null);
	const panelRef = useRef(null);
	const spineFillRef = useRef(null);
	const signalDotRef = useRef(null);
	const scanBeamRef = useRef(null);
	const orbVioletRef = useRef(null);
	const orbCyanRef = useRef(null);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(".course-header-block", {
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

			gsap.from(".course-stat-chip", {
				y: 24,
				opacity: 0,
				scale: 0.92,
				stagger: 0.08,
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
							start: "top 72%",
							end: "bottom 28%",
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
							start: "top 70%",
							end: "bottom 32%",
							scrub: 0.55,
						},
					}
				);
			}

			theatreRef.current?.querySelectorAll(".course-module-mark").forEach((mark, i) => {
				gsap.from(mark, {
					x: -28,
					opacity: 0,
					scale: 0.85,
					duration: 0.55,
					delay: i * 0.03,
					ease: "back.out(1.5)",
					scrollTrigger: {
						trigger: mark,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			const videoReveal = videoStageRef.current?.querySelector(".course-video-reveal");
			const videoInner = videoStageRef.current?.querySelector(".course-video-inner");
			const videoMedia = videoStageRef.current?.querySelector(".course-video-media");

			if (videoReveal) {
				gsap.fromTo(
					videoReveal,
					{ clipPath: "inset(0 100% 0 0 round 18px)", opacity: 0.45 },
					{
						clipPath: "inset(0 0% 0 0 round 18px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: videoStageRef.current,
							start: "top 88%",
							end: "top 52%",
							scrub: 0.68,
						},
					}
				);
			}

			if (videoInner) {
				gsap.fromTo(
					videoInner,
					{ rotateY: 18, x: -48, scale: 0.92 },
					{
						rotateY: 0,
						x: 0,
						scale: 1,
						ease: "power2.out",
						transformOrigin: "100% 50%",
						scrollTrigger: {
							trigger: videoStageRef.current,
							start: "top 86%",
							end: "top 50%",
							scrub: 0.65,
						},
					}
				);
			}

			if (scanBeamRef.current && videoStageRef.current) {
				gsap.fromTo(
					scanBeamRef.current,
					{ top: "-6%", opacity: 0.15 },
					{
						top: "106%",
						opacity: 0.85,
						ease: "none",
						scrollTrigger: {
							trigger: videoStageRef.current,
							start: "top 80%",
							end: "top 42%",
							scrub: 0.72,
						},
					}
				);
			}

			if (videoMedia) {
				gsap.fromTo(
					videoMedia,
					{ y: "-6%", scale: 1.05 },
					{
						y: "6%",
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: videoStageRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					}
				);
			}

			const panelReveal = panelRef.current?.querySelector(".course-panel-reveal");
			const panelInner = panelRef.current?.querySelector(".course-panel-inner");

			if (panelReveal) {
				gsap.fromTo(
					panelReveal,
					{ clipPath: "inset(0 0 0 100% round 18px)", opacity: 0.5 },
					{
						clipPath: "inset(0 0 0 0% round 18px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: panelRef.current,
							start: "top 86%",
							end: "top 54%",
							scrub: 0.64,
						},
					}
				);
			}

			if (panelInner) {
				gsap.fromTo(
					panelInner,
					{ x: 56, rotateY: -14 },
					{
						x: 0,
						rotateY: 0,
						ease: "power2.out",
						transformOrigin: "0% 50%",
						scrollTrigger: {
							trigger: panelRef.current,
							start: "top 84%",
							end: "top 52%",
							scrub: 0.62,
						},
					}
				);
			}

			panelRef.current?.querySelectorAll(".course-feature-item").forEach((item, i) => {
				gsap.from(item, {
					x: 36,
					opacity: 0,
					duration: 0.6,
					delay: i * 0.05,
					ease: "power3.out",
					scrollTrigger: {
						trigger: item,
						start: "top 88%",
						toggleActions: "play none none reverse",
					},
				});
			});

			gsap.from(".course-cta-btn", {
				y: 28,
				opacity: 0,
				scale: 0.94,
				stagger: 0.08,
				duration: 0.65,
				ease: "back.out(1.35)",
				scrollTrigger: {
					trigger: panelRef.current,
					start: "top 68%",
					toggleActions: "play none none reverse",
				},
			});

			const watermark = sectionRef.current?.querySelector(".course-bg-watermark");
			if (watermark) {
				gsap.fromTo(
					watermark,
					{ x: 80, opacity: 0.02 },
					{
						x: -40,
						opacity: 0.07,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 80%",
							end: "bottom 20%",
							scrub: 0.5,
						},
					}
				);
			}

			if (orbVioletRef.current) {
				gsap.fromTo(
					orbVioletRef.current,
					{ y: 40, x: -20 },
					{
						y: -60,
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
					{ y: -30, x: 20 },
					{
						y: 50,
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

			gsap.from(".course-footer-cue", {
				y: 14,
				opacity: 0,
				duration: 0.55,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "bottom 88%",
					toggleActions: "play none none reverse",
				},
			});
		}, sectionRef);

		return () => ctx.revert();
	}, [reduceMotion]);

	return (
		<section
			id="muyalogy-course"
			ref={sectionRef}
			className="course-promo-section relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.2]"
				aria-hidden
			/>
			<div
				ref={orbVioletRef}
				className="pointer-events-none absolute left-1/4 top-0 h-[min(85vw,480px)] w-[min(85vw,480px)] -translate-y-1/3 rounded-full bg-violet-500/15 blur-[120px] dark:bg-violet-500/18"
				aria-hidden
			/>
			<div
				ref={orbCyanRef}
				className="pointer-events-none absolute bottom-0 right-0 h-[min(70vw,400px)] w-[min(70vw,400px)] translate-y-1/4 rounded-full bg-cyan-500/12 blur-[100px] dark:bg-cyan-400/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent dark:via-cyan-400/35"
				aria-hidden
			/>
			<p
				className="course-bg-watermark pointer-events-none absolute right-[4%] top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(5rem,16vw,11rem)] font-bold leading-none text-slate-900/[0.04] dark:text-white/[0.035]"
				aria-hidden
			>
				LEARN
			</p>

			<div className="relative z-10 mx-auto max-w-6xl">
				<div
					ref={headerRef}
					className="course-header-block mx-auto mb-10 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-12 md:pb-12"
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-violet-500 to-cyan-400"
								aria-hidden
							/>
							Education
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ Muyalogy
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl lg:text-[2.65rem]">
						Learn Web Dev{" "}
						<span className="text-gradient-future">with Me</span> on Muyalogy
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
						Structured lessons, real projects, and the same patterns I ship in
						production — from fundamentals to deployable apps.
					</p>

					<div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2.5">
						{[
							{ label: "Modules", value: "8" },
							{ label: "Activities", value: "43" },
							{ label: "Language", value: "Amharic" },
						].map(({ label, value }) => (
							<div
								key={label}
								className="course-stat-chip rounded-xl border border-slate-200/80 bg-white/60 px-3 py-2.5 dark:border-white/10 dark:bg-slate-950/40"
							>
								<p className="font-mono text-[9px] tracking-[0.18em] text-violet-600 dark:text-violet-400">
									{label}
								</p>
								<p className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
									{value}
								</p>
							</div>
						))}
					</div>
				</div>

				<div
					ref={theatreRef}
					className="course-theatre relative grid items-center gap-8 lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[4rem_minmax(0,1fr)]"
				>
					<div
						className="course-spine-wrap relative hidden min-h-[280px] lg:block"
						aria-hidden
					>
						<div className="course-spine absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-slate-300/70 dark:bg-white/10" />
						<div
							ref={spineFillRef}
							className="course-spine-fill absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-violet-400 via-cyan-400 to-fuchsia-400"
						/>
						<div
							ref={signalDotRef}
							className="course-signal-dot pointer-events-none absolute left-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-slate-900 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.75)] dark:border-slate-950"
						/>
						{MODULE_MARKS.map((mod, i) => (
							<div
								key={mod.id}
								className="course-module-mark absolute left-0 flex w-full items-center gap-2"
								style={{ top: `${8 + i * 11.5}%` }}
							>
								<span className="font-mono text-[9px] font-semibold text-violet-600/80 dark:text-violet-400/80">
									{mod.id}
								</span>
								<span className="h-px flex-1 bg-gradient-to-r from-violet-400/40 to-transparent" />
							</div>
						))}
					</div>

					<div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
						<div ref={videoStageRef} className="course-video-stage relative [perspective:1200px]">
							<div
								className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 opacity-80 blur-sm"
								aria-hidden
							/>
							<div className="course-video-reveal relative overflow-hidden rounded-2xl">
								<div className="course-video-inner relative [transform-style:preserve-3d]">
									<button
										type="button"
										className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.45)] ring-1 ring-cyan-500/10 dark:bg-slate-950/50"
										onClick={() => setIsVideoModalOpen(true)}
									>
										<div className="course-video-media relative h-[200px] w-full md:h-[400px]">
											<Image
												src={myCourse}
												alt="Muyalogy course preview"
												layout="fill"
												objectFit="contain"
												className="transition duration-500 group-hover:scale-[1.03]"
											/>
										</div>
										<div
											ref={scanBeamRef}
											className="course-scan-beam pointer-events-none absolute inset-x-0 z-[2] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 shadow-[0_0_24px_rgba(34,211,238,0.85)]"
											aria-hidden
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent">
											<div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950/60 shadow-[0_0_40px_rgba(34,211,238,0.35)] backdrop-blur-md transition duration-300 group-hover:scale-105">
												<div
													className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/25 opacity-80"
													aria-hidden
												/>
												<FaPlay
													className="relative z-10 ml-1 text-xl text-white drop-shadow-lg"
													aria-hidden
												/>
											</div>
										</div>
										<span className="sr-only">Open course video preview</span>
									</button>
								</div>
							</div>
						</div>

						<div ref={panelRef} className="course-panel-stage relative [perspective:1200px]">
							<div className="course-panel-reveal overflow-hidden rounded-2xl">
								<div className="course-panel-inner relative rounded-2xl border border-slate-200/80 bg-white/50 p-6 shadow-card-light backdrop-blur-xl [transform-style:preserve-3d] dark:border-white/10 dark:bg-slate-900/45 dark:shadow-card-dark md:p-8">
									<div
										className="pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-tr-lg border-r border-t border-cyan-400/35 opacity-70"
										aria-hidden
									/>
									<div
										className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 rounded-bl-lg border-b border-l border-fuchsia-400/35 opacity-70"
										aria-hidden
									/>

									<p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-600/80 dark:text-violet-400/80">
										Course highlights
									</p>

									<ul className="mt-4 space-y-4">
										{features.map((line) => (
											<li
												key={line}
												className="course-feature-item flex gap-3 text-slate-700 dark:text-slate-200"
											>
												<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
													<FaCheck className="h-3 w-3" aria-hidden />
												</span>
												<span className="leading-relaxed">{line}</span>
											</li>
										))}
									</ul>

									<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
										<Link
											href="https://www.muyalogy.com/course/1bcd4432-4f5e-4984-8572-c90648d637bb"
											target="_blank"
											rel="noreferrer"
											className="course-cta-btn unstyled inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-600 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 sm:flex-none"
										>
											Enroll now
										</Link>
										<Link
											href="https://www.muyalogy.com/instructor/261acd41-cf81-465a-9c4f-5fad10d5e7fe"
											target="_blank"
											rel="noreferrer"
											className="course-cta-btn unstyled inline-flex flex-1 items-center justify-center rounded-full border-2 border-slate-300/90 bg-white/80 px-8 py-3.5 text-center text-sm font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-cyan-500/45 hover:text-cyan-700 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-fuchsia-400/40 dark:hover:text-fuchsia-200 sm:flex-none"
										>
											All my courses
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<p className="course-footer-cue mt-12 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
					Scroll-driven curriculum preview · tap to watch intro
				</p>
			</div>

			<VideoModal
				isOpen={isVideoModalOpen}
				onClose={() => setIsVideoModalOpen(false)}
			/>
		</section>
	);
};

export default CoursePromo;
