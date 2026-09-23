import Pathway from './Pathway'
import PlayerController from './PlayerController'
import InteractionSystem from './InteractionSystem'
import SparkInstallation from './stages/SparkInstallation'
import BuildInstallation from './stages/BuildInstallation'
import ToolkitInstallation from './stages/ToolkitInstallation'
import PersonInstallation from './stages/PersonInstallation'
import NextInstallation from './stages/NextInstallation'
import { destinations } from '../../data/destinations'
import { geographicTargets } from '../../data/geography'
import { QuintesysCampus } from './QuintesysCampus'

export const destinationTargets = destinations.filter((destination) => destination.id !== 'home')

function World({ isMobile, enabled, isLocked, mobileInput, mobileLook, mobilePinchDistance, navigationTarget, onNavigationState, playerPositionRef, onPositionChange, onRotationChange, onZoomChange, onCameraModeChange, onNearby, onInteract, selectedStateId, dragLookRef, explorationEnabled }) {
	return <group>
		<Pathway />
		<SparkInstallation onSelect={onInteract} playerPositionRef={playerPositionRef} />
		<BuildInstallation onSelect={onInteract} />
		<QuintesysCampus selectedStateId={selectedStateId} onSelect={onInteract} />
		<ToolkitInstallation onSelect={onInteract} />
		<PersonInstallation onSelect={onInteract} />
		<NextInstallation onSelect={onInteract} />
		<PlayerController enabled={enabled} isLocked={isLocked} isMobile={isMobile} mobileInput={mobileInput} mobileLook={mobileLook} mobilePinchDistance={mobilePinchDistance} navigationTarget={navigationTarget} onNavigationState={onNavigationState} onPositionChange={onPositionChange} onRotationChange={onRotationChange} onZoomChange={onZoomChange} onCameraModeChange={onCameraModeChange} dragLookRef={dragLookRef} explorationEnabled={explorationEnabled} />
		<InteractionSystem playerPositionRef={playerPositionRef} targets={[...destinations, ...geographicTargets]} enabled={enabled} onNearby={onNearby} onInteract={onInteract} />
	</group>
}

export default World
