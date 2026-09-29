import { useState } from 'react'
import { ArrowUpRight, Github, CheckCircle2, RotateCcw, Cpu, Layers, ShieldCheck, Database, Sliders } from 'lucide-react'

// ============================================================================
// BUILD PROJECT TERMINAL
// Highly refined, architectural technical terminal for the two Build installations:
// 1. ARCHIVA (Self-Healing Agentic RAG Platform)
// 2. EXPRESSION & SIGN LANGUAGE DETECTION (Computer Vision / Human Perception)
// Accurately reflects actual repository architectures, pipelines, models, and code.
// ZERO invented metrics, NO false claims.
// ============================================================================

export default function BuildProjectTerminal({ project, onClose, onNavigate }) {
	if (!project) return null

	const {
		id,
		number,
		title,
		category,
		inscription,
		quote,
		summary,
		pipeline = [],
		technologies = [],
		capabilities = [],
		github,
		accentColor = '#35d8ff',
		secondaryColor = '#69e3ff',
		supportedIngestion = [],
		selfHealingActions = [],
		reflectionChecks = [],
		models = [],
		classes = [],
		modelArchitecture = null,
		testing = null,
		storageNote = null
	} = project

	const [selectedStepIndex, setSelectedStepIndex] = useState(0)
	const activeStep = pipeline[selectedStepIndex] || pipeline[0]

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="build-project-title"
				onClick={(e) => e.stopPropagation()}
				style={{ maxWidth: '860px', width: '92vw' }}
			>
				{/* Terminal Header */}
				<header className="terminal-header">
					<div>
						<span className="terminal-status">
							<i style={{ backgroundColor: accentColor }} /> THE BUILD // REPOSITORY ARCHITECTURE
						</span>
						<p>{number} — {title}</p>
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close project terminal"
					>
						+
					</button>
				</header>

				{/* Terminal Body */}
				<div className="terminal-body" style={{ maxHeight: '74vh', overflowY: 'auto', paddingRight: '0.5rem' }}>
					{/* Heading & Inscription */}
					<div className="terminal-heading">
						<p className="hud-kicker" style={{ color: accentColor, letterSpacing: '0.16em' }}>
							{category}
						</p>
						<h2 id="build-project-title" style={{ fontSize: '1.75rem', letterSpacing: '0.04em', margin: '0.2rem 0 0.4rem', color: '#FAF8F2' }}>
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
						<p className="terminal-description" style={{ maxWidth: '780px', color: '#b9cde3', fontSize: '0.90rem', lineHeight: 1.6 }}>
							{summary}
						</p>
					</div>

					{/* ── 1. PIPELINE FLOW SELECTOR ── */}
					{pipeline.length > 0 && (
						<div
							style={{
								marginTop: '1.3rem',
								padding: '1rem 1.15rem',
								background: 'rgba(12, 20, 32, 0.75)',
								borderRadius: '4px',
								border: '1px solid rgba(110, 231, 255, 0.16)'
							}}
						>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
								<p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: accentColor, margin: 0, textTransform: 'uppercase', fontWeight: 600 }}>
									Engineering Pipeline Execution Flow
								</p>
								<span style={{ fontSize: '0.72rem', color: '#7a94ad', letterSpacing: '0.06em' }}>
									STEP {selectedStepIndex + 1} OF {pipeline.length}
								</span>
							</div>

							{/* Step buttons */}
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
								{pipeline.map((step, idx) => {
									const isSelected = idx === selectedStepIndex
									return (
										<div key={step.id || step.label} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
											<button
												type="button"
												onClick={() => setSelectedStepIndex(idx)}
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
												{step.label}
											</button>
											{idx < pipeline.length - 1 && (
												<span style={{ color: 'rgba(110, 231, 255, 0.35)', fontSize: '0.75rem' }}>→</span>
											)}
										</div>
									)
								})}
							</div>

							{/* Active Step Details */}
							{activeStep && (
								<div
									style={{
										marginTop: '0.85rem',
										padding: '0.65rem 0.85rem',
										background: 'rgba(255, 255, 255, 0.025)',
										borderLeft: `2px solid ${accentColor}`,
										borderRadius: '2px'
									}}
								>
									<p style={{ margin: 0, fontSize: '0.84rem', color: '#d8e8f8', lineHeight: 1.55 }}>
										<strong style={{ color: accentColor, marginRight: '0.5rem', letterSpacing: '0.04em' }}>
											{activeStep.label}:
										</strong>
										{activeStep.detail}
									</p>
								</div>
							)}
						</div>
					)}

					{/* ── 2. ARCHIVA-SPECIFIC ARCHITECTURE DEEP-DIVE ── */}
					{id === 'archiva' && (
						<div style={{ marginTop: '1.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '0.85rem' }}>
							{/* Self-Healing Architecture Box */}
							<div
								style={{
									padding: '0.9rem 1.05rem',
									background: 'rgba(10, 18, 28, 0.7)',
									border: '1px solid rgba(255, 180, 92, 0.22)',
									borderRadius: '3px'
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
									<RotateCcw size={15} color="#ffb45c" />
									<span style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: '#ffb45c', fontWeight: 600, textTransform: 'uppercase' }}>
										Deterministic Reflection & Self-Healing Loop
									</span>
								</div>
								<p style={{ fontSize: '0.80rem', color: '#a8c1d9', margin: '0 0 0.5rem', lineHeight: 1.45 }}>
									When retrieval or response quality falls below verified thresholds, Archiva executes an automated recovery loop:
								</p>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.65rem' }}>
									<div style={{ fontSize: '0.76rem', color: '#d0e4f7' }}>
										<strong style={{ color: '#69e3ff' }}>Deterministic Checks:</strong> {reflectionChecks.join(' • ')}
									</div>
									<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.2rem' }}>
										{selfHealingActions.map((action) => (
											<span
												key={action}
												style={{
													fontSize: '0.72rem',
													fontFamily: 'monospace',
													background: 'rgba(255, 180, 92, 0.12)',
													border: '1px solid rgba(255, 180, 92, 0.35)',
													color: '#ffc98a',
													padding: '0.2rem 0.5rem',
													borderRadius: '2px'
												}}
											>
												{action}
											</span>
										))}
									</div>
								</div>
								<p style={{ fontSize: '0.74rem', color: '#7a96b0', margin: 0, fontStyle: 'italic' }}>
									Flow: LLM Reasoning → Reflection Fail → Root Cause Diagnosis → Corrective Action → Retry
								</p>
							</div>

							{/* Ingestion & Models Box */}
							<div
								style={{
									padding: '0.9rem 1.05rem',
									background: 'rgba(10, 18, 28, 0.7)',
									border: '1px solid rgba(110, 231, 255, 0.18)',
									borderRadius: '3px'
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
									<Cpu size={15} color="#35d8ff" />
									<span style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: '#35d8ff', fontWeight: 600, textTransform: 'uppercase' }}>
										Worker Models & Document Ingestion
									</span>
								</div>
								<div style={{ marginBottom: '0.6rem' }}>
									<span style={{ fontSize: '0.74rem', color: '#7e9cb8', display: 'block', marginBottom: '0.25rem' }}>
										Supported Document Formats:
									</span>
									<div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
										{supportedIngestion.map((ext) => (
											<span
												key={ext}
												style={{
													fontSize: '0.72rem',
													background: 'rgba(53, 216, 255, 0.08)',
													border: '1px solid rgba(53, 216, 255, 0.25)',
													color: '#d6f4ff',
													padding: '0.15rem 0.45rem',
													borderRadius: '2px',
													fontFamily: 'monospace'
												}}
											>
												{ext}
											</span>
										))}
									</div>
								</div>
								<div style={{ fontSize: '0.75rem', color: '#9bb2c9', lineHeight: 1.5 }}>
									{models.map((m) => (
										<div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '0.2rem 0' }}>
											<span style={{ color: '#d8ecfc', fontFamily: 'monospace' }}>{m.name}</span>
											<span style={{ color: '#7da0bd' }}>{m.role}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* ── 3. VISION-SPECIFIC ARCHITECTURE DEEP-DIVE ── */}
					{id === 'vision' && (
						<div style={{ marginTop: '1.2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '0.85rem' }}>
							{/* Neural Network Architecture Card */}
							<div
								style={{
									padding: '0.9rem 1.05rem',
									background: 'rgba(10, 18, 28, 0.7)',
									border: '1px solid rgba(110, 231, 255, 0.22)',
									borderRadius: '3px'
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.55rem' }}>
									<Layers size={15} color="#6fe7ff" />
									<span style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: '#6fe7ff', fontWeight: 600, textTransform: 'uppercase' }}>
										Dense Neural Network Architecture
									</span>
								</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.76rem', color: '#a0bcd4' }}>
									<div style={{ padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}>
										<strong style={{ color: '#ffffff' }}>Input:</strong> {modelArchitecture?.input}
									</div>
									<div style={{ padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}>
										<strong style={{ color: '#6fe7ff' }}>Layer 1:</strong> {modelArchitecture?.hidden1}
									</div>
									<div style={{ padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}>
										<strong style={{ color: '#6fe7ff' }}>Layer 2:</strong> {modelArchitecture?.hidden2}
									</div>
									<div style={{ padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '2px' }}>
										<strong style={{ color: '#ffffff' }}>Output:</strong> {modelArchitecture?.output}
									</div>
									<div style={{ marginTop: '0.3rem', fontSize: '0.73rem', color: '#7f9cb8', fontStyle: 'italic' }}>
										Training: {modelArchitecture?.optimizer} • {modelArchitecture?.loss} • {modelArchitecture?.epochs}
									</div>
								</div>
							</div>

							{/* Gesture & Expression Vocabulary Card */}
							<div
								style={{
									padding: '0.9rem 1.05rem',
									background: 'rgba(10, 18, 28, 0.7)',
									border: '1px solid rgba(110, 231, 255, 0.18)',
									borderRadius: '3px'
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.55rem' }}>
									<Sliders size={15} color="#b4f0ff" />
									<span style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: '#b4f0ff', fontWeight: 600, textTransform: 'uppercase' }}>
										Recognized Classes & Gestures
									</span>
								</div>
								<p style={{ fontSize: '0.76rem', color: '#90acc7', margin: '0 0 0.5rem' }}>
									MediaPipe Holistic extracts 3D face mesh + dual hand skeletons. Missing hand landmarks are zero-filled:
								</p>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxHeight: '115px', overflowY: 'auto' }}>
									{classes.map((cls) => (
										<span
											key={cls}
											style={{
												fontSize: '0.70rem',
												fontFamily: 'monospace',
												background: 'rgba(111, 231, 255, 0.08)',
												border: '1px solid rgba(111, 231, 255, 0.22)',
												color: '#c5f2ff',
												padding: '0.18rem 0.45rem',
												borderRadius: '2px'
											}}
										>
											{cls}
										</span>
									))}
								</div>
							</div>
						</div>
					)}

					{/* ── 4. ARCHITECTURAL CAPABILITIES GRID ── */}
					<div style={{ marginTop: '1.4rem' }}>
						<p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#8ca6c2', marginBottom: '0.65rem', textTransform: 'uppercase', fontWeight: 600 }}>
							Core Architectural Capabilities
						</p>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
							{capabilities.map(([capTitle, capDesc]) => (
								<div
									key={capTitle}
									style={{
										padding: '0.75rem 0.95rem',
										background: 'rgba(255, 255, 255, 0.03)',
										borderLeft: `2px solid ${accentColor}`,
										borderRadius: '2px'
									}}
								>
									<p style={{ margin: '0 0 0.25rem', fontSize: '0.78rem', letterSpacing: '0.06em', color: '#ffffff', fontWeight: 600 }}>
										{capTitle}
									</p>
									<p style={{ margin: 0, fontSize: '0.79rem', color: '#9bb2cb', lineHeight: 1.48 }}>
										{capDesc}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* ── 5. TECHNOLOGIES & FRAMEWORKS ── */}
					<div style={{ marginTop: '1.4rem' }}>
						<p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#8ca6c2', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>
							Technologies & Frameworks
						</p>
						<div className="tech-list" style={{ marginTop: '0.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
							{technologies.map((item) => (
								<span
									key={item}
									style={{
										border: `1px solid ${accentColor}35`,
										color: '#e0effa',
										padding: '0.3rem 0.65rem',
										fontSize: '0.76rem',
										background: 'rgba(255,255,255,0.02)',
										borderRadius: '2px'
									}}
								>
									{item}
								</span>
							))}
						</div>
						{testing && (
							<p style={{ margin: '0.65rem 0 0', fontSize: '0.75rem', color: '#7ea4c4' }}>
								<strong style={{ color: '#a0c6e8' }}>Test Coverage:</strong> {testing}
							</p>
						)}
						{storageNote && (
							<p style={{ margin: '0.35rem 0 0', fontSize: '0.74rem', color: '#6e8ea8', fontStyle: 'italic' }}>
								{storageNote}
							</p>
						)}
					</div>

					{/* ── 6. ACTIONS & GITHUB LINK ── */}
					<div style={{ marginTop: '1.6rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
						{github && (
							<a
								href={github}
								target="_blank"
								rel="noopener noreferrer"
								className="primary-button"
								style={{
									borderColor: accentColor,
									textDecoration: 'none',
									display: 'inline-flex',
									alignItems: 'center',
									gap: '0.5rem'
								}}
							>
								<Github size={15} />
								<span>VIEW REPO ON GITHUB</span>
								<ArrowUpRight size={15} strokeWidth={2} />
							</a>
						)}
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
							RETURN TO THE BUILD
						</button>
					</div>
				</div>

				{/* Terminal Footer */}
				<footer className="terminal-footer">
					<span>THE BUILD <i /> VERIFIED REPOSITORY SYSTEMS</span>
					<span>ESC <i /> RETURN</span>
				</footer>
			</section>
		</div>
	)
}
