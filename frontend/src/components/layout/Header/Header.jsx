import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import logo from '../../../assets/logo.svg'

export default function Header() {
    const { user, logout, isAdmin } = useAuth()
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    const adminLinks = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/users', label: 'Utilisateurs' },
        { path: '/admin/espaces', label: 'Espaces' },
        { path: '/admin/reservations', label: 'Réservations' },
    ]

    const userLinks = [
        { path: '/dashboard', label: 'Accueil' },
        { path: '/espaces', label: 'Espaces' },
        { path: '/reservations', label: 'Mes réservations' },
    ]

    const links = isAdmin() ? adminLinks : userLinks

    return (
        <header className="bg-white border-b border-gray-100 px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo + nom */}
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
                        <img
                            src={logo}
                            alt="EcoWork"
                            className="w-16 h-16 object-contain scale-150"
                        />
                    </div>
                    <span className="font-bold text-gray-800 text-lg">EcoWork</span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                                    ? 'text-white'
                                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                }`
                            }
                            style={({ isActive }) => isActive ? {
                                background: 'linear-gradient(to right, #7BDFF2, #7BDFF2, #B2F7EF)'
                            } : {}}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Dropdown utilisateur */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all"
                    >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ background: 'linear-gradient(to right, #7BDFF2, #B2F7EF)' }}
                        >
                            {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700 hidden md:block">
                            {user?.prenom} {user?.nom}
                        </span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Menu déroulant */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
                            <button
                                onClick={() => { navigate(isAdmin() ? '/admin/profil' : '/profil'); setDropdownOpen(false) }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-eco-light transition-all flex items-center gap-2"
                            >
                                <i className="bi bi-person"></i>
                                Mon profil
                            </button>
                            <hr className="my-1 border-gray-100" />
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-all flex items-center gap-2"
                            >
                                <i className="bi bi-box-arrow-right"></i>
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </header>
    )
}