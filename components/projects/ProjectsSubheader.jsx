export default function ProjectsSubheader({
	eyebrow,
	secLabel,
	title,
	titleGradient,
	description,
	headerRef,
	className = "",
}) {
	return (
		<header
			ref={headerRef}
			className={`projects-subheader projects-subheader--vault relative mb-8 md:mb-10 ${className}`}
		>
			<p data-reveal className="section-eyebrow">
				<span
					className="h-px w-10 bg-gradient-to-r from-fuchsia-400 to-cyan-400"
					aria-hidden
				/>
				<span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300">
					{eyebrow}
					<span className="text-slate-500"> {secLabel}</span>
				</span>
			</p>
			<h3
				data-reveal
				className="projects-subheader-title mt-4 font-display text-2xl font-bold text-white md:text-3xl"
			>
				{title}{" "}
				<span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
					{titleGradient}
				</span>
			</h3>
			{description ? (
				<p
					data-reveal
					className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base"
				>
					{description}
				</p>
			) : null}
			<div
				data-reveal
				className="projects-subheader-line mt-5 h-px origin-left bg-gradient-to-r from-fuchsia-400/70 via-cyan-400/50 to-transparent"
				aria-hidden
			/>
		</header>
	);
}
