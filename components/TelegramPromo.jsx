import React from "react";
import Image from "next/image";
import { FaBolt, FaNewspaper, FaTelegram, FaUsers } from "react-icons/fa";
import SectionShell, {
	panelClass,
	monoMetaClass,
	ctaClass,
} from "./section/SectionShell";

const TELEGRAM_URL = "https://t.me/kingdom_code";

const features = [
	{ icon: FaUsers, label: "Active community" },
	{ icon: FaNewspaper, label: "Daily updates" },
	{ icon: FaBolt, label: "Instant notifications" },
	{ icon: FaTelegram, label: "Exclusive content" },
];

const stats = [
	{ value: "100+", label: "Members" },
	{ value: "Daily", label: "Updates" },
	{ value: "100+", label: "Posts" },
	{ value: "24/7", label: "Support" },
];

const TelegramPromo = () => {
	return (
		<SectionShell
			id="telegram"
			index="08"
			eyebrow="community.tg"
			title="Kingdom Code"
			description="Coding tips, project notes, and community updates, straight to Telegram."
		>
			<div
				className={`${panelClass} grid gap-10 overflow-hidden p-6 sm:p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:p-10`}
			>
				<div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
					<div className="relative">
						<div
							className="absolute -inset-3 rounded-full bg-cyan-400/20 blur-xl"
							aria-hidden
						/>
						<div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-cyan-400/40 shadow-[0_0_40px_-12px_rgba(34,211,238,0.6)]">
							<Image
								src="/assets/channel-admin.jpg"
								alt="Kingdom Code Telegram channel"
								fill
								className="object-cover"
								sizes="128px"
							/>
						</div>
					</div>
					<a
						href={TELEGRAM_URL}
						target="_blank"
						rel="noopener noreferrer"
						className={ctaClass}
					>
						<FaTelegram aria-hidden />
						Join channel
					</a>
				</div>

				<div>
					<ul className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
						{stats.map((stat) => (
							<li key={stat.label}>
								<p className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">
									{stat.value}
								</p>
								<p className={`${monoMetaClass} mt-1`}>{stat.label}</p>
							</li>
						))}
					</ul>
					<ul className="grid gap-3 sm:grid-cols-2">
						{features.map(({ icon: Icon, label }) => (
							<li
								key={label}
								className="flex items-center gap-3 rounded-xl border border-slate-900/8 bg-white/50 px-4 py-3 text-sm text-slate-700 dark:border-white/8 dark:bg-white/[0.03] dark:text-slate-300"
							>
								<Icon className="text-cyan-600 dark:text-cyan-400" aria-hidden />
								{label}
							</li>
						))}
					</ul>
				</div>
			</div>
		</SectionShell>
	);
};

export default TelegramPromo;
