import { SCENES } from "./aboutData";
import AboutPortrait from "./AboutPortrait";
import IntroScene from "./scenes/IntroScene";
import CapabilitiesScene from "./scenes/CapabilitiesScene";
import StoryScene from "./scenes/StoryScene";
import WorkspaceScene from "./scenes/WorkspaceScene";
import { TerminalFrame } from "./DeckChrome";

function MobileScene({ children, sceneRef, index }) {
	const scene = SCENES[Math.min(index, SCENES.length - 1)];
	return (
		<article ref={sceneRef} className="about-mobile-vault relative">
			<span
				className="about-mobile-vault__watermark pointer-events-none absolute -right-2 top-2 font-display text-7xl font-bold leading-none text-cyan-400/[0.06]"
				aria-hidden
			>
				{scene?.code}
			</span>
			<TerminalFrame title={`mobile / ${scene?.label?.toLowerCase()}`}>
				{children}
			</TerminalFrame>
		</article>
	);
}

export default function AboutMobile({
	mobileSceneRefs,
	highlightRefs,
	bioParaRefs,
	workspaceRef,
	bioExpanded,
	setBioExpanded,
	activeScene,
	reduceMotion,
}) {
	return (
		<div className="about-mobile-stack space-y-6 lg:hidden">
			<div className="about-mobile-vault__intro text-center">
				<p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-400">
					Identity stream
				</p>
				<p className="mt-1 text-sm text-slate-400">
					{SCENES[activeScene]?.label} layer active
				</p>
			</div>
			<MobileScene
				sceneRef={(el) => {
					mobileSceneRefs.current[0] = el;
				}}
				index={0}
			>
				<IntroScene />
			</MobileScene>
			<MobileScene
				sceneRef={(el) => {
					mobileSceneRefs.current[1] = el;
				}}
				index={1}
			>
				<CapabilitiesScene highlightRefs={highlightRefs} />
			</MobileScene>
			<MobileScene
				sceneRef={(el) => {
					mobileSceneRefs.current[2] = el;
				}}
				index={2}
			>
				<div className="flex justify-center py-2">
					<AboutPortrait reduceMotion={reduceMotion} />
				</div>
			</MobileScene>
			<MobileScene
				sceneRef={(el) => {
					mobileSceneRefs.current[3] = el;
				}}
				index={3}
			>
				<StoryScene
					bioExpanded={bioExpanded}
					setBioExpanded={setBioExpanded}
					bioParaRefs={bioParaRefs}
				/>
			</MobileScene>
			<MobileScene
				sceneRef={(el) => {
					mobileSceneRefs.current[4] = el;
				}}
				index={3}
			>
				<WorkspaceScene
					workspaceRef={workspaceRef}
					activeScene={activeScene}
				/>
			</MobileScene>
		</div>
	);
}
