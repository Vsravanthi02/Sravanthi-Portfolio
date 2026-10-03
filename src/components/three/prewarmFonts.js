import { preloadFont } from 'troika-three-text'

// High-frequency character set for all 3D architectural labels and stations
const PRELOAD_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?:;-_/\\()[]{}|@#$%^&*+=~` "’“”•→←—'

const FONTS_TO_PREWARM = [
	'/fonts/SegoeUI-Bold.ttf',
	'/fonts/DMMono-Medium.ttf',
	'/fonts/SegoeUI.ttf',
	'/fonts/MarckScript-Regular.ttf',
]

let isPrewarmed = false

export function prewarmTroikaFonts() {
	if (isPrewarmed || typeof window === 'undefined') return
	isPrewarmed = true

	FONTS_TO_PREWARM.forEach((font) => {
		try {
			preloadFont(
				{
					font,
					characters: PRELOAD_CHARS,
					sdfGlyphSize: 64,
				},
				() => {
					// Glyph SDF generated and cached in worker
				},
			)
		} catch (err) {
			console.warn('[prewarmTroikaFonts] Font preload notice:', font, err?.message)
		}
	})
}
