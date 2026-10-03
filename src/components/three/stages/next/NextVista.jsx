import { useMemo } from 'react'
import * as THREE from 'three'

// ============================================================================
// ARCHITECTURAL VISTA & SUNSET HORIZON (CHAPTER 07 — WHAT'S NEXT)
// Based directly on media_1790773457536.jpg:
// - Grand monumental architectural arch framing the panoramic horizon
// - Glowing golden-hour setting sun directly over the water horizon
// - Reflective water surface catching golden sunset shimmer
// - Multi-tier mountain silhouettes in atmospheric violet/dusk tones
// - Subtle futuristic skyline towers rising from the right shoreline
// - Curved architectural pergola ring with hanging lush ivy greenery
// ============================================================================

export default function NextVista({ position = [0, 0, 6.8] }) {
	// Procedural mountain silhouettes
	const mountainCurves = useMemo(() => {
		const tiers = []
		// Tier 1: Far background low ridge
		const p1 = []
		for (let i = -14; i <= 14; i += 1.4) {
			const h = 1.2 + Math.sin(i * 0.45) * 0.5 + Math.cos(i * 0.9) * 0.25
			p1.push([i, h, 4.5])
		}
		tiers.push({ points: p1, color: '#2b1b36', opacity: 0.95 })

		// Tier 2: Midground mountain peaks
		const p2 = []
		for (let i = -12; i <= 12; i += 1.6) {
			const h = 1.8 + Math.sin(i * 0.6) * 0.8 + Math.cos(i * 1.3) * 0.4
			p2.push([i, h, 2.5])
		}
		tiers.push({ points: p2, color: '#1f162c', opacity: 0.98 })

		return tiers
	}, [])

	// Distant skyline buildings on the right shoreline (visible through arch)
	const skylineBuildings = useMemo(() => [
		{ x: 1.6, w: 0.24, h: 1.8, d: 0.25 },
		{ x: 1.95, w: 0.20, h: 2.3, d: 0.25 },
		{ x: 2.3, w: 0.28, h: 1.5, d: 0.25 },
		{ x: 2.65, w: 0.16, h: 2.7, d: 0.20 },
		{ x: 2.95, w: 0.22, h: 2.0, d: 0.25 },
		{ x: 3.3, w: 0.26, h: 1.4, d: 0.20 },
		{ x: 3.65, w: 0.18, h: 2.2, d: 0.20 },
	], [])

	return (
		<group position={position}>
			{/* ── 1. GRAND ARCHITECTURAL CORBEL ARCH ── */}
			<group position={[0, 3.8, 0]}>
				{/* Top Arch Semi-Torus */}
				<mesh rotation={[0, 0, 0]}>
					<torusGeometry args={[3.8, 0.28, 16, 48, Math.PI]} />
					<meshStandardMaterial color="#1a202c" roughness={0.75} metalness={0.25} />
				</mesh>

				{/* Arch Under-cove Amber LED Strip */}
				<mesh rotation={[0, 0, 0]} position={[0, 0, 0.05]}>
					<torusGeometry args={[3.68, 0.035, 8, 48, Math.PI]} />
					<meshBasicMaterial color="#ff9933" toneMapped={false} />
				</mesh>

				{/* Left Support Column */}
				<mesh position={[-3.8, -1.9, 0]}>
					<cylinderGeometry args={[0.28, 0.32, 3.8, 24]} />
					<meshStandardMaterial color="#1c2432" roughness={0.75} metalness={0.25} />
				</mesh>

				{/* Right Support Column */}
				<mesh position={[3.8, -1.9, 0]}>
					<cylinderGeometry args={[0.28, 0.32, 3.8, 24]} />
					<meshStandardMaterial color="#1c2432" roughness={0.75} metalness={0.25} />
				</mesh>

				{/* Hanging Arch Lanterns */}
				<group position={[-2.2, -0.5, 0]}>
					<mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.012, 0.012, 0.5, 8]} /><meshBasicMaterial color="#111" /></mesh>
					<mesh><cylinderGeometry args={[0.15, 0.18, 0.25, 16]} /><meshStandardMaterial color="#201815" metalness={0.6} /></mesh>
				</group>
				<group position={[2.2, -0.5, 0]}>
					<mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.012, 0.012, 0.5, 8]} /><meshBasicMaterial color="#111" /></mesh>
					<mesh><cylinderGeometry args={[0.15, 0.18, 0.25, 16]} /><meshStandardMaterial color="#201815" metalness={0.6} /></mesh>
				</group>
			</group>

			{/* ── 2. CELESTIAL SUNSET SUN (BEHIND ARCH) ── */}
			<group position={[-0.6, 2.6, 2.5]}>
				{/* Inner Glowing Sun Core */}
				<mesh>
					<circleGeometry args={[1.05, 36]} />
					<meshBasicMaterial color="#fff3d6" toneMapped={false} />
				</mesh>

				{/* Warm Golden Corona */}
				<mesh position={[0, 0, 0.02]}>
					<circleGeometry args={[1.8, 36]} />
					<meshBasicMaterial color="#ff9e3b" transparent opacity={0.65} toneMapped={false} />
				</mesh>

				{/* Outer Atmospheric Sunset Flare Halo */}
				<mesh position={[0, 0, 0.04]}>
					<circleGeometry args={[3.8, 36]} />
					<meshBasicMaterial color="#ff5e36" transparent opacity={0.32} toneMapped={false} />
				</mesh>

				{/* Direct Sunset Backlight Point Source (Managed via ChapterLightRig) */}
			</group>

			{/* ── 3. REFLECTIVE WATER PLANE (BEHIND ARCH) ── */}
			<mesh position={[0, -0.05, 4.0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[22, 10]} />
				<meshStandardMaterial
					color="#0c101c"
					roughness={0.12}
					metalness={0.92}
				/>
			</mesh>

			{/* Golden Sunset Water Reflection Band */}
			<mesh position={[-0.6, -0.03, 3.8]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[2.2, 8.0]} />
				<meshBasicMaterial
					color="#ffaa44"
					transparent
					opacity={0.35}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 4. MOUNTAIN SILHOUETTES ── */}
			{mountainCurves.map((tier, idx) => (
				<group key={idx}>
					{tier.points.map((pt, pIdx) => {
						if (pIdx === 0) return null
						const prev = tier.points[pIdx - 1]
						const midX = (prev[0] + pt[0]) / 2
						const midY = (prev[1] + pt[1]) / 2
						const len = Math.hypot(pt[0] - prev[0], pt[1] - prev[1])
						const ang = Math.atan2(pt[1] - prev[1], pt[0] - prev[0])
						return (
							<group key={pIdx} position={[midX, midY * 0.5, pt[2]]}>
								<mesh position={[0, 0, 0]} rotation={[0, 0, ang]}>
									<planeGeometry args={[len * 1.05, Math.max(prev[1], pt[1]) * 1.2]} />
									<meshBasicMaterial color={tier.color} transparent opacity={tier.opacity} />
								</mesh>
							</group>
						)
					})}
				</group>
			))}

			{/* ── 5. DISTANT FUTURISTIC SKYLINE TOWERS ── */}
			<group position={[0, 0, 2.0]}>
				{skylineBuildings.map((b, i) => (
					<mesh key={i} position={[b.x, b.h / 2 + 0.1, 0]}>
						<boxGeometry args={[b.w, b.h, b.d]} />
						<meshStandardMaterial color="#141824" roughness={0.6} metalness={0.4} />
					</mesh>
				))}
			</group>

			{/* ── 6. CURVED OVERHEAD PERGOLA BEAMS ── */}
			<group position={[0, 5.6, 0]}>
				<mesh rotation={[Math.PI / 2, 0, 0]}>
					<torusGeometry args={[7.4, 0.12, 8, 48, Math.PI * 0.75]} />
					<meshStandardMaterial color="#161c26" roughness={0.7} metalness={0.3} />
				</mesh>
			</group>
		</group>
	)
}
