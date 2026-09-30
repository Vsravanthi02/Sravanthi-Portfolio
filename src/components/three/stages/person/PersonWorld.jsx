import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import PersonTree from './PersonTree'
import PersonTerrace from './PersonTerrace'
import PersonVista from './PersonVista'
import PersonProfileWall from './PersonProfileWall'
import PersonStatementWall from './PersonStatementWall'
import PersonDestinationPanels from './PersonDestinationPanels'
import { PERSON_DESTINATIONS } from '../../../../data/personData'

// ============================================================================
// PERSON WORLD ROOT COMPONENT (CHAPTER 06 — THE PERSON)
// Master coordinator for the Sanctuary Terrace:
// - Central mature tree in circular stone planter (emotional focal point)
// - 3-tier stepped amphitheater terrace with embedded warm LED cove lighting
// - Open architectural portal framing the sunset, mountain ridges & subtle skyline
// - Left profile architecture: vertical portrait frame, nameplate, India location, quote
// - Right architectural wall: inscribed personal statement
// - Three interactive destination panels arranged naturally across terrace tiers
// - Keyboard [ E ] interaction & Click handling
// ============================================================================

export default function PersonWorld({ playerPositionRef, onSelect }) {
	const [nearbyId, setNearbyId] = useState(null)
	const nearbyRef = useRef(null)
	const rootRef = useRef()

	// Stage local-to-world transform orientation (rotY = 0.26 rad)
	const rotY = 0.26
	const stageOrigin = [35.3, 0, 29.5]

	// Destination positions in stage local space (matching PersonDestinationPanels)
	const destLocalPositions = [
		{ id: 'journey', pos: [2.5, 0.76, 2.0] },
		{ id: 'enjoy', pos: [0, 0.58, 1.0] },
		{ id: 'headed', pos: [-2.5, 0.76, 2.0] },
	]

	// Pre-compute world positions of the 3 destinations for fast proximity checks
	const destWorldPositions = destLocalPositions.map((d) => {
		const wx = stageOrigin[0] + d.pos[0] * Math.cos(rotY) + d.pos[2] * Math.sin(rotY)
		const wz = stageOrigin[2] - d.pos[0] * Math.sin(rotY) + d.pos[2] * Math.cos(rotY)
		return { id: d.id, wx, wz }
	})

	// Proximity check on useFrame
	useFrame(() => {
		if (rootRef.current && rootRef.current.parent?.visible === false) return
		if (!playerPositionRef?.current) return

		const px = playerPositionRef.current[0] || 0
		const pz = playerPositionRef.current[2] || 0

		let closestId = null
		let minDist = 3.8

		for (const d of destWorldPositions) {
			const dist = Math.hypot(px - d.wx, pz - d.wz)
			if (dist < minDist) {
				minDist = dist
				closestId = d.id
			}
		}

		if (closestId !== nearbyRef.current) {
			nearbyRef.current = closestId
			setNearbyId(closestId)
		}
	})

	// Keyboard 'E' interaction
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (nearbyRef.current) {
					const targetDest = PERSON_DESTINATIONS.find((d) => d.id === nearbyRef.current)
					if (targetDest) onSelect?.({ ...targetDest, type: 'person-topic' })
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onSelect])

	const handlePanelSelect = (dest) => {
		onSelect?.({ ...dest, type: 'person-topic' })
	}

	return (
		<group ref={rootRef} position={stageOrigin} rotation={[0, rotY, 0]}>
			{/* ── 1. ARCHITECTURAL STEPPED TERRACE ── */}
			<PersonTerrace />

			{/* ── 2. CENTRAL MATURE SANCTUARY TREE ── */}
			<PersonTree position={[0, 0, 4.4]} />

			{/* ── 3. SUNSET VISTA WITH MOUNTAINS & SKYLINE ── */}
			<PersonVista position={[0, 0, 8.2]} />

			{/* ── 4. LEFT PROFILE ARCHITECTURAL WALL (Screen Left) ── */}
			<PersonProfileWall position={[5.6, 0, 0.6]} rotation={[0, -Math.PI / 2 - 0.32, 0]} />

			{/* ── 5. RIGHT STATEMENT WALL (Screen Right) ── */}
			<PersonStatementWall position={[-5.6, 0, 0.6]} rotation={[0, Math.PI / 2 + 0.32, 0]} />

			{/* ── 6. ARCHITECTURAL SANCTUARY ENCLOSURE FLANKS ── */}
			{/* Right Gallery Wall to completely seal the right flank */}
			<mesh position={[-6.3, 3.2, 4.4]} rotation={[0, -0.10, 0]}>
				<boxGeometry args={[0.25, 6.4, 8.6]} />
				<meshStandardMaterial color="#121822" roughness={0.85} metalness={0.15} />
			</mesh>
			{/* Right Outer Return Wing to block adjacent stage from camera view */}
			<mesh position={[-8.4, 3.2, 1.8]} rotation={[0, -0.42, 0]}>
				<boxGeometry args={[0.25, 6.4, 6.2]} />
				<meshStandardMaterial color="#101620" roughness={0.9} metalness={0.1} />
			</mesh>
			{/* Left Gallery Wall to completely seal the left flank */}
			<mesh position={[6.3, 3.2, 4.4]} rotation={[0, 0.10, 0]}>
				<boxGeometry args={[0.25, 6.4, 8.6]} />
				<meshStandardMaterial color="#121822" roughness={0.85} metalness={0.15} />
			</mesh>

			{/* ── 7. THREE INTERACTIVE DESTINATION CAPSULES ── */}
			<PersonDestinationPanels
				nearbyId={nearbyId}
				onSelect={handlePanelSelect}
			/>
		</group>
	)
}
