import { useEffect } from 'react'
import {
	Cpu,
	Sparkles,
	Eye,
	Database,
	Server,
	BarChart3,
	Terminal,
	Layers,
	CheckCircle2,
} from 'lucide-react'
import { TOOLKIT_STATIONS_LIST, TOOLKIT_CORE } from '../../data/toolkitData'

// ============================================================================
// TOOLKIT STATION TERMINAL (CHAPTER 05 — THE ENGINEER'S TOOLKIT)
// Clean modal presenting verified engineering tools and production usage:
// - Whitelisted technologies only (zero inventions, zero buzzwords)
// - Real project contexts: Archiva, Sign & Expression Detection, Quintesys AI Migration
// - Plain clarification of pgvector (Quintesys enterprise migration, not Archiva)
// ============================================================================

export default function ToolkitStationTerminal({ target, onClose, onSelectStation }) {
	if (!target) return null

	const isCore = target.type === 'toolkit-core' || target.id === 'toolkit-core' || target.id === 'skills'
	const currentStation = isCore ? null : target

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose?.()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onClose])

	const getStationIcon = (number, accent = '#00d2ff') => {
		switch (number) {
			case '01': return <Cpu size={20} style={{ color: accent }} />
			case '02': return <Sparkles size={20} style={{ color: accent }} />
			case '03': return <Eye size={20} style={{ color: accent }} />
			case '04': return <Database size={20} style={{ color: accent }} />
			case '05': return <Server size={20} style={{ color: accent }} />
			case '06': return <BarChart3 size={20} style={{ color: accent }} />
			default: return <Layers size={20} style={{ color: accent }} />
		}
	}

	const accentColor = currentStation ? (currentStation.accentColor || '#00d2ff') : '#00d2ff'

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="toolkit-terminal-title"
				onClick={(e) => e.stopPropagation()}
				style={{ maxWidth: '920px', width: '92vw', maxHeight: '88vh' }}
			>
				{/* ── Terminal Header ── */}
				<header className="terminal-header">
					<div>
						<span className="terminal-status">
							<i style={{ backgroundColor: accentColor }} />
							CHAPTER 05 // THE ENGINEER&apos;S TOOLKIT
						</span>
						<p>
							{isCore
								? 'OVERVIEW // VERIFIED TECHNICAL STACK'
								: `${currentStation.number} — ${currentStation.title}`}
						</p>
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close toolkit terminal"
					>
						+
					</button>
				</header>

				{/* ── Terminal Body ── */}
				<div className="terminal-body" style={{ maxHeight: '78vh', overflowY: 'auto', paddingRight: '0.6rem', paddingBottom: '1.5rem' }}>
					{isCore ? (
						/* ── CORE CHAPTER OVERVIEW ── */
						<div>
							<div className="terminal-heading">
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
									<Layers size={22} style={{ color: '#00d2ff' }} />
									<p className="hud-kicker" style={{ color: '#00d2ff', letterSpacing: '0.16em', margin: 0 }}>
										CHAPTER 05 // ARCHITECTURAL OBSERVATORY
									</p>
								</div>
								<h2 id="toolkit-terminal-title" style={{ fontSize: '1.75rem', letterSpacing: '0.04em', margin: '0.2rem 0 0.35rem', color: '#FAF8F2' }}>
									{TOOLKIT_CORE.title}
								</h2>
								<div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.88rem', color: '#35d8ff', marginBottom: '0.35rem', letterSpacing: '0.08em' }}>
									{TOOLKIT_CORE.subtitle}
								</div>
								<p
									className="terminal-subtitle"
									style={{
										fontFamily: 'serif',
										fontStyle: 'italic',
										fontSize: '1.05rem',
										color: '#d6e4f0',
										lineHeight: 1.45,
										margin: '0.2rem 0 0.65rem',
									}}
								>
									&ldquo;{TOOLKIT_CORE.quote}&rdquo;
								</p>
							</div>

							<div
								style={{
									marginTop: '1.0rem',
									padding: '1.05rem 1.25rem',
									background: 'rgba(10, 18, 28, 0.85)',
									borderRadius: '8px',
									border: '1px solid rgba(0, 210, 255, 0.22)',
									borderLeft: '4px solid #00d2ff',
								}}
							>
								<p style={{ margin: 0, color: '#d0e1f3', fontSize: '0.92rem', lineHeight: 1.65 }}>
									{TOOLKIT_CORE.description}
								</p>
							</div>

							{/* 6 Core Engineering Categories Grid */}
							<div style={{ marginTop: '1.4rem' }}>
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
									<span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#90a8c2', textTransform: 'uppercase', fontFamily: 'monospace' }}>
										SIX CORE TECHNICAL DISCIPLINES
									</span>
									<span style={{ fontSize: '0.62rem', color: '#00d2ff', fontFamily: 'monospace' }}>
										SELECT A DISCIPLINE TO INSPECT
									</span>
								</div>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
										gap: '0.65rem',
									}}
								>
									{TOOLKIT_STATIONS_LIST.map((st) => (
										<button
											key={st.number}
											type="button"
											onClick={() => onSelectStation?.(st)}
											style={{
												background: 'rgba(12, 20, 32, 0.75)',
												border: `1px solid rgba(255, 255, 255, 0.08)`,
												borderLeft: `3px solid ${st.accentColor}`,
												borderRadius: '6px',
												padding: '0.85rem 0.95rem',
												textAlign: 'left',
												cursor: 'pointer',
												transition: 'all 0.18s ease',
											}}
										>
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
												<span style={{ fontSize: '0.68rem', fontFamily: 'monospace', color: st.accentColor, fontWeight: 700 }}>
													{st.number}
												</span>
												<span style={{ fontSize: '0.62rem', fontFamily: 'monospace', color: '#88a4c0', background: 'rgba(255,255,255,0.05)', padding: '0.15rem 0.4rem', borderRadius: '3px' }}>
													{st.technologies.length} TOOLS
												</span>
											</div>
											<div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FAF8F2', letterSpacing: '0.02em', marginBottom: '0.2rem' }}>
												{st.title}
											</div>
											<div style={{ fontSize: '0.70rem', color: '#96afc6' }}>
												{st.subtitle}
											</div>
										</button>
									))}
								</div>
							</div>

							{/* Secondary Supporting Section: Engineering Environment */}
							<div
								style={{
									marginTop: '1.45rem',
									paddingTop: '1.1rem',
									borderTop: '1px solid rgba(255, 255, 255, 0.08)',
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
									<span style={{ fontSize: '0.70rem', letterSpacing: '0.14em', color: '#8fa5bd', textTransform: 'uppercase', fontFamily: 'monospace' }}>
										ENGINEERING ENVIRONMENT
									</span>
									<span style={{ fontSize: '0.60rem', color: '#6884a0', fontFamily: 'monospace' }}>
										CORE WORKFLOW FOUNDATION
									</span>
								</div>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
										gap: '0.55rem',
									}}
								>
									{(TOOLKIT_CORE.engineeringEnvironment || [
										{ name: 'Git', role: 'Distributed version control & branch hygiene' },
										{ name: 'GitHub', role: 'Collaborative PR reviews & repository hosting' },
										{ name: 'VS Code', role: 'Primary development environment & tooling' },
										{ name: 'Docker', role: 'Runtime isolation & environment reproduction' },
									]).map((tool) => (
										<div
											key={tool.name}
											style={{
												background: 'rgba(10, 16, 26, 0.55)',
												border: '1px solid rgba(255, 255, 255, 0.06)',
												borderLeft: '2px solid #5b7590',
												borderRadius: '5px',
												padding: '0.65rem 0.80rem',
											}}
										>
											<div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
												<Terminal size={13} style={{ color: '#88a4c0' }} />
												<span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e0ecf7', fontFamily: 'monospace' }}>
													{tool.name}
												</span>
											</div>
											<div style={{ fontSize: '0.68rem', color: '#7e96af', lineHeight: 1.4 }}>
												{tool.role}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					) : (
						/* ── INDIVIDUAL STATION DETAIL ── */
						<div>
							<div className="terminal-heading">
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
									{getStationIcon(currentStation.number, accentColor)}
									<p className="hud-kicker" style={{ color: accentColor, letterSpacing: '0.16em', margin: 0 }}>
										{currentStation.stationLabel}
									</p>
								</div>
								<h2 id="toolkit-terminal-title" style={{ fontSize: '1.75rem', letterSpacing: '0.04em', margin: '0.2rem 0 0.35rem', color: '#FAF8F2' }}>
									{currentStation.title}
								</h2>
								<div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.85rem', color: currentStation.secondaryColor || '#80e5ff', marginBottom: '0.35rem', letterSpacing: '0.06em' }}>
									{currentStation.subtitle}
								</div>
							</div>

							{/* ── Summary Focus ── */}
							<div
								style={{
									marginTop: '0.9rem',
									padding: '0.95rem 1.15rem',
									background: 'rgba(10, 18, 28, 0.85)',
									borderRadius: '8px',
									border: `1px solid rgba(0, 210, 255, 0.18)`,
									borderLeft: `4px solid ${accentColor}`,
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
									<span style={{ fontSize: '0.70rem', letterSpacing: '0.14em', color: accentColor, textTransform: 'uppercase', fontFamily: 'monospace' }}>
										TECHNICAL OVERVIEW & CORE FUNCTION
									</span>
								</div>
								<p style={{ margin: 0, color: '#d0e1f3', fontSize: '0.90rem', lineHeight: 1.65 }}>
									{currentStation.summary}
								</p>
							</div>

							{/* ── Verified Technologies Pills ── */}
							<div style={{ marginTop: '1.35rem' }}>
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
									<span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#90a8c2', textTransform: 'uppercase', fontFamily: 'monospace' }}>
										VERIFIED TOOLS & FRAMEWORKS ({currentStation.technologies.length})
									</span>
									<span style={{ fontSize: '0.62rem', color: accentColor, fontFamily: 'monospace' }}>
										ZERO UNVERIFIED PACKAGES
									</span>
								</div>

								<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.50rem' }}>
									{currentStation.technologies.map((tech) => (
										<span
											key={tech}
											style={{
												fontSize: '0.80rem',
												padding: '0.40rem 0.85rem',
												background: 'rgba(0, 210, 255, 0.08)',
												border: `1px solid ${accentColor}44`,
												borderRadius: '5px',
												color: '#e5f4ff',
												fontFamily: 'monospace',
												fontWeight: 500,
												letterSpacing: '0.02em',
											}}
										>
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* ── Used Across Concrete Projects ── */}
							{currentStation.usedAcross && currentStation.usedAcross.length > 0 && (
								<div style={{ marginTop: '1.45rem' }}>
									<span style={{ fontSize: '0.72rem', letterSpacing: '0.14em', color: '#90a8c2', textTransform: 'uppercase', fontFamily: 'monospace', display: 'block', marginBottom: '0.65rem' }}>
										VERIFIED PRODUCTION & RESEARCH APPLICATION
									</span>

									<div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
										{currentStation.usedAcross.map((item, idx) => (
											<div
												key={idx}
												style={{
													padding: '0.90rem 1.10rem',
													background: 'rgba(12, 20, 32, 0.65)',
													borderRadius: '6px',
													border: '1px solid rgba(255, 255, 255, 0.07)',
													borderLeft: `3px solid ${accentColor}88`,
												}}
											>
												<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.30rem' }}>
													<CheckCircle2 size={15} style={{ color: accentColor }} />
													<strong style={{ fontSize: '0.88rem', color: '#FAF8F2', letterSpacing: '0.02em' }}>
														{item.project}
													</strong>
												</div>
												<p style={{ margin: 0, fontSize: '0.84rem', color: '#c4d7ea', lineHeight: 1.6 }}>
													{item.context}
												</p>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</section>
		</div>
	)
}

