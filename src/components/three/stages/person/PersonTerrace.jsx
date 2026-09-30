import { useMemo } from 'react'
import * as THREE from 'three'

// ============================================================================
// ARCHITECTURAL STEPPED TERRACE (CHAPTER 06 — THE PERSON)
// Sanctuary Amphitheater based on media_1790761295168.jpg:
// - 3 concentric semicircular stepped stone tiers with dark honed travertine
// - Continuous embedded warm amber LED cove lighting along each terrace step riser
// - Inset polished stone reflection ring in the center foreground
// - Low curved perimeter banquette seating with warm under-wash
// - Landscaped side planters with lush architectural greenery
// ============================================================================

export default function PersonTerrace() {
	// 3 stepped semicircular terrace tiers
	// Tier 0 (Lowest, Foreground Arrival): Y = 0.00, Radius = 9.8m
	// Tier 1 (Mid Terrace): Y = 0.20, Radius = 7.4m
	// Tier 2 (Upper Terrace near Tree): Y = 0.40, Radius = 4.8m

	// Perimeter warm LED step riser arcs
	const tiers = [
		{ r: 4.8, y: 0.40, h: 0.20, ringR: [4.70, 4.82] },
		{ r: 7.4, y: 0.20, h: 0.20, ringR: [7.30, 7.42] },
		{ r: 9.8, y: 0.00, h: 0.15, ringR: [9.70, 9.82] },
	]

	// Curved perimeter lounge benches (left and right flanks)
	const benches = useMemo(() => [
		{ x: -5.8, z: 2.2, rotY: 0.45 },
		{ x: 5.8, z: 2.2, rotY: -0.45 },
	], [])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. MAIN SANCTUARY SUB-PLINTH & FOUNDATION ── */}
			<mesh position={[0, -0.15, 1.5]} receiveShadow>
				<cylinderGeometry args={[11.5, 12.0, 0.30, 48]} />
				<meshStandardMaterial color="#0c1017" roughness={0.88} metalness={0.12} />
			</mesh>

			{/* ── 2. TIER 0: LOWER STEPPED TERRACE & REFLECTION POOL ── */}
			<mesh position={[0, 0.01, 1.6]} receiveShadow>
				<cylinderGeometry args={[9.5, 9.8, 0.10, 48]} />
				<meshStandardMaterial color="#121822" roughness={0.65} metalness={0.22} />
			</mesh>

			{/* Center Foreground Sunken Polished Stone Reflection Pool (Water Mirror) */}
			<mesh position={[0, 0.025, 0.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<circleGeometry args={[2.2, 48]} />
				<meshStandardMaterial
					color="#050a12"
					roughness={0.08}
					metalness={0.88}
				/>
			</mesh>

			{/* Concentric Amber LED Ring around Central Reflection Pool */}
			<mesh position={[0, 0.028, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.22, 2.28, 48]} />
				<meshBasicMaterial color="#ffaa44" transparent opacity={0.85} toneMapped={false} />
			</mesh>

			{/* Outer Concentric Travertine Ring */}
			<mesh position={[0, 0.026, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[2.30, 2.75, 48]} />
				<meshStandardMaterial color="#1a2230" roughness={0.72} metalness={0.12} />
			</mesh>

			{/* Perimeter Warm Embedded Light Points around Pool Rim */}
			{[...Array(12)].map((_, i) => {
				const a = (i / 12) * Math.PI * 2
				return (
					<mesh key={i} position={[Math.cos(a) * 2.25, 0.032, 0.2 + Math.sin(a) * 2.25]}>
						<cylinderGeometry args={[0.025, 0.025, 0.01, 8]} />
						<meshBasicMaterial color="#ffc266" toneMapped={false} />
					</mesh>
				)
			})}

			{/* ── 3. TIER 1: MID TERRACE STEP (Y = 0.18, R = 6.6m) ── */}
			<mesh position={[0, 0.10, 3.4]} receiveShadow>
				<cylinderGeometry args={[6.6, 6.8, 0.18, 48]} />
				<meshStandardMaterial color="#151d28" roughness={0.62} metalness={0.24} />
			</mesh>

			{/* Forward-Facing Warm LED Arc Strip along Tier 1 Riser (No foreground overshoot) */}
			<mesh position={[0, 0.185, 3.4]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[6.52, 6.62, 48, 1, Math.PI * 0.12, Math.PI * 0.76]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* ── 4. TIER 2: UPPER TREE TERRACE (Y = 0.36, R = 4.6m) ── */}
			<mesh position={[0, 0.26, 4.0]} receiveShadow>
				<cylinderGeometry args={[4.6, 4.8, 0.18, 48]} />
				<meshStandardMaterial color="#182230" roughness={0.60} metalness={0.25} />
			</mesh>

			{/* Forward-Facing Warm LED Arc Strip along Tier 2 Riser */}
			<mesh position={[0, 0.365, 4.0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[4.52, 4.62, 48, 1, Math.PI * 0.08, Math.PI * 0.84]} />
				<meshBasicMaterial color="#ffaa44" toneMapped={false} />
			</mesh>

			{/* Inset Travertine Step Edge Molding Arc */}
			<mesh position={[0, 0.370, 4.0]} rotation={[-Math.PI / 2, 0, 0]}>
				<ringGeometry args={[4.42, 4.50, 48, 1, Math.PI * 0.08, Math.PI * 0.84]} />
				<meshStandardMaterial color="#8a8274" roughness={0.68} metalness={0.06} />
			</mesh>

			{/* ── 5. CURVED PERIMETER ARCHITECTURAL LOUNGE BENCHES ── */}
			{benches.map((bench, idx) => (
				<group key={idx} position={[bench.x, 0.30, bench.z]} rotation={[0, bench.rotY, 0]}>
					{/* Dark Granite Cantilevered Bench Base */}
					<mesh position={[0, 0.14, 0]}>
						<boxGeometry args={[2.4, 0.28, 0.85]} />
						<meshStandardMaterial color="#111722" roughness={0.78} metalness={0.18} />
					</mesh>
					{/* Warm Travertine Bench Cushion Top */}
					<mesh position={[0, 0.32, 0]}>
						<boxGeometry args={[2.3, 0.08, 0.78]} />
						<meshStandardMaterial color="#8e8271" roughness={0.82} metalness={0.02} />
					</mesh>
					{/* Backrest Cushion */}
					<mesh position={[0, 0.60, -0.32]}>
						<boxGeometry args={[2.3, 0.50, 0.16]} />
						<meshStandardMaterial color="#7c7060" roughness={0.85} metalness={0.02} />
					</mesh>
					{/* Recessed Amber Under-Glow */}
					<mesh position={[0, 0.02, 0.38]}>
						<boxGeometry args={[2.2, 0.02, 0.04]} />
						<meshBasicMaterial color="#ffaa44" toneMapped={false} />
					</mesh>
				</group>
			))}

			{/* ── 6. CURVED PERIMETER LANDSCAPE PLANTERS & GREENERY ── */}
			{/* Left Flank Planter */}
			<group position={[-7.2, 0.25, 0.4]} rotation={[0, 0.4, 0]}>
				<mesh position={[0, 0.22, 0]}>
					<boxGeometry args={[3.2, 0.44, 1.1]} />
					<meshStandardMaterial color="#161e2a" roughness={0.78} metalness={0.14} />
				</mesh>
				{/* Foliage */}
				<mesh position={[0, 0.55, 0]} scale={[1.4, 0.35, 0.45]}>
					<sphereGeometry args={[1, 10, 8]} />
					<meshStandardMaterial color="#2c3e29" roughness={0.84} />
				</mesh>
				{/* Planter Edge Warm LED Strip */}
				<mesh position={[0, 0.45, 0.52]}>
					<boxGeometry args={[3.0, 0.02, 0.03]} />
					<meshBasicMaterial color="#ffaa44" toneMapped={false} />
				</mesh>
			</group>

			{/* Right Flank Planter */}
			<group position={[7.2, 0.25, 0.4]} rotation={[0, -0.4, 0]}>
				<mesh position={[0, 0.22, 0]}>
					<boxGeometry args={[3.2, 0.44, 1.1]} />
					<meshStandardMaterial color="#161e2a" roughness={0.78} metalness={0.14} />
				</mesh>
				{/* Foliage */}
				<mesh position={[0, 0.55, 0]} scale={[1.4, 0.35, 0.45]}>
					<sphereGeometry args={[1, 10, 8]} />
					<meshStandardMaterial color="#2c3e29" roughness={0.84} />
				</mesh>
				{/* Planter Edge Warm LED Strip */}
				<mesh position={[0, 0.45, 0.52]}>
					<boxGeometry args={[3.0, 0.02, 0.03]} />
					<meshBasicMaterial color="#ffaa44" toneMapped={false} />
				</mesh>
			</group>

			{/* Balanced Warm Ground Atmosphere Lights */}
			<pointLight position={[0, 1.2, -0.6]} color="#ffaa44" intensity={1.5} distance={7.5} decay={2} />
			<pointLight position={[-4.5, 0.8, 1.0]} color="#ff9933" intensity={1.1} distance={6.0} decay={2} />
			<pointLight position={[4.5, 0.8, 1.0]} color="#ff9933" intensity={1.1} distance={6.0} decay={2} />
		</group>
	)
}
