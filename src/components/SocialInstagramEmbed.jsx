import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import assets from '../assets-manifest.json'

/**
 * SocialInstagramEmbed Component
 * 
 * Displays an Instagram feed.
 * Currently uses a "Mock Mode" with local assets because we do not have a Widget ID.
 * 
 * TO ENABLE REAL IFRAME WIDGET:
 * 1. Go to https://lightwidget.com/ or https://snapwidget.com/ and generate a widget for @hydrn.in.
 * 2. Set `USE_WIDGET = true` below.
 * 3. Paste your iframe src or widget ID in the `iframe` tag.
 */

const USE_WIDGET = false // Set to true when you have a widget ID

const INSTAGRAM_URL = "https://www.instagram.com/hydrn.in/"

// Mock data using our existing rich assets to simulate a feed
const MOCK_POSTS = [
    { id: 1, img: assets['poster:event:evt-neon-002'], caption: "Neon nights in Hyderabad. 🌃 #hydrn #nightrun" },
    { id: 2, img: assets['product:velocity_x'], caption: "Velocity X. Just dropped. ⚡ #hydrn #gear" },
    { id: 3, img: assets['poster:event:evt-marathon-004'], caption: "Sunday prep done right. 🏃‍♂️ #marathontraining" },
    { id: 4, img: assets['product:merch_tee'], caption: "Rep the movement. New tees live. 👕" },
    { id: 5, img: assets['img:routes:preview'], caption: "Discover the unseen city. 🗺️ #urbanexploration" },
    { id: 6, img: assets['img:hero:rave'], caption: "Community first. Always. 🤝 #hydrnfam" },
    { id: 7, img: assets['img:hero:morph'], caption: "Flow state activated. 🌊" },
    { id: 8, img: assets['product:flow_cap'], caption: "Stay cool. Run hard. 🧢" }, // Fallback if exists, else reuse
    { id: 9, img: assets['poster:hero'], caption: "Morning Rave highlights. What a vibe! ✨" },
]

export default function SocialInstagramEmbed({ variant = 'grid' }) {
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef(null)

    // Lazy load observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.1 }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // Determine post count and layout based on variant
    const displayPosts = variant === 'strip' ? MOCK_POSTS.slice(0, 3) : MOCK_POSTS
    const gridClass = variant === 'strip'
        ? "grid grid-cols-1 md:grid-cols-3 gap-4"
        : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"

    const renderContent = () => {
        if (USE_WIDGET) {
            return (
                // <!-- TODO: Replace 'src' with your actual widget URL from LightWidget/SnapWidget -->
                <iframe
                    src="//lightwidget.com/widgets/YOUR_WIDGET_ID.html"
                    scrolling="no"
                    allowTransparency="true"
                    className="w-full border-0 overflow-hidden"
                    style={{ height: variant === 'strip' ? '300px' : '800px' }}
                    title="Instagram Feed"
                ></iframe>
            )
        }

        return (
            <div className={gridClass}>
                {displayPosts.map((post, i) => (
                    <motion.a
                        key={post.id}
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-white/5 border border-white/10 block"
                        aria-label={`View Instagram post: ${post.caption}`}
                    >
                        {/* Image */}
                        <img
                            src={post.img || assets['poster:hero']}
                            alt={post.caption}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                            <svg className="w-8 h-8 text-white mb-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            <p className="text-xs font-medium tracking-wide">View on Instagram</p>
                        </div>
                    </motion.a>
                ))}
            </div>
        )
    }

    return (
        <div ref={containerRef} className="w-full">
            {/* Header for grid variant only */}
            {variant === 'grid' && (
                <div className="flex flex-col items-center justify-center mb-8 text-center">
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        <h2 className="text-xl font-bold tracking-wide">From Instagram</h2>
                    </div>
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-hydrn-accent hover:text-white transition-colors font-medium text-sm"
                    >
                        Follow @hydrn.in
                    </a>
                </div>
            )}

            {/* Content */}
            <div className="min-h-[200px] flex items-center justify-center">
                {isVisible ? renderContent() : (
                    <div className="animate-pulse w-full h-48 bg-white/5 rounded-xl flex items-center justify-center text-white/20">
                        Loading Feed...
                    </div>
                )}
            </div>
        </div>
    )
}
