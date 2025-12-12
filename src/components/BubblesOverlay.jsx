import React, { useEffect, useState } from 'react'
import SplineCanvas from './SplineCanvas'
import { motion } from 'framer-motion'

export default function BubblesOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Delay appearance
    const timer = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none z-10 overflow-hidden"
    >
      {/* 
        Bubbles Scene
        - Loaded lazily
        - Renders ambient floating bubbles
      */}
      <div className="w-full h-full opacity-50 mix-blend-screen">
        <SplineCanvas sceneId="bubbles" className="w-full h-full" />
      </div>
    </motion.div>
  )
}
