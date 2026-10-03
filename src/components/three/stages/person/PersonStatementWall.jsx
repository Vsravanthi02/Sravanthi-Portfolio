import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { PERSON_PROFILE } from '../../../../data/personData'

// ============================================================================
// RIGHT WALL ARCHITECTURAL INSCRIPTION (CHAPTER 06 — THE PERSON)
// Elegant monolithic structural stone wall with integrated typography:
// "Curious mind.
//  Builder at heart.
//  Lifelong learner.
//  Problem solver.
//
//  Still exploring.
//  Still building."
// Based on media_1790761295168.jpg
// ============================================================================

export default function PersonStatementWall({ position = [-5.6, 0, 0.6], rotation = [0, Math.PI / 2 + 0.32, 0] }) {
	return (
		<group position={position} rotation={rotation}>
			{/* ── 1. MONUMENTAL STRUCTURAL WALL ── */}
			<mesh position={[0, 3.2, -0.15]} receiveShadow>
				<boxGeometry args={[4.4, 6.4, 0.30]} />
				<meshStandardMaterial color="#1a2029" roughness={0.82} metalness={0.15} />
			</mesh>

			{/* Architectural Travertine Reveal Trim */}
			<mesh position={[2.18, 3.2, -0.05]}>
				<boxGeometry args={[0.06, 6.4, 0.34]} />
				<meshStandardMaterial color="#364356" roughness={0.65} metalness={0.25} />
			</mesh>

			{/* Concealed Vertical Amber Accent Strip */}
			<mesh position={[2.22, 3.2, 0.02]}>
				<boxGeometry args={[0.02, 6.2, 0.02]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* ── 2. ELEGANT INSCRIBED PERSONAL STATEMENT ── */}
			<group position={[-1.15, 4.4, 0.02]}>
				{/* Top 4 lines */}
				<Text
					position={[0, 0, 0]}
					fontSize={0.20}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.04}
					lineHeight={1.55}
					color="#FAF8F2"
					anchorX="left"
					anchorY="top"
					material-toneMapped={false}
				>
					Curious mind.{"\n"}Builder at heart.{"\n"}Lifelong learner.{"\n"}Problem solver.
				</Text>

				{/* Subtle Separator Pip */}
				<mesh position={[0.25, -1.55, 0.005]}>
					<planeGeometry args={[0.5, 0.008]} />
					<meshBasicMaterial color="#ffaa44" transparent opacity={0.6} toneMapped={false} />
				</mesh>

				{/* Closing 2 lines */}
				<Text
					position={[0, -1.85, 0]}
					fontSize={0.20}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.04}
					lineHeight={1.55}
					color="#ffc87a"
					anchorX="left"
					anchorY="top"
					material-toneMapped={false}
				>
					Still exploring.{"\n"}Still building.
				</Text>
			</group>

			{/* Warm Architectural Grazing Light (Managed via ChapterLightRig) */}
		</group>
	)
}
