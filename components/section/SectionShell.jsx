import React, { useEffect, useRef } from "react";

/**
 * Shared chrome for below-hero sections.
 * Hero keeps its own styling.
 */
export default function SectionShell({
	id,
	index,
	eyebrow,
	title,
	description,
	children,
	className = "",
	headerClassName = "",
	wide = false,
	as: Tag = "section",
}) {
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || typeof window === "undefined") return undefined;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			el.classList.add("is-inview");
			return undefined;
		}
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add("is-inview");
					io.disconnect();
				}
			},
			{ rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<Tag
			id={id}
			ref={ref}
			className={`eng-section relative scroll-mt-24 py-24 md:py-32 ${className}`}
		>
			<div
				className={`eng-section__glow pointer-events-none absolute inset-x-0 top-0 h-px`}
				aria-hidden
			/>
			<div
				className={`relative mx-auto w-full px-4 sm:px-6 lg:px-8 ${
					wide ? "max-w-7xl" : "max-w-6xl"
				}`}
			>
				{(eyebrow || title || description) && (
					<header
						className={`eng-reveal eng-reveal--1 mb-12 md:mb-16 ${headerClassName}`}
					>
						<div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-900/10 pb-6 dark:border-white/10">
							<div className="min-w-0 max-w-2xl">
								{eyebrow || index ? (
									<p className="eng-eyebrow">
										{index ? (
											<span className="eng-eyebrow__index">{index}</span>
										) : null}
										{eyebrow ? <span>{eyebrow}</span> : null}
									</p>
								) : null}
								{title ? <h2 className="eng-title mt-3">{title}</h2> : null}
							</div>
							{description ? (
								<p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-right md:text-[15px]">
									{description}
								</p>
							) : null}
						</div>
					</header>
				)}
				<div className="eng-reveal eng-reveal--2">{children}</div>
			</div>
		</Tag>
	);
}

export const panelClass =
	"rounded-xl border border-slate-900/[0.08] bg-white/70 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-white/[0.08] dark:bg-[#0a1220]/55 dark:shadow-[0_0_0_1px_rgba(34,211,238,0.04)]";

export const hairlineClass = "border-slate-900/10 dark:border-white/10";

export const linkAccentClass =
	"text-cyan-700 transition hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200";

export const monoMetaClass =
	"font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400";

export const ctaClass =
	"inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_-6px_rgba(34,211,238,0.55)] transition hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400";

export const ghostCtaClass =
	"inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300";
