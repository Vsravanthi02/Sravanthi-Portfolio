import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { NEXT_CONTENT } from '../../../../data/nextData'

// ============================================================================
// LEFT ARCHITECTURAL WALL (CHAPTER 07 — WHAT'S NEXT)
// Based on media_1790773457536.jpg:
// - Monolithic dark structural stone wall
// - Header badge: [ 07 ] WHAT'S NEXT / "Let's build what's next."
// - Inscribed short personal forward-looking statement:
//   "New opportunities, bigger learnings, and meaningful problems ahead."
// - Soft ambient wall-grazing light
// ============================================================================

export default function NextLeftWall({
	position = [4.8, 0, 1.2],
	rotation = [0, -Math.PI / 2 - 0.28, 0],
}) {
	return (
		<group position={position} rotation={rotation}>
			{/* ── 1. MONUMENTAL STRUCTURAL WALL ── */}
			<mesh position={[0, 3.2, -0.15]} receiveShadow>
				<boxGeometry args={[4.2, 6.4, 0.30]} />
				<meshStandardMaterial color="#181f2a" roughness={0.82} metalness={0.18} />
			</mesh>

			{/* Architectural Travertine Reveal Trim */}
			<mesh position={[-2.08, 3.2, -0.05]}>
				<boxGeometry args={[0.06, 6.4, 0.34]} />
				<meshStandardMaterial color="#364356" roughness={0.65} metalness={0.25} />
			</mesh>

			{/* Concealed Vertical Cyan Accent Strip */}
			<mesh position={[-2.12, 3.2, 0.02]}>
				<boxGeometry args={[0.02, 6.2, 0.02]} />
				<meshBasicMaterial color="#00d2ff" toneMapped={false} />
			</mesh>

			{/* ── 2. HEADER: [ 07 ] WHAT'S NEXT / Let's build what's next. ── */}
			<group position={[-1.0, 5.1, 0.02]}>
				{/* Pill Badge [ 07 ] */}
				<mesh position={[-0.52, 0.05, 0]}>
					<planeGeometry args={[0.54, 0.44]} />
					<meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
				</mesh>
				<mesh position={[-0.52, 0.05, 0.001]}>
					<planeGeometry args={[0.54, 0.44]} />
					<meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.8} />
				</mesh>
				<Text
					position={[-0.52, 0.05, 0.008]}
					fontSize={0.22}
					font="/fonts/SegoeUI-Bold.ttf"
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.chapterNumber}
				</Text>

				{/* Title: WHAT'S NEXT */}
				<Text
					position={[-0.12, 0.12, 0.008]}
					fontSize={0.23}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#FAF8F2"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.title}
				</Text>

				{/* Subtitle: Let's build what's next. */}
				<Text
					position={[-0.12, -0.12, 0.008]}
					fontSize={0.115}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.08}
					color="#c4b5fd"
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.subtitle}
				</Text>
			</group>

			{/* ── 3. INSCRIBED FORWARD-LOOKING STATEMENT ── */}
			<group position={[-1.25, 3.8, 0.02]}>
				{/* Subtle Separator Pip */}
				<mesh position={[0.2, 0.25, 0.005]}>
					<planeGeometry args={[0.4, 0.008]} />
					<meshBasicMaterial color="#a78bfa" transparent opacity={0.6} toneMapped={false} />
				</mesh>

				<Text
					position={[0, 0, 0]}
					fontSize={0.165}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.04}
					lineHeight={1.65}
					color="#FAF8F2"
					anchorX="left"
					anchorY="top"
					material-toneMapped={false}
				>
					{NEXT_CONTENT.leftStatement.join('\n')}
				</Text>
			</group>

			{/* Soft Downward Wall Grazing Light (Managed via ChapterLightRig) */}
		</group>
	)
}
