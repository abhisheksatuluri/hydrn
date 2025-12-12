import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import assets from '../assets-manifest.json'

export default function Header() {
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const NavLinks = ({ mobile = false }) => (
    <>
      {['HOME', 'EVENTS', 'SHOP', 'ABOUT'].map((item) => {
        const path = item === 'HOME' ? '/' : `/${item.toLowerCase()}`
        const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)

        // Desktop: standard spacing
        // Mobile: 1.125rem (18px), clear spacing (min 16px vertical)
        const mobileClasses = "text-[1.125rem] font-bold text-white py-2 block"
        const desktopClasses = `text-sm tracking-wide transition-colors ${isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'}`

        return (
          <Link
            key={item}
            to={path}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={mobile ? mobileClasses : desktopClasses}
          >
            {item}
          </Link>
        )
      })}
      <Link
        to="/profile"
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        className={`${mobile ? 'mt-4 text-white' : 'text-white/60 hover:text-white'}`}
        aria-label="Profile"
      >
        <svg className={`${mobile ? 'w-6 h-6' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
      </Link>
    </>
  )

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ height: 'var(--header-h)' }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 md:px-6 bg-hydrn-dark/80 backdrop-blur-md border-b border-white/5"
      >
        <Link to="/" className="flex items-center gap-2 relative z-50 h-[70%]">
          <img
            src={assets['logo:primary:0']}
            alt="Hydrn Logo"
            className="h-full w-auto invert"
          />
          <span className="font-bold tracking-wider text-white hidden md:inline-block md:text-xl">HYDRN</span>
          {/* Mobile brand text */}
          <span className="font-bold tracking-normal text-white text-[1rem] md:hidden">HYDRN</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-white flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          role="button"
          tabIndex="0"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ top: 'var(--header-h)' }}
            className="fixed left-0 right-0 bottom-0 bg-hydrn-dark/95 backdrop-blur-xl z-[59] flex flex-col px-5 pt-8 overflow-y-auto"
          >
            {/* Backdrop filter for contrast is handled by bg-hydrn-dark/95 + backdrop-blur */}
            <nav className="flex flex-col space-y-4">
              <NavLinks mobile />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
