import Scene from '../../components/three/Scene'

function HeroScene({ enabled, mobileInput, mobileLook, mobilePinchDistance, navigationTarget, onLockChange, onNavigationState, onNearby, onInteract, onPositionChange, onRotationChange, onZoomChange, onCameraModeChange, selectedStateId, activeDestination, onExplorationChange, onNavigate }) {
	return (
		<div className="hero-scene" aria-hidden="true">
			<Scene enabled={enabled} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onLockChange={onLockChange} onNavigationState={onNavigationState} onNearby={onNearby} onInteract={onInteract} onPositionChange={onPositionChange} onRotationChange={onRotationChange} onZoomChange={onZoomChange} onCameraModeChange={onCameraModeChange} selectedStateId={selectedStateId} activeDestination={activeDestination} onExplorationChange={onExplorationChange} onNavigate={onNavigate} />
		</div>
	)
}

export default HeroScene
