import {
	AiOutlineCode,
	AiOutlineFolder,
	AiOutlineHome,
	AiOutlineMail,
	AiOutlineThunderbolt,
	AiOutlineUser,
} from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";

/**
 * Single source of truth for main header links.
 * Add `hasDropdown: true` and wire menus separately when needed.
 */
export const mainNavItems = [
	{ href: "/", label: "Home", icon: AiOutlineHome, hasDropdown: false },
	{ href: "/#about", label: "About", icon: AiOutlineUser, hasDropdown: false },
	{ href: "/#skills", label: "Skills", icon: AiOutlineCode, hasDropdown: false },
	{
		href: "/#projects",
		label: "Projects",
		icon: AiOutlineFolder,
		hasDropdown: false,
	},
	{ href: "/#ai", label: "AI", icon: AiOutlineThunderbolt, hasDropdown: false },
	{ href: "/#contact", label: "Contact", icon: AiOutlineMail, hasDropdown: false },
	{
		href: "/resume",
		label: "Resume",
		icon: BsFillPersonLinesFill,
		hasDropdown: false,
	},
];
