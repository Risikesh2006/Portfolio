'use client'

import { StaggerContainer, StaggerItem, ScrollReveal } from '@/components/scroll-reveal'

const SKILL_GROUPS = [
  {
    title: 'Languages',
    items: ['C', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Go', 'Bash'],
  },
  {
    title: 'Frontend',
    items: ['Next.js', 'React.js', 'Tailwind CSS', 'CSS', 'HTML5', 'Framer Motion', 'shadcn/ui'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'REST APIs'],
  },
  {
    title: 'Database & Cloud',
    items: ['PostgreSQL', 'MongoDB', 'Prisma', 'AWS', 'Redis'],
  },
  {
    title: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'VS Code', 'Docker', 'Postman', 'Figma'],
  },
  {
    title: 'AI / ML',
    items: ['Model Training', 'LLM Fine-tuning', 'PyTorch', 'TensorFlow', 'Transformers', 'LangChain', 'RAG'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-3">02 — Skills</p>
          <h2 className="text-[clamp(28px,7vw,64px)] sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 sm:mb-12 leading-[1.1]">
            Tools I work with <span className="gradient-text">every day.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILL_GROUPS.map((group, gi) => (
            <ScrollReveal key={group.title} delay={gi * 0.05}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 hover:border-border hover:bg-card hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                  {group.title}
                </h3>
                <StaggerContainer staggerChildren={0.04} className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <StaggerItem key={item} y={10}>
                      <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-sm border border-border/60 bg-background/40 text-foreground/90 transition-colors group-hover:border-border whitespace-nowrap">
                        {item}
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
