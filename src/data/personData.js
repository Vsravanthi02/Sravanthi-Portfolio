// ============================================================================
// THE PERSON DATA MODEL (CHAPTER 06 — THE PERSON)
// Grounded in genuine personal facts, academic path, and engineering curiosity.
// Simple, honest, and appropriate for a fresher / recent graduate.
// ZERO INVENTED CLAIMS. ZERO HYPERBOLE. EXACTLY 3 SECTIONS.
// ============================================================================

export const PERSON_PROFILE = {
	chapterNumber: '06',
	chapterLabel: 'CHAPTER 06',
	title: 'THE PERSON',
	subtitle: 'Beyond the code.',
	name: 'SRAVANTHI ADDAGADA',
	role: 'AI / GENAI ENGINEER',
	location: 'India',
	quote: 'I enjoy turning complex problems into practical, meaningful solutions.',
	photoUrl: '/images/sravanthi.jpg',
	statement: [
		'Curious mind.',
		'Builder at heart.',
		'Lifelong learner.',
		'Problem solver.',
		'',
		'Still exploring.',
		'Still building.',
	],
}

export const PERSON_DESTINATIONS = [
	{
		id: 'journey',
		number: '01',
		title: 'MY JOURNEY',
		subtitle: 'From learning to building',
		shortTitle: 'My Journey',
		accentColor: '#00d2ff',
		secondaryColor: '#80e5ff',
		iconType: 'compass',
		education: {
			degree: 'B.Tech — Computer Science Engineering with Artificial Intelligence',
			institution: 'Kakinada Institute of Engineering and Technology for Women (KIET)',
			cgpa: '7.18',
		},
		intro:
			'During my B.Tech, I explored AI and software development through projects, coursework, and practical learning. I also participated in student activities alongside my academics.',
		collegeActivities: [
			{
				year: '2024',
				title: 'DHEEKSHARAMBH',
				role: 'Student Mentor',
				description:
					'Mentored first-year students during academic onboarding and participated in sessions on technology awareness and career growth.',
			},
			{
				year: '2025',
				title: 'PYTHON TEACHING ASSISTANT',
				role: 'Teaching Assistant',
				description:
					'Conducted Python sessions covering loops, conditions, and functions, and helped students debug programs and improve logical thinking.',
			},
		],
		internship: {
			year: '2026',
			title: 'AI ENGINEERING INTERNSHIP',
			description:
				'Applied my academic learning through practical AI, machine learning, and Generative AI work during my internship.',
		},
	},
	{
		id: 'enjoy',
		number: '02',
		title: 'WHAT I ENJOY',
		subtitle: 'Learning, building, exploring',
		shortTitle: 'What I Enjoy',
		accentColor: '#ffb45c',
		secondaryColor: '#ffd28a',
		iconType: 'heart',
		intro:
			'I enjoy learning new things, working on technical problems, and building projects to understand how things work.',
		cards: [
			{
				title: 'LEARNING',
				description: 'Exploring new concepts and technologies.',
			},
			{
				title: 'BUILDING',
				description: 'Turning ideas into working projects.',
			},
			{
				title: 'EXPLORING',
				description: 'Trying different approaches and learning from them.',
			},
		],
	},
	{
		id: 'headed',
		number: '03',
		title: "WHERE I'M HEADED",
		subtitle: 'Learning & growth',
		shortTitle: "Where I'm Headed",
		accentColor: '#c084fc',
		secondaryColor: '#e9d5ff',
		iconType: 'flag',
		intro:
			'I want to continue learning AI and Generative AI, work with experienced engineers, and gain more experience building practical systems.',
		cards: [
			{
				title: 'LEARN',
				description: 'Keep developing my technical skills.',
			},
			{
				title: 'BUILD',
				description: 'Work on practical AI systems and projects.',
			},
			{
				title: 'GROW',
				description: 'Learn from real-world engineering experience.',
			},
		],
	},
]

export const PERSON_DESTINATIONS_BY_ID = Object.fromEntries(
	PERSON_DESTINATIONS.map((dest) => [dest.id, dest])
)
