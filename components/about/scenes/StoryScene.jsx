export default function StoryScene({
	bioExpanded,
	setBioExpanded,
	bioParaRefs,
}) {
	return (
		<>
			<p className="about-scene-eyebrow font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-400">
				03 · Background
			</p>
			<h3 className="about-scene-heading mt-4 font-display text-2xl font-bold text-white md:text-3xl">
				Professional <span className="text-gradient-future">background.</span>
			</h3>
			<div className="about-scanner relative mt-6">
				<span className="about-scanner__beam" aria-hidden />
				<div
					id="about-bio-text"
					className={`space-y-4 text-[0.95rem] leading-relaxed text-slate-300 md:text-base ${
						bioExpanded
							? "max-h-none"
							: "max-h-[min(34vh,12rem)] overflow-hidden sm:max-h-[min(38vh,14rem)]"
					}`}
				>
					<p
						ref={(el) => {
							bioParaRefs.current[0] = el;
						}}
					>
						I specialize in high-performance, mobile-responsive applications
						that integrate cleanly with APIs, databases, and third-party
						services. My work spans ERP, HCM, and CRM systems, learning
						platforms, e-commerce, and client-facing portfolio sites — always
						with a focus on reliability, accessibility, and maintainable
						architecture.
					</p>
					<p
						ref={(el) => {
							bioParaRefs.current[1] = el;
						}}
					>
						Alongside product development, I design and implement AI agents and
						intelligent bot experiences: LLM-backed assistants, portfolio and
						support chatbots, and Telegram integrations wired to business logic.
						I work with OpenRouter, OpenAI, and modern agent patterns to deliver
						responses that are context-aware, secure, and aligned with each
						product&apos;s goals.
					</p>
					<p
						ref={(el) => {
							bioParaRefs.current[2] = el;
						}}
					>
						Performance and operational efficiency are core to how I build. I
						optimize API usage, state management, and caching so applications
						stay fast and cost-effective as they scale. I stay current with
						React, Next.js, TypeScript, and emerging AI tooling, and adapt
						quickly when a project calls for a new stack or integration.
					</p>
					<p
						ref={(el) => {
							bioParaRefs.current[3] = el;
						}}
					>
						Since 2016 I have progressed from managing CMS-based e-commerce
						sites to leading full-stack delivery on platforms such as Sourcepin,
						HCM, Muyalogy, Jiret LMS, Afriwork Learn, Green Bag Ethiopia,
						Afrocado Exports, AR Solutions, Peragos, Loop State, and Bazra
						E-Wallet — partnering with clients and teams to turn requirements
						into production-ready software, including AI-enhanced features where
						they add clear value.
					</p>
				</div>
				{!bioExpanded ? (
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent"
						aria-hidden
					/>
				) : null}
				<button
					type="button"
					onClick={() => setBioExpanded((v) => !v)}
					aria-expanded={bioExpanded}
					aria-controls="about-bio-text"
					className="unstyled relative z-[2] mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/[0.07] px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:border-cyan-400/35 dark:bg-cyan-500/10 dark:text-cyan-300"
				>
					{bioExpanded ? "Show less" : "Read full story"}
				</button>
			</div>
		</>
	);
}
