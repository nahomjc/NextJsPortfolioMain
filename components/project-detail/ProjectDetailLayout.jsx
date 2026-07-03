import Image from "next/image";
import Link from "next/link";
import HudCorners from "../about/HudCorners";
import { TerminalFrame } from "../about/DeckChrome";

export default function ProjectDetailLayout({
	title,
	stack,
	hero,
	heroAlt,
	technologies = [],
	eyebrow = "Production dossier",
	pkgCode,
	variant = "production",
	demoUrl,
	demoLabel = "Demo",
	liveUrl,
	liveLabel = "Live site",
	codeUrl,
	overview,
	children,
}) {
	const isSandbox = variant === "sandbox";
	const terminalTitle = `nahom.build / ${title.toLowerCase().replace(/\s+/g, "-")} · dossier`;

	return (
		<div className="project-detail about-section--interface relative min-h-screen w-full overflow-hidden text-slate-100">
			<div className="project-detail__mesh about-section__mesh pointer-events-none absolute inset-0" aria-hidden />
			<div className="project-detail__vignette about-section__vignette pointer-events-none absolute inset-0" aria-hidden />
			<div className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.22]" aria-hidden />
			<div className="pointer-events-none absolute left-0 top-0 h-[min(60vw,480px)] w-[min(60vw,480px)] -translate-x-1/4 rounded-full bg-cyan-400/10 blur-[100px]" aria-hidden />
			<div className="pointer-events-none absolute right-0 bottom-0 h-[min(50vw,400px)] w-[min(50vw,400px)] translate-x-1/4 rounded-full bg-fuchsia-500/8 blur-[90px]" aria-hidden />

			<div className="relative z-10 mx-auto max-w-[1240px] px-4 pb-20 pt-24 md:pb-28 md:pt-28">
				<Link
					href="/#projects"
					scroll={false}
					className="project-detail-back mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/80 transition hover:text-cyan-300"
				>
					<span aria-hidden>←</span>
					<span>Back to archive</span>
				</Link>

				<div className="project-detail-hero about-command-vault relative mb-10 overflow-hidden rounded-2xl border border-cyan-400/25 md:mb-14">
					<div className="about-command-vault__noise pointer-events-none absolute inset-0" aria-hidden />
					<div className="projects-vault-aurora pointer-events-none absolute inset-0 opacity-60" aria-hidden />

					<div className="relative z-10 flex items-center justify-between gap-3 border-b border-cyan-400/15 px-5 py-3 sm:px-6">
						<div className="flex items-center gap-2.5">
							<span className="flex h-7 w-7 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-500/10 font-mono text-[10px] font-bold text-cyan-200">
								{pkgCode || "—"}
							</span>
							<span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300/90">
								{eyebrow}
							</span>
						</div>
						<span
							className={`rounded-full border px-3 py-1 font-mono text-[8px] uppercase tracking-[0.16em] ${
								isSandbox
									? "border-violet-400/35 bg-violet-500/10 text-violet-200"
									: "border-emerald-400/35 bg-emerald-500/10 text-emerald-300"
							}`}
						>
							{isSandbox ? "Sandbox" : "Deployed · Live"}
						</span>
					</div>

					<div className="relative z-10 grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
						<div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
							<Image
								src={hero}
								alt={heroAlt || title}
								fill
								className="object-cover"
								priority
								sizes="(max-width: 1024px) 100vw, 680px"
							/>
							<div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/50 to-transparent lg:from-[#020617]/90 lg:via-[#020617]/40" />
							<div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-cyan-950/20" />
							<div className="projects-preview-scanline pointer-events-none absolute inset-0 opacity-40" aria-hidden />
							<div className="projects-preview-beam pointer-events-none absolute inset-x-0 top-0 z-[2] h-[2px]" aria-hidden />

							<div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
								<p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-400/80">
									Case route · dossier
								</p>
								<h1 className="mt-2 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
									{title}
								</h1>
								{stack ? (
									<p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-slate-300 sm:text-sm">
										{stack}
									</p>
								) : null}
							</div>
						</div>

						<div className="relative border-t border-cyan-400/10 bg-black/40 p-6 backdrop-blur-sm lg:border-l lg:border-t-0 lg:p-8">
							<HudCorners />
							<p className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">
								Quick telemetry
							</p>
							<div className="mt-4 grid grid-cols-3 gap-2">
								{[
									{ label: "Type", value: isSandbox ? "Exp" : "Prod" },
									{ label: "Stack", value: String(technologies.length) },
									{ label: "Status", value: "Live" },
								].map((item) => (
									<div
										key={item.label}
										className="rounded-lg border border-cyan-400/12 bg-cyan-500/5 px-2 py-2.5 text-center"
									>
										<p className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-500">
											{item.label}
										</p>
										<p className="mt-0.5 font-mono text-xs font-bold text-cyan-200">
											{item.value}
										</p>
									</div>
								))}
							</div>
							{(demoUrl || liveUrl || codeUrl) && (
								<div className="mt-6 flex flex-wrap gap-3">
									{demoUrl ? (
										<a
											href={demoUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-100 transition hover:border-cyan-300/60 hover:bg-cyan-500/20"
										>
											{demoLabel} →
										</a>
									) : null}
									{liveUrl ? (
										<a
											href={liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/35 bg-fuchsia-500/10 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-fuchsia-100 transition hover:border-fuchsia-300/60 hover:bg-fuchsia-500/20"
										>
											{liveLabel} →
										</a>
									) : null}
									{codeUrl ? (
										<a
											href={codeUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-lg border border-violet-400/35 bg-violet-500/10 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-100 transition hover:border-violet-300/60 hover:bg-violet-500/20"
										>
											Source →
										</a>
									) : null}
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:gap-10">
					<div className="min-w-0">
						<TerminalFrame title={terminalTitle} className="project-detail-terminal">
							<div className="project-detail-overview">
								<p className="project-detail-overview__eyebrow font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-400/80">
									Overview
								</p>
								<div className="project-detail-overview__body mt-4 text-base leading-relaxed text-slate-300 [&_strong]:font-semibold [&_strong]:text-white">
									{overview}
								</div>
							</div>
						</TerminalFrame>
					</div>

					<aside className="lg:sticky lg:top-28 lg:self-start">
						<div className="project-detail-tech about-hero-panel__frame overflow-hidden rounded-xl border border-cyan-400/20 bg-black/45 backdrop-blur-md">
							<div className="border-b border-cyan-400/15 px-4 py-3">
								<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300">
									Technologies
								</p>
							</div>
							<ul className="divide-y divide-white/5 p-2">
								{technologies.map((tech) => (
									<li
										key={tech}
										className="flex items-center gap-2.5 px-3 py-2.5 font-mono text-xs text-slate-300"
									>
										<span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
										{tech}
									</li>
								))}
							</ul>
						</div>
					</aside>
				</div>

				{children ? (
					<div className="project-detail-gallery-wrap mt-12 md:mt-16">{children}</div>
				) : null}
			</div>
		</div>
	);
}
