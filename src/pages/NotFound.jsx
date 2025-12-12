import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-hydrn-dark text-white text-center px-6">
            <h1 className="text-9xl font-black text-white/20">404</h1>
            <h2 className="text-4xl font-bold mb-6">Lost off track?</h2>
            <p className="text-xl text-gray-400 mb-8">The page you are looking for has crossed the finish line without you.</p>
            <Link
                to="/"
                className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-hydrn-accent transition-colors"
            >
                Back to Start
            </Link>
        </div>
    )
}
