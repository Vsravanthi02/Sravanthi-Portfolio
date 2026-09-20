import BillboardLabel from '../BillboardLabel'
import { archivaProject } from '../../../data/projects'
import { destinationById } from '../../../data/destinations'

// Closing stage: the environment opens up (see Pathway.jsx's wider ground here
// and Lighting.jsx's brighter "What's Next" mood). Only wired to links that
// actually exist — the Archiva repo and the resume file path already used
// elsewhere in the app — everything else (a personal GitHub profile,
// LinkedIn) is left as a visible "coming soon" slot rather than a fabricated
// URL, since neither exists anywhere in the project's data.
const LINKS = [
	{ label: 'RESUME', href: '/resume/Sravanthi_Addagada_Resume.pdf', ready: true },
	{ label: 'ARCHIVA ON GITHUB', href: archivaProject.links.github, ready: true },
	{ label: 'LINKEDIN', href: null, ready: false },
	{ label: 'CONTACT', href: null, ready: false },
]

function LinkPylon({ link, position }) {
	return (
		<group position={position}>
			<mesh position={[0, 0.5, 0]}><cylinderGeometry args={[0.09, 0.12, 1, 10]} /><meshStandardMaterial color="#152233" metalness={0.5} roughness={0.45} /></mesh>
			<mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.06, 0.08, 20]} /><meshBasicMaterial color={link.ready ? '#68d9ef' : '#5a6b82'} transparent opacity={link.ready ? 0.85 : 0.5} /></mesh>
			{link.ready
				? <BillboardLabel position={[0, 1.3, 0]} fontSize={0.048} color="#8feaff" anchorX="center" anchorY="middle" letterSpacing={0.05} outlineWidth={0.004} outlineColor="#04141f">{link.label}</BillboardLabel>
				: <>
					<BillboardLabel position={[0, 1.3, 0]} fontSize={0.048} color="#8a97a8" anchorX="center" anchorY="middle" letterSpacing={0.05}>{link.label}</BillboardLabel>
					<BillboardLabel position={[0, 1.14, 0]} fontSize={0.032} color="#5a6b82" anchorX="center" anchorY="middle" letterSpacing={0.04}>COMING SOON</BillboardLabel>
				</>}
		</group>
	)
}

function NextInstallation({ onSelect }) {
	const base = destinationById.contact.position
	return (
		<group position={base} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(destinationById.contact) }} onDoubleClick={(event) => event.stopPropagation()} onPointerOver={() => { document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>
			<mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[3.4, 56]} /><meshStandardMaterial color="#141c2c" metalness={0.25} roughness={0.9} /></mesh>
			<mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[3.05, 3.2, 56]} /><meshBasicMaterial color="#6ff0d0" transparent opacity={0.4} /></mesh>
			{LINKS.map((link, index) => {
				const angle = (index / LINKS.length) * Math.PI * 2
				return <group key={link.label} onPointerDown={(event) => event.stopPropagation()} onClick={link.ready ? (event) => { event.stopPropagation(); window.open(link.href, link.href?.startsWith('/') ? '_self' : '_blank', 'noopener') } : (event) => event.stopPropagation()} onPointerOver={link.ready ? () => { document.body.style.cursor = 'pointer' } : undefined} onPointerOut={link.ready ? () => { document.body.style.cursor = '' } : undefined}>
					<LinkPylon link={link} position={[Math.cos(angle) * 1.9, 0, Math.sin(angle) * 1.9]} />
				</group>
			})}
			<pointLight color="#6ff0d0" intensity={1.5} distance={5} position={[0, 1.6, 0]} />
			<BillboardLabel position={[0, 2.35, 0]} fontSize={0.13} color="#f4f1ea" anchorX="center" anchorY="middle" letterSpacing={0.09} outlineWidth={0.007} outlineColor="#05070c">WHAT'S NEXT?</BillboardLabel>
			<BillboardLabel position={[0, 2.08, 0]} fontSize={0.06} color="#9fe9d8" anchorX="center" anchorY="middle" maxWidth={3} textAlign="center" letterSpacing={0.05}>Same curiosity. Bigger possibilities.</BillboardLabel>
		</group>
	)
}

export default NextInstallation
