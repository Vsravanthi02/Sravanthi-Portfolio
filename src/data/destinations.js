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
		description: 'Ideas become working systems.', detail: '01 ARCHIVA & 02 EXPRESSION & SIGN LANGUAGE DETECTION — walked as physical engineering installations.',
		position: [0, 0, 21.0], arrival: [0, 0, 18.0], lookAt: [0, 1.9, 23.5],
		colorTheme: '#35d8ff', terrain: 'colonnade',
		regions: [
			{ id: 'archiva', name: 'ARCHIVA', status: 'active' },
			{ id: 'vision', name: 'EXPRESSION & SIGN LANGUAGE DETECTION', status: 'active' }
		],
	},
	{
		id: 'solve', label: 'THE SOLVE', name: 'THE SOLVE', worldName: 'THE SOLVE', type: 'stage',
		description: 'Problems are where systems become real.', detail: '01 RETRIEVAL, 02 PERCEPTION, 03 UNCERTAINTY — engineering under uncertainty.',
		position: [0, 0, 38.0], arrival: [0, 0, 31.0], lookAt: [0, 1.8, 38.0],
		colorTheme: '#ffb45c', terrain: 'rotunda',
		regions: [
			{ id: 'retrieval', name: 'RETRIEVAL', status: 'active' },
			{ id: 'perception', name: 'PERCEPTION', status: 'active' },
			{ id: 'uncertainty', name: 'UNCERTAINTY', status: 'active' }
		],
	},
	{
		id: 'experience', label: 'THE ENGINEER', name: 'THE ENGINEER', worldName: 'THE ENGINEER', type: 'stage',
		description: 'Engineering in the real world.', detail: '01 HOW I ENGINEER, 02 COGNOS → POWER BI (PAGINATED), 03 COGNOS → POWER BI (DESKTOP), 04 LLM / GENAI, 05 AI SYSTEMS, 06 SOFTWARE ENGINEERING.',
		position: [0, 0, 72.0], arrival: [0, 0, 68.2], lookAt: [0, 2.15, 72.6],
		colorTheme: '#ffb45c', terrain: 'observatory',
		regions: [
			{ id: 'howIEngineer', name: 'HOW I ENGINEER', status: 'active' },
			{ id: 'cognosPaginated', name: 'COGNOS → POWER BI: PAGINATED', status: 'active' },
			{ id: 'cognosDesktop', name: 'COGNOS → POWER BI: DESKTOP', status: 'active' },
			{ id: 'genaiEngineering', name: 'LLM / GENAI ENGINEERING', status: 'active' },
			{ id: 'aiSystems', name: 'AI SYSTEMS / AUTOMATION', status: 'active' },
			{ id: 'softwareEngineering', name: 'SOFTWARE ENGINEERING', status: 'active' }
		],
	},
	{
		id: 'skills', label: 'TOOLKIT', name: "THE ENGINEER'S TOOLKIT", worldName: "THE ENGINEER'S TOOLKIT", type: 'stage',
		description: 'The tools behind the systems.', detail: '01 AI/ML ENGINEERING, 02 GENAI & RAG, 03 VISION, 04 DATA & RETRIEVAL, 05 AI SYSTEMS, 06 VIZ & AUTOMATION.',
		position: [21.8, 0, 33.1], arrival: [21.8, 0, 26.2], lookAt: [21.8, 2.15, 33.6],
		colorTheme: '#00d2ff', terrain: 'observatory',
		regions: [
			{ id: 'aiMl', name: 'AI / ML ENGINEERING', status: 'active' },
			{ id: 'genAiRag', name: 'GENERATIVE AI & RAG', status: 'active' },
			{ id: 'computerVision', name: 'COMPUTER VISION', status: 'active' },
			{ id: 'dataRetrieval', name: 'DATA & RETRIEVAL', status: 'active' },
			{ id: 'aiSystems', name: 'AI SYSTEMS & INFERENCE', status: 'active' },
			{ id: 'vizBiAutomation', name: 'VISUALIZATION, BI & AUTOMATION', status: 'active' }
		],
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
export const JOURNEY_ORDER = ['home', 'projects', 'solve', 'experience', 'skills', 'about', 'contact']

export const destinationById = Object.fromEntries(destinations.map((destination) => [destination.id, destination]))
