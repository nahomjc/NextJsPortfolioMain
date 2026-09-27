import muyalogyImg from "../../public/assets/projects/muyaloyg.png";
import afriworkImg from "../../public/assets/projects/afriwork.png";
import loopstateImg from "../../public/assets/projects/loop-state.png";
import primebankImg from "../../public/assets/projects/prime-bank.png";
import jiretImg from "../../public/assets/projects/jiret.png";
import sourcepinImg from "../../public/assets/Screenshot 2026-03-28 004531.png";
import hcmImg from "../../public/assets/Screenshot 2026-03-28 005041.png";
import conflictReporterImg from "../../public/assets/global-conflict.vercel.app_ (1).png";
import greenbagImg from "../../public/assets/Screenshot 2026-03-28 023643.png";
import arSolutionsImg from "../../public/assets/Screenshot 2026-03-28 024007.png";
import afrocadoImg from "../../public/assets/Screenshot 2026-03-28 024200.png";

export const productionProjects = [
	{
		title: "Sourcepin",
		backgroundImg: sourcepinImg,
		projectUrl: "/sourcepin",
		tech: "Multi-tenant procurement · Ethiopia & Malawi · Next.js · Hono · Drizzle · TypeScript",
		featured: true,
	},
	{
		title: "Jiret",
		backgroundImg: jiretImg,
		projectUrl: "/jiret",
		tech: "Learning management · Next.js · TypeScript · PostgreSQL",
	},
	{
		title: "Human Capital Management",
		backgroundImg: hcmImg,
		projectUrl: "/hcm",
		tech: "HCM / HR operations · Next.js · Hono · Neon · PostgreSQL · Drizzle",
	},
	{
		title: "Green Bag Ethiopia",
		backgroundImg: greenbagImg,
		projectUrl: "/greenbag",
		tech: "E-commerce · Next.js · TypeScript · Telegram bot · OpenRoute · AI commerce",
	},
	{
		title: "AR solution trading PLC",
		backgroundImg: arSolutionsImg,
		projectUrl: "/ar-solutions",
		tech: "Digital marketing & web · Next.js · TypeScript · Brand site, Ethiopia",
	},
	{
		title: "Afrocado Exports",
		backgroundImg: afrocadoImg,
		projectUrl: "/afrocado",
		tech: "Premium produce export · Next.js · TypeScript · Lead generation",
	},
	{
		title: "Muyalogy",
		backgroundImg: muyalogyImg,
		projectUrl: "/muyalogy",
		tech: "E-commerce platform · Next.js · TypeScript",
	},
	{
		title: "Afriwork",
		backgroundImg: afriworkImg,
		projectUrl: "/afriwork",
		tech: "Freelance marketplace · React · Node.js",
	},
	{
		title: "Loop state",
		backgroundImg: loopstateImg,
		projectUrl: "/loopState",
		tech: "Real estate platform · Next.js · TypeScript",
	},
	{
		title: "Prime bank",
		backgroundImg: primebankImg,
		projectUrl: "/prime",
		tech: "Banking web platform · React · TypeScript",
	},
];

export const personalProjects = [
	{
		title: "Conflict Reporter",
		backgroundImg: conflictReporterImg,
		projectUrl: "/conflict-reporter",
		tech: "Next.js · 3D globe · OpenRouter · Situational reflection dashboard",
	},
	{
		title: "Netflix clone",
		backgroundImg: "/assets/projects/netflix.jpg",
		projectUrl: "/netflixClone",
		tech: "React · Firebase · TMDB API",
	},
	{
		title: "Airbnb clone",
		backgroundImg: "/assets/projects/Airbnb1.jpg",
		projectUrl: "/airbnb",
		tech: "Next.js · Mapbox · Tailwind",
	},
	{
		title: "Crypto App",
		backgroundImg: "/assets/projects/crypto1.jpg",
		projectUrl: "/crypto",
		tech: "React · CoinGecko API · Chart.js",
	},
	{
		title: "Youtube clone",
		backgroundImg: "/assets/projects/youtube.jpg",
		projectUrl: "/youtube",
		tech: "React · YouTube API",
	},
	{
		title: "Covid-19 Tracker",
		backgroundImg: "/assets/projects/covidl.jpg",
		projectUrl: "/covid",
		tech: "React · disease.sh API · Maps",
	},
];

export const PROJECTS_HERO_DESC =
	"Production platforms, client shipping, and high-fidelity experiments. Each deployment ships with a dedicated case route.";

export const PROJECTS_HERO_STATS = [
	{ label: "Production", value: String(productionProjects.length), accent: "cyan" },
	{ label: "Sandbox", value: String(personalProjects.length), accent: "violet" },
	{
		label: "Routes",
		value: String(productionProjects.length + personalProjects.length),
		accent: "fuchsia",
	},
];

export const PARTICLE_POSITIONS = [
	{ top: "6%", left: "18%" },
	{ top: "14%", left: "82%" },
	{ top: "38%", left: "6%" },
	{ top: "62%", left: "92%" },
	{ top: "48%", left: "40%" },
	{ top: "78%", left: "24%" },
	{ top: "28%", left: "58%" },
	{ top: "72%", left: "48%" },
];
