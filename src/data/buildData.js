// ============================================================================
// THE BUILD — VERIFIED PROJECT DATA (ACCURATE TO REPOSITORIES)
// Exactly two approved portfolio systems:
// 1. ARCHIVA (Self-Healing Agentic RAG Platform)
//    GitHub: https://github.com/Vsravanthi02/archiva-agentic-rag
// 2. EXPRESSION & SIGN LANGUAGE DETECTION (Computer Vision / Human Perception)
//    GitHub: https://github.com/Vsravanthi02/Expression-and-Sign-Language-Detection
// ZERO stale references, ZERO invented metrics, NO false claims.
// ============================================================================

export const BUILD_PROJECTS = {
	archiva: {
		id: 'archiva',
		number: '01',
		title: 'ARCHIVA',
		category: 'SELF-HEALING AGENTIC RAG',
		inscription: 'KNOWLEDGE IN MOTION',
		quote: "What happens when retrieval isn't good enough?",
		position: [4.6, 0, 20.8],
		accentColor: '#35d8ff',
		secondaryColor: '#69e3ff',
		summary:
			'Self-hosted document Q&A platform built with FastAPI + React. Combines query normalization, semantic caching, hybrid BM25 + dense retrieval with Reciprocal Rank Fusion (RRF), Cross-Encoder reranking, context optimization, LLM reasoning, deterministic reflection, and an automated self-healing loop.',
		pipeline: [
			{
				id: 'query_prep',
				label: 'Query & Ingest',
				detail: 'Normalizer, Context-Aware Rewriter, Intent Detector, Safety Layer, Semantic Cache & Multi-Hop Decomposition'
			},
			{
				id: 'retrieval',
				label: 'Hybrid Retrieval',
				detail: 'Rank-BM25 lexical search + dense embedding similarity (Sentence Transformers all-MiniLM-L6-v2) combined via RRF'
			},
			{
				id: 'rerank',
				label: 'Rerank & Gate',
				detail: 'Score gating & Cross-Encoder (ms-marco-MiniLM-L-6-v2) precision reranking for top semantic candidates'
			},
			{
				id: 'optimize',
				label: 'Context Optimization',
				detail: 'Prompt injection screening, MMR diversification, compression, parent-section expansion & citation mapping'
			},
			{
				id: 'reason',
				label: 'LLM Reasoning',
				detail: 'Worker routing via Groq: fast worker (llama-3.1-8b-instant) and strong worker (llama-3.3-70b-versatile)'
			},
			{
				id: 'reflect',
				label: 'Deterministic Reflection',
				detail: 'Algorithmic verification inspecting overlap ratio, number grounding & contradiction detection'
			},
			{
				id: 'heal',
				label: 'Self-Healing Loop',
				detail: 'Automated recovery triggering REWRITE_QUERY, INCREASE_TOP_K, STRICT_PROMPT, or REINGEST when retrieval is insufficient'
			},
			{
				id: 'output',
				label: 'Validation & Output',
				detail: 'Strict response validator delivering verified answer with structured source provenance'
			}
		],
		supportedIngestion: ['.txt', '.pdf', '.docx', '.md', '.csv', '.html'],
		selfHealingActions: ['REWRITE_QUERY', 'INCREASE_TOP_K', 'STRICT_PROMPT', 'REINGEST'],
		reflectionChecks: ['Overlap Ratio Check', 'Number Grounding Check', 'Contradiction Detection'],
		models: [
			{ name: 'llama-3.3-70b-versatile', role: 'Strong Reasoning Worker', provider: 'Groq' },
			{ name: 'llama-3.1-8b-instant', role: 'Fast Ingestion/Worker', provider: 'Groq' },
			{ name: 'sentence-transformers/all-MiniLM-L6-v2', role: 'Local Dense Embeddings', provider: 'Hugging Face' },
			{ name: 'cross-encoder/ms-marco-MiniLM-L-6-v2', role: 'Precision Reranker', provider: 'Cross-Encoder' }
		],
		technologies: [
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
			[
				'HYBRID RETRIEVAL (BM25 + DENSE)',
				'Combines lexical keyword search via Rank-BM25 with dense semantic embeddings (all-MiniLM-L6-v2) fused through Reciprocal Rank Fusion (RRF). Embeddings are stored as plain arrays with similarity evaluated application-side using cosine similarity.'
			],
			[
				'CROSS-ENCODER RERANKING',
				'Scores top retrieval candidates using ms-marco-MiniLM-L-6-v2 after score gating, capturing deep query-document cross-attention that bi-encoders miss.'
			],
			[
				'CONTEXT OPTIMIZATION PIPELINE',
				'Screens for prompt injections, applies Maximal Marginal Relevance (MMR) for chunk diversification, compresses context, expands parent document sections, and formats citation references.'
			],
			[
				'DETERMINISTIC REFLECTION',
				'Before emitting an answer, deterministic checks verify overlap ratio between retrieved context and response, validate numerical grounding, and screen for internal contradictions.'
			],
			[
				'SELF-HEALING REASONING LOOP',
				'When reflection detects insufficient retrieval grounding or low confidence, it executes autonomous healing actions: REWRITE_QUERY, INCREASE_TOP_K, STRICT_PROMPT, or REINGEST before retrying.'
			],
			[
				'RIGOROUS TEST SUITE',
				'Backed by 156 tests covering pytest test suites, PostgreSQL integration tests, mocked LLM call harnesses, and evaluation pipelines.'
			]
		],
		testing: '156 tests (pytest, PostgreSQL integration tests, mocked LLM calls, evaluation harness)',
		storageNote: 'Embeddings stored as plain arrays; similarity evaluated application-side via cosine similarity.',
		github: 'https://github.com/Vsravanthi02/archiva-agentic-rag'
	},
	vision: {
		id: 'vision',
		number: '02',
		title: 'EXPRESSION & SIGN LANGUAGE DETECTION',
		category: 'COMPUTER VISION / HUMAN PERCEPTION',
		inscription: 'HUMAN SIGNALS. MACHINE UNDERSTANDING.',
		quote: 'What if machines could interpret human signals?',
		position: [-4.6, 0, 20.8],
		accentColor: '#6fe7ff',
		secondaryColor: '#b4f0ff',
		summary:
			'Real-time human perception system built with OpenCV, MediaPipe Holistic, and Keras / TensorFlow. Captures live webcam feeds, extracts facial landmarks and dual-hand skeletal points, normalizes spatial coordinates into relative feature vectors, and classifies expressions and sign language gestures using a feedforward deep neural network.',
		pipeline: [
			{
				id: 'webcam',
				label: 'Webcam Input',
				detail: 'Real-time video frame acquisition and color space conversion via OpenCV'
			},
			{
				id: 'holistic',
				label: 'MediaPipe Holistic',
				detail: 'Simultaneous extraction of face mesh landmarks, left-hand skeleton, and right-hand skeleton'
			},
			{
				id: 'features',
				label: 'Normalized Features',
				detail: 'Coordinate translation into relative feature vectors; missing hand landmarks represented with zero values, saved as .npy'
			},
			{
				id: 'dense_net',
				label: 'Dense Neural Network',
				detail: 'Input Landmark Feature Vector → Dense(512, ReLU) → Dense(256, ReLU)'
			},
			{
				id: 'softmax',
				label: 'Softmax Classifier',
				detail: 'Dense(number_of_classes, Softmax) trained with RMSprop and categorical cross-entropy over 50 epochs'
			},
			{
				id: 'display',
				label: 'OpenCV Overlay',
				detail: 'Real-time visual display with predicted expression or sign language gesture label'
			}
		],
		inputSource: 'Live Webcam Stream',
		perceptionFramework: 'MediaPipe Holistic (Face Mesh + Dual Hand Landmarks)',
		featureFormat: 'Normalized relative coordinate vectors (.npy samples)',
		modelArchitecture: {
			input: 'Normalized Landmark Vector (Face + Left Hand + Right Hand)',
			hidden1: 'Dense(512, activation="relu")',
			hidden2: 'Dense(256, activation="relu")',
			output: 'Dense(number_of_classes, activation="softmax")',
			optimizer: 'RMSprop',
			loss: 'categorical_crossentropy',
			epochs: '50 epochs'
		},
		classes: [
			'HELLO',
			'HI',
			'GOODBYE',
			'HELP',
			'HOUSE',
			'NICE TO MEET YOU',
			'PLEASE',
			'STOP',
			'THANKS',
			'ANGRY',
			'LAUGH',
			'B',
			'C',
			'O',
			'U',
			'V',
			'W',
			'Y'
		],
		technologies: [
			'Python',
			'OpenCV',
			'MediaPipe Holistic',
			'NumPy',
			'Keras / TensorFlow'
		],
		capabilities: [
			[
				'MEDIAPIPE HOLISTIC TRACKING',
				'Tracks face landmarks, left-hand landmarks, and right-hand landmarks simultaneously directly from webcam frames without requiring specialized hardware.'
			],
			[
				'RELATIVE COORDINATE NORMALIZATION',
				'Converts raw absolute camera pixel coordinates into normalized relative feature representations invariant to subject distance. Missing hand landmarks are zero-filled, and collected samples are persisted as .npy files.'
			],
			[
				'DEEP DENSE NEURAL NETWORK',
				'Structured feedforward architecture: Dense(512, ReLU) → Dense(256, ReLU) → Dense(number_of_classes, Softmax), trained using RMSprop optimization and categorical cross-entropy loss over 50 epochs.'
			],
			[
				'DUAL SIGN & EXPRESSION RECOGNITION',
				'Classifies conversational signs (HELLO, GOODBYE, THANKS, PLEASE, HELP, STOP, HOUSE, NICE TO MEET YOU), facial expressions (ANGRY, LAUGH), and American Sign Language alphabet letters (B, C, O, U, V, W, Y).'
			],
			[
				'REAL-TIME OPENCV INFERENCE',
				'Executes live pipeline loops capturing frames, running MediaPipe landmark inference, forward-passing through the trained Keras model, and rendering dynamic text predictions on the active window.'
			]
		],
		github: 'https://github.com/Vsravanthi02/Expression-and-Sign-Language-Detection'
	}
}

export const BUILD_OVERHEAD = {
	number: '02',
	title: 'THE BUILD',
	subtitle: 'From ideas to working systems.',
	quote: 'Ideas become real when they are built.'
}

export const BUILD_FLOOR_GUIDES = {
	returnPrompt: {
		label: '← 01 — THE SPARK',
		detail: 'The questions that started my journey.',
		position: [1.8, 0.04, 15.0]
	},
	explorePrompt: {
		label: 'Explore the systems I built',
		position: [0, 0.04, 15.0]
	},
	forwardPrompt: {
		label: '03 — SOLVE →',
		detail: 'From systems to real-world impact.',
		position: [-1.8, 0.04, 15.0]
	}
}
