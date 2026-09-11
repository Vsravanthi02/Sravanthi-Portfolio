import { destinationTargets } from '../three/World'

function NavigationRadar({ playerPosition, playerRotation = 0 }) {
	const [px, , pz] = playerPosition
	return (
		<div className="navigation-radar" aria-label="World navigation radar">
			<div className="radar-ring" style={{ transform: `rotate(${-playerRotation}rad)` }}><span className="radar-crosshair" /><i className="radar-you">YOU</i>
				{destinationTargets.map((target) => {
					const dx = target.position[0] - px
					const dz = target.position[2] - pz
					const scale = Math.min(24, Math.hypot(dx, dz) * 3.4)
					return <span key={target.id} className={target.id === 'projects' ? 'radar-dot radar-projects' : 'radar-dot'} title={target.label} style={{ left: `calc(50% + ${Math.max(-31, Math.min(31, dx * 4))}px)`, top: `calc(50% + ${Math.max(-31, Math.min(31, dz * 4))}px)`, opacity: 0.65 + scale / 100 }} />
				})}
			</div>
			<p className="hud-kicker">LOCAL ORBIT</p>
		</div>
)
}

export default NavigationRadar