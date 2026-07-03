import { SCENES } from "./aboutData";

export function TerminalFrame({ title, children, className = "" }) {
	return (
		<div className={`about-terminal ${className}`}>
			<div className="about-terminal__chrome">
				<div className="about-terminal__dots" aria-hidden>
					<span className="about-terminal__dot about-terminal__dot--red" />
					<span className="about-terminal__dot about-terminal__dot--amber" />
					<span className="about-terminal__dot about-terminal__dot--green" />
				</div>
				<span className="about-terminal__title font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/80">
					{title}
				</span>
				<span className="about-terminal__live font-mono text-[8px] uppercase tracking-[0.16em] text-emerald-400/90">
					Live
				</span>
			</div>
			<div className="about-terminal__body">{children}</div>
			<div className="about-terminal__footer font-mono text-[8px] uppercase tracking-[0.18em] text-slate-500">
				nahom.sys · encrypted channel
			</div>
		</div>
	);
}

export function SceneRail({
	activeScene,
	jumpToScene,
	segmentRefs,
	hudRailRef,
}) {
	return (
		<nav
			className="about-scene-rail relative z-40 flex flex-col"
			aria-label="Identity layers"
		>
			<p className="mb-4 font-mono text-[8px] uppercase tracking-[0.24em] text-cyan-500/70">
				Layers
			</p>
			<div className="about-scene-rail__track relative flex flex-1 flex-col gap-1">
				<div
					ref={hudRailRef}
					className="about-scene-rail__progress pointer-events-none absolute bottom-0 left-[1.125rem] top-0 w-px"
					aria-hidden
				>
					<span className="about-hud-rail__fill about-scene-rail__fill block h-full w-full origin-top" />
				</div>
				{SCENES.map((scene, i) => {
					const active = activeScene === i;
					const passed = i < activeScene;
					return (
						<button
							key={scene.id}
							type="button"
							onClick={() => jumpToScene(i)}
							aria-current={active ? "true" : undefined}
							ref={(el) => {
								segmentRefs.current[i] = el;
							}}
							className={`about-scene-rail__node unstyled group relative flex items-center gap-3 rounded-lg py-2 pl-1 pr-3 text-left transition duration-300 ${
								active ? "is-active" : passed ? "is-passed" : ""
							}`}
						>
							<span
								className={`about-scene-rail__dot relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-bold transition duration-300 ${
									active
										? "border-cyan-300 bg-cyan-400/20 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.55)]"
										: passed
											? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300/80"
											: "border-white/10 bg-black/30 text-slate-500 group-hover:border-cyan-400/40 group-hover:text-cyan-200"
								}`}
							>
								{scene.code}
							</span>
							<span className="min-w-0">
								<span
									className={`block font-mono text-[8px] uppercase tracking-[0.18em] ${
										active ? "text-cyan-300" : "text-slate-500"
									}`}
								>
									Layer
								</span>
								<span
									className={`block truncate text-xs font-semibold ${
										active ? "text-white" : "text-slate-400"
									}`}
								>
									{scene.label}
								</span>
							</span>
						</button>
					);
				})}
			</div>
		</nav>
	);
}
