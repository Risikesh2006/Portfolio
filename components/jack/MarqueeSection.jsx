'use client'

import { useEffect, useRef, useState } from 'react'

const IMAGES = [
  '/marquee/d1.png',
  '/marquee/d2.png',
  '/marquee/d3.png',
  '/marquee/d4.png',
  '/marquee/d5.png',
  '/marquee/d6.png',
  '/marquee/d7.png',
  '/marquee/d8.png',
]

// Repeat the 8 source images to fill each row, rotating the starting
// point per row so the two rows don't line up identically.
function fillRow(length, offset) {
  return Array.from({ length }, (_, i) => IMAGES[(i + offset) % IMAGES.length])
}

const ROW1 = fillRow(11, 0)
const ROW2 = fillRow(10, 4)

function Row({ images, refCallback }) {
  const tripled = [...images, ...images, ...images]
  return (
    <div ref={refCallback} className="flex gap-3" style={{ willChange: 'transform' }}>
      {tripled.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="h-[244px] w-[480px] flex-shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  )
}

export function MarqueeSection() {
  const sectionRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 200}px)`
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ background: '#0C0C0C' }}
    >
      <div className="flex flex-col gap-3">
        <Row images={ROW1} refCallback={row1Ref} />
        <Row images={ROW2} refCallback={row2Ref} />
      </div>
    </section>
  )
}
