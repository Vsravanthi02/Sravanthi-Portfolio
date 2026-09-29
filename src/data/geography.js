// One source of truth for the expanded Quintesys continent and its internal states.
// All positions here were translated by the same rigid (+0.6, 0, +33.3) offset
// as `experience` in src/data/destinations.js, when the world's path was
// redesigned from a hub-and-spoke layout to a single architectural spine —
// internal spacing/relationships between the core and the 4 states are
// byte-identical to before, just relocated as one rigid group.
export const quintesysGeography = {
	continentId: 'experience',
	center: [8.4, 0, 28.05],
	footprint: { radius: 5.15, hitRadius: 5.35 },
	corePosition: [8.4, 0, 28.05],
	overview: {
		eyebrow: 'PROFESSIONAL EXPERIENCE',
		title: 'QUINTESYS',
		subtitle: 'AI / SOFTWARE ENGINEERING EXPERIENCE',
		intro: 'Four engineering disciplines from professional work at Quintesys: generative AI engineering, production AI systems, agentic automation, and AI-powered BI migration automation.',
	},
	// Overlapping low-poly masses form a connected, asymmetric coastline.
	terrainMasses: [
		{ position: [-0.95, 0.06, 32.5], radius: 3.25, scale: [1.12, 0.76], rotation: 0.2, height: 0.13 },
		{ position: [1.95, 0.08, 31.95], radius: 2.8, scale: [0.86, 1.15], rotation: -0.42, height: 0.18 },
		{ position: [3.1, 0.05, 34.35], radius: 2.5, scale: [1.05, 0.78], rotation: 0.48, height: 0.1 },
		{ position: [-0.55, 0.05, 35.0], radius: 3.15, scale: [1.16, 0.74], rotation: -0.22, height: 0.12 },
		{ position: [0.85, 0.1, 33.35], radius: 2.85, scale: [1.04, 0.93], rotation: 0.1, height: 0.2 },
	],
}

export const experienceStates = [
	{
		id: 'genai-state', continentId: 'experience', type: 'state', title: 'GENAI STATE', label: 'GENAI', subtitle: 'QLoRA / LLM Engineering',
		position: [5.45, 0, 26.75], radius: 1.3, theme: '#69e3ff', terrain: 'generative',
		description: 'Generative AI & LLM Engineering.', detail: 'QUINTESYS CONTINENT',
		whatBuilt: 'QLoRA fine-tuning of Qwen2.5-Coder-7B-Instruct on 1,059 schema-annotated samples for PBIP visualContainer JSON generation, with prompt engineering and structured validation.',
		technologies: ['QLoRA', 'Qwen2.5-Coder-7B-Instruct', 'Schema Validation', 'Prompt Engineering', 'AI Workflows'],
		impact: '9/10 successful Power BI Desktop renderings on held-out visual prompts (compared to 6/10 for Claude Sonnet 4.6).',
		workItems: [
			{
				id: 'qlora-fine-tuning',
				title: 'QLoRA FINE-TUNING',
				subtitle: 'Qwen2.5-Coder-7B-Instruct',
				fields: [
					{ label: 'TRAINING DATA', value: '1,059 samples' },
					{ label: 'TARGET', value: 'PBIP visualContainer JSON generation' },
					{ label: 'METHOD', value: 'QLoRA' },
					{ label: 'RESULT', value: '9/10 rendering validity', emphasis: true },
				],
			},
		],
	},
	{
		id: 'ai-systems-state', continentId: 'experience', type: 'state', title: 'AI SYSTEMS STATE', label: 'AI SYSTEMS', subtitle: 'Production AI Architecture',
		position: [9.2, 0, 25.25], radius: 1.22, theme: '#8dbdff', terrain: 'systems',
		description: 'AI systems and production engineering.', detail: 'QUINTESYS CONTINENT',
		whatBuilt: 'AI system components covering model inference serving through FastAPI and gRPC, MLflow artifact and version tracking, and Azure VM-based training, deployment, and debugging.',
		technologies: ['FastAPI', 'gRPC', 'MLflow', 'Azure VMs', 'Software Testing'],
		impact: 'Served model inference through FastAPI and gRPC, with MLflow experiment and artifact tracking and Azure VM debugging workflows.',
		workItems: [
			{
				id: 'production-model-serving',
				title: 'PRODUCTION MODEL SERVING',
				subtitle: 'Inference and integration',
				fields: [
					{ label: 'SERVING', value: 'FastAPI · gRPC' },
					{ label: 'MLOPS', value: 'MLflow', detail: 'Artifact / version tracking' },
					{ label: 'INFRASTRUCTURE', value: 'Azure VMs', detail: 'Training · deployment · debugging' },
				],
			},
		],
	},
	{
		id: 'agent-systems-state', continentId: 'experience', type: 'state', title: 'AGENT SYSTEMS STATE', label: 'AGENTS', subtitle: 'Agentic Systems & MCP',
		position: [11.75, 0, 28.65], radius: 1.24, theme: '#b39cff', terrain: 'agents',
		description: 'Agentic workflows and orchestration.', detail: 'QUINTESYS CONTINENT',
		whatBuilt: 'MCP-based agents with tool-driven orchestration, reasoning over tool outputs, and dynamic Plotly chart generation as part of agentic workflows.',
		technologies: ['MCP', 'Agentic AI', 'Tool Use', 'Orchestration', 'Plotly', 'Dynamic Outputs'],
		impact: 'Tool-driven agent workflows that reason over live data and generate Plotly charts dynamically as output.',
		workItems: [
			{
				id: 'mcp-agent-workflow',
				title: 'MCP AGENT WORKFLOW',
				subtitle: 'Agentic workflows with tool use',
				fields: [
					{ label: 'AGENT LAYER', value: 'MCP-based agents', detail: 'Model Context Protocol' },
					{ label: 'ORCHESTRATION', value: 'Tool-driven orchestration', detail: 'Agentic workflows' },
					{ label: 'REASONING', value: 'Reasoning over tool outputs' },
					{ label: 'OUTPUT', value: 'Dynamic Plotly chart generation' },
				],
			},
		],
	},
	{
		id: 'bi-automation-state', continentId: 'experience', type: 'state', title: 'BI AUTOMATION STATE', label: 'BI AUTOMATION', subtitle: 'Cognos → Power BI Automation',
		position: [5.9, 0, 30.75], radius: 1.28, theme: '#74e6c5', terrain: 'automation',
		description: 'BI migration and report automation.', detail: 'QUINTESYS CONTINENT',
		whatBuilt: 'Automating the Cognos reports to Power BI Paginated Reports (RDL) and Power BI Desktop workflows through XML extraction, dataset and layout mapping, RDL and visualContainer JSON generation, validation, and correction.',
		technologies: ['Python', 'Power BI', 'XML', 'RDL', 'PBIP'],
		impact: 'Automating the Cognos reports to Power BI Paginated Reports workflow through XML extraction, RDL generation, validation, and correction.',
		workItems: [
			{
				id: 'cognos-to-power-bi',
				title: 'COGNOS → POWER BI',
				subtitle: 'Desktop visual generation',
				fields: [
					{ label: 'PARSING', value: 'Cognos XML / model' },
					{ label: 'EXTRACTION', value: 'Dataset + layout' },
					{ label: 'TARGET', value: 'Power BI Desktop (PBIP)' },
				],
			},
			{
				id: 'cognos-to-paginated-reports',
				title: 'COGNOS → PAGINATED REPORTS',
				subtitle: 'RDL report automation',
				fields: [
					{ label: 'PARSING', value: 'Cognos XML reports' },
					{ label: 'EXTRACTION', value: 'Parameters + data + layout' },
					{ label: 'TARGET', value: 'Power BI Paginated Reports', detail: 'RDL generation' },
				],
			},
		],
		pipeline: [
			['COGNOS REPORTS', 'Source Cognos reports and XML definitions.'],
			['XML EXTRACTION', 'Parses Cognos XML report and model definitions.'],
			['DATASET + LAYOUT EXTRACTION', 'Extracts underlying datasets, parameters, and report layout.'],
			['RDL & VISUAL GENERATION', 'Generates RDL specifications and PBIP visualContainer JSON.'],
			['VALIDATION', 'Schema validation and Power BI Desktop rendering checks.'],
			['CORRECTION LOOP', 'Correction loop resolves syntax, expression, and layout issues.'],
		],
	},
]

export const isQuintesysTarget = (target) =>
	Boolean(target) &&
	(target.id === 'experience' ||
		target.id === 'quintesys' ||
		target.type === 'quintesys-experience' ||
		(target.type === 'state' && target.continentId === 'experience'))

export const stateById = Object.fromEntries(experienceStates.map((state) => [state.id, state]))
export const geographicTargets = experienceStates
