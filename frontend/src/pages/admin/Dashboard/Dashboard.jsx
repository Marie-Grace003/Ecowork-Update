import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header/Header'
import api from '../../../services/api'
import Footer from '../../../components/layout/Footer/Footer'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    utilisateurs: 0,
    espaces: 0,
    reservations: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, espaces, reservations] = await Promise.all([
          api.get('/admin/users'),
          api.get('/espaces'),
          api.get('/admin/reservations'),
        ])
        setStats({
          utilisateurs: users.data.length,
          espaces: espaces.data.data?.length || espaces.data.length,
          reservations: reservations.data.length,
        })
      } catch {
        console.error('Erreur chargement stats')
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-eco-light">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Titre */}
        <div className="mb-8">
          <p className="text-eco-blue text-sm font-medium mb-1">✦ Administration</p>
          <h1 className="text-4xl font-bold tracking-tighter text-gray-800">
            Tableau de bord
          </h1>
          <p className="text-gray-600 mt-1">
            Gérez votre plateforme EcoWork et suivez l'activité en temps réel
          </p>
        </div>

        {/* Cartes stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Utilisateurs</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-eco-blue">
                <i className="bi bi-people"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.utilisateurs}</p>
            <p className="text-gray-400 text-xs mt-1">Clients enregistrés</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Espaces</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-eco-pink">
                <i className="bi bi-building"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.espaces}</p>
            <p className="text-gray-400 text-xs mt-1">Espaces disponibles</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm">Réservations</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-eco-mint">
                <i className="bi bi-calendar-check"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.reservations}</p>
            <p className="text-gray-400 text-xs mt-1">Réservations totales</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 tracking-tighter mb-1">Actions rapides</h2>
            <p className="text-gray-400 text-sm mb-4">Gérez votre plateforme efficacement</p>
            <div className="space-y-2">
              {[
                { label: 'Gérer les utilisateurs', path: '/admin/users', icon: <i className="bi bi-people"></i> },
                { label: 'Gérer les espaces', path: '/admin/espaces', icon: <i className="bi bi-building"></i> },
                { label: 'Gérer les réservations', path: '/admin/reservations', icon: <i className="bi bi-calendar3"></i> },
              ].map((action) => (
                <button
                  key={action.path}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:bg-eco-light transition-all text-sm text-gray-700"
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 tracking-tighter mb-1">Créations rapides</h2>
            <p className="text-gray-400 text-sm mb-4">Ajoutez de nouveaux éléments</p>
            <div className="space-y-2">
              {[
                { label: 'Créer un nouvel espace', path: '/admin/espaces', icon: '+' },
                { label: 'Créer un administrateur', path: '/admin/users', icon: '+' },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-800 text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ background: 'linear-gradient(to left, #7BDFF2, #7BDFF2, #B2F7EF)' }}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}