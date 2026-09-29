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
			detail: 'Python backend development, Pytest test suites, Streamlit tools, Azure VM debugging, and container compatibility investigation.'
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
			summary: 'Converting Cognos reports and models into Power BI Desktop visualizations, utilizing fine-tuned models for PBIP visualContainer JSON and rendering validation.'
		}
	},
	genaiEngineering: {
		title: 'LLM / GENAI ENGINEERING',
		pipeline: [
			'Training Data Curation',
			'QLoRA Fine-Tuning',
			'Qwen2.5-Coder',
			'Prompt Testing',
			'Model Comparison',
			'Output Validation'
		],
		summary: 'Fine-tuned Qwen2.5-Coder-7B-Instruct with QLoRA on 1,059 schema-annotated samples for PBIP visualContainer JSON, evaluating against Claude Sonnet 4.6 across Power BI Desktop rendering tests.',
		technologies: ['Qwen2.5-Coder-7B-Instruct', 'QLoRA', 'PyTorch', 'Transformers', 'Evaluation', 'Validation']
	},
	softwareEngineering: {
		title: 'SOFTWARE ENGINEERING PRACTICE',
		summary: 'Applied software engineering practices including Python backend development, FastAPI and gRPC APIs, Pytest test suites, Streamlit tooling, Azure VM debugging, and Docker compatibility investigation.',
		technologies: ['Python', 'FastAPI', 'gRPC', 'Pytest', 'Streamlit', 'Azure VMs', 'Git']
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
		whyItMatters: 'Focused on the Power BI Desktop, data model, and visual generation side of migration. Extracted Cognos metadata and dataset logic, translated legacy chart definitions to Power BI core visual primitives, and fine-tuned Qwen2.5-Coder-7B-Instruct with QLoRA across 1,059 schema-annotated samples to generate PBIP-compatible visualContainer JSON. Evaluated generated visual definitions through Power BI Desktop rendering tests, achieving 9/10 successful renderings on held-out visual prompts compared to 6/10 for Claude Sonnet 4.6.',
		pipeline: [
			{ id: 'model', label: 'Model Extraction' },
			{ id: 'dataset', label: 'Dataset & Schema' },
			{ id: 'mapping', label: 'Visual Mapping' },
			{ id: 'pbip', label: 'PBIP / Visual JSON' },
			{ id: 'val', label: 'Schema Validation' },
			{ id: 'desktop', label: 'Desktop Rendering' }
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
		whyItMatters: 'General-purpose LLMs frequently produce syntax errors or invalid schemas when generating domain-specific BI configurations. Applied QLoRA fine-tuning to Qwen2.5-Coder-7B-Instruct on 1,059 schema-annotated training samples, combined with prompt engineering and structured output validation. Systematically benchmarked and evaluated generated outputs against general-purpose LLMs across targeted code and visual generation test suites.',
		pipeline: [
			{ id: 'prep', label: 'Training Data Curation', detail: 'Curating, tokenizing, and formatting 1,059 schema-annotated training pairs.' },
			{ id: 'qlora', label: 'QLoRA Fine-Tuning', detail: 'Applying parameter-efficient 4-bit low-rank adaptation to Qwen2.5-Coder-7B-Instruct.' },
			{ id: 'prompt', label: 'Prompt Engineering', detail: 'Designing structured prompts and schema constraints to guide model generation.' },
			{ id: 'compare', label: 'Model Comparison', detail: 'Evaluating fine-tuned models against general-purpose LLMs on identical test prompts.' },
			{ id: 'eval', label: 'Output Evaluation', detail: 'Benchmarking generated code and configurations for syntax and schema compliance.' },
			{ id: 'norm', label: 'Structured Validation', detail: 'Validating and normalizing generated outputs with deterministic parsers and linters.' }
		],
		accentColor: '#a993ff',
		secondaryColor: '#c4b5fd',
		technologies: ['Qwen2.5-Coder-7B-Instruct', 'QLoRA', 'PyTorch', 'Transformers', 'Prompt Engineering', 'Schema Validation']
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
		quote: 'Integrating model inference workflows, semantic search, MCP agent tools, and dynamic visualization into backend systems.',
		whyItMatters: 'Applied AI systems engineering to connect inference workflows into backend services. Developed FastAPI and gRPC service integrations, tracked experiments and artifacts with MLflow, implemented tool-driven MCP agent workflows that reason over live data to generate dynamic Plotly visualizations, and integrated PostgreSQL workflows and semantic search for retrieval tasks.',
		pipeline: [
			{ id: 'inference', label: 'Inference Workflows', detail: 'Serving model inference through asynchronous FastAPI and gRPC service endpoints.' },
			{ id: 'mlflow', label: 'MLflow Tracking', detail: 'Logging experiments, model artifacts, and version configurations with MLflow.' },
			{ id: 'mcp', label: 'MCP Agent Layer', detail: 'Implementing Model Context Protocol tools and agent orchestration workflows.' },
			{ id: 'viz', label: 'Dynamic Visualization', detail: 'Generating dynamic Plotly charts from agent tool reasoning over query outputs.' },
			{ id: 'search', label: 'Semantic Search', detail: 'Integrating semantic retrieval workflows with PostgreSQL for knowledge access.' },
			{ id: 'val', label: 'Service Validation', detail: 'Applying Pydantic contract validation, timeout budgets, and structured exception handling.' }
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
		quote: 'Writing modular Python services, integrating APIs, writing automated tests, and debugging across cloud environments.',
		whyItMatters: 'Software engineering practice at Quintesys centered on building reliable backend components and integration tools in Python. Developed modular API services with FastAPI and gRPC, created interactive internal tools with Streamlit, maintained automated test suites with Pytest, investigated container environment compatibility with Docker, and debugged inference workflows on Azure VMs.',
		pipeline: [
			{ id: 'python', label: 'Python Backend', detail: 'Developing modular, well-typed Python service layers, data utilities, and routers.' },
			{ id: 'apis', label: 'API Integration', detail: 'Implementing and testing REST and gRPC interfaces for enterprise automation flows.' },
			{ id: 'streamlit', label: 'Streamlit Tooling', detail: 'Building interactive internal testing and demonstration interfaces.' },
			{ id: 'testing', label: 'Pytest Test Suites', detail: 'Writing unit and integration tests to validate data transformations and API behavior.' },
			{ id: 'azure', label: 'Azure VM Environments', detail: 'Deploying, testing, and debugging service components across Azure virtual machines.' },
			{ id: 'docker', label: 'Docker Investigation', detail: 'Investigating container runtime compatibility and environment configuration.' }
		],
		accentColor: '#ffb45c',
		secondaryColor: '#ffd699',
		technologies: ['Python', 'FastAPI', 'gRPC', 'Pytest', 'Streamlit', 'Azure VMs', 'Docker (Investigation)', 'Git']
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
