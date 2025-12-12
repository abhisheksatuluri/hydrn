import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { VARIANTS, EASE, DURATION } from '../styles/motion-tokens'
import SplineCanvas from './SplineCanvas'
import assets from '../assets-manifest.json'

/*
  Hero Component
  - Video Background: morning_rave_hero.mp4
  - Spline Overlay: 'hero' scene
  - Parallax effect on scroll
  - Mobile play/pause controls
  - Performance: Muted autoplay loop
*/

export default function Hero() {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [heroState, setHeroState] = useState('loading') // 'loading' | 'ready'

  // Track individual readiness
  const [videoReady, setVideoReady] = useState(false)
  const [splineReady, setSplineReady] = useState(false)

  // Scroll Parallax
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 })

  // Synchronize Ready State
  useEffect(() => {
    if (videoReady && splineReady) {
      // Small buffer to ensure smoothness
      const timer = setTimeout(() => setHeroState('ready'), 100)
      return () => clearTimeout(timer)
    }
  }, [videoReady, splineReady])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // If already ready (cached)
      if (video.readyState >= 3) {
        setVideoReady(true)
      }

      const handleCanPlay = () => setVideoReady(true)
      video.addEventListener('canplaythrough', handleCanPlay)
      return () => video.removeEventListener('canplaythrough', handleCanPlay)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-hydrn-dark group pt-20 md:pt-0 pb-0"
      data-hero-state={heroState}
    >
      {/* 
        Layer 1: Video (Background)
        - Z-Index: 0
        - Always visible (poster covers it initially)
      */}
      <motion.div style={{ y: springY1 }} className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={assets['poster:hero']}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        >
          <source src={assets['video:hero']} type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-hydrn-dark z-10 pointer-events-none" />
      </motion.div>

      {/* 
        Layer 2: Poster Overlay (Crossfade)
        - Z-Index: 5
        - Fades out when heroState === 'ready'
      */}
      <div
        className={`absolute inset-0 z-[5] bg-hydrn-dark transition-opacity duration-700 ease-in-out pointer-events-none ${heroState === 'ready' ? 'opacity-0' : 'opacity-100'}`}
      >
        <img
          src={assets['poster:hero']}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>

      {/* 
        Layer 3: Spline 3D Overlay
        - Z-Index: 10
        - Must sit ABOVE video
      */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <SplineCanvas
          sceneId="hero"
          className="w-full h-full"
          onLoaded={() => setSplineReady(true)}
        />
      </div>

      {/* Content Layer (Z-Index 20) */}
      <motion.div
        style={{ y: y2, opacity }}
        className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.out }}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-2 drop-shadow-2xl">
            HYDRN
          </h1>
          <div className="h-1 w-24 bg-hydrn-accent mx-auto mb-6 rounded-full" />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: DURATION.base, ease: EASE.out }}
          className="text-lg md:text-2xl text-white/90 max-w-xl font-light tracking-wide mix-blend-overlay"
        >
          Elevate your run. Experience the flow state.
        </motion.p>
      </motion.div>

      {/* Mobile Controls & Scroll Indicator (Z-index 30) */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-4">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-white"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  )
}
