import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Environment, Text } from '@react-three/drei'
import BillboardLabel from '../BillboardLabel'
import ReflectiveGround from '../environments/ReflectiveGround'
import ArchFrame from '../environments/ArchFrame'
import WingWall from '../environments/WingWall'
import ContinuousWorldVista from '../environments/ContinuousWorldVista'
import { ProceduralTree, CypressTree } from '../environments/ProceduralTree'
import { destinationById } from '../../../data/destinations'

// Five concept fragments orbiting The Spark
const FRAGMENTS = [
	{ label: 'QUESTIONS', angle: 0, radius: 0.62, height: 0.14, geometry: 'tetrahedron', color: '#F5F1E8' },
	{ label: 'CURIOSITY', angle: (Math.PI * 2) / 5, radius: 0.7, height: -0.07, geometry: 'octahedron', color: '#B9B4FF' },
	{ label: 'PROBLEMS', angle: (Math.PI * 4) / 5, radius: 0.58, height: 0.22, geometry: 'tetrahedron', color: '#38d6ff' },
	{ label: 'EXPLORATION', angle: (Math.PI * 6) / 5, radius: 0.74, height: -0.16, geometry: 'octahedron', color: '#F5F1E8' },
	{ label: 'POSSIBILITIES', angle: (Math.PI * 8) / 5, radius: 0.66, height: 0.03, geometry: 'tetrahedron', color: '#B9B4FF' },
]

function CrystalMotes() {
	const ref = useRef()
	const seeds = useRef(Array.from({ length: 5 }, (_, i) => ({ angle: (i / 5) * Math.PI * 2, radius: 0.16 + (i % 3) * 0.04, offset: i * 1.7 })))
	useFrame((state) => {
		if (!ref.current) return
		seeds.current.forEach((seed, i) => {
			const t = (state.clock.elapsedTime * 0.12 + seed.offset) % 3
			const child = ref.current.children[i]
			if (!child) return
			child.position.set(Math.cos(seed.angle) * seed.radius, 0.3 + t * 0.40, Math.sin(seed.angle) * seed.radius)
			child.material.opacity = Math.max(0, 0.4 - t * 0.15)
		})
	})
	return (
		<group ref={ref}>
			{seeds.current.map((_, i) => (
				<mesh key={i}><sphereGeometry args={[0.010, 6, 6]} /><meshBasicMaterial color="#38d6ff" transparent opacity={0.35} /></mesh>
			))}
		</group>
	)
}

function Fragment({ angle, radius, height, geometry, index, color }) {
	const ref = useRef()
	useFrame((state) => {
		if (!ref.current) return
		const t = state.clock.elapsedTime * 0.18 + index
		ref.current.position.set(Math.cos(angle + t) * radius, height + Math.sin(t * 1.3) * 0.05, Math.sin(angle + t) * radius)
		ref.current.rotation.x += 0.004
		ref.current.rotation.y += 0.006
	})
	return (
		<mesh ref={ref}>
			{geometry === 'tetrahedron' ? <tetrahedronGeometry args={[0.055, 0]} /> : <octahedronGeometry args={[0.048, 0]} />}
			<meshStandardMaterial color="#141c28" emissive={color} emissiveIntensity={0.35} flatShading roughness={0.4} metalness={0.25} />
		</mesh>
	)
}

// ──────────────────────────────────────────────────────────────────────────
// ARCHITECTURAL LAYOUT CONSTANTS
// Gateway: radius=5.2, outerWidth≈14.56, outerHeight≈10.66, thickness=2.6
// Gateway centered at z=9.5
// ──────────────────────────────────────────────────────────────────────────
const ARCH_Z = 9.5
const ARCH_Y = 0
const ARCH_RADIUS = 5.2
const PORTAL_CY = (ARCH_RADIUS * 2.05) / 2   // ≈ 5.33

const STONE_COLOR = '#bcb4a6'
const METAL_COLOR = '#10141c'
const EDGE_COLOR = '#ffa032'

function SparkInstallation({ onSelect }) {
	const coreRef = useRef()
	useFrame((_, delta) => {
		if (coreRef.current) coreRef.current.rotation.y += delta * 0.1
	})

	return (
		<group position={[0, 0, 0]}>
			{/* PBR environment reflections */}
			<Suspense fallback={null}>
				<Environment
					files="/environment/hilly_terrain_01_2k.hdr"
					background={false}
					environmentIntensity={0.60}
					environmentRotation={[0, 2.25, 0]}
				/>
			</Suspense>

			{/* 1. PANORAMIC GOLDEN-HOUR WORLD VISTA */}
			<ContinuousWorldVista archRadius={ARCH_RADIUS} archZ={ARCH_Z} />

			{/* 2. MONUMENTAL ARCHITECTURAL GATEWAY */}
			<ArchFrame
				position={[0, ARCH_Y, ARCH_Z]}
				radius={ARCH_RADIUS}
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				edgeColor={EDGE_COLOR}
			/>

			{/* Primary flanking pylons */}
			<WingWall position={[-9.4, ARCH_Y, ARCH_Z]} width={3.4} height={10.4} depth={2.2} color={STONE_COLOR} metalColor={METAL_COLOR} edgeColor={EDGE_COLOR} />
			<WingWall position={[ 9.4, ARCH_Y, ARCH_Z]} width={3.4} height={10.4} depth={2.2} color={STONE_COLOR} metalColor={METAL_COLOR} edgeColor={EDGE_COLOR} />

			{/* Secondary outer pylons */}
			<WingWall position={[-14.0, ARCH_Y, ARCH_Z - 1.2]} rotationY={ 0.18} width={2.8} height={9.0} depth={1.8} color={STONE_COLOR} metalColor={METAL_COLOR} edgeColor={EDGE_COLOR} />
			<WingWall position={[ 14.0, ARCH_Y, ARCH_Z - 1.2]} rotationY={-0.18} width={2.8} height={9.0} depth={1.8} color={STONE_COLOR} metalColor={METAL_COLOR} edgeColor={EDGE_COLOR} />

			{/* Low stone threshold balustrade capping the steps behind arch */}
			<mesh position={[0, 0.55, ARCH_Z + 0.8]} userData={{ cameraIgnore: true }}>
				<boxGeometry args={[9.8, 0.28, 0.42]} />
				<meshStandardMaterial color={STONE_COLOR} roughness={0.76} metalness={0.02} />
			</mesh>
			<mesh position={[0, 0.70, ARCH_Z + 0.8]} userData={{ cameraIgnore: true }}>
				<boxGeometry args={[9.84, 0.03, 0.44]} />
				<meshBasicMaterial color={EDGE_COLOR} toneMapped={false} />
			</mesh>

			{/* 3. IDENTITY BLOCK INSIDE CIRCULAR PORTAL */}
			<group position={[0, 0, ARCH_Z + 1.4]} rotation={[0, Math.PI, 0]} renderOrder={10} userData={{ cameraIgnore: true }}>
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
						color="#38d6ff"
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
					color="#38d6ff"
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

				{/* Divider line */}
				<mesh position={[0, PORTAL_CY - 0.20, 0]}>
					<planeGeometry args={[3.5, 0.022]} />
					<meshBasicMaterial color={EDGE_COLOR} transparent opacity={0.92} side={THREE.DoubleSide} fog={false} toneMapped={false} />
				</mesh>
				<mesh position={[-1.75, PORTAL_CY - 0.20, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.046, 0.046]} />
					<meshBasicMaterial color="#38d6ff" side={THREE.DoubleSide} fog={false} toneMapped={false} />
				</mesh>
				<mesh position={[1.75, PORTAL_CY - 0.20, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.046, 0.046]} />
					<meshBasicMaterial color="#38d6ff" side={THREE.DoubleSide} fog={false} toneMapped={false} />
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

			{/* 4. ARCHITECTURAL VEGETATION — Framing the outer terraces */}
			<ProceduralTree position={[-11.0, 0.9, 7.2]} scale={1.55} rotationY={ 0.3} seed={1} />
			<ProceduralTree position={[ 11.0, 0.9, 7.2]} scale={1.52} rotationY={-0.6} seed={2} />
			<pointLight color="#ffd08a" intensity={0.12} distance={6} position={[-11.0, 2.0, 7.0]} />
			<pointLight color="#ffd08a" intensity={0.12} distance={6} position={[ 11.0, 2.0, 7.0]} />

			<CypressTree position={[-13.5, 0, 8.5]} scale={1.45} rotationY={ 0.2} />
			<CypressTree position={[-16.5, 0, 10.2]} scale={1.70} rotationY={-0.5} />
			<CypressTree position={[-19.0, 0, 12.0]} scale={1.50} rotationY={ 0.8} />
			<CypressTree position={[ 13.5, 0, 8.5]} scale={1.45} rotationY={-0.3} />
			<CypressTree position={[ 16.5, 0, 10.2]} scale={1.70} rotationY={ 0.6} />
			<CypressTree position={[ 19.0, 0, 12.0]} scale={1.50} rotationY={-0.7} />

			{/* 5. REFLECTIVE GROUND */}
			<ReflectiveGround
				position={[0, 0, 0]}
				width={40}
				depth={46}
				color="#10141a"
				stoneColor={STONE_COLOR}
				metalColor={METAL_COLOR}
				warmLight={EDGE_COLOR}
				archZ={ARCH_Z}
			/>

			{/* 6. THE SPARK INSTALLATION (Small, refined, controlled cyan focal point) */}
			<group
				position={[0, 0.02, 3.5]}
				onPointerDown={(event) => event.stopPropagation()}
				onClick={(event) => { event.stopPropagation(); onSelect(destinationById.home) }}
				onDoubleClick={(event) => event.stopPropagation()}
			>
				{/* Travertine circular plinth */}
				<mesh position={[0, 0.06, 0]}>
					<cylinderGeometry args={[1.35, 1.45, 0.12, 32]} />
					<meshStandardMaterial color={STONE_COLOR} roughness={0.76} metalness={0.02} />
				</mesh>
				{/* Charcoal reveal ring */}
				<mesh position={[0, 0.13, 0]}>
					<cylinderGeometry args={[1.18, 1.24, 0.04, 32]} />
					<meshStandardMaterial color={METAL_COLOR} roughness={0.85} metalness={0.15} />
				</mesh>
				{/* Inner stepped plinth */}
				<mesh position={[0, 0.17, 0]}>
					<cylinderGeometry args={[1.02, 1.12, 0.06, 32]} />
					<meshStandardMaterial color={STONE_COLOR} roughness={0.74} metalness={0.02} />
				</mesh>
				{/* Subtle warm bronze inlay ring (not emissive, so no floor streak!) */}
				<mesh position={[0, 0.205, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[0.92, 0.96, 48]} />
					<meshStandardMaterial color="#8a6838" roughness={0.4} metalness={0.5} />
				</mesh>
				{/* Inner delicate cyan accent ring */}
				<mesh position={[0, 0.206, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[0.68, 0.70, 36]} />
					<meshBasicMaterial color="#38d6ff" transparent opacity={0.35} />
				</mesh>

				{/* Faceted cyan crystal */}
				<group ref={coreRef} position={[0, 0.58, 0]}>
					<mesh scale={[1, 1.25, 0.9]}>
						<icosahedronGeometry args={[0.30, 0]} />
						<meshStandardMaterial
							color="#0e1b2e"
							emissive="#38d6ff"
							emissiveIntensity={0.30}
							flatShading
							roughness={0.30}
							metalness={0.4}
						/>
					</mesh>
				</group>

				{/* Very small, contained local cyan glow (no floor streak) */}
				<pointLight color="#38d6ff" intensity={0.05} distance={1.2} position={[0, 0.65, 0]} />
				<CrystalMotes />
				{FRAGMENTS.map((fragment, index) => <Fragment key={fragment.label} {...fragment} index={index} />)}
				<BillboardLabel position={[0, 1.05, 0]} fontSize={0.075} color="#FAF8F2" anchorX="center" anchorY="middle" letterSpacing={0.12} outlineWidth={0.005} outlineColor="#05070c">
					THE SPARK
				</BillboardLabel>
			</group>
		</group>
	)
}

export default SparkInstallation
