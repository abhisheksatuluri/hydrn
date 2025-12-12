import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import assets from '../assets-manifest.json'

export default function ProductCard({ product, index = 0 }) {
    // Helper to get image, fallback if missing
    const imgSrc = assets[product.imageKey] || assets['lqip:event_thumb']

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-hydrn-accent/50 hover:shadow-xl hover:shadow-hydrn-accent/10 transition-all duration-300 flex flex-col"
        >
            {/* Image Container with Hover Zoom */}
            <div className="relative h-64 overflow-hidden bg-black/50">
                <img
                    src={imgSrc}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold uppercase tracking-wider text-white border border-white/10">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-hydrn-accent transition-colors">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-white">
                        ₹{product.price.toLocaleString()}
                    </span>
                    <Link
                        to={`/shop/${product.slug}`}
                        className="px-4 py-2 bg-white text-black text-sm font-bold uppercase tracking-wide rounded-lg hover:bg-hydrn-accent transition-colors transform active:scale-95"
                    >
                        Buy Now
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
