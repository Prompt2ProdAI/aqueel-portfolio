import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '6',
    slug: 'mindmap-ai',
    title: 'Mindmap AI - Intelligent Knowledge Visualizer',
    shortDescription: 'AI-powered tool transforming complex queries into interactive, hierarchical mindmaps.',
    fullDescription: 'Engineered a full-stack application that leverages the Groq API to transform unstructured user queries into structured Markdown, which is then dynamically rendered into interactive mindmaps using Markmap.js. The system features a high-performance FastAPI backend for real-time processing and a responsive React frontend for seamless visualization.',
    category: 'nlp',
    technologies: ['FastAPI', 'React', 'Groq API', 'Markmap.js', 'TailwindCSS', 'TypeScript'],
    impact: 'Real-time knowledge visualization',
    links: [
      { type: 'github', url: 'https://github.com/XLR8MDA/mindmap-frontend', label: 'Frontend' },
      { type: 'github', url: 'https://github.com/XLR8MDA/mindmap-backend', label: 'Backend' },
      { type: 'demo', url: 'https://mindmap-fe-v2.xlr8090.workers.dev/', label: 'Live Demo' }
    ],
    challenges: [
      'Optimizing AI prompts for consistent hierarchical Markdown output',
      'Implementing real-time rendering of large, complex mindmap structures',
      'Ensuring cross-platform responsiveness for interactive SVG-based visualizations'
    ],
    featured: true
  },
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
    slug: 'agentmax-interviewer',
    title: 'AgentMAX - AI-Powered HR Interviewer',
    shortDescription: 'AI Voicebot conducting 100+ daily candidate interviews using Gemini 2.0.',
    fullDescription: 'Built an AI-powered voicebot that handles 100+ candidate interviews daily, leveraging Gemini 2.0 Multimodal Live API for real-time streaming. Engineered a structured 10-question HR protocol with a futuristic "Google-inspired" interface, featuring animated HUDs, real-time audio visualization, and automated session conclusion.',
    category: 'voice-ai',
    technologies: ['Gemini 2.0 API', 'React', 'TypeScript', 'WebSockets', 'SCSS', 'Vega Lite'],
    impact: '100+ interviews daily',
    links: [
      { type: 'demo', url: 'https://agentmax-interviewer.pages.dev/', label: 'Live Demo' }
    ],
    challenges: [
      'Orchestrating real-time multimodal streaming for low-latency feedback',
      'Implementing a strict state-managed interview protocol with automated tool-based conclusion',
      'Designing a high-fidelity futuristic UI with real-time audio pulse visualization'
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
    id: '5',
    slug: 'gitivity-github-tracker',
    title: 'Gitivity - GitHub Productivity Tracker',
    shortDescription: 'VS Code extension for automated work logging and AI-powered summaries.',
    fullDescription: 'Gitivity is a sophisticated VS Code extension designed to streamline developer productivity by automatically monitoring and logging file system activities. It generates human-readable work logs of modifications, creations, and deletions. Integrated with the Groq API, it provides concise AI-powered summaries of development progress. Additionally, it enables seamless creation of private GitHub repositories directly from the IDE.',
    category: 'nlp',
    technologies: ['TypeScript', 'VS Code API', 'Groq AI', 'Node.js', 'GitHub API'],
    impact: '48+ Installs on VS Code Marketplace',
    links: [
      { type: 'github', url: 'https://github.com/aqueel-softsensor/Gitvity-Extension', label: 'View Code' },
      { type: 'demo', url: 'https://marketplace.visualstudio.com/items?itemName=SmallUpAI.gitivity', label: 'Marketplace' }
    ],
    challenges: [
      'Implementing efficient real-time monitoring of workspace file events',
      'Orchestrating AI summarization workflows while maintaining IDE performance',
      'Securely managing API keys and GitHub authentication within VS Code'
    ],
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
  },
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
