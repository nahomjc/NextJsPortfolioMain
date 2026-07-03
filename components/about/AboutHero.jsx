import { HERO_STATS, HERO_SUBTEXT } from "./aboutData";

export default function AboutHero({
	heroRef,
	whoSplitRef,
	amSplitRef,
	heroSubRef,
}) {
	return (
		<div
			ref={heroRef}
			className="about-identity-header about-hero about-hero-perspective relative mb-12 overflow-hidden md:mb-16"
		>
			<div className="about-identity-header__glow pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-[100px]" />
			<div className="about-identity-header__glow pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-[90px]" />
			<div
				className="about-identity-header__scan pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
				aria-hidden
			/>

			<div className="about-hero-grid relative grid gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
				<div className="about-hero-copy relative z-10">
					<p className="section-eyebrow mb-6">
						<span
							className="about-eyebrow-line h-px w-16 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-400"
							aria-hidden
						/>
						<span className="about-eyebrow-text font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300">
							Section 01 · Identity Vault
						</span>
					</p>

					<h2
						className="about-title-split font-display font-bold leading-[0.82] tracking-tight"
						aria-label="Who I Am"
					>
						<span
							ref={whoSplitRef}
							className="about-title-who block text-[clamp(3rem,11vw,6rem)] text-white"
						>
							<span className="about-title-word inline-block">WHO</span>
						</span>
						<span className="about-title-iam mt-1 flex flex-wrap items-baseline gap-x-[0.2em]">
							<span className="about-title-word inline-block text-[clamp(2.4rem,9vw,5rem)] text-slate-300">
								I
							</span>
							<span
								ref={amSplitRef}
								className="about-title-am inline-flex text-[clamp(3.4rem,13vw,7.5rem)]"
							>
								{["A", "M"].map((char) => (
									<span
										key={char}
										className="about-title-char inline-block bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
									>
										{char}
									</span>
								))}
							</span>
						</span>
					</h2>

					<p
						ref={heroSubRef}
						className="about-hero-sub mt-8 max-w-xl border-l border-cyan-400/40 pl-5 text-base leading-relaxed text-slate-300 sm:text-lg"
					>
						{HERO_SUBTEXT}
					</p>
				</div>

				<div className="about-hero-panel relative z-10">
					<div className="about-hero-panel__frame">
						<div className="about-hero-panel__header flex items-center justify-between border-b border-cyan-400/20 px-4 py-3">
							<span className="font-mono text-[9px] uppercase tracking-[0.22em] text-cyan-300">
								Profile telemetry
							</span>
							<span className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-400">
								<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
								Synced
							</span>
						</div>
						<div className="space-y-2 p-4">
							{HERO_STATS.map((stat) => (
								<div
									key={stat.label}
									className={`about-hero-stat about-hero-stat--${stat.accent} rounded-lg border border-white/8 bg-black/25 px-4 py-3`}
								>
									<p className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">
										{stat.label}
									</p>
									<p className="mt-1 font-display text-lg font-semibold text-white">
										{stat.value}
									</p>
								</div>
							))}
						</div>
						<div className="border-t border-white/8 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">
							ID · NAHOM_D · ETH · Addis
						</div>
					</div>
					<p className="about-hero-hint mt-5 hidden text-center font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-400/70 lg:block">
						Scroll ↓ to enter the identity command vault
					</p>
				</div>
			</div>
		</div>
	);
}
