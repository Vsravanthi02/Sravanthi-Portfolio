import { useState } from 'react'
import { AlertCircle, Search, Cpu, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

// ============================================================================
// SOLVE CHAMBER TERMINAL (CHAPTER 03 — THE SOLVE)
// Presents deep architectural problem-solving narratives:
// - The Core Engineering Problem & Failure Modes
// - Investigation, Hypothesis, and Technical Analysis
// - System Transformation: Noise → Signal → Insight / Failure → Resilient System
// - Engineering Principle & Verified Axiom
// - ZERO fake metrics, NO false claims, NO excluded technologies.
// ============================================================================

export default function SolveChamberTerminal({ chamber, onClose }) {
	if (!chamber) return null

	const {
		number,
		title,
		theme,
		inscription,
		quote,
		subtitle,
		summary,
		problem,
		investigation,
		transformation,
		engineeringPrinciple,
		technologies = [],
		pipeline = [],
		accentColor = '#35d8ff'
	} = chamber

	const [activeStageIndex, setActiveStageIndex] = useState(0)
	const stages = transformation?.stages || []
	const activeStage = stages[activeStageIndex] || stages[0]

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="solve-chamber-title"
				onClick={(e) => e.stopPropagation()}
				style={{ maxWidth: '880px', width: '92vw' }}
			>
				{/* ── Terminal Header ── */}
				<header className="terminal-header">
					<div>
						<span className="terminal-status">
							<i style={{ backgroundColor: accentColor }} /> THE SOLVE // PROBLEM INVESTIGATION
						</span>
						<p>{number} — {title}</p>
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close chamber terminal"
					>
						+
					</button>
				</header>

				{/* ── Terminal Body ── */}
				<div className="terminal-body" style={{ maxHeight: '74vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
					{/* Heading & Inscription */}
					<div className="terminal-heading">
						<p className="hud-kicker" style={{ color: accentColor, letterSpacing: '0.16em' }}>
							CHAMBER {number} // {theme}
						</p>
						<h2 id="solve-chamber-title" style={{ fontSize: '1.75rem', letterSpacing: '0.04em', margin: '0.2rem 0 0.4rem', color: '#FAF8F2' }}>
							{title}
						</h2>
						<p
							className="terminal-subtitle"
							style={{
								fontFamily: 'serif',
								fontStyle: 'italic',
								fontSize: '1.12rem',
								color: '#FAF8F2',
								lineHeight: 1.4,
								margin: '0.35rem 0 0.75rem'
							}}
						>
							&ldquo;{quote || inscription}&rdquo;
						</p>
						<p className="terminal-description" style={{ maxWidth: '800px', color: '#b9cde3', fontSize: '0.90rem', lineHeight: 1.6 }}>
							{summary}
						</p>
					</div>

					{/* ── 1. THE PROBLEM & UNCERTAINTY ── */}
					{problem && (
						<div
							style={{
								marginTop: '1.2rem',
								padding: '1.05rem 1.15rem',
								background: 'rgba(12, 20, 32, 0.75)',
								borderRadius: '4px',
								border: '1px solid rgba(255, 180, 92, 0.22)'
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
								<AlertCircle size={16} color="#ffb45c" />
								<span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', color: '#ffb45c', fontWeight: 600, textTransform: 'uppercase' }}>
									The Problem Under Investigation: {problem.title}
								</span>
							</div>
							<p style={{ fontSize: '0.84rem', color: '#dbe7f3', lineHeight: 1.6, margin: '0 0 0.85rem' }}>
								{problem.statement}
							</p>

							{problem.challenges && problem.challenges.length > 0 && (
								<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.6rem' }}>
									{problem.challenges.map((c, i) => (
										<div
											key={i}
											style={{
												padding: '0.6rem 0.75rem',
												background: 'rgba(255, 255, 255, 0.025)',
												border: '1px solid rgba(255, 255, 255, 0.07)',
												borderRadius: '3px'
											}}
										>
											<span style={{ display: 'block', fontSize: '0.72rem', color: accentColor, fontWeight: 600, letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
												{c.aspect}
											</span>
											<p style={{ margin: 0, fontSize: '0.78rem', color: '#a3bed8', lineHeight: 1.45 }}>
												{c.detail}
											</p>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{/* ── 2. INVESTIGATION & TECHNICAL ANALYSIS ── */}
					{investigation && (
						<div
							style={{
								marginTop: '1.0rem',
								padding: '1.05rem 1.15rem',
								background: 'rgba(10, 18, 28, 0.70)',
								borderRadius: '4px',
								border: '1px solid rgba(110, 231, 255, 0.18)'
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
								<Search size={16} color={accentColor} />
								<span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', color: accentColor, fontWeight: 600, textTransform: 'uppercase' }}>
									Investigation & Root Hypothesis
								</span>
							</div>

							<div style={{ marginBottom: '0.65rem', padding: '0.6rem 0.85rem', background: 'rgba(53, 216, 255, 0.04)', borderLeft: `2px solid ${accentColor}`, borderRadius: '2px' }}>
								<span style={{ fontSize: '0.70rem', color: '#6fe7ff', letterSpacing: '0.10em', display: 'block', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
									Key Question
								</span>
								<p style={{ margin: 0, fontSize: '0.84rem', color: '#FAF8F2', fontStyle: 'italic', lineHeight: 1.45 }}>
									&ldquo;{investigation.keyQuestion}&rdquo;
								</p>
							</div>

							<p style={{ fontSize: '0.82rem', color: '#abc4dc', lineHeight: 1.55, margin: 0 }}>
								{investigation.technicalAnalysis}
							</p>
						</div>
					)}

					{/* ── 3. SYSTEM TRANSFORMATION ── */}
					{transformation && (
						<div
							style={{
								marginTop: '1.0rem',
								padding: '1.05rem 1.15rem',
								background: 'rgba(12, 20, 32, 0.75)',
								borderRadius: '4px',
								border: '1px solid rgba(110, 231, 255, 0.18)'
							}}
						>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
									<Zap size={16} color="#ffb45c" />
									<span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', color: '#ffb45c', fontWeight: 600, textTransform: 'uppercase' }}>
										System Transformation Pipeline
									</span>
								</div>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#8da5be' }}>
									<span style={{ color: '#ff9070' }}>{transformation.from}</span>
									<ArrowRight size={12} color="#ffb45c" />
									<span style={{ color: '#35d8ff' }}>{transformation.to}</span>
								</div>
							</div>

							{/* Stage Pills */}
							{stages.length > 0 && (
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
									{stages.map((stage, idx) => {
										const isSelected = idx === activeStageIndex
										return (
											<button
												key={stage.label}
												type="button"
												onClick={() => setActiveStageIndex(idx)}
												style={{
													background: isSelected ? 'rgba(53, 216, 255, 0.20)' : 'rgba(255, 255, 255, 0.04)',
													border: isSelected ? `1px solid ${accentColor}` : '1px solid rgba(255, 255, 255, 0.10)',
													color: isSelected ? '#ffffff' : '#9bb0c6',
													padding: '0.38rem 0.68rem',
													fontSize: '0.78rem',
													letterSpacing: '0.05em',
													borderRadius: '3px',
													cursor: 'pointer',
													transition: 'all 0.2s ease'
												}}
											>
												<span style={{ color: isSelected ? accentColor : '#5f7893', marginRight: '0.35rem', fontWeight: 600 }}>
													0{idx + 1}.
												</span>
												{stage.label}
											</button>
										)
									})}
								</div>
							)}

							{/* Active Stage Details */}
							{activeStage && (
								<div
									style={{
										padding: '0.75rem 0.95rem',
										background: 'rgba(255, 255, 255, 0.025)',
										borderLeft: `2px solid ${accentColor}`,
										borderRadius: '2px',
										display: 'flex',
										flexDirection: 'column',
										gap: '0.4rem'
									}}
								>
									<div style={{ fontSize: '0.82rem', color: '#d8e8f8', lineHeight: 1.5 }}>
										<strong style={{ color: accentColor, marginRight: '0.4rem' }}>{activeStage.label}:</strong>
										{activeStage.logic}
									</div>
									<div style={{ display: 'flex', gap: '1.2rem', marginTop: '0.2rem', flexWrap: 'wrap', fontSize: '0.74rem' }}>
										<span style={{ color: '#8da5be' }}>
											<strong style={{ color: '#6fe7ff' }}>Input:</strong> {activeStage.input}
										</span>
										<span style={{ color: '#8da5be' }}>
											<strong style={{ color: '#ffb45c' }}>Output:</strong> {activeStage.output}
										</span>
									</div>
								</div>
							)}
						</div>
					)}

					{/* ── 4. ENGINEERING PRINCIPLE & AXIOM ── */}
					{engineeringPrinciple && (
						<div
							style={{
								marginTop: '1.0rem',
								padding: '1.05rem 1.15rem',
								background: 'linear-gradient(135deg, rgba(20, 24, 34, 0.8), rgba(28, 22, 14, 0.7))',
								borderRadius: '4px',
								border: '1px solid rgba(255, 180, 92, 0.28)'
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.55rem' }}>
								<ShieldCheck size={16} color="#ffb45c" />
								<span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', color: '#ffb45c', fontWeight: 600, textTransform: 'uppercase' }}>
									Core Engineering Principle
								</span>
							</div>

							<h4 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', color: '#FAF8F2', letterSpacing: '0.04em' }}>
								{engineeringPrinciple.name}
							</h4>
							<p style={{ margin: '0 0 0.6rem', fontSize: '0.84rem', color: '#ffc685', fontStyle: 'italic', lineHeight: 1.45 }}>
								&ldquo;{engineeringPrinciple.axiom}&rdquo;
							</p>
							<div style={{ fontSize: '0.78rem', color: '#c0d4e8', lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.25)', padding: '0.55rem 0.75rem', borderRadius: '3px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
								<strong style={{ color: '#FAF8F2', marginRight: '0.4rem' }}>Rule of Thumb:</strong>
								{engineeringPrinciple.ruleOfThumb}
							</div>
						</div>
					)}

					{/* ── 5. VERIFIED TECHNOLOGIES ── */}
					{technologies.length > 0 && (
						<div style={{ marginTop: '1.0rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
							<span style={{ fontSize: '0.72rem', color: '#7a94ad', letterSpacing: '0.10em', textTransform: 'uppercase', marginRight: '0.3rem' }}>
								Verified Stack:
							</span>
							{technologies.map((tech) => (
								<span
									key={tech}
									style={{
										fontSize: '0.72rem',
										fontFamily: 'monospace',
										background: 'rgba(53, 216, 255, 0.08)',
										border: '1px solid rgba(53, 216, 255, 0.24)',
										color: '#dff6ff',
										padding: '0.2rem 0.55rem',
										borderRadius: '2px'
									}}
								>
									{tech}
								</span>
							))}
						</div>
					)}

					{/* Terminal Action Buttons */}
					<div className="terminal-actions" style={{ marginTop: '1.4rem' }}>
						<button
							type="button"
							className="terminal-close-btn"
							onClick={onClose}
							style={{
								background: 'transparent',
								border: '1px solid rgba(255,255,255,0.18)',
								color: '#9cb0c4',
								padding: '0.65rem 1.25rem',
								fontSize: '0.78rem',
								letterSpacing: '0.1em',
								cursor: 'pointer'
							}}
						>
							RETURN TO ROTUNDA
						</button>
					</div>
				</div>

				{/* Terminal Footer */}
				<footer className="terminal-footer">
					<span>THE SOLVE <i /> PROBLEM INVESTIGATION &amp; ARCHITECTURAL REASONING</span>
					<span>ESC <i /> RETURN</span>
				</footer>
			</section>
		</div>
	)
}

