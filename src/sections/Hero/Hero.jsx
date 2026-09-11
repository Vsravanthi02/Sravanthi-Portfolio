import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Button from '../../components/common/Button'
import SectionLabel from '../../components/common/SectionLabel'
import HeroScene from './HeroScene'
import useIsMobile from '../../hooks/useIsMobile'
import WorldHUD from '../../components/ui/WorldHUD'
import ProjectTerminal from '../../components/ui/ProjectTerminal'
import { destinationById, destinations } from '../../data/destinations'

function Hero() {
	const isMobile = useIsMobile()
	const [worldEnabled, setWorldEnabled] = useState(true)
	const [isLocked, setIsLocked] = useState(false)
	const [isExploring, setIsExploring] = useState(false)
	const [cameraMode, setCameraMode] = useState('THIRD_PERSON')
	const [nearby, setNearby] = useState(null)
	const [activeTarget, setActiveTarget] = useState(null)
	const [playerPosition, setPlayerPosition] = useState([0, 0, 0.65])
	const [playerRotation, setPlayerRotation] = useState(0)
	const [mobileInput, setMobileInput] = useState([0, 0])
	const [mobileLook, setMobileLook] = useState([0, 0])
	const [mobilePinchDistance, setMobilePinchDistance] = useState(0)
	const [zoomValue, setZoomValue] = useState(null)
	const [navigationTarget, setNavigationTarget] = useState(null)
	const [navigationStatus, setNavigationStatus] = useState(null)
	const [activeDestination, setActiveDestination] = useState(() => window.location.hash.slice(1) || 'home')
	const touchOrigin = useRef(null)
	const zoomTimer = useRef(null)
	const activeDestinationRef = useRef(activeDestination)
	const previousDestinationRef = useRef(activeDestination)
	const suppressHashNavigation = useRef(false)
	const navigationActiveRef = useRef(false)
	useEffect(() => {
		document.body.classList.toggle('is-exploring-world', isLocked)
		return () => document.body.classList.remove('is-exploring-world')
	}, [isLocked])
	useEffect(() => () => clearTimeout(zoomTimer.current), [])
	const handleZoomChange = useCallback((value) => {
		setZoomValue(value)
		clearTimeout(zoomTimer.current)
		zoomTimer.current = setTimeout(() => setZoomValue(null), 1100)
	}, [])
	const handleInteraction = useCallback((target) => {
		if (target) setActiveTarget(target)
		else setActiveTarget(null)
	}, [])
	const requestDestination = useCallback((id) => {
		const destination = destinationById[id]
		if (!destination) return
		setActiveTarget(null)
		previousDestinationRef.current = activeDestinationRef.current
		setActiveDestination(id)
		activeDestinationRef.current = id
		setNavigationTarget({ ...destination, requestId: `${id}-${Date.now()}` })
	}, [])
	useEffect(() => {
		const handleHashChange = () => {
			const id = window.location.hash.slice(1) || 'home'
			if (suppressHashNavigation.current) {
				suppressHashNavigation.current = false
				return
			}
			requestDestination(id)
		}
		window.addEventListener('hashchange', handleHashChange)
		const initialId = window.location.hash.slice(1) || 'home'
		if (destinationById[initialId]) requestDestination(initialId)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [requestDestination])
	const handleNavigationClick = useCallback((id) => {
		if (window.location.hash.slice(1) === id) requestDestination(id)
		else window.location.hash = `#${id}`
	}, [requestDestination])
	const handleNavigationState = useCallback((state) => {
		navigationActiveRef.current = Boolean(state.active)
		if (state.active) setNavigationStatus(state.label)
		else {
			setNavigationStatus(null)
			if (state.cancelled) {
				const previousId = previousDestinationRef.current || 'home'
				activeDestinationRef.current = previousId
				setActiveDestination(previousId)
				suppressHashNavigation.current = true
				window.location.hash = `#${previousId}`
				return
			}
			if (state.arrived) setActiveDestination(state.arrived)
		}
	}, [])
	const handlePositionChange = useCallback((position) => {
		setPlayerPosition(position)
		if (navigationActiveRef.current) return
		const nearbyDestination = destinations.filter((destination) => destination.position).reduce((closest, destination) => {
			const distance = Math.hypot(position[0] - destination.position[0], position[2] - destination.position[2])
			return !closest || distance < closest.distance ? { id: destination.id, distance } : closest
		}, null)
		if (nearbyDestination && nearbyDestination.distance < 1.8 && nearbyDestination.id !== activeDestinationRef.current) {
			activeDestinationRef.current = nearbyDestination.id
			setActiveDestination(nearbyDestination.id)
			suppressHashNavigation.current = true
			window.location.hash = `#${nearbyDestination.id}`
		}
	}, [])
	useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === 'Escape' && activeTarget?.id === 'projects') setActiveTarget(null)
		}
		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [activeTarget])
	const exitWorld = () => {
		if (document.pointerLockElement) document.exitPointerLock()
		setIsLocked(false)
		setWorldEnabled(false)
		setActiveTarget(null)
	}
	const handleTouchLook = (event) => {
		if (event.touches.length >= 2) {
			const [firstTouch, secondTouch] = event.touches
			const distance = Math.hypot(secondTouch.clientX - firstTouch.clientX, secondTouch.clientY - firstTouch.clientY)
			setMobilePinchDistance(distance)
			touchOrigin.current = null
			setMobileLook([0, 0])
			return
		}
		setMobilePinchDistance(0)
		if (event.type === 'touchend') {
			touchOrigin.current = null
			setMobileLook([0, 0])
			return
		}
		const touch = event.touches[0]
		if (!touchOrigin.current) touchOrigin.current = { x: touch.clientX, y: touch.clientY }
		setMobileLook([(touch.clientX - touchOrigin.current.x) * 0.08, (touch.clientY - touchOrigin.current.y) * 0.08])
	}
	return (
		<section className="hero" id="home">
			<div className="hero-grid" />
			<HeroScene enabled={worldEnabled} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onLockChange={setIsLocked} onNavigationState={handleNavigationState} onNearby={setNearby} onInteract={handleInteraction} onPositionChange={handlePositionChange} onRotationChange={setPlayerRotation} onZoomChange={handleZoomChange} onCameraModeChange={setCameraMode} selectedStateId={activeTarget?.type === 'state' ? activeTarget.id : null} onExplorationChange={setIsExploring} />
			<div className={isLocked ? 'hero-content is-exploring' : activeDestination === 'experience' ? 'hero-content is-experience' : 'hero-content'}>
				<motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
					<SectionLabel>AI / GENAI ENGINEER</SectionLabel>
					<p className="hero-intro">Hi, I&apos;m</p>
					<h1>Sravanthi <em>Addagada</em></h1>
					<p className="hero-role">AI / GenAI Engineer</p>
					<p className="hero-description">Building intelligent systems that turn complex data into real-world impact.</p>
					<div className="hero-actions">
						<Button>Explore My Work</Button>
						<a className="scroll-prompt" href="#about"><span>Scroll to explore</span><ChevronDown size={15} /></a>
					</div>
				</motion.div>
			</div>
			{!worldEnabled && <div className="world-exit-card"><SectionLabel>STANDARD MODE</SectionLabel><h2>The universe is waiting.</h2><p>Return to the walkable AI station whenever you&apos;re ready to explore.</p><button type="button" className="primary-button" onClick={() => setWorldEnabled(true)}>Enter 3D World</button></div>}
			{worldEnabled && <WorldHUD isLocked={isLocked} isExploring={isExploring} isMobile={isMobile} cameraMode={cameraMode} nearby={nearby} activeTarget={activeTarget} activeDestination={activeDestination} navigationStatus={navigationStatus} playerPosition={playerPosition} playerRotation={playerRotation} zoomValue={zoomValue} onNavigate={handleNavigationClick} onInteract={handleInteraction} onExit={exitWorld} onTouchMove={setMobileInput} onTouchLook={isMobile ? handleTouchLook : null} />}
			{activeTarget?.id === 'projects' && <ProjectTerminal onClose={() => setActiveTarget(null)} />}
			<div className="hero-index" aria-hidden="true">01 <span>/</span> 06</div>
			<div className="hero-corner-note" aria-hidden="true">INTELLIGENCE<br />IN MOTION</div>
		</section>
	)
}

export default Hero
