import React from "react";
import Image from "next/image";
import { CLIENT_LOGOS } from "../lib/clientLogos";
import SectionShell, { monoMetaClass } from "./section/SectionShell";

const ClientLogos = () => {
	const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

	return (
		<SectionShell
			id="clients"
			eyebrow="clients.map"
			title="Trusted in production"
			description="Companies and platforms running systems I helped design, build, and ship."
			className="!py-20 md:!py-24"
		>
			<div className="relative overflow-hidden rounded-2xl border border-slate-900/10 bg-white/40 py-6 dark:border-white/10 dark:bg-white/[0.02]">
				<div
					className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-100 dark:from-future-surface sm:w-24"
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-100 dark:from-future-surface sm:w-24"
					aria-hidden
				/>
				<div className="clients-marquee-track flex w-max gap-8 px-4">
					{loop.map((client, i) => (
						<div
							key={`${client.name}-${i}`}
							className="flex w-44 shrink-0 flex-col items-center justify-center gap-2 sm:w-52"
						>
							<div className="relative h-10 w-full sm:h-12">
								<Image
									src={client.src}
									alt={client.name}
									fill
									className="object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-85"
									sizes="208px"
								/>
							</div>
							<span className={monoMetaClass}>{client.tag}</span>
						</div>
					))}
				</div>
			</div>
		</SectionShell>
	);
};

export default ClientLogos;
