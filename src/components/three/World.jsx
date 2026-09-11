import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import BillboardLabel from './BillboardLabel'
import Planet from './Planet'
import InteractionSystem from './InteractionSystem'
import PlayerController from './PlayerController'
import { destinations, destinationById } from '../../data/destinations'
import { geographicTargets } from '../../data/geography'
import { QuintesysCampus } from './QuintesysCampus'

export const destinationTargets = destinations.filter((destination) => destination.id !== 'home')

function OriginLandmark({ onSelect }) {
	const ref = useRef()
	useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.08 })
	return <group position={[0, 0.08, 0]} ref={ref} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(destinationById.home) }} onDoubleClick={(event) => event.stopPropagation()}>
		<mesh><octahedronGeometry args={[0.52, 1]} /><meshStandardMaterial color="#315f63" emissive="#78d9b0" emissiveIntensity={0.35} metalness={0.75} roughness={0.3} /></mesh>
		<pointLight color="#78d9b0" intensity={2} distance={4} />
		<BillboardLabel position={[0, 0.85, 0]} fontSize={0.1} color="#c7efe1" anchorX="center" anchorY="middle" letterSpacing={0.1}>ORIGIN</BillboardLabel>
	</group>
}

function SimpleLandmark({ id, onSelect }) {
	const continent = destinationById[id]
	const [x, , z] = continent.position
	const kind = id === 'about' ? 'identity' : id === 'skills' ? 'skills' : 'contact'
	return <group position={[x, 0.1, z]} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(continent) }} onDoubleClick={(event) => event.stopPropagation()}>
		{kind === 'identity' && [-0.36, 0, 0.36].map((offset, index) => <mesh key={offset} position={[offset, 0.38 + index * 0.16, 0]}><boxGeometry args={[0.16, 0.85 + index * 0.32, 0.16]} /><meshStandardMaterial color="#3c6172" emissive={continent.colorTheme} emissiveIntensity={0.22} metalness={0.8} /></mesh>)}
		{kind === 'skills' && [[-0.45, 0], [0.45, 0], [0, 0.45], [0, -0.45]].map(([dx, dz], index) => <group key={index} position={[dx, 0.44, dz]}><mesh><sphereGeometry args={[0.12, 10, 8]} /><meshStandardMaterial color="#42647e" emissive={continent.colorTheme} emissiveIntensity={0.45} /></mesh>{index > 0 && <mesh position={[-dx / 2, 0, -dz / 2]} rotation={[0, Math.atan2(dx, dz), Math.PI / 2]}><cylinderGeometry args={[0.015, 0.015, Math.hypot(dx, dz), 6]} /><meshBasicMaterial color={continent.colorTheme} transparent opacity={0.45} /></mesh>}</group>)}
		{kind === 'contact' && <><mesh position={[0, 0.72, 0]}><cylinderGeometry args={[0.07, 0.14, 1.45, 10]} /><meshStandardMaterial color="#3e6971" emissive={continent.colorTheme} emissiveIntensity={0.28} metalness={0.8} /></mesh><mesh position={[0, 1.55, 0]}><sphereGeometry args={[0.2, 12, 8]} /><meshBasicMaterial color={continent.colorTheme} /></mesh></>}
		<pointLight color={continent.colorTheme} intensity={1.5} distance={3.5} position={[0, 1.2, 0]} />
		<BillboardLabel position={[0, 1.95, 0]} fontSize={0.1} color="#d3e8ee" anchorX="center" anchorY="middle" letterSpacing={0.07}>{continent.worldName}</BillboardLabel>
	</group>
}

const archivaNodes = [['DOCUMENTS', [-1.25, 0.6, 0]], ['INGESTION', [-0.72, 1.2, 0]], ['RETRIEVAL', [0, 1.42, 0]], ['AGENT', [0.72, 1.2, 0]], ['REASON', [1.25, 0.6, 0]], ['RESPONSE', [0, 0.18, 0]]]

function ArchivaLandmark({ onSelect }) {
	const ref = useRef()
	useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.12 })
	return <group position={[0, 0.1, 9]} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(destinationById.projects) }} onDoubleClick={(event) => event.stopPropagation()}>
		<mesh><cylinderGeometry args={[0.92, 1.08, 0.18, 10]} /><meshStandardMaterial color="#343c61" emissive="#b39cff" emissiveIntensity={0.2} metalness={0.85} roughness={0.3} /></mesh>
		<group ref={ref} position={[0, 1.22, 0]}><mesh rotation={[0.45, 0.35, 0.1]}><boxGeometry args={[0.58, 0.58, 0.58]} /><meshStandardMaterial color="#254060" emissive="#785eff" emissiveIntensity={0.55} metalness={0.7} roughness={0.25} wireframe /></mesh>{archivaNodes.map(([label, position], index) => <group key={label} position={position}><mesh><sphereGeometry args={[index === 5 ? 0.11 : 0.07, 10, 8]} /><meshBasicMaterial color={index === 3 ? '#b19cff' : '#6ce3ff'} /></mesh><BillboardLabel position={[0, -0.16, 0]} fontSize={0.043} color="#c8d9f0" anchorX="center" anchorY="middle">{label}</BillboardLabel></group>)}</group>
		<pointLight color="#927dff" intensity={2.6} distance={4} position={[0, 1.5, 0]} />
		<BillboardLabel position={[0, 2.82, 0]} fontSize={0.12} color="#e0d8ff" anchorX="center" anchorY="middle" letterSpacing={0.08}>ARCHIVA</BillboardLabel>
		<BillboardLabel position={[0, 2.6, 0]} fontSize={0.06} color="#bcaeff" anchorX="center" anchorY="middle" letterSpacing={0.06}>AGENTIC RAG CONTINENT</BillboardLabel>
	</group>
}

function World({ isMobile, enabled, isLocked, mobileInput, mobileLook, mobilePinchDistance, navigationTarget, onNavigationState, playerPositionRef, onPositionChange, onRotationChange, onZoomChange, onCameraModeChange, onNearby, onInteract, selectedStateId, dragLookRef, explorationEnabled }) {
	return <group>
		<Planet onSelect={onInteract} />
		<OriginLandmark onSelect={onInteract} />
		<QuintesysCampus selectedStateId={selectedStateId} onSelect={onInteract} />
		<ArchivaLandmark onSelect={onInteract} />
		<SimpleLandmark id="about" onSelect={onInteract} /><SimpleLandmark id="skills" onSelect={onInteract} /><SimpleLandmark id="contact" onSelect={onInteract} />
		<PlayerController enabled={enabled} isLocked={isLocked} isMobile={isMobile} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onNavigationState={onNavigationState} onPositionChange={onPositionChange} onRotationChange={onRotationChange} onZoomChange={onZoomChange} onCameraModeChange={onCameraModeChange} dragLookRef={dragLookRef} explorationEnabled={explorationEnabled} />
		<InteractionSystem playerPositionRef={playerPositionRef} targets={[...destinations, ...geographicTargets]} enabled={enabled} onNearby={onNearby} onInteract={onInteract} />
	</group>
}

export default World
