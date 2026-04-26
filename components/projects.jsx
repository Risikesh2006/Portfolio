'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'
import TiltedCard from '@/components/ui/tilted-card'

const PROJECTS = [
  {
    title: 'Campus Connect',
    status: 'In Progress',
    description:
      'A platform that connects students with the same mindset to start startups or build projects together. Solves the problem of finding co-founders and like-minded collaborators within a campus community.',
    impact:
      'Helps students discover ideal co-founders early — accelerating innovation, team formation, and student-led ventures.',
    stack: ['Next.js', 'Node.js', 'Llama 3B', 'MongoDB', 'Tailwind'],
    image: '/projects/campus-connect.png',
    github: 'https://github.com/Risikesh2006/Smart_Campus',
  },
  {
    title: 'AI Text Detector',
    status: 'Completed',
    description:
      'A tool that detects whether a given text is AI-generated or human-written, using a fine-tuned classification model and probability scoring.',
    impact:
      'Helps educators, editors, and platforms verify content authenticity in an era of widespread generative AI.',
    stack: ['Python', 'PyTorch', 'Transformers', 'Next.js', 'FastAPI'],
    image: '/projects/ai-text-detector.png',
    github: 'https://github.com/Risikesh2006/Ai_Text_Detector',
  },
  {
    title: 'Cybersheild',
    status: 'Completed',
    description:
      'A platform where students can learn and practice cybersecurity techniques through guided labs, challenges, and interactive lessons.',
    impact:
      'Lowers the barrier to entry for cybersecurity learning — giving students a safe, hands-on space to build real defensive and offensive skills.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Docker'],
    image: '/projects/cybershield.png',
    github: 'https://github.com/Risikesh2006/cybersheild',
  },
  {
    title: 'E-Commerce Website',
    status: 'Completed',
    description:
      'A modern full-stack e-commerce platform with product browsing, cart, checkout, payments, and an admin dashboard for inventory management.',
    impact:
      'Demonstrates production-grade full-stack delivery — auth, payments, state, and clean UX in one shipped product.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind'],
    image: '/projects/ecommerce.png',
    github: 'https://github.com/Risikesh2006/E-Commerce',
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-3">03 — Projects</p>
          <h2 className="text-[clamp(28px,7vw,52px)] sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 sm:mb-12 leading-[1.1]">
            Selected <span className="gradient-text">work.</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((p) => (
            <StaggerItem key={p.title}>
              <motion.a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-border hover:shadow-2xl hover:bg-card block min-h-[44px]"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/10] overflow-hidden bg-secondary">
                  <TiltedCard
                    imageSrc={p.image}
                    altText={p.title}
                    captionText={p.title}
                    containerHeight="100%"
                    containerWidth="100%"
                    imageHeight="100%"
                    imageWidth="100%"
                    rotateAmplitude={12}
                    scaleOnHover={1.05}
                    showMobileWarning={false}
                    showTooltip
                    displayOverlayContent
                    overlayContent={(
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-90" />
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono bg-background/70 backdrop-blur border border-border/60">
                            <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${p.status === 'In Progress' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                            {p.status}
                          </span>
                        </div>
                      </>
                    )}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">{p.title}</h3>
                    <div className="flex items-center justify-center w-11 h-11 -mr-2 -mt-2">
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </div>
                  </div>
                  <p className="text-[13px] sm:text-sm text-muted-foreground leading-relaxed mb-3">{p.description}</p>
                  <p className="text-[13px] sm:text-sm text-foreground/80 leading-relaxed mb-5">
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mr-2">Impact</span>
                    {p.impact}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono border border-border/60 text-muted-foreground bg-background/40">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-12 text-center">
          <a
            href="https://github.com/Risikesh2006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors underline-link min-h-[44px]"
          >
            <Github className="h-4 w-4" />
            View more on GitHub
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
