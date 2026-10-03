import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { TOOLKIT_CORE } from '../../../../data/toolkitData'

// ============================================================================
// TOOLKIT CORE (CHAPTER 05 — THE ENGINEER'S TOOLKIT)
// Monumental Focal Centerpiece of the Technology Observatory:
// - Central Stepped Circular Plinth
// - Luminous Multi-Ring Gyroscope & Floating Crystal Core
// - Primary Cyan & Cool Slate Aesthetic with Warm Amber Architectural Rim
// - Typography:
//     05 // THE ENGINEER'S TOOLKIT
//     TOOLS • PLATFORMS • SYSTEMS I USE
//     "The tools behind the systems."
//     Plinth Inscription: VERIFIED TECHNICAL STACK
// - Radial Floor Filaments connecting to the 7 surrounding stations
// - Interactive Prompt: [ E ] EXPLORE TOOLKIT OVERVIEW
// ============================================================================

export default function ToolkitCore({ center = [21.8, 0, 33.1], isNearby = false, onSelect }) {
	const [cx, , cz] = center
	const [hovered, setHovered] = useState(false)

	const coreRef = useRef()
	const innerCoreRef = useRef()
	const ring1Ref = useRef()
	const ring2Ref = useRef()
	const ring3Ref = useRef()
	const satelliteGroupRef = useRef()

	// Radial filaments connecting to each station's exact 3D coordinates (6 balanced stations)
	const stationFilamentAngles = useMemo(() => [
		{ angle: Math.atan2(5.25, -2.8), length: 5.95, color: '#00d2ff' },  // St 01: AI / ML Engineering
		{ angle: Math.atan2(4.40, 0.5), length: 4.43, color: '#35d8ff' },   // St 02: Generative AI & RAG
		{ angle: Math.atan2(3.10, 3.8), length: 4.90, color: '#5fe2ff' },   // St 03: Computer Vision
		{ angle: Math.atan2(-3.10, 3.8), length: 4.90, color: '#ffb45c' },  // St 04: Data & Retrieval
		{ angle: Math.atan2(-4.40, 0.5), length: 4.43, color: '#00e5a3' },  // St 05: AI Systems & Inference
		{ angle: Math.atan2(-5.25, -2.8), length: 5.95, color: '#a993ff' }, // St 06: Visualization, BI & Automation
	], [])

	// Slow, composed rotation for kinetic presence
	useFrame((state, delta) => {
		const t = state.clock.elapsedTime

		if (coreRef.current) {
			coreRef.current.rotation.y += delta * 0.15
			coreRef.current.rotation.x = Math.sin(t * 0.5) * 0.05
		}
		if (innerCoreRef.current) {
			innerCoreRef.current.rotation.y -= delta * 0.18
			innerCoreRef.current.rotation.z += delta * 0.08
			const pulse = 1 + Math.sin(t * 1.5) * 0.035
			innerCoreRef.current.scale.set(pulse, pulse, pulse)
		}
		if (ring1Ref.current) {
			ring1Ref.current.rotation.z += delta * 0.12
		}
		if (ring2Ref.current) {
			ring2Ref.current.rotation.x += delta * 0.10
			ring2Ref.current.rotation.y += delta * 0.08
		}
		if (ring3Ref.current) {
			ring3Ref.current.rotation.y += delta * 0.07
		}
		if (satelliteGroupRef.current) {
			satelliteGroupRef.current.rotation.y += delta * 0.09
		}
	})

	const showPrompt = isNearby || hovered

	return (
		<group position={[cx, 0, cz]}>
			{/* ── 1. CONCENTRIC STEPPED PLATFORM ── */}
			{/* Tier 1 (Lowest Platform) */}
			<mesh position={[0, 0.03, 0]} receiveShadow>
				<cylinderGeometry args={[2.40, 2.55, 0.06, 48]} />
				<meshStandardMaterial color="#0a101a" roughness={0.75} metalness={0.25} />
			</mesh>

			{/* Outer Accent Rim */}
			<mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.32, 2.38, 48]} />
				<meshBasicMaterial color="#00d2ff" transparent opacity={0.70} toneMapped={false} />
			</mesh>

			{/* Tier 2 (Middle Dais) */}
			<mesh position={[0, 0.10, 0]} receiveShadow>
				<cylinderGeometry args={[1.80, 1.90, 0.08, 48]} />
				<meshStandardMaterial color="#101826" roughness={0.65} metalness={0.35} />
			</mesh>

			{/* Middle Inner Glow Ring */}
			<mesh position={[0, 0.145, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.74, 1.80, 48]} />
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.50} toneMapped={false} />
			</mesh>

			{/* Tier 3 (Raised Core Plinth) */}
			<mesh position={[0, 0.20, 0]} receiveShadow>
				<cylinderGeometry args={[1.20, 1.30, 0.12, 36]} />
				<meshStandardMaterial color="#162234" roughness={0.55} metalness={0.45} />
			</mesh>

			{/* Plinth Metallic Trim Ring */}
			<mesh position={[0, 0.265, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.14, 1.20, 36]} />
				<meshBasicMaterial color="#00d2ff" transparent opacity={0.90} toneMapped={false} />
			</mesh>

			{/* Inscription Band on the South Plinth Face (Facing Arrival Player) */}
			<Text
				position={[0, 0.20, -1.31]}
				rotation={[0, Math.PI, 0]}
				fontSize={0.062}
				font="/fonts/SegoeUI-Bold.ttf"
				letterSpacing={0.14}
				color="#9ec6e8"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.005}
				outlineColor="#040810"
				material-toneMapped={false}
			>
				{TOOLKIT_CORE.plinthInscription}
			</Text>

			{/* ── 2. RADIAL FLOOR FILAMENTS (PULSING LINES TO STATIONS) ── */}
			{stationFilamentAngles.map((fil, i) => {
				const endX = Math.sin(fil.angle) * fil.length
				const endZ = Math.cos(fil.angle) * fil.length
				const midX = endX * 0.5
				const midZ = endZ * 0.5
				const rotY = Math.atan2(endX, endZ)
				return (
					<group key={i}>
						<mesh position={[midX, 0.088, midZ]} rotation={[-Math.PI / 2, 0, rotY]}>
							<planeGeometry args={[0.026, fil.length]} />
							<meshBasicMaterial
								color={fil.color}
								transparent
								opacity={0.50}
								toneMapped={false}
							/>
						</mesh>
						{/* Station Anchor Spot Marker */}
						<mesh position={[endX, 0.089, endZ]} rotation={[-Math.PI / 2, 0, 0]}>
							<circleGeometry args={[0.11, 16]} />
							<meshBasicMaterial
								color={fil.color}
								transparent
								opacity={0.75}
								toneMapped={false}
							/>
						</mesh>
					</group>
				)
			})}

			{/* ── 3. HOLOGRAPHIC CORE SCULPTURE ── */}
			<group position={[0, 0.85, 0]}>
				{/* Inner Glowing Crystal Core */}
				<mesh ref={innerCoreRef}>
					<octahedronGeometry args={[0.24, 0]} />
					<meshBasicMaterial
						color="#00d2ff"
						wireframe
						transparent
						opacity={0.85}
						toneMapped={false}
					/>
				</mesh>

				{/* High-intensity Core Light Source (Managed via ChapterLightRig) */}

				{/* Outer Translucent Faceted Core */}
				<mesh ref={coreRef}>
					<icosahedronGeometry args={[0.42, 0]} />
					<meshPhysicalMaterial
						color="#0a1828"
						roughness={0.15}
						metalness={0.85}
						transmission={0.75}
						thickness={0.35}
						transparent
						opacity={0.80}
					/>
				</mesh>

				{/* Core Wireframe Shell */}
				<mesh ref={coreRef}>
					<icosahedronGeometry args={[0.43, 0]} />
					<meshBasicMaterial
						color="#00d2ff"
						wireframe
						transparent
						opacity={0.45}
						toneMapped={false}
					/>
				</mesh>

				{/* Orbital Ring 1 (Horizontal) */}
				<group ref={ring1Ref}>
					<mesh rotation={[Math.PI / 2, 0, 0]}>
						<torusGeometry args={[0.62, 0.014, 16, 64]} />
						<meshBasicMaterial color="#00d2ff" transparent opacity={0.75} toneMapped={false} />
					</mesh>
					{/* Orbital Marker Pip */}
					<mesh position={[0.62, 0, 0]}>
						<sphereGeometry args={[0.032, 12, 12]} />
						<meshBasicMaterial color="#ffffff" toneMapped={false} />
					</mesh>
				</group>

				{/* Orbital Ring 2 (Tilted 35 deg) */}
				<group ref={ring2Ref} rotation={[0.61, 0, 0.4]}>
					<mesh>
						<torusGeometry args={[0.74, 0.012, 16, 64]} />
						<meshBasicMaterial color="#35d8ff" transparent opacity={0.65} toneMapped={false} />
					</mesh>
					<mesh position={[0, 0.74, 0]}>
						<sphereGeometry args={[0.028, 12, 12]} />
						<meshBasicMaterial color="#9eedff" toneMapped={false} />
					</mesh>
				</group>

				{/* Orbital Ring 3 (Tilted -35 deg) */}
				<group ref={ring3Ref} rotation={[-0.55, 0, -0.45]}>
					<mesh>
						<torusGeometry args={[0.86, 0.011, 16, 64]} />
						<meshBasicMaterial color="#ffb45c" transparent opacity={0.60} toneMapped={false} />
					</mesh>
				</group>

				{/* Orbiting Satellite Data Chips */}
				<group ref={satelliteGroupRef}>
					<mesh position={[1.05, 0.12, 0]}>
						<boxGeometry args={[0.08, 0.045, 0.01]} />
						<meshBasicMaterial color="#00d2ff" toneMapped={false} />
					</mesh>
					<mesh position={[-1.05, -0.12, 0]}>
						<boxGeometry args={[0.08, 0.045, 0.01]} />
						<meshBasicMaterial color="#ffb45c" toneMapped={false} />
					</mesh>
				</group>
			</group>

			{/* ── 4. OVERHEAD ARCHITECTURAL TYPOGRAPHY (HERO LABELS) ── */}
			<group position={[0, 4.35, 0]} rotation={[0, Math.PI, 0]}>
				{/* Chapter Number Badge */}
				<Text
					position={[0, 0.50, 0]}
					fontSize={0.13}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.16}
					color="#00d2ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.008}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					{TOOLKIT_CORE.chapterLabel} // THE OBSERVED STACK
				</Text>

				{/* Hero Title */}
				<Text
					position={[0, 0.18, 0]}
					fontSize={0.34}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.09}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.015}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					{TOOLKIT_CORE.title}
				</Text>

				{/* Supporting Subtitle */}
				<Text
					position={[0, -0.14, 0]}
					fontSize={0.14}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.12}
					color="#35d8ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.008}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					{TOOLKIT_CORE.subtitle}
				</Text>

				{/* Optional Philosophy Quote */}
				<Text
					position={[0, -0.38, 0]}
					fontSize={0.09}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#a3c4dc"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.005}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					“{TOOLKIT_CORE.quote}”
				</Text>

				{/* Interactive Inspection Badge */}
				{showPrompt && (
					<group position={[0, -0.70, 0]}>
						<mesh>
							<planeGeometry args={[1.90, 0.24]} />
							<meshBasicMaterial color="#00d2ff" transparent opacity={0.20} />
						</mesh>
						<mesh position={[0, 0, 0.001]}>
							<planeGeometry args={[1.90, 0.24]} />
							<meshBasicMaterial color="#00d2ff" wireframe transparent opacity={0.75} />
						</mesh>
						<Text
							position={[0, 0, 0.01]}
							fontSize={0.078}
							font="/fonts/SegoeUI-Bold.ttf"
							letterSpacing={0.10}
							color="#FAF8F2"
							anchorX="center"
							anchorY="middle"
							material-toneMapped={false}
						>
							[ E ] EXPLORE TOOLKIT OVERVIEW
						</Text>
					</group>
				)}
			</group>

			{/* ── 5. CLICK / HOVER HIT TARGET ── */}
			<mesh
				position={[0, 1.6, 0]}
				onClick={(e) => {
					e.stopPropagation()
					onSelect?.()
				}}
				onPointerDown={(e) => e.stopPropagation()}
				onPointerOver={(e) => {
					e.stopPropagation()
					document.body.style.cursor = 'pointer'
					setHovered(true)
				}}
				onPointerOut={(e) => {
					e.stopPropagation()
					document.body.style.cursor = 'auto'
					setHovered(false)
				}}
			>
				<cylinderGeometry args={[2.0, 2.0, 3.2, 24]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>
		</group>
	)
}

