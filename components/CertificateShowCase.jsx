import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
	FaDownload,
	FaExternalLinkAlt,
	FaSearch,
	FaTimes,
} from "react-icons/fa";
import SectionShell, {
	panelClass,
	monoMetaClass,
	btnPrimary,
	btnGhost,
	btnChip,
} from "./section/SectionShell";

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
			"Graduated with Very Great Distinction, achieving a 3.9 GPA in Computer Science.",
		category: "Education",
		downloadLink: "/assets/cert1%20(1).pdf",
	},
];

const categories = ["All", ...new Set(certificates.map((c) => c.category))];

function CertificateModal({ certificate, onClose }) {
	if (!certificate) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
			onClick={onClose}
			role="presentation"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 16 }}
				className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="cert-modal-title"
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute right-3 top-3 z-10 rounded-lg border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/15"
					aria-label="Close"
				>
					<FaTimes aria-hidden />
				</button>
				<div className="relative aspect-[16/10] w-full bg-slate-900">
					<Image
						src={certificate.image}
						alt={certificate.title}
						fill
						className="object-contain p-4"
						sizes="672px"
					/>
				</div>
				<div className="p-6 sm:p-8">
					<p className={`${monoMetaClass} text-cyan-400`}>
						{certificate.category} · {certificate.date}
					</p>
					<h3
						id="cert-modal-title"
						className="mt-2 text-xl font-semibold text-white sm:text-2xl"
					>
						{certificate.title}
					</h3>
					<p className="mt-1 text-sm text-slate-400">{certificate.issuer}</p>
					<p className="mt-4 text-sm leading-relaxed text-slate-300">
						{certificate.description}
					</p>
					<ul className="mt-4 flex flex-wrap gap-2">
						{certificate.skills.map((skill) => (
							<li
								key={skill}
								className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400"
							>
								{skill}
							</li>
						))}
					</ul>
					<div className="mt-6 flex flex-wrap items-center gap-3">
						<a href={certificate.downloadLink} download className={btnPrimary}>
							<FaDownload aria-hidden />
							Download
						</a>
						{certificate.verificationLink &&
						certificate.verificationLink !== "your-verification-link" ? (
							<a
								href={certificate.verificationLink}
								target="_blank"
								rel="noopener noreferrer"
								className={btnGhost}
							>
								Verify
								<FaExternalLinkAlt className="text-xs" aria-hidden />
							</a>
						) : null}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}

const CertificateShowCase = () => {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("All");
	const [active, setActive] = useState(null);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return certificates.filter((cert) => {
			const catOk = category === "All" || cert.category === category;
			if (!catOk) return false;
			if (!q) return true;
			return (
				cert.title.toLowerCase().includes(q) ||
				cert.issuer.toLowerCase().includes(q) ||
				cert.skills.some((s) => s.toLowerCase().includes(q))
			);
		});
	}, [query, category]);

	return (
		<>
			<SectionShell
				id="credentials"
				index="06"
				eyebrow="credentials/"
				title="Proof of craft"
				description="Verified coursework and distinctions."
			>
				<div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
					<label
						className={`${panelClass} relative flex flex-1 items-center gap-3 px-4 py-3`}
					>
						<FaSearch className="text-cyan-600 dark:text-cyan-400" aria-hidden />
						<span className="sr-only">Search certificates</span>
						<input
							type="search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search credentials…"
							className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200"
						/>
					</label>
					<div
						className="flex flex-wrap gap-1.5"
						role="tablist"
						aria-label="Credential categories"
					>
						{categories.map((cat) => (
							<button
								key={cat}
								type="button"
								role="tab"
								aria-selected={category === cat}
								onClick={() => setCategory(cat)}
								className={btnChip}
							>
								{cat === "Frontend Development" ? "Frontend" : cat}
							</button>
						))}
					</div>
				</div>

				<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((cert) => (
						<li key={cert.id}>
							<button
								type="button"
								onClick={() => setActive(cert)}
								className="eng-project-card unstyled group w-full text-left"
							>
								<div className="eng-project-card__media !aspect-[16/11] bg-slate-100 dark:bg-slate-950">
									<Image
										src={cert.image}
										alt={cert.title}
										fill
										className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
										sizes="(max-width: 768px) 100vw, 33vw"
									/>
								</div>
								<div className="p-5">
									<p className={monoMetaClass}>
										{cert.date} · {cert.category}
									</p>
									<h3 className="mt-2 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
										{cert.title}
									</h3>
									<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
										{cert.issuer}
									</p>
								</div>
							</button>
						</li>
					))}
				</ul>
				{filtered.length === 0 ? (
					<p className="mt-8 text-sm text-slate-500">No certificates match that filter.</p>
				) : null}
			</SectionShell>

			<AnimatePresence>
				{active ? (
					<CertificateModal certificate={active} onClose={() => setActive(null)} />
				) : null}
			</AnimatePresence>
		</>
	);
};

export default CertificateShowCase;
