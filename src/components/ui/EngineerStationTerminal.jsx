import { useState, useEffect } from 'react'
import {
	CheckCircle2,
	ArrowRight,
	ShieldCheck,
	Workflow,
	FileText,
	LayoutDashboard,
	Cpu,
	Network,
	Terminal,
	Layers,
	Sparkles
} from 'lucide-react'

// ============================================================================
// ENGINEER STATION TERMINAL (CHAPTER 04 — THE ENGINEER)
// Presents real-world engineering practices and production contributions:
// - Station 01: "HOW I ENGINEER" (Consolidated 6-Phase Engineering Practice)
//     Understand → Collaborate → Design → Implement → Review & Test → Deliver
// - Stations 02-06: Dedicated Production Engineering Systems:
//     02: Cognos → Power BI: Paginated Reports (RDL Automation)
//     03: Cognos → Power BI: Desktop / Visuals (PBIP Visual JSON)
//     04: LLM / GenAI Engineering (QLoRA & Structured Validation)
//     05: AI Systems / Automation (Production APIs & Resilient Pipelines)
//     06: Software Engineering (Code Quality, Pytest & Docker)
// - ZERO fake metrics, NO false claims, NO excluded technologies.
// ============================================================================

export default function EngineerStationTerminal({ station, onClose, onNavigate }) {
	if (!station) return null

	const {
		id,
		number,
		title,
		subtitle,
		inscription,
		quote,
		whyItMatters,
		workflowSteps = [],
		pipeline = [],
		technologies = [],
		accentColor = '#35d8ff',
		secondaryColor = '#ffb45c'
	} = station

	const isHowIEngineer = id === 'how-i-engineer' || number === '01'
	const isCognosStation = id === 'cognos-paginated' || id === 'cognos-desktop' || number === '02' || number === '03'
	const [activeStepIndex, setActiveStepIndex] = useState(0)
	const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0)

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose?.()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onClose])

	const getStationIcon = (num) => {
		switch (num) {
			case '01': return <Workflow size={20} style={{ color: accentColor }} />
			case '02': return <FileText size={20} style={{ color: accentColor }} />
			case '03': return <LayoutDashboard size={20} style={{ color: accentColor }} />
			case '04': return <Cpu size={20} style={{ color: accentColor }} />
			case '05': return <Network size={20} style={{ color: accentColor }} />
			case '06': return <Terminal size={20} style={{ color: accentColor }} />
			default: return <ShieldCheck size={20} style={{ color: accentColor }} />
		}
	}

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="engineer-station-title"
				onClick={(e) => e.stopPropagation()}
				style={{ maxWidth: '920px', width: '92vw', maxHeight: '86vh' }}
			>
				{/* ── Terminal Header ── */}
				<header className="terminal-header">
					<div>
						<span className="terminal-status">
							<i style={{ backgroundColor: accentColor }} /> THE ENGINEER // {inscription}
						</span>
						<p>{number} — {title}</p>
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close station terminal"
					>
						+
					</button>
				</header>

				{/* ── Terminal Body ── */}
				<div className="terminal-body" style={{ maxHeight: '72vh', overflowY: 'auto', paddingRight: '0.6rem' }}>
					{/* Heading & Inscription */}
					<div className="terminal-heading">
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
							{getStationIcon(number)}
							<p className="hud-kicker" style={{ color: accentColor, letterSpacing: '0.16em', margin: 0 }}>
								STATION {number} // {inscription}
							</p>
						</div>
						<h2 id="engineer-station-title" style={{ fontSize: '1.75rem', letterSpacing: '0.04em', margin: '0.2rem 0 0.35rem', color: '#FAF8F2' }}>
							{title}
						</h2>
						{subtitle && (
							<div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.85rem', color: isHowIEngineer ? '#8bb5d4' : '#ffb45c', marginBottom: '0.35rem', letterSpacing: '0.06em' }}>
								{subtitle}
							</div>
						)}
						<p
							className="terminal-subtitle"
							style={{
								fontFamily: 'serif',
								fontStyle: 'italic',
								fontSize: '1.05rem',
								color: '#d6e4f0',
								lineHeight: 1.45,
								margin: '0.2rem 0 0.65rem'
							}}
						>
							&ldquo;{quote || subtitle}&rdquo;
						</p>
					</div>

					{/* ── 1. WHY IT MATTERS ── */}
					{whyItMatters && (
						<div
							style={{
								marginTop: isHowIEngineer ? '1.1rem' : '1.0rem',
								padding: isHowIEngineer ? '1.05rem 1.25rem' : '0.95rem 1.15rem',
								background: isHowIEngineer ? 'rgba(10, 18, 28, 0.85)' : 'rgba(12, 20, 32, 0.75)',
								borderRadius: '8px',
								border: `1px solid ${isHowIEngineer ? 'rgba(78, 174, 212, 0.25)' : 'rgba(53, 216, 255, 0.18)'}`,
								borderLeft: isHowIEngineer ? `4px solid ${accentColor}` : undefined
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
								<span style={{ fontSize: '0.70rem', letterSpacing: '0.14em', color: accentColor, textTransform: 'uppercase', fontFamily: 'monospace' }}>
									{isHowIEngineer ? 'WHY THIS MATTERS' : 'WHY THIS MATTERS IN PRACTICE'}
								</span>
							</div>
							<p style={{ margin: 0, color: '#d0e1f3', fontSize: isHowIEngineer ? '0.92rem' : '0.90rem', lineHeight: 1.65 }}>
								{whyItMatters}
							</p>
						</div>
					)}

					{/* ── 2. CONSOLIDATED 6-STEP WORKFLOW VIEW (FOR STATION 01) ── */}
					{isHowIEngineer && workflowSteps.length > 0 && (
						<div style={{ marginTop: '1.35rem' }}>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
								<span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#90a8c2', textTransform: 'uppercase', fontFamily: 'monospace' }}>
									THE 6-PHASE ENGINEERING PRACTICE
								</span>
								<span style={{ fontSize: '0.62rem', color: accentColor, fontFamily: 'monospace' }}>
									SELECT A PHASE TO INSPECT
								</span>
							</div>

							{/* Step Selector Tabs */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
									gap: '0.45rem',
									marginBottom: '0.85rem'
								}}
							>
								{workflowSteps.map((wf, idx) => {
									const isSelected = activeWorkflowIndex === idx
									return (
										<button
											key={idx}
											type="button"
											onClick={() => setActiveWorkflowIndex(idx)}
											style={{
												background: isSelected ? 'rgba(78, 174, 212, 0.18)' : 'rgba(12, 19, 30, 0.7)',
												border: `1px solid ${isSelected ? accentColor : 'rgba(255, 255, 255, 0.08)'}`,
												borderRadius: '6px',
												padding: '0.65rem 0.55rem',
												textAlign: 'left',
												cursor: 'pointer',
												transition: 'all 0.18s ease'
											}}
										>
											<div style={{ fontSize: '0.65rem', color: isSelected ? accentColor : '#7e96ad', fontFamily: 'monospace', fontWeight: 600 }}>
												{wf.step}
											</div>
											<div style={{ fontSize: '0.72rem', color: isSelected ? '#FAF8F2' : '#a2b9ce', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
												{wf.summary}
											</div>
										</button>
									)
								})}
							</div>

							{/* Active Step Detailed Card */}
							{workflowSteps[activeWorkflowIndex] && (
								<div
									style={{
										padding: '1.15rem 1.25rem',
										background: 'rgba(12, 22, 34, 0.90)',
										borderRadius: '6px',
										border: '1px solid rgba(78, 174, 212, 0.25)',
										borderLeft: `4px solid ${accentColor}`,
										minHeight: '85px'
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
										<strong style={{ fontSize: '0.96rem', color: '#FAF8F2', letterSpacing: '0.04em' }}>
											{workflowSteps[activeWorkflowIndex].step} — {workflowSteps[activeWorkflowIndex].summary}
										</strong>
									</div>
									<p style={{ margin: 0, fontSize: '0.90rem', color: '#c5d9ec', lineHeight: 1.65 }}>
										{workflowSteps[activeWorkflowIndex].detail}
									</p>
								</div>
							)}
						</div>
					)}

					{/* ── 3. PIPELINE FLOWCHART (STATIONS 02-06 ONLY) ── */}
					{!isHowIEngineer && pipeline.length > 0 && (
						<div style={{ marginTop: '1.3rem' }}>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
								<span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#90a8c2', textTransform: 'uppercase', fontFamily: 'monospace' }}>
									ENGINEERING WORKFLOW
								</span>
								<span style={{ fontSize: '0.62rem', color: '#88a2ba', fontFamily: 'monospace' }}>
									{pipeline.length} STAGES{pipeline.some((s) => s.detail) ? ' • CLICK TO INSPECT' : ''}
								</span>
							</div>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns: `repeat(auto-fit, minmax(${pipeline.length > 6 ? '95px' : '110px'}, 1fr))`,
									gap: '0.4rem',
									background: 'rgba(8, 14, 22, 0.6)',
									padding: '0.65rem',
									borderRadius: '8px',
									border: '1px solid rgba(255, 255, 255, 0.08)'
								}}
							>
								{pipeline.map((step, idx) => {
									const isSelected = activeStepIndex === idx
									return (
										<button
											key={step.id || idx}
											type="button"
											onClick={() => setActiveStepIndex(idx)}
											style={{
												background: isSelected ? 'rgba(53, 216, 255, 0.16)' : 'rgba(14, 22, 34, 0.7)',
												border: `1px solid ${isSelected ? accentColor : 'rgba(255, 255, 255, 0.08)'}`,
												borderRadius: '6px',
												padding: '0.5rem 0.35rem',
												textAlign: 'center',
												cursor: 'pointer',
												transition: 'all 0.18s ease'
											}}
										>
											<div style={{ fontSize: '0.62rem', color: isSelected ? accentColor : '#859cb4', fontFamily: 'monospace', marginBottom: '0.15rem' }}>
												0{idx + 1}
											</div>
											<div style={{ fontSize: '0.72rem', fontWeight: 600, color: isSelected ? '#FAF8F2' : '#b2c8de', letterSpacing: '0.03em', lineHeight: 1.25 }}>
												{step.label}
											</div>
										</button>
									)
								})}
							</div>

							{pipeline.some((s) => s.detail) && pipeline[activeStepIndex] && pipeline[activeStepIndex].detail && (
								<div
									style={{
										marginTop: '0.5rem',
										padding: '0.65rem 0.95rem',
										background: 'rgba(16, 25, 38, 0.65)',
										borderRadius: '6px',
										borderLeft: `3px solid ${accentColor}`,
										fontSize: '0.84rem',
										color: '#c5d9ec'
									}}
								>
									<strong style={{ color: '#FAF8F2' }}>{pipeline[activeStepIndex].label}:</strong>{' '}
									{pipeline[activeStepIndex].detail}
								</div>
							)}
						</div>
					)}

					{/* ── 4. VERIFIED TECHNOLOGIES & TOOLS (STATIONS 02-06 ONLY) ── */}
					{!isHowIEngineer && technologies.length > 0 && (
						<div style={{ marginTop: '1.3rem' }}>
							<p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#90a8c2', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: '0.5rem' }}>
								VERIFIED TOOLS & TECHNOLOGIES
							</p>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
								{technologies.map((tech, idx) => (
									<span
										key={idx}
										style={{
											fontSize: '0.78rem',
											padding: '0.35rem 0.75rem',
											background: 'rgba(53, 216, 255, 0.08)',
											border: '1px solid rgba(53, 216, 255, 0.24)',
											borderRadius: '4px',
											color: '#cbe7ff',
											fontFamily: 'monospace'
										}}
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				{/* ── Terminal Footer ── */}
				<footer
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '0.85rem 1.4rem',
						borderTop: '1px solid rgba(255, 255, 255, 0.08)',
						background: 'rgba(8, 12, 18, 0.95)'
					}}
				>
					<div style={{ fontSize: '0.75rem', color: '#7a90a6', fontFamily: 'monospace' }}>
						PRESS [ ESC ] OR CLOSE TO RETURN TO THE OBSERVATORY
					</div>
					<div style={{ display: 'flex', gap: '0.6rem' }}>
						<button
							type="button"
							className="primary-button"
							style={{ padding: '0.45rem 1.0rem', fontSize: '0.8rem' }}
							onClick={onClose}
						>
							CLOSE [ ESC ]
						</button>
					</div>
				</footer>
			</section>
		</div>
	)
}
