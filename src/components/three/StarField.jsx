import { useMemo } from 'react'

function StarField({ count = 360 }) {
	const positions = useMemo(() => {
		const values = new Float32Array(count * 3)
		for (let index = 0; index < count; index += 1) {
			const radius = 7 + Math.random() * 10
			const theta = Math.random() * Math.PI * 2
			const phi = Math.acos(2 * Math.random() - 1)
			values[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
			values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
			values[index * 3 + 2] = radius * Math.cos(phi)
		}
		return values
	}, [count])

	return (
		<points>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
			</bufferGeometry>
			<pointsMaterial color="#a6c9ed" size={0.018} sizeAttenuation transparent opacity={0.7} />
		</points>
	)
}

export default StarField
