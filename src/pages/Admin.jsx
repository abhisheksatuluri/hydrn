import React from 'react'
import { Navigate } from 'react-router-dom'

export default function Admin() {
    // Check for admin flag (mocking env check concept)
    const isAdmin = import.meta.env.REACT_APP_ADMIN === 'true'

    // If env not set (it wont be in this demo context usually), show 403 styling or redirect
    // For the sake of the user requirement "Standard Admin Page behind Flag"
    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
                <div className="text-center">
                    <h1 className="text-6xl font-black mb-4">403</h1>
                    <p className="text-xl text-white">Access Forbidden</p>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 min-h-screen container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-8 text-white">Admin Dashboard</h1>
            <p className="text-green-400">Prepare for liftoff. Admin controls active.</p>
        </div>
    )
}
