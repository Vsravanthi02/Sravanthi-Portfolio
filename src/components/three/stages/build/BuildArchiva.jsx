import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { BUILD_PROJECTS } from '../../../../data/buildData'

// ============================================================================
// BUILD ARCHIVA INSTALLATION (FINAL POLISHED)
// High-clarity architectural hierarchy with reduced micro-text:
// - Stepped travertine dais with obsidian reveal & warm cove glow
// - Plinth inscription: KNOWLEDGE IN MOTION
// - Header typography:
//     01
//     ARCHIVA
//     SELF-HEALING AGENTIC RAG
// - Primary visible pipeline labels:
//     INGEST → HYBRID RETRIEVAL (BM25 + DENSE) → RRF FUSION → RERANK → REASON → REFLECT → SELF-HEAL
// - Clear reflection banner: REFLECTION CHECK / GROUNDING · CONSISTENCY · CONTRADICTION
// - Dynamic self-healing loop: SELF-HEALING LOOP (active action only on trigger)
// - Zero micro-text clutter, zero fake metrics, application-side cosine similarity
// ============================================================================

const PIPELINE_NODES = [
	{ label: 'Ingest', x: -1.8 },
	{ label: 'Retrieval', x: -1.08 },
	{ label: 'RRF & Rerank', x: -0.36 },
	{ label: 'Reason', x: 0.36 },
	{ label: 'Reflect', x: 1.08 },
	{ label: 'Self-Heal', x: 1.8 }
]

const HEALING_ACTIONS = ['REWRITE QUERY', 'INCREASE TOP-K', 'STRICT PROMPT', 'REINGEST']

// Animated packets along the front dais rail
function PipelineDataPackets({ speedMultiplier = 1.0 }) {
	const count = 4
	const packetRefs = useRef([])

	useFrame((state) => {
		const t = state.clock.elapsedTime * 0.45 * speedMultiplier
		packetRefs.current.forEach((mesh, i) => {
			if (!mesh) return
			const progress = (t + i / count) % 1.0
			const startX = -1.8
			const endX = 1.8
			mesh.position.x = startX + (endX - startX) * progress
			mesh.position.y = 0.42 + Math.sin(progress * Math.PI) * 0.04
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.95
		})
	})

	return (
		<group>
			{Array.from({ length: count }).map((_, i) => (
				<mesh
					key={i}
					ref={(el) => (packetRefs.current[i] = el)}
					position={[-1.8, 0.42, 1.45]}
				>
					<sphereGeometry args={[0.024, 8, 8]} />
					<meshBasicMaterial color="#7ee7ff" transparent opacity={0.8} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

// Ingestion Sources: Clean floating document planes without micro-text clutter
function DocumentIngestionField() {
	const groupRef = useRef()
	const docPlanes = useMemo(() => [
		{ pos: [-1.55, 2.15, 0.20], scale: [0.36, 0.48] },
		{ pos: [-1.25, 2.45, -0.15], scale: [0.32, 0.42] },
		{ pos: [-1.80, 1.70, 0.10], scale: [0.34, 0.44] },
		{ pos: [-1.35, 1.35, 0.30], scale: [0.30, 0.40] }
	], [])

	useFrame((state) => {
		if (!groupRef.current) return
		const t = state.clock.elapsedTime
		docPlanes.forEach((doc, i) => {
			const child = groupRef.current.children[i]
			if (!child) return
			child.position.y = doc.pos[1] + Math.sin(t * 1.4 + i * 1.1) * 0.04
			child.rotation.y = Math.sin(t * 0.5 + i) * 0.15
		})
	})

	return (
		<group ref={groupRef}>
			{docPlanes.map((doc, i) => (
				<group key={i} position={doc.pos}>
					<mesh>
						<planeGeometry args={doc.scale} />
						<meshStandardMaterial
							color="#091424"
							emissive="#35d8ff"
							emissiveIntensity={0.25}
							transparent
							opacity={0.82}
							roughness={0.4}
							metalness={0.3}
							side={THREE.DoubleSide}
						/>
					</mesh>
					<mesh position={[0, 0, 0.005]}>
						<planeGeometry args={[doc.scale[0] * 0.94, doc.scale[1] * 0.94]} />
						<meshBasicMaterial color="#35d8ff" wireframe transparent opacity={0.35} toneMapped={false} />
					</mesh>
				</group>
			))}

			{/* Primary INGEST Label */}
			<Text
				position={[-1.50, 2.75, 0.1]}
				fontSize={0.11}
				font="/fonts/SegoeUI-Bold.ttf"
				letterSpacing={0.14}
				color="#b2f0ff"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.005}
				outlineColor="#050a14"
				material-toneMapped={false}
			>
				INGEST
			</Text>
		</group>
	)
}

// Dual Retrieval Streams (BM25 + Dense) converging at RRF
function HybridRetrievalStreams({ speedMultiplier = 1.0 }) {
	const bm25ParticlesRef = useRef([])
	const denseParticlesRef = useRef([])

	useFrame((state) => {
		const t = state.clock.elapsedTime * 0.5 * speedMultiplier

		// BM25 Stream (Upper arc, warm gold)
		bm25ParticlesRef.current.forEach((mesh, i) => {
			if (!mesh) return
			const progress = (t + i * 0.33) % 1.0
			const x = -1.2 + progress * 1.2
			const y = 2.05 - Math.sin(progress * Math.PI) * 0.22 - (1 - progress) * 0.08
			mesh.position.set(x, y, 0.12)
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.9
		})

		// Dense Embedding Stream (Lower arc, cyan)
		denseParticlesRef.current.forEach((mesh, i) => {
			if (!mesh) return
			const progress = (t + i * 0.33) % 1.0
			const x = -1.2 + progress * 1.2
			const y = 1.48 + Math.sin(progress * Math.PI) * 0.22 + (1 - progress) * 0.08
			mesh.position.set(x, y, -0.12)
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.9
		})
	})

	return (
		<group>
			{/* BM25 Stream Guide Line */}
			<line>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={3}
						array={new Float32Array([-1.2, 1.95, 0.12, -0.6, 1.82, 0.08, 0, 1.75, 0])}
						itemSize={3}
					/>
				</bufferGeometry>
				<lineBasicMaterial color="#ffb45c" transparent opacity={0.35} />
			</line>

			{/* Dense Embeddings Stream Guide Line */}
			<line>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={3}
						array={new Float32Array([-1.2, 1.48, -0.12, -0.6, 1.62, -0.08, 0, 1.75, 0])}
						itemSize={3}
					/>
				</bufferGeometry>
				<lineBasicMaterial color="#35d8ff" transparent opacity={0.35} />
			</line>

			{/* Primary HYBRID RETRIEVAL Header */}
			<group position={[-0.75, 2.15, 0.1]}>
				<Text
					position={[0, 0.06, 0]}
					fontSize={0.082}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.10}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.004}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					HYBRID RETRIEVAL
				</Text>
				<Text
					position={[0, -0.06, 0]}
					fontSize={0.068}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.08}
					color="#ffc98a"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					BM25 + DENSE
				</Text>
			</group>

			{/* BM25 Pulse Packets */}
			{[0, 1, 2].map((i) => (
				<mesh key={`bm25-${i}`} ref={(el) => (bm25ParticlesRef.current[i] = el)}>
					<sphereGeometry args={[0.022, 8, 8]} />
					<meshBasicMaterial color="#ffb45c" transparent opacity={0.8} toneMapped={false} />
				</mesh>
			))}

			{/* Dense Pulse Packets */}
			{[0, 1, 2].map((i) => (
				<mesh key={`dense-${i}`} ref={(el) => (denseParticlesRef.current[i] = el)}>
					<sphereGeometry args={[0.022, 8, 8]} />
					<meshBasicMaterial color="#35d8ff" transparent opacity={0.8} toneMapped={false} />
				</mesh>
			))}

			{/* RRF Convergence Node */}
			<group position={[0, 1.75, 0]}>
				<mesh position={[0, -0.32, 0]}>
					<planeGeometry args={[0.78, 0.18]} />
					<meshBasicMaterial color="#0c1624" transparent opacity={0.75} />
				</mesh>
				<Text
					position={[0, -0.32, 0.01]}
					fontSize={0.075}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.12}
					color="#b8f2ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.003}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					RRF FUSION
				</Text>
			</group>
		</group>
	)
}

// Central Reasoning Core & Cross-Encoder Aperture
function CentralReasoningCore({ proximityRef, loopState }) {
	const ring1Ref = useRef()
	const ring2Ref = useRef()
	const coreCubeRef = useRef()
	const innerWorkerRef = useRef()

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximityRef.current || 0
		const speed = 0.35 + p * 0.7

		if (ring1Ref.current) ring1Ref.current.rotation.z = t * speed
		if (ring2Ref.current) {
			ring2Ref.current.rotation.z = -t * (speed * 0.85)
			ring2Ref.current.rotation.x = Math.sin(t * 0.4) * 0.25
		}
		if (coreCubeRef.current) {
			coreCubeRef.current.rotation.x = t * 0.5
			coreCubeRef.current.rotation.y = t * 0.65
		}
		if (innerWorkerRef.current) {
			innerWorkerRef.current.rotation.x = -t * 0.9
			innerWorkerRef.current.rotation.z = t * 0.8
		}
	})

	const isHealing = loopState === 'heal'

	return (
		<group position={[0, 1.75, 0]}>
			{/* RERANK Label at Top of Aperture */}
			<Text
				position={[0, 1.25, 0]}
				fontSize={0.082}
				font="/fonts/SegoeUI-Bold.ttf"
				letterSpacing={0.14}
				color="#7fe5ff"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.004}
				outlineColor="#050a14"
				material-toneMapped={false}
			>
				RERANK
			</Text>

			{/* Outer Concentric Aperture Ring (Cross-Encoder Rerank) */}
			<group ref={ring1Ref}>
				<mesh>
					<ringGeometry args={[1.36, 1.45, 64]} />
					<meshBasicMaterial
						color={isHealing ? '#ffb45c' : '#35d8ff'}
						side={THREE.DoubleSide}
						transparent
						opacity={0.8}
						toneMapped={false}
					/>
				</mesh>
				{[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
					<mesh key={i} position={[Math.cos(angle) * 1.40, Math.sin(angle) * 1.40, 0.01]} rotation={[0, 0, angle]}>
						<boxGeometry args={[0.08, 0.03, 0.02]} />
						<meshBasicMaterial color="#ffffff" toneMapped={false} />
					</mesh>
				))}
			</group>

			{/* Middle Gimbal Ring */}
			<group ref={ring2Ref} position={[0, 0, 0.02]}>
				<mesh>
					<ringGeometry args={[1.00, 1.07, 56]} />
					<meshBasicMaterial color="#69e3ff" side={THREE.DoubleSide} transparent opacity={0.7} toneMapped={false} />
				</mesh>
			</group>

			{/* Dual-Tier LLM Reasoning Core */}
			<group ref={coreCubeRef}>
				<mesh scale={0.36}>
					<octahedronGeometry args={[1, 0]} />
					<meshStandardMaterial
						color="#0a182a"
						emissive={isHealing ? '#ff9933' : '#35d8ff'}
						emissiveIntensity={1.4}
						roughness={0.12}
						metalness={0.8}
						wireframe
					/>
				</mesh>

				<group ref={innerWorkerRef}>
					<mesh scale={0.20}>
						<icosahedronGeometry args={[1, 0]} />
						<meshBasicMaterial color={isHealing ? '#ffe0b2' : '#ffffff'} transparent opacity={0.95} toneMapped={false} />
					</mesh>
				</group>

				{/* Core Light (Managed via ChapterLightRig) */}
			</group>

			{/* REASON Label below core */}
			<Text
				position={[0, -0.65, 0]}
				fontSize={0.082}
				font="/fonts/SegoeUI-Bold.ttf"
				letterSpacing={0.14}
				color="#d0f2ff"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.004}
				outlineColor="#050a14"
				material-toneMapped={false}
			>
				REASON
			</Text>
		</group>
	)
}

// Reflection & Self-Healing Loop Visualizer (Clear, non-misleading architectural labels)
function ReflectionHealingLoopVisualizer({ loopState, activeHealingAction, proximityRef }) {
	const healingPacketRef = useRef()
	const answerPacketRef = useRef()

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximityRef.current || 0

		// Reverse healing packet travelling back along the overhead arc when in 'heal' state
		if (healingPacketRef.current) {
			if (loopState === 'heal') {
				const progress = (t * 0.8 * (1.0 + p * 0.8)) % 1.0
				const angle = Math.PI * (1.0 - progress)
				const radius = 1.2
				healingPacketRef.current.position.x = Math.cos(angle) * radius - 0.35
				healingPacketRef.current.position.y = 2.45 + Math.sin(angle) * 0.45
				healingPacketRef.current.position.z = 0.2
				healingPacketRef.current.material.opacity = Math.sin(progress * Math.PI) * 0.95
			} else {
				healingPacketRef.current.material.opacity = 0
			}
		}

		// Forward answer pulse emitting outward when in 'pass' state
		if (answerPacketRef.current) {
			if (loopState === 'pass') {
				const progress = (t * 0.9) % 1.0
				answerPacketRef.current.position.set(0.8 + progress * 0.9, 1.75, 0.1)
				answerPacketRef.current.material.opacity = (1 - progress) * 0.9
			} else {
				answerPacketRef.current.material.opacity = 0
			}
		}
	})

	const isHealing = loopState === 'heal'

	return (
		<group>
			{/* Overhead Reflection Arc */}
			<line>
				<bufferGeometry>
					<bufferAttribute
						attach="attributes-position"
						count={7}
						array={new Float32Array([
							-1.6, 2.2, 0,
							-1.2, 2.7, 0,
							-0.6, 2.9, 0,
							0.0, 2.95, 0,
							0.6, 2.9, 0,
							1.2, 2.7, 0,
							1.6, 2.2, 0
						])}
						itemSize={3}
					/>
				</bufferGeometry>
				<lineBasicMaterial
					color={isHealing ? '#ffb45c' : '#35d8ff'}
					transparent
					opacity={isHealing ? 0.65 : 0.35}
				/>
			</line>

			{/* Reflection Status Banner */}
			<group position={[0, 3.12, 0]}>
				<mesh position={[0, 0, -0.01]}>
					<planeGeometry args={[2.8, 0.26]} />
					<meshBasicMaterial color="#08121f" transparent opacity={0.82} />
				</mesh>
				<mesh position={[0, 0, 0]}>
					<planeGeometry args={[2.76, 0.24]} />
					<meshBasicMaterial
						color={isHealing ? '#ffb45c' : '#35d8ff'}
						wireframe
						transparent
						opacity={0.4}
						toneMapped={false}
					/>
				</mesh>

				{isHealing ? (
					<>
						<Text
							position={[0, 0.04, 0.01]}
							fontSize={0.082}
							font="/fonts/SegoeUI-Bold.ttf"
							letterSpacing={0.12}
							color="#ffc98a"
							anchorX="center"
							anchorY="middle"
							material-toneMapped={false}
						>
							SELF-HEALING LOOP
						</Text>
						<Text
							position={[0, -0.05, 0.01]}
							fontSize={0.058}
							font="/fonts/DMMono-Medium.ttf"
							letterSpacing={0.10}
							color="#ffd8a8"
							anchorX="center"
							anchorY="middle"
							material-toneMapped={false}
						>
							ACTION: {activeHealingAction}
						</Text>
					</>
				) : (
					<>
						<Text
							position={[0, 0.04, 0.01]}
							fontSize={0.082}
							font="/fonts/SegoeUI-Bold.ttf"
							letterSpacing={0.12}
							color="#d2f4ff"
							anchorX="center"
							anchorY="middle"
							material-toneMapped={false}
						>
							REFLECTION CHECK
						</Text>
						<Text
							position={[0, -0.05, 0.01]}
							fontSize={0.054}
							font="/fonts/DMMono-Medium.ttf"
							letterSpacing={0.08}
							color="#88c8e8"
							anchorX="center"
							anchorY="middle"
							material-toneMapped={false}
						>
							GROUNDING · CONSISTENCY · CONTRADICTION
						</Text>
					</>
				)}
			</group>

			{/* Reverse Healing Data Packet */}
			<mesh ref={healingPacketRef} position={[0, 2.6, 0]}>
				<sphereGeometry args={[0.032, 10, 10]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0} toneMapped={false} />
			</mesh>

			{/* Forward Verified Answer Packets */}
			<mesh ref={answerPacketRef} position={[1.2, 1.75, 0]}>
				<sphereGeometry args={[0.028, 8, 8]} />
				<meshBasicMaterial color="#7ee7ff" transparent opacity={0} toneMapped={false} />
			</mesh>

			{/* Clean Output Beacon (No micro-text) */}
			<group position={[1.45, 1.85, 0.15]}>
				<mesh position={[0, 0, -0.01]}>
					<planeGeometry args={[0.82, 0.38]} />
					<meshStandardMaterial
						color="#081422"
						emissive="#35d8ff"
						emissiveIntensity={0.25}
						transparent
						opacity={0.78}
						side={THREE.DoubleSide}
					/>
				</mesh>
				<mesh position={[0, 0, 0]}>
					<planeGeometry args={[0.78, 0.34]} />
					<meshBasicMaterial color="#35d8ff" wireframe transparent opacity={0.3} toneMapped={false} />
				</mesh>
				<Text
					position={[0, 0.04, 0.01]}
					fontSize={0.075}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color="#b2f0ff"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					OUTPUT
				</Text>
				<Text
					position={[0, -0.07, 0.01]}
					fontSize={0.056}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.06}
					color="#80b8d8"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					ANSWER + SOURCES
				</Text>
			</group>
		</group>
	)
}

export default function BuildArchiva({ playerPositionRef, onSelect }) {
	const project = BUILD_PROJECTS.archiva
	const { position, accentColor } = project
	const groupRef = useRef()
	const lightRef = useRef()
	const proximityRef = useRef(0)

	// Orchestrated cycle state for living knowledge loop
	const [loopState, setLoopState] = useState('pass')
	const [healingActionIndex, setHealingActionIndex] = useState(0)

	// Slight yaw inward facing the promenade center
	const rotationY = Math.PI - 0.15

	useFrame((state, delta) => {
		let targetProx = 0
		if (playerPositionRef?.current) {
			const px = playerPositionRef.current[0] || 0
			const pz = playerPositionRef.current[2] || 0
			const dist = Math.hypot(px - position[0], pz - position[2])
			// Proximity response: from 5.5m down to 1.8m
			targetProx = THREE.MathUtils.clamp(1.0 - (dist - 1.8) / 3.7, 0, 1)
		}
		proximityRef.current += (targetProx - proximityRef.current) * Math.min(1.0, delta * 3.5)
		const p = proximityRef.current

		if (lightRef.current) {
			lightRef.current.intensity = 0.38 + p * 0.95
			lightRef.current.distance = 4.2 + p * 3.2
		}

		// 10-second reflection loop cycle
		const cycleTime = (state.clock.elapsedTime % 10.0)
		if (cycleTime < 5.5) {
			if (loopState !== 'pass') setLoopState('pass')
		} else {
			if (loopState !== 'heal') {
				setLoopState('heal')
				setHealingActionIndex((prev) => (prev + 1) % HEALING_ACTIONS.length)
			}
		}
	})

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (proximityRef.current > 0.38) {
					onSelect?.({ type: 'build-project', ...project })
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onSelect, project])

	return (
		<group
			ref={groupRef}
			position={position}
			rotation={[0, rotationY, 0]}
			onClick={(e) => {
				e.stopPropagation()
				onSelect?.({ type: 'build-project', ...project })
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
				<cylinderGeometry args={[2.45, 2.55, 0.20, 56]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.76} metalness={0.02} />
			</mesh>

			{/* Tier 2: Recessed obsidian reveal */}
			<mesh position={[0, 0.22, 0]}>
				<cylinderGeometry args={[2.28, 2.36, 0.05, 56]} />
				<meshStandardMaterial color="#0d121a" roughness={0.88} metalness={0.22} />
			</mesh>

			{/* Concentric warm amber LED ring */}
			<mesh position={[0, 0.252, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.22, 2.27, 56]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.75} toneMapped={false} />
			</mesh>

			{/* Tier 3: Inset upper platform */}
			<mesh position={[0, 0.29, 0]} receiveShadow>
				<cylinderGeometry args={[2.10, 2.22, 0.09, 56]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.74} metalness={0.02} />
			</mesh>

			{/* Inner cyan reactive energy ring */}
			<mesh position={[0, 0.342, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.75, 1.82, 56]} />
				<meshBasicMaterial
					color={loopState === 'heal' ? '#ffb45c' : '#35d8ff'}
					transparent
					opacity={0.65}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 2. PLINTH CURB INSCRIPTION ── */}
			<Text
				position={[0, 0.12, 2.56]}
				fontSize={0.11}
				font="/fonts/DMMono-Medium.ttf"
				letterSpacing={0.18}
				color="#38332E"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.005}
				outlineColor="#38332E"
			>
				{project.inscription}
			</Text>

			{/* ── 3. OVERHEAD HEADER TYPOGRAPHY ── */}
			<group position={[0, 3.68, 0]}>
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
					{project.number}
				</Text>

				{/* ARCHIVA Title */}
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
					{project.title}
				</Text>

				{/* Category Subtitle */}
				<Text
					position={[0, -0.06, 0]}
					fontSize={0.13}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.14}
					color="#69e3ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{project.category}
				</Text>
			</group>

			{/* ── 4. LIVING KNOWLEDGE & REASONING 3D SYSTEM ── */}
			<DocumentIngestionField />
			<HybridRetrievalStreams speedMultiplier={1.0 + (proximityRef.current || 0) * 1.5} />
			<CentralReasoningCore proximityRef={proximityRef} loopState={loopState} />
			<ReflectionHealingLoopVisualizer
				loopState={loopState}
				activeHealingAction={HEALING_ACTIONS[healingActionIndex]}
				proximityRef={proximityRef}
			/>

			{/* ── 5. PIPELINE FLOW BAR ON DAIS RIM ── */}
			<group position={[0, 0.40, 1.45]}>
				{/* Rail base */}
				<mesh position={[0, -0.01, 0]}>
					<boxGeometry args={[3.8, 0.02, 0.08]} />
					<meshStandardMaterial color="#0d121a" />
				</mesh>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[3.7, 0.008, 0.02]} />
					<meshBasicMaterial
						color={loopState === 'heal' ? '#ffb45c' : '#35d8ff'}
						transparent
						opacity={0.6}
						toneMapped={false}
					/>
				</mesh>

				{/* Pipeline Nodes */}
				{PIPELINE_NODES.map((node, i) => (
					<group key={node.label} position={[node.x, 0, 0]}>
						<mesh position={[0, 0.02, 0]}>
							<boxGeometry args={[0.56, 0.08, 0.14]} />
							<meshStandardMaterial color="#0d1826" roughness={0.7} />
						</mesh>
						<Text
							position={[0, 0.03, 0.08]}
							fontSize={0.075}
							font="/fonts/DMMono-Medium.ttf"
							letterSpacing={0.04}
							color="#FAF8F2"
							anchorX="center"
							anchorY="middle"
							outlineWidth={0.004}
							outlineColor="#050a14"
							material-toneMapped={false}
						>
							{node.label}
						</Text>
						{i < PIPELINE_NODES.length - 1 && (
							<Text
								position={[0.38, 0.03, 0.08]}
								fontSize={0.065}
								font="/fonts/DMMono-Medium.ttf"
								color="#69e3ff"
								anchorX="center"
								anchorY="middle"
								material-toneMapped={false}
							>
								→
							</Text>
						)}
					</group>
				))}

				{/* Animated moving data packets */}
				<PipelineDataPackets speedMultiplier={1.0 + (proximityRef.current || 0) * 1.8} />
			</group>

			{/* ── 6. REAL THREE.JS POINTLIGHT (Managed via ChapterLightRig) */}

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
					[ E ] EXPLORE ARCHIVA ↗
				</Text>
			</group>
		</group>
	)
}
