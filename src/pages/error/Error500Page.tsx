import { Link } from 'react-router-dom'
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react'
export function Error500Page() {
    const handleRefresh = () => {
        window.location.reload()
    }
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full text-center">
                <div className="flex justify-center mb-4">
                    <AlertTriangleIcon className="h-24 w-24 text-red-500" />
                </div>
                <h1 className="text-9xl font-bold text-red-500">500</h1>
                <p className="text-2xl font-semibold text-gray-900 mt-4">
                    Erreur serveur
                </p>
                <p className="text-gray-600 mt-2">
                    Désolé, une erreur inattendue s'est produite. Nos équipes ont été
                    notifiées et travaillent sur le problème.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleRefresh}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-red-500 hover:bg-red-600"
                    >
                        <RefreshCwIcon className="h-5 w-5 mr-2" />
                        Rafraîchir la page
                    </button>
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    )
}
