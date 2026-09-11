import { Fragment, useEffect, useState } from 'react'
import { experienceStates, quintesysGeography } from '../../data/geography'
import { destinationById } from '../../data/destinations'

function QuintesysTerminal({ target, onClose, onSelectState }) {
	const isStateView = target?.type === 'state'
	const [stageIndex, setStageIndex] = useState(0)

	useEffect(() => { setStageIndex(0) }, [target?.id])

	if (isStateView) {
		const state = target
		const stage = state.pipeline?.[stageIndex]
		return (
			<div className="project-terminal-backdrop" role="presentation">
				<section className="project-terminal quintesys-terminal" role="dialog" aria-modal="true" aria-labelledby="quintesys-state-title">
					<header className="terminal-header">
						<div><span className="terminal-status"><i /> QUINTESYS // {state.label}</span><p>PROFESSIONAL EXPERIENCE</p></div>
						<button className="terminal-close" type="button" onClick={onClose} aria-label="Close panel">+</button>
					</header>
					<div className="terminal-body">
						<div className="terminal-heading">
							<p className="hud-kicker"><button type="button" className="quintesys-breadcrumb" onClick={() => onSelectState(destinationById.experience)}>QUINTESYS</button> / {state.label}</p>
							<h2 id="quintesys-state-title">{state.label}</h2>
							<p className="terminal-subtitle">{state.subtitle}</p>
							<p className="terminal-description">{state.whatBuilt}</p>
						</div>
						{state.workItems && (
							<div className="quintesys-work-section">
								<p className="hud-kicker">WORK / SYSTEM</p>
								{state.workItems.map((item) => (
									<div key={item.id} className="quintesys-work-card">
										<div className="quintesys-work-card-header"><strong>{item.title}</strong><span>{item.subtitle}</span></div>
										<div className="quintesys-work-fields">
											{item.fields.map((field) => (
												<div key={field.label} className={field.emphasis ? 'quintesys-work-field is-emphasis' : 'quintesys-work-field'}>
													<span className="quintesys-work-field-label">{field.label}</span>
													<span className="quintesys-work-field-value">{field.value}</span>
													{field.detail && <span className="quintesys-work-field-detail">{field.detail}</span>}
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
						<div className={state.pipeline ? 'terminal-grid' : 'terminal-grid quintesys-grid-single'}>
							<div className="terminal-specs">
								<dl><dt>TECHNOLOGIES</dt><dd className="tech-list">{state.technologies.map((item) => <span key={item}>{item}</span>)}</dd></dl>
								{!state.workItems && <dl><dt>IMPACT / RESULT</dt><dd>{state.impact}</dd></dl>}
							</div>
							{state.pipeline && (
								<div className="architecture-panel">
									<div className="architecture-topline"><span>PIPELINE</span><span>LIVE FLOW</span></div>
									<div className="architecture-flow quintesys-pipeline-flow">
										{state.pipeline.map(([label], index) => (
											<Fragment key={label}>
												<button type="button" className={stageIndex === index ? 'architecture-node is-selected' : 'architecture-node'} onClick={() => setStageIndex(index)}><i />{label}</button>
												{index < state.pipeline.length - 1 && <span className="quintesys-pipeline-connector" style={{ animationDelay: `${index * 0.18}s` }} aria-hidden="true" />}
											</Fragment>
										))}
									</div>
									<div className="architecture-detail"><div><span className="detail-kicker">SELECTED STAGE</span><strong>{stage[0]}</strong></div><span>{stage[1]}</span></div>
								</div>
							)}
						</div>
					</div>
					<footer className="terminal-footer"><span>QUINTESYS // {state.label} <i /> PROFESSIONAL EXPERIENCE</span><span>ESC <i /> CLOSE</span></footer>
				</section>
			</div>
		)
	}

	const { overview } = quintesysGeography
	return (
		<div className="project-terminal-backdrop" role="presentation">
			<section className="project-terminal quintesys-terminal" role="dialog" aria-modal="true" aria-labelledby="quintesys-overview-title">
				<header className="terminal-header">
					<div><span className="terminal-status"><i /> SYSTEM ONLINE</span><p>QUINTESYS // AI ENGINEERING</p></div>
					<button className="terminal-close" type="button" onClick={onClose} aria-label="Close panel">+</button>
				</header>
				<div className="terminal-body">
					<div className="terminal-heading">
						<p className="hud-kicker">{overview.eyebrow}</p>
						<h2 id="quintesys-overview-title">{overview.title}</h2>
						<p className="terminal-subtitle">{overview.subtitle}</p>
						<p className="terminal-description">{overview.intro}</p>
					</div>
					<div className="quintesys-discipline-grid">
						{experienceStates.map((state) => (
							<button key={state.id} type="button" className="quintesys-discipline-card" style={{ '--accent': state.theme }} onClick={() => onSelectState(state)}>
								<span className="quintesys-discipline-label">{state.label}</span>
								<span className="quintesys-discipline-subtitle">{state.subtitle}</span>
							</button>
						))}
					</div>
				</div>
				<footer className="terminal-footer"><span>QUINTESYS // AI ENGINEERING CONTINENT <i /> PROFESSIONAL EXPERIENCE</span><span>ESC <i /> CLOSE</span></footer>
			</section>
		</div>
	)
}

export default QuintesysTerminal
