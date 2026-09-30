import { useMemo } from 'react'
import * as THREE from 'three'

// ============================================================================
// SUNSET VISTA & ARCHITECTURAL APERTURE (CHAPTER 06 — THE PERSON)
// Panoramic sanctuary frame based on media_1790761295168.jpg:
// - Grand curved architectural portal arch framing the sunset horizon
// - Glowing golden sunset sun nestled in the mountain saddle
// - Subtle futuristic city skyline towers with slender spires across the bay
// - Silhouetted layered mountain ridges with warm atmospheric rim light
// - Calm reflective water horizon reflecting the sunset
// ============================================================================

export default function PersonVista({ position = [0, 0, 7.8] }) {
	// Generate subtle futuristic skyline needle spires
	const skylineBuildings = useMemo(() => {
		const b = []
		const count = 15
		for (let i = 0; i < count; i++) {
			const x = -6.8 + (i / (count - 1)) * 13.6
			// Leave a central dip directly behind the tree trunk so the sunset shines through
			if (Math.abs(x) < 1.4) continue
			const h = 0.9 + Math.sin(i * 1.7) * 0.55 + ((i % 3 === 0) ? 0.6 : 0)
			const w = 0.28 + (i % 2) * 0.12
			const d = 0.24
			b.push({ x, h, w, d, hasSpire: i % 2 === 0 })
		}
		return b
	}, [])

	return (
		<group position={position}>
			{/* ── 1. SOARING ARCHITECTURAL PORTAL ARCH ── */}
			{/* Left Column Pier */}
			<mesh position={[-6.8, 3.8, 0]}>
				<cylinderGeometry args={[0.55, 0.65, 7.6, 20]} />
				<meshStandardMaterial color="#18202c" roughness={0.76} metalness={0.16} />
			</mesh>
			{/* Left Pier Capital & Overhang */}
			<mesh position={[-6.8, 7.4, 0]}>
				<boxGeometry args={[1.5, 0.45, 1.4]} />
				<meshStandardMaterial color="#202a3a" roughness={0.72} metalness={0.18} />
			</mesh>

			{/* Right Column Pier */}
			<mesh position={[6.8, 3.8, 0]}>
				<cylinderGeometry args={[0.55, 0.65, 7.6, 20]} />
				<meshStandardMaterial color="#18202c" roughness={0.76} metalness={0.16} />
			</mesh>
			{/* Right Pier Capital & Overhang */}
			<mesh position={[6.8, 7.4, 0]}>
				<boxGeometry args={[1.5, 0.45, 1.4]} />
				<meshStandardMaterial color="#202a3a" roughness={0.72} metalness={0.18} />
			</mesh>

			{/* Monumental Curved Entablature Beam across top */}
			<mesh position={[0, 7.6, 0]}>
				<boxGeometry args={[15.2, 0.65, 1.2]} />
				<meshStandardMaterial color="#1c2534" roughness={0.74} metalness={0.18} />
			</mesh>

			{/* Left Arch Vault Shoulder Bracket */}
			<mesh position={[-5.4, 6.9, 0]} rotation={[0, 0, -0.58]}>
				<boxGeometry args={[2.8, 0.45, 1.1]} />
				<meshStandardMaterial color="#1c2534" roughness={0.74} metalness={0.18} />
			</mesh>

			{/* Right Arch Vault Shoulder Bracket */}
			<mesh position={[5.4, 6.9, 0]} rotation={[0, 0, 0.58]}>
				<boxGeometry args={[2.8, 0.45, 1.1]} />
				<meshStandardMaterial color="#1c2534" roughness={0.74} metalness={0.18} />
			</mesh>

			{/* Recessed Warm Amber LED Strip along Top Arch Ceiling */}
			<mesh position={[0, 7.26, 0]}>
				<boxGeometry args={[14.2, 0.03, 0.15]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* Hanging Vines / Creepers from Upper Arch (subtle greenery framing) */}
			{[-5.2, -3.8, -2.4, -1.2, 1.2, 2.4, 3.8, 5.2].map((vx, idx) => (
				<group key={idx} position={[vx, 6.8 - (idx % 3) * 0.22, 0.2]}>
					<mesh>
						<cylinderGeometry args={[0.04, 0.08, 0.9 + (idx % 3) * 0.35, 6]} />
						<meshStandardMaterial color="#2d4228" roughness={0.88} />
					</mesh>
					{/* Hanging leaf clump */}
					<mesh position={[0, -0.45, 0.04]}>
						<sphereGeometry args={[0.16, 8, 6]} />
						<meshStandardMaterial color="#22391e" roughness={0.85} />
					</mesh>
				</group>
			))}

			{/* ── 2. LOW PARAPET BALUSTRADE & HORIZON OVERLOOK ── */}
			<mesh position={[0, 0.52, 0.4]}>
				<boxGeometry args={[13.6, 0.35, 0.35]} />
				<meshStandardMaterial color="#1b2330" roughness={0.72} metalness={0.16} />
			</mesh>
			{/* Parapet Warm Under-Wash Strip */}
			<mesh position={[0, 0.36, 0.58]}>
				<boxGeometry args={[13.4, 0.02, 0.04]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* ── 3. DISTANT WATER / BAY REFLECTION PLANE ── */}
			<mesh position={[0, 0.38, 12.0]} rotation={[-Math.PI / 2, 0, 0]}>
				<planeGeometry args={[26.0, 16.0]} />
				<meshStandardMaterial
					color="#0c1726"
					roughness={0.65}
					metalness={0.25}
				/>
			</mesh>

			{/* ── 4. SUBTLE FUTURISTIC CITY SKYLINE TOWERS (ACROSS BAY) ── */}
			<group position={[0, 0.50, 15.0]}>
				{skylineBuildings.map((b, idx) => (
					<group key={idx} position={[b.x, b.h / 2, 0]}>
						{/* Tower Mass */}
						<mesh>
							<boxGeometry args={[b.w, b.h, b.d]} />
							<meshStandardMaterial
								color="#101828"
								roughness={0.65}
								metalness={0.45}
							/>
						</mesh>
						{/* Slender Needle Spire */}
						{b.hasSpire && (
							<mesh position={[0, b.h / 2 + 0.32, 0]}>
								<cylinderGeometry args={[0.01, 0.03, 0.64, 6]} />
								<meshStandardMaterial color="#304460" metalness={0.8} roughness={0.3} />
							</mesh>
						)}
						{/* Pinpoint Glowing Beacon Light */}
						{b.hasSpire && (
							<mesh position={[0, b.h / 2 + 0.65, 0]}>
								<sphereGeometry args={[0.025, 8, 8]} />
								<meshBasicMaterial color={idx % 3 === 0 ? '#ffb45c' : '#35d8ff'} toneMapped={false} />
							</mesh>
						)}
					</group>
				))}
			</group>

			{/* ── 5. SETTING SUN SPHERE & CORONA HALO (Screen Right behind Tree) ── */}
			<group position={[4.0, 2.8, 19.0]} rotation={[0, Math.PI, 0]}>
				{/* Brilliant Sun Core Disc */}
				<mesh>
					<circleGeometry args={[1.1, 36]} />
					<meshBasicMaterial color="#fff6e5" side={THREE.DoubleSide} toneMapped={false} />
				</mesh>
				{/* Inner Golden Corona Ring */}
				<mesh position={[0, 0, 0.01]}>
					<circleGeometry args={[1.85, 36]} />
					<meshBasicMaterial color="#ffc466" side={THREE.DoubleSide} transparent opacity={0.65} toneMapped={false} />
				</mesh>
				{/* Wide Warm Amber Atmospheric Halo */}
				<mesh position={[0, 0, 0.02]}>
					<circleGeometry args={[3.2, 36]} />
					<meshBasicMaterial color="#ff8822" side={THREE.DoubleSide} transparent opacity={0.35} toneMapped={false} />
				</mesh>
			</group>

			{/* Sunset Directional Rim Light streaming into sanctuary */}
			<directionalLight position={[4.0, 3.8, 18.0]} intensity={1.8} color="#ff9233" />
		</group>
	)
}
