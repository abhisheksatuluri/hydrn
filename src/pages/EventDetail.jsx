
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// import useCheckout from '../hooks/useCheckout' // Hook not found, mocking for build
const useCheckout = () => ({
    startCheckout: (evt) => alert(`Checkout for ${evt.title} coming soon!`)
})
import eventsData from '../data/events.seed.json'
import assets from '../assets-manifest.json'

export default function EventDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { startCheckout } = useCheckout()
    const [event, setEvent] = useState(null)

    useEffect(() => {
        // Find event by ID
        const found = eventsData.find(e => e.id === id)
        if (found) {
            setEvent(found)
        } else {
            // Fallback for demo if id not found, just use the first one
            setEvent(eventsData[0])
        }
    }, [id])

    if (!event) return <div className="pt-32 text-center text-white">Loading event...</div>

    const posterSrc = assets[event.posterKey] || assets['poster:event_thumb']

    return (
        <div className="min-h-screen bg-hydrn-dark pb-24">
            {/* Hero Header */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={posterSrc}
                        className="w-full h-full object-cover opacity-60"
                        alt={event.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hydrn-dark via-hydrn-dark/50 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full container mx-auto px-6 py-12">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                    >
                        <span className="inline-block px-3 py-1 mb-4 border border-hydrn-accent text-hydrn-accent rounded-full text-xs font-bold uppercase tracking-widest">
                            {event.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-2 max-w-3xl">{event.title}</h1>
                        <p className="text-xl text-white/80 flex items-center gap-4">
                            <span>{event.date} at {event.time}</span>
                            <span className="w-1 h-1 bg-white/50 rounded-full" />
                            <span>{event.location}</span>
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">About the Event</h2>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {event.description}
                        </p>
                    </section>
                    <div className="mb-12 space-y-4">
                        <h3 className="text-2xl font-bold">Event Highlights</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            {event.features.map((feat, i) => <li key={i}>{feat}</li>)}
                        </ul>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-hydrn-light-dark p-8 rounded-lg shadow-lg space-y-6">
                        <h3 className="text-2xl font-bold text-white">Event Details</h3>
                        <div className="space-y-3 text-gray-300">
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            <p><strong>Category:</strong> {event.category}</p>
                            <p><strong>Price:</strong> ${event.price}</p>
                        </div>
                        <button
                            onClick={() => startCheckout(event)}
                            className="w-full px-6 py-4 bg-hydrn-accent text-black text-xl font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            Book Your Spot
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
