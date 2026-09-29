import { useMemo } from 'react'
import * as THREE from 'three'
import { getTravertineMaterials } from '../../materials/travertineTexture'

// ============================================================================
// BUILD COLONNADE & PROMENADE ARCHITECTURE
// Reconstructs the monumental open-air colonnade from reference media_1790181412671.jpg:
// - Monumental fluted architectural columns framing both sides of the promenade
// - Soaring horizontal cantilever beams overhead framing the golden-hour sky
// - Continuous honed stone floor pavers with dark reveals
// - Warm architectural uplights washing the column shafts
// ============================================================================

const COLUMN_POSITIONS = [
	[ 8.2, 14.0], [ 8.2, 18.0], [ 8.2, 22.0], [ 8.2, 26.0],
	[-8.2, 14.0], [-8.2, 18.0], [-8.2, 22.0], [-8.2, 26.0],
]

function FlutedColumn({ position, stoneMat, darkMat }) {
	const [x, z] = position

	return (
		<group position={[x, 0, z]}>
			{/* Plinth Base */}
			<mesh position={[0, 0.25, 0]} receiveShadow>
				<boxGeometry args={[1.5, 0.5, 1.5]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.02} />
			</mesh>
			<mesh position={[0, 0.54, 0]}>
				<cylinderGeometry args={[0.72, 0.76, 0.08, 32]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>

			{/* Fluted Column Shaft */}
			<mesh position={[0, 4.8, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[0.62, 0.68, 8.5, 28]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
			</mesh>

			{/* Top Capital & Beam Anchor */}
			<mesh position={[0, 9.15, 0]}>
				<cylinderGeometry args={[0.78, 0.65, 0.2, 32]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>
			<mesh position={[0, 9.4, 0]} castShadow receiveShadow>
				<boxGeometry args={[1.6, 0.35, 1.6]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.02} />
			</mesh>
		</group>
	)
}

export default function BuildColonnade() {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	const stoneMat = {
		color: '#c2bcb0',
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.022,
		roughness: 0.74,
		metalness: 0.02,
	}

	const darkMat = {
		color: '#0d121a',
		roughness: 0.88,
		metalness: 0.22,
	}

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. CONTINUOUS PROMENADE FLOOR SLAB ── */}
			<mesh position={[0, 0.015, 20.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeGeometry args={[20.0, 16.0]} />
				<meshStandardMaterial
					color="#0c1018"
					map={travertine.plaza}
					metalness={0.05}
					roughness={0.52}
				/>
			</mesh>

			{/* Perimeter Obsidian Ground Reveal Lines */}
			<mesh position={[9.2, 0.025, 20.0]}>
				<boxGeometry args={[0.08, 0.02, 16.0]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>
			<mesh position={[-9.2, 0.025, 20.0]}>
				<boxGeometry args={[0.08, 0.02, 16.0]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>

			{/* Subtle warm curb run along promenade flanks */}
			<mesh position={[9.15, 0.028, 20.0]}>
				<boxGeometry args={[0.02, 0.015, 15.6]} />
				<meshBasicMaterial color="#ffb45c" toneMapped={false} transparent opacity={0.65} />
			</mesh>
			<mesh position={[-9.15, 0.028, 20.0]}>
				<boxGeometry args={[0.02, 0.015, 15.6]} />
				<meshBasicMaterial color="#ffb45c" toneMapped={false} transparent opacity={0.65} />
			</mesh>

			{/* Consolidated Warm Architectural Colonnade Uplights (replaces 8 individual column lights) */}
			<pointLight position={[8.2, 1.2, 20.0]} color="#ffaa48" intensity={0.9} distance={12.0} decay={2} />
			<pointLight position={[-8.2, 1.2, 20.0]} color="#ffaa48" intensity={0.9} distance={12.0} decay={2} />

			{/* ── 2. FLUTED ARCHITECTURAL COLUMNS ── */}
			{COLUMN_POSITIONS.map((pos, idx) => (
				<FlutedColumn key={idx} position={pos} stoneMat={stoneMat} darkMat={darkMat} />
			))}

			{/* ── 3. OVERHEAD HORIZONTAL ARCHITECTURAL CANOPY BEAMS ── */}
			{/* Longitudinal roof beams running along both colonnades */}
			<mesh position={[8.2, 9.75, 20.0]} castShadow>
				<boxGeometry args={[1.2, 0.5, 14.5]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
			</mesh>
			<mesh position={[-8.2, 9.75, 20.0]} castShadow>
				<boxGeometry args={[1.2, 0.5, 14.5]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
			</mesh>

			{/* Transverse cross-ties framing the open sky at z = 14 and z = 26 */}
			<mesh position={[0, 9.85, 14.0]} castShadow>
				<boxGeometry args={[16.0, 0.35, 0.9]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
			</mesh>
			<mesh position={[0, 9.85, 26.0]} castShadow>
				<boxGeometry args={[16.0, 0.35, 0.9]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
			</mesh>
		</group>
	)
}

