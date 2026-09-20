// A monumental stone/metal portal — thick, faceted (low radial segment
// count reads as carved/cast stone rather than a smooth "neon ring"),
// layered with a decorative inner/outer trim, a foundation plinth, and two
// substantial flanking columns with base + capital blocks (real classical
// proportions, not thin poles). This is architecture the player stands
// inside, not a ring floating beside them.
function ArchFrame({ position = [0, 0, -3], radius = 8, tube = 1.05, color = '#22304a', edgeColor = '#ffb45e' }) {
	const columnWidth = 2.1
	const columnHeight = radius * 1.35
	const columnOffset = radius + 3.2
	return (
		<group position={position}>
			{/* Foundation plinth the whole structure reads as resting on. */}
			<mesh position={[0, 0.14, 0]}>
				<boxGeometry args={[radius * 2 + columnWidth * 2 + 4, 0.28, 3.2]} />
				<meshStandardMaterial color="#101c30" roughness={0.85} />
			</mesh>

			<group position={[0, radius + 0.28, 0]}>
				<mesh>
					<torusGeometry args={[radius, tube, 9, 48]} />
					<meshStandardMaterial color={color} roughness={0.6} metalness={0.4} />
				</mesh>
				<mesh>
					<torusGeometry args={[radius + tube * 0.82, tube * 0.12, 8, 96]} />
					<meshStandardMaterial color={edgeColor} emissive={edgeColor} emissiveIntensity={1.2} roughness={0.35} />
				</mesh>
				<mesh>
					<torusGeometry args={[radius - tube * 0.82, tube * 0.12, 8, 96]} />
					<meshStandardMaterial color={edgeColor} emissive={edgeColor} emissiveIntensity={0.9} roughness={0.35} />
				</mesh>
			</group>

			{[-1, 1].map((side) => (
				<group key={side} position={[side * columnOffset, 0, 1.4]}>
					{/* Base block */}
					<mesh position={[0, 0.5, 0]}>
						<boxGeometry args={[columnWidth * 1.3, 1.0, columnWidth * 1.3]} />
						<meshStandardMaterial color="#152238" roughness={0.75} metalness={0.25} />
					</mesh>
					{/* Shaft */}
					<mesh position={[0, columnHeight / 2 + 1.0, 0]}>
						<boxGeometry args={[columnWidth, columnHeight, columnWidth]} />
						<meshStandardMaterial color="#1c2c46" roughness={0.68} metalness={0.3} />
					</mesh>
					{/* Capital block */}
					<mesh position={[0, columnHeight + 1.5, 0]}>
						<boxGeometry args={[columnWidth * 1.4, 1.0, columnWidth * 1.4]} />
						<meshStandardMaterial color="#152238" roughness={0.75} metalness={0.25} />
					</mesh>
					{/* Inner-facing warm trim strip */}
					<mesh position={[-side * (columnWidth / 2 + 0.03), columnHeight / 2 + 1.0, 0]}>
						<boxGeometry args={[0.05, columnHeight * 0.9, columnWidth * 0.7]} />
						<meshStandardMaterial color={edgeColor} emissive={edgeColor} emissiveIntensity={0.7} />
					</mesh>
				</group>
			))}
		</group>
	)
}

export default ArchFrame
