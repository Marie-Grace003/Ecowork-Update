import { useState } from 'react'
import Login from './Login/Login'
import Register from './Register/Register'
import logo from '../../assets/logo.svg'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className="min-h-screen bg-eco-light flex flex-col items-center justify-center px-4 py-8">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        <div className="flex justify-center mb-2">
          <img
            src={logo}
            alt="EcoWork logo"
            className="w-50 h-50 object-contain"
            style={{ margin: 0, padding: 0 }}
          />
        </div>

        {/* Toggle */}
        <div className="bg-eco-light rounded-full p-1 flex mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 cursor-pointer rounded-full text-sm font-medium transition-all ${activeTab === 'login'
              ? 'text-white'
              : 'text-gray-500'
              }`}
            style={activeTab === 'login' ? {
              background: 'linear-gradient(to right, #7BDFF2,#7BDFF2, #B2F7EF)'
            } : {}}
          >
            Connexion
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 cursor-pointer rounded-full text-sm font-medium transition-all ${activeTab === 'register'
              ? 'text-white'
              : 'text-gray-500'
              }`}
            style={activeTab === 'register' ? {
              background: 'linear-gradient(to right, #7BDFF2, #7BDFF2, #B2F7EF)'
            } : {}}
          >
            Inscription
          </button>
        </div>

        {/* Formulaire */}
        <div className={activeTab === 'login' ? 'block' : 'hidden'}>
          <Login />
        </div>
        <div className={activeTab === 'register' ? 'block' : 'hidden'}>
          <Register />
        </div>

      </div>
    </div>
  )
}