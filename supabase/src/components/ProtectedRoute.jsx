import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { isAdmin, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-6 flex justify-center items-center">
                <p className="text-gray-500 font-medium">Checking authorization...</p>
            </div>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
