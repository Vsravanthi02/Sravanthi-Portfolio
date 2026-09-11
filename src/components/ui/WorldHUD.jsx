import { LogOut } from 'lucide-react'
import ControlsGuide from './ControlsGuide'
import InteractionPrompt from './InteractionPrompt'
import NavigationRadar from './NavigationRadar'
import { destinationById } from '../../data/destinations'

function WorldHUD({ isLocked, isExploring, isMobile, cameraMode, nearby, activeTarget, activeDestination, navigationStatus, playerPosition, playerRotation, zoomValue, onNavigate, onInteract, onExit, onTouchMove, onTouchLook }) {
	const navItems = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'SKILLS', 'CONTACT']
	const activeContinent = destinationById[activeDestination]
	return (
		<div className="world-hud">
			<div className="world-mode-bar">
				<div className="world-identity"><span className="world-logo">SA<span>.</span></span><span className="world-role">AI / GENAI ENGINEER</span></div>
				<span className="mode-title"><i /> EXPLORE WORLD {cameraMode === 'FIRST_PERSON' && <span className="camera-mode-badge">1ST PERSON</span>}</span>
				<nav>{navItems.map((item) => { const id = item.toLowerCase(); return <button key={item} className={activeDestination === id ? 'is-active' : ''} type="button" onClick={() => onNavigate?.(id)}>{item}</button> })}</nav>
				<button className="exit-world" type="button" onClick={onExit}><LogOut size={13} /> EXIT 3D MODE</button>
			</div>
			{!isExploring && !isMobile && <div className="exploration-hint">DRAG TO LOOK <i /> DOUBLE-CLICK TO EXPLORE</div>}
			{navigationStatus && <div className="navigation-status"><i /> TRAVELING TO <strong>{navigationStatus}</strong></div>}
			{activeContinent && !navigationStatus && <div className="continent-arrival-label"><span>{activeContinent.label}</span><strong>{activeContinent.worldName}</strong></div>}
			{isMobile && <div className="touch-pad" aria-label="Touch movement controls">
				<button type="button" onTouchStart={() => onTouchMove?.([0, -1])} onTouchEnd={() => onTouchMove?.([0, 0])}>W</button>
				<div><button type="button" onTouchStart={() => onTouchMove?.([-1, 0])} onTouchEnd={() => onTouchMove?.([0, 0])}>A</button><button type="button" onTouchStart={() => onTouchMove?.([1, 0])} onTouchEnd={() => onTouchMove?.([0, 0])}>D</button></div>
				<button type="button" onTouchStart={() => onTouchMove?.([0, 1])} onTouchEnd={() => onTouchMove?.([0, 0])}>S</button>
			</div>}
			{(isLocked || isExploring || isMobile) && <ControlsGuide isMobile={isMobile} cameraMode={cameraMode} />}
			<NavigationRadar playerPosition={playerPosition} playerRotation={playerRotation} />
			{zoomValue !== null && <div className="zoom-indicator" key={zoomValue}><span className="hud-kicker">CAMERA</span><div className="zoom-track"><i style={{ left: `${((zoomValue - 3.5) / (12 - 3.5)) * 100}%` }} /></div><strong>{zoomValue.toFixed(1)}</strong></div>}
			<InteractionPrompt target={nearby} onInteract={onInteract} />
			{activeTarget && activeTarget.id !== 'projects' && <div className={activeTarget.type === 'state' ? 'interaction-card state-card' : 'interaction-card'}><button type="button" aria-label="Close interaction" onClick={() => onInteract?.(null)}>+</button>{activeTarget.type === 'state' ? <><p className="hud-kicker">{activeTarget.title}</p><h3>{activeTarget.detail}</h3><p>{activeTarget.subtitle}</p><span className="state-card-action">EXPLORE REGION</span></> : <><p className="hud-kicker">{activeTarget.worldName || activeTarget.label}</p><h3>{activeTarget.description}</h3><p>{activeTarget.detail || 'A future destination in the portfolio universe.'}</p></>}</div>}
			{onTouchLook && <div className="touch-look-zone" onTouchStart={onTouchLook} onTouchMove={onTouchLook} onTouchEnd={onTouchLook} aria-hidden="true" />}
		</div>
	)
}

export default WorldHUD
