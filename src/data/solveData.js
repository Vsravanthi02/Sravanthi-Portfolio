// ============================================================================
// CHAPTER 03 — THE SOLVE DATA MODEL
// Core Idea: Problems are where systems become real.
// Communicates engineering thought process, reasoning under uncertainty,
// and transformation:
//   01 — RETRIEVAL: Noise → Filter → Insight
//   02 — PERCEPTION: Signal → Spatial Landmarks → Meaning
//   03 — UNCERTAINTY: Failure → Deterministic Reflection → Stronger System
// ZERO fake metrics, ZERO unsupported benchmarks, NO excluded technologies.
// ============================================================================

export const SOLVE_OVERHEAD = {
	number: '03',
	title: 'THE SOLVE',
	subtitle: 'Problems are where systems become real.',
	quote: 'Complexity is a problem, not a wall.'
}

export const SOLVE_CORE = {
	title: 'ENGINEERING UNDER UNCERTAINTY',
	detail: 'Explore how problems become progress.',
	position: [0, 0, 38.0]
}

export const SOLVE_CHAMBERS = {
	retrieval: {
		id: 'retrieval',
		type: 'solve-chamber',
		number: '01',
		title: 'RETRIEVAL',
		theme: 'Information Retrieval & Noise Reduction',
		subtitle: 'Finding the signal inside the noise.',
		inscription: 'FROM INFORMATION TO INSIGHT',
		quote: 'When information is vast, clarity is an architectural choice.',
		summary: 'Modern knowledge systems rarely fail from a lack of data; they fail from an abundance of irrelevant noise. Transforming raw documents into precise, factual answers requires disciplined multi-stage retrieval, re-ranking, and grounded reasoning.',
		// Camera at Z=31 looking at Z=38 (+Z forward): +X is screen left, -X is screen right
		position: [6.8, 0, 41.5],
		accentColor: '#35d8ff',
		secondaryColor: '#69e3ff',
		problem: {
			title: 'Semantic Dilution & Keyword Mismatch',
			statement: 'Standard lexical search fails on conceptual queries, while dense vector retrieval alone struggles with precise keywords, numbers, and technical identifiers. Documents contain high boilerplate noise that dilutes context windows.',
			challenges: [
				{ aspect: 'Lexical vs Dense Mismatch', detail: 'BM25 catches exact identifiers but misses synonyms; vector embeddings catch concepts but confuse version numbers.' },
				{ aspect: 'Context Window Flooding', detail: 'Injecting raw document chunks introduces irrelevant noise and distracts the reasoning LLM.' },
				{ aspect: 'Information Hallucination', detail: 'When candidate passages are ambiguous, generative models tend to confabulate answers.' }
			]
		},
		investigation: {
			keyQuestion: 'How do we guarantee that the LLM receives only verified, high-density signal?',
			technicalAnalysis: 'We split retrieval into two decoupled stages: high-recall candidate generation (hybrid lexical + dense retrieval) followed by a cross-encoder re-ranking pass that scores query-document pairs simultaneously with deep cross-attention, eliminating 80%+ of irrelevant noise before LLM prompting.'
		},
		transformation: {
			from: 'NOISE',
			process: 'FILTER & RERANK',
			to: 'INSIGHT',
			stages: [
				{ label: 'QUERY NORMALIZATION', input: 'Raw conversational user prompt', logic: 'Extract core intent, strip conversational filler, and expand technical terms.', output: 'Focused search query' },
				{ label: 'HYBRID CANDIDATE FETCH', input: 'Normalized query vector & tokens', logic: 'Parallel execution across lexical index and embedding space for top-50 candidates.', output: 'Candidate chunk pool' },
				{ label: 'CROSS-ENCODER RERANK', input: 'Query + Top candidate pairs', logic: 'Deep joint attention scoring cross-evaluating candidate relevance against query intent.', output: 'Top-5 authoritative chunks' },
				{ label: 'FACTUAL GROUNDING', input: 'Top chunks + Strict system prompt', logic: 'Direct synthesis with citation boundaries and mandatory factual grounding checks.', output: 'Grounded factual insight' }
			]
		},
		pipeline: [
			{ id: 'query', label: 'QUERY', detail: 'Focused intent normalization stripping conversational filler.' },
			{ id: 'retrieve', label: 'RETRIEVE', detail: 'High-recall candidate generation across lexical and dense indices.' },
			{ id: 'rerank', label: 'RERANK', detail: 'Cross-encoder scoring isolating true semantic relevance from noise.' },
			{ id: 'reason', label: 'REASON', detail: 'Synthesizing verified factual ground into actionable insight.' }
		],
		engineeringPrinciple: {
			name: 'Precision Over Volume',
			axiom: 'A model with 500 tokens of high-density truth outperforms a model with 50,000 tokens of unranked context.',
			ruleOfThumb: 'Always re-rank candidate documents before passing them into generative context.'
		},
		technologies: ['FastAPI', 'React', 'Sentence Transformers', 'Cross-Encoders', 'Cosine Similarity', 'Python'],
		projectReference: 'Architecture verified in Archiva (Self-Healing Agentic RAG Platform).'
	},

	perception: {
		id: 'perception',
		type: 'solve-chamber',
		number: '02',
		title: 'PERCEPTION',
		theme: 'Computer Vision & Signal Extraction',
		subtitle: 'Understanding human signals.',
		inscription: 'FROM SIGNALS TO MEANING',
		quote: 'A camera sees pixels; an intelligent system understands intent.',
		summary: 'Human expression and sign language are fluid, high-dimensional, and continuous. Bridging the gap between raw video frames and communicative understanding requires converting visual signals into spatial landmarks and invariant feature vectors.',
		position: [0, 0, 45.0],
		accentColor: '#6fe7ff',
		secondaryColor: '#ffffff',
		problem: {
			title: 'Spatial Variability & High-Dimensional Noise',
			statement: 'Raw pixel matrices vary wildly across users due to lighting, background clutter, camera angle, and distance from the lens. Training directly on pixels leads to catastrophic overfitting on superficial artifacts rather than true physical gestures.',
			challenges: [
				{ aspect: 'Illumination & Background Variance', detail: 'Changes in room lighting and backdrops alter pixel matrices without changing the user gesture.' },
				{ aspect: 'Distance & Scale Shift', detail: 'Hand and face sizes fluctuate drastically depending on user distance from the webcam.' },
				{ aspect: 'Real-Time Latency Budget', detail: 'Processing 30+ frames per second requires lightweight representations that run deterministically in real time.' }
			]
		},
		investigation: {
			keyQuestion: 'How can an algorithmic pipeline become invariant to camera position, background, and lighting?',
			technicalAnalysis: 'By decoupling perception into two decoupled phases: first, landmark extraction using geometric coordinate meshes (MediaPipe Holistic), and second, translation-invariant feature normalization (centering coordinates relative to wrist and nose anchor landmarks) before neural classification.'
		},
		transformation: {
			from: 'SIGNALS',
			process: 'LANDMARK NORMALIZATION',
			to: 'MEANING',
			stages: [
				{ label: 'FRAME ACQUISITION', input: 'Raw RGB video stream from camera', logic: 'Capture 30 FPS frames with resolution scaling and color-space conversion.', output: 'Processed frame buffer' },
				{ label: 'LANDMARK EXTRACTION', input: 'Video frame', logic: 'MediaPipe Holistic predicts 3D face mesh (468 points) and dual hand skeletons (21 points each).', output: 'Raw (x, y, z) coordinate array' },
				{ label: 'SPATIAL NORMALIZATION', input: 'Raw landmark coordinates', logic: 'Zero-center relative to reference roots (wrist for hands, nose bridge for face) and scale-normalize.', output: 'Invariant feature vector' },
				{ label: 'GESTURE CLASSIFICATION', input: 'Normalized feature vector', logic: 'Feed forward neural network classifies expression states and sign language characters.', output: 'Identified gesture & expression' }
			]
		},
		pipeline: [
			{ id: 'input', label: 'RAW INPUT', detail: 'Continuous camera pixel feed capturing unconstrained human gestures.' },
			{ id: 'landmarks', label: 'LANDMARKS', detail: 'MediaPipe Holistic extracts 3D face mesh and skeletal hand coordinates.' },
			{ id: 'features', label: 'FEATURES', detail: 'Spatial translation into normalized relative vectors invariant to distance.' },
			{ id: 'representation', label: 'REPRESENTATION', detail: 'Dense neural feature layers capture high-order gesture semantics.' },
			{ id: 'classification', label: 'CLASSIFICATION', detail: 'Mapping structured vectors to communicative meaning (expressions/signs).' }
		],
		engineeringPrinciple: {
			name: 'Geometric Invariance',
			axiom: 'Separate semantic geometry from sensory artifacts before applying machine learning.',
			ruleOfThumb: 'Normalize coordinate origins and scale before feeding landmarks to classifiers.'
		},
		technologies: ['OpenCV', 'MediaPipe Holistic', 'PyTorch', 'NumPy', 'Scikit-learn', 'Python'],
		projectReference: 'Architecture verified in Expression & Sign Language Detection.'
	},

	uncertainty: {
		id: 'uncertainty',
		type: 'solve-chamber',
		number: '03',
		title: 'UNCERTAINTY',
		theme: 'System Resilience & Self-Healing Architecture',
		subtitle: 'Designing systems that adapt.',
		inscription: 'FROM FAILURE TO STRONGER SYSTEMS',
		quote: 'Failure is not the opposite of success; it is the calibration data.',
		summary: 'Complex AI pipelines operate under inherent uncertainty: ambiguous queries, poor retrieval recall, and model drift. Truly robust systems build deterministic reflection loops and autonomous self-healing to continuously recover and improve.',
		// Camera at Z=31 looking at Z=38 (+Z forward): -X is screen right
		position: [-6.8, 0, 41.5],
		accentColor: '#ffb45c',
		secondaryColor: '#ffe0b2',
		problem: {
			title: 'Cascading Errors & Silent Degradation',
			statement: 'In multi-step systems, an early failure (such as an ambiguous query or a miss in retrieval) silently cascades into downstream components, resulting in hallucinated outputs or broken state without triggering standard code exceptions.',
			challenges: [
				{ aspect: 'Silent Retrieval Misses', detail: 'When vector search returns off-topic documents, LLMs generate plausible but factually incorrect explanations.' },
				{ aspect: 'Static Execution Paths', detail: 'Linear pipelines have no feedback mechanism to back out of a poor trajectory and try alternative strategies.' },
				{ aspect: 'Boundary Case Drift', detail: 'Edge cases and unusual document structures cause inconsistent parsing behavior.' }
			]
		},
		investigation: {
			keyQuestion: 'How can an autonomous system detect its own errors and self-heal before returning an answer?',
			technicalAnalysis: 'We introduce deterministic verification barriers (reflection checks) after critical stages. If an output fails factual grounding, length, or semantic relevance checks, the controller diagnoses the root cause and triggers a corrective action loop (e.g. query rewriting, top-k expansion, or fallback synthesis).'
		},
		transformation: {
			from: 'FAILURE',
			process: 'DETERMINISTIC REFLECTION',
			to: 'STRONGER SYSTEM',
			stages: [
				{ label: 'EXECUTION ATTEMPT', input: 'Initial query & retrieval parameters', logic: 'Pipeline executes initial search and draft response synthesis.', output: 'Draft candidate output' },
				{ label: 'DETERMINISTIC REFLECTION', input: 'Draft response + retrieved source chunks', logic: 'Rule-based verification verifies factual citation presence, length, and grounded claims.', output: 'Validation status & error diagnosis' },
				{ label: 'CORRECTIVE SELF-HEALING', input: 'Diagnosed failure signature', logic: 'Autonomous corrective action: rewrite query, expand search threshold, or re-rank candidates.', output: 'Calibrated re-execution plan' },
				{ label: 'STABILIZED RESOLUTION', input: 'Recovered pipeline execution', logic: 'Final synthesis confirmed against grounding invariants before delivery to user.', output: 'Resilient, verified result' }
			]
		},
		pipeline: [
			{ id: 'investigate', label: 'INVESTIGATE', detail: 'Deterministic checks inspect output grounding, numbers, and consistency.' },
			{ id: 'diagnose', label: 'DIAGNOSE', detail: 'Isolate root cause: ambiguous query, low retrieval recall, or model drift.' },
			{ id: 'adapt', label: 'ADAPT', detail: 'Execute corrective self-healing: rewrite query, expand top-k, or reingest.' },
			{ id: 'validate', label: 'VALIDATE', detail: 'Verify the adapted output against strict truth and factual constraints.' }
		],
		engineeringPrinciple: {
			name: 'Autonomous Self-Correction',
			axiom: 'A system that assumes perfection will crash; a system that expects failure will endure.',
			ruleOfThumb: 'Always insert deterministic reflection checkpoints after probabilistic model generation.'
		},
		technologies: ['FastAPI', 'AsyncIO', 'Pydantic', 'Deterministic Guards', 'Python'],
		projectReference: 'Foundational engineering methodology demonstrated across Archiva and production workflows.'
	}
}

export const SOLVE_FLOOR_GUIDES = {
	returnPrompt: {
		label: '← 02 — THE BUILD',
		detail: 'The systems I built.',
		position: [-4.2, 0.22, 30.5]
	},
	forwardPrompt: {
		label: '04 — THE ENGINEER →',
		detail: 'Quintesys professional experience.',
		position: [4.2, 0.22, 30.5]
	},
	centerPrompt: {
		label: 'Explore how problems become progress.',
		position: [0, 0.04, 30.5]
	},
	explorePrompt: {
		label: 'THREE PROBLEM CHAMBERS — EXPLORE WITH [ E ] OR CLICK',
		detail: 'Engineering under uncertainty.'
	}
}

