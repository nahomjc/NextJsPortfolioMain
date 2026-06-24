import React from "react";

import Link from "next/link";

import Image from "next/image";



const corner =

	"pointer-events-none absolute z-10 h-3 w-3 border-cyan-400/70 dark:border-cyan-400/55";



function HudCorners({ featured }) {

	const size = featured ? "h-4 w-4" : "h-3 w-3";

	const pos = featured ? "left-3 top-3" : "left-2 top-2";

	return (

		<>

			<div

				className={`${corner} ${size} ${pos} border-l-2 border-t-2`}

				aria-hidden

			/>

			<div

				className={`${corner} ${size} ${featured ? "right-3 top-3" : "right-2 top-2"} border-r-2 border-t-2 border-violet-400/70 dark:border-violet-400/55`}

				aria-hidden

			/>

			<div

				className={`${corner} ${size} ${featured ? "bottom-3 left-3" : "bottom-2 left-2"} border-b-2 border-l-2 border-violet-400/50 dark:border-violet-400/40`}

				aria-hidden

			/>

			<div

				className={`${corner} ${size} ${featured ? "bottom-3 right-3" : "bottom-2 right-2"} border-b-2 border-r-2 border-cyan-400/50 dark:border-cyan-400/40`}

				aria-hidden

			/>

		</>

	);

}



const ProjectItem = React.forwardRef(function ProjectItem(

	{ title, backgroundImg, projectUrl, tech, index, featured = false, variant = "production" },

	ref

) {

	const pkgLabel = String(index + 1).padStart(2, "0");

	const variantLabel = variant === "personal" ? "SANDBOX" : "PROD";



	return (

		<Link href={projectUrl} legacyBehavior={false} className="group block h-full">
			<article

				ref={ref}

				className={`project-card relative h-full ${featured ? "project-card--featured" : ""}`}

				data-index={index}

			>

				<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyan-500/25 via-transparent to-violet-500/25 opacity-0 blur-[1px] transition duration-300 group-hover:opacity-100 dark:from-cyan-400/30 dark:to-violet-500/30" />

				<div className="project-card-inner relative h-full overflow-hidden rounded-2xl border border-slate-200/85 bg-white/50 shadow-card-light backdrop-blur-md transition duration-300 group-hover:border-cyan-400/35 group-hover:shadow-glow dark:border-white/10 dark:bg-slate-900/45 dark:shadow-card-dark dark:group-hover:border-cyan-400/30 dark:group-hover:shadow-glow">

					<div className="project-card-reveal relative h-full">

					<div className="project-card-glow pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-transparent to-fuchsia-500/15 opacity-0 blur-2xl" aria-hidden />

					<div className="noise-texture pointer-events-none absolute inset-0 z-[1] opacity-[0.04] dark:opacity-[0.07]" />

					<div className={`relative ${featured ? "p-2.5 sm:p-3" : "p-2"}`}>

						<div className="relative overflow-hidden rounded-xl ring-1 ring-slate-200/60 dark:ring-white/10">

							<HudCorners featured={featured} />

							<div

								className={`project-card-media relative w-full overflow-hidden ${

									featured ? "aspect-[21/9] sm:aspect-[2.4/1]" : "aspect-[16/10]"

								}`}

							>

								<Image

									className="project-card-image transition duration-700 group-hover:scale-[1.05]"

									src={backgroundImg}

									alt={title}

									layout="fill"

									objectFit="cover"

									sizes={

										featured

											? "(max-width: 768px) 100vw, 1200px"

											: "(max-width: 768px) 100vw, 50vw"

									}

								/>

								<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/15 opacity-90 transition duration-300 group-hover:opacity-95" />

								<div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-60" />

								<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 transition group-hover:opacity-100" />

								{featured ? (

									<div

										className="project-card-scan pointer-events-none absolute inset-x-0 top-0 z-[3] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0"

										aria-hidden

									/>

								) : (

									<div

										className="project-card-scan project-card-scan--sub pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-gradient-to-r from-transparent via-fuchsia-300/80 to-transparent opacity-0"

										aria-hidden

									/>

								)}



								<div className="absolute left-3 top-3 z-[2] flex flex-wrap gap-2">

									<span className="rounded border border-cyan-400/40 bg-black/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300 backdrop-blur-sm">

										{variantLabel} · {pkgLabel}

									</span>

									{featured ? (

										<span className="rounded border border-fuchsia-400/40 bg-fuchsia-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fuchsia-200 backdrop-blur-sm">

											Flagship

										</span>

									) : null}

								</div>

							</div>



							<div

								className={`project-card-content absolute inset-x-0 bottom-0 z-[2] flex flex-col gap-2 ${

									featured ? "p-5 sm:p-6 md:p-7" : "p-4 md:p-5"

								}`}

							>

								<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/80">

									Route · {projectUrl}

								</p>

								<h3

									className={`font-display font-bold text-white drop-shadow-md ${

										featured ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl md:text-2xl"

									}`}

								>

									{title}

								</h3>

								{tech ? (

									<p

										className={`font-medium text-cyan-100/90 ${

											featured ? "max-w-3xl text-sm sm:text-base" : "text-sm"

										}`}

									>

										{tech}

									</p>

								) : null}

								<span className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/95 backdrop-blur-sm transition group-hover:border-cyan-400/55 group-hover:bg-cyan-500/15">

									<span>Open dossier</span>

									<span

										aria-hidden

										className="text-sm transition group-hover:translate-x-0.5"

									>

										→

									</span>

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

