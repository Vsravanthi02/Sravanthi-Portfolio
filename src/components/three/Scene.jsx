import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import Camera from './Camera'
import Lighting from './Lighting'
import Particles from './Particles'
import PostProcessing from './PostProcessing'
import StarField from './StarField'
import World from './World'
import useIsMobile from '../../hooks/useIsMobile'
import usePointerLock from '../../hooks/usePointerLock'

function Scene({ enabled = true, mobileInput = [0, 0], mobileLook = [0, 0], mobilePinchDistance = 0, navigationTarget, onLockChange, onNavigationState, onNearby, onInteract, onPositionChange, onRotationChange, onZoomChange, onCameraModeChange, selectedStateId, onExplorationChange }) {
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

	return (
		<Canvas dpr={isMobile ? 1 : [1, 1.5]} camera={{ position: [0, 3.3, 5.6], fov: 50 }} gl={{ antialias: true, alpha: true }} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp} onDoubleClick={handleDoubleClick}>
			<fog attach="fog" args={['#070b16', 8, 16]} />
			<Camera />
			<Lighting />
			<StarField count={reducedMotion || isMobile ? 140 : 360} />
			<Particles count={reducedMotion || isMobile ? 30 : 80} reducedMotion={reducedMotion} />
			<World isMobile={isMobile} enabled={enabled} isLocked={isLocked} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onNavigationState={onNavigationState} playerPositionRef={playerPositionRef} onPositionChange={handlePositionChange} onRotationChange={handleRotationChange} onZoomChange={onZoomChange} onCameraModeChange={onCameraModeChange} onNearby={onNearby} onInteract={onInteract} selectedStateId={selectedStateId} dragLookRef={dragLookRef} explorationEnabled={explorationEnabled} />
			<PostProcessing />
		</Canvas>
	)
}

export default Scene
