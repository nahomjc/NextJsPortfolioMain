import Image from "next/image";
import { PARTICLE_POSITIONS, productionProjects } from "./projectsData";
import ProjectsArchiveDock from "./ProjectsArchiveDock";
import ProjectDossierPanel from "./ProjectDossierPanel";
import { TerminalFrame } from "../about/DeckChrome";

export default function ProjectsTheatre({
	theatreRef,
	pinRef,
	theatreGlowRef,
	scanBeamRef,
	circuitBgRef,
	bgBuildRef,
	bgShipRef,
	hudRailRef,
	stageDividerRef,
	previewRefs,
	dossierRefs,
	ghostRefs,
	segmentRefs,
	activeIndex,
	jumpToProject,
}) {
	const active = productionProjects[activeIndex] ?? productionProjects[0];
	const terminalTitle = `nahom.build / pkg-${String(activeIndex + 1).padStart(2, "0")} · ${active?.title?.toLowerCase()}`;

	return (
		<div ref={theatreRef} className="projects-theatre hidden lg:block">
			<div
				ref={pinRef}
				className="projects-command-vault about-command-vault relative min-h-[calc(100dvh-3rem)] overflow-hidden"
			>
				<div className="about-command-vault__noise pointer-events-none absolute inset-0" aria-hidden />
				<div
					ref={circuitBgRef}
					className="about-circuit-bg pointer-events-none absolute inset-0"
					aria-hidden
				/>
				<div
					ref={theatreGlowRef}
					className="about-theatre-glow pointer-events-none absolute inset-0 opacity-80"
					aria-hidden
				/>
				<div className="projects-vault-aurora pointer-events-none absolute inset-0" aria-hidden />
				{PARTICLE_POSITIONS.map((pos, i) => (
					<span
						key={`p-${i}`}
						className="about-particle pointer-events-none absolute z-[1]"
						style={{ top: pos.top, left: pos.left }}
						aria-hidden
					/>
				))}
				<div
					ref={scanBeamRef}
					className="about-scan-beam pointer-events-none absolute inset-x-0 top-0 z-20 h-2"
					aria-hidden
				/>
				<span
					ref={bgBuildRef}
					className="about-bg-type pointer-events-none absolute left-[4%] top-[12%] z-0 font-display text-[clamp(4rem,11vw,9rem)] font-bold leading-none text-cyan-400/[0.05]"
					aria-hidden
				>
					BUILD
				</span>
				<span
					ref={bgShipRef}
					className="about-bg-type pointer-events-none absolute bottom-[18%] right-[4%] z-0 font-display text-[clamp(4rem,11vw,9rem)] font-bold leading-none text-fuchsia-400/[0.06]"
					aria-hidden
				>
					SHIP
				</span>

				<div className="about-command-vault__header relative z-30 flex items-center justify-between gap-4 border-b border-cyan-400/15 px-6 py-4">
					<div className="flex items-center gap-3">
						<span className="about-command-vault__logo flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-500/10 font-mono text-sm font-bold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
							04
						</span>
						<div>
							<h3 className="font-display text-lg font-bold text-white sm:text-xl">
								What I&apos;ve{" "}
								<span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
									Built
								</span>
							</h3>
							<p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
								Scroll · browse · open dossiers
							</p>
						</div>
					</div>
					<div
						className="projects-scene-badge about-scene-badge rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fuchsia-200"
						aria-live="polite"
					>
						Active · {String(activeIndex + 1).padStart(2, "0")} /{" "}
						{String(productionProjects.length).padStart(2, "0")}
					</div>
				</div>

				<div className="relative z-10 grid min-h-[calc(100dvh-11rem)] grid-cols-1 grid-rows-[1fr_auto]">
					<div className="grid min-h-0 grid-cols-[1.15fr_0.85fr]">
						<div className="projects-preview-chamber relative flex flex-col border-r border-cyan-400/10 p-6 xl:p-8">
							{productionProjects.map((project, i) => (
								<span
									key={project.projectUrl}
									ref={(el) => {
										ghostRefs.current[i] = el;
									}}
									className="about-chapter-ghost pointer-events-none absolute left-8 top-8 font-display text-[clamp(5rem,14vw,10rem)] font-bold leading-none text-cyan-400/[0.06]"
									aria-hidden
								>
									{String(i + 1).padStart(2, "0")}
								</span>
							))}

							<div className="about-portrait-chamber__ring about-portrait-chamber__ring--outer projects-preview-ring--outer" aria-hidden />
							<div className="about-portrait-chamber__ring about-portrait-chamber__ring--inner projects-preview-ring--inner" aria-hidden />

							<div className="projects-preview-stack relative z-10 mx-auto w-full max-w-[640px] flex-1">
								{productionProjects.map((project, i) => (
									<div
										key={project.projectUrl}
										ref={(el) => {
											previewRefs.current[i] = el;
										}}
										className="projects-preview-panel absolute inset-0 flex items-center"
									>
										<div className="projects-holo-frame w-full">
											<div className="projects-holo-frame__border pointer-events-none absolute -inset-[1px] rounded-2xl" aria-hidden />
											<div className="projects-holo-frame__corners pointer-events-none absolute inset-0" aria-hidden>
												<span className="projects-holo-corner projects-holo-corner--tl" />
												<span className="projects-holo-corner projects-holo-corner--tr" />
												<span className="projects-holo-corner projects-holo-corner--bl" />
												<span className="projects-holo-corner projects-holo-corner--br" />
											</div>

											<div className="projects-preview-frame relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-black/60 shadow-[0_0_80px_rgba(34,211,238,0.15),0_0_120px_rgba(139,92,246,0.08)]">
												<div className="projects-preview-hud absolute left-4 top-4 z-20 flex flex-wrap gap-2">
													<span className="rounded border border-cyan-400/40 bg-black/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-sm">
														{project.featured ? "Flagship" : "Production"}
													</span>
													<span className="rounded border border-emerald-400/35 bg-emerald-500/10 px-2 py-1 font-mono text-[8px] text-emerald-300 backdrop-blur-sm">
														LIVE
													</span>
												</div>

												<div className="relative aspect-[16/10] w-full">
													<Image
														src={project.backgroundImg}
														alt={project.title}
														fill
														className="projects-preview-image object-cover"
														sizes="640px"
														priority={i === 0}
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-cyan-950/10" />
													<div className="projects-preview-scanline pointer-events-none absolute inset-0 z-[2]" aria-hidden />
													<div className="projects-preview-beam pointer-events-none absolute inset-x-0 top-0 z-[3] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" aria-hidden />
												</div>

												<div className="relative border-t border-cyan-400/20 bg-black/50 px-5 py-4 backdrop-blur-sm">
													<p className="font-mono text-[8px] uppercase tracking-[0.22em] text-cyan-400/70">
														Deploy preview · PKG-{String(i + 1).padStart(2, "0")}
													</p>
													<p className="mt-1 font-display text-xl font-bold text-white xl:text-2xl">
														{project.title}
													</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							<p className="relative z-10 mt-4 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-400/70">
								Holographic preview · {active?.title}
							</p>
						</div>

						<div className="projects-dossier-stage relative flex min-h-0 flex-col p-5 xl:p-7">
							<div
								ref={stageDividerRef}
								className="about-stage-divider pointer-events-none absolute left-0 top-5 z-20 h-[calc(100%-2.5rem)] w-px origin-top bg-gradient-to-b from-cyan-400/60 via-violet-400/30 to-transparent"
								aria-hidden
							/>
							<div
								ref={hudRailRef}
								className="projects-dossier-rail pointer-events-none absolute bottom-8 left-3 top-8 w-px"
								aria-hidden
							>
								<span className="about-hud-rail__fill about-scene-rail__fill block h-full w-full origin-top" />
							</div>
							<TerminalFrame title={terminalTitle} className="h-full min-h-0 flex-1">
								<div className="relative h-full min-h-[360px]">
									{productionProjects.map((project, i) => (
										<div
											key={project.projectUrl}
											ref={(el) => {
												dossierRefs.current[i] = el;
											}}
											className="projects-dossier-panel absolute inset-0 overflow-y-auto pr-1"
										>
											<ProjectDossierPanel project={project} index={i} />
										</div>
									))}
								</div>
							</TerminalFrame>
						</div>
					</div>

					<ProjectsArchiveDock
						projects={productionProjects}
						activeIndex={activeIndex}
						jumpToProject={jumpToProject}
						segmentRefs={segmentRefs}
					/>
				</div>

				<div
					className="about-scroll-cue pointer-events-none absolute bottom-20 right-8 z-40 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400/70"
					aria-hidden
				>
					<span>Scroll</span>
					<span className="text-base">↓</span>
				</div>
			</div>
		</div>
	);
}
