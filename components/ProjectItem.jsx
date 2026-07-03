import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProjectItem = React.forwardRef(function ProjectItem(
	{ title, backgroundImg, projectUrl, tech, index, featured = false, variant = "production" },
	ref,
) {
	const pkgLabel = String(index + 1).padStart(2, "0");
	const variantLabel = variant === "personal" ? "SANDBOX" : "PROD";
	const isSandbox = variant === "personal";

	return (
		<Link href={projectUrl} className="group block h-full">
			<article
				ref={ref}
				className={`project-card project-holo-card relative h-full ${featured ? "project-card--featured" : ""} ${isSandbox ? "project-holo-card--sandbox" : ""}`}
				data-index={index}
			>
				<div className="project-holo-card__aura pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-md transition duration-500 group-hover:opacity-100" aria-hidden />

				<div className="project-card-inner project-card-inner--vault project-holo-card__shell relative h-full overflow-hidden rounded-2xl">
					<div className="project-holo-card__border pointer-events-none absolute -inset-px rounded-2xl" aria-hidden />
					<div className="project-card-reveal relative h-full">
						<div className="project-card-glow pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-400/25 via-transparent to-fuchsia-500/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" aria-hidden />
						<div className="noise-texture pointer-events-none absolute inset-0 z-[1] opacity-[0.06]" />
						<div className="project-holo-card__scanlines pointer-events-none absolute inset-0 z-[2] opacity-[0.04]" aria-hidden />

						<div className={`relative ${featured ? "p-3" : "p-2.5"}`}>
							<div className="project-holo-card__media-wrap relative overflow-hidden rounded-xl">
								<span className="project-holo-corner project-holo-corner--tl" aria-hidden />
								<span className="project-holo-corner project-holo-corner--tr" aria-hidden />
								<span className="project-holo-corner project-holo-corner--bl" aria-hidden />
								<span className="project-holo-corner project-holo-corner--br" aria-hidden />

								<div
									className={`project-card-media relative w-full overflow-hidden ${
										featured ? "aspect-[21/9]" : "aspect-[16/10]"
									}`}
								>
									<Image
										className="project-card-image object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
										src={backgroundImg}
										alt={title}
										fill
										sizes={featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 400px"}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/55 to-cyan-950/10" />
									<div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cyan-400/10 to-transparent" />
									<div className="project-card-scan pointer-events-none absolute inset-x-0 top-0 z-[3] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0 transition group-hover:opacity-100" aria-hidden />

									<span
										className="project-holo-card__index pointer-events-none absolute right-3 top-3 z-[2] font-display text-4xl font-bold text-white/[0.07]"
										aria-hidden
									>
										{pkgLabel}
									</span>

									<div className="absolute left-3 top-3 z-[4] flex flex-wrap gap-2">
										<span className="rounded-md border border-cyan-400/45 bg-black/55 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300 backdrop-blur-md">
											{variantLabel} · {pkgLabel}
										</span>
										{featured ? (
											<span className="rounded-md border border-fuchsia-400/45 bg-fuchsia-500/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-fuchsia-100 backdrop-blur-md">
												Flagship
											</span>
										) : null}
									</div>
								</div>

								<div
									className={`project-card-content absolute inset-x-0 bottom-0 z-[4] flex flex-col gap-2.5 ${
										featured ? "p-6 md:p-8" : "p-4 md:p-5"
									}`}
								>
									<p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400/75">
										Route · {projectUrl}
									</p>
									<h3
										className={`font-display font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] ${
											featured ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl md:text-2xl"
										}`}
									>
										{title}
									</h3>
									{tech ? (
										<p className={`line-clamp-2 text-cyan-100/85 ${featured ? "max-w-3xl text-sm sm:text-base" : "text-sm"}`}>
											{tech}
										</p>
									) : null}
									<span className="project-holo-card__cta inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-500/10 px-3.5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-50 backdrop-blur-sm transition group-hover:border-cyan-300/60 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]">
										<span>Open dossier</span>
										<span aria-hidden className="transition group-hover:translate-x-1">→</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</Link>
	);
});

export default ProjectItem;
