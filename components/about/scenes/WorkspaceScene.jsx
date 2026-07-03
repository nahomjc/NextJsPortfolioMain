import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import HudCorners from "../HudCorners";

const AboutWorkspacePly = dynamic(() => import("../../AboutWorkspacePly"), {
	ssr: false,
	loading: () => (
		<div
			className="flex h-[min(52vw,340px)] w-full items-center justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-white/10 dark:bg-slate-950/30 sm:h-[300px] md:h-[320px]"
			aria-hidden
		>
			<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
				Loading workspace…
			</span>
		</div>
	),
});

export default function WorkspaceScene({ workspaceRef, activeScene = 0 }) {
	const [isMobileLayout, setIsMobileLayout] = useState(false);
	const [nearViewport, setNearViewport] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return undefined;
		const mq = window.matchMedia("(max-width: 1023px)");
		const sync = () => setIsMobileLayout(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		if (!isMobileLayout) return undefined;
		const el = workspaceRef?.current;
		if (!el) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setNearViewport(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "240px 0px", threshold: 0 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [isMobileLayout, workspaceRef]);

	const mount3d = isMobileLayout ? nearViewport : activeScene >= 2;

	return (
		<>
			<p className="about-scene-eyebrow font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-400">
				04 · Workspace
			</p>
			<h3 className="about-scene-heading mt-4 font-display text-2xl font-bold text-white md:text-3xl">
				My <span className="text-gradient-future">desk in 3D.</span>
			</h3>
			<p className="about-scene-body mt-2 max-w-lg text-sm text-slate-300">
				Interactive workspace preview — tap to browse selected builds, including
				AI-assisted and bot-integrated projects.
			</p>
			<div
				ref={workspaceRef}
				className="about-workspace-stage mt-5 overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-950/90 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_32px_80px_-24px_rgba(0,0,0,0.45)] dark:border-white/10"
			>
				<HudCorners />
				<div className="relative p-1 sm:p-2">
					{mount3d ? (
						<AboutWorkspacePly />
					) : (
						<div
							className="flex h-[min(52vw,340px)] w-full items-center justify-center sm:h-[300px] md:h-[320px]"
							aria-hidden
						>
							<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
								Scroll to load workspace…
							</span>
						</div>
					)}
				</div>
			</div>
			<div className="mt-6 flex flex-wrap items-center gap-4">
				<Link href="/#projects" className="group inline-flex">
					<span className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-5 py-2.5 font-semibold text-cyan-700 transition hover:border-cyan-400/70 hover:bg-cyan-500/20 dark:text-cyan-300">
						Latest projects
						<span className="transition-transform group-hover:translate-x-0.5">
							→
						</span>
					</span>
				</Link>
				<p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
					Route / #projects
				</p>
			</div>
		</>
	);
}
