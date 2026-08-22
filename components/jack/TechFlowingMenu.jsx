'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

import './TechFlowingMenu.css'

const BG = '#0C0C0C'
const TEXT = '#D7E2EA'
const MARQUEE_BG = '#151719'
const MARQUEE_TEXT = '#D7E2EA'

export function TechFlowingMenu({ items = [] }) {
  return (
    <div className="tfm-wrap" style={{ backgroundColor: BG }}>
      <nav className="tfm-menu">
        {items.map((item, idx) => (
          <TechMenuItem key={item.category} index={idx} {...item} />
        ))}
      </nav>
    </div>
  )
}

function TechMenuItem({ index, category, skills }) {
  const itemRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeInnerRef = useRef(null)
  const animationRef = useRef(null)
  const [repetitions, setRepetitions] = useState(4)

  const animationDefaults = { duration: 0.6, ease: 'expo' }

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0)
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height)
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
  }

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2
    const yDiff = y - y2
    return xDiff * xDiff + yDiff * yDiff
  }

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return
      const marqueeContent = marqueeInnerRef.current.querySelector('.tfm-marquee-part')
      if (!marqueeContent) return
      const contentWidth = marqueeContent.offsetWidth
      const viewportWidth = window.innerWidth
      const needed = Math.ceil(viewportWidth / contentWidth) + 2
      setRepetitions(Math.max(4, needed))
    }

    calculateRepetitions()
    window.addEventListener('resize', calculateRepetitions)
    return () => window.removeEventListener('resize', calculateRepetitions)
  }, [skills])

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return
      const marqueeContent = marqueeInnerRef.current.querySelector('.tfm-marquee-part')
      if (!marqueeContent) return
      const contentWidth = marqueeContent.offsetWidth
      if (contentWidth === 0) return

      if (animationRef.current) animationRef.current.kill()

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: Math.max(6.5, skills.length * 1.4),
        ease: 'none',
        repeat: -1,
      })
    }

    const timer = setTimeout(setupMarquee, 50)
    return () => {
      clearTimeout(timer)
      if (animationRef.current) animationRef.current.kill()
    }
  }, [skills, repetitions])

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    const edge = findClosestEdge(x, y, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    const edge = findClosestEdge(x, y, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <div
      className="tfm-item h-[86px] sm:h-[104px] md:h-[120px]"
      ref={itemRef}
      style={{ borderColor: 'rgba(215, 226, 234, 0.12)' }}
    >
      <button
        type="button"
        className="tfm-item-link px-5 sm:px-8 md:px-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: TEXT }}
      >
        <span className="tfm-item-num absolute left-5 top-1/2 -translate-y-1/2 text-xs sm:left-8 sm:text-sm md:left-10">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-2xl sm:text-4xl md:text-5xl">{category}</span>
      </button>

      <div className="tfm-marquee" ref={marqueeRef} style={{ backgroundColor: MARQUEE_BG }}>
        <div className="tfm-marquee-inner-wrap">
          <div className="tfm-marquee-inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, i) => (
              <div className="tfm-marquee-part" key={i} style={{ color: MARQUEE_TEXT }}>
                {skills.map(({ name, Icon, color }, si) => (
                  <div
                    key={`${name}-${si}`}
                    className="tfm-pill"
                    style={{ color: MARQUEE_TEXT, borderColor: 'rgba(215, 226, 234, 0.18)', backgroundColor: 'rgba(215, 226, 234, 0.05)' }}
                  >
                    <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" style={{ color }} />
                    <span className="text-sm font-semibold sm:text-base">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
