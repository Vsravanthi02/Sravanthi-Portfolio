import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import SolveRotunda from './SolveRotunda'
import SolveCore from './SolveCore'
import SolveRetrieval from './SolveRetrieval'
import SolvePerception from './SolvePerception'
import SolveUncertainty from './SolveUncertainty'
import { SOLVE_FLOOR_GUIDES } from '../../../../data/solveData'

// ============================================================================
// SOLVE WORLD ROOT COMPONENT (CHAPTER 03 — THE SOLVE)
// Coordinates the Rotunda Observatory experience:
// - Grand monumental rotunda observatory framing the golden-hour mountain sunset
// - Central Core: "ENGINEERING UNDER UNCERTAINTY"
// - Chamber 01: RETRIEVAL ("FROM INFORMATION TO INSIGHT")
// - Chamber 02: PERCEPTION ("FROM SIGNALS TO MEANING")
// - Chamber 03: UNCERTAINTY ("FROM FAILURE TO STRONGER SYSTEMS")
// - Bidirectional walking and floor navigation guides:
//     • Backward: ← 02 — THE BUILD (navigates to 'build')
//     • Forward: 04 — THE ENGINEER → (navigates to 'experience')
// ============================================================================

export default function SolveWorld({ playerPositionRef, onSelect, onNavigate }) {
	const returnHoverRef = useRef(false)
	const forwardHoverRef = useRef(false)

	// Bi-directional walking detection:
	useFrame(() => {
		if (!playerPositionRef?.current) return
		const pz = playerPositionRef.current[2] || 0
		const px = playerPositionRef.current[0] || 0

		// Near floor return guide (z ~ 30.5, x ~ -2.4)
		const returnDist = Math.hypot(px - (-2.4), pz - 30.8)
		returnHoverRef.current = returnDist < 2.0

		// Near forward guide (z ~ 30.8, x ~ 2.4)
		const forwardDist = Math.hypot(px - 2.4, pz - 30.8)
		forwardHoverRef.current = forwardDist < 2.0
	})

	// Keyboard 'E' interaction when standing near floor return guide
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (returnHoverRef.current) {
					onNavigate?.('build')
				} else if (forwardHoverRef.current) {
					onNavigate?.('experience')
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onNavigate])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. MONUMENTAL ROTUNDA OBSERVATORY ARCHITECTURE ── */}
			<SolveRotunda onNavigate={onNavigate} />

			{/* ── 2. CENTRAL ENGINEERING CORE PLATFORM ── */}
			<SolveCore playerPositionRef={playerPositionRef} />

			{/* ── 3. CHAMBER 01: RETRIEVAL ── */}
			<SolveRetrieval
				playerPositionRef={playerPositionRef}
				onSelect={(data) => onSelect?.({ ...data, type: 'solve-chamber' })}
			/>

			{/* ── 4. CHAMBER 02: PERCEPTION ── */}
			<SolvePerception
				playerPositionRef={playerPositionRef}
				onSelect={(data) => onSelect?.({ ...data, type: 'solve-chamber' })}
			/>

			{/* ── 5. CHAMBER 03: UNCERTAINTY ── */}
			<SolveUncertainty
				playerPositionRef={playerPositionRef}
				onSelect={(data) => onSelect?.({ ...data, type: 'solve-chamber' })}
			/>

		</group>
	)
}

