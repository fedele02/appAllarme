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

// Simple protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
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

        <Route path="/alarm" element={<AlarmScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
