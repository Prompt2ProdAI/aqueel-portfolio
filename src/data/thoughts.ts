import type { BlogPost } from '@/types';

export const thoughts: BlogPost[] = [
    {
        id: '1',
        slug: 'future-of-voice-agents',
        title: 'The Future of Latency-Optimized Voice Agents',
        excerpt: 'How we reduced voice-to-voice latency to under 500ms using VAD and optimistic streaming.',
        content: `
# The Race to Zero Latency

In building voice interfaces, latency is the conversion killer. Users expect instant responses, similar to a human conversation. A delay of more than 1 second feels like a connection issue.

## Key Optimizations

1. **VAD (Voice Activity Detection)**: Running aggressive VAD on the client side to detect end-of-speech immediately.
2. **Optimistic Streaming**: Starting the TTS stream before the LLM has finished generating the full sentence.
3. **Protocol Buffers**: Switching from JSON to Protobufs for WebSocket payloads shaved off critical milliseconds.

The future of voice AI isn't just about smarter models—it's about faster pipes.
    `,
        date: '2025-01-08',
        readTime: '3 min read',
        tags: ['Voice AI', 'Latency', 'Engineering']
    },
    {
        id: '2',
        slug: 'rag-production-lessons',
        title: 'Lessons from Scaling RAG to 100k Users',
        excerpt: 'Vector databases are easy to start but hard to scale. Here is what broke first.',
        content: `
# When Vector Search fails

We started with a simple cosine similarity search. It worked great for 100 documents. At 1 million chunks, we hit the wall.

## The Semantic Drift

Queries became too broad. "How do I meditate?" matched with "Medication guidelines" because of phonetical similarities in the embedding space of our specific domain model.

**The Fix**: Hybrid Search. We combined sparse vectors (BM25) with dense vectors.
    `,
        date: '2024-12-15',
        readTime: '5 min read',
        tags: ['RAG', 'Vector DB', 'System Design']
    }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return thoughts.find(post => post.slug === slug);
};
