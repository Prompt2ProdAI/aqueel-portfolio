import { motion } from 'framer-motion';
import { thoughts } from '@/data/thoughts';
import { SEOHead } from '@/components/seo/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Blog() {
    return (
        <>
            <SEOHead
                title="Insights"
                description="Technical writings on AI, Latency Optimization, and System Design."
            />

            <div className="relative min-h-screen py-24 px-6 lg:px-8 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] -right-[5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute top-[40%] -left-[5%] w-[25%] h-[25%] bg-accent/10 rounded-full blur-[80px]" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="space-y-6 mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-extralight tracking-tight"
                        >
                            <span className="text-gradient">Insights</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-muted-foreground font-light text-balance max-w-2xl"
                        >
                            Notes on engineering challenges, system architecture, and the evolving landscape of AI.
                        </motion.p>
                    </div>

                    <div className="space-y-8">
                        {thoughts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                            >
                                <Link to={`/blog/${post.slug}`} className="block group">
                                    <div className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all duration-500 hover:-translate-y-1">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground/60 mb-4 font-light">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="size-3.5" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground font-light mt-3 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between mt-8">
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.map(tag => (
                                                    <Badge key={tag} variant="secondary" className="font-normal text-[10px] uppercase tracking-wider bg-primary/10 text-primary border-primary/20">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <span className="text-sm font-medium text-primary flex items-center gap-1 transition-transform group-hover:translate-x-2">
                                                Read Entry <ArrowRight className="size-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
