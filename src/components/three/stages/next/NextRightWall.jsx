import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { NEXT_CONTENT } from '../../../../data/nextData'

// ============================================================================
// RIGHT-SIDE DECORATIVE WALL (CHAPTER 07 — WHAT'S NEXT)
// Based on media_1790773457536.jpg:
// - Subtle dark monolithic stone wall framing the right flank
// - Understated vertical architectural inscription:
//   IDEAS
//   LEARNING
//   PEOPLE
//   OPPORTUNITIES
//   A BRIGHTER
//   TOMORROW
// ============================================================================

export default function NextRightWall({
	position = [-6.2, 0, 3.2],
	rotation = [0, Math.PI / 2 + 0.18, 0],
}) {
	return (
		<group position={position} rotation={rotation}>
			{/* Structural Wall Slab */}
			<mesh position={[0, 3.2, -0.15]} receiveShadow>
				<boxGeometry args={[3.8, 6.4, 0.30]} />
				<meshStandardMaterial color="#161c26" roughness={0.85} metalness={0.15} />
			</mesh>

			{/* Travertine Trim Reveal */}
			<mesh position={[1.88, 3.2, -0.05]}>
				<boxGeometry args={[0.06, 6.4, 0.34]} />
				<meshStandardMaterial color="#2d3848" roughness={0.65} metalness={0.25} />
			</mesh>

			{/* Amber Inscription Glow Trim */}
			<mesh position={[1.92, 3.2, 0.02]}>
				<boxGeometry args={[0.02, 6.2, 0.02]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* Decorative Inscription */}
			<group position={[-0.85, 4.4, 0.02]}>
				<Text
					position={[0, 0, 0]}
					fontSize={0.17}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.12}
					lineHeight={1.9}
					color="#8ea5c0"
					anchorX="left"
					anchorY="top"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.decorativeWords.join('\n')}
				</Text>
			</group>

			{/* Soft Warm Grazing Light (Managed via ChapterLightRig) */}
		</group>
	)
}
