import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Cameras from './pages/Cameras'
import Sensors from './pages/Sensors'
import Schedule from './pages/Schedule'
import CameraSettings from './pages/CameraSettings'
import CameraLive from './pages/CameraLive'
import AlarmScreen from './pages/AlarmScreen'
import Contacts from './pages/Contacts'
import Settings from './pages/Settings'
import MainLayout from './layouts/MainLayout'
import NotificationService from './services/NotificationService'
import AlarmCountdown from './pages/AlarmCountdown'

import { useState, useEffect } from 'react'

// Initialize notifications when app loads
const initializeNotifications = async () => {
  try {
    await NotificationService.initialize()
    console.log('Notification service initialized')
  } catch (error) {
    console.error('Error initializing notifications:', error)
  }
}

// Simple protected route component with token verification
const ProtectedRoute = ({ children }) => {
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsVerifying(false)
        setIsValid(false)
        return
      }

      try {
        // Verify token with backend
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://unexploitative-emmalyn-unroosting.ngrok-free.dev/api'}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true'
          }
        })

        if (response.ok) {
          setIsValid(true)
        } else {
          // Token expired or invalid
          alert('⚠️ Sessione scaduta\n\nDevi effettuare nuovamente il login.')
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          setIsValid(false)
        }
      } catch (error) {
        console.error('Token verification error:', error)
        // Network error - allow access but log error
        setIsValid(true)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyToken()
  }, [token])

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-6xl text-primary animate-spin">
            progress_activity
          </span>
          <p className="text-white text-lg">Verifica sessione...</p>
        </div>
      </div>
    )
  }

  if (!isValid) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  useEffect(() => {
    initializeNotifications()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/cameras/settings/:id" element={<CameraSettings />} />
          <Route path="/cameras/live/:id" element={<CameraLive />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/alarm-countdown" element={<AlarmCountdown />} />
        <Route path="/alarm" element={<AlarmScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
