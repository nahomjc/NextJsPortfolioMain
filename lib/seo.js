/** Base URL for canonical + OG URLs. Override in production via NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (
	process.env.NEXT_PUBLIC_SITE_URL || "https://nahom-portfolio.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Nahom Tesfaye — Portfolio";

export const PERSON = {
	name: "Nahom Tesfaye",
	jobTitle: "Full Stack Developer",
	country: "Ethiopia",
	github: "https://github.com/nahomjc",
	linkedin: "https://www.linkedin.com/in/nahom-tesfaye-35b97420b/",
};

export const homeMeta = {
	title:
		"Nahom Tesfaye | Top Full-Stack Developer in Ethiopia — React, Next.js & TypeScript",
	description:
		"Nahom Tesfaye is an Ethiopia-based full-stack and front-end developer shipping production web apps with Next.js, React, TypeScript, and modern backends. View projects, experience, and contact for freelance or full-time work in Addis Ababa and worldwide.",
	keywords: [
		"Nahom Tesfaye",
		"developer Ethiopia",
		"full stack developer Ethiopia",
		"React developer Ethiopia",
		"Next.js developer Ethiopia",
		"TypeScript developer",
		"front end developer Addis Ababa",
		"software engineer Ethiopia",
		"freelance web developer Ethiopia",
	],
	ogImagePath: "/assets/contact-me.jpg",
};

export function absoluteUrl(path) {
	if (!path || path.startsWith("http")) return path || SITE_URL;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function homeJsonLd() {
	const { name, jobTitle, github, linkedin } = PERSON;
	const url = SITE_URL;
	const image = absoluteUrl(homeMeta.ogImagePath);
	return [
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: SITE_NAME,
			url,
			description: homeMeta.description,
			inLanguage: "en",
			author: {
				"@type": "Person",
				name,
				url,
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "Person",
			name,
			jobTitle,
			url,
			image,
			description: homeMeta.description,
			nationality: {
				"@type": "Country",
				name: "Ethiopia",
			},
			address: {
				"@type": "PostalAddress",
				addressCountry: "ET",
				addressRegion: "Addis Ababa",
			},
			sameAs: [github, linkedin],
			knowsAbout: [
				"React",
				"Next.js",
				"JavaScript",
				"TypeScript",
				"Full-stack web development",
				"Firebase",
				"REST APIs",
				"UI engineering",
			],
		},
	];
}
