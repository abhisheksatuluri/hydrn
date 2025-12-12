import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { morningRaveData } from '../data/morningRave'
import assets from '../assets-manifest.json'
import { VARIANTS, EASE, DURATION } from '../styles/motion-tokens'

export default function VideoSlider() {
  const containerRef = useRef(null)
  const [selectedVideo, setSelectedVideo] = useState(null)

  return (
    <section className="relative py-24 bg-hydrn-dark overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Morning Rave Series</h2>
          <div className="h-1 w-20 bg-hydrn-secondary rounded-full" />
        </div>

        {/* Navigation Hints (Desktop) */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
            className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
            className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors text-white"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Swipe Container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-6 px-6 pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing"
      >
        {morningRaveData.map((video, idx) => (
          <VideoCard
            key={video.id}
            video={video}
            index={idx}
            onOpen={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {/* Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function VideoCard({ video, index, onOpen }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.6 } // Play when 60% visible
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
    }
  }, [])

  // Sync Playback state with Visibility
  React.useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    if (isVisible) {
      const playPromise = vid.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented (e.g. low power mode)
          // Fallback to poster is automatic since video sits behind it or poster is attr
        })
      }
    } else {
      vid.pause()
    }
  }, [isVisible])

  return (
    <motion.div
      ref={cardRef}
      initial="initial"
      whileInView="animate"
      variants={VARIANTS.fadeUp}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: DURATION.base, ease: EASE.out }}
      className="relative flex-shrink-0 w-[85vw] md:w-[40vw] lg:w-[28vw] aspect-video md:aspect-[4/5] lg:aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group snap-center cursor-pointer shadow-lg hover:shadow-hydrn-accent/20 transition-all"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      aria-label={`Play ${video.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
    >
      <video
        ref={videoRef}
        src={video.videoKey}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
      />

      {/* Badge Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <img src={assets['logo:primary:0']} alt="Hydrn" className="w-6 h-auto drop-shadow-lg" />
        <span className="px-2 py-1 text-xs font-bold text-black bg-white/90 backdrop-blur-md rounded-full uppercase tracking-wider">
          {video.tag}
        </span>
      </div>

      {/* Play Overlay (Visible on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Footer Gradient & Text */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-hydrn-accent transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-gray-300 font-mono flex items-center gap-2 opacity-80">
          {video.description}
        </p>
      </div>
    </motion.div>
  )
}

function VideoModal({ video, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
        onClick={onClose}
        aria-label="Close modal"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={video.videoKey}
          poster={video.poster}
          controls
          autoPlay
          className="w-full h-full"
        />
      </motion.div>

      <div className="absolute bottom-8 left-8 text-white pointer-events-none">
        <h2 className="text-3xl font-bold mb-2">{video.title}</h2>
        <p className="text-gray-400">Now Playing</p>
      </div>
    </motion.div>
  )
}
