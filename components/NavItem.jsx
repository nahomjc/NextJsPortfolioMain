import Link from "next/link";
import React from "react";
import { AiOutlineDown } from "react-icons/ai";

/**
 * Header nav link: optional icon, label, optional dropdown chevron.
 * Pass `icon` as a react-icons component (e.g. AiOutlineHome).
 */
const NavItem = ({
	href,
	label,
	icon: Icon,
	hasDropdown = false,
	className = "",
	onClick,
	iconSize = 18,
}) => {
	return (
		<Link href={href} onClick={onClick} className={className.trim()}>
			<span className="flex items-center gap-2">
				{Icon ? (
					<Icon
						size={iconSize}
						className="shrink-0 opacity-90"
						aria-hidden
					/>
				) : null}
				<span>{label}</span>
				{hasDropdown ? (
					<AiOutlineDown
						size={14}
						className="shrink-0 opacity-70"
						aria-hidden
					/>
				) : null}
			</span>
		</Link>
	);
};

export default NavItem;
