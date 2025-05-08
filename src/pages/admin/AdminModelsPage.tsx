import { DashboardHeader } from '../../components/admin/DashboardHeader'
import { DashboardSidebar } from '../../components/admin/DashboardSidebar'
import {
    SearchIcon,
    FilterIcon,
    PlusCircle,
    Edit,
    Trash2,
    Eye,
    Bot,
} from 'lucide-react'
const models = [
    {
        id: 1,
        name: 'TunBERT-Large',
        creator: 'AI Lab Tunisia',
        category: 'NLP',
        status: 'published',
        downloads: '1.2K',
        rating: 4.5,
        lastUpdate: '2023-12-10',
    },
    {
        id: 2,
        name: 'MedVision-X',
        creator: 'CHU Tunis',
        category: 'Computer Vision',
        status: 'pending',
        downloads: '890',
        rating: 4.2,
        lastUpdate: '2023-12-09',
    },
    // ... autres modèles
]
export function AdminModelsPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold">Gestion des Modèles</h1>
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center">
                                <PlusCircle className="h-5 w-5 mr-2" />
                                Ajouter un modèle
                            </button>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6">
                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <div className="flex-1 relative">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un modèle..."
                                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                                    />
                                </div>
                                <button className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                                    <FilterIcon className="h-5 w-5 mr-2" />
                                    Filtres
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-left border-b border-gray-700">
                                            <th className="pb-3">Modèle</th>
                                            <th className="pb-3">Catégorie</th>
                                            <th className="pb-3">Status</th>
                                            <th className="pb-3">Téléchargements</th>
                                            <th className="pb-3">Note</th>
                                            <th className="pb-3">Dernière mise à jour</th>
                                            <th className="pb-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {models.map((model) => (
                                            <tr
                                                key={model.id}
                                                className="border-b border-gray-700 hover:bg-gray-750"
                                            >
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center mr-3">
                                                            <Bot className="h-5 w-5 text-blue-500" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{model.name}</div>
                                                            <div className="text-sm text-gray-400">
                                                                {model.creator}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">{model.category}</td>
                                                <td className="py-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${model.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                                                    >
                                                        {model.status}
                                                    </span>
                                                </td>
                                                <td className="py-4">{model.downloads}</td>
                                                <td className="py-4">{model.rating}/5</td>
                                                <td className="py-4">{model.lastUpdate}</td>
                                                <td className="py-4">
                                                    <div className="flex space-x-2">
                                                        <button className="p-1 hover:text-blue-400">
                                                            <Eye className="h-5 w-5" />
                                                        </button>
                                                        <button className="p-1 hover:text-yellow-400">
                                                            <Edit className="h-5 w-5" />
                                                        </button>
                                                        <button className="p-1 hover:text-red-400">
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
