import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header/Header'
import Footer from '../../../components/layout/Footer/Footer'
import api from '../../../services/api'

const typeBadge = {
    bureau: { label: 'Bureau', color: 'bg-eco-blue text-white' },
    salle_de_reunion: { label: 'Salle de réunion', color: 'bg-eco-pink text-gray-700' },
    conference: { label: 'Conférence', color: 'bg-eco-mint text-gray-700' },
}

export default function Espaces() {
    const navigate = useNavigate()
    const [espaces, setEspaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filterType, setFilterType] = useState('')
    const [dateDebut, setDateDebut] = useState('')
    const [dateFin, setDateFin] = useState('')

    useEffect(() => {
        fetchEspaces()
    }, [])

    const fetchEspaces = async () => {
        try {
            const response = await api.get('/espaces')
            setEspaces(response.data.data || response.data)
        } catch {
            console.error('Erreur chargement espaces')
        } finally {
            setLoading(false)
        }
    }

    const filtered = espaces.filter(e => {
        const matchSearch = e.nom.toLowerCase().includes(search.toLowerCase())
        const matchType = filterType ? e.type === filterType : true
        return matchSearch && matchType
    })

    const today = new Date().toISOString().split('T')[0]

    const handleSearch = async () => {
        setLoading(true)
        try {
            let url = '/espaces?'
            if (filterType) url += `type=${filterType}&`
            if (dateDebut && dateFin) url += `date_debut=${dateDebut}&date_fin=${dateFin}`
            const response = await api.get(url)
            setEspaces(response.data.data || response.data)
        } catch {
            console.error('Erreur recherche')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-eco-light flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">

                {/* Titre */}
                <div className="mb-6">
                    <p className="text-eco-blue text-sm font-medium mb-1">✦ Espaces éco-responsables</p>
                    <h1 className="text-4xl font-bold tracking-tighter text-gray-800">
                        Nos espaces
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Trouvez l'espace parfait pour vos besoins
                    </p>
                </div>

                {/* Filtres avancés */}
                <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-3">
                        {/* Recherche */}
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

                        {/* Type */}
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

                        {/* Dates disponibilité */}
                        <div className="flex items-center gap-2 border-l border-gray-100 pl-3">
                            <input
                                type="date"
                                min={today}
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                                className="px-3 py-2 text-sm focus:outline-none bg-eco-light rounded-lg text-gray-600"
                            />
                            <span className="text-gray-300">→</span>
                            <input
                                type="date"
                                min={dateDebut || today}
                                value={dateFin}
                                onChange={(e) => setDateFin(e.target.value)}
                                className="px-3 py-2 text-sm focus:outline-none bg-eco-light rounded-lg text-gray-600"
                            />
                        </div>

                        {/* Bouton recherche par dispo */}
                        {dateDebut && dateFin && (
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 rounded-xl text-white text-sm font-medium transition-opacity hover:opacity-90"
                                style={{ background: 'linear-gradient(to right, #7BDFF2, #7BDFF2, #B2F7EF)' }}
                            >
                                <i className="bi bi-search me-1"></i>
                                Vérifier dispo
                            </button>
                        )}
                    </div>
                </div>

                {/* Compteur */}
                <p className="text-sm text-gray-400 font-medium mb-4">
                    <i class="bi bi-check-circle"></i> {filtered.length} espace{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}
                </p>

                {/* Grille */}
                {loading ? (
                    <p className="text-center text-gray-400 py-8">Chargement...</p>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-12">
                        <i className="bi bi-building-x text-4xl text-gray-300 mb-3 block"></i>
                        <p className="text-gray-400">Aucun espace trouvé pour ces critères</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((espace) => (
                            <div key={espace.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                                <div className="relative h-48 bg-eco-light">
                                    {espace.photos && espace.photos.length > 0 ? (
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${espace.photos[0].chemin}`}
                                            alt={espace.nom}
                                            className="w-full h-full object-cover"
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
            </main>

            <Footer />
        </div>
    )
}