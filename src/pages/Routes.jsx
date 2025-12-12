import React from 'react'

export default function RoutesPage() {
    return (
        <div className="pt-24 min-h-screen container mx-auto px-6">
            <h1 className="text-5xl font-bold mb-8 text-white">Curated Routes</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {/* Placeholder for Route Cards */}
                <div className="h-64 bg-white/5 rounded-xl border border-white/10 p-6">
                    <h3 className="text-xl font-bold">Tank Bund Loop</h3>
                    <p className="text-gray-400">5.2 km • Flat</p>
                </div>
                <div className="h-64 bg-white/5 rounded-xl border border-white/10 p-6">
                    <h3 className="text-xl font-bold">KBR Park Outer</h3>
                    <p className="text-gray-400">4.8 km • Rolling Hills</p>
                </div>
            </div>
        </div>
    )
}
