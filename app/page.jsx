"use client"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Contact } from '@/components/contact'
import LoadingPage from '@/components/loading-page'
import ParallaxProvider from '@/components/ParallaxProvider'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <LoadingPage onComplete={() => setIsLoading(false)} />
  }

  return (
    <ParallaxProvider>
      <div className="relative min-h-screen text-foreground">
        <Navbar />
        <main>
          <div data-parallax="section">
            <Hero />
          </div>
          <div data-parallax="section">
            <About />
          </div>
          <div data-parallax="section">
            <Skills />
          </div>
          <div data-parallax="section">
            <Projects />
          </div>
          <div data-parallax="section">
            <Experience />
          </div>
          <div data-parallax="section">
            <Contact />
          </div>
        </main>
        <footer className="border-t border-border/40 py-8 sm:py-10 text-center text-[12px] sm:text-sm text-muted-foreground px-5">
          <p>
            Built by{' '}
            <span className="text-foreground font-medium">Risikesh Somnath T</span>
            {' '}· {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </ParallaxProvider>
  )
}
