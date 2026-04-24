import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'

export default function Register() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    telephone: '',
    adresse: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(formData)
      navigate('/dashboard')
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else if (err.response?.data?.message) {
        setErrors({ general: err.response.data.message })
      } else {
        setErrors({ general: "Une erreur est survenue lors de l'inscription" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-1 tracking-tighter text-balance">Créer un compte</h2>
      <p className="text-gray-400 text-sm mb-6">
        Inscrivez-vous pour réserver des espaces
      </p>

      {errors.general && (
        <p className="text-red-400 text-xs text-center mb-4">{errors.general}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Prénom</label>
            <input
              type="text"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eco-blue"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eco-blue"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${errors.email
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 bg-eco-light focus:border-eco-blue'
              }`}
            required
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            value={formData.mot_de_passe}
            onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
            className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none ${errors.mot_de_passe
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 bg-eco-light focus:border-eco-blue'}`}
            required
          />
          {errors.mot_de_passe && (
            <p className="text-red-400 text-xs mt-1">{errors.mot_de_passe[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Téléphone</label>
          <input
            type="tel"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eco-blue"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adresse</label>
          <input
            type="text"
            value={formData.adresse}
            onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eco-blue"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white py-3 rounded-lg font-medium transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
          style={{ background: 'linear-gradient(to right, #7BDFF2, #7BDFF2, #B2F7EF)' }}
        >
          {loading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>
    </>
  )
}