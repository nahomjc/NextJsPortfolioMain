import { highlights } from "../aboutData";

export default function CapabilitiesScene({ highlightRefs }) {
	return (
		<>
			<p className="about-scene-eyebrow font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-400">
				02 · Expertise matrix
			</p>
			<h3 className="about-scene-heading mt-3 font-display text-2xl font-bold text-white md:text-[1.75rem]">
				What I ship on{" "}
				<span className="text-gradient-future">every build.</span>
			</h3>
			<div className="about-scanner relative mt-6">
				<span className="about-scanner__beam" aria-hidden />
				<div className="about-cap-grid grid grid-cols-1 gap-3 sm:grid-cols-2">
					{highlights.map((row, i) => (
						<div
							key={row.label}
							ref={(el) => {
								highlightRefs.current[i] = el;
							}}
							className="about-holo-tile about-highlight-row group relative overflow-hidden rounded-xl p-4"
						>
							<span
								className="about-cap-grid__icon pointer-events-none absolute -right-1 -top-2 font-mono text-4xl text-cyan-400/10 transition group-hover:text-cyan-400/20"
								aria-hidden
							>
								{row.icon}
							</span>
							<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-fuchsia-300">
								0{i + 1} · {row.label}
							</p>
							<p className="mt-3 text-sm leading-snug text-slate-200">
								{row.value}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
