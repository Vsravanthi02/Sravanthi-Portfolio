import { useState, useEffect } from 'react'
import {
	Compass,
	Heart,
	Flag,
	GraduationCap,
	Sparkles,
	BookOpen,
	Code2,
	TrendingUp,
	ArrowRight,
	ArrowLeft,
	Calendar,
	Award
} from 'lucide-react'
import { PERSON_DESTINATIONS } from '../../data/personData'

// ============================================================================
// PERSON TOPIC TERMINAL (CHAPTER 06 — THE PERSON)
// Calm, honest sanctuary modal for a fresher / recent graduate:
// - Header with Chapter 06 indicator, topic title, and close [×]
// - 3-Topic Switcher: 01. My Journey, 02. What I Enjoy, 03. Where I'm Headed
// - Section 01: Academic foundation (B.Tech KIET CGPA 7.18), College activities
//   during B.Tech (Dheeksharambh, Python TA), and 2026 AI Engineering Internship
// - Section 02: What I Enjoy with 3 simple visual cards (Learning, Building, Exploring)
// - Section 03: Where I'm Headed with 3 simple cards (Learn, Build, Grow)
// - Previous / Next topic pagination
// ============================================================================

export default function PersonTopicTerminal({ topic, onClose, onSelectTopic }) {
	if (!topic) return null

	// Default to topic 01 (journey) if opening general stage
	const initialId = topic.id === 'about' || !topic.number ? 'journey' : topic.id
	const [activeId, setActiveId] = useState(initialId)

	useEffect(() => {
		if (topic.id && topic.id !== 'about') {
			setActiveId(topic.id)
		}
	}, [topic])

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') onClose?.()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [onClose])

	const current = PERSON_DESTINATIONS.find((d) => d.id === activeId) || PERSON_DESTINATIONS[0]
	const currentIndex = PERSON_DESTINATIONS.findIndex((d) => d.id === current.id)
	const prevTopic = currentIndex > 0 ? PERSON_DESTINATIONS[currentIndex - 1] : null
	const nextTopic = currentIndex < PERSON_DESTINATIONS.length - 1 ? PERSON_DESTINATIONS[currentIndex + 1] : null

	const getTopicIcon = (type, size = 18, color = '#00d2ff') => {
		switch (type) {
			case 'compass':
				return <Compass size={size} style={{ color }} />
			case 'heart':
			case 'sparkles':
				return <Sparkles size={size} style={{ color }} />
			case 'flag':
				return <Flag size={size} style={{ color }} />
			default:
				return <Compass size={size} style={{ color }} />
		}
	}

	const accentColor = current.accentColor || '#00d2ff'

	return (
		<div className="project-terminal-backdrop" role="presentation" onClick={onClose}>
			<section
				className="project-terminal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="person-terminal-title"
				onClick={(e) => e.stopPropagation()}
				style={{ maxWidth: '840px', width: '92vw', maxHeight: '88vh' }}
			>
				{/* ── Terminal Header ── */}
				<header className="terminal-header">
					<div>
						<span className="terminal-status">
							<i style={{ backgroundColor: accentColor }} />
							CHAPTER 06 // THE PERSON
						</span>
						<p>
							{current.number} — {current.title}
						</p>
					</div>
					<button
						className="terminal-close"
						type="button"
						onClick={onClose}
						aria-label="Close person modal"
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
					{/* ── 3-Topic Switcher Bar ── */}
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(3, 1fr)',
							gap: '0.55rem',
							marginBottom: '1.25rem',
							paddingBottom: '0.85rem',
							borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
						}}
					>
						{PERSON_DESTINATIONS.map((d) => {
							const isActive = d.id === current.id
							return (
								<button
									key={d.id}
									type="button"
									onClick={() => {
										setActiveId(d.id)
										onSelectTopic?.(d)
									}}
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '0.45rem',
										padding: '0.60rem 0.75rem',
										borderRadius: '6px',
										background: isActive ? `${d.accentColor}18` : 'rgba(255, 255, 255, 0.03)',
										border: `1px solid ${isActive ? d.accentColor : 'rgba(255, 255, 255, 0.06)'}`,
										color: isActive ? '#FAF8F2' : '#88a4c0',
										fontFamily: 'monospace',
										fontSize: '0.78rem',
										cursor: 'pointer',
										transition: 'all 0.18s ease',
									}}
								>
									{getTopicIcon(d.iconType, 14, isActive ? d.accentColor : '#607b99')}
									<span style={{ fontWeight: isActive ? 600 : 400 }}>
										{d.number}. {d.shortTitle}
									</span>
								</button>
							)
						})}
					</div>

					{/* ── Topic Heading ── */}
					<div className="terminal-heading">
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem' }}>
							{getTopicIcon(current.iconType, 22, accentColor)}
							<p className="hud-kicker" style={{ color: accentColor, letterSpacing: '0.16em', margin: 0 }}>
								CHAPTER 06 // {current.number} {current.title}
							</p>
						</div>
						<h2
							id="person-terminal-title"
							style={{ fontSize: '1.7rem', letterSpacing: '0.04em', margin: '0.2rem 0 0.35rem', color: '#FAF8F2' }}
						>
							{current.title}
						</h2>
						<div
							style={{
								fontFamily: 'DM Mono, monospace',
								fontSize: '0.88rem',
								color: current.secondaryColor || '#80e5ff',
								marginBottom: '0.35rem',
								letterSpacing: '0.06em',
							}}
						>
							{current.subtitle}
						</div>
					</div>

					{/* ── SECTION 01: MY JOURNEY ── */}
					{current.id === 'journey' && (
						<div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem', marginTop: '1rem' }}>
							{/* Academic Foundation Card */}
							<div
								style={{
									background: 'rgba(10, 18, 28, 0.85)',
									borderRadius: '8px',
									border: `1px solid ${accentColor}33`,
									borderLeft: `4px solid ${accentColor}`,
									padding: '1.1rem 1.25rem',
								}}
							>
								<div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
									<div>
										<span style={{ fontSize: '0.70rem', letterSpacing: '0.12em', color: accentColor, textTransform: 'uppercase', fontFamily: 'monospace' }}>
											ACADEMIC FOUNDATION
										</span>
										<h3 style={{ margin: '0.25rem 0 0.15rem', fontSize: '1.05rem', color: '#FAF8F2' }}>
											{current.education.degree}
										</h3>
										<p style={{ margin: 0, fontSize: '0.82rem', color: '#8aa3bd' }}>
											{current.education.institution}
										</p>
									</div>
									<span
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											padding: '0.25rem 0.65rem',
											borderRadius: '4px',
											background: `${accentColor}18`,
											border: `1px solid ${accentColor}44`,
											color: '#FAF8F2',
											fontSize: '0.78rem',
											fontFamily: 'monospace',
											fontWeight: 600,
										}}
									>
										CGPA: {current.education.cgpa}
									</span>
								</div>

								<p style={{ margin: '0.75rem 0 0', color: '#d0e1f3', fontSize: '0.88rem', lineHeight: 1.65 }}>
									{current.intro}
								</p>
							</div>

							{/* College Activities */}
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
									<GraduationCap size={15} style={{ color: accentColor }} />
									<span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#8fa5bd', textTransform: 'uppercase', fontFamily: 'monospace' }}>
										COLLEGE ACTIVITIES
									</span>
								</div>

								<div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
									{current.collegeActivities.map((act, idx) => (
										<div
											key={idx}
											style={{
												background: 'rgba(10, 16, 26, 0.60)',
												border: '1px solid rgba(255, 255, 255, 0.07)',
												borderRadius: '6px',
												padding: '0.85rem 1rem',
											}}
										>
											<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.35rem' }}>
												<span
													style={{
														padding: '0.15rem 0.45rem',
														borderRadius: '3px',
														background: 'rgba(255, 255, 255, 0.06)',
														border: '1px solid rgba(255, 255, 255, 0.12)',
														color: '#FAF8F2',
														fontSize: '0.70rem',
														fontFamily: 'monospace',
													}}
												>
													{act.year}
												</span>
												<span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FAF8F2', fontFamily: 'monospace' }}>
													{act.title}
												</span>
												{act.role && (
													<span style={{ fontSize: '0.74rem', color: accentColor, fontFamily: 'monospace' }}>
														// {act.role}
													</span>
												)}
											</div>
											<p style={{ margin: 0, fontSize: '0.82rem', color: '#a0b6cd', lineHeight: 1.55 }}>
												{act.description}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Early Experience / 2026 Internship */}
							<div>
								<div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
									<Calendar size={15} style={{ color: accentColor }} />
									<span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#8fa5bd', textTransform: 'uppercase', fontFamily: 'monospace' }}>
										EARLY EXPERIENCE
									</span>
								</div>

								<div
									style={{
										background: 'rgba(10, 16, 26, 0.60)',
										border: '1px solid rgba(255, 255, 255, 0.07)',
										borderRadius: '6px',
										padding: '0.85rem 1rem',
									}}
								>
									<div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.35rem' }}>
										<span
											style={{
												padding: '0.15rem 0.45rem',
												borderRadius: '3px',
												background: 'rgba(255, 255, 255, 0.06)',
												border: '1px solid rgba(255, 255, 255, 0.12)',
												color: '#FAF8F2',
												fontSize: '0.70rem',
												fontFamily: 'monospace',
											}}
										>
											{current.internship.year}
										</span>
										<span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FAF8F2', fontFamily: 'monospace' }}>
											{current.internship.title}
										</span>
									</div>
									<p style={{ margin: 0, fontSize: '0.82rem', color: '#a0b6cd', lineHeight: 1.55 }}>
										{current.internship.description}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* ── SECTION 02: WHAT I ENJOY ── */}
					{current.id === 'enjoy' && (
						<div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
							{/* Grounded Intro Text */}
							<div
								style={{
									padding: '0.95rem 1.15rem',
									background: 'rgba(10, 18, 28, 0.85)',
									borderRadius: '8px',
									border: `1px solid ${accentColor}33`,
									borderLeft: `4px solid ${accentColor}`,
								}}
							>
								<p style={{ margin: 0, color: '#d0e1f3', fontSize: '0.92rem', lineHeight: 1.65 }}>
									{current.intro}
								</p>
							</div>

							{/* 3 Simple Visual Cards: LEARNING, BUILDING, EXPLORING */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
									gap: '0.85rem',
								}}
							>
								{current.cards.map((card, idx) => {
									const getCardIcon = (title) => {
										if (title === 'LEARNING') return <BookOpen size={16} style={{ color: accentColor }} />
										if (title === 'BUILDING') return <Code2 size={16} style={{ color: accentColor }} />
										return <Compass size={16} style={{ color: accentColor }} />
									}

									return (
										<div
											key={idx}
											style={{
												background: 'rgba(10, 16, 26, 0.55)',
												border: '1px solid rgba(255, 255, 255, 0.08)',
												borderTop: `2px solid ${accentColor}`,
												borderRadius: '6px',
												padding: '1.05rem 1.1rem',
											}}
										>
											<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
												{getCardIcon(card.title)}
												<span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FAF8F2', fontFamily: 'monospace' }}>
													{card.title}
												</span>
											</div>
											<p style={{ margin: 0, fontSize: '0.82rem', color: '#9bb7d4', lineHeight: 1.6 }}>
												{card.description}
											</p>
										</div>
									)
								})}
							</div>
						</div>
					)}

					{/* ── SECTION 03: WHERE I'M HEADED ── */}
					{current.id === 'headed' && (
						<div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
							{/* Grounded Intro Text */}
							<div
								style={{
									padding: '0.95rem 1.15rem',
									background: 'rgba(10, 18, 28, 0.85)',
									borderRadius: '8px',
									border: `1px solid ${accentColor}33`,
									borderLeft: `4px solid ${accentColor}`,
								}}
							>
								<p style={{ margin: 0, color: '#d0e1f3', fontSize: '0.92rem', lineHeight: 1.65 }}>
									{current.intro}
								</p>
							</div>

							{/* 3 Simple Visual Cards: LEARN, BUILD, GROW */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
									gap: '0.85rem',
								}}
							>
								{current.cards.map((card, idx) => {
									const getCardIcon = (title) => {
										if (title === 'LEARN') return <BookOpen size={16} style={{ color: accentColor }} />
										if (title === 'BUILD') return <Code2 size={16} style={{ color: accentColor }} />
										return <TrendingUp size={16} style={{ color: accentColor }} />
									}

									return (
										<div
											key={idx}
											style={{
												background: 'rgba(10, 16, 26, 0.55)',
												border: '1px solid rgba(255, 255, 255, 0.08)',
												borderTop: `2px solid ${accentColor}`,
												borderRadius: '6px',
												padding: '1.05rem 1.1rem',
											}}
										>
											<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
												{getCardIcon(card.title)}
												<span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FAF8F2', fontFamily: 'monospace' }}>
													{card.title}
												</span>
											</div>
											<p style={{ margin: 0, fontSize: '0.82rem', color: '#9bb7d4', lineHeight: 1.6 }}>
												{card.description}
											</p>
										</div>
									)
								})}
							</div>
						</div>
					)}

					{/* ── Pagination Footer: Previous / Next ── */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: '1.85rem',
							paddingTop: '1.15rem',
							borderTop: '1px solid rgba(255, 255, 255, 0.08)',
						}}
					>
						{prevTopic ? (
							<button
								type="button"
								onClick={() => {
									setActiveId(prevTopic.id)
									onSelectTopic?.(prevTopic)
								}}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.45rem',
									background: 'rgba(255, 255, 255, 0.04)',
									border: '1px solid rgba(255, 255, 255, 0.08)',
									borderRadius: '5px',
									padding: '0.50rem 0.85rem',
									color: '#b0c7de',
									fontFamily: 'monospace',
									fontSize: '0.74rem',
									cursor: 'pointer',
								}}
							>
								<ArrowLeft size={13} />
								<span>
									{prevTopic.number}. {prevTopic.shortTitle}
								</span>
							</button>
						) : (
							<div />
						)}

						{nextTopic ? (
							<button
								type="button"
								onClick={() => {
									setActiveId(nextTopic.id)
									onSelectTopic?.(nextTopic)
								}}
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.45rem',
									background: 'rgba(255, 255, 255, 0.04)',
									border: `1px solid ${nextTopic.accentColor}55`,
									borderRadius: '5px',
									padding: '0.50rem 0.85rem',
									color: '#FAF8F2',
									fontFamily: 'monospace',
									fontSize: '0.74rem',
									cursor: 'pointer',
								}}
							>
								<span>
									{nextTopic.number}. {nextTopic.shortTitle}
								</span>
								<ArrowRight size={13} style={{ color: nextTopic.accentColor }} />
							</button>
						) : (
							<div />
						)}
					</div>
				</div>
			</section>
		</div>
	)
}
