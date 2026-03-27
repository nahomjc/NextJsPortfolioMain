import Image from "next/image";
import React from "react";
import Link from "next/link";
import { RiRadioButtonFill } from "react-icons/ri";
import greenbagHero from "../public/assets/Screenshot 2026-03-28 023643.png";

const GreenBag = () => {
	return (
		<div className="w-full">
			<div className="relative h-[30vh] w-screen lg:h-[40vh]">
				<div className="absolute left-0 top-0 z-10 h-[38vh] w-full bg-black/80 lg:h-[40vh]" />
				<Image
					layout="fill"
					objectFit="cover"
					src={greenbagHero}
					alt="Green Bag Ethiopia — eco-friendly paper bags e-commerce"
					priority
				/>
				<div className="absolute left-[50%] top-[70%] z-10 w-full max-w-[1240px] translate-x-[-50%] translate-y-[-50%] p-2 text-white">
					<h2 className="py-2 font-display text-2xl md:text-3xl">
						Green Bag Ethiopia
					</h2>
					<h3 className="text-base font-medium opacity-95 md:text-lg">
						Next.js · TypeScript · Telegram · OpenRoute · AI-assisted commerce
					</h3>
				</div>
			</div>
			<div className="mx-auto grid max-w-[1240px] gap-8 p-2 pt-8 md:grid-cols-5">
				<div className="col-span-4">
					<p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
						Project
					</p>
					<h2 className="mt-1 font-display text-2xl dark:text-white">
						Overview
					</h2>
					<p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
						<strong className="text-slate-800 dark:text-slate-200">
							Green Bag Ethiopia
						</strong>{" "}
						is a production{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							e-commerce
						</strong>{" "}
						platform for eco-friendly paper bags and packaging — wholesale,
						custom designs, and retail flows — built for the Ethiopian market.
						I worked on it as a{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							full-stack engineer
						</strong>
						, shipping features across the{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							Next.js
						</strong>{" "}
						and{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							TypeScript
						</strong>{" "}
						stack, integrating a{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							Telegram bot
						</strong>{" "}
						for notifications and assistant-style flows, and wiring{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							OpenRoute
						</strong>{" "}
						for routing and location-aware experiences alongside AI-powered
						shopping features on the live storefront.
					</p>
					<a
						href="https://greenbag-ethiopia.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-flex rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-500/20 dark:border-cyan-400/35 dark:text-cyan-300 dark:hover:bg-cyan-500/15"
					>
						Live site →
					</a>
				</div>
				<div className="col-span-4 rounded-xl p-4 shadow-xl shadow-gray-400 dark:border dark:border-white/10 dark:shadow-none md:col-span-1">
					<div className="p-2">
						<p className="pb-2 text-center font-bold dark:text-white">
							Technologies
						</p>
						<div className="grid grid-cols-3 md:grid-cols-1">
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								Next.js
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								TypeScript
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								Telegram bot
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								OpenRoute
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								E-commerce
							</p>
						</div>
					</div>
				</div>
				<Link href="/#projects">
					<p className="cursor-pointer underline dark:text-cyan-400">Back</p>
				</Link>
			</div>
		</div>
	);
};

export default GreenBag;
