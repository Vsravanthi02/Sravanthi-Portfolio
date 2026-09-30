import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { SPARK_QUESTIONS } from '../../../../data/sparkData'
import SparkQuestionStation from './SparkQuestionStation'

// ============================================================================
// SPARK QUESTION SPACE
// Coordinates the 4 conceptual question stations, smooth proximity detection,
// foreground walkway invitation, and interaction handling.
// ============================================================================

export default function SparkQuestionSpace({
	playerPositionRef,
	onSelectQuestion,
	proximityRef,
	onNavigate
}) {
	const stationProximities = useRef([0, 0, 0, 0])
	const [activeStationIndex, setActiveStationIndex] = useState(-1)
	const activeIndexRef = useRef(-1)

	// Keep active index ref in sync
	useEffect(() => {
		activeIndexRef.current = activeStationIndex
	}, [activeStationIndex])

	// Keyboard 'E' interaction when close to an active question
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key.toLowerCase() === 'e') {
				const idx = activeIndexRef.current
				if (idx >= 0 && SPARK_QUESTIONS[idx]) {
					onSelectQuestion?.(SPARK_QUESTIONS[idx])
				}
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onSelectQuestion])

	useFrame((_, delta) => {
		if (!playerPositionRef?.current) return
		const px = playerPositionRef.current[0] || 0
		const pz = playerPositionRef.current[2] || 0

		let closestIdx = -1
		let closestDist = 2.4 // active threshold distance

		SPARK_QUESTIONS.forEach((station, i) => {
			const dx = px - station.position[0]
			const dz = pz - station.position[2]
			const dist = Math.hypot(dx, dz)

			// Proximity ramp from 4.2m down to 1.2m
			const targetProx = THREE.MathUtils.clamp(1.0 - (dist - 1.2) / 3.0, 0, 1)
			stationProximities.current[i] += (targetProx - stationProximities.current[i]) * Math.min(1.0, delta * 4.0)

			if (dist < closestDist) {
				closestDist = dist
				closestIdx = i
			}
		})

		if (closestIdx !== activeIndexRef.current) {
			setActiveStationIndex(closestIdx)
		}
	})

	return (
		<group>
			{/* ── 1. FOREGROUND WALKWAY INVITATION (From Reference Image) ── */}
			<group position={[0, 0.06, -3.2]} rotation={[0, Math.PI, 0]}>
				{/* Touch / Step Glyphic Icon */}
				<mesh position={[0, 0.38, 0]}>
					<ringGeometry args={[0.08, 0.095, 32]} />
					<meshBasicMaterial color="#35d8ff" transparent opacity={0.65} toneMapped={false} />
				</mesh>

				{/* Cursive Subtitle */}
				<Text
					position={[0, 0.16, 0]}
					fontSize={0.16}
					font="/fonts/MarckScript-Regular.ttf"
					letterSpacing={0.03}
					color="#FAF8F2"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.005}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					Walk closer to explore
				</Text>
				<Text
					position={[0, -0.02, 0]}
					fontSize={0.14}
					font="/fonts/SegoeUI.ttf"
					letterSpacing={0.06}
					color="#9eb6cc"
					anchorX="center"
					anchorY="middle"
					outlineWidth={0.004}
					outlineColor="#050a14"
					material-toneMapped={false}
				>
					the questions that started my journey.
				</Text>
			</group>

			{/* ── 2. THE 4 QUESTION STATIONS ── */}
			{SPARK_QUESTIONS.map((station, index) => (
				<SparkQuestionStation
					key={station.id}
					station={station}
					isFocused={activeStationIndex === index}
					proximity={stationProximities.current[index]}
					isScreenLeft={station.position[0] > 0}
					onSelect={onSelectQuestion}
				/>
			))}
		</group>
	)
}
