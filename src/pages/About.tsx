import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ContactForm } from '@/components/forms/ContactForm';

/**
 * About page with professional biography and contact information
 */
export default function About() {
  return (
    <>
      <SEOHead
        title="About & Contact"
        description={`Learn about ${photographerInfo.name}, ${photographerInfo.tagline}. Get in touch for AI/ML consulting and Voice AI projects.`}
        image={photographerInfo.portraitImage}
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
                About
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Portrait and Biography - Split Layout */}
        <section className="py-16 md:py-24 px-6 lg:px-8 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Portrait Image */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-muted">
                  <img
                    src={photographerInfo.portraitImage}
                    alt={photographerInfo.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {photographerInfo.socialLinks.github && (
                    <a
                      href={photographerInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="size-5" />
                    </a>
                  )}
                  {photographerInfo.socialLinks.linkedin && (
                    <a
                      href={photographerInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-border rounded-sm hover:bg-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Biography and Info */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {/* Name and Tagline */}
                <div className="space-y-3">
                  <h2 className="text-4xl md:text-5xl font-light tracking-wide">
                    {photographerInfo.name}
                  </h2>
                  <p className="text-xl text-muted-foreground font-light tracking-wide">
                    {photographerInfo.tagline}
                  </p>
                </div>

                <Separator />

                {/* Summary */}
                <div className="space-y-4">
                  <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground text-justify balance">
                    {photographerInfo.summary}
                  </p>
                </div>

                {/* Contact Quick Links */}
                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-light tracking-wide">
                    <Mail className="size-4 text-muted-foreground" />
                    <a
                      href={`mailto:${photographerInfo.email}`}
                      className="text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {photographerInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-light tracking-wide">
                    <Phone className="size-4 text-muted-foreground" />
                    <span className="text-foreground">
                      UAE: {photographerInfo.phones.uae} | India: {photographerInfo.phones.india}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-light tracking-wide">
                    <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                    <div className="flex flex-col">
                      {photographerInfo.location.split(' & ').map((loc, i) => (
                        <span key={i} className="text-foreground">{loc}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Me Section - Merged from Contact.tsx */}
        <section className="py-16 md:py-24 px-6 lg:px-8 bg-accent/30">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0.8, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    Let's Connect
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Have a project in mind or just want to say hi? Fill out the form below and I'll get back to you within 24-48 hours.
                  </p>
                </div>

                <ContactForm />
              </motion.div>

              {/* Direct Contact */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.8, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                    Direct Contact
                  </h2>
                  <p className="text-muted-foreground font-light">
                    Prefer email or phone? Reach out directly using the details below.
                  </p>
                </div>

                <Separator />

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-background border border-border">
                      <Mail className="size-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">
                        Email
                      </p>
                      <a
                        href={`mailto:${photographerInfo.email}`}
                        className="text-base md:text-lg font-light hover:text-primary transition-colors"
                      >
                        {photographerInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone UAE */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-background border border-border">
                      <Phone className="size-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">
                        Phone (UAE)
                      </p>
                      <a
                        href={`tel:${photographerInfo.phones.uae.replace(/\s/g, '')}`}
                        className="text-base md:text-lg font-light hover:text-primary transition-colors"
                      >
                        {photographerInfo.phones.uae}
                      </a>
                    </div>
                  </div>

                  {/* Phone India */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-background border border-border">
                      <Phone className="size-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">
                        Phone (India)
                      </p>
                      <a
                        href={`tel:${photographerInfo.phones.india.replace(/\s/g, '')}`}
                        className="text-base md:text-lg font-light hover:text-primary transition-colors"
                      >
                        {photographerInfo.phones.india}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-sm bg-background border border-border">
                      <MapPin className="size-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-light tracking-wide text-muted-foreground">
                        Location
                      </p>
                      <div className="flex flex-col">
                        {photographerInfo.location.split(' & ').map((loc, i) => (
                          <p key={i} className="text-base md:text-lg font-light">
                            {loc}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
