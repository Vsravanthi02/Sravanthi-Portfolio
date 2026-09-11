// One source of truth for the expanded Quintesys continent and its internal states.
export const quintesysGeography = {
	continentId: 'experience',
	center: [7.8, 0, -5.25],
	footprint: { radius: 5.15, hitRadius: 5.35 },
	corePosition: [7.8, 0, -5.25],
	overview: {
		eyebrow: 'PROFESSIONAL EXPERIENCE',
		title: 'QUINTESYS',
		subtitle: 'AI / SOFTWARE ENGINEERING EXPERIENCE',
		intro: 'Four engineering disciplines from professional work at Quintesys: generative AI engineering, production AI systems, agentic automation, and AI-powered BI migration automation.',
	},
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
		id: 'genai-state', continentId: 'experience', type: 'state', title: 'GENAI STATE', label: 'GENAI', subtitle: 'QLoRA / LLM Engineering',
		position: [4.85, 0, -6.55], radius: 1.3, theme: '#69e3ff', terrain: 'generative',
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
		position: [8.6, 0, -8.05], radius: 1.22, theme: '#8dbdff', terrain: 'systems',
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
		position: [11.15, 0, -4.65], radius: 1.24, theme: '#b39cff', terrain: 'agents',
		description: 'Agentic workflows and orchestration.', detail: 'QUINTESYS CONTINENT',
		whatBuilt: 'MCP-based agents with tool-driven orchestration, reasoning over tool outputs, and dynamic Plotly chart generation as part of agentic workflows.',
		technologies: ['MCP', 'Agentic AI', 'Tool Use', 'Orchestration', 'Plotly', 'Dynamic Outputs'],
		impact: 'Tool-driven agent workflows that reason over live data and generate Plotly charts dynamically as output.',
	},
	{
		id: 'bi-automation-state', continentId: 'experience', type: 'state', title: 'BI AUTOMATION STATE', label: 'BI AUTOMATION', subtitle: 'Cognos → Power BI Automation',
		position: [5.3, 0, -2.55], radius: 1.28, theme: '#74e6c5', terrain: 'automation',
		description: 'BI migration and report automation.', detail: 'QUINTESYS CONTINENT',
		whatBuilt: 'End-to-end AI-powered automation that parses Cognos XML/model definitions, extracts datasets and layout, and migrates reports to Power BI and Power BI Paginated Reports (RDL), with automated validation and a fix loop.',
		technologies: ['Python', 'LLMs', 'RAG', 'Power BI', 'XML', 'RDL'],
		impact: 'Automated Cognos → Power BI and Cognos → Power BI Paginated Reports migration, including RDL generation, automated validation, and an automated fix loop.',
		pipeline: [
			['COGNOS', 'Source Cognos XML reports and models.'],
			['XML / MODEL PARSING', 'Parses Cognos XML report and model definitions.'],
			['DATASET + LAYOUT EXTRACTION', 'Extracts underlying datasets and report layout.'],
			['LLM / RAG UNDERSTANDING', 'LLM + RAG interpret report structure and intent.'],
			['REPORT GENERATION', 'Generates the target report definition.'],
			['RDL / POWER BI', 'Outputs RDL and Power BI report artifacts.'],
			['VALIDATION', 'Automated validation of generated reports.'],
			['AUTOMATED FIX LOOP', 'Automated correction loop resolves validation issues.'],
		],
	},
]

export const isQuintesysTarget = (target) => Boolean(target) && (target.id === 'experience' || (target.type === 'state' && target.continentId === 'experience'))

export const stateById = Object.fromEntries(experienceStates.map((state) => [state.id, state]))
export const geographicTargets = experienceStates
