import { useState, useEffect } from 'react'
import {
	Briefcase,
	GraduationCap,
	Users,
	FileText,
	Send,
	ExternalLink,
	Mail,
	Github,
	Linkedin,
	MapPin,
	Check,
	Copy
} from 'lucide-react'
import { NEXT_CONTENT } from '../../data/nextData'

// ============================================================================
// CHAPTER 07 TERMINAL MODAL (WHAT'S NEXT)
// Focused terminal & responsive interface for a fresher / early-career engineer:
// - Header with Chapter 07 indicator, title, and close [×]
// - Grounded career aspiration statement
// - 3 structured cards: OPPORTUNITIES, LEARNING, LET'S CONNECT
// - Action buttons: [ VIEW RESUME ↗ ] & [ GET IN TOUCH ↗ ]
// - Contact section: Email (with Copy), GitHub (with Visit ↗), LinkedIn (with Visit ↗)
// - Accessible, mobile-responsive, keyboard Escape to close
// ============================================================================

export default function NextTerminalModal({ target, onClose }) {
	if (!target) return null

	const [showContactSheet, setShowContactSheet] = useState(target.openContact || false)
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		if (target.openContact) setShowContactSheet(true)
	}, [target])

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose?.()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onClose])

	const handleCopyEmail = (e) => {
		e.stopPropagation()
		navigator.clipboard?.writeText(NEXT_CONTENT.actions.contact.email)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const handleOpenResume = (e) => {
		e.stopPropagation()
		window.open(NEXT_CONTENT.actions.resume.url, '_blank', 'noopener,noreferrer')
	}

	const getCardIcon = (iconName, color) => {
		switch (iconName) {
			case 'briefcase': return <Briefcase size={18} style={{ color }} />
			case 'graduation': return <GraduationCap size={18} style={{ color }} />
			case 'users': return <Users size={18} style={{ color }} />
			default: return <Briefcase size={18} style={{ color }} />
		}
	}

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="next-terminal-title"
				onClick={(e) => e.stopPropagation()}
				style={{ maxWidth: '860px', width: '92vw', maxHeight: '88vh' }}
			>
				{/* ── Terminal Header ── */}
				<header className="terminal-header">
					<div>
						<span className="terminal-status">
							<i style={{ backgroundColor: '#00d2ff' }} />
							CHAPTER 07 // WHAT'S NEXT
						</span>
						<p>
							07 — {NEXT_CONTENT.title}
						</p>
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close modal"
					>
						+
					</button>
				</header>

				{/* ── Terminal Body ── */}
				<div
					className="terminal-body"
					style={{
						maxHeight: '78vh',
						overflowY: 'auto',
						paddingRight: '0.6rem',
						paddingBottom: '1.5rem',
					}}
				>
					{/* Heading */}
					<div className="terminal-heading">
						<p className="hud-kicker" style={{ color: '#00d2ff', letterSpacing: '0.16em', margin: 0 }}>
							CHAPTER 07 // {NEXT_CONTENT.title}
						</p>
						<h2
							id="next-terminal-title"
							style={{ fontSize: '1.7rem', letterSpacing: '0.04em', margin: '0.2rem 0 0.35rem', color: '#FAF8F2' }}
						>
							{NEXT_CONTENT.title}
						</h2>
						<div
							style={{
								fontFamily: 'DM Mono, monospace',
								fontSize: '0.88rem',
								color: '#9ecaff',
								marginBottom: '0.35rem',
								letterSpacing: '0.06em',
							}}
						>
							{NEXT_CONTENT.subtitle}
						</div>
					</div>

					{/* ── Main Career Statement Box ── */}
					<div
						style={{
							marginTop: '0.85rem',
							padding: '1.0rem 1.2rem',
							background: 'rgba(10, 18, 28, 0.85)',
							borderRadius: '8px',
							border: '1px solid rgba(168, 85, 247, 0.35)',
							borderLeft: '4px solid #a855f7',
						}}
					>
						<p style={{ margin: 0, color: '#d8e8f8', fontSize: '0.90rem', lineHeight: 1.65 }}>
							{NEXT_CONTENT.mainStatement}
						</p>
					</div>

					{/* ── 3 Action Cards ── */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))',
							gap: '0.75rem',
							marginTop: '1.15rem',
						}}
					>
						{NEXT_CONTENT.cards.map((card) => (
							<div
								key={card.number}
								style={{
									background: 'rgba(10, 16, 26, 0.60)',
									border: '1px solid rgba(255, 255, 255, 0.08)',
									borderTop: `2px solid ${card.accentColor}`,
									borderRadius: '6px',
									padding: '0.95rem 1.05rem',
								}}
							>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
									{getCardIcon(card.icon, card.accentColor)}
									<span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FAF8F2', fontFamily: 'monospace' }}>
										{card.title}
									</span>
								</div>
								<p style={{ margin: 0, fontSize: '0.80rem', color: '#9bb7d4', lineHeight: 1.55 }}>
									{card.description}
								</p>
							</div>
						))}
					</div>

					{/* ── Action Buttons ── */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
							gap: '0.75rem',
							marginTop: '1.25rem',
						}}
					>
						{/* VIEW RESUME BUTTON */}
						<button
							type="button"
							onClick={handleOpenResume}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '0.55rem',
								padding: '0.80rem 1.15rem',
								borderRadius: '6px',
								background: 'rgba(14, 26, 42, 0.90)',
								border: '1px solid #00d2ff',
								color: '#FAF8F2',
								fontFamily: 'Segoe UI, sans-serif',
								fontWeight: 600,
								fontSize: '0.86rem',
								letterSpacing: '0.08em',
								cursor: 'pointer',
								transition: 'all 0.18s ease',
							}}
						>
							<FileText size={16} style={{ color: '#00d2ff' }} />
							<span>VIEW RESUME</span>
							<ExternalLink size={14} style={{ color: '#00d2ff' }} />
						</button>

						{/* GET IN TOUCH BUTTON */}
						<button
							type="button"
							onClick={() => setShowContactSheet(!showContactSheet)}
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '0.55rem',
								padding: '0.80rem 1.15rem',
								borderRadius: '6px',
								background: 'linear-gradient(135deg, #7c3aed, #9333ea)',
								border: '1px solid #c084fc',
								color: '#FAF8F2',
								fontFamily: 'Segoe UI, sans-serif',
								fontWeight: 600,
								fontSize: '0.86rem',
								letterSpacing: '0.08em',
								cursor: 'pointer',
								transition: 'all 0.18s ease',
							}}
						>
							<Send size={15} />
							<span>GET IN TOUCH</span>
							<ExternalLink size={14} />
						</button>
					</div>

					{/* ── Expandable Contact Sheet ── */}
					{showContactSheet && (
						<div
							style={{
								marginTop: '1.15rem',
								padding: '1.05rem',
								borderRadius: '6px',
								background: 'rgba(12, 18, 28, 0.95)',
								border: '1px solid rgba(192, 132, 252, 0.4)',
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
								<span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#c084fc', textTransform: 'uppercase', fontFamily: 'monospace' }}>
									CONNECT WITH ME
								</span>
								<span style={{ fontSize: '0.68rem', color: '#8fa5bd', fontFamily: 'monospace' }}>
									📍 {NEXT_CONTENT.actions.contact.location}
								</span>
							</div>

							<div style={{ display: 'flex', flexDirection: 'column', gap: '0.60rem' }}>
								{/* Email Item */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '0.60rem 0.85rem',
										borderRadius: '4px',
										background: 'rgba(255, 255, 255, 0.03)',
										border: '1px solid rgba(255, 255, 255, 0.08)',
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
										<Mail size={15} style={{ color: '#00d2ff' }} />
										<a
											href={`mailto:${NEXT_CONTENT.actions.contact.email}`}
											style={{ color: '#FAF8F2', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'monospace' }}
										>
											{NEXT_CONTENT.actions.contact.email}
										</a>
									</div>
									<button
										type="button"
										onClick={handleCopyEmail}
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.35rem',
											padding: '0.25rem 0.55rem',
											borderRadius: '3px',
											background: 'rgba(255, 255, 255, 0.06)',
											border: '1px solid rgba(255, 255, 255, 0.12)',
											color: '#FAF8F2',
											fontSize: '0.72rem',
											cursor: 'pointer',
											fontFamily: 'monospace',
										}}
									>
										{copied ? <Check size={12} style={{ color: '#34d399' }} /> : <Copy size={12} />}
										<span>{copied ? 'Copied' : 'Copy'}</span>
									</button>
								</div>

								{/* GitHub Item */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '0.60rem 0.85rem',
										borderRadius: '4px',
										background: 'rgba(255, 255, 255, 0.03)',
										border: '1px solid rgba(255, 255, 255, 0.08)',
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
										<Github size={15} style={{ color: '#c084fc' }} />
										<a
											href={NEXT_CONTENT.actions.contact.github}
											target="_blank"
											rel="noopener noreferrer"
											style={{ color: '#FAF8F2', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'monospace' }}
										>
											{NEXT_CONTENT.actions.contact.githubDisplay}
										</a>
									</div>
									<a
										href={NEXT_CONTENT.actions.contact.github}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.35rem',
											padding: '0.25rem 0.55rem',
											borderRadius: '3px',
											background: 'rgba(255, 255, 255, 0.06)',
											border: '1px solid rgba(255, 255, 255, 0.12)',
											color: '#FAF8F2',
											fontSize: '0.72rem',
											textDecoration: 'none',
											fontFamily: 'monospace',
										}}
									>
										<span>Visit</span>
										<ExternalLink size={12} />
									</a>
								</div>

								{/* LinkedIn Item */}
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '0.60rem 0.85rem',
										borderRadius: '4px',
										background: 'rgba(255, 255, 255, 0.03)',
										border: '1px solid rgba(255, 255, 255, 0.08)',
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
										<Linkedin size={15} style={{ color: '#00d2ff' }} />
										<a
											href={NEXT_CONTENT.actions.contact.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											style={{ color: '#FAF8F2', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'monospace' }}
										>
											{NEXT_CONTENT.actions.contact.linkedinDisplay}
										</a>
									</div>
									<a
										href={NEXT_CONTENT.actions.contact.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '0.35rem',
											padding: '0.25rem 0.55rem',
											borderRadius: '3px',
											background: 'rgba(255, 255, 255, 0.06)',
											border: '1px solid rgba(255, 255, 255, 0.12)',
											color: '#FAF8F2',
											fontSize: '0.72rem',
											textDecoration: 'none',
											fontFamily: 'monospace',
										}}
									>
										<span>Visit</span>
										<ExternalLink size={12} />
									</a>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}
