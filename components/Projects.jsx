import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
	productionProjects,
	personalProjects,
	PROJECTS_HERO_DESC,
} from "./projects/projectsData";
import SectionShell, { monoMetaClass } from "./section/SectionShell";

function techTags(tech) {
	return String(tech)
		.split("·")
		.map((t) => t.trim())
		.filter(Boolean)
		.slice(0, 5);
}

function ProjectCard({ project, featured = false }) {
	const tags = techTags(project.tech);

	return (
		<Link
			href={project.projectUrl}
			className={`eng-project-card group ${featured ? "eng-project-card--featured" : ""}`}
		>
			<div className="eng-project-card__media">
				<Image
					src={project.backgroundImg}
					alt={project.title}
					fill
					className="object-cover object-top"
					sizes={
						featured
							? "(max-width: 768px) 100vw, 66vw"
							: "(max-width: 768px) 100vw, 33vw"
					}
				/>
				<div className="eng-project-card__shade" aria-hidden />
				{featured ? (
					<div className="absolute inset-x-0 bottom-0 z-[2] p-6 sm:p-8 md:p-10">
						<div className="flex flex-wrap items-center gap-3">
							<span className="rounded-md border border-cyan-300/30 bg-cyan-400/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200">
								Featured
							</span>
							<span className={`${monoMetaClass} text-slate-300`}>
								Production
							</span>
						</div>
						<h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
							{project.title}
						</h3>
						<p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
							{project.tech}
						</p>
						<span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition group-hover:gap-3">
							Open case study
							<span aria-hidden>→</span>
						</span>
					</div>
				) : null}
			</div>
			{!featured ? (
				<div className="p-5">
					<div className="flex items-start justify-between gap-3">
						<h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
							{project.title}
						</h3>
						<span
							className="mt-1 font-mono text-cyan-600 opacity-0 transition group-hover:opacity-100 dark:text-cyan-400"
							aria-hidden
						>
							→
						</span>
					</div>
					<div className="mt-3 flex flex-wrap gap-1.5">
						{tags.map((tag) => (
							<span
								key={tag}
								className="rounded-md border border-slate-900/10 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:border-white/10 dark:text-slate-400"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			) : null}
		</Link>
	);
}

const Projects = () => {
	const [featured, ...rest] = productionProjects;

	return (
		<SectionShell
			id="projects"
			index="04"
			eyebrow="projects/"
			title="Selected work"
			description={PROJECTS_HERO_DESC}
			wide
		>
			<div className="mb-6 flex items-baseline justify-between gap-4">
				<p className={monoMetaClass}>Production · shipped</p>
				<p className="font-mono text-[11px] tabular-nums text-slate-500">
					{productionProjects.length}
				</p>
			</div>

			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{featured ? <ProjectCard project={featured} featured /> : null}
				{rest.map((project) => (
					<ProjectCard key={project.projectUrl} project={project} />
				))}
			</div>

			<div className="mt-20">
				<div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-900/10 pb-4 dark:border-white/10">
					<div>
						<p className={monoMetaClass}>Sandbox</p>
						<p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
							Experiments and learning builds
						</p>
					</div>
					<p className="font-mono text-[11px] tabular-nums text-slate-500">
						{personalProjects.length}
					</p>
				</div>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{personalProjects.map((project) => (
						<ProjectCard key={project.projectUrl} project={project} />
					))}
				</div>
			</div>
		</SectionShell>
	);
};

export default Projects;
