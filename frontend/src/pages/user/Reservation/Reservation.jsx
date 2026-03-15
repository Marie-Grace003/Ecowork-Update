import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header/Header'
import Footer from '../../../components/layout/Footer/Footer'
import api from '../../../services/api'

const typeBadge = {
    bureau: { label: 'Bureau', color: 'bg-eco-blue text-white' },
    salle_de_reunion: { label: 'Salle de réunion', color: 'bg-eco-pink text-gray-700' },
    conference: { label: 'Conférence', color: 'bg-eco-mint text-gray-700' },
}

export default function Reservation() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [espace, setEspace] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const today = new Date().toISOString().split('T')[0]

    const [formData, setFormData] = useState({
        date_debut: '',
        date_fin: '',
    })

    const nbJours = formData.date_debut && formData.date_fin
        ? Math.max(0, Math.round(
            (new Date(formData.date_fin) - new Date(formData.date_debut)) / (1000 * 60 * 60 * 24)
        ) + 1)
        : 0

    const prixTotal = espace ? nbJours * espace.tarif_journalier : 0

    useEffect(() => {
        api.get(`/espaces/${id}`)
            .then(r => setEspace(r.data))
            .catch(() => navigate('/dashboard'))
            .finally(() => setLoading(false))
    }, [id, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')
        try {
            await api.post('/reservations', {
                espace_id: id,
                date_debut: formData.date_debut,
                date_fin: formData.date_fin,
            })
            setSuccess(true)
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else {
                setError('Erreur lors de la réservation')
            }
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-eco-light flex items-center justify-center">
            <p className="text-gray-400">Chargement...</p>
        </div>
    )

    if (success) return (
        <div className="min-h-screen bg-eco-light flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center px-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'linear-gradient(to left, #7BDFF2, #7BDFF2, #B2F7EF)' }}>
                        <i className="bi bi-check-lg text-white text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation confirmée !</h2>
                    <p className="text-gray-400 mb-2">Votre réservation pour</p>
                    <p className="font-bold text-gray-800 mb-1">{espace?.nom}</p>
                    <p className="text-gray-500 text-sm mb-1">
                        Du {new Date(formData.date_debut).toLocaleDateString('fr-FR')} au {new Date(formData.date_fin).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-eco-blue font-bold text-lg mb-6">{prixTotal}€</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-3 rounded-xl text-white font-medium transition-opacity hover:opacity-90"
                        style={{ background: 'linear-gradient(to left, #7BDFF2, #7BDFF2 #B2F7EF)' }}
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    )

    return (
        <div className="min-h-screen bg-eco-light flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">

                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition-all"
                >
                    <i className="bi bi-arrow-left"></i>
                    Retour
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Carte espace */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="relative h-56">
                            {espace?.photos && espace.photos.length > 0 ? (
                                <img
                                    src={`http://127.0.0.1:8000/storage/${espace.photos[0].chemin}`}
                                    alt={espace.nom}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-eco-light flex items-center justify-center">
                                    <i className="bi bi-building text-4xl text-gray-300"></i>
                                </div>
                            )}
                            <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${typeBadge[espace?.type]?.color}`}>
                                {typeBadge[espace?.type]?.label}
                            </span>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                <h2 className="text-white font-bold text-xl">{espace?.nom}</h2>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <i className="bi bi-arrows-angle-expand text-eco-blue"></i>
                                    <span>{espace?.surface} m²</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-sm">
                                    <i className="bi bi-tag text-eco-blue"></i>
                                    <span>{espace?.tarif_journalier}€/jour</span>
                                </div>
                            </div>

                            {espace?.equipements && espace.equipements.length > 0 && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-2">Équipements inclus</p>
                                    <div className="flex flex-wrap gap-1">
                                        {espace.equipements.map((eq) => (
                                            <span key={eq.id} className="px-2 py-1 bg-eco-light text-gray-600 text-xs rounded-lg">
                                                {eq.nom}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Formulaire réservation */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-800 tracking-tighter mb-1">Réserver cet espace</h2>
                        <p className="text-gray-400 text-sm mb-6">Choisissez vos dates de réservation</p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                                <i className="bi bi-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date de début</label>
                                <input
                                    type="date"
                                    min={today}
                                    value={formData.date_debut}
                                    onChange={(e) => setFormData({ ...formData, date_debut: e.target.value, date_fin: '' })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eco-blue bg-eco-light"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date de fin</label>
                                <input
                                    type="date"
                                    min={formData.date_debut || today}
                                    value={formData.date_fin}
                                    onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-eco-blue bg-eco-light"
                                    required
                                />
                            </div>

                            {/* Résumé prix */}
                            {nbJours > 0 && (
                                <div className="bg-eco-light rounded-xl p-4 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{espace?.tarif_journalier}€ × {nbJours} jour{nbJours > 1 ? 's' : ''}</span>
                                        <span>{prixTotal}€</span>
                                    </div>
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between font-bold text-gray-800">
                                        <span>Total</span>
                                        <span className="text-eco-blue">{prixTotal}€</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="flex-1 py-3 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-200 transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting || nbJours === 0}
                                    className="flex-1 py-3 rounded-lg text-sm font-medium text-gray-800"
                                    style={{ background: 'linear-gradient(to right, #7BDFF2, #7BDFF2, #B2F7EF)' }}
                                >
                                    {submitting ? 'Réservation...' : 'Confirmer la réservation'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}