import { SITE_URL } from "../../lib/seo";

/** Public indexable routes (pages router). Keep in sync when adding pages. */
const PATHS = [
	"/",
	"/resume",
	"/afriwork",
	"/afrocado",
	"/airbnb",
	"/ar-solutions",
	"/conflict-reporter",
	"/covid",
	"/crypto",
	"/greenbag",
	"/hcm",
	"/jiret",
	"/loopState",
	"/muyalogy",
	"/netflixClone",
	"/prime",
	"/sourcepin",
	"/youtube",
];

function escapeXml(s) {
	return String(s)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export default function handler(req, res) {
	const base = SITE_URL;
	const body = PATHS.map((path) => {
		const loc = path === "/" ? base : `${base}${path}`;
		const priority = path === "/" ? "1.0" : "0.7";
		return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
	}).join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;

	res.setHeader("Content-Type", "application/xml; charset=utf-8");
	res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
	res.status(200).send(xml);
}
