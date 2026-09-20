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
		whatBuilt: 'QLoRA fine-tuning of Qwen2.5-Coder-7B-Instruct on 1,059 schema-annotated samples for PBIP visualContainer JSON generation, with schema-constrained generation and prompt engineering across the AI workflow.',
		technologies: ['QLoRA', 'Qwen2.5-Coder-7B-Instruct', 'Schema-Constrained Generation', 'Prompt Engineering', 'AI Workflows'],
		impact: '9/10 schema validity on generated PBIP visualContainer JSON.',
		workItems: [
			{
				id: 'qlora-fine-tuning',
				title: 'QLoRA FINE-TUNING',
				subtitle: 'Qwen2.5-Coder-7B-Instruct',
				fields: [
					{ label: 'TRAINING DATA', value: '1,059 samples' },
					{ label: 'TARGET', value: 'PBIP visualContainer JSON generation' },
					{ label: 'METHOD', value: 'QLoRA' },
					{ label: 'RESULT', value: '9/10 schema validity', emphasis: true },
				],
			},
		],
	},
	{
		id: 'ai-systems-state', continentId: 'experience', type: 'state', title: 'AI SYSTEMS STATE', label: 'AI SYSTEMS', subtitle: 'Production AI Architecture',
		position: [9.2, 0, 25.25], radius: 1.22, theme: '#8dbdff', terrain: 'systems',
		description: 'AI systems and production engineering.', detail: 'QUINTESYS CONTINENT',
		whatBuilt: 'Production AI system architecture covering model serving and inference (ViT / ResNet) through FastAPI and gRPC on Ray Serve, MLflow-managed artifact/version tracking, and Azure VM-based training, deployment, and debugging.',
		technologies: ['ViT', 'ResNet', 'FastAPI', 'gRPC', 'Ray Serve', 'MLflow', 'Azure VM', 'Software Testing'],
		impact: 'Served ViT/ResNet inference through FastAPI, gRPC, and Ray Serve, with MLflow-tracked experiments/models and Azure VM training, deployment, and debugging workflows.',
		workItems: [
			{
				id: 'production-model-serving',
				title: 'PRODUCTION MODEL SERVING',
				subtitle: 'ViT / ResNet inference',
				fields: [
					{ label: 'MODEL', value: 'ViT / ResNet' },
					{ label: 'SERVING', value: 'FastAPI · gRPC · Ray Serve' },
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
		whatBuilt: 'End-to-end AI-powered automation that parses Cognos XML/model definitions, extracts datasets and layout, and migrates reports to Power BI and Power BI Paginated Reports (RDL), with automated validation and a fix loop.',
		technologies: ['Python', 'LLMs', 'Power BI', 'XML', 'RDL'],
		impact: 'Automated Cognos → Power BI and Cognos → Power BI Paginated Reports migration, including RDL generation, automated validation, and an automated fix loop.',
		workItems: [
			{
				id: 'cognos-to-power-bi',
				title: 'COGNOS → POWER BI',
				subtitle: 'AI-powered BI migration',
				fields: [
					{ label: 'PARSING', value: 'Cognos XML / model' },
					{ label: 'EXTRACTION', value: 'Dataset + layout' },
					{ label: 'TARGET', value: 'Power BI' },
				],
			},
			{
				id: 'cognos-to-paginated-reports',
				title: 'COGNOS → PAGINATED REPORTS',
				subtitle: 'AI-powered report migration',
				fields: [
					{ label: 'PARSING', value: 'Cognos XML / model' },
					{ label: 'EXTRACTION', value: 'Dataset + layout' },
					{ label: 'TARGET', value: 'Power BI Paginated Reports', detail: 'RDL generation' },
				],
			},
		],
		pipeline: [
			['COGNOS', 'Source Cognos XML reports and models.'],
			['XML / MODEL PARSING', 'Parses Cognos XML report and model definitions.'],
			['DATASET + LAYOUT EXTRACTION', 'Extracts underlying datasets and report layout.'],
			['LLM-ASSISTED CONVERSION', 'LLM converts parsed Cognos formulas into target expressions.'],
			['REPORT GENERATION', 'Generates the target report definition.'],
			['RDL / POWER BI', 'Outputs RDL and Power BI report artifacts.'],
			['LLM-JUDGE VALIDATION', 'LLM judge and structural validation of generated expressions.'],
			['AUTOMATED FIX LOOP', 'Automated correction loop resolves validation issues.'],
		],
	},
]

export const isQuintesysTarget = (target) => Boolean(target) && (target.id === 'experience' || (target.type === 'state' && target.continentId === 'experience'))

export const stateById = Object.fromEntries(experienceStates.map((state) => [state.id, state]))
export const geographicTargets = experienceStates
