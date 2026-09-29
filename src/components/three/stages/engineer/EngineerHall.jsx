import { useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { ENGINEER_OVERHEAD, ENGINEER_FLOOR_GUIDES } from '../../../../data/engineerData'

// ============================================================================
// ENGINEER HALL ARCHITECTURE (CHAPTER 04)
// Monumental engineering observatory / collaboration hall:
// - Inspired by media_1790232930241.jpg
// - Circular dark polished obsidian / stone floor with warm amber cove LED strips
// - Fluted monumental columns forming the colonnade observatory
// - Architectural sconces casting warm golden light
// - High open arches opening out to the golden sunset mountain vista
// - Suspended overhead canopy ring with Chapter 04 typography:
//     04 — THE ENGINEER
//     Engineering in the real world.
//     "Working on real systems taught me that engineering is as much about people and process as it is about code."
// - Entrance curbs: ← 03 — THE SOLVE / 05 — THE TOOLKIT →
// ============================================================================

export default function EngineerHall({ onNavigate, center = [0, 0, 72.0] }) {
	const [cx, , cz] = center
	const hallRadius = 15.5
	const columnCount = 8
	const columnRadius = 14.8

	const columns = useMemo(() => {
		const cols = []
		for (let i = 0; i < columnCount; i++) {
			const angle = (i / columnCount) * Math.PI * 2
			// Keep central viewing corridor open (both entrance around 270° and mountain vista around 90°)
			if (Math.abs(Math.cos(angle)) < 0.35) continue
			const x = cx + Math.cos(angle) * columnRadius
			const z = cz + Math.sin(angle) * (columnRadius * 0.92)
			cols.push({ x, z, angle })
		}
		return cols
	}, [cx, cz, columnCount, columnRadius])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. MAIN OBSERVATORY FLOOR ── */}
			{/* Base Dark Satin Stone Disc */}
			<mesh position={[cx, 0.02, cz]} receiveShadow>
				<cylinderGeometry args={[hallRadius, hallRadius + 0.5, 0.08, 64]} />
				<meshStandardMaterial
					color="#0c121a"
					roughness={0.72}
					metalness={0.18}
				/>
			</mesh>

			{/* Outer Perimeter Warm Amber Cove LED Ring */}
			<mesh position={[cx, 0.065, cz]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[hallRadius - 0.25, hallRadius - 0.12, 64]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.8} toneMapped={false} />
			</mesh>

			{/* Intermediate Subtle Cyan Reticle Ring */}
			<mesh position={[cx, 0.066, cz]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[10.5, 10.58, 64]} />
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.35} toneMapped={false} />
			</mesh>

			{/* ── 2. MONUMENTAL FLUTED COLUMNS & HIGH ARCHES ── */}
			{columns.map((col, idx) => (
				<group key={idx} position={[col.x, 0, col.z]} rotation={[0, col.angle - Math.PI / 2, 0]}>
					{/* Column Base Plinth & Ring */}
					<mesh position={[0, 0.35, 0]}>
						<cylinderGeometry args={[0.72, 0.85, 0.70, 24]} />
						<meshStandardMaterial color="#1a222e" roughness={0.78} metalness={0.12} />
					</mesh>
					<mesh position={[0, 0.70, 0]}>
						<torusGeometry args={[0.66, 0.06, 12, 24]} />
						<meshStandardMaterial color="#253040" roughness={0.7} metalness={0.2} />
					</mesh>

					{/* Fluted Column Shaft */}
					<mesh position={[0, 4.2, 0]}>
						<cylinderGeometry args={[0.60, 0.68, 7.0, 24]} />
						<meshStandardMaterial color="#202a38" roughness={0.72} metalness={0.15} />
					</mesh>

					{/* Column Capital & Molding */}
					<mesh position={[0, 7.65, 0]}>
						<torusGeometry args={[0.64, 0.06, 12, 24]} />
						<meshStandardMaterial color="#253040" roughness={0.7} metalness={0.2} />
					</mesh>
					<mesh position={[0, 7.85, 0]}>
						<cylinderGeometry args={[0.85, 0.62, 0.5, 24]} />
						<meshStandardMaterial color="#1a222e" roughness={0.78} metalness={0.12} />
					</mesh>

					{/* Architectural Sconce Light Fixture (Facing Inward) */}
					<mesh position={[0, 3.2, 0.65]}>
						<boxGeometry args={[0.16, 0.42, 0.08]} />
						<meshStandardMaterial color="#0c121c" />
					</mesh>
					<mesh position={[0, 3.2, 0.70]}>
						<planeGeometry args={[0.12, 0.36]} />
						<meshBasicMaterial color="#ffb45c" toneMapped={false} />
					</mesh>
				</group>
			))}

			{/* Consolidated Warm Engineer Hall Atmosphere Lights (replaces 6 individual column lights) */}
			<pointLight position={[cx - 7.5, 3.6, cz + 2.0]} color="#ffb45c" intensity={1.1} distance={15.0} decay={2} />
			<pointLight position={[cx + 7.5, 3.6, cz + 2.0]} color="#ffb45c" intensity={1.1} distance={15.0} decay={2} />

			{/* Upper Monumental Arch Entablature Ring */}
			<mesh position={[cx, 8.1, cz]}>
				<cylinderGeometry args={[hallRadius - 0.5, hallRadius - 0.2, 0.65, 48, 1, true]} />
				<meshStandardMaterial color="#151d28" roughness={0.82} metalness={0.2} side={THREE.DoubleSide} />
			</mesh>

			{/* ── 3. SUSPENDED OVERHEAD CANOPY RING & TYPOGRAPHY ── */}
			{/* ── 3. SUSPENDED OVERHEAD CANOPY RING & TYPOGRAPHY ── */}
			{/* Positioned at Y = 5.25m with high contrast against the sunset */}
			<group position={[cx, 5.25, cz]} rotation={[0, Math.PI, 0]}>
				{/* Suspended Canopy Bezel Ring */}
				<mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[6.2, 6.45, 64]} />
					<meshBasicMaterial color="#ffb45c" transparent opacity={0.65} toneMapped={false} />
				</mesh>

				{/* 04 — THE ENGINEER */}
				<Text
					position={[0, 0.42, 0]}
					fontSize={0.46}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.10}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.015}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{ENGINEER_OVERHEAD.number} — {ENGINEER_OVERHEAD.title}
				</Text>

				{/* Subtitle: Engineering in the real world. */}
				<Text
					position={[0, 0.05, 0]}
					fontSize={0.21}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.14}
					color="#69e3ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.008}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{ENGINEER_OVERHEAD.subtitle}
				</Text>

				{/* Architectural Datum Line */}
				<mesh position={[0, -0.13, 0]}>
					<planeGeometry args={[5.2, 0.018]} />
					<meshBasicMaterial color="#ffb45c" transparent opacity={0.8} side={THREE.DoubleSide} toneMapped={false} />
				</mesh>

				{/* Cursive Quote */}
				<Text
					position={[0, -0.42, 0]}
					fontSize={0.24}
					font="/fonts/MarckScript-Regular.ttf"
					letterSpacing={0.02}
					maxWidth={10.5}
					textAlign="center"
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.009}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					&ldquo;{ENGINEER_OVERHEAD.quote}&rdquo;
				</Text>
			</group>

			{/* ── 4. LATERAL NAVIGATION CURBS (z = 65.5) ── */}
			{/* Kept subtle and moved to the lower perimeter corners to never obstruct the central promenade */}
			<group rotation={[0, Math.PI, 0]}>
				{/* Left Entrance Curb: ← 03 — THE SOLVE (Lower Left Edge) */}
				<group
					position={[cx - 6.8, 0.12, -(65.5)]}
					onClick={(e) => {
						e.stopPropagation()
						onNavigate?.('solve')
					}}
					onPointerOver={(e) => {
						e.stopPropagation()
						document.body.style.cursor = 'pointer'
					}}
					onPointerOut={() => {
						document.body.style.cursor = 'auto'
					}}
				>
					{/* Granite Curb Block */}
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[2.5, 0.24, 0.4]} />
						<meshStandardMaterial color="#111822" roughness={0.7} metalness={0.3} />
					</mesh>
					{/* Under-glow Amber LED strip */}
					<mesh position={[0, -0.10, 0.21]}>
						<planeGeometry args={[2.4, 0.025]} />
						<meshBasicMaterial color="#ffb45c" toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0.02, 0.22]}
						fontSize={0.11}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.08}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.005}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{ENGINEER_FLOOR_GUIDES.returnPrompt.label}
					</Text>
				</group>

				{/* Center Promenade Prompt (Subtle floor guide at Z=67.2) */}
				<group position={[cx, 0.04, -(67.2)]}>
					<mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
						<ringGeometry args={[0.06, 0.08, 24]} />
						<meshBasicMaterial color="#35d8ff" transparent opacity={0.4} toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0.015, 0]}
						rotation={[-Math.PI / 2, 0, 0]}
						fontSize={0.075}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.08}
						color="#7890a8"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.003}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{ENGINEER_FLOOR_GUIDES.centerPrompt.label}
					</Text>
				</group>

				{/* Right Entrance Curb: 05 — THE TOOLKIT → (Lower Right Edge) */}
				<group
					position={[cx + 6.8, 0.12, -(65.5)]}
					onClick={(e) => {
						e.stopPropagation()
						onNavigate?.('skills')
					}}
					onPointerOver={(e) => {
						e.stopPropagation()
						document.body.style.cursor = 'pointer'
					}}
					onPointerOut={() => {
						document.body.style.cursor = 'auto'
					}}
				>
					<mesh position={[0, 0, 0]}>
						<boxGeometry args={[2.5, 0.24, 0.4]} />
						<meshStandardMaterial color="#111822" roughness={0.7} metalness={0.3} />
					</mesh>
					<mesh position={[0, -0.10, 0.21]}>
						<planeGeometry args={[2.4, 0.025]} />
						<meshBasicMaterial color="#ffb45c" toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0.02, 0.22]}
						fontSize={0.11}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.08}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.005}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{ENGINEER_FLOOR_GUIDES.forwardPrompt.label}
					</Text>
				</group>
			</group>
		</group>
	)
}
