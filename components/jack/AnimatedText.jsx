'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Char({ char, index, total, scrollYProgress }) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])

  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

export function AnimatedText({ text, className = '', style = {} }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')
  const total = chars.length

  // Group into words so the browser only breaks lines between words —
  // wrapping every single character in its own inline element confuses
  // Chromium's line-breaking on dense inline trees.
  const words = []
  let current = []
  let globalIndex = 0
  chars.forEach((char) => {
    if (char === ' ') {
      words.push({ chars: current, index: globalIndex - current.length })
      words.push({ chars: [' '], index: globalIndex, isSpace: true })
      current = []
    } else {
      current.push(char)
    }
    globalIndex += 1
  })
  if (current.length) {
    words.push({ chars: current, index: globalIndex - current.length })
  }

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) =>
        word.isSpace ? (
          <span key={wi}> </span>
        ) : (
          <span key={wi} className="inline-block whitespace-nowrap">
            {word.chars.map((char, ci) => (
              <Char key={ci} char={char} index={word.index + ci} total={total} scrollYProgress={scrollYProgress} />
            ))}
          </span>
        )
      )}
    </p>
  )
}
