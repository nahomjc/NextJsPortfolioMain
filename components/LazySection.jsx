import React, { useEffect, useRef, useState } from "react";

/** Mount children when near the viewport — cuts initial JS/hydration cost. */
export default function LazySection({
	children,
	rootMargin = "320px 0px",
	minHeight = "40vh",
	className = "",
	forceMount = false,
}) {
	const ref = useRef(null);
	const [visible, setVisible] = useState(forceMount);

	useEffect(() => {
		if (forceMount) setVisible(true);
	}, [forceMount]);

	useEffect(() => {
		const el = ref.current;
		if (!el || visible) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				setVisible(true);
				observer.disconnect();
			},
			{ rootMargin, threshold: 0 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [rootMargin, visible]);

	return (
		<div
			ref={ref}
			className={className}
			style={visible ? undefined : { minHeight }}
		>
			{visible ? children : null}
		</div>
	);
}
