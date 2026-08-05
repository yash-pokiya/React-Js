import React from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Smoothies from './components/Smoothies'
import { Route, Routes } from 'react-router-dom'
import AddSmoothies from './components/AddSmoothies'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
const App = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />

        <Routes>
          <Route path='/' element={<Smoothies />} />
          <Route path='/login' element={<Login />} />
          <Route 
            path='/addsmoothies' 
            element={
              <ProtectedRoute>
                <AddSmoothies />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App;