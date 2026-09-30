import PersonWorld from './person/PersonWorld'

// ============================================================================
// THE PERSON INSTALLATION (CHAPTER 06 — THE PERSON)
// Sanctuary Terrace & Central Mature Tree based on media_1790761295168.jpg:
// - Central mature sculptural tree in circular architectural planter
// - 3-tier stepped amphitheater terrace with embedded warm LED cove lighting
// - Grand panoramic arch framing the golden mountain sunset & subtle skyline
// - Left profile wall with illuminated portrait, Sravanthi Addagada nameplate, & quote
// - Right structural wall with inscribed personal statement
// - Three interactive destination capsules: My Journey, What I Enjoy, Where I'm Headed
// ============================================================================

export default function PersonInstallation({ onSelect, playerPositionRef }) {
	return (
		<PersonWorld
			playerPositionRef={playerPositionRef}
			onSelect={onSelect}
		/>
	)
}
