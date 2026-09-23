import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getTravertineMaterials } from '../materials/travertineTexture'

// ============================================================================
// CINEMATIC FUTURISTIC AI SANCTUARY — MONUMENTAL SPATIAL PORTAL
// Design language: MASS + VOID + LIGHT (Pure Sculptural Monolith)
// - NO vertical post-and-lintel columns (eliminates classical temple look)
// - Thick continuous monolithic stone mass with deep circular tunnel void
// - Horizontal cantilevered terraces & layered floating slabs
// - Walkable central stone bridge passing through the circular aperture into the vista
// - Concealed real Three.js warm PointLights with subtle breathing animation
// ============================================================================

function useTunnelPortalGeometry(radius, outerWidth, outerHeight, thickness) {
	return useMemo(() => {
		const shape = new THREE.Shape()
		const hw = outerWidth / 2
		shape.moveTo(-hw, 0)
		shape.lineTo(hw, 0)
		shape.lineTo(hw, outerHeight)
		shape.lineTo(-hw, outerHeight)
		shape.closePath()

		// Circular aperture void
		const hole = new THREE.Path()
		hole.absellipse(0, outerHeight / 2, radius, radius, 0, Math.PI * 2, false, 0)
		shape.holes.push(hole)

		const geom = new THREE.ExtrudeGeometry(shape, {
			depth: thickness,
			bevelEnabled: false,
			curveSegments: 80
		})

		const pos = geom.attributes.position
		const uvs = geom.attributes.uv
		const norms = geom.attributes.normal
		const uvScale = 5.2
		for (let i = 0; i < pos.count; i++) {
			uvs.setXY(i, (pos.getX(i) + hw) / uvScale, pos.getY(i) / uvScale)
			const z = pos.getZ(i)
			if (z <= 0.01) norms.setXYZ(i, 0, 0, -1)
			else if (z >= thickness - 0.01) norms.setXYZ(i, 0, 0, 1)
		}
		norms.needsUpdate = true
		return geom
	}, [radius, outerWidth, outerHeight, thickness])
}

function useInnerTunnelGeometry(radius, depth) {
	return useMemo(() => {
		const geom = new THREE.CylinderGeometry(radius, radius, depth, 80, 1, true)
		const norms = geom.attributes.normal
		for (let i = 0; i < norms.count; i++) {
			norms.setXYZ(i, -norms.getX(i), -norms.getY(i), -norms.getZ(i))
		}
		norms.needsUpdate = true
		return geom
	}, [radius, depth])
}

function ArchFrame({
	position = [0, 0, 9.5],
	radius = 5.2,
	stoneColor = '#c2bcb0',       // neutral warm limestone/travertine
	metalColor = '#0d121a',       // deep structural obsidian/charcoal
	edgeColor = '#ffb45c',        // warm amber architectural LED
	techColor = '#35d8ff'         // subtle cyan quantum datum
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	const outerWidth = radius * 2.95    // ≈ 15.34m
	const outerHeight = radius * 2.10   // ≈ 10.92m
	const portalCY = outerHeight / 2
	const thickness = 3.40              // thick monolithic mass

	const portalGeom = useTunnelPortalGeometry(radius, outerWidth, outerHeight, thickness)
	const innerTunnelGeom = useInnerTunnelGeometry(radius - 0.04, thickness + 2.0)

	const tunnelLightLeftRef = useRef()
	const tunnelLightRightRef = useRef()
	const lintelDownlightRef = useRef()

	// Dynamic breathing animation for real Three.js architectural lights
	useFrame((state) => {
		const t = state.clock.elapsedTime
		const breath = 1.0 + Math.sin(t * 1.4) * 0.045
		if (tunnelLightLeftRef.current) tunnelLightLeftRef.current.intensity = 0.55 * breath
		if (tunnelLightRightRef.current) tunnelLightRightRef.current.intensity = 0.55 * breath
		if (lintelDownlightRef.current) lintelDownlightRef.current.intensity = 0.45 * (1.0 + Math.sin(t * 1.8 + 1.0) * 0.04)
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

	const baseWidth = outerWidth + 4.8
	const baseDepth = thickness + 4.4

	return (
		<group position={position}>

			{/* ── 1. CONTINUOUS MONOLITHIC GROUND PLINTH ── */}
			<mesh position={[0, 0.22, thickness / 2]}>
				<boxGeometry args={[baseWidth, 0.44, baseDepth]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>
			<mesh position={[0, 0.54, thickness / 2 - 0.18]}>
				<boxGeometry args={[baseWidth - 1.2, 0.48, baseDepth - 0.8]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
			</mesh>

			{/* ── 2. PRIMARY MONUMENTAL SCULPTURAL WALL (Continuous mass with Circular Void) ── */}
			<mesh geometry={portalGeom} position={[0, 0, 0]} receiveShadow castShadow>
				<meshStandardMaterial {...stoneMat} />
			</mesh>

			{/* ── 3. DEEP MULTI-LAYERED SPATIAL TUNNEL REVEALS ── */}
			{/* Continuous inner stone cylinder tunnel reaching back through z=thickness to +2.0m */}
			<mesh
				geometry={innerTunnelGeom}
				position={[0, portalCY, thickness / 2 + 0.6]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<meshStandardMaterial
					color="#bbb4a6"
					map={travertine.albedo}
					roughness={0.76}
					metalness={0.02}
					side={THREE.BackSide}
				/>
			</mesh>

			{/* Nested Step 1: Front obsidian reveal ring framing aperture */}
			<mesh position={[0, portalCY, -0.015]}>
				<ringGeometry args={[radius - 0.02, radius + 0.24, 80]} />
				<meshStandardMaterial {...darkMat} side={THREE.DoubleSide} />
			</mesh>

			{/* Nested Step 2: Concealed warm amber cove LED ring tucked in reveal */}
			<mesh position={[0, portalCY, -0.025]}>
				<ringGeometry args={[radius - 0.04, radius + 0.02, 80]} />
				<meshBasicMaterial color={edgeColor} toneMapped={false} side={THREE.DoubleSide} />
			</mesh>

			{/* Nested Step 3: Mid-tunnel obsidian constriction ring for optical depth */}
			<mesh position={[0, portalCY, thickness * 0.48]} rotation={[Math.PI / 2, 0, 0]}>
				<cylinderGeometry args={[radius - 0.06, radius - 0.06, 0.22, 80, 1, true]} />
				<meshStandardMaterial {...darkMat} side={THREE.BackSide} />
			</mesh>

			{/* REAL THREE.JS WARM POINTLIGHTS inside the tunnel reveals illuminating the stone curve */}
			<pointLight
				ref={tunnelLightLeftRef}
				position={[-radius * 0.65, portalCY - 0.8, thickness * 0.45]}
				color="#ffaa48"
				intensity={0.55}
				distance={5.8}
				decay={2}
			/>
			<pointLight
				ref={tunnelLightRightRef}
				position={[radius * 0.65, portalCY - 0.8, thickness * 0.45]}
				color="#ffaa48"
				intensity={0.55}
				distance={5.8}
				decay={2}
			/>

			{/* ── 4. WALKABLE CENTRAL STONE BRIDGE DECK THROUGH THE VOID ── */}
			<group position={[0, 0.65, thickness / 2 + 0.5]}>
				<mesh position={[0, 0, 0]} receiveShadow>
					<boxGeometry args={[4.8, 0.28, thickness + 4.8]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
				</mesh>
				<mesh position={[-2.42, -0.02, 0]}>
					<boxGeometry args={[0.08, 0.32, thickness + 4.8]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[2.42, -0.02, 0]}>
					<boxGeometry args={[0.08, 0.32, thickness + 4.8]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[-2.38, -0.14, 0]}>
					<boxGeometry args={[0.02, 0.02, thickness + 4.6]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} />
				</mesh>
				<mesh position={[2.38, -0.14, 0]}>
					<boxGeometry args={[0.02, 0.02, thickness + 4.6]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} />
				</mesh>
			</group>

			{/* ── 5. ASYMMETRIC SCULPTURAL CANTILEVERED SLABS (Replacing vertical columns) ── */}
			{/* Main horizontal cantilevered roof canopy projecting forward 1.4m */}
			<mesh position={[0, outerHeight + 0.35, thickness / 2 - 0.55]} castShadow receiveShadow>
				<boxGeometry args={[outerWidth + 2.8, 0.52, thickness + 1.6]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.026} />
			</mesh>
			<mesh position={[0, outerHeight + 0.05, thickness / 2 - 0.25]}>
				<boxGeometry args={[outerWidth + 1.2, 0.14, thickness + 0.8]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>

			{/* Real Three.js downlight under main roof canopy */}
			<pointLight
				ref={lintelDownlightRef}
				position={[0, outerHeight - 0.15, -0.8]}
				color="#ffaa48"
				intensity={0.45}
				distance={6.5}
				decay={2}
			/>

			{/* ASYMMETRIC FEATURE 1: Left Cantilevered Mid-Level Observation Balcony */}
			<group position={[-outerWidth * 0.36, 4.8, -0.55]}>
				<mesh castShadow receiveShadow>
					<boxGeometry args={[3.2, 0.44, 2.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				<mesh position={[0, -0.26, 0]}>
					<boxGeometry args={[3.0, 0.08, 2.0]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				{/* Underside soft warm amber wash */}
				<mesh position={[0, -0.24, -0.95]}>
					<boxGeometry args={[2.8, 0.02, 0.02]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} />
				</mesh>
				<mesh position={[0, 0.48, -0.95]}>
					<boxGeometry args={[3.0, 0.48, 0.06]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
			</group>

			{/* ASYMMETRIC FEATURE 2: Right Recessed Structural Fin with Horizontal Light Reveals */}
			<group position={[outerWidth * 0.38, 4.8, -0.25]}>
				<mesh castShadow receiveShadow>
					<boxGeometry args={[2.6, outerHeight * 0.82, 0.65]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				<mesh position={[-0.4, 0, -0.34]}>
					<boxGeometry args={[0.28, outerHeight * 0.78, 0.10]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[-0.4, 0, -0.38]}>
					<boxGeometry args={[0.06, outerHeight * 0.74, 0.02]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} />
				</mesh>
				{/* Horizontal cantilevered blade slab extending outward */}
				<mesh position={[0.6, 1.8, -0.2]} castShadow receiveShadow>
					<boxGeometry args={[2.2, 0.32, 1.6]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
				</mesh>
			</group>

			{/* ASYMMETRIC ROOF FEATURE: Elevated Cantilevered Penthouse Terrace on Left */}
			<group position={[-outerWidth * 0.25, outerHeight + 0.85, thickness / 2 - 0.4]}>
				<mesh castShadow receiveShadow>
					<boxGeometry args={[outerWidth * 0.48, 0.65, thickness + 1.4]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				<mesh position={[0, -0.36, 0]}>
					<boxGeometry args={[outerWidth * 0.46, 0.08, thickness + 1.2]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
			</group>

			{/* Subtle horizontal cyan quantum datum lines across base */}
			<mesh position={[-outerWidth * 0.28, 1.45, -0.015]}>
				<planeGeometry args={[outerWidth * 0.36, 0.022]} />
				<meshBasicMaterial color={techColor} transparent opacity={0.65} toneMapped={false} />
			</mesh>
			<mesh position={[ outerWidth * 0.28, 1.45, -0.015]}>
				<planeGeometry args={[outerWidth * 0.36, 0.022]} />
				<meshBasicMaterial color={techColor} transparent opacity={0.65} toneMapped={false} />
			</mesh>

		</group>
	)
}

export default ArchFrame
