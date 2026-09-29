import { useState, useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import EngineerHall from './EngineerHall'
import EngineerCore from './EngineerCore'
import EngineerStation from './EngineerStation'
import { ENGINEER_STATIONS, QUINTESYS_EXPERIENCE } from '../../../../data/engineerData'

// ============================================================================
// ENGINEER WORLD ROOT COMPONENT (CHAPTER 04 — THE ENGINEER)
// Coordinates the Architectural Exhibition Experience:
// - Central Core: "ENGINEERING IN PRACTICE" // QUINTESYS (8 MONTHS)
// - Semicircular amphitheater of individual architectural exhibits:
//     Screen Left:
//       01 — HOW I ENGINEER [3.65, 0, 75.20]
//       03 — COGNOS → POWER BI: DESKTOP [5.85, 0, 74.00]
//       05 — AI SYSTEMS / AUTOMATION [7.95, 0, 72.40]
//     Screen Right:
//       02 — COGNOS → POWER BI: PAGINATED [-3.65, 0, 75.20]
//       04 — LLM / GENAI ENGINEERING [-5.85, 0, 74.00]
//       06 — SOFTWARE ENGINEERING [-7.95, 0, 72.40]
// - Generous 7.30m central aperture framing Quintesys & mountain sunset
// - Distinct 1.0m negative space gaps between adjacent exhibits
// - Proximity detection & Keyboard [ E ] / Click interactions
// ============================================================================

export default function EngineerWorld({ playerPositionRef, onSelect, onNavigate }) {
	const center = [0, 0, 72.0]
	const [cx, , cz] = center

	const [nearbyStationKey, setNearbyStationKey] = useState(null)
	const [hoveredStationKey, setHoveredStationKey] = useState(null)
	const [isCenterNearby, setIsCenterNearby] = useState(false)
	const nearbyStationRef = useRef(null)
	const isCenterNearbyRef = useRef(false)
	const returnHoverRef = useRef(false)
	const forwardHoverRef = useRef(false)

	// Semicircular amphitheater surrounding Quintesys:
	// Comfortable 7.80m negative space between Station 01 and 02 frames Quintesys as hero
	// Stations curve forward toward the visitor for immediate legibility
	const stationsConfig = useMemo(() => [
		{
			key: 'howIEngineer',
			data: ENGINEER_STATIONS.howIEngineer,
			position: [3.90, 0, 75.20],
			rotation: [0, (202 * Math.PI) / 180, 0]
		},
		{
			key: 'cognosDesktop',
			data: ENGINEER_STATIONS.cognosDesktop,
			position: [6.10, 0, 73.90],
			rotation: [0, (222 * Math.PI) / 180, 0]
		},
		{
			key: 'aiSystems',
			data: ENGINEER_STATIONS.aiSystems,
			position: [8.20, 0, 72.20],
			rotation: [0, (242 * Math.PI) / 180, 0]
		},
		{
			key: 'cognosPaginated',
			data: ENGINEER_STATIONS.cognosPaginated,
			position: [-3.90, 0, 75.20],
			rotation: [0, (158 * Math.PI) / 180, 0]
		},
		{
			key: 'genaiEngineering',
			data: ENGINEER_STATIONS.genaiEngineering,
			position: [-6.10, 0, 73.90],
			rotation: [0, (138 * Math.PI) / 180, 0]
		},
		{
			key: 'softwareEngineering',
			data: ENGINEER_STATIONS.softwareEngineering,
			position: [-8.20, 0, 72.20],
			rotation: [0, (118 * Math.PI) / 180, 0]
		}
	], [])

	// Proximity detection for stations, center core, and floor curbs
	useFrame(() => {
		if (!playerPositionRef?.current) return
		const px = playerPositionRef.current[0] || 0
		const pz = playerPositionRef.current[2] || 0

		// Check distance to each station
		let closestKey = null
		let minDistance = 2.4 // Proximity trigger radius (meters)

		for (const st of stationsConfig) {
			const dist = Math.hypot(px - st.position[0], pz - st.position[2])
			if (dist < minDistance) {
				closestKey = st.key
				minDistance = dist
			}
		}

		if (closestKey !== nearbyStationRef.current) {
			nearbyStationRef.current = closestKey
			setNearbyStationKey(closestKey)
		}

		// Check distance to Quintesys center core
		const distCenter = Math.hypot(px - cx, pz - cz)
		const centerNear = distCenter < 3.8 && !closestKey
		if (centerNear !== isCenterNearbyRef.current) {
			isCenterNearbyRef.current = centerNear
			setIsCenterNearby(centerNear)
		}

		// Floor curb return/forward detection at lower edges (z ~ 65.5, x ~ +-6.8)
		const returnDist = Math.hypot(px - (cx - 6.8), pz - 65.5)
		returnHoverRef.current = returnDist < 2.5

		const forwardDist = Math.hypot(px - (cx + 6.8), pz - 65.5)
		forwardHoverRef.current = forwardDist < 2.5
	})

	// Keyboard [ E ] interaction listener
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (nearbyStationRef.current) {
					const stData = ENGINEER_STATIONS[nearbyStationRef.current]
					if (stData) onSelect?.(stData)
				} else if (isCenterNearbyRef.current) {
					onSelect?.(QUINTESYS_EXPERIENCE)
				} else if (returnHoverRef.current) {
					onNavigate?.('solve')
				} else if (forwardHoverRef.current) {
					onNavigate?.('skills')
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onSelect, onNavigate])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. ARCHITECTURAL HALL & MONUMENTAL COLONNADE ── */}
			<EngineerHall onNavigate={onNavigate} center={center} />

			{/* ── 2. CENTRAL CONCENTRIC CORE PLATFORM (QUINTESYS EXPERIENCE) ── */}
			<EngineerCore
				center={center}
				isNearby={isCenterNearby}
				onSelect={() => onSelect?.(QUINTESYS_EXPERIENCE)}
			/>

			{/* ── 3. SIX PROFESSIONAL STATIONS ON THE ARMORED ARC ── */}
			{stationsConfig.map((st) => (
				<EngineerStation
					key={st.key}
					stationKey={st.key}
					data={st.data}
					position={st.position}
					rotation={st.rotation}
					isNearby={nearbyStationKey === st.key}
					isHovered={hoveredStationKey === st.key}
					onSelect={() => onSelect?.(st.data)}
					onPointerOver={() => setHoveredStationKey(st.key)}
					onPointerOut={() => setHoveredStationKey(null)}
				/>
			))}
		</group>
	)
}
