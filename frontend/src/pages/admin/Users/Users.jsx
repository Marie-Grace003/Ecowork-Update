import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../components/layout/Header/Header'
import EditUserModal from './EditUserModal'
import api from '../../../services/api'
import Footer from '../../../components/layout/Footer/Footer'

export default function AdminUsers() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users')
            setUsers(response.data)
        } catch {
            console.error('Erreur chargement utilisateurs')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Supprimer cet utilisateur ?')) return
        try {
            await api.delete(`/admin/users/${id}`)
            setUsers(users.filter(u => u.id !== id))
        } catch {
            console.error('Erreur suppression')
        }
    }

    const filtered = users.filter(u =>
        `${u.nom} ${u.prenom} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-eco-light">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Retour */}
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm mb-6 transition-all"
                >
                    <i className="bi bi-arrow-left"></i>
                    Retour au tableau de bord
                </button>

                {/* Card principale */}
                <div className="bg-white rounded-2xl shadow-sm p-6">

                    {/* En-tête */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 tracking-tighter">Gestion des utilisateurs</h1>
                            <p className="text-gray-400 text-sm mt-1">{users.length} utilisateur(s) enregistré(s)</p>
                        </div>
                        <button
                            onClick={() => navigate('/admin/users/create')}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-800 text-sm font-medium transition-opacity hover:opacity-90"
                            style={{ background: 'linear-gradient(to left, #7BDFF2, #7BDFF2, #B2F7EF)' }}
                        >
                            <i className="bi bi-plus-circle"></i>
                            Créer un administrateur
                        </button>
                    </div>

                    {/* Recherche */}
                    <div className="relative mb-4">
                        <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Rechercher un utilisateur..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-eco-blue bg-eco-light"
                        />
                    </div>

                    {/* Tableau */}
                    {loading ? (
                        <p className="text-center text-gray-400 py-8">Chargement...</p>
                    ) : filtered.length === 0 ? (
                        <p className="text-center text-gray-400 py-8">Aucun utilisateur trouvé</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left text-xs font-medium text-gray-400 pb-3">Nom</th>
                                        <th className="text-left text-xs font-medium text-gray-400 pb-3">Email</th>
                                        <th className="text-left text-xs font-medium text-gray-400 pb-3 hidden md:table-cell">Téléphone</th>
                                        <th className="text-left text-xs font-medium text-gray-400 pb-3 hidden lg:table-cell">Adresse</th>
                                        <th className="text-right text-xs font-medium text-gray-400 pb-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-100">
                                            <td className="py-3 text-sm font-medium text-gray-800">
                                                {user.prenom} {user.nom}
                                            </td>
                                            <td className="py-3 text-sm text-gray-500">{user.email}</td>
                                            <td className="py-3 text-sm text-gray-500 hidden md:table-cell">{user.telephone}</td>
                                            <td className="py-3 text-sm text-gray-500 hidden lg:table-cell">{user.adresse}</td>
                                            <td className="py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedUser(user)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-800 bg-eco-pink"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-red-300 bg-red-500"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>


            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onUpdated={(updated) => {
                        setUsers(users.map(u => u.id === updated.id ? updated : u))
                        setSelectedUser(null)
                    }}
                />
            )}

            <Footer />
        </div>
    )
}