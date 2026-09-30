import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import NextTerrace from './NextTerrace'
import NextGlobe from './NextGlobe'
import NextVista from './NextVista'
import NextLeftWall from './NextLeftWall'
import NextRightWall from './NextRightWall'
import NextInfoBoard from './NextInfoBoard'
import { NEXT_CONTENT } from '../../../../data/nextData'

// ============================================================================
// NEXT WORLD ROOT COMPONENT (CHAPTER 07 — WHAT'S NEXT)
// Master coordinator for the Observatory Terrace matching media_1790773457536.jpg:
// - Central elevated dais with luminous world globe & floating hologram tiles
// - Open corbel arch framing the golden sunset, mountains, water & skyline
// - Left architectural wall: [ 07 ] WHAT'S NEXT / forward-looking statement
// - Right architectural info board: career aspiration, 3 cards, action buttons
// - Right decorative wall: understated vertical typography
// - Stepped amphitheater terrace with embedded amber cove LED rings & floor lanterns
// - Keyboard [ E ] interaction & Click handling for seamless terminal modal
// ============================================================================

export default function NextWorld({ playerPositionRef, onSelect }) {
	const [isNearby, setIsNearby] = useState(false)
	const nearbyRef = useRef(false)
	const rootRef = useRef()

	// Stage local-to-world transform (aligned with arrival from Chapter 06)
	const rotY = 2.49
	const stageOrigin = [45.6, 0, 17.2]

	// Info board local position: [-3.8, 0, 2.2]
	const boardLocalPos = [-3.8, 0, 2.2]
	const boardWorldX = stageOrigin[0] + boardLocalPos[0] * Math.cos(rotY) + boardLocalPos[2] * Math.sin(rotY)
	const boardWorldZ = stageOrigin[2] - boardLocalPos[0] * Math.sin(rotY) + boardLocalPos[2] * Math.cos(rotY)

	// Dais local position: [0, 0, 3.8]
	const daisLocalPos = [0, 0, 3.8]
	const daisWorldX = stageOrigin[0] + daisLocalPos[0] * Math.cos(rotY) + daisLocalPos[2] * Math.sin(rotY)
	const daisWorldZ = stageOrigin[2] - daisLocalPos[0] * Math.sin(rotY) + daisLocalPos[2] * Math.cos(rotY)

	// Proximity check on useFrame
	useFrame(() => {
		if (rootRef.current && rootRef.current.parent?.visible === false) return
		if (!playerPositionRef?.current) return

		const px = playerPositionRef.current[0] || 0
		const pz = playerPositionRef.current[2] || 0

		const distToBoard = Math.hypot(px - boardWorldX, pz - boardWorldZ)
		const distToDais = Math.hypot(px - daisWorldX, pz - daisWorldZ)
		const distToStage = Math.hypot(px - stageOrigin[0], pz - stageOrigin[2])

		const close = distToBoard < 4.8 || distToDais < 4.2 || distToStage < 5.2
		if (close !== nearbyRef.current) {
			nearbyRef.current = close
			setIsNearby(close)
		}
	})

	const handleOpenResume = () => {
		window.open(NEXT_CONTENT.actions.resume.url, '_blank')
	}

	const handleOpenContact = () => {
		onSelect?.({
			id: 'contact',
			type: 'next-stage',
			openContact: true,
			title: NEXT_CONTENT.title,
			subtitle: NEXT_CONTENT.subtitle,
		})
	}

	const handleSelectTerminal = () => {
		onSelect?.({
			id: 'contact',
			type: 'next-stage',
			openContact: false,
			title: NEXT_CONTENT.title,
			subtitle: NEXT_CONTENT.subtitle,
		})
	}

	// Keyboard [ E ] interaction
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (nearbyRef.current) {
					handleSelectTerminal()
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	return (
		<group ref={rootRef} position={stageOrigin} rotation={[0, rotY, 0]}>
			{/* ── 1. ARCHITECTURAL STEPPED TERRACE & PLINTH ── */}
			<NextTerrace />

			{/* ── 2. CENTRAL ELEVATED DAIS & LUMINOUS WORLD GLOBE ── */}
			<NextGlobe
				position={[0, 0, 3.8]}
				onOpenResume={handleOpenResume}
				onOpenContact={handleOpenContact}
			/>

			{/* ── 3. SUNSET VISTA WITH MOUNTAINS, WATER & SKYLINE ── */}
			<NextVista position={[0, 0, 8.2]} />

			{/* ── 4. LEFT ARCHITECTURAL WALL (Screen Left) ── */}
			<NextLeftWall position={[4.8, 0, 1.2]} rotation={[0, -Math.PI / 2 - 0.28, 0]} />

			{/* ── 5. RIGHT INTERACTIVE INFORMATION BOARD (Screen Right) ── */}
			<NextInfoBoard
				position={[-3.8, 0, 2.2]}
				rotation={[0, Math.PI / 2 + 0.26, 0]}
				isNearby={isNearby}
				onSelect={handleSelectTerminal}
				onOpenResume={handleOpenResume}
				onOpenContact={handleOpenContact}
			/>

			{/* ── 6. RIGHT DECORATIVE TYPOGRAPHY WALL (Screen Far Right) ── */}
			<NextRightWall position={[-6.2, 0, 3.2]} rotation={[0, Math.PI / 2 + 0.18, 0]} />

			{/* ── 7. SANCTUARY ENCLOSURE FLANK WALLS ── */}
			{/* Left Flank Boundary Wall */}
			<mesh position={[6.2, 3.2, 3.8]} rotation={[0, 0.12, 0]}>
				<boxGeometry args={[0.25, 6.4, 8.2]} />
				<meshStandardMaterial color="#101622" roughness={0.85} metalness={0.15} />
			</mesh>
			{/* Right Flank Boundary Wall */}
			<mesh position={[-7.2, 3.2, 3.8]} rotation={[0, -0.12, 0]}>
				<boxGeometry args={[0.25, 6.4, 8.2]} />
				<meshStandardMaterial color="#101622" roughness={0.85} metalness={0.15} />
			</mesh>
		</group>
	)
}
