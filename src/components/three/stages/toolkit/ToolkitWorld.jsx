import { useState, useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import ToolkitHall from './ToolkitHall'
import ToolkitCore from './ToolkitCore'
import ToolkitStation from './ToolkitStation'
import { TOOLKIT_STATIONS, TOOLKIT_CORE } from '../../../../data/toolkitData'

// ============================================================================
// TOOLKIT WORLD ROOT COMPONENT (CHAPTER 05 — THE ENGINEER'S TOOLKIT)
// Coordinates the Technology Observatory Experience:
// - Central Luminous Toolkit Core
// - 7 Verified Technical Stations in an amphitheater layout:
//     Screen Left (AI, Models & Data):
//       01 — PYTHON & AI ENGINEERING
//       02 — GENERATIVE AI & LLMs
//       03 — COMPUTER VISION
//       04 — AI / DATA / RETRIEVAL
//     Screen Right (Systems, Analytics & Engineering):
//       05 — AI SERVICES & INFERENCE
//       06 — DATA / VIZ / AUTOMATION
//       07 — DEVELOPMENT & ENGINEERING
// - 9.2m central negative space aperture framing the sunset horizon
// - Proximity detection & Keyboard [ E ] / Click interactions
// ============================================================================

export default function ToolkitWorld({ playerPositionRef, onSelect, onNavigate }) {
	const center = [21.8, 0, 33.1]
	const [cx, , cz] = center

	const [nearbyStationKey, setNearbyStationKey] = useState(null)
	const [hoveredStationKey, setHoveredStationKey] = useState(null)
	const [isCenterNearby, setIsCenterNearby] = useState(false)
	const nearbyStationRef = useRef(null)
	const isCenterNearbyRef = useRef(false)
	const returnHoverRef = useRef(false)
	const forwardHoverRef = useRef(false)

	// Recomposed spatial 3D amphitheater around the central core:
	// Balanced semicircular amphitheater:
	// Screen Left:
	//   01 — AI / ML ENGINEERING (Foreground Left)
	//   02 — GENERATIVE AI & RAG (Mid Left)
	//   03 — COMPUTER VISION (Rear Left)
	// Central Core Aperture (0° Sightline to Horizon & Core)
	// Screen Right:
	//   04 — DATA & RETRIEVAL (Rear Right)
	//   05 — AI SYSTEMS & INFERENCE (Mid Right)
	//   06 — VISUALIZATION, BI & AUTOMATION (Foreground Right)
	// Uniform 1.05x scale for balanced visual importance across all 6 stations
	const stationsConfig = useMemo(() => [
		{
			key: 'aiMl',
			data: TOOLKIT_STATIONS.aiMl,
			position: [cx + 5.25, 0, cz - 2.8],
			rotation: [0, (240 * Math.PI) / 180, 0],
			scale: 1.05,
		},
		{
			key: 'genAiRag',
			data: TOOLKIT_STATIONS.genAiRag,
			position: [cx + 4.40, 0, cz + 0.5],
			rotation: [0, (215 * Math.PI) / 180, 0],
			scale: 1.05,
		},
		{
			key: 'computerVision',
			data: TOOLKIT_STATIONS.computerVision,
			position: [cx + 3.10, 0, cz + 3.8],
			rotation: [0, (194 * Math.PI) / 180, 0],
			scale: 1.05,
		},
		{
			key: 'dataRetrieval',
			data: TOOLKIT_STATIONS.dataRetrieval,
			position: [cx - 3.10, 0, cz + 3.8],
			rotation: [0, (166 * Math.PI) / 180, 0],
			scale: 1.05,
		},
		{
			key: 'aiSystems',
			data: TOOLKIT_STATIONS.aiSystems,
			position: [cx - 4.40, 0, cz + 0.5],
			rotation: [0, (145 * Math.PI) / 180, 0],
			scale: 1.05,
		},
		{
			key: 'vizBiAutomation',
			data: TOOLKIT_STATIONS.vizBiAutomation,
			position: [cx - 5.25, 0, cz - 2.8],
			rotation: [0, (120 * Math.PI) / 180, 0],
			scale: 1.05,
		},
	], [cx, cz])

	// Proximity detection for stations, center core, and floor curbs
	useFrame(() => {
		if (!playerPositionRef?.current) return
		const px = playerPositionRef.current[0] || 0
		const pz = playerPositionRef.current[2] || 0

		// Check distance to each station
		let closestKey = null
		let minDistance = 2.4 // meters

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

		// Check distance to central Toolkit Core
		const distCenter = Math.hypot(px - cx, pz - cz)
		const centerNear = distCenter < 3.8 && !closestKey
		if (centerNear !== isCenterNearbyRef.current) {
			isCenterNearbyRef.current = centerNear
			setIsCenterNearby(centerNear)
		}

		// Floor curb return/forward detection
		const returnDist = Math.hypot(px - (cx - 5.5), pz - (cz - 6.2))
		returnHoverRef.current = returnDist < 2.5

		const forwardDist = Math.hypot(px - (cx + 5.5), pz - (cz - 6.2))
		forwardHoverRef.current = forwardDist < 2.5
	})

	// Keyboard [ E ] interaction listener
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (nearbyStationRef.current) {
					const stData = TOOLKIT_STATIONS[nearbyStationRef.current]
					if (stData) onSelect?.(stData)
				} else if (isCenterNearbyRef.current) {
					onSelect?.(TOOLKIT_CORE)
				} else if (returnHoverRef.current) {
					onNavigate?.('experience')
				} else if (forwardHoverRef.current) {
					onNavigate?.('about')
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onSelect, onNavigate])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. ARCHITECTURAL HALL & OBSERVATORY CASING ── */}
			<ToolkitHall onNavigate={onNavigate} center={center} />

			{/* ── 2. CENTRAL CONCENTRIC TOOLKIT CORE ── */}
			<ToolkitCore
				center={center}
				isNearby={isCenterNearby}
				onSelect={() => onSelect?.(TOOLKIT_CORE)}
			/>

			{/* ── 3. SEVEN VERIFIED TECHNOLOGY STATIONS ── */}
			{stationsConfig.map((st) => (
				<ToolkitStation
					key={st.key}
					stationKey={st.key}
					data={st.data}
					position={st.position}
					rotation={st.rotation}
					scale={st.scale}
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
