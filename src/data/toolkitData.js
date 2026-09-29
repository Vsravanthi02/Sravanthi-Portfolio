// ============================================================================
// THE ENGINEER'S TOOLKIT DATA MODEL (CHAPTER 05)
// STRICT WHITELIST: Only technologies and tools verified in actual engineering
// work, internship at Quintesys, or documented portfolio systems.
// ZERO INVENTED TOOLS. ZERO BUZZWORDS. ZERO MARKETING HYPE.
// ============================================================================

export const TOOLKIT_CORE = {
	id: 'toolkit-core',
	type: 'toolkit-core',
	chapterNumber: '05',
	chapterLabel: 'CHAPTER 05',
	title: "THE ENGINEER'S TOOLKIT",
	subtitle: 'TOOLS • PLATFORMS • SYSTEMS I USE',
	quote: 'The tools behind the systems.',
	plinthInscription: 'VERIFIED TECHNICAL STACK',
	description:
		'The engineering toolchain powering production systems, research architectures, and enterprise AI migrations. Every technology listed has been verified in code, tested against benchmarks, and deployed in real workflows.',
	categoriesSummary: [
		{ number: '01', name: 'AI / ML ENGINEERING', count: 11, accent: '#00d2ff' },
		{ number: '02', name: 'GENERATIVE AI & RAG', count: 7, accent: '#35d8ff' },
		{ number: '03', name: 'COMPUTER VISION', count: 7, accent: '#5fe2ff' },
		{ number: '04', name: 'DATA & RETRIEVAL', count: 8, accent: '#ffb45c' },
		{ number: '05', name: 'AI SYSTEMS & INFERENCE', count: 7, accent: '#00e5a3' },
		{ number: '06', name: 'VISUALIZATION, BI & AUTOMATION', count: 5, accent: '#a993ff' },
	],
	engineeringEnvironment: [
		{ name: 'Git', role: 'Distributed version control & branch hygiene' },
		{ name: 'GitHub', role: 'Collaborative PR reviews & repository management' },
		{ name: 'VS Code', role: 'Primary development environment & language tooling' },
		{ name: 'Docker', role: 'Runtime isolation & environment reproduction' },
	],
}

export const TOOLKIT_STATIONS = {
	aiMl: {
		id: 'station-aiml-engineering',
		key: 'aiMl',
		type: 'toolkit-station',
		number: '01',
		stationLabel: 'STATION 01 // AI / ML ENGINEERING',
		title: 'AI / ML ENGINEERING',
		subtitle: 'DEEP LEARNING & MODEL WEIGHTS',
		accentColor: '#00d2ff',
		secondaryColor: '#60d9ff',
		iconType: 'tensor',
		badge: 'CORE ML',
		technologies: [
			'Python',
			'PyTorch',
			'Keras',
			'NumPy',
			'Transformers',
			'Hugging Face',
			'Accelerate',
			'PEFT',
			'TRL',
			'BitsAndBytes',
			'Safetensors',
		],
		keyTechPills: ['Python', 'PyTorch', 'Keras', 'Transformers', 'PEFT'],
		summary:
			'Deep learning frameworks, parameter-efficient fine-tuning (PEFT), transformer architectures, and specialized neural network classifiers across production and research workflows.',
		usedAcross: [
			{
				project: 'Archiva',
				context:
					'Self-hosted document Q&A with hybrid retrieval, sentence-transformer embeddings, cross-encoder reranking, and a self-healing reflection loop.',
			},
			{
				project: 'Expression & Sign Detection',
				context:
					'MediaPipe and OpenCV landmark extraction with a Keras-based classifier for real-time expression and gesture recognition.',
			},
			{
				project: 'Quintesys AI Engineering',
				context:
					'Qwen2.5-Coder fine-tuning with QLoRA for PBIP-compatible Power BI visual generation, with prompt testing and output evaluation.',
			},
		],
	},

	genAiRag: {
		id: 'station-genai-rag',
		key: 'genAiRag',
		type: 'toolkit-station',
		number: '02',
		stationLabel: 'STATION 02 // GENAI & RAG',
		title: 'GENERATIVE AI & RAG',
		subtitle: 'MODELS, RETRIEVAL & AGENTS',
		accentColor: '#35d8ff',
		secondaryColor: '#80e5ff',
		iconType: 'agent',
		badge: 'APPLIED GENAI',
		technologies: [
			'Qwen2.5-Coder-7B-Instruct',
			'QLoRA',
			'Prompt Engineering',
			'LLM Evaluation',
			'RAG',
			'Agentic AI',
			'MCP Agents',
		],
		keyTechPills: ['Qwen2.5-Coder', 'QLoRA', 'RAG', 'Agentic AI', 'MCP Agents'],
		summary:
			'Instruction-tuned coding models, 4-bit quantized low-rank adaptation (QLoRA), hybrid retrieval-augmented generation (RAG), and Model Context Protocol (MCP) agent architectures.',
		usedAcross: [
			{
				project: 'Quintesys AI Engineering',
				context:
					'Qwen2.5-Coder fine-tuning with QLoRA for PBIP-compatible Power BI visual generation, with prompt testing and output evaluation.',
			},
			{
				project: 'Agentic Workflows',
				context:
					'Multi-turn agent tool execution via Model Context Protocol (MCP) servers for structured repository and filesystem inspection.',
			},
			{
				project: 'Archiva Document Q&A',
				context:
					'Self-hosted document Q&A with hybrid retrieval, cross-encoder reranking, context optimization, and a self-healing reflection loop.',
			},
		],
	},

	computerVision: {
		id: 'station-computer-vision',
		key: 'computerVision',
		type: 'toolkit-station',
		number: '03',
		stationLabel: 'STATION 03 // VISION',
		title: 'COMPUTER VISION',
		subtitle: 'PERCEPTION & SPATIAL TRACKING',
		accentColor: '#5fe2ff',
		secondaryColor: '#9bf0ff',
		iconType: 'lens',
		badge: 'PERCEPTION',
		technologies: [
			'OpenCV',
			'YOLOv8',
			'EasyOCR',
			'DeepFace',
			'MediaPipe',
			'ViT',
			'ResNet',
		],
		keyTechPills: ['OpenCV', 'YOLOv8', 'MediaPipe', 'DeepFace', 'EasyOCR'],
		summary:
			'Real-time frame ingestion, bounding-box object detection, landmark estimation, optical character recognition, and vision transformer feature extraction.',
		usedAcross: [
			{
				project: 'Expression & Sign Detection',
				context:
					'MediaPipe and OpenCV landmark extraction with a Keras-based classifier for real-time expression and gesture recognition.',
			},
			{
				project: 'Facial Feature & Perception Pipelines',
				context:
					'Webcam-based frame ingestion and normalized facial landmark coordinate extraction with OpenCV and MediaPipe.',
			},
			{
				project: 'Visual Document OCR',
				context:
					'Optical character recognition, text bounding-box extraction, and document layout inspection using EasyOCR and OpenCV.',
			},
		],
	},

	dataRetrieval: {
		id: 'station-data-retrieval',
		key: 'dataRetrieval',
		type: 'toolkit-station',
		number: '04',
		stationLabel: 'STATION 04 // DATA & RETRIEVAL',
		title: 'DATA & RETRIEVAL',
		subtitle: 'VECTORS, HYBRID SEARCH & GRAPHS',
		accentColor: '#ffb45c',
		secondaryColor: '#ffd28a',
		iconType: 'graph',
		badge: 'RETRIEVAL',
		technologies: [
			'PostgreSQL',
			'pgvector',
			'FAISS',
			'sentence-transformers',
			'BM25',
			'Neo4j',
			'RDF / Turtle',
			'MongoDB',
		],
		keyTechPills: ['PostgreSQL', 'pgvector', 'FAISS', 'BM25', 'RDF / Turtle'],
		summary:
			'Dense vector indexes, lexical keyword matching, hybrid reciprocal rank fusion, graph knowledge representations, and structured relational persistence.',
		usedAcross: [
			{
				project: 'Archiva Hybrid Retrieval Engine',
				context:
					'BM25 keyword search fused with sentence-transformers dense embeddings using Reciprocal Rank Fusion (RRF), with relational PostgreSQL persistence and in-memory cosine similarity, paired with RDF/Turtle ontologies.',
			},
			{
				project: 'Quintesys Enterprise Migration',
				context:
					'PostgreSQL with the pgvector extension for enterprise report metadata storage, semantic artifact indexing, and similarity search across Cognos and Power BI workspaces.',
			},
			{
				project: 'Knowledge Graph Systems',
				context:
					'Neo4j graph schemas, FAISS similarity search indexes for high-dimensional vectors, and MongoDB document collections.',
			},
		],
	},

	aiSystems: {
		id: 'station-ai-systems-inference',
		key: 'aiSystems',
		type: 'toolkit-station',
		number: '05',
		stationLabel: 'STATION 05 // SYSTEMS & INFERENCE',
		title: 'AI SYSTEMS & INFERENCE',
		subtitle: 'APIS, SERVING & RUNTIMES',
		accentColor: '#00e5a3',
		secondaryColor: '#6effd1',
		iconType: 'service',
		badge: 'INFERENCE',
		technologies: [
			'FastAPI',
			'Flask',
			'gRPC',
			'Ray',
			'Ray Serve',
			'MLflow',
			'Azure VMs',
		],
		keyTechPills: ['FastAPI', 'Flask', 'gRPC', 'Ray Serve', 'Azure VMs'],
		summary:
			'Asynchronous web services, low-latency binary RPC protocols, distributed inference orchestration, and Azure cloud virtual machine infrastructure.',
		usedAcross: [
			{
				project: 'Archiva Backend Service',
				context:
					'FastAPI asynchronous REST endpoints with streaming response generation, background indexing jobs, and validation schemas.',
			},
			{
				project: 'Vision & Inference Microservices',
				context:
					'Low-latency Flask and gRPC microservice communication for streaming video frames and model prediction payloads.',
			},
			{
				project: 'Distributed Serving & Experimentation',
				context:
					'Ray Serve for model replica lifecycle management, Ray worker pools for parallel compute, and MLflow for hyperparameter run tracking.',
			},
			{
				project: 'Cloud Compute Infrastructure',
				context:
					'Azure Virtual Machines provisioned for GPU model evaluation, heavy compiler builds, and enterprise migration testing.',
			},
		],
	},

	vizBiAutomation: {
		id: 'station-viz-bi-automation',
		key: 'vizBiAutomation',
		type: 'toolkit-station',
		number: '06',
		stationLabel: 'STATION 06 // VIZ, BI & AUTOMATION',
		title: 'VISUALIZATION, BI & AUTOMATION',
		subtitle: 'ANALYTICS, BI & WORKFLOWS',
		accentColor: '#a993ff',
		secondaryColor: '#ccbfff',
		iconType: 'chart',
		badge: 'ANALYTICS',
		technologies: [
			'Plotly',
			'Power BI Desktop',
			'Power BI Paginated Reports',
			'Power Automate',
			'Streamlit',
		],
		keyTechPills: ['Plotly', 'Power BI Desktop', 'Power BI Paginated', 'Power Automate', 'Streamlit'],
		summary:
			'AI-assisted visualization, Power BI Desktop and Paginated report workflows, desktop automation, and maintenance of existing Streamlit applications.',
		usedAcross: [
			{
				project: 'Plotly',
				context:
					'Extended MCP-based AI agents with dynamic Plotly visualization generation, including bar, line, and pie charts, combining textual insights, tabular data, and graphical outputs for end users.',
			},
			{
				project: 'Power BI Desktop',
				context:
					'Desktop PBIR semantic modeling, report authoring, and DAX expression validation for enterprise analytics.',
			},
			{
				project: 'Power BI Paginated Reports',
				context:
					'Enterprise Cognos-to-Power BI conversion: Paginated RDL report authoring and pixel-perfect operational reporting.',
			},
			{
				project: 'Power Automate',
				context:
					'Automated Power BI Desktop workflows using Power Automate to coordinate desktop-based reporting and migration tasks.',
			},
			{
				project: 'Streamlit',
				context:
					'Used for code refactoring and maintenance of existing Streamlit-based applications and workflows.',
			},
		],
	},
}

export const TOOLKIT_STATIONS_LIST = Object.values(TOOLKIT_STATIONS)
