import { AdminCard } from '../../components/admin/AdminCard'
import { BarChart, LineChart } from 'lucide-react'
import { DashboardHeader } from '../../components/admin/DashboardHeader'
import { DashboardSidebar } from '../../components/admin/DashboardSidebar'
export function AdminAnalyticsPage() {
    const mockStats = {
        visitorsToday: 1234,
        visitorsYesterday: 1156,
        activeUsers: 456,
        avgSessionTime: '8m 45s',
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="min-h-screen bg-gray-900 text-gray-100 p-8">
                    <h1 className="text-2xl font-bold mb-6">Analytics</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Visiteurs Aujourd'hui</p>
                                    <p className="text-2xl font-semibold mt-1">
                                        {mockStats.visitorsToday}
                                    </p>
                                    <p className="text-sm text-green-500">
                                        +
                                        {(
                                            ((mockStats.visitorsToday - mockStats.visitorsYesterday) /
                                                mockStats.visitorsYesterday) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </p>
                                </div>
                                <LineChart className="h-12 w-12 text-blue-500" />
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">Utilisateurs Actifs</p>
                                    <p className="text-2xl font-semibold mt-1">
                                        {mockStats.activeUsers}
                                    </p>
                                </div>
                                <BarChart className="h-12 w-12 text-blue-500" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AdminCard title="Trafic sur 30 Jours">
                            <div className="h-80 flex items-center justify-center">
                                <p className="text-gray-400">Graphique du trafic à venir</p>
                            </div>
                        </AdminCard>
                        <AdminCard title="Sources de Trafic">
                            <div className="h-80 flex items-center justify-center">
                                <p className="text-gray-400">Graphique des sources à venir</p>
                            </div>
                        </AdminCard>
                    </div>
                </main>
            </div>
        </div>
    )

}
