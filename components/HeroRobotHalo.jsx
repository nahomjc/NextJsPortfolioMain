import React from "react";

const TICKS_MAJOR = [0, 45, 90, 135, 180, 225, 270, 315];
const TICKS_MINOR = Array.from({ length: 72 }, (_, i) => i * 5);

function HaloDefs({ idPrefix }) {
	return (
		<defs>
			<linearGradient
				id={`${idPrefix}-cyan`}
				x1="0%"
				y1="0%"
				x2="100%"
				y2="100%"
			>
				<stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0" />
				<stop offset="40%" stopColor="rgb(34 211 238)" stopOpacity="0.95" />
				<stop offset="100%" stopColor="rgb(165 243 252)" stopOpacity="0.1" />
			</linearGradient>
			<linearGradient
				id={`${idPrefix}-fuchsia`}
				x1="100%"
				y1="0%"
				x2="0%"
				y2="100%"
			>
				<stop offset="0%" stopColor="rgb(232 121 249)" stopOpacity="0" />
				<stop offset="40%" stopColor="rgb(217 70 239)" stopOpacity="0.92" />
				<stop offset="100%" stopColor="rgb(192 38 211)" stopOpacity="0.08" />
			</linearGradient>
			<filter
				id={`${idPrefix}-glow`}
				x="-30%"
				y="-30%"
				width="160%"
				height="160%"
			>
				<feGaussianBlur stdDeviation="1.6" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
	);
}

/**
 * Cinematic sci-fi rings behind the hero robot.
 * Outer wrapper is centered; each spin layer rotates on its own clock.
 */
export default function HeroRobotHalo() {
	return (
		<div
			className="hero-halo pointer-events-none absolute left-1/2 top-[46%] z-0 aspect-square w-[min(96%,36rem)] -translate-x-1/2 -translate-y-1/2"
			aria-hidden
		>
			<div className="hero-halo__well hero-halo__well--cyan" />
			<div className="hero-halo__well hero-halo__well--fuchsia" />
			<div className="hero-halo__well hero-halo__well--core" />

			<div className="hero-halo__stage">
				{/* Outer reticle */}
				<div className="hero-halo__spin hero-halo__spin--outer">
					<svg viewBox="0 0 400 400" className="hero-halo__svg" aria-hidden="true" focusable="false">
						<HaloDefs idPrefix="halo-o" />
						<circle
							cx="200"
							cy="200"
							r="188"
							fill="none"
							stroke="rgba(34,211,238,0.2)"
							strokeWidth="0.7"
							strokeDasharray="1.5 7"
						/>
						<circle
							cx="200"
							cy="200"
							r="172"
							fill="none"
							stroke="rgba(34,211,238,0.3)"
							strokeWidth="1.15"
						/>
						{TICKS_MINOR.map((deg) => (
							<line
								key={`m-${deg}`}
								x1="200"
								y1="20"
								x2="200"
								y2={deg % 15 === 0 ? 30 : 26}
								stroke={
									deg % 15 === 0
										? "rgba(103,232,249,0.55)"
										: "rgba(34,211,238,0.2)"
								}
								strokeWidth={deg % 15 === 0 ? 1.15 : 0.65}
								transform={`rotate(${deg} 200 200)`}
							/>
						))}
						{TICKS_MAJOR.map((deg) => (
							<g key={`M-${deg}`} transform={`rotate(${deg} 200 200)`}>
								<line
									x1="200"
									y1="12"
									x2="200"
									y2="34"
									stroke="rgba(165,243,252,0.88)"
									strokeWidth="1.8"
									strokeLinecap="round"
								/>
								<path
									d="M188 38 H212 M200 34 V46"
									fill="none"
									stroke="rgba(34,211,238,0.55)"
									strokeWidth="1.1"
								/>
							</g>
						))}
						<path
							d="M200 28 A172 172 0 0 1 372 200"
							fill="none"
							stroke="url(#halo-o-cyan)"
							strokeWidth="3.4"
							strokeLinecap="round"
							filter="url(#halo-o-glow)"
							className="hero-halo__scan-arc"
						/>
						<path
							d="M28 200 A172 172 0 0 1 200 372"
							fill="none"
							stroke="rgba(34,211,238,0.32)"
							strokeWidth="1.35"
							strokeLinecap="round"
							strokeDasharray="20 14"
						/>
						<circle cx="200" cy="28" r="3.4" fill="#67e8f9" className="hero-halo__node" />
						<circle cx="372" cy="200" r="2.3" fill="#a5f3fc" opacity="0.85" />
						<circle cx="200" cy="372" r="2.7" fill="#22d3ee" opacity="0.7" />
						{/* leading chevron on scan tip */}
						<path
							d="M372 194 L380 200 L372 206"
							fill="none"
							stroke="#67e8f9"
							strokeWidth="1.4"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>

				{/* Mid ring — reverse */}
				<div className="hero-halo__spin hero-halo__spin--mid">
					<svg viewBox="0 0 400 400" className="hero-halo__svg" aria-hidden="true" focusable="false">
						<HaloDefs idPrefix="halo-m" />
						<circle
							cx="200"
							cy="200"
							r="138"
							fill="none"
							stroke="rgba(217,70,239,0.24)"
							strokeWidth="1"
							strokeDasharray="24 12 3 12"
						/>
						<circle
							cx="200"
							cy="200"
							r="124"
							fill="none"
							stroke="rgba(232,121,249,0.18)"
							strokeWidth="0.85"
						/>
						{[20, 110, 200, 290].map((deg) => (
							<g key={deg} transform={`rotate(${deg} 200 200)`}>
								<rect
									x="193"
									y="52"
									width="14"
									height="14"
									rx="1"
									fill="none"
									stroke="rgba(240,171,252,0.75)"
									strokeWidth="1.15"
									transform="rotate(45 200 59)"
								/>
								<line
									x1="200"
									y1="46"
									x2="200"
									y2="56"
									stroke="rgba(217,70,239,0.8)"
									strokeWidth="1.4"
								/>
							</g>
						))}
						<path
							d="M76 200 A124 124 0 0 1 200 76"
							fill="none"
							stroke="url(#halo-m-fuchsia)"
							strokeWidth="2.8"
							strokeLinecap="round"
							filter="url(#halo-m-glow)"
							className="hero-halo__scan-arc hero-halo__scan-arc--fuchsia"
						/>
						{[45, 135, 225, 315].map((deg) => (
							<circle
								key={`n-${deg}`}
								cx="200"
								cy="62"
								r="2.5"
								fill="#e879f9"
								transform={`rotate(${deg} 200 200)`}
								className="hero-halo__node--fuchsia"
							/>
						))}
					</svg>
				</div>

				{/* Inner core */}
				<div className="hero-halo__spin hero-halo__spin--inner">
					<svg viewBox="0 0 400 400" className="hero-halo__svg" aria-hidden="true" focusable="false">
						<HaloDefs idPrefix="halo-i" />
						<circle
							cx="200"
							cy="200"
							r="96"
							fill="none"
							stroke="rgba(148,163,184,0.22)"
							strokeWidth="0.7"
							strokeDasharray="2 5"
						/>
						<circle
							cx="200"
							cy="200"
							r="84"
							fill="none"
							stroke="rgba(34,211,238,0.28)"
							strokeWidth="1.1"
						/>
						{[0, 90, 180, 270].map((deg) => (
							<g key={`g-${deg}`} transform={`rotate(${deg} 200 200)`}>
								<path
									d="M184 108 H216 M200 98 V118"
									fill="none"
									stroke="rgba(103,232,249,0.58)"
									strokeWidth="1.25"
									strokeLinecap="square"
								/>
							</g>
						))}
						<path
							d="M200 116 A84 84 0 0 1 284 200"
							fill="none"
							stroke="url(#halo-i-cyan)"
							strokeWidth="2"
							strokeLinecap="round"
							className="hero-halo__pulse-arc"
						/>
						<path
							d="M200 284 A84 84 0 0 1 116 200"
							fill="none"
							stroke="rgba(34,211,238,0.32)"
							strokeWidth="1.15"
							strokeDasharray="8 6"
						/>
					</svg>
				</div>

				{/* Static frame */}
				<svg
					viewBox="0 0 400 400"
					className="hero-halo__svg hero-halo__svg--static"
					aria-hidden="true"
					focusable="false"
				>
					<path
						d="M72 96 V72 H96 M304 72 H328 V96 M328 304 V328 H304 M96 328 H72 V304"
						fill="none"
						stroke="rgba(34,211,238,0.48)"
						strokeWidth="1.7"
						strokeLinecap="square"
					/>
					<circle
						cx="200"
						cy="200"
						r="38"
						fill="none"
						stroke="rgba(34,211,238,0.12)"
						strokeWidth="0.8"
						strokeDasharray="3 5"
					/>
					{/* micro crosshair */}
					<path
						d="M200 186 V214 M186 200 H214"
						fill="none"
						stroke="rgba(34,211,238,0.2)"
						strokeWidth="0.8"
					/>
				</svg>
			</div>

			<span className="hero-halo__label hero-halo__label--tl">RNG · 01</span>
			<span className="hero-halo__label hero-halo__label--tr">LOCK</span>
			<span className="hero-halo__label hero-halo__label--bl">AZ · 0.00</span>
			<span className="hero-halo__label hero-halo__label--br">
				<span className="hero-halo__label-pulse" />
				SYNC
			</span>
		</div>
	);
}
