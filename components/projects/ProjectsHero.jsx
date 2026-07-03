import { PROJECTS_HERO_DESC, PROJECTS_HERO_STATS } from "./projectsData";

export default function ProjectsHero({
	heroRef,
	heroDescRef,
	heroScanRef,
	bgIndexRef,
}) {
	return (
		<div
			ref={heroRef}
			className="projects-identity-header about-identity-header relative mb-12 overflow-hidden md:mb-16"
		>
			<p
				ref={bgIndexRef}
				className="projects-bg-index pointer-events-none absolute -right-4 top-0 z-0 font-display text-[clamp(6rem,20vw,14rem)] font-bold leading-none text-fuchsia-400/[0.07]"
				aria-hidden
			>
				04
			</p>

			<div className="about-identity-header__glow pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan-400/25 blur-[110px]" />
			<div className="about-identity-header__glow pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-[100px]" />
			<div className="projects-hero-noise pointer-events-none absolute inset-0 opacity-30" aria-hidden />
			<div
				ref={heroScanRef}
				className="about-identity-header__scan pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
				aria-hidden
			/>

			<div className="projects-hero-chrome relative z-30 flex items-center justify-between border-b border-cyan-400/15 px-5 py-2.5 sm:px-8">
				<span className="font-mono text-[8px] uppercase tracking-[0.24em] text-cyan-300/90">
					Sec 04 · Build archive
				</span>
				<span className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-400">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
					All routes indexed
				</span>
			</div>

			<div className="about-hero-grid relative grid gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
				<div className="about-hero-copy relative z-10">
					<p className="projects-header-eyebrow section-eyebrow mb-6">
						<span
							className="projects-eyebrow-line about-eyebrow-line h-px w-20 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400"
							aria-hidden
						/>
						<span className="projects-eyebrow-text about-eyebrow-text font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300">
							Selected work / Deploy log
						</span>
					</p>

					<h2
						className="projects-header-title font-display font-bold leading-[0.8] tracking-tight"
						aria-label="Selected work"
					>
						<span className="projects-title-selected block text-[clamp(2.8rem,11vw,6rem)] text-white drop-shadow-[0_0_40px_rgba(34,211,238,0.15)]">
							<span className="projects-title-word inline-block">Selected</span>
						</span>
						<span className="projects-title-work mt-1 inline-flex text-[clamp(3.2rem,13vw,7rem)]">
							{["w", "o", "r", "k"].map((char) => (
								<span
									key={char}
									className="projects-title-char inline-block bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
								>
									{char}
								</span>
							))}
						</span>
					</h2>

					<p
						ref={heroDescRef}
						className="projects-header-desc about-hero-sub mt-8 max-w-xl border-l-2 border-gradient-future pl-5 text-base leading-relaxed text-slate-300 sm:text-lg"
						style={{ borderImage: "linear-gradient(180deg, #22d3ee, #a78bfa, #e879f9) 1" }}
					>
						{PROJECTS_HERO_DESC}
					</p>
				</div>

				<div className="about-hero-panel relative z-10">
					<div className="about-hero-panel__frame projects-hero-panel--glow">
						<div className="about-hero-panel__header flex items-center justify-between border-b border-cyan-400/20 px-4 py-3">
							<span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300">
								Archive telemetry
							</span>
							<span className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-400">
								<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
								Synced
							</span>
						</div>
						<div className="grid gap-2 p-3 sm:grid-cols-3">
							{PROJECTS_HERO_STATS.map((stat) => (
								<div
									key={stat.label}
									className={`projects-stat-chip about-hero-stat about-hero-stat--${stat.accent} rounded-lg border border-white/10 bg-black/40 px-3 py-3 backdrop-blur-sm`}
								>
									<p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
										{stat.label}
									</p>
									<p className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
										{stat.value}
									</p>
								</div>
							))}
						</div>
						<p className="projects-hero-hint about-hero-hint border-t border-white/6 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">
							↓ What I&apos;ve Built — command vault
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
