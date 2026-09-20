// The single source of truth for the world path and stage metadata.
// "Walk Through The Work": one continuous architectural spine, not a planet of
// continents. The 6 anchors below trace a single gently-curving arc (each leg
// ~14-16 units, each turn ~30-40 degrees — no hairpins, no long dead stretches)
// that src/components/three/Pathway.jsx follows with a CatmullRomCurve3 ribbon.
// `experience`'s position moved from its old planet-layout spot to fit this arc;
// src/data/geography.js's Quintesys sub-geography (core + 4 states) was moved by
// the exact same rigid (dx, 0, dz) translation, so its internal layout/spacing
// is byte-identical, just relocated onto the spine. See the comment there.
export const destinations = [
	{
		id: 'home', label: 'THE SPARK', name: 'THE SPARK', worldName: 'THE SPARK', type: 'stage',
		description: 'I turn ideas into intelligent systems.', detail: 'Where every build starts.',
		position: [0, 0, 5.0], arrival: [0, 0, -5], lookAt: [0, 2.6, 12],
		colorTheme: '#78d9b0', terrain: 'origin', regions: [],
	},
	{
		id: 'projects', label: 'THE BUILD', name: 'THE BUILD', worldName: 'THE BUILD', type: 'stage',
		description: 'Ideas become working systems.', detail: 'ARCHIVA — an agentic RAG platform, walked as a flowing knowledge system.',
		position: [0, 0, 16], arrival: [0, 0, 14.5], lookAt: [0, 1.3, 16],
		colorTheme: '#b39cff', terrain: 'mesa', regions: [{ id: 'archiva', name: 'ARCHIVA', status: 'active' }],
	},
	{
		// Moved from the old [8,0,-5] to fit the new arc — see file header.
		// src/data/geography.js was translated by the same (+0.6, 0, +33.3) delta.
		id: 'experience', label: 'ENGINEER', name: 'ENGINEER', worldName: 'ENGINEER', type: 'stage',
		description: 'Professional AI, GenAI, automation and data engineering experience.', detail: 'QUINTESYS — AI engineering, walked as a working pipeline.',
		position: [8.6, 0, 28.3], arrival: [7.74, 0, 27.07], lookAt: [8.6, 1.2, 28.3],
		colorTheme: '#63e6ff', terrain: 'delta',
		stateIds: ['genai-state', 'ai-systems-state', 'agent-systems-state', 'bi-automation-state'],
	},
	{
		id: 'skills', label: 'TOOLKIT', name: 'TOOLKIT', worldName: 'TOOLKIT', type: 'stage',
		description: 'The tools that power the work.', detail: 'Engineering tools, not decorative badges.',
		position: [21.8, 0, 33.1], arrival: [20.39, 0, 32.59], lookAt: [21.8, 1.15, 33.1],
		colorTheme: '#70b9ff', terrain: 'terraces', regions: [],
	},
	{
		id: 'about', label: 'THE PERSON', name: 'THE PERSON', worldName: 'THE PERSON', type: 'stage',
		description: 'The person behind the systems.', detail: 'AI / GenAI Engineer.',
		position: [35.3, 0, 29.5], arrival: [33.85, 0, 29.89], lookAt: [35.3, 1.15, 29.5],
		colorTheme: '#8bb9d6', terrain: 'ridge', regions: [],
	},
	{
		id: 'contact', label: "WHAT'S NEXT", name: "WHAT'S NEXT", worldName: "WHAT'S NEXT", type: 'stage',
		description: 'Same curiosity. Bigger possibilities.', detail: 'Resume, GitHub, LinkedIn, and how to reach me.',
		position: [45.6, 0, 17.2], arrival: [44.64, 0, 18.35], lookAt: [45.6, 1.15, 17.2],
		colorTheme: '#6ff0d0', terrain: 'coast', regions: [],
	},
]

// Ordered anchors for the continuous spine curve (Pathway.jsx) — the same
// journey order, exposed once here so the curve and the stage lookup can't
// drift apart.
export const JOURNEY_ORDER = ['home', 'projects', 'experience', 'skills', 'about', 'contact']

export const destinationById = Object.fromEntries(destinations.map((destination) => [destination.id, destination]))
