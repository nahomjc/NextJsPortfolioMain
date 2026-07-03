import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scheduleScrollTriggerRefresh } from "../lib/gsapScroll";
import HudCorners from "./about/HudCorners";
import { TerminalFrame } from "./about/DeckChrome";
import {
	FaDownload,
	FaExternalLinkAlt,
	FaSearch,
	FaTimes,
} from "react-icons/fa";

const certificates = [
	{
		id: 1,
		title: "Meta Advanced React Certification",
		issuer: "Meta (Facebook)",
		date: "2022",
		image: "/assets/certificate2.jpg",
		skills: ["React.js", "Advanced Patterns", "Performance Optimization"],
		verificationLink: "your-verification-link",
		description:
			"Advanced certification in React.js development from Meta, covering modern React patterns and best practices.",
		category: "Frontend Development",
		downloadLink: "/assets/cert1%20(2).pdf",
	},
	{
		id: 2,
		title: "UN Data Science Certificate",
		issuer: "United Nations",
		date: "2020",
		image: "/assets/certificate3.jpg",
		skills: ["Data Analysis", "Machine Learning", "Statistics"],
		verificationLink: "your-verification-link",
		description:
			"Comprehensive data science certification from the United Nations, focusing on data analysis and machine learning.",
		category: "Data Science",
		downloadLink: "/assets/cert1%20(3).pdf",
	},
	{
		id: 3,
		title: "BSc in Computer Science - Very Great Distinction",
		issuer: "Admas University",
		date: "2019",
		image: "/assets/certificate1.jpg",
		skills: [
			"Computer Science",
			"Software Engineering",
			"Programming",
			"Data Structures",
			"Algorithms",
		],
		verificationLink: "your-verification-link",
		description:
			"Graduated with Very Great Distinction, achieving a 3.9 GPA in Computer Science. The program covered comprehensive computer science fundamentals, software engineering principles, and advanced programming concepts.",
		category: "Education",
		downloadLink: "/assets/cert1%20(1).pdf",
	},
];

const categories = [...new Set(certificates.map((cert) => cert.category))];

const cardSpring = { type: "spring", stiffness: 320, damping: 30 };

function CertificateCard({ certificate, onClick, cardRef, index }) {
	const pkg = String(index + 1).padStart(2, "0");

	return (
		<button
			type="button"
			ref={cardRef}
			className="cert-card group relative w-full cursor-pointer text-left"
			onClick={onClick}
		>
			<div className="cert-card-reveal overflow-hidden rounded-2xl">
				<div className="cert-card-inner relative transition duration-300 group-hover:-translate-y-1.5">
					<div className="cert-card__aura pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-md transition duration-500 group-hover:opacity-100" aria-hidden />
					<div className="cert-card__shell relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#030712]/90 shadow-[0_0_40px_rgba(34,211,238,0.06)] transition duration-300 group-hover:border-cyan-400/45 group-hover:shadow-[0_0_32px_rgba(34,211,238,0.14)]">
						<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.06]" />
						<div className="relative p-2.5">
							<div className="relative overflow-hidden rounded-xl ring-1 ring-cyan-400/15">
								<span className="cert-holo-corner cert-holo-corner--tl" aria-hidden />
								<span className="cert-holo-corner cert-holo-corner--tr" aria-hidden />
								<span className="cert-holo-corner cert-holo-corner--bl" aria-hidden />
								<span className="cert-holo-corner cert-holo-corner--br" aria-hidden />

								<div className="relative h-48 w-full overflow-hidden bg-[#020617]">
									<div className="cert-card-media relative h-[115%] w-full">
										<Image
											src={certificate.image}
											alt={certificate.title}
											fill
											className="object-contain p-2 transition duration-500 group-hover:scale-[1.04]"
											sizes="(max-width: 768px) 100vw, 33vw"
										/>
									</div>
									<div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
									<div className="cert-card-scan pointer-events-none absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent opacity-0 transition group-hover:opacity-100" />
									<span className="pointer-events-none absolute right-3 top-3 font-display text-3xl font-bold text-white/[0.06]">
										{pkg}
									</span>
								</div>

								<div className="absolute inset-x-0 bottom-0 z-[3] p-4">
									<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/80">
										{certificate.category}
									</p>
									<h3 className="mt-1 font-display text-base font-semibold leading-snug text-white md:text-lg">
										{certificate.title}
									</h3>
									<p className="mt-0.5 text-xs text-slate-300/90">
										{certificate.issuer} · {certificate.date}
									</p>
									<span className="mt-3 inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-100 transition group-hover:border-cyan-400/55 group-hover:bg-cyan-500/20">
										Open dossier
										<span aria-hidden>→</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</button>
	);
}

function CertificateModal({ certificate, onClose, index }) {
	const pkg = String(index + 1).padStart(2, "0");
	const hasVerify =
		certificate.verificationLink &&
		certificate.verificationLink !== "your-verification-link";

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);

	const downloadCertificate = async () => {
		try {
			const response = await fetch(certificate.downloadLink);
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${certificate.title}.pdf`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Download failed:", error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="cert-modal-backdrop fixed inset-0 z-[260] flex items-center justify-center p-4 sm:p-6"
			onClick={onClose}
			role="presentation"
		>
			<div className="cert-modal-backdrop__mesh pointer-events-none absolute inset-0" aria-hidden />
			<div className="cert-modal-backdrop__vignette pointer-events-none absolute inset-0" aria-hidden />

			<motion.div
				initial={{ scale: 0.92, opacity: 0, y: 24 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.94, opacity: 0, y: 16 }}
				transition={cardSpring}
				className="cert-modal-vault about-command-vault relative max-h-[92vh] w-full max-w-4xl overflow-hidden"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="cert-modal-title"
			>
				<div className="about-command-vault__noise pointer-events-none absolute inset-0" aria-hidden />
				<div className="projects-vault-aurora pointer-events-none absolute inset-0 opacity-50" aria-hidden />

				<div className="relative z-10 flex items-center justify-between gap-3 border-b border-cyan-400/15 px-5 py-3 sm:px-6">
					<div className="flex items-center gap-2.5">
						<span className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">
							{pkg}
						</span>
						<div>
							<p className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300">
								Credential dossier
							</p>
							<p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
								{certificate.category}
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/25 bg-black/40 text-cyan-200 transition hover:border-cyan-400/50 hover:bg-cyan-500/10"
						aria-label="Close dossier"
					>
						<FaTimes size={14} />
					</button>
				</div>

				<div className="relative z-10 grid max-h-[calc(92vh-3.5rem)] overflow-y-auto lg:grid-cols-[0.95fr_1.05fr] lg:overflow-hidden">
					<div className="cert-modal-preview relative border-b border-cyan-400/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
						<HudCorners />
						<p className="mb-3 font-mono text-[8px] uppercase tracking-[0.2em] text-cyan-400/70">
							Credential preview
						</p>
						<div className="cert-modal-preview__frame relative aspect-[4/3] overflow-hidden rounded-xl border border-cyan-400/25 bg-black/50">
							<Image
								src={certificate.image}
								alt={certificate.title}
								fill
								className="object-contain p-3"
								sizes="400px"
							/>
							<div className="projects-preview-scanline pointer-events-none absolute inset-0 opacity-30" aria-hidden />
							<div className="projects-preview-beam pointer-events-none absolute inset-x-0 top-0 z-[2] h-[2px]" aria-hidden />
						</div>
						<div className="mt-4 grid grid-cols-3 gap-2">
							{[
								{ label: "Issued", value: certificate.date },
								{ label: "Issuer", value: certificate.issuer.split(" ")[0] },
								{ label: "Status", value: "Verified" },
							].map((item) => (
								<div
									key={item.label}
									className="rounded-lg border border-cyan-400/12 bg-cyan-500/5 px-2 py-2 text-center"
								>
									<p className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-500">
										{item.label}
									</p>
									<p className="mt-0.5 truncate font-mono text-[10px] font-bold text-cyan-200">
										{item.value}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="cert-modal-body p-5 sm:p-6 lg:overflow-y-auto">
						<TerminalFrame
							title={`nahom.creds / ${certificate.title.toLowerCase().slice(0, 28)}`}
							className="cert-modal-terminal"
						>
							<div className="cert-modal-content">
								<h2
									id="cert-modal-title"
									className="font-display text-xl font-bold leading-tight text-white sm:text-2xl"
								>
									{certificate.title}
								</h2>
								<p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-400/75">
									{certificate.issuer} · {certificate.date}
								</p>

								<p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
									{certificate.description}
								</p>

								<div className="mt-5">
									<p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
										Skills covered
									</p>
									<div className="mt-2 flex flex-wrap gap-1.5">
										{certificate.skills.map((skill) => (
											<span
												key={skill}
												className="rounded-md border border-violet-400/25 bg-violet-500/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-violet-200/90"
											>
												{skill}
											</span>
										))}
									</div>
								</div>

								<div className="mt-6 flex flex-wrap gap-3 border-t border-white/8 pt-5">
									<button
										type="button"
										onClick={downloadCertificate}
										className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
									>
										<FaDownload size={12} />
										Download PDF
									</button>
									{hasVerify ? (
										<a
											href={certificate.verificationLink}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/35 bg-fuchsia-500/10 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-500/20"
										>
											Verify
											<FaExternalLinkAlt size={11} />
										</a>
									) : (
										<span className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
											Archive on file
										</span>
									)}
								</div>
							</div>
						</TerminalFrame>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

export default function CertificateShowcase() {
	const reduceMotion = useReducedMotion();
	const [selectedCertificate, setSelectedCertificate] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const toolbarRef = useRef(null);
	const theatreRef = useRef(null);
	const gridRef = useRef(null);
	const railFillRef = useRef(null);
	const railBeamRef = useRef(null);
	const scanBeamRef = useRef(null);
	const cardRefs = useRef([]);

	const filteredCertificates = certificates.filter((cert) => {
		const matchesCategory =
			selectedCategory === "all" || cert.category === selectedCategory;
		const matchesSearch =
			cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			cert.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const openCertificate = (cert, index) => {
		setSelectedIndex(index);
		setSelectedCertificate(cert);
	};

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);
		cardRefs.current = [];

		const ctx = gsap.context(() => {
			gsap.from(".cert-header-block", {
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

			gsap.from(".cert-stat-chip", {
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

			const toolbarReveal = toolbarRef.current?.querySelector(".cert-toolbar-reveal");
			if (toolbarReveal) {
				gsap.fromTo(
					toolbarReveal,
					{ clipPath: "inset(0 100% 0 0 round 14px)", opacity: 0.4 },
					{
						clipPath: "inset(0 0% 0 0 round 14px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: toolbarRef.current,
							start: "top 90%",
							end: "top 62%",
							scrub: 0.55,
						},
					},
				);
			}

			if (railFillRef.current && theatreRef.current) {
				gsap.fromTo(
					railFillRef.current,
					{ scaleX: 0 },
					{
						scaleX: 1,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top 72%",
							end: "bottom 28%",
							scrub: 0.45,
						},
					},
				);
			}

			if (railBeamRef.current && theatreRef.current) {
				gsap.fromTo(
					railBeamRef.current,
					{ left: "0%", opacity: 0.4 },
					{
						left: "100%",
						opacity: 1,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top 70%",
							end: "bottom 30%",
							scrub: 0.5,
						},
					},
				);
			}

			if (scanBeamRef.current && gridRef.current) {
				gsap.fromTo(
					scanBeamRef.current,
					{ top: "-8%", opacity: 0.1 },
					{
						top: "108%",
						opacity: 0.75,
						ease: "none",
						scrollTrigger: {
							trigger: gridRef.current,
							start: "top 85%",
							end: "bottom 15%",
							scrub: 0.65,
						},
					},
				);
			}

			cardRefs.current.forEach((card, i) => {
				if (!card) return;
				const reveal = card.querySelector(".cert-card-reveal");
				const inner = card.querySelector(".cert-card-inner");

				if (reveal) {
					gsap.fromTo(
						reveal,
						{ clipPath: "inset(100% 0 0 0 round 16px)", opacity: 0.35 },
						{
							clipPath: "inset(0% 0 0 0 round 16px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 92%",
								end: "top 58%",
								scrub: 0.7,
							},
						},
					);
				}

				if (inner) {
					gsap.fromTo(
						inner,
						{ y: 48, opacity: 0.2, filter: "blur(6px)" },
						{
							y: 0,
							opacity: 1,
							filter: "blur(0px)",
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 90%",
								end: "top 55%",
								scrub: 0.75,
							},
						},
					);
				}
			});
		}, sectionRef);

		scheduleScrollTriggerRefresh(400);
		return () => ctx.revert();
	}, [reduceMotion, filteredCertificates.length, selectedCategory, searchQuery]);

	return (
		<section
			id="credentials"
			ref={sectionRef}
			className="cert-section cert-section--vault about-section--interface relative scroll-mt-24 overflow-hidden px-4 py-20 text-slate-100 md:py-28"
		>
			<div className="cert-section__mesh about-section__mesh pointer-events-none absolute inset-0" aria-hidden />
			<div className="cert-section__vignette about-section__vignette pointer-events-none absolute inset-0" aria-hidden />
			<div className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.24]" aria-hidden />
			<p
				className="cert-bg-watermark pointer-events-none absolute right-[2%] top-20 z-0 font-display text-[clamp(5rem,16vw,11rem)] font-bold leading-none text-fuchsia-400/[0.05]"
				aria-hidden
			>
				06
			</p>

			<div className="relative z-10 mx-auto max-w-6xl">
				<header
					ref={headerRef}
					className="cert-header-block about-identity-header relative mb-12 overflow-hidden md:mb-14"
				>
					<div className="about-identity-header__glow pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-[90px]" />
					<div className="about-identity-header__glow pointer-events-none absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-fuchsia-500/15 blur-[80px]" />
					<div className="about-identity-header__scan pointer-events-none absolute inset-x-0 top-0 z-20 h-px" aria-hidden />

					<div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10">
						<div className="mx-auto max-w-3xl text-center">
							<p className="section-eyebrow justify-center">
								<span className="h-px w-12 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400" aria-hidden />
								<span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300">
									Section 06 · Credential vault
								</span>
							</p>
							<h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
								Certifications &amp;{" "}
								<span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
									Achievements
								</span>
							</h2>
							<p className="mx-auto mt-4 max-w-2xl text-slate-400">
								Formal credentials and distinction milestones — filter by domain or
								search the archive.
							</p>
						</div>

						<div className="cert-stats mx-auto mt-8 grid max-w-lg grid-cols-3 gap-3">
							{[
								{ k: "Creds", v: String(certificates.length) },
								{ k: "Domains", v: String(categories.length) },
								{ k: "GPA", v: "3.9" },
							].map((stat) => (
								<div
									key={stat.k}
									className="cert-stat-chip about-hero-stat about-hero-stat--cyan rounded-lg border border-white/10 bg-black/35 px-3 py-3 text-center"
								>
									<p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
										{stat.k}
									</p>
									<p className="mt-1 font-display text-xl font-bold text-white">
										{stat.v}
									</p>
								</div>
							))}
						</div>
					</div>
				</header>

				<div ref={toolbarRef} className="cert-toolbar mb-10">
					<div className="cert-toolbar-reveal about-command-vault overflow-hidden rounded-xl border border-cyan-400/20">
						<div className="border-b border-cyan-400/15 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/80">
							Archive index
						</div>
						<div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
							<div className="cert-toolbar-control relative min-w-0 flex-1">
								<FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/50" size={14} />
								<input
									type="search"
									placeholder="Search credentials…"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full rounded-lg border border-cyan-400/20 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/45 focus:outline-none focus:ring-1 focus:ring-cyan-400/30"
								/>
							</div>
							<select
								value={selectedCategory}
								onChange={(e) => setSelectedCategory(e.target.value)}
								className="cert-toolbar-control w-full cursor-pointer rounded-lg border border-cyan-400/20 bg-black/40 px-4 py-2.5 text-sm text-slate-200 focus:border-cyan-400/45 focus:outline-none sm:w-auto sm:min-w-[200px]"
							>
								<option value="all">All categories</option>
								{categories.map((category) => (
									<option key={category} value={category}>
										{category}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<div ref={theatreRef} className="cert-theatre">
					{filteredCertificates.length > 0 ? (
						<div className="cert-archive-rail relative mb-8 hidden md:block">
							<div className="relative h-px w-full bg-cyan-400/15">
								<div
									ref={railFillRef}
									className="cert-rail-fill absolute inset-y-0 left-0 w-full bg-gradient-to-r from-cyan-400/70 via-violet-400/60 to-fuchsia-400/50"
								/>
								<div
									ref={railBeamRef}
									className="cert-rail-beam absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/50 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.65)]"
								/>
							</div>
						</div>
					) : null}

					<div ref={gridRef} className="cert-grid relative">
						<div
							ref={scanBeamRef}
							className="cert-scan-beam pointer-events-none absolute inset-x-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"
							aria-hidden
						/>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
							{filteredCertificates.map((cert, i) => (
								<CertificateCard
									key={cert.id}
									certificate={cert}
									index={i}
									cardRef={(el) => {
										cardRefs.current[i] = el;
									}}
									onClick={() => openCertificate(cert, i)}
								/>
							))}
						</div>
					</div>
				</div>

				{filteredCertificates.length === 0 ? (
					<p className="mt-10 text-center text-slate-500">No credentials match this filter.</p>
				) : null}

				<p className="cert-footer-cue mt-12 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
					Tap a card · open credential dossier
				</p>

				<AnimatePresence>
					{selectedCertificate ? (
						<CertificateModal
							certificate={selectedCertificate}
							index={selectedIndex}
							onClose={() => setSelectedCertificate(null)}
						/>
					) : null}
				</AnimatePresence>
			</div>
		</section>
	);
}
