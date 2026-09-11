import { ArrowUpRight } from 'lucide-react'

function Button({ children, href = '#projects' }) {
	return (
		<a className="primary-button" href={href}>
			<span>{children}</span>
			<ArrowUpRight size={17} strokeWidth={1.8} />
		</a>
	)
}

export default Button
