import React from "react";
import { useTheme } from "./ThemeProvider";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

const ThemeToggle = ({ isMobile }) => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";

	const base =
		"group inline-flex items-center justify-center gap-2 rounded-full border font-medium " +
		"transition-all duration-200 " +
		"focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/45 focus-visible:ring-offset-2 " +
		"dark:focus-visible:ring-violet-400/50 dark:focus-visible:ring-offset-slate-950";

	const desktop =
		"h-9 w-9 shrink-0 border-slate-200/90 bg-white/85 text-slate-600 shadow-sm " +
		"backdrop-blur-md hover:border-cyan-400/55 hover:bg-white hover:text-cyan-600 hover:shadow " +
		"dark:border-white/12 dark:bg-slate-900/75 dark:text-amber-200/90 " +
		"dark:hover:border-violet-400/40 dark:hover:bg-slate-800/90 dark:hover:text-amber-100";

	const mobile =
		"h-11 w-full border-slate-200/90 bg-white/90 px-4 text-sm text-slate-700 shadow-sm " +
		"backdrop-blur-md hover:border-cyan-400/50 hover:bg-white dark:border-white/12 " +
		"dark:bg-slate-900/75 dark:text-slate-200 dark:hover:border-violet-400/35 dark:hover:bg-slate-800/85";

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={`${base} ${isMobile ? mobile : desktop}`}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDark ? (
				<>
					{isMobile && <span>Light mode</span>}
					<HiOutlineSun
						className={`shrink-0 transition-transform duration-200 group-hover:rotate-12 ${isMobile ? "h-5 w-5" : "h-[1.125rem] w-[1.125rem]"}`}
						aria-hidden
					/>
				</>
			) : (
				<>
					{isMobile && <span>Dark mode</span>}
					<HiOutlineMoon
						className={`shrink-0 transition-transform duration-200 group-hover:-rotate-12 ${isMobile ? "h-5 w-5" : "h-[1.125rem] w-[1.125rem]"}`}
						aria-hidden
					/>
				</>
			)}
		</button>
	);
};

export default ThemeToggle;
