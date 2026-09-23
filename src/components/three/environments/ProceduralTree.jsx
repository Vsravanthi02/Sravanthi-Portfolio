import { useMemo } from 'react'
import * as THREE from 'three'

// Architectural Mediterranean sculpted olive tree.
// Dark, natural, atmospheric foliage framing the monumental architecture without competing with it.
export function ProceduralTree({
	position = [0, 0, 0],
	scale = 1,
	rotationY = 0,
	seed = 0
}) {
	// Branch end positions where leaf tufts are anchored
	const tuftPositions = useMemo(() => {
		const s = seed * 1.7
		return [
			// Central crown
			[0, 2.35, 0, 0.38, '#2a3620'],
			[0.12, 2.52, -0.08, 0.32, '#2e3c24'],
			[-0.10, 2.45, 0.10, 0.30, '#26321c'],

			// East limb canopy (spreading right)
			[0.55 + Math.sin(s) * 0.08, 1.85, 0.12, 0.36, '#24301a'],
			[0.85, 1.95, 0.22, 0.34, '#28341e'],
			[1.15, 1.80, 0.08, 0.30, '#2c3822'],
			[0.72, 2.15, -0.12, 0.32, '#303e26'],
			[1.02, 2.05, 0.28, 0.26, '#324028'],

			// West limb canopy (spreading left)
			[-0.55, 1.80, -0.15, 0.36, '#222e18'],
			[-0.85, 1.90, -0.08, 0.34, '#26321c'],
			[-1.12, 1.70, -0.22, 0.30, '#2a3620'],
			[-0.68, 2.10, 0.14, 0.32, '#2e3a24'],
			[-0.98, 1.98, -0.18, 0.26, '#303e26'],

			// South limb canopy (reaching forward)
			[0.18, 1.70, 0.60, 0.35, '#24301a'],
			[-0.22, 1.65, 0.72, 0.32, '#28341e'],
			[0.05, 1.92, 0.82, 0.28, '#2c3822'],

			// North limb canopy (reaching backward)
			[-0.18, 1.75, -0.62, 0.35, '#202a16'],
			[0.22, 1.80, -0.72, 0.32, '#24301a'],
			[-0.05, 2.02, -0.78, 0.28, '#2a3620'],

			// Intermediate filler tufts
			[0.32, 2.10, 0.32, 0.30, '#2a3620'],
			[-0.32, 2.05, -0.32, 0.30, '#26321c'],
			[-0.38, 2.15, 0.28, 0.28, '#2e3a24'],
			[0.38, 2.20, -0.28, 0.28, '#303e26'],
		]
	}, [seed])

	return (
		<group position={position} scale={scale} rotation={[0, rotationY, 0]}>
			{/* Gnarled dark timber trunk */}
			<mesh position={[0, 0.70, 0]}>
				<cylinderGeometry args={[0.10, 0.18, 1.4, 10]} />
				<meshStandardMaterial color="#1a140e" roughness={0.96} />
			</mesh>

			{/* Sculpted branching limbs */}
			<mesh position={[0.42, 1.40, 0.12]} rotation={[0.3, 0.2, -0.65]}>
				<cylinderGeometry args={[0.05, 0.09, 1.1, 8]} />
				<meshStandardMaterial color="#1a140e" roughness={0.96} />
			</mesh>
			<mesh position={[-0.40, 1.35, -0.15]} rotation={[-0.25, -0.2, 0.70]}>
				<cylinderGeometry args={[0.045, 0.085, 1.05, 8]} />
				<meshStandardMaterial color="#1a140e" roughness={0.96} />
			</mesh>
			<mesh position={[0.10, 1.30, 0.40]} rotation={[0.65, 0.1, -0.15]}>
				<cylinderGeometry args={[0.045, 0.08, 0.95, 8]} />
				<meshStandardMaterial color="#1a140e" roughness={0.96} />
			</mesh>
			<mesh position={[-0.08, 1.35, -0.42]} rotation={[-0.70, -0.1, 0.15]}>
				<cylinderGeometry args={[0.045, 0.08, 0.95, 8]} />
				<meshStandardMaterial color="#1a140e" roughness={0.96} />
			</mesh>
			<mesh position={[0, 1.65, 0]} rotation={[0.1, 0.2, -0.1]}>
				<cylinderGeometry args={[0.05, 0.085, 0.8, 8]} />
				<meshStandardMaterial color="#1a140e" roughness={0.96} />
			</mesh>

			{/* Natural matte olive foliage tufts without artificial emission */}
			{tuftPositions.map(([x, y, z, r, col], i) => (
				<group key={`tuft-${i}`} position={[x, y, z]}>
					<mesh scale={[1.2, 0.75, 1.1]} rotation={[0.2 * i, i * 0.8, 0.1 * i]}>
						<dodecahedronGeometry args={[r, 1]} />
						<meshStandardMaterial
							color={col}
							roughness={0.88}
							metalness={0.02}
						/>
					</mesh>
					<mesh position={[r * 0.35, r * 0.15, -r * 0.2]} scale={[0.85, 0.65, 0.9]} rotation={[-0.3 * i, i * 1.1, 0.2 * i]}>
						<dodecahedronGeometry args={[r * 0.75, 1]} />
						<meshStandardMaterial
							color={col}
							roughness={0.88}
							metalness={0.02}
						/>
					</mesh>
				</group>
			))}
		</group>
	)
}

// Slender architectural Italian Cypress tree framing the monumental architecture
export function CypressTree({
	position = [0, 0, 0],
	scale = 1,
	rotationY = 0,
	foliageColor = '#101c0e',
	trunkColor = '#16100c'
}) {
	return (
		<group position={position} scale={scale} rotation={[0, rotationY, 0]}>
			<mesh position={[0, 0.45, 0]}>
				<cylinderGeometry args={[0.07, 0.11, 0.9, 8]} />
				<meshStandardMaterial color={trunkColor} roughness={0.96} />
			</mesh>
			{[
				[0, 1.50, 0.52, 2.2, '#122010'],
				[0.02, 2.75, 0.44, 2.4, '#162614'],
				[-0.02, 3.95, 0.34, 2.2, '#182b16'],
				[0.01, 4.90, 0.22, 1.8, '#1b3018'],
			].map(([x, y, r, h, col], i) => (
				<mesh key={i} position={[x, y, 0]} scale={[1, 1, 0.92]} rotation={[0, i * 0.9, 0]}>
					<coneGeometry args={[r, h, 12]} />
					<meshStandardMaterial
						color={col}
						roughness={0.90}
					/>
				</mesh>
			))}
		</group>
	)
}

export default ProceduralTree
