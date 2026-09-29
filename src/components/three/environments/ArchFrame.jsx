import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { getTravertineMaterials } from '../materials/travertineTexture'
import { WALL_TYPOGRAPHY } from './wallTypographyConfig'

// ============================================================================
// UNIFIED SCULPTURAL MEGASTRUCTURE — AI SANCTUARY
// True Sculptural Architecture: MASS + VOID + LIGHT
//
// 1. RIGHT SIDE (-X): Heavy Grounded Monolithic Anchor Mass
//    - Carved, layered bedrock volume (7m thick) with horizontal shadow cuts
//    - Stepped terraces, observation decks, and recessed obsidian lighting canyons
//    - Restrained vertical architectural wayfinding word stack
//
// 2. CENTER: Enormous 5-Layer Deep Spatial Portal Tunnel
//    - Embedded into the anchor mass on the right
//    - Carved 6.0m deep with nested chamfered reveals and obsidian shadow baffles
//    - Walkable central stone bridge passing directly through the aperture into vista
//    - Real warm PointLights inside tunnel casting quadratic bounce light
//    - Subtle discovery inscription on bridge plinth threshold
//
// 3. LEFT SIDE (+X): Pure Open Negative Space Under Dramatic Floating Canopy
//    - A colossal horizontal roof canopy anchored to the right mass, spanning
//      across the portal, and cantilevering 17m OUT TO THE LEFT over open space!
//    - Inlaid architectural typography on vertical stone fascia under canopy
//    - Camera looks directly under the hovering roof at the sunset sky & mountains
// ============================================================================

function useTunnelInteriorGeometry(radius, depth) {
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
	outerHeight = 11.8,
	stoneColor = '#c2bcb0',       // neutral warm limestone/travertine
	metalColor = '#0d121a',       // deep structural obsidian/charcoal
	edgeColor = '#ffb45c',        // warm amber architectural LED
	techColor = '#35d8ff'         // subtle cyan quantum datum
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	const portalCY = 5.4
	const tunnelDepth = 2.0

	const innerTunnelGeom = useTunnelInteriorGeometry(radius - 0.04, tunnelDepth)

	const tunnelLightLeftRef = useRef()
	const tunnelLightRightRef = useRef()
	const canopyDownlightRef = useRef()
	const anchorLightRef = useRef()

	// Subtle breathing animation for real Three.js architectural lights (±4.5% sinusoidal)
	useFrame((state) => {
		const t = state.clock.elapsedTime
		const breath = 1.0 + Math.sin(t * 1.4) * 0.045
		if (tunnelLightLeftRef.current) tunnelLightLeftRef.current.intensity = 0.58 * breath
		if (tunnelLightRightRef.current) tunnelLightRightRef.current.intensity = 0.58 * breath
		if (canopyDownlightRef.current) canopyDownlightRef.current.intensity = 0.52 * (1.0 + Math.sin(t * 1.8 + 1.2) * 0.04)
		if (anchorLightRef.current) anchorLightRef.current.intensity = 0.44 * (1.0 + Math.sin(t * 1.6 + 0.6) * 0.04)
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

			{/* ═══════════════════════════════════════════════════════════════
			    1. SCREEN-RIGHT (-X): SOLID MONOLITHIC ANCHOR MASS
			    Massive, carved bedrock volumes grounded to the earth
			    ═══════════════════════════════════════════════════════════════ */}
			<group position={[-9.2, 0, 1.2]}>
				{/* Continuous heavy base plinth course */}
				<mesh position={[0, 0.22, 0]}>
					<boxGeometry args={[11.5, 0.44, 7.8]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[0, 0.54, 0]}>
					<boxGeometry args={[11.0, 0.48, 7.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
				</mesh>

				{/* Primary monolithic bedrock block */}
				<mesh position={[0, 4.8, 0]} receiveShadow castShadow>
					<boxGeometry args={[10.2, 8.4, 6.4]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.026} />
				</mesh>

				{/* Deep horizontal architectural shadow cuts sliced into the mass */}
				<mesh position={[0, 2.2, -3.22]}>
					<boxGeometry args={[10.3, 0.22, 0.28]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[0, -1.2, -3.22]}>
					<boxGeometry args={[10.3, 0.22, 0.28]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>

				{/* Recessed vertical obsidian light canyon with REAL Three.js PointLight */}
				<mesh position={[2.8, 0.5, -3.25]}>
					<boxGeometry args={[0.42, 7.4, 0.16]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
				<mesh position={[2.8, 0.5, -3.30]}>
					<boxGeometry args={[0.08, 7.0, 0.02]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} />
				</mesh>
				<pointLight
					ref={anchorLightRef}
					position={[2.8, 1.0, -3.8]}
					color="#ffaa48"
					intensity={0.44}
					distance={6.0}
					decay={2}
				/>

				{/* Heavy forward-projecting cantilevered observation deck */}
				<mesh position={[-0.8, 4.4, -2.4]} castShadow receiveShadow>
					<boxGeometry args={[8.8, 0.56, 3.6]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				<mesh position={[-0.8, 4.08, -2.4]}>
					<boxGeometry args={[8.4, 0.12, 3.2]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>

				{/* Upper stepped stone penthouse mass */}
				<mesh position={[-1.2, 9.4, 0.4]} receiveShadow castShadow>
					<boxGeometry args={[7.8, 1.8, 5.6]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>

				{/* ── RIGHT MONOLITHIC ANCHOR INSCRIPTION ── */}
				{/* Handwritten architectural vocabulary matching font and thickness of left wall */}
				<group position={[-1.4, 6.4, -3.22]} rotation={[0, Math.PI, 0]}>
					<Text
						position={[-0.82, 0, 0.015]}
						font={WALL_TYPOGRAPHY.wayfinding.font}
						fontSize={WALL_TYPOGRAPHY.wayfinding.fontSize}
						letterSpacing={WALL_TYPOGRAPHY.wayfinding.letterSpacing}
						lineHeight={WALL_TYPOGRAPHY.wayfinding.lineHeight}
						color={WALL_TYPOGRAPHY.wayfinding.color}
						outlineWidth={WALL_TYPOGRAPHY.wayfinding.outlineWidth}
						outlineColor={WALL_TYPOGRAPHY.wayfinding.outlineColor}
						strokeWidth={WALL_TYPOGRAPHY.wayfinding.strokeWidth}
						strokeColor={WALL_TYPOGRAPHY.wayfinding.strokeColor}
						anchorX="left"
						anchorY="middle"
						textAlign="left"
						material-toneMapped={true}
						material-roughness={WALL_TYPOGRAPHY.wayfinding.roughness}
					>
						{"Curiosity\nData\nModels\nSystems\nImpact"}
					</Text>
				</group>

				{/* Horizontal cyan quantum datum near base */}
				<mesh position={[0, 1.45, -3.24]}>
					<boxGeometry args={[9.8, 0.025, 0.04]} />
					<meshBasicMaterial color={techColor} transparent opacity={0.65} toneMapped={false} />
				</mesh>
			</group>

			{/* ═══════════════════════════════════════════════════════════════
			    2. CENTER: 5-LAYER DEEP SPATIAL PORTAL TUNNEL
			    Carved directly through the megastructure
			    ═══════════════════════════════════════════════════════════════ */}
			<group position={[0, 0, 0]}>
				{/* Foreground Structural Lintel & Visor over the aperture (z = -0.5) */}
				<mesh position={[-1.2, portalCY + radius * 0.72, -0.6]} castShadow receiveShadow>
					<boxGeometry args={[radius * 2.2, 0.65, 1.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
				</mesh>
				<mesh position={[-1.2, portalCY + radius * 0.72 - 0.35, -0.6]}>
					<boxGeometry args={[radius * 2.15, 0.08, 1.15]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>

				{/* Outer Stone Aperture Rim (z = -0.02) */}
				<mesh position={[0, portalCY, -0.02]}>
					<ringGeometry args={[radius - 0.02, radius + 0.38, 80]} />
					<meshStandardMaterial {...darkMat} side={THREE.DoubleSide} />
				</mesh>

				{/* Recessed Obsidian Shadow Void & Warm Cove Ring (z = -0.04) */}
				<mesh position={[0, portalCY, -0.04]}>
					<ringGeometry args={[radius - 0.05, radius + 0.03, 80]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} side={THREE.DoubleSide} />
				</mesh>

				{/* 6.2m Deep Stone Cylinder Tunnel extending back through the mass */}
				<mesh
					geometry={innerTunnelGeom}
					position={[0, portalCY, tunnelDepth / 2]}
					rotation={[Math.PI / 2, 0, 0]}
				>
					<meshStandardMaterial
						color="#b8b0a2"
						map={travertine.albedo}
						roughness={0.78}
						metalness={0.02}
						side={THREE.BackSide}
					/>
				</mesh>

				{/* Deep Mid-tunnel constriction baffle for optical depth */}
				<mesh position={[0, portalCY, tunnelDepth * 0.45]} rotation={[Math.PI / 2, 0, 0]}>
					<cylinderGeometry args={[radius - 0.08, radius - 0.08, 0.28, 80, 1, true]} />
					<meshStandardMaterial {...darkMat} side={THREE.BackSide} />
				</mesh>

				{/* REAL THREE.JS WARM POINTLIGHTS inside tunnel illuminating stone curve */}
				<pointLight
					ref={tunnelLightLeftRef}
					position={[-radius * 0.60, portalCY - 0.6, tunnelDepth * 0.42]}
					color="#ffaa48"
					intensity={0.58}
					distance={6.5}
					decay={2}
				/>
				<pointLight
					ref={tunnelLightRightRef}
					position={[radius * 0.60, portalCY - 0.6, tunnelDepth * 0.42]}
					color="#ffaa48"
					intensity={0.58}
					distance={6.5}
					decay={2}
				/>

				{/* Walkable Central Stone Bridge extending through the portal threshold */}
				<group position={[0, 0.04, tunnelDepth / 2]}>
					<mesh position={[0, 0, 0]} receiveShadow>
						<boxGeometry args={[4.8, 0.08, tunnelDepth + 2.4]} />
						<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
					</mesh>
					<mesh position={[-2.42, 0, 0]}>
						<boxGeometry args={[0.08, 0.10, tunnelDepth + 2.4]} />
						<meshStandardMaterial {...darkMat} />
					</mesh>
					<mesh position={[2.42, 0, 0]}>
						<boxGeometry args={[0.08, 0.10, tunnelDepth + 2.4]} />
						<meshStandardMaterial {...darkMat} />
					</mesh>
					<mesh position={[-2.38, 0.04, 0]}>
						<boxGeometry args={[0.02, 0.02, tunnelDepth + 2.2]} />
						<meshBasicMaterial color={edgeColor} toneMapped={false} />
					</mesh>
					<mesh position={[2.38, 0.04, 0]}>
						<boxGeometry args={[0.02, 0.02, tunnelDepth + 2.2]} />
						<meshBasicMaterial color={edgeColor} toneMapped={false} />
					</mesh>

					{/* ── OPTIONAL DISCOVERY INSCRIPTION ── */}
					{/* Handwritten discovery inscription matching font and thickness of left wall */}
					<Text
						position={[0, 0.045, -(tunnelDepth + 2.4) / 2 + 0.15]}
						rotation={[0, Math.PI, 0]}
						font={WALL_TYPOGRAPHY.discovery.font}
						fontSize={WALL_TYPOGRAPHY.discovery.fontSize}
						letterSpacing={WALL_TYPOGRAPHY.discovery.letterSpacing}
						color={WALL_TYPOGRAPHY.discovery.color}
						outlineWidth={WALL_TYPOGRAPHY.discovery.outlineWidth}
						outlineColor={WALL_TYPOGRAPHY.discovery.outlineColor}
						strokeWidth={WALL_TYPOGRAPHY.discovery.strokeWidth}
						strokeColor={WALL_TYPOGRAPHY.discovery.strokeColor}
						anchorX="center"
						anchorY="middle"
						material-toneMapped={true}
						material-roughness={WALL_TYPOGRAPHY.discovery.roughness}
					>
						Build with intent.
					</Text>
				</group>

				{/* Left Sculptural Tunnel Rib (Connecting tunnel edge upward to the canopy) */}
				{/* Only a sleek curved support blade on the left, NOT a solid box wall! */}
				<group position={[radius + 0.45, portalCY, 0.6]}>
					<mesh castShadow receiveShadow>
						<boxGeometry args={[0.85, outerHeight * 0.88, 3.8]} />
						<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
					</mesh>
					<mesh position={[0.45, 0, 0]}>
						<boxGeometry args={[0.08, outerHeight * 0.84, 3.6]} />
						<meshStandardMaterial {...darkMat} />
					</mesh>
				</group>
			</group>

			{/* ═══════════════════════════════════════════════════════════════
			    3. SCREEN-LEFT (+X): COLOSSAL SOARING CANTILEVER CANOPY
			    Anchored firmly to the right mass, spanning across the portal,
			    and cantilevering 16m out over the vast open negative space!
			    ═══════════════════════════════════════════════════════════════ */}
			<group position={[3.6, 11.4, 1.4]}>
				{/* Colossal stone roof slab (28.5m wide!) */}
				<mesh castShadow receiveShadow>
					<boxGeometry args={[28.5, 0.75, 5.8]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.026} />
				</mesh>

				{/* Deep undercut obsidian shadow soffit */}
				<mesh position={[0, -0.42, 0]}>
					<boxGeometry args={[27.8, 0.14, 5.4]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>

				{/* Concealed amber wash cove running underneath the soaring canopy */}
				<mesh position={[0, -0.40, -2.6]}>
					<boxGeometry args={[26.0, 0.025, 0.03]} />
					<meshBasicMaterial color={edgeColor} toneMapped={false} />
				</mesh>

				{/* ── LEFT INSCRIBED ARCHITECTURAL FASCIA UNDER FLOATING CANOPY ── */}
				{/* Refined vertical stone fascia integrated directly beneath the soaring roof */}
				<group position={[6.6, -1.05, -2.1]} rotation={[0, Math.PI, 0]}>
					{/* Architectural stone panel backing the inscription */}
					<mesh castShadow receiveShadow position={[0, 0, 0]}>
						<boxGeometry args={[8.4, 1.25, 0.24]} />
						<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
					</mesh>
					{/* Obsidian architectural reveal shadow groove */}
					<mesh position={[0, 0.59, 0.02]}>
						<boxGeometry args={[8.3, 0.04, 0.22]} />
						<meshStandardMaterial {...darkMat} />
					</mesh>
					{/* Left Wall Inscription: Handwritten architectural manifesto in warm dark ink */}
					<group position={[0, 0, 0.13]}>
						<Text
							position={[0, 0.20, 0]}
							font={WALL_TYPOGRAPHY.quote.font}
							fontSize={WALL_TYPOGRAPHY.quote.line1.fontSize}
							letterSpacing={WALL_TYPOGRAPHY.quote.line1.letterSpacing}
							color={WALL_TYPOGRAPHY.quote.color}
							outlineWidth={WALL_TYPOGRAPHY.quote.outlineWidth}
							outlineColor={WALL_TYPOGRAPHY.quote.outlineColor}
							strokeWidth={WALL_TYPOGRAPHY.quote.strokeWidth}
							strokeColor={WALL_TYPOGRAPHY.quote.strokeColor}
							anchorX="center"
							anchorY="middle"
							textAlign="center"
							material-toneMapped={true}
							material-roughness={WALL_TYPOGRAPHY.quote.roughness}
						>
							Ideas don't just stay here.
						</Text>
						<Text
							position={[0, -0.24, 0]}
							font={WALL_TYPOGRAPHY.quote.font}
							fontSize={WALL_TYPOGRAPHY.quote.line2.fontSize}
							letterSpacing={WALL_TYPOGRAPHY.quote.line2.letterSpacing}
							color={WALL_TYPOGRAPHY.quote.color}
							outlineWidth={WALL_TYPOGRAPHY.quote.outlineWidth}
							outlineColor={WALL_TYPOGRAPHY.quote.outlineColor}
							strokeWidth={WALL_TYPOGRAPHY.quote.strokeWidth}
							strokeColor={WALL_TYPOGRAPHY.quote.strokeColor}
							anchorX="center"
							anchorY="middle"
							textAlign="center"
							material-toneMapped={true}
							material-roughness={WALL_TYPOGRAPHY.quote.roughness}
						>
							They become something.
						</Text>
					</group>
				</group>

				{/* REAL THREE.JS DOWNLIGHT casting warm wash over screen-left negative space */}
				<pointLight
					ref={canopyDownlightRef}
					position={[5.5, -1.4, -1.8]}
					color="#ffaa48"
					intensity={0.52}
					distance={9.0}
					decay={2}
				/>

				{/* Secondary upper stepped aerodynamic fin on the canopy */}
				<mesh position={[-4.0, 0.65, 0.4]} castShadow receiveShadow>
					<boxGeometry args={[14.0, 0.48, 4.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
				</mesh>
			</group>

		</group>
	)
}

export default ArchFrame
