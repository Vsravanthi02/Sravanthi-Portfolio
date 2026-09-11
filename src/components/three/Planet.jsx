import BillboardLabel from './BillboardLabel'
import { destinations } from '../../data/destinations'

const continentShapes = {
	origin: { radius: 2.25, scale: [1, 0.8], rotation: 0.2 },
	ridge: { radius: 2.15, scale: [1.18, 0.72], rotation: -0.5 },
	delta: { radius: 4.9, scale: [1.08, 0.88], rotation: 0.35 },
	mesa: { radius: 2.35, scale: [0.9, 1.15], rotation: -0.15 },
	terraces: { radius: 2.28, scale: [1.15, 0.78], rotation: 0.65 },
	coast: { radius: 2.2, scale: [1.05, 0.83], rotation: -0.35 },
}

function WorldPath({ start, end }) {
	const dx = end[0] - start[0]
	const dz = end[2] - start[2]
	const length = Math.hypot(dx, dz)
	return <group position={[(start[0] + end[0]) / 2, 0.075, (start[2] + end[2]) / 2]} rotation={[0, -Math.atan2(dz, dx), 0]}>
		<mesh><boxGeometry args={[0.42, 0.025, length]} /><meshStandardMaterial color="#294158" metalness={0.72} roughness={0.6} /></mesh>
		<mesh position={[0, 0.018, 0]}><boxGeometry args={[0.045, 0.01, length * 0.9]} /><meshBasicMaterial color="#5d9db0" transparent opacity={0.35} /></mesh>
	</group>
}

function ContinentTerrain({ destination, onSelect }) {
	const shape = continentShapes[destination.terrain]
	const [x, , z] = destination.position
	const rocks = destination.id === 'experience' ? [[-1.65, -0.5], [1.3, 0.82], [0.35, -1.25]] : [[-0.85, -0.45], [0.95, 0.45]]
	return <group position={[x, 0.035, z]} rotation={[0, shape.rotation, 0]} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(destination) }} onDoubleClick={(event) => event.stopPropagation()}>
		<mesh scale={[shape.scale[0], 1, shape.scale[1]]}><cylinderGeometry args={[shape.radius, shape.radius * 1.12, 0.07, 11]} /><meshStandardMaterial color="#1b3a4b" emissive={destination.colorTheme} emissiveIntensity={0.06} metalness={0.55} roughness={0.8} /></mesh>
		<mesh position={[0, 0.055, 0]} scale={[shape.scale[0] * 0.91, 1, shape.scale[1] * 0.9]}><cylinderGeometry args={[shape.radius * 0.9, shape.radius, 0.04, 11]} /><meshStandardMaterial color="#26475a" metalness={0.45} roughness={0.86} /></mesh>
		{rocks.map(([rx, rz], index) => <mesh key={`${destination.id}-${index}`} position={[rx, 0.14 + index * 0.08, rz]} rotation={[0, index, 0]}><dodecahedronGeometry args={[index ? 0.28 : 0.38, 0]} /><meshStandardMaterial color="#31566a" emissive={destination.colorTheme} emissiveIntensity={0.08} roughness={0.9} /></mesh>)}
		<BillboardLabel position={[0, 0.72, -shape.radius * shape.scale[1] - 0.28]} fontSize={0.11} color="#d1e7eb" anchorX="center" anchorY="middle" letterSpacing={0.08}>{destination.worldName}</BillboardLabel>
		<BillboardLabel position={[0, 0.54, -shape.radius * shape.scale[1] - 0.28]} fontSize={0.052} color={destination.colorTheme} anchorX="center" anchorY="middle" letterSpacing={0.09}>{destination.label}</BillboardLabel>
	</group>
}

function Planet({ onSelect }) {
	const home = destinations[0]
	return <group>
		{/* One continuous walkable planetary surface. */}
		<mesh position={[0, -0.25, 0]}><cylinderGeometry args={[14, 14.8, 0.5, 64]} /><meshStandardMaterial color="#102739" metalness={0.68} roughness={0.8} /></mesh>
		<mesh position={[0, 0.015, 0]}><cylinderGeometry args={[13.4, 13.8, 0.03, 64]} /><meshStandardMaterial color="#183548" metalness={0.5} roughness={0.9} /></mesh>
		{[[-11, -3], [-10, 3], [-4, -10], [4, -10], [10, 1], [4, 11], [-4, 11]].map(([x, z], index) => <mesh key={index} position={[x, 0.22, z]} scale={[1.6, 0.3 + (index % 2) * 0.12, 0.75]}><dodecahedronGeometry args={[1, 1]} /><meshStandardMaterial color="#1d3b4b" roughness={0.95} /></mesh>)}
		{destinations.map((destination) => <ContinentTerrain key={destination.id} destination={destination} onSelect={onSelect} />)}
		{destinations.filter((destination) => destination.id !== 'home').map((destination) => <WorldPath key={destination.id} start={home.position} end={destination.position} />)}
	</group>
}

export default Planet
