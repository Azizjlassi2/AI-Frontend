import { AdminCard } from '../../components/admin/AdminCard'
import { DataTable } from '../../components/shared/DataTable'
import { AlertTriangle, Flag } from 'lucide-react'
export function AdminReportsPage() {
    const reports = [
        {
            id: 'R-001',
            type: 'Modèle',
            item: 'ToxicText Detector',
            reporter: 'Mohamed Karim',
            reason: 'Contenu inapproprié',
            status: 'En attente',
            date: '2024-01-15',
        },
        {
            id: 'R-002',
            type: 'Dataset',
            item: 'Medical Images v2',
            reporter: 'Leila Ben Salah',
            reason: 'Violation de licence',
            status: 'Résolu',
            date: '2024-01-14',
        },
    ]
    const columns = [
        {
            header: 'ID',
            accessor: 'id',
        },
        {
            header: 'Type',
            accessor: 'type',
        },
        {
            header: 'Élément',
            accessor: 'item',
        },
        {
            header: 'Signalé par',
            accessor: 'reporter',
        },
        {
            header: 'Raison',
            accessor: 'reason',
        },
        {
            header: 'Statut',
            accessor: 'status',
            cell: (value: string) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${value === 'En attente' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}
                >
                    {value}
                </span>
            ),
        },
        {
            header: 'Date',
            accessor: 'date',
        },
    ]
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Signalements</h1>
                <div className="flex space-x-4">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Haute Priorité
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                        <Flag className="h-5 w-5 mr-2" />
                        Tous les signalements
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                    <p className="text-sm text-gray-400">Signalements en attente</p>
                    <p className="text-2xl font-semibold mt-1">8</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                    <p className="text-sm text-gray-400">Traités aujourd'hui</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                    <p className="text-sm text-gray-400">Temps moyen de traitement</p>
                    <p className="text-2xl font-semibold mt-1">4h 12m</p>
                </div>
            </div>
            <AdminCard title="Signalements Récents">
                <DataTable
                    columns={columns}
                    data={reports}
                    onRowClick={(row) => console.log('Clicked row:', row)}
                />
            </AdminCard>
        </div>
    )
}
