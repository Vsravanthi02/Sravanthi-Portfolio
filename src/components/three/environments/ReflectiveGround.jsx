import { useMemo } from 'react'
import * as THREE from 'three'
import { MeshReflectorMaterial } from '@react-three/drei'
import { getTravertineMaterials } from '../materials/travertineTexture'

// Cinematic architectural plaza with monumental stepped stone terraces.
// Realistic wet-stone courtyard reflections with subtle sheen (NO harsh streaks),
// integrated reflection pools, and restrained under-step warm LED illumination.
function ReflectiveGround({
	position = [0, 0, 0],
	width = 40,
	depth = 46,
	color = '#10141a',
	resolution = 1024,
	stoneColor = '#c8c0b2',
	metalColor = '#10141c',
	warmLight = '#ffa032',
	archZ = 9.5
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	// 6 monumental wide stone terrace steps leading up to the gateway
	const steps = [
		{ z: archZ - 5.0, y: 0.14, h: 0.14, d: 1.30, w: 20.0 },
		{ z: archZ - 3.8, y: 0.28, h: 0.28, d: 1.25, w: 19.2 },
		{ z: archZ - 2.6, y: 0.42, h: 0.42, d: 1.20, w: 18.4 },
		{ z: archZ - 1.5, y: 0.56, h: 0.56, d: 1.20, w: 17.6 },
		{ z: archZ - 0.5, y: 0.68, h: 0.68, d: 1.30, w: 17.0 },
		{ z: archZ + 0.6, y: 0.78, h: 0.78, d: 1.40, w: 16.2 },
	]

	const stoneMat = {
		color: stoneColor,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.024,
		roughness: 0.76,
		metalness: 0.02,
	}

	return (
		<group position={position}>

			{/* ── 1. MAIN WET HONED STONE PLAZA SLAB ── */}
			<mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[width, depth]} />
				<MeshReflectorMaterial
					resolution={resolution}
					mirror={0.05}
					mixBlur={3.8}
					mixStrength={0.18}
					blur={[80, 40]}
					depthScale={0.04}
					minDepthThreshold={0.80}
					color="#101520"
					map={travertine.plaza}
					metalness={0.05}
					roughness={0.52}
				/>
			</mesh>

			{/* ── 2. DUAL ARCHITECTURAL REFLECTION POOLS ── */}
			{[-5.6, 5.6].map((x) => (
				<group key={`pool-${x}`} position={[x, 0, 1.8]}>
					{/* Dark calm water surface */}
					<mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
						<planeGeometry args={[2.8, 4.8]} />
						<MeshReflectorMaterial
							resolution={512}
							mirror={0.45}
							mixBlur={2.5}
							mixStrength={0.55}
							blur={[120, 70]}
							depthScale={0.08}
							minDepthThreshold={0.88}
							color="#040810"
							metalness={0.25}
							roughness={0.12}
						/>
					</mesh>

					{/* Travertine stone coping border */}
					{[[0, 0.06, -2.56, 3.0, 0.10, 0.30], [0, 0.06, 2.56, 3.0, 0.10, 0.30], [-1.58, 0.06, 0, 0.30, 0.10, 5.16], [1.58, 0.06, 0, 0.30, 0.10, 5.16]].map(([px, py, pz, sx, sy, sz], i) => (
						<mesh key={`coping-${i}`} position={[px, py, pz]}>
							<boxGeometry args={[sx, sy, sz]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
						</mesh>
					))}

					{/* Under-coping subtle warm LED light reveal */}
					{[[0, 0.035, -2.40, 2.6, 0.02, 0.03], [0, 0.035, 2.40, 2.6, 0.02, 0.03], [-1.42, 0.035, 0, 0.03, 0.02, 4.7], [1.42, 0.035, 0, 0.03, 0.02, 4.7]].map(([px, py, pz, sx, sy, sz], i) => (
						<mesh key={`pool-light-${i}`} position={[px, py, pz]}>
							<boxGeometry args={[sx, sy, sz]} />
							<meshBasicMaterial color={warmLight} toneMapped={false} />
						</mesh>
					))}
				</group>
			))}

			{/* ── 3. SYMMETRICAL STONE BENCHES ── */}
			{[-8.5, 8.5].map((x) => (
				<group key={`bench-${x}`} position={[x, 0, 0.2]}>
					<mesh position={[-0.9, 0.17, 0]}>
						<boxGeometry args={[0.28, 0.34, 0.72]} />
						<meshStandardMaterial color={metalColor} roughness={0.82} metalness={0.20} />
					</mesh>
					<mesh position={[0.9, 0.17, 0]}>
						<boxGeometry args={[0.28, 0.34, 0.72]} />
						<meshStandardMaterial color={metalColor} roughness={0.82} metalness={0.20} />
					</mesh>
					<mesh position={[0, 0.38, 0]}>
						<boxGeometry args={[2.4, 0.13, 0.88]} />
						<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
					</mesh>
					{/* Under-bench soft warm wash */}
					<mesh position={[0, 0.28, 0]}>
						<boxGeometry args={[1.8, 0.02, 0.46]} />
						<meshBasicMaterial color={warmLight} transparent opacity={0.35} toneMapped={false} />
					</mesh>
				</group>
			))}

			{/* ── 4. MONUMENTAL STAIRCASE WITH RESTRAINED UNDER-STEP LEDS ── */}
			<group>
				{steps.map(({ z, y, h, d, w }, index) => (
					<group key={`step-${index}`}>
						{/* Travertine stone tread slab */}
						<mesh position={[0, y / 2, z]} receiveShadow={false}>
							<boxGeometry args={[w, h, d]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
						</mesh>
						{/* Subtle warm LED reveal tucked right under tread nosing */}
						<mesh position={[0, y - 0.015, z - d / 2 + 0.025]}>
							<boxGeometry args={[w - 0.4, 0.018, 0.025]} />
							<meshBasicMaterial color={warmLight} toneMapped={false} />
						</mesh>
					</group>
				))}
			</group>

			{/* ── 5. FLANKING TERRACE RETAINING WALLS & PLANTERS ── */}
			{[-1, 1].map((side) => {
				const xBase = side * 10.5
				return (
					<group key={`terrace-wall-${side}`} position={[xBase, 0, archZ - 2.5]}>
						{/* Main retaining wall */}
						<mesh position={[0, 0.55, 0]}>
							<boxGeometry args={[4.0, 1.10, 6.0]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
						</mesh>
						{/* Charcoal base */}
						<mesh position={[0, 0.07, 0]}>
							<boxGeometry args={[4.15, 0.14, 6.15]} />
							<meshStandardMaterial color={metalColor} roughness={0.85} metalness={0.20} />
						</mesh>
						{/* Top coping */}
						<mesh position={[0, 1.14, 0]}>
							<boxGeometry args={[4.16, 0.12, 6.16]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
						</mesh>
						{/* Under-coping warm LED cove */}
						<mesh position={[-side * 2.06, 1.06, 0]}>
							<boxGeometry args={[0.035, 0.02, 5.9]} />
							<meshBasicMaterial color={warmLight} toneMapped={false} />
						</mesh>
						{/* Planter soil */}
						<mesh position={[0, 1.17, 0]}>
							<boxGeometry args={[3.4, 0.05, 5.5]} />
							<meshStandardMaterial color="#120e0a" roughness={0.96} />
						</mesh>
						{/* Manicured shrubs */}
						{[-2.0, -1.0, 0, 1.0, 2.0].map((pz, idx) => (
							<mesh key={`shrub-${idx}`} position={[0, 1.38, pz]} scale={[0.60, 0.38, 0.60]}>
								<dodecahedronGeometry args={[0.60, 1]} />
								<meshStandardMaterial color={idx % 2 === 0 ? '#1e2c16' : '#26381c'} roughness={0.88} flatShading />
							</mesh>
						))}
					</group>
				)
			})}

			{/* ── 6. LOW PERIMETER PLAZA CURBS ── */}
			{[
				[[0, 0.04, -depth / 2 - 2], [width, 0.08, 0.3]],
				[[-width / 2, 0.04, -2], [0.3, 0.08, depth]],
				[[width / 2, 0.04, -2], [0.3, 0.08, depth]],
			].map(([pos, size], index) => (
				<mesh key={`curb-${index}`} position={pos}>
					<boxGeometry args={size} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
				</mesh>
			))}
		</group>
	)
}

export default ReflectiveGround
