import BillboardLabel from '../BillboardLabel'
import { toolkitEntries } from '../../../data/toolkit'
import { destinationById } from '../../../data/destinations'

const COLUMNS = 6
const SPACING = 0.85

function ToolModule({ entry, position, onSelect }) {
	const target = { id: `tool-${entry.name}`, worldName: entry.name, description: `Used in: ${entry.usedIn.join(', ')}.`, detail: 'Part of the engineering toolkit behind this work.' }
	return (
		<group position={position} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(target) }} onDoubleClick={(event) => event.stopPropagation()} onPointerOver={() => { document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>
			<mesh position={[0, 0.14, 0]}><boxGeometry args={[0.24, 0.28, 0.24]} /><meshStandardMaterial color="#1c2738" metalness={0.5} roughness={0.5} /></mesh>
			<mesh position={[0, 0.29, 0]}><boxGeometry args={[0.16, 0.02, 0.16]} /><meshBasicMaterial color="#5fb8d6" transparent opacity={0.75} /></mesh>
			<BillboardLabel position={[0, 0.55, 0]} fontSize={0.042} color="#dbe6f0" anchorX="center" anchorY="middle" maxWidth={0.9} textAlign="center" letterSpacing={0.03}>{entry.name}</BillboardLabel>
		</group>
	)
}

function ToolkitInstallation({ onSelect }) {
	const base = destinationById.skills.position
	const rows = Math.ceil(toolkitEntries.length / COLUMNS)
	const width = (COLUMNS - 1) * SPACING
	const depth = (rows - 1) * SPACING
	return (
		<group position={base}>
			<mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[width + 2.2, depth + 2.2]} /><meshStandardMaterial color="#141c2c" metalness={0.3} roughness={0.85} /></mesh>
			<group onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(destinationById.skills) }} onDoubleClick={(event) => event.stopPropagation()}>
				{toolkitEntries.map((entry, index) => {
					const col = index % COLUMNS
					const row = Math.floor(index / COLUMNS)
					const x = col * SPACING - width / 2
					const z = row * SPACING - depth / 2
					return <ToolModule key={entry.name} entry={entry} position={[x, 0, z]} onSelect={onSelect} />
				})}
			</group>
			<pointLight color="#5fb8d6" intensity={1.4} distance={4} position={[0, 1.4, 0]} />
			<BillboardLabel position={[0, depth / 2 + 1.15, 0]} fontSize={0.12} color="#f4f1ea" anchorX="center" anchorY="middle" letterSpacing={0.09} outlineWidth={0.007} outlineColor="#05070c">TOOLKIT</BillboardLabel>
			<BillboardLabel position={[0, depth / 2 + 0.92, 0]} fontSize={0.055} color="#9fbccb" anchorX="center" anchorY="middle" letterSpacing={0.06}>THE ENGINEERING TOOLS BEHIND THE WORK</BillboardLabel>
		</group>
	)
}

export default ToolkitInstallation
