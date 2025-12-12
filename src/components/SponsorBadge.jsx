import React from 'react'
import { motion } from 'framer-motion'

const TIERS = {
  platinum: { color: 'text-gray-100', border: 'border-gray-100', bg: 'bg-gray-100/10' },
  gold: { color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-400/10' },
  silver: { color: 'text-gray-400', border: 'border-gray-400', bg: 'bg-gray-400/10' }
}

export default function SponsorBadge({ name, tier = 'platinum', logo }) {
  const style = TIERS[tier] || TIERS.silver

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg backdrop-blur-md border ${style.border} ${style.bg} transition-colors`}
    >
      {logo ? (
        <img src={logo} alt={name} className="h-6 w-auto object-contain" />
      ) : (
        <span className={`font-bold uppercase tracking-wider ${style.color}`}>{name}</span>
      )}
      <span className="text-xs opacity-60 uppercase tracking-widest">{tier} Partner</span>
    </motion.div>
  )
}
