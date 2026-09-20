import { useMemo } from 'react'
import { MeshReflectorMaterial } from '@react-three/drei'

// A large rectangular stone plaza — deliberately NOT a circular disc with
// concentric rings or radial spokes. Large slab seams, a shallow reflective
// water channel down the centerline, and a low perimeter curb are what
// actually reads as "designed public space" rather than "one flat surface" —
// all still perfectly flat (y stays ~0) since PlayerController has no
// ground-height sampling; the detail is material/inlay, not real elevation.
function ReflectiveGround({ position = [0, 0, 0], width = 26, depth = 22, color = '#0c1830', mirror = 0.28, resolution = 1024, slabSize = 3.4, seamColor = '#08111f' }) {
	const seams = useMemo(() => {
		const lines = []
		for (let x = -width / 2 + slabSize; x < width / 2; x += slabSize) lines.push({ axis: 'x', offset: x })
		for (let z = -depth / 2 + slabSize; z < depth / 2; z += slabSize) lines.push({ axis: 'z', offset: z })
		return lines
	}, [width, depth, slabSize])

	return (
		<group position={position}>
			<mesh rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[width, depth]} />
				<MeshReflectorMaterial
					resolution={resolution}
					mirror={mirror}
					mixBlur={7}
					mixStrength={0.55}
					blur={[220, 100]}
					depthScale={0.18}
					minDepthThreshold={0.8}
					color={color}
					metalness={0.35}
					roughness={0.65}
				/>
			</mesh>

			{/* A shallow, brighter reflective water channel down the centerline —
			    a second material reads as a genuine design feature, not just a
			    seam line. */}
			<mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[2, depth * 0.92]} />
				<MeshReflectorMaterial
					resolution={resolution}
					mirror={0.4}
					mixBlur={6}
					mixStrength={0.5}
					blur={[160, 70]}
					depthScale={0.15}
					minDepthThreshold={0.85}
					color="#0a1830"
					metalness={0.3}
					roughness={0.4}
				/>
			</mesh>
			<mesh position={[-1.02, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.02, depth * 0.92]} /><meshBasicMaterial color="#ffb45e" transparent opacity={0.22} /></mesh>
			<mesh position={[1.02, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.02, depth * 0.92]} /><meshBasicMaterial color="#ffb45e" transparent opacity={0.22} /></mesh>

			{seams.map(({ axis, offset }, index) => (
				<mesh
					key={index}
					position={axis === 'x' ? [offset, 0.006, 0] : [0, 0.006, offset]}
					rotation={[-Math.PI / 2, 0, 0]}
				>
					<planeGeometry args={axis === 'x' ? [0.025, depth] : [width, 0.025]} />
					<meshBasicMaterial color={seamColor} transparent opacity={0.55} />
				</mesh>
			))}

			{/* Low perimeter curb — a real edge the eye can read, rather than the
			    plaza simply stopping in mid-air. */}
			{[
				[[0, 0.04, -depth / 2], [width, 0.09, 0.3]],
				[[0, 0.04, depth / 2], [width, 0.09, 0.3]],
				[[-width / 2, 0.04, 0], [0.3, 0.09, depth]],
				[[width / 2, 0.04, 0], [0.3, 0.09, depth]],
			].map(([pos, size], index) => (
				<mesh key={index} position={pos}>
					<boxGeometry args={size} />
					<meshStandardMaterial color="#0a1526" roughness={0.8} />
				</mesh>
			))}
		</group>
	)
}

export default ReflectiveGround
