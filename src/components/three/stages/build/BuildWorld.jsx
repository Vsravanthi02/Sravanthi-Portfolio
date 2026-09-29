import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import BuildColonnade from './BuildColonnade'
import BuildArchiva from './BuildArchiva'
import BuildVision from './BuildVision'
import { BUILD_OVERHEAD, BUILD_FLOOR_GUIDES } from '../../../../data/buildData'
import { destinationById } from '../../../../data/destinations'

// ============================================================================
// BUILD WORLD ROOT COMPONENT
// Coordinates Chapter 02 — THE BUILD:
// - Monumental colonnade promenade & open sky view
// - 01 ARCHIVA (Agentic RAG / Knowledge Systems) on screen left
// - 02 EXPRESSION & SIGN LANGUAGE DETECTION (Computer Vision) on screen right
// - Overhead spatial typography with cursive quote
// - Floor return route (<- 01 THE SPARK) & forward route (03 SOLVE ->)
// - Seamless bidirectional player walking between Spark and Build
// ============================================================================

export default function BuildWorld({ playerPositionRef, onSelect, onNavigate }) {
	const returnHoverRef = useRef(false)
	const forwardHoverRef = useRef(false)

	// Bi-directional walking detection:
	// If player walks back past z <= 10.8 towards the Spark portal, notify state
	useFrame(() => {
		if (!playerPositionRef?.current) return
		const pz = playerPositionRef.current[2] || 0
		const px = playerPositionRef.current[0] || 0

		// Near floor return guide
		const returnDist = Math.hypot(px - (-2.2), pz - 16.5)
		returnHoverRef.current = returnDist < 1.8

		// Near floor forward guide
		const forwardDist = Math.hypot(px - 2.2, pz - 16.5)
		forwardHoverRef.current = forwardDist < 1.8
	})

	// Keyboard 'E' interaction when standing near floor return/forward guide
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				if (returnHoverRef.current) {
					onNavigate?.('home')
				} else if (forwardHoverRef.current) {
					onNavigate?.('solve')
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onNavigate])

	return (
		<group position={[0, 0, 0]}>
			{/* ── 1. MONUMENTAL FLUTED COLONNADE & PROMENADE FLOOR ── */}
			<BuildColonnade />

			{/* ── 2. PROJECT 01: ARCHIVA ── */}
			<BuildArchiva playerPositionRef={playerPositionRef} onSelect={onSelect} />

			{/* ── 3. PROJECT 02: EXPRESSION & SIGN LANGUAGE DETECTION ── */}
			<BuildVision playerPositionRef={playerPositionRef} onSelect={onSelect} />

			{/* ── 4. OVERHEAD SPATIAL TYPOGRAPHY & CURSIVE QUOTE ── */}
			<group position={[0, 6.2, 23.5]} rotation={[0, Math.PI, 0]}>
				{/* 02 — THE BUILD */}
				<Text
					position={[0, 0.65, 0]}
					fontSize={0.42}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.012}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{BUILD_OVERHEAD.number} — {BUILD_OVERHEAD.title}
				</Text>

				{/* Subtitle */}
				<Text
					position={[0, 0.26, 0]}
					fontSize={0.20}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.12}
					color="#69e3ff"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.006}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					{BUILD_OVERHEAD.subtitle}
				</Text>

				{/* Architectural Datum Line */}
				<mesh position={[0, 0.08, 0]}>
					<planeGeometry args={[4.2, 0.018]} />
					<meshBasicMaterial color="#ffb45c" transparent opacity={0.8} side={THREE.DoubleSide} toneMapped={false} />
				</mesh>

				{/* Approved Cursive Quote: "Ideas become real when they are built." */}
				<Text
					position={[0, -0.22, 0]}
					fontSize={0.26}
					font="/fonts/MarckScript-Regular.ttf"
					letterSpacing={0.03}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.007}
					outlineColor="#050a14"
					material-toneMapped={false}
					sdfGlyphSize={128}
				>
					&ldquo;{BUILD_OVERHEAD.quote}&rdquo;
				</Text>
			</group>

			{/* ── 5. FLOOR PROMPT & RETURN / FORWARD GUIDES ── */}
			{/* Entrance Floor Inscription Group (z = 16.5) */}
			<group position={[0, 0.04, 16.5]} rotation={[0, Math.PI, 0]}>
				{/* Left Return Guide: <- 01 — THE SPARK */}
				<group
					position={[-2.2, 0, 0]}
					onClick={(e) => {
						e.stopPropagation()
						onNavigate?.('home')
					}}
				>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[2.2, 0.45]} />
						<meshBasicMaterial visible={false} />
					</mesh>
					<Text
						position={[0, 0.08, 0]}
						fontSize={0.12}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.06}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.005}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{BUILD_FLOOR_GUIDES.returnPrompt.label}
					</Text>
					<Text
						position={[0, -0.06, 0]}
						fontSize={0.085}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.04}
						color="#8da3b8"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.004}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{BUILD_FLOOR_GUIDES.returnPrompt.detail}
					</Text>
				</group>

				{/* Center Promenade Prompt: Explore the systems I built */}
				<group position={[0, 0, 0]}>
					<mesh position={[0, 0.16, 0]}>
						<ringGeometry args={[0.065, 0.08, 32]} />
						<meshBasicMaterial color="#35d8ff" transparent opacity={0.65} toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0, 0]}
						fontSize={0.10}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.08}
						color="#9cb0c4"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.004}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{BUILD_FLOOR_GUIDES.explorePrompt.label}
					</Text>
				</group>

				{/* Right Forward Guide: 03 — SOLVE -> */}
				<group
					position={[2.2, 0, 0]}
					onClick={(e) => {
						e.stopPropagation()
						onNavigate?.('solve')
					}}
					onPointerOver={(e) => {
						e.stopPropagation()
						document.body.style.cursor = 'pointer'
					}}
					onPointerOut={() => {
						document.body.style.cursor = 'auto'
					}}
				>
					<mesh position={[0, 0, 0]}>
						<planeGeometry args={[2.2, 0.45]} />
						<meshBasicMaterial visible={false} />
					</mesh>
					<Text
						position={[0, 0.08, 0]}
						fontSize={0.12}
						font="/fonts/SegoeUI-Bold.ttf"
						letterSpacing={0.06}
						color="#FAF8F2"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.005}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{BUILD_FLOOR_GUIDES.forwardPrompt.label}
					</Text>
					<Text
						position={[0, -0.06, 0]}
						fontSize={0.085}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.04}
						color="#8da3b8"
						anchorX="center"
						anchorY="middle"
						outlineWidth={0.004}
						outlineColor="#050a14"
						material-toneMapped={false}
					>
						{BUILD_FLOOR_GUIDES.forwardPrompt.detail}
					</Text>
				</group>
			</group>
		</group>
	)
}

