import type { WorkExperience, Skill } from '@/types';

export const workExperience: WorkExperience[] = [
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'AI/ML Engineer (Contract)',
    location: 'Remote',
    period: 'September 2025 - Present',
    projects: [
      {
        name: 'Conversational AI Hotel Booking System',
        highlight: 'Serving 10+ Premium Locations',
        bullets: [
          'Designed and implemented a sophisticated, stateful multi-agent system using LangGraph to manage complex user dialogues, orchestrating specialized agents for FAQs, room availability, and booking.',
          'Engineered a high-performance, asynchronous API service using FastAPI with Docker, a Kong API Gateway, managing data persistence with PostgreSQL, caching with Redis.',
          'Built a low-latency, real-time voice interface using Pipecat-ai, integrating WebSockets, LiveKit for session management, and Murf TTS for natural-sounding speech-to-speech interaction.',
          'Developed a multi-purpose Weaviate vector database with Sentence-Transformers to power both a RAG system for hotel FAQ retrieval and a semantic search-based room recommendation engine.',
          'Established comprehensive LLM observability using Langfuse to trace, debug, and monitor agent behavior and performance in real time.'
        ]
      }
    ]
  },
  {
    id: 'softsensor',
    company: 'Softsensor AI',
    role: 'Data Scientist',
    location: 'Remote',
    period: 'August 2023 - September 2025',
    projects: [
      {
        name: 'AgentMax - Voice-Based Conversational AI System',
        highlight: '100+ calls daily',
        bullets: [
          'Built an AI-powered voicebot that handled 100+ candidate interviews daily, leveraging Twilio, Ultravox for real-time streaming and speech-to-speech conversion.',
          'Engineered dynamic, prompt-driven Q&A flows tailored to candidate profiles using configurable LLM prompts.',
          'Automated call state tracking, transcription, and outcome logging round the clock, supporting scalable, cloud-based hiring workflows.',
          'Enabled persistent conversation storage with TinyDB and MongoDB, facilitating post-call analytics, review, and hiring decision support.'
        ]
      },
      {
        name: 'Spiritual Chatbot - Domain-Aligned QA System',
        highlight: '100k+ downloads',
        bullets: [
          'Built a hybrid semantic search system using Qdrant vector DB, embeddings, and intent-based metadata filtering.',
          'Developed LLM-driven intent classification to map queries to domain-specific categories.',
          'Integrated ColBERT-based re-ranking to improve semantic relevance of retrieved answers.',
          'Applied language detection and translation (ELD+LLMs) to handle multilingual queries.',
          'Designed prompt engineering strategies to classify spiritual and culturally rich queries accurately.',
          'Implemented profanity/off-topic filtering, query normalization, and structured output generation.'
        ]
      }
    ]
  },
  {
    id: 'bestsnc',
    company: 'Best S&C Pvt. Ltd',
    role: 'Python Developer',
    location: 'Hyderabad',
    period: 'July 2022 - July 2023',
    projects: [
      {
        name: 'Automated Workforce Management System',
        bullets: [
          'Developed high-performance REST APIs using FastAPI to power an internal staff dashboard, enabling real-time roster visualization for the frontend team.',
          'Built an automated shift planning algorithm that optimized staff allocation, reducing manual scheduling time by 40%.',
          'Integrated Twilio SMS API to trigger instant roster updates and shift alerts for 50+ employees, improving communication efficiency and reducing missed shifts.'
        ]
      }
    ]
  }
];

export const skills: Skill[] = [
  {
    category: 'Languages & Core',
    items: ['Python', 'SQL', 'JavaScript']
  },
  {
    category: 'GenAI & NLP',
    items: ['LLMs (OpenAI, Gemini)', 'RAG Systems', 'LangChain', 'LangGraph', 'Langfuse']
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Pinecone', 'Weaviate', 'FAISS', 'Qdrant']
  },
  {
    category: 'Voice AI Stack',
    items: ['LiveKit', 'Pipecat', 'Ultravox', 'ElevenLabs', 'Twilio']
  },
  {
    category: 'Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Azure ML Studio']
  },
  {
    category: 'Deployment & Cloud',
    items: ['Docker', 'Kubernetes', 'FastAPI', 'AWS Bedrock', 'Azure OpenAI']
  }
];
