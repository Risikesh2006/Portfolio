'use client'

import { useEffect, useRef, useState } from 'react'

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      const withinX = e.clientX >= rect.left - padding && e.clientX <= rect.right + padding
      const withinY = e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding

      if (withinX && withinY) {
        setIsActive(true)
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        setTranslate({ x: dx / strength, y: dy / strength })
      } else {
        setIsActive(false)
        setTranslate({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [padding, strength])

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
      ref={ref}
    >
      {children}
    </div>
  )
}
