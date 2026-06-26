import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

const GLYPHS = "アイウエオカキクケコサシスセソ0123456789<>{}[]/\\|";

function pickGlyph() {
	return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function MatrixRainBg() {
	const canvasRef = useRef(null);
	const rafRef = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return undefined;

		const ctx = canvas.getContext("2d");
		if (!ctx) return undefined;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let w = 0;
		let h = 0;
		let fontSize = 14;
		let columns = [];

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = window.innerWidth;
			h = window.innerHeight;
			fontSize = w < 480 ? 12 : 14;
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.font = `600 ${fontSize}px ui-monospace, Consolas, monospace`;
			const count = Math.ceil(w / fontSize);
			columns = Array.from({ length: count }, () => ({
				y: Math.random() * h,
				speed: 0.4 + Math.random() * 1.2,
				chars: Array.from({ length: 18 + Math.floor(Math.random() * 24) }, pickGlyph),
			}));
		};

		resize();
		window.addEventListener("resize", resize);

		const tick = () => {
			ctx.fillStyle = reduced ? "#06030c" : "rgba(6, 3, 12, 0.18)";
			ctx.fillRect(0, 0, w, h);

			if (reduced) {
				rafRef.current = requestAnimationFrame(tick);
				return;
			}

			for (let i = 0; i < columns.length; i++) {
				const col = columns[i];
				const x = i * fontSize;
				col.y += col.speed;

				if (col.y > h + col.chars.length * fontSize) {
					col.y = -col.chars.length * fontSize;
					col.speed = 0.4 + Math.random() * 1.2;
				}

				if (Math.random() < 0.08) col.chars[0] = pickGlyph();

				for (let j = 0; j < col.chars.length; j++) {
					const y = col.y - j * fontSize;
					if (y < -fontSize || y > h) continue;
					const alpha = Math.max(0, 1 - j / col.chars.length);
					ctx.fillStyle =
						j === 0
							? `rgba(167, 243, 247, ${0.55 + alpha * 0.35})`
							: `rgba(34, 211, 238, ${alpha * 0.22})`;
					ctx.fillText(col.chars[j], x, y);
				}
			}

			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(rafRef.current);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="matrix-rain-canvas pointer-events-none fixed inset-0 z-0 h-full w-full"
			aria-hidden
		/>
	);
}

function useReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	return reduced;
}

function TypedLine({ line, active, onComplete, reducedMotion }) {
	const [shown, setShown] = useState("");
	const doneRef = useRef(false);

	useEffect(() => {
		doneRef.current = false;
		if (!active) {
			setShown("");
			return;
		}
		if (reducedMotion || !line.text) {
			setShown(line.text);
			if (!doneRef.current) {
				doneRef.current = true;
				onComplete();
			}
			return;
		}

		setShown("");
		let i = 0;
		let raf = 0;
		let last = performance.now();
		const speed = line.speed ?? 12;

		const step = (now) => {
			if (now - last >= speed) {
				last = now;
				i += 1;
				setShown(line.text.slice(0, i));
				if (i >= line.text.length) {
					if (!doneRef.current) {
						doneRef.current = true;
						window.setTimeout(onComplete, line.pause ?? 80);
					}
					return;
				}
			}
			raf = requestAnimationFrame(step);
		};

		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [active, line, onComplete, reducedMotion]);

	const isTyping = active && shown.length < line.text.length;

	return (
		<div className={`resume-terminal-line ${line.className ?? ""}`}>
			{line.prefix ? (
				<span className="resume-terminal-prefix">{line.prefix}</span>
			) : null}
			<span>{shown}</span>
			{line.showPromptCursor && !isTyping ? (
				<span className="terminal-cursor text-cyan-400">▌</span>
			) : null}
			{isTyping ? <span className="terminal-cursor text-cyan-400">▌</span> : null}
		</div>
	);
}

const RESUME_LINES = [
	{
		prefix: "nahom@portfolio",
		text: ":~$ ./boot --profile=resume --secure",
		className: "text-slate-400",
		pause: 200,
	},
	{
		text: "[ OK ] Neural link established · encryption: AES-256 · locale: en_ET",
		className: "text-emerald-400/90",
		pause: 120,
	},
	{
		text: "[ OK ] Loading operator manifest...",
		className: "text-emerald-400/80",
		pause: 160,
	},
	{ text: "", className: "h-2", speed: 0, pause: 60 },
	{
		prefix: "nahom@portfolio",
		text: ":~$ cat profile/header.txt",
		className: "text-cyan-400",
		pause: 140,
	},
	{
		text: "══════════════════════════════════════════════════════════════",
		className: "text-violet-400/50",
		speed: 4,
		pause: 60,
	},
	{
		text: "  NAHOM TESFAYE",
		className: "resume-terminal-glow font-display text-lg text-cyan-300 sm:text-xl",
		pause: 100,
	},
	{
		text: "  FULL STACK ENGINEER · TECH LEAD · SYSTEM ARCHITECT",
		className: "text-violet-300/90 tracking-widest",
		speed: 10,
		pause: 120,
	},
	{
		text: "  Addis Ababa, ET · nahomfjh@gmail.com",
		className: "text-slate-400",
		pause: 100,
	},
	{
		text: "══════════════════════════════════════════════════════════════",
		className: "text-violet-400/50",
		speed: 4,
		pause: 80,
	},
	{ text: "", className: "h-2", speed: 0, pause: 40 },
	{
		prefix: "nahom@portfolio",
		text: ":~$ grep -A3 'summary' profile.yaml",
		className: "text-cyan-400",
		pause: 120,
	},
	{
		text: "summary: |",
		className: "text-fuchsia-400/90",
		pause: 60,
	},
	{
		text: "  Innovative Full Stack Web Engineer since 2019. I design scalable,",
		className: "text-slate-300",
		speed: 8,
	},
	{
		text: "  high-performance applications, lead cross-functional teams, and turn",
		className: "text-slate-300",
		speed: 8,
	},
	{
		text: "  complex problems into precise, user-focused digital systems.",
		className: "text-slate-300",
		speed: 8,
		pause: 100,
	},
	{ text: "", className: "h-2", speed: 0, pause: 40 },
	{
		prefix: "nahom@portfolio",
		text: ":~$ ls -la ./skills/",
		className: "text-cyan-400",
		pause: 120,
	},
	{
		text: "drwx  frontend/   React.js · Next.js · TypeScript · Tailwind · Mantine",
		className: "text-emerald-300/85",
		speed: 9,
	},
	{
		text: "drwx  backend/    Node.js · Express.js · Spring Boot",
		className: "text-emerald-300/85",
		speed: 9,
	},
	{
		text: "drwx  data/       PostgreSQL · MongoDB · MySQL · Drizzle · Supabase",
		className: "text-emerald-300/85",
		speed: 9,
	},
	{
		text: "drwx  devops/     Git · GitHub · GitLab · CI/CD · Docker",
		className: "text-emerald-300/85",
		speed: 9,
		pause: 100,
	},
	{ text: "", className: "h-2", speed: 0, pause: 40 },
	{
		prefix: "nahom@portfolio",
		text: ":~$ journalctl --unit=experience --reverse",
		className: "text-cyan-400",
		pause: 120,
	},
	{
		text: "── MUYALOGY · Full Stack Developer & Tech Lead · Nov 2023 → Present",
		className: "text-cyan-300 font-semibold",
		speed: 9,
	},
	{
		text: "   ▸ Next.js e-learning platform · Supabase/PostgreSQL · Redux",
		className: "text-slate-400",
		speed: 8,
	},
	{
		text: "   ▸ Payments · Telegram bot integration · team leadership",
		className: "text-slate-400",
		speed: 8,
		pause: 80,
	},
	{
		text: "── JIRET LMS · Technical Lead · 2023 → Present",
		className: "text-cyan-300 font-semibold",
		speed: 9,
	},
	{
		text: "   ▸ Low-code LMS · Next.js · Drizzle ORM · drag-and-drop CMS",
		className: "text-slate-400",
		speed: 8,
	},
	{
		text: "   ▸ Performance tuning · mentoring · modular architecture",
		className: "text-slate-400",
		speed: 8,
		pause: 80,
	},
	{
		text: "── LOOP STATE · Full Stack Developer · Crowd-funded platform",
		className: "text-cyan-300 font-semibold",
		speed: 9,
	},
	{
		text: "   ▸ Next.js + Supabase · auth · funding workflows · scale",
		className: "text-slate-400",
		speed: 8,
		pause: 80,
	},
	{
		text: "── BAZRA MOTORS · Full Stack Developer · Feb–Nov 2023",
		className: "text-cyan-300 font-semibold",
		speed: 9,
	},
	{
		text: "   ▸ E-Wallet · React/MUI · Spring Boot · MySQL · RBAC",
		className: "text-slate-400",
		speed: 8,
		pause: 80,
	},
	{
		text: "── DAN ENERGY · Developer · Apr–Dec 2021",
		className: "text-cyan-300 font-semibold",
		speed: 9,
	},
	{
		text: "   ▸ WordPress e-commerce · ALPR/OCR system · secure checkout",
		className: "text-slate-400",
		speed: 8,
		pause: 100,
	},
	{ text: "", className: "h-2", speed: 0, pause: 40 },
	{
		prefix: "nahom@portfolio",
		text: ":~$ cat education.log certifications.log",
		className: "text-cyan-400",
		pause: 120,
	},
	{
		text: "BSc Computer Science — Admas University (Very Great Distinction)",
		className: "text-violet-300/90",
		speed: 9,
	},
	{
		text: "Practitioner Data Science — United Nations",
		className: "text-violet-300/90",
		speed: 9,
	},
	{
		text: "Certs: React.js · Google IT Support · Responsive Web · Big Data",
		className: "text-slate-400",
		speed: 9,
		pause: 100,
	},
	{ text: "", className: "h-2", speed: 0, pause: 40 },
	{
		prefix: "nahom@portfolio",
		text: ":~$ echo $LEADERSHIP",
		className: "text-cyan-400",
		pause: 120,
	},
	{
		text: "Technical leadership across multiple product teams · mentorship ·",
		className: "text-slate-300",
		speed: 8,
	},
	{
		text: "continuous improvement through modern engineering practices.",
		className: "text-slate-300",
		speed: 8,
		pause: 120,
	},
	{ text: "", className: "h-2", speed: 0, pause: 40 },
	{
		prefix: "nahom@portfolio",
		text: ":~$ open --network linkedin,github,mail",
		className: "text-cyan-400",
		pause: 100,
	},
	{
		text: "[ LINK ] linkedin.com/in/nahom-tesfaye-35b97420b",
		className: "text-emerald-400/90",
		speed: 8,
	},
	{
		text: "[ LINK ] github.com/nahomjc",
		className: "text-emerald-400/90",
		speed: 8,
	},
	{
		text: "[ LINK ] nahomfjh@gmail.com",
		className: "text-emerald-400/90",
		speed: 8,
		pause: 140,
	},
	{
		prefix: "nahom@portfolio",
		text: ":~$ ",
		className: "text-slate-500",
		speed: 0,
		pause: 0,
		showPromptCursor: true,
	},
];

function ResumeTerminal() {
	const reducedMotion = useReducedMotion();
	const [lineIndex, setLineIndex] = useState(reducedMotion ? RESUME_LINES.length : 0);
	const scrollRef = useRef(null);

	const onLineComplete = useCallback(() => {
		setLineIndex((i) => Math.min(i + 1, RESUME_LINES.length));
	}, []);

	useEffect(() => {
		if (reducedMotion) setLineIndex(RESUME_LINES.length);
	}, [reducedMotion]);

	useEffect(() => {
		const el = scrollRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [lineIndex]);

	const done = lineIndex >= RESUME_LINES.length;

	return (
		<div className="resume-terminal-page relative min-h-screen overflow-hidden">
			<MatrixRainBg />
			<div className="matrix-phosphor pointer-events-none fixed inset-0 z-[1]" aria-hidden />
			<div className="matrix-crt-flicker pointer-events-none fixed inset-0 z-[1]" aria-hidden />
			<div className="matrix-scan-sweep pointer-events-none fixed inset-0 z-[1]" aria-hidden />

			<div className="resume-terminal-noise pointer-events-none fixed inset-0 z-[1] opacity-[0.04]" aria-hidden />

			<div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-3 pb-28 pt-6 sm:px-4 sm:pt-8">
				<div className="resume-terminal-shell terminal-chat flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-cyan-500/20 shadow-[0_0_40px_rgba(34,211,238,0.08),0_24px_60px_rgba(0,0,0,0.55)]">
					<div className="terminal-titlebar relative flex shrink-0 items-center border-b border-emerald-500/15 bg-[#0c1018] px-3.5 py-2">
						<div className="flex items-center gap-2">
							<Link
								href="/"
								className="resume-terminal-home-dot terminal-dot terminal-dot--red"
								aria-label="Back to home"
							>
								<span className="sr-only">Back to home</span>
							</Link>
							<span className="terminal-dot terminal-dot--yellow" aria-hidden />
							<span className="terminal-dot terminal-dot--green" aria-hidden />
						</div>
						<div className="pointer-events-none absolute inset-x-0 flex items-center justify-center px-16">
							<p className="truncate font-mono text-[11px] text-slate-400">
								<span className="text-emerald-400">nahom@resume</span>
								<span className="text-slate-600"> — </span>
								<span className="text-slate-500">bash</span>
								<span className="text-slate-600"> · </span>
								<span className="text-cyan-500/80">manifest.sys</span>
							</p>
						</div>
					</div>

					<div className="resume-terminal-status flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-b border-emerald-500/10 bg-[#080b10] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
						<span className="text-emerald-400/80">● online</span>
						<span>cipher: active</span>
						<span className="text-cyan-400/70">{done ? "stream: complete" : "stream: typing"}</span>
					</div>

					<div
						ref={scrollRef}
						className="terminal-chat-output resume-terminal-output min-h-0 flex-1 overflow-y-auto px-4 py-5 font-mono text-[11px] leading-relaxed sm:px-5 sm:text-xs sm:leading-relaxed"
					>
						{RESUME_LINES.map((line, i) =>
							i < lineIndex ? (
								<div key={i} className={`resume-terminal-line ${line.className ?? ""}`}>
									{line.prefix ? (
										<span className="resume-terminal-prefix">{line.prefix}</span>
									) : null}
									<span>{line.text}</span>
									{line.showPromptCursor ? (
										<span className="terminal-cursor text-cyan-400">▌</span>
									) : null}
								</div>
							) : i === lineIndex ? (
								<TypedLine
									key={i}
									line={line}
									active
									onComplete={onLineComplete}
									reducedMotion={reducedMotion}
								/>
							) : null
						)}
					</div>

					<div className="resume-terminal-footer flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-emerald-500/10 bg-[#080b10] px-4 py-3">
						<div className="flex items-center gap-3">
							<a
								href="https://www.linkedin.com/in/nahom-tesfaye-35b97420b/"
								target="_blank"
								rel="noreferrer"
								className="resume-terminal-icon-btn"
								aria-label="LinkedIn"
							>
								<FaLinkedinIn />
							</a>
							<a
								href="https://github.com/nahomjc"
								target="_blank"
								rel="noreferrer"
								className="resume-terminal-icon-btn"
								aria-label="GitHub"
							>
								<FaGithub />
							</a>
							<a
								href="mailto:nahomfjh@gmail.com"
								className="resume-terminal-icon-btn"
								aria-label="Email"
							>
								<FaEnvelope />
							</a>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<Link href="/" className="resume-terminal-btn resume-terminal-btn--ghost">
								← home
							</Link>
							<a
								href="/assets/NAHOM-TESFAYE-cv777.pdf"
								download
								className="resume-terminal-btn resume-terminal-btn--primary"
							>
								download cv
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResumeTerminal;
