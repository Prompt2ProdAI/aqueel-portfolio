import type { BlogPost } from '@/types';

export const thoughts: BlogPost[] = [
    {
        id: '1',
        slug: 'future-of-voice-agents',
        title: 'The Future of Latency-Optimized Voice Agents',
        excerpt: 'How we reduced voice-to-voice latency to under 500ms using VAD and optimistic streaming.',
        content: `
In building voice interfaces, latency is the conversion killer. Users expect instant responses, similiar to a human conversation. A delay of more than 1 second feels like a connection issue, and anything over 2 seconds feels like a broken system. When we set out to build our real-time voice agent, our initial prototype had a 3-second round-trip latency. It was unusable.

We dissected the pipeline and found three critical bottlenecks: The Voice Activity Detection (VAD) wait time, the LLM generation time, and the Text-to-Speech (TTS) buffering.

Optimizing VAD was the first step. Standard web-based VAD listens for 500ms of silence to confirm the user has stopped speaking. We moved this logic to the client-side using a lightweight WebAssembly model (Silero VAD). By processing audio frames in the browser, we could detect "Intentional Silence" versus "Hesitation" with much higher accuracy, triggering the turn-end signal in just 200ms.

Next was the LLM. We couldn't make GPT-4 faster, but we could cheat the clock. We implemented "Optimistic Streaming." Instead of waiting for a full sentence, we started the TTS engine as soon as the first meaningful chunk of text arrived. We optimized our prompts to output "filler words" or acknowledgments first (like "Sure," or "I can help with that") which are fast to generate and synthesize, buying time for the model to compute the complex part of the answer.

Finally, we switched our transport layer from JSON over WebSocket to Protocol Buffers. While this seems like a micro-optimization, the reduced payload size and faster serialization shaved off another 50ms in high-traffic conditions.

The result? A median voice-to-voice latency of 480ms. The future of voice AI isn't just about smarter models—it's about faster pipes.
        `,
        date: '2025-02-01',
        readTime: '6 min read',
        tags: ['Voice AI', 'Latency', 'Engineering']
    },
    {
        id: '2',
        slug: 'rag-production-lessons',
        title: 'Lessons from Scaling RAG to 100k Users',
        excerpt: 'Vector databases are easy to start but hard to scale. Here is what broke first.',
        content: `
Retrieval Augmented Generation (RAG) is the "Hello World" of enterprise AI. It is deceptively simple to prototype: chunk your PDFs, embed them with OpenAI, store them in Pinecone, and query. This works perfectly for a demo. It fails spectacularly at scale.

When our RAG system hit 100,000 documents, we ran into the problem of "Semantic Drift." As the vector space became crowded, distinct concepts started overlapping. A query like "How do I meditate?" started retrieving documents about "Medication guidelines" because the embedding model grouped them too closely in the health cluster.

Standard cosine similarity wasn't enough. We introduced a "Hybrid Search" architecture. We maintained two indices: a dense vector index for semantic meaning and a sparse keyword index (BM25) for exact term matching.

When a user queried, we ran both searches in parallel. We then used Reciprocal Rank Fusion (RRF) to combine the results. If a document appeared in the top 10 of both lists, it was boosted.

But the biggest lesson was "Metadata Filtering is King." We realized that 80% of bad retrieval could be solved if we just knew *where* to look. We revamped our ingestion pipeline to tag every chunk with deeper metadata—Source Type, Author, Date, and Topic. We then used an LLM to extract "Search Filters" from the user's query before ever touching the vector DB.

Scaling RAG isn't about a bigger database; it's about smarter pre-processing and hybrid retrieval strategies.
        `,
        date: '2025-03-15',
        readTime: '7 min read',
        tags: ['RAG', 'Vector DB', 'System Design']
    },
    {
        id: '3',
        slug: 'orchestrating-agent-swarms-langgraph',
        title: 'Beyond the Chatbox: Orchestrating Agent Swarms with LangGraph',
        excerpt: 'Moving from linear chains to state-aware graphs for complex multi-agent workflows.',
        content: `
The popular image of an AI agent is a single bot that does everything. In reality, a "Jack of all trades" agent is a master of none. When building the Hotel Booking System, we quickly hit the limits of a single-prompt architecture. The system prompt became so long that the model started "forgetting" instructions from the beginning.

The solution was to break the monolith into a swarm of specialized agents, orchestrated by a state-aware graph. We chose LangGraph for this architecture.

We defined specific nodes: a 'Receptionist' for greeting and routing, a 'AvailabilityAgent' that only knew SQL, a 'PolicyAgent' that only knew the PDF rulebook, and a 'BookingAgent' that handled the transaction.

The magic happens in the edges (the transitions). Unlike a linear chain (Step A -> Step B), a graph allows for loops and conditionals. If the BookingAgent fails because of a payment error, the graph routes the user back to the 'PaymentSupport' node, preserving the booking details in the global state.

State Management became the core of the application. We utilized a persistent Checkpointer that saved the graph state after every interaction. This meant a user could start a booking, leave for 3 days, come back, and the 'Receptionist' would see the frozen state and ask, "Do you want to continue booking the Deluxe Suite?"

Moving from chains to graphs is the step required to go from toy chatbots to resilient enterprise systems.
        `,
        date: '2025-04-12',
        readTime: '8 min read',
        tags: ['Agents', 'LangGraph', 'Architecture']
    },
    {
        id: '4',
        slug: 'voice-ai-interruptibility-challenges',
        title: 'The Silence of the Bot: Solving Interruptibility',
        excerpt: 'How to handle the "human" part of conversation—interruptions and silent pauses.',
        content: `
Humans are messy communicators. We interrupt each other, we say "um" and "uh," and we react in real-time with "mhm" and "yeah." Standard Voice AI systems are polite but rigid—they wait for you to finish, then they speak a full paragraph, ignoring you if you try to interject.

In our Voice Interviewer (AgentMax), being "interruptible" (or "barge-in" capable) was a requirement. If the bot asks a question and the user starts answering halfway through, the bot must shut up immediately.

This sounds simple, but it's a hard signal-processing problem. If we stop the TTS whenever we hear sound, the bot will cut itself off every time a dog barks or the user coughs.

We solved this with a sophisticated audio loopback verification. The system knows exactly what audio it is currently sending to the speaker. When the microphone picks up a signal, we run an Acoustic Echo Cancellation (AEC) algorithm to subtract the bot's own voice from the input.

The remaining signal is passed to a high-speed logic gate. Is it loud enough? Is it human speech (VAD)? If yes, we send a "flush" command to the audio buffer, killing the stream instantly.

But we went a step further. We trained a small classifier to distinguish "Backchanneling" (like "okay", "un-huh") from "Interruption." If the user just says "Right," the bot continues speaking. If the user says "Wait, no," the bot stops and listens. This distinction creates a conversation flow that feels organic, not robotic.
        `,
        date: '2025-05-10',
        readTime: '6 min read',
        tags: ['Voice AI', 'UX', 'Streaming']
    },
    {
        id: '5',
        slug: 'metadata-driven-productivity-gitivity',
        title: 'Context is King: Why Metadata is the Kingmaker',
        excerpt: 'Lessons from Gitivity on why developer tools need to look beyond the code.',
        content: `
When a developer stares at a blank screen, they aren't just missing code; they are missing context. Most AI coding assistants (like Copilot) look at the cursor and the surrounding text files. This is powerful, but it misses the temporality of work. It knows *what* you are writing, but not *why* or *how* you got there.

With Gitivity, our VS Code extension, we decided to tap into the "Hidden Signals" of development—the metadata.

We built a listener that tracks the IDE's lifecycle events. It doesn't just read the code; it logs: "User opened file A, spent 10 minutes debugging function B, deleted a test file, and then opened the documentation."

This creates a narrative trace. When the user asks "Write a summary of my work today," we don't just diff the code. We feed this narrative trace into the LLM.

The result is a summary that reads like a human wrote it: "You spent the morning refactoring the auth module, struggled with a bug in the token refresh logic, and finally fixed it by updating the environment variables."

We also used git metadata—analyzing commit frequency and branch names to infer "Focus State." If commits are frequent and small, the user is in a flow state; the AI interruptions are minimized. If the user is jumping between 10 files without editing, they are likely lost; the AI proactively offers help.

Metadata provides the intent that pure code analysis often misses. It transforms the AI from a code-generator into a pair-programmer that understands your workflow.
        `,
        date: '2025-06-05',
        readTime: '5 min read',
        tags: ['DevTools', 'Productivity', 'Metadata']
    },
    {
        id: '6',
        slug: 'colbert-reranking-in-production-rag',
        title: 'Why Bi-Encoders Aren\'t Enough: ColBERT Re-ranking',
        excerpt: 'Improving search relevance in specialized domains using late interaction models.',
        content: `
In vector search, the industry standard is the Bi-Encoder architecture. It takes a document, smashes it into a single vector (say, 768 dimensions), and does the same for the query. You compare the two vectors and get a score.

This works for general retrieval, but it causes "Information Bottleneck." Compressing a complex 500-word theological argument into a single vector inevitably loses nuance. In our spiritual chatbot project, this was fatal. Users asked highly specific questions about overlapping concepts, and the Bi-Encoder couldn't distinguish the subtle differences.

We turned to ColBERT (Contextualized Late Interaction over BERT).

Unlike Bi-Encoders, ColBERT effectively keeps the token-level embeddings. It doesn't compress the document into one vector; it keeps a "bag of vectors" for the document. When a query comes in, it compares every query token to every document token (Late Interaction).

This allows the model to find precise alignments. If I ask about "Rituals for morning prayer," ColBERT matches "morning" to "dawn" and "prayer" to "supplication" individually, rather than hoping the sentence-level blob matches.

We deployed this as a two-stage pipeline.
Stage 1: A fast Bi-Encoder retrieves the top 50 candidates (Millisecond speed).
Stage 2: ColBERT re-ranks these 50 candidates (Higher compute, but acceptable latency for small batches).

The result was a 40% jump in MRR (Mean Reciprocal Rank). We learned that for specialized, high-nuance domains, you cannot rely on single-vector compression. You need models that preserve the granularity of the text.
        `,
        date: '2025-07-28',
        readTime: '9 min read',
        tags: ['RAG', 'NLP', 'Search']
    },
    {
        id: '7',
        slug: 'slms-the-future-of-local-ai',
        title: 'Small Models, Big Impact: The Rise of SLMs',
        excerpt: 'Why the next generation of AI will run on your device, not in the cloud.',
        content: `
For the past two years, the AI narrative has been "Bigger is Better." GPT-4, Claude Opus, Gemini Ultra. These trillion-parameter giants are incredible, but they are also slow, expensive, and require your data to leave your premise.

For our developer tools project (Gitivity), sending proprietary code to a third-party cloud was a non-starter for many enterprise users. We needed intelligence that lived on the laptop.

Enter the era of SLMs (Small Language Models). We started experimenting with quantized versions of Llama-3-8B and Microsoft's Phi-3.

The quality gap between a 7B model and a 70B model has narrowed drastically for specific tasks. We found that for code completion and summarization—tasks with high structure—a fine-tuned 7B model often outperformed a generic GP-4 prompt, simply because it was faster and could be run in a loop without cost concerns.

We engineered a "Local-First" architecture. Gitivity tries to solve the task using a local ONNX-runtime model first. It constructs the summary or explains the variable locally. Only if the confidence score is low, or if the user explicitly requests "Deep Analysis," does it make a call to the cloud API.

This hybrid approach gave us the best of both worlds: The privacy and snapiness of local software, with the fallback power of the cloud. As mobile chips get stronger NPUs (Neural Processing Units), the future of AI isn't in a massive data center—it's in your pocket.
        `,
        date: '2025-08-20',
        readTime: '6 min read',
        tags: ['Edge AI', 'Privacy', 'LLMs']
    },
    {
        id: '8',
        slug: 'automated-rostering-human-ai-bridge',
        title: 'The Human-AI Bridge in Workforce Automation',
        excerpt: 'How algorithms and LLMs combine to solve the "people problem" in scheduling.',
        content: `
The math of workforce scheduling is a solved problem. We have constraint solvers, linear programming, and genetic algorithms that can optimize a roster to the decimal point of efficiency. But when we deployed our "perfect" scheduler for a client with 50+ staff members, the revolt was immediate.

Why? Because algorithms optimize for coverage and cost, not for human adaptability. The algorithm didn't care that Sarah prefers Tuesday mornings off to take her kids to school, or that John and Mike work poorly together.

The solution wasn't better math—it was better listening. We built a "Human-AI Bridge" using a Large Language Model to act as a pre-processor for our hard-coded optimization engine.

Phase 1: The Soft Constraint Collector
Instead of a rigid form, employees texted their preferences to a bot. "I need next Friday off for a wedding, and I'd prefer not to work closing shifts this month." The LLM parsed these natural language requests into weighted mathematical constraints. A "wedding" was assigned a critical weight (Do Not Override), while "prefer not to" was assigned a soft weight (Avoid if Possible).

Phase 2: The Optimization Run
The traditional Python-based solver ran the roster generation, treating these new LLM-derived weights alongside business rules (minimum coverage, max hours).

Phase 3: The Explanation
When the roster was published, the LLM generated personalized explanations: "Hey John, we couldn't give you Thursday off because 3 other seniors are on leave, but we gave you a half-day ensuring you're off by 2 PM."

The result was a 40% reduction in manual scheduling time, but more importantly, a 90% drop in roster disputes. We learned that in automation, the interface is just as important as the algorithm.
        `,
        date: '2025-09-10',
        readTime: '6 min read',
        tags: ['Automation', 'Logic', 'Human-Centric']
    },
    {
        id: '9',
        slug: 'infrastructure-latency-for-llms',
        title: 'Infrastructure: The Secret Sauce of Fast AI',
        excerpt: 'When your model is slow, your infra must be lightning fast.',
        content: `
In the world of Generative AI, we often obsess over the model's inference speed—tokens per second. But in building a production-grade multi-agent system, I found that "infrastructure latency" is the silent killer of user experience.

When a user speaks to a voice bot, the latency budget is 500ms to 800ms before it feels awkward. If GPT-4 takes 600ms to generate the first token, you have effectively zero margin for network overhead.

We engineered a zero-overhead architecture to reclaim those milliseconds.

1. The Gateway Layer (Kong)
We replaced our standard Nginx setup with Kong Gateway. By writing custom Lua plugins, we performed authentication, rate-limiting, and request routing at the edge, shaving off 40ms of round-trip time compared to handling these in the application layer.

2. Asynchronous Python is Non-Negotiable
We utilized FastAPI with 'uvicorn' workers. The critical realization was that while Python is slow at compute, it is excellent at I/O waiting. By ensuring every database call to Redis and PostgreSQL was fully non-blocking (async/await), a single worker could hold hundreds of open WebSocket connections for voice streams without blocking new requests.

3. Redis Pipelining for State
Agentic systems are state-heavy. Every turn of conversation reads history and writes new context. We moved from sequential Redis calls to Pipelining, executing read/write operations in a single atomic network packet. This reduced our history-fetching overhead from 15ms to under 3ms.

The takeaway is simple: You cannot control the speed of the LLM, but you can control everything else. In the race for real-time AI, your infrastructure is the only variable you fully own.
        `,
        date: '2025-10-05',
        readTime: '7 min read',
        tags: ['Backend', 'MLOps', 'Performance']
    },
    {
        id: '10',
        slug: 'hallucination-prevention-agent-tools',
        title: 'Safe Tool-Calling: Preventing Hallucinated Actions',
        excerpt: 'Strategies for ensuring agents don\'t perform irreversible actions by mistake.',
        content: `
Giving an AI agent access to API tools is like giving a toddler a set of keys—they might open the door, or they might lock you out forever. In our Hotel Booking System, the risk wasn't just bad text; it was the possibility of an agent hallucinating a "delete_booking" call when the user merely wanted to "change dates."

We implemented a defense-in-depth strategy we call the "Two-Phase Action Commit."

Phase 1: The Proposal
When the LLM decides to take an action, it doesn't execute it. Instead, it generates a structured proposal object. For example: { "action": "cancel_booking", "booking_id": "123", "reason": "User request" }.

Phase 2: The Deterministic Guardrail
This JSON object is passed to a strictly typed validation layer (Pydantic). This layer checks against business rules that the LLM might miss. Is the booking cancellation window passed? Is the ID valid? This code is deterministic—no AI involved.

Phase 3: The Impact Analysis (Dry Run)
For high-stakes actions, we generate a "Dry Run" summary. We calculate the refund amount and the reversibility of the action, then feed this BACK to the agent. "You are about to cancel booking 123. The refund is $0. Are you sure?"

This reflection step catches 95% of hallucinated intents. The agent, seeing the consequence, often self-corrects: "Oh, wait, the user asked to move the date, not cancel. I should use 'modify_booking' instead."

Safe tool-calling isn't about better prompting; it's about building a sandbox where the agent can think before it acts.
        `,
        date: '2025-11-25',
        readTime: '8 min read',
        tags: ['Agents', 'Safety', 'Engineering']
    },
    {
        id: '11',
        slug: 'multimodal-memory-ai-interviews',
        title: 'Multimodal Memory: The Evolution of AgentMax',
        excerpt: 'Why seeing is as important as hearing in the next phase of AI interviewing.',
        content: `
AgentMax began as a voice-only interviewer, effective at screening candidates based on their spoken answers. But human communication is 55% non-verbal. A candidate might sound confident but look panicked, or claim expertise while frantically searching answers on a second screen. To build a true AI interviewer, we had to give AgentMax eyes.

Integrating vision was easy; giving it "memory" was hard.

Feeding a continuous video stream to an LLM is prohibitively expensive and quickly overflows the context window. We needed a way to compress visual information into semantic memory.

The Solution: Semantic Scene Description
We implemented a parallel processing pipeline. While the audio pipeline processes speech-to-text, a vision model (Vision Transformer) samples the video feed at 0.5 FPS (one frame every 2 seconds).

It doesn't store pixels. Instead, it generates a dense caption: "Candidate is maintaining eye contact. Candidate smiled when mentioning Python. Candidate looked away for 15 seconds during the technical question."

These captions are timestamped and embedded into the same vector database as the conversation transcript.

Retrieval-Augmented Vision
When the interviewer agent asks a question, it retrieves not just the previous spoken turns, but the visual context of that moment. If the candidate says "I am very comfortable with this technology," but the visual memory retrieves "Candidate hesitated and looked down," the Agent can probe deeper: "You seem a bit uncertain. Can you walk me through a specific example?"

This multimodal memory transforms the system from a transcriber into an observer, capable of nuanced human-like assessment.
        `,
        date: '2025-12-15',
        readTime: '7 min read',
        tags: ['Multimodal', 'Computer Vision', 'Interviews']
    },
    {
        id: '12',
        slug: 'dynamic-context-injection-strategies',
        title: 'The End of Fixed Prompts',
        excerpt: 'Building dynamic context engines that assemble prompts in real-time.',
        content: `
In the early days of LLM development, we treated prompts like static code. We had a 'prompts.py' file full of massive f-strings. As our systems grew complex, this became unmanageable. A prompt that worked for a new user failed for a returning one. A prompt optimized for data retrieval failed at casual chit-chat.

We realized that "The Prompt" doesn't exist. It must be assembled at runtime. We built a Dynamic Context Engine.

The Context Engine treats the system instruction not as a string, but as a stack of layers.

Layer 1: The Persona (Static)
"You are a helpful assistant." This is the only constant.

Layer 2: Exposure Control (Dynamic)
Based on the user's subscription tier or role, we inject capability instructions. A free user gets "You cannot access web search." A premium user gets "You have access to live internet tools."

Layer 3: The Session State (Real-time)
We fetch the last 5 turns of conversation and summarize them. But crucially, we also fetch the "State Object" from our database. If the user has a pending booking, the prompt receives: "Current Context: User has a booking #888 pending payment."

Layer 4: Ephemeral Retrieval (RAG)
Only then do we perform a vector search for relevant knowledge base articles.

By assembling these layers millisecond before the API call, we ensure the model is never distracted by irrelevant rules and never blind to critical context. We stopped writing prompts and started engineering prompt-builders. This shift from static strings to dynamic assembly is the difference between a toy bot and a production system.
        `,
        date: '2026-01-01',
        readTime: '6 min read',
        tags: ['Prompt Engineering', 'Context', 'GenAI']
    }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
    return thoughts.find(post => post.slug === slug);
};
