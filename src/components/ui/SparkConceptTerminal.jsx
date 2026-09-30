import { ArrowUpRight } from 'lucide-react'

// ============================================================================
// SPARK CONCEPT TERMINAL
// Cinematic, architectural concept layer displayed when interacting with a
// question station. Cleanly bridges the philosophical question into Sravanthi's
// engineering systems and provides direct navigation into the corresponding chapter.
// ============================================================================

export default function SparkConceptTerminal({ question, onClose, onNavigate }) {
	if (!question) return null

	const {
		number,
		title,
		theme,
		work,
		question: questionText,
		conceptSummary,
		metadata,
		targetStage,
		targetStateId,
		targetDestinationId,
		targetLabel,
		accentColor
	} = question

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="spark-concept-title"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Terminal Header */}
				<header className="terminal-header">
					<div>
						<span className="terminal-status"><i /> THE SPARK // CONCEPT LAYER</span>
						<p>{number} — {title}</p>
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close concept terminal"
					>
						+
					</button>
				</header>

				{/* Terminal Body */}
				<div className="terminal-body">
					<div className="terminal-heading">
						<p className="hud-kicker" style={{ color: accentColor }}>THE QUESTION // {number} {theme ? `// ${theme.toUpperCase()}` : ''}</p>
						<h2 id="spark-concept-title">{title}</h2>
						{work && <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', color: '#8db7d8', margin: '0.25rem 0' }}>{work.toUpperCase()}</p>}
						<p
							className="terminal-subtitle"
							style={{
								fontFamily: 'serif',
								fontStyle: 'italic',
								fontSize: '1.25rem',
								color: '#FAF8F2',
								lineHeight: 1.45,
								margin: '0.6rem 0 1rem'
							}}
						>
							&ldquo;{questionText}&rdquo;
						</p>
						<p className="terminal-description" style={{ maxWidth: '640px' }}>
							{conceptSummary}
						</p>
					</div>

					<div className="terminal-grid" style={{ gridTemplateColumns: '1fr', marginTop: '1.2rem' }}>
						<div className="terminal-specs">
							<dl>
								<dt>DOMAINS & SYSTEMS</dt>
								<dd className="tech-list">
									{metadata.map((item) => (
										<span key={item} style={{ borderColor: `${accentColor}40`, color: '#e0effa' }}>
											{item}
										</span>
									))}
								</dd>
							</dl>

							<div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
								<button
									type="button"
									className="primary-button"
									onClick={() => {
										onClose?.()
										onNavigate?.(targetDestinationId || targetStateId || targetStage, targetStateId)
									}}
									style={{ borderColor: accentColor }}
								>
									<span>{targetLabel}</span>
									<ArrowUpRight size={17} strokeWidth={1.8} />
								</button>
								<button
									type="button"
									className="terminal-close-btn"
									onClick={onClose}
									style={{
										background: 'transparent',
										border: '1px solid rgba(255,255,255,0.15)',
										color: '#9cb0c4',
										padding: '0.65rem 1.2rem',
										fontSize: '0.78rem',
										letterSpacing: '0.1em',
										cursor: 'pointer'
									}}
								>
									RETURN TO SPARK
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Terminal Footer */}
				<footer className="terminal-footer">
					<span>THE SPARK <i /> QUESTIONS. CURIOSITY. POSSIBILITIES.</span>
					<span>ESC <i /> RETURN</span>
				</footer>
			</section>
		</div>
	)
}

