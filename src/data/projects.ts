import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'conversational-ai-hotel',
    title: 'Multi-Agent Hotel Booking System',
    shortDescription: 'Stateful voice agent system handling reservations for 10+ locations.',
    fullDescription: 'Designed and implemented a sophisticated, stateful multi-agent system using LangGraph to manage complex user dialogues, orchestrating specialized agents for FAQs, room availability, and booking. Engineered a high-performance, asynchronous API service using FastAPI with Docker, a Kong API Gateway, managing data persistence with PostgreSQL, caching with Redis.',
    category: 'agents',
    technologies: ['LangGraph', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker'],
    impact: 'Live in 10+ locations',
    links: [
      { type: 'github', url: 'https://github.com/m-aqueel', label: 'View Code' },
      { type: 'demo', url: '#', label: 'Live Demo' }
    ],
    challenges: [
      'Managing state across long-running voice conversations',
      'Optimizing latency for real-time speech-to-speech interaction'
    ],
    featured: true
  },
  {
    id: '2',
    slug: 'agentmax-voicebot',
    title: 'AgentMax - Voice Interviewer',
    shortDescription: 'AI Voicebot conducting 100+ daily candidate interviews.',
    fullDescription: 'Built an AI-powered voicebot that handled 100+ candidate interviews daily, leveraging Twilio, Ultravox for real-time streaming and speech-to-speech conversion. Engineered dynamic, prompt-driven Q&A flows tailored to candidate profiles using configurable LLM prompts.',
    category: 'voice-ai',
    technologies: ['Ultravox', 'Twilio', 'MongoDB', 'Python'],
    impact: '100+ interviews daily',
    links: [
      { type: 'demo', url: '#', label: 'Live Demo' }
    ],
    featured: true
  },
  {
    id: '3',
    slug: 'spiritual-chatbot-rag',
    title: 'Semantic Domain Search (RAG)',
    shortDescription: 'Hybrid RAG system with 100k+ downloads.',
    fullDescription: 'Built a hybrid semantic search system using Qdrant vector DB, embeddings, and intent-based metadata filtering. Integrated ColBERT-based re-ranking to improve semantic relevance of retrieved answers. Applied language detection and translation (ELD+LLMs) to handle multilingual queries.',
    category: 'rag',
    technologies: ['Qdrant', 'ColBERT', 'LangChain', 'Sentence-Transformers'],
    impact: '100k+ downloads',
    links: [],
    featured: true
  },
  {
    id: '4',
    slug: 'workforce-management',
    title: 'Automated Rostering System',
    shortDescription: 'Algorithm reducing manual scheduling time by 40%.',
    fullDescription: 'Built an automated shift planning algorithm that optimized staff allocation, reducing manual scheduling time by 40%. Integrated Twilio SMS API to trigger instant roster updates and shift alerts for 50+ employees.',
    category: 'mlops',
    technologies: ['FastAPI', 'Pandas', 'Twilio API'],
    impact: '40% time saved',
    links: [],
    featured: false
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

// Helper function to get next/previous project
export const getAdjacentProjects = (currentSlug: string): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex(p => p.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  };
};
