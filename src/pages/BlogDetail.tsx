import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { Badge } from '@/components/ui/badge';
import { getPostBySlug } from '@/data/thoughts';

/**
 * Blog/Insight Detail Page
 * Renders the content of a technical insight post.
 */
export default function BlogDetail() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getPostBySlug(slug) : undefined;

    // 404 if post not found
    if (!post) {
        return <Navigate to="/404" replace />;
    }

    return (
        <>
            <SEOHead
                title={post.title}
                description={post.excerpt}
                type="article"
            />

            <div className="min-h-screen py-24 px-6 lg:px-8">
                <div className="max-w-3xl mx-auto space-y-12">

                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="size-4" />
                            Back to Insights
                        </Link>
                    </motion.div>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-light">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="size-4" /> {post.date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="size-4" /> {post.readTime}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {post.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="font-normal text-xs">
                                        <Tag className="size-3 mr-1 opacity-70" /> {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <Separator />

                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-zinc dark:prose-invert max-w-none"
                    >
                        <div className="text-foreground/90 leading-relaxed whitespace-pre-line text-lg font-light">
                            {post.content}
                        </div>
                    </motion.div>

                    <Separator className="mt-16" />

                    {/* Footer Navigation */}
                    <div className="pt-8 flex justify-center">
                        <Link
                            to="/blog"
                            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <span>View More Insights</span>
                            <motion.div
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <ArrowLeft className="size-4 rotate-180" />
                            </motion.div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
