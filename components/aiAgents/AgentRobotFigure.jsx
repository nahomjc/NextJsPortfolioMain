import React from "react";
import {
	HiOutlineBriefcase,
	HiOutlineSparkles,
} from "react-icons/hi";
import { FaDumbbell, FaCoins } from "react-icons/fa";

const iconMap = {
	briefcase: HiOutlineBriefcase,
	dumbbell: FaDumbbell,
	coins: FaCoins,
};

function ChestIcon({ iconKey }) {
	const Icon = iconMap[iconKey] ?? HiOutlineSparkles;
	return <Icon className="text-lg md:text-xl" aria-hidden />;
}

export default function AgentRobotFigure({
	agent,
	isActive,
	isOnline,
	index,
}) {
	return (
		<div
			className={`agent-robot ${isActive ? "agent-robot--active" : ""}`}
			aria-hidden
		>
			<div className="agent-robot__hud-ring" />
			<div className="agent-robot__unit-label">
				<span className="agent-robot__unit-id">{agent.unitId}</span>
				<span className="agent-robot__unit-idx">
					{String(index + 1).padStart(2, "0")}
				</span>
			</div>

			<div className="agent-robot__figure">
				<div className="agent-robot__antenna">
					<span className="agent-robot__antenna-rod" />
					<span className="agent-robot__antenna-tip" />
				</div>

				<div className="agent-robot__head">
					<span className="agent-robot__head-brow" />
					<div className="agent-robot__eyes">
						<span className="agent-robot__eye" />
						<span className="agent-robot__eye" />
					</div>
					<span className="agent-robot__mouth" />
				</div>

				<div className="agent-robot__neck" />

				<div className="agent-robot__torso">
					<span className="agent-robot__arm agent-robot__arm--left" />
					<div className="agent-robot__chest">
						<span className="agent-robot__chest-icon">
							<ChestIcon iconKey={agent.iconKey} />
						</span>
					</div>
					<span className="agent-robot__arm agent-robot__arm--right" />
				</div>

				<div className="agent-robot__hips">
					<span className="agent-robot__leg" />
					<span className="agent-robot__leg" />
				</div>
			</div>

			<div className="agent-robot__pad" />

			<div className="agent-robot__status">
				<span
					className={`agent-robot__led ${isOnline ? "agent-robot__led--live" : ""}`}
				/>
				<span className="agent-robot__status-text">{agent.status}</span>
			</div>
		</div>
	);
}
