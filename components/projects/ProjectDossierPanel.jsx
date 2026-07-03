import Link from "next/link";
import Image from "next/image";

function parseTech(tech) {
	if (!tech) return [];
	return tech
		.split("·")
		.map((t) => t.trim())
		.filter(Boolean);
}

export default function ProjectDossierPanel({ project, index }) {
	const pkg = String(index + 1).padStart(2, "0");
	const tags = parseTech(project.tech);

	return (
		<div className="projects-dossier relative flex h-full flex-col overflow-hidden">
			<span
				className="projects-dossier-watermark pointer-events-none absolute -right-4 -top-6 font-display text-[7rem] font-bold leading-none text-cyan-400/[0.06]"
				aria-hidden
			>
				{pkg}
			</span>

			<div className="relative z-10">
				<p className="projects-dossier-eyebrow flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-400/80">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
					Production dossier · PKG-{pkg}
				</p>

				<h3 className="projects-dossier-title mt-4 font-display text-3xl font-bold leading-tight text-white xl:text-4xl">
					{project.title}
				</h3>

				{project.featured ? (
					<span className="projects-dossier-flag mt-3 inline-flex rounded-full border border-fuchsia-400/40 bg-fuchsia-500/15 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-fuchsia-200">
						Flagship deployment
					</span>
				) : null}
			</div>

			<div className="projects-dossier-hud relative z-10 mt-6 grid grid-cols-3 gap-2">
				{[
					{ label: "Uptime", value: "99.9%" },
					{ label: "Stack", value: "Full" },
					{ label: "Region", value: "ET" },
				].map((item) => (
					<div
						key={item.label}
						className="rounded-lg border border-cyan-400/12 bg-cyan-500/5 px-2.5 py-2 text-center"
					>
						<p className="font-mono text-[7px] uppercase tracking-[0.12em] text-slate-500">
							{item.label}
						</p>
						<p className="mt-0.5 font-mono text-xs font-bold text-cyan-200">
							{item.value}
						</p>
					</div>
				))}
			</div>

			{tags.length > 0 ? (
				<div className="projects-dossier-tags relative z-10 mt-5 flex flex-wrap gap-1.5">
					{tags.map((tag) => (
						<span
							key={tag}
							className="rounded-md border border-violet-400/25 bg-violet-500/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-violet-200/90"
						>
							{tag}
						</span>
					))}
				</div>
			) : (
				<p className="projects-dossier-tech relative z-10 mt-5 text-sm text-slate-500">
					Full case study on dedicated route.
				</p>
			)}

			<div className="projects-dossier-thumb relative z-10 mt-6 overflow-hidden rounded-lg border border-cyan-400/20">
				<div className="relative aspect-[21/9] w-full">
					<Image
						src={project.backgroundImg}
						alt=""
						fill
						className="object-cover opacity-80"
						sizes="400px"
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />
					<div className="absolute inset-0 projects-dossier-thumb__scan pointer-events-none" aria-hidden />
				</div>
			</div>

			<div className="projects-dossier-meta relative z-10 mt-5 grid gap-2 sm:grid-cols-2">
				<div className="rounded-lg border border-cyan-400/15 bg-black/40 px-3 py-2.5">
					<p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
						Route
					</p>
					<p className="mt-1 truncate font-mono text-xs text-cyan-200">
						{project.projectUrl}
					</p>
				</div>
				<div className="rounded-lg border border-emerald-400/15 bg-emerald-500/5 px-3 py-2.5">
					<p className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500">
						Status
					</p>
					<p className="mt-1 font-mono text-xs text-emerald-300">
						{project.featured ? "Flagship · Live" : "Deployed · Live"}
					</p>
				</div>
			</div>

			<div className="relative z-10 mt-auto pt-6">
				<Link
					href={project.projectUrl}
					className="projects-dossier-cta group/cta inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 via-violet-500/15 to-fuchsia-500/15 px-5 py-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:border-cyan-300/70 hover:shadow-[0_0_32px_rgba(34,211,238,0.25)]"
				>
					<span>Open full dossier</span>
					<span className="transition group-hover/cta:translate-x-1" aria-hidden>
						→
					</span>
				</Link>
			</div>
		</div>
	);
}
