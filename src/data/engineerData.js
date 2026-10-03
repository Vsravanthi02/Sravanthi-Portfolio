// ============================================================================
// CHAPTER 04 — THE ENGINEER DATA MODEL
// Core Purpose: WHAT IT MEANS TO WORK AS AN ENGINEER IN A REAL COMPANY.
// Central Focus: QUINTESYS (AI ENGINEERING INTERN • 8 MONTHS)
// Physical Panels: Architectural exhibits (Number, Title, Subtitle, Keywords)
// Interactive Terminals: Comprehensive technical depth explaining HOW it was done.
// ZERO fake metrics, ZERO unsupported benchmarks, NO marketing exaggerations.
// ============================================================================

export const ENGINEER_OVERHEAD = {
	number: '04',
	title: 'THE ENGINEER',
	subtitle: 'Engineering in the real world.',
	quote: 'Engineering becomes real when the work has to function for people, systems, and teams.'
}

export const QUINTESYS_EXPERIENCE = {
	id: 'quintesys',
	type: 'quintesys-experience',
	kicker: 'PROFESSIONAL EXPERIENCE',
	company: 'QUINTESYS',
	role: 'AI ENGINEERING INTERN',
	duration: '8 MONTHS',
	tagline: 'Engineering in the real world.',
	intro: 'Worked across AI engineering, automation, production-oriented systems, and software engineering workflows.',
	pillars: [
		{
			id: 'genai',
			title: 'Generative AI',
			detail: 'LLM/GenAI engineering, QLoRA fine-tuning of Qwen2.5-Coder-7B-Instruct, prompt testing, and PBIP visualContainer JSON generation.'
		},
		{
			id: 'systems',
			title: 'AI Systems',
			detail: 'Service integration, FastAPI and gRPC APIs, MLflow tracking, MCP agent workflows, dynamic Plotly visualizations, and semantic search.'
		},
		{
			id: 'automation',
			title: 'Automation',
			detail: 'Automating the Cognos reports to Power BI Paginated Reports (RDL) and Power BI Desktop workflows with validation and correction loops.'
		},
		{
			id: 'software',
			title: 'Software Engineering',
			detail: 'Python backend development, Pytest test suites, Streamlit application maintenance, Azure VM debugging, and container compatibility investigation.'
		}
	],
	cognosAutomation: {
		title: 'COGNOS → POWER BI AUTOMATION',
		paginated: {
			title: 'Paginated Reports (RDL)',
			pipeline: [
				'Cognos Reports',
				'XML Extraction',
				'Parameters / Data / Layout',
				'Report Processing',
				'Chart / Visual Handling',
				'RDL Generation',
				'RDL Validation',
				'Correction / Fixes',
				'Paginated Reports'
			],
			summary: 'Automating the Cognos reports to Power BI Paginated Reports workflow through XML extraction, RDL generation, validation, and correction.'
		},
		desktop: {
			title: 'Power BI Desktop (Visuals)',
			pipeline: [
				'Model Extraction',
				'Dataset & Schema',
				'Visual Mapping',
				'PBIP / Visual JSON',
				'Schema Validation',
				'Desktop Rendering'
			],
			summary: 'Power BI Desktop visual-generation and validation workflows, generating PBIP visualContainer JSON, and evaluating through Power BI Desktop rendering tests.'
		}
	},
	genaiEngineering: {
		title: 'LLM / GENAI ENGINEERING',
		pipeline: [
			'Training Data',
			'QLoRA Fine-Tuning',
			'Prompt Testing',
			'Model Evaluation',
			'Output Evaluation',
			'Structured Validation'
		],
		summary: 'Fine-tuned Qwen2.5-Coder-7B-Instruct with QLoRA on schema-annotated training data to generate PBIP-compatible visualContainer JSON, evaluating through prompt testing, model evaluation, and structured validation.',
		technologies: [
			'Qwen2.5-Coder-7B-Instruct',
			'QLoRA',
			'PyTorch',
			'Transformers',
			'PEFT',
			'BitsAndBytes',
			'Accelerate',
			'Azure ML',
			'MLflow',
			'Python'
		]
	},
	softwareEngineering: {
		title: 'SOFTWARE ENGINEERING PRACTICE',
		summary: 'Applied software engineering practices including Python backend development, FastAPI and gRPC APIs, Pytest test suites, Streamlit application maintenance, Azure VM debugging, and Docker compatibility investigation.',
		technologies: ['Python', 'FastAPI', 'gRPC', 'Pytest', 'Streamlit', 'Azure VMs', 'Docker', 'Git']
	}
}

export const ENGINEER_CORE = {
	title: 'ENGINEERING IN PRACTICE',
	detail: 'The interaction between people, process, technology, and delivery.',
	steps: ['UNDERSTAND', 'COLLABORATE', 'DESIGN', 'IMPLEMENT', 'REVIEW & TEST', 'DELIVER']
}

export const ENGINEER_STATIONS = {
	howIEngineer: {
		id: 'how-i-engineer',
		type: 'engineer-station',
		isMethodology: true,
		number: '01',
		title: 'HOW I ENGINEER',
		subtitle: 'PRACTICE & METHODOLOGY',
		tag: 'METHODOLOGY',
		keywords: 'UNDERSTAND • DESIGN • DELIVER',
		inscription: 'HOW I WORK',
		quote: 'Disciplined engineering practice connects requirements, people, and reliable software.',
		whyItMatters: 'Engineering is more than writing code. I approach work as an end-to-end discipline: clarify the requirement, align with the people involved, design deliberately, implement carefully, validate the result, and deliver something dependable.',
		workflowSteps: [
			{
				step: '01 UNDERSTAND',
				summary: 'Start with the requirement.',
				detail: 'I start by clarifying the requirement, understanding the intended workflow, and resolving ambiguity before implementation.'
			},
			{
				step: '02 COLLABORATE',
				summary: 'Align with the people involved.',
				detail: 'I communicate assumptions and blockers early, incorporate feedback, and align with the people involved before making important engineering decisions.'
			},
			{
				step: '03 DESIGN',
				summary: 'Turn requirements into a clear approach.',
				detail: 'I translate requirements into clear system boundaries, data flows, and implementation decisions, balancing simplicity with reliability.'
			},
			{
				step: '04 IMPLEMENT',
				summary: 'Turn the design into working software.',
				detail: 'I turn the design into maintainable software, keeping components modular, interfaces clear, and implementation decisions deliberate.'
			},
			{
				step: '05 REVIEW & TEST',
				summary: 'Validate behavior, quality, and reliability.',
				detail: 'I validate the result against the requirement, investigate failures systematically, and address root causes rather than patching symptoms.'
			},
			{
				step: '06 DELIVER',
				summary: 'Turn engineering work into a dependable result.',
				detail: 'I focus on making the finished work understandable, usable, and dependable, with clear communication around the result and any remaining constraints.'
			}
		],
		accentColor: '#4eaed4',
		secondaryColor: '#9bbcd4'
	},

	cognosPaginated: {
		id: 'cognos-paginated',
		type: 'engineer-station',
		isMethodology: false,
		number: '02',
		title: 'COGNOS → POWER BI',
		subtitle: 'PAGINATED REPORTS',
		tag: 'QUINTESYS WORK',
		keywords: 'XML • RDL • VALIDATION',
		inscription: 'RDL AUTOMATION',
		quote: 'Automating the Cognos reports to Power BI Paginated Reports workflow through XML extraction, RDL generation, validation, and correction.',
		whyItMatters: 'Automating the Cognos reports to Power BI Paginated Reports workflow through XML extraction, RDL generation, validation, and correction. Processing report definitions requires structured extraction of queries, parameters, and layout hierarchy, mapping chart types, and iteratively validating generated RDL specifications to resolve syntax and layout discrepancies before downstream use.',
		pipeline: [
			{ id: 'cognos', label: 'Cognos Reports' },
			{ id: 'xml', label: 'XML Extraction' },
			{ id: 'params', label: 'Parameters / Data / Layout' },
			{ id: 'processing', label: 'Report Processing' },
			{ id: 'visuals', label: 'Chart / Visual Handling' },
			{ id: 'rdl_gen', label: 'RDL Generation' },
			{ id: 'rdl_val', label: 'RDL Validation' },
			{ id: 'fixes', label: 'Correction / Fixes' },
			{ id: 'target', label: 'Paginated Reports' }
		],
		accentColor: '#ffb45c',
		secondaryColor: '#ffd699',
		technologies: ['Cognos XML', 'RDL', 'Power BI Service', 'Python', 'XML Parsing', 'Schema Validation']
	},

	cognosDesktop: {
		id: 'cognos-desktop',
		type: 'engineer-station',
		isMethodology: false,
		number: '03',
		title: 'COGNOS → POWER BI',
		subtitle: 'DESKTOP',
		tag: 'QUINTESYS WORK',
		keywords: 'MODEL • VISUALS • PBIP',
		inscription: 'VISUAL GENERATION',
		quote: 'Generating and evaluating PBIP visualContainer JSON definitions for Power BI Desktop visualizations.',
		whyItMatters: 'Worked on the Power BI Desktop visual-generation and validation side of Cognos-to-Power BI workflows. Extracted report and model metadata, mapped legacy chart definitions to Power BI visual types, generated PBIP-compatible visualContainer JSON, and evaluated the generated visual definitions through Power BI Desktop rendering tests.',
		pipeline: [
			{ id: 'model', label: 'MODEL EXTRACTION' },
			{ id: 'dataset', label: 'DATASET & SCHEMA' },
			{ id: 'mapping', label: 'VISUAL MAPPING' },
			{ id: 'pbip', label: 'PBIP / VISUAL JSON' },
			{ id: 'val', label: 'SCHEMA VALIDATION' },
			{ id: 'desktop', label: 'DESKTOP RENDERING' }
		],
		accentColor: '#35d8ff',
		secondaryColor: '#69e3ff',
		technologies: ['Power BI Desktop', 'PBIP', 'visualContainer JSON', 'Qwen2.5-Coder-7B-Instruct', 'QLoRA', 'Python']
	},

	genaiEngineering: {
		id: 'genai-engineering',
		type: 'engineer-station',
		isMethodology: false,
		number: '04',
		title: 'LLM / GENAI',
		subtitle: 'ENGINEERING',
		tag: 'QUINTESYS WORK',
		keywords: 'FINE-TUNING • QWEN • EVALUATION',
		inscription: 'QLoRA & EVALUATION',
		quote: 'Fine-tuning, prompt testing, and systematically evaluating open-weights coding models for structured configuration generation.',
		whyItMatters: 'Fine-tuned Qwen2.5-Coder-7B-Instruct with QLoRA on schema-annotated training data to generate PBIP-compatible visualContainer JSON for Power BI visual generation. Used prompt testing, structured validation, and output evaluation to assess generated visual definitions.',
		pipeline: [
			{ id: 'data', label: 'TRAINING DATA' },
			{ id: 'qlora', label: 'QLoRA FINE-TUNING' },
			{ id: 'prompt', label: 'PROMPT TESTING' },
			{ id: 'model_eval', label: 'MODEL EVALUATION' },
			{ id: 'output_eval', label: 'OUTPUT EVALUATION' },
			{ id: 'validation', label: 'STRUCTURED VALIDATION' }
		],
		accentColor: '#a993ff',
		secondaryColor: '#c4b5fd',
		technologies: [
			'Qwen2.5-Coder-7B-Instruct',
			'QLoRA',
			'PyTorch',
			'Transformers',
			'PEFT',
			'BitsAndBytes',
			'Accelerate',
			'Azure ML',
			'MLflow',
			'Python'
		]
	},

	aiSystems: {
		id: 'ai-systems',
		type: 'engineer-station',
		isMethodology: false,
		number: '05',
		title: 'AI SYSTEMS',
		subtitle: 'AUTOMATION',
		tag: 'QUINTESYS WORK',
		keywords: 'APIS • MCP • WORKFLOWS',
		inscription: 'SYSTEM INTEGRATION',
		quote: 'Working across model inference, semantic search, MCP tooling, and dynamic visualization for AI-powered systems.',
		whyItMatters: 'Integrated AI inference workflows with backend services, experiment tracking, tool-driven MCP agents, dynamic Plotly visualization, and PostgreSQL-based data workflows.',
		pipeline: [
			{ id: 'inference', label: 'INFERENCE SERVICES' },
			{ id: 'tracking', label: 'EXPERIMENT TRACKING' },
			{ id: 'mcp', label: 'MCP TOOL ORCHESTRATION' },
			{ id: 'viz', label: 'DYNAMIC VISUALIZATION' },
			{ id: 'data', label: 'DATA & RETRIEVAL' },
			{ id: 'integration', label: 'SYSTEM INTEGRATION' }
		],
		accentColor: '#6fe7ff',
		secondaryColor: '#35d8ff',
		technologies: ['FastAPI', 'gRPC', 'MLflow', 'MCP', 'Plotly', 'PostgreSQL', 'Python', 'Pydantic']
	},

	softwareEngineering: {
		id: 'software-engineering',
		type: 'engineer-station',
		isMethodology: false,
		number: '06',
		title: 'SOFTWARE',
		subtitle: 'ENGINEERING',
		tag: 'QUINTESYS WORK',
		keywords: 'PYTHON • APIS • TESTING',
		inscription: 'SOFTWARE PRACTICE',
		quote: 'Building Python services, integrating APIs, maintaining tests, and investigating applications across cloud environments.',
		whyItMatters: 'Worked on Python backend components and API integrations using FastAPI and gRPC, refactored and maintained existing Streamlit applications, maintained automated tests with Pytest, investigated container compatibility with Docker, and debugged inference workflows on Azure VMs.',
		pipeline: [
			{ id: 'python', label: 'PYTHON BACKEND' },
			{ id: 'apis', label: 'API INTEGRATION' },
			{ id: 'streamlit', label: 'STREAMLIT MAINTENANCE' },
			{ id: 'testing', label: 'PYTEST TESTING' },
			{ id: 'azure', label: 'AZURE VM ENVIRONMENTS' },
			{ id: 'docker', label: 'DOCKER INVESTIGATION' }
		],
		accentColor: '#ffb45c',
		secondaryColor: '#ffd699',
		technologies: ['Python', 'FastAPI', 'gRPC', 'Pytest', 'Streamlit', 'Azure VMs', 'Docker', 'Git']
	}
}

export const ENGINEER_FLOOR_GUIDES = {
	returnPrompt: {
		label: '← 03 — THE SOLVE',
		detail: 'Engineering under uncertainty.',
		position: [-4.6, 0.22, 0]
	},
	forwardPrompt: {
		label: '05 — THE TOOLKIT →',
		detail: 'Technologies and tools.',
		position: [4.6, 0.22, 0]
	},
	centerPrompt: {
		label: 'SIX STATIONS OF PROFESSIONAL PRACTICE — EXPLORE WITH [ E ] OR CLICK',
		detail: 'Quintesys experience and production engineering.'
	}
}
