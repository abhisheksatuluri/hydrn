import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SurveySlider Component
 * 
 * A sleek, multi-step modal for collecting RSVP details.
 * Features:
 * - Slide-in animation from right
 * - Progress bar
 * - Multi-type questions (Single, Multi, Text)
 * - Validation
 * - Mock Submission to /api/survey/submit
 */

// Placeholder Question Set - to be replaced by Google Form mapping/patch later.
const QUESTIONS = [
    {
        id: 'name',
        type: 'text',
        question: "What's your name?",
        placeholder: "Enter your full name",
        required: true
    },
    {
        id: 'experience',
        type: 'select',
        question: "Running Experience",
        options: ["Beginner (0-5k)", "Intermediate (5k-10k)", "Advanced (Half Marathon+)", "Elite"],
        required: true
    },
    {
        id: 'interests',
        type: 'multi',
        question: "What brings you here? (Select all)",
        options: ["Urban Exploration", "Fitness Goals", "Meeting People", "Party/Rave Vibe"],
        required: false
    },
    {
        id: 'health',
        type: 'textarea',
        question: "Any health conditions we should know?",
        placeholder: "N/A or details...",
        required: false
    }
]

export default function SurveySlider({ open, onClose, eventTitle = "Event" }) {
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const totalSteps = QUESTIONS.length + 1 // +1 for Review/Submit step

    // Handlers
    const handleAnswer = (val) => {
        const qId = QUESTIONS[currentStep].id
        setAnswers(prev => ({ ...prev, [qId]: val }))
        setError('')
    }

    const handleMultiSelect = (val) => {
        const qId = QUESTIONS[currentStep].id
        const start = answers[qId] || []
        const newArr = start.includes(val) ? start.filter(x => x !== val) : [...start, val]
        setAnswers(prev => ({ ...prev, [qId]: newArr }))
    }

    const handleNext = () => {
        // Validation
        const q = QUESTIONS[currentStep]
        if (q && q.required) {
            const val = answers[q.id]
            if (!val || (Array.isArray(val) && val.length === 0)) {
                setError('This field is required')
                return
            }
        }
        setError('')
        setCurrentStep(prev => prev + 1)
    }

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)

        // Construct payload
        const payload = {
            event: eventTitle,
            timestamp: new Date().toISOString(),
            responses: answers
        }

        try {
            // Trying the stub endpoint. If running locally without backend, catch might fire or 404.
            // We'll fallback to success mocking for UI demo as requested.
            const res = await fetch('/api/survey/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            // For local development without Vercel emulation, fetch might 404.
            // We treat that as "success mockup" but log the error.
            if (res.ok) {
                const data = await res.json()
                console.log('[Survey] Success:', data)
            } else {
                console.warn('[Survey] API Stub ignored or failed, simulating success for UI demo.')
            }

            // UX Delay
            setTimeout(() => {
                setIsSubmitting(false)
                setIsSuccess(true)
            }, 1500)

        } catch (err) {
            console.error('[Survey] Network error, simulating success.', err)
            setTimeout(() => {
                setIsSubmitting(false)
                setIsSuccess(true)
            }, 1500)
        }
    }

    const renderStep = () => {
        // QUESTION STEPS
        if (currentStep < QUESTIONS.length) {
            const q = QUESTIONS[currentStep]
            return (
                <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col h-full"
                >
                    <div className="mb-2 text-hydrn-accent text-sm font-bold uppercase tracking-widest">Question {currentStep + 1} of {QUESTIONS.length}</div>
                    <h2 className="text-3xl font-bold mb-8 text-white">{q.question}</h2>

                    <div className="flex-grow">
                        {q.type === 'text' && (
                            <input
                                autoFocus
                                type="text"
                                className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-xl text-white focus:border-hydrn-accent focus:outline-none transition-colors"
                                placeholder={q.placeholder}
                                value={answers[q.id] || ''}
                                onChange={e => handleAnswer(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleNext()}
                            />
                        )}

                        {q.type === 'textarea' && (
                            <textarea
                                className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-xl text-white focus:border-hydrn-accent focus:outline-none transition-colors h-40 resize-none"
                                placeholder={q.placeholder}
                                value={answers[q.id] || ''}
                                onChange={e => handleAnswer(e.target.value)}
                            />
                        )}

                        {q.type === 'select' && (
                            <div className="space-y-3">
                                {q.options.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => { handleAnswer(opt); setTimeout(handleNext, 150) }}
                                        className={`w-full text-left px-6 py-4 rounded-xl border transition-all ${answers[q.id] === opt ? 'bg-hydrn-accent text-black border-hydrn-accent font-bold' : 'bg-white/5 border-white/10 hover:border-white/40 text-white'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {q.type === 'multi' && (
                            <div className="space-y-3">
                                {q.options.map(opt => {
                                    const selected = (answers[q.id] || []).includes(opt)
                                    return (
                                        <button
                                            key={opt}
                                            onClick={() => handleMultiSelect(opt)}
                                            className={`w-full text-left px-6 py-4 rounded-xl border transition-all flex justify-between items-center ${selected ? 'bg-hydrn-accent/20 border-hydrn-accent text-white' : 'bg-white/5 border-white/10 hover:border-white/40 text-white'}`}
                                        >
                                            <span>{opt}</span>
                                            {selected && <div className="w-3 h-3 rounded-full bg-hydrn-accent shadow-[0_0_10px_cyan]" />}
                                        </button>
                                    )
                                })}
                            </div>
                        )}

                        {error && <div className="mt-4 text-red-400 font-medium animate-pulse">{error}</div>}
                    </div>
                </motion.div>
            )
        }

        // REVIEW STEP
        return (
            <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col h-full"
            >
                <div className="mb-2 text-hydrn-accent text-sm font-bold uppercase tracking-widest">Review</div>
                <h2 className="text-3xl font-bold mb-8 text-white">Almost there</h2>

                <div className="flex-grow space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                    {QUESTIONS.map(q => (
                        <div key={q.id} className="border-b border-white/10 pb-4">
                            <div className="text-white/60 text-sm mb-1">{q.question}</div>
                            <div className="text-white text-lg font-medium">
                                {Array.isArray(answers[q.id]) ? answers[q.id].join(', ') : (answers[q.id] || 'Skipped')}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 text-xs text-white/40">
                    By clicking Submit, you agree to our Terms of Service.
                </div>
            </motion.div>
        )
    }

    // Success Screen
    if (isSuccess) {
        return (
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-[100]">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        {/* Modal */}
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-full md:max-w-md bg-hydrn-dark border-l border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center text-center"
                        >
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">You're In! 🚀</h2>
                            <p className="text-white/70 mb-8">We've received your RSVP for {eventTitle}. Check your email for details.</p>
                            <button onClick={onClose} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                                Close
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Sidebar Modal */}
                    <motion.div
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="absolute right-0 top-0 bottom-0 w-full md:max-w-lg bg-hydrn-dark border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Progress Bar */}
                        <div className="h-2 bg-white/5 w-full">
                            <motion.div
                                className="h-full bg-hydrn-accent shadow-[0_0_10px_cyan]"
                                animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors z-20"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* Content Area */}
                        <div className="flex-grow px-8 py-12 flex flex-col relative overflow-hidden">
                            <AnimatePresence mode='wait'>
                                {renderStep()}
                            </AnimatePresence>
                        </div>

                        {/* Footer Controls */}
                        <div className="p-8 border-t border-white/10 flex justify-between items-center bg-black/20">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0 || isSubmitting}
                                className={`text-sm font-medium transition-colors ${currentStep === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white hover:text-hydrn-accent'}`}
                            >
                                &larr; Back
                            </button>

                            {currentStep === QUESTIONS.length ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-hydrn-accent text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Next &rarr;
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
