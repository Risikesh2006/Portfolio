'use client'

import { useCallback, useLayoutEffect, useRef } from 'react'
import { PROJECTS } from './projects-data'
import { ProjectCard } from './ProjectCard'

// Stacking geometry — small, subtle increments so the peeking edge
// of each previous card stays thin (per spec: "difference should be subtle").
const STACK_POSITION = 88 // px from viewport top where a pinned card rests
const ITEM_STACK_DISTANCE = 20 // extra px offset per card index
const ITEM_SCALE = 0.015
const OPACITY_STEP = 0.04
const MIN_OPACITY = 0.85

export function ProjectStack() {
  const cardsRef = useRef([])
  const endRef = useRef(null)
  const cardTopsRef = useRef([])
  const cardHeightsRef = useRef([])
  const endTopRef = useRef(0)
  const rafRef = useRef(null)
  const reducedMotionRef = useRef(false)

  const calculateProgress = useCallback((value, start, end) => {
    if (end <= start) return 1
    if (value < start) return 0
    if (value > end) return 1
    return (value - start) / (end - start)
  }, [])

  // Static (untransformed) layout positions — measured with any prior
  // transform cleared first, since getBoundingClientRect reflects the
  // rendered (transformed) position, not the document-flow position.
  const measure = useCallback(() => {
    const cards = cardsRef.current
    cards.forEach((card) => {
      if (card) card.style.transform = 'none'
    })

    const scrollY = window.scrollY
    cardTopsRef.current = cards.map((card) => {
      if (!card) return 0
      return card.getBoundingClientRect().top + scrollY
    })
    cardHeightsRef.current = cards.map((card) => (card ? card.offsetHeight : 0))
    if (endRef.current) {
      endTopRef.current = endRef.current.getBoundingClientRect().top + scrollY
    }
  }, [])

  const updateTransforms = useCallback(() => {
    const cards = cardsRef.current
    const total = cards.length
    if (!total) return

    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight

    cards.forEach((card, i) => {
      if (!card) return

      const cardTop = cardTopsRef.current[i]
      const cardHeight = cardHeightsRef.current[i]
      const pinOffset = STACK_POSITION + ITEM_STACK_DISTANCE * i
      // Never translate the card past the point where its own bottom edge
      // would reach the stack's bottom edge — keeps it from bleeding into
      // whatever section follows, same bound native `position: sticky`
      // respects against its containing block.
      const pinEnd = endTopRef.current - cardHeight - pinOffset
      const stepsBehind = total - 1 - i
      const targetScale = reducedMotionRef.current ? 1 : 1 - stepsBehind * ITEM_SCALE
      const targetOpacity = reducedMotionRef.current
        ? 1
        : Math.max(1 - stepsBehind * OPACITY_STEP, MIN_OPACITY)

      // Scale/opacity ease in over one viewport height of scroll, matching
      // the card's natural entrance (its top travelling from the bottom of
      // the viewport to the top).
      const scaleProgress = calculateProgress(scrollY, cardTop - viewportHeight, cardTop)
      const scale = 1 + scaleProgress * (targetScale - 1)
      const opacity = 1 + scaleProgress * (targetOpacity - 1)

      // Pin the card at STACK_POSITION + i*ITEM_STACK_DISTANCE from the
      // viewport top once scroll reaches it, holding it there (stacked
      // beneath later cards) until it hits its own pinEnd bound.
      const pinStart = cardTop - pinOffset
      let translateY = 0
      if (scrollY >= pinStart && scrollY <= pinEnd) {
        translateY = scrollY - cardTop + pinOffset
      } else if (scrollY > pinEnd) {
        translateY = pinEnd - cardTop + pinOffset
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
      card.style.opacity = String(opacity)
    })
  }, [calculateProgress])

  const tick = useCallback(() => {
    updateTransforms()
    rafRef.current = requestAnimationFrame(tick)
  }, [updateTransforms])

  useLayoutEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    measure()
    updateTransforms()
    rafRef.current = requestAnimationFrame(tick)

    const handleResize = () => {
      measure()
      updateTransforms()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [measure, tick, updateTransforms])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      {PROJECTS.map((project, i) => (
        <ProjectCard
          key={project.number}
          project={project}
          index={i}
          ref={(el) => {
            cardsRef.current[i] = el
          }}
        />
      ))}
      <div ref={endRef} className="h-px w-full" aria-hidden="true" />
    </div>
  )
}
