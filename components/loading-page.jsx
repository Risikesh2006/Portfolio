'use client'

import { useEffect, useRef, useState } from 'react'
import './loading-page.css'

export default function LoadingPage({ onComplete }) {
  const canvasRef = useRef(null)
  const stageRef = useRef(null)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const waveOff = useRef(0)

  const [progress, setProgress] = useState(0)
  const [explode, setExplode] = useState(false)
  const [visible, setVisible] = useState(true)

  const W = 580
  const H = 140
  const FONT = 'bold 118px Figtree, Arial Black, sans-serif'
  const GHOST = '#2b2b2b'
  const DURATION = 3500

  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  function draw(pct) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, W, H)

    ctx.font = FONT
    ctx.textBaseline = 'middle'
    ctx.fillStyle = GHOST
    ctx.fillText('Portfolio', 0, H / 2)

    const tmp = document.createElement('canvas')
    tmp.width = W
    tmp.height = H
    const tc = tmp.getContext('2d')
    if (!tc) return

    const waterY = H - (pct / 100) * H
    const amp = 4
    const freq = 0.028
    tc.fillStyle = '#ffffff'
    tc.beginPath()
    tc.moveTo(0, H)
    for (let x = 0; x <= W; x += 3) {
      const y =
        waterY +
        amp * Math.sin((x + waveOff.current) * freq) +
        amp * 0.5 * Math.sin((x + waveOff.current * 1.3) * freq * 1.9 + 1)
      tc.lineTo(x, y)
    }
    tc.lineTo(W, H)
    tc.closePath()
    tc.fill()

    tc.globalCompositeOperation = 'destination-in'
    tc.font = FONT
    tc.textBaseline = 'middle'
    tc.fillStyle = '#fff'
    tc.fillText('Portfolio', 0, H / 2)

    ctx.drawImage(tmp, 0, 0)
  }

  useEffect(() => {
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts
      const raw = Math.min((ts - startRef.current) / DURATION, 1)
      const pct = Math.round(ease(raw) * 100)

      waveOff.current += 2.2
      draw(pct)
      setProgress(pct)

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setExplode(true)
          setTimeout(() => {
            setVisible(false)
            onComplete?.()
          }, 900)
        }, 200)
      }
    }

    document.fonts.ready.then(() => {
      draw(0)
      rafRef.current = requestAnimationFrame(tick)
    })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  if (!visible) return null

  return (
    <div className="nl-loader">
      <div className={`nl-stage${explode ? ' goo-out' : ''}`} ref={stageRef}>
        <canvas ref={canvasRef} width={W} height={H} style={{ display: 'block', width: W, height: H }} />
        <span className="nl-label" style={{ opacity: explode ? 0 : 1 }}>
          loading... {progress} %
        </span>
      </div>
    </div>
  )
}
