'use client'

import { FadeIn } from './FadeIn'
import { AnimatedText } from './AnimatedText'
import { ContactButton } from './ContactButton'

const DECOR = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    className: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    className: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    className: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    className: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
]

const ABOUT_TEXT =
  "i'm a software developer working across ai engineering, model development, and full-stack applications — with game development as the newest thing i'm exploring, alongside building apps that integrate trained models into real workflows. i love building around the most innovative ideas out there, and my approach is a little different: instead of asking \"what website does x need,\" i become the first user of whatever i build. i test it myself, live in it, and figure out what a real user actually needs before i call it done. that's how i land on the perfect application — not by guessing, but by using it first. let's build something incredible together!"

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-10 px-5 py-20 sm:gap-14 sm:px-8 md:gap-16 md:px-10"
      style={{ background: '#0C0C0C' }}
    >
      {DECOR.map((item, i) => (
        <FadeIn
          key={i}
          delay={item.delay}
          x={item.x}
          y={0}
          duration={0.9}
          className={`absolute z-0 hidden sm:block ${item.className}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt="" className="w-full select-none" draggable={false} />
        </FadeIn>
      ))}

      <FadeIn delay={0} y={40} className="relative z-10">
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </h2>
      </FadeIn>

      <div className="relative z-10 flex max-w-[560px] flex-col items-center gap-16 sm:max-w-[760px] sm:gap-20 md:max-w-[960px] md:gap-24 lg:max-w-[1100px]">
        <AnimatedText
          text={ABOUT_TEXT}
          className="w-full text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}
        />
        <ContactButton />
      </div>
    </section>
  )
}
