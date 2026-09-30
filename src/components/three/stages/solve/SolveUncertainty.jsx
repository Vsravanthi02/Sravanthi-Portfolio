import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SOLVE_CHAMBERS } from '../../../../data/solveData'

// ============================================================================
// SOLVE CHAMBER 03 — UNCERTAINTY
// Reconstructs Chamber 03:
// - Stepped circular dais with curb inscription: FROM FAILURE TO STRONGER SYSTEMS
// - Header: 03 UNCERTAINTY / Designing systems that adapt.
// - 3D Transformation: FAILURE → UNDERSTANDING → ADAPTATION → STRONGER SYSTEM
//     • Left: Fragmented, fractured dark geometric blocks (Failure & Entropy)
//     • Center: Golden adaptive filament lattice weaving across fractures (Adaptation)
//     • Right: Resilient rotating crystalline hypercube / tesseract core (Stronger System)
// - Vertical pipeline rail:
//     • INVESTIGATE
//     • ADAPT
//     • VALIDATE
//     • SOLVE
// - Proximity activation & E / click interaction
// ============================================================================

function FailureToSystemField({ proximityRef }) {
	const shardsGroupRef = useRef()
	const hypercubeRef = useRef()
	const innerCubeRef = useRef()
	const filamentLineRefs = useRef([])

	// Fragmented blocks on the left representing broken/failing components
	const shards = useMemo(() => [
		{ pos: [-1.45, 1.85, 0.15], scale: [0.32, 0.32, 0.32], rot: [0.25, 0.4, -0.3] },
		{ pos: [-1.15, 2.30, -0.12], scale: [0.26, 0.26, 0.26], rot: [-0.3, 0.5, 0.2] },
		{ pos: [-1.75, 1.35, 0.10], scale: [0.35, 0.35, 0.35], rot: [0.4, -0.2, 0.3] },
		{ pos: [-1.30, 1.05, 0.25], scale: [0.24, 0.24, 0.24], rot: [-0.2, 0.3, -0.4] },
		{ pos: [-1.85, 2.10, -0.15], scale: [0.28, 0.28, 0.28], rot: [0.1, 0.6, 0.2] }
	], [])

	// Filament connectors bridging from fragments to the hypercube
	const filamentCount = 8
	const filaments = useMemo(() => {
		return Array.from({ length: filamentCount }, (_, i) => ({
			yOffset: (i - 3.5) * 0.12,
			phase: i * 0.78,
			speed: 1.2 + (i % 3) * 0.4
		}))
	}, [])

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximityRef.current || 0
		const speed = 1.0 + p * 1.5

		// Dynamic drifting of fragmented shards
		if (shardsGroupRef.current) {
			shards.forEach((s, idx) => {
				const child = shardsGroupRef.current.children[idx]
				if (!child) return
				child.position.y = s.pos[1] + Math.sin(t * 1.1 + idx * 1.3) * 0.035
				child.rotation.x = s.rot[0] + Math.sin(t * 0.7 + idx) * 0.05
				child.rotation.y = s.rot[1] + t * 0.15
			})
		}

		// Hypercube rotation (outer and inner counter-rotation)
		if (hypercubeRef.current) {
			hypercubeRef.current.rotation.x = t * 0.35 * speed
			hypercubeRef.current.rotation.y = t * 0.55 * speed
		}
		if (innerCubeRef.current) {
			innerCubeRef.current.rotation.x = -t * 0.5 * speed
			innerCubeRef.current.rotation.y = -t * 0.7 * speed
			innerCubeRef.current.rotation.z = t * 0.3 * speed
		}

		// Adaptive filament pulses
		filamentLineRefs.current.forEach((mesh, idx) => {
			if (!mesh) return
			const item = filaments[idx]
			const progress = ((t * 0.4 * speed) + item.phase) % 1.0
			// Bridges from x = -1.2 to x = 1.2
			const x = -1.2 + progress * 2.4
			const y = 1.65 + item.yOffset + Math.sin(progress * Math.PI) * 0.1
			mesh.position.set(x, y, 0)
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.9
		})
	})

	return (
		<group>
			{/* 1. Left-Side Fragmented Shards (Entropy / Failure) */}
			<group ref={shardsGroupRef}>
				{shards.map((s, idx) => (
					<group key={idx} position={s.pos} rotation={s.rot}>
						{/* Dark Obsidian Fractured Block */}
						<mesh>
							<boxGeometry args={s.scale} />
							<meshStandardMaterial
								color="#181210"
								roughness={0.7}
								metalness={0.4}
							/>
						</mesh>
						{/* Amber Fractured Stress Edge */}
						<mesh>
							<boxGeometry args={[s.scale[0] * 1.02, s.scale[1] * 1.02, s.scale[2] * 1.02]} />
							<meshBasicMaterial color="#ff9e3b" wireframe transparent opacity={0.4} toneMapped={false} />
						</mesh>
					</group>
				))}
			</group>

			{/* 2. Center Adaptive Filament Bridge (Adaptation & Resilience) */}
			<group position={[0, 1.65, 0]}>
				{/* Horizontal Energy Guide Tubes */}
				{[-0.2, 0, 0.2].map((yOff, i) => (
					<mesh key={i} position={[0, yOff, 0]} rotation={[0, 0, Math.PI / 2]}>
						<cylinderGeometry args={[0.006, 0.006, 2.2, 8]} />
						<meshBasicMaterial color="#ffa040" transparent opacity={0.25} toneMapped={false} />
					</mesh>
				))}

				{/* Flowing Pulse Nodes */}
				{filaments.map((_, i) => (
					<mesh key={i} ref={(el) => (filamentLineRefs.current[i] = el)}>
						<sphereGeometry args={[0.024, 8, 8]} />
						<meshBasicMaterial color="#ffc070" toneMapped={false} transparent opacity={0.8} />
					</mesh>
				))}
			</group>

			{/* 3. Right-Side Resilient Crystalline Hypercube (Stronger System) */}
			<group position={[1.35, 1.65, 0]}>
				{/* Outer Wireframe Cube */}
				<group ref={hypercubeRef}>
					<mesh>
						<boxGeometry args={[0.72, 0.72, 0.72]} />
						<meshStandardMaterial
							color="#201710"
							roughness={0.2}
							metalness={0.8}
							transparent
							opacity={0.35}
						/>
					</mesh>
					<mesh>
						<boxGeometry args={[0.74, 0.74, 0.74]} />
						<meshBasicMaterial color="#ffb45c" wireframe toneMapped={false} transparent opacity={0.85} />
					</mesh>
				</group>

				{/* Inner Nested Crystalline Core */}
				<group ref={innerCubeRef}>
					<mesh>
						<octahedronGeometry args={[0.30]} />
						<meshStandardMaterial
							color="#ffa040"
							emissive="#ffa040"
							emissiveIntensity={0.6}
							roughness={0.1}
							metalness={0.9}
						/>
					</mesh>
					<mesh>
						<octahedronGeometry args={[0.33]} />
						<meshBasicMaterial color="#ffffff" wireframe toneMapped={false} transparent opacity={0.6} />
					</mesh>
				</group>

				{/* Aura Sphere */}
				<mesh>
					<sphereGeometry args={[0.55, 16, 16]} />
					<meshBasicMaterial color="#ffb45c" transparent opacity={0.08} side={THREE.BackSide} toneMapped={false} />
				</mesh>
			</group>
		</group>
	)
}

export default function SolveUncertainty({ playerPositionRef, onSelect }) {
	const chamber = SOLVE_CHAMBERS.uncertainty
	const { position, accentColor } = chamber
	const groupRef = useRef()
	const proximityRef = useRef(0)
	const lightRef = useRef()

	// Yaw symmetrically inward towards the central core [0, 0, 38.0]
	const rotationY = Math.PI - 0.35

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
			onPointerOver={(e) => {
				e.stopPropagation()
				document.body.style.cursor = 'pointer'
			}}
			onPointerOut={() => {
				document.body.style.cursor = 'auto'
			}}
		>
			{/* Hit target for easy clicking */}
			<mesh position={[0, 1.6, 0]} visible={false}>
				<boxGeometry args={[4.2, 3.2, 2.2]} />
				<meshBasicMaterial transparent opacity={0} />
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

			{/* Inner warm reactive energy ring */}
			<mesh position={[0, 0.342, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.8, 1.87, 56]} />
				<meshBasicMaterial color="#ff9e3b" transparent opacity={0.75} toneMapped={false} />
			</mesh>

			{/* ── 2. PLINTH CURB INSCRIPTION ── */}
			<Text
				position={[0, 0.12, 2.61]}
				fontSize={0.10}
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
				{/* 03 Number */}
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
					fontSize={0.20}
					maxWidth={3.6}
					textAlign="center"
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.05}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.010}
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
					color="#ffc685"
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

			{/* ── 4. 3D FAILURE TO SYSTEM TRANSFORMATION ── */}
			<FailureToSystemField proximityRef={proximityRef} />

			{/* ── 5. VERTICAL PIPELINE RAIL (Matching Reference Image) ── */}
			<group position={[1.85, 1.65, 0.2]}>
				{/* Vertical Glass Bar Base */}
				<mesh position={[0, 0, -0.02]}>
					<boxGeometry args={[0.03, 1.45, 0.08]} />
					<meshStandardMaterial color="#1a120a" roughness={0.7} />
				</mesh>

				{chamber.pipeline.map((step, idx) => {
					const y = 0.52 - idx * 0.35
					return (
						<group key={step.id} position={[0, y, 0]}>
							{/* Node Pip */}
							<mesh position={[-0.10, 0, 0]}>
								<sphereGeometry args={[0.032, 10, 10]} />
								<meshBasicMaterial color="#ffb45c" toneMapped={false} />
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
					color="#ffb45c"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.004}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					[ E ] EXPLORE CHAMBER 03 ↗
				</Text>
			</group>
		</group>
	)
}

