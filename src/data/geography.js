// One source of truth for the expanded Quintesys continent and its internal states.
export const quintesysGeography = {
	continentId: 'experience',
	center: [7.8, 0, -5.25],
	footprint: { radius: 5.15, hitRadius: 5.35 },
	corePosition: [7.8, 0, -5.25],
	// Overlapping low-poly masses form a connected, asymmetric coastline.
	terrainMasses: [
		{ position: [-1.55, 0.06, -0.8], radius: 3.25, scale: [1.12, 0.76], rotation: 0.2, height: 0.13 },
		{ position: [1.35, 0.08, -1.35], radius: 2.8, scale: [0.86, 1.15], rotation: -0.42, height: 0.18 },
		{ position: [2.5, 0.05, 1.05], radius: 2.5, scale: [1.05, 0.78], rotation: 0.48, height: 0.1 },
		{ position: [-1.15, 0.05, 1.7], radius: 3.15, scale: [1.16, 0.74], rotation: -0.22, height: 0.12 },
		{ position: [0.25, 0.1, 0.05], radius: 2.85, scale: [1.04, 0.93], rotation: 0.1, height: 0.2 },
	],
}

export const experienceStates = [
	{
		id: 'genai-state', continentId: 'experience', type: 'state', title: 'GENAI STATE', label: 'GENAI', subtitle: 'Generative AI & LLM Engineering',
		position: [4.85, 0, -6.55], radius: 1.3, theme: '#69e3ff', terrain: 'generative',
		description: 'Generative AI & LLM Engineering.', detail: 'QUINTESYS CONTINENT',
	},
	{
		id: 'ai-systems-state', continentId: 'experience', type: 'state', title: 'AI SYSTEMS STATE', label: 'AI SYSTEMS', subtitle: 'Production AI Systems',
		position: [8.6, 0, -8.05], radius: 1.22, theme: '#8dbdff', terrain: 'systems',
		description: 'AI systems and production engineering.', detail: 'QUINTESYS CONTINENT',
	},
	{
		id: 'agent-systems-state', continentId: 'experience', type: 'state', title: 'AGENT SYSTEMS STATE', label: 'AGENTS', subtitle: 'Agentic Systems',
		position: [11.15, 0, -4.65], radius: 1.24, theme: '#b39cff', terrain: 'agents',
		description: 'Agentic workflows and orchestration.', detail: 'QUINTESYS CONTINENT',
	},
	{
		id: 'bi-automation-state', continentId: 'experience', type: 'state', title: 'BI AUTOMATION STATE', label: 'BI AUTOMATION', subtitle: 'BI Migration & Automation',
		position: [5.3, 0, -2.55], radius: 1.28, theme: '#74e6c5', terrain: 'automation',
		description: 'BI migration and report automation.', detail: 'QUINTESYS CONTINENT',
	},
]

export const stateById = Object.fromEntries(experienceStates.map((state) => [state.id, state]))
export const geographicTargets = experienceStates
