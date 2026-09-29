import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SOLVE_CHAMBERS } from '../../../../data/solveData'

// ============================================================================
// SOLVE CHAMBER 02 — PERCEPTION
// Reconstructs Chamber 02 from media_1790188209235.jpg:
// - Stepped circular dais with curb inscription: FROM SIGNALS TO MEANING
// - Header: 02 PERCEPTION / Understanding human signals.
// - 3D Transformation: SIGNALS → STRUCTURE → MEANING
//     • Center: Luminous cyan 3D wireframe head & facial landmark network
//     • Flanks: Dual articulated skeletal hands tracking gestures
//     • Data: Raw visual particles structuring into normalized vectors
// - Vertical pipeline rail:
//     • RAW INPUT
//     • LANDMARKS
//     • FEATURES
//     • REPRESENTATION
//     • CLASSIFICATION
// ============================================================================

function PerceptionMeshTransform({ proximityRef }) {
	const headGroupRef = useRef()
	const scannerRingRef = useRef()
	const rawParticleRefs = useRef([])

	// Facial landmark topology
	const { landmarks, connections, landmarkLinesGeo } = useMemo(() => {
		const pts = []
		const conns = []

		for (let i = 0; i <= 16; i++) {
			const theta = Math.PI * 0.15 + (i / 16) * Math.PI * 0.70
			const r = 0.65
			const x = Math.cos(theta) * r
			const y = 0.60 - Math.sin(theta) * 0.82
			const z = Math.sin((i / 16) * Math.PI) * 0.16
			pts.push([x, y, z])
			if (i > 0) conns.push([pts[i - 1], pts[i]])
		}

		// Eye sockets
		const leftEyeStart = pts.length
		const leftEye = [
			[-0.26, 0.58, 0.20], [-0.20, 0.61, 0.23], [-0.12, 0.59, 0.22],
			[-0.12, 0.54, 0.20], [-0.20, 0.52, 0.21], [-0.26, 0.56, 0.20]
		]
		leftEye.forEach(p => pts.push(p))
		for (let i = 0; i < 6; i++) conns.push([pts[leftEyeStart + i], pts[leftEyeStart + ((i + 1) % 6)]])

		const rightEyeStart = pts.length
		const rightEye = [
			[0.12, 0.59, 0.22], [0.20, 0.61, 0.23], [0.26, 0.58, 0.20],
			[0.26, 0.56, 0.20], [0.20, 0.52, 0.21], [0.12, 0.54, 0.20]
		]
		rightEye.forEach(p => pts.push(p))
		for (let i = 0; i < 6; i++) conns.push([pts[rightEyeStart + i], pts[rightEyeStart + ((i + 1) % 6)]])

		// Nose ridge
		const noseStart = pts.length
		const nose = [
			[0.00, 0.60, 0.24],
			[0.00, 0.48, 0.32],
			[0.00, 0.38, 0.36],
			[-0.09, 0.34, 0.28],
			[0.09, 0.34, 0.28]
		]
		nose.forEach(p => pts.push(p))
		conns.push([pts[noseStart], pts[noseStart + 1]])
		conns.push([pts[noseStart + 1], pts[noseStart + 2]])
		conns.push([pts[noseStart + 2], pts[noseStart + 3]])
		conns.push([pts[noseStart + 2], pts[noseStart + 4]])

		// Lips
		const mouthStart = pts.length
		const mouth = [
			[-0.18, 0.18, 0.22], [-0.08, 0.22, 0.28], [0.00, 0.23, 0.30], [0.08, 0.22, 0.28], [0.18, 0.18, 0.22],
			[0.10, 0.13, 0.26], [0.00, 0.11, 0.28], [-0.10, 0.13, 0.26]
		]
		mouth.forEach(p => pts.push(p))
		for (let i = 0; i < 8; i++) conns.push([pts[mouthStart + i], pts[mouthStart + ((i + 1) % 8)]])

		const linePositions = []
		conns.forEach(([p1, p2]) => {
			linePositions.push(...p1, ...p2)
		})
		const landmarkLinesGeo = new THREE.BufferGeometry()
		landmarkLinesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

		return { landmarks: pts, connections: conns, landmarkLinesGeo }
	}, [])

	// Articulated dual hands
	const handFingers = useMemo(() => [
		{ joints: [[0, 0, 0], [-0.06, 0.10, 0.04], [0.06, 0.10, 0.04], [0, 0.18, 0.06]] },
		{ joints: [[-0.06, 0.10, 0.04], [-0.15, 0.18, 0.10], [-0.22, 0.26, 0.13], [-0.27, 0.34, 0.16]] },
		{ joints: [[-0.06, 0.20, 0.06], [-0.08, 0.34, 0.11], [-0.09, 0.46, 0.14], [-0.10, 0.58, 0.16]] },
		{ joints: [[0.00, 0.21, 0.06], [0.00, 0.36, 0.12], [0.00, 0.50, 0.15], [0.00, 0.62, 0.17]] },
		{ joints: [[0.06, 0.20, 0.06], [0.08, 0.34, 0.11], [0.09, 0.45, 0.13], [0.10, 0.54, 0.15]] },
		{ joints: [[0.12, 0.18, 0.05], [0.16, 0.27, 0.08], [0.19, 0.37, 0.10], [0.21, 0.45, 0.12]] }
	], [])

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const p = proximityRef.current || 0
		const speed = 1.0 + p * 1.5

		if (headGroupRef.current) {
			headGroupRef.current.position.y = 1.55 + Math.sin(t * 1.4) * 0.03
			headGroupRef.current.rotation.y = Math.sin(t * 0.7) * 0.12
		}
		if (scannerRingRef.current) {
			scannerRingRef.current.position.y = 0.05 + ((t * 0.55 * speed) % 1.25)
			scannerRingRef.current.rotation.z = t * (0.8 + p * 1.6)
		}

		// Raw signal particles converging into landmarks
		rawParticleRefs.current.forEach((mesh, idx) => {
			if (!mesh) return
			const progress = ((t * 0.4 * speed) + idx * 0.16) % 1.0
			const angle = (idx / 6) * Math.PI * 2 + t * 0.3
			const startR = 1.8
			const endR = 0.5
			const currentR = startR + (endR - startR) * progress
			mesh.position.set(
				Math.cos(angle) * currentR,
				1.55 + Math.sin(progress * Math.PI * 2) * 0.2,
				Math.sin(angle) * currentR
			)
			mesh.material.opacity = Math.sin(progress * Math.PI) * 0.85
		})
	})

	return (
		<group>
			{/* 1. Central 3D Facial Landmark Mesh */}
			<group ref={headGroupRef} position={[0, 1.55, 0]}>
				{/* Horizontal Laser Scanning Ring */}
				<mesh ref={scannerRingRef} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[0.68, 0.74, 48]} />
					<meshBasicMaterial color="#6fe7ff" transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
				</mesh>

				{/* 48 Landmark Tracking Nodes */}
				{landmarks.map((pos, idx) => (
					<mesh key={idx} position={pos}>
						<sphereGeometry args={[0.018, 8, 8]} />
						<meshBasicMaterial color="#ffffff" toneMapped={false} />
					</mesh>
				))}

				{/* Connective Cybernetic Wireframe Lines (Single Draw Call) */}
				<lineSegments geometry={landmarkLinesGeo}>
					<lineBasicMaterial color="#35d8ff" transparent opacity={0.65} />
				</lineSegments>

				{/* Holographic Wireframe Cage */}
				<mesh position={[0, 0.36, 0]} scale={[0.55, 0.78, 0.58]}>
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

			{/* 2. Dual Articulated Skeletal Hands */}
			{[-1.25, 1.25].map((x, handIdx) => (
				<group key={handIdx} position={[x, 1.45, 0.1]}>
					<mesh position={[0, 0.28, -0.04]}>
						<planeGeometry args={[0.60, 0.80]} />
						<meshStandardMaterial
							color="#081422"
							emissive="#35d8ff"
							emissiveIntensity={0.16}
							transparent
							opacity={0.6}
							side={THREE.DoubleSide}
						/>
					</mesh>
					<mesh position={[0, 0.28, -0.035]}>
						<planeGeometry args={[0.56, 0.76]} />
						<meshBasicMaterial color="#6fe7ff" wireframe transparent opacity={0.28} toneMapped={false} />
					</mesh>

					{/* Joints & Bones */}
					{handFingers.map((f, fIdx) => (
						<group key={fIdx}>
							{f.joints.map((joint, jIdx) => (
								<mesh key={jIdx} position={[joint[0] * (handIdx === 0 ? 1 : -1), joint[1], joint[2]]}>
									<sphereGeometry args={[0.015, 8, 8]} />
									<meshBasicMaterial color="#6fe7ff" toneMapped={false} />
								</mesh>
							))}
						</group>
					))}
				</group>
			))}

			{/* 3. Raw Signal Inbound Particles */}
			{[0, 1, 2, 3, 4, 5].map((i) => (
				<mesh key={`sp-${i}`} ref={(el) => (rawParticleRefs.current[i] = el)} position={[0, 1.55, 0]}>
					<sphereGeometry args={[0.022, 6, 6]} />
					<meshBasicMaterial color="#a6f0ff" transparent opacity={0.7} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

export default function SolvePerception({ playerPositionRef, onSelect }) {
	const chamber = SOLVE_CHAMBERS.perception
	const { position, accentColor } = chamber
	const groupRef = useRef()
	const proximityRef = useRef(0)
	const lightRef = useRef()

	// Facing directly forward into the rotunda center
	const rotationY = Math.PI

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
			<mesh position={[0, 1.5, 0]}>
				<cylinderGeometry args={[3.2, 3.2, 3.2, 16]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* ── 1. STEPPED CIRCULAR MONUMENTAL DAIS ── */}
			<mesh position={[0, 0.10, 0]} receiveShadow>
				<cylinderGeometry args={[2.5, 2.6, 0.20, 56]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.76} metalness={0.02} />
			</mesh>

			<mesh position={[0, 0.22, 0]}>
				<cylinderGeometry args={[2.32, 2.4, 0.05, 56]} />
				<meshStandardMaterial color="#0d121a" roughness={0.88} metalness={0.22} />
			</mesh>

			<mesh position={[0, 0.252, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.26, 2.31, 56]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.85} toneMapped={false} />
			</mesh>

			<mesh position={[0, 0.29, 0]} receiveShadow>
				<cylinderGeometry args={[2.14, 2.26, 0.09, 56]} />
				<meshStandardMaterial color="#c2bcb0" roughness={0.74} metalness={0.02} />
			</mesh>

			<mesh position={[0, 0.342, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.8, 1.87, 56]} />
				<meshBasicMaterial color="#6fe7ff" transparent opacity={0.75} toneMapped={false} />
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

			{/* ── 4. 3D PERCEPTION & LANDMARK TRANSFORMATION ── */}
			<PerceptionMeshTransform proximityRef={proximityRef} />

			{/* ── 5. VERTICAL PIPELINE RAIL (Matching Reference Image) ── */}
			<group position={[1.85, 1.65, 0.2]}>
				<mesh position={[0, 0, -0.02]}>
					<boxGeometry args={[0.03, 1.65, 0.08]} />
					<meshStandardMaterial color="#0c1624" roughness={0.7} />
				</mesh>

				{chamber.pipeline.map((step, idx) => {
					const y = 0.62 - idx * 0.31
					return (
						<group key={step.id} position={[0, y, 0]}>
							<mesh position={[-0.10, 0, 0]}>
								<sphereGeometry args={[0.030, 10, 10]} />
								<meshBasicMaterial color="#6fe7ff" toneMapped={false} />
							</mesh>
							<Text
								position={[0.08, 0, 0]}
								fontSize={0.075}
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
					[ E ] EXPLORE PERCEPTION ↗
				</Text>
			</group>
		</group>
	)
}

