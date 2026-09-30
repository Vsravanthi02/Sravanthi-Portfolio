import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// ============================================================================
// CENTRAL MATURE SANCTUARY TREE (CHAPTER 06 — THE PERSON)
// Emotional focal point based on media_1790761295168.jpg:
// - Circular architectural stone planter with recessed warm under-glow
// - Sculptural gnarled trunk and splaying root structure
// - Sprawling, layered canopy with warm golden rim/under-lighting
// - Lush groundcover, delicate shrubs, and subtle floating golden pollen
// ============================================================================

export default function PersonTree({ position = [0, 0, 0] }) {
	const pollenRef = useRef()
	const treeGroupRef = useRef()

	// Gentle ambient movement for floating golden pollen / fireflies
	const pollenCount = 28
	const pollenPositions = useMemo(() => {
		const pos = new Float32Array(pollenCount * 3)
		for (let i = 0; i < pollenCount; i++) {
			const angle = Math.random() * Math.PI * 2
			const radius = 0.8 + Math.random() * 3.4
			pos[i * 3 + 0] = Math.cos(angle) * radius
			pos[i * 3 + 1] = 1.4 + Math.random() * 3.6
			pos[i * 3 + 2] = Math.sin(angle) * radius
		}
		return pos
	}, [pollenCount])

	useFrame((state, delta) => {
		if (!pollenRef.current) return
		const attr = pollenRef.current.geometry.attributes.position
		const t = state.clock.elapsedTime
		for (let i = 0; i < pollenCount; i++) {
			let y = attr.getY(i) + Math.sin(t * 0.8 + i) * delta * 0.08
			if (y > 5.2) y = 1.4
			if (y < 1.4) y = 5.2
			attr.setY(i, y)
			attr.setX(i, attr.getX(i) + Math.cos(t * 0.5 + i * 1.5) * delta * 0.04)
		}
		attr.needsUpdate = true
	})

	// Pre-generate branching canopy clusters
	const foliageClusters = useMemo(() => {
		const clusters = [
			// Central crown
			{ pos: [0, 4.3, 0], scale: [2.6, 1.2, 2.4], rot: [0.05, 0.2, -0.05] },
			{ pos: [0.2, 4.8, -0.1], scale: [2.1, 0.9, 1.9], rot: [-0.04, 0.5, 0.08] },
			// Left primary bough
			{ pos: [-1.6, 3.8, 0.4], scale: [2.2, 1.0, 1.8], rot: [0.12, 0.4, 0.18] },
			{ pos: [-2.6, 3.4, 0.2], scale: [1.8, 0.8, 1.5], rot: [0.08, 0.1, 0.24] },
			{ pos: [-3.3, 3.1, -0.2], scale: [1.3, 0.6, 1.2], rot: [0.15, -0.2, 0.1] },
			// Right primary bough
			{ pos: [1.7, 3.9, -0.3], scale: [2.3, 1.0, 1.9], rot: [-0.1, -0.3, -0.15] },
			{ pos: [2.7, 3.5, -0.1], scale: [1.9, 0.8, 1.6], rot: [-0.08, 0.2, -0.22] },
			{ pos: [3.4, 3.2, 0.3], scale: [1.4, 0.6, 1.3], rot: [-0.14, 0.3, -0.12] },
			// Front-facing lush tiers
			{ pos: [-0.8, 3.2, 1.1], scale: [1.7, 0.7, 1.5], rot: [0.18, 0.1, 0.05] },
			{ pos: [0.9, 3.3, 1.0], scale: [1.8, 0.7, 1.5], rot: [0.16, -0.2, -0.05] },
			{ pos: [0.0, 3.6, 1.3], scale: [1.6, 0.7, 1.4], rot: [0.22, 0.0, 0.02] },
			// Rear sunset backdrop clusters
			{ pos: [-0.9, 3.9, -1.2], scale: [1.9, 0.8, 1.6], rot: [-0.15, 0.3, 0.08] },
			{ pos: [1.0, 4.0, -1.1], scale: [2.0, 0.8, 1.7], rot: [-0.12, -0.4, -0.08] },
			{ pos: [0.0, 4.4, -1.3], scale: [1.7, 0.8, 1.5], rot: [-0.2, 0.0, 0.0] },
		]
		return clusters
	}, [])

	// Splaying root structures
	const roots = useMemo(() => {
		const r = []
		for (let i = 0; i < 7; i++) {
			const angle = (i / 7) * Math.PI * 2 + 0.15
			const len = 1.1 + (i % 3) * 0.25
			r.push({
				x: Math.cos(angle) * 0.75,
				z: Math.sin(angle) * 0.75,
				angle,
				len,
			})
		}
		return r
	}, [])

	// Subtle flowering groundcover bushes around planter rim
	const shrubs = useMemo(() => {
		const s = []
		const count = 16
		for (let i = 0; i < count; i++) {
			const angle = (i / count) * Math.PI * 2
			const radius = 1.85 + (i % 2) * 0.15
			s.push({
				x: Math.cos(angle) * radius,
				z: Math.sin(angle) * radius,
				scale: [0.35 + (i % 3) * 0.08, 0.22 + (i % 2) * 0.05, 0.35 + (i % 3) * 0.08],
				angle,
			})
		}
		return s
	}, [])

	return (
		<group ref={treeGroupRef} position={position}>
			{/* ── 1. CIRCULAR ARCHITECTURAL PLANTER ── */}
			{/* Outer Low Plinth (Y = 0.12, Radius = 2.4m) */}
			<mesh position={[0, 0.12, 0]} receiveShadow>
				<cylinderGeometry args={[2.35, 2.45, 0.24, 48]} />
				<meshStandardMaterial color="#161c24" roughness={0.78} metalness={0.15} />
			</mesh>

			{/* Continuous Warm Amber LED Cove Light under Planter Rim */}
			<mesh position={[0, 0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.28, 2.36, 48]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* Upper Stepped Planter Coping (Y = 0.38, Radius = 2.25m) */}
			<mesh position={[0, 0.38, 0]} receiveShadow>
				<cylinderGeometry args={[2.15, 2.28, 0.28, 48]} />
				<meshStandardMaterial color="#202834" roughness={0.72} metalness={0.18} />
			</mesh>

			{/* Inset Travertine Lip */}
			<mesh position={[0, 0.53, 0]} receiveShadow>
				<cylinderGeometry args={[2.08, 2.16, 0.04, 48]} />
				<meshStandardMaterial color="#a89f91" roughness={0.65} metalness={0.05} />
			</mesh>

			{/* Inner Soil Bed (Y = 0.52, Radius = 2.05m) */}
			<mesh position={[0, 0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<circleGeometry args={[2.05, 36]} />
				<meshStandardMaterial color="#111816" roughness={0.92} metalness={0.02} />
			</mesh>

			{/* ── 2. PERIMETER SHRUBS & SUCCULENTS ── */}
			<group position={[0, 0.55, 0]}>
				{shrubs.map((shrub, idx) => (
					<mesh key={idx} position={[shrub.x, 0.10, shrub.z]} scale={shrub.scale}>
						<sphereGeometry args={[1, 12, 8]} />
						<meshStandardMaterial
							color={idx % 4 === 0 ? '#384d38' : idx % 4 === 1 ? '#2b402e' : '#455c42'}
							roughness={0.82}
							metalness={0.04}
						/>
					</mesh>
				))}
			</group>

			{/* ── 3. SCULPTURAL GNARLED TREE TRUNK & ROOTS ── */}
			{/* Buttress Roots */}
			{roots.map((root, idx) => (
				<group key={idx} position={[root.x, 0.52, root.z]} rotation={[0, root.angle, 0]}>
					<mesh position={[0, 0.12, 0]} rotation={[0, 0, -0.45]}>
						<cylinderGeometry args={[0.08, 0.22, root.len, 10]} />
						<meshStandardMaterial color="#241a13" roughness={0.88} metalness={0.05} />
					</mesh>
				</group>
			))}

			{/* Massive Base Trunk */}
			<mesh position={[0, 1.25, 0]}>
				<cylinderGeometry args={[0.55, 0.88, 1.5, 18]} />
				<meshStandardMaterial color="#221812" roughness={0.86} metalness={0.05} />
			</mesh>

			{/* Mid Trunk Twist */}
			<mesh position={[0.06, 2.25, -0.04]} rotation={[0.08, 0.4, -0.06]}>
				<cylinderGeometry args={[0.42, 0.56, 1.1, 16]} />
				<meshStandardMaterial color="#241a13" roughness={0.86} metalness={0.05} />
			</mesh>

			{/* Major Branching Junctions */}
			{/* Left Bough */}
			<mesh position={[-0.8, 3.0, 0.15]} rotation={[0.1, 0.2, 0.65]}>
				<cylinderGeometry args={[0.22, 0.38, 1.9, 12]} />
				<meshStandardMaterial color="#221812" roughness={0.86} metalness={0.05} />
			</mesh>
			<mesh position={[-1.8, 3.4, 0.25]} rotation={[0.15, 0.3, 0.85]}>
				<cylinderGeometry args={[0.12, 0.24, 1.7, 10]} />
				<meshStandardMaterial color="#221812" roughness={0.86} metalness={0.05} />
			</mesh>

			{/* Right Bough */}
			<mesh position={[0.8, 3.1, -0.15]} rotation={[-0.1, -0.2, -0.62]}>
				<cylinderGeometry args={[0.22, 0.38, 1.9, 12]} />
				<meshStandardMaterial color="#221812" roughness={0.86} metalness={0.05} />
			</mesh>
			<mesh position={[1.8, 3.5, -0.2]} rotation={[-0.12, 0.1, -0.82]}>
				<cylinderGeometry args={[0.12, 0.24, 1.7, 10]} />
				<meshStandardMaterial color="#221812" roughness={0.86} metalness={0.05} />
			</mesh>

			{/* Central Upright Bough */}
			<mesh position={[0.05, 3.5, 0.05]} rotation={[0.12, 0.5, 0.05]}>
				<cylinderGeometry args={[0.24, 0.40, 1.8, 12]} />
				<meshStandardMaterial color="#221812" roughness={0.86} metalness={0.05} />
			</mesh>

			{/* ── 4. LUSH SPRAWLING CANOPY FOLIAGE ── */}
			{foliageClusters.map((cluster, idx) => (
				<group key={idx} position={cluster.pos} rotation={cluster.rot} scale={cluster.scale}>
					{/* Dense Lush Leaf Clump Core */}
					<mesh receiveShadow>
						<sphereGeometry args={[0.95, 14, 10]} />
						<meshStandardMaterial
							color={idx % 4 === 0 ? '#1b3218' : idx % 4 === 1 ? '#223d1e' : idx % 4 === 2 ? '#2a4a25' : '#1e381b'}
							roughness={0.82}
							metalness={0.02}
						/>
					</mesh>
					{/* Golden Sunset Rim Catching Mesh */}
					<mesh position={[0, 0.03, -0.05]} scale={[1.01, 1.01, 1.01]}>
						<sphereGeometry args={[0.94, 12, 8]} />
						<meshStandardMaterial
							color="#d49a38"
							roughness={0.55}
							metalness={0.12}
							transparent
							opacity={0.20}
						/>
					</mesh>
				</group>
			))}

			{/* ── 5. WARM DEDICATED TREE ILLUMINATION ── */}
			{/* Upward Golden Wash onto Trunk & Lower Canopy */}
			<pointLight position={[0, 1.4, 0.8]} color="#ff9e3b" intensity={2.0} distance={6.0} decay={2} />
			<pointLight position={[0, 2.6, -0.6]} color="#ffaa44" intensity={2.4} distance={6.5} decay={2} />

			{/* Ambient Canopy Warmth */}
			<pointLight position={[0, 4.5, 0]} color="#ffba55" intensity={1.8} distance={8.0} decay={2} />

			{/* ── 6. FLOATING GOLDEN POLLEN / FIREFLIES ── */}
			<points ref={pollenRef}>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" count={pollenCount} array={pollenPositions} itemSize={3} />
				</bufferGeometry>
				<pointsMaterial
					color="#ffda88"
					size={0.045}
					transparent
					opacity={0.75}
					sizeAttenuation
					toneMapped={false}
				/>
			</points>
		</group>
	)
}
