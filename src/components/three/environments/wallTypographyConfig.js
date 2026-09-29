// ============================================================================
// ARCHITECTURAL WALL TYPOGRAPHY SYSTEM
// Unified handwritten architectural script system for 3D sanctuary inscriptions.
// Completely isolated from website/UI fonts.
// ============================================================================

export const WALL_FONT = '/fonts/MarckScript-Regular.ttf'

export const WALL_TYPOGRAPHY = {
	quote: {
		font: WALL_FONT,
		color: '#38332E',       // Muted warm architectural ink / engraved charcoal tone
		roughness: 0.82,
		outlineWidth: 0.007,    // Increased font stroke thickness for rich architectural legibility
		outlineColor: '#38332E',
		strokeWidth: 0.005,
		strokeColor: '#38332E',
		line1: {
			fontSize: 0.42,     // Substantial, expressive first line
			letterSpacing: 0.03,
		},
		line2: {
			fontSize: 0.36,     // Harmonious, balanced second line
			letterSpacing: 0.03,
		},
	},
	wayfinding: {
		font: WALL_FONT,        // Same handwritten architectural font as left wall
		fontSize: 0.30,         // Fluid, elegant handwriting scale matching left wall
		letterSpacing: 0.03,
		lineHeight: 1.55,
		color: '#38332E',       // Same dark architectural charcoal ink tone
		outlineWidth: 0.006,    // Same stroke thickness as left wall
		outlineColor: '#38332E',
		strokeWidth: 0.004,
		strokeColor: '#38332E',
		roughness: 0.82,
	},
	discovery: {
		font: WALL_FONT,        // Same handwritten architectural script
		fontSize: 0.16,         // Legible discovery inscription scale
		letterSpacing: 0.03,
		color: '#38332E',       // Same dark architectural charcoal ink tone
		outlineWidth: 0.005,    // Same stroke thickness as left wall
		outlineColor: '#38332E',
		strokeWidth: 0.003,
		strokeColor: '#38332E',
		roughness: 0.82,
	},
}
