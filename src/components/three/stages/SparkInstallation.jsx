import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Environment, Text } from '@react-three/drei'
import BillboardLabel from '../BillboardLabel'
import ReflectiveGround from '../environments/ReflectiveGround'
import ArchFrame from '../environments/ArchFrame'
import { SanctuaryLeftWing, SanctuaryRightWing } from '../environments/SanctuaryWings'
import ContinuousWorldVista from '../environments/ContinuousWorldVista'
import { CypressTree, ProceduralTree } from '../environments/ProceduralTree'
import { destinationById } from '../../../data/destinations'

// ============================================================================
// THE SPARK — LIVING TECHNOLOGICAL ENERGY CORE
// 3-Tier Interactive Proximity Ramp:
//   > 6m: Calm idle state, subtle cyan pulse, slow rotation, minimal motes
//   6m - 3m: Smooth brightness ramp, particles accelerate and expand orbit
//   < 3m: Radiant activation — vibrant crystal glow, dynamic PointLight
//         illuminates the stone dais & floor, responsive quantum ring
// ============================================================================

// Concept fragments representing core engineering disciplines
const FRAGMENTS = [
	{ label: 'QUESTIONS', angle: 0, radius: 0.66, height: 0.14, geometry: 'tetrahedron', color: '#F5F1E8' },
	{ label: 'CURIOSITY', angle: (Math.PI * 2) / 5, radius: 0.74, height: -0.07, geometry: 'octahedron', color: '#B9B4FF' },
	{ label: 'PROBLEMS', angle: (Math.PI * 4) / 5, radius: 0.62, height: 0.22, geometry: 'tetrahedron', color: '#35d8ff' },
	{ label: 'EXPLORATION', angle: (Math.PI * 6) / 5, radius: 0.78, height: -0.16, geometry: 'octahedron', color: '#F5F1E8' },
	{ label: 'POSSIBILITIES', angle: (Math.PI * 8) / 5, radius: 0.70, height: 0.03, geometry: 'tetrahedron', color: '#B9B4FF' },
]

function SparkEnergyMotes({ proximityRef }) {
	const ref = useRef()
	const count = 10
	const seeds = useMemo(() => Array.from({ length: count }, (_, i) => ({
		angle: (i / count) * Math.PI * 2,
		radius: 0.18 + (i % 3) * 0.06,
		speed: 0.25 + (i % 4) * 0.12,
		yOffset: (i / count) * 0.55
	})), [count])

	useFrame((state) => {
		if (!ref.current) return
		const prox = proximityRef.current || 0
		const speedMultiplier = 1.0 + prox * 2.2
		seeds.forEach((seed, i) => {
			const child = ref.current.children[i]
			if (!child) return
			const t = (state.clock.elapsedTime * seed.speed * speedMultiplier + seed.yOffset) % 2.6
			const currentAngle = seed.angle + state.clock.elapsedTime * 0.45 * speedMultiplier
			child.position.set(
				Math.cos(currentAngle) * (seed.radius + t * 0.06),
				0.24 + t * 0.38,
				Math.sin(currentAngle) * (seed.radius + t * 0.06)
			)
			child.material.opacity = Math.max(0, (0.50 + prox * 0.45) * (1.0 - t / 2.6))
		})
	})

	return (
		<group ref={ref}>
			{seeds.map((_, i) => (
				<mesh key={i}>
					<sphereGeometry args={[0.012, 6, 6]} />
					<meshBasicMaterial color="#35d8ff" transparent opacity={0.5} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

function OrbitingFragment({ angle, radius, height, geometry, index, color, proximityRef }) {
	const ref = useRef()
	useFrame((state) => {
		if (!ref.current) return
		const prox = proximityRef.current || 0
		const speed = 0.20 + prox * 0.35
		const t = state.clock.elapsedTime * speed + index * 1.2
		ref.current.position.set(
			Math.cos(angle + t) * radius,
			height + Math.sin(t * 1.6) * 0.06,
			Math.sin(angle + t) * radius
		)
		ref.current.rotation.x += 0.006 * (1 + prox * 1.5)
		ref.current.rotation.y += 0.009 * (1 + prox * 1.5)
	})
	return (
		<mesh ref={ref}>
			{geometry === 'tetrahedron' ? <tetrahedronGeometry args={[0.055, 0]} /> : <octahedronGeometry args={[0.048, 0]} />}
			<meshStandardMaterial
				color="#0d121a"
				emissive={color}
				emissiveIntensity={0.42}
				flatShading
				roughness={0.35}
				metalness={0.30}
			/>
		</mesh>
	)
}

// Ambient sanctuary dust motes floating gently in the golden-hour air
function SanctuaryAmbientDust({ count = 30 }) {
	const pointsRef = useRef()
	const { positions, speeds } = useMemo(() => {
		const pos = new Float32Array(count * 3)
		const spd = new Float32Array(count)
		for (let i = 0; i < count; i++) {
			pos[i * 3 + 0] = (Math.random() - 0.5) * 18.0
			pos[i * 3 + 1] = 0.5 + Math.random() * 5.0
			pos[i * 3 + 2] = -2.5 + Math.random() * 14.0
			spd[i] = 0.12 + Math.random() * 0.25
		}
		return { positions: pos, speeds: spd }
	}, [count])

	useFrame((state, delta) => {
		if (!pointsRef.current) return
		const attr = pointsRef.current.geometry.attributes.position
		for (let i = 0; i < count; i++) {
			let y = attr.getY(i) + speeds[i] * delta * 0.4
			if (y > 5.8) y = 0.5
			attr.setY(i, y)
			attr.setX(i, attr.getX(i) + Math.sin(state.clock.elapsedTime * 0.25 + i) * delta * 0.03)
		}
		attr.needsUpdate = true
	})

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
			</bufferGeometry>
			<pointsMaterial
				color="#ffda9e"
				size={0.032}
				transparent
				opacity={0.45}
				sizeAttenuation
				toneMapped={false}
			/>
		</points>
	)
}

// Architectural Layout Constants
const ARCH_Z = 9.5
const ARCH_Y = 0
const ARCH_RADIUS = 5.2
const PORTAL_CY = (ARCH_RADIUS * 2.10) / 2   // ≈ 5.46

const STONE_COLOR = '#c2bcb0'       // Neutral warm limestone/travertine
const METAL_COLOR = '#0d121a'       // Deep structural obsidian/charcoal
const EDGE_COLOR = '#ffb45c'        // Warm amber architectural LED
const TECH_COLOR = '#35d8ff'        // Controlled cyan technological accent

function SparkInstallation({ onSelect, playerPositionRef }) {
	const coreRef = useRef()
	const crystalMatRef = useRef()
	const innerCoreMatRef = useRef()
	const sparkLightRef = useRef()
	const plinthGlowRef = useRef()
	const proximityRef = useRef(0)

	// Live Three.js interaction & animation loop
	useFrame((state, delta) => {
		const t = state.clock.elapsedTime

		// 1. Interactive player proximity calculation
		let targetProx = 0
		if (playerPositionRef?.current) {
			const px = playerPositionRef.current[0] || 0
			const pz = playerPositionRef.current[2] || 0
			const dist = Math.hypot(px - 0, pz - 3.5)
			// Active proximity response: distance 6.0m down to 1.5m
			targetProx = THREE.MathUtils.clamp(1.0 - (dist - 1.5) / 4.5, 0, 1)
		}
		proximityRef.current += (targetProx - proximityRef.current) * Math.min(1.0, delta * 3.5)
		const prox = proximityRef.current

		// 2. Crystal hover & compound smooth multi-axis rotation
		if (coreRef.current) {
			coreRef.current.position.y = 0.58 + Math.sin(t * 1.5) * 0.05
			coreRef.current.rotation.y += delta * (0.16 + prox * 0.38)
			coreRef.current.rotation.x = Math.sin(t * 0.75) * 0.12
			coreRef.current.rotation.z = Math.cos(t * 0.55) * 0.09
		}

		// 3. Dynamic crystal emissive response
		if (crystalMatRef.current) {
			const pulse = Math.sin(t * 2.4) * 0.05
			crystalMatRef.current.emissiveIntensity = 0.35 + prox * 0.50 + pulse
		}
		if (innerCoreMatRef.current) {
			innerCoreMatRef.current.opacity = 0.65 + prox * 0.32
		}

		// 4. REAL THREE.JS POINTLIGHT illumination on dais & surrounding stone floor
		if (sparkLightRef.current) {
			const lightPulse = Math.sin(t * 2.8) * 0.025
			sparkLightRef.current.intensity = 0.22 + prox * 0.45 + lightPulse
			sparkLightRef.current.distance = 3.4 + prox * 2.0
		}

		// 5. Plinth cyan quantum datum ring reactive glow
		if (plinthGlowRef.current) {
			plinthGlowRef.current.opacity = 0.35 + prox * 0.42 + Math.sin(t * 2.0) * 0.06
		}
	})

	return (
		<group position={[0, 0, 0]}>
			{/* PBR environment reflections */}
			<Suspense fallback={null}>
				<Environment
					files="/environment/hilly_terrain_01_2k.hdr"
					background={false}
					environmentIntensity={0.62}
					environmentRotation={[0, 2.25, 0]}
				/>
			</Suspense>

			{/* 1. PANORAMIC GOLDEN-HOUR CELESTIAL SKY & DISTANT VISTA */}
			<ContinuousWorldVista archRadius={ARCH_RADIUS} archZ={ARCH_Z} />

			{/* 2. SANCTUARY AMBIENT FLOATING DUST PARTICLES */}
			<SanctuaryAmbientDust count={30} />

			{/* 3. MONUMENTAL SPATIAL PORTAL TUNNEL (Mass + Void + Light) */}
			<ArchFrame
				position={[0, ARCH_Y, ARCH_Z]}
				radius={ARCH_RADIUS}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
				techColor={TECH_COLOR}
			/>

			{/* 4. ASYMMETRICAL SANCTUARY WINGS */}
			{/* Left Wing: Heavy cantilevered floating pavilion */}
			<SanctuaryLeftWing
				position={[-11.2, ARCH_Y, ARCH_Z - 0.3]}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
				techColor={TECH_COLOR}
			/>

			{/* Right Wing: Staggered multi-tier monolithic pylons & observation slab */}
			<SanctuaryRightWing
				position={[11.5, ARCH_Y, ARCH_Z - 0.3]}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
				techColor={TECH_COLOR}
			/>

			{/* 5. IDENTITY BLOCK INSIDE THE MONUMENTAL SPATIAL TUNNEL */}
			<group position={[0, 0, ARCH_Z + 2.4]} rotation={[0, Math.PI, 0]} renderOrder={10} userData={{ cameraIgnore: true }}>
				{/* Sravanthi Addagada */}
				<group position={[0, PORTAL_CY + 0.75, 0]}>
					<Text
						position={[-0.10, 0, 0]}
						fontSize={0.68}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.02}
						color="#FAF8F2"
						anchorX="right"
						anchorY="middle"
						outlineWidth={0.014}
						outlineColor="#050a14"
						material-fog={false}
						material-toneMapped={false}
						sdfGlyphSize={128}
						depthTest={true}
						depthWrite={false}
					>
						Sravanthi
					</Text>
					<Text
						position={[0.10, 0, 0]}
						fontSize={0.68}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.02}
						color="#35d8ff"
						anchorX="left"
						anchorY="middle"
						outlineWidth={0.014}
						outlineColor="#050a14"
						material-fog={false}
						material-toneMapped={false}
						sdfGlyphSize={128}
						depthTest={true}
						depthWrite={false}
					>
						Addagada
					</Text>
				</group>

				{/* AI / GENAI ENGINEER */}
				<Text
					position={[0, PORTAL_CY + 0.10, 0]}
					fontSize={0.33}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.16}
					color="#35d8ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.009}
					outlineColor="#050a14"
					material-fog={false}
					material-toneMapped={false}
					sdfGlyphSize={128}
					depthTest={true}
					depthWrite={false}
				>
					AI / GENAI ENGINEER
				</Text>

				{/* Architectural datum divider line */}
				<mesh position={[0, PORTAL_CY - 0.20, 0]}>
					<planeGeometry args={[3.6, 0.022]} />
					<meshBasicMaterial color={EDGE_COLOR} transparent opacity={0.92} side={THREE.DoubleSide} fog={false} toneMapped={false} />
				</mesh>
				<mesh position={[-1.80, PORTAL_CY - 0.20, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.046, 0.046]} />
					<meshBasicMaterial color="#35d8ff" side={THREE.DoubleSide} fog={false} toneMapped={false} />
				</mesh>
				<mesh position={[1.80, PORTAL_CY - 0.20, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.046, 0.046]} />
					<meshBasicMaterial color="#35d8ff" side={THREE.DoubleSide} fog={false} toneMapped={false} />
				</mesh>

				{/* Quote */}
				<Text
					position={[0, PORTAL_CY - 0.50, 0]}
					fontSize={0.26}
					font="/fonts/SegoeUI.ttf"
					letterSpacing={0.03}
					color="#EDF3F8"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.008}
					outlineColor="#050a14"
					material-fog={false}
					material-toneMapped={false}
					sdfGlyphSize={128}
					depthTest={true}
					depthWrite={false}
				>
					I turn ideas into intelligent systems.
				</Text>
			</group>

			{/* 6. ASYMMETRICAL ARCHITECTURAL VEGETATION */}
			{/* Left side: Natural framing cluster near cantilevered pavilion */}
			<CypressTree position={[-14.8, 0, 8.2]} scale={1.55} rotationY={ 0.3} />
			<CypressTree position={[-17.4, 0, 10.0]} scale={1.75} rotationY={-0.4} />
			<ProceduralTree position={[-14.0, 0.8, 6.5]} scale={1.35} rotationY={ 0.5} seed={3} />

			{/* Right side: Slender cypress grouping framing the staggered pylons */}
			<CypressTree position={[ 14.5, 0, 8.0]} scale={1.45} rotationY={-0.3} />
			<CypressTree position={[ 17.2, 0, 10.2]} scale={1.70} rotationY={ 0.6} />
			<CypressTree position={[ 19.5, 0, 12.2]} scale={1.50} rotationY={-0.5} />

			{/* 7. REFLECTIVE GROUND (Sunken water basins, floating benches, NO floor lines) */}
			<ReflectiveGround
				position={[0, 0, 0]}
				width={42}
				depth={48}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				warmLight={EDGE_COLOR}
				archZ={ARCH_Z}
			/>

			{/* 8. THE SPARK — INTERACTIVE TECHNOLOGICAL CORE */}
			<group
				position={[0, 0.02, 3.5]}
				onPointerDown={(event) => event.stopPropagation()}
				onClick={(event) => { event.stopPropagation(); onSelect(destinationById.home) }}
				onDoubleClick={(event) => event.stopPropagation()}
			>
				{/* Tier 1: Wide ground stone plinth */}
				<mesh position={[0, 0.06, 0]}>
					<cylinderGeometry args={[1.35, 1.45, 0.12, 40]} />
					<meshStandardMaterial color={STONE_COLOR} roughness={0.74} metalness={0.02} />
				</mesh>

				{/* Tier 2: Obsidian structural reveal ring */}
				<mesh position={[0, 0.13, 0]}>
					<cylinderGeometry args={[1.18, 1.24, 0.04, 40]} />
					<meshStandardMaterial color={METAL_COLOR} roughness={0.88} metalness={0.20} />
				</mesh>

				{/* Tier 3: Inset honed stone pedestal */}
				<mesh position={[0, 0.17, 0]}>
					<cylinderGeometry args={[1.02, 1.12, 0.06, 40]} />
					<meshStandardMaterial color={STONE_COLOR} roughness={0.72} metalness={0.02} />
				</mesh>

				{/* Subtle warm bronze inlay ring */}
				<mesh position={[0, 0.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[0.92, 0.96, 48]} />
					<meshStandardMaterial color="#8a6838" roughness={0.4} metalness={0.5} />
				</mesh>

				{/* Responsive cyan quantum energy ring */}
				<mesh position={[0, 0.206, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[0.66, 0.70, 48]} />
					<meshBasicMaterial ref={plinthGlowRef} color="#35d8ff" transparent opacity={0.35} toneMapped={false} />
				</mesh>

				{/* Floating faceted cyan crystal core */}
				<group ref={coreRef} position={[0, 0.58, 0]}>
					{/* Outer faceted crystalline shell */}
					<mesh scale={[1, 1.25, 0.9]}>
						<icosahedronGeometry args={[0.30, 0]} />
						<meshStandardMaterial
							ref={crystalMatRef}
							color="#0c1828"
							emissive="#35d8ff"
							emissiveIntensity={0.35}
							flatShading
							roughness={0.25}
							metalness={0.45}
						/>
					</mesh>
					{/* Inner glowing energy core */}
					<mesh scale={[0.16, 0.20, 0.16]}>
						<octahedronGeometry args={[1, 0]} />
						<meshBasicMaterial ref={innerCoreMatRef} color="#b4f0ff" transparent opacity={0.70} toneMapped={false} />
					</mesh>
				</group>

				{/* REAL THREE.JS POINTLIGHT casting dynamic cyan light on the dais & ground */}
				<pointLight
					ref={sparkLightRef}
					color="#35d8ff"
					intensity={0.22}
					distance={3.4}
					position={[0, 0.65, 0]}
					decay={2}
				/>

				{/* Energy motes & Orbiting concept fragments */}
				<SparkEnergyMotes proximityRef={proximityRef} />
				{FRAGMENTS.map((fragment, index) => (
					<OrbitingFragment
						key={fragment.label}
						{...fragment}
						index={index}
						proximityRef={proximityRef}
					/>
				))}

				{/* Billboard Label */}
				<BillboardLabel
					position={[0, 1.08, 0]}
					fontSize={0.075}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					letterSpacing={0.12}
					outlineWidth={0.005}
					outlineColor="#05070c"
				>
					THE SPARK
				</BillboardLabel>
			</group>
		</group>
	)
}

export default SparkInstallation
