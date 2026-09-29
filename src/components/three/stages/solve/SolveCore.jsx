import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SOLVE_CORE } from '../../../../data/solveData'

// ============================================================================
// SOLVE ENGINEERING CORE
// Central circular engineering floor based on media_1790188209235.jpg:
// - Concentric floor rings embedded in dark polished stone
// - Inscription: ENGINEERING UNDER UNCERTAINTY
// - Subtle cyan center point with rising data particles
// - Amber/cyan light interaction
// - Radial ground pathways connecting outward to the three problem chambers
// ============================================================================

function AscendingCoreParticles() {
	const count = 16
	const meshRefs = useRef([])

	useFrame((state) => {
		const t = state.clock.elapsedTime
		meshRefs.current.forEach((mesh, i) => {
			if (!mesh) return
			const progress = (t * 0.35 + i / count) % 1.0
			const angle = (i / count) * Math.PI * 2 + t * 0.15
			const r = 0.45 + Math.sin(t * 1.2 + i) * 0.15
			mesh.position.x = Math.cos(angle) * r
			mesh.position.z = Math.sin(angle) * r
			mesh.position.y = 0.15 + progress * 1.8
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.75
		})
	})

	return (
		<group position={[0, 0, 0]}>
			{Array.from({ length: count }).map((_, i) => (
				<mesh key={i} ref={(el) => (meshRefs.current[i] = el)} position={[0, 0.15, 0]}>
					<sphereGeometry args={[0.018, 6, 6]} />
					<meshBasicMaterial color="#6fe7ff" transparent opacity={0.6} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

export default function SolveCore() {
	const coreRef = useRef()

	// Radial ground lines connecting Core [0, 0, 38.0] to the 3 Chambers:
	// Chamber 01: [-6.8, 0, 41.5]
	// Chamber 02: [0, 0, 45.0]
	// Chamber 03: [6.8, 0, 41.5]
	const radialLines = useMemo(() => [
		{ target: [-6.8, 0, 41.5], color: '#35d8ff' },
		{ target: [0, 0, 45.0], color: '#6fe7ff' },
		{ target: [6.8, 0, 41.5], color: '#ffb45c' }
	], [])

	return (
		<group ref={coreRef} position={SOLVE_CORE.position}>
			{/* ── 1. STEPPED CIRCULAR CENTRAL PLATFORM ── */}
			{/* Outer Platform Tier (Radius: 4.8m) */}
			<mesh position={[0, 0.03, 0]} receiveShadow>
				<cylinderGeometry args={[4.8, 5.0, 0.05, 56]} />
				<meshStandardMaterial color="#0c121c" roughness={0.6} metalness={0.7} />
			</mesh>

			{/* Outer Warm Amber Ring */}
			<mesh position={[0, 0.062, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[4.45, 4.54, 56]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.85} toneMapped={false} />
			</mesh>

			{/* Inner Platform Tier (Radius: 3.4m) */}
			<mesh position={[0, 0.05, 0]} receiveShadow>
				<cylinderGeometry args={[3.4, 3.55, 0.04, 56]} />
				<meshStandardMaterial color="#0a0f16" roughness={0.5} metalness={0.8} />
			</mesh>

			{/* Middle Cyan Ring */}
			<mesh position={[0, 0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.85, 2.92, 56]} />
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.7} toneMapped={false} />
			</mesh>

			{/* Center Raised Bezel Platform */}
			<mesh position={[0, 0.07, 0]} receiveShadow>
				<cylinderGeometry args={[1.2, 1.3, 0.04, 48]} />
				<meshStandardMaterial color="#070b12" roughness={0.4} metalness={0.9} />
			</mesh>

			{/* Center Cyan Core Ring */}
			<mesh position={[0, 0.095, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.55, 0.62, 40]} />
				<meshBasicMaterial color="#6fe7ff" transparent opacity={0.9} toneMapped={false} />
			</mesh>

			{/* ── 2. FLOOR INSCRIPTION: ENGINEERING UNDER UNCERTAINTY ── */}
			<group position={[0, 0.082, 0]} rotation={[0, Math.PI, 0]}>
				<Text
					position={[0, 0, 0.35]}
					rotation={[-Math.PI / 2, 0, 0]}
					fontSize={0.14}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.24}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					ENGINEERING
				</Text>
				<Text
					position={[0, 0, 0]}
					rotation={[-Math.PI / 2, 0, 0]}
					fontSize={0.095}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.22}
					color="#ffb45c"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					UNDER
				</Text>
				<Text
					position={[0, 0, -0.35]}
					rotation={[-Math.PI / 2, 0, 0]}
					fontSize={0.14}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.24}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					UNCERTAINTY
				</Text>
			</group>

			{/* ── 3. RADIAL CONNECTIVE EMISSIVE GROUND FILAMENTS ── */}
			{radialLines.map((line, idx) => {
				const dx = line.target[0] - SOLVE_CORE.position[0]
				const dz = line.target[2] - SOLVE_CORE.position[2]
				const len = Math.hypot(dx, dz)
				const angle = Math.atan2(dx, dz)
				return (
					<group key={idx} rotation={[0, angle, 0]}>
						<mesh position={[0, 0.055, len / 2]}>
							<boxGeometry args={[0.04, 0.008, len]} />
							<meshBasicMaterial color={line.color} transparent opacity={0.45} toneMapped={false} />
						</mesh>
					</group>
				)
			})}

			{/* ── 4. DATA PARTICLES & SOFT CORE LIGHT ── */}
			<AscendingCoreParticles />
			<pointLight
				position={[0, 0.8, 0]}
				color="#35d8ff"
				intensity={0.65}
				distance={5.5}
				decay={2}
			/>
		</group>
	)
}

