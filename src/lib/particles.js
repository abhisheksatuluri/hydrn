/*
  Simple Particle System
  - Manages lightweight particles for UI effects
  - Uses DOM nodes or Canvas for rendering
  - Integration with assets: particle_noise_4k.jpg
*/

import assets from '../assets-manifest.json'

// DOM-based simple particle system for minimal overhead on React state
export class ParticleSystem {
  constructor(container) {
    this.container = container
    this.particles = []
    this.isActive = false
  }

  emit(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      this.createParticle(x, y)
    }
  }

  createParticle(x, y) {
    const el = document.createElement('div')

    // Random physics
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 2 + 1
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed
    const life = Math.random() * 0.8 + 0.4 // seconds
    const size = Math.random() * 20 + 10 // px

    // Styling
    el.style.position = 'absolute'
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.width = `${size}px`
    el.style.height = `${size}px`
    el.style.backgroundImage = `url(${assets['fx:noise']})`
    el.style.backgroundSize = 'cover'
    el.style.borderRadius = '50%'
    el.style.pointerEvents = 'none'
    el.style.opacity = '0.8'
    el.style.transform = 'translate(-50%, -50%) scale(0.5)'
    el.style.transition = `transform ${life}s ease-out, opacity ${life}s ease-out`
    el.style.mixBlendMode = 'screen' // Additive blend

    this.container.appendChild(el)

    // Trigger animation next frame
    requestAnimationFrame(() => {
      el.style.transform = `translate(calc(-50% + ${vx * 50}px), calc(-50% + ${vy * 50}px)) scale(0)`
      el.style.opacity = '0'
    })

    // Cleanup
    setTimeout(() => {
      if (el.parentNode === this.container) {
        this.container.removeChild(el)
      }
    }, life * 1000)
  }
}
