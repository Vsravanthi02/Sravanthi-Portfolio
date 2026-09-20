import { Component, Suspense, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'

// ── Drop a real character model here ────────────────────────────────────────
// Put a rigged GLB export (Mixamo, Ready Player Me, Blender, a licensed
// low-poly character asset, etc.) at this exact path and it is picked up
// automatically — nothing else in this file needs to change:
//
//   public/models/explorer.glb
//
// Until that file exists, PlayerFallback below renders instead (see PROJECT
// NOTES at the bottom of this file for what to do when the model arrives).
const MODEL_URL = '/models/explorer.glb'

// Tune once the real model is in: uniform scale to hit ~60-70% of the previous
// robot's apparent height, and a yaw correction if the export's forward axis
// isn't +Z (rotate by Math.PI if the character appears to walk backwards).
const MODEL_SCALE = 1
const MODEL_YAW_OFFSET = 0

// Best-guess world-space eye height for the first-person camera. Once the real
// model is in, measure its actual head height (e.g. log a THREE.Box3 around
// the head bone) and replace these two numbers — PlayerController imports
// PLAYER_EYE_HEIGHT as a plain constant, so it isn't derived automatically.
export const PLAYER_TORSO_Y = 0.82
export const PLAYER_HEAD_OFFSET_Y = 0.55
export const PLAYER_EYE_HEIGHT = PLAYER_TORSO_Y + PLAYER_HEAD_OFFSET_Y

// Fuzzy-matched against the loaded model's animation clip names so this works
// with common exports (Mixamo names things "Idle"/"Walking", others differ)
// without hardcoding one naming scheme.
const IDLE_NAME_HINTS = ['idle', 'stand']
const WALK_NAME_HINTS = ['walk', 'run', 'jog', 'move']

function pickClip(names, hints) {
	const lower = names.map((n) => n.toLowerCase())
	for (const hint of hints) {
		const index = lower.findIndex((n) => n.includes(hint))
		if (index !== -1) return names[index]
	}
	return null
}

// Drives the loaded GLTF: plays + crossfades idle/walk clips if present, and
// exposes the root object so the outer rig can hide it in first person.
function PlayerModel({ motionRef, modelRootRef }) {
	const { scene, animations } = useGLTF(MODEL_URL)
	const { actions, names } = useAnimations(animations, modelRootRef)
	const idleName = pickClip(names, IDLE_NAME_HINTS)
	const walkName = pickClip(names, WALK_NAME_HINTS)

	useEffect(() => {
		const idle = idleName && actions[idleName]
		const walk = walkName && actions[walkName]
		idle?.reset().play()
		walk?.reset().play()
		return () => { idle?.stop(); walk?.stop() }
	}, [actions, idleName, walkName])

	useFrame((_, delta) => {
		const motion = motionRef?.current || { speed: 0 }
		const moving = Math.min(1, motion.speed / 3.35)
		const idle = idleName && actions[idleName]
		const walk = walkName && actions[walkName]
		// Crossfade by weight rather than switching clips outright — avoids a
		// visible pop the instant speed crosses zero.
		if (idle) idle.setEffectiveWeight(1 - moving)
		if (walk) walk.setEffectiveWeight(moving)
		if (!idle && !walk) return
		void delta
	})

	return <primitive ref={modelRootRef} object={scene} scale={MODEL_SCALE} rotation={[0, MODEL_YAW_OFFSET, 0]} />
}

// Deliberately NOT a body. A placeholder attempting to look human (even a
// simple capsule-with-a-head-on-top) is exactly the "primitive human" this
// pipeline exists to avoid — so while explorer.glb is missing, this renders as
// a neutral presence marker instead: a soft vertical glow anchored at the
// player's feet, with no text (text rigidly attached to the rotating player
// root faces away from a third-person camera positioned behind the player,
// showing its unreadable/mirrored back face — a marker with no text sidesteps
// that entirely). Swap happens automatically the moment MODEL_URL resolves to
// a real file.
function PlayerFallback({ modelRootRef }) {
	return (
		<group ref={modelRootRef}>
			<mesh position={[0, 0.55, 0]}><cylinderGeometry args={[0.035, 0.07, 1.0, 12, 1, true]} /><meshBasicMaterial color="#62ddff" transparent opacity={0.05} depthWrite={false} /></mesh>
			<mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.16, 0.2, 24]} /><meshBasicMaterial color="#62ddff" transparent opacity={0.35} /></mesh>
			<pointLight color="#62ddff" intensity={0.25} distance={1.2} position={[0, 0.4, 0]} />
		</group>
	)
}

class ModelErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = { failed: false }
	}

	static getDerivedStateFromError() {
		return { failed: true }
	}

	componentDidCatch(error) {
		// Expected until a real model is placed at MODEL_URL — logged once for
		// visibility, not surfaced to the player.
		console.warn('[Player] character model unavailable, using fallback:', error?.message || error)
	}

	render() {
		return this.state.failed ? this.props.fallback : this.props.children
	}
}

function Player({ position, rotationRef, motionRef, cameraModeRef, cameraBlendRef }) {
	const groupRef = useRef()
	const modelRootRef = useRef()

	useFrame(() => {
		if (!groupRef.current) return
		groupRef.current.position.set(...position)
		groupRef.current.rotation.y = rotationRef.current
		// First person hides the whole model rather than a specific head node —
		// we don't know the loaded model's bone/mesh names in advance. Once the
		// real model is in, this can target just its head bone/mesh by name
		// (e.g. modelRootRef.current.getObjectByName('Head')) to keep the body
		// visible in first person the way the previous rig did.
		if (modelRootRef.current) {
			modelRootRef.current.visible = !((cameraModeRef?.current === 'FIRST_PERSON') && (cameraBlendRef?.current ?? 0) > 0.5)
		}
	})

	return (
		<group ref={groupRef} userData={{ cameraIgnore: true }}>
			<ModelErrorBoundary fallback={<PlayerFallback modelRootRef={modelRootRef} />}>
				<Suspense fallback={<PlayerFallback modelRootRef={modelRootRef} />}>
					<PlayerModel motionRef={motionRef} modelRootRef={modelRootRef} />
				</Suspense>
			</ModelErrorBoundary>
		</group>
	)
}

export default Player

// ── Notes for when a real model is dropped in ───────────────────────────────
// 1. Export a GLB with the character in a T/A-pose or already rigged with an
//    idle + walk cycle (Mixamo is the fastest path: any humanoid model ->
//    auto-rig -> download "Idle" and "Walking" as separate FBX/GLB, or export
//    one GLB containing both clips).
// 2. Place it at public/models/explorer.glb — no code change needed.
// 3. Check the console for the ModelErrorBoundary warning to confirm it's
//    actually loading (the warning disappears once it loads successfully).
// 4. If the character faces the wrong way, set MODEL_YAW_OFFSET = Math.PI.
// 5. If it's too big/small next to the world, adjust MODEL_SCALE — target
//    roughly 1.3-1.5 world units tall (60-70% of the previous robot).
// 6. Update PLAYER_TORSO_Y / PLAYER_HEAD_OFFSET_Y to the model's real
//    chest/eye heights (in the same 0-1.5-ish unit range) for a correctly
//    framed third-person pivot and first-person eye level.
