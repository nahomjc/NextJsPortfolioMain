import Image from "next/image";
import React from "react";
import Link from "next/link";
import { RiRadioButtonFill } from "react-icons/ri";
import hcmHero from "../public/assets/Screenshot 2026-03-28 005041.png";

const HumanCapitalManagement = () => {
	return (
		<div className="w-full">
			<div className="relative h-[30vh] w-screen lg:h-[40vh]">
				<div className="absolute left-0 top-0 z-10 h-[38vh] w-full bg-black/80 lg:h-[40vh]" />
				<Image
					layout="fill"
					objectFit="cover"
					src={hcmHero}
					alt="Human capital management system"
					priority
				/>
				<div className="absolute left-[50%] top-[70%] z-10 w-full max-w-[1240px] translate-x-[-50%] translate-y-[-50%] p-2 text-white">
					<h2 className="py-2 font-display text-2xl md:text-3xl">
						Human Capital Management
					</h2>
					<h3 className="text-base font-medium opacity-95 md:text-lg">
						Next.js · Hono · Neon · PostgreSQL · Drizzle ORM
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
						A{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							human capital management (HCM)
						</strong>{" "}
						platform for core HR operations—employee records, org structure,
						time-off and workflows where applicable—with a focus on reliable
						data and a fast product surface. The app is built with{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							Next.js
						</strong>{" "}
						on the front end and{" "}
						<strong className="text-slate-800 dark:text-slate-200">Hono</strong>{" "}
						for APIs. Data lives in{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							PostgreSQL
						</strong>{" "}
						on{" "}
						<strong className="text-slate-800 dark:text-slate-200">Neon</strong>{" "}
						(serverless Postgres), accessed through{" "}
						<strong className="text-slate-800 dark:text-slate-200">
							Drizzle ORM
						</strong>{" "}
						for typed, migration-friendly persistence.
					</p>
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
								Hono
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								Neon
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								PostgreSQL
							</p>
							<p className="flex items-center py-2 text-gray-600 dark:text-slate-400">
								<RiRadioButtonFill className="pr-1 text-cyan-500" />
								Drizzle ORM
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

export default HumanCapitalManagement;
