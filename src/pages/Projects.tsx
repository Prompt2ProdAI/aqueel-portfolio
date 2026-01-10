import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, getProjectsByCategory } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard'; // Make sure this path is correct
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import type { ProjectCategory } from '@/types';

const categories: { label: string; value: ProjectCategory | 'all' }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Voice AI', value: 'voice-ai' },
    { label: 'Agents', value: 'agents' },
    { label: 'RAG Systems', value: 'rag' },
    { label: 'ML Ops', value: 'mlops' },
];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : getProjectsByCategory(activeCategory);

    return (
        <>
            <SEOHead
                title="Engineering Projects"
                description="Showcase of AI/ML engineering projects including Voice AI, RAG systems, and autonomous agents."
            />

            <div className="min-h-screen py-24 px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="space-y-6 mb-16 text-center max-w-3xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-light tracking-tight"
                    >
                        Engineering Projects
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground font-light"
                    >
                        A collection of technical deep-dives into Voice AI, scalable RAG architectures, and production-grade ML systems.
                    </motion.p>
                </div>

                {/* Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map((category) => (
                        <Button
                            key={category.value}
                            variant={activeCategory === category.value ? "default" : "outline"}
                            onClick={() => setActiveCategory(category.value)}
                            className="rounded-full font-light tracking-wide transition-all"
                        >
                            {category.label}
                        </Button>
                    ))}
                </motion.div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 text-muted-foreground"
                    >
                        No projects found in this category.
                    </motion.div>
                )}
            </div>
        </>
    );
}
