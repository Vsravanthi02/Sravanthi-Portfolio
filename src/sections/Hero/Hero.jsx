import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionLabel from '../../components/common/SectionLabel'
import HeroScene from './HeroScene'
import useIsMobile from '../../hooks/useIsMobile'
import WorldHUD from '../../components/ui/WorldHUD'
import ProjectTerminal from '../../components/ui/ProjectTerminal'
import QuintesysTerminal from '../../components/ui/QuintesysTerminal'
import SparkConceptTerminal from '../../components/ui/SparkConceptTerminal'
import BuildProjectTerminal from '../../components/ui/BuildProjectTerminal'
import SolveChamberTerminal from '../../components/ui/SolveChamberTerminal'
import EngineerStationTerminal from '../../components/ui/EngineerStationTerminal'
import ToolkitStationTerminal from '../../components/ui/ToolkitStationTerminal'
import PersonTopicTerminal from '../../components/ui/PersonTopicTerminal'
import NextTerminalModal from '../../components/ui/NextTerminalModal'
import { destinationById, destinations } from '../../data/destinations'
import { isQuintesysTarget } from '../../data/geography'

function Hero() {
	const isMobile = useIsMobile()
	const [worldEnabled, setWorldEnabled] = useState(true)
	const [isLocked, setIsLocked] = useState(false)
	const [isExploring, setIsExploring] = useState(false)
	const [cameraMode, setCameraMode] = useState('THIRD_PERSON')
	const [nearby, setNearby] = useState(null)
	const [activeTarget, setActiveTarget] = useState(null)
	const [mobileInput, setMobileInput] = useState([0, 0])
	const [mobileLook, setMobileLook] = useState([0, 0])
	const [mobilePinchDistance, setMobilePinchDistance] = useState(0)
	const [navigationTarget, setNavigationTarget] = useState(null)
	const [navigationStatus, setNavigationStatus] = useState(null)
	const [activeDestination, setActiveDestination] = useState(() => window.location.hash.slice(1) || 'home')
	const touchOrigin = useRef(null)
	const activeDestinationRef = useRef(activeDestination)
	const previousDestinationRef = useRef(activeDestination)
	const suppressHashNavigation = useRef(false)
	const navigationActiveRef = useRef(false)
	useEffect(() => {
		document.body.classList.toggle('is-exploring-world', isLocked)
		return () => document.body.classList.remove('is-exploring-world')
	}, [isLocked])
	const handleInteraction = useCallback((target) => {
		if (target) setActiveTarget(target)
		else setActiveTarget(null)
	}, [])
	const requestDestination = useCallback((id) => {
		const destination = destinationById[id]
		if (!destination) return
		setActiveTarget(null)
		previousDestinationRef.current = activeDestinationRef.current
		const stageId = destination.stageId || destination.id
		setActiveDestination(stageId)
		activeDestinationRef.current = stageId
		setNavigationTarget({ ...destination, requestId: `${id}-${Date.now()}` })
	}, [])
	useEffect(() => {
		const handleHashChange = () => {
			const id = window.location.hash.slice(1) || 'home'
			if (suppressHashNavigation.current) {
				suppressHashNavigation.current = false
				if (id === activeDestinationRef.current) return
			}
			requestDestination(id)
		}
		window.addEventListener('hashchange', handleHashChange)
		const initialId = window.location.hash.slice(1) || 'home'
		if (destinationById[initialId]) requestDestination(initialId)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [requestDestination])
	const handleNavigationClick = useCallback((id) => {
		suppressHashNavigation.current = false
		requestDestination(id)
		if (window.location.hash.slice(1) !== id) {
			window.location.hash = `#${id}`
		}
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
			if (event.key === 'Escape' && (activeTarget?.id === 'projects' || isQuintesysTarget(activeTarget) || activeTarget?.type === 'spark-question' || activeTarget?.type === 'build-project' || activeTarget?.type === 'solve-chamber' || activeTarget?.type === 'engineer-station')) setActiveTarget(null)
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
	const titlingHidden = isLocked || isExploring || activeDestination !== 'home'
	return (
		<section className="hero" id="home">
			<HeroScene enabled={worldEnabled} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onLockChange={setIsLocked} onNavigationState={handleNavigationState} onNearby={setNearby} onInteract={handleInteraction} onPositionChange={handlePositionChange} onCameraModeChange={setCameraMode} selectedStateId={activeTarget?.type === 'state' ? activeTarget.id : null} activeDestination={activeDestination} onExplorationChange={setIsExploring} onNavigate={handleNavigationClick} />
			<div className="hero-overlay">
				<motion.div className={titlingHidden ? 'hero-actions-bar is-hidden' : 'hero-actions-bar'} initial={{ opacity: 0 }} animate={titlingHidden ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }} style={{ pointerEvents: titlingHidden ? 'none' : 'auto' }}>
					<div className="hero-actions">
						<button type="button" className="primary-button" onClick={() => handleNavigationClick('projects')}><span>WALK THE BUILD</span><ArrowUpRight size={17} strokeWidth={1.8} /></button>
						<button type="button" className="primary-button secondary-cta" onClick={() => handleNavigationClick('experience')}><span>MEET THE ENGINEER</span><ArrowUpRight size={17} strokeWidth={1.8} /></button>
					</div>
				</motion.div>
			</div>
			{!worldEnabled && <div className="world-exit-card"><SectionLabel>STANDARD MODE</SectionLabel><h2>The universe is waiting.</h2><p>Return to the walkable AI station whenever you&apos;re ready to explore.</p><button type="button" className="primary-button" onClick={() => setWorldEnabled(true)}>Enter 3D World</button></div>}
			{worldEnabled && <WorldHUD isLocked={isLocked} isExploring={isExploring} isMobile={isMobile} cameraMode={cameraMode} nearby={nearby} activeTarget={activeTarget} activeDestination={activeDestination} navigationStatus={navigationStatus} onInteract={handleInteraction} onExit={exitWorld} onTouchMove={setMobileInput} onTouchLook={isMobile ? handleTouchLook : null} />}
			{activeTarget?.id === 'projects' && <ProjectTerminal onClose={() => setActiveTarget(null)} />}
			{isQuintesysTarget(activeTarget) && <QuintesysTerminal target={activeTarget} onClose={() => setActiveTarget(null)} onSelectState={handleInteraction} />}
			{activeTarget?.type === 'spark-question' && (
				<SparkConceptTerminal
					question={activeTarget}
					onClose={() => setActiveTarget(null)}
					onNavigate={(targetId, stateId) => {
						const destId = targetId || stateId
						handleNavigationClick(destId)
					}}
				/>
			)}
			{activeTarget?.type === 'build-project' && (
				<BuildProjectTerminal
					project={activeTarget}
					onClose={() => setActiveTarget(null)}
					onNavigate={(stageId) => handleNavigationClick(stageId)}
				/>
			)}
			{activeTarget?.type === 'solve-chamber' && (
				<SolveChamberTerminal
					chamber={activeTarget}
					onClose={() => setActiveTarget(null)}
				/>
			)}
			{activeTarget?.type === 'engineer-station' && (
				<EngineerStationTerminal
					station={activeTarget}
					onClose={() => setActiveTarget(null)}
					onNavigate={(stageId) => handleNavigationClick(stageId)}
				/>
			)}
			{(activeTarget?.type === 'toolkit-station' || activeTarget?.type === 'toolkit-core') && (
				<ToolkitStationTerminal
					target={activeTarget}
					onClose={() => setActiveTarget(null)}
					onSelectStation={(st) => setActiveTarget(st)}
				/>
			)}
			{(activeTarget?.type === 'person-topic' || activeTarget?.id === 'about') && (
				<PersonTopicTerminal
					topic={activeTarget}
					onClose={() => setActiveTarget(null)}
					onSelectTopic={(t) => setActiveTarget({ ...t, type: 'person-topic' })}
				/>
			)}
			{(activeTarget?.type === 'next-stage' || activeTarget?.id === 'contact' || activeTarget?.id === 'next') && (
				<NextTerminalModal
					target={activeTarget}
					onClose={() => setActiveTarget(null)}
				/>
			)}
			<div className="hero-index" aria-hidden="true">01 <span>/</span> 06</div>
			<div className="hero-corner-note" aria-hidden="true">INTELLIGENCE<br />IN MOTION</div>
		</section>
	)
}

export default Hero
