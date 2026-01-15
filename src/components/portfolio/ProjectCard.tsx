import { Link } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InteractiveCard } from '@/components/ui/spotlight-card';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

/**
 * Engineering Project Card - Horizontal Layout
 * Focuses on Tech Stack, Impact, and Links with a wide aspect ratio.
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="h-full w-full"
    >
      <InteractiveCard
        className="h-full flex flex-col bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/40 transition-all duration-500 rounded-xl overflow-hidden"
        spotlightColor="rgba(56, 189, 248, 0.1)"
      >
        {/* Main Information */}
        <div className="p-6 flex flex-col justify-between space-y-4" style={{ transform: "translateZ(20px)" }}>
          <div className="space-y-3">
            <div style={{ transform: "translateZ(40px)" }}>
              <div className="flex items-center gap-3 mb-1">
                <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-primary/30 text-primary/80 px-2 py-0">
                  {project.category.replace('-', ' ')}
                </Badge>
              </div>
              <CardTitle className="text-xl md:text-2xl font-medium tracking-tight leading-tight">
                <Link to={`/project/${project.slug}`} className="hover:text-primary transition-colors">
                  {project.title}
                </Link>
              </CardTitle>
            </div>

            <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-2" style={{ transform: "translateZ(30px)" }}>
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 pt-1" style={{ transform: "translateZ(35px)" }}>
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-primary/5 text-primary border-primary/10 py-0 px-2 text-[10px] font-medium"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Impact Metric */}
          {project.impact && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 w-fit"
              style={{ transform: "translateZ(45px)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Impact:</span>
              <span className="text-xs text-foreground/80 font-medium">{project.impact}</span>
            </div>
          )}
        </div>

        {/* Horizontal Actions (Links) */}
        <div className="mt-auto p-4 flex flex-row items-center gap-2 bg-white/[0.02] border-t border-white/5" style={{ transform: "translateZ(25px)" }}>
          {/* GitHub Link */}
          {project.links.find(l => l.type === 'github') && (
            <Button variant="outline" size="sm" asChild className="flex-1 h-9 bg-white/5 border-white/10 hover:bg-white/10 text-[10px] font-medium px-2">
              <a href={project.links.find(l => l.type === 'github')?.url} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                <Github className="size-3.5" />
                Code
              </a>
            </Button>
          )}

          {/* Read Case Study Link */}
          <Button variant="ghost" size="sm" asChild className="flex-1 h-9 hover:bg-white/5 border border-transparent hover:border-white/5 text-[10px] font-medium text-muted-foreground hover:text-primary transition-colors px-2">
            <Link to={`/project/${project.slug}`} className="gap-1.5 justify-center">
              Study
              <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>

          {/* Live Demo Link */}
          {project.links.find(l => l.type === 'demo') && (
            <Button size="sm" asChild className="flex-1 h-9 shadow-lg shadow-primary/20 text-[10px] font-medium px-2">
              <a href={project.links.find(l => l.type === 'demo')?.url} target="_blank" rel="noopener noreferrer" className="gap-1.5">
                <ExternalLink className="size-3.5" />
                Live
              </a>
            </Button>
          )}
        </div>
      </InteractiveCard>
    </motion.div>
  );
}
