import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import BillboardLabel from '../../BillboardLabel'

// ============================================================================
// THE CENTRAL SPARK CORE
// Architectural technological focal point:
// - Faceted translucent crystalline shell with inner white-blue energy core
// - Concentric architectural dais with amber & cyan energy rings
// - Orbiting crystalline shards tumbling in spatial rings
// - Spiraling energy motes
// - Dedicated real Three.js PointLight physically illuminating dais & floor
// ============================================================================

const SHARD_COUNT = 8

function SparkOrbitingShards({ proximityRef }) {
	const groupRef = useRef()
	const shards = useMemo(() => Array.from({ length: SHARD_COUNT }, (_, i) => ({
		angle: (i / SHARD_COUNT) * Math.PI * 2,
		radius: 1.15 + (i % 3) * 0.22,
		heightOffset: ((i % 4) - 1.5) * 0.18,
		speed: 0.32 + (i % 3) * 0.15,
		scale: 0.065 + (i % 3) * 0.02,
		geometryType: i % 2 === 0 ? 'octahedron' : 'tetrahedron'
	})), [])

	useFrame((state) => {
		if (!groupRef.current) return
		const prox = proximityRef.current || 0
		const speedMultiplier = 1.0 + prox * 2.2
		const t = state.clock.elapsedTime

		shards.forEach((shard, i) => {
			const child = groupRef.current.children[i]
			if (!child) return
			const curAngle = shard.angle + t * shard.speed * speedMultiplier
			const rad = shard.radius + Math.sin(t * 1.5 + i) * 0.06
			child.position.set(
				Math.cos(curAngle) * rad,
				shard.heightOffset + Math.sin(t * 2.0 + i * 1.2) * 0.10,
				Math.sin(curAngle) * rad
			)
			child.rotation.x += 0.012 * speedMultiplier
			child.rotation.y += 0.016 * speedMultiplier
		})
	})

	return (
		<group ref={groupRef} position={[0, 0.78, 0]}>
			{shards.map((shard, i) => (
				<mesh key={i} scale={shard.scale}>
					{shard.geometryType === 'octahedron' ? (
						<octahedronGeometry args={[1, 0]} />
					) : (
						<tetrahedronGeometry args={[1, 0]} />
					)}
					<meshStandardMaterial
						color="#081422"
						emissive="#35d8ff"
						emissiveIntensity={0.65}
						roughness={0.2}
						metalness={0.6}
						flatShading
					/>
				</mesh>
			))}
		</group>
	)
}

function SparkEnergyMotes({ proximityRef }) {
	const ref = useRef()
	const count = 18
	const motes = useMemo(() => Array.from({ length: count }, (_, i) => ({
		angle: (i / count) * Math.PI * 2,
		radius: 0.32 + (i % 3) * 0.14,
		speed: 0.35 + (i % 4) * 0.14,
		yOffset: (i / count) * 0.85
	})), [count])

	useFrame((state) => {
		if (!ref.current) return
		const prox = proximityRef.current || 0
		const speedMult = 1.0 + prox * 2.6
		const tClock = state.clock.elapsedTime

		motes.forEach((mote, i) => {
			const child = ref.current.children[i]
			if (!child) return
			const cycle = (tClock * mote.speed * speedMult + mote.yOffset) % 3.0
			const curAngle = mote.angle + tClock * 0.5 * speedMult
			child.position.set(
				Math.cos(curAngle) * (mote.radius + cycle * 0.08),
				0.25 + cycle * 0.45,
				Math.sin(curAngle) * (mote.radius + cycle * 0.08)
			)
			child.material.opacity = Math.max(0, (0.5 + prox * 0.5) * (1.0 - cycle / 3.0))
		})
	})

	return (
		<group ref={ref}>
			{motes.map((_, i) => (
				<mesh key={i}>
					<sphereGeometry args={[0.016, 6, 6]} />
					<meshBasicMaterial color="#7ee7ff" transparent opacity={0.6} toneMapped={false} />
				</mesh>
			))}
		</group>
	)
}

export default function SparkCore({
	position = [0, 0.02, 3.5],
	proximityRef,
	onSelect,
	stoneColor = '#c2bcb0',
	metalColor = '#0d121a',
	edgeColor = '#ffb45c',
	techColor = '#35d8ff'
}) {
	const coreRef = useRef()
	const crystalMatRef = useRef()
	const innerCoreMatRef = useRef()
	const sparkLightRef = useRef()
	const plinthGlowRef = useRef()
	const amberRingRef = useRef()

	useFrame((state) => {
		const t = state.clock.elapsedTime
		const prox = proximityRef.current || 0

		// 1. Core vertical floating & compound rotation
		if (coreRef.current) {
			coreRef.current.position.y = 0.82 + Math.sin(t * 1.5) * 0.06
			coreRef.current.rotation.y += (0.008 + prox * 0.022)
			coreRef.current.rotation.x = Math.sin(t * 0.7) * 0.10
			coreRef.current.rotation.z = Math.cos(t * 0.5) * 0.08
		}

		// 2. Crystal materials & emissive response
		if (crystalMatRef.current) {
			const pulse = Math.sin(t * 2.2) * 0.08
			crystalMatRef.current.emissiveIntensity = 0.45 + prox * 0.75 + pulse
		}
		if (innerCoreMatRef.current) {
			innerCoreMatRef.current.opacity = 0.75 + prox * 0.25
		}

		// 3. Dedicated real Three.js PointLight
		if (sparkLightRef.current) {
			const lightPulse = Math.sin(t * 2.8) * 0.05
			sparkLightRef.current.intensity = 0.52 + prox * 0.95 + lightPulse
			sparkLightRef.current.distance = 5.2 + prox * 3.8
		}

		// 4. Dais reactive energy rings
		if (plinthGlowRef.current) {
			plinthGlowRef.current.opacity = 0.50 + prox * 0.50 + Math.sin(t * 2.0) * 0.08
		}
		if (amberRingRef.current) {
			amberRingRef.current.opacity = 0.70 + prox * 0.30 + Math.sin(t * 1.4) * 0.05
		}
	})

	return (
		<group
			position={position}
			onPointerDown={(event) => event.stopPropagation()}
			onClick={(event) => { event.stopPropagation(); onSelect?.() }}
			onDoubleClick={(event) => event.stopPropagation()}
		>
			{/* ── 1. ARCHITECTURAL CONCENTRIC DAIS ── */}
			{/* Tier 1: Ground stone plinth */}
			<mesh position={[0, 0.05, 0]} receiveShadow>
				<cylinderGeometry args={[1.56, 1.68, 0.10, 48]} />
				<meshStandardMaterial color={stoneColor} roughness={0.76} metalness={0.02} />
			</mesh>

			{/* Tier 2: Recessed obsidian datum */}
			<mesh position={[0, 0.11, 0]}>
				<cylinderGeometry args={[1.38, 1.45, 0.04, 48]} />
				<meshStandardMaterial color={metalColor} roughness={0.88} metalness={0.22} />
			</mesh>

			{/* Tier 3: Inset honed stone pedestal */}
			<mesh position={[0, 0.16, 0]} receiveShadow>
				<cylinderGeometry args={[1.20, 1.30, 0.07, 48]} />
				<meshStandardMaterial color={stoneColor} roughness={0.72} metalness={0.02} />
			</mesh>

			{/* Inset obsidian reveal ring */}
			<mesh position={[0, 0.198, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[1.02, 1.12, 48]} />
				<meshStandardMaterial color={metalColor} roughness={0.85} metalness={0.25} />
			</mesh>

			{/* Concentric warm amber outer LED ring */}
			<mesh position={[0, 0.201, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.96, 1.00, 48]} />
				<meshBasicMaterial
					ref={amberRingRef}
					color={edgeColor}
					transparent
					opacity={0.80}
					toneMapped={false}
				/>
			</mesh>

			{/* Responsive pure cyan quantum energy ring */}
			<mesh position={[0, 0.203, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[0.72, 0.80, 48]} />
				<meshBasicMaterial
					ref={plinthGlowRef}
					color={techColor}
					transparent
					opacity={0.55}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 2. FLOATING FACETED CRYSTALLINE CORE ── */}
			<group ref={coreRef} position={[0, 0.82, 0]}>
				{/* Outer faceted crystalline shell */}
				<mesh scale={[1.30, 1.70, 1.18]}>
					<icosahedronGeometry args={[0.45, 0]} />
					<meshStandardMaterial
						ref={crystalMatRef}
						color="#081422"
						emissive={techColor}
						emissiveIntensity={0.48}
						flatShading
						roughness={0.16}
						metalness={0.52}
					/>
				</mesh>

				{/* Secondary translucent crystal prism facets for refractive depth */}
				<mesh scale={[0.95, 1.35, 0.95]} rotation={[0.4, 0.6, 0.2]}>
					<octahedronGeometry args={[0.42, 0]} />
					<meshStandardMaterial
						color="#0e283c"
						emissive="#6fe7ff"
						emissiveIntensity={0.38}
						transparent
						opacity={0.48}
						flatShading
						roughness={0.10}
					/>
				</mesh>

				{/* Inner radiant white-blue core */}
				<mesh scale={[0.32, 0.42, 0.32]}>
					<octahedronGeometry args={[1, 0]} />
					<meshBasicMaterial
						ref={innerCoreMatRef}
						color="#e2f8ff"
						transparent
						opacity={0.88}
						toneMapped={false}
					/>
				</mesh>
			</group>

			{/* ── 3. REAL THREE.JS CYAN POINTLIGHT ── */}
			<pointLight
				ref={sparkLightRef}
				color={techColor}
				intensity={0.52}
				distance={5.4}
				position={[0, 0.85, 0]}
				decay={2}
			/>

			{/* ── 4. ORBITING SHARDS & ENERGY MOTES ── */}
			<SparkOrbitingShards proximityRef={proximityRef} />
			<SparkEnergyMotes proximityRef={proximityRef} />

			{/* ── 5. BILLBOARD LABEL ── */}
			<BillboardLabel
				position={[0, 1.62, 0]}
				fontSize={0.08}
				color="#FAF8F2"
				anchorX="center"
				anchorY="middle"
				letterSpacing={0.14}
				outlineWidth={0.005}
				outlineColor="#05070c"
			>
				THE SPARK
			</BillboardLabel>
		</group>
	)
}

