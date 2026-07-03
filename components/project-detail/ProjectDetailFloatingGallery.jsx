import { useCallback, useEffect, useRef, useState } from "react";

export default function ProjectDetailFloatingGallery({
	title = "Platform screens",
	children,
}) {
	const stageRef = useRef(null);
	const windowRef = useRef(null);
	const dragRef = useRef({ active: false, startX: 0, startY: 0, originX: 0, originY: 0 });
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [ready, setReady] = useState(false);
	const [minimized, setMinimized] = useState(false);

	const placeWindow = useCallback(() => {
		const stage = stageRef.current;
		const win = windowRef.current;
		if (!stage || !win) return;

		const stageW = stage.clientWidth;
		const winW = win.offsetWidth;
		const winH = minimized ? 44 : win.offsetHeight;
		const padding = 12;

		const x =
			stageW <= 640
				? Math.max(padding, (stageW - winW) / 2)
				: Math.max(padding, Math.min(stageW - winW - padding, stageW * 0.48));
		const y = Math.max(padding, (stage.clientHeight - winH) / 2);

		setPos({ x, y });
		setReady(true);
	}, [minimized]);

	useEffect(() => {
		placeWindow();
		const onResize = () => placeWindow();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [placeWindow]);

	useEffect(() => {
		if (ready) placeWindow();
	}, [minimized, ready, placeWindow]);

	const clampPosition = useCallback(
		(x, y) => {
			const stage = stageRef.current;
			const win = windowRef.current;
			if (!stage || !win) return { x, y };

			const maxX = stage.clientWidth - win.offsetWidth - 8;
			const maxY = stage.clientHeight - (minimized ? 44 : win.offsetHeight) - 8;

			return {
				x: Math.max(8, Math.min(maxX, x)),
				y: Math.max(8, Math.min(maxY, y)),
			};
		},
		[minimized],
	);

	const onPointerDown = (e) => {
		if (e.button !== 0) return;
		dragRef.current = {
			active: true,
			startX: e.clientX,
			startY: e.clientY,
			originX: pos.x,
			originY: pos.y,
		};
		e.currentTarget.setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e) => {
		if (!dragRef.current.active) return;
		const dx = e.clientX - dragRef.current.startX;
		const dy = e.clientY - dragRef.current.startY;
		setPos(clampPosition(dragRef.current.originX + dx, dragRef.current.originY + dy));
	};

	const onPointerEnd = (e) => {
		dragRef.current.active = false;
		if (e.currentTarget.hasPointerCapture(e.pointerId)) {
			e.currentTarget.releasePointerCapture(e.pointerId);
		}
	};

	return (
		<section className="project-detail-gallery-stage" aria-label={title}>
			<div className="project-detail-gallery-stage__header mb-4 flex items-center justify-between gap-3">
				<p className="font-mono text-[9px] uppercase tracking-[0.24em] text-cyan-400/80">
					Visual archive
				</p>
				<p className="font-mono text-[8px] text-slate-500">
					Drag the window to reposition
				</p>
			</div>

			<div
				ref={stageRef}
				className="project-detail-gallery-stage__canvas relative min-h-[460px] sm:min-h-[520px]"
			>
				<div
					className="project-detail-gallery-stage__grid pointer-events-none absolute inset-0 rounded-2xl border border-dashed border-cyan-400/10"
					aria-hidden
				/>

				<div
					ref={windowRef}
					className={`project-detail-float-window w-[min(720px,calc(100%-1.5rem))] ${ready ? "is-ready" : ""} ${minimized ? "is-minimized" : ""}`}
					style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
				>
					<div
						className="project-detail-float-window__chrome touch-none select-none"
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerEnd}
						onPointerCancel={onPointerEnd}
					>
						<div className="flex min-w-0 items-center gap-2">
							<div className="project-detail-float-window__dots shrink-0" aria-hidden>
								<button
									type="button"
									className="project-detail-float-window__dot project-detail-float-window__dot--close"
									aria-label={minimized ? "Restore preview" : "Minimize preview"}
									onPointerDown={(e) => e.stopPropagation()}
									onClick={() => setMinimized((v) => !v)}
								/>
								<span className="project-detail-float-window__dot project-detail-float-window__dot--amber" />
								<span className="project-detail-float-window__dot project-detail-float-window__dot--green" />
							</div>
							<p className="project-detail-float-window__title truncate font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300/90">
								{title}
							</p>
						</div>
						<span className="project-detail-float-window__drag-hint shrink-0 font-mono text-[7px] uppercase tracking-[0.14em] text-slate-500">
							⠿ Drag
						</span>
					</div>

					{!minimized ? (
						<div className="project-detail-float-window__body">
							<div
								className="project-detail-float-window__scanline pointer-events-none absolute inset-0"
								aria-hidden
							/>
							{children}
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}
