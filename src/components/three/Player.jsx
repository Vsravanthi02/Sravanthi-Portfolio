import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Single source of truth for the avatar's eye height, so the first-person
// camera derives it from the actual rig instead of a hardcoded guess.
export const PLAYER_TORSO_Y = 1.28
export const PLAYER_HEAD_OFFSET_Y = 0.78
export const PLAYER_EYE_HEIGHT = PLAYER_TORSO_Y + PLAYER_HEAD_OFFSET_Y

function Player({ position, rotationRef, motionRef, cameraModeRef, cameraBlendRef }) {
	const groupRef = useRef()
	const torsoRef = useRef()
	const headRef = useRef()
	const leftArmRef = useRef()
	const rightArmRef = useRef()
	const leftLegRef = useRef()
	const rightLegRef = useRef()

	useFrame((state) => {
		if (!groupRef.current) return
		const motion = motionRef?.current || { speed: 0, forward: 0, strafe: 0, sprint: false }
		const moving = Math.min(1, motion.speed / 3.35)
		const cadence = motion.sprint ? 11 : 7.2
		const stride = Math.sin(state.clock.elapsedTime * cadence) * (motion.sprint ? 0.58 : 0.38) * moving
		const direction = motion.forward < -0.1 ? -1 : 1
		const breath = Math.sin(state.clock.elapsedTime * 1.7) * 0.012 * (1 - moving)
		const lean = motion.sprint ? -0.11 * moving : -0.035 * moving

		groupRef.current.position.set(...position)
		groupRef.current.rotation.y = rotationRef.current
		torsoRef.current.position.y = PLAYER_TORSO_Y + breath
		torsoRef.current.rotation.x = lean
		torsoRef.current.rotation.z = -motion.strafe * 0.055 * moving
		headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.025 * (1 - moving)
		// Hide the head past the midpoint of the first-person transition so it
		// doesn't clip the camera once the view sits at eye level; body/arms stay visible.
		headRef.current.visible = !((cameraModeRef?.current === 'FIRST_PERSON') && (cameraBlendRef?.current ?? 0) > 0.5)
		leftLegRef.current.rotation.x = stride * direction
		rightLegRef.current.rotation.x = -stride * direction
		leftArmRef.current.rotation.x = -stride * 0.72 * direction
		rightArmRef.current.rotation.x = stride * 0.72 * direction
		leftArmRef.current.rotation.z = -0.08 - motion.strafe * 0.12 * moving
		rightArmRef.current.rotation.z = 0.08 - motion.strafe * 0.12 * moving
	})

	return (
		<group ref={groupRef} userData={{ cameraIgnore: true }}>
			{/* Feet are the root pivot: the visual never changes the authoritative player position. */}
			<group ref={leftLegRef} position={[-0.13, 0.77, 0]}>
				<mesh position={[0, -0.31, 0]}><capsuleGeometry args={[0.115, 0.38, 4, 8]} /><meshStandardMaterial color="#182638" metalness={0.72} roughness={0.38} /></mesh>
				<mesh position={[0, -0.66, 0.06]} scale={[1.18, 0.6, 1.52]}><boxGeometry args={[0.19, 0.17, 0.26]} /><meshStandardMaterial color="#101b2a" metalness={0.8} roughness={0.28} /></mesh>
			</group>
			<group ref={rightLegRef} position={[0.13, 0.77, 0]}>
				<mesh position={[0, -0.31, 0]}><capsuleGeometry args={[0.115, 0.38, 4, 8]} /><meshStandardMaterial color="#182638" metalness={0.72} roughness={0.38} /></mesh>
				<mesh position={[0, -0.66, 0.06]} scale={[1.18, 0.6, 1.52]}><boxGeometry args={[0.19, 0.17, 0.26]} /><meshStandardMaterial color="#101b2a" metalness={0.8} roughness={0.28} /></mesh>
			</group>
			<mesh position={[0, 0.8, 0]}><cylinderGeometry args={[0.25, 0.28, 0.16, 10]} /><meshStandardMaterial color="#26394d" metalness={0.76} roughness={0.32} /></mesh>
			<group ref={torsoRef} position={[0, 1.28, 0]}>
				<mesh><capsuleGeometry args={[0.31, 0.62, 6, 12]} /><meshStandardMaterial color="#1e3044" metalness={0.72} roughness={0.32} /></mesh>
				<mesh position={[0, 0.08, 0.292]} scale={[0.72, 1.55, 0.22]}><boxGeometry args={[0.36, 0.44, 0.08]} /><meshStandardMaterial color="#29445a" metalness={0.82} roughness={0.26} /></mesh>
				<mesh position={[0, 0.16, 0.345]}><boxGeometry args={[0.045, 0.28, 0.018]} /><meshBasicMaterial color="#62ddff" /></mesh>
				<mesh position={[0, 0.47, 0.1]}><boxGeometry args={[0.6, 0.085, 0.48]} /><meshStandardMaterial color="#2a4054" metalness={0.85} roughness={0.28} /></mesh>
				<mesh position={[0, 0.03, -0.33]} scale={[1.05, 0.82, 0.3]}><boxGeometry args={[0.32, 0.27, 0.15]} /><meshStandardMaterial color="#20384d" emissive="#0d5972" emissiveIntensity={0.32} metalness={0.82} roughness={0.26} /></mesh>
				<group ref={leftArmRef} position={[-0.38, 0.25, 0]}>
					<mesh position={[0, -0.26, 0]} rotation={[0, 0, -0.1]}><capsuleGeometry args={[0.075, 0.39, 4, 8]} /><meshStandardMaterial color="#263d51" metalness={0.72} roughness={0.3} /></mesh>
					<mesh position={[0, -0.55, 0]}><sphereGeometry args={[0.085, 10, 8]} /><meshStandardMaterial color="#71899a" roughness={0.58} /></mesh>
					<mesh position={[0, -0.43, 0.08]}><boxGeometry args={[0.12, 0.08, 0.04]} /><meshBasicMaterial color="#64dcff" /></mesh>
				</group>
				<group ref={rightArmRef} position={[0.38, 0.25, 0]}>
					<mesh position={[0, -0.26, 0]} rotation={[0, 0, 0.1]}><capsuleGeometry args={[0.075, 0.39, 4, 8]} /><meshStandardMaterial color="#263d51" metalness={0.72} roughness={0.3} /></mesh>
					<mesh position={[0, -0.55, 0]}><sphereGeometry args={[0.085, 10, 8]} /><meshStandardMaterial color="#71899a" roughness={0.58} /></mesh>
				</group>
				<mesh position={[0, 0.52, 0]}><cylinderGeometry args={[0.1, 0.12, 0.16, 10]} /><meshStandardMaterial color="#687f91" metalness={0.45} roughness={0.46} /></mesh>
				<group ref={headRef} position={[0, 0.78, 0.01]}>
					<mesh scale={[0.92, 1.08, 0.88]}><sphereGeometry args={[0.23, 16, 12]} /><meshStandardMaterial color="#9a7568" roughness={0.58} metalness={0.08} /></mesh>
					<mesh position={[0, 0.1, -0.035]} scale={[0.98, 0.53, 0.94]}><sphereGeometry args={[0.235, 16, 10]} /><meshStandardMaterial color="#182435" roughness={0.72} /></mesh>
					<mesh position={[0, -0.015, 0.208]} scale={[0.68, 0.34, 0.18]}><sphereGeometry args={[0.18, 12, 8]} /><meshStandardMaterial color="#263f54" emissive="#276f8b" emissiveIntensity={0.24} metalness={0.72} roughness={0.2} /></mesh>
					<mesh position={[0, -0.015, 0.235]}><boxGeometry args={[0.16, 0.018, 0.012]} /><meshBasicMaterial color="#75e7ff" /></mesh>
				</group>
			</group>
			<pointLight color="#62ddff" intensity={1.15} distance={2.6} position={[0, 1.4, 0.38]} />
		</group>
	)
}

export default Player