import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact']

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
					<a key={link} className={activeId === (link === 'Home' ? 'home' : link.toLowerCase()) ? 'is-active' : ''} href={link === 'Home' ? '#home' : `#${link.toLowerCase()}`} onClick={(event) => navigate(event, link === 'Home' ? 'home' : link.toLowerCase())}>
						{link}
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
