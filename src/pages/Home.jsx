import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from '../components/Hero'
import VideoSlider from '../components/VideoSlider'
import SplineCanvas from '../components/SplineCanvas'
import BubblesOverlay from '../components/BubblesOverlay'
import SwipeTrail from '../components/SwipeTrail'
import SocialInstagramEmbed from '../components/SocialInstagramEmbed'
import assets from '../assets-manifest.json'

// Home Page Composition
export default function Home() {
    const scrollRef = useRef(null)
    const { scrollY } = useScroll()

    // Parallax / Bloom opacity based on scroll
    const bloomOpacity = useTransform(scrollY, [0, 800], [0.6, 0])

    useEffect(() => {
        // Scroll trigger logic for Route scene
        const handleScroll = () => {
            // Logic for triggering 'route' visibility or animation if needed
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.main
            ref={scrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-hydrn-dark relative overflow-hidden"
        >
            {/* Global FX Layers */}
            <SwipeTrail />
            <BubblesOverlay />

            {/* Bloom Overlay (Additive Blend) */}
            <motion.div
                style={{ opacity: bloomOpacity }}
                className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
            >
                <img src={assets['fx:bloom']} alt="" className="w-full h-full object-cover opacity-30" />
            </motion.div>

            <Hero />

            {/* Route & 3D Section */}
            <section className="relative py-32 px-6 z-10">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10">
                        <span className="text-hydrn-accent text-sm font-bold tracking-widest uppercase mb-4 block animate-pulse">The Route</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Urban Exploration. <br />Reimagined.</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            Every run is a new discovery. We map routes that take you through the heart of the city's architecture, blending concrete jungle with neon trails.
                        </p>
                        <button className="px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-hydrn-dark transition-all group">
                            View Routes
                            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">&rarr;</span>
                        </button>
                    </div>

                    <div className="h-[500px] w-full bg-hydrn-dark rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl group">
                        {/* Background Image for Card */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={assets['img:routes:preview']}
                                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                                alt="Route Preview"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        </div>

                        {/* Spline Overlay */}
                        <div className="absolute inset-0 z-10">
                            <SplineCanvas sceneId="route" className="w-full h-full" />
                        </div>

                        {/* Badge */}
                        <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-mono border border-white/10 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            3D Preview
                        </div>
                    </div>
                </div>
            </section>

            <VideoSlider />

            {/* Social Strip (Mini) */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">Latest from @hydrn.in</h2>
                        <a href="https://www.instagram.com/hydrn.in/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-hydrn-accent hover:text-white transition-colors">Follow Us &rarr;</a>
                    </div>
                    <SocialInstagramEmbed variant="strip" />
                </div>
            </section>

            {/* Events / Community Teaser */}
            <section className="py-32 bg-hydrn-dark relative overflow-hidden z-10">
                {/* Parallax Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={assets['img:hero:morph']}
                        alt=""
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hydrn-dark via-hydrn-dark/80 to-transparent" />
                    {/* Noise Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url(${assets['fx:noise'] || ''})` }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-12 drop-shadow-lg">Join the Movement</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Weekly Raves", date: "Every Friday, 06:00" },
                            { title: "Night Run", date: "Last Saturday, 20:00" },
                            { title: "Marathon Prep", date: "Sundays, 05:30" }
                        ].map((event, i) => (
                            <div key={i} className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-hydrn-accent hover:bg-white/10 transition-all group cursor-pointer hover:-translate-y-1 duration-300">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-hydrn-accent transition-colors">{event.title}</h3>
                                <p className="text-white/60 group-hover:text-white/80 transition-colors">{event.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </motion.main>
    )
}
