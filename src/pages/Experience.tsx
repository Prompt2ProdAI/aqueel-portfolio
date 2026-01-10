import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { workExperience, skills } from '@/data/experience';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { Badge } from '@/components/ui/badge';

/**
 * Experience page showcasing work history and technical skills
 */
export default function Experience() {
  return (
    <>
      <SEOHead
        title="Experience"
        description={`${photographerInfo.name}'s professional experience in AI/ML Engineering, Voice AI systems, and LLM development.`}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">
                Experience
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                3+ Years Building AI-Powered Solutions
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-b border-border bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-12">
                Technical Skills
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 rounded-lg border border-border bg-background"
                  >
                    <h3 className="text-lg font-medium mb-4 text-foreground">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="font-normal"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl font-light tracking-wide text-center mb-16"
            >
              Work History
            </motion.h2>

            <div className="space-y-12">
              {workExperience.map((job, jobIndex) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: jobIndex * 0.1 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {jobIndex < workExperience.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-px bg-border hidden md:block" />
                  )}

                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="hidden md:flex items-start pt-1">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-medium">{job.role}</h3>
                          <span className="text-muted-foreground">@</span>
                          <span className="text-xl text-primary">{job.company}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {job.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                        </div>
                      </div>

                      {/* Projects */}
                      <div className="space-y-6">
                        {job.projects.map((project, projectIndex) => (
                          <div
                            key={projectIndex}
                            className="p-6 rounded-lg border border-border bg-card"
                          >
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              <Sparkles className="w-5 h-5 text-primary" />
                              <h4 className="text-lg font-medium">{project.name}</h4>
                              {project.highlight && (
                                <Badge variant="outline" className="text-primary border-primary">
                                  {project.highlight}
                                </Badge>
                              )}
                            </div>
                            <ul className="space-y-3">
                              {project.bullets.map((bullet, bulletIndex) => (
                                <li
                                  key={bulletIndex}
                                  className="text-muted-foreground font-light leading-relaxed pl-4 border-l-2 border-border"
                                >
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {jobIndex < workExperience.length - 1 && (
                    <Separator className="mt-12 md:hidden" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-t border-border bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-8">
                Education
              </h2>
              
              <div className="p-8 rounded-lg border border-border bg-background inline-block">
                <h3 className="text-2xl font-medium mb-2">
                  {photographerInfo.education.degree}
                </h3>
                <p className="text-lg text-primary mb-2">
                  {photographerInfo.education.institution}
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
                  <span>{photographerInfo.education.period}</span>
                  <span>•</span>
                  <span>{photographerInfo.education.cgpa}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
