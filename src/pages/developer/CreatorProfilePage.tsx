import axios from 'axios'
import {
  MapPin,
  Calendar,

  ExternalLink,
  Database,
  Bot,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
interface Model {
  framework: string
  id: string
  name: string
  description: string
  tags: string[]
  stars: number
  used: number
}
interface Dataset {
  id: string
  name: string
  description: string
  tags: string[]
  downloads: number
  size: string
  type: string
}
export function CreatorProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [creator, setCreator] = useState<any>(null)



  useEffect(() => {
    if (!id) return

    axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/users/${id}`)
      .then(res => {
        const data = res.data.data
        console.log(data)
        setCreator({
          name: data.username,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.username}`,
          bio: data.account.bio || 'No bio available',
          location: data.account.address || 'Unknown location',
          website: data.account.website,
          joinedDate: new Date(data.createdAt).toLocaleDateString(),
          stats: {
            models: (data.account.models || []).length,
            datasets: (data.account.datasets || []).length,
            totalUsed: data.totalUsed ?? 0,
            totalDownloads: data.totalDownloads ?? 0
          },

          models: data.account?.models || [],
          datasets: data.account?.datasets || []
        })
      })
      .catch(error => {
        console.error('Error fetching creator data:', error)
      })
  }, [id])
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with creator info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={creator?.avatar}
              alt={creator?.name}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold">{creator?.name}</h1>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {creator?.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Membre depuis {creator?.joinedDate}
                </div>
                {creator?.website && (
                  <a
                    href={creator?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:underline"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Site web
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Creator description and stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold mb-4">À propos</h2>
              <p className="text-gray-600">{creator?.bio}</p>
            </div>
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold text-blue-700">
                    {creator?.stats?.models}
                  </span>
                  <span className="text-sm text-gray-600">Modèles</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold text-blue-700">
                    {creator?.stats?.datasets}
                  </span>
                  <span className="text-sm text-gray-600">Datasets</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold text-blue-700">
                    {creator?.stats?.totalUsed}
                  </span>
                  <span className="text-sm text-gray-600">Utilisations</span>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <span className="block text-2xl font-bold text-blue-700">
                    {creator?.stats?.totalDownloads}
                  </span>
                  <span className="text-sm text-gray-600">Téléchargements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Models section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Bot className="h-6 w-6 text-blue-600 mr-2" />
            Modèles publiés
          </h2>

          {Array.isArray(creator?.models) && creator?.models?.length > 0 ? (
            creator?.models?.map((model: Model) => (
              <Link
                key={model.id}
                to={`/models/${model.id}`}
                className="block p-6 mb-4 border border-gray-200 rounded-xl hover:shadow-lg transition"
              >

                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-between">
                  {model.name}
                  <Bot className="h-6 w-6 text-blue-600 ml-2" />
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {model.description || 'Pas de description disponible'}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{model.framework || 'Framework inconnu'}</span>
                  <span>
                    {model.used ?? 0} Utilisations
                    {model.used && model.used > 1 ? 's' : ''}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 bg-gray-50 rounded-xl text-center text-gray-500 border border-dashed">
              Aucun modèle publié par ce créateur.
            </div>
          )}
        </div>

        {/* Datasets section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Database className="h-6 w-6 text-green-600 mr-2" />
            Datasets publiés
          </h2>


          {Array.isArray(creator?.datasets) && creator.datasets.length > 0 ? (
            creator.datasets.map((dataset: Dataset) => (
              <Link
                key={dataset.id}
                to={`/datasets/${dataset.id}`}
                className="block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition"
              >
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {dataset.name}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {dataset.description || 'Pas de description disponible'}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span>{dataset.size ? `${dataset.size} Mo` : 'Taille inconnue'}</span>
                  <span>
                    {dataset.downloads ?? 0} téléchargement
                    {dataset.downloads && dataset.downloads > 1 ? 's' : ''}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 bg-gray-50 rounded-xl text-center text-gray-500 border border-dashed">
              Aucun dataset trouvé pour ce créateur.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

