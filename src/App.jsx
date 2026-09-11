import Navbar from './components/common/Navbar'
import Hero from './sections/Hero/Hero'

function App() {
	return (
		<div className="app-shell">
			<Navbar />
			<main>
				<Hero />
			</main>
		</div>
	)
}

export default App
