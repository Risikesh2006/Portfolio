'use client'

import { FadeIn } from './FadeIn'
import { TechFlowingMenu } from './TechFlowingMenu'
import { TECH_ROWS } from './techstack-data'

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden py-20 sm:py-24 md:py-32"
      style={{ background: '#0C0C0C' }}
    >
      <div className="px-5 sm:px-8 md:px-10">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading mb-4 text-center font-black uppercase leading-none tracking-tight sm:mb-5"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Tech Stack
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="mx-auto mb-14 max-w-xl text-center text-sm text-[#D7E2EA]/50 sm:mb-16 sm:text-base md:mb-20">
            Technologies I use to design, build, and ship scalable digital products.
            <span className="mt-1 block text-xs text-[#D7E2EA]/30 sm:text-sm">Hover a category to see the stack.</span>
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.15} y={30} className="w-full">
        <div className="w-full border-t border-[#D7E2EA]/10">
          <TechFlowingMenu items={TECH_ROWS} />
        </div>
      </FadeIn>
    </section>
  )
}
