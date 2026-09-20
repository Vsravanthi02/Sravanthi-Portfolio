// A near-silhouette tree: dark trunk + several overlapping low-poly canopy
// clusters at varying offsets/sizes, flat-shaded. Default colors updated to
// dark greens so the canopy catches warm HDRI rim-light rather than absorbing
// everything. At these distances the tree is never a focal object, just
// something the warm key can catch the edges of.
function ProceduralTree({ position = [0, 0, 0], scale = 1, trunkColor = '#253a1a', canopyColor = '#1a3010' }) {
	const clusters = [
		{ pos: [0, 1.55, 0], scale: [1, 1.2, 1], radius: 0.55 },
		{ pos: [0.32, 1.3, 0.18], scale: [0.8, 0.9, 0.8], radius: 0.48 },
		{ pos: [-0.3, 1.2, -0.22], scale: [0.75, 0.85, 0.75], radius: 0.44 },
		{ pos: [0.05, 1.05, -0.32], scale: [0.7, 0.75, 0.7], radius: 0.4 },
		{ pos: [-0.15, 1.7, 0.15], scale: [0.65, 0.7, 0.65], radius: 0.36 },
	]
	return (
		<group position={position} scale={scale}>
			<mesh position={[0, 0.65, 0]}>
				<cylinderGeometry args={[0.06, 0.11, 1.3, 6]} />
				<meshStandardMaterial color={trunkColor} roughness={0.92} />
			</mesh>
			{clusters.map(({ pos, scale: s, radius }, index) => (
				<mesh key={index} position={pos} scale={s} rotation={[0, index * 1.3, 0]}>
					<icosahedronGeometry args={[radius, 0]} />
					<meshStandardMaterial color={canopyColor} roughness={0.88} flatShading />
				</mesh>
			))}
		</group>
	)
}

export default ProceduralTree
