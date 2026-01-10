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
                title="Technical Insights"
                description="Technical writings on AI, Latency Optimization, and System Design."
            />

            <div className="min-h-screen py-24 px-6 lg:px-8 max-w-4xl mx-auto">
                <div className="space-y-6 mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-light tracking-tight"
                    >
                        Technical Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground font-light text-balance"
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
                                <Card className="hover:border-primary/50 transition-colors duration-300">
                                    <CardHeader>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 font-mono">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="size-3.5" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <CardTitle className="text-2xl font-medium group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <CardDescription className="text-base mt-2 line-clamp-2">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2">
                                                {post.tags.map(tag => (
                                                    <Badge key={tag} variant="secondary" className="font-normal text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Read more <ArrowRight className="size-4" />
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}
