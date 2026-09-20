import BillboardLabel from '../BillboardLabel'
import { destinationById } from '../../../data/destinations'

// The calmest stage — after five technical installations, one quiet object
// and warm light (see Lighting.jsx's per-stage moods) rather than another
// mechanism. Only facts already established elsewhere in the app: name, role,
// and the existing hero line — personal.js has no bio content to draw from,
// so none is invented here.
function PersonInstallation({ onSelect }) {
	const base = destinationById.about.position
	return (
		<group position={base} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(destinationById.about) }} onDoubleClick={(event) => event.stopPropagation()} onPointerOver={() => { document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>
			<mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[2.4, 48]} /><meshStandardMaterial color="#1c1a17" metalness={0.15} roughness={0.95} /></mesh>
			<mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[1.5, 1.55, 48]} /><meshBasicMaterial color="#d7a26a" transparent opacity={0.4} /></mesh>
			<mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.02, 0.09, 1.1, 12]} /><meshStandardMaterial color="#2a2620" roughness={0.6} metalness={0.2} /></mesh>
			<mesh position={[0, 1.16, 0]}><sphereGeometry args={[0.1, 16, 12]} /><meshStandardMaterial color="#f3d9ad" emissive="#e6b073" emissiveIntensity={0.5} roughness={0.4} /></mesh>
			<pointLight color="#e6b073" intensity={1.6} distance={3.5} position={[0, 1.3, 0]} />
			<BillboardLabel position={[0, 1.85, 0]} fontSize={0.12} color="#f4f1ea" anchorX="center" anchorY="middle" letterSpacing={0.09} outlineWidth={0.007} outlineColor="#05070c">THE PERSON</BillboardLabel>
			<BillboardLabel position={[0, 1.62, 0]} fontSize={0.062} color="#e7c9a3" anchorX="center" anchorY="middle" letterSpacing={0.08}>SRAVANTHI ADDAGADA</BillboardLabel>
			<BillboardLabel position={[0, 1.44, 0]} fontSize={0.05} color="#b7a794" anchorX="center" anchorY="middle" letterSpacing={0.07}>AI / GENAI ENGINEER</BillboardLabel>
		</group>
	)
}

export default PersonInstallation
