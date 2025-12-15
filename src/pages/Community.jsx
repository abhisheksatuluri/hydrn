import React from 'react'
import { motion } from 'framer-motion'
import VideoSlider from '../components/VideoSlider'
import SocialInstagramEmbed from '../components/SocialInstagramEmbed'

export default function Community() {
    return (
        <div className="pt-24 min-h-screen container mx-auto px-6">
            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl font-bold mb-8 text-white"
            >
                Community
            </motion.h1>
            <p className="text-xl text-gray-300 mb-12">Join the movement. Connect with fellow runners in Hyderabad.</p>

            {/* Morning Rave Series Slider */}
            <div className="-mx-6 border-b border-white/10 pb-24 mb-24">
                <VideoSlider />
            </div>

            {/* Instagram Social Feed */}
            <div className="mb-32">
                <SocialInstagramEmbed variant="grid" />
            </div>
        </div>
    )
}
