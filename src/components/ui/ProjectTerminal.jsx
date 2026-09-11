import { useState } from 'react'
import { Github } from 'lucide-react'
import { archivaProject } from '../../data/projects'

const architecture = [
	['DOCUMENTS', 'Knowledge sources entering the system.'],
	['INGESTION', 'Processes and prepares content for retrieval.'],
	['RETRIEVAL', 'Finds relevant context for the current query.'],
	['AGENT', 'Coordinates reasoning and system actions.'],
	['REASON', 'Uses retrieved context to determine the next step.'],
	['RESPONSE', 'Produces a grounded answer.'],
]

function ProjectTerminal({ onClose }) {
	const [selectedNode, setSelectedNode] = useState(3)
	const selected = architecture[selectedNode]

	return (
		<div className="project-terminal-backdrop" role="presentation">
			<section className="project-terminal" role="dialog" aria-modal="true" aria-labelledby="archiva-title">
				<header className="terminal-header">
					<div><span className="terminal-status"><i /> SYSTEM ONLINE</span><p>ARCHIVA // RAG-01</p></div>
					<button className="terminal-close" type="button" onClick={onClose} aria-label="Close Archiva project terminal">+</button>
				</header>
				<div className="terminal-body">
					<div className="terminal-heading"><p className="hud-kicker">PROJECT LAB / 01</p><h2 id="archiva-title">{archivaProject.name}</h2><p className="terminal-subtitle">{archivaProject.title}</p><p className="terminal-description">{archivaProject.description}</p><div className="terminal-actions">{archivaProject.links.github && <a href={archivaProject.links.github} target="_blank" rel="noopener noreferrer"><Github size={14} /> VIEW SOURCE <span>↗</span></a>}</div></div>
					<div className="terminal-grid">
						<div className="terminal-specs">
							<div className="terminal-telemetry"><div><span>SYSTEM STATUS</span><strong><i /> ONLINE</strong></div><div><span>RAG PIPELINE</span><strong>ACTIVE</strong></div><div><span>KNOWLEDGE</span><strong>INDEXED</strong></div></div>
							<dl><dt>SYSTEM</dt><dd>{archivaProject.system}</dd></dl>
							<dl><dt>CORE</dt><dd>{archivaProject.core}</dd></dl>
							<dl><dt>PIPELINE</dt><dd>{archivaProject.pipeline.map((item, index) => <span key={item}>{index > 0 && ' → '}{item}</span>)}</dd></dl>
							<dl><dt>TECHNOLOGY</dt><dd className="tech-list">{archivaProject.technology.map((item) => <span key={item}>{item}</span>)}</dd></dl>
							<div className="capability-section"><p>SYSTEM CAPABILITIES</p><div>{archivaProject.capabilities.map(([label, detail]) => <dl key={label}><dt>{label}</dt><dd>{detail}</dd></dl>)}</div></div>
						</div>
						<div className="architecture-panel">
							<div className="architecture-topline"><span>ARCHITECTURE MAP</span><span>LIVE FLOW</span></div>
							<div className="architecture-flow">
								{architecture.map(([label], index) => <button key={label} type="button" className={selectedNode === index ? 'architecture-node is-selected' : 'architecture-node'} onClick={() => setSelectedNode(index)}><i />{label}{index < architecture.length - 1 && <b />}</button>)}
							</div>
							<div className="architecture-detail"><div><span className="detail-kicker">SELECTED STAGE</span><strong>{selected[0]}</strong></div><span>{selected[1]}</span></div>
						</div>
					</div>
				</div>
				<footer className="terminal-footer"><span>ARCHIVA // RAG-01 <i /> AGENTIC KNOWLEDGE SYSTEM</span><span>ESC <i /> CLOSE</span></footer>
			</section>
		</div>
	)
}

export default ProjectTerminal