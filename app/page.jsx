'use client'

import { useState } from 'react'
import { HeroSection } from '@/components/jack/HeroSection'
import { MarqueeSection } from '@/components/jack/MarqueeSection'
import { AboutSection } from '@/components/jack/AboutSection'
import { SkillsSection } from '@/components/jack/SkillsSection'
import { ServicesSection } from '@/components/jack/ServicesSection'
import { ProjectsSection } from '@/components/jack/ProjectsSection'
import { Contact } from '@/components/contact'
import LoadingPage from '@/components/loading-page'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <LoadingPage onComplete={() => setIsLoading(false)} />
  }

  return (
    <div className="relative" style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
        <div id="contact">
          <Contact />
        </div>
      </main>
      <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-[#D7E2EA]/60 sm:py-10 sm:text-sm" style={{ background: '#0C0C0C' }}>
        <p>
          Built by <span className="font-medium text-[#D7E2EA]">Risikesh Somnath T</span> ·{' '}
          {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
