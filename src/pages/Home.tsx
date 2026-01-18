import { motion, useScroll, useSpring } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { useRef } from 'react';
import { ArrowRight, Code2, Mic, Bot, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { skills } from '@/data/experience';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { LiquidFlow } from '@/components/ui/liquid-flow';

/**
 * Homepage with immersive hero section showcasing AI/ML expertise
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const highlights = [
    {
      icon: Mic,
      title: 'Voice AI Systems',
      description: '100+ daily voice interactions with Gemini 2.0 real-time streaming'
    },
    {
      icon: Bot,
      title: 'Conversational AI',
      description: 'Multi-agent systems with LangGraph & LangChain'
    },
    {
      icon: Database,
      title: 'RAG & Vector DBs',
      description: 'Semantic search with Qdrant, Pinecone, Weaviate'
    },
    {
      icon: Code2,
      title: 'Production ML',
      description: 'FastAPI, Docker, Kubernetes deployments'
    }
  ];

  return (
    <>
      <SEOHead />

      <div className="min-h-screen">
        {/* Hero Section - Full viewport */}
        <section className="relative h-screen w-full overflow-hidden bg-background">
          {/* Organic Liquid Flow Background */}
          <LiquidFlow className="opacity-80" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_var(--background)_100%)] opacity-70" />

          {/* Hero Content */}
          <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20 pb-20">
            <motion.div
              className="text-center space-y-8 max-w-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -15, 0]
              }}
              transition={{
                opacity: { duration: 1, ease: "easeOut" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-6xl md:text-8xl lg:text-8xl font-extralight tracking-tight text-gradient leading-none pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  {photographerInfo.name}
                </motion.h1>

                {/* Multilingual Names */}
                {photographerInfo.multilingualNames && (
                  <motion.div
                    className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-muted-foreground/40 font-light tracking-[0.2em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <span className="text-xl md:text-2xl pt-1" dir="rtl">{photographerInfo.multilingualNames.arabic}</span>
                    <span className="text-xl md:text-2xl">{photographerInfo.multilingualNames.hindi}</span>
                    <span className="text-xl md:text-2xl">{photographerInfo.multilingualNames.malayalam}</span>
                    <span className="text-xl md:text-2xl">{photographerInfo.multilingualNames.telugu}</span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                <motion.p
                  className="text-xl md:text-3xl font-light tracking-[0.1em] text-foreground/80 uppercase"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {photographerInfo.tagline}
                </motion.p>

                <motion.p
                  className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground max-w-3xl mx-auto balance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { duration: 1, delay: 0.7 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {photographerInfo.heroIntroduction}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-wrap justify-center gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <Link
                  to="/projects"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-light tracking-wide transition-all hover:scale-105 glow-primary"
                >
                  View My Work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-background/50 border border-border/50 backdrop-blur-md rounded-full font-light tracking-wide hover:bg-background transition-all"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <ScrollIndicator />
            </motion.div>
          </div>
        </section>


        {/* Highlights Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-16">
                What I Build
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.1}>
                  <div className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="size-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <ScrollReveal>
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    Featured Projects
                  </h2>
                  <p className="text-lg text-muted-foreground font-light max-w-xl">
                    Selected work demonstrating scalable AI systems and product engineering.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Button variant="outline" asChild className="group">
                  <Link to="/projects">
                    View All Projects
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="relative -mx-6 lg:-mx-8 group">
              <div
                ref={containerRef}
                className="flex gap-4 md:gap-6 overflow-x-auto pb-8 pt-4 px-6 lg:px-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
              >
                {getFeaturedProjects().map((project, index) => (
                  <ScrollReveal
                    key={project.id}
                    delay={index * 0.1}
                    className="flex-shrink-0 w-[80vw] md:w-[420px] snap-center"
                  >
                    <ProjectCard project={project} index={index} />
                  </ScrollReveal>
                ))}
              </div>

              {/* Scroll Progress Bar */}
              <div className="max-w-xs mx-auto px-6 mt-2 pb-4">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary/80 rounded-full"
                    style={{
                      width: "100%",
                      scaleX,
                      transformOrigin: "left",
                    }}
                  />
                </div>
                <p className="text-[9px] text-center mt-2 text-muted-foreground/40 uppercase tracking-[0.2em] font-medium">
                  Project Gallery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                  About Me
                </h2>
                <div className="space-y-4 text-lg font-light leading-relaxed text-muted-foreground text-justify balance">
                  <p>
                    {photographerInfo.summary}
                  </p>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors group"
                >
                  <span>Learn More About Me</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Skills Preview */}
        <section className="py-24 md:py-32 border-t border-border">
          <ScrollReveal>
            <div className="text-center mb-16 space-y-4 px-6">
              <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                Technical Stack
              </h2>
              <p className="text-lg text-muted-foreground font-light tracking-wide">
                Technologies that I use
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4">
                {skills.flatMap(group => group.items).slice(0, 24).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-6 py-2.5 text-sm font-light border-border/50 bg-background/50 backdrop-blur-sm rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* View All Link */}
          <ScrollReveal delay={0.4}>
            <div className="flex justify-center mt-16 px-6">
              <Link
                to="/experience"
                className="group inline-flex items-center gap-2 text-lg font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
              >
                <span>View Full Experience</span>
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
