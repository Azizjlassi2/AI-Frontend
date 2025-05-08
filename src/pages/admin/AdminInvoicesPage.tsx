import { Link } from 'react-router-dom'
import { AdminCard } from '../../components/admin/AdminCard'
import { DashboardHeader } from '../../components/admin/DashboardHeader'
import { DashboardSidebar } from '../../components/admin/DashboardSidebar'
import { DataTable } from '../../components/shared/DataTable'
import { Download, FileText } from 'lucide-react'
export function AdminInvoicesPage() {
    const invoices = [
        {
            id: 'INV-001',
            client: 'TechCorp Tunisie',
            amount: '2,500 DT',
            status: 'Payée',
            date: '2024-01-15',
        },
        {
            id: 'INV-002',
            client: 'AI Solutions SARL',
            amount: '1,800 DT',
            status: 'En attente',
            date: '2024-01-14',
        },
    ]
    const columns = [
        {
            header: 'Numéro',
            accessor: 'id',
        },
        {
            header: 'Client',
            accessor: 'client',
        },
        {
            header: 'Montant',
            accessor: 'amount',
        },
        {
            header: 'Statut',
            accessor: 'status',
            cell: (value: string) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${value === 'Payée' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}
                >
                    {value}
                </span>
            ),
        },
        {
            header: 'Date',
            accessor: 'date',
        },
        {
            header: 'Actions',
            accessor: 'id',
            cell: (value: string) => (
                <div className="flex space-x-2">
                    <Link to={"/admin/invoices/1"} className="p-1 hover:text-blue-500">
                        <FileText className="h-5 w-5" />
                    </Link>
                    <button className="p-1 hover:text-blue-500">
                        <Download className="h-5 w-5" />
                    </button>
                </div>
            ),
        },
    ]
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">

                        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
                            <h1 className="text-2xl font-bold mb-6">Factures</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-800 rounded-lg p-6">
                                    <p className="text-sm text-gray-400">Total ce mois</p>
                                    <p className="text-2xl font-semibold mt-1">12,500 DT</p>
                                </div>
                                <div className="bg-gray-800 rounded-lg p-6">
                                    <p className="text-sm text-gray-400">En attente</p>
                                    <p className="text-2xl font-semibold mt-1">3,200 DT</p>
                                </div>
                                <div className="bg-gray-800 rounded-lg p-6">
                                    <p className="text-sm text-gray-400">Payées</p>
                                    <p className="text-2xl font-semibold mt-1">9,300 DT</p>
                                </div>
                            </div>
                            <AdminCard title="Factures Récentes">

                                <DataTable
                                    columns={columns}
                                    data={invoices}
                                    onRowClick={(row) => console.log('Clicked row:', row)}
                                />
                            </AdminCard>
                        </div>
                    </div>
                </main >
            </div>
        </div>
    )
}
