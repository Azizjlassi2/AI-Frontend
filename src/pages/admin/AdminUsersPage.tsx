import { DashboardHeader } from '../../components/admin/DashboardHeader'
import { DashboardSidebar } from '../../components/admin/DashboardSidebar'
import { SearchIcon, FilterIcon, UserPlus, Shield, Mail } from 'lucide-react'
const users = [
    {
        id: 1,
        name: 'Ahmed Ben Ali',
        email: 'ahmed.benali@example.com',
        role: 'Admin',
        status: 'active',
        models: 12,
        datasets: 5,
        joinDate: '2023-01-15',
    },
    {
        id: 2,
        name: 'Sarra Mejri',
        email: 'sarra.mejri@example.com',
        role: 'Creator',
        status: 'active',
        models: 8,
        datasets: 3,
        joinDate: '2023-03-22',
    },
    // ... autres utilisateurs
]
export function AdminUsersPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
                                <UserPlus className="h-5 w-5 mr-2" />
                                Ajouter un utilisateur
                            </button>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 mb-8">
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un utilisateur..."
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                                    />
                                </div>
                                <button className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                                    <FilterIcon className="h-5 w-5 mr-2" />
                                    Filtres
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-gray-700">
                                            <th className="pb-3">Utilisateur</th>
                                            <th className="pb-3">Rôle</th>
                                            <th className="pb-3">Status</th>
                                            <th className="pb-3">Modèles</th>
                                            <th className="pb-3">Datasets</th>
                                            <th className="pb-3">Date d'inscription</th>
                                            <th className="pb-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b border-gray-700 hover:bg-gray-750"
                                            >
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{user.name}</div>
                                                            <div className="text-sm text-gray-400">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="flex items-center">
                                                        <Shield className="h-4 w-4 mr-1" />
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                                    >
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="py-4">{user.models}</td>
                                                <td className="py-4">{user.datasets}</td>
                                                <td className="py-4">{user.joinDate}</td>
                                                <td className="py-4">
                                                    <div className="flex space-x-2">
                                                        <button className="p-1 hover:text-blue-400">
                                                            <Mail className="h-5 w-5" />
                                                        </button>
                                                        <button className="p-1 hover:text-yellow-400">
                                                            <Shield className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
