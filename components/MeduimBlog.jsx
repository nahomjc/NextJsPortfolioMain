import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight, FaBookmark, FaClock, FaMedium } from "react-icons/fa";

const MEDIUM_PROFILE = "https://medium.com/@aslandjc7";

const blogPosts = [
	{
		title: "Integrating Chapa",
		excerpt:
			"Integrating Chapa Payment Gateway into a Next.js Project — setup, webhooks, and production tips.",
		readTime: "8 min read",
		date: "Jan 15, 2024",
		image:
			"https://miro.medium.com/v2/resize:fit:640/format:webp/1*ep81vJNBz_bm8R13IfQy2A.png",
		link: "https://medium.com/@aslandjc7/integrating-chapa-payment-gateway-into-a-next-js-project-8767c278d85f",
		tag: "PAYMENTS",
	},
	{
		title: "Balancing Code and Faith",
		excerpt:
			"A guide to being an effective software engineer and a good Christian — discipline, craft, and purpose.",
		readTime: "10 min read",
		date: "Jan 20, 2024",
		image:
			"https://miro.medium.com/v2/resize:fit:828/format:webp/1*_KRDj8Ij-cD3sWf3R8QEXQ.png",
		link: "https://medium.com/@aslandjc7/balancing-code-and-faith-a-guide-to-being-an-effective-software-engineer-and-a-good-christian-df8f8ed370f3",
		tag: "MINDSET",
	},
	{
		title: "Exploring Next.js 15",
		excerpt:
			"Exploring Next.js 15 with the latest features, enhancements, and what they mean for your stack.",
		readTime: "6 min read",
		date: "Jan 25, 2024",
		image:
			"https://miro.medium.com/v2/resize:fit:828/format:webp/1*dmp37aGPKTXSSEJcYjemKA.png",
		link: "https://medium.com/@aslandjc7/exploring-next-js-15-the-latest-features-and-enhancements-e71235f40179",
		tag: "NEXT.JS",
	},
];

const corner =
	"pointer-events-none absolute z-10 h-2.5 w-2.5 border-violet-400/70 dark:border-violet-400/55";

function CardHudCorners() {
	return (
		<>
			<div className={`${corner} left-2 top-2 border-l-2 border-t-2 border-cyan-400/70`} aria-hidden />
			<div className={`${corner} right-2 top-2 border-r-2 border-t-2`} aria-hidden />
			<div className={`${corner} bottom-2 left-2 border-b-2 border-l-2 border-cyan-400/45`} aria-hidden />
			<div className={`${corner} bottom-2 right-2 border-b-2 border-r-2 border-violet-400/45`} aria-hidden />
		</>
	);
}

function BlogCard({ post, cardRef }) {
	return (
		<article ref={cardRef} className="blog-card group relative h-full">
			<div className="blog-card-reveal h-full overflow-hidden rounded-2xl">
				<div className="blog-card-inner relative h-full transition duration-300 group-hover:-translate-y-1.5">
					<div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/20 opacity-0 blur-[1px] transition duration-300 group-hover:opacity-100" />
					<div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/85 bg-white/70 shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark">
						<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
						<div className="relative h-48 w-full overflow-hidden">
							<CardHudCorners />
							<div className="blog-card-media relative h-[115%] w-full">
								<Image
									src={post.image}
									alt={post.title}
									layout="fill"
									objectFit="cover"
									className="transition duration-500 group-hover:scale-[1.04]"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
							<span className="absolute left-3 top-3 z-[2] rounded-md border border-white/20 bg-black/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-violet-200 backdrop-blur-sm">
								{post.tag}
							</span>
						</div>

						<div className="relative flex flex-grow flex-col p-5 md:p-6">
							<h3 className="font-display text-lg font-bold leading-snug text-slate-900 dark:text-white md:text-xl">
								{post.title}
							</h3>
							<p className="mt-2 flex-grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
								{post.excerpt}
							</p>

							<div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
								<div className="flex items-center gap-1.5">
									<FaClock className="text-[10px]" aria-hidden />
									<span>{post.readTime}</span>
								</div>
								<span className="font-mono text-[10px] tracking-wide">{post.date}</span>
							</div>

							<a
								href={post.link}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 inline-flex items-center gap-2 font-semibold text-violet-600 transition hover:text-cyan-600 dark:text-violet-400 dark:hover:text-cyan-300"
							>
								Read article
								<FaArrowRight className="text-xs" aria-hidden />
							</a>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

const MediumBlog = () => {
	const reduceMotion = useReducedMotion();
	const sectionRef = useRef(null);
	const headerRef = useRef(null);
	const theatreRef = useRef(null);
	const gridRef = useRef(null);
	const ctaRef = useRef(null);
	const newsletterRef = useRef(null);
	const railFillRef = useRef(null);
	const railBeamRef = useRef(null);
	const scanBeamRef = useRef(null);
	const orbVioletRef = useRef(null);
	const orbCyanRef = useRef(null);
	const cardRefs = useRef([]);

	useEffect(() => {
		if (reduceMotion || typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger);

		const ctx = gsap.context(() => {
			gsap.from(".blog-header-block", {
				y: 52,
				opacity: 0,
				filter: "blur(12px)",
				duration: 0.95,
				ease: "power3.out",
				scrollTrigger: {
					trigger: headerRef.current,
					start: "top 88%",
					toggleActions: "play none none reverse",
				},
			});

			gsap.from(".blog-stat-chip", {
				y: 28,
				opacity: 0,
				scale: 0.9,
				stagger: 0.09,
				duration: 0.65,
				ease: "back.out(1.4)",
				scrollTrigger: {
					trigger: headerRef.current,
					start: "top 82%",
					toggleActions: "play none none reverse",
				},
			});

			if (railFillRef.current && theatreRef.current) {
				gsap.fromTo(
					railFillRef.current,
					{ scaleX: 0 },
					{
						scaleX: 1,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top 72%",
							end: "bottom 28%",
							scrub: 0.45,
						},
					}
				);
			}

			if (railBeamRef.current && theatreRef.current) {
				gsap.fromTo(
					railBeamRef.current,
					{ left: "0%", opacity: 0.4 },
					{
						left: "100%",
						opacity: 1,
						ease: "none",
						scrollTrigger: {
							trigger: theatreRef.current,
							start: "top 70%",
							end: "bottom 30%",
							scrub: 0.5,
						},
					}
				);
			}

			theatreRef.current?.querySelectorAll(".blog-rail-mark").forEach((mark, i) => {
				gsap.from(mark, {
					y: 20,
					opacity: 0,
					scale: 0.85,
					duration: 0.5,
					delay: i * 0.06,
					ease: "back.out(1.5)",
					scrollTrigger: {
						trigger: mark,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			if (scanBeamRef.current && gridRef.current) {
				gsap.fromTo(
					scanBeamRef.current,
					{ top: "-8%", opacity: 0.1 },
					{
						top: "108%",
						opacity: 0.75,
						ease: "none",
						scrollTrigger: {
							trigger: gridRef.current,
							start: "top 85%",
							end: "bottom 15%",
							scrub: 0.65,
						},
					}
				);
			}

			cardRefs.current.forEach((card, i) => {
				if (!card) return;

				const reveal = card.querySelector(".blog-card-reveal");
				const inner = card.querySelector(".blog-card-inner");
				const media = card.querySelector(".blog-card-media");
				const fromX = i % 3 === 0 ? -48 : i % 3 === 1 ? 0 : 48;
				const rotateY = i % 3 === 0 ? 10 : i % 3 === 2 ? -10 : 0;

				if (reveal) {
					gsap.fromTo(
						reveal,
						{ clipPath: "inset(100% 0 0 0 round 16px)", opacity: 0.35 },
						{
							clipPath: "inset(0% 0 0 0 round 16px)",
							opacity: 1,
							ease: "power2.out",
							scrollTrigger: {
								trigger: card,
								start: "top 92%",
								end: "top 58%",
								scrub: 0.7,
							},
						}
					);
				}

				if (inner) {
					gsap.fromTo(
						inner,
						{ y: 64, x: fromX, rotateY, opacity: 0.2, filter: "blur(8px)" },
						{
							y: 0,
							x: 0,
							rotateY: 0,
							opacity: 1,
							filter: "blur(0px)",
							ease: "power2.out",
							transformOrigin: "50% 100%",
							scrollTrigger: {
								trigger: card,
								start: "top 90%",
								end: "top 55%",
								scrub: 0.75,
							},
						}
					);
				}

				if (media) {
					gsap.fromTo(
						media,
						{ y: "-8%", scale: 1.06 },
						{
							y: "4%",
							scale: 1,
							ease: "none",
							scrollTrigger: {
								trigger: card,
								start: "top bottom",
								end: "bottom top",
								scrub: true,
							},
						}
					);
				}
			});

			const ctaReveal = ctaRef.current?.querySelector(".blog-cta-reveal");
			if (ctaReveal) {
				gsap.fromTo(
					ctaReveal,
					{ clipPath: "inset(0 50% 0 50% round 999px)", opacity: 0.4 },
					{
						clipPath: "inset(0 0% 0 0% round 999px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: ctaRef.current,
							start: "top 88%",
							end: "top 62%",
							scrub: 0.55,
						},
					}
				);
			}

			gsap.from(".blog-cta-btn", {
				y: 24,
				opacity: 0,
				scale: 0.94,
				duration: 0.65,
				ease: "back.out(1.35)",
				scrollTrigger: {
					trigger: ctaRef.current,
					start: "top 78%",
					toggleActions: "play none none reverse",
				},
			});

			const newsletterReveal = newsletterRef.current?.querySelector(".blog-newsletter-reveal");
			const newsletterInner = newsletterRef.current?.querySelector(".blog-newsletter-inner");

			if (newsletterReveal) {
				gsap.fromTo(
					newsletterReveal,
					{ clipPath: "inset(100% 0 0 0 round 18px)", opacity: 0.45 },
					{
						clipPath: "inset(0% 0 0 0 round 18px)",
						opacity: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: newsletterRef.current,
							start: "top 88%",
							end: "top 58%",
							scrub: 0.62,
						},
					}
				);
			}

			if (newsletterInner) {
				gsap.fromTo(
					newsletterInner,
					{ y: 48, opacity: 0.25, filter: "blur(6px)" },
					{
						y: 0,
						opacity: 1,
						filter: "blur(0px)",
						ease: "power2.out",
						scrollTrigger: {
							trigger: newsletterRef.current,
							start: "top 86%",
							end: "top 56%",
							scrub: 0.6,
						},
					}
				);
			}

			newsletterRef.current?.querySelectorAll(".blog-newsletter-field").forEach((field, i) => {
				gsap.from(field, {
					y: 20,
					opacity: 0,
					duration: 0.5,
					delay: i * 0.08,
					ease: "power3.out",
					scrollTrigger: {
						trigger: field,
						start: "top 92%",
						toggleActions: "play none none reverse",
					},
				});
			});

			const watermark = sectionRef.current?.querySelector(".blog-bg-watermark");
			if (watermark) {
				gsap.fromTo(
					watermark,
					{ x: 60, opacity: 0.02 },
					{
						x: -50,
						opacity: 0.08,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top 75%",
							end: "bottom 25%",
							scrub: 0.5,
						},
					}
				);
			}

			if (orbVioletRef.current) {
				gsap.fromTo(
					orbVioletRef.current,
					{ y: 30, x: -25 },
					{
						y: -55,
						x: 35,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					}
				);
			}

			if (orbCyanRef.current) {
				gsap.fromTo(
					orbCyanRef.current,
					{ y: -40, x: 30 },
					{
						y: 60,
						x: -45,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					}
				);
			}

			gsap.from(".blog-footer-cue", {
				y: 14,
				opacity: 0,
				duration: 0.55,
				ease: "power2.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "bottom 90%",
					toggleActions: "play none none reverse",
				},
			});
		}, sectionRef);

		const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400);

		return () => {
			window.clearTimeout(refreshTimer);
			ctx.revert();
		};
	}, [reduceMotion]);

	return (
		<section
			id="blog"
			ref={sectionRef}
			className="blog-section relative scroll-mt-24 overflow-hidden px-4 py-20 md:py-28"
		>
			<div
				className="pointer-events-none absolute inset-0 bg-grid-future opacity-[0.28] dark:opacity-[0.17]"
				aria-hidden
			/>
			<div
				ref={orbVioletRef}
				className="pointer-events-none absolute left-1/4 top-0 h-[min(85vw,480px)] w-[min(85vw,480px)] -translate-y-1/3 rounded-full bg-violet-500/14 blur-[120px] dark:bg-violet-500/16"
				aria-hidden
			/>
			<div
				ref={orbCyanRef}
				className="pointer-events-none absolute bottom-0 right-0 h-[min(70vw,400px)] w-[min(70vw,400px)] translate-y-1/4 rounded-full bg-cyan-500/12 blur-[100px] dark:bg-cyan-400/14"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent dark:via-cyan-400/35"
				aria-hidden
			/>
			<p
				className="blog-bg-watermark pointer-events-none absolute left-[3%] top-1/2 z-0 -translate-y-1/2 font-display text-[clamp(4.5rem,14vw,10rem)] font-bold leading-none text-slate-900/[0.04] dark:text-white/[0.035]"
				aria-hidden
			>
				BLOG
			</p>

			<div className="relative z-10 mx-auto max-w-6xl">
				<header
					ref={headerRef}
					className="blog-header-block mx-auto mb-12 max-w-3xl border-b border-slate-200/80 pb-10 text-center dark:border-white/10 md:mb-14 md:pb-12"
				>
					<div className="flex justify-center">
						<p className="section-eyebrow">
							<span
								className="h-px w-8 bg-gradient-to-r from-violet-500 to-cyan-400"
								aria-hidden
							/>
							Writing
							<span className="font-mono text-[0.65rem] font-normal tracking-[0.15em] text-slate-400 dark:text-slate-500">
								/ Medium
							</span>
						</p>
					</div>
					<div className="mt-4 flex items-center justify-center gap-3">
						<FaMedium
							className="text-3xl text-slate-800 dark:text-violet-400 md:text-4xl"
							aria-hidden
						/>
						<h2 className="font-display text-3xl text-slate-900 dark:text-white md:text-4xl">
							My <span className="text-gradient-future">Blog Posts</span>
						</h2>
					</div>
					<p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base">
						Insights on web development, payments, Next.js, and the craft of building
						software with intention.
					</p>

					<div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2.5">
						{[
							{ label: "Articles", value: String(blogPosts.length) },
							{ label: "Platform", value: "Medium" },
							{ label: "Topics", value: "Dev" },
						].map(({ label, value }) => (
							<div
								key={label}
								className="blog-stat-chip rounded-xl border border-slate-200/80 bg-white/60 px-3 py-2.5 dark:border-white/10 dark:bg-slate-950/40"
							>
								<p className="font-mono text-[9px] tracking-[0.18em] text-violet-600 dark:text-violet-400">
									{label}
								</p>
								<p className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
									{value}
								</p>
							</div>
						))}
					</div>
				</header>

				<div ref={theatreRef} className="blog-theatre">
					<div className="blog-archive-rail relative mb-8 hidden md:block">
						<div className="relative h-px w-full bg-gradient-to-r from-transparent via-slate-300/50 to-transparent dark:via-white/15">
							<div
								ref={railFillRef}
								className="blog-rail-fill absolute inset-y-0 left-0 w-full bg-gradient-to-r from-violet-400/70 via-cyan-400/60 to-violet-400/50"
							/>
							<div
								ref={railBeamRef}
								className="blog-rail-beam absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/50 bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.65)]"
							/>
						</div>
						<div className="mt-4 flex justify-between gap-2">
							{blogPosts.map((post, i) => (
								<div
									key={post.link}
									className="blog-rail-mark flex min-w-0 flex-1 flex-col items-center text-center"
								>
									<span className="font-mono text-[9px] text-slate-400">
										{String(i + 1).padStart(2, "0")}
									</span>
									<span className="mt-1 truncate font-mono text-[8px] uppercase tracking-[0.14em] text-violet-600/80 dark:text-violet-400/80">
										{post.tag}
									</span>
								</div>
							))}
						</div>
					</div>

					<div ref={gridRef} className="blog-grid relative">
						<div
							ref={scanBeamRef}
							className="blog-scan-beam pointer-events-none absolute inset-x-0 z-20 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent opacity-0"
							aria-hidden
						/>

						<div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
							{blogPosts.map((post, i) => (
								<BlogCard
									key={post.link}
									post={post}
									cardRef={(el) => {
										cardRefs.current[i] = el;
									}}
								/>
							))}
						</div>
					</div>
				</div>

				<div ref={ctaRef} className="blog-cta mt-12 text-center md:mt-14">
					<div className="blog-cta-reveal inline-block overflow-hidden rounded-full">
						<a
							href={MEDIUM_PROFILE}
							target="_blank"
							rel="noopener noreferrer"
							className="blog-cta-btn unstyled inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-4 font-display text-base font-bold text-white shadow-lg transition hover:brightness-110 dark:from-white dark:via-slate-100 dark:to-white dark:text-slate-900 md:text-lg"
						>
							<FaMedium className="text-2xl" aria-hidden />
							Follow Me on Medium
						</a>
					</div>
				</div>

				<div ref={newsletterRef} className="blog-newsletter mt-14 md:mt-16">
					<div className="blog-newsletter-reveal overflow-hidden rounded-2xl">
						<div className="blog-newsletter-inner relative overflow-hidden rounded-2xl border border-violet-400/20 bg-white/70 p-8 text-center shadow-card-light backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/55 dark:shadow-card-dark md:p-10">
							<div className="noise-texture pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" />
							<div className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-violet-400/50" />
							<div className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-cyan-400/50" />

							<div className="relative mx-auto flex max-w-lg flex-col items-center">
								<FaBookmark
									className="mb-3 text-2xl text-violet-600 dark:text-violet-400"
									aria-hidden
								/>
								<h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
									Subscribe to My Blog
								</h3>
								<p className="mt-2 text-sm text-slate-600 dark:text-slate-400 md:text-base">
									Get notified when I publish new articles and content.
								</p>

								<div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row">
									<input
										type="email"
										placeholder="Enter your email"
										className="blog-newsletter-field flex-1 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 text-sm text-slate-900 focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/25 dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
									/>
									<button
										type="button"
										className="blog-newsletter-field unstyled rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
									>
										Subscribe
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<p className="blog-footer-cue mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
					medium.com/@aslandjc7 · long-form essays
				</p>
			</div>
		</section>
	);
};

export default MediumBlog;
