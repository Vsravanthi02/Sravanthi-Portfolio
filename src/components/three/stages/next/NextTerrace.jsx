import { useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { NEXT_CONTENT } from '../../../../data/nextData'

// ============================================================================
// ARCHITECTURAL TERRACE & PLINTH (CHAPTER 07 — WHAT'S NEXT)
// Based directly on media_1790773457536.jpg:
// - Concentric stepped stone amphitheater terrace with dark travertine
// - Embedded warm amber LED cove lighting along each terrace step riser
// - Floor lanterns / warm amber bollards casting rich grazing pools
// - Left-side cozy lounge seating niche with soft architectural upholstery
// - Foreground plinth with illuminated inscription:
//   "SAME CURIOSITY. BIGGER OPPORTUNITIES."
// ============================================================================

function FloorLantern({ position }) {
	return (
		<group position={position}>
			{/* Dark Metal Base */}
			<mesh position={[0, 0.08, 0]}>
				<cylinderGeometry args={[0.10, 0.12, 0.16, 16]} />
				<meshStandardMaterial color="#111620" metalness={0.8} roughness={0.3} />
			</mesh>
			{/* Glowing Glass Cylinder */}
			<mesh position={[0, 0.22, 0]}>
				<cylinderGeometry args={[0.08, 0.08, 0.14, 16]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>
			{/* Top Cap */}
			<mesh position={[0, 0.30, 0]}>
				<cylinderGeometry args={[0.11, 0.08, 0.04, 16]} />
				<meshStandardMaterial color="#111620" metalness={0.8} roughness={0.3} />
			</mesh>
			{/* Warm Amber Point Light */}
			<pointLight position={[0, 0.25, 0]} color="#ffaa44" intensity={0.9} distance={2.2} decay={2} />
		</group>
	)
}

export default function NextTerrace() {
	// Floor lanterns distributed along terrace step arcs matching reference image
	const lanternPositions = useMemo(() => [
		[-2.2, 0.02, 1.8],
		[2.2, 0.02, 1.8],
		[0.9, 0.02, 0.2],
		[-2.8, 0.02, -0.6],
		[3.2, 0.02, 3.4],
	], [])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. MAIN SANCTUARY SUB-PLINTH & FOUNDATION ── */}
			<mesh position={[0, -0.15, 1.5]} receiveShadow>
				<cylinderGeometry args={[11.5, 12.0, 0.30, 48]} />
				<meshStandardMaterial color="#0b0f16" roughness={0.88} metalness={0.12} />
			</mesh>

			{/* ── 2. TIER 0: LOWER STEPPED TERRACE ── */}
			<mesh position={[0, 0.01, 1.6]} receiveShadow>
				<cylinderGeometry args={[9.5, 9.8, 0.10, 48]} />
				<meshStandardMaterial color="#101622" roughness={0.65} metalness={0.22} />
			</mesh>

			{/* Concentric Amber LED Ring 1 (Outer perimeter) */}
			<mesh position={[0, 0.025, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[6.8, 6.90, 48, 1, 0, Math.PI]} />
				<meshBasicMaterial color="#ff9933" toneMapped={false} />
			</mesh>

			{/* Concentric Amber LED Ring 2 (Mid perimeter) */}
			<mesh position={[0, 0.026, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[4.4, 4.48, 48, 1, 0, Math.PI]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* Concentric Amber LED Ring 3 (Inner around dais) */}
			<mesh position={[0, 0.028, 3.8]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.5, 2.58, 48]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* ── 3. FLOOR LANTERNS ── */}
			{lanternPositions.map((pos, idx) => (
				<FloorLantern key={idx} position={pos} />
			))}

			{/* ── 4. LEFT LOUNGE SEATING NICHE ── */}
			<group position={[4.0, 0, 2.8]} rotation={[0, -0.45, 0]}>
				{/* Sofa Base */}
				<mesh position={[0, 0.22, 0]}>
					<boxGeometry args={[1.9, 0.44, 0.85]} />
					<meshStandardMaterial color="#1a202c" roughness={0.8} metalness={0.2} />
				</mesh>
				{/* Sofa Backrest */}
				<mesh position={[0, 0.58, -0.32]}>
					<boxGeometry args={[1.9, 0.48, 0.22]} />
					<meshStandardMaterial color="#141a24" roughness={0.85} metalness={0.15} />
				</mesh>
				{/* Seat Cushions */}
				<mesh position={[0, 0.44, 0.06]}>
					<boxGeometry args={[1.82, 0.12, 0.65]} />
					<meshStandardMaterial color="#2d3748" roughness={0.9} />
				</mesh>
				{/* Warm Under-wash Light */}
				<pointLight position={[0, 0.15, 0.2]} color="#ffaa44" intensity={0.6} distance={1.8} />
			</group>

			{/* ── 5. FOREGROUND PLINTH: "SAME CURIOSITY. BIGGER OPPORTUNITIES." ── */}
			<group position={[2.8, 0, -0.6]} rotation={[0, 0.18, 0]}>
				{/* Plinth Base Slab */}
				<mesh position={[0, 0.42, 0]}>
					<boxGeometry args={[1.0, 0.84, 0.26]} />
					<meshStandardMaterial color="#0c121c" roughness={0.6} metalness={0.4} />
				</mesh>

				{/* Glowing Amber/Cyan Bezel */}
				<mesh position={[0, 0.42, 0.132]}>
					<planeGeometry args={[0.96, 0.80]} />
					<meshBasicMaterial color="#ffaa44" wireframe transparent opacity={0.5} toneMapped={false} />
				</mesh>

				{/* Inscribed Text */}
				<Text
					position={[-0.38, 0.64, 0.14]}
					fontSize={0.075}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					lineHeight={1.4}
					color="#FAF8F2"
					anchorX="left"
					anchorY="top"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.foregroundPlinth.heading}{'\n'}
					{NEXT_CONTENT.foregroundPlinth.subheading.split(' ')[0]}{'\n'}
					{NEXT_CONTENT.foregroundPlinth.subheading.split(' ')[1]}
				</Text>
			</group>
		</group>
	)
}
