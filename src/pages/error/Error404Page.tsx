import { Link } from 'react-router-dom'
import { HomeIcon, SearchIcon } from 'lucide-react'
export function Error404Page() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full text-center">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>
                <p className="text-2xl font-semibold text-gray-900 mt-4">
                    Page introuvable
                </p>
                <p className="text-gray-600 mt-2">
                    Désolé, nous n'avons pas trouvé la page que vous recherchez.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <HomeIcon className="h-5 w-5 mr-2" />
                        Retour à l'accueil
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                    >
                        <SearchIcon className="h-5 w-5 mr-2" />
                        Nous contacter
                    </Link>
                </div>
            </div>
        </div>
    )
}
