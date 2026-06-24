import { PERSON, SITE_URL } from "./seo";

export const portfolioKnowledge = {
	quickLinks: {
		github: PERSON.github,
		linkedin: PERSON.linkedin,
		portfolio: SITE_URL,
		phone: "+251937287140",
	},
	experience: [
		"Full Stack Web Engineer with expertise in Next.js, React, and Node.js",
		"At Green Bag Ethiopia: Full-stack work on the e-commerce platform (Next.js, TypeScript), Telegram bot integration, and OpenRoute for routing — live at greenbag-ethiopia.com",
		"At AR solution trading PLC: Full-stack development on the corporate marketing site (Next.js, TypeScript) — ar-solutions-plc.com",
		"At Afrocado Exports: Full-stack work on the export company website (Next.js, TypeScript) — afrocadoexports.com",
		"At Peragos Systems: Working remotely as a full-stack developer, collaborating with the team and shipping product features",
		"At Muyalogy: Developed full-stack features using Next.js, created Telegram bot, implemented UI with TailwindCSS and Mantine, integrated Supabase for backend",
		"At Jiret LMS: Built learning management system using Next.js, Drizzle ORM, PostgreSQL, and Supabase",
		"At Afriwork Learn: Developed job readiness platform using Next.js and Supabase",
		"Currently working on Loop, a crowdfunded real estate app using Next.js, Supabase, Clerk, deployed on Vercel",
		"Developed e-wallet system at Bazra using React.js and Spring Boot",
		"Created and teaches web development basics course on Muyalogy platform",
	],
	education: [
		"Bachelor's Degree in Computer Science from Admas University with 3.9 GPA - Very Great Distinction Award",
		"UN Data Science Certificate",
		"Meta Advanced React Certificate",
		"Multiple certifications in web development",
		"Continuous learning through online platforms",
	],
	teaching: {
		course: {
			title: "Build Your First Website: A Step-by-Step Guide to Web Development",
			platform: "Muyalogy",
			link: "https://www.muyalogy.com/course/1bcd4432-4f5e-4984-8572-c90648d637bb",
			details: [
				"Comprehensive web development course in Amharic",
				"Covers HTML, CSS, JavaScript fundamentals",
				"Includes responsive design and modern web practices",
				"Project-based learning with practical examples",
				"43 activities across 8 modules",
			],
		},
	},
	skills: {
		frontend: [
			"React.js & Next.js (Advanced)",
			"TailwindCSS & Mantine UI",
			"Redux & Context API",
			"Responsive Design",
			"TypeScript",
		],
		backend: [
			"Node.js & Spring Boot",
			"Supabase & Firebase",
			"RESTful APIs",
			"GraphQL",
			"Authentication & Authorization (Clerk)",
		],
		database: [
			"PostgreSQL",
			"MongoDB",
			"Drizzle ORM",
			"Database Design",
			"Query Optimization",
		],
		devops: [
			"Vercel Deployment",
			"Git & GitHub",
			"Docker",
			"CI/CD Pipelines",
			"AWS Services",
		],
	},
	interests: [
		"Scalable product UI, performance, and accessibility",
		"Full-stack architecture with Next.js and modern backends",
		"Teaching and mentoring on the Muyalogy platform",
		"AI integrations with OpenAI, OpenRouter, and Telegram bots",
	],
	projects: [
		{
			name: "Green Bag Ethiopia",
			description:
				"Eco-friendly paper bags e-commerce for Ethiopia — wholesale, custom packaging, AI-assisted shopping, Telegram bot, and OpenRoute integrations",
			tech: ["Next.js", "TypeScript", "Telegram bot", "OpenRoute", "E-commerce"],
			link: "https://greenbag-ethiopia.com/",
		},
		{
			name: "AR solution trading PLC",
			description:
				"Digital marketing and trading solutions company in Ethiopia — corporate site with services, testimonials, and contact",
			tech: ["Next.js", "TypeScript", "Marketing site", "SEO"],
			link: "https://www.ar-solutions-plc.com/",
		},
		{
			name: "Afrocado Exports",
			description:
				"Ethiopian premium produce export brand — farmer-direct sourcing, global reach, product and values storytelling",
			tech: ["Next.js", "TypeScript", "Export marketing"],
			link: "https://afrocadoexports.com/",
		},
		{
			name: "Muyalogy",
			description:
				"Digital learning platform with course management, student tracking, and integrated Telegram bot",
			tech: ["Next.js", "TailwindCSS", "Mantine UI", "Supabase"],
			link: "https://muyalogy.com",
		},
		{
			name: "Jiret LMS",
			description: "Advanced learning management system with interactive features",
			tech: ["Next.js", "Drizzle ORM", "PostgreSQL", "Supabase"],
			link: "https://jiret.com",
		},
		{
			name: "Afriwork Learn",
			description: "Job readiness platform with skill assessments",
			tech: ["Next.js", "Supabase", "Mantine UI"],
			link: "https://learn.afriworket.com",
		},
		{
			name: "Loop Real Estate",
			description: "Crowdfunded real estate platform",
			tech: ["Next.js", "Supabase", "Clerk", "Vercel"],
			status: "In Development",
		},
		{
			name: "Bazra E-Wallet",
			description: "Digital payment and e-wallet system",
			tech: ["React.js", "Spring Boot"],
		},
		{
			name: "Conflict Reporter",
			description: "Situational reflection dashboard with 3D globe and OpenRouter",
			tech: ["Next.js", "3D globe", "OpenRouter"],
		},
	],
};

export const CHAT_SUGGESTIONS = [
	"What are Nahom's core skills?",
	"Tell me about his projects",
	"Work experience overview",
	"Education & certifications",
	"How can I hire him?",
];
