import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, Layers, Cpu, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getProjectBySlug } from '@/data/projects';

/**
 * Engineering Project Detail Page
 * Focuses on Problem, Solution, Architecture, and Impact.
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // 404 if project not found
  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.shortDescription}
        type="article"
      />

      <div className="min-h-screen py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="capitalize">
                  {project.category.replace('-', ' ')}
                </Badge>
                {project.date && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="size-3.5" /> {project.date}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-2xl text-balance">
                {project.shortDescription}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {project.links.map((link) => (
                <Button key={link.url} asChild size="lg" variant={link.type === 'github' ? 'outline' : 'default'}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                    {link.type === 'github' ? <Github className="size-5" /> : <ExternalLink className="size-5" />}
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>

          <Separator />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Left Column: Context & Tech */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8 md:col-span-1"
            >
              {/* Impact Highlight */}
              {project.impact && (
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Award className="size-5" />
                    Key Impact
                  </div>
                  <p className="text-lg font-semibold tracking-tight">
                    {project.impact}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Cpu className="size-4" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Challenges (if any) */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Layers className="size-4" /> Challenges
                  </h3>
                  <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-muted-foreground">
                    {project.challenges.map((challenge, i) => (
                      <li key={i}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Right Column: Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 space-y-8"
            >
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <h3 className="text-2xl font-light tracking-wide mb-4">Project Overview</h3>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
