/**
 * Hero robot HUD copy — grounded in portfolio data (About, ExperienceTimeLine, SkillCategory).
 */
export const HUD_VARIANTS = {
	head: {
		title: "Uplink · academic core",
		subject: "Admas University · BSc Computer Science",
		body: `Credentials locked.

Did you know Nahom is a Computer Science graduate who finished with Very Great Distinction and a 3.9 GPA at Admas University (2019)? That foundation was software engineering and advanced programming — before years of shipping production web work.

Signal: strong CS base under the UI.`,
	},
	headLeft: {
		title: "Uplink · trajectory",
		subject: "since 2016 · CMS → custom apps",
		body: `Arc decoded.

Did you know Nahom has been building on the web since 2016 — starting from CMS and e‑commerce, then leveling up to full custom apps? Today the focus is responsive UI, API integration, and actually getting products out the door.

Signal: long runway, product delivery mindset.`,
	},
	headRight: {
		title: "Uplink · credential",
		subject: "Meta · Advanced React",
		body: `Cert verified.

Did you know Nahom is Meta Advanced React certified (2022)? That lines up with how this site is built — modern patterns, composition, hooks, and scalable components on Next.js.

Signal: formal backing on the front-end stack.`,
	},
	chest: {
		title: "Uplink · unit.07",
		subject: "Nahom · full-stack minded front-end",
		body: `Uplink established.

Did you know Nahom is a full-stack minded front-end engineer? UI side: React, Next.js, TypeScript, Tailwind & Mantine. Behind it: Node, Express, Hono, REST. Data: PostgreSQL, Drizzle, Supabase, MongoDB — all spelled out again under Experience & Skills.

Signal ends here — scroll for receipts.`,
	},
	armLeft: {
		title: "Uplink · surface stack",
		subject: "channel: frontend",
		body: `Render path mapped.

Did you know Nahom is deepest on the interface layer? React & Next.js, TypeScript, TailwindCSS & Mantine, Redux & Context, responsive layout — same list as the Skills section here, tuned for shipping polished UI fast.

Signal: interface-heavy delivery.`,
	},
	armRight: {
		title: "Uplink · service mesh",
		subject: "channel: backend · AI hooks",
		body: `APIs & bots online.

Did you know Nahom is the engineer who wired learner-facing UI to real backends at Muyalogy? Node & Express, Hono, REST, auth — plus a Telegram bot on AI (OpenAI server-side, OpenRouter) for real conversational flows, not demo-only JSON.

Signal: UI wired to real backends, not mocks.`,
	},
	baseLeft: {
		title: "Uplink · persistence",
		subject: "channel: data layer",
		body: `Stores indexed.

Did you know Nahom is comfortable owning the full data path? PostgreSQL, MongoDB, Drizzle ORM, Supabase, Firebase — same as the Database skills panel. Shipped on Jiret LMS (Next.js + Drizzle + PostgreSQL + Supabase).

Signal: schema-aware full-stack.`,
	},
	base: {
		title: "Uplink · delivery",
		subject: "LMS · teaching · quality",
		body: `Ops nominal.

Did you know Nahom is both a builder and a teacher? LMS work at Jiret (Next.js, Drizzle, PostgreSQL, Supabase) — and in 2025, teaching web development in Amharic at Muyalogy. Always pushing accessible, semantic UI and maintainable code.

Signal: ship + teach + keep quality bar high.`,
	},
	baseRight: {
		title: "Uplink · squad",
		subject: "Peragos · Muyalogy · remote",
		body: `Team channel open.

Did you know Nahom is currently split across two serious eng roles? Full Stack Web Engineer at Muyalogy (2022–present) — features, AI-integrated Telegram bot, learner tooling. Full Stack Developer at Peragos Systems (2025–present), remote across time zones, async-first.

Signal: employed, remote-ready collaborator.`,
	},
};

export const HUD_DEFAULT_VARIANT = "chest";

/**
 * @param {number} tx 0–1 along model AABB X (or screen X)
 * @param {number} ty 0–1 along model AABB Y (or screen Y), bottom=0 top=1 in Three box — flip if needed
 */
function clamp01(v) {
	return Math.min(1, Math.max(0, v));
}

export function pickHudVariantKey(tx, ty) {
	const x = clamp01(tx);
	const y = clamp01(ty);
	const xi = x < 1 / 3 ? 0 : x < 2 / 3 ? 1 : 2;
	const yi = y < 1 / 3 ? 0 : y < 2 / 3 ? 1 : 2;
	const grid = [
		["baseLeft", "base", "baseRight"],
		["armLeft", "chest", "armRight"],
		["headLeft", "head", "headRight"],
	];
	return grid[yi][xi];
}
