import { LogOut } from 'lucide-react'
import ControlsGuide from './ControlsGuide'
import InteractionPrompt from './InteractionPrompt'
import { destinationById } from '../../data/destinations'
import { isQuintesysTarget } from '../../data/geography'

// Navbar is the single navigation/branding surface (see Navbar.jsx's
// active-stage highlighting) — this HUD only carries information Navbar
// can't: which stage you're physically standing in, the interaction prompt,
// a minimal controls hint, and mobile touch input. No mode bar, no minimap,
// no numeric camera gauge, no duplicate logo/role text — the environment
// itself carries the visual weight, not game chrome around it.
function WorldHUD({ isLocked, isExploring, isMobile, cameraMode, nearby, activeTarget, activeDestination, navigationStatus, onInteract, onExit, onTouchMove, onTouchLook }) {
	const activeStage = destinationById[activeDestination]
	// Preserves the Home-HUD-duplication fix: the stage indicator only shows
	// while the hero identity panel is actually hidden (locked/exploring, or on
	// the Engineer stage where the panel is dimmed) — showing it whenever a
	// stage is merely "active" duplicated the identity text at every stage.
	const showStageIndicator = Boolean(activeStage) && !navigationStatus && (isLocked || activeDestination === 'experience' || activeDestination === 'skills')
	return (
		<div className="world-hud">
			<button className="exit-world" type="button" onClick={onExit}><LogOut size={12} /> EXIT 3D MODE</button>
			{navigationStatus && <div className="navigation-status"><i /> WALKING TO <strong>{navigationStatus}</strong></div>}
			{showStageIndicator && <div className="stage-indicator"><span>STAGE</span><strong>{activeStage.label}</strong></div>}
			{isMobile && <div className="touch-pad" aria-label="Touch movement controls">
				<button type="button" onTouchStart={() => onTouchMove?.([0, -1])} onTouchEnd={() => onTouchMove?.([0, 0])}>W</button>
				<div><button type="button" onTouchStart={() => onTouchMove?.([-1, 0])} onTouchEnd={() => onTouchMove?.([0, 0])}>A</button><button type="button" onTouchStart={() => onTouchMove?.([1, 0])} onTouchEnd={() => onTouchMove?.([0, 0])}>D</button></div>
				<button type="button" onTouchStart={() => onTouchMove?.([0, 1])} onTouchEnd={() => onTouchMove?.([0, 0])}>S</button>
			</div>}
			{(isLocked || isExploring || isMobile) && <ControlsGuide isMobile={isMobile} cameraMode={cameraMode} />}
			<InteractionPrompt target={nearby} onInteract={onInteract} />
			{activeTarget && activeTarget.id !== 'projects' && !isQuintesysTarget(activeTarget) && activeTarget.type !== 'spark-question' && activeTarget.type !== 'build-project' && <div className={activeTarget.type === 'state' ? 'interaction-card state-card' : 'interaction-card'}><button type="button" aria-label="Close interaction" onClick={() => onInteract?.(null)}>+</button>{activeTarget.type === 'state' ? <><p className="hud-kicker">{activeTarget.title}</p><h3>{activeTarget.detail}</h3><p>{activeTarget.subtitle}</p><span className="state-card-action">EXPLORE REGION</span></> : <><p className="hud-kicker">{activeTarget.worldName || activeTarget.label}</p><h3>{activeTarget.description}</h3><p>{activeTarget.detail || 'More detail coming soon.'}</p></>}</div>}
			{onTouchLook && <div className="touch-look-zone" onTouchStart={onTouchLook} onTouchMove={onTouchLook} onTouchEnd={onTouchLook} aria-hidden="true" />}
		</div>
	)
}

export default WorldHUD
