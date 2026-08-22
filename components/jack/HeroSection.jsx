'use client'

import { FadeIn } from './FadeIn'
import { ContactButton } from './ContactButton'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const PORTRAIT_IMG = '/me.png'

export function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn delay={0} y={-20}>
        <nav className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <h1 className="hero-heading w-full whitespace-nowrap text-center text-[9.5vw] font-black uppercase leading-none tracking-tight sm:text-[9vw] md:text-[8vw] lg:text-[7vw]">
          Hi, i&apos;m risikesh
        </h1>
      </FadeIn>

      <div className="relative flex-1">
        <div className="absolute left-1/2 top-0 z-10 w-[320px] -translate-x-1/2 -mt-2 sm:w-[460px] md:w-[600px] lg:w-[720px]">
          <FadeIn delay={0.6} y={30}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PORTRAIT_IMG} alt="Risikesh Somnath T" className="w-full select-none" draggable={false} />
          </FadeIn>
        </div>
      </div>

      <div className="flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20} className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
          <p
            className="font-light uppercase leading-snug tracking-wide text-[#D7E2EA]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a software engineer driven by building scalable and intelligent products
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
