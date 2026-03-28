import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PERSONAL_PROJECTS_MODAL } from "../lib/personalProjectsModalData";

const outerCorner =
	"pointer-events-none absolute z-[6] border-cyan-400/90 dark:border-cyan-400/80";
const innerCorner =
	"pointer-events-none absolute z-[6] border-fuchsia-500/50 dark:border-fuchsia-400/45";

function RoboticCorners() {
	return (
		<>
			<span
				className={`${outerCorner} left-2 top-2 h-6 w-6 border-l-2 border-t-2 sm:left-3 sm:top-3`}
				aria-hidden
			/>
			<span
				className={`${outerCorner} right-2 top-2 h-6 w-6 border-r-2 border-t-2 sm:right-3 sm:top-3`}
				aria-hidden
			/>
			<span
				className={`${outerCorner} bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 sm:bottom-3 sm:left-3`}
				aria-hidden
			/>
			<span
				className={`${outerCorner} bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 sm:bottom-3 sm:right-3`}
				aria-hidden
			/>
			<span
				className={`${innerCorner} left-3 top-3 h-4 w-4 border-l border-t sm:left-4 sm:top-4`}
				aria-hidden
			/>
			<span
				className={`${innerCorner} right-3 top-3 h-4 w-4 border-r border-t sm:right-4 sm:top-4`}
				aria-hidden
			/>
			<span
				className={`${innerCorner} bottom-3 left-3 h-4 w-4 border-b border-l sm:bottom-4 sm:left-4`}
				aria-hidden
			/>
			<span
				className={`${innerCorner} bottom-3 right-3 h-4 w-4 border-b border-r sm:bottom-4 sm:right-4`}
				aria-hidden
			/>
		</>
	);
}

function AboutWorkspaceProjectsModal({ open, onClose }) {
	const [mounted, setMounted] = useState(false);
	const [active, setActive] = useState(0);
	const reduceMotion = useReducedMotion();

	const total = PERSONAL_PROJECTS_MODAL.length;
	const current = PERSONAL_PROJECTS_MODAL[active] ?? PERSONAL_PROJECTS_MODAL[0];

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [open, onClose]);

	if (!mounted) return null;

	const idxLabel = String(active + 1).padStart(2, "0");
	const totalLabel = String(total).padStart(2, "0");

	return createPortal(
		<AnimatePresence>
			{open ? (
				<motion.div
					key="workspace-projects-modal-root"
					className="fixed inset-0 z-[260] flex items-center justify-center p-3 sm:p-5"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
				>
					{/* No dimmed backdrop — transparent dismiss hit area */}
					<button
						type="button"
						className="unstyled fixed inset-0 z-0 m-0 h-full min-h-screen w-full cursor-default border-0 bg-transparent p-0"
						aria-label="Dismiss project archive"
						onClick={onClose}
					/>

					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="workspace-projects-modal-title"
						className="relative z-10 flex w-full max-w-[min(100%,540px)] flex-col overflow-hidden border-2 border-cyan-500/55 bg-slate-950/92 shadow-[0_0_0_1px_rgba(217,70,239,0.2),0_0_60px_rgba(34,211,238,0.12),0_24px_64px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md dark:border-cyan-400/45 dark:bg-slate-950/94 sm:max-w-xl md:max-w-2xl"
						initial={
							reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 20 }
						}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={
							reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }
						}
						transition={{ type: "spring", stiffness: 420, damping: 34 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className="pointer-events-none absolute inset-0 opacity-[0.4]"
							style={{
								backgroundImage:
									"linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.05) 1px, transparent 1px)",
								backgroundSize: "14px 14px",
							}}
							aria-hidden
						/>
						{!reduceMotion ? (
							<div
								className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-24 mix-blend-screen opacity-[0.22]"
								aria-hidden
							>
								<div className="about-wsp-scan h-full w-full bg-gradient-to-b from-cyan-300/35 via-transparent to-transparent" />
							</div>
						) : null}
						<div
							className="noise-texture pointer-events-none absolute inset-0 z-[3] opacity-[0.05]"
							aria-hidden
						/>

						<RoboticCorners />

						{/* Robotic status rail */}
						<div className="relative z-[8] flex items-center justify-between gap-2 border-b border-cyan-500/35 bg-slate-950/80 px-3 py-2.5 font-mono dark:bg-black/50 sm:px-4">
							<div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
								<span
									className="relative flex h-2 w-2 shrink-0"
									aria-hidden
								>
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-60" />
									<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
								</span>
								<span className="truncate text-[9px] uppercase tracking-[0.22em] text-cyan-300/95 dark:text-cyan-400">
									SYS.PERSONAL.VAULT
								</span>
								<span className="hidden text-[9px] text-fuchsia-400/80 sm:inline">
									·
								</span>
								<span className="hidden text-[9px] uppercase tracking-[0.18em] text-slate-500 sm:inline">
									ENC-AES // LOCAL
								</span>
							</div>
							<div className="flex shrink-0 items-center gap-2 sm:gap-3">
								<span className="text-[9px] tabular-nums tracking-wider text-cyan-500/90 dark:text-cyan-400/90">
									SEQ {idxLabel}/{totalLabel}
								</span>
								<button
									type="button"
									onClick={onClose}
									className="unstyled flex h-9 w-9 shrink-0 items-center justify-center rounded border border-cyan-500/40 bg-slate-950/90 text-cyan-200 shadow-[inset_0_0_12px_rgba(34,211,238,0.08)] transition hover:border-fuchsia-400/55 hover:text-fuchsia-200 dark:border-cyan-400/35 dark:bg-black/60"
									aria-label="Close"
								>
									<AiOutlineClose className="text-lg" />
								</button>
							</div>
						</div>

						<div className="relative z-[8] border-b border-cyan-500/25 px-4 py-3 sm:px-5 sm:py-4">
							<p
								id="workspace-projects-modal-title"
								className="font-display text-lg tracking-wide text-white sm:text-xl"
							>
								<span className="text-gradient-future">DOSSIER</span>
								<span className="text-slate-400"> :: </span>
								<span className="text-slate-100">Personal builds</span>
							</p>
							<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
								Carousel view · arrow keys · swipe
							</p>
						</div>

						<div className="relative z-[8] px-2 pb-4 pt-2 sm:px-4 sm:pb-5 sm:pt-3">
							<div className="relative border border-cyan-500/30 bg-black/40 shadow-[inset_0_0_40px_rgba(34,211,238,0.04)] dark:border-cyan-400/25">
								<div
									className="pointer-events-none absolute left-2 top-2 z-[5] font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500/70"
									aria-hidden
								>
									OPTICAL.FEED
								</div>
								<Swiper
									modules={[Navigation, Pagination, Keyboard, A11y]}
									spaceBetween={0}
									slidesPerView={1}
									navigation
									pagination={{ clickable: true }}
									keyboard={{ enabled: true }}
									className="about-wsp-swiper !overflow-hidden pt-7"
									onSwiper={(sw) => setActive(sw.activeIndex)}
									onSlideChange={(sw) => setActive(sw.activeIndex)}
								>
									{PERSONAL_PROJECTS_MODAL.map((p) => (
										<SwiperSlide key={p.href}>
											<div className="px-1 pb-1 sm:px-2">
												<div className="relative aspect-[16/10] w-full overflow-hidden border border-slate-700/80 bg-slate-900">
													<Image
														src={p.image}
														alt={`${p.title} preview`}
														layout="fill"
														className="object-cover"
														sizes="(max-width: 768px) 100vw, 672px"
														priority={false}
													/>
													<div
														className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
														aria-hidden
													/>
													<div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
														<p className="font-display text-base font-bold text-white sm:text-lg">
															{p.title}
														</p>
														<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300/90">
															ROUTE // {p.href}
														</p>
													</div>
												</div>
												<p className="mt-3 px-2 font-mono text-xs leading-relaxed text-slate-400">
													{p.tech}
												</p>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>

							<div className="mt-4 flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between sm:px-1">
								<Link
									href={current.href}
									onClick={onClose}
									className="unstyled group inline-flex border border-cyan-500/50 bg-cyan-500/10 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-fuchsia-400/55 hover:bg-fuchsia-500/10 hover:text-fuchsia-100 sm:text-[11px]"
								>
									<span className="inline-flex items-center justify-center gap-2">
										<span className="text-cyan-400 transition group-hover:text-fuchsia-300">
											▶
										</span>
										Open dossier
									</span>
								</Link>
								<Link
									href="/#projects"
									onClick={onClose}
									className="unstyled text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 underline-offset-4 hover:text-cyan-400 hover:underline sm:text-right"
								>
									Full project index → #projects
								</Link>
							</div>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>,
		document.body
	);
}

export default AboutWorkspaceProjectsModal;
