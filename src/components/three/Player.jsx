import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import ProceduralExplorer from './ProceduralExplorer'

// Torso and eye heights used by PlayerController for camera framing
export const PLAYER_TORSO_Y = 0.82
export const PLAYER_HEAD_OFFSET_Y = 0.55
export const PLAYER_EYE_HEIGHT = PLAYER_TORSO_Y + PLAYER_HEAD_OFFSET_Y

/**
 * Procedural stylized robot/explorer character directly rendered with Three.js primitives.
 * Zero external GLB assets, zero network fetches, fully lightweight.
 */
function Player({ position, rotationRef, motionRef, cameraModeRef, cameraBlendRef }) {
	const groupRef = useRef()
	const modelRootRef = useRef()

	useFrame(() => {
		if (!groupRef.current) return
		groupRef.current.position.set(...position)
		groupRef.current.rotation.y = rotationRef.current

		// In first-person mode, hide the character model so it doesn't obstruct view
		if (modelRootRef.current) {
			modelRootRef.current.visible = !((cameraModeRef?.current === 'FIRST_PERSON') && (cameraBlendRef?.current ?? 0) > 0.5)
		}
	})

	return (
		<group ref={groupRef} userData={{ cameraIgnore: true, isPlayer: true }}>
			<ProceduralExplorer motionRef={motionRef} rootRef={modelRootRef} />
		</group>
	)
}

export default Player
