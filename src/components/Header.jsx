import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import assets from '../assets-manifest.json'

export default function Header() {
  const { pathname } = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Top-level nav links as requested
  const NAV_ITEMS = [
    { label: 'HOME', path: '/' },
    { label: 'COMMUNITY', path: '/community' },
    { label: 'EVENTS', path: '/events' },
    { label: 'SHOP', path: '/shop' },
    { label: 'ABOUT', path: '/about' }
  ]

  const NavLinks = ({ mobile = false }) => (
    <>
      {NAV_ITEMS.map((item) => {
        // Active logic: Exact match for home, partial for others
        const isActive = item.path === '/'
          ? pathname === '/'
          : pathname.startsWith(item.path)

        const mobileClasses = "text-3xl font-black text-white py-3 block tracking-tight uppercase"
        const desktopClasses = `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`

        return (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={mobile ? mobileClasses : desktopClasses}
          >
            {item.label}
          </Link>
        )
      })}

      {/* Profile Icon - Keep as utility */}
      <Link
        to="/profile"
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        className={`${mobile ? 'mt-8 text-white flex items-center gap-2 font-bold text-xl' : 'text-white/60 hover:text-white ml-2'}`}
        aria-label="Profile"
      >
        <span className={mobile ? 'inline-block' : 'hidden'}>PROFILE</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
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
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 md:px-8 bg-hydrn-dark/95 backdrop-blur-md border-b border-white/5"
      >
        <Link to="/" className="flex items-center gap-2 relative z-50 h-[60%]">
          <img
            src={assets['logo:primary:0']}
            alt="Hydrn Logo"
            className="h-full w-auto invert"
          />
          <span className="font-bold tracking-wider text-white hidden md:inline-block md:text-xl">HYDRN</span>
          {/* Mobile brand text */}
          <span className="font-bold tracking-tight text-white text-lg md:hidden">HYDRN</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-white flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-hydrn-accent"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileMenuOpen}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              top: 'var(--header-h)',
              height: 'calc(100vh - var(--header-h))'
            }}
            className="fixed left-0 right-0 bg-hydrn-dark z-[59] px-6 py-8 overflow-y-auto flex flex-col"
          >
            <nav className="flex flex-col space-y-2">
              <NavLinks mobile />
            </nav>

            {/* Decorative bottom element */}
            <div className="mt-auto pt-12 text-white/20 text-sm font-light">
              &copy; 2025 HYDRN
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
