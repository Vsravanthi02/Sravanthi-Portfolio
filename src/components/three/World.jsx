import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Pathway from './Pathway'
import ContinuousWorldVista from './environments/ContinuousWorldVista'
import PlayerController from './PlayerController'
import InteractionSystem from './InteractionSystem'
import SparkInstallation from './stages/SparkInstallation'
import BuildInstallation from './stages/BuildInstallation'
import SolveInstallation from './stages/SolveInstallation'
import EngineerInstallation from './stages/EngineerInstallation'
import ToolkitInstallation from './stages/ToolkitInstallation'
import PersonInstallation from './stages/PersonInstallation'
import NextInstallation from './stages/NextInstallation'
import { destinations } from '../../data/destinations'

export const destinationTargets = destinations.filter((destination) => destination.id !== 'home')

const STAGE_ADJACENCY = {
	home: ['home', 'projects'],
	projects: ['home', 'projects', 'solve'],
	solve: ['projects', 'solve', 'experience'],
	experience: ['solve', 'experience', 'skills'],
	skills: ['experience', 'skills', 'about'],
	about: ['skills', 'about', 'contact'],
	contact: ['about', 'contact'],
}

const STAGE_COORDS = {
	home: [0, 0, 5],
	projects: [0, 0, 21],
	solve: [0, 0, 38],
	experience: [0, 0, 72],
	skills: [21.8, 0, 33.1],
	about: [35.3, 0, 29.5],
	contact: [45.6, 0, 17.2],
}

// 34m ensures that directly adjacent stages are always visible, while distant occluded chapters are culled
const CULLING_DISTANCE = 34.0

function World({ isMobile, enabled, isLocked, mobileInput, mobileLook, mobilePinchDistance, navigationTarget, onNavigationState, playerPositionRef, onPositionChange, onRotationChange, onZoomChange, onCameraModeChange, onNearby, onInteract, selectedStateId, dragLookRef, explorationEnabled, onNavigate, activeDestination }) {
	const interactiveTargets = destinations

	const sparkRef = useRef()
	const buildRef = useRef()
	const solveRef = useRef()
	const engineerRef = useRef()
	const toolkitRef = useRef()
	const personRef = useRef()
	const nextRef = useRef()

	const stageRefs = useMemo(() => ({
		home: sparkRef,
		projects: buildRef,
		solve: solveRef,
		experience: engineerRef,
		skills: toolkitRef,
		about: personRef,
		contact: nextRef,
	}), [])

	const updateVisibility = () => {
		const curStage = activeDestination || 'home'
		const navStage = navigationTarget?.id

		// Determine allowed stages strictly from topological adjacency
		const allowedStages = new Set(STAGE_ADJACENCY[curStage] || [curStage, 'projects'])
		if (navStage && STAGE_ADJACENCY[navStage]) {
			STAGE_ADJACENCY[navStage].forEach((s) => allowedStages.add(s))
		}

		for (const [id, ref] of Object.entries(stageRefs)) {
			if (!ref.current) continue
			const shouldBeVisible = allowedStages.has(id)
			if (ref.current.visible !== shouldBeVisible) {
				ref.current.visible = shouldBeVisible
			}
		}
	}

	useEffect(() => {
		updateVisibility()
	}, [activeDestination, navigationTarget])

	const frameCount = useRef(0)
	useFrame(() => {
		frameCount.current++
		if (frameCount.current % 10 === 0) {
			updateVisibility()
		}
	})

	return <group>
		{/* Global Panoramic Golden-Hour Sky & Distant Mountain Horizon */}
		<ContinuousWorldVista />

		{/* Continuous Architectural Spine Ribbon */}
		<Pathway />

		{/* Individual Chapter Stages with Distance & Visibility Culling */}
		<group ref={sparkRef}>
			<SparkInstallation onSelect={onInteract} playerPositionRef={playerPositionRef} />
		</group>
		<group ref={buildRef}>
			<BuildInstallation onSelect={onInteract} playerPositionRef={playerPositionRef} onNavigate={onNavigate} />
		</group>
		<group ref={solveRef}>
			<SolveInstallation onSelect={onInteract} playerPositionRef={playerPositionRef} onNavigate={onNavigate} />
		</group>
		<group ref={engineerRef}>
			<EngineerInstallation onSelect={onInteract} playerPositionRef={playerPositionRef} onNavigate={onNavigate} />
		</group>
		<group ref={toolkitRef}>
			<ToolkitInstallation onSelect={onInteract} playerPositionRef={playerPositionRef} onNavigate={onNavigate} />
		</group>
		<group ref={personRef}>
			<PersonInstallation onSelect={onInteract} />
		</group>
		<group ref={nextRef}>
			<NextInstallation onSelect={onInteract} />
		</group>

		<PlayerController enabled={enabled} isLocked={isLocked} isMobile={isMobile} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onNavigationState={onNavigationState} onPositionChange={onPositionChange} onRotationChange={onRotationChange} onZoomChange={onZoomChange} onCameraModeChange={onCameraModeChange} dragLookRef={dragLookRef} explorationEnabled={explorationEnabled} />
		<InteractionSystem playerPositionRef={playerPositionRef} targets={interactiveTargets} enabled={enabled} onNearby={onNearby} onInteract={onInteract} />
	</group>
}

export default World
