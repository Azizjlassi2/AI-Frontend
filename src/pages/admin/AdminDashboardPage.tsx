import { DashboardHeader } from '../../components/admin/DashboardHeader'
import { DashboardSidebar } from '../../components/admin/DashboardSidebar'
import { StatCards } from '../../components/admin/StatCards'
import { RevenueChart } from '../../components/admin/RevenueChart'
import { VisitorsChart } from '../../components/admin/VisitorsChart'
import { RecentModels } from '../../components/admin/RecentModels'
import { RecentDatasets } from '../../components/admin/RecentDatasets'
import { ModerationTable } from '../../components/admin/ModerationTable'
import { InvoicesTable } from '../../components/admin/InvoicesTable'
import { TopModelsChart } from '../../components/admin/TopModelsChart'
import { TopDatasetsChart } from '../../components/admin/TopDatasetsChart'
export function AdminDashboardPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-8xl mx-auto space-y-8">
                        {/* Stats Overview */}
                        <StatCards />
                        {/* Main Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <RevenueChart />
                                <VisitorsChart />
                            </div>
                            <div className="space-y-8">
                                <TopModelsChart />
                                <TopDatasetsChart />
                            </div>
                        </div>
                        {/* Recent Activity Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <RecentModels />
                            <RecentDatasets />
                        </div>
                        {/* Tables Section */}
                        <div className="grid grid-cols-1 gap-8">
                            <ModerationTable />
                            <InvoicesTable />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
