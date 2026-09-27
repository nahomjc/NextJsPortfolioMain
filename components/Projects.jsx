import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
	productionProjects,
	personalProjects,
	PROJECTS_HERO_DESC,
} from "./projects/projectsData";
import SectionShell, { btnPrimary, monoMetaClass } from "./section/SectionShell";

function techTags(tech, limit = 4) {
	return String(tech)
		.split("·")
		.map((t) => t.trim())
		.filter(Boolean)
		.slice(0, limit);
}

function Billboard({ projects }) {
	const items = projects?.length ? projects : [];
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [reduceMotion, setReduceMotion] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReduceMotion(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		if (items.length < 2 || paused || reduceMotion) return undefined;
		const id = window.setInterval(() => {
			if (document.hidden) return;
			setIndex((i) => (i + 1) % items.length);
		}, 5500);
		return () => window.clearInterval(id);
	}, [items.length, paused, reduceMotion]);

	const project = items[index];
	if (!project) return null;
	const tags = techTags(project.tech, 5);

	const go = (dir) => {
		setIndex((i) => (i + dir + items.length) % items.length);
	};

	return (
		<div
			className="nw-billboard group relative overflow-hidden"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onFocusCapture={() => setPaused(true)}
			onBlurCapture={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
			}}
		>
			<div className="nw-billboard__media absolute inset-0" aria-hidden>
				{items.map((item, i) => (
					<div
						key={item.projectUrl}
						className={`nw-billboard__slide ${i === index ? "is-active" : ""}`}
					>
						<Image
							src={item.backgroundImg}
							alt=""
							fill
							priority={i === 0}
							className="nw-billboard__img object-cover object-top"
							sizes="100vw"
						/>
					</div>
				))}
				<div className="nw-billboard__shade" />
				<div className="nw-billboard__vignette" />
			</div>

			<div className="nw-billboard__content relative z-[2] flex min-h-[min(88vw,520px)] flex-col justify-end px-5 pb-12 pt-28 sm:min-h-[480px] sm:px-8 sm:pb-14 md:min-h-[560px] md:px-10 lg:min-h-[640px] lg:pb-16 xl:min-h-[720px]">
				<div className="nw-billboard__mark mb-3 inline-flex items-center gap-2">
					<span className="nw-billboard__n" aria-hidden>
						N
					</span>
					<span className={`${monoMetaClass} text-slate-300`}>
						Featured · {index + 1}/{items.length}
					</span>
				</div>

				<div key={project.projectUrl} className="nw-billboard__copy">
					<h3 className="nw-billboard__title max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
						{project.title}
					</h3>
					<p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg">
						{project.tech}
					</p>
					<ul className="mt-4 flex flex-wrap gap-1.5">
						{tags.map((tag) => (
							<li key={tag} className="nw-poster__chip">
								{tag}
							</li>
						))}
					</ul>
					<div className="mt-7 flex flex-wrap items-center gap-3">
						<Link href={project.projectUrl} className={btnPrimary}>
							Open case study
						</Link>
						<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
							case → {project.projectUrl}
						</span>
					</div>
				</div>

				<div className="nw-billboard__controls mt-8 flex flex-wrap items-center gap-3">
					<button
						type="button"
						className="nw-billboard__nav unstyled"
						aria-label="Previous featured project"
						onClick={() => go(-1)}
					>
						<FaChevronLeft aria-hidden />
					</button>
					<button
						type="button"
						className="nw-billboard__nav unstyled"
						aria-label="Next featured project"
						onClick={() => go(1)}
					>
						<FaChevronRight aria-hidden />
					</button>
					<ol className="nw-billboard__dots" aria-label="Featured projects">
						{items.map((item, i) => (
							<li key={item.projectUrl}>
								<button
									type="button"
									className={`nw-billboard__dot unstyled ${i === index ? "is-active" : ""}`}
									aria-label={`Show ${item.title}`}
									aria-current={i === index ? "true" : undefined}
									onClick={() => setIndex(i)}
								/>
							</li>
						))}
					</ol>
				</div>
			</div>
		</div>
	);
}

function PosterCard({ project, index }) {
	const tags = techTags(project.tech, 3);

	return (
		<Link
			href={project.projectUrl}
			className="nw-poster group"
			style={{ "--nw-i": index }}
			aria-label={`${project.title} case study`}
		>
			<div className="nw-poster__frame">
				<Image
					src={project.backgroundImg}
					alt={project.title}
					fill
					className="nw-poster__img object-cover object-top"
					sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 280px"
				/>
				<div className="nw-poster__shade" aria-hidden />
				<div className="nw-poster__meta">
					<h4 className="nw-poster__title">{project.title}</h4>
					<ul className="nw-poster__chips">
						{tags.map((tag) => (
							<li key={tag} className="nw-poster__chip">
								{tag}
							</li>
						))}
					</ul>
					<span className="nw-poster__cta">
						Open case
						<span aria-hidden>→</span>
					</span>
				</div>
			</div>
		</Link>
	);
}

function ProjectRow({ title, subtitle, projects, rowId, reverse = false }) {
	const trackRef = useRef(null);
	const pausedRef = useRef(false);
	const manualPauseRef = useRef(0);
	const [canPrev, setCanPrev] = useState(true);
	const [canNext, setCanNext] = useState(true);
	const [reduceMotion, setReduceMotion] = useState(false);

	// Two copies for seamless wrap
	const loopProjects = useMemo(
		() => [...projects, ...projects],
		[projects],
	);

	const updateArrows = useCallback(() => {
		const el = trackRef.current;
		if (!el) return;
		// Infinite loop always allows both directions
		setCanPrev(el.scrollWidth > el.clientWidth);
		setCanNext(el.scrollWidth > el.clientWidth);
	}, []);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReduceMotion(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		const el = trackRef.current;
		if (!el) return undefined;
		updateArrows();
		el.addEventListener("scroll", updateArrows, { passive: true });
		window.addEventListener("resize", updateArrows);
		return () => {
			el.removeEventListener("scroll", updateArrows);
			window.removeEventListener("resize", updateArrows);
		};
	}, [updateArrows]);

	// Continuous infinite scroll loop
	useEffect(() => {
		const el = trackRef.current;
		if (!el || reduceMotion || projects.length < 2) return undefined;

		let raf = 0;
		let last = performance.now();
		const speed = reverse ? -0.08 : 0.08; // px per ms (~80px/s)

		const wrap = () => {
			const half = el.scrollWidth / 2;
			if (half <= 0) return;
			if (el.scrollLeft >= half) {
				el.scrollLeft -= half;
			} else if (el.scrollLeft <= 0 && reverse) {
				el.scrollLeft += half;
			}
		};

		// Start mid-set so reverse wrap works immediately
		if (reverse && el.scrollLeft === 0) {
			el.scrollLeft = el.scrollWidth / 4;
		}

		const tick = (now) => {
			const dt = Math.min(now - last, 32);
			last = now;

			const hovering = pausedRef.current;
			const manualUntil = manualPauseRef.current;
			if (!hovering && now > manualUntil && !document.hidden) {
				el.scrollLeft += speed * dt;
				wrap();
			}

			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);

		const onVis = () => {
			last = performance.now();
		};
		document.addEventListener("visibilitychange", onVis);

		return () => {
			cancelAnimationFrame(raf);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [reduceMotion, projects.length, reverse]);

	const pauseManual = (ms = 2800) => {
		manualPauseRef.current = performance.now() + ms;
	};

	const scrollByDir = (dir) => {
		const el = trackRef.current;
		if (!el) return;
		pauseManual();
		const amount = Math.min(el.clientWidth * 0.78, 560);
		el.scrollBy({ left: dir * amount, behavior: "smooth" });
		// After smooth scroll, keep loop seam clean
		window.setTimeout(() => {
			const half = el.scrollWidth / 2;
			if (el.scrollLeft >= half) el.scrollLeft -= half;
			if (el.scrollLeft < 0) el.scrollLeft += half;
		}, 450);
	};

	return (
		<section className="nw-row" aria-labelledby={rowId}>
			<div className="nw-row__head">
				<div>
					<h3 id={rowId} className="nw-row__title">
						{title}
						<span className="nw-row__chevron" aria-hidden>
							›
						</span>
					</h3>
					{subtitle ? <p className="nw-row__sub">{subtitle}</p> : null}
				</div>
				<p className="nw-row__count">{projects.length}</p>
			</div>

			<div
				className="nw-row__rail"
				onMouseEnter={() => {
					pausedRef.current = true;
				}}
				onMouseLeave={() => {
					pausedRef.current = false;
				}}
				onFocusCapture={() => {
					pausedRef.current = true;
				}}
				onBlurCapture={(e) => {
					if (!e.currentTarget.contains(e.relatedTarget)) {
						pausedRef.current = false;
					}
				}}
				onPointerDown={() => {
					pausedRef.current = true;
					pauseManual(3200);
				}}
				onPointerUp={() => {
					pausedRef.current = false;
				}}
			>
				<button
					type="button"
					className="nw-row__arrow nw-row__arrow--prev unstyled"
					aria-label={`Scroll ${title} left`}
					disabled={!canPrev}
					onClick={() => scrollByDir(-1)}
				>
					<FaChevronLeft aria-hidden />
				</button>
				<button
					type="button"
					className="nw-row__arrow nw-row__arrow--next unstyled"
					aria-label={`Scroll ${title} right`}
					disabled={!canNext}
					onClick={() => scrollByDir(1)}
				>
					<FaChevronRight aria-hidden />
				</button>

				<div className="nw-row__fade nw-row__fade--left" aria-hidden />
				<div className="nw-row__fade nw-row__fade--right" aria-hidden />

				<ul
					ref={trackRef}
					className="nw-row__track nw-row__track--loop"
					aria-live="off"
				>
					{loopProjects.map((project, i) => (
						<li
							key={`${rowId}-${project.projectUrl}-${i}`}
							className="nw-row__item"
						>
							<PosterCard project={project} index={i % projects.length} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}

const Projects = () => {
	return (
		<SectionShell
			id="projects"
			index="04"
			eyebrow="projects/"
			title="Selected work"
			description={PROJECTS_HERO_DESC}
			wide
			className="nw-browse"
			headerClassName="nw-browse__header"
		>
			<div className="nw-browse__bleed">
				<Billboard projects={productionProjects} />
			</div>

			<div className="nw-browse__bleed nw-browse__rows mt-10 space-y-10 md:mt-14 md:space-y-12">
				<ProjectRow
					rowId="nw-row-production"
					title="Production · shipped"
					subtitle="Live platforms and client deliveries"
					projects={productionProjects}
				/>
				<ProjectRow
					rowId="nw-row-sandbox"
					title="Sandbox"
					subtitle="Experiments and learning builds"
					projects={personalProjects}
					reverse
				/>
			</div>
		</SectionShell>
	);
};

export default Projects;
