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
			'Deep Learning'
		],
		conceptSummary: 'Moving beyond raw pixels into structured visual understanding — from facial expression analysis to real-time sign language detection and deep visual learning.',
		targetStage: 'experience',
		targetStateId: 'ai-systems-state',
		targetLabel: 'EXPLORE PERCEPTION WORK'
	},
	{
		id: 'structure',
		number: '02',
		title: 'STRUCTURE',
		theme: 'Model Fine-Tuning',
		work: 'QLoRA Fine-Tuning',
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
			'Qwen2.5-Coder-Instruct-7B',
			'PEFT',
			'Transformers',
			'PyTorch'
		],
		conceptSummary: 'Adapting foundation models for specialized domain tasks using parameter-efficient fine-tuning (QLoRA), target instruction datasets, and custom model evaluation.',
		targetStage: 'experience',
		targetStateId: 'genai-state',
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
			'Knowledge Intelligence'
		],
		conceptSummary: 'Transforming unstructured documents into verifiable facts through dense vector search, lexical BM25 matching, cross-encoder reranking, and iterative reflection.',
		targetStage: 'projects',
		targetStateId: null,
		targetLabel: 'EXPLORE ARCHIVA PLATFORM'
	},
	{
		id: 'agency',
		number: '04',
		title: 'AGENCY',
		theme: 'Autonomous Systems',
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
			'Autonomous Systems'
		],
		conceptSummary: 'Empowering models with tools, external protocols, and feedback loops to inspect outputs, recover from execution errors, and execute end-to-end tasks.',
		targetStage: 'experience',
		targetStateId: 'agent-systems-state',
		targetLabel: 'EXPLORE AGENTIC SYSTEMS'
	}
]
