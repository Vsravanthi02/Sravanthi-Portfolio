import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import usePlayerMovement from '../../hooks/usePlayerMovement'
import Player, { PLAYER_EYE_HEIGHT } from './Player'

const CAMERA_MODE = { THIRD_PERSON: 'THIRD_PERSON', FIRST_PERSON: 'FIRST_PERSON' }
const CAMERA_MODE_BLEND_SMOOTHNESS = 6
const CAMERA_MODE_TOGGLE_LOCK_THRESHOLD = 0.05
const FIRST_PERSON_COLLISION_BYPASS_BLEND = 0.99
const FIRST_PERSON_LOOK_AHEAD = 3
const CAMERA_SENSITIVITY = 0.0019
const TOUCH_LOOK_SENSITIVITY = 0.004
const LOOK_SMOOTHNESS = 24
const FOLLOW_SMOOTHNESS = 7
// Desktop movement remains responsive while carrying enough inertia for a
// composed third-person exploration feel. All damping is frame-rate independent.
const MOVEMENT_ACCELERATION = 8.5
const MOVEMENT_DECELERATION = 11
const PLAYER_TURN_SMOOTHNESS = 9.5
const WALK_SPEED = 3.35
const SPRINT_SPEED = 5.5
const CAMERA_MIN_DISTANCE = 3.5
const CAMERA_DEFAULT_DISTANCE = 6.5
const CAMERA_MAX_DISTANCE = 12
const ZOOM_WHEEL_SENSITIVITY = 0.015
const PINCH_ZOOM_SENSITIVITY = 0.014
const ZOOM_SMOOTHNESS = 10
const CAMERA_DISTANCE_SMOOTHNESS = 8
const CAMERA_COLLISION_DISTANCE = 2.5
// Radial clamp around the world origin so the player can't wander off into the
// void. Must exceed the farthest stage anchor's distance from the origin —
// the spine now reaches ~48.7 units out at What's Next, vs. ~15 in the old
// hub-and-spoke layout, so this was raised to match (with headroom to still
// explore past the final stage rather than hitting a wall right at it).
const WORLD_MOVEMENT_BOUNDARY = 98
const NAVIGATION_MIN_DURATION = 0.9
const NAVIGATION_MAX_DURATION = 2.8

function PlayerController({ enabled = true, isLocked, isMobile, mobileInput, mobileLook, mobilePinchDistance = 0, navigationTarget, onNavigationState, onPositionChange, onRotationChange, onZoomChange, onCameraModeChange, dragLookRef, explorationEnabled = false }) {
	const { camera, raycaster, scene } = useThree()
	const playerPosition = useRef([0, 0, -5])
	const playerRotation = useRef(0)
	const cameraModeRef = useRef(CAMERA_MODE.THIRD_PERSON)
	const cameraBlend = useRef(0)
	const cameraBlendTarget = useRef(0)
	const cameraYaw = useRef(Math.PI)
	const cameraYawTarget = useRef(Math.PI)
	const cameraPitch = useRef(0.2)
	const cameraPitchTarget = useRef(0.2)
	const zoomDistance = useRef(CAMERA_DEFAULT_DISTANCE)
	const zoomTarget = useRef(CAMERA_DEFAULT_DISTANCE)
	const cameraDistance = useRef(CAMERA_DEFAULT_DISTANCE)
	const cameraDistanceTarget = useRef(CAMERA_DEFAULT_DISTANCE)
	const cameraLookTarget = useRef({ x: 0, y: 2.6, z: 12 })
	const stageLookTargetRef = useRef({ x: 0, y: 2.6, z: 12 })
	const velocity = useRef([0, 0])
	const speed = useRef(0)
	const characterMotionRef = useRef({ speed: 0, forward: 0, strafe: 0, sprint: false })
	const previousTouchLook = useRef([0, 0])
	const previousPinchDistance = useRef(0)
	const navigationRef = useRef(null)
	const lastZoomReport = useRef({ time: 0, value: CAMERA_DEFAULT_DISTANCE })
	const { keys, lookDelta, mobileInput: input, mobileLook: touchLook } = usePlayerMovement({ enabled, isLocked, mobileInput, mobileLook })

	useEffect(() => {
		camera.position.set(0, 3.14, -11.5)
		const setZoomTarget = (distance) => {
			zoomTarget.current = Math.max(CAMERA_MIN_DISTANCE, Math.min(CAMERA_MAX_DISTANCE, distance))
		}
		const handleWheel = (event) => {
			// First person is eye-level and fixed-distance by design: wheel must not
			// pull the camera away from the character, and must never touch zoomTarget.
			if (!enabled || cameraModeRef.current === CAMERA_MODE.FIRST_PERSON) return
			const lineHeight = 16
			const pageHeight = window.innerHeight || 800
			const deltaMultiplier = event.deltaMode === 1 ? lineHeight : event.deltaMode === 2 ? pageHeight : 1
			const normalizedDelta = Math.max(-80, Math.min(80, event.deltaY * deltaMultiplier))
			setZoomTarget(zoomTarget.current + normalizedDelta * ZOOM_WHEEL_SENSITIVITY)
		}
		const toggleCameraMode = () => {
			// Ignore mid-transition presses so the blend can't be redirected before it settles.
			if (Math.abs(cameraBlend.current - cameraBlendTarget.current) > CAMERA_MODE_TOGGLE_LOCK_THRESHOLD) return
			const nextMode = cameraModeRef.current === CAMERA_MODE.THIRD_PERSON ? CAMERA_MODE.FIRST_PERSON : CAMERA_MODE.THIRD_PERSON
			cameraModeRef.current = nextMode
			cameraBlendTarget.current = nextMode === CAMERA_MODE.FIRST_PERSON ? 1 : 0
			onCameraModeChange?.(nextMode)
		}
		const handleKeyDown = (event) => {
			if (!enabled) return
			const key = event.key.toLowerCase()
			if (key === 'r') { setZoomTarget(CAMERA_DEFAULT_DISTANCE); return }
			if (key === 'v') {
				if (event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) return
				toggleCameraMode()
			}
		}
		window.addEventListener('wheel', handleWheel, { passive: true })
		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('wheel', handleWheel)
			window.removeEventListener('keydown', handleKeyDown)
		}
		}, [camera, enabled, onZoomChange, onCameraModeChange])

	useEffect(() => {
		if (!navigationTarget || !enabled) return
		const start = [...playerPosition.current]
		const distance = Math.hypot(navigationTarget.arrival[0] - start[0], navigationTarget.arrival[2] - start[2])
		// Navigation has its own one-shot camera composition. Clear only the
		// transient collision constraint; the user's persistent zoom target stays intact.
		cameraDistance.current = zoomDistance.current
		cameraDistanceTarget.current = zoomDistance.current
		velocity.current = [0, 0]
		speed.current = 0
		characterMotionRef.current = { speed: 0, forward: 0, strafe: 0, sprint: false }
		navigationRef.current = {
			target: navigationTarget,
			start,
			elapsed: 0,
			duration: Math.max(NAVIGATION_MIN_DURATION, Math.min(NAVIGATION_MAX_DURATION, 0.85 + distance * 0.22)),
		}
		stageLookTargetRef.current = navigationTarget.lookAt ? { x: navigationTarget.lookAt[0], y: navigationTarget.lookAt[1], z: navigationTarget.lookAt[2] } : null
		onNavigationState?.({ active: true, label: navigationTarget.label })
	}, [enabled, navigationTarget, onNavigationState])

	useEffect(() => {
		const cancelNavigation = (event) => {
			if (event.key !== 'Escape' || !navigationRef.current) return
			const cancelledId = navigationRef.current.target.stageId || navigationRef.current.target.id
			navigationRef.current = null
			onNavigationState?.({ active: false, cancelled: true, id: cancelledId })
		}
		document.addEventListener('keydown', cancelNavigation)
		return () => document.removeEventListener('keydown', cancelNavigation)
	}, [onNavigationState])

	useEffect(() => {
		if (!enabled) {
			velocity.current = [0, 0]
			speed.current = 0
			characterMotionRef.current = { speed: 0, forward: 0, strafe: 0, sprint: false }
		}
	}, [enabled])

	const dampAngle = (current, target, amount) => {
		const difference = Math.atan2(Math.sin(target - current), Math.cos(target - current))
		return current + difference * amount
	}

	useFrame((_, delta) => {
		if (!enabled) return
		const step = Math.min(delta, 0.05)
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
		const zoomAlpha = 1 - Math.exp(-ZOOM_SMOOTHNESS * step)
		zoomDistance.current += (zoomTarget.current - zoomDistance.current) * zoomAlpha
		const blendAlpha = 1 - Math.exp(-CAMERA_MODE_BLEND_SMOOTHNESS * step)
		cameraBlend.current += (cameraBlendTarget.current - cameraBlend.current) * blendAlpha
		if (Math.abs(cameraBlend.current - cameraBlendTarget.current) < 0.001) cameraBlend.current = cameraBlendTarget.current
		const navigation = navigationRef.current
		if (navigation) {
			navigation.elapsed += step
			const progress = Math.min(1, navigation.elapsed / navigation.duration)
			const eased = progress * progress * (3 - 2 * progress)
			const [x, , z] = navigation.target.arrival
			playerPosition.current[0] = navigation.start[0] + (x - navigation.start[0]) * eased
			playerPosition.current[2] = navigation.start[2] + (z - navigation.start[2]) * eased
			const targetYaw = Math.atan2(playerPosition.current[0] - navigation.target.lookAt[0], playerPosition.current[2] - navigation.target.lookAt[2])
			cameraYawTarget.current = targetYaw
			cameraPitchTarget.current = 0.2
			const travelAlpha = 1 - Math.exp(-14 * step)
			cameraYaw.current += Math.atan2(Math.sin(targetYaw - cameraYaw.current), Math.cos(targetYaw - cameraYaw.current)) * travelAlpha
			cameraPitch.current += (cameraPitchTarget.current - cameraPitch.current) * travelAlpha
			const distance = zoomDistance.current
			const travelCamera = {
				x: playerPosition.current[0] + Math.sin(cameraYaw.current) * distance,
				y: 0.75 + 1.1 + Math.sin(cameraPitch.current) * distance,
				z: playerPosition.current[2] + Math.cos(cameraYaw.current) * distance,
			}
			camera.position.lerp(travelCamera, 1 - Math.exp(-9 * step))
			camera.lookAt(navigation.target.lookAt[0], navigation.target.lookAt[1], navigation.target.lookAt[2])
			onPositionChange?.([...playerPosition.current])
			if (progress >= 1) {
				cameraYaw.current = targetYaw
				cameraYawTarget.current = targetYaw
				stageLookTargetRef.current = navigation.target.lookAt ? { x: navigation.target.lookAt[0], y: navigation.target.lookAt[1], z: navigation.target.lookAt[2] } : null
				navigationRef.current = null
				onNavigationState?.({ active: false, arrived: navigation.target.stageId || navigation.target.id })
			}
			return
		}

		if (!isMobile && isLocked) {
			if (lookDelta.current.x !== 0 || lookDelta.current.y !== 0) stageLookTargetRef.current = null
			cameraYawTarget.current -= lookDelta.current.x * CAMERA_SENSITIVITY
			cameraPitchTarget.current = Math.max(-1.2, Math.min(1.15, cameraPitchTarget.current - lookDelta.current.y * CAMERA_SENSITIVITY))
			lookDelta.current.x = 0
			lookDelta.current.y = 0
		}
		if (!isMobile && !isLocked && dragLookRef?.current) {
			if (dragLookRef.current.x !== 0 || dragLookRef.current.y !== 0) stageLookTargetRef.current = null
			cameraYawTarget.current -= dragLookRef.current.x * CAMERA_SENSITIVITY
			cameraPitchTarget.current = Math.max(-1.2, Math.min(1.15, cameraPitchTarget.current - dragLookRef.current.y * CAMERA_SENSITIVITY))
			dragLookRef.current.x = 0
			dragLookRef.current.y = 0
		}
		if (isMobile) {
			if (mobilePinchDistance > 0) {
				if (previousPinchDistance.current > 0) {
					const pinchDelta = mobilePinchDistance - previousPinchDistance.current
					if (Math.abs(pinchDelta) > 0.1) {
						const normalizedPinch = Math.max(-80, Math.min(80, pinchDelta))
						zoomTarget.current = Math.max(CAMERA_MIN_DISTANCE, Math.min(CAMERA_MAX_DISTANCE, zoomTarget.current - normalizedPinch * PINCH_ZOOM_SENSITIVITY))
					}
				}
				previousPinchDistance.current = mobilePinchDistance
			} else {
				previousPinchDistance.current = 0
			}
			if (touchLook[0] === 0 && touchLook[1] === 0) {
				previousTouchLook.current[0] = 0
				previousTouchLook.current[1] = 0
			} else {
				const touchDeltaX = touchLook[0] - previousTouchLook.current[0]
				const touchDeltaY = touchLook[1] - previousTouchLook.current[1]
				cameraYawTarget.current -= touchDeltaX * TOUCH_LOOK_SENSITIVITY
				cameraPitchTarget.current = Math.max(-1.2, Math.min(1.15, cameraPitchTarget.current - touchDeltaY * TOUCH_LOOK_SENSITIVITY))
				previousTouchLook.current[0] = touchLook[0]
				previousTouchLook.current[1] = touchLook[1]
			}
		}

		const lookAlpha = 1 - Math.exp(-(reducedMotion ? 34 : LOOK_SMOOTHNESS) * step)
		cameraYaw.current += (cameraYawTarget.current - cameraYaw.current) * lookAlpha
		cameraPitch.current += (cameraPitchTarget.current - cameraPitch.current) * lookAlpha

		const desktopInput = [(keys.current.d ? 1 : 0) - (keys.current.a ? 1 : 0), (keys.current.w ? 1 : 0) - (keys.current.s ? 1 : 0)]
		const strafe = isMobile ? input[0] : desktopInput[0]
		const forwardInput = isMobile ? -input[1] : desktopInput[1]
		const inputLength = Math.hypot(strafe, forwardInput) || 1
		const hasInput = strafe !== 0 || forwardInput !== 0
		if (hasInput) stageLookTargetRef.current = null
		// These must match the camera's actual horizontal facing, not an arbitrary basis:
		// the camera sits at player + (sin(yaw), cos(yaw))*distance and looks back at the
		// player (see the `direction`/lookAt math below), so its true forward is the
		// negation of that offset, and right is forward rotated -90 deg. The previous
		// (sin, -cos)/(cos, sin) pair didn't match that, which rotated WASD off-axis.
		const forward = [-Math.sin(cameraYaw.current), -Math.cos(cameraYaw.current)]
		const right = [Math.cos(cameraYaw.current), -Math.sin(cameraYaw.current)]
		const moveX = (right[0] * strafe + forward[0] * forwardInput) / inputLength
		const moveZ = (right[1] * strafe + forward[1] * forwardInput) / inputLength
		const targetSpeed = hasInput ? (isMobile ? 2.7 : (keys.current.shift ? SPRINT_SPEED : WALK_SPEED)) : 0
		const speedAlpha = 1 - Math.exp(-(hasInput ? MOVEMENT_ACCELERATION : MOVEMENT_DECELERATION) * step)
		speed.current += (targetSpeed - speed.current) * speedAlpha
		const targetVelocityX = hasInput ? moveX * speed.current : 0
		const targetVelocityZ = hasInput ? moveZ * speed.current : 0
		velocity.current[0] += (targetVelocityX - velocity.current[0]) * speedAlpha
		velocity.current[1] += (targetVelocityZ - velocity.current[1]) * speedAlpha
		characterMotionRef.current.speed = Math.hypot(velocity.current[0], velocity.current[1])
		characterMotionRef.current.forward = forwardInput
		characterMotionRef.current.strafe = strafe
		characterMotionRef.current.sprint = !isMobile && keys.current.shift && hasInput

		playerPosition.current[0] += velocity.current[0] * step
		playerPosition.current[2] += velocity.current[1] * step
			const radius = Math.hypot(playerPosition.current[0], playerPosition.current[2])
			if (radius > WORLD_MOVEMENT_BOUNDARY) {
				playerPosition.current[0] *= WORLD_MOVEMENT_BOUNDARY / radius
				playerPosition.current[2] *= WORLD_MOVEMENT_BOUNDARY / radius
		}
		onPositionChange?.([...playerPosition.current])

		// Desktop facing follows the damped world-space velocity, keeping camera-relative
		// direction changes and backward transitions smooth rather than input-snappy.
		const rotationVelocityX = isMobile ? moveX : velocity.current[0]
		const rotationVelocityZ = isMobile ? moveZ : velocity.current[1]
		if (hasInput && Math.hypot(rotationVelocityX, rotationVelocityZ) > 0.04) {
			const targetRotation = Math.atan2(rotationVelocityX, rotationVelocityZ)
			playerRotation.current = dampAngle(playerRotation.current, targetRotation, 1 - Math.exp(-PLAYER_TURN_SMOOTHNESS * step))
		}

		const followAlpha = 1 - Math.exp(-(reducedMotion ? 16 : FOLLOW_SMOOTHNESS) * step)
		const target = { x: playerPosition.current[0], y: 0.75, z: playerPosition.current[2] }
		const horizontalDistance = zoomDistance.current * Math.cos(cameraPitch.current)
		const desired = {
			x: target.x + Math.sin(cameraYaw.current) * horizontalDistance,
			y: target.y + 1.1 + Math.sin(cameraPitch.current) * zoomDistance.current,
			z: target.z + Math.cos(cameraYaw.current) * horizontalDistance,
		}
		const direction = { x: desired.x - target.x, y: desired.y - target.y, z: desired.z - target.z }
		const directionLength = Math.hypot(direction.x, direction.y, direction.z)
		let obstruction = null
		if (cameraBlend.current < FIRST_PERSON_COLLISION_BYPASS_BLEND) {
		raycaster.set(target, { x: direction.x / directionLength, y: direction.y / directionLength, z: direction.z / directionLength })
		obstruction = raycaster.intersectObjects(scene.children, true).find((hit) => {
			let current = hit.object
			while (current) {
				if (current.userData.cameraIgnore) return false
				current = current.parent
			}
			return hit.distance > 0.25
		})
		}

		const collisionDistance = obstruction ? Math.max(CAMERA_COLLISION_DISTANCE, obstruction.distance - 0.35) : Infinity
		cameraDistanceTarget.current = Math.min(zoomDistance.current, collisionDistance)
		const distanceAlpha = 1 - Math.exp(-(obstruction ? 17 : CAMERA_DISTANCE_SMOOTHNESS) * step)
		cameraDistance.current += (cameraDistanceTarget.current - cameraDistance.current) * distanceAlpha
		const now = performance.now()
		if (Math.abs(cameraDistance.current - lastZoomReport.current.value) > 0.015 && now - lastZoomReport.current.time > 80) {
			lastZoomReport.current = { time: now, value: cameraDistance.current }
			onZoomChange?.(cameraDistance.current)
		}
		const finalRatio = cameraDistance.current / directionLength
		const finalDesired = {
			x: target.x + direction.x * finalRatio,
			y: target.y + direction.y * finalRatio,
			z: target.z + direction.z * finalRatio,
		}
		const lookGoal = stageLookTargetRef.current || target
		cameraLookTarget.current.x += (lookGoal.x - cameraLookTarget.current.x) * followAlpha
		cameraLookTarget.current.y += (lookGoal.y - cameraLookTarget.current.y) * followAlpha
		cameraLookTarget.current.z += (lookGoal.z - cameraLookTarget.current.z) * followAlpha

		// First-person/third-person is purely a camera-presentation blend: it reuses the
		// same player position, yaw/pitch and the outward `direction` already computed for
		// collision above, so at blend=0 this is bit-for-bit the original third-person camera.
		const blend = cameraBlend.current
		const eased = blend * blend * (3 - 2 * blend)
		let finalCameraTarget = finalDesired
		let finalLookTarget = cameraLookTarget.current
		if (eased > 0) {
			const eyePosition = { x: target.x, y: PLAYER_EYE_HEIGHT, z: target.z }
			const lookDirection = { x: -direction.x / directionLength, y: -direction.y / directionLength, z: -direction.z / directionLength }
			const eyeLookTarget = {
				x: eyePosition.x + lookDirection.x * FIRST_PERSON_LOOK_AHEAD,
				y: eyePosition.y + lookDirection.y * FIRST_PERSON_LOOK_AHEAD,
				z: eyePosition.z + lookDirection.z * FIRST_PERSON_LOOK_AHEAD,
			}
			finalCameraTarget = {
				x: finalDesired.x + (eyePosition.x - finalDesired.x) * eased,
				y: finalDesired.y + (eyePosition.y - finalDesired.y) * eased,
				z: finalDesired.z + (eyePosition.z - finalDesired.z) * eased,
			}
			finalLookTarget = {
				x: cameraLookTarget.current.x + (eyeLookTarget.x - cameraLookTarget.current.x) * eased,
				y: cameraLookTarget.current.y + (eyeLookTarget.y - cameraLookTarget.current.y) * eased,
				z: cameraLookTarget.current.z + (eyeLookTarget.z - cameraLookTarget.current.z) * eased,
			}
		}
		camera.position.lerp(finalCameraTarget, followAlpha)
		camera.lookAt(finalLookTarget.x, finalLookTarget.y, finalLookTarget.z)
		onRotationChange?.(cameraYaw.current)
	})

	return <Player position={playerPosition.current} rotationRef={playerRotation} motionRef={characterMotionRef} cameraModeRef={cameraModeRef} cameraBlendRef={cameraBlend} />
}

export default PlayerController
