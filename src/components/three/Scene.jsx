import * as THREE from 'three'
import { Canvas, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { prewarmTroikaFonts } from './prewarmFonts'

function PerfProbe() {
	const { gl, scene, camera } = useThree()
	useEffect(() => {
		window.__threeRenderer = gl
		window.__threeScene = scene
		window.__threeCamera = camera
	}, [gl, scene, camera])
	return null
}

const PRECOMPILE_VANTAGES = [
	[0, 2.5, 5],       // Spark
	[0, 2.5, 21],      // Build
	[0, 2.5, 38],      // Solve
	[0, 2.5, 72],      // Engineer
	[21.8, 2.5, 33.1], // Toolkit
	[35.3, 2.5, 29.5], // Person
	[45.6, 2.5, 17.2], // Next
]

function ScenePrecompiler() {
	const { gl, scene, camera } = useThree()
	useEffect(() => {
		// 1. Kick off Troika SDF font prewarming in web worker
		prewarmTroikaFonts()

		// 2. Precompile scene shader programs once initial graph is mounted
		const timer = setTimeout(() => {
			try {
				const hiddenNodes = []
				scene.traverse((node) => {
					if (node.visible === false) {
						node.visible = true
						hiddenNodes.push(node)
					}
				})

				// 1. First run gl.compile for current camera
				gl.compile(scene, camera)

				// 2. Offscreen 1x1 render target to force driver shader linking,
				//    Troika SDF glyph atlas uploads (texSubImage2D), and buffer bindings
				const dummyTarget = new THREE.WebGLRenderTarget(1, 1)
				const prevTarget = gl.getRenderTarget()
				gl.setRenderTarget(dummyTarget)

				const probeCam = new THREE.PerspectiveCamera(110, 1, 0.1, 80)
				PRECOMPILE_VANTAGES.forEach(([x, y, z]) => {
					probeCam.position.set(x, y, z - 3)
					probeCam.lookAt(x, y, z)
					probeCam.updateMatrixWorld()
					gl.compile(scene, probeCam)
					gl.render(scene, probeCam)
				})

				gl.setRenderTarget(prevTarget)
				dummyTarget.dispose()

				hiddenNodes.forEach((node) => {
					node.visible = false
				})
			} catch (err) {
				console.warn('[ScenePrecompiler] compile notice:', err?.message)
			}
		}, 120)

		return () => clearTimeout(timer)
	}, [gl, scene, camera])
	return null
}
import Camera from './Camera'
import Lighting from './Lighting'
import ChapterLightRig from './ChapterLightRig'
import Particles from './Particles'
import PostProcessing from './PostProcessing'
import World from './World'
import useIsMobile from '../../hooks/useIsMobile'
import usePointerLock from '../../hooks/usePointerLock'

function Scene({ enabled = true, mobileInput = [0, 0], mobileLook = [0, 0], mobilePinchDistance = 0, navigationTarget, onLockChange, onNavigationState, onNearby, onInteract, onPositionChange, onRotationChange, onZoomChange, onCameraModeChange, selectedStateId, activeDestination, onExplorationChange, onNavigate }) {
	const isMobile = useIsMobile()
	const playerPositionRef = useRef([0, 0, 0.65])
	const lastTelemetry = useRef(0)
	const lastRotation = useRef(0)
	const { isLocked, requestPointerLock } = usePointerLock()
	const [explorationEnabled, setExplorationEnabled] = useState(false)
	const dragLookRef = useRef({ x: 0, y: 0 })
	const dragRef = useRef(null)
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

	useEffect(() => onLockChange?.(isLocked), [isLocked, onLockChange])
	useEffect(() => onExplorationChange?.(explorationEnabled || isLocked), [explorationEnabled, isLocked, onExplorationChange])
	useEffect(() => { if (!enabled) setExplorationEnabled(false) }, [enabled])

	const handlePositionChange = (position) => {
		playerPositionRef.current = position
		const now = performance.now()
		if (now - lastTelemetry.current > 100) {
			lastTelemetry.current = now
			onPositionChange?.(position)
		}
	}
	const handleRotationChange = (rotation) => {
		if (Math.abs(rotation - lastRotation.current) > 0.035) {
			lastRotation.current = rotation
			onRotationChange?.(rotation)
		}
	}
	const handlePointerDown = (event) => {
		if (event.button !== 0) return
		dragRef.current = { x: event.clientX, y: event.clientY, moved: false }
	}
	const handlePointerMove = (event) => {
		if (!dragRef.current) return
		const dx = event.clientX - dragRef.current.x
		const dy = event.clientY - dragRef.current.y
		if (Math.abs(dx) + Math.abs(dy) > 2) dragRef.current.moved = true
		if (dragRef.current.moved) {
			dragLookRef.current.x += dx
			dragLookRef.current.y += dy
		}
		dragRef.current.x = event.clientX
		dragRef.current.y = event.clientY
	}
	const handlePointerUp = () => { dragRef.current = null }
	const handleDoubleClick = (event) => {
		setExplorationEnabled(true)
		try {
			const canvas = event.nativeEvent?.currentTarget || event.currentTarget
			const request = requestPointerLock(canvas)
			request?.catch?.(() => {})
		} catch {
			// Browsers that decline pointer lock still retain click-and-drag look.
		}
	}

	// Spark, Build, Solve, Engineer, Toolkit, and Person chapters share the continuous panoramic world vista,
	// so their far plane is wider (140) to preserve the distant horizons and panoramic sunset.
	const isWideStage = activeDestination === 'home' || activeDestination === 'projects' || activeDestination === 'solve' || activeDestination === 'experience' || activeDestination === 'skills' || activeDestination === 'about'
	const fogFar = isWideStage ? 140 : 26
	const fogNear = isWideStage ? 28 : 10
	const fogColor = isWideStage ? '#1c2842' : '#0a0e16'

	return (
		<Canvas dpr={isMobile ? 1 : [1, 1.25]} camera={{ position: [0, 3.14, -11.5], fov: 56 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.85 }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onDoubleClick={handleDoubleClick}>
			<PerfProbe />
			<ScenePrecompiler />
			{/* Atmospheric fog blending distant boundaries into the deep navy/blue-violet sky */}
			<fog attach="fog" args={[fogColor, fogNear, fogFar]} />
			<Camera />
			<Lighting stage={activeDestination} />
			<ChapterLightRig activeDestination={activeDestination} playerPositionRef={playerPositionRef} />
			<Particles count={reducedMotion || isMobile ? 18 : 46} reducedMotion={reducedMotion} />
			<World isMobile={isMobile} enabled={enabled} isLocked={isLocked} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onNavigationState={onNavigationState} playerPositionRef={playerPositionRef} onPositionChange={handlePositionChange} onRotationChange={handleRotationChange} onZoomChange={onZoomChange} onCameraModeChange={onCameraModeChange} onNearby={onNearby} onInteract={onInteract} selectedStateId={selectedStateId} dragLookRef={dragLookRef} explorationEnabled={explorationEnabled} onNavigate={onNavigate} activeDestination={activeDestination} />
			<PostProcessing isMobile={isMobile} />
		</Canvas>
	)
}

export default Scene
