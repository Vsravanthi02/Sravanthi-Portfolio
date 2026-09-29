import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SOLVE_CHAMBERS } from '../../../../data/solveData'

// ============================================================================
// SOLVE CHAMBER 01 — RETRIEVAL
// Reconstructs Chamber 01 from media_1790188209235.jpg:
// - Stepped circular dais with curb inscription: FROM INFORMATION TO INSIGHT
// - Header: 01 RETRIEVAL / Finding the signal inside the noise.
// - 3D Transformation: NOISE → SIGNAL → INSIGHT
//     • Left: Scattered, turbulent floating document fragments (Noise)
//     • Center: Vertical luminous optical filter aperture window
//     • Right: Focused, ordered signal filaments converging into insight
// - Vertical pipeline rail:
//     • QUERY
//     • RETRIEVE
//     • RERANK
//     • REASON
// - Proximity activation & E / click interaction
// ============================================================================

function NoiseToSignalField({ proximityRef }) {
	const groupRef = useRef()
	const streamParticlesRef = useRef([])

	// Scattered document fragments on the left
	const docCards = useMemo(() => [
		{ pos: [-1.45, 1.85, 0.25], scale: [0.34, 0.44], rot: [0.1, 0.2, -0.15] },
		{ pos: [-1.15, 2.35, -0.10], scale: [0.30, 0.40], rot: [-0.15, 0.35, 0.1] },
		{ pos: [-1.75, 1.35, 0.15], scale: [0.32, 0.42], rot: [0.2, -0.15, 0.2] },
		{ pos: [-1.30, 1.05, 0.30], scale: [0.28, 0.38], rot: [-0.1, 0.1, -0.2] },
		{ pos: [-1.90, 2.15, -0.20], scale: [0.30, 0.40], rot: [0.05, 0.4, 0.15] }
	], [])

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximityRef.current || 0
		const speed = 1.0 + p * 1.5

		// Subtle floating turbulent movement for noisy documents
		if (groupRef.current) {
			docCards.forEach((doc, i) => {
				const child = groupRef.current.children[i]
				if (!child) return
				child.position.y = doc.pos[1] + Math.sin(t * 1.2 + i * 1.5) * 0.04
				child.rotation.z = doc.rot[2] + Math.sin(t * 0.8 + i) * 0.06
			})
		}

		// Signal stream particles focusing through the aperture
		streamParticlesRef.current.forEach((mesh, idx) => {
			if (!mesh) return
			const progress = ((t * 0.5 * speed) + idx * 0.2) % 1.0
			// Stream travels from Noise (x = -1.5) -> Aperture (x = 0) -> Insight (x = 1.2)
			const x = -1.5 + progress * 2.7
			const focus = Math.abs(x) < 0.3 ? 0.05 : (1.0 - Math.abs(x) / 1.5) * 0.35
			const y = 1.65 + Math.sin(progress * Math.PI) * 0.08
			const z = (Math.sin(idx * 2.0) * focus)
			mesh.position.set(x, y, z)
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.95
		})
	})

	return (
		<group>
			{/* 1. Left-Side Noisy Document Fragments */}
			<group ref={groupRef}>
				{docCards.map((card, i) => (
					<group key={i} position={card.pos} rotation={card.rot}>
						<mesh>
							<planeGeometry args={card.scale} />
							<meshStandardMaterial
								color="#091422"
								emissive="#35d8ff"
								emissiveIntensity={0.22}
								transparent
								opacity={0.82}
								roughness={0.4}
								metalness={0.3}
								side={THREE.DoubleSide}
							/>
						</mesh>
						<mesh position={[0, 0, 0.005]}>
							<planeGeometry args={[card.scale[0] * 0.92, card.scale[1] * 0.92]} />
							<meshBasicMaterial color="#35d8ff" wireframe transparent opacity={0.35} toneMapped={false} />
						</mesh>
					</group>
				))}
			</group>

			{/* 2. Center Vertical Optical Filter Aperture Window */}
			<group position={[0, 1.65, 0]}>
				{/* Glass Frame */}
				<mesh>
					<boxGeometry args={[0.04, 1.45, 0.95]} />
					<meshStandardMaterial
						color="#081422"
						emissive="#35d8ff"
						emissiveIntensity={0.32}
						transparent
						opacity={0.75}
						roughness={0.2}
						metalness={0.8}
					/>
				</mesh>
				{/* Luminous Aperture Rim */}
				<mesh position={[0.025, 0, 0]}>
					<planeGeometry args={[0.92, 1.42]} />
					<meshBasicMaterial color="#6fe7ff" wireframe transparent opacity={0.4} toneMapped={false} />
				</mesh>
				<pointLight color="#35d8ff" intensity={0.9} distance={3.8} position={[0.1, 0, 0]} decay={2} />
			</group>

			{/* 3. Right-Side Converging Filaments into Insight Core */}
			<group position={[1.15, 1.65, 0]}>
				{/* Insight Diamond Crystal */}
				<mesh scale={0.24}>
					<octahedronGeometry args={[1, 0]} />
					<meshStandardMaterial
						color="#0a182a"
						emissive="#ffb45c"
						emissiveIntensity={1.4}
						wireframe
					/>
				</mesh>
				<mesh scale={0.14}>
					<icosahedronGeometry args={[1, 0]} />
					<meshBasicMaterial color="#ffffff" transparent opacity={0.95} toneMapped={false} />
				</mesh>
				<pointLight color="#ffb45c" intensity={1.1} distance={4.0} decay={2} />
			</group>

			{/* 4. Stream Particles */}
			{[0, 1, 2, 3, 4].map((i) => (
				<mesh key={`p-${i}`} ref={(el) => (streamParticlesRef.current[i] = el)} position={[-1.5, 1.65, 0]}>
					<sphereGeometry args={[0.024, 8, 8]} />
					<meshBasicMaterial color={i % 2 === 0 ? '#ffb45c' : '#35d8ff'} transparent opacity={0.8} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

export default function SolveRetrieval({ playerPositionRef, onSelect }) {
	const chamber = SOLVE_CHAMBERS.retrieval
	const { position, accentColor } = chamber
	const groupRef = useRef()
	const proximityRef = useRef(0)
	const lightRef = useRef()

	// Yaw inward towards the central core [0, 0, 38.0]
	const rotationY = Math.PI + 0.35

	useFrame((_, delta) => {
		let targetProx = 0
		if (playerPositionRef?.current) {
			const px = playerPositionRef.current[0] || 0
			const pz = playerPositionRef.current[2] || 0
			const dist = Math.hypot(px - position[0], pz - position[2])
			targetProx = THREE.MathUtils.clamp(1.0 - (dist - 1.8) / 4.2, 0, 1)
		}
		proximityRef.current += (targetProx - proximityRef.current) * Math.min(1.0, delta * 3.5)
		const p = proximityRef.current

		if (lightRef.current) {
			lightRef.current.intensity = 0.4 + p * 0.95
			lightRef.current.distance = 4.5 + p * 3.0
		}
	})

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (proximityRef.current > 0.38) {
					onSelect?.(chamber)
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onSelect, chamber])

	return (
		<group
			ref={groupRef}
			position={position}
			rotation={[0, rotationY, 0]}
			onClick={(e) => {
				e.stopPropagation()
				onSelect?.(chamber)
			}}
			onPointerDown={(e) => e.stopPropagation()}
		>
			{/* Hit area for easy click interaction */}
			<mesh position={[0, 1.5, 0]}>
				<cylinderGeometry args={[3.2, 3.2, 3.2, 16]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* ── 1. STEPPED CIRCULAR MONUMENTAL DAIS ── */}
			{/* Tier 1: Wide ground plinth */}
			<mesh position={[0, 0.10, 0]} receiveShadow>
				<cylinderGeometry args={[2.5, 2.6, 0.20, 56]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.76} metalness={0.02} />
			</mesh>

			{/* Tier 2: Recessed obsidian reveal */}
			<mesh position={[0, 0.22, 0]}>
				<cylinderGeometry args={[2.32, 2.4, 0.05, 56]} />
				<meshStandardMaterial color="#0d121a" roughness={0.88} metalness={0.22} />
			</mesh>

			{/* Concentric warm amber LED ring */}
			<mesh position={[0, 0.252, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.26, 2.31, 56]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.85} toneMapped={false} />
			</mesh>

			{/* Tier 3: Inset upper platform */}
			<mesh position={[0, 0.29, 0]} receiveShadow>
				<cylinderGeometry args={[2.14, 2.26, 0.09, 56]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.74} metalness={0.02} />
			</mesh>

			{/* Inner cyan reactive energy ring */}
			<mesh position={[0, 0.342, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.8, 1.87, 56]} />
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.75} toneMapped={false} />
			</mesh>

			{/* ── 2. PLINTH CURB INSCRIPTION ── */}
			<Text
				position={[0, 0.12, 2.61]}
				fontSize={0.105}
				font="/fonts/DMMono-Medium.ttf"
				letterSpacing={0.16}
				color="#38332E"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.005}
				outlineColor="#38332E"
			>
				{chamber.inscription}
			</Text>

			{/* ── 3. OVERHEAD HEADER TYPOGRAPHY ── */}
			<group position={[0, 3.65, 0]}>
				{/* 01 Number */}
				<Text
					position={[0, 0.52, 0]}
					fontSize={0.28}
					font="/fonts/SegoeUI-Bold.ttf"
					color={accentColor}
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.010}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{chamber.number}
				</Text>

				{/* Title */}
				<Text
					position={[0, 0.22, 0]}
					fontSize={0.32}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.012}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{chamber.title}
				</Text>

				{/* Subtitle */}
				<Text
					position={[0, -0.06, 0]}
					fontSize={0.13}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.12}
					color="#69e3ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{chamber.subtitle}
				</Text>
			</group>

			{/* ── 4. 3D NOISE TO SIGNAL TRANSFORMATION ── */}
			<NoiseToSignalField proximityRef={proximityRef} />

			{/* ── 5. VERTICAL PIPELINE RAIL (Matching Reference Image) ── */}
			<group position={[1.85, 1.65, 0.2]}>
				{/* Vertical Glass Bar Base */}
				<mesh position={[0, 0, -0.02]}>
					<boxGeometry args={[0.03, 1.45, 0.08]} />
					<meshStandardMaterial color="#0c1624" roughness={0.7} />
				</mesh>

				{chamber.pipeline.map((step, idx) => {
					const y = 0.52 - idx * 0.35
					return (
						<group key={step.id} position={[0, y, 0]}>
							{/* Node Pip */}
							<mesh position={[-0.10, 0, 0]}>
								<sphereGeometry args={[0.032, 10, 10]} />
								<meshBasicMaterial color="#6fe7ff" toneMapped={false} />
							</mesh>
							{/* Step Label */}
							<Text
								position={[0.08, 0, 0]}
								fontSize={0.078}
								font="/fonts/SegoeUI-Bold.ttf"
								letterSpacing={0.08}
								color="#FAF8F2"
								anchorX="left"
								anchorY="middle"
								outlineWidth={0.004}
								outlineColor="#050a14"
								material-toneMapped={false}
							>
								{step.label}
							</Text>
						</group>
					)
				})}
			</group>

			{/* ── 6. REAL THREE.JS POINTLIGHT ── */}
			<pointLight
				ref={lightRef}
				color={accentColor}
				intensity={0.45}
				distance={5.0}
				position={[0, 2.0, 0.8]}
				decay={2}
			/>

			{/* Interactive Click / E Cue */}
			<group position={[0, 0.38, 2.2]}>
				<Text
					fontSize={0.085}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.14}
					color="#35d8ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.004}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					[ E ] EXPLORE RETRIEVAL ↗
				</Text>
			</group>
		</group>
	)
}

