// The single source of truth for the world map, navigation, and continent metadata.
export const destinations = [
	{
		id: 'home', label: 'HOME', name: 'HOME', worldName: 'ORIGIN', type: 'continent',
		description: 'The starting point of Sravanthi Planet.', detail: 'ORIGIN — the home continent.',
		position: [0, 0, 0], arrival: [0, 0, 0.65], lookAt: [0, 1.15, -2.4],
		colorTheme: '#78d9b0', terrain: 'origin', regions: [],
	},
	{
		id: 'about', label: 'ABOUT', name: 'ABOUT', worldName: 'IDENTITY CONTINENT', type: 'continent',
		description: 'A continent for the person behind the systems.', detail: 'IDENTITY CONTINENT',
		position: [-8, 0, -4], arrival: [-6.8, 0, -2.8], lookAt: [-8, 1.15, -4],
		colorTheme: '#8bb9d6', terrain: 'ridge', regions: [],
	},
	{
		id: 'experience', label: 'EXPERIENCE', name: 'EXPERIENCE', worldName: 'QUINTESYS CONTINENT', type: 'continent',
		description: 'Professional AI, GenAI, automation and data engineering experience.', detail: 'QUINTESYS\nAI ENGINEERING CONTINENT',
		position: [8, 0, -5], arrival: [6.9, 0, -3.8], lookAt: [8, 1.2, -5],
		colorTheme: '#63e6ff', terrain: 'delta',
		stateIds: ['genai-state', 'ai-systems-state', 'agent-systems-state', 'bi-automation-state'],
	},
	{
		id: 'projects', label: 'PROJECTS', name: 'PROJECTS', worldName: 'ARCHIVA CONTINENT', type: 'continent',
		description: 'ARCHIVA — an agentic RAG project continent.', detail: 'ARCHIVA\nAGENTIC RAG CONTINENT',
		position: [0, 0, 9], arrival: [0, 0, 7.3], lookAt: [0, 1.4, 9],
		colorTheme: '#b39cff', terrain: 'mesa', regions: [{ id: 'archiva', name: 'ARCHIVA', status: 'active' }],
	},
	{
		id: 'skills', label: 'SKILLS', name: 'SKILLS', worldName: 'AI CAPABILITY CONTINENT', type: 'continent',
		description: 'A continent for tools, methods, and capabilities.', detail: 'AI CAPABILITY CONTINENT',
		position: [-7, 0, 6], arrival: [-5.6, 0, 5], lookAt: [-7, 1.15, 6],
		colorTheme: '#70b9ff', terrain: 'terraces', regions: [],
	},
	{
		id: 'contact', label: 'CONTACT', name: 'CONTACT', worldName: 'COMMUNICATIONS CONTINENT', type: 'continent',
		description: 'A continent for opening a new channel.', detail: 'COMMUNICATIONS CONTINENT',
		position: [8, 0, 6], arrival: [6.6, 0, 5], lookAt: [8, 1.15, 6],
		colorTheme: '#6ff0d0', terrain: 'coast', regions: [],
	},
]

export const destinationById = Object.fromEntries(destinations.map((destination) => [destination.id, destination]))
