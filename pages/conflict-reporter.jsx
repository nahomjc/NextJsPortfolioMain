import Image from "next/image";
import React from "react";
import Link from "next/link";
import { RiRadioButtonFill } from "react-icons/ri";
import conflictHero from "../public/assets/global-conflict.vercel.app_ (1).png";

const DEMO_URL = "https://global-conflict.vercel.app";

const ConflictReporter = () => {
	return (
		<div className="w-full">
			<div className="relative h-[30vh] w-screen lg:h-[40vh]">
				<div className="absolute left-0 top-0 z-10 h-[38vh] w-full bg-black/80 lg:h-[40vh]" />
				<Image
					layout="fill"
					objectFit="cover"
					src={conflictHero}
					alt="Conflict Reporter — situational reflection dashboard with 3D globe"
					priority
				/>
				<div className="absolute left-[50%] top-[70%] z-10 w-full max-w-[1240px] translate-x-[-50%] translate-y-[-50%] p-2 text-white">
					<h2 className="py-2 font-display text-2xl md:text-3xl">
						Conflict Reporter
					</h2>
					<h3 className="text-base font-medium opacity-95 md:text-lg">
						Situational reflection · Next.js · 3D visualization · OpenRouter
					</h3>
				</div>
			</div>
			<div className="mx-auto grid max-w-[1240px] gap-8 p-2 pt-8 md:grid-cols-5">
				<div className="col-span-4">
					<p className="text-sm font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
						Personal project
					</p>
					<h2 className="mt-1 font-display text-2xl dark:text-white">Goal</h2>
					<p className="mt-4 text-lg font-medium leading-relaxed text-slate-800 dark:text-slate-200">
						Turn confusing, scattered conflict news into something visual and
						explorable.
					</p>
					<p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
						<strong className="text-slate-800 dark:text-slate-200">
							Conflict Reporter
						</strong>{" "}
						(working title around a &quot;situational reflection&quot; view)
						aggregates signals into a single surface: stats, filters, a{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							3D globe
						</strong>{" "}
						for trajectories and regions, and a live-style feed where{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							OpenRouter
						</strong>{" "}
						helps structure and label AI-assisted summaries tied to real
						sources. Built with{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							Next.js
						</strong>{" "}
						end-to-end for routing, data fetching, and the immersive UI.
					</p>
					<a
						href={DEMO_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-6 inline-block"
					>
						<button type="button" className="px-8 py-2">
							Open live demo
						</button>
					</a>
				</div>
				<div className="col-span-4 rounded-xl p-4 shadow-xl shadow-gray-400 dark:border dark:border-white/10 dark:shadow-none md:col-span-1">
					<div className="p-2">
						<p className="pb-2 text-center font-bold dark:text-white">
							Built with
						</p>
						<div className="grid grid-cols-3 md:grid-cols-1">
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								Next.js
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								3D visualization
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								OpenRouter
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

export default ConflictReporter;
