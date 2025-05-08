import { AdminCard } from '../../components/admin/AdminCard'
import { DashboardHeader } from '../../components/admin/DashboardHeader'
import { DashboardSidebar } from '../../components/admin/DashboardSidebar'
import { DataTable } from '../../components/shared/DataTable'
export function AdminSupportPage() {
    const tickets = [
        {
            id: 'TK-001',
            user: 'Ahmed Ben Ali',
            subject: "Problème d'accès API",
            status: 'En attente',
            priority: 'Haute',
            created: '2024-01-15',
        },
        {
            id: 'TK-002',
            user: 'Sarah Mejri',
            subject: 'Question sur la facturation',
            status: 'En cours',
            priority: 'Moyenne',
            created: '2024-01-14',
        },
    ]
    const columns = [
        {
            header: 'ID',
            accessor: 'id',
        },
        {
            header: 'Utilisateur',
            accessor: 'user',
        },
        {
            header: 'Sujet',
            accessor: 'subject',
        },
        {
            header: 'Statut',
            accessor: 'status',
            cell: (value: string) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${value === 'En attente' ? 'bg-yellow-200 text-yellow-800' : 'bg-blue-200 text-blue-800'}`}
                >
                    {value}
                </span>
            ),
        },
        {
            header: 'Priorité',
            accessor: 'priority',
            cell: (value: string) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${value === 'Haute' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}
                >
                    {value}
                </span>
            ),
        },
        {
            header: 'Créé le',
            accessor: 'created',
        },
    ]
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="min-h-screen bg-gray-900 text-gray-100 p-8">
                    <h1 className="text-2xl font-bold mb-6">Support</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <p className="text-sm text-gray-400">Tickets en attente</p>
                            <p className="text-2xl font-semibold mt-1">12</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <p className="text-sm text-gray-400">Temps de réponse moyen</p>
                            <p className="text-2xl font-semibold mt-1">2h 34m</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <p className="text-sm text-gray-400">Satisfaction client</p>
                            <p className="text-2xl font-semibold mt-1">94%</p>
                        </div>
                    </div>
                    <AdminCard title="Tickets Récents">
                        <DataTable
                            columns={columns}
                            data={tickets}
                            onRowClick={(row) => console.log('Clicked row:', row)}
                        />
                    </AdminCard>
                </main>
            </div>
        </div>
    )
}
