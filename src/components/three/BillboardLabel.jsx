import { Billboard, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'

// A Y-axis billboard keeps text upright while continuously turning toward the camera.
// Unlike a full camera quaternion copy, it never inherits camera roll or pitch flips.
function BillboardLabel({ children, minScale = 0.9, maxScale = 1.32, referenceDistance = 7, ...textProps }) {
	const billboardRef = useRef()
	const worldPosition = useRef(new Vector3())
	const { camera } = useThree()

	useFrame(() => {
		if (!billboardRef.current) return
		billboardRef.current.getWorldPosition(worldPosition.current)
		const distance = camera.position.distanceTo(worldPosition.current)
		const scale = Math.max(minScale, Math.min(maxScale, distance / referenceDistance))
		billboardRef.current.scale.setScalar(scale)
	})

	return <Billboard ref={billboardRef} follow lockX lockZ userData={{ cameraIgnore: true }}>
		<Text {...textProps}>{children}</Text>
	</Billboard>
}

export default BillboardLabel
