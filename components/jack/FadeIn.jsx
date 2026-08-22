'use client'

import { motion } from 'framer-motion'

export function FadeIn({
  children,
  as = 'div',
  className = '',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...rest
}) {
  const MotionTag = motion.create ? motion.create(as) : motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
