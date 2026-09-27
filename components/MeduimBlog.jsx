import React from "react";
import Image from "next/image";
import { FaArrowRight, FaClock, FaMedium } from "react-icons/fa";
import SectionShell, {
	monoMetaClass,
	linkAccentClass,
} from "./section/SectionShell";

const MEDIUM_PROFILE = "https://medium.com/@aslandjc7";

const blogPosts = [
	{
		title: "Integrating Chapa",
		excerpt:
			"Integrating Chapa Payment Gateway into a Next.js Project: setup, webhooks, and production tips.",
		readTime: "8 min read",
		date: "Jan 15, 2024",
		image:
			"https://miro.medium.com/v2/resize:fit:640/format:webp/1*ep81vJNBz_bm8R13IfQy2A.png",
		link: "https://medium.com/@aslandjc7/integrating-chapa-payment-gateway-into-a-next-js-project-8767c278d85f",
		tag: "Payments",
	},
	{
		title: "Balancing Code and Faith",
		excerpt:
			"A guide to being an effective software engineer and a good Christian: discipline, craft, and purpose.",
		readTime: "10 min read",
		date: "Jan 20, 2024",
		image:
			"https://miro.medium.com/v2/resize:fit:828/format:webp/1*_KRDj8Ij-cD3sWf3R8QEXQ.png",
		link: "https://medium.com/@aslandjc7/balancing-code-and-faith-a-guide-to-being-an-effective-software-engineer-and-a-good-christian-df8f8ed370f3",
		tag: "Mindset",
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
		tag: "Next.js",
	},
];

const MediumBlog = () => {
	return (
		<SectionShell
			id="blog"
			index="09"
			eyebrow="writing.md"
			title="Notes from the editor"
			description="Payments, Next.js, and the craft of shipping software."
		>
			<div className="mb-8 flex items-center justify-between gap-4">
				<p className={`${monoMetaClass} inline-flex items-center gap-2`}>
					<FaMedium aria-hidden />
					Medium
				</p>
				<a
					href={MEDIUM_PROFILE}
					target="_blank"
					rel="noopener noreferrer"
					className={`text-sm font-semibold ${linkAccentClass}`}
				>
					View profile →
				</a>
			</div>

			<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{blogPosts.map((post) => (
					<li key={post.link}>
						<article className="eng-project-card flex h-full flex-col">
							<div className="eng-project-card__media !aspect-[16/10]">
								<Image
									src={post.image}
									alt={post.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="eng-project-card__shade !opacity-50" aria-hidden />
								<span className="absolute left-3 top-3 z-[2] rounded-md border border-white/20 bg-slate-950/55 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-200">
									{post.tag}
								</span>
							</div>
							<div className="flex flex-1 flex-col p-5">
								<h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
									{post.title}
								</h3>
								<p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
									{post.excerpt}
								</p>
								<div className="mt-4 flex items-center justify-between border-t border-slate-900/10 pt-4 text-xs text-slate-500 dark:border-white/10">
									<span className="inline-flex items-center gap-1.5">
										<FaClock className="text-[10px]" aria-hidden />
										{post.readTime}
									</span>
									<span className="font-mono text-[10px]">{post.date}</span>
								</div>
								<a
									href={post.link}
									target="_blank"
									rel="noopener noreferrer"
									className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${linkAccentClass}`}
								>
									Read article
									<FaArrowRight className="text-xs" aria-hidden />
								</a>
							</div>
						</article>
					</li>
				))}
			</ul>
		</SectionShell>
	);
};

export default MediumBlog;
