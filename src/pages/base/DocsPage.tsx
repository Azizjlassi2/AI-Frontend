import { CodeIcon, KeyIcon, ZapIcon } from "lucide-react";
export const DocsPage: React.FC = () => {
  return <div className="min-h-full bg-white">
    <div className="pt-20 pb-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          API Documentation
        </h1>
        <p className="text-xl text-gray-600">
          Intégrez facilement nos modèles d'IA dans vos applications
        </p>
      </div>
    </div>
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="mb-4">
              <CodeIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Intégration Simple</h3>
            <p className="text-gray-600">
              API RESTful intuitive avec des exemples de code dans plusieurs
              langages
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="mb-4">
              <KeyIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Sécurité Avancée</h3>
            <p className="text-gray-600">
              Authentication par API key et chiffrement des données
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="mb-4">
              <ZapIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Haute Performance</h3>
            <p className="text-gray-600">
              Temps de réponse optimisés et haute disponibilité
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>;
}