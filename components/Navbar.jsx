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

function dockKeyLabel(index) {
	return `F${index + 1}`;
}

function DockIcon({ item, isActive, itemRef, keyLabel, className = "" }) {
	const Icon = item.icon;

	return (
		<Link
			href={item.href}
			className={`dock-item unstyled group relative z-0 flex shrink-0 flex-col items-center justify-end ${className}`}
			aria-label={item.label}
			aria-current={isActive ? "page" : undefined}
		>
			<span
				ref={itemRef}
				className="dock-magnify-target relative flex flex-col items-center justify-end"
			>
				<span className="dock-tooltip pointer-events-none absolute -top-10 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100">
					{item.label}
				</span>
				<span
					className={`dock-icon-shell ${isActive ? "is-active" : ""}`}
				>
					{keyLabel ? (
						<span className="dock-key-label" aria-hidden>
							{keyLabel}
						</span>
					) : null}
					<Icon size={22} className="shrink-0" aria-hidden />
				</span>
				{isActive ? (
					<span className="dock-active-dot" aria-hidden />
				) : (
					<span className="dock-active-dot-placeholder" aria-hidden />
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
	keyLabel,
	className = "",
	children,
}) {
	const shellClass = `dock-icon-shell ${isActive ? "is-active" : ""}`;
	const itemClass = `dock-item unstyled group relative z-0 flex shrink-0 flex-col items-center justify-end ${className}`;

	const inner = (
		<span
			ref={itemRef}
			className="dock-magnify-target relative flex flex-col items-center justify-end"
		>
			<span className="dock-tooltip pointer-events-none absolute -top-10 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100">
				{label}
			</span>
			<span className={shellClass}>
				{keyLabel ? (
					<span className="dock-key-label" aria-hidden>
						{keyLabel}
					</span>
				) : null}
				{children}
			</span>
			{isActive ? (
				<span className="dock-active-dot" aria-hidden />
			) : (
				<span className="dock-active-dot-placeholder" aria-hidden />
			)}
		</span>
	);

	if (href) {
		return (
			<a href={href} className={itemClass} aria-label={label}>
				{inner}
			</a>
		);
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={itemClass}
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
			<div className="dock-shelf relative w-max max-w-[calc(100vw-1.5rem)] overflow-visible">
				<div className="dock-shelf-bg pointer-events-none absolute inset-0" aria-hidden />

				<div
					ref={dockRef}
					className="dock-scroll relative z-10 flex items-end justify-center gap-1.5 overflow-x-auto px-3 pb-2.5 pt-2 sm:gap-2 sm:overflow-visible sm:px-3.5 sm:pb-3 sm:pt-2.5"
				>
				{primaryItems.map((item, i) => (
					<DockIcon
						key={item.href}
						item={item}
						isActive={isActive(item.href)}
						keyLabel={dockKeyLabel(i)}
						className={item.hideOnMobile ? "hidden sm:flex" : ""}
						itemRef={(el) => {
							itemRefs.current[i] = el;
						}}
					/>
				))}

				{resumeItem ? (
					<>
						<DockIcon
							item={resumeItem}
							isActive={isActive(resumeItem.href)}
							keyLabel={dockKeyLabel(primaryItems.length)}
							className="hidden sm:flex"
							itemRef={(el) => {
								itemRefs.current[primaryItems.length] = el;
							}}
						/>
					</>
				) : null}

				<DockActionButton
					label="Call me"
					keyLabel={dockKeyLabel(phoneIndex)}
					href={PHONE_HREF}
					className="hidden sm:flex"
					itemRef={(el) => {
						itemRefs.current[phoneIndex] = el;
					}}
				>
					<FaPhone className="h-[1.05rem] w-[1.05rem] sm:h-[1.15rem] sm:w-[1.15rem]" aria-hidden />
				</DockActionButton>

				<DockActionButton
					label="AI chat"
					keyLabel={dockKeyLabel(chatIndex)}
					isActive={chatOpen}
					onClick={() => toggleChat(itemRefs.current[chatIndex])}
					itemRef={(el) => {
						itemRefs.current[chatIndex] = el;
					}}
				>
					<HiOutlineChatAlt2 className="h-[1.35rem] w-[1.35rem]" aria-hidden />
				</DockActionButton>

				<DockActionButton
					label={isDark ? "Light mode" : "Dark mode"}
					keyLabel={dockKeyLabel(themeIndex)}
					onClick={toggleTheme}
					itemRef={(el) => {
						itemRefs.current[themeIndex] = el;
					}}
				>
					{isDark ? (
						<HiOutlineSun className="h-[1.35rem] w-[1.35rem]" aria-hidden />
					) : (
						<HiOutlineMoon className="h-[1.35rem] w-[1.35rem]" aria-hidden />
					)}
				</DockActionButton>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
