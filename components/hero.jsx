'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HalftoneReveal from '@/components/ui/HalftoneReveal'

const ROLES = ['AI Developer', 'Full Stack Developer', 'AI Systems Engineer']

// Replace this with your actual photo URL
const PROFILE_IMG = '/profile.jpg'

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const containerRef = useRef(null)

  // Parallax on scroll
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 600], [0, -60])
  const yImage = useTransform(scrollY, [0, 600], [0, 80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // Mouse parallax for image
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const sx = useSpring(mvX, { stiffness: 80, damping: 20 })
  const sy = useSpring(mvY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 24
    mvX.set(x)
    mvY.set(y)
  }

  return (
    <section id="home" ref={containerRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg px-6 lg:px-8 py-16 sm:py-24 lg:py-0">
      {/* Animated background orbs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-foreground/5 blur-3xl animate-orb" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-foreground/5 blur-3xl animate-orb" style={{ animationDelay: '-10s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Grid overlay */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }} />

      <motion.div style={{ opacity }} className="max-w-6xl w-full mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Profile image (Order 1 on mobile, 2 on desktop) */}
        <motion.div style={{ y: yImage }} className="order-1 lg:order-2 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: sx, y: sy }}
            className="relative"
          >
            {/* Glow ring */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-foreground/20 via-foreground/5 to-transparent blur-2xl" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-foreground/40 via-foreground/10 to-transparent" />

            <div className="relative w-[180px] h-[180px] sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full overflow-hidden border border-border/60 bg-secondary">
              <HalftoneReveal
                src={PROFILE_IMG}
                inkColor="#141414"
                paperColor="#fff7e6"
                mode="mono"
                dotDensity={71}
                angle={45}
                revealRadius={0.4}
                dotSize={1}
                shape="circle"
                contrast={1.15}
                invert={false}
                edge={0.8}
                follow={0.37}
                idleReveal={0}
                trigger="hover"
                borderRadius="9999px"
                style={{ width: '100%', height: '100%' }}
              />
              {/* Inner border highlight */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-foreground/10 pointer-events-none" />
            </div>

            {/* Floating decorative pill (hidden on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="hidden sm:block absolute -bottom-3 -left-6 px-3 py-1.5 rounded-full border border-border/60 bg-background/80 backdrop-blur-xl text-xs font-mono text-muted-foreground shadow-lg"
            >
              <span className="text-foreground">{'{ '}</span>
              building things
              <span className="text-foreground">{' }'}</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text content (Order 2 on mobile, 1 on desktop) */}
        <motion.div style={{ y: yText }} className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-background/40 backdrop-blur-sm text-[10px] sm:text-xs text-muted-foreground mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for opportunities
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm text-muted-foreground mb-2 sm:mb-3 font-mono"
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[clamp(32px,10vw,48px)] sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4"
          >
            Risikesh
            <br />
            <span className="gradient-text">Somnath T.</span>
          </motion.h1>

          {/* Rotating roles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-9 sm:h-10 mb-6 flex items-center justify-center lg:justify-start gap-2 text-base sm:text-xl text-muted-foreground"
          >
            <Sparkles className="h-4 w-4 text-foreground/80" />
            <div className="relative h-full overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block font-medium text-foreground"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            I build AI-powered applications and systems that solve real-world problems.
            Passionate about turning innovative ideas into clean, production-ready software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
          >
            <Button asChild size="lg" className="w-full sm:w-auto group rounded-full px-8 transition-all hover:-translate-y-0.5 hover:shadow-lg min-h-[48px]">
              <a href="#projects">
                View my work
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 transition-all hover:-translate-y-0.5 border-border/80 min-h-[48px]">
              <a href="#contact">
                Get in touch
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground"
      >
        <span className="font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-foreground/40 to-transparent" />
      </motion.div>
    </section>
  )
}
