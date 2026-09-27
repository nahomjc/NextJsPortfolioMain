import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck, FaPlay, FaTimes } from "react-icons/fa";
import myCourse from "../public/assets/my-course.png";
import SectionShell, {
	monoMetaClass,
	btnPrimary,
	btnGhost,
} from "./section/SectionShell";

const features = [
	"Modern web development techniques",
	"Hands-on projects and real-world apps",
	"Community access and ongoing support",
];

const MODULES = ["HTML", "CSS", "JS", "Layout", "Responsive", "Deploy", "Projects", "Ship"];

const COURSE_URL =
	"https://www.muyalogy.com/course/1bcd4432-4f5e-4984-8572-c90648d637bb";
const INSTRUCTOR_URL =
	"https://www.muyalogy.com/instructor/261acd41-cf81-465a-9c4f-5fad10d5e7fe";

function VideoModal({ isOpen, onClose }) {
	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
					onClick={onClose}
					role="presentation"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.97 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.97 }}
						className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950"
						onClick={(e) => e.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby="course-video-modal-title"
					>
						<h2 id="course-video-modal-title" className="sr-only">
							Course preview video
						</h2>
						<button
							type="button"
							onClick={onClose}
							className="absolute right-3 top-3 z-10 rounded-lg border border-white/15 bg-white/10 p-2 text-white"
							aria-label="Close video"
						>
							<FaTimes aria-hidden />
						</button>
						<div className="relative pt-[56.25%]">
							<iframe
								src="/assets/my-course-video.mp4"
								title="Muyalogy course preview"
								className="absolute inset-0 h-full w-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}

const CoursePromo = () => {
	const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

	return (
		<>
			<SectionShell
				id="muyalogy-course"
				index="07"
				eyebrow="course.am"
				title="Teach the web in Amharic"
				description="A practical Muyalogy course from HTML through deploy, built for Ethiopian learners."
			>
				<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
					<button
						type="button"
						onClick={() => setIsVideoModalOpen(true)}
						className="eng-project-card unstyled group relative text-left"
					>
						<div className="eng-project-card__media !aspect-video">
							<Image
								src={myCourse}
								alt="Muyalogy web development course preview"
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
							<div className="eng-project-card__shade !opacity-60" aria-hidden />
							<span className="absolute inset-0 flex items-center justify-center">
								<span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-cyan-400/90 text-slate-950 shadow-[0_0_40px_-8px_rgba(34,211,238,0.8)] transition group-hover:scale-105">
									<FaPlay className="ml-1" aria-hidden />
								</span>
							</span>
						</div>
						<span
							className={`${monoMetaClass} absolute left-4 top-4 rounded-md border border-white/20 bg-slate-950/50 px-2 py-1 text-cyan-200`}
						>
							Preview
						</span>
					</button>

					<div>
						<ul className="space-y-3.5">
							{features.map((feature) => (
								<li
									key={feature}
									className="flex items-start gap-3 text-[15px] text-slate-700 dark:text-slate-300"
								>
									<span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
										<FaCheck className="text-[10px]" aria-hidden />
									</span>
									{feature}
								</li>
							))}
						</ul>
						<div className="mt-7 flex flex-wrap gap-2">
							{MODULES.map((mod) => (
								<span
									key={mod}
									className="rounded-md border border-slate-900/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-600 dark:border-white/10 dark:text-slate-400"
								>
									{mod}
								</span>
							))}
						</div>
						<div className="mt-9 flex flex-wrap items-center gap-4">
							<a
								href={COURSE_URL}
								target="_blank"
								rel="noopener noreferrer"
								className={btnPrimary}
							>
								Enroll on Muyalogy
							</a>
							<Link
								href={INSTRUCTOR_URL}
								target="_blank"
								rel="noopener noreferrer"
								className={btnGhost}
							>
								Instructor profile →
							</Link>
						</div>
					</div>
				</div>
			</SectionShell>
			<VideoModal
				isOpen={isVideoModalOpen}
				onClose={() => setIsVideoModalOpen(false)}
			/>
		</>
	);
};

export default CoursePromo;
