// One mood per stage — lighting carries the story instead of one static rig.
// Kept deliberately restrained (no per-stage neon): each preset just shifts
// intensity/color/contrast of the same light types.
const STAGE_MOODS = {
	// home: rebalanced for HDRI co-illumination (environmentIntensity 0.85 in SparkInstallation).
	// Ambient/hemi reduced: HDRI handles environmental fill. Key kept for hard shadow definition.
	// Cyan accent halved: HDRI warm-gold is now the dominant color relationship, not neon.
	home: { ambient: 0.28, hemi: 0.32, key: 1.8, keyColor: '#ffcf94', accent: '#69e7ff', accentIntensity: 1.0 },
	projects: { ambient: 0.6, hemi: 1.05, key: 2.2, accent: '#8feaff', accentIntensity: 11 },
	experience: { ambient: 0.55, hemi: 0.95, key: 2.0, accent: '#5fb8d6', accentIntensity: 9 },
	skills: { ambient: 0.65, hemi: 1.0, key: 1.9, accent: '#70b9ff', accentIntensity: 8 },
	about: { ambient: 0.55, hemi: 0.65, key: 1.7, accent: '#e6b073', accentIntensity: 7 },
	contact: { ambient: 0.75, hemi: 1.2, key: 2.4, accent: '#6ff0d0', accentIntensity: 9 },
}
const DEFAULT_MOOD = STAGE_MOODS.home

function Lighting({ stage }) {
	const mood = STAGE_MOODS[stage] || DEFAULT_MOOD
	return (
		<>
			<ambientLight intensity={mood.ambient} color="#7892b5" />
			<hemisphereLight skyColor="#3e79a8" groundColor="#11182b" intensity={mood.hemi} />
			<directionalLight position={[-4, 7, 3]} intensity={mood.key} color={mood.keyColor || '#f2ead9'} castShadow shadow-mapSize={[1024, 1024]} />
			<pointLight position={[3, 3, 5]} intensity={mood.accentIntensity} distance={14} color={mood.accent} />
			<pointLight position={[-5, 2, 1]} intensity={mood.accentIntensity * 0.85} distance={12} color={mood.accent} />
		</>
	)
}

export default Lighting
