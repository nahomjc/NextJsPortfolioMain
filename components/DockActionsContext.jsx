import React, { createContext, useCallback, useContext, useState } from "react";

const DockActionsContext = createContext(null);

function anchorFromElement(el) {
	if (!el || typeof window === "undefined") return null;
	const rect = el.getBoundingClientRect();
	return {
		centerX: rect.left + rect.width / 2,
		top: rect.top,
		left: rect.left,
		width: rect.width,
	};
}

export function DockActionsProvider({ children }) {
	const [chatOpen, setChatOpen] = useState(false);
	const [chatAnchor, setChatAnchor] = useState(null);

	const openChat = useCallback((anchorEl) => {
		if (anchorEl) setChatAnchor(anchorFromElement(anchorEl));
		setChatOpen(true);
	}, []);

	const closeChat = useCallback(() => setChatOpen(false), []);

	const toggleChat = useCallback((anchorEl) => {
		setChatOpen((open) => {
			if (!open && anchorEl) setChatAnchor(anchorFromElement(anchorEl));
			return !open;
		});
	}, []);

	return (
		<DockActionsContext.Provider
			value={{ chatOpen, chatAnchor, setChatOpen, openChat, closeChat, toggleChat }}
		>
			{children}
		</DockActionsContext.Provider>
	);
}

export function useDockActions() {
	const ctx = useContext(DockActionsContext);
	if (!ctx) {
		return {
			chatOpen: false,
			chatAnchor: null,
			setChatOpen: () => {},
			openChat: () => {},
			closeChat: () => {},
			toggleChat: () => {},
		};
	}
	return ctx;
}
