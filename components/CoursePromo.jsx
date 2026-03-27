import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaPlay, FaTimes } from "react-icons/fa";
import myCourse from "../public/assets/my-course.png";

const cardSpring = { type: "spring", stiffness: 300, damping: 28 };

const features = [
	"Learn modern web development techniques",
	"Hands-on projects and real-world applications",
	"24/7 support and community access",
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
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	return (
		<section
			id="muyalogy-course"
			className="relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.2]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute left-1/4 top-0 h-[min(85vw,480px)] w-[min(85vw,480px)] -translate-y-1/3 rounded-full bg-violet-500/15 blur-[120px] dark:bg-violet-500/18"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-0 right-0 h-[min(70vw,400px)] w-[min(70vw,400px)] translate-y-1/4 rounded-full bg-cyan-500/12 blur-[100px] dark:bg-cyan-400/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent dark:via-cyan-400/35"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-6xl">
				<motion.div
					className="mx-auto mb-12 max-w-3xl text-center md:mb-14"
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={cardSpring}
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
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl">
						Learn Web Dev{" "}
						<span className="text-gradient-future">with Me</span> on Muyalogy
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
						Structured lessons, real projects, and the same patterns I ship in
						production — from fundamentals to deployable apps.
					</p>
				</motion.div>

				<div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
					<motion.div
						initial={{ opacity: 0, x: -18 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ ...cardSpring, delay: 0.05 }}
						className="relative"
					>
						<div
							className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 opacity-80 blur-sm"
							aria-hidden
						/>
						<button
							type="button"
							className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-slate-900/40 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.45)] ring-1 ring-cyan-500/10 dark:bg-slate-950/50"
							onClick={() => setIsVideoModalOpen(true)}
						>
							<div className="relative h-[200px] md:h-[400px] w-full">
								<Image
									src={myCourse}
									alt="Muyalogy course preview"
									layout="fill"
									objectFit="contain"
									className="transition duration-500 group-hover:scale-[1.03]"
								/>
							</div>
							<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent">
								<motion.div
									whileHover={{ scale: 1.06 }}
									whileTap={{ scale: 0.96 }}
									className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950/60 shadow-[0_0_40px_rgba(34,211,238,0.35)] backdrop-blur-md"
								>
									<div
										className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-fuchsia-500/25 opacity-80"
										aria-hidden
									/>
									<FaPlay
										className="relative z-10 ml-1 text-xl text-white drop-shadow-lg"
										aria-hidden
									/>
								</motion.div>
							</div>
							<span className="sr-only">Open course video preview</span>
						</button>
					</motion.div>

					<motion.div
						className="relative rounded-2xl border border-slate-200/80 bg-white/50 p-6 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/45 dark:shadow-card-dark md:p-8"
						initial={{ opacity: 0, x: 18 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ ...cardSpring, delay: 0.1 }}
					>
						<div
							className="pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-tr-lg border-r border-t border-cyan-400/35 opacity-70"
							aria-hidden
						/>
						<div
							className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 rounded-bl-lg border-b border-l border-fuchsia-400/35 opacity-70"
							aria-hidden
						/>

						<ul className="space-y-4">
							{features.map((line, i) => (
								<motion.li
									key={line}
									initial={{ opacity: 0, x: 10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0.06 + i * 0.06, ...cardSpring }}
									className="flex gap-3 text-slate-700 dark:text-slate-200"
								>
									<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
										<FaCheck className="h-3 w-3" aria-hidden />
									</span>
									<span className="leading-relaxed">{line}</span>
								</motion.li>
							))}
						</ul>

						<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
							<Link
								href="https://www.muyalogy.com/course/1bcd4432-4f5e-4984-8572-c90648d637bb"
								target="_blank"
								rel="noreferrer"
								className="unstyled inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-600 px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 sm:flex-none"
							>
								Enroll now
							</Link>
							<Link
								href="https://www.muyalogy.com/instructor/261acd41-cf81-465a-9c4f-5fad10d5e7fe"
								target="_blank"
								rel="noreferrer"
								className="unstyled inline-flex flex-1 items-center justify-center rounded-full border-2 border-slate-300/90 bg-white/80 px-8 py-3.5 text-center text-sm font-semibold text-slate-800 shadow-md backdrop-blur transition hover:border-cyan-500/45 hover:text-cyan-700 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-fuchsia-400/40 dark:hover:text-fuchsia-200 sm:flex-none"
							>
								All my courses
							</Link>
						</div>
					</motion.div>
				</div>
			</div>

			<VideoModal
				isOpen={isVideoModalOpen}
				onClose={() => setIsVideoModalOpen(false)}
			/>
		</section>
	);
};

export default CoursePromo;
