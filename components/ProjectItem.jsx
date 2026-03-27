import React from "react";
import Link from "next/link";
import Image from "next/image";

const corner =
	"pointer-events-none absolute z-10 h-3 w-3 border-cyan-400/70 dark:border-cyan-400/55";

function HudCorners() {
	return (
		<>
			<div className={`${corner} left-2 top-2 border-l-2 border-t-2`} aria-hidden />
			<div
				className={`${corner} right-2 top-2 border-r-2 border-t-2 border-violet-400/70 dark:border-violet-400/55`}
				aria-hidden
			/>
			<div
				className={`${corner} bottom-2 left-2 border-b-2 border-l-2 border-violet-400/50 dark:border-violet-400/40`}
				aria-hidden
			/>
			<div
				className={`${corner} bottom-2 right-2 border-b-2 border-r-2 border-cyan-400/50 dark:border-cyan-400/40`}
				aria-hidden
			/>
		</>
	);
}

const ProjectItem = ({ title, backgroundImg, projectUrl, tech }) => {
	return (
		<Link href={projectUrl} className="group block">
			<div className="relative">
				<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/25 via-transparent to-violet-500/25 opacity-0 blur-[1px] transition duration-300 group-hover:opacity-100 dark:from-cyan-400/30 dark:to-violet-500/30" />
				<div className="relative overflow-hidden rounded-2xl border border-slate-200/85 bg-white/50 shadow-card-light backdrop-blur-md transition duration-300 group-hover:border-cyan-400/35 group-hover:shadow-glow dark:border-white/10 dark:bg-slate-900/45 dark:shadow-card-dark dark:group-hover:border-cyan-400/30 dark:group-hover:shadow-glow">
					<div className="noise-texture pointer-events-none absolute inset-0 z-[1] opacity-[0.04] dark:opacity-[0.07]" />
					<div className="relative p-2">
						<div className="relative overflow-hidden rounded-xl ring-1 ring-slate-200/60 dark:ring-white/10">
							<HudCorners />
							<div className="relative aspect-[16/10] w-full">
								<Image
									className="transition duration-500 group-hover:scale-[1.04] group-hover:opacity-[0.42]"
									src={backgroundImg}
									alt={title}
									layout="fill"
									objectFit="cover"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/10 opacity-88 transition duration-300 group-hover:opacity-92" />
								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 transition group-hover:opacity-100" />
							</div>
							<div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-2 p-4 md:p-5">
								<h3 className="font-display text-xl text-white drop-shadow-md md:text-2xl">
									{title}
								</h3>
								{tech ? (
									<p className="text-sm font-medium text-cyan-100/90">{tech}</p>
								) : null}
								<span className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/95 backdrop-blur-sm transition group-hover:border-cyan-400/55 group-hover:bg-cyan-500/15">
									Open dossier
									<span
										aria-hidden
										className="translate-x-0 text-sm transition group-hover:translate-x-0.5"
									>
										→
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectItem;
