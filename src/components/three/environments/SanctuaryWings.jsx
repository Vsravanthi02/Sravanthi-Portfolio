import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getTravertineMaterials } from '../materials/travertineTexture'

// ============================================================================
// ASYMMETRICAL SANCTUARY WINGS — SCULPTURAL FUTURISTIC ARCHITECTURE
// - Left Wing: Low-to-mid horizontal cantilevered pavilion stepping down to landscape
// - Right Wing: Staggered multi-tier architectural masses with floating terraces
// - Zero vertical column pilasters (pure Mass + Void + Light)
// - Real Three.js PointLights casting warm amber wash on adjacent stone
// ============================================================================

export function SanctuaryLeftWing({
	position = [-11.6, 0, 9.2],
	stoneColor = '#c2bcb0',
	metalColor = '#0d121a',
	edgeColor = '#ffb45c',
	techColor = '#35d8ff'
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])
	const lightRef = useRef()

	useFrame((state) => {
		if (lightRef.current) {
			const t = state.clock.elapsedTime
			lightRef.current.intensity = 0.45 * (1.0 + Math.sin(t * 1.5 + 2.0) * 0.04)
		}
	})

	const stoneMat = {
		color: stoneColor,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.024,
		roughness: 0.74,
		metalness: 0.02,
	}

	const darkMat = {
		color: metalColor,
		roughness: 0.88,
		metalness: 0.22,
	}

	return (
		<group position={position}>
			{/* ── 1. TERRACED SUB-PLINTH ── */}
			<mesh position={[0, 0.22, 0]}>
				<boxGeometry args={[5.8, 0.44, 5.4]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>
			<mesh position={[0, 0.54, 0]}>
				<boxGeometry args={[5.4, 0.48, 5.0]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
			</mesh>

			{/* ── 2. MONUMENTAL LOWER STONE MASS ── */}
			<mesh position={[0, 2.2, 0]} receiveShadow castShadow>
				<boxGeometry args={[4.8, 3.4, 4.4]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.026} />
			</mesh>

			{/* ── 3. DRAMATIC FLOATING CANTILEVERED PAVILION SLAB ── */}
			{/* Projects boldly forward with a deep undercut shadow soffit */}
			<group position={[0.2, 4.6, -0.6]}>
				<mesh receiveShadow castShadow>
					<boxGeometry args={[5.6, 1.4, 4.8]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.026} />
				</mesh>
				{/* Undercut obsidian soffit reveal */}
				<mesh position={[0, -0.75, 0]}>
					<boxGeometry args={[5.4, 0.12, 4.6]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				{/* Concealed amber downlight slot washing the lower stone wall */}
				<mesh position={[0, -0.72, -1.8]}>
					<boxGeometry args={[4.6, 0.025, 0.03]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} />
				</mesh>
				{/* REAL THREE.JS AMBER POINTLIGHT casting downward warm light */}
				<pointLight
					ref={lightRef}
					position={[0, -1.0, -1.6]}
					color="#ffaa48"
					intensity={0.45}
					distance={5.5}
					decay={2}
				/>
			</group>

			{/* ── 4. UPPER STEPPED SETBACK MASS ── */}
			<group position={[-0.4, 6.8, 0.2]}>
				<mesh receiveShadow castShadow>
					<boxGeometry args={[3.8, 2.8, 3.8]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				{/* Cantilevered roof coping slab */}
				<mesh position={[0, 1.55, 0]} castShadow receiveShadow>
					<boxGeometry args={[4.4, 0.36, 4.4]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
				</mesh>
				<mesh position={[0, 1.34, 0]}>
					<boxGeometry args={[4.0, 0.08, 4.0]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
			</group>

			{/* Horizontal cyan quantum datum near base */}
			<mesh position={[0.2, 1.45, -2.25]}>
				<boxGeometry args={[4.2, 0.025, 0.04]} />
				<meshBasicMaterial color={techColor} transparent opacity={0.65} toneMapped={false} />
			</mesh>
		</group>
	)
}

export function SanctuaryRightWing({
	position = [11.8, 0, 9.2],
	stoneColor = '#c2bcb0',
	metalColor = '#0d121a',
	edgeColor = '#ffb45c',
	techColor = '#35d8ff'
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])
	const lightRef = useRef()

	useFrame((state) => {
		if (lightRef.current) {
			const t = state.clock.elapsedTime
			lightRef.current.intensity = 0.42 * (1.0 + Math.sin(t * 1.6 + 0.8) * 0.04)
		}
	})

	const stoneMat = {
		color: stoneColor,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.024,
		roughness: 0.74,
		metalness: 0.02,
	}

	const darkMat = {
		color: metalColor,
		roughness: 0.88,
		metalness: 0.22,
	}

	return (
		<group position={position}>
			{/* ── 1. TERRACED SUB-PLINTH ── */}
			<mesh position={[0, 0.22, 0]}>
				<boxGeometry args={[5.6, 0.44, 5.0]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>
			<mesh position={[0, 0.54, 0]}>
				<boxGeometry args={[5.2, 0.48, 4.6]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
			</mesh>

			{/* ── 2. MONUMENTAL STRUCTURAL MASS WITH CANTILEVERED OBSERVATION DECK ── */}
			<group position={[-0.6, 4.6, 0.1]}>
				<mesh receiveShadow castShadow>
					<boxGeometry args={[3.6, 7.8, 3.6]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.026} />
				</mesh>
				{/* Top cantilevered cap */}
				<mesh position={[0, 4.1, 0]} castShadow receiveShadow>
					<boxGeometry args={[4.2, 0.40, 4.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
				</mesh>
				<mesh position={[0, 3.86, 0]}>
					<boxGeometry args={[3.8, 0.08, 3.8]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				{/* REAL THREE.JS POINTLIGHT casting light onto terrace */}
				<pointLight
					ref={lightRef}
					position={[0, 0.8, -1.8]}
					color="#ffaa48"
					intensity={0.42}
					distance={5.0}
					decay={2}
				/>
			</group>

			{/* ── 3. SECONDARY STEPPED SETBACK MASS & TERRACE ── */}
			<group position={[1.8, 3.4, -0.7]}>
				<mesh receiveShadow castShadow>
					<boxGeometry args={[2.8, 5.6, 3.0]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				{/* Cantilevered terrace slab */}
				<mesh position={[0, 2.95, 0]} castShadow receiveShadow>
					<boxGeometry args={[3.4, 0.32, 3.6]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
				</mesh>
				<mesh position={[0, 2.75, 0]}>
					<boxGeometry args={[3.0, 0.08, 3.2]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
			</group>

			{/* Horizontal cyan quantum datum near base */}
			<mesh position={[0.4, 1.45, -1.9]}>
				<boxGeometry args={[3.8, 0.025, 0.04]} />
				<meshBasicMaterial color={techColor} transparent opacity={0.65} toneMapped={false} />
			</mesh>
		</group>
	)
}

export default function WingWall(props) {
	return props.position?.[0] < 0 ? (
		<SanctuaryLeftWing {...props} />
	) : (
		<SanctuaryRightWing {...props} />
	)
}

