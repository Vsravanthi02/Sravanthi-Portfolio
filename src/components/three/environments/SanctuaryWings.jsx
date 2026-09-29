import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { getTravertineMaterials } from '../materials/travertineTexture'

// ============================================================================
// ASYMMETRICAL SANCTUARY FLANKS — SCULPTURAL LANDSCAPE INTEGRATION
// - Screen LEFT (+X): Open negative-space contemplation courtyard with sunken pool.
//   ZERO vertical walls — pure open sky directly beneath the soaring canopy.
// - Screen RIGHT (-X): Stepped bedrock terraces anchoring the monolithic mass
//   into the desert mountain terrain.
// ============================================================================

// Screen LEFT (+X): Open Contemplation Courtyard under the Soaring Canopy
export function SanctuaryLeftScreenWing({
	position = [12.0, 0, 9.5],
	stoneColor = '#c2bcb0',
	metalColor = '#0d121a',
	edgeColor = '#ffb45c',
	techColor = '#35d8ff'
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])
	const waterRef = useRef()

	useFrame((state) => {
		if (waterRef.current) {
			const t = state.clock.elapsedTime
			waterRef.current.position.y = 0.50 + Math.sin(t * 1.5) * 0.002
		}
	})

	const stoneMat = {
		color: stoneColor,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.024,
		roughness: 0.74,
		metalness: 0.02,
	}

	const darkMat = {
		color: metalColor,
		roughness: 0.88,
		metalness: 0.22,
	}

	return (
		<group position={position}>
			{/* Low stepped courtyard terrace (height only 0.44m, zero vertical walls) */}
			<mesh position={[0, 0.22, 0]}>
				<boxGeometry args={[8.4, 0.44, 7.2]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>
			<mesh position={[0, 0.48, 0]}>
				<boxGeometry args={[8.0, 0.16, 6.8]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.018} />
			</mesh>

			{/* Sunken contemplation reflection pool */}
			<group position={[0, 0, 0]}>
				<mesh ref={waterRef} position={[0, 0.50, 0]} rotation={[-Math.PI / 2, 0, 0]}>
					<planeGeometry args={[5.6, 4.8]} />
					<meshStandardMaterial
						color="#030812"
						metalness={0.88}
						roughness={0.08}
					/>
				</mesh>
				{/* Pool stone coping */}
				<mesh position={[0, 0.54, -2.55]}>
					<boxGeometry args={[6.0, 0.08, 0.30]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
				</mesh>
				<mesh position={[0, 0.54, 2.55]}>
					<boxGeometry args={[6.0, 0.08, 0.30]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
				</mesh>
				<mesh position={[-2.95, 0.54, 0]}>
					<boxGeometry args={[0.30, 0.08, 5.4]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
				</mesh>
				<mesh position={[2.95, 0.54, 0]}>
					<boxGeometry args={[0.30, 0.08, 5.4]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.020} />
				</mesh>
			</group>

			{/* Low sculptural terrace bench (framing negative space without blocking view) */}
			<group position={[3.2, 0.72, -1.8]}>
				<mesh castShadow receiveShadow>
					<boxGeometry args={[0.65, 0.48, 3.2]} />
					<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
				</mesh>
				<mesh position={[0, -0.18, 0]}>
					<boxGeometry args={[0.72, 0.08, 3.26]} />
					<meshStandardMaterial {...darkMat} />
				</mesh>
			</group>

			{/* Subtle horizontal cyan datum embedded in courtyard curb */}
			<mesh position={[-0.2, 0.52, -3.35]}>
				<boxGeometry args={[5.2, 0.022, 0.03]} />
				<meshBasicMaterial color={techColor} transparent opacity={0.65} toneMapped={false} />
			</mesh>
		</group>
	)
}

// Screen RIGHT (-X): Stepped Bedrock Terraces extending the Anchor Mass
export function SanctuaryRightScreenWing({
	position = [-14.8, 0, 9.5],
	stoneColor = '#c2bcb0',
	metalColor = '#0d121a',
	edgeColor = '#ffb45c',
	techColor = '#35d8ff'
}) {
	const travertine = useMemo(() => getTravertineMaterials(), [])

	const stoneMat = {
		color: stoneColor,
		map: travertine.albedo,
		bumpMap: travertine.bump,
		bumpScale: 0.024,
		roughness: 0.74,
		metalness: 0.02,
	}

	const darkMat = {
		color: metalColor,
		roughness: 0.88,
		metalness: 0.22,
	}

	return (
		<group position={position}>
			{/* Stepped Bedrock Foundation (extends the right anchor mass out to -18m) */}
			<mesh position={[0, 0.32, 0]} receiveShadow castShadow>
				<boxGeometry args={[5.6, 0.64, 8.4]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.022} />
			</mesh>
			<mesh position={[-0.8, 1.4, -0.4]} receiveShadow castShadow>
				<boxGeometry args={[4.2, 1.6, 6.8]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
			</mesh>
			<mesh position={[-1.2, 2.8, -0.8]} receiveShadow castShadow>
				<boxGeometry args={[3.2, 1.4, 5.2]} />
				<meshStandardMaterial {...stoneMat} bumpScale={0.024} />
			</mesh>
			{/* Obsidian shadow relief line */}
			<mesh position={[0, 0.66, 0]}>
				<boxGeometry args={[5.4, 0.06, 8.2]} />
				<meshStandardMaterial {...darkMat} />
			</mesh>
		</group>
	)
}

export const SanctuaryLeftWing = SanctuaryLeftScreenWing
export const SanctuaryRightWing = SanctuaryRightScreenWing

export default function WingWall(props) {
	return props.position?.[0] > 0 ? (
		<SanctuaryLeftScreenWing {...props} />
	) : (
		<SanctuaryRightScreenWing {...props} />
	)
}
