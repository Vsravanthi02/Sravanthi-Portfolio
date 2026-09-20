import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

// Display labels only — ids match src/data/destinations.js exactly so hash
// routing/fly-to navigation is untouched.
const links = [
	{ id: 'home', label: 'THE SPARK' },
	{ id: 'projects', label: 'THE BUILD' },
	{ id: 'experience', label: 'ENGINEER' },
	{ id: 'skills', label: 'TOOLKIT' },
	{ id: 'about', label: 'THE PERSON' },
	{ id: 'contact', label: "WHAT'S NEXT" },
]

function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const [activeId, setActiveId] = useState(() => window.location.hash.slice(1) || 'home')

	useEffect(() => {
		const handleHashChange = () => setActiveId(window.location.hash.slice(1) || 'home')
		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	const navigate = (event, id) => {
		event.preventDefault()
		window.location.hash = `#${id}`
		setIsOpen(false)
	}

	return (
		<header className="site-nav">
			<a className="brand-mark" href="#home" aria-label="Sravanthi Addagada home">
				SA<span>.</span>
			</a>
			<nav className={isOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
				{links.map((link) => (
					<a key={link.id} className={activeId === link.id ? 'is-active' : ''} href={`#${link.id}`} onClick={(event) => navigate(event, link.id)}>
						{link.label}
					</a>
				))}
			</nav>
			<button className="menu-toggle" type="button" aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? <X size={20} /> : <Menu size={20} />}
			</button>
		</header>
	)
}

export default Navbar
