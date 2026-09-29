import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import BillboardLabel from './BillboardLabel'
import { destinationById } from '../../data/destinations'
import { experienceStates, quintesysGeography } from '../../data/geography'

// A small emissive pulse travelling core->state and back — the hub-and-spoke
// shape reads as "engineering system with data flowing to specializations"
// rather than "campus map" once something is visibly moving through it.
function FlowPulse({ start, end, offset }) {
	const ref = useRef()
	useFrame((state) => {
		if (!ref.current) return
		const t = (Math.sin(state.clock.elapsedTime * 0.6 + offset) + 1) / 2
		ref.current.position.set(start[0] + (end[0] - start[0]) * t, 0.16, start[2] + (end[2] - start[2]) * t)
	})
	return <mesh ref={ref}><sphereGeometry args={[0.028, 8, 6]} /><meshBasicMaterial color="#8feaff" /></mesh>
}

function StateRoute({ start, end, color, index }) {
	const dx = end[0] - start[0]
	const dz = end[2] - start[2]
	const length = Math.hypot(dx, dz)
	return <group>
		<group position={[(start[0] + end[0]) / 2, 0.15, (start[2] + end[2]) / 2]} rotation={[0, -Math.atan2(dz, dx), 0]}>
			<mesh><boxGeometry args={[0.15, 0.018, length]} /><meshStandardMaterial color="#355368" emissive={color} emissiveIntensity={0.1} roughness={0.7} /></mesh>
			<mesh position={[0, 0.012, 0]}><boxGeometry args={[0.025, 0.006, length * 0.86]} /><meshBasicMaterial color={color} transparent opacity={0.32} /></mesh>
		</group>
		<FlowPulse start={start} end={end} offset={index * 1.7} />
	</group>
}

function StateLandmark({ state }) {
	if (state.terrain === 'generative') return <mesh position={[0, 0.38, 0]} rotation={[0.2, 0.45, 0.1]}><octahedronGeometry args={[0.18, 1]} /><meshStandardMaterial color="#47798c" emissive={state.theme} emissiveIntensity={0.35} metalness={0.75} roughness={0.3} /></mesh>
	if (state.terrain === 'systems') return <group>{[-0.18, 0, 0.18].map((x, index) => <mesh key={x} position={[x, 0.3 + index * 0.08, 0]}><boxGeometry args={[0.09, 0.48 + index * 0.12, 0.11]} /><meshStandardMaterial color="#42667b" emissive={state.theme} emissiveIntensity={0.22} metalness={0.8} /></mesh>)}</group>
	if (state.terrain === 'agents') return <group>{[[-0.2, 0], [0.2, 0], [0, 0.22]].map(([x, z], index) => <mesh key={index} position={[x, 0.34, z]}><sphereGeometry args={[0.075, 8, 6]} /><meshBasicMaterial color={state.theme} /></mesh>)}</group>
	return <group>{[-0.15, 0.15].map((x) => <mesh key={x} position={[x, 0.35, 0]}><boxGeometry args={[0.12, 0.46, 0.04]} /><meshStandardMaterial color="#416c6c" emissive={state.theme} emissiveIntensity={0.28} metalness={0.75} /></mesh>)}</group>
}

function GeographicState({ state, selected, dimmed, onSelect }) {
	const terrainRef = useRef()
	useFrame((_, delta) => {
		if (!terrainRef.current) return
		const targetScale = selected ? 1.08 : 1
		const alpha = 1 - Math.exp(-8 * delta)
		terrainRef.current.scale.x += (targetScale - terrainRef.current.scale.x) * alpha
		terrainRef.current.scale.z += (targetScale - terrainRef.current.scale.z) * alpha
		terrainRef.current.position.y += ((selected ? 0.055 : 0) - terrainRef.current.position.y) * alpha
	})
	const select = (event) => { event.stopPropagation(); onSelect(state) }
	return <group position={state.position} onClick={select} onPointerDown={(event) => event.stopPropagation()} onDoubleClick={(event) => event.stopPropagation()} onPointerOver={(event) => { event.stopPropagation(); document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>
		<group ref={terrainRef}>
			<mesh rotation={[0, state.terrain === 'systems' ? 0.4 : state.terrain === 'agents' ? -0.3 : 0.14, 0]} scale={state.terrain === 'automation' ? [1.14, 1, 0.78] : state.terrain === 'generative' ? [0.86, 1, 1.12] : [1, 1, 1]}><cylinderGeometry args={[state.radius, state.radius * 1.11, 0.15, 8]} /><meshStandardMaterial color="#27495a" emissive={state.theme} emissiveIntensity={selected ? 0.3 : 0.08} metalness={0.65} roughness={0.72} transparent opacity={dimmed ? 0.42 : 1} /></mesh>
			<mesh position={[0, 0.087, 0]} rotation={[0, state.terrain === 'systems' ? 0.4 : state.terrain === 'agents' ? -0.3 : 0.14, 0]} scale={state.terrain === 'automation' ? [1.04, 1, 0.7] : state.terrain === 'generative' ? [0.78, 1, 1.02] : [0.91, 1, 0.91]}><cylinderGeometry args={[state.radius, state.radius * 1.03, 0.035, 8]} /><meshStandardMaterial color="#355a6c" emissive={state.theme} emissiveIntensity={selected ? 0.22 : 0.04} metalness={0.55} roughness={0.78} transparent opacity={dimmed ? 0.5 : 1} /></mesh>
			{selected && <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[state.radius * 0.92, state.radius * 0.96, 8]} /><meshBasicMaterial color={state.theme} transparent opacity={0.72} /></mesh>}
			<StateLandmark state={state} />
		</group>
		<BillboardLabel position={[0, 1.02, 0]} fontSize={0.12} color={selected ? '#f0fbff' : '#d5edf4'} anchorX="center" anchorY="middle" letterSpacing={0.055} outlineWidth={0.008} outlineColor="#07111d">{state.label}</BillboardLabel>
		<BillboardLabel position={[0, 0.8, 0]} fontSize={0.055} color={state.theme} anchorX="center" anchorY="middle" maxWidth={1.8} textAlign="center" outlineWidth={0.006} outlineColor="#07111d">{state.subtitle}</BillboardLabel>
	</group>
}

// A physically walkable rendering of BI Automation's real 8-stage pipeline
// (src/data/geography.js) near the core — reinforces "walk alongside the
// pipeline" without touching QuintesysTerminal.jsx's own pipeline UI or the
// state-selection logic above.
function PipelineStrip({ pipeline, origin }) {
	const spacing = 0.62
	const totalWidth = (pipeline.length - 1) * spacing
	return (
		<group position={[origin[0] - totalWidth / 2, 0.14, origin[2] + 1.9]}>
			{pipeline.map(([label], index) => (
				<group key={label} position={[index * spacing, 0, 0]}>
					<mesh><boxGeometry args={[0.12, 0.12, 0.12]} /><meshStandardMaterial color="#233a4a" emissive="#68d9ef" emissiveIntensity={0.32} metalness={0.6} roughness={0.4} /></mesh>
					{index < pipeline.length - 1 && <mesh position={[spacing / 2, 0, 0]}><boxGeometry args={[spacing - 0.12, 0.012, 0.012]} /><meshBasicMaterial color="#4a7f96" transparent opacity={0.55} /></mesh>}
				</group>
			))}
		</group>
	)
}

function QuintesysCampus({ selectedStateId, onSelect, activeDestination }) {
	const continent = destinationById.experience
	const [x, , z] = quintesysGeography.center
	const selected = experienceStates.find((state) => state.id === selectedStateId)
	const automationPipeline = experienceStates.find((state) => state.id === 'bi-automation-state')?.pipeline
	const campusGroupRef = useRef()

	// Quintesys represents Chapter 04 (ENGINEER).
	// It must NEVER appear or leak any labels into Chapter 01 (The Spark), Chapter 02 (The Build), or Chapter 03 (The Solve).
	useFrame(({ camera }) => {
		if (campusGroupRef.current) {
			const isNearSolve = Math.hypot(camera.position.x, camera.position.z - 38.0) < 18.0 || (camera.position.z >= 26.0 && camera.position.x < 5.0)
			const isNearSparkOrBuild = camera.position.z < 26.0 && camera.position.x < 4.0
			const isOtherChapterActive = activeDestination === 'home' || activeDestination === 'projects' || activeDestination === 'solve'
			campusGroupRef.current.visible = !isOtherChapterActive && !isNearSolve && !isNearSparkOrBuild
		}
	})

	// Absolute component gate: if in Spark, Build, or Solve, do not mount/render Quintesys campus
	if (activeDestination === 'home' || activeDestination === 'projects' || activeDestination === 'solve') {
		return null
	}

	return <group ref={campusGroupRef}>
		{/* Connected terrain masses create one irregular continent; states retain their own hit areas above it. */}
		<group position={[x, 0, z]} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(continent) }} onDoubleClick={(event) => event.stopPropagation()} onPointerOver={() => { document.body.style.cursor = 'pointer' }} onPointerOut={() => { document.body.style.cursor = '' }}>
			{quintesysGeography.terrainMasses.map((mass, index) => <group key={index} position={mass.position} rotation={[0, mass.rotation, 0]}><mesh scale={[mass.scale[0], 1, mass.scale[1]]}><cylinderGeometry args={[mass.radius, mass.radius * 1.13, mass.height, 10]} /><meshStandardMaterial color="#1d4151" emissive={continent.colorTheme} emissiveIntensity={selected ? 0.035 : 0.075} metalness={0.58} roughness={0.86} /></mesh><mesh position={[0, mass.height / 2 + 0.012, 0]} scale={[mass.scale[0] * 0.91, 1, mass.scale[1] * 0.89]}><cylinderGeometry args={[mass.radius * 0.9, mass.radius, 0.028, 10]} /><meshStandardMaterial color="#284d5d" roughness={0.88} metalness={0.42} /></mesh></group>)}
			<mesh position={[0, 0.02, 0]} visible={false}><cylinderGeometry args={[quintesysGeography.footprint.hitRadius, quintesysGeography.footprint.hitRadius, 0.1, 12]} /><meshBasicMaterial transparent opacity={0} /></mesh>
		</group>
		<group position={quintesysGeography.corePosition}>
			<mesh position={[0, 0.25, 0]}><cylinderGeometry args={[0.2, 0.34, 0.42, 8]} /><meshStandardMaterial color="#355c6c" emissive={continent.colorTheme} emissiveIntensity={0.25} metalness={0.8} /></mesh>
			<mesh position={[0, 0.63, 0]} rotation={[0.3, 0.4, 0]}><octahedronGeometry args={[0.18, 1]} /><meshStandardMaterial color="#4c8496" emissive={continent.colorTheme} emissiveIntensity={0.35} metalness={0.75} roughness={0.25} /></mesh>
			<pointLight color={continent.colorTheme} intensity={1.8} distance={4.5} position={[0, 1.1, 0]} />
			<BillboardLabel position={[0, 1.75, 0]} fontSize={0.15} color="#d8f8ff" anchorX="center" anchorY="middle" letterSpacing={0.1} outlineWidth={0.008} outlineColor="#07111d">QUINTESYS</BillboardLabel>
			<BillboardLabel position={[0, 1.51, 0]} fontSize={0.064} color="#a7d2df" anchorX="center" anchorY="middle" letterSpacing={0.07} outlineWidth={0.006} outlineColor="#07111d">AI ENGINEERING, WALKED AS A PIPELINE</BillboardLabel>
		</group>
		{automationPipeline && <PipelineStrip pipeline={automationPipeline} origin={quintesysGeography.corePosition} />}
		{experienceStates.map((state, index) => <StateRoute key={`route-${state.id}`} start={quintesysGeography.corePosition} end={state.position} color={state.theme} index={index} />)}
		{experienceStates.map((state) => <GeographicState key={state.id} state={state} selected={state.id === selectedStateId} dimmed={Boolean(selectedStateId) && state.id !== selectedStateId} onSelect={onSelect} />)}
		{selected && <BillboardLabel position={[x, 2.02, z]} fontSize={0.06} color={selected.theme} anchorX="center" anchorY="middle" letterSpacing={0.08}>{selected.title} SELECTED</BillboardLabel>}
	</group>
}

export { QuintesysCampus }
