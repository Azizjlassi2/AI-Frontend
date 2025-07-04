import { Link } from 'react-router-dom'
import { ConstructionIcon, ClockIcon } from 'lucide-react'

export function UnderMaintenancePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full text-center">
                <div className="flex justify-center mb-4">
                    <ConstructionIcon className="h-24 w-24 text-indigo-500" />
                </div>
                <h1 className="text-6xl sm:text-9xl font-bold text-indigo-500">🚧</h1>
                <p className="text-2xl font-semibold text-gray-900 mt-4">
                    Page en maintenance
                </p>
                <p className="text-gray-600 mt-2">
                    Cette page est actuellement en cours de construction ou de maintenance.
                    Nous vous prions de revenir plus tard.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-500 hover:bg-indigo-600"
                    >
                        <ClockIcon className="h-5 w-5 mr-2" />
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    )
}
