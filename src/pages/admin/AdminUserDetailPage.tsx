import { AdminCard } from '../../components/admin/AdminCard'

import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Key,
    Lock,
    Activity,
} from 'lucide-react'
export function AdminUserDetailPage() {
    const user = {
        id: 'USR-001',
        name: 'Ahmed Ben Ali',
        email: 'ahmed.benali@example.com',
        phone: '+216 55 123 456',
        location: 'Tunis, Tunisie',
        role: 'Développeur',
        joinDate: '15 Jan 2023',
        status: 'Actif',
        lastLogin: 'Il y a 2 heures',
        verified: true,
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AB',
        stats: {
            models: 12,
            datasets: 5,
            downloads: '2.3K',
            apiCalls: '45K',
        },
        activity: [
            {
                type: 'Model',
                action: 'Publication',
                item: 'ArabicBERT v2.1',
                date: '2024-01-15 14:30',
            },
            {
                type: 'Dataset',
                action: 'Mise à jour',
                item: 'Tunisian Dialect Corpus',
                date: '2024-01-14 09:15',
            },
        ],
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Détails de l'utilisateur</h1>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                            Suspendre
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Modifier
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Section */}
                    <div className="lg:col-span-1">
                        <AdminCard title="Profil">
                            <div className="flex flex-col items-center">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-24 h-24 rounded-full mb-4"
                                />
                                <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                                <p className="text-gray-400 mb-4">{user.role}</p>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${user.status === 'Actif' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                                >
                                    {user.status}
                                </span>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                    <span className="text-gray-300">{user.email}</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                    <span className="text-gray-300">{user.phone}</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                    <span className="text-gray-300">{user.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                    <span className="text-gray-300">
                                        Inscrit le {user.joinDate}
                                    </span>
                                </div>
                            </div>
                        </AdminCard>
                    </div>
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-800 rounded-lg p-4">
                                <p className="text-sm text-gray-400">Modèles</p>
                                <p className="text-2xl font-semibold">{user.stats.models}</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <p className="text-sm text-gray-400">Datasets</p>
                                <p className="text-2xl font-semibold">{user.stats.datasets}</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <p className="text-sm text-gray-400">Téléchargements</p>
                                <p className="text-2xl font-semibold">{user.stats.downloads}</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <p className="text-sm text-gray-400">Appels API</p>
                                <p className="text-2xl font-semibold">{user.stats.apiCalls}</p>
                            </div>
                        </div>
                        {/* Security */}
                        <AdminCard title="Sécurité">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Shield className="h-5 w-5 text-gray-400 mr-3" />
                                        <span className="text-gray-300">Authentification 2FA</span>
                                    </div>
                                    <span className="text-green-500">Activé</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Key className="h-5 w-5 text-gray-400 mr-3" />
                                        <span className="text-gray-300">Clés API</span>
                                    </div>
                                    <span className="text-gray-300">3 actives</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Lock className="h-5 w-5 text-gray-400 mr-3" />
                                        <span className="text-gray-300">Dernière connexion</span>
                                    </div>
                                    <span className="text-gray-300">{user.lastLogin}</span>
                                </div>
                            </div>
                        </AdminCard>
                        {/* Recent Activity */}
                        <AdminCard title="Activité récente">
                            <div className="space-y-4">
                                {user.activity.map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <Activity className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                                        <div>
                                            <p className="text-gray-300">
                                                {item.action} - {item.item}
                                            </p>
                                            <p className="text-sm text-gray-400">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AdminCard>
                    </div>
                </div>
            </div>
        </div>
    )
}
