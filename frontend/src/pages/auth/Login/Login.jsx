import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      const user = await login(formData.email, formData.mot_de_passe)
      if (user.type === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message })
      } else {
        setErrors({ general: 'Email ou mot de passe incorrect' })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-1 tracking-tighter text-balance">Se connecter</h2>
      <p className="text-gray-400 text-sm mb-6">
        Entrez vos identifiants pour accéder à votre espace
      </p>

      {errors.general && (
        <p className="text-red-400 text-xs text-center mb-4">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="votre.email@exemple.fr"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${errors.general
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 bg-eco-light focus:border-eco-blue'
              }`}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            value={formData.mot_de_passe}
            onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
            className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${errors.general
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 bg-eco-light focus:border-eco-blue'}`}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white py-3 rounded-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
          style={{ background: 'linear-gradient(to left, #7BDFF2, #7BDFF2, #B2F7EF)' }}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>

        <p className="text-center text-xs text-gray-400 mt-3">
          Mot de passe oublié ? Contactez un administrateur à{' '}
          <span className="text-eco-blue">admin@ecowork.com</span>
        </p>
      </form>
    </>
  )
}