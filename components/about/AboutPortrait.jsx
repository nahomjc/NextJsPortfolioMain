import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import AboutImg from "../../public/assets/download.png";
import MatrixPortraitImg from "../../public/assets/matrix.png";

function PortraitMatrixGlitch({ matrixSrc, active }) {
	const opacity = useMotionValue(0);
	const glitchX = useMotionValue(0);
	const glitchSkew = useMotionValue(0);
	const matrixSrcUrl =
		typeof matrixSrc === "string" ? matrixSrc : matrixSrc.src;

	useEffect(() => {
		if (!active) return undefined;

		let alive = true;
		const timeouts = new Set();

		const wait = (ms) =>
			new Promise((resolve) => {
				const id = window.setTimeout(resolve, ms);
				timeouts.add(id);
			});

		const hide = () => {
			opacity.set(0);
			glitchX.set(0);
			glitchSkew.set(0);
		};

		const flash = () => {
			glitchX.set((Math.random() - 0.5) * 22);
			glitchSkew.set((Math.random() - 0.5) * 4);
			opacity.set(0.5 + Math.random() * 0.5);
		};

		const loop = async () => {
			hide();
			await wait(350 + Math.random() * 1600);
			while (alive) {
				const burstCount = 1 + Math.floor(Math.random() * 4);
				for (let i = 0; i < burstCount && alive; i += 1) {
					flash();
					await wait(40 + Math.random() * 130);
					if (!alive) break;
					hide();
					if (i < burstCount - 1) await wait(20 + Math.random() * 65);
				}
				if (!alive) break;
				if (Math.random() > 0.62) {
					flash();
					await wait(160 + Math.random() * 340);
					if (!alive) break;
					hide();
				}
				await wait(280 + Math.random() * 1900);
			}
		};

		loop();
		return () => {
			alive = false;
			for (const id of timeouts) window.clearTimeout(id);
			hide();
		};
	}, [active, opacity, glitchX, glitchSkew]);

	if (!active) return null;

	return (
		<motion.div
			className="about-portrait-matrix-layer pointer-events-none absolute inset-0 z-[6] overflow-hidden"
			style={{ opacity, x: glitchX, skewX: glitchSkew }}
			aria-hidden
		>
			<div className="about-portrait-matrix-glitch-wrap absolute inset-0">
				<Image
					className="object-cover"
					src={matrixSrc}
					alt=""
					fill
					style={{ objectPosition: "top" }}
					sizes="(max-width: 1024px) 80vw, 380px"
					priority
				/>
				<div
					className="about-portrait-matrix-rgb about-portrait-matrix-rgb--cyan"
					style={{ backgroundImage: `url(${matrixSrcUrl})` }}
				/>
				<div
					className="about-portrait-matrix-rgb about-portrait-matrix-rgb--magenta"
					style={{ backgroundImage: `url(${matrixSrcUrl})` }}
				/>
			</div>
		</motion.div>
	);
}

export default function AboutPortrait({ reduceMotion }) {
	return (
		<div className="about-portrait-frame relative mx-auto w-full">
			<div className="about-portrait-pedestal pointer-events-none absolute -bottom-4 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-cyan-400/20 blur-xl" aria-hidden />
			<div
				className="about-portrait-aura absolute -inset-4 rounded-2xl bg-gradient-to-br from-cyan-400/30 via-transparent to-violet-500/30 blur-lg"
				aria-hidden
			/>
			<div className="about-portrait-inner relative overflow-hidden rounded-xl border border-cyan-400/30 bg-slate-950/80 shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_0_60px_rgba(34,211,238,0.15),inset_0_0_40px_rgba(34,211,238,0.05)]">
				<div className="about-portrait-inner__scan pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" aria-hidden />
				<div className="relative aspect-[3/4] w-full overflow-hidden">
					<Image
						className="object-cover"
						src={AboutImg}
						alt="Nahom — developer portrait"
						fill
						style={{ objectPosition: "top" }}
						priority
						sizes="(max-width: 1024px) 80vw, 380px"
					/>
					<PortraitMatrixGlitch
						matrixSrc={MatrixPortraitImg}
						active={!reduceMotion}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-cyan-500/5" />
				</div>
				<div className="flex items-center justify-between border-t border-cyan-400/20 bg-black/40 px-4 py-2.5 backdrop-blur-sm">
					<span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/80">
						Engineer · L4
					</span>
					<span className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
						Verified
					</span>
				</div>
			</div>
		</div>
	);
}
