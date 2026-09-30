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
		title: 'FALSE POSITIVES IN SELF-CHECKING',
		theme: 'VERIFICATION & GROUNDING',
		subtitle: 'Catching hallucinations without rejecting correct answers.',
		inscription: 'VERIFY WITHOUT OVER-FILTERING',
		quote: 'How do we make verification strict enough to catch hallucinations without rejecting correct answers?',
		summary: "Archiva’s reflection layer initially rejected some valid responses. Contradiction checks flagged honest answers such as ‘the documents don't say,’ while number-grounding checks rejected correct calculated totals when the result itself did not appear verbatim in the source. Follow-up rewriting could also anchor to a previous answer or unrelated question.",
		// Camera at Z=31 looking at Z=38 (+Z forward): +X is screen left, -X is screen right
		position: [6.8, 0, 41.5],
		accentColor: '#35d8ff',
		secondaryColor: '#69e3ff',
		problem: {
			title: 'FALSE POSITIVES IN SELF-CHECKING',
			statement: "Archiva’s reflection layer initially rejected some valid responses. Contradiction checks flagged honest answers such as ‘the documents don't say,’ while number-grounding checks rejected correct calculated totals when the result itself did not appear verbatim in the source. Follow-up rewriting could also anchor to a previous answer or unrelated question.",
			challenges: [
				{ aspect: '1. OVER-SENSITIVE CONTRADICTION CHECKS', detail: 'Correct uncertainty statements could be interpreted as contradictions.' },
				{ aspect: '2. STRICT NUMBER GROUNDING', detail: 'Valid arithmetic results were rejected because the final number was not explicitly written in the source.' },
				{ aspect: '3. INCORRECT FOLLOW-UP ANCHORING', detail: 'Rewriting could inherit context from a previous answer or question when the new query was unrelated.' }
			]
		},
		investigation: {
			keyQuestion: 'How do we make verification strict enough to catch hallucinations without rejecting correct answers?',
			technicalAnalysis: "Verification logic was initially over-sensitive to negative phrasing and numerical mismatches. Contradiction evaluation flagged honest statements of document absence as conflicting assertions, while number-grounding checks failed to recognize arithmetic deductions from verified source values. Additionally, conversational query rewrites carried forward previous answer context even when users switched topics."
		},
		transformation: {
			from: 'OVER-FILTERING',
			process: 'REFINED VERIFICATION',
			to: 'GROUNDED ACCURACY',
			stages: [
				{ label: 'CONTRADICTION CHECK', input: 'Candidate response + retrieved evidence', logic: 'Refine verification logic so uncertainty statements are not incorrectly treated as contradictions.', output: 'Verification result' },
				{ label: 'NUMBER GROUNDING', input: 'Calculated totals + source numeric figures', logic: 'Validate valid arithmetic results even when the final number is not explicitly written in the source.', output: 'Numerical grounding status' },
				{ label: 'FOLLOW-UP ANCHORING', input: 'Current query + conversation history', logic: 'Prevent query rewrite from inheriting context from a previous answer or question when the new query is unrelated.', output: 'Disambiguated query' },
				{ label: 'REFINED VERIFICATION', input: 'Grounded assertions + calibrated checks', logic: 'Verification rejects unsupported claims while preserving answers that are correctly grounded, calculated, or explicitly uncertain.', output: 'Reliable verified response' }
			]
		},
		pipeline: [
			{ id: 'contradiction', label: 'CONTRADICTION CHECK', detail: 'Refine verification logic so uncertainty statements are not treated as contradictions.' },
			{ id: 'number', label: 'NUMBER GROUNDING', detail: 'Validate arithmetic results without requiring verbatim matches in source text.' },
			{ id: 'anchoring', label: 'FOLLOW-UP ANCHORING', detail: 'Prevent rewriting from inheriting context from unrelated previous answers.' },
			{ id: 'verification', label: 'REFINED VERIFICATION', detail: 'Reject unsupported claims while preserving grounded, calculated, or uncertain answers.' }
		],
		engineeringPrinciple: {
			name: 'VERIFY WITHOUT OVER-FILTERING',
			axiom: 'Verification should reject unsupported claims while preserving answers that are correctly grounded, calculated, or explicitly uncertain.',
			ruleOfThumb: 'Verification must distinguish between factual hallucinations and legitimate statements of document uncertainty or calculated results.'
		},
		technologies: ['Python', 'FastAPI', 'RAG', 'Reflection Checks'],
		projectReference: 'Architecture verified in Archiva (Agentic RAG Platform).'
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
		title: 'LATENCY & RELIABILITY UNDER LOAD',
		theme: 'SYSTEM RELIABILITY',
		subtitle: 'Keeping concurrent retrieval and model pipelines responsive.',
		inscription: 'CONTROL THE FAILURE SURFACE',
		quote: 'How do we keep an AI pipeline responsive when retrieval and model calls happen concurrently?',
		summary: 'Under concurrent use, Archiva experienced Groq rate limits, stalled requests, and blocked application processing. Multiple retry layers increased latency, oversized context consumed token capacity, synchronous retrieval work blocked the event loop, and chat requests could remain open indefinitely.',
		// Camera at Z=31 looking at Z=38 (+Z forward): -X is screen right
		position: [-6.8, 0, 41.5],
		accentColor: '#ffb45c',
		secondaryColor: '#ffe0b2',
		problem: {
			title: 'LATENCY & RELIABILITY UNDER LOAD',
			statement: 'Under concurrent use, Archiva experienced Groq rate limits, stalled requests, and blocked application processing. Multiple retry layers increased latency, oversized context consumed token capacity, synchronous retrieval work blocked the event loop, and chat requests could remain open indefinitely.',
			challenges: [
				{ aspect: '1. STACKED RETRY BEHAVIOR', detail: 'Groq SDK retries combined with application-level retries and key rotation, increasing worst-case latency.' },
				{ aspect: '2. OVERSIZED CONTEXT', detail: 'Parent chunks of roughly 5,900 tokens could exceed the intended 1,200-token context limit and contribute to token-limit failures.' },
				{ aspect: '3. BLOCKED EVENT LOOP', detail: '/suggestions performed multiple retrieval and cross-encoder operations directly inside the coroutine.' },
				{ aspect: '4. HUNG REQUESTS', detail: '/chat had no request timeout, allowing stalled requests to remain open.' }
			]
		},
		investigation: {
			keyQuestion: 'How do we keep an AI pipeline responsive when retrieval and model calls happen concurrently?',
			technicalAnalysis: "Under concurrent load, stacked retry layers across the Groq SDK, application logic, and key rotation multiplied worst-case request delays. Meanwhile, oversized parent chunks of ~5,900 tokens quickly exceeded the 1,200-token context boundary, synchronous retrieval and cross-encoder tasks blocked FastAPI's coroutine event loop, and missing request timeouts left unclosed chat connections."
		},
		transformation: {
			from: 'CONCURRENT BOTTLENECKS',
			process: 'CONTROLLED EXECUTION',
			to: 'BOUNDED LATENCY',
			stages: [
				{ label: 'RETRY & REQUEST CONTROL', input: 'Concurrent API requests', logic: 'Bound model retries and request execution so transient failures do not cascade into unnecessary latency.', output: 'Controlled model/retrieval execution' },
				{ label: 'CONTEXT CONTROL', input: 'Retrieved parent document chunks', logic: 'Bound retrieved chunks so oversized parent content does not exceed the intended context limit.', output: 'Bounded prompt context' },
				{ label: 'ASYNC EXECUTION', input: 'Concurrent search & cross-encoder operations', logic: 'Offload retrieval and cross-encoder operations from the main coroutine to keep the event loop responsive.', output: 'Non-blocking event loop' },
				{ label: 'TIMEOUT & RECOVERY', input: 'Active API & chat connections', logic: 'Enforce explicit request timeouts so stalled connections terminate cleanly instead of remaining open indefinitely.', output: 'Controlled execution & recovery' }
			]
		},
		pipeline: [
			{ id: 'request', label: 'RETRY & REQUEST CONTROL', detail: 'Bound model retries and request execution so transient failures do not cascade into unnecessary latency.' },
			{ id: 'context', label: 'CONTEXT CONTROL', detail: 'Bound retrieved chunks so oversized parent content does not exceed the intended context limit.' },
			{ id: 'async', label: 'ASYNC EXECUTION', detail: 'Offload retrieval and cross-encoder operations to keep the event loop responsive.' },
			{ id: 'timeout', label: 'TIMEOUT & RECOVERY', detail: 'Enforce explicit request timeouts to terminate stalled connections cleanly.' }
		],
		engineeringPrinciple: {
			name: 'CONTROL THE FAILURE SURFACE',
			axiom: 'Reliability is not only about successful responses; it also requires bounded retries, controlled context size, non-blocking execution, and explicit timeouts.',
			ruleOfThumb: 'Reliability requires bounded retries, controlled context size, non-blocking execution, and explicit timeouts.'
		},
		technologies: ['FastAPI', 'AsyncIO', 'Python', 'Groq', 'Cross-Encoder'],
		projectReference: 'Architecture verified in Archiva (Agentic RAG Platform).'
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

