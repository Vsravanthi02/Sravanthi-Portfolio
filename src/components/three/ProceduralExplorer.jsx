import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Creates the clean "SA" mark texture for the back of the robot.
 * Integrated with the portfolio's architectural palette:
 * Dark obsidian mounting plate, restrained warm ivory lettering, and subtle hairline accent.
 */
function createBackSATexture() {
	if (typeof document === 'undefined') return null

	const canvas = document.createElement('canvas')
	canvas.width = 512
	canvas.height = 512
	const ctx = canvas.getContext('2d')
	if (!ctx) return null

	// Dark structural obsidian plate
	const pad = 36
	const rad = 60
	ctx.fillStyle = '#11151f'
	ctx.beginPath()
	ctx.roundRect(pad, pad, 512 - pad * 2, 512 - pad * 2, rad)
	ctx.fill()

	// Subtle architectural stone border
	ctx.lineWidth = 10
	ctx.strokeStyle = 'rgba(231, 226, 216, 0.28)'
	ctx.stroke()

	// Thin restrained cyan technology hairline
	ctx.fillStyle = '#35d8ff'
	ctx.beginPath()
	ctx.roundRect(196, pad + 18, 120, 6, 3)
	ctx.fill()

	// Bold, clean "SA" in warm architectural ivory
	ctx.fillStyle = '#f3efe8'
	ctx.font = '900 280px -apple-system, BlinkMacSystemFont, "Manrope", "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillText('SA', 256, 262)

	const texture = new THREE.CanvasTexture(canvas)
	texture.colorSpace = THREE.SRGBColorSpace
	texture.anisotropy = 8
	texture.needsUpdate = true
	return texture
}

/**
 * Procedural stylized cute robot mascot aligned with the portfolio's architectural world:
 * - Warm ivory / pale limestone surfaces that receive sunset amber lighting naturally
 * - Deep obsidian / charcoal faceplate
 * - Simple clean white/ivory eyes and tiny smile
 * - Tiny restrained cyan technology accent line at waist
 * - Clean "SA" mark on the back
 * - Identical approved geometry, proportions, and simple mascot identity
 */
export default function ProceduralExplorer({ motionRef, rootRef }) {
	const saTexture = useMemo(() => createBackSATexture(), [])

	// Reusable PBR materials tuned to the portfolio's architectural palette
	const materials = useMemo(() => ({
		// Warm ivory / pale travertine: matte/satin architectural stone feel
		ivory: new THREE.MeshStandardMaterial({
			color: '#e7e2d8',
			roughness: 0.48,
			metalness: 0.04,
		}),
		// Subtle secondary stone tone for ear piece caps
		ivoryAccent: new THREE.MeshStandardMaterial({
			color: '#dfd9cd',
			roughness: 0.52,
			metalness: 0.06,
		}),
		// Deep structural obsidian / charcoal for face, joints, and soles
		obsidian: new THREE.MeshStandardMaterial({
			color: '#10141d',
			roughness: 0.32,
			metalness: 0.12,
		}),
		// Dark waist band
		waistBand: new THREE.MeshStandardMaterial({
			color: '#161b26',
			roughness: 0.42,
			metalness: 0.08,
		}),
		// Restrained cyan technological accent (matches Spark TECH_COLOR #35d8ff)
		techCyan: new THREE.MeshStandardMaterial({
			color: '#35d8ff',
			emissive: '#1a6a80',
			emissiveIntensity: 0.28,
			roughness: 0.3,
			metalness: 0.1,
		}),
		// Soft architectural white for eyes & smile
		eyeWhite: new THREE.MeshBasicMaterial({
			color: '#f8f6f0',
		}),
	}), [])

	// Hierarchical joint refs for simple, cute walk & idle animation
	const hipsRef = useRef()
	const torsoRef = useRef()
	const headRef = useRef()
	const leftArmRef = useRef()
	const rightArmRef = useRef()
	const leftLegRef = useRef()
	const rightLegRef = useRef()
	const leftKneeRef = useRef()
	const rightKneeRef = useRef()

	const walkPhaseRef = useRef(0)
	const smoothedSpeedRef = useRef(0)

	useFrame((state, delta) => {
		const dt = Math.min(delta, 0.05)
		const motion = motionRef?.current || { speed: 0 }
		const targetSpeed = motion.speed || 0

		smoothedSpeedRef.current += (targetSpeed - smoothedSpeedRef.current) * (1 - Math.exp(-12 * dt))
		const speedRatio = Math.min(1.5, smoothedSpeedRef.current / 3.35)
		const isMoving = speedRatio > 0.03

		const time = state.clock.getElapsedTime()

		if (isMoving) {
			const walkFreq = 8.5 * Math.max(0.7, speedRatio)
			walkPhaseRef.current += walkFreq * dt
		}
		const phase = walkPhaseRef.current

		const moveWeight = Math.min(1, speedRatio * 1.4)
		const idleWeight = 1 - moveWeight

		// Subtle idle breathing & cute walk bounce
		if (hipsRef.current) {
			const idleBob = Math.sin(time * 2.2) * 0.008
			const walkBob = Math.abs(Math.sin(phase)) * 0.04 - 0.02
			const walkSway = Math.sin(phase) * 0.025
			hipsRef.current.position.y = 0.54 + idleBob * idleWeight + walkBob * moveWeight
			hipsRef.current.position.x = walkSway * moveWeight * 0.3
			hipsRef.current.rotation.z = Math.sin(phase) * 0.03 * moveWeight
			hipsRef.current.rotation.y = Math.sin(phase) * 0.04 * moveWeight
		}

		// Torso subtle movement
		if (torsoRef.current) {
			const idlePitch = Math.sin(time * 2.0) * 0.015
			const walkPitch = 0.04 + Math.sin(phase * 2) * 0.02
			torsoRef.current.rotation.x = idlePitch * idleWeight + walkPitch * moveWeight
			torsoRef.current.rotation.y = -Math.sin(phase) * 0.05 * moveWeight
		}

		// Cute head bobbing
		if (headRef.current) {
			const idleHead = Math.sin(time * 1.5) * 0.02
			headRef.current.rotation.x = idleHead * idleWeight - 0.02 * moveWeight
			headRef.current.rotation.z = Math.sin(time * 1.0) * 0.015 * idleWeight
		}

		// Simple leg stride with feet grounded
		if (leftLegRef.current && rightLegRef.current) {
			const legSwing = Math.sin(phase) * 0.55 * moveWeight
			leftLegRef.current.rotation.x = legSwing
			rightLegRef.current.rotation.x = -legSwing

			if (leftKneeRef.current && rightKneeRef.current) {
				leftKneeRef.current.rotation.x = Math.max(0, -Math.sin(phase)) * 0.6 * moveWeight
				rightKneeRef.current.rotation.x = Math.max(0, Math.sin(phase)) * 0.6 * moveWeight
			}
		}

		// Simple opposing arm swing
		if (leftArmRef.current && rightArmRef.current) {
			const armSwing = Math.sin(phase) * 0.55 * moveWeight
			const idleSpread = 0.12
			leftArmRef.current.rotation.x = -armSwing
			rightArmRef.current.rotation.x = armSwing
			leftArmRef.current.rotation.z = idleSpread + Math.sin(time * 2.2) * 0.02 * idleWeight
			rightArmRef.current.rotation.z = -idleSpread - Math.sin(time * 2.2) * 0.02 * idleWeight
		}
	})

	return (
		<group ref={rootRef} dispose={null}>
			{/* Ground contact shadow */}
			<mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
				<circleGeometry args={[0.32, 24]} />
				<meshBasicMaterial color="#000000" transparent opacity={0.32} depthWrite={false} />
			</mesh>

			{/* Hips / Lower Body Root */}
			<group ref={hipsRef} position={[0, 0.54, 0]}>
				{/* ── LEGS (Short, rounded, with cute feet) ──────────────────── */}
				{/* Left Leg */}
				<group ref={leftLegRef} position={[-0.10, 0, 0]}>
					{/* Dark thin limb segment */}
					<mesh position={[0, -0.12, 0]} material={materials.obsidian}>
						<cylinderGeometry args={[0.032, 0.032, 0.22, 12]} />
					</mesh>
					{/* Lower leg & foot */}
					<group ref={leftKneeRef} position={[0, -0.23, 0]}>
						{/* Foot / Shoe in warm ivory */}
						<mesh position={[0, -0.065, 0.03]} material={materials.ivory}>
							<boxGeometry args={[0.11, 0.07, 0.17]} />
						</mesh>
						{/* Dark sole flat on ground */}
						<mesh position={[0, -0.105, 0.03]} material={materials.obsidian}>
							<boxGeometry args={[0.115, 0.015, 0.18]} />
						</mesh>
					</group>
				</group>

				{/* Right Leg */}
				<group ref={rightLegRef} position={[0.10, 0, 0]}>
					{/* Dark thin limb segment */}
					<mesh position={[0, -0.12, 0]} material={materials.obsidian}>
						<cylinderGeometry args={[0.032, 0.032, 0.22, 12]} />
					</mesh>
					{/* Lower leg & foot */}
					<group ref={rightKneeRef} position={[0, -0.23, 0]}>
						{/* Foot / Shoe in warm ivory */}
						<mesh position={[0, -0.065, 0.03]} material={materials.ivory}>
							<boxGeometry args={[0.11, 0.07, 0.17]} />
						</mesh>
						{/* Dark sole flat on ground */}
						<mesh position={[0, -0.105, 0.03]} material={materials.obsidian}>
							<boxGeometry args={[0.115, 0.015, 0.18]} />
						</mesh>
					</group>
				</group>

				{/* ── TORSO (Compact, rounded body in warm architectural ivory) ── */}
				<group ref={torsoRef} position={[0, 0.08, 0]}>
					{/* Dark waist band */}
					<mesh position={[0, 0.02, 0]} material={materials.waistBand}>
						<cylinderGeometry args={[0.145, 0.14, 0.06, 20]} />
					</mesh>

					{/* Tiny restrained cyan technology accent line at waist */}
					<mesh position={[0, 0.045, 0]} material={materials.techCyan}>
						<cylinderGeometry args={[0.148, 0.148, 0.012, 20]} />
					</mesh>

					{/* Small compact body in warm ivory */}
					<mesh position={[0, 0.12, 0]} material={materials.ivory}>
						<cylinderGeometry args={[0.165, 0.148, 0.16, 20]} />
					</mesh>
					<mesh position={[0, 0.19, 0]} material={materials.ivory}>
						<sphereGeometry args={[0.164, 20, 14]} />
					</mesh>

					{/* ── THE ONLY PERSONALIZATION: SA ON THE BACK ─────────────── */}
					{/* Attached directly to the back of the torso */}
					<group position={[0, 0.12, -0.166]} rotation={[0.06, Math.PI, 0]}>
						{/* Small flat back panel */}
						<mesh position={[0, 0, -0.002]} material={materials.obsidian}>
							<boxGeometry args={[0.18, 0.15, 0.012]} />
						</mesh>
						{/* "SA" mark texture */}
						{saTexture && (
							<mesh position={[0, 0, 0.006]}>
								<planeGeometry args={[0.17, 0.14]} />
								<meshBasicMaterial map={saTexture} />
							</mesh>
						)}
					</group>

					{/* ── ARMS (Segmented, rounded hands) ───────────────────────── */}
					{/* Left Arm */}
					<group ref={leftArmRef} position={[-0.19, 0.16, 0]}>
						{/* Shoulder joint */}
						<mesh position={[0, 0, 0]} material={materials.obsidian}>
							<sphereGeometry args={[0.045, 12, 10]} />
						</mesh>
						{/* Dark thin limb segment */}
						<mesh position={[0, -0.08, 0]} material={materials.obsidian}>
							<cylinderGeometry args={[0.028, 0.028, 0.12, 10]} />
						</mesh>
						{/* Rounded hand in warm ivory */}
						<mesh position={[0, -0.17, 0.01]} material={materials.ivory}>
							<sphereGeometry args={[0.055, 14, 12]} />
						</mesh>
					</group>

					{/* Right Arm */}
					<group ref={rightArmRef} position={[0.19, 0.16, 0]}>
						{/* Shoulder joint */}
						<mesh position={[0, 0, 0]} material={materials.obsidian}>
							<sphereGeometry args={[0.045, 12, 10]} />
						</mesh>
						{/* Dark thin limb segment */}
						<mesh position={[0, -0.08, 0]} material={materials.obsidian}>
							<cylinderGeometry args={[0.028, 0.028, 0.12, 10]} />
						</mesh>
						{/* Rounded hand in warm ivory */}
						<mesh position={[0, -0.17, 0.01]} material={materials.ivory}>
							<sphereGeometry args={[0.055, 14, 12]} />
						</mesh>
					</group>

					{/* ── HEAD (Large rounded head in warm ivory, dark face) ───── */}
					<group ref={headRef} position={[0, 0.40, 0]}>
						{/* Small neck cylinder */}
						<mesh position={[0, -0.10, 0]} material={materials.obsidian}>
							<cylinderGeometry args={[0.07, 0.08, 0.06, 16]} />
						</mesh>

						{/* Large rounded head shell in warm ivory */}
						<mesh position={[0, 0.06, 0]} material={materials.ivory}>
							<sphereGeometry args={[0.31, 32, 28]} />
						</mesh>

						{/* Small top crown knob in warm ivory */}
						<mesh position={[0, 0.365, 0]} material={materials.ivory}>
							<sphereGeometry args={[0.055, 16, 12]} />
						</mesh>

						{/* Small rounded side ears in warm ivory with subtle stone accent */}
						{/* Left Ear */}
						<mesh position={[-0.305, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.ivory}>
							<cylinderGeometry args={[0.07, 0.07, 0.05, 20]} />
						</mesh>
						<mesh position={[-0.33, 0.06, 0]} material={materials.ivoryAccent}>
							<sphereGeometry args={[0.068, 16, 12]} />
						</mesh>

						{/* Right Ear */}
						<mesh position={[0.305, 0.06, 0]} rotation={[0, 0, -Math.PI / 2]} material={materials.ivory}>
							<cylinderGeometry args={[0.07, 0.07, 0.05, 20]} />
						</mesh>
						<mesh position={[0.33, 0.06, 0]} material={materials.ivoryAccent}>
							<sphereGeometry args={[0.068, 16, 12]} />
						</mesh>

						{/* ── DARK FACE VISOR & CUTE FACIAL FEATURES ──────────── */}
						{/* Deep obsidian / charcoal faceplate embedded in the front */}
						<group position={[0, 0.04, 0.16]}>
							<mesh scale={[1.04, 0.90, 0.65]} material={materials.obsidian}>
								<sphereGeometry args={[0.25, 28, 24]} />
							</mesh>

							{/* Left Eye: simple white/ivory circular eye */}
							<mesh position={[-0.082, 0.03, 0.165]} scale={[1, 1.15, 0.25]} material={materials.eyeWhite}>
								<sphereGeometry args={[0.035, 18, 16]} />
							</mesh>

							{/* Right Eye: simple white/ivory circular eye */}
							<mesh position={[0.082, 0.03, 0.165]} scale={[1, 1.15, 0.25]} material={materials.eyeWhite}>
								<sphereGeometry args={[0.035, 18, 16]} />
							</mesh>

							{/* Tiny Simple Curved Smile */}
							<mesh position={[0, -0.04, 0.168]} rotation={[0, 0, -Math.PI * 0.875]} material={materials.eyeWhite}>
								<torusGeometry args={[0.026, 0.0055, 8, 18, Math.PI * 0.75]} />
							</mesh>
						</group>
					</group>
				</group>
			</group>
		</group>
	)
}
