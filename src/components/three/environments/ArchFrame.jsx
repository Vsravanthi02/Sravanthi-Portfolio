import { useMemo } from 'react'
import * as THREE from 'three'
import { getTravertineMaterials } from '../materials/travertineTexture'

// Monumental architectural gateway matching primary visual benchmark media_1790162892176.jpg:
// - Heavy monolithic Roman travertine limestone construction (#c8c0b2, desaturated warm sand/beige)
// - Massive flanking structural piers with deep vertical shadow channels and recessed warm architectural lighting
// - Deep circular portal reveal with recessed architectural cove illumination
// - Clean, heavy contemporary monolithic coping with dark shadow reveal
function useFrameGeometry(radius, outerWidth, outerHeight, thickness) {
	return useMemo(() => {
		const shape = new THREE.Shape()
		const hw = outerWidth / 2
		shape.moveTo(-hw, 0)
		shape.lineTo(hw, 0)
		shape.lineTo(hw, outerHeight)
		shape.lineTo(-hw, outerHeight)
		shape.closePath()
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
		const uvScale = 4.8
		for (let i = 0; i < pos.count; i++) {
			uvs.setXY(i, (pos.getX(i) + hw) / uvScale, pos.getY(i) / uvScale)
			const z = pos.getZ(i)
			if (z <= 0.01) norms.setXYZ(i, 0, 0, -1) // Front face facing camera (-Z)
			else if (z >= thickness - 0.01) norms.setXYZ(i, 0, 0, 1) // Back face (+Z)
		}
		norms.needsUpdate = true
		return geom
	}, [radius, outerWidth, outerHeight, thickness])
}

// Deep portal cylinder reveal — warm travertine tunnel leading into the vista
function useRevealGeometry(radius, depth) {
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
	stoneColor = '#bcb4a6',       // authentic desaturated warm beige travertine/limestone
	metalColor = '#10141c',       // deep structural charcoal
	edgeColor = '#ffa032'         // restrained warm amber-gold architectural LED
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	const outerWidth = radius * 2.80    // ≈ 14.56
	const outerHeight = radius * 2.05   // ≈ 10.66
	const portalCY = outerHeight / 2
	const thickness = 2.6

	const geometry = useFrameGeometry(radius, outerWidth, outerHeight, thickness)
	const revealGeom = useRevealGeometry(radius - 0.03, thickness + 0.2)

	const baseWidth = outerWidth + 3.8
	const baseDepth = thickness + 3.2

	// Massive structural piers flanking the arch
	const pierX = radius + (outerWidth / 2 - radius) * 0.50
	const pierW = (outerWidth / 2 - radius) * 0.94

	const stoneMat = {
		color: stoneColor,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.022,
		roughness: 0.76,
		metalness: 0.02,
	}

	return (
		<group position={position}>

			{/* ── 1. CONTINUOUS STRUCTURAL FOUNDATION PLINTH ── */}
			{/* Heavy charcoal ground course */}
			<mesh position={[0, 0.24, thickness / 2]}>
				<boxGeometry args={[baseWidth, 0.48, baseDepth]} />
				<meshStandardMaterial color={metalColor} roughness={0.88} metalness={0.15} />
			</mesh>
			{/* Travertine plinth step */}
			<mesh position={[0, 0.56, thickness / 2 - 0.12]}>
				<boxGeometry args={[baseWidth - 1.2, 0.48, baseDepth - 0.6]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
			</mesh>

			{/* ── 2. MONUMENTAL CENTRAL TRAVERTINE WALL ── */}
			<mesh geometry={geometry} position={[0, 0, 0]} receiveShadow castShadow>
				<meshStandardMaterial {...stoneMat} />
			</mesh>

			{/* ── 3. DEEP CIRCULAR PORTAL REVEAL & INNER LIGHTING ── */}
			{/* Inner stone tunnel cylinder spanning z=0 to z=thickness */}
			<mesh
				geometry={revealGeom}
				position={[0, portalCY, thickness / 2]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<meshStandardMaterial
					color="#beb4a4"
					map={travertine.albedo}
					roughness={0.78}
					metalness={0.02}
					side={THREE.BackSide}
				/>
			</mesh>

			{/* Front-face architectural stone architrave ring */}
			<mesh position={[0, portalCY, -0.012]}>
				<ringGeometry args={[radius, radius + 0.32, 80]} />
				<meshStandardMaterial
					color={stoneColor}
					map={travertine.albedo}
					bumpMap={travertine.bump}
					bumpScale={0.016}
					roughness={0.72}
					metalness={0.02}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Charcoal shadow reveal groove around portal ring */}
			<mesh position={[0, portalCY, -0.016]}>
				<ringGeometry args={[radius + 0.32, radius + 0.38, 80]} />
				<meshStandardMaterial color={metalColor} roughness={0.90} metalness={0.12} side={THREE.DoubleSide} />
			</mesh>

			{/* Recessed warm-gold architectural LED cove light ring inside the portal inner reveal */}
			<mesh position={[0, portalCY, -0.022]}>
				<ringGeometry args={[radius - 0.04, radius + 0.02, 80]} />
				<meshBasicMaterial color={edgeColor} toneMapped={false} side={THREE.DoubleSide} />
			</mesh>

			{/* ── 4. MASSIVE VERTICAL STRUCTURAL PIERS (Flanking the arch) ── */}
			{[-1, 1].map((side) => {
				const xCol = side * pierX
				return (
					<group key={`arch-pier-${side}`}>
						{/* Monolithic travertine pier column (heavy 0.44m depth projection) */}
						<mesh position={[xCol, outerHeight * 0.50, -0.22]} castShadow receiveShadow>
							<boxGeometry args={[pierW, outerHeight * 0.94, 0.44]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.025} />
						</mesh>

						{/* Pier base plinth */}
						<mesh position={[xCol, 0.72, -0.26]}>
							<boxGeometry args={[pierW + 0.12, 0.24, 0.52]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
						</mesh>

						{/* Deep structural recessed charcoal channel */}
						<mesh position={[xCol, outerHeight * 0.50, -0.40]}>
							<boxGeometry args={[0.34, outerHeight * 0.86, 0.10]} />
							<meshStandardMaterial color={metalColor} roughness={0.85} metalness={0.18} />
						</mesh>

						{/* Luminous warm-amber vertical LED strip recessed inside channel */}
						<mesh position={[xCol, outerHeight * 0.50, -0.44]}>
							<boxGeometry args={[0.07, outerHeight * 0.82, 0.02]} />
							<meshBasicMaterial color={edgeColor} toneMapped={false} />
						</mesh>

						{/* Pier top capital coping */}
						<mesh position={[xCol, outerHeight - 0.14, -0.26]}>
							<boxGeometry args={[pierW + 0.12, 0.26, 0.52]} />
							<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
						</mesh>
					</group>
				)
			})}

			{/* ── 5. HEAVY MONOLITHIC CONTEMPORARY TOP COPING ── */}
			{/* Dark shadow reveal band */}
			<mesh position={[0, outerHeight + 0.10, thickness / 2 - 0.12]}>
				<boxGeometry args={[outerWidth + 0.4, 0.08, thickness + 0.60]} />
				<meshStandardMaterial color={metalColor} roughness={0.88} metalness={0.15} />
			</mesh>
			{/* Projecting monolithic travertine coping cap */}
			<mesh position={[0, outerHeight + 0.30, thickness / 2 - 0.14]}>
				<boxGeometry args={[outerWidth + 0.85, 0.32, thickness + 0.75]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
			</mesh>

		</group>
	)
}

export default ArchFrame
