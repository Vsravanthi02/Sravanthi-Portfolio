import EngineerWorld from './engineer/EngineerWorld'

// ============================================================================
// THE ENGINEER INSTALLATION (CHAPTER 04)
// Hosts the monumental engineering hall and 6 professional stations:
// - Central Core: "ENGINEERING IN PRACTICE"
// - Six Professional Practice Stations:
//     1. 01 — UNDERSTAND (Requirements & Clarity)
//     2. 02 — COLLABORATE (People & Alignment)
//     3. 03 — DESIGN (System Architecture)
//     4. 04 — IMPLEMENT (Working Software)
//     5. 05 — REVIEW & TEST (Reliability & Quality)
//     6. 06 — DELIVER (Value & Outcomes)
// ============================================================================

export default function EngineerInstallation({ onSelect, playerPositionRef, onNavigate }) {
	return (
		<EngineerWorld
			playerPositionRef={playerPositionRef}
			onSelect={onSelect}
			onNavigate={onNavigate}
		/>
	)
}

