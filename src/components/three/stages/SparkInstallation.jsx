import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Environment, Text } from '@react-three/drei'
import BillboardLabel from '../BillboardLabel'
import ReflectiveGround from '../environments/ReflectiveGround'
import ArchFrame from '../environments/ArchFrame'
import WingWall from '../environments/WingWall'
import ProceduralTree from '../environments/ProceduralTree'
import { destinationById } from '../../../data/destinations'

// Five fragments in fixed orbit slots, one per concept — not decorative
// sparkles, each one is a distinct faceted shape so the cluster reads as
// "several small ideas circling one core" rather than random debris.
// Mostly warm-white/lavender per the palette direction, with cyan kept to a
// minority so the crystal itself stays the one clearly "technological" object.
const FRAGMENTS = [
	{ label: 'QUESTIONS', angle: 0, radius: 0.62, height: 0.14, geometry: 'tetrahedron', color: '#F5F1E8' },
	{ label: 'CURIOSITY', angle: (Math.PI * 2) / 5, radius: 0.7, height: -0.07, geometry: 'octahedron', color: '#B9B4FF' },
	{ label: 'PROBLEMS', angle: (Math.PI * 4) / 5, radius: 0.58, height: 0.22, geometry: 'tetrahedron', color: '#69E7FF' },
	{ label: 'EXPLORATION', angle: (Math.PI * 6) / 5, radius: 0.74, height: -0.16, geometry: 'octahedron', color: '#F5F1E8' },
	{ label: 'POSSIBILITIES', angle: (Math.PI * 8) / 5, radius: 0.66, height: 0.03, geometry: 'tetrahedron', color: '#B9B4FF' },
]

// Trees only at the far edges of the plaza, framing the architecture rather
// than scattered around the crystal — clustered in two groups, left and right.
const TREES = [
	[-9.5, 0, 2, 1.1], [-10.8, 0, 4.5, 1.3], [-8.6, 0, 6, 0.95], [-11.5, 0, 0, 1.05],
	[9.8, 0, 2.5, 1.15], [11.2, 0, 5, 1.25], [8.8, 0, 6.5, 1.0], [11.8, 0, 0.5, 1.1],
]

// A handful of tiny motes drifting slowly upward off the crystal — restrained
// (six points, not a particle system), just enough to feel like the idea is
// "active" rather than a static prop.
function CrystalMotes() {
	const ref = useRef()
	const seeds = useRef(Array.from({ length: 6 }, (_, i) => ({ angle: (i / 6) * Math.PI * 2, radius: 0.18 + (i % 3) * 0.05, offset: i * 1.7 })))
	useFrame((state) => {
		if (!ref.current) return
		seeds.current.forEach((seed, i) => {
			const t = (state.clock.elapsedTime * 0.12 + seed.offset) % 3
			const child = ref.current.children[i]
			if (!child) return
			child.position.set(Math.cos(seed.angle) * seed.radius, 0.3 + t * 0.45, Math.sin(seed.angle) * seed.radius)
			child.material.opacity = Math.max(0, 0.5 - t * 0.17)
		})
	})
	return (
		<group ref={ref}>
			{seeds.current.map((_, i) => (
				<mesh key={i}><sphereGeometry args={[0.012, 6, 6]} /><meshBasicMaterial color="#69E7FF" transparent opacity={0.4} /></mesh>
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
			{geometry === 'tetrahedron' ? <tetrahedronGeometry args={[0.06, 0]} /> : <octahedronGeometry args={[0.052, 0]} />}
			<meshStandardMaterial color="#1c2536" emissive={color} emissiveIntensity={0.4} flatShading roughness={0.4} metalness={0.25} />
		</mesh>
	)
}

// Distant low-poly mountain ridges on the horizon behind the monumental arch.
// These frame the warm golden sunset, create authentic atmospheric depth,
// and replace the photographic ground with majestic dark mountain silhouettes.
function Ridge({ position, points, color }) {
	const geometry = useMemo(() => {
		const shape = new THREE.Shape()
		shape.moveTo(points[0][0], 0)
		points.forEach(([x, y]) => shape.lineTo(x, y))
		shape.lineTo(points[points.length - 1][0], 0)
		shape.closePath()
		return new THREE.ExtrudeGeometry(shape, { depth: 1.4, bevelEnabled: false })
	}, [points])
	return (
		<mesh position={position} geometry={geometry}>
			<meshStandardMaterial color={color} roughness={0.95} />
		</mesh>
	)
}

const DEFAULT_RIDGES = [
	// Flanking far-left ridge silhouette
	{ position: [-26, 0, 22], color: '#162034', points: [[-14, 0], [-8, 4.5], [-3, 6.8], [2, 3.5], [8, 5.2], [14, 0]] },
	// Central ridge with natural mountain pass / saddle behind gateway opening:
	// Peaks on left (x=-5.5, y=5.8) and right (x=5.5, y=5.6) frame the gateway, while the saddle (y=2.2)
	// reveals the glowing golden-hour sunset directly behind the identity typography!
	{ position: [0, 0, 25], color: '#121a2a', points: [[-14, 0], [-8, 4.2], [-5.5, 5.8], [-3, 2.4], [0, 2.1], [3, 2.4], [5.5, 5.6], [8, 4.0], [14, 0]] },
	// Flanking far-right ridge silhouette
	{ position: [26, 0, 22], color: '#162034', points: [[-14, 0], [-8, 5.0], [-2, 3.6], [3, 6.5], [9, 4.2], [14, 0]] },
	// Deep background atmospheric layers with clear central sky window
	{ position: [-15, 0, 38], color: '#252940', points: [[-16, 0], [-9, 7.2], [-4, 2.8], [0, 2.4], [4, 2.8], [8, 8.2], [16, 0]] },
	{ position: [15, 0, 40], color: '#2d2b44', points: [[-16, 0], [-8, 7.8], [-4, 2.9], [0, 2.5], [4, 2.9], [8, 6.8], [16, 0]] },
	// Low flanking terrain mounds covering any HDRI ground at screen edges
	{ position: [-18, -0.2, 12], color: '#101928', points: [[-10, 0], [-5, 2.4], [0, 1.8], [6, 2.6], [10, 0]] },
	{ position: [18, -0.2, 12], color: '#101928', points: [[-10, 0], [-5, 2.5], [0, 1.9], [5, 2.4], [10, 0]] },
]

function SparkInstallation({ onSelect }) {
	const coreRef = useRef()
	useFrame((_, delta) => {
		if (coreRef.current) coreRef.current.rotation.y += delta * 0.1
	})

	return (
		<group position={[0, 0, 0]}>
			{/* Real HDRI environment: hilly_terrain_01_2k.hdr.
			    backgroundRotation={[0, 2.25, 0]} aligns the glowing golden-hour sunset directly behind the monumental gateway.
			    backgroundBlurriness softens the sky into a rich cinematic gradient.
			    backgroundIntensity preserves the saturated blue-violet zenith and warm amber horizon. */}
			<Suspense fallback={null}>
				<Environment
					files="/environment/hilly_terrain_01_2k.hdr"
					background={true}
					backgroundIntensity={0.92}
					environmentIntensity={0.95}
					backgroundBlurriness={0.035}
					backgroundRotation={[0, 2.25, 0]}
					environmentRotation={[0, 2.25, 0]}
				/>
			</Suspense>

			{/* Layered distant mountain ridges on the horizon framing the golden-hour sunset */}
			{DEFAULT_RIDGES.map((ridge, index) => <Ridge key={index} {...ridge} />)}

			{/* 1. MONUMENTAL GATEWAY: The hero architectural structure framing the sky and identity */}
			<ArchFrame position={[0, 0, 12]} radius={3.9} tube={0.52} color="#151e2e" edgeColor="#ffb45e" />
			<WingWall position={[-9.6, 0, 7]} rotationY={0.28} width={4.0} height={7.6} color="#141e2e" edgeColor="#ffb45e" />
			<WingWall position={[9.6, 0, 7]} rotationY={-0.28} width={4.0} height={7.6} color="#141e2e" edgeColor="#ffb45e" />

			{/* Architectural threshold balustrade: Dark stone parapet cleanly blocking background stage labels while preserving sky opening above */}
			<mesh position={[0, 1.45, 12.1]} userData={{ cameraIgnore: true }}>
				<boxGeometry args={[7.2, 2.90, 0.35]} />
				<meshStandardMaterial color="#0c1524" roughness={0.9} metalness={0.2} />
			</mesh>
			<mesh position={[0, 2.91, 12.1]} userData={{ cameraIgnore: true }}>
				<boxGeometry args={[7.26, 0.04, 0.38]} />
				<meshStandardMaterial color="#ffb45e" emissive="#ffb45e" emissiveIntensity={0.95} />
			</mesh>

			{/* 2. IDENTITY INSIDE THE GATEWAY: Substantial crisp architectural signage centered in portal opening */}
			<group position={[0, 0, 11.8]} rotation={[0, Math.PI, 0]} renderOrder={10} userData={{ cameraIgnore: true }}>
				{/* Name: ~62% portal inner width, solid vector contours via static TrueType SegoeUI-Bold */}
				<group position={[0, 4.28, 0]}>
					<Text
						position={[-0.07, 0, 0]}
						fontSize={0.54}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.02}
						color="#FAF8F2"
						anchorX="right"
						anchorY="middle"
						outlineWidth={0.010}
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
						position={[0.07, 0, 0]}
						fontSize={0.54}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.02}
						color="#6be1ff"
						anchorX="left"
						anchorY="middle"
						outlineWidth={0.010}
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

				{/* Role / discipline: Bright cyan, DM Mono technical aesthetic at 0.28 scale */}
				<Text
					position={[0, 3.68, 0]}
					fontSize={0.28}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.15}
					color="#6be1ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.007}
					outlineColor="#050a14"
					material-fog={false}
					material-toneMapped={false}
					sdfGlyphSize={128}
					depthTest={true}
					depthWrite={false}
				>
					AI / GENAI ENGINEER
				</Text>

				{/* Architectural golden-amber divider with cyan terminal markers */}
				<mesh position={[0, 3.42, 0]}>
					<planeGeometry args={[2.8, 0.02]} />
					<meshBasicMaterial color="#ffb45e" transparent opacity={0.92} side={THREE.DoubleSide} fog={false} />
				</mesh>
				<mesh position={[-1.4, 3.42, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.04, 0.04]} />
					<meshBasicMaterial color="#6be1ff" side={THREE.DoubleSide} fog={false} />
				</mesh>
				<mesh position={[1.4, 3.42, 0]} rotation={[0, 0, Math.PI / 4]}>
					<planeGeometry args={[0.04, 0.04]} />
					<meshBasicMaterial color="#6be1ff" side={THREE.DoubleSide} fog={false} />
				</mesh>

				{/* Identity statement: Warm-white/soft silver, solid TrueType SegoeUI at 0.23 scale */}
				<Text
					position={[0, 3.18, 0]}
					fontSize={0.23}
					font="/fonts/SegoeUI.ttf"
					letterSpacing={0.03}
					color="#EDF3F8"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
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

			{/* Architectural warm fill lights framing the gateway */}
			<pointLight color="#ffd08a" intensity={2.2} distance={20} position={[2, 5.5, 12]} />
			<pointLight color="#ffb45e" intensity={1.2} distance={16} position={[0, 3.5, 9]} />
			<pointLight color="#ffb45e" intensity={1.0} distance={15} position={[-9.6, 4.5, 7]} />
			<pointLight color="#ffb45e" intensity={1.0} distance={15} position={[9.6, 4.5, 7]} />

			{/* Trees framing the outer edges of the plaza */}
			{TREES.map(([x, y, z, scale], index) => <ProceduralTree key={index} position={[x, y, z]} scale={scale} />)}

			{/* Reflective stone plaza ground */}
			<ReflectiveGround position={[0, 0, 4]} width={28} depth={44} color="#101826" seamColor="#09101a" />

			{/* 3. THE SPARK: Physical artwork installation on the plaza in front of the gateway */}
			<group
				position={[0, 0.02, 5.0]}
				onPointerDown={(event) => event.stopPropagation()}
				onClick={(event) => { event.stopPropagation(); onSelect(destinationById.home) }}
				onDoubleClick={(event) => event.stopPropagation()}
			>
				{/* Dark stone architectural plinth */}
				<mesh position={[0, 0.06, 0]}>
					<cylinderGeometry args={[1.35, 1.45, 0.12, 32]} />
					<meshStandardMaterial color="#0f1726" roughness={0.75} metalness={0.25} />
				</mesh>
				{/* Inner stepped plinth */}
				<mesh position={[0, 0.13, 0]}>
					<cylinderGeometry args={[1.05, 1.15, 0.06, 32]} />
					<meshStandardMaterial color="#142032" roughness={0.65} metalness={0.35} />
				</mesh>
				{/* Subtle luminous inlay ring */}
				<mesh position={[0, 0.165, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[0.95, 0.98, 48]} />
					<meshBasicMaterial color="#6be1ff" transparent opacity={0.6} />
				</mesh>

				{/* The faceted crystal forming above the plinth */}
				<group ref={coreRef} position={[0, 0.52, 0]}>
					<mesh scale={[1, 1.25, 0.9]}>
						<icosahedronGeometry args={[0.25, 0]} />
						<meshStandardMaterial
							color="#0e1b2e"
							emissive="#35D8FF"
							emissiveIntensity={0.3}
							flatShading
							roughness={0.35}
							metalness={0.4}
						/>
					</mesh>
				</group>

				{/* Restrained local cyan glow */}
				<pointLight color="#69E7FF" intensity={0.3} distance={1.8} position={[0, 0.6, 0]} />
				<CrystalMotes />
				{FRAGMENTS.map((fragment, index) => <Fragment key={fragment.label} {...fragment} index={index} />)}
				<BillboardLabel position={[0, 1.05, 0]} fontSize={0.075} color="#F5F1E8" anchorX="center" anchorY="middle" letterSpacing={0.12} outlineWidth={0.005} outlineColor="#05070c">
					THE SPARK
				</BillboardLabel>
			</group>
		</group>
	)
}

export default SparkInstallation
