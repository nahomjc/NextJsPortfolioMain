import HudCorners from "../about/HudCorners";

export default function ProjectsVaultBlock({
	blockRef,
	children,
	statusLabel,
	code = "LIVE",
	className = "",
	spineFillRef,
	signalRef,
	showSpine = false,
}) {
	return (
		<div
			ref={blockRef}
			className={`projects-vault-block relative ${className}`}
		>
			{showSpine ? (
				<div
					className="projects-prod-spine pointer-events-none absolute bottom-0 left-0 top-0 hidden w-10 lg:block"
					aria-hidden
				>
					<div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-cyan-400/15" />
					<div
						ref={spineFillRef}
						className="projects-spine-fill absolute left-1/2 top-0 h-full w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-fuchsia-400 via-cyan-400 to-violet-400"
					/>
					<div
						ref={signalRef}
						className="projects-signal-dot absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#020617] bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.9)]"
					/>
				</div>
			) : null}

			<div className="projects-vault-block__shell relative overflow-hidden lg:ml-8">
				<HudCorners />
				<div className="projects-vault-block__status flex items-center justify-between gap-2 border-b border-cyan-400/15 px-4 py-2.5 sm:px-5">
					<span className="truncate font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300">
						{statusLabel}
					</span>
					<span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-fuchsia-300/80">
						{code}
					</span>
				</div>
				<div className="projects-vault-block__body relative p-4 sm:p-6 md:p-8">
					<div
						className="projects-built-glow pointer-events-none absolute -left-4 top-0 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-[70px]"
						aria-hidden
					/>
					{children}
				</div>
			</div>
		</div>
	);
}
