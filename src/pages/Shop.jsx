import React from 'react'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
    return (
        <div className="pt-32 min-h-screen container mx-auto px-6 pb-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Shop Gear</h1>
                <p className="text-gray-400 text-lg max-w-2xl">
                    Performance wear engineered for the nocturnal athlete.
                    Limited edition drops inspired by the rhythm of the city.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
        </div>
    )
}
