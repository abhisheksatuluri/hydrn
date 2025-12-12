import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { EVENTS } from '../lib/monetisation/events'
import { MERCH_PRODUCTS } from '../lib/monetisation/merch-data'
import { createOrder, openCheckout } from '../lib/monetisation/razorpay'
import SponsorBadge from '../components/SponsorBadge'

export default function CheckoutDemo() {
  const [selectedItem, setSelectedItem] = useState(EVENTS[0])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'failed' | null

  const handleCheckout = async () => {
    setLoading(true)
    setStatus(null)

    try {
      // 1. Create Order (Mock Backend)
      const order = await createOrder(selectedItem.price)

      // 2. Open Razorpay
      await openCheckout({
        orderId: order.id,
        amount: order.amount,
        name: 'Hydrn Store',
        description: `Payment for ${selectedItem.title || selectedItem.name}`,
        onSuccess: (res) => {
          setLoading(false)
          setStatus('success')
        },
        onFailure: (err) => {
          setLoading(false)
          setStatus('failed')
        }
      })
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }

  // Combine lists for demo
  const allItems = [...EVENTS, ...MERCH_PRODUCTS]

  return (
    <div className="min-h-screen pt-24 px-6 pb-12 bg-hydrn-dark text-white">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-hydrn-accent to-purple-500">
            Checkout Demo
          </h1>
          <p className="text-gray-400">Test the monetisation flows with Razorpay (Test Mode).</p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Selector */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Select Item</h2>
            <div className="space-y-4">
              {allItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item)
                    setStatus(null)
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedItem.id === item.id
                      ? 'border-hydrn-accent bg-hydrn-accent/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{item.title || item.name}</h3>
                      <p className="text-sm text-gray-400">{item.id}</p>
                    </div>
                    <div className="text-xl font-mono">₹{item.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
                Powered by sponsorships
              </h3>
              <div className="flex gap-4">
                <SponsorBadge name="TechnoGym" tier="gold" />
                <SponsorBadge name="RedBull" tier="silver" />
              </div>
            </div>
          </div>

          {/* Checkout Panel */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10 h-fit sticky top-32">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>{selectedItem.title || selectedItem.name}</span>
                <span>₹{selectedItem.price}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Taxes & Fees</span>
                <span>₹0</span>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="flex justify-between text-xl font-bold text-hydrn-accent">
                <span>Total</span>
                <span>₹{selectedItem.price}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 rounded-full bg-hydrn-accent text-hydrn-dark font-bold text-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay ₹${selectedItem.price}`}
            </button>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500 text-green-400 text-center"
              >
                ✅ Payment Successful! Ticket sent to email.
              </motion.div>
            )}

            {status === 'failed' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500 text-red-400 text-center"
              >
                ❌ Payment Failed. Please try again.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
