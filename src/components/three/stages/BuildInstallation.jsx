import BuildWorld from './build/BuildWorld'

// ============================================================================
// THE BUILD INSTALLATION (CHAPTER 02)
// Hosts the monumental colonnade promenade and the two approved engineering
// systems:
// 1. ARCHIVA (Agentic RAG / Knowledge Systems)
// 2. EXPRESSION & SIGN LANGUAGE DETECTION (Computer Vision / Human Perception)
// Replaces the legacy box-node mockups with the approved architectural world.
// ============================================================================

function BuildInstallation({ onSelect, playerPositionRef, onNavigate }) {
	return (
		<BuildWorld
			playerPositionRef={playerPositionRef}
			onSelect={onSelect}
			onNavigate={onNavigate}
		/>
	)
}

export default BuildInstallation
