import { useState, useRef } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { PERSON_DESTINATIONS } from '../../../../data/personData'

// ============================================================================
// THREE PERSON DESTINATION CAPSULES (CHAPTER 06 — THE PERSON)
// World-space architectural interface capsules matching media_1790761295168.jpg:
// - Balanced 3-destination arrangement framing the central sanctuary tree
// - Sleek dark glass horizontal capsule with rounded geometry
// - Vibrant yet restrained accent neon perimeter glow
// - Icon on left, bold title + subtitle in center, arrow indicator on right
// - Proximity activation & E-key / Click interaction
// ============================================================================

function DestinationCapsule({
	dest,
	position,
	rotation = [0, Math.PI, 0],
	isNearby = false,
	onSelect,
}) {
	const [hovered, setHovered] = useState(false)
	const glowRef = useRef()

	const active = isNearby || hovered
	const accent = dest.accentColor

	// Gentle floating pulse when active
	useFrame((state) => {
		if (!glowRef.current) return
		if (active) {
			const t = state.clock.elapsedTime
			glowRef.current.intensity = 1.4 + Math.sin(t * 3.5) * 0.4
		} else {
			glowRef.current.intensity = 0.6
		}
	})

	return (
		<group
			position={position}
			rotation={rotation}
			onClick={(e) => {
				e.stopPropagation()
				onSelect?.(dest)
			}}
			onPointerOver={(e) => {
				e.stopPropagation()
				setHovered(true)
				document.body.style.cursor = 'pointer'
			}}
			onPointerOut={() => {
				setHovered(false)
				document.body.style.cursor = ''
			}}
		>
			{/* Hit target for easy click / touch */}
			<mesh position={[0, 0, 0]}>
				<planeGeometry args={[2.0, 0.58]} />
				<meshBasicMaterial transparent opacity={0} depthWrite={false} />
			</mesh>

			{/* ── 1. DARK FROSTED GLASS CAPSULE SLAB ── */}
			<mesh position={[0, 0, 0]}>
				<planeGeometry args={[1.96, 0.50]} />
				<meshStandardMaterial
					color="#08101c"
					roughness={0.25}
					metalness={0.75}
					transparent
					opacity={0.94}
				/>
			</mesh>

			{/* Soft Halo Glow Backing */}
			<mesh position={[0, 0, -0.002]}>
				<planeGeometry args={[2.06, 0.58]} />
				<meshBasicMaterial
					color={accent}
					transparent
					opacity={active ? 0.22 : 0.08}
					toneMapped={false}
				/>
			</mesh>

			{/* ── 2. NEON ACCENT RIM BORDER ── */}
			{/* Top Rim */}
			<mesh position={[0, 0.245, 0.004]}>
				<planeGeometry args={[1.94, 0.015]} />
				<meshBasicMaterial color={accent} toneMapped={false} />
			</mesh>
			{/* Bottom Rim */}
			<mesh position={[0, -0.245, 0.004]}>
				<planeGeometry args={[1.94, 0.015]} />
				<meshBasicMaterial color={accent} toneMapped={false} />
			</mesh>
			{/* Left Rim */}
			<mesh position={[-0.97, 0, 0.004]}>
				<planeGeometry args={[0.015, 0.50]} />
				<meshBasicMaterial color={accent} toneMapped={false} />
			</mesh>
			{/* Right Rim */}
			<mesh position={[0.97, 0, 0.004]}>
				<planeGeometry args={[0.015, 0.50]} />
				<meshBasicMaterial color={accent} toneMapped={false} />
			</mesh>

			{/* Left Accent Glow Strip Indicator */}
			<mesh position={[-0.93, 0, 0.006]}>
				<planeGeometry args={[0.035, 0.38]} />
				<meshBasicMaterial color={accent} toneMapped={false} />
			</mesh>

			{/* ── 3. LEFT CIRCULAR ICON BEZEL ── */}
			<group position={[-0.68, 0, 0.008]}>
				{/* Outer Bezel Circle */}
				<mesh>
					<circleGeometry args={[0.165, 24]} />
					<meshBasicMaterial color={accent} transparent opacity={0.18} />
				</mesh>
				<mesh position={[0, 0, 0.001]}>
					<ringGeometry args={[0.155, 0.17, 24]} />
					<meshBasicMaterial color={accent} toneMapped={false} />
				</mesh>

				{/* Simple Geometric Icon Symbol */}
				{dest.number === '01' && (
					/* Compass Diamond */
					<mesh rotation={[0, 0, Math.PI / 4]}>
						<planeGeometry args={[0.12, 0.12]} />
						<meshBasicMaterial color={accent} toneMapped={false} />
					</mesh>
				)}
				{dest.number === '02' && (
					/* Star / Sparkle Icon */
					<group>
						<mesh rotation={[0, 0, 0]}>
							<planeGeometry args={[0.13, 0.032]} />
							<meshBasicMaterial color={accent} toneMapped={false} />
						</mesh>
						<mesh rotation={[0, 0, Math.PI / 2]}>
							<planeGeometry args={[0.13, 0.032]} />
							<meshBasicMaterial color={accent} toneMapped={false} />
						</mesh>
						<mesh rotation={[0, 0, Math.PI / 4]}>
							<planeGeometry args={[0.065, 0.065]} />
							<meshBasicMaterial color={accent} toneMapped={false} />
						</mesh>
					</group>
				)}
				{dest.number === '03' && (
					/* Ascending Peak Triangle */
					<mesh position={[0, -0.015, 0]}>
						<coneGeometry args={[0.09, 0.11, 3]} />
						<meshBasicMaterial color={accent} toneMapped={false} />
					</mesh>
				)}
			</group>

			{/* ── 4. CENTER TYPOGRAPHY (NUMBER + TITLE & SUBTITLE) ── */}
			<group position={[-0.42, 0, 0.01]}>
				{/* Top line: 01. MY JOURNEY */}
				<Text
					position={[0, 0.09, 0]}
					fontSize={0.112}
					font="/fonts/SegoeUI-Bold.ttf"
					letterSpacing={0.06}
					color="#FAF8F2"
					anchorX="left"
					anchorY="middle"
					outlineWidth={0.005}
					outlineColor="#040810"
					material-toneMapped={false}
				>
					{dest.number}. {dest.title}
				</Text>

				{/* Bottom line: Subtitle */}
				<Text
					position={[0, -0.08, 0]}
					fontSize={0.082}
					font="/fonts/DMMono-Medium.ttf"
					letterSpacing={0.05}
					color={dest.secondaryColor || '#88a4c0'}
					anchorX="left"
					anchorY="middle"
					material-toneMapped={false}
				>
					{dest.subtitle}
				</Text>
			</group>

			{/* ── 5. RIGHT ARROW INDICATOR ( → in circle ) ── */}
			<group position={[0.76, 0, 0.008]}>
				<mesh>
					<circleGeometry args={[0.115, 20]} />
					<meshBasicMaterial color={accent} transparent opacity={active ? 0.40 : 0.15} />
				</mesh>
				<mesh position={[0, 0, 0.001]}>
					<ringGeometry args={[0.105, 0.12, 20]} />
					<meshBasicMaterial color={accent} toneMapped={false} />
				</mesh>
				<Text
					position={[0, 0.005, 0.002]}
					fontSize={0.11}
					font="/fonts/SegoeUI-Bold.ttf"
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					material-toneMapped={false}
				>
					→
				</Text>
			</group>

			{/* ── 6. INTERACTIVE [ E ] KEY BADGE (when nearby/hovered) ── */}
			{active && (
				<group position={[0, -0.34, 0.02]}>
					<mesh>
						<planeGeometry args={[0.96, 0.18]} />
						<meshBasicMaterial color="#08101a" />
					</mesh>
					<mesh position={[0, 0, 0.001]}>
						<planeGeometry args={[0.96, 0.18]} />
						<meshBasicMaterial color={accent} wireframe toneMapped={false} />
					</mesh>
					<Text
						position={[0, 0, 0.005]}
						fontSize={0.082}
						font="/fonts/DMMono-Medium.ttf"
						letterSpacing={0.08}
						color={accent}
						anchorX="center"
						anchorY="middle"
						material-toneMapped={false}
					>
						[ E ] EXPLORE
					</Text>
				</group>
			)}

			{/* Capsule Accent Point Light */}
			<pointLight ref={glowRef} position={[0, 0, 0.25]} color={accent} intensity={0.6} distance={2.0} decay={2} />
		</group>
	)
}

export default function PersonDestinationPanels({
	nearbyId = null,
	onSelect,
}) {
	// 3-Destination layout framing the central tree:
	// - 01. MY JOURNEY (Left Tier 2): X = 2.5, Y = 0.76, Z = 2.0
	// - 02. WHAT I ENJOY (Center Tier 1): X = 0.0, Y = 0.58, Z = 1.0
	// - 03. WHERE I'M HEADED (Right Tier 2): X = -2.5, Y = 0.76, Z = 2.0
	const panelConfigs = [
		// 01 MY JOURNEY (Screen Left)
		{
			id: 'journey',
			pos: [2.5, 0.76, 2.0],
			rot: [0.06, Math.PI + 0.20, 0],
		},
		// 02 WHAT I ENJOY (Center Foreground)
		{
			id: 'enjoy',
			pos: [0, 0.58, 1.0],
			rot: [0.04, Math.PI, 0],
		},
		// 03 WHERE I'M HEADED (Screen Right)
		{
			id: 'headed',
			pos: [-2.5, 0.76, 2.0],
			rot: [0.06, Math.PI - 0.20, 0],
		},
	]

	return (
		<group position={[0, 0, 0]}>
			{panelConfigs.map((cfg) => {
				const dest = PERSON_DESTINATIONS.find((d) => d.id === cfg.id)
				if (!dest) return null
				return (
					<DestinationCapsule
						key={dest.id}
						dest={dest}
						position={cfg.pos}
						rotation={cfg.rot}
						isNearby={nearbyId === dest.id}
						onSelect={onSelect}
					/>
				)
			})}
		</group>
	)
}
