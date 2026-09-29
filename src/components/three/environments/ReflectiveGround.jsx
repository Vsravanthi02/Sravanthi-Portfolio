import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getTravertineMaterials } from '../materials/travertineTexture'

// ============================================================================
// CINEMATIC FUTURISTIC AI SANCTUARY — PLAZA, SUNKEN BASINS & TERRACES
// - Large-format honed stone pavers with dark joints (NO graphic overlay lines)
// - Sunken architectural reflection basins with real-time subtle water shimmer
// - Floating cantilevered stone benches with concealed warm under-wash
// - Monumental terraced steps leading to the spatial portal bridge
// ============================================================================

function SunkenWaterBasin({ position, size = [3.2, 5.8], warmLight }) {
	const waterRef = useRef()
	const [w, d] = size

	useFrame((state) => {
		if (waterRef.current) {
			const t = state.clock.elapsedTime
			waterRef.current.position.y = 0.024 + Math.sin(t * 1.6 + position[0]) * 0.002
		}
	})

	return (
		<group position={position}>
			{/* Water surface with realistic reflection */}
			<mesh ref={waterRef} position={[0, 0.024, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[w, d]} />
				<meshStandardMaterial
					color="#030812"
					metalness={0.88}
					roughness={0.08}
				/>
			</mesh>

			{/* Sunken stone basin coping */}
			<mesh position={[0, 0.05, -d / 2 - 0.16]}>
				<boxGeometry args={[w + 0.64, 0.08, 0.32]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.74} metalness={0.02} />
			</mesh>
			<mesh position={[0, 0.05, d / 2 + 0.16]}>
				<boxGeometry args={[w + 0.64, 0.08, 0.32]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.74} metalness={0.02} />
			</mesh>
			<mesh position={[-w / 2 - 0.16, 0.05, 0]}>
				<boxGeometry args={[0.32, 0.08, d + 0.64]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.74} metalness={0.02} />
			</mesh>
			<mesh position={[w / 2 + 0.16, 0.05, 0]}>
				<boxGeometry args={[0.32, 0.08, d + 0.64]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.74} metalness={0.02} />
			</mesh>

			{/* Concealed under-coping warm LED cove */}
			<mesh position={[0, 0.03, -d / 2]}>
				<boxGeometry args={[w, 0.015, 0.02]} />
				<meshBasicMaterial color={warmLight} toneMapped={false} />
			</mesh>
			<mesh position={[0, 0.03, d / 2]}>
				<boxGeometry args={[w, 0.015, 0.02]} />
				<meshBasicMaterial color={warmLight} toneMapped={false} />
			</mesh>
		</group>
	)
}

function ReflectiveGround({
	position = [0, 0, 0],
	width = 42,
	depth = 48,
	stoneColor = '#c2bcb0',
	metalColor = '#0d121a',
	warmLight = '#ffb45c',
	archZ = 9.5
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	// Monumental stone terrace steps leading up to the portal bridge
	const steps = [
		{ z: archZ - 5.0, y: 0.14, h: 0.14, d: 1.30, w: 20.4 },
		{ z: archZ - 3.8, y: 0.28, h: 0.28, d: 1.25, w: 19.6 },
		{ z: archZ - 2.6, y: 0.42, h: 0.42, d: 1.20, w: 18.8 },
		{ z: archZ - 1.5, y: 0.56, h: 0.56, d: 1.20, w: 18.0 },
		{ z: archZ - 0.5, y: 0.68, h: 0.68, d: 1.30, w: 17.2 },
		{ z: archZ + 0.6, y: 0.78, h: 0.78, d: 1.40, w: 16.4 },
	]

	const stoneMat = {
		color: stoneColor,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.024,
		roughness: 0.74,
		metalness: 0.02,
	}

	const darkMat = {
		color: metalColor,
		roughness: 0.88,
		metalness: 0.22,
	}

	return (
		<group position={position}>

			{/* ── 1. MAIN WET HONED STONE PLAZA SLAB ── */}
			<mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[width, depth]} />
				<meshStandardMaterial
					color="#0c1018"
					map={travertine.plaza}
					metalness={0.04}
					roughness={0.58}
				/>
			</mesh>

			{/* ── 2. DUAL SUNKEN ARCHITECTURAL REFLECTION BASINS ── */}
			<SunkenWaterBasin position={[-5.8, 0, 1.6]} size={[3.2, 5.8]} warmLight={warmLight} />
			<SunkenWaterBasin position={[ 5.8, 0, 1.6]} size={[3.2, 5.8]} warmLight={warmLight} />

			{/* ── 3. FLOATING CANTILEVERED ARCHITECTURAL BENCHES ── */}
			{[-9.0, 9.0].map((x) => (
				<group key={`bench-${x}`} position={[x, 0, 0.2]}>
					{/* Obsidian recessed supports */}
					<mesh position={[-1.0, 0.16, 0]}>
						<boxGeometry args={[0.26, 0.32, 0.72]} />
						<meshStandardMaterial {...darkMat} />
					</mesh>
					<mesh position={[1.0, 0.16, 0]}>
						<boxGeometry args={[0.26, 0.32, 0.72]} />
						<meshStandardMaterial {...darkMat} />
					</mesh>
					{/* Floating cantilevered stone seat */}
					<mesh position={[0, 0.36, 0]}>
						<boxGeometry args={[2.7, 0.14, 0.90]} />
						<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
					</mesh>
					{/* Under-bench soft warm wash */}
					<mesh position={[0, 0.26, 0]}>
						<boxGeometry args={[2.0, 0.02, 0.48]} />
						<meshBasicMaterial color={warmLight} transparent opacity={0.42} toneMapped={false} />
					</mesh>
				</group>
			))}

			{/* ── 4. MONUMENTAL STAIRCASE WITH UNDER-STEP WARM GLOW ── */}
			<group>
				{steps.map(({ z, y, h, d, w }, index) => (
					<group key={`step-${index}`}>
						{/* Stone tread slab */}
						<mesh position={[0, y / 2, z]} receiveShadow={false}>
							<boxGeometry args={[w, h, d]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
						</mesh>
						{/* Concealed warm LED reveal tucked right under tread nosing */}
						<mesh position={[0, y - 0.015, z - d / 2 + 0.025]}>
							<boxGeometry args={[w - 0.4, 0.018, 0.025]} />
							<meshBasicMaterial color={warmLight} toneMapped={false} />
						</mesh>
					</group>
				))}
			</group>

			{/* ── 5. ASYMMETRICAL TERRACE FLANKS & MANICURED PLANTING ── */}
			{/* Left retaining terrace (wider, heavy mass) */}
			<group position={[-11.2, 0, archZ - 2.5]}>
				<mesh position={[0, 0.55, 0]}>
					<boxGeometry args={[4.8, 1.10, 6.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				<mesh position={[0, 0.07, 0]}>
					<boxGeometry args={[4.95, 0.14, 6.35]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[0, 1.14, 0]}>
					<boxGeometry args={[4.96, 0.12, 6.36]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
				</mesh>
				<mesh position={[2.42, 1.06, 0]}>
					<boxGeometry args={[0.035, 0.02, 6.1]} />
					<meshBasicMaterial color={warmLight} toneMapped={false} />
				</mesh>
				<mesh position={[0, 1.17, 0]}>
					<boxGeometry args={[4.2, 0.05, 5.6]} />
					<meshStandardMaterial color="#120e0a" roughness={0.96} />
				</mesh>
				{/* Dark architectural cypress shrubs */}
				{[-2.2, -1.1, 0, 1.1, 2.2].map((pz, idx) => (
					<mesh key={`shrub-l-${idx}`} position={[0, 1.40, pz]} scale={[0.58, 0.42, 0.58]}>
						<dodecahedronGeometry args={[0.60, 1]} />
						<meshStandardMaterial color={idx % 2 === 0 ? '#1b2a14' : '#223418'} roughness={0.88} flatShading />
					</mesh>
				))}
			</group>

			{/* Right retaining terrace (stepped back, narrower) */}
			<group position={[11.5, 0, archZ - 2.5]}>
				<mesh position={[0, 0.55, 0]}>
					<boxGeometry args={[4.2, 1.10, 6.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				<mesh position={[0, 0.07, 0]}>
					<boxGeometry args={[4.35, 0.14, 6.35]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[0, 1.14, 0]}>
					<boxGeometry args={[4.36, 0.12, 6.36]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
				</mesh>
				<mesh position={[-2.12, 1.06, 0]}>
					<boxGeometry args={[0.035, 0.02, 6.1]} />
					<meshBasicMaterial color={warmLight} toneMapped={false} />
				</mesh>
				<mesh position={[0, 1.17, 0]}>
					<boxGeometry args={[3.6, 0.05, 5.6]} />
					<meshStandardMaterial color="#120e0a" roughness={0.96} />
				</mesh>
				{[-1.8, -0.6, 0.6, 1.8].map((pz, idx) => (
					<mesh key={`shrub-r-${idx}`} position={[0, 1.40, pz]} scale={[0.62, 0.40, 0.62]}>
						<dodecahedronGeometry args={[0.60, 1]} />
						<meshStandardMaterial color={idx % 2 === 0 ? '#1f2e18' : '#24361c'} roughness={0.88} flatShading />
					</mesh>
				))}
			</group>

			{/* ── 6. PERIMETER CURBS ── */}
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
