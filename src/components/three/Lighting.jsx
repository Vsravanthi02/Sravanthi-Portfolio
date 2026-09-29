// Cinematic golden-hour lighting system.
// Matches primary visual benchmark media_1790162892176.jpg:
// - Directional golden-hour sunlight casting warm highlights on exposed limestone surfaces and steps
// - Cool blue-slate ambient fill in architectural recesses, producing natural depth and dimensional separation
// - Restrained, clean technological cyan accent on The Spark
const STAGE_MOODS = {
	home: {
		ambient: 0.36,
		ambientColor: '#1c2638',      // cool blue-slate ambient for dimensional contact shadow depth
		hemi: 0.44,
		hemiSky: '#364866',
		hemiGround: '#181816',        // neutral dark ground bounce
		key: 0.68,                    // calibrated key light — authentic travertine warmth without washout
		keyColor: '#fffbf2',          // clean daylight with subtle warm tint, not yellow
		keyPos: [5, 12, -9],          // angular golden-hour sunlight
		sunRim: 1.10,                 // sunset rim light streaming through horizon
		sunRimColor: '#ff8220',
		sunRimPos: [0, 5, 34],
		accent: '#38d6ff',
		accentIntensity: 0.16
	},
	projects: {
		ambient: 0.38,
		ambientColor: '#1c2638',
		hemi: 0.46,
		hemiSky: '#364866',
		hemiGround: '#181816',
		key: 0.72,
		keyColor: '#fffbf2',
		keyPos: [5, 12, 12],
		sunRim: 1.05,
		sunRimColor: '#ff8220',
		sunRimPos: [0, 5, 42],
		accent: '#35d8ff',
		accentIntensity: 0.22
	},
	solve: {
		ambient: 0.38,
		ambientColor: '#1c2638',
		hemi: 0.46,
		hemiSky: '#364866',
		hemiGround: '#181816',
		key: 0.72,
		keyColor: '#fffbf2',
		keyPos: [5, 12, 28],
		sunRim: 1.15,
		sunRimColor: '#ff8220',
		sunRimPos: [0, 5, 54],
		accent: '#ffb45c',
		accentIntensity: 0.22
	},
	experience: {
		ambient: 0.38,
		ambientColor: '#1c2638',
		hemi: 0.46,
		hemiSky: '#364866',
		hemiGround: '#181816',
		key: 0.74,
		keyColor: '#fffbf2',
		keyPos: [8, 12, 60],
		sunRim: 1.20,
		sunRimColor: '#ff8220',
		sunRimPos: [0, 5, 95],
		accent: '#ffb45c',
		accentIntensity: 0.24
	},
	skills: {
		ambient: 0.38,
		ambientColor: '#1c2638',
		hemi: 0.46,
		hemiSky: '#364866',
		hemiGround: '#181816',
		key: 0.74,
		keyColor: '#fffbf2',
		keyPos: [25, 12, 25],
		sunRim: 1.20,
		sunRimColor: '#ff8220',
		sunRimPos: [21.8, 5, 55],
		accent: '#00d2ff',
		accentIntensity: 0.25
	},
	about: { ambient: 0.55, hemi: 0.65, key: 1.7, keyColor: '#f2ead9', keyPos: [-4, 7, 3], accent: '#e6b073', accentIntensity: 7 },
	contact: { ambient: 0.75, hemi: 1.2, key: 2.4, keyColor: '#f2ead9', keyPos: [-4, 7, 3], accent: '#6ff0d0', accentIntensity: 9 },
}
const DEFAULT_MOOD = STAGE_MOODS.home

function Lighting({ stage }) {
	const mood = STAGE_MOODS[stage] || DEFAULT_MOOD
	return (
		<>
			<ambientLight intensity={mood.ambient} color={mood.ambientColor || '#455878'} />
			<hemisphereLight skyColor={mood.hemiSky || '#3b689a'} groundColor={mood.hemiGround || '#121824'} intensity={mood.hemi} />
			{/* Front key light illuminating architectural stone and steps */}
			<directionalLight
				position={mood.keyPos || [-4, 7, 3]}
				intensity={mood.key}
				color={mood.keyColor || '#f2ead9'}
			/>
			{/* Sunset rim light streaming from the horizon */}
			{mood.sunRim && (
				<directionalLight
					position={mood.sunRimPos}
					intensity={mood.sunRim}
					color={mood.sunRimColor}
				/>
			)}
			<pointLight position={[3, 3, 5]} intensity={mood.accentIntensity} distance={14} color={mood.accent} />
			<pointLight position={[-5, 2, 1]} intensity={mood.accentIntensity * 0.85} distance={12} color={mood.accent} />
		</>
	)
}

export default Lighting
