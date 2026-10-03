import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// ============================================================================
// CHAPTER LIGHT RIG (STABLE SHADER LIGHT COUNT ARCHITECTURE)
//
// Eliminates Three.js dynamic shader permutation recompilation:
// - Maintains exactly 16 PointLight instances permanently in the scene graph.
// - All 16 lights remain visible=true at all times, ensuring Three.js WebGLLights
//   consistently reports NUM_POINT_LIGHTS = 19 (16 rig + 2 global + 1 player).
// - As the player travels or changes chapters, the rig updates positions, colors,
//   and intensities to match the active chapter's lighting design.
// - Unused slots are safely zeroed out in intensity without changing light counts.
// ============================================================================

export const CHAPTER_LIGHT_DEFINITIONS = {
	home: [
		{ position: [2.8, 1.0, 5.7], color: '#ffaa48', intensity: 0.44, distance: 6.0, decay: 2 },
		{ position: [-3.12, 4.8, 10.34], color: '#ffaa48', intensity: 0.52, distance: 7.0, decay: 2 },
		{ position: [3.12, 4.8, 10.34], color: '#ffaa48', intensity: 0.52, distance: 7.0, decay: 2 },
		{ position: [5.5, -1.4, 7.7], color: '#ffaa48', intensity: 0.52, distance: 9.0, decay: 2 },
		{ position: [0, 0.85, 5.0], color: '#35d8ff', intensity: 0.52, distance: 5.4, decay: 2 },
		{ position: [0, 0.70, 5.0], color: '#ffb45c', intensity: 0.20, distance: 2.6, decay: 2 }
	],
	projects: [
		{ position: [0, 1.8, 20.0], color: '#35d8ff', intensity: 1.2, distance: 4.8, decay: 2 },
		{ position: [0, 1.8, 21.0], color: '#ffb45c', intensity: 0.45, distance: 4.8, decay: 2 },
		{ position: [8.2, 1.2, 20.0], color: '#ffaa48', intensity: 0.9, distance: 12.0, decay: 2 },
		{ position: [-8.2, 1.2, 20.0], color: '#ffaa48', intensity: 0.9, distance: 12.0, decay: 2 },
		{ position: [0, 1.8, 22.0], color: '#35d8ff', intensity: 0.45, distance: 4.8, decay: 2 }
	],
	solve: [
		{ position: [0, 0.8, 38.0], color: '#35d8ff', intensity: 0.65, distance: 5.5, decay: 2 },
		{ position: [0, 3.6, 45.0], color: '#ffb45c', intensity: 1.1, distance: 15.0, decay: 2 },
		{ position: [-7.5, 3.6, 35.0], color: '#ffb45c', intensity: 1.0, distance: 14.0, decay: 2 },
		{ position: [7.5, 3.6, 35.0], color: '#ffb45c', intensity: 1.0, distance: 14.0, decay: 2 },
		{ position: [0.1, 1.8, 37.0], color: '#35d8ff', intensity: 0.9, distance: 3.8, decay: 2 },
		{ position: [0, 1.8, 37.0], color: '#ffb45c', intensity: 1.1, distance: 4.0, decay: 2 },
		{ position: [0, 2.0, 37.8], color: '#35d8ff', intensity: 0.45, distance: 5.0, decay: 2 },
		{ position: [0, 2.0, 39.0], color: '#35d8ff', intensity: 0.45, distance: 5.0, decay: 2 },
		{ position: [0, 2.0, 38.0], color: '#ffb45c', intensity: 0.45, distance: 5.0, decay: 2 }
	],
	experience: [
		{ position: [0, 0.9, 72.0], color: '#35d8ff', intensity: 2.2, distance: 8.0, decay: 2 },
		{ position: [0, 0.9, 72.0], color: '#ffb45c', intensity: 1.8, distance: 6.5, decay: 2 },
		{ position: [-7.5, 3.6, 74.0], color: '#ffb45c', intensity: 1.1, distance: 15.0, decay: 2 },
		{ position: [7.5, 3.6, 74.0], color: '#ffb45c', intensity: 1.1, distance: 15.0, decay: 2 },
		{ position: [3.90, 0.9, 75.30], color: '#4eaed4', intensity: 0.28, distance: 2.0, decay: 2 },
		{ position: [-3.90, 0.9, 75.35], color: '#ffb45c', intensity: 0.95, distance: 2.6, decay: 2 },
		{ position: [-3.90, 0.35, 75.52], color: '#ffd699', intensity: 0.30, distance: 1.8, decay: 2 },
		{ position: [6.10, 0.9, 74.05], color: '#35d8ff', intensity: 0.95, distance: 2.6, decay: 2 },
		{ position: [6.10, 0.35, 74.22], color: '#ffd699', intensity: 0.30, distance: 1.8, decay: 2 },
		{ position: [-6.10, 0.9, 74.05], color: '#a993ff', intensity: 0.95, distance: 2.6, decay: 2 },
		{ position: [-6.10, 0.35, 74.22], color: '#ffd699', intensity: 0.30, distance: 1.8, decay: 2 },
		{ position: [8.20, 0.9, 72.35], color: '#5fe2ff', intensity: 0.95, distance: 2.6, decay: 2 },
		{ position: [8.20, 0.35, 72.52], color: '#ffd699', intensity: 0.30, distance: 1.8, decay: 2 },
		{ position: [-8.20, 0.9, 72.35], color: '#ffb45c', intensity: 0.95, distance: 2.6, decay: 2 },
		{ position: [-8.20, 0.35, 72.52], color: '#ffd699', intensity: 0.30, distance: 1.8, decay: 2 }
	],
	skills: [
		{ position: [21.8, 0.9, 33.1], color: '#00d2ff', intensity: 3.4, distance: 5.0, decay: 2 },
		{ position: [21.8, 0.25, 33.1], color: '#ffb45c', intensity: 1.8, distance: 3.5, decay: 2 },
		{ position: [27.05, 1.2, 30.7], color: '#00d2ff', intensity: 1.4, distance: 3.8, decay: 2 },
		{ position: [25.65, 1.2, 37.1], color: '#ffb45c', intensity: 1.4, distance: 3.8, decay: 2 },
		{ position: [23.00, 1.2, 40.1], color: '#4eaed4', intensity: 1.4, distance: 3.8, decay: 2 },
		{ position: [20.60, 1.2, 40.1], color: '#a993ff', intensity: 1.4, distance: 3.8, decay: 2 },
		{ position: [17.95, 1.2, 37.1], color: '#5fe2ff', intensity: 1.4, distance: 3.8, decay: 2 },
		{ position: [16.55, 1.2, 30.7], color: '#35d8ff', intensity: 1.4, distance: 3.8, decay: 2 }
	],
	about: [
		{ position: [35.3, 1.2, 28.9], color: '#ffaa44', intensity: 1.5, distance: 7.5, decay: 2 },
		{ position: [30.8, 0.8, 30.5], color: '#ff9933', intensity: 1.1, distance: 6.0, decay: 2 },
		{ position: [39.8, 0.8, 30.5], color: '#ff9933', intensity: 1.1, distance: 6.0, decay: 2 },
		{ position: [35.3, 1.4, 30.3], color: '#ff9e3b', intensity: 2.0, distance: 6.0, decay: 2 },
		{ position: [35.3, 2.6, 28.9], color: '#ffaa44', intensity: 2.4, distance: 6.5, decay: 2 },
		{ position: [35.3, 4.5, 29.5], color: '#ffba55', intensity: 1.8, distance: 8.0, decay: 2 },
		{ position: [35.3, 5.0, 30.1], color: '#a8ddff', intensity: 1.4, distance: 4.5, decay: 2 },
		{ position: [35.3, 4.8, 30.1], color: '#ffb45c', intensity: 1.5, distance: 4.5, decay: 2 },
		{ position: [35.3, 0.2, 29.75], color: '#c084fc', intensity: 0.6, distance: 2.0, decay: 2 }
	],
	contact: [
		{ position: [45.6, 0.5, 17.2], color: '#00d2ff', intensity: 2.2, distance: 3.5, decay: 2 },
		{ position: [45.6, 1.3, 17.2], color: '#a855f7', intensity: 1.2, distance: 3.0, decay: 2 },
		{ position: [45.6, 0.25, 17.2], color: '#ffaa44', intensity: 0.9, distance: 2.2, decay: 2 },
		{ position: [45.6, 0.15, 17.4], color: '#ffaa44', intensity: 0.6, distance: 1.8, decay: 2 },
		{ position: [45.6, 1.0, 16.0], color: '#ffaa44', intensity: 0.9, distance: 2.8, decay: 2 },
		{ position: [45.6, 1.0, 18.0], color: '#ffaa44', intensity: 0.9, distance: 2.8, decay: 2 },
		{ position: [45.6, 2.0, 17.2], color: '#ffaa55', intensity: 2.8, distance: 20, decay: 1.8 },
		{ position: [45.6, 2.85, 18.0], color: '#00d2ff', intensity: 0.8, distance: 4.5, decay: 2 },
		{ position: [45.6, 4.8, 17.8], color: '#a78bfa', intensity: 1.2, distance: 4.0, decay: 2 },
		{ position: [45.6, 4.2, 17.8], color: '#ffb45c', intensity: 1.1, distance: 4.0, decay: 2 }
	]
}

const RIG_SIZE = 16
const ZERO_POS = [0, -200, 0]

const STAGE_CENTERS = {
	home: [0, 5],
	projects: [0, 21],
	solve: [0, 38],
	experience: [0, 72],
	skills: [21.8, 33.1],
	about: [35.3, 29.5],
	contact: [45.6, 17.2]
}

export default function ChapterLightRig({ activeDestination = 'home', playerPositionRef }) {
	const lightRefs = useRef([])
	const activeStageRef = useRef(activeDestination)

	useFrame(() => {
		// Determine nearest chapter if player is moving
		let targetStage = activeDestination || 'home'
		if (playerPositionRef?.current) {
			const px = playerPositionRef.current[0]
			const pz = playerPositionRef.current[2]
			let minDist = Infinity
			for (const [sId, coords] of Object.entries(STAGE_CENTERS)) {
				const d = Math.hypot(px - coords[0], pz - coords[1])
				if (d < minDist) {
					minDist = d
					targetStage = sId
				}
			}
		}

		const defs = CHAPTER_LIGHT_DEFINITIONS[targetStage] || CHAPTER_LIGHT_DEFINITIONS.home
		const defCount = defs.length

		for (let i = 0; i < RIG_SIZE; i++) {
			const light = lightRefs.current[i]
			if (!light) continue

			if (i < defCount) {
				const def = defs[i]
				light.position.set(def.position[0], def.position[1], def.position[2])
				light.color.set(def.color)
				light.intensity = def.intensity
				light.distance = def.distance
				light.decay = def.decay || 2
			} else {
				// Zero out unused slots without toggling visible flag
				light.position.set(ZERO_POS[0], ZERO_POS[1], ZERO_POS[2])
				light.intensity = 0
			}
		}
	})

	return (
		<group name="chapter-light-rig">
			{Array.from({ length: RIG_SIZE }).map((_, idx) => (
				<pointLight
					key={idx}
					ref={(el) => (lightRefs.current[idx] = el)}
					position={[0, -200, 0]}
					intensity={0}
					distance={10}
					decay={2}
				/>
			))}
		</group>
	)
}
