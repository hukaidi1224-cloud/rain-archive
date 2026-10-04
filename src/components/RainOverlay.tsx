import { useEffect, useRef } from 'react'

interface Drop {
  x: number
  y: number
  len: number
  speed: number
  opacity: number
  drift: number
}

export default function RainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * DPR
    canvas.height = h * DPR
    ctx.scale(DPR, DPR)

    const COUNT = Math.min(160, Math.floor(w / 9))
    const drops: Drop[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: 12 + Math.random() * 26,
      speed: 5 + Math.random() * 9,
      opacity: 0.05 + Math.random() * 0.16,
      drift: -1.2 + Math.random() * 0.8,
    }))

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1
      ctx.lineCap = 'round'
      for (const d of drops) {
        ctx.strokeStyle = `rgba(178, 196, 188, ${d.opacity})`
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d.x + d.drift * (d.len / 10), d.y + d.len)
        ctx.stroke()
        d.y += d.speed
        d.x += d.drift
        if (d.y > h + d.len) {
          d.y = -d.len
          d.x = Math.random() * (w + 100) - 50
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    window.addEventListener('resize', onResize)

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-40 h-full w-full"
        aria-hidden
      />
      <div className="grain-overlay pointer-events-none fixed inset-0 z-40" aria-hidden />
      <div className="vignette pointer-events-none fixed inset-0 z-40" aria-hidden />
    </>
  )
}
