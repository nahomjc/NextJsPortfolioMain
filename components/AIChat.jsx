import React, { useState, useRef, useEffect } from "react";
import {
	FaUser,
	FaPaperPlane,
	FaGithub,
	FaLinkedin,
	FaDog,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// Animated RoboDog Icon Component
const AnimatedDogIcon = ({ size = 24 }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
			whileTap={{ scale: 0.9 }}
			className="relative"
		>
			{/* Cyber glow effect */}
			<motion.div
				className="absolute inset-0 opacity-50 blur-md"
				animate={{
					scale: [1, 1.2, 1],
					background: [
						"rgba(34, 211, 238, 0.28)",
						"rgba(167, 139, 250, 0.28)",
						"rgba(34, 211, 238, 0.28)",
					],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				<FaDog size={size} />
			</motion.div>

			{/* Circuit lines */}
			<motion.div
				className="absolute inset-0"
				style={{
					background: `
            linear-gradient(90deg, transparent 50%, #22d3ee 50%),
            linear-gradient(0deg, transparent 50%, #a78bfa 50%)
          `,
					backgroundSize: "4px 4px",
					opacity: 0.2,
					mixBlendMode: "overlay",
				}}
				animate={{
					opacity: [0.1, 0.3, 0.1],
				}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: "linear",
				}}
			/>

			{/* Main dog icon with cyber effect */}
			<motion.div
				className="relative z-10"
				animate={{
					filter: [
						"drop-shadow(0 0 2px #22d3ee)",
						"drop-shadow(0 0 4px #a78bfa)",
						"drop-shadow(0 0 2px #22d3ee)",
					],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				<FaDog
					size={size}
					className="text-cyan-600 drop-shadow-[0_0_3px_rgba(34,211,238,0.35)] dark:text-violet-400 dark:drop-shadow-[0_0_3px_rgba(167,139,250,0.45)]"
				/>
			</motion.div>

			{/* Scanning line effect */}
			<motion.div
				className="absolute inset-0 overflow-hidden"
				style={{ pointerEvents: "none" }}
			>
				<motion.div
					className="w-full h-[2px] bg-gradient-to-r from-cyan-400/60 to-violet-400/60"
					animate={{
						y: [-size, size * 2],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</motion.div>
		</motion.div>
	);
};

// RoboDog Button Component with Tooltip
const RoboDogButton = ({ onClick }) => {
	return (
		<div className="group relative">
			<motion.button
				type="button"
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}
				onClick={onClick}
				className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/40 bg-white/95 text-cyan-700 shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_6px_22px_rgba(15,23,42,0.12),0_0_28px_rgba(34,211,238,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/45 hover:shadow-[0_0_0_1px_rgba(217,70,239,0.2),0_10px_30px_rgba(15,23,42,0.14),0_0_36px_rgba(217,70,239,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:border-cyan-400/35 dark:bg-[#0a0718]/95 dark:text-cyan-100 dark:shadow-[0_0_0_1px_rgba(217,70,239,0.15),0_6px_26px_rgba(0,0,0,0.45),0_0_32px_rgba(34,211,238,0.12)] dark:hover:border-fuchsia-400/40 dark:hover:shadow-[0_0_0_1px_rgba(217,70,239,0.35),0_10px_34px_rgba(0,0,0,0.5),0_0_40px_rgba(217,70,239,0.18)] dark:focus-visible:ring-cyan-400/50 dark:focus-visible:ring-offset-[#06030c] sm:h-10 sm:w-10"
				aria-label="Open AI Assistant"
			>
				<span
					className="pointer-events-none absolute inset-0 rounded-xl opacity-50 motion-safe:animate-pulse dark:opacity-40"
					style={{
						background:
							"linear-gradient(135deg, rgba(34,211,238,0.18) 0%, transparent 45%, rgba(217,70,239,0.12) 100%)",
					}}
					aria-hidden
				/>
				<span className="relative z-10">
					<AnimatedDogIcon size={18} />
				</span>
			</motion.button>

			<div
				className="pointer-events-none absolute bottom-full right-0 z-10 mb-3 w-[14.5rem] translate-y-1 border border-cyan-500/30 bg-white/95 p-3.5 opacity-0 shadow-[0_12px_40px_rgba(15,23,42,0.12),0_0_0_1px_rgba(34,211,238,0.15)] backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 dark:border-cyan-500/25 dark:bg-[#0a0718]/95 dark:shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(217,70,239,0.12)]"
				style={{
					clipPath:
						"polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
				}}
			>
				<p className="font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300/90">
					Assistant · online
				</p>
				<p className="mt-1.5 text-center text-sm font-medium leading-snug text-slate-800 dark:text-white">
					Portfolio intelligence unit
				</p>
				<p className="mt-1 text-center text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
					Skills, projects, experience, and links.
				</p>
				<div
					className="absolute -bottom-1.5 right-7 h-2.5 w-2.5 rotate-45 border-b border-r border-cyan-400/40 bg-white dark:border-cyan-500/30 dark:bg-[#0a0718]"
					aria-hidden
				/>
			</div>

			<motion.div
				className="absolute inset-0 -z-10 rounded-xl"
				animate={{
					boxShadow: [
						"0 0 0 0 rgba(34, 211, 238, 0.25)",
						"0 0 0 8px rgba(34, 211, 238, 0)",
					],
				}}
				transition={{
					duration: 2.2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
};
const AIChat = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			type: "bot",
			content:
				"Hi — I'm Nahom's portfolio assistant. Ask about experience, skills, projects, education, or how to connect.",
		},
	]);
	const [inputMessage, setInputMessage] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const chatBoxRef = useRef(null);

	// Knowledge base (keep your existing knowledge object)
	const knowledge = {
		quickLinks: {
			github: "https://github.com/nahomjc", // Replace with your actual GitHub URL
			linkedin: "https://www.linkedin.com/in/nahom-tesfaye-35b97420b/",
			portfolio: "https://nahom-portfolio.vercel.app/", // Replace with your actual portfolio URL
		},
		experience: [
			"Full Stack Web Engineer with expertise in Next.js, React, and Node.js",
			"At Green Bag Ethiopia: Full-stack work on the e-commerce platform (Next.js, TypeScript), Telegram bot integration, and OpenRoute for routing — live at greenbag-ethiopia.com",
			"At AR solution trading PLC: Full-stack development on the corporate marketing site (Next.js, TypeScript) — digital strategy, services, and brand presence at ar-solutions-plc.com",
			"At Afrocado Exports: Full-stack work on the export company website (Next.js, TypeScript) — premium produce branding and international buyer positioning at afrocadoexports.com",
			"At Peragos Systems: Working remotely as a full-stack developer, collaborating with the team and shipping product features",
			"At Muyalogy: Developed full-stack features using Next.js, created Telegram bot, implemented UI with TailwindCSS and Mantine, integrated Supabase for backend",
			"At Jiret LMS: Built learning management system using Next.js, Drizzle ORM, PostgreSQL, and Supabase",
			"At Afriwork Learn: Developed job readiness platform using Next.js and Supabase",
			"Currently working on Loop, a crowdfunded real estate app using Next.js, Supabase, Clerk, deployed on Vercel",
			"Developed e-wallet system at Bazra using React.js and Spring Boot",
			"Created and teaching web development basics course on Muyalogy platform",
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
				title:
					"Build Your First Website: A Step-by-Step Guide to Web Development",
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
		],
		projects: [
			{
				name: "Green Bag Ethiopia",
				description:
					"Eco-friendly paper bags e-commerce for Ethiopia — wholesale, custom packaging, AI-assisted shopping, Telegram bot, and OpenRoute integrations",
				tech: [
					"Next.js",
					"TypeScript",
					"Telegram bot",
					"OpenRoute",
					"E-commerce",
				],
				link: "https://greenbag-ethiopia.com/",
			},
			{
				name: "AR solution trading PLC",
				description:
					"Digital marketing and trading solutions company in Ethiopia — corporate site with services, testimonials, and contact (Next.js, TypeScript)",
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
				description:
					"Advanced learning management system with interactive features",
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
				type: "Enterprise Solution",
			},
		],
	};
	// Suggested questions for quick access
	const suggestedQuestions = [
		"What are your main skills?",
		"Tell me about your projects",
		"What's your work experience?",
		"Educational background?",
		"Technical interests?",
	];

	// Response generation function (keep your existing function)
	const generateResponse = async (input) => {
		const lowercaseInput = input.toLowerCase();

		// Simulate typing delay
		setIsTyping(true);
		await new Promise((resolve) =>
			setTimeout(resolve, 1000 + Math.random() * 1000),
		);
		setIsTyping(false);

		if (
			lowercaseInput.includes("experience") ||
			lowercaseInput.includes("work")
		) {
			return `Heres Nahoms professional experience:\n\n• ${knowledge.experience.join("\n• ")}`;
		}

		if (lowercaseInput.includes("skill") || lowercaseInput.includes("tech")) {
			return `Here are Nahoms technical skills:\n\nFrontend:\n• ${knowledge.skills.frontend.join("\n• ")}\n\nBackend:\n• ${knowledge.skills.backend.join("\n• ")}\n\nDatabase:\n• ${knowledge.skills.database.join("\n• ")}\n\nDevOps:\n• ${knowledge.skills.devops.join("\n• ")}`;
		}

		if (
			lowercaseInput.includes("project") ||
			lowercaseInput.includes("portfolio")
		) {
			return knowledge.projects
				.map(
					(project) =>
						`${project.name}:\n• ${project.description}\n• Technologies: ${project.tech.join(", ")}\n• Link: ${project.link}\n`,
				)
				.join("\n");
		}

		if (
			lowercaseInput.includes("education") ||
			lowercaseInput.includes("study")
		) {
			return `Education Background:\n\n• ${knowledge.education.join("\n• ")}`;
		}

		if (
			lowercaseInput.includes("interest") ||
			lowercaseInput.includes("passion")
		) {
			return `Technical Interests:\n\n• ${knowledge.interests.join("\n• ")}`;
		}

		if (
			lowercaseInput.includes("contact") ||
			lowercaseInput.includes("reach")
		) {
			return `You can reach Nahom through:\n\n• GitHub: ${knowledge.quickLinks.github}\n• LinkedIn: ${knowledge.quickLinks.linkedin}\n• Portfolio: ${knowledge.quickLinks.portfolio}`;
		}
		if (
			lowercaseInput.includes("experience") ||
			lowercaseInput.includes("work")
		) {
			return `Here's Nahoms detailed professional experience:\n\n• ${knowledge.experience.join("\n• ")}\n\nTeaching:\n• Currently teaching web development on Muyalogy platform\n• Course Link: ${knowledge.teaching.course.link}`;
		}

		if (
			lowercaseInput.includes("education") ||
			lowercaseInput.includes("study")
		) {
			return `Education and Certifications:\n\n• ${knowledge.education.join("\n• ")}\n\nNotable Achievement: Graduated with 3.9 GPA and Very Great Distinction Award`;
		}

		if (lowercaseInput.includes("course") || lowercaseInput.includes("teach")) {
			return `Web Development Course on Muyalogy:\n\n• Title: ${knowledge.teaching.course.title}\n• ${knowledge.teaching.course.details.join("\n• ")}\n\nCourse Link: ${knowledge.teaching.course.link}`;
		}
		if (lowercaseInput.includes("who") || lowercaseInput.includes("about")) {
			return "Nahom is a Full Stack Web Engineer specializing in modern web technologies. He has extensive experience building educational platforms and enterprise applications. His work focuses on creating scalable, user-friendly solutions that make a real impact.";
		}

		return "I can tell you about Nahoms experience, skills, projects, education, interests, or how to contact him. What would you like to know?";
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputMessage.trim()) return;

		const userMessage = { type: "user", content: inputMessage };
		setMessages((prev) => [...prev, userMessage]);
		setInputMessage("");

		const response = await generateResponse(inputMessage);
		const botResponse = { type: "bot", content: response };
		setMessages((prev) => [...prev, botResponse]);
	};

	const handleQuickQuestion = (question) => {
		setInputMessage(question);
		handleSubmit({ preventDefault: () => {} });
	};

	useEffect(() => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<AnimatePresence>
			{!isOpen && (
				<>
					{/* bottom-14 / sm:bottom-16 = same gap below viewport as between phone & chat */}
					<div className="fixed bottom-14 right-4 z-50 sm:bottom-16 sm:right-6">
						<RoboDogButton onClick={() => setIsOpen(true)} />
					</div>
				</>
			)}

			{isOpen && (
				<motion.div
					aria-modal="true"
					aria-labelledby="portfolio-assistant-title"
					initial={{ opacity: 0, y: 16, scale: 0.96 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: 12, scale: 0.98 }}
					transition={{ type: "spring", damping: 26, stiffness: 320 }}
					className="fixed bottom-4 right-4 z-50 flex h-[min(600px,calc(100dvh-5.5rem))] w-[min(calc(100vw-1.25rem),420px)] flex-col overflow-hidden border border-slate-200/90 bg-white/[0.97] shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_24px_64px_rgba(15,23,42,0.1),0_0_80px_rgba(34,211,238,0.08)] backdrop-blur-2xl dark:border-cyan-500/20 dark:bg-[#0a0718]/95 dark:shadow-[0_0_0_1px_rgba(217,70,239,0.12),0_24px_80px_rgba(0,0,0,0.55),0_0_100px_rgba(34,211,238,0.06)] sm:bottom-6 sm:right-6"
					style={{
						clipPath:
							"polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))",
					}}
				>
					<div
						className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
						style={{
							backgroundImage:
								"linear-gradient(rgba(14,116,144,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
						aria-hidden
					/>
					<div
						className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent dark:via-fuchsia-400/50"
						aria-hidden
					/>

					<header className="relative flex shrink-0 items-center justify-between gap-3 border-b border-slate-200/90 bg-slate-50/80 px-4 py-3.5 dark:border-white/10 dark:bg-[#0a0718]/90">
						<div className="flex min-w-0 items-center gap-3">
							<div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/35 bg-cyan-50/90 dark:border-cyan-500/30 dark:bg-black/40">
								<AnimatedDogIcon size={20} />
								<span
									className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.6)] dark:border-[#0a0718] dark:bg-emerald-400 dark:shadow-[0_0_8px_rgba(52,211,153,0.7)]"
									aria-hidden
								/>
							</div>
							<div className="min-w-0">
								<p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300/85">
									SYS · NAHOM.AI
								</p>
								<h2
									id="portfolio-assistant-title"
									className="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-white"
								>
									Intelligence console
								</h2>
							</div>
						</div>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200/90 text-slate-600 transition hover:border-fuchsia-400/40 hover:bg-fuchsia-50/80 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
							aria-label="Close assistant"
						>
							<IoClose size={22} />
						</button>
					</header>

					<div
						ref={chatBoxRef}
						className="relative flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
					>
						{messages.map((message, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.25 }}
								className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[88%] border px-3.5 py-2.5 ${
										message.type === "user"
											? "rounded-2xl rounded-br-md border-fuchsia-300/60 bg-gradient-to-br from-fuchsia-100/95 to-violet-100/90 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-fuchsia-500/25 dark:from-fuchsia-600/25 dark:to-violet-900/35 dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
											: "rounded-2xl rounded-bl-md border-slate-200/90 bg-slate-100/95 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] dark:border-cyan-500/20 dark:bg-black/35 dark:text-slate-100 dark:shadow-[inset_0_1px_0_rgba(34,211,238,0.08)]"
									}`}
								>
									<div className="mb-1.5 flex items-center gap-2">
										{message.type === "user" ? (
											<FaUser
												className="text-fuchsia-600 dark:text-fuchsia-200/90"
												size={11}
											/>
										) : (
											<AnimatedDogIcon size={12} />
										)}
										<span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
											{message.type === "user" ? "Operator" : "Unit"}
										</span>
									</div>
									<p className="whitespace-pre-line text-[13px] leading-relaxed text-slate-800 dark:text-slate-100/95">
										{message.content}
									</p>
								</div>
							</motion.div>
						))}
						{isTyping && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex items-center gap-2.5 pl-1 text-cyan-700 dark:text-cyan-400/90"
							>
								<AnimatedDogIcon size={12} />
								<div className="flex items-center gap-1">
									{[0, 1, 2].map((i) => (
										<motion.span
											key={i}
											className="h-1.5 w-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400"
											animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }}
											transition={{
												duration: 0.9,
												repeat: Infinity,
												delay: i * 0.15,
												ease: "easeInOut",
											}}
										/>
									))}
								</div>
								<span className="font-mono text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-500">
									Processing
								</span>
							</motion.div>
						)}
					</div>

					<div className="relative shrink-0 border-t border-slate-200/90 bg-slate-50/70 px-3 py-2.5 dark:border-white/10 dark:bg-black/35">
						<p className="mb-2 px-1 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-500">
							Quick prompts
						</p>
						<div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
							{suggestedQuestions.map((question, index) => (
								<button
									key={index}
									type="button"
									onClick={() => handleQuickQuestion(question)}
									className="shrink-0 rounded-md border border-slate-200/90 bg-white px-3 py-1.5 text-left text-[11px] font-medium text-slate-700 shadow-sm transition hover:border-cyan-400/50 hover:bg-cyan-50/90 hover:text-slate-900 dark:border-white/12 dark:bg-white/[0.04] dark:text-slate-200 dark:shadow-none dark:hover:border-cyan-400/35 dark:hover:bg-cyan-500/10 dark:hover:text-white"
								>
									{question}
								</button>
							))}
						</div>
					</div>

					<form
						onSubmit={handleSubmit}
						className="relative shrink-0 border-t border-slate-200/90 bg-white/60 p-3 dark:border-white/10 dark:bg-[#0a0718]/80 sm:p-4"
					>
						<div className="flex gap-2">
							<input
								type="text"
								value={inputMessage}
								onChange={(e) => setInputMessage(e.target.value)}
								placeholder="Query experience, stack, projects…"
								className="min-w-0 flex-1 rounded-lg border border-slate-200/90 bg-white px-3 py-2.5 font-mono text-sm text-slate-900 placeholder:text-slate-500 shadow-sm focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/15 dark:border-white/12 dark:bg-black/40 dark:text-slate-100 dark:placeholder:text-slate-500 dark:shadow-none dark:focus:border-cyan-400/45 dark:focus:ring-cyan-400/25"
							/>
							<button
								type="submit"
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-fuchsia-500/40 bg-gradient-to-br from-fuchsia-600 to-violet-600 text-white shadow-md shadow-fuchsia-500/20 transition hover:brightness-110 active:scale-[0.98] dark:border-fuchsia-500/35 dark:from-fuchsia-600/80 dark:to-violet-700/80 dark:shadow-[0_0_24px_rgba(217,70,239,0.25)]"
								aria-label="Send message"
							>
								<FaPaperPlane size={16} />
							</button>
						</div>
					</form>

					<footer className="relative flex shrink-0 items-center justify-center gap-2 border-t border-slate-200/90 bg-slate-50/90 px-4 py-2.5 dark:border-white/10 dark:bg-black/40">
						<a
							href={knowledge.quickLinks?.github}
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/90 text-slate-600 transition hover:border-cyan-500/45 hover:bg-cyan-50/90 hover:text-cyan-700 dark:border-white/10 dark:text-slate-400 dark:hover:border-cyan-400/40 dark:hover:bg-transparent dark:hover:text-cyan-200"
							aria-label="GitHub"
						>
							<FaGithub size={18} />
						</a>
						<a
							href={knowledge.quickLinks?.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/90 text-slate-600 transition hover:border-fuchsia-500/45 hover:bg-fuchsia-50/90 hover:text-fuchsia-700 dark:border-white/10 dark:text-slate-400 dark:hover:border-fuchsia-400/40 dark:hover:bg-transparent dark:hover:text-fuchsia-200"
							aria-label="LinkedIn"
						>
							<FaLinkedin size={18} />
						</a>
					</footer>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default AIChat;
