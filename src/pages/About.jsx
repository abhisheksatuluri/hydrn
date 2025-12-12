import React from 'react'
import { motion } from 'framer-motion'
import assets from '../assets-manifest.json'
import SplineCanvas from '../components/SplineCanvas'

export default function About() {
  return (
    <div className="min-h-screen bg-hydrn-dark text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={assets['img:hero:morph'] || assets['img:hero:rave']}
          alt="Hydrn Atmosphere"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-hydrn-dark" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-hydrn-accent font-mono text-sm tracking-[0.2em] uppercase mb-4"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter"
          >
            Running on <br /> Rhythm.
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6 text-lg text-gray-300 font-light leading-relaxed">
              <p>
                Hydrn is a global movement dedicated to the fusion of fitness and electronic music
                culture. We specialise in immersive, high-energy running events that transform the
                city into a playground of light and sound.
              </p>
              <p>
                Our mission is to disconnect from the digital noise and reconnect with the physical
                world through collective movement. Whether you are an elite athlete or a casual
                runner, Hydrn provides an inclusive space to push your limits.
              </p>
              <p>
                Founded in 2024, we organise sunrise raves, night runs, and community meetups across
                major cities. We believe in the power of rhythm to elevate performance and the
                strength of community to inspire progress.
              </p>
            </div>

            <div className="flex gap-12 pt-8 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white">5K+</span>
                <span className="text-sm text-gray-500 mt-2 uppercase tracking-wider">Members</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white">50+</span>
                <span className="text-sm text-gray-500 mt-2 uppercase tracking-wider">Events</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white">3</span>
                <span className="text-sm text-gray-500 mt-2 uppercase tracking-wider">Cities</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Side - 3D Community Map */}
          <div className="relative">
            <div className="sticky top-32 w-full aspect-square md:aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Fallback Image (Visible while loading or if 3D fails) */}
              <img
                src={assets['img:routes:preview']}
                alt="Community Map Fallback"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />

              {/* 3D Scene */}
              <div className="absolute inset-0">
                <SplineCanvas sceneId="about" className="w-full h-full" />
              </div>

              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-hydrn-accent rounded-full animate-pulse" />
                    Interactive Map
                  </h3>
                  <p className="text-xs text-gray-400">Explore our global chapters in 3D data-space.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
