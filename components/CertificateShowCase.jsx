import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
	FaDownload,
	FaExternalLinkAlt,
	FaMedal,
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

const corner =
	"pointer-events-none absolute z-10 h-2.5 w-2.5 border-cyan-400/70 dark:border-cyan-400/55";

function CardHudCorners() {
	return (
		<>
			<div className={`${corner} left-2 top-2 border-l-2 border-t-2`} aria-hidden />
			<div
				className={`${corner} right-2 top-2 border-r-2 border-t-2 border-violet-400/65 dark:border-violet-400/50`}
				aria-hidden
			/>
			<div
				className={`${corner} bottom-2 left-2 border-b-2 border-l-2 border-violet-400/50 dark:border-violet-400/40`}
				aria-hidden
			/>
			<div
				className={`${corner} bottom-2 right-2 border-b-2 border-r-2 border-cyan-400/45 dark:border-cyan-400/35`}
				aria-hidden
			/>
		</>
	);
}

const cardSpring = { type: "spring", stiffness: 340, damping: 28 };

const CertificateCard = ({ certificate, onClick }) => {
	const reduceMotion = useReducedMotion();

	return (
		<motion.button
			type="button"
			layout
			whileHover={reduceMotion ? undefined : { y: -6 }}
			whileTap={reduceMotion ? undefined : { scale: 0.98 }}
			transition={cardSpring}
			className="group relative w-full cursor-pointer text-left"
			onClick={onClick}
		>
			<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/25 via-transparent to-violet-500/20 opacity-0 blur-[1px] transition duration-300 group-hover:opacity-100 dark:from-cyan-400/30 dark:to-violet-500/25" />
			<div className="relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl transition duration-300 group-hover:border-cyan-400/35 group-hover:shadow-glow dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark dark:group-hover:border-cyan-400/30">
				<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
				<div className="relative p-2">
					<div className="relative overflow-hidden rounded-xl ring-1 ring-slate-200/70 dark:ring-white/10">
						<CardHudCorners />
						<div className="relative h-48 w-full bg-slate-100/80 dark:bg-slate-950/60">
							<Image
								src={certificate.image}
								alt={certificate.title}
								layout="fill"
								objectFit="contain"
								className="p-2 transition duration-500 group-hover:scale-[1.03]"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
							<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent opacity-0 transition group-hover:opacity-100" />
						</div>
						<div className="absolute inset-x-0 bottom-0 z-[2] p-4">
							<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-200/90">
								{certificate.category}
							</p>
							<h3 className="mt-1 font-display text-base font-semibold leading-snug text-white drop-shadow-md md:text-lg">
								{certificate.title}
							</h3>
							<p className="mt-0.5 text-xs font-medium text-slate-200/90">
								{certificate.issuer} · {certificate.date}
							</p>
							<span className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition group-hover:border-cyan-400/50 group-hover:bg-cyan-500/15">
								Briefing
								<span aria-hidden>→</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</motion.button>
	);
};

const CertificateModal = ({ certificate, onClose }) => {
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
			className="fixed inset-0 z-[260] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-md dark:bg-black/70"
			onClick={onClose}
			role="presentation"
		>
			<motion.div
				initial={{ scale: 0.94, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.94, opacity: 0 }}
				transition={cardSpring}
				className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200/85 bg-white/95 shadow-card-light backdrop-blur-xl dark:border-white/12 dark:bg-slate-900/95 dark:shadow-card-dark"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="cert-modal-title"
			>
				<div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-cyan-400/45" />
				<div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-violet-400/45" />

				<div className="relative h-48 w-full bg-slate-100 dark:bg-slate-950/80 md:h-52">
					<Image
						src={certificate.image}
						alt={certificate.title}
						layout="fill"
						objectFit="contain"
						className="p-4"
						sizes="672px"
					/>
					<button
						type="button"
						onClick={onClose}
						className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/90 bg-white/90 text-slate-700 shadow-md transition hover:border-cyan-400/50 hover:text-cyan-600 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-cyan-400/40"
						aria-label="Close"
					>
						<FaTimes size={18} />
					</button>
				</div>

				<div className="max-h-[min(55vh,420px)] overflow-y-auto p-6 md:p-8">
					<div className="flex flex-col gap-4 border-b border-slate-200/80 pb-4 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between">
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
								{certificate.category}
							</p>
							<h2
								id="cert-modal-title"
								className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white md:text-2xl"
							>
								{certificate.title}
							</h2>
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={downloadCertificate}
								className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/40 bg-gradient-to-br from-cyan-500/15 to-violet-500/10 text-cyan-700 transition hover:border-cyan-400/70 dark:text-cyan-300"
								title="Download"
							>
								<FaDownload size={16} />
							</button>
							<FaMedal className="text-2xl text-violet-600 dark:text-violet-400" aria-hidden />
						</div>
					</div>

					<p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">
						{certificate.description}
					</p>

					<div className="mt-6">
						<h3 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
							Skills covered
						</h3>
						<div className="flex flex-wrap gap-2">
							{certificate.skills.map((skill) => (
								<span
									key={skill}
									className="rounded-lg border border-cyan-500/25 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-200"
								>
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="mt-6 flex flex-col gap-3 border-t border-slate-200/80 pt-4 text-sm dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
						<p className="font-mono text-xs text-slate-500 dark:text-slate-400">
							Issued <span className="text-slate-700 dark:text-slate-300">{certificate.date}</span>
						</p>
						{certificate.verificationLink &&
						certificate.verificationLink !== "your-verification-link" ? (
							<a
								href={certificate.verificationLink}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 font-semibold text-cyan-600 transition hover:text-violet-600 dark:text-cyan-400 dark:hover:text-violet-300"
							>
								Verify
								<FaExternalLinkAlt size={12} />
							</a>
						) : (
							<span className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
								Verification link · configure
							</span>
						)}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

const gridContainer = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.09, delayChildren: 0.05 },
	},
};

const gridItem = {
	hidden: { opacity: 0, y: 22 },
	show: { opacity: 1, y: 0, transition: cardSpring },
};

const CertificateShowcase = () => {
	const [selectedCertificate, setSelectedCertificate] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredCertificates = certificates.filter((cert) => {
		const matchesCategory =
			selectedCategory === "all" || cert.category === selectedCategory;
		const matchesSearch =
			cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			cert.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="relative scroll-mt-4 overflow-hidden px-4 py-20 md:py-28">
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.17]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute right-1/4 top-16 h-[min(80vw,500px)] w-[min(80vw,500px)] rounded-full bg-cyan-400/12 blur-[115px] dark:bg-cyan-500/16"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute bottom-12 left-0 h-[min(70vw,440px)] w-[min(70vw,440px)] -translate-x-1/4 rounded-full bg-violet-500/12 blur-[100px] dark:bg-violet-500/16"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent dark:via-cyan-400/35"
				aria-hidden
			/>

			<div className="relative z-10 mx-auto max-w-6xl">
				<motion.div
					className="mx-auto mb-12 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-14 md:pb-12"
					initial={{ opacity: 0, y: 18 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-40px" }}
					transition={cardSpring}
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-violet-400 to-cyan-400"
								aria-hidden
							/>
							Credentials
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ SEC 06
							</span>
						</p>
					</div>
					<h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-white md:text-4xl">
						Certifications &amp;{" "}
						<span className="text-gradient-future">Achievements</span>
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
						Formal credentials and distinction milestones — filter by domain or search
						the briefing index.
					</p>
					<p className="mx-auto mt-3 max-w-xl font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
						Archive · PDF export · modal dossier
					</p>
				</motion.div>

				<motion.div
					className="mb-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-20px" }}
					transition={{ ...cardSpring, delay: 0.05 }}
				>
					<div className="relative min-w-[min(100%,280px)] flex-1 sm:max-w-sm">
						<FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
						<input
							type="search"
							placeholder="Search archive…"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full rounded-xl border border-slate-200/90 bg-white/80 py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm backdrop-blur-md placeholder:text-slate-400 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:border-white/10 dark:bg-slate-900/65 dark:text-slate-100 dark:placeholder:text-slate-500"
						/>
					</div>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="w-full cursor-pointer rounded-xl border border-slate-200/90 bg-white/80 px-4 py-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:border-white/10 dark:bg-slate-900/65 dark:text-slate-100 sm:w-auto sm:min-w-[200px]"
					>
						<option value="all">All categories</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</motion.div>

				<motion.div
					className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
					variants={gridContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-60px" }}
				>
					{filteredCertificates.map((cert) => (
						<motion.div key={cert.id} variants={gridItem}>
							<CertificateCard
								certificate={cert}
								onClick={() => setSelectedCertificate(cert)}
							/>
						</motion.div>
					))}
				</motion.div>

				{filteredCertificates.length === 0 ? (
					<p className="mt-10 text-center text-slate-500 dark:text-slate-400">
						No credentials match this filter.
					</p>
				) : null}

				<AnimatePresence>
					{selectedCertificate ? (
						<CertificateModal
							certificate={selectedCertificate}
							onClose={() => setSelectedCertificate(null)}
						/>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default CertificateShowcase;
