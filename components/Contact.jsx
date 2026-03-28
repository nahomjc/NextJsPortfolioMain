import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp, HiDownload } from "react-icons/hi";
import { motion } from "framer-motion";

const cardSpring = { type: "spring", stiffness: 300, damping: 28 };

const fieldClass =
	"rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500/55 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.15)] dark:border-white/12 dark:bg-slate-950/55 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-fuchsia-400/45 dark:focus:shadow-[0_0_0_3px_rgba(232,121,249,0.12)]";

const Contact = () => {
	return (
		<div
			id="contact"
			className="relative w-full scroll-mt-24 overflow-hidden px-4 py-16 lg:min-h-screen lg:py-24"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.26] dark:opacity-[0.18]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute right-0 top-1/4 h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-cyan-400/10 blur-[110px] dark:bg-cyan-500/12"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-1/4 left-0 h-[min(80vw,440px)] w-[min(80vw,440px)] rounded-full bg-fuchsia-500/10 blur-[100px] dark:bg-fuchsia-500/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent dark:via-fuchsia-400/25"
				aria-hidden
			/>

			<div className="relative z-10 m-auto w-full max-w-[1240px]">
				<motion.div
					initial={{ opacity: 0, y: 14 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={cardSpring}
				>
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div>
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
							<h2 className="mt-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text py-1 font-display text-3xl text-transparent dark:from-white dark:via-slate-100 dark:to-white md:text-4xl">
								Get in touch
							</h2>
						</div>
						<p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
							Freelance, full-time, or collaboration — drop a message and
							I&apos;ll respond as soon as I can.
						</p>
					</div>
				</motion.div>

				<div className="mt-12 grid gap-8 lg:grid-cols-5">
					<motion.div
						className="relative col-span-3 w-full lg:col-span-2"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ ...cardSpring, delay: 0.05 }}
					>
						<div
							className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-500/15 via-transparent to-fuchsia-500/15 opacity-90 blur-sm"
							aria-hidden
						/>
						<div className="glass-panel relative overflow-hidden rounded-2xl p-5 ring-1 ring-cyan-500/10 dark:ring-white/10">
							<div
								className="pointer-events-none absolute right-3 top-3 h-10 w-10 rounded-tr-xl border-r border-t border-cyan-400/25"
								aria-hidden
							/>
							<div
								className="pointer-events-none absolute bottom-3 left-3 h-10 w-10 rounded-bl-xl border-b border-l border-fuchsia-400/25"
								aria-hidden
							/>
							<div className="relative lg:p-2">
								<div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl ring-1 ring-white/15 shadow-2xl shadow-slate-900/20 dark:shadow-black/40">
									<div
										className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-slate-900/25 via-transparent to-cyan-500/5"
										aria-hidden
									/>
									<Image
										className="object-cover transition duration-500 hover:scale-[1.02]"
										src="/assets/contact-me.jpg"
										alt="Nahom Tesfaye"
										layout="fill"
										objectFit="cover"
									/>
								</div>
								<div className="pt-6">
									<h3 className="font-display text-2xl text-slate-900 dark:text-white">
										Nahom Tesfaye
									</h3>
									<p className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text font-semibold text-transparent dark:from-cyan-400 dark:to-fuchsia-400">
										Full Stack Developer
									</p>
									<p className="py-4 leading-relaxed text-slate-600 dark:text-slate-400">
										I am available for freelance or full-time positions.
										Contact me and let&apos;s talk.
									</p>
								</div>
								<div>
									<p className="pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
										Connect
									</p>
									<div className="flex flex-wrap items-center gap-3 py-4">
										<a
											href="https://www.linkedin.com/in/nahom-tesfaye-35b97420b/"
											target="_blank"
											rel="noreferrer"
											className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-700 shadow-md transition hover:border-cyan-400/50 hover:text-cyan-600 hover:shadow-glow dark:border-white/15 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-fuchsia-400/40 dark:hover:text-fuchsia-300"
											aria-label="LinkedIn"
										>
											<FaLinkedinIn className="text-xl" />
										</a>
										<a
											href="https://github.com/nahomjc"
											target="_blank"
											rel="noreferrer"
											className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-700 shadow-md transition hover:border-cyan-400/50 hover:text-cyan-600 hover:shadow-glow dark:border-white/15 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-fuchsia-400/40 dark:hover:text-fuchsia-300"
											aria-label="GitHub"
										>
											<FaGithub className="text-xl" />
										</a>
										<Link
											href="/#contact"
											className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-700 shadow-md transition hover:border-cyan-400/50 hover:text-cyan-600 hover:shadow-glow dark:border-white/15 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-fuchsia-400/40 dark:hover:text-fuchsia-300"
											aria-label="Email form"
										>
											<AiOutlineMail className="text-xl" />
										</Link>
										<Link
											href="/resume"
											className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-700 shadow-md transition hover:border-cyan-400/50 hover:text-cyan-600 hover:shadow-glow dark:border-white/15 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-fuchsia-400/40 dark:hover:text-fuchsia-300"
											aria-label="Resume"
										>
											<BsFillPersonLinesFill className="text-xl" />
										</Link>
									</div>
									<a
										href="/assets/nahom_original.pdf"
										download="nahom_original.pdf"
										className="unstyled mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-600 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 dark:shadow-violet-900/35"
									>
										Download CV <HiDownload className="text-lg" aria-hidden />
									</a>
								</div>
							</div>
						</div>
					</motion.div>

					<motion.div
						className="relative col-span-3 w-full"
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{ ...cardSpring, delay: 0.1 }}
					>
						<div
							className="absolute -inset-px rounded-2xl bg-gradient-to-bl from-fuchsia-500/12 via-transparent to-cyan-500/12 opacity-80 blur-sm"
							aria-hidden
						/>
						<div className="glass-panel relative rounded-2xl p-4 ring-1 ring-fuchsia-500/10 dark:ring-white/10 md:p-6 lg:p-8">
							<div
								className="pointer-events-none absolute right-4 top-4 h-9 w-20 rounded border border-white/10 bg-gradient-to-l from-cyan-500/10 to-transparent"
								aria-hidden
							/>
							<form
								action="https://formspree.io/f/mjgpgqjd"
								method="POST"
								className="p-2 md:p-4"
							>
								<div className="grid w-full gap-4 py-2 md:grid-cols-2">
									<div className="flex flex-col">
										<label
											htmlFor="contact-name"
											className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700/90 dark:text-cyan-400/90"
										>
											Name
										</label>
										<input
											id="contact-name"
											className={fieldClass}
											type="text"
											name="name"
											autoComplete="name"
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor="contact-phone"
											className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700/90 dark:text-cyan-400/90"
										>
											Phone
										</label>
										<input
											id="contact-phone"
											className={fieldClass}
											type="text"
											name="phone"
											autoComplete="tel"
										/>
									</div>
								</div>
								<div className="flex flex-col py-2">
									<label
										htmlFor="contact-email"
										className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700/90 dark:text-cyan-400/90"
									>
										Email
									</label>
									<input
										id="contact-email"
										className={fieldClass}
										type="email"
										name="email"
										autoComplete="email"
									/>
								</div>
								<div className="flex flex-col py-2">
									<label
										htmlFor="contact-subject"
										className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700/90 dark:text-cyan-400/90"
									>
										Subject
									</label>
									<input
										id="contact-subject"
										className={fieldClass}
										type="text"
										name="subject"
									/>
								</div>
								<div className="flex flex-col py-2">
									<label
										htmlFor="contact-message"
										className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-700/90 dark:text-cyan-400/90"
									>
										Message
									</label>
									<textarea
										id="contact-message"
										className={`${fieldClass} min-h-[10rem]`}
										rows={8}
										name="message"
									/>
								</div>
								<button
									type="submit"
									className="unstyled mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-600 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-violet-500/25 transition hover:brightness-110 dark:shadow-violet-900/40"
								>
									Send message
								</button>
							</form>
						</div>
					</motion.div>
				</div>

				<div className="flex justify-center py-12">
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
				</div>
			</div>
		</div>
	);
};

export default Contact;
