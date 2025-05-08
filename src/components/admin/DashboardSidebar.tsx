import React from 'react'
import { Link } from 'react-router-dom'
import {
    HomeIcon,
    UsersIcon,
    BoxIcon,
    DatabaseIcon,
    BarChart2Icon,
    SettingsIcon,
    HeadphonesIcon,
    FlagIcon,
    FileTextIcon,
} from 'lucide-react'
export function DashboardSidebar() {
    return (
        <aside className="w-64 bg-gray-800 min-h-screen">
            <nav className="p-4 space-y-2">
                <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <HomeIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                </Link>
                <Link
                    to="/admin/analytics"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <BarChart2Icon className="h-5 w-5" />
                    <span>Analytics</span>
                </Link>
                <Link
                    to="/admin/users"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <UsersIcon className="h-5 w-5" />
                    <span>Utilisateurs</span>
                </Link>
                <Link
                    to="/admin/models"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <BoxIcon className="h-5 w-5" />
                    <span>Modèles</span>
                </Link>
                <Link
                    to="/admin/datasets"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <DatabaseIcon className="h-5 w-5" />
                    <span>Datasets</span>
                </Link>
                <Link
                    to="/admin/invoices"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <FileTextIcon className="h-5 w-5" />
                    <span>Factures</span>
                </Link>
                <Link
                    to="/admin/reports"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <FlagIcon className="h-5 w-5" />
                    <span>Signalements</span>
                </Link>
                <Link
                    to="/admin/support"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <HeadphonesIcon className="h-5 w-5" />
                    <span>Support</span>
                </Link>
                <Link
                    to="/admin/settings"
                    className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
                >
                    <SettingsIcon className="h-5 w-5" />
                    <span>Paramètres</span>
                </Link>
            </nav>
        </aside>
    )
}
