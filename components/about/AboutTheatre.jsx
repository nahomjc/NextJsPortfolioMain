import { PARTICLE_POSITIONS, SCENES } from "./aboutData";
import AboutPortrait from "./AboutPortrait";
import IntroScene from "./scenes/IntroScene";
import CapabilitiesScene from "./scenes/CapabilitiesScene";
import StoryScene from "./scenes/StoryScene";
import WorkspaceScene from "./scenes/WorkspaceScene";
import { SceneRail, TerminalFrame } from "./DeckChrome";

export default function AboutTheatre({
	theatreRef,
	pinRef,
	theatreGlowRef,
	scanBeamRef,
	bgWhoRef,
	bgAmRef,
	hudRailRef,
	circuitBgRef,
	portraitWrapRef,
	stageDividerRef,
	sceneRefs,
	chapterRefs,
	segmentRefs,
	highlightRefs,
	bioParaRefs,
	workspaceRef,
	activeScene,
	bioExpanded,
	setBioExpanded,
	reduceMotion,
	jumpToScene,
}) {
	const terminalTitle = `nahom.sys / layer-${SCENES[activeScene]?.code} · ${SCENES[activeScene]?.label?.toLowerCase()}`;

	return (
		<div ref={theatreRef} className="about-theatre hidden lg:block">
			<div
				ref={pinRef}
				className="about-command-vault about-deck about-theatre-pin relative min-h-[calc(100dvh-4rem)] overflow-hidden"
			>
				<div className="about-command-vault__noise pointer-events-none absolute inset-0" aria-hidden />
				<div
					ref={circuitBgRef}
					className="about-circuit-bg pointer-events-none absolute inset-0"
					aria-hidden
				/>
				<div
					ref={theatreGlowRef}
					className="about-theatre-glow pointer-events-none absolute inset-0 opacity-70"
					aria-hidden
				/>
				{PARTICLE_POSITIONS.map((pos, i) => (
					<span
						key={`particle-${i}`}
						className="about-particle pointer-events-none absolute z-[1]"
						style={{ top: pos.top, left: pos.left }}
						aria-hidden
					/>
				))}
				<div
					ref={scanBeamRef}
					className="about-scan-beam pointer-events-none absolute inset-x-0 z-20 h-2"
					aria-hidden
				/>
				<span
					ref={bgWhoRef}
					className="about-bg-type pointer-events-none absolute left-[12%] top-[18%] z-0 font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-none text-cyan-400/[0.04]"
					aria-hidden
				>
					NAHOM
				</span>
				<span
					ref={bgAmRef}
					className="about-bg-type pointer-events-none absolute bottom-[12%] right-[8%] z-0 font-display text-[clamp(4rem,12vw,9rem)] font-bold leading-none text-fuchsia-400/[0.05]"
					aria-hidden
				>
					AI
				</span>

				<div className="about-command-vault__header relative z-30 flex items-center justify-between border-b border-cyan-400/15 px-6 py-4">
					<div className="flex items-center gap-3">
						<span className="about-command-vault__logo flex h-8 w-8 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-200">
							N
						</span>
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200">
								Identity Command Vault
							</p>
							<p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
								Pinned · scroll to navigate layers
							</p>
						</div>
					</div>
					<div
						className="about-scene-badge rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-fuchsia-200"
						aria-live="polite"
					>
						Active · {SCENES[activeScene]?.code} / 04
					</div>
				</div>

				<div className="relative z-10 grid min-h-[calc(100dvh-8.5rem)] grid-cols-[11rem_minmax(260px,34%)_1fr] gap-0">
					<div className="about-command-vault__rail border-r border-cyan-400/10 px-4 py-6">
						<SceneRail
							activeScene={activeScene}
							jumpToScene={jumpToScene}
							segmentRefs={segmentRefs}
							hudRailRef={hudRailRef}
						/>
					</div>

					<div className="about-portrait-chamber relative flex flex-col items-center justify-center border-r border-cyan-400/10 px-6 py-8">
						{SCENES.map((scene, i) => (
							<span
								key={scene.code}
								ref={(el) => {
									chapterRefs.current[i] = el;
								}}
								className="about-chapter-ghost pointer-events-none absolute font-display text-[clamp(5rem,14vw,10rem)] font-bold leading-none text-cyan-400/[0.05]"
								aria-hidden
							>
								{scene.code}
							</span>
						))}
						<div className="about-portrait-chamber__ring about-portrait-chamber__ring--outer" aria-hidden />
						<div className="about-portrait-chamber__ring about-portrait-chamber__ring--inner" aria-hidden />
						<div
							ref={portraitWrapRef}
							className="about-portrait-wrap relative z-10 w-full max-w-[320px]"
						>
							<AboutPortrait reduceMotion={reduceMotion} />
						</div>
						<p className="relative z-10 mt-8 text-center font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-400/80">
							Subject · Nahom Tesfaye
						</p>
					</div>

					<div className="about-scene-stage relative flex min-h-0 flex-col p-6 xl:p-8">
						<div
							ref={stageDividerRef}
							className="about-stage-divider pointer-events-none absolute left-0 top-6 z-20 h-[calc(100%-3rem)] w-px origin-top"
							aria-hidden
						/>
						<TerminalFrame title={terminalTitle} className="h-full min-h-0 flex-1">
							<div className="relative h-full min-h-[320px]">
								{[
									<IntroScene key="intro" />,
									<CapabilitiesScene
										key="capabilities"
										highlightRefs={highlightRefs}
									/>,
									<StoryScene
										key="story"
										bioExpanded={bioExpanded}
										setBioExpanded={setBioExpanded}
										bioParaRefs={bioParaRefs}
									/>,
									<WorkspaceScene
										key="workspace"
										workspaceRef={workspaceRef}
										activeScene={activeScene}
									/>,
								].map((scene, i) => (
									<div
										key={SCENES[i].id}
										ref={(el) => {
											sceneRefs.current[i] = el;
										}}
										className="about-scene-panel absolute inset-0 overflow-y-auto pr-1"
									>
										{scene}
									</div>
								))}
							</div>
						</TerminalFrame>
					</div>
				</div>

				<div
					className="about-scroll-cue pointer-events-none absolute bottom-5 right-8 z-40 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400/70"
					aria-hidden
				>
					<span>Scroll</span>
					<span className="text-base">↓</span>
				</div>
			</div>
		</div>
	);
}
