import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'

// A Y-axis billboard keeps text upright while continuously turning toward the
// camera. Rotation is computed directly from atan2(dx, dz) rather than via
// drei's Billboard lockX/lockZ (which zeroes Euler components pulled from the
// camera's full quaternion, and can flip/mirror the text at certain camera
// pitches) — atan2 on the flat ground-plane heading can never gimbal-flip.
function BillboardLabel({ children, minScale = 0.9, maxScale = 1.32, referenceDistance = 7, ...textProps }) {
	const groupRef = useRef()
	const worldPosition = useRef(new Vector3())
	const { camera } = useThree()

	useFrame(() => {
		if (!groupRef.current) return
		groupRef.current.getWorldPosition(worldPosition.current)
		const dx = camera.position.x - worldPosition.current.x
		const dz = camera.position.z - worldPosition.current.z
		groupRef.current.rotation.y = Math.atan2(dx, dz)
		const distance = camera.position.distanceTo(worldPosition.current)
		const scale = Math.max(minScale, Math.min(maxScale, distance / referenceDistance))
		groupRef.current.scale.setScalar(scale)
	})

	return <group ref={groupRef} userData={{ cameraIgnore: true }}>
		<Text {...textProps}>{children}</Text>
	</group>
}

export default BillboardLabel
