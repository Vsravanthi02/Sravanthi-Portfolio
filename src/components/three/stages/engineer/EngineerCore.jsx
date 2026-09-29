import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { ENGINEER_CORE, QUINTESYS_EXPERIENCE } from '../../../../data/engineerData'

// ============================================================================
// ENGINEER CORE — QUINTESYS PROFESSIONAL EXPERIENCE (CHAPTER 04)
// Monumental Focal Centerpiece of the Observatory:
// - Restrained, elegant orbital globe: calm rotations & gentle amber/cyan glow
// - Dominant Typography:
//     PROFESSIONAL EXPERIENCE
//     QUINTESYS (Large, High Contrast, Hero)
//     AI ENGINEERING INTERN • 8 MONTHS
// - Plinth Inscription: "ENGINEERING IN PRACTICE"
// - Floor workflow ring: UNDERSTAND → COLLABORATE → DESIGN → IMPLEMENT → REVIEW & TEST → DELIVER
// - Radial luminous filaments connecting out to the six stations
// - Interactive pill prompt: [ E ] EXPLORE QUINTESYS
// ============================================================================

export default function EngineerCore({ center = [0, 0, 72.0], isNearby = false, onSelect }) {
	const [cx, , cz] = center
	const [hovered, setHovered] = useState(false)

	const coreRef = useRef()
	const innerCoreRef = useRef()
	const ring1Ref = useRef()
	const ring2Ref = useRef()
	const ring3Ref = useRef()
	const satelliteGroupRef = useRef()

	// Radial filaments angles corresponding to the 6 stations:
	// Screen left: +50.6° (01 Methodology), +72.7° (03 Desktop), +88.6° (05 AI Systems)
	// Screen right: -50.6° (02 Paginated), -72.7° (04 GenAI), -88.6° (06 Software) from forward (+Z)
	const stationFilamentConfigs = useMemo(() => [
		{ angle: (50.6 * Math.PI) / 180, length: 2.35, color: '#4eaed4', isMethodology: true },
		{ angle: (-50.6 * Math.PI) / 180, length: 2.35, color: '#ffb45c', isMethodology: false },
		{ angle: (72.7 * Math.PI) / 180, length: 3.70, color: '#35d8ff', isMethodology: false },
		{ angle: (-72.7 * Math.PI) / 180, length: 3.70, color: '#a993ff', isMethodology: false },
		{ angle: (88.6 * Math.PI) / 180, length: 5.50, color: '#5fe2ff', isMethodology: false },
		{ angle: (-88.6 * Math.PI) / 180, length: 5.50, color: '#ffb45c', isMethodology: false }
	], [])

	// 4 Floating System Modules orbiting calmly around the core
	const miniPanels = useMemo(() => [
		{ label: 'GENAI', angle: 0, color: '#35d8ff' },
		{ label: 'AI SYSTEMS', angle: Math.PI / 2, color: '#ffb45c' },
		{ label: 'AUTOMATION', angle: Math.PI, color: '#69e3ff' },
		{ label: 'SOFTWARE', angle: (3 * Math.PI) / 2, color: '#a993ff' }
	], [])

	// Slow, poised, elegant animation (no excessive spinning)
	useFrame((state, delta) => {
		const t = state.clock.elapsedTime

		if (coreRef.current) {
			coreRef.current.rotation.y += delta * 0.07
			coreRef.current.rotation.x = Math.sin(t * 0.4) * 0.03
		}
		if (innerCoreRef.current) {
			innerCoreRef.current.rotation.y -= delta * 0.08
			innerCoreRef.current.rotation.z += delta * 0.04
			const scale = 1 + Math.sin(t * 0.9) * 0.02
			innerCoreRef.current.scale.set(scale, scale, scale)
		}
		if (ring1Ref.current) {
			ring1Ref.current.rotation.z += delta * 0.06
		}
		if (ring2Ref.current) {
			ring2Ref.current.rotation.x += delta * 0.05
			ring2Ref.current.rotation.y -= delta * 0.04
		}
		if (ring3Ref.current) {
			ring3Ref.current.rotation.y += delta * 0.035
		}
		if (satelliteGroupRef.current) {
			satelliteGroupRef.current.rotation.y += delta * 0.04
		}
	})

	const showPrompt = isNearby || hovered

	return (
		<group position={[cx, 0, cz]}>
			{/* ── 1. STEPPED CONCENTRIC PLATFORM ── */}
			{/* Tier 1 (Lowest Base) */}
			<mesh position={[0, 0.04, 0]} receiveShadow>
				<cylinderGeometry args={[2.7, 2.85, 0.08, 48]} />
				<meshStandardMaterial color="#0e141e" roughness={0.7} metalness={0.25} />
			</mesh>

			{/* Tier 1 Accent Rim */}
			<mesh position={[0, 0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.62, 2.68, 48]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.6} toneMapped={false} />
			</mesh>

			{/* Tier 2 (Middle Dais) */}
			<mesh position={[0, 0.14, 0]} receiveShadow>
				<cylinderGeometry args={[2.1, 2.2, 0.12, 48]} />
				<meshStandardMaterial color="#141c26" roughness={0.65} metalness={0.3} />
			</mesh>

			{/* Tier 2 Cyan Reticle */}
			<mesh position={[0, 0.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.98, 2.04, 48]} />
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.5} toneMapped={false} />
			</mesh>

			{/* Tier 3 (Central Pedestal Plinth) */}
			<mesh position={[0, 0.36, 0]} receiveShadow>
				<cylinderGeometry args={[1.4, 1.5, 0.28, 32]} />
				<meshStandardMaterial color="#1a2330" roughness={0.6} metalness={0.35} />
			</mesh>

			{/* Core Plinth Top Bezel */}
			<mesh position={[0, 0.505, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.32, 1.40, 32]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.8} toneMapped={false} />
			</mesh>

			{/* ── 2. PLINTH INSCRIPTION & SUBTITLE ── */}
			<group position={[0, 0.34, -1.48]} rotation={[0, Math.PI, 0]}>
				<Text
					position={[0, 0.05, 0]}
					fontSize={0.11}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.1}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.005}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					{ENGINEER_CORE.title}
				</Text>
				<Text
					position={[0, -0.06, 0]}
					fontSize={0.065}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.06}
					color="#ffb45c"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.003}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					{ENGINEER_CORE.detail}
				</Text>
			</group>

			{/* ── 3. FLOOR STEP WORKFLOW RING ── */}
			<group position={[0, 0.21, -1.82]} rotation={[0, Math.PI, 0]}>
				<Text
					position={[0, 0, 0]}
					fontSize={0.075}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.08}
					color="#69e3ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.004}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					UNDERSTAND  →  COLLABORATE  →  DESIGN  →  IMPLEMENT  →  REVIEW & TEST  →  DELIVER
				</Text>
			</group>

			{/* ── 4. RADIAL FLOOR FILAMENTS TO THE SIX STATIONS ── */}
			{stationFilamentConfigs.map((cfg, idx) => {
				const { angle, length, color, isMethodology } = cfg
				const midDist = 2.7 + length / 2
				const posX = Math.sin(angle) * midDist
				const posZ = Math.cos(angle) * midDist

				return (
					<group key={idx} position={[posX, 0.07, posZ]} rotation={[0, -angle, 0]}>
						<mesh rotation={[-Math.PI / 2, 0, 0]}>
							<planeGeometry args={[isMethodology ? 0.035 : 0.048, length]} />
							<meshBasicMaterial
								color={color}
								transparent
								opacity={isMethodology ? 0.22 : 0.52}
								toneMapped={false}
							/>
						</mesh>
						<mesh position={[0, 0.005, -length / 2 + 0.15]}>
							<cylinderGeometry args={[0.04, 0.04, 0.015, 16]} />
							<meshBasicMaterial color={color} transparent opacity={isMethodology ? 0.4 : 0.85} toneMapped={false} />
						</mesh>
						<mesh position={[0, 0.005, length / 2 - 0.15]}>
							<cylinderGeometry args={[0.05, 0.05, 0.015, 16]} />
							<meshBasicMaterial color={color} transparent opacity={isMethodology ? 0.4 : 0.85} toneMapped={false} />
						</mesh>
					</group>
				)
			})}

			{/* ── 5. LUMINOUS ENGINEERING CORE / GLOBE (Calm, Sophisticated Hero) ── */}
			<group position={[0, 1.62, 0]} scale={[1.06, 1.06, 1.06]}>
				{/* Inner Glowing Core */}
				<mesh ref={innerCoreRef}>
					<sphereGeometry args={[0.42, 20, 20]} />
					<meshBasicMaterial color="#ffb45c" wireframe transparent opacity={0.75} toneMapped={false} />
				</mesh>

				{/* Luminous Inner Core Glow */}
				<mesh>
					<sphereGeometry args={[0.32, 16, 16]} />
					<meshBasicMaterial color="#ffb45c" toneMapped={false} />
				</mesh>

				{/* Outer Geodesic Sphere */}
				<mesh ref={coreRef}>
					<icosahedronGeometry args={[0.68, 1]} />
					<meshBasicMaterial color="#35d8ff" wireframe transparent opacity={0.60} toneMapped={false} />
				</mesh>

				{/* Orbital Data Ring 1 (Tilted 45 deg) */}
				<group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
					<mesh>
						<torusGeometry args={[0.96, 0.014, 8, 48]} />
						<meshBasicMaterial color="#35d8ff" transparent opacity={0.75} toneMapped={false} />
					</mesh>
					<mesh position={[0.96, 0, 0]}>
						<sphereGeometry args={[0.04, 8, 8]} />
						<meshBasicMaterial color="#FAF8F2" toneMapped={false} />
					</mesh>
				</group>

				{/* Orbital Data Ring 2 (Tilted -60 deg, Amber) */}
				<group ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
					<mesh>
						<torusGeometry args={[1.08, 0.012, 8, 48]} />
						<meshBasicMaterial color="#ffb45c" transparent opacity={0.65} toneMapped={false} />
					</mesh>
					<mesh position={[-1.08, 0, 0]}>
						<sphereGeometry args={[0.035, 8, 8]} />
						<meshBasicMaterial color="#ffb45c" toneMapped={false} />
					</mesh>
				</group>

				{/* Orbital Data Ring 3 (Equatorial Cyan Ring) */}
				<group ref={ring3Ref} rotation={[Math.PI / 2, 0, 0]}>
					<mesh>
						<torusGeometry args={[1.20, 0.010, 8, 48]} />
						<meshBasicMaterial color="#69e3ff" transparent opacity={0.55} toneMapped={false} />
					</mesh>
				</group>

				{/* Orbiting Mini Architectural Badges (Subtle, Restrained) */}
				<group ref={satelliteGroupRef}>
					{miniPanels.map((p, idx) => {
						const dist = 1.38
						const px = Math.cos(p.angle) * dist
						const pz = Math.sin(p.angle) * dist
						return (
							<group key={idx} position={[px, 0.04, pz]} rotation={[0, -p.angle + Math.PI / 2, 0]}>
								<mesh>
									<planeGeometry args={[0.30, 0.15]} />
									<meshBasicMaterial color="#0c1724" transparent opacity={0.78} side={THREE.DoubleSide} />
								</mesh>
								<mesh position={[0, 0, 0.002]}>
									<planeGeometry args={[0.29, 0.14]} />
									<meshBasicMaterial color={p.color} wireframe transparent opacity={0.45} />
								</mesh>
								<Text
									position={[0, 0, 0.005]}
									fontSize={0.048}
									font="/fonts/DMMono-Medium.ttf"
									letterSpacing={0.08}
									color={p.color}
									anchorX="center"
									anchorY="middle"
									material-toneMapped={false}
								>
									{p.label}
								</Text>
							</group>
						)
					})}
				</group>

				{/* Core Focal Light Emittance (Heroic focal glow) */}
				<pointLight color="#35d8ff" intensity={2.2} distance={8.0} decay={2} />
				<pointLight color="#ffb45c" intensity={1.8} distance={6.5} decay={2} />
			</group>

			{/* ── 6. HERO QUINTESYS MONUMENTAL TYPOGRAPHY (Strongest Hierarchy) ── */}
			<group position={[0, 3.60, 0]} rotation={[0, Math.PI, 0]}>
				{/* Kicker */}
				<Text
					position={[0, 0.44, 0]}
					fontSize={0.120}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.26}
					color="#ffb45c"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					PROFESSIONAL EXPERIENCE
				</Text>

				{/* Monumental Hero Title */}
				<Text
					position={[0, 0.12, 0]}
					fontSize={0.535}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.13}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.022}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					QUINTESYS
				</Text>

				{/* Subtitle / Role (8 MONTHS) */}
				<Text
					position={[0, -0.19, 0]}
					fontSize={0.128}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.15}
					color="#35d8ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.007}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					AI ENGINEERING INTERN &bull; 8 MONTHS
				</Text>
			</group>

			{/* ── 7. PROXIMITY INTERACTIVE PROMPT ── */}
			{showPrompt && (
				<group position={[0, 0.98, -1.2]} rotation={[0, Math.PI, 0]}>
					<mesh>
						<planeGeometry args={[1.35, 0.22]} />
						<meshBasicMaterial color="#08101a" transparent opacity={0.92} />
					</mesh>
					<mesh position={[0, 0, 0.002]}>
						<planeGeometry args={[1.33, 0.20]} />
						<meshBasicMaterial color="#35d8ff" wireframe transparent opacity={0.7} />
					</mesh>
					<Text
						position={[0, 0, 0.005]}
						fontSize={0.062}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.08}
						color="#35d8ff"
						anchorX="center"
						anchorY="middle"
						material-toneMapped={false}
					>
						[ E ]  EXPLORE QUINTESYS
					</Text>
				</group>
			)}

			{/* ── 8. INVISIBLE INTERACTION HIT CYLINDER ── */}
			<mesh
				position={[0, 1.4, 0]}
				onClick={(e) => {
					e.stopPropagation()
					onSelect?.(QUINTESYS_EXPERIENCE)
				}}
				onPointerDown={(e) => {
					e.stopPropagation()
					onSelect?.(QUINTESYS_EXPERIENCE)
				}}
				onPointerOver={(e) => {
					e.stopPropagation()
					setHovered(true)
					document.body.style.cursor = 'pointer'
				}}
				onPointerOut={(e) => {
					e.stopPropagation()
					setHovered(false)
					document.body.style.cursor = 'default'
				}}
			>
				<cylinderGeometry args={[1.5, 1.5, 2.8, 16]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>
		</group>
	)
}
