export const EVENTS = [
  {
    id: 'evt-sunrise-001',
    title: 'Sunrise Rave: Tank Bund',
    date: '2025-12-25',
    time: '05:30 AM',
    location: 'Tank Bund, Hyderabad',
    price: 499,
    currency: 'INR',
    image: '/assets/images/bg_sunrise_route_4k.jpeg', // Fallback to existing asset
    features: ['Guided 5K Run', 'Live DJ Set', 'Hydration Station']
  },
  {
    id: 'evt-neon-002',
    title: 'Neon Night Run',
    date: '2025-12-31',
    time: '09:00 PM',
    location: 'Gachibowli Stadium',
    price: 999,
    currency: 'INR',
    image: '/assets/images/bg_morning_rave_atmos_4k.jpeg',
    features: ['10K Route', 'Glow Kit Included', 'After-party Access']
  }
]

export const getEventPrice = (eventId, userTier = 'free') => {
  const evt = EVENTS.find((e) => e.id === eventId)
  if (!evt) return 0

  // Membership discount logic
  if (userTier === 'member') return evt.price * 0.8
  if (userTier === 'vip') return 0 // Free for VIPs

  return evt.price
}
