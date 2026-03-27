import Image from "next/image";
import React from "react";
import Link from "next/link";
import { RiRadioButtonFill } from "react-icons/ri";
import afrocadoHero from "../public/assets/Screenshot 2026-03-28 024200.png";

const Afrocado = () => {
	return (
		<div className="w-full">
			<div className="relative h-[30vh] w-screen lg:h-[40vh]">
				<div className="absolute left-0 top-0 z-10 h-[38vh] w-full bg-black/80 lg:h-[40vh]" />
				<Image
					layout="fill"
					objectFit="cover"
					src={afrocadoHero}
					alt="Afrocado Exports — Ethiopia premium produce export"
					priority
				/>
				<div className="absolute left-[50%] top-[70%] z-10 w-full max-w-[1240px] translate-x-[-50%] translate-y-[-50%] p-2 text-white">
					<h2 className="py-2 font-display text-2xl md:text-3xl">
						Afrocado Exports
					</h2>
					<h3 className="text-base font-medium opacity-95 md:text-lg">
						Next.js · TypeScript · Export & product storytelling
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
							Afrocado Exports
						</strong>{" "}
						presents{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							Ethiopia&apos;s premium produce
						</strong>{" "}
						to international buyers — farmer-direct sourcing, logistics, and
						trust-led branding. As a{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							full-stack engineer
						</strong>
						, I helped ship the marketing site on{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							Next.js
						</strong>{" "}
						and{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							TypeScript
						</strong>
						: product and values sections, contact and lead paths, and a
						visual language that matches their export positioning (quality,
						freshness, and global reach).
					</p>
					<a
						href="https://afrocadoexports.com/"
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
								Responsive UI
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								Lead / contact flows
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

export default Afrocado;
