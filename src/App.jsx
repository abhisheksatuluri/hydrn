import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen bg-hydrn-dark text-white antialiased selection:bg-cyan-500 selection:text-black">
      <Header />

      <div className="flex-grow" style={{ paddingTop: 'var(--header-h)' }}>
        {/* 
          We use AnimatePresence for route transitions. 
          The 'mode="wait"' ensures the old page exits before the new one enters.
        */}
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {/* 
               We wrap Outlet in a keyed div if we want page transitions, 
               but typically Route components handle their own entrance animations. 
               If global transition is needed, we'd render a motion.div here.
               For now, relying on page-level animations.
            */}
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </ErrorBoundary>
      </div>

      <Footer />
    </div>
  )
}

export default App
