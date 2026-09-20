// A large angled structural wall panel — used in pairs, further out than the
// arch's own flanking columns, to bookend the whole composition. Vertical
// recess lines and a base plinth are what separate "architecture" from "one
// flat dark slab" — large simple forms with a little structural rhythm, not
// dense detail.
function WingWall({ position = [0, 0, 0], rotationY = 0, width = 5, height = 9, depth = 0.7, color = '#101c30', edgeColor = '#ffb45e' }) {
	const divisions = 3
	return (
		<group position={position} rotation={[0, rotationY, 0]}>
			{/* Base plinth */}
			<mesh position={[0, 0.25, depth * 0.1]}>
				<boxGeometry args={[width * 1.08, 0.5, depth * 1.3]} />
				<meshStandardMaterial color="#0a1526" roughness={0.85} />
			</mesh>
			<mesh position={[0, height / 2 + 0.5, 0]}>
				<boxGeometry args={[width, height, depth]} />
				<meshStandardMaterial color={color} roughness={0.78} metalness={0.22} />
			</mesh>
			{/* Vertical recess lines — subtle structural rhythm, not decoration */}
			{Array.from({ length: divisions - 1 }, (_, i) => {
				const x = -width / 2 + ((i + 1) * width) / divisions
				return (
					<mesh key={i} position={[x, height / 2 + 0.5, depth / 2 - 0.02]}>
						<boxGeometry args={[0.08, height * 0.88, 0.05]} />
						<meshStandardMaterial color="#081120" roughness={0.9} />
					</mesh>
				)
			})}
			{/* Inner warm-lit edge, catching the sunset key light */}
			<mesh position={[width / 2 - 0.03, height / 2 + 0.5, depth / 2 + 0.01]}>
				<boxGeometry args={[0.04, height * 0.92, 0.04]} />
				<meshStandardMaterial color={edgeColor} emissive={edgeColor} emissiveIntensity={0.65} />
			</mesh>
			{/* Small illuminated opening near the base — a real architectural
			    detail (a window/niche), not a glowing decal. */}
			<mesh position={[0, 1.4, depth / 2 + 0.01]}>
				<planeGeometry args={[width * 0.32, 0.9]} />
				<meshStandardMaterial color="#2a2016" emissive={edgeColor} emissiveIntensity={0.3} roughness={0.6} />
			</mesh>
		</group>
	)
}

export default WingWall
