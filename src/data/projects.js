// ============================================================================
// APPROVED PORTFOLIO PROJECTS DATA
// ============================================================================

export const archivaProject = {
	name: 'ARCHIVA',
	title: 'Self-Healing Agentic RAG Platform',
	identifier: 'ARCHIVA // RAG-01',
	description: 'Self-hosted agentic RAG for document-grounded question answering, combining hybrid retrieval (BM25 + dense embeddings with application-side cosine similarity), cross-encoder reranking, multi-hop reasoning, deterministic reflection, and an automated self-healing loop.',
	system: 'Agentic RAG / Knowledge Systems',
	core: 'FastAPI + React + Groq + PostgreSQL',
	pipeline: ['Ingest', 'Retrieve (BM25 + Dense)', 'RRF & Rerank', 'Reason', 'Reflect & Heal', 'Response'],
	technology: [
		'Python',
		'FastAPI',
		'React + Vite',
		'PostgreSQL',
		'Groq',
		'Sentence Transformers',
		'Cross-Encoder Reranking',
		'Rank-BM25',
		'Cosine Similarity'
	],
	capabilities: [
		['HYBRID RETRIEVAL', 'BM25 lexical search + dense embedding similarity fused via RRF (plain arrays + application-side cosine similarity)'],
		['CROSS-ENCODER RERANKING', 'ms-marco-MiniLM-L-6-v2 for precision scoring'],
		['DETERMINISTIC REFLECTION', 'Algorithmic checks for overlap ratio, number grounding, and contradiction detection'],
		['SELF-HEALING REASONING', 'Autonomous loop: REWRITE_QUERY, INCREASE_TOP_K, STRICT_PROMPT, REINGEST'],
		['TESTING', '156 tests (pytest, PostgreSQL integration, mocked LLM calls, eval harness)']
	],
	links: { github: 'https://github.com/Vsravanthi02/archiva-agentic-rag' }
}

export const visionProject = {
	name: 'EXPRESSION & SIGN LANGUAGE DETECTION',
	title: 'Computer Vision & Gesture Recognition',
	identifier: 'VISION // CV-02',
	description: 'Real-time human perception system utilizing OpenCV, MediaPipe Holistic, and a Keras deep feedforward network to extract normalized facial and dual-hand skeletal landmarks for live expression and sign language classification.',
	system: 'Computer Vision / Human Perception',
	core: 'OpenCV + MediaPipe Holistic + Keras/TensorFlow',
	pipeline: ['Webcam Input', 'MediaPipe Holistic', 'Normalized Features', 'Dense 512 → 256', 'Softmax Classification', 'OpenCV Overlay'],
	technology: [
		'Python',
		'OpenCV',
		'MediaPipe Holistic',
		'NumPy',
		'Keras / TensorFlow'
	],
	capabilities: [
		['HOLISTIC PERCEPTION', 'Simultaneous extraction of face mesh and dual-hand skeletal points'],
		['FEATURE NORMALIZATION', 'Relative spatial normalization of landmark coordinate vectors saved as .npy'],
		['DENSE CLASSIFIER', 'Dense(512, ReLU) → Dense(256, ReLU) → Dense(Classes, Softmax) trained with RMSprop (50 epochs)'],
		['DUAL VOCABULARY', 'Conversational sign recognition (HELLO, GOODBYE, THANKS, etc.) and facial expression classification']
	],
	links: { github: 'https://github.com/Vsravanthi02/Expression-and-Sign-Language-Detection' }
}
