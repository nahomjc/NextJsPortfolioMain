import Link from "next/link";
import React from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useState, useEffect, useId } from "react";
import { useRouter } from "next/router";

import ThemeToggle from "./ThemToggle";
import Logo from "./Logo";
import NavItem from "./NavItem";
import { mainNavItems } from "../config/navItems";

const navLinkBase =
	"relative text-xs font-semibold uppercase tracking-[0.12em] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-violet-500 after:transition-all hover:after:w-full";
const navLinkOnLight = `${navLinkBase} text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-300`;
const navLinkOnDark = `${navLinkBase} text-slate-100/90 hover:text-cyan-200`;

const mobileNavLinkClass =
	"w-full py-4 text-sm font-medium text-slate-700 dark:text-slate-200 normal-case tracking-normal";

const Navbar = () => {
	const [nav, setNav] = useState(false);
	const [shadow, setShadow] = useState(false);
	const router = useRouter();
	const ledUid = useId().replace(/:/g, "");

	const isLegacyTransparent =
		router.asPath === "/property" ||
		router.asPath === "/crypto" ||
		router.asPath === "/netflix" ||
		router.asPath === "/twitch";

	const handelNav = () => {
		setNav(!nav);
	};

	useEffect(() => {
		const handleShadow = () => {
			setShadow(window.scrollY >= 90);
		};
		window.addEventListener("scroll", handleShadow);
		return () => window.removeEventListener("scroll", handleShadow);
	}, []);

	const glassBackPanel =
		"absolute inset-0 z-0 overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-b from-white/78 via-white/52 to-white/38 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/[0.08] dark:from-slate-950/85 dark:via-slate-950/58 dark:to-slate-950/42 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]";

	const orbitShell = `relative isolate rounded-2xl transition-all duration-500 ease-out ${
		shadow
			? "shadow-card-light ring-1 ring-cyan-500/15 dark:shadow-card-dark dark:ring-cyan-400/20"
			: "shadow-[0_10px_40px_-12px_rgba(15,23,42,0.18),0_0_60px_-24px_rgba(34,211,238,0.12)] dark:shadow-[0_14px_48px_-14px_rgba(0,0,0,0.55),0_0_80px_-30px_rgba(34,211,238,0.08)]"
	}`;

	const navRow = (
		<div className="relative z-[2] flex h-[3.5rem] w-full items-center justify-between px-4 sm:h-16 sm:px-5 2xl:px-10">
			<Logo size="small" />

			<div>
				<ul className="hidden items-center gap-2 md:flex">
					{mainNavItems.map((item) => (
						<li key={item.href} className="ml-8">
							<NavItem
								href={item.href}
								label={item.label}
								icon={item.icon}
								hasDropdown={item.hasDropdown}
								className={
									isLegacyTransparent ? navLinkOnDark : navLinkOnLight
								}
							/>
						</li>
					))}
					<li className="ml-6 flex items-center">
						<ThemeToggle isMobile={false} />
					</li>
				</ul>
				<button
					type="button"
					className={`unstyled rounded-xl p-2 shadow-none md:hidden ${
						isLegacyTransparent
							? "text-slate-100"
							: "border border-slate-200/60 bg-white/40 text-slate-800 backdrop-blur-md dark:border-white/15 dark:bg-white/5 dark:text-slate-100"
					}`}
					onClick={handelNav}
					aria-label="Open menu"
				>
					<AiOutlineMenu size={25} />
				</button>
			</div>
		</div>
	);

	return (
		<div
			className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
				isLegacyTransparent ? "" : "px-3 pt-3 sm:px-5 md:px-8 2xl:px-12"
			}`}
		>
			{isLegacyTransparent ? (
				<div className="border-b border-transparent bg-transparent">{navRow}</div>
			) : (
				<div className={orbitShell}>
					<div className={glassBackPanel} aria-hidden />
					<div
						className="pointer-events-none absolute inset-0 z-[1] rounded-2xl"
						aria-hidden
					>
						<svg
							className="h-full w-full text-slate-400/25 dark:text-white/[0.12]"
							viewBox="0 0 800 128"
							preserveAspectRatio="none"
							aria-hidden
						>
							<defs>
								<linearGradient
									id={`${ledUid}-led`}
									x1="0%"
									y1="0%"
									x2="100%"
									y2="0%"
								>
									<stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
									<stop offset="35%" stopColor="#67e8f9" stopOpacity="1" />
									<stop offset="50%" stopColor="#e879f9" stopOpacity="1" />
									<stop offset="65%" stopColor="#67e8f9" stopOpacity="1" />
									<stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
								</linearGradient>
								<filter
									id={`${ledUid}-glow`}
									x="-40%"
									y="-40%"
									width="180%"
									height="180%"
									colorInterpolationFilters="sRGB"
								>
									<feGaussianBlur stdDeviation="2.2" result="b" />
									<feMerge>
										<feMergeNode in="b" />
										<feMergeNode in="SourceGraphic" />
									</feMerge>
								</filter>
							</defs>
							{/* faint track so the bar edge reads when the dash is elsewhere */}
							<rect
								x="2.5"
								y="2.5"
								width="795"
								height="123"
								rx="26"
								ry="26"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							{/* bright head */}
							<rect
								x="2.5"
								y="2.5"
								width="795"
								height="123"
								rx="26"
								ry="26"
								fill="none"
								stroke={`url(#${ledUid}-led)`}
								strokeWidth="3"
								strokeLinecap="round"
								pathLength="100"
								strokeDasharray="5 95"
								filter={`url(#${ledUid}-glow)`}
							>
								<animate
									attributeName="stroke-dashoffset"
									from="0"
									to="-100"
									dur="3.2s"
									repeatCount="indefinite"
								/>
							</rect>
							{/* softer trail chasing behind */}
							<rect
								x="2.5"
								y="2.5"
								width="795"
								height="123"
								rx="26"
								ry="26"
								fill="none"
								stroke="#22d3ee"
								strokeWidth="2"
								strokeLinecap="round"
								opacity="0.4"
								pathLength="100"
								strokeDasharray="3 97"
							>
								<animate
									attributeName="stroke-dashoffset"
									from="14"
									to="-86"
									dur="3.2s"
									repeatCount="indefinite"
								/>
							</rect>
						</svg>
					</div>
					<div className="relative z-[2]">
						<div
							className="pointer-events-none absolute inset-x-6 top-0 z-[1] h-px max-w-none bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent dark:via-cyan-300/45"
							aria-hidden
						/>
						{navRow}
					</div>
				</div>
			)}

			<div
				className={
					nav
						? "fixed left-0 top-0 z-[110] h-screen w-full bg-slate-950/60 backdrop-blur-md md:hidden"
						: ""
				}
			>
				<div
					className={
						nav
							? "fixed left-0 top-0 z-[111] h-screen w-[75%] border-r border-white/15 bg-white/90 p-10 shadow-card-light backdrop-blur-xl duration-500 ease-in dark:border-white/10 dark:bg-slate-950/90 dark:shadow-card-dark sm:w-[60%] md:w-[45%]"
							: "fixed left-[-100%] top-0 z-[111] p-10 duration-500 ease-in"
					}
				>
					<div className="mb-6 mt-2 flex w-full justify-center">
						<ThemeToggle isMobile={true} />
					</div>
					<div>
						<div className="flex w-full items-center justify-between">
							<Logo size="small" />
							<button
								type="button"
								className="unstyled rounded-full border border-slate-200/80 bg-white/90 p-3 text-slate-800 shadow-md dark:border-white/10 dark:bg-slate-900/90 dark:text-white"
								onClick={handelNav}
								aria-label="Close menu"
							>
								<AiOutlineClose size={25} />
							</button>
						</div>
						<div className="my-4 border-b border-slate-200 dark:border-white/10">
							<p className="w-[85%] py-4 text-slate-600 dark:text-slate-400 md:w-[98%]">
								Let&apos;s build something legendary together
							</p>
						</div>

						<div className="flex flex-col py-4 dark:text-white">
							<ul className="uppercase">
								{mainNavItems.map((item) => (
									<li key={item.href}>
										<NavItem
											href={item.href}
											label={item.label}
											icon={item.icon}
											hasDropdown={item.hasDropdown}
											className={mobileNavLinkClass}
											onClick={() => setNav(false)}
											iconSize={20}
										/>
									</li>
								))}
							</ul>
							<div className="pt-28">
								<p className="section-eyebrow">Let&apos;s Connect</p>

								<div className="my-4 flex w-full items-center justify-between sm:w-[80%]">
									<a
										href="https://www.linkedin.com/in/nahom-tesfaye-35b97420b/"
										target="_blank"
										rel="noreferrer"
										className="icon-ring !h-11 !w-11"
									>
										<FaLinkedinIn />
									</a>
									<a
										href="https://github.com/nahomjc"
										target="_blank"
										rel="noreferrer"
										className="icon-ring !h-11 !w-11"
									>
										<FaGithub />
									</a>
									<Link
										href="/#contact"
										className="icon-ring !h-11 !w-11"
										onClick={() => setNav(false)}
									>
										<AiOutlineMail />
									</Link>
									<Link
										href="/resume"
										className="icon-ring !h-11 !w-11"
										onClick={() => setNav(false)}
									>
										<BsFillPersonLinesFill />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
