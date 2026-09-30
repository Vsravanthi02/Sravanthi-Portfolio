import NextWorld from './next/NextWorld'

// ============================================================================
// CHAPTER 07 — WHAT'S NEXT INSTALLATION
// Observatory Terrace based on media_1790773457536.jpg:
// - Central elevated dais with luminous rotating world globe & floating hologram tiles
// - Monumental arch framing golden sunset, mountains, water, and skyline
// - Left architectural wall: 07 WHAT'S NEXT & forward-looking statement
// - Right architectural info board: career aspiration, 3 cards, action buttons
// - Right decorative wall: understated vertical typography
// ============================================================================

export default function NextInstallation({ onSelect, playerPositionRef }) {
	return (
		<NextWorld
			playerPositionRef={playerPositionRef}
			onSelect={onSelect}
		/>
	)
}
