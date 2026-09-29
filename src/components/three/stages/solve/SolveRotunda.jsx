import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { SOLVE_OVERHEAD, SOLVE_FLOOR_GUIDES } from '../../../../data/solveData'

// ============================================================================
// SOLVE ROTUNDA ARCHITECTURE
// Grand classical/futuristic rotunda observatory based on media_1790188209235.jpg:
// - Circular dark polished obsidian floor with warm amber cove LED strips
// - Fluted monumental columns forming the colonnade observatory
// - Architectural sconces casting warm golden downward/upward light
// - High open arches opening out to the golden sunset mountain vista
// - Suspended overhead canopy ring with Chapter 03 typography:
//     03 — THE SOLVE
//     Problems are where systems become real.
//     "Complexity is a problem, not a wall."
// - Entrance curbs: ← 02 — THE BUILD / 04 — THE ENGINEER →
// ============================================================================

export default function SolveRotunda({ onNavigate }) {
	const rotundaRadius = 14.5
	const columnCount = 8
	const columnRadius = 13.8

	const columns = useMemo(() => {
		const cols = []
		for (let i = 0; i < columnCount; i++) {
			// Leave the entrance side (around -Z) and the forward mountain view (around +Z) framed
			const angle = (i / columnCount) * Math.PI * 2
			// Skip the direct entrance gap (around angle = -PI/2)
			const zOffset = Math.sin(angle)
			if (zOffset < -0.85) continue
			const x = Math.cos(angle) * columnRadius
			const z = 38.0 + Math.sin(angle) * (columnRadius * 0.92)
			cols.push({ x, z, angle })
		}
		return cols
	}, [columnCount, columnRadius])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. MAIN ROTUNDA FLOOR ── */}
			{/* Base Dark Polished Stone Disc (center: [0, 0, 38.0], radius: 15.5m) */}
			<mesh position={[0, 0.02, 38.0]} receiveShadow>
				<cylinderGeometry args={[rotundaRadius, rotundaRadius + 0.5, 0.08, 64]} />
				<meshStandardMaterial
					color="#0c121a"
					roughness={0.72}
					metalness={0.18}
				/>
			</mesh>

			{/* Outer Perimeter Warm Amber Cove LED Ring */}
			<mesh position={[0, 0.065, 38.0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[rotundaRadius - 0.25, rotundaRadius - 0.12, 64]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.8} toneMapped={false} />
			</mesh>

			{/* Intermediate Subtle Cyan Reticle Ring */}
			<mesh position={[0, 0.066, 38.0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[10.2, 10.28, 64]} />
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.4} toneMapped={false} />
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

			{/* Consolidated Warm Rotunda Atmosphere Lights (replaces 7-8 individual column lights) */}
			<pointLight position={[0, 3.6, 45.0]} color="#ffb45c" intensity={1.1} distance={15.0} decay={2} />
			<pointLight position={[-7.5, 3.6, 35.0]} color="#ffb45c" intensity={1.0} distance={14.0} decay={2} />
			<pointLight position={[7.5, 3.6, 35.0]} color="#ffb45c" intensity={1.0} distance={14.0} decay={2} />

			{/* Upper Monumental Arch Entablature Ring */}
			<mesh position={[0, 8.1, 38.0]}>
				<cylinderGeometry args={[rotundaRadius - 0.5, rotundaRadius - 0.2, 0.65, 48, 1, true]} />
				<meshStandardMaterial color="#151d28" roughness={0.82} metalness={0.2} side={THREE.DoubleSide} />
			</mesh>

			{/* ── 3. SUSPENDED OVERHEAD CANOPY RING & TYPOGRAPHY ── */}
			<group position={[0, 5.10, 38.0]} rotation={[0, Math.PI, 0]}>
				{/* Suspended Canopy Bezel Ring */}
				<mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<ringGeometry args={[6.2, 6.45, 64]} />
					<meshBasicMaterial color="#ffb45c" transparent opacity={0.65} toneMapped={false} />
				</mesh>

				{/* 03 — THE SOLVE */}
				<Text
					position={[0, 0.40, 0]}
					fontSize={0.42}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.012}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{SOLVE_OVERHEAD.number} — {SOLVE_OVERHEAD.title}
				</Text>

				{/* Subtitle */}
				<Text
					position={[0, 0.04, 0]}
					fontSize={0.19}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.12}
					color="#69e3ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{SOLVE_OVERHEAD.subtitle}
				</Text>

				{/* Architectural Datum Line */}
				<mesh position={[0, -0.12, 0]}>
					<planeGeometry args={[4.4, 0.016]} />
					<meshBasicMaterial color="#ffb45c" transparent opacity={0.8} side={THREE.DoubleSide} toneMapped={false} />
				</mesh>

				{/* Cursive Line: "Complexity is a problem, not a wall." */}
				<Text
					position={[0, -0.38, 0]}
					fontSize={0.24}
					font="/fonts/MarckScript-Regular.ttf"
					letterSpacing={0.03}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.007}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					&ldquo;{SOLVE_OVERHEAD.quote}&rdquo;
				</Text>
			</group>

			{/* ── 4. ENTRANCE CURBS & FLOOR GUIDES (z = 30.5) ── */}
			<group position={[0, 0, 30.5]} rotation={[0, Math.PI, 0]}>
				{/* Left Entrance Curb: ← 02 — THE BUILD */}
				<group
					position={[-4.5, 0.22, 0]}
					onClick={(e) => {
						e.stopPropagation()
						onNavigate?.('projects')
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
						<boxGeometry args={[3.2, 0.44, 0.6]} />
						<meshStandardMaterial color="#111822" roughness={0.7} metalness={0.3} />
					</mesh>
					{/* Under-glow Amber LED strip */}
					<mesh position={[0, -0.20, 0.31]}>
						<planeGeometry args={[3.1, 0.03]} />
						<meshBasicMaterial color="#ffb45c" toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0.05, 0.32]}
						fontSize={0.14}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.08}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.006}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{SOLVE_FLOOR_GUIDES.returnPrompt.label}
					</Text>
				</group>

				{/* Center Promenade Prompt */}
				<group position={[0, 0.04, 0]}>
					<mesh position={[0, 0.16, 0]}>
						<ringGeometry args={[0.07, 0.09, 32]} />
						<meshBasicMaterial color="#35d8ff" transparent opacity={0.7} toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0, 0]}
						fontSize={0.095}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.08}
						color="#9cb0c4"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.004}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{SOLVE_FLOOR_GUIDES.centerPrompt.label}
					</Text>
				</group>

				{/* Right Entrance Curb: 04 — THE ENGINEER → */}
				<group
					position={[4.5, 0.22, 0]}
					onClick={(e) => {
						e.stopPropagation()
						onNavigate?.('experience')
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
						<boxGeometry args={[3.2, 0.44, 0.6]} />
						<meshStandardMaterial color="#111822" roughness={0.7} metalness={0.3} />
					</mesh>
					<mesh position={[0, -0.20, 0.31]}>
						<planeGeometry args={[3.1, 0.03]} />
						<meshBasicMaterial color="#ffb45c" toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0.05, 0.32]}
						fontSize={0.14}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.08}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.006}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{SOLVE_FLOOR_GUIDES.forwardPrompt.label}
					</Text>
				</group>
			</group>
		</group>
	)
}

