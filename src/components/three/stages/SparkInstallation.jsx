import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Environment, Text } from '@react-three/drei'
import BillboardLabel from '../BillboardLabel'
import ReflectiveGround from '../environments/ReflectiveGround'
import ArchFrame from '../environments/ArchFrame'
import { SanctuaryLeftWing, SanctuaryRightWing } from '../environments/SanctuaryWings'
import { CypressTree } from '../environments/ProceduralTree'
import { destinationById } from '../../../data/destinations'
import SparkCore from './spark/SparkCore'
import SparkQuestionSpace from './spark/SparkQuestionSpace'

// ============================================================================
// THE SPARK — TECHNOLOGICAL HEART OF THE SANCTUARY
// - Prominent, faceted crystalline core hovering & tumbling
// - Pure cyan emissive glow & dedicated Three.js PointLight
// - Visibly casts cyan light onto the stone dais & surrounding pavement
// - Smooth 3-tier proximity ramp driven by playerPositionRef:
//     > 6m: Calm idle, subtle cyan glow, slow rotation
//     6m - 3m: Smoothly ramp brightness, particles accelerate and expand orbit
//     < 3m: Full activation — intense cyan PointLight, rapid motes, glowing ring
// ============================================================================

// Ambient sanctuary dust motes floating gently in the golden-hour air
function SanctuaryAmbientDust({ count = 30 }) {
	const pointsRef = useRef()
	const { positions, speeds } = useMemo(() => {
		const pos = new Float32Array(count * 3)
		const spd = new Float32Array(count)
		for (let i = 0; i < count; i++) {
			pos[i * 3 + 0] = (Math.random() - 0.5) * 22.0
			pos[i * 3 + 1] = 0.5 + Math.random() * 5.5
			pos[i * 3 + 2] = -2.5 + Math.random() * 15.0
			spd[i] = 0.12 + Math.random() * 0.25
		}
		return { positions: pos, speeds: spd }
	}, [count])

	useFrame((state, delta) => {
		if (!pointsRef.current || pointsRef.current.parent?.parent?.visible === false) return
		const attr = pointsRef.current.geometry.attributes.position
		for (let i = 0; i < count; i++) {
			let y = attr.getY(i) + speeds[i] * delta * 0.4
			if (y > 6.2) y = 0.5
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
				size={0.034}
				transparent
				opacity={0.46}
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
const PORTAL_CY = 5.4

const STONE_COLOR = '#c2bcb0'       // Neutral warm limestone/travertine
const METAL_COLOR = '#0d121a'       // Deep structural obsidian/charcoal
const EDGE_COLOR = '#ffb45c'        // Warm amber architectural LED
const TECH_COLOR = '#35d8ff'        // Controlled cyan technological accent

function SparkInstallation({ onSelect, playerPositionRef, onNavigate, isMobile }) {
	const rootRef = useRef()
	const proximityRef = useRef(0)

	// Live Three.js interaction & 3-tier proximity ramp
	useFrame((_, delta) => {
		if (rootRef.current && rootRef.current.parent?.visible === false) return
		let targetProx = 0
		if (playerPositionRef?.current) {
			const px = playerPositionRef.current[0] || 0
			const pz = playerPositionRef.current[2] || 0
			const dist = Math.hypot(px - 0, pz - 3.5)
			// State 1: > 6m (idle, 0)
			// State 2: 3m - 6m (approaching, ramps 0 -> 1)
			// State 3: < 3m (activated, 1)
			targetProx = THREE.MathUtils.clamp(1.0 - (dist - 3.0) / 3.0, 0, 1)
		}
		proximityRef.current += (targetProx - proximityRef.current) * Math.min(1.0, delta * 3.5)
	})

	return (
		<group ref={rootRef} position={[0, 0, 0]}>
			{/* PBR environment reflections */}
			<Suspense fallback={null}>
				<Environment
					files="/environment/hilly_terrain_01_2k.hdr"
					background={false}
					environmentIntensity={0.62}
					environmentRotation={[0, 2.25, 0]}
				/>
			</Suspense>

			{/* 2. SANCTUARY AMBIENT FLOATING DUST PARTICLES */}
			<SanctuaryAmbientDust count={30} />

			{/* 3. UNIFIED SCULPTURAL MEGASTRUCTURE (Portal Tunnel + Soaring Cantilever Canopy) */}
			<ArchFrame
				position={[0, ARCH_Y, ARCH_Z]}
				radius={ARCH_RADIUS}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
				techColor={TECH_COLOR}
			/>

			{/* 4. ASYMMETRICAL SANCTUARY FLANKS */}
			{/* Screen LEFT (+X): Open negative-space contemplation courtyard beneath soaring canopy */}
			<SanctuaryLeftWing
				position={[12.0, ARCH_Y, ARCH_Z]}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
				techColor={TECH_COLOR}
			/>

			{/* Screen RIGHT (-X): Stepped bedrock terraces anchoring the monolithic mass */}
			<SanctuaryRightWing
				position={[-14.8, ARCH_Y, ARCH_Z]}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
				techColor={TECH_COLOR}
			/>

			{/* 5. IDENTITY BLOCK INSIDE THE MONUMENTAL SPATIAL TUNNEL */}
			<group position={[0, 0, ARCH_Z + 1.8]} rotation={[0, Math.PI, 0]} renderOrder={100} userData={{ cameraIgnore: true }}>
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
						depthTest={false}
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
						depthTest={false}
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
					depthTest={false}
					depthWrite={false}
				>
					AI / GENAI ENGINEER
				</Text>

				{/* Architectural datum divider line */}
				<mesh position={[0, PORTAL_CY - 0.20, 0]}>
					<planeGeometry args={[3.6, 0.022]} />
					<meshBasicMaterial color={EDGE_COLOR} transparent opacity={0.92} side={THREE.DoubleSide} fog={false} toneMapped={false} depthTest={false} />
				</mesh>
				<mesh position={[-1.80, PORTAL_CY - 0.20, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.046, 0.046]} />
					<meshBasicMaterial color="#35d8ff" side={THREE.DoubleSide} fog={false} toneMapped={false} depthTest={false} />
				</mesh>
				<mesh position={[1.80, PORTAL_CY - 0.20, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.046, 0.046]} />
					<meshBasicMaterial color="#35d8ff" side={THREE.DoubleSide} fog={false} toneMapped={false} depthTest={false} />
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
					depthTest={false}
					depthWrite={false}
				>
					I turn ideas into intelligent systems.
				</Text>
			</group>

			{/* 6. ARCHITECTURAL CYPRESS FRAMING */}
			{/* Left side: Outer boundary framing past open negative space */}
			<CypressTree position={[ 17.5, 0, 10.2]} scale={1.65} rotationY={ 0.3} />
			<CypressTree position={[ 20.0, 0, 12.0]} scale={1.80} rotationY={-0.4} />

			{/* Right side: Framing the solid monolithic anchor mass */}
			<CypressTree position={[-16.5, 0,  9.5]} scale={1.55} rotationY={-0.3} />
			<CypressTree position={[-19.0, 0, 11.5]} scale={1.75} rotationY={ 0.6} />

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

			{/* 8. THE CENTRAL SPARK CORE */}
			<SparkCore
				position={[0, 0.02, 3.5]}
				proximityRef={proximityRef}
				onSelect={() => onSelect?.(destinationById.home)}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
				techColor={TECH_COLOR}
			/>

			{/* 9. THE 4 INTERACTIVE QUESTION STATIONS & WALKWAY INVITATION */}
			<SparkQuestionSpace
				playerPositionRef={playerPositionRef}
				proximityRef={proximityRef}
				onNavigate={onNavigate}
				isMobile={isMobile}
				onSelectQuestion={(question) => {
					onSelect?.({ type: 'spark-question', ...question })
				}}
			/>

			{/* 10. FORWARD PORTAL TRANSITION THRESHOLD */}
			<group position={[0, 0.04, 7.4]} rotation={[-Math.PI / 2, 0, 0]}>
				<Text
					position={[0, 0, 0]}
					fontSize={0.11}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.20}
					color="#ffb45c"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					02 — THE BUILD →
				</Text>
				<Text
					position={[0, -0.22, 0]}
					fontSize={0.075}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.10}
					color="#8db7d8"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					Walk through the portal to explore working systems
				</Text>
			</group>
		</group>
	)
}

export default SparkInstallation
