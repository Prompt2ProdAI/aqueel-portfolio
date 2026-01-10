import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

/**
 * Engineering Project Card
 * Focuses on Tech Stack, Impact, and Links rather than just images.
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-medium tracking-wide">
                <Link to={`/project/${project.slug}`} className="hover:text-primary transition-colors">
                  {project.title}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground font-light">{project.shortDescription}</p>
            </div>
            {/* Context/Category Badge */}
            <Badge variant="outline" className="capitalize shrink-0">
              {project.category.replace('-', ' ')}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 space-y-4">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs font-normal">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-muted-foreground self-center">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Impact Metric */}
          {project.impact && (
            <div className="text-sm border-l-2 border-primary pl-3 py-1 bg-muted/20">
              <span className="font-semibold text-primary">Impact: </span>
              <span className="text-muted-foreground">{project.impact}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-2 flex justify-between gap-3">
          {/* Action Buttons */}
          <div className="flex gap-2">
            {project.links.map((link) => {
              if (link.type === 'github') {
                return (
                  <Button key={link.url} variant="outline" size="sm" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <Github className="size-4" />
                      Code
                    </a>
                  </Button>
                );
              }
              if (link.type === 'demo') {
                return (
                  <Button key={link.url} size="sm" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <ExternalLink className="size-4" />
                      Live
                    </a>
                  </Button>
                );
              }
              return null;
            })}
          </div>

          <Button variant="ghost" size="sm" asChild className="group">
            <Link to={`/project/${project.slug}`} className="gap-1">
              Details
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
