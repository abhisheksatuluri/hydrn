import React from 'react'
import { Link } from 'react-router-dom'
import assets from '../assets-manifest.json'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img
            src={assets['logo:primary:1']}
            alt="Hydrn Logo"
            className="h-8 w-auto mb-4 invert opacity-80"
          />
          <p className="text-sm text-gray-400">© 2025 Hydrn. All rights reserved.</p>
        </div>

        <nav className="flex gap-8">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
            Home
          </Link>
          <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
            About
          </Link>
          <Link to="/routes" className="text-gray-400 hover:text-white transition-colors text-sm">
            Routes
          </Link>
          <Link to="/community" className="text-gray-400 hover:text-white transition-colors text-sm">
            Community
          </Link>
          <Link to="/media" className="text-gray-400 hover:text-white transition-colors text-sm">
            Media
          </Link>
        </nav>
      </div>
    </footer>
  )
}
