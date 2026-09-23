import { useMemo } from 'react'
import * as THREE from 'three'
import { getTravertineMaterials } from '../materials/travertineTexture'

// Monumental flanking pylon seamlessly matching ArchFrame:
// - Heavy monolithic Roman travertine limestone massing (#c8c0b2)
// - Deep structural charcoal reveal channel with warm LED illumination facing the camera (-Z)
// - Clean contemporary coping and continuous charcoal base plinth
function WingWall({
	position = [0, 0, 0],
	rotationY = 0,
	width = 3.4,
	height = 10.4,
	depth = 2.2,
	color = '#bcb4a6',          // authentic natural travertine limestone
	metalColor = '#10141c',     // deep structural charcoal
	edgeColor = '#ffa032'       // restrained warm amber-gold architectural LED
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	const stoneMat = {
		color,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.024,
		roughness: 0.76,
		metalness: 0.02,
	}

	const frontZ = -depth / 2

	return (
		<group position={position} rotation={[0, rotationY, 0]}>

			{/* ── 1. CONTINUOUS STRUCTURAL BASE PLINTH ── */}
			{/* Heavy charcoal plinth */}
			<mesh position={[0, 0.24, 0]}>
				<boxGeometry args={[width * 1.10, 0.48, depth * 1.16]} />
				<meshStandardMaterial color={metalColor} roughness={0.88} metalness={0.15} />
			</mesh>
			{/* Travertine plinth moulding */}
			<mesh position={[0, 0.54, 0]}>
				<boxGeometry args={[width * 1.04, 0.16, depth * 1.06]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
			</mesh>

			{/* ── 2. MONUMENTAL STONE PYLON BODY ── */}
			<mesh position={[0, height / 2 + 0.54, 0]} receiveShadow castShadow>
				<boxGeometry args={[width, height, depth]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.028} />
			</mesh>

			{/* ── 3. DEEP STRUCTURAL CHARCOAL CHANNEL & WARM LED COVE ── */}
			<mesh position={[0, height / 2 + 0.54, frontZ - 0.05]}>
				<boxGeometry args={[0.36, height * 0.88, 0.10]} />
				<meshStandardMaterial color={metalColor} roughness={0.85} metalness={0.18} />
			</mesh>
			{/* Luminous warm-amber vertical LED strip */}
			<mesh position={[0, height / 2 + 0.54, frontZ - 0.09]}>
				<boxGeometry args={[0.07, height * 0.84, 0.02]} />
				<meshBasicMaterial color={edgeColor} toneMapped={false} />
			</mesh>

			{/* Inner vertical warm LED cove facing toward central gateway */}
			<mesh position={[-(Math.sign(position[0]) || 1) * (width / 2 - 0.16), height / 2 + 0.54, frontZ - 0.06]}>
				<boxGeometry args={[0.07, height * 0.88, 0.02]} />
				<meshBasicMaterial color={edgeColor} toneMapped={false} />
			</mesh>

			{/* ── 4. MONOLITHIC CONTEMPORARY TOP COPING ── */}
			{/* Dark shadow reveal line */}
			<mesh position={[0, height + 0.60, 0]}>
				<boxGeometry args={[width * 1.04, 0.06, depth * 1.08]} />
				<meshStandardMaterial color={metalColor} roughness={0.88} metalness={0.15} />
			</mesh>
			{/* Projecting monolithic travertine coping cap */}
			<mesh position={[0, height + 0.74, 0]}>
				<boxGeometry args={[width * 1.12, 0.26, depth * 1.16]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
			</mesh>

		</group>
	)
}

export default WingWall
