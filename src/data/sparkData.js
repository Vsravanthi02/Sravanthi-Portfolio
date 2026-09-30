// ============================================================================
// THE SPARK — CONCEPTUAL QUESTION STATIONS DATA
// 4 foundational engineering questions connecting philosophical curiosity
// directly to Sravanthi Addagada's genuine projects and systems.
// ============================================================================

export const SPARK_QUESTIONS = [
	{
		id: 'perception',
		number: '01',
		title: 'PERCEPTION',
		theme: 'Computer Vision',
		work: 'Expression & Sign Language Detection',
		question: 'How can machines understand what humans see?',
		// Screen left (+X), upper tier near the Spark
		position: [3.8, 0.02, 2.4],
		hoverY: 2.10,
		crystalScale: 0.62,
		accentColor: '#35d8ff',
		secondaryColor: '#ffffff',
		crystalGeometry: 'icosahedron',
		metadata: [
			'Expression Detection',
			'Sign Language Detection',
			'OpenCV',
			'MediaPipe'
		],
		conceptSummary: 'Working with visual signals through facial expression analysis and real-time gesture and sign recognition.',
		targetStage: 'projects',
		targetDestinationId: 'vision',
		targetStateId: 'vision',
		targetLabel: 'EXPLORE PERCEPTION WORK'
	},
	{
		id: 'structure',
		number: '02',
		title: 'STRUCTURE',
		theme: 'LLM / GenAI Engineering',
		work: 'LLM / GenAI Engineering',
		question: 'How do we shape a foundation model for specialized work?',
		// Screen right (-X), upper tier near the Spark
		position: [-3.8, 0.02, 2.4],
		hoverY: 2.10,
		crystalScale: 0.62,
		accentColor: '#69e3ff',
		secondaryColor: '#ffffff',
		crystalGeometry: 'cube',
		metadata: [
			'QLoRA Fine-Tuning',
			'Qwen2.5-Coder-7B-Instruct',
			'PEFT',
			'Transformers',
			'PyTorch'
		],
		conceptSummary: 'Working with foundation models through parameter-efficient fine-tuning (QLoRA), instruction datasets, and model evaluation.',
		targetStage: 'experience',
		targetDestinationId: 'genaiEngineering',
		targetStateId: 'genaiEngineering',
		targetLabel: 'EXPLORE STRUCTURE WORK'
	},
	{
		id: 'knowledge',
		number: '03',
		title: 'KNOWLEDGE',
		theme: 'Knowledge Systems',
		work: 'Archiva / Agentic RAG',
		question: 'How do we turn scattered knowledge into systems machines can reason over?',
		// Screen left (+X), foreground tier closer to the entrance
		position: [3.4, 0.02, -1.2],
		hoverY: 1.25,
		crystalScale: 0.55,
		accentColor: '#35d8ff',
		secondaryColor: '#ffffff',
		crystalGeometry: 'octahedron',
		metadata: [
			'RAG Systems',
			'ARCHIVA Platform',
			'Hybrid Retrieval & Reranking',
			'Knowledge Systems'
		],
		conceptSummary: 'Turning unstructured documents into searchable knowledge through dense vector search, BM25 matching, cross-encoder reranking, and iterative reflection.',
		targetStage: 'projects',
		targetDestinationId: 'archiva',
		targetStateId: 'archiva',
		targetLabel: 'EXPLORE ARCHIVA PLATFORM'
	},
	{
		id: 'agency',
		number: '04',
		title: 'AGENCY',
		theme: 'AI Agents & Automation',
		work: 'Agentic AI / Automation',
		question: 'Can AI move from answering questions to actually doing the work?',
		// Screen right (-X), foreground tier closer to the entrance
		position: [-3.4, 0.02, -1.2],
		hoverY: 1.25,
		crystalScale: 0.55,
		accentColor: '#b39cff',
		secondaryColor: '#35d8ff',
		crystalGeometry: 'dodecahedron',
		metadata: [
			'AI Agents & Workflows',
			'Tool Orchestration (MCP)',
			'Dynamic Generation',
			'AI Automation'
		],
		conceptSummary: 'Exploring AI agents that use tools, external protocols, and feedback loops to coordinate tasks, inspect outputs, and respond to execution issues.',
		targetStage: 'experience',
		targetDestinationId: 'aiSystems',
		targetStateId: 'aiSystems',
		targetLabel: 'EXPLORE AGENTIC SYSTEMS'
	}
]
