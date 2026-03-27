import Link from "next/link";
import React from "react";
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { useState, useEffect } from "react";
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

	return (
		<div
			className={`fixed top-0 z-[100] w-full transition-all duration-300 ${
				isLegacyTransparent
					? "border-b border-transparent bg-transparent"
					: "border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75"
			} ${shadow ? "shadow-card-light dark:shadow-card-dark" : ""}`}
		>
			<div className="flex h-16 w-full items-center justify-between px-4 2xl:px-16">
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
						className="unstyled rounded-lg p-2 text-slate-800 shadow-none dark:text-slate-100 md:hidden"
						onClick={handelNav}
						aria-label="Open menu"
					>
						<AiOutlineMenu size={25} />
					</button>
				</div>
			</div>

			<div
				className={
					nav
						? "fixed left-0 top-0 z-[100] h-screen w-full bg-slate-950/60 backdrop-blur-sm md:hidden"
						: ""
				}
			>
				<div
					className={
						nav
							? "fixed left-0 top-0 h-screen w-[75%] border-r border-white/10 bg-white/95 p-10 shadow-card-light duration-500 ease-in dark:border-white/10 dark:bg-slate-950/95 sm:w-[60%] md:w-[45%]"
							: "fixed left-[-100%] top-0 p-10 duration-500 ease-in"
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
