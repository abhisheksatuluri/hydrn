import React from 'react'

export default function Profile() {
    return (
        <div className="pt-24 min-h-screen container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-8 text-white">Runner Profile</h1>
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 text-center">
                <p className="text-gray-400 mb-4">You are currently browsing as Guest.</p>
                <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
                    Connect Strava (Coming Soon)
                </button>
            </div>
        </div>
    )
}
