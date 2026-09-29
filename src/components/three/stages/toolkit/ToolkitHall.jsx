import { useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

// ============================================================================
// TOOLKIT HALL ARCHITECTURE (CHAPTER 05 — THE ENGINEER'S TOOLKIT)
// High-tech Technology Observatory / Systems Laboratory:
// - Inspired by visual reference media_1790593552765.jpg
// - Large curved conservatory architecture framing the sunset and mountain horizon
// - Honed dark metallic/granite floor with concentric cyan reticle rings and amber curbs
// - Overhead architectural canopy beams with technological neon strips
// - Perimeter consoles and tech fixtures
// - Floor wayfinding indicators:
//     Left / Behind: ← [ E ] CHAPTER 04 // THE ENGINEER
//     Right / Forward: CHAPTER 06 // THE PERSON [ E ] →
// ============================================================================

export default function ToolkitHall({ onNavigate, center = [21.8, 0, 33.1] }) {
	const [cx, , cz] = center
	const hallRadius = 12.5

	// Curved conservatory window mullions / architectural pylons around the rear & flanks
	const pylons = useMemo(() => {
		const list = []
		const count = 10
		for (let i = 0; i < count; i++) {
			const angle = (i / (count - 1)) * Math.PI * 1.1 + Math.PI * 0.95 // sweeps the rear semicircle
			const x = cx + Math.sin(angle) * 11.8
			const z = cz + Math.cos(angle) * 11.8
			list.push({ x, z, angle })
		}
		return list
	}, [cx, cz])

	// Overhead canopy arch ribs
	const archRibs = useMemo(() => {
		return [-6, -2, 2, 6].map((offset) => ({
			x: cx + offset,
			z: cz,
		}))
	}, [cx, cz])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. MAIN OBSERVATORY FLOOR ── */}
			{/* Base Dark Satin Stone / Metallic Floor Disc */}
			<mesh position={[cx, 0.02, cz]} receiveShadow>
				<cylinderGeometry args={[hallRadius, hallRadius + 0.4, 0.08, 64]} />
				<meshStandardMaterial
					color="#080e18"
					roughness={0.55}
					metalness={0.45}
				/>
			</mesh>

			{/* Outer Perimeter Warm Amber Accent Ring */}
			<mesh position={[cx, 0.065, cz]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[hallRadius - 0.25, hallRadius - 0.12, 64]} />
				<meshBasicMaterial color="#ffb45c" transparent opacity={0.65} toneMapped={false} />
			</mesh>

			{/* Secondary Reticle Ring (Primary Cyan) */}
			<mesh position={[cx, 0.066, cz]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[8.8, 8.88, 64]} />
				<meshBasicMaterial color="#00d2ff" transparent opacity={0.45} toneMapped={false} />
			</mesh>

			{/* Inner Reticle Ring (Cool Blue) */}
			<mesh position={[cx, 0.067, cz]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[5.2, 5.26, 64]} />
				<meshBasicMaterial color="#35d8ff" transparent opacity={0.35} toneMapped={false} />
			</mesh>

			{/* Grid Floor Seams */}
			{[-6, -3, 0, 3, 6].map((off) => (
				<mesh key={`grid-x-${off}`} position={[cx + off, 0.062, cz]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[0.02, hallRadius * 1.8]} />
					<meshBasicMaterial color="#1a2e46" transparent opacity={0.25} />
				</mesh>
			))}

			{/* ── 2. CONSERVATORY ARCHITECTURAL PYLONS & WINDOW FRAMES ── */}
			{pylons.map((p, idx) => (
				<group key={idx} position={[p.x, 0, p.z]} rotation={[0, -p.angle, 0]}>
					{/* Pylon Base */}
					<mesh position={[0, 0.4, 0]}>
						<boxGeometry args={[0.45, 0.8, 0.55]} />
						<meshStandardMaterial color="#0e1724" roughness={0.7} metalness={0.3} />
					</mesh>

					{/* Vertical Architectural Strut */}
					<mesh position={[0, 4.2, 0]}>
						<boxGeometry args={[0.24, 7.2, 0.35]} />
						<meshStandardMaterial color="#142032" roughness={0.65} metalness={0.4} />
					</mesh>

					{/* Vertical Cyan Neon Strip on Pylon Face */}
					<mesh position={[0, 4.2, 0.18]}>
						<planeGeometry args={[0.04, 6.8]} />
						<meshBasicMaterial color="#00d2ff" transparent opacity={0.7} toneMapped={false} />
					</mesh>

					{/* Horizontal Cross-Beam Connector at Height 3.5m */}
					<mesh position={[0, 3.5, 0]}>
						<boxGeometry args={[0.8, 0.12, 0.4]} />
						<meshStandardMaterial color="#1a283c" roughness={0.6} metalness={0.4} />
					</mesh>

					{/* Top Arch Capital */}
					<mesh position={[0, 7.8, 0]}>
						<boxGeometry args={[0.48, 0.4, 0.6]} />
						<meshStandardMaterial color="#0e1724" roughness={0.7} metalness={0.3} />
					</mesh>
				</group>
			))}

			{/* ── 3. OVERHEAD CANOPY ARCH RIBS ── */}
			{archRibs.map((rib, i) => (
				<group key={i} position={[rib.x, 7.8, rib.z]}>
					{/* Curved Top Truss Beam */}
					<mesh rotation={[0, 0, Math.PI / 2]}>
						<cylinderGeometry args={[0.08, 0.08, 14.5, 12]} />
						<meshStandardMaterial color="#121d2c" roughness={0.7} metalness={0.3} />
					</mesh>
					{/* Cyan Neon Accent along Truss */}
					<mesh position={[0, -0.09, 0]} rotation={[0, 0, Math.PI / 2]}>
						<cylinderGeometry args={[0.015, 0.015, 14.2, 8]} />
						<meshBasicMaterial color="#00d2ff" transparent opacity={0.6} toneMapped={false} />
					</mesh>
				</group>
			))}

			{/* ── 4. PERIMETER CONSOLES & TECH STATIONS ── */}
			{/* Left Flank Tech Console */}
			<group position={[cx - 7.8, 0, cz - 2.5]} rotation={[0, Math.PI / 6, 0]}>
				<mesh position={[0, 0.45, 0]}>
					<boxGeometry args={[1.8, 0.9, 0.55]} />
					<meshStandardMaterial color="#0a121d" roughness={0.65} metalness={0.35} />
				</mesh>
				<mesh position={[0, 0.91, 0]}>
					<boxGeometry args={[1.84, 0.04, 0.58]} />
					<meshStandardMaterial color="#142233" roughness={0.5} metalness={0.5} />
				</mesh>
				<mesh position={[0, 0.94, -0.1]}>
					<planeGeometry args={[1.5, 0.32]} />
					<meshBasicMaterial color="#00d2ff" transparent opacity={0.3} />
				</mesh>
			</group>

			{/* Right Flank Tech Console */}
			<group position={[cx + 7.8, 0, cz - 2.5]} rotation={[0, -Math.PI / 6, 0]}>
				<mesh position={[0, 0.45, 0]}>
					<boxGeometry args={[1.8, 0.9, 0.55]} />
					<meshStandardMaterial color="#0a121d" roughness={0.65} metalness={0.35} />
				</mesh>
				<mesh position={[0, 0.91, 0]}>
					<boxGeometry args={[1.84, 0.04, 0.58]} />
					<meshStandardMaterial color="#142233" roughness={0.5} metalness={0.5} />
				</mesh>
				<mesh position={[0, 0.94, -0.1]}>
					<planeGeometry args={[1.5, 0.32]} />
					<meshBasicMaterial color="#35d8ff" transparent opacity={0.3} />
				</mesh>
			</group>

			{/* ── 5. FLOOR WAYFINDING INDICATORS ── */}
			{/* Return to Chapter 04 (South-West / Towards The Engineer) */}
			<group
				position={[cx - 5.5, 0.07, cz - 6.2]}
				rotation={[-Math.PI / 2, 0, 0.3]}
				onClick={(e) => {
					e.stopPropagation()
					onNavigate?.('experience')
				}}
				onPointerOver={() => {
					document.body.style.cursor = 'pointer'
				}}
				onPointerOut={() => {
					document.body.style.cursor = 'auto'
				}}
			>
				<mesh>
					<planeGeometry args={[3.2, 0.36]} />
					<meshBasicMaterial color="#00d2ff" transparent opacity={0.12} />
				</mesh>
				<mesh position={[0, 0, 0.001]}>
					<planeGeometry args={[3.2, 0.36]} />
					<meshBasicMaterial color="#00d2ff" wireframe transparent opacity={0.5} />
				</mesh>
				<Text
					position={[0, 0, 0.01]}
					fontSize={0.095}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					← [ E ] CHAPTER 04 // THE ENGINEER
				</Text>
			</group>

			{/* Forward to Chapter 06 (East / Towards The Person) */}
			<group
				position={[cx + 5.5, 0.07, cz - 6.2]}
				rotation={[-Math.PI / 2, 0, -0.3]}
				onClick={(e) => {
					e.stopPropagation()
					onNavigate?.('about')
				}}
				onPointerOver={() => {
					document.body.style.cursor = 'pointer'
				}}
				onPointerOut={() => {
					document.body.style.cursor = 'auto'
				}}
			>
				<mesh>
					<planeGeometry args={[3.2, 0.36]} />
					<meshBasicMaterial color="#35d8ff" transparent opacity={0.12} />
				</mesh>
				<mesh position={[0, 0, 0.001]}>
					<planeGeometry args={[3.2, 0.36]} />
					<meshBasicMaterial color="#35d8ff" wireframe transparent opacity={0.5} />
				</mesh>
				<Text
					position={[0, 0, 0.01]}
					fontSize={0.095}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.08}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					CHAPTER 06 // THE PERSON [ E ] →
				</Text>
			</group>
		</group>
	)
}
