import SolveWorld from './solve/SolveWorld'

// ============================================================================
// THE SOLVE INSTALLATION (CHAPTER 03)
// Hosts the monumental rotunda observatory overlooking the mountain sunset:
// - Central Core: "ENGINEERING UNDER UNCERTAINTY"
// - Three Problem Chambers:
//     1. 01 — RETRIEVAL: Noise → Filter → Insight
//     2. 02 — PERCEPTION: Signal → Facial Landmarks & Skeletal Hands → Meaning
//     3. 03 — UNCERTAINTY: Failure → Adaptive Filaments → Resilient Hypercube
// ============================================================================

export default function SolveInstallation({ onSelect, playerPositionRef, onNavigate }) {
	return (
		<SolveWorld
			playerPositionRef={playerPositionRef}
			onSelect={onSelect}
			onNavigate={onNavigate}
		/>
	)
}

