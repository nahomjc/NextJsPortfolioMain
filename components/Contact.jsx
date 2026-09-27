import Image from "next/image";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineChevronDoubleUp, HiDownload } from "react-icons/hi";
import { CV_DOWNLOAD_NAME, CV_PATH } from "../lib/seo";
import SectionShell, {
	panelClass,
	monoMetaClass,
	ctaClass,
} from "./section/SectionShell";

const LINKEDIN = "https://www.linkedin.com/in/nahom-tesfaye-35b97420b/";
const GITHUB = "https://github.com/nahomjc";

const fieldClass =
	"w-full rounded-xl border border-slate-900/10 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/15 dark:border-white/12 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-cyan-400/40";

const connectLinks = [
	{ href: LINKEDIN, label: "LinkedIn", icon: FaLinkedinIn },
	{ href: GITHUB, label: "GitHub", icon: FaGithub },
	{ href: "#contact", label: "Email", icon: AiOutlineMail },
	{ href: "/resume", label: "Resume", icon: BsFillPersonLinesFill },
];

const Contact = () => {
	return (
		<SectionShell
			id="contact"
			index="10"
			eyebrow="contact.open"
			title="Let's build something"
			description="Freelance, full-time, or collaboration. Send a note and I'll get back within a day or two."
		>
			<div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
				<aside className="overflow-hidden rounded-2xl border border-slate-900/10 dark:border-white/10 lg:col-span-2">
					<div className="relative aspect-[4/5] w-full bg-slate-950">
						<Image
							className="object-cover"
							src="/assets/contact-me.jpg"
							alt="Nahom Tesfaye"
							fill
							sizes="(max-width: 1024px) 100vw, 384px"
						/>
						<div
							className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"
							aria-hidden
						/>
						<div className="absolute inset-x-0 bottom-0 p-6">
							<p className={`${monoMetaClass} text-cyan-300`}>Available</p>
							<p className="mt-1 text-xl font-semibold text-white">Nahom Tesfaye</p>
							<p className="mt-1 text-sm text-slate-300">Full Stack Developer</p>
						</div>
					</div>
					<div className="border-t border-slate-900/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
						<p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
							Open to freelance projects, full-time roles, and collaboration on
							products that matter.
						</p>
						<p className={`${monoMetaClass} mt-5`}>Connect</p>
						<div className="mt-3 flex flex-wrap gap-2.5">
							{connectLinks.map(({ href, label, icon: Icon }) => (
								<a
									key={label}
									href={href}
									target={href.startsWith("http") ? "_blank" : undefined}
									rel={href.startsWith("http") ? "noreferrer" : undefined}
									className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/10 text-slate-700 transition hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/12 dark:text-slate-200 dark:hover:text-cyan-300"
									aria-label={label}
								>
									<Icon className="text-lg" aria-hidden />
								</a>
							))}
						</div>
						<a
							href={CV_PATH}
							download={CV_DOWNLOAD_NAME}
							className={`${ctaClass} mt-5 w-full`}
						>
							Download CV
							<HiDownload className="text-lg" aria-hidden />
						</a>
					</div>
				</aside>

				<div className={`${panelClass} lg:col-span-3`}>
					<div className="border-b border-slate-900/10 px-6 py-5 dark:border-white/10">
						<p className={`${monoMetaClass} text-cyan-700 dark:text-cyan-400`}>
							New message
						</p>
						<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
							Typical reply within 24 to 48h.
						</p>
					</div>
					<form
						action="https://formspree.io/f/mjgpgqjd"
						method="POST"
						className="grid gap-4 p-6 md:grid-cols-2"
					>
						<div className="flex flex-col">
							<label htmlFor="contact-name" className={`${monoMetaClass} mb-2`}>
								Name
							</label>
							<input
								id="contact-name"
								name="name"
								type="text"
								required
								className={fieldClass}
								placeholder="Your name"
							/>
						</div>
						<div className="flex flex-col">
							<label htmlFor="contact-phone" className={`${monoMetaClass} mb-2`}>
								Phone
							</label>
							<input
								id="contact-phone"
								name="phone"
								type="tel"
								className={fieldClass}
								placeholder="Optional"
							/>
						</div>
						<div className="flex flex-col md:col-span-2">
							<label htmlFor="contact-email" className={`${monoMetaClass} mb-2`}>
								Email
							</label>
							<input
								id="contact-email"
								name="email"
								type="email"
								required
								className={fieldClass}
								placeholder="you@example.com"
							/>
						</div>
						<div className="flex flex-col md:col-span-2">
							<label htmlFor="contact-subject" className={`${monoMetaClass} mb-2`}>
								Subject
							</label>
							<input
								id="contact-subject"
								name="subject"
								type="text"
								className={fieldClass}
								placeholder="What is this about?"
							/>
						</div>
						<div className="flex flex-col md:col-span-2">
							<label htmlFor="contact-message" className={`${monoMetaClass} mb-2`}>
								Message
							</label>
							<textarea
								id="contact-message"
								name="message"
								rows={5}
								required
								className={fieldClass}
								placeholder="Tell me about the project or role…"
							/>
						</div>
						<div className="md:col-span-2">
							<button type="submit" className={`${ctaClass} w-full sm:w-auto`}>
								Send message
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="mt-16 flex justify-center">
				<a
					href="#home"
					className="inline-flex flex-col items-center gap-1.5 text-slate-500 transition hover:text-cyan-600 dark:hover:text-cyan-400"
					aria-label="Back to top"
				>
					<HiOutlineChevronDoubleUp className="text-xl" aria-hidden />
					<span className={monoMetaClass}>Top</span>
				</a>
			</div>
		</SectionShell>
	);
};

export default Contact;
