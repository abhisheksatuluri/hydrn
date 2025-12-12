import React, { useEffect, useRef } from 'react'
import assets from '../assets-manifest.json'

export default function SwipeTrail() {
  const canvasRef = useRef(null)
  const trails = useRef([])
  const isDrawing = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrame
    let opacity = 0 // Fade in/out logic if needed

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    // Input handlers
    const handleMove = (x, y) => {
      const speed = Math.hypot(x - lastPos.current.x, y - lastPos.current.y)

      // Only draw if moving fast enough (like a swipe)
      if (speed > 10) {
        trails.current.push({
          x,
          y,
          age: 0,
          angle: Math.atan2(y - lastPos.current.y, x - lastPos.current.x)
        })
      }

      lastPos.current = { x, y }
    }

    const onTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY)

    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('mousemove', onMouseMove)

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw trails
      trails.current.forEach((t, i) => {
        t.age += 1
        const life = 1 - t.age / 20 // 20 frames life

        if (life > 0) {
          ctx.save()
          ctx.translate(t.x, t.y)
          ctx.rotate(t.angle)
          ctx.globalAlpha = life * 0.5
          ctx.globalCompositeOperation = 'screen'

          // Draw Swipe Texture
          // Note: In real app, pre-load this image object
          // For now we just draw a sleek line shape to simulate the texture trail
          ctx.shadowBlur = 10
          ctx.shadowColor = '#00f0ff' // Cyan glow
          ctx.fillStyle = '#ffffff'

          // Diamond shape trail
          ctx.beginPath()
          ctx.moveTo(0, -2)
          ctx.lineTo(20, 0)
          ctx.lineTo(0, 2)
          ctx.lineTo(-5, 0)
          ctx.fill()

          ctx.restore()
        }
      })

      // Prune dead trails
      trails.current = trails.current.filter((t) => t.age < 20)

      animationFrame = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}
