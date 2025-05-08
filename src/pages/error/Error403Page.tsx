import { Link } from 'react-router-dom'
import { ShieldIcon, LogInIcon } from 'lucide-react'
export function Error403Page() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full text-center">
                <div className="flex justify-center mb-4">
                    <ShieldIcon className="h-24 w-24 text-yellow-500" />
                </div>
                <h1 className="text-9xl font-bold text-yellow-500">403</h1>
                <p className="text-2xl font-semibold text-gray-900 mt-4">
                    Accès interdit
                </p>
                <p className="text-gray-600 mt-2">
                    Désolé, vous n'avez pas les permissions nécessaires pour accéder à
                    cette page.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-yellow-500 hover:bg-yellow-600"
                    >
                        <LogInIcon className="h-5 w-5 mr-2" />
                        Se connecter
                    </Link>
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
