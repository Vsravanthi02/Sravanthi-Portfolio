import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { BUILD_PROJECTS } from '../../../../data/buildData'

// ============================================================================
// BUILD EXPRESSION & SIGN LANGUAGE DETECTION INSTALLATION (FINAL POLISHED)
// High-clarity architectural hierarchy with reduced micro-text:
// - Stepped travertine dais with obsidian reveal & warm cove glow
// - Plinth inscription: HUMAN SIGNALS. MACHINE UNDERSTANDING.
// - Header typography:
//     02
//     EXPRESSION & SIGN LANGUAGE
//     DETECTION
//     COMPUTER VISION / HUMAN PERCEPTION
// - 3D facial landmark mesh (MediaPipe Holistic face tracking)
// - DUAL articulated skeletal hands (Left hand & Right hand gesture landmarks)
// - 3D Feedforward Dense Neural Network: DENSE 512 → 256
// - Live classification HUD: CLASS OUTPUT / HELLO / CONCEPTUAL VISUALIZATION
// - Zero micro-labels, zero fake percentages, zero "HIGH CONFIDENCE" claims
// ============================================================================

const VISION_PIPELINE_NODES = [
	{ label: 'Webcam Input', x: -1.8 },
	{ label: 'MediaPipe Holistic', x: -0.9 },
	{ label: 'Normalized Features', x: 0 },
	{ label: 'Dense 512→256', x: 0.9 },
	{ label: 'Softmax Output', x: 1.8 }
]

const SAMPLE_CLASSES = [
	'HELLO',
	'THANKS',
	'PLEASE',
	'STOP',
	'ANGRY',
	'LAUGH'
]

function VisionPipelinePackets({ speedMultiplier = 1.0 }) {
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
					<meshBasicMaterial color="#a6f0ff" transparent opacity={0.8} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

// MediaPipe 3D Facial Landmark Mesh
function HolographicFaceMesh({ proximityRef }) {
	const headGroupRef = useRef()
	const scannerRingRef = useRef()

	const { landmarks, connections, linesGeo } = useMemo(() => {
		const pts = []
		const conns = []

		// 1. Jawline contour (17 points)
		for (let i = 0; i <= 16; i++) {
			const theta = Math.PI * 0.15 + (i / 16) * Math.PI * 0.70
			const r = 0.62
			const x = Math.cos(theta) * r
			const y = 0.58 - Math.sin(theta) * 0.78
			const z = Math.sin((i / 16) * Math.PI) * 0.15
			pts.push([x, y, z])
			if (i > 0) conns.push([pts[i - 1], pts[i]])
		}

		// 2. Left Eye (6 points)
		const leftEyeStart = pts.length
		const leftEye = [
			[-0.26, 0.55, 0.20], [-0.20, 0.58, 0.23], [-0.12, 0.56, 0.22],
			[-0.12, 0.51, 0.20], [-0.20, 0.49, 0.21], [-0.26, 0.53, 0.20]
		]
		leftEye.forEach(p => pts.push(p))
		for (let i = 0; i < 6; i++) conns.push([pts[leftEyeStart + i], pts[leftEyeStart + ((i + 1) % 6)]])

		// 3. Right Eye (6 points)
		const rightEyeStart = pts.length
		const rightEye = [
			[0.12, 0.56, 0.22], [0.20, 0.58, 0.23], [0.26, 0.55, 0.20],
			[0.26, 0.53, 0.20], [0.20, 0.49, 0.21], [0.12, 0.51, 0.20]
		]
		rightEye.forEach(p => pts.push(p))
		for (let i = 0; i < 6; i++) conns.push([pts[rightEyeStart + i], pts[rightEyeStart + ((i + 1) % 6)]])

		// 4. Nose Bridge (5 points)
		const noseStart = pts.length
		const nose = [
			[0.00, 0.58, 0.24],
			[0.00, 0.46, 0.32],
			[0.00, 0.36, 0.36],
			[-0.09, 0.32, 0.28],
			[0.09, 0.32, 0.28]
		]
		nose.forEach(p => pts.push(p))
		conns.push([pts[noseStart], pts[noseStart + 1]])
		conns.push([pts[noseStart + 1], pts[noseStart + 2]])
		conns.push([pts[noseStart + 2], pts[noseStart + 3]])
		conns.push([pts[noseStart + 2], pts[noseStart + 4]])

		// 5. Lips (8 points)
		const mouthStart = pts.length
		const mouth = [
			[-0.18, 0.16, 0.22], [-0.08, 0.20, 0.28], [0.00, 0.21, 0.30], [0.08, 0.20, 0.28], [0.18, 0.16, 0.22],
			[0.10, 0.11, 0.26], [0.00, 0.09, 0.28], [-0.10, 0.11, 0.26]
		]
		mouth.forEach(p => pts.push(p))
		for (let i = 0; i < 8; i++) conns.push([pts[mouthStart + i], pts[mouthStart + ((i + 1) % 8)]])

		const linePositions = []
		conns.forEach(([p1, p2]) => {
			linePositions.push(...p1, ...p2)
		})
		const linesGeo = new THREE.BufferGeometry()
		linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

		return { landmarks: pts, connections: conns, linesGeo }
	}, [])

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximityRef.current || 0

		if (headGroupRef.current) {
			headGroupRef.current.position.y = 1.62 + Math.sin(t * 1.5) * 0.03
			headGroupRef.current.rotation.y = Math.sin(t * 0.7) * 0.15
		}
		if (scannerRingRef.current) {
			scannerRingRef.current.position.y = 0.05 + ((t * 0.6) % 1.3)
			scannerRingRef.current.rotation.z = t * (0.8 + p * 1.6)
		}
	})

	return (
		<group ref={headGroupRef} position={[0, 1.62, 0]}>
			{/* Scanner Horizontal Laser Ring */}
			<mesh ref={scannerRingRef} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.70, 0.76, 48]} />
				<meshBasicMaterial color="#6fe7ff" transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
			</mesh>

			{/* Facial Landmark Points */}
			{landmarks.map((pos, idx) => (
				<mesh key={idx} position={pos}>
					<sphereGeometry args={[0.020, 8, 8]} />
					<meshBasicMaterial color="#ffffff" toneMapped={false} />
				</mesh>
			))}

			{/* Connective Landmark Wireframe Lines (Single Draw Call) */}
			<lineSegments geometry={linesGeo}>
				<lineBasicMaterial color="#35d8ff" transparent opacity={0.65} />
			</lineSegments>

			{/* Holographic Wireframe Cage */}
			<mesh position={[0, 0.38, 0]} scale={[0.58, 0.82, 0.62]}>
				<sphereGeometry args={[1, 18, 14]} />
				<meshStandardMaterial
					color="#081828"
					emissive="#35d8ff"
					emissiveIntensity={0.25}
					wireframe
					transparent
					opacity={0.25}
				/>
			</mesh>
		</group>
	)
}

// Articulated Skeletal Hand (Clean geometry, no tiny text clutter)
function SkeletalHand({ isLeft = true, position = [-1.3, 1.45, 0.15] }) {
	const handRef = useRef()
	const sign = isLeft ? 1 : -1

	const fingers = useMemo(() => [
		// Wrist / Palm base
		{ joints: [[0, 0, 0], [sign * -0.06, 0.10, 0.04], [sign * 0.06, 0.10, 0.04], [0, 0.18, 0.06]] },
		// Thumb
		{ joints: [[sign * -0.06, 0.10, 0.04], [sign * -0.15, 0.18, 0.10], [sign * -0.22, 0.26, 0.13], [sign * -0.27, 0.34, 0.16]] },
		// Index
		{ joints: [[sign * -0.06, 0.20, 0.06], [sign * -0.08, 0.34, 0.11], [sign * -0.09, 0.46, 0.14], [sign * -0.10, 0.58, 0.16]] },
		// Middle
		{ joints: [[0.00, 0.21, 0.06], [0.00, 0.36, 0.12], [0.00, 0.50, 0.15], [0.00, 0.62, 0.17]] },
		// Ring
		{ joints: [[sign * 0.06, 0.20, 0.06], [sign * 0.08, 0.34, 0.11], [sign * 0.09, 0.45, 0.13], [sign * 0.10, 0.54, 0.15]] },
		// Pinky
		{ joints: [[sign * 0.12, 0.18, 0.05], [sign * 0.16, 0.27, 0.08], [sign * 0.19, 0.37, 0.10], [sign * 0.21, 0.45, 0.12]] }
	], [sign])

	const bonesGeo = useMemo(() => {
		const positions = []
		fingers.forEach((f) => {
			f.joints.slice(0, -1).forEach((j1, jIdx) => {
				const j2 = f.joints[jIdx + 1]
				positions.push(...j1, ...j2)
			})
		})
		const geo = new THREE.BufferGeometry()
		geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
		return geo
	}, [fingers])

	useFrame((state) => {
		if (handRef.current) {
			const t = state.clock.elapsedTime
			handRef.current.position.y = position[1] + Math.sin(t * 1.6 + (isLeft ? 0 : 1.2)) * 0.03
			handRef.current.rotation.z = Math.sin(t * 0.8 + (isLeft ? 0 : Math.PI)) * 0.05
		}
	})

	return (
		<group ref={handRef} position={position}>
			{/* Hand Backdrop Panel */}
			<mesh position={[0, 0.30, -0.05]}>
				<planeGeometry args={[0.64, 0.85]} />
				<meshStandardMaterial
					color="#081422"
					emissive="#35d8ff"
					emissiveIntensity={0.16}
					transparent
					opacity={0.65}
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[0, 0.30, -0.045]}>
				<planeGeometry args={[0.60, 0.81]} />
				<meshBasicMaterial color="#6fe7ff" wireframe transparent opacity={0.3} toneMapped={false} />
			</mesh>

			{/* Finger Joints */}
			{fingers.map((f, fIdx) => (
				<group key={fIdx}>
					{f.joints.map((joint, jIdx) => (
						<mesh key={jIdx} position={joint}>
							<sphereGeometry args={[0.016, 8, 8]} />
							<meshBasicMaterial color="#6fe7ff" toneMapped={false} />
						</mesh>
					))}
				</group>
			))}

			{/* Slender Bone Segments (Single Draw Call) */}
			<lineSegments geometry={bonesGeo}>
				<lineBasicMaterial color="#ffffff" transparent opacity={0.7} />
			</lineSegments>
		</group>
	)
}

// 3D Feedforward Dense Neural Network Visualizer (Clean lattice, no micro-labels)
function DenseNeuralNetwork3D({ proximityRef }) {
	const networkGroupRef = useRef()
	const pulsesRef = useRef([])

	const layers = useMemo(() => [
		{ count: 6, x: -0.65, ySpan: 0.65 },
		{ count: 10, x: -0.15, ySpan: 0.85 },
		{ count: 7, x: 0.25, ySpan: 0.70 },
		{ count: 4, x: 0.65, ySpan: 0.50 }
	], [])

	const synapsesGeo = useMemo(() => {
		const positions = []
		layers.slice(0, -1).forEach((l1, lIdx) => {
			const l2 = layers[lIdx + 1]
			const maxCount = Math.min(l1.count, 4)
			for (let i = 0; i < maxCount; i++) {
				const y1 = 0.38 - (l1.ySpan / 2) + (i / 3) * l1.ySpan
				const y2 = 0.38 - (l2.ySpan / 2) + ((i % 3) / 2) * l2.ySpan
				positions.push(l1.x, y1, 0, l2.x, y2, 0)
			}
		})
		const geo = new THREE.BufferGeometry()
		geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
		return geo
	}, [layers])

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximityRef.current || 0
		const speed = 1.0 + p * 1.5

		pulsesRef.current.forEach((mesh, idx) => {
			if (!mesh) return
			const progress = ((t * 0.8 * speed) + idx * 0.25) % 1.0
			mesh.position.x = -0.65 + progress * 1.3
			mesh.position.y = 0.35 + Math.sin(progress * Math.PI) * 0.08
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.95
		})
	})

	return (
		<group ref={networkGroupRef} position={[0, 2.22, -0.3]}>
			{/* Backdrop Network Frame */}
			<mesh position={[0, 0.38, -0.05]}>
				<planeGeometry args={[1.70, 1.15]} />
				<meshStandardMaterial
					color="#071220"
					emissive="#35d8ff"
					emissiveIntensity={0.12}
					transparent
					opacity={0.8}
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[0, 0.38, -0.045]}>
				<planeGeometry args={[1.66, 1.11]} />
				<meshBasicMaterial color="#6fe7ff" wireframe transparent opacity={0.25} toneMapped={false} />
			</mesh>

			{/* Clean Primary Network Header */}
			<Text
				position={[0, 0.88, 0]}
				fontSize={0.078}
				font="/fonts/SegoeUI-Bold.ttf"
				color="#a6f0ff"
				letterSpacing={0.12}
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.004}
				outlineColor="#050a14"
				material-toneMapped={false}
			>
				DENSE 512 → 256
			</Text>

			{/* Layer Nodes */}
			{layers.map((layer, lIdx) => (
				<group key={lIdx}>
					{Array.from({ length: layer.count }).map((_, nodeIdx) => {
						const y = 0.38 - (layer.ySpan / 2) + (nodeIdx / (layer.count - 1)) * layer.ySpan
						return (
							<mesh key={nodeIdx} position={[layer.x, y, 0]}>
								<sphereGeometry args={[0.018, 8, 8]} />
								<meshBasicMaterial color="#6fe7ff" toneMapped={false} />
							</mesh>
						)
					})}
				</group>
			))}

			{/* Synapse Connection Lines (Single Draw Call) */}
			<lineSegments geometry={synapsesGeo}>
				<lineBasicMaterial color="#35d8ff" transparent opacity={0.22} />
			</lineSegments>

			{/* Synapse Activation Pulses */}
			{[0, 1, 2, 3].map((i) => (
				<mesh key={`pulse-${i}`} ref={(el) => (pulsesRef.current[i] = el)} position={[-0.65, 0.38, 0.02]}>
					<sphereGeometry args={[0.022, 8, 8]} />
					<meshBasicMaterial color="#ffffff" transparent opacity={0} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

// Live Classification Prediction HUD (Clear, conceptual, zero fake accuracy/percentages)
function LiveClassificationHUD({ activeClassName }) {
	return (
		<group position={[1.42, 2.22, 0.1]}>
			<mesh position={[0, 0, -0.01]}>
				<planeGeometry args={[1.05, 0.62]} />
				<meshStandardMaterial
					color="#081422"
					emissive="#35d8ff"
					emissiveIntensity={0.22}
					transparent
					opacity={0.82}
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[0, 0, 0]}>
				<planeGeometry args={[1.01, 0.58]} />
				<meshBasicMaterial color="#6fe7ff" wireframe transparent opacity={0.35} toneMapped={false} />
			</mesh>

			{/* Kicker */}
			<Text
				position={[0, 0.18, 0.01]}
				fontSize={0.062}
				font="/fonts/DMMono-Medium.ttf"
				color="#7ce8ff"
				letterSpacing={0.12}
				anchorX="center"
				anchorY="middle"
				material-toneMapped={false}
			>
				CLASS OUTPUT
			</Text>

			{/* Predicted Gesture Name */}
			<Text
				position={[0, 0.02, 0.01]}
				fontSize={0.125}
				font="/fonts/SegoeUI-Bold.ttf"
				letterSpacing={0.08}
				color="#ffffff"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.006}
				outlineColor="#050a14"
				material-toneMapped={false}
			>
				{activeClassName}
			</Text>

			{/* Conceptual Visualization Note */}
			<Text
				position={[0, -0.16, 0.01]}
				fontSize={0.048}
				font="/fonts/DMMono-Medium.ttf"
				color="#88a8c8"
				letterSpacing={0.08}
				anchorX="center"
				anchorY="middle"
				material-toneMapped={false}
			>
				CONCEPTUAL VISUALIZATION
			</Text>
		</group>
	)
}

export default function BuildVision({ playerPositionRef, onSelect }) {
	const project = BUILD_PROJECTS.vision
	const { position, accentColor } = project
	const groupRef = useRef()
	const lightRef = useRef()
	const proximityRef = useRef(0)

	// Live cycling class state
	const [classIdx, setClassIdx] = useState(0)

	// Slight yaw inward facing the promenade center
	const rotationY = Math.PI + 0.15

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

		// Cycle class every 3.2 seconds
		const nextIdx = Math.floor((state.clock.elapsedTime / 3.2) % SAMPLE_CLASSES.length)
		if (nextIdx !== classIdx) {
			setClassIdx(nextIdx)
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

	const currentClass = SAMPLE_CLASSES[classIdx]

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
			{/* Large hit area for easy click interaction */}
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
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.65} toneMapped={false} />
			</mesh>

			{/* ── 2. PLINTH CURB INSCRIPTION ── */}
			<Text
				position={[0, 0.12, 2.56]}
				fontSize={0.10}
				font="/fonts/DMMono-Medium.ttf"
				letterSpacing={0.16}
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
				{/* 02 Number */}
				<Text
					position={[0, 0.62, 0]}
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

				{/* Title: Line 1 */}
				<Text
					position={[0, 0.34, 0]}
					fontSize={0.23}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.010}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					EXPRESSION & SIGN LANGUAGE
				</Text>

				{/* Title: Line 2 */}
				<Text
					position={[0, 0.12, 0]}
					fontSize={0.23}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.010}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					DETECTION
				</Text>

				{/* Category Subtitle */}
				<Text
					position={[0, -0.14, 0]}
					fontSize={0.12}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.14}
					color="#6fe7ff"
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

			{/* ── 4. COMPUTER VISION 3D SYSTEM ── */}
			{/* Central Face Mesh */}
			<HolographicFaceMesh proximityRef={proximityRef} />

			{/* DUAL Articulated Skeletal Hands: Left Hand & Right Hand */}
			<SkeletalHand isLeft={true} position={[-1.3, 1.45, 0.15]} />
			<SkeletalHand isLeft={false} position={[1.3, 1.45, 0.15]} />

			{/* 3D Dense Neural Network Visualizer */}
			<DenseNeuralNetwork3D proximityRef={proximityRef} />

			{/* Live Holographic Classification HUD */}
			<LiveClassificationHUD activeClassName={currentClass} />

			{/* ── 5. PIPELINE FLOW BAR ON DAIS RIM ── */}
			<group position={[0, 0.40, 1.45]}>
				{/* Rail base */}
				<mesh position={[0, -0.01, 0]}>
					<boxGeometry args={[4.2, 0.02, 0.08]} />
					<meshStandardMaterial color="#0d121a" />
				</mesh>
				<mesh position={[0, 0, 0]}>
					<boxGeometry args={[4.1, 0.008, 0.02]} />
					<meshBasicMaterial color="#35d8ff" transparent opacity={0.6} toneMapped={false} />
				</mesh>

				{/* Pipeline Nodes */}
				{VISION_PIPELINE_NODES.map((node, i) => (
					<group key={node.label} position={[node.x, 0, 0]}>
						<mesh position={[0, 0.02, 0]}>
							<boxGeometry args={[0.66, 0.08, 0.14]} />
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
						{i < VISION_PIPELINE_NODES.length - 1 && (
							<Text
								position={[0.45, 0.03, 0.08]}
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
				<VisionPipelinePackets speedMultiplier={1.0 + (proximityRef.current || 0) * 1.8} />
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
					[ E ] EXPLORE VISION ↗
				</Text>
			</group>
		</group>
	)
}
