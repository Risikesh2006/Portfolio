'use client'

import { ScrollReveal } from '@/components/scroll-reveal'

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-xs sm:text-sm font-mono text-muted-foreground mb-3">01 — About</p>
          <h2 className="text-[clamp(28px,7vw,52px)] sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 sm:mb-12 leading-[1.1]">
            Building software <span className="gradient-text">from the user&apos;s lens.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 sm:gap-10">
          <ScrollReveal delay={0.1} className="md:col-span-3 space-y-4 sm:space-y-5 text-[15px] sm:text-base lg:text-lg leading-[1.7] text-muted-foreground">
            <p>
              I&apos;m a software developer with knowledge across <span className="text-foreground font-medium">AI engineering, model development</span>, and full-stack application work.
              I&apos;m also exploring game development alongside building full-stack applications integrated with trained models.
            </p>
            <p>
              I love building applications around the most innovative ideas and workflows.
              My approach is different — instead of just thinking <span className="text-foreground font-medium">&quot;I need to build a website for X&quot;</span>,
              I think like the user. I become the first user of whatever I build, test it myself, and imagine what the user actually needs.
            </p>
            <p>
              That perspective is how I figure out what to give to the user — to deliver the perfect application.
              Maybe there are people who think this way too, but this is my approach.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-2">
            <div className="rounded-2xl border border-border/60 bg-card/50 p-5 sm:p-6 backdrop-blur-sm">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Quick Facts</h3>
              <ul className="space-y-3 text-sm">
                {[
                  ['Role', 'AI / Full Stack Developer'],
                  ['Focus', 'AI systems & web apps'],
                  ['Currently', 'Game dev + ML training'],
                  ['Mindset', 'User-first builder'],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-start justify-between gap-3 border-b border-border/40 pb-3 last:border-0 last:pb-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-foreground font-medium text-right">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
