export const archivaProject = {
	name: 'ARCHIVA',
	title: 'Agentic RAG Platform',
	identifier: 'ARCHIVA // RAG-01',
	description: 'Self-hosted agentic RAG for document-grounded question answering, combining hybrid retrieval, reranking, reflection, and a self-healing reasoning loop.',
	system: 'Agentic RAG',
	core: 'Retrieval + Reasoning + Tool Use',
	pipeline: ['Documents', 'Ingestion', 'Retrieval', 'Agent', 'Response'],
	technology: ['Python', 'FastAPI', 'React', 'RAG', 'BM25', 'Sentence Transformers', 'Cross-Encoder', 'Groq', 'PostgreSQL', 'Agentic Workflows'],
	capabilities: [
		['HYBRID RETRIEVAL', 'BM25 + Dense Embeddings'],
		['RERANKING', 'Cross-Encoder'],
		['AGENTIC CONTROL', 'Reflection + Self-Healing'],
		['QUERY INTELLIGENCE', 'Multi-Hop Decomposition'],
		['GROUNDING', 'Context Optimization + Validation'],
		['PERSISTENCE', 'Postgres'],
	],
	links: { github: 'https://github.com/Vsravanthi02/archiva-agentic-rag' },
}
