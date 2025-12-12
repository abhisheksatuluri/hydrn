import React from 'react'
import assets from '../assets-manifest.json'

// Extract rave videos for gallery
const galleryItems = Object.keys(assets)
    .filter(key => key.startsWith('video:morning_rave:'))
    .map((key, index) => ({
        id: key,
        // Use the video src
        src: assets[key],
        // Use the shared poster for now unless specific ones exist
        poster: assets['poster:event_thumb'] || assets['lqip:event_thumb'],
        title: `Morning Rave • Clip ${index + 1}`
    }))

export default function Media() {
    return (
        <div className="pt-24 min-h-screen container mx-auto px-6">
            <h1 className="text-5xl font-bold mb-12 text-white">Media Gallery</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                    <div key={item.id} className="group relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10">
                        <video
                            src={item.src}
                            poster={item.poster}
                            controls
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-white font-medium text-sm">{item.title}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center text-gray-500 text-sm">
                End of Gallery
            </div>
        </div>
    )
}
