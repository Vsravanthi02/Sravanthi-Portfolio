import ToolkitWorld from './toolkit/ToolkitWorld'

// ============================================================================
// THE ENGINEER'S TOOLKIT INSTALLATION (CHAPTER 05)
// Hosts the technology observatory and 7 verified technical stations:
// - Central Core: "THE ENGINEER'S TOOLKIT" // VERIFIED TECHNICAL STACK
// - Seven Technical Stations:
//     01 — PYTHON & AI ENGINEERING
//     02 — GENERATIVE AI & LLMs
//     03 — COMPUTER VISION
//     04 — AI / DATA / RETRIEVAL
//     05 — AI SERVICES & INFERENCE
//     06 — DATA / VIZ / AUTOMATION
//     07 — DEVELOPMENT & ENGINEERING
// ============================================================================

export default function ToolkitInstallation({ onSelect, playerPositionRef, onNavigate }) {
	return (
		<ToolkitWorld
			playerPositionRef={playerPositionRef}
			onSelect={onSelect}
			onNavigate={onNavigate}
		/>
	)
}

