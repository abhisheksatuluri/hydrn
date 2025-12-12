const RAZORPAY_SCRIPT = 'https://checkout.razorpay.com/v1/checkout.js'

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.src = RAZORPAY_SCRIPT
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Mock Order Creation (Backend would do this)
export const createOrder = async (amount, currency = 'INR') => {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 800))

  return {
    id: `order_${Math.random().toString(36).substr(2, 9)}`,
    amount: amount * 100, // razorpay expects paise
    currency
  }
}

export const openCheckout = async ({
  orderId,
  amount,
  name,
  description,
  prefill,
  onSuccess,
  onFailure
}) => {
  const isLoaded = await loadRazorpay()
  if (!isLoaded) {
    onFailure({ error: { description: 'Razorpay SDK failed to load' } })
    return
  }

  const options = {
    key: 'rzp_test_DUMMY_KEY_123', // Dummy Key
    amount: amount, // Amount is in currency subunits
    currency: 'INR',
    name: 'Hydrn',
    description: description,
    image: '/icons/Hydrn_20251211_195853_0000.png',
    order_id: orderId,
    handler: function (response) {
      console.log('Payment Success:', response)
      onSuccess(response)
    },
    prefill: prefill || {
      name: 'Hydrn Runner',
      email: 'runner@hydrn.com',
      contact: '9999999999'
    },
    theme: {
      color: '#00f0ff' // Hydrn Cyan
    },
    modal: {
      ondismiss: function () {
        console.log('Checkout dismissed')
      }
    }
  }

  const rzp1 = new window.Razorpay(options)
  rzp1.on('payment.failed', function (response) {
    console.error('Payment Failed:', response.error)
    onFailure(response)
  })

  rzp1.open()
}
