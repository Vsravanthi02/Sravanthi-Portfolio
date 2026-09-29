import { useState, useEffect, Fragment } from 'react'
import { ArrowRight, Bot, Cpu, Network, CheckCircle2, ShieldCheck, Terminal, Layers, Sparkles, Workflow } from 'lucide-react'
import { QUINTESYS_EXPERIENCE } from '../../data/engineerData'
import { experienceStates, quintesysGeography } from '../../data/geography'
import { destinationById } from '../../data/destinations'

// ============================================================================
// QUINTESYS PROFESSIONAL EXPERIENCE TERMINAL (CHAPTER 04 — THE ENGINEER)
// Renders the comprehensive 3-column engineering dashboard:
// - Left: Professional Experience & 4 Engineering Pillars
// - Center: Key Work Areas — Cognos → Power BI Automation (Paginated & Desktop)
// - Right: LLM / GenAI Engineering & Software Engineering Practice
// ============================================================================

export default function QuintesysTerminal({ target, onClose, onSelectState }) {
	const isLegacyState = target?.type === 'state'
	const [activeTab, setActiveTab] = useState(isLegacyState ? 'state' : 'overview')
	const [selectedLegacyState, setSelectedLegacyState] = useState(isLegacyState ? target : null)
	const [stageIndex, setStageIndex] = useState(0)

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose?.()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onClose])

	useEffect(() => {
		if (target?.type === 'state') {
			setSelectedLegacyState(target)
			setActiveTab('state')
			setStageIndex(0)
		} else {
			setActiveTab('overview')
		}
	}, [target])

	const data = QUINTESYS_EXPERIENCE

	// Pillar Icon Helper
	const getPillarIcon = (id) => {
		switch (id) {
			case 'genai': return <Bot size={15} style={{ color: '#35d8ff' }} />
			case 'systems': return <Cpu size={15} style={{ color: '#ffb45c' }} />
			case 'automation': return <Workflow size={15} style={{ color: '#69e3ff' }} />
			case 'software': return <Layers size={15} style={{ color: '#a993ff' }} />
			default: return <Sparkles size={15} style={{ color: '#35d8ff' }} />
		}
	}

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal quintesys-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="quintesys-experience-title"
				onClick={(e) => e.stopPropagation()}
				style={{ maxWidth: '1220px', width: '94vw', maxHeight: '88vh' }}
			>
				{/* ── Terminal Header ── */}
				<header className="terminal-header" style={{ padding: '0.85rem 1.4rem' }}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
						<div>
							<span className="terminal-status" style={{ letterSpacing: '0.14em' }}>
								<i style={{ backgroundColor: '#35d8ff' }} /> SYSTEM ONLINE // PROFESSIONAL EXPERIENCE
							</span>
							<p style={{ margin: '0.2rem 0 0', color: '#ffb45c', letterSpacing: '0.12em' }}>
								QUINTESYS &bull; AI ENGINEERING INTERN (8 MONTHS)
							</p>
						</div>

						{/* Quick Mode Switcher */}
						{selectedLegacyState && (
							<div style={{ display: 'flex', gap: '0.4rem', marginLeft: '1rem' }}>
								<button
									type="button"
									onClick={() => setActiveTab('overview')}
									style={{
										background: activeTab === 'overview' ? 'rgba(53, 216, 255, 0.18)' : 'transparent',
										border: `1px solid ${activeTab === 'overview' ? '#35d8ff' : 'rgba(255,255,255,0.15)'}`,
										color: activeTab === 'overview' ? '#fff' : '#88a0b5',
										padding: '0.22rem 0.55rem',
										fontSize: '0.52rem',
										fontFamily: 'DM Mono, monospace',
										cursor: 'pointer'
									}}
								>
									ALL WORK AREAS
								</button>
								<button
									type="button"
									onClick={() => setActiveTab('state')}
									style={{
										background: activeTab === 'state' ? 'rgba(53, 216, 255, 0.18)' : 'transparent',
										border: `1px solid ${activeTab === 'state' ? '#35d8ff' : 'rgba(255,255,255,0.15)'}`,
										color: activeTab === 'state' ? '#fff' : '#88a0b5',
										padding: '0.22rem 0.55rem',
										fontSize: '0.52rem',
										fontFamily: 'DM Mono, monospace',
										cursor: 'pointer'
									}}
								>
									{selectedLegacyState.label}
								</button>
							</div>
						)}
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close terminal"
					>
						+
					</button>
				</header>

				{/* ── Terminal Body ── */}
				<div className="terminal-body" style={{ maxHeight: '74vh', overflowY: 'auto', padding: '1.3rem 1.4rem' }}>
					{/* Legacy Sub-State View */}
					{activeTab === 'state' && selectedLegacyState ? (
						<div>
							<div className="terminal-heading">
								<p className="hud-kicker">
									<button
										type="button"
										className="quintesys-breadcrumb"
										onClick={() => setActiveTab('overview')}
									>
										QUINTESYS
									</button>{' '}
									/ {selectedLegacyState.label}
								</p>
								<h2 id="quintesys-experience-title">{selectedLegacyState.label}</h2>
								<p className="terminal-subtitle">{selectedLegacyState.subtitle}</p>
								<p className="terminal-description">{selectedLegacyState.whatBuilt}</p>
							</div>

							{selectedLegacyState.workItems && (
								<div className="quintesys-work-section">
									<p className="hud-kicker">WORK / SYSTEM</p>
									<div className={selectedLegacyState.workItems.length > 1 ? 'quintesys-work-grid is-split' : 'quintesys-work-grid'}>
										{selectedLegacyState.workItems.map((item) => (
											<div key={item.id} className="quintesys-work-card">
												<div className="quintesys-work-card-header">
													<strong>{item.title}</strong>
													<span>{item.subtitle}</span>
												</div>
												<div className="quintesys-work-fields">
													{item.fields.map((field) => (
														<div
															key={field.label}
															className={field.emphasis ? 'quintesys-work-field is-emphasis' : 'quintesys-work-field'}
														>
															<span className="quintesys-work-field-label">{field.label}</span>
															<span className="quintesys-work-field-value">{field.value}</span>
															{field.detail && <span className="quintesys-work-field-detail">{field.detail}</span>}
														</div>
													))}
												</div>
											</div>
										))}
									</div>
								</div>
							)}

							<div className={selectedLegacyState.pipeline ? 'terminal-grid' : 'terminal-grid quintesys-grid-single'}>
								<div className="terminal-specs">
									<dl>
										<dt>TECHNOLOGIES</dt>
										<dd className="tech-list">
											{selectedLegacyState.technologies.map((item) => (
												<span key={item}>{item}</span>
											))}
										</dd>
									</dl>
									{!selectedLegacyState.workItems && (
										<dl>
											<dt>IMPACT / RESULT</dt>
											<dd>{selectedLegacyState.impact}</dd>
										</dl>
									)}
								</div>
								{selectedLegacyState.pipeline && (
									<div className="architecture-panel">
										<div className="architecture-topline">
											<span>PIPELINE</span>
											<span>LIVE FLOW</span>
										</div>
										<div className="architecture-flow quintesys-pipeline-flow">
											{selectedLegacyState.pipeline.map(([label], index) => (
												<Fragment key={label}>
													<button
														type="button"
														className={stageIndex === index ? 'architecture-node is-selected' : 'architecture-node'}
														onClick={() => setStageIndex(index)}
													>
														<i />
														{label}
													</button>
													{index < selectedLegacyState.pipeline.length - 1 && (
														<span
															className="quintesys-pipeline-connector"
															style={{ animationDelay: `${index * 0.18}s` }}
															aria-hidden="true"
														/>
													)}
												</Fragment>
											))}
										</div>
										<div className="architecture-detail">
											<div>
												<span className="detail-kicker">SELECTED STAGE</span>
												<strong>{selectedLegacyState.pipeline[stageIndex]?.[0]}</strong>
											</div>
											<span>{selectedLegacyState.pipeline[stageIndex]?.[1]}</span>
										</div>
									</div>
								)}
							</div>
						</div>
					) : (
						/* ── PRIMARY 3-COLUMN QUINTESYS EXPERIENCE VIEW ── */
						<div>
							{/* Top Heading Banner */}
							<div style={{ marginBottom: '1.2rem', borderBottom: '1px solid rgba(53, 216, 255, 0.14)', paddingBottom: '0.9rem' }}>
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
									<div>
										<p className="hud-kicker" style={{ color: '#ffb45c', letterSpacing: '0.18em', margin: '0 0 0.2rem' }}>
											{data.kicker} // {data.company}
										</p>
										<h2 id="quintesys-experience-title" style={{ fontSize: '2.1rem', letterSpacing: '0.04em', margin: 0, color: '#FAF8F2' }}>
											{data.company}
										</h2>
									</div>

									<div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
										<div
											style={{
												display: 'inline-flex',
												alignItems: 'center',
												gap: '0.45rem',
												padding: '0.35rem 0.75rem',
												background: 'rgba(53, 216, 255, 0.08)',
												border: '1px solid rgba(53, 216, 255, 0.35)',
												borderRadius: '4px',
												fontFamily: 'DM Mono, monospace',
												fontSize: '0.62rem',
												color: '#35d8ff',
												letterSpacing: '0.1em'
											}}
										>
											<span>{data.role}</span>
											<span style={{ opacity: 0.4 }}>|</span>
											<span style={{ color: '#ffb45c' }}>{data.duration}</span>
										</div>
									</div>
								</div>
								<p style={{ color: '#9fbcd4', fontSize: '0.82rem', margin: '0.5rem 0 0', lineHeight: 1.5, maxWidth: '820px' }}>
									{data.intro}
								</p>
							</div>

							{/* 3 Main Columns Layout */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
									gap: '1.2rem',
									alignItems: 'start'
								}}
							>
								{/* ══════════════════════════════════════════════════════════
								    LEFT COLUMN: PROFESSIONAL EXPERIENCE & 4 PILLARS
								══════════════════════════════════════════════════════════ */}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '0.8rem',
										background: 'rgba(9, 16, 27, 0.65)',
										border: '1px solid rgba(53, 216, 255, 0.16)',
										borderRadius: '6px',
										padding: '1.0rem'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
										<span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', color: '#ffb45c' }}>
											01 &bull; ENGINEERING PILLARS
										</span>
										<span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: '#68849b' }}>
											CORE DISCIPLINES
										</span>
									</div>

									<p style={{ fontSize: '0.72rem', color: '#8faec7', lineHeight: 1.45, margin: '0 0 0.3rem' }}>
										Professional engineering practices applied across production systems, automation engines, and machine learning models.
									</p>

									<div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
										{data.pillars.map((pillar, idx) => (
											<div
												key={pillar.id}
												style={{
													padding: '0.75rem 0.85rem',
													background: 'rgba(15, 27, 43, 0.6)',
													border: '1px solid rgba(53, 216, 255, 0.14)',
													borderLeft: '3px solid #35d8ff',
													borderRadius: '4px'
												}}
											>
												<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
													{getPillarIcon(pillar.id)}
													<strong style={{ color: '#FAF8F2', fontSize: '0.76rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.04em' }}>
														{pillar.title}
													</strong>
												</div>
												<p style={{ margin: 0, fontSize: '0.68rem', color: '#9bb7cf', lineHeight: 1.45 }}>
													{pillar.detail}
												</p>
											</div>
										))}
									</div>
								</div>

								{/* ══════════════════════════════════════════════════════════
								    CENTER COLUMN: KEY WORK AREAS (COGNOS → POWER BI)
								══════════════════════════════════════════════════════════ */}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '0.85rem',
										background: 'rgba(9, 16, 27, 0.65)',
										border: '1px solid rgba(53, 216, 255, 0.16)',
										borderRadius: '6px',
										padding: '1.0rem'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
										<span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', color: '#35d8ff' }}>
											02 &bull; KEY WORK AREAS
										</span>
										<span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: '#68849b' }}>
											AUTOMATION
										</span>
									</div>

									<div>
										<h3 style={{ fontSize: '0.88rem', letterSpacing: '0.06em', color: '#FAF8F2', margin: '0 0 0.15rem', fontFamily: 'DM Mono, monospace' }}>
											{data.cognosAutomation.title}
										</h3>
										<p style={{ fontSize: '0.7rem', color: '#8faec7', margin: 0 }}>
											Dual automation workflows converting Cognos reports into Power BI Paginated and Desktop formats.
										</p>
									</div>

									{/* Sub-Stream A: Paginated Reports */}
									<div
										style={{
											padding: '0.8rem 0.9rem',
											background: 'rgba(15, 27, 43, 0.7)',
											border: '1px solid rgba(53, 216, 255, 0.2)',
											borderRadius: '4px'
										}}
									>
										<div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
											<span style={{ color: '#ffb45c', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'DM Mono, monospace' }}>
												A. {data.cognosAutomation.paginated.title}
											</span>
										</div>

										{/* Pipeline Steps Flow */}
										<div
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: '0.28rem',
												alignItems: 'center',
												margin: '0.45rem 0'
											}}
										>
											{data.cognosAutomation.paginated.pipeline.map((step, idx, arr) => (
												<div key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
													<span
														style={{
															fontSize: '0.52rem',
															fontFamily: 'DM Mono, monospace',
															color: idx === arr.length - 1 ? '#ffb45c' : '#b2d9f7',
															background: 'rgba(31, 57, 84, 0.55)',
															border: `1px solid ${idx === arr.length - 1 ? 'rgba(255, 180, 92, 0.5)' : 'rgba(53, 216, 255, 0.2)'}`,
															padding: '0.15rem 0.35rem',
															borderRadius: '2px',
															whiteSpace: 'nowrap'
														}}
													>
														{step}
													</span>
													{idx < arr.length - 1 && (
														<span style={{ color: '#4d7594', fontSize: '0.55rem' }}>&rarr;</span>
													)}
												</div>
											))}
										</div>

										<p style={{ fontSize: '0.67rem', color: '#9bb7cf', lineHeight: 1.45, margin: '0.4rem 0 0' }}>
											{data.cognosAutomation.paginated.summary}
										</p>
									</div>

									{/* Sub-Stream B: Power BI Desktop */}
									<div
										style={{
											padding: '0.8rem 0.9rem',
											background: 'rgba(15, 27, 43, 0.7)',
											border: '1px solid rgba(53, 216, 255, 0.2)',
											borderRadius: '4px'
										}}
									>
										<div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
											<span style={{ color: '#35d8ff', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'DM Mono, monospace' }}>
												B. {data.cognosAutomation.desktop.title}
											</span>
										</div>

										{/* Pipeline Steps Flow */}
										<div
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: '0.28rem',
												alignItems: 'center',
												margin: '0.45rem 0'
											}}
										>
											{data.cognosAutomation.desktop.pipeline.map((step, idx, arr) => (
												<div key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
													<span
														style={{
															fontSize: '0.52rem',
															fontFamily: 'DM Mono, monospace',
															color: idx === arr.length - 1 ? '#35d8ff' : '#b2d9f7',
															background: 'rgba(31, 57, 84, 0.55)',
															border: `1px solid ${idx === arr.length - 1 ? 'rgba(53, 216, 255, 0.5)' : 'rgba(53, 216, 255, 0.2)'}`,
															padding: '0.15rem 0.35rem',
															borderRadius: '2px',
															whiteSpace: 'nowrap'
														}}
													>
														{step}
													</span>
													{idx < arr.length - 1 && (
														<span style={{ color: '#4d7594', fontSize: '0.55rem' }}>&rarr;</span>
													)}
												</div>
											))}
										</div>

										<p style={{ fontSize: '0.67rem', color: '#9bb7cf', lineHeight: 1.45, margin: '0.4rem 0 0' }}>
											{data.cognosAutomation.desktop.summary}
										</p>
									</div>
								</div>

								{/* ══════════════════════════════════════════════════════════
								    RIGHT COLUMN: LLM / GENAI & SOFTWARE PRACTICE
								══════════════════════════════════════════════════════════ */}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '0.85rem',
										background: 'rgba(9, 16, 27, 0.65)',
										border: '1px solid rgba(53, 216, 255, 0.16)',
										borderRadius: '6px',
										padding: '1.0rem'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
										<span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.14em', color: '#a993ff' }}>
											03 &bull; LLM & SOFTWARE ENGINEERING
										</span>
										<span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.52rem', color: '#68849b' }}>
											MODELS & CODE
										</span>
									</div>

									{/* Section 1: LLM / GenAI Engineering */}
									<div
										style={{
											padding: '0.8rem 0.9rem',
											background: 'rgba(15, 27, 43, 0.7)',
											border: '1px solid rgba(169, 147, 255, 0.24)',
											borderRadius: '4px'
										}}
									>
										<span style={{ color: '#a993ff', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'DM Mono, monospace', display: 'block', marginBottom: '0.35rem' }}>
											{data.genaiEngineering.title}
										</span>

										{/* Pipeline steps */}
										<div
											style={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: '0.28rem',
												alignItems: 'center',
												margin: '0.45rem 0'
											}}
										>
											{data.genaiEngineering.pipeline.map((step, idx, arr) => (
												<div key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
													<span
														style={{
															fontSize: '0.52rem',
															fontFamily: 'DM Mono, monospace',
															color: idx === arr.length - 1 ? '#a993ff' : '#b2d9f7',
															background: 'rgba(31, 57, 84, 0.55)',
															border: `1px solid ${idx === arr.length - 1 ? 'rgba(169, 147, 255, 0.5)' : 'rgba(53, 216, 255, 0.2)'}`,
															padding: '0.15rem 0.35rem',
															borderRadius: '2px',
															whiteSpace: 'nowrap'
														}}
													>
														{step}
													</span>
													{idx < arr.length - 1 && (
														<span style={{ color: '#4d7594', fontSize: '0.55rem' }}>&rarr;</span>
													)}
												</div>
											))}
										</div>

										<p style={{ fontSize: '0.67rem', color: '#9bb7cf', lineHeight: 1.45, margin: '0.4rem 0 0.5rem' }}>
											{data.genaiEngineering.summary}
										</p>

										{/* Technologies */}
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.4rem' }}>
											{data.genaiEngineering.technologies.map((tech) => (
												<span
													key={tech}
													style={{
														fontSize: '0.52rem',
														fontFamily: 'DM Mono, monospace',
														color: '#a993ff',
														background: 'rgba(169, 147, 255, 0.1)',
														border: '1px solid rgba(169, 147, 255, 0.3)',
														padding: '0.12rem 0.4rem',
														borderRadius: '2px'
													}}
												>
													{tech}
												</span>
											))}
										</div>
									</div>

									{/* Section 2: Software Engineering Practice */}
									<div
										style={{
											padding: '0.8rem 0.9rem',
											background: 'rgba(15, 27, 43, 0.7)',
											border: '1px solid rgba(53, 216, 255, 0.2)',
											borderRadius: '4px'
										}}
									>
										<span style={{ color: '#69e3ff', fontSize: '0.74rem', fontWeight: 600, fontFamily: 'DM Mono, monospace', display: 'block', marginBottom: '0.35rem' }}>
											{data.softwareEngineering.title}
										</span>

										<p style={{ fontSize: '0.67rem', color: '#9bb7cf', lineHeight: 1.45, margin: '0 0 0.5rem' }}>
											{data.softwareEngineering.summary}
										</p>

										{/* Technologies */}
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
											{data.softwareEngineering.technologies.map((tech) => (
												<span
													key={tech}
													style={{
														fontSize: '0.52rem',
														fontFamily: 'DM Mono, monospace',
														color: '#69e3ff',
														background: 'rgba(53, 216, 255, 0.08)',
														border: '1px solid rgba(53, 216, 255, 0.28)',
														padding: '0.12rem 0.4rem',
														borderRadius: '2px'
													}}
												>
													{tech}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* ── Terminal Footer ── */}
				<footer className="terminal-footer" style={{ padding: '0.75rem 1.4rem' }}>
					<span style={{ color: '#8eaac2' }}>
						QUINTESYS // AI ENGINEERING INTERN <i /> PROFESSIONAL EXPERIENCE
					</span>
					<span style={{ color: '#ffb45c' }}>
						ESC <i /> CLOSE
					</span>
				</footer>
			</section>
		</div>
	)
}
