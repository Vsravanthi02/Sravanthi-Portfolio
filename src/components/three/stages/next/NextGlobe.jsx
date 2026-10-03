import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { NEXT_CONTENT } from '../../../../data/nextData'

// ============================================================================
// LUMINOUS WORLD GLOBE & CENTRAL DAIS (CHAPTER 07 — WHAT'S NEXT)
// Based on media_1790773457536.jpg:
// - Stepped circular platform dais with embedded warm amber cove lighting
// - Cyan glow pool directly beneath the floating world sphere
// - Luminous wireframe globe with rotating latitude/longitude meridians
// - Floating holographic interactive glass tiles on left and right
// - Gentle float animation and subtle ambient rotation
// ============================================================================

export default function NextGlobe({
	position = [0, 0, 3.8],
	onOpenResume,
	onOpenContact,
}) {
	const globeGroupRef = useRef()
	const innerSphereRef = useRef()
	const [hoveredTile, setHoveredTile] = useState(null)

	// Slow, meditative planetary rotation and slight floating pulse
	useFrame((state, delta) => {
		if (globeGroupRef.current) {
			globeGroupRef.current.rotation.y += delta * 0.28
		}
		if (innerSphereRef.current) {
			innerSphereRef.current.rotation.y -= delta * 0.15
			innerSphereRef.current.position.y = 1.30 + Math.sin(state.clock.elapsedTime * 1.8) * 0.04
		}
	})

	return (
		<group position={position}>
			{/* ── 1. STEPPED CIRCULAR ARCHITECTURAL DAIS ── */}
			{/* Bottom Base Plinth */}
			<mesh position={[0, 0.10, 0]} receiveShadow>
				<cylinderGeometry args={[1.75, 1.90, 0.20, 40]} />
				<meshStandardMaterial color="#101622" roughness={0.7} metalness={0.3} />
			</mesh>

			{/* Outer Amber LED Cove Strip */}
			<mesh position={[0, 0.21, 0]}>
				<cylinderGeometry args={[1.76, 1.76, 0.035, 40, 1, true]} />
				<meshBasicMaterial color="#ff9933" toneMapped={false} />
			</mesh>

			{/* Upper Circular Tier */}
			<mesh position={[0, 0.26, 0]} receiveShadow>
				<cylinderGeometry args={[1.40, 1.48, 0.14, 40]} />
				<meshStandardMaterial color="#161f2e" roughness={0.55} metalness={0.45} />
			</mesh>

			{/* Concentric Cyan LED Ring on Dais Surface */}
			<mesh position={[0, 0.335, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.05, 1.15, 40]} />
				<meshBasicMaterial color="#00d2ff" toneMapped={false} />
			</mesh>

			{/* Central Glowing Energy Well */}
			<mesh position={[0, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<circleGeometry args={[0.75, 36]} />
				<meshBasicMaterial color="#00d2ff" transparent opacity={0.35} toneMapped={false} />
			</mesh>

			{/* Upward Hologram Projector Light (Managed via ChapterLightRig) */}

			{/* ── 2. LUMINOUS WORLD GLOBE (SPHERE) ── */}
			<group ref={innerSphereRef} position={[0, 1.30, 0]}>
				<group ref={globeGroupRef}>
					{/* Outer Cyan Wireframe Grid */}
					<mesh>
						<sphereGeometry args={[0.58, 24, 16]} />
						<meshBasicMaterial
							color="#38d6ff"
							wireframe
							transparent
							opacity={0.65}
							toneMapped={false}
						/>
					</mesh>

					{/* Equator & Meridian Prominent Rings */}
					<mesh rotation={[Math.PI / 2, 0, 0]}>
						<torusGeometry args={[0.585, 0.012, 8, 36]} />
						<meshBasicMaterial color="#00d2ff" toneMapped={false} />
					</mesh>
					<mesh rotation={[0, 0, 0]}>
						<torusGeometry args={[0.585, 0.012, 8, 36]} />
						<meshBasicMaterial color="#a855f7" toneMapped={false} />
					</mesh>
					<mesh rotation={[0, Math.PI / 2, 0]}>
						<torusGeometry args={[0.585, 0.012, 8, 36]} />
						<meshBasicMaterial color="#00d2ff" toneMapped={false} />
					</mesh>

					{/* Tropic Rings */}
					<mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
						<torusGeometry args={[0.505, 0.008, 8, 32]} />
						<meshBasicMaterial color="#80e5ff" transparent opacity={0.7} toneMapped={false} />
					</mesh>
					<mesh position={[0, -0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
						<torusGeometry args={[0.505, 0.008, 8, 32]} />
						<meshBasicMaterial color="#80e5ff" transparent opacity={0.7} toneMapped={false} />
					</mesh>
				</group>

				{/* Inner Glowing Core Sphere */}
				<mesh>
					<sphereGeometry args={[0.42, 24, 24]} />
					<meshStandardMaterial
						color="#143048"
						emissive="#0066aa"
						emissiveIntensity={0.8}
						roughness={0.2}
						metalness={0.8}
						transparent
						opacity={0.75}
					/>
				</mesh>

				{/* Soft Outer Atmosphere Glow Halo */}
				<mesh>
					<sphereGeometry args={[0.62, 20, 20]} />
					<meshBasicMaterial
						color="#35b8ff"
						transparent
						opacity={0.12}
						side={THREE.BackSide}
						toneMapped={false}
					/>
				</mesh>
			</group>

			{/* ── 3. FLOATING HOLOGRAPHIC TILES (MATCHING REFERENCE IMAGE) ── */}
			{/* Left Hologram Tile: Resume Icon */}
			<group
				position={[-1.15, 1.25, 0.35]}
				rotation={[0, 0.25, 0]}
				onClick={(e) => {
					e.stopPropagation()
					onOpenResume?.()
				}}
				onPointerOver={(e) => {
					e.stopPropagation()
					setHoveredTile('resume')
					document.body.style.cursor = 'pointer'
				}}
				onPointerOut={() => {
					setHoveredTile(null)
					document.body.style.cursor = ''
				}}
			>
				{/* Glass Backing */}
				<mesh>
					<planeGeometry args={[0.46, 0.52]} />
					<meshStandardMaterial
						color="#081422"
						roughness={0.2}
						metalness={0.8}
						transparent
						opacity={0.88}
					/>
				</mesh>
				{/* Glowing Cyan Rim */}
				<mesh position={[0, 0, 0.002]}>
					<planeGeometry args={[0.48, 0.54]} />
					<meshBasicMaterial
						color="#00d2ff"
						wireframe
						transparent
						opacity={hoveredTile === 'resume' ? 1.0 : 0.65}
						toneMapped={false}
					/>
				</mesh>
				{/* Document Icon Symbol */}
				<group position={[0, 0.04, 0.01]}>
					<mesh>
						<planeGeometry args={[0.18, 0.24]} />
						<meshBasicMaterial color="#00d2ff" toneMapped={false} />
					</mesh>
					<mesh position={[0, 0, 0.002]}>
						<planeGeometry args={[0.13, 0.02]} />
						<meshBasicMaterial color="#081422" />
					</mesh>
					<mesh position={[0, -0.04, 0.002]}>
						<planeGeometry args={[0.13, 0.02]} />
						<meshBasicMaterial color="#081422" />
					</mesh>
				</group>
				<Text
					position={[0, -0.16, 0.01]}
					fontSize={0.055}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.06}
					color="#00d2ff"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					RESUME
				</Text>
			</group>

			{/* Right Hologram Tile: Connect / People Icon */}
			<group
				position={[1.15, 1.25, 0.35]}
				rotation={[0, -0.25, 0]}
				onClick={(e) => {
					e.stopPropagation()
					onOpenContact?.()
				}}
				onPointerOver={(e) => {
					e.stopPropagation()
					setHoveredTile('contact')
					document.body.style.cursor = 'pointer'
				}}
				onPointerOut={() => {
					setHoveredTile(null)
					document.body.style.cursor = ''
				}}
			>
				{/* Glass Backing */}
				<mesh>
					<planeGeometry args={[0.46, 0.52]} />
					<meshStandardMaterial
						color="#081422"
						roughness={0.2}
						metalness={0.8}
						transparent
						opacity={0.88}
					/>
				</mesh>
				{/* Glowing Purple Rim */}
				<mesh position={[0, 0, 0.002]}>
					<planeGeometry args={[0.48, 0.54]} />
					<meshBasicMaterial
						color="#c084fc"
						wireframe
						transparent
						opacity={hoveredTile === 'contact' ? 1.0 : 0.65}
						toneMapped={false}
					/>
				</mesh>
				{/* User/Connect Icon Symbol */}
				<group position={[0, 0.04, 0.01]}>
					<mesh position={[0, 0.06, 0]}>
						<circleGeometry args={[0.06, 16]} />
						<meshBasicMaterial color="#c084fc" toneMapped={false} />
					</mesh>
					<mesh position={[0, -0.04, 0]}>
						<circleGeometry args={[0.10, 16, 0, Math.PI]} />
						<meshBasicMaterial color="#c084fc" toneMapped={false} />
					</mesh>
				</group>
				<Text
					position={[0, -0.16, 0.01]}
					fontSize={0.055}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.06}
					color="#c084fc"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					CONNECT
				</Text>
			</group>
		</group>
	)
}
