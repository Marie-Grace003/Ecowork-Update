import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Pages auth
import Login from './pages/auth/Login/Login'
import Register from './pages/auth/Register/Register'

// Pages user
import UserDashboard from './pages/user/Dashboard/Dashboard'
import Espaces from './pages/user/Espaces/Espaces'
import Reservation from './pages/user/Reservation/Reservation'
import Profil from './pages/user/Profil/Profil'

// Pages admin
import AdminDashboard from './pages/admin/Dashboard/Dashboard'
import AdminEspaces from './pages/admin/Espaces/Espaces'
import AdminReservations from './pages/admin/Reservations/Reservations'
import AdminUsers from './pages/admin/Users/Users'

// Route protégée utilisateur
function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Chargement...</div>
  return user ? children : <Navigate to="/login" />
}

// Route protégée admin
function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()
  if (loading) return <div>Chargement...</div>
  if (!user) return <Navigate to="/login" />
  return isAdmin() ? children : <Navigate to="/dashboard" />
}

export default function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Routes utilisateur */}
      <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      <Route path="/espaces" element={<PrivateRoute><Espaces /></PrivateRoute>} />
      <Route path="/reservation/:id" element={<PrivateRoute><Reservation /></PrivateRoute>} />
      <Route path="/profil" element={<PrivateRoute><Profil /></PrivateRoute>} />

      {/* Routes admin */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/espaces" element={<AdminRoute><AdminEspaces /></AdminRoute>} />
      <Route path="/admin/reservations" element={<AdminRoute><AdminReservations /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
    </Routes>
  )
}