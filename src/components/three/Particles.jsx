import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Particles({ count = 80, reducedMotion = false }) {
	const pointsRef = useRef()
	const positions = useMemo(() => {
		const values = new Float32Array(count * 3)
		for (let index = 0; index < count; index += 1) {
			const angle = (index / count) * Math.PI * 2
			const radius = 1.9 + Math.random() * 1.6
			values[index * 3] = Math.cos(angle) * radius
			values[index * 3 + 1] = (Math.random() - 0.5) * 2.8
			values[index * 3 + 2] = Math.sin(angle) * radius
		}
		return values
	}, [count])

	useFrame((_, delta) => {
		if (!pointsRef.current || reducedMotion) return
		pointsRef.current.rotation.y += delta * 0.035
		pointsRef.current.rotation.x += delta * 0.01
	})

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
			</bufferGeometry>
			<pointsMaterial color="#6bd9ff" size={0.025} transparent opacity={0.72} sizeAttenuation />
		</points>
	)
}

export default Particles
