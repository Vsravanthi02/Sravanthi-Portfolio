import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import BillboardLabel from '../BillboardLabel'
import { archivaProject, pendingProjects } from '../../../data/projects'
import { destinationById } from '../../../data/destinations'

// Archiva's real pipeline (archivaProject.pipeline: Documents -> Ingestion ->
// Retrieval -> Agent -> Response) plus a "Reason" node grounded in the
// existing archivaProject.core field ("Retrieval + Reasoning + Tool Use") —
// this 6-node reading of the 5-step pipeline is not new invention, it's the
// same expansion the previous ArchivaLandmark used.
const NODES = [
	{ label: 'DOCUMENTS', position: [-2.1, 0.55, 0] },
	{ label: 'INGESTION', position: [-1.25, 0.75, 0] },
	{ label: 'RETRIEVAL', position: [-0.4, 0.95, 0] },
	{ label: 'AGENT', position: [0.5, 0.95, 0] },
	{ label: 'REASON', position: [1.4, 0.75, 0] },
	{ label: 'RESPONSE', position: [2.25, 0.55, 0] },
]

function DocumentsNode({ position }) {
	return <group position={position}>{[0, 1, 2].map((i) => <mesh key={i} position={[0, i * 0.035, 0]} rotation={[0, i * 0.15, 0]}><boxGeometry args={[0.26, 0.02, 0.34]} /><meshStandardMaterial color="#2c3c52" roughness={0.6} /></mesh>)}</group>
}
function IngestionNode({ position }) {
	return <mesh position={position} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.2, 0.32, 10]} /><meshStandardMaterial color="#2c3c52" emissive="#6f5fe0" emissiveIntensity={0.28} roughness={0.45} /></mesh>
}
function RetrievalNode({ position }) {
	const linkPositions = [[-0.12, 0.1, 0], [0.14, 0.08, 0.05], [0, -0.12, -0.05]]
	return <group position={position}>
		<mesh><icosahedronGeometry args={[0.1, 0]} /><meshStandardMaterial color="#233248" emissive="#68d9ef" emissiveIntensity={0.35} flatShading /></mesh>
		{linkPositions.map((p, i) => <mesh key={i} position={p}><sphereGeometry args={[0.035, 8, 6]} /><meshBasicMaterial color="#68d9ef" /></mesh>)}
	</group>
}
function AgentNode({ position }) {
	const ref = useRef()
	useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.5 })
	return <mesh ref={ref} position={position} rotation={[0.4, 0, 0.2]}><octahedronGeometry args={[0.14, 0]} /><meshStandardMaterial color="#3a2e63" emissive="#a993ff" emissiveIntensity={0.4} flatShading /></mesh>
}
function ReasonNode({ position }) {
	return <group position={position}>
		<mesh><sphereGeometry args={[0.09, 12, 8]} /><meshStandardMaterial color="#2c3c52" emissive="#a993ff" emissiveIntensity={0.22} /></mesh>
		<mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.16, 0.008, 6, 20]} /><meshBasicMaterial color="#a993ff" transparent opacity={0.55} /></mesh>
	</group>
}
function ResponseNode({ position }) {
	return <mesh position={position}><boxGeometry args={[0.05, 0.4, 0.28]} /><meshStandardMaterial color="#20384d" emissive="#68d9ef" emissiveIntensity={0.3} metalness={0.5} roughness={0.3} /></mesh>
}
const NODE_COMPONENTS = { DOCUMENTS: DocumentsNode, INGESTION: IngestionNode, RETRIEVAL: RetrievalNode, AGENT: AgentNode, REASON: ReasonNode, RESPONSE: ResponseNode }

function FlowPacket({ index }) {
	const ref = useRef()
	useFrame((state) => {
		if (!ref.current) return
		const t = ((state.clock.elapsedTime * 0.25 + index / 3) % 1)
		const segment = t * (NODES.length - 1)
		const i = Math.min(NODES.length - 2, Math.floor(segment))
		const local = segment - i
		const a = NODES[i].position
		const b = NODES[i + 1].position
		ref.current.position.set(a[0] + (b[0] - a[0]) * local, a[1] + (b[1] - a[1]) * local + 0.05, a[2] + (b[2] - a[2]) * local)
	})
	return <mesh ref={ref}><sphereGeometry args={[0.03, 8, 6]} /><meshBasicMaterial color="#8feaff" /></mesh>
}

function PendingMarker({ item, position, onSelect }) {
	const target = { id: item.id, worldName: item.name, description: 'Project details pending.', detail: 'Full write-up coming soon.' }
	return (
		<group position={position} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(target) }} onDoubleClick={(event) => event.stopPropagation()} onPointerOver={() => { document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>
			<mesh position={[0, 0.35, 0]}><boxGeometry args={[0.22, 0.7, 0.16]} /><meshStandardMaterial color="#182130" roughness={0.85} transparent opacity={0.75} /></mesh>
			<mesh position={[0, 0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.05, 0.07, 16]} /><meshBasicMaterial color="#5a6b82" transparent opacity={0.7} /></mesh>
			<BillboardLabel position={[0, 1.0, 0]} fontSize={0.052} color="#c3ccd8" anchorX="center" anchorY="middle" maxWidth={1.4} textAlign="center" letterSpacing={0.05}>{item.name}</BillboardLabel>
			<BillboardLabel position={[0, 0.85, 0]} fontSize={0.036} color="#6f7c8f" anchorX="center" anchorY="middle" letterSpacing={0.04}>DETAILS COMING SOON</BillboardLabel>
		</group>
	)
}

function BuildInstallation({ onSelect }) {
	const base = destinationById.projects.position
	return (
		<group position={base}>
			<mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6.4, 3.4]} /><meshStandardMaterial color="#141c2c" metalness={0.3} roughness={0.85} /></mesh>
			<group onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(destinationById.projects) }} onDoubleClick={(event) => event.stopPropagation()} onPointerOver={() => { document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>
				{NODES.map(({ label, position }) => {
					const NodeComponent = NODE_COMPONENTS[label]
					return <NodeComponent key={label} position={position} />
				})}
				{NODES.slice(0, -1).map((_, index) => {
					const a = NODES[index].position
					const b = NODES[index + 1].position
					const length = Math.hypot(b[0] - a[0], b[1] - a[1])
					return (
						<mesh key={index} position={[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, 0]} rotation={[0, 0, Math.atan2(b[1] - a[1], b[0] - a[0])]}>
							<boxGeometry args={[length, 0.012, 0.012]} /><meshBasicMaterial color="#4a7f96" transparent opacity={0.5} />
						</mesh>
					)
				})}
				{[0, 1, 2].map((i) => <FlowPacket key={i} index={i} />)}
				{NODES.map(({ label, position }) => (
					<BillboardLabel key={`label-${label}`} position={[position[0], position[1] + 0.28, position[2]]} fontSize={0.045} color="#c8d9f0" anchorX="center" anchorY="middle" letterSpacing={0.05}>{label}</BillboardLabel>
				))}
				<pointLight color="#68d9ef" intensity={1.8} distance={3.5} position={[0, 1.3, 0.6]} />
				<BillboardLabel position={[0, 1.85, 0]} fontSize={0.12} color="#f4f1ea" anchorX="center" anchorY="middle" letterSpacing={0.09} outlineWidth={0.007} outlineColor="#05070c">THE BUILD</BillboardLabel>
				<BillboardLabel position={[0, 1.62, 0]} fontSize={0.06} color="#bcaeff" anchorX="center" anchorY="middle" letterSpacing={0.06}>{archivaProject.name} — {archivaProject.title}</BillboardLabel>
			</group>
			{pendingProjects.map((item, index) => (
				<PendingMarker key={item.id} item={item} position={[-2.6 + index * 1.3, 0, -1.9]} onSelect={onSelect} />
			))}
			<BillboardLabel position={[0, 1.3, -1.9]} fontSize={0.05} color="#5a6b82" anchorX="center" anchorY="middle" letterSpacing={0.08}>MORE WORK — DETAILS COMING SOON</BillboardLabel>
		</group>
	)
}

export default BuildInstallation
