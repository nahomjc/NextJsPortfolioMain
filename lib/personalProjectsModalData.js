/**
 * Personal / sandbox projects (matches Projects.jsx § Portfolio / 04B) for the About workspace modal.
 * Image paths are under /public; filenames with spaces use encodeURIComponent at build time.
 */
export const PERSONAL_PROJECTS_MODAL = [
	{
		title: "Conflict Reporter",
		href: "/conflict-reporter",
		image: `/assets/${encodeURIComponent("global-conflict.vercel.app_ (1).png")}`,
		tech: "Next.js · 3D globe · OpenRouter",
	},
	{
		title: "Netflix clone",
		href: "/netflixClone",
		image: "/assets/projects/netflix.jpg",
		tech: "UI clone · React patterns",
	},
	{
		title: "Airbnb clone",
		href: "/airbnb",
		image: "/assets/projects/Airbnb1.jpg",
		tech: "Responsive layouts · maps-style UI",
	},
	{
		title: "Crypto App",
		href: "/crypto",
		image: "/assets/projects/crypto1.jpg",
		tech: "Data viz · dashboards",
	},
	{
		title: "Youtube clone",
		href: "/youtube",
		image: "/assets/projects/youtube.jpg",
		tech: "Media UI · routing",
	},
	{
		title: "Covid-19 Tracker",
		href: "/covid",
		image: "/assets/projects/covidl.jpg",
		tech: "Charts · global data",
	},
];
