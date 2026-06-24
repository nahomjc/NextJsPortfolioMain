import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FaPhone } from "react-icons/fa";
import { HiOutlineChatAlt2, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";
import { useDockActions } from "./DockActionsContext";
import { mainNavItems } from "../config/navItems";

const PHONE_HREF = "tel:+251937287140";

const SECTION_MAP = [
	{ id: "home", href: "/" },
	{ id: "about", href: "/#about" },
	{ id: "skills", href: "/#skills" },
	{ id: "projects", href: "/#projects" },
	{ id: "ai", href: "/#ai" },
	{ id: "contact", href: "/#contact" },
];

function DockIcon({ item, isActive, itemRef }) {
	const Icon = item.icon;

	return (
		<Link
			href={item.href}
			className="dock-item group relative z-0 flex shrink-0 flex-col items-center justify-end"
			aria-label={item.label}
			aria-current={isActive ? "page" : undefined}
		>
			<span
				ref={itemRef}
				className="dock-magnify-target relative flex flex-col items-center justify-end"
			>
				<span className="dock-tooltip pointer-events-none absolute -top-10 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200/90 bg-white/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-700 opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-white/15 dark:bg-slate-900/90 dark:text-slate-100 dark:shadow-lg">
					{item.label}
				</span>
				<span
					className={`dock-icon-shell ${isActive ? "is-active" : ""}`}
				>
					<Icon
						size={22}
						className="shrink-0 text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-200/90 dark:group-hover:text-white"
						aria-hidden
					/>
				</span>
				{isActive ? (
					<span
						className="mt-1 h-1 w-1 rounded-full bg-slate-700 dark:bg-white/80"
						aria-hidden
					/>
				) : (
					<span className="mt-1 h-1 w-1" aria-hidden />
				)}
			</span>
		</Link>
	);
}

function DockActionButton({
	label,
	itemRef,
	onClick,
	href,
	isActive = false,
	children,
}) {
	const shellClass = `dock-icon-shell ${isActive ? "is-active" : ""}`;

	const inner = (
		<span
			ref={itemRef}
			className="dock-magnify-target relative flex flex-col items-center justify-end"
		>
			<span className="dock-tooltip pointer-events-none absolute -top-10 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-200/90 bg-white/95 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-700 opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-white/15 dark:bg-slate-900/90 dark:text-slate-100">
				{label}
			</span>
			<span className={shellClass}>{children}</span>
			{isActive ? (
				<span
					className="mt-1 h-1 w-1 rounded-full bg-slate-700 dark:bg-white/80"
					aria-hidden
				/>
			) : (
				<span className="mt-1 h-1 w-1" aria-hidden />
			)}
		</span>
	);

	if (href) {
		return (
			<a
				href={href}
				className="dock-item group relative z-0 flex shrink-0 flex-col items-center justify-end"
				aria-label={label}
			>
				{inner}
			</a>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className="dock-item group relative z-0 flex shrink-0 flex-col items-center justify-end"
			aria-label={label}
			aria-pressed={isActive || undefined}
		>
			{inner}
		</button>
	);
}

const Navbar = () => {
	const router = useRouter();
	const { theme, toggleTheme } = useTheme();
	const { chatOpen, toggleChat } = useDockActions();
	const isDark = theme === "dark";

	const dockRef = useRef(null);
	const itemRefs = useRef([]);
	const [activeHref, setActiveHref] = useState("/");

	const isLegacyTransparent =
		router.asPath === "/property" ||
		router.asPath === "/crypto" ||
		router.asPath === "/netflix" ||
		router.asPath === "/twitch";

	const primaryItems = mainNavItems.filter((item) => item.href !== "/resume");
	const resumeItem = mainNavItems.find((item) => item.href === "/resume");

	useEffect(() => {
		if (router.pathname !== "/") {
			const match = mainNavItems.find((item) => item.href === router.pathname);
			if (match) setActiveHref(match.href);
			return;
		}

		const elements = SECTION_MAP.map(({ id }) => document.getElementById(id)).filter(
			Boolean
		);
		if (!elements.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (!visible.length) return;
				const id = visible[0].target.id;
				const mapped = SECTION_MAP.find((s) => s.id === id);
				if (mapped) setActiveHref(mapped.href);
			},
			{ rootMargin: "-42% 0px -42% 0px", threshold: [0.12, 0.35, 0.55] }
		);

		for (const el of elements) observer.observe(el);
		return () => observer.disconnect();
	}, [router.pathname]);

	useEffect(() => {
		const dock = dockRef.current;
		if (!dock) return;

		const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReduced) return;

		const setItemLift = (el, scale, lift, t) => {
			el.style.transform = `scale(${scale}) translateY(${lift}px)`;
			el.style.zIndex = t > 0.15 ? "30" : "";
			const parent = el.closest(".dock-item");
			if (parent) parent.style.zIndex = t > 0.15 ? "30" : "";
		};

		const onMove = (e) => {
			for (let i = 0; i < itemRefs.current.length; i++) {
				const el = itemRefs.current[i];
				if (!el) continue;
				const rect = el.getBoundingClientRect();
				const center = rect.left + rect.width / 2;
				const dist = Math.abs(e.clientX - center);
				const maxDist = 110;
				if (dist >= maxDist) {
					el.style.transform = "scale(1) translateY(0)";
					el.style.zIndex = "";
					const parent = el.closest(".dock-item");
					if (parent) parent.style.zIndex = "";
					continue;
				}
				const t = 1 - dist / maxDist;
				const scale = 1 + t * 0.52;
				const lift = t * -18;
				setItemLift(el, scale, lift, t);
			}
		};

		const resetIcons = () => {
			for (const el of itemRefs.current) {
				if (!el) continue;
				el.style.transform = "";
				el.style.zIndex = "";
				const parent = el.closest(".dock-item");
				if (parent) parent.style.zIndex = "";
			}
		};

		dock.addEventListener("mousemove", onMove);
		dock.addEventListener("mouseleave", resetIcons);
		return () => {
			dock.removeEventListener("mousemove", onMove);
			dock.removeEventListener("mouseleave", resetIcons);
		};
	}, []);

	const isActive = (href) => {
		if (href === "/resume") return router.pathname === "/resume";
		if (router.pathname !== "/") return false;
		return activeHref === href || (href === "/" && activeHref === "/");
	};

	const phoneIndex = primaryItems.length + (resumeItem ? 1 : 0);
	const chatIndex = phoneIndex + 1;
	const themeIndex = chatIndex + 1;

	return (
		<nav
			className={`dock-nav fixed inset-x-0 bottom-0 z-[100] flex justify-center overflow-visible px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-14 ${
				isLegacyTransparent ? "pointer-events-none opacity-0" : ""
			}`}
			aria-label="Main navigation"
		>
			<div className="dock-shelf relative max-w-[min(100%,980px)] overflow-visible">
				<div
					className="dock-shelf-bg pointer-events-none absolute inset-0 rounded-2xl border border-slate-200/85 bg-white/92 shadow-[0_8px_32px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/10 dark:bg-[#0a0a0c]/97 dark:shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]"
					aria-hidden
				>
					<div className="absolute inset-x-4 top-0 h-px bg-slate-200/90 dark:bg-white/10" />
				</div>

				<div
					ref={dockRef}
					className="relative z-10 flex items-end gap-0.5 overflow-visible px-2 pb-2.5 pt-2 sm:gap-1 sm:px-3 sm:pb-3"
				>
				{primaryItems.map((item, i) => (
					<DockIcon
						key={item.href}
						item={item}
						isActive={isActive(item.href)}
						itemRef={(el) => {
							itemRefs.current[i] = el;
						}}
					/>
				))}

				{resumeItem ? (
					<>
						<span
							className="dock-divider mx-0.5 mb-2 hidden h-8 w-px shrink-0 bg-slate-300/80 sm:mx-1 sm:block dark:bg-white/15"
							aria-hidden
						/>
						<DockIcon
							item={resumeItem}
							isActive={isActive(resumeItem.href)}
							itemRef={(el) => {
								itemRefs.current[primaryItems.length] = el;
							}}
						/>
					</>
				) : null}

				<span
					className="dock-divider mx-0.5 mb-2 h-8 w-px shrink-0 bg-slate-300/80 sm:mx-1 dark:bg-white/15"
					aria-hidden
				/>

				<DockActionButton
					label="Call me"
					href={PHONE_HREF}
					itemRef={(el) => {
						itemRefs.current[phoneIndex] = el;
					}}
				>
					<FaPhone className="h-[1.05rem] w-[1.05rem] text-slate-600 transition-colors group-hover:text-slate-900 sm:h-[1.15rem] sm:w-[1.15rem] dark:text-slate-200/90 dark:group-hover:text-white" aria-hidden />
				</DockActionButton>

				<DockActionButton
					label="AI chat"
					isActive={chatOpen}
					onClick={() => toggleChat(itemRefs.current[chatIndex])}
					itemRef={(el) => {
						itemRefs.current[chatIndex] = el;
					}}
				>
					<HiOutlineChatAlt2 className="h-[1.35rem] w-[1.35rem] text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-200/90 dark:group-hover:text-white" aria-hidden />
				</DockActionButton>

				<span
					className="dock-divider mx-0.5 mb-2 h-8 w-px shrink-0 bg-slate-300/80 sm:mx-1 dark:bg-white/15"
					aria-hidden
				/>

				<DockActionButton
					label={isDark ? "Light mode" : "Dark mode"}
					onClick={toggleTheme}
					itemRef={(el) => {
						itemRefs.current[themeIndex] = el;
					}}
				>
					{isDark ? (
						<HiOutlineSun className="h-[1.35rem] w-[1.35rem] text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-200/90 dark:group-hover:text-white" aria-hidden />
					) : (
						<HiOutlineMoon className="h-[1.35rem] w-[1.35rem] text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-200/90 dark:group-hover:text-white" aria-hidden />
					)}
				</DockActionButton>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
