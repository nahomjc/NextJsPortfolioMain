const corner =
	"pointer-events-none absolute z-20 h-8 w-8 border-cyan-400/80 dark:border-cyan-400/70";

export default function HudCorners() {
	return (
		<>
			<span
				className={`${corner} left-3 top-3 border-l-2 border-t-2`}
				aria-hidden
			/>
			<span
				className={`${corner} right-3 top-3 border-r-2 border-t-2`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-3 left-3 border-b-2 border-l-2`}
				aria-hidden
			/>
			<span
				className={`${corner} bottom-3 right-3 border-b-2 border-r-2`}
				aria-hidden
			/>
		</>
	);
}
