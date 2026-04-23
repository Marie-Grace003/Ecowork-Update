import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import Header from '../../../components/layout/Header/Header'
import api from '../../../services/api'

const typeBadge = {
    bureau: { label: 'Bureau', color: 'bg-eco-blue text-white' },
    salle_de_reunion: { label: 'Salle de réunion', color: 'bg-eco-pink text-gray-700' },
    conference: { label: 'Conférence', color: 'bg-eco-mint text-gray-700' },
}

export default function UserDashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [espaces, setEspaces] = useState([])
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('espaces')
    const [search, setSearch] = useState('')
    const [filterType, setFilterType] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [espacesRes, reservationsRes] = await Promise.all([
                    api.get('/espaces'),
                    api.get('/reservations'),
                ])
                setEspaces(espacesRes.data.data || espacesRes.data)
                setReservations(reservationsRes.data.data || reservationsRes.data) 
            } catch {
                console.error('Erreur chargement données')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredEspaces = espaces.filter(e => {
        const matchSearch = e.nom.toLowerCase().includes(search.toLowerCase())
        const matchType = filterType ? e.type === filterType : true
        return matchSearch && matchType
    }).slice(0, 6)

    return (
        <div className="min-h-screen bg-eco-light flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">

                {/* Titre */}
                <div className="mb-6">
                    <p className="text-eco-blue text-sm font-medium mb-1">
                        ✦ Espaces éco-responsables
                    </p>
                    <h1 className="text-4xl font-bold tracking-tighter text-gray-800">
                        Bienvenue {user?.prenom} 👋
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Réservez votre espace de travail parfait dans notre bâtiment éco-conçu du 11ème arrondissement de Paris
                    </p>
                </div>

                {/* Toggle Espaces / Mes réservations */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('espaces')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'espaces'
                            ? 'text-white'
                            : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                        style={activeTab === 'espaces' ? {
                            background: 'linear-gradient(to right, #7BDFF2, #7BDFF2, #B2F7EF)'
                        } : {}}
                    >
                        <i className="bi bi-building"></i>
                        Espaces disponibles
                    </button>
                    <button
                        onClick={() => setActiveTab('reservations')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'reservations'
                            ? 'text-white'
                            : 'bg-white text-gray-500 hover:bg-gray-50'
                            }`}
                        style={activeTab === 'reservations' ? {
                            background: 'linear-gradient(to right, #7BDFF2, #7BDFF2, #B2F7EF)'
                        } : {}}
                    >
                        <i className="bi bi-calendar-check"></i>
                        Mes réservations
                    </button>
                </div>

                {/* Contenu selon tab actif */}
                {activeTab === 'espaces' ? (
                    <>
                        {/* Filtres */}
                        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col md:flex-row gap-3 mb-4">
                            <div className="relative flex-1">
                                <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="Rechercher un espace..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm focus:outline-none bg-transparent"
                                />
                            </div>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 text-sm focus:outline-none text-gray-600 bg-transparent border-l border-gray-100"
                            >
                                <option value="">Tous les types</option>
                                <option value="bureau">Bureau</option>
                                <option value="salle_de_reunion">Salle de réunion</option>
                                <option value="conference">Conférence</option>
                            </select>
                        </div>

                        {/* Compteur */}
                        <p className="text-sm text-gray-400 font-medium mb-4">
                            <i className="bi bi-check-circle"></i> {filteredEspaces.length} espaces disponibles
                        </p>

                        {/* Grille espaces */}
                        {loading ? (
                            <p className="text-center text-gray-400 py-8">Chargement...</p>
                        ) : filteredEspaces.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">Aucun espace trouvé</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredEspaces.map((espace) => (
                                    <div key={espace.id} className="bg-white rounded-2xl shadow-xl hover:shadow-gray-500 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group cursor-pointer">

                                        {/* Photo */}
                                        <div className="relative h-48 bg-eco-light">
                                            {espace.photos && espace.photos.length > 0 ? (
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${espace.photos[0].chemin}`}
                                                    alt={espace.nom}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <i className="bi bi-building text-4xl"></i>
                                                </div>
                                            )}
                                            <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${typeBadge[espace.type]?.color}`}>
                                                {typeBadge[espace.type]?.label}
                                            </span>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                                <h3 className="text-white font-bold">{espace.nom}</h3>
                                            </div>
                                        </div>

                                        {/* Infos */}
                                        <div className="p-4">
                                            <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                                                <i className="bi bi-arrows-angle-expand text-eco-blue"></i>
                                                <span>{espace.surface} m²</span>
                                            </div>

                                            {espace.equipements && espace.equipements.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-xs text-gray-400 mb-2">Équipements inclus</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {espace.equipements.slice(0, 3).map((eq) => (
                                                            <span key={eq.id} className="px-2 py-1 bg-eco-light text-gray-600 text-xs rounded-lg">
                                                                {eq.nom}
                                                            </span>
                                                        ))}
                                                        {espace.equipements.length > 3 && (
                                                            <span className="px-2 py-1 bg-eco-light text-gray-400 text-xs rounded-lg">
                                                                +{espace.equipements.length - 3} autres
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            <p className="text-gray-800 font-bold mb-4">
                                                {espace.tarif_journalier}€ <span className="text-gray-400 font-normal text-sm">/jour</span>
                                            </p>

                                            <button
                                                onClick={() => navigate(`/reservation/${espace.id}`)}
                                                className="w-full py-2 rounded-xl text-sm font-medium text-gray-800 transition-opacity hover:opacity-90"
                                                style={{ background: 'linear-gradient(to right, #7BDFF2, #B2F7EF, #7BDFF2)' }}
                                            >
                                                Réserver cet espace
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Bouton voir tous les espaces */}
                        {espaces.length > 3 && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => navigate('/espaces')}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium bg-zinc-300"
                                >
                                    <i className="bi bi-grid"></i>
                                    Voir tous les espaces
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Mes réservations */
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-bold text-gray-800 tracking-tight mb-4">Mes réservations</h2>
                        {loading ? (
                            <p className="text-center text-gray-400 py-8">Chargement...</p>
                        ) : reservations.length === 0 ? (
                            <p className="text-center text-gray-400 py-8">Aucune réservation pour le moment</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left text-xs font-medium text-gray-400 pb-3">Espace</th>
                                            <th className="text-left text-xs font-medium text-gray-400 pb-3 hidden md:table-cell">Date début</th>
                                            <th className="text-left text-xs font-medium text-gray-400 pb-3 hidden md:table-cell">Date fin</th>
                                            <th className="text-left text-xs font-medium text-gray-400 pb-3">Prix</th>
                                            <th className="text-left text-xs font-medium text-gray-400 pb-3">Statut</th>
                                            <th className="text-right text-xs font-medium text-gray-400 pb-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.slice(0, 3).map((r) => (
                                            <tr key={r.id} className="border-b border-gray-50 hover:bg-eco-light transition-all">
                                                <td className="py-3 text-sm font-medium text-gray-800">
                                                    {r.espace?.nom}
                                                </td>
                                                <td className="py-3 text-sm text-gray-500 hidden md:table-cell">
                                                    {new Date(r.date_debut).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="py-3 text-sm text-gray-500 hidden md:table-cell">
                                                    {new Date(r.date_fin).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="py-3 text-sm font-medium text-gray-800">
                                                    {r.prix_total}€
                                                </td>
                                                <td className="py-3">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.facture_acquittee
                                                        ? 'bg-eco-mint text-gray-700'
                                                        : 'bg-eco-pink text-gray-700'
                                                        }`}>
                                                        {r.facture_acquittee ? 'bi-check-circle Payé' : 'bi-clock En attente'}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-right">
                                                    <button
                                                        onClick={() => navigate(`/reservations`)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-eco-blue hover:bg-eco-light transition-all ml-auto"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {reservations.length > 0 && (
                                    <div className="flex justify-center mt-4">
                                        <button
                                            onClick={() => navigate('/reservations')}
                                            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-medium bg-zinc-300"
                                        >
                                            <i className="bi bi-calendar-check"></i>
                                            Voir toutes mes réservations
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}