import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Download, MoreVertical, Edit, Trash2, Eye, BarChart2, Globe, Lock, AlertTriangle, Bot, Check } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
import axios from 'axios';
import { useError } from '../../context/ErrorContext';
import { useAuth } from '../../context/AuthContext';
enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
interface Model {
  id: number;
  name: string;
  description: string;
  visibility: Visibility;
  status: "PUBLIC" | "PRIVATE";
  users: number;
  apiCalls: number;
  revenue: number;
  lastUpdated: string;
}

export function DeveloperModelsPage() {
  const [activeTab, setActiveTab] = useState('models')
  const [models, setModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState<number | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [modelToDelete, setModelToDelete] = useState<Model | null>(null)
  const { error, setError, clearError } = useError();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { token } = useAuth();

  const fetchModels = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/models`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = response.data.data;

      const mockModels: Model[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        visibility: item.visibility,
        status: item.status,
        users: item.users,
        apiCalls: item.apiCalls,
        revenue: item.revenue,
        lastUpdated: item.createdAt,
      }))
      setModels(mockModels)
    } catch (error) {
      setError({
        type: "UNKNOWN",
        message: "Une erreur est survenue lors de la récupération des modèles.",
      })
    } finally {
      setIsLoading(false)
    }
  }



  useEffect(() => {
    fetchModels()
  }, [])


  const openDeleteModal = (model: Model) => {
    setModelToDelete(model)
    setIsDeleteModalOpen(true)
    setShowDropdown(null) // Close dropdown when opening modal
  }
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setModelToDelete(null)
  }
  const confirmDelete = () => {
    if (modelToDelete) {
      const response = axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/models/${modelToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      })
        .then(() => {
          setModels(models.filter((model) => model.id !== modelToDelete.id))
          fetchModels()
          closeDeleteModal()
          setDeleteSuccess(true);
        })
        .catch((error) => {
          closeDeleteModal()
          console.error('Error deleting model:', error)
          return setError({
            type: "UNKNOWN",
            message: "Une erreur est survenue lors de la suppression du modèle.",

          })
        }).finally(() => {
          setTimeout(() => setDeleteSuccess(false), 3000);
        });
    }
  }
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status)
  }
  const toggleDropdown = (modelId: number | null) => {
    setShowDropdown(showDropdown === modelId ? null : modelId)
  }
  const formatNumber = (num?: number | null): string => {
    if (num == null) return '0';
    return num.toString();
  };

  const formatCurrency = (amount?: number | null): string => {
    if (amount == null) return '0,00';
    return amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || model.status === statusFilter
    return matchesSearch && matchesStatus
  })
  return (
    <div className="min-h-screen bg-gray-50">
      <DeveloperDashboardHeader />
      <div className="flex">
        <DeveloperDashboardSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-7xl">
            {deleteSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3" />
                <p className="text-green-700">Modèle supprimé avec succès</p>
              </div>
            )}

            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                Mes modèles
              </h1>
              <Link
                to="/developer/models/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un modèle
              </Link>
            </div>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher des modèles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

              </div>
            </div>
            {/* Models Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {isLoading ? (
                <div className="p-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredModels.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun modèle trouvé
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? `Aucun résultat pour "${searchQuery}"`
                      : "Vous n'avez pas encore de modèles ou aucun modèle ne correspond aux filtres sélectionnés."}
                  </p>
                  <Link
                    to="/developer/models/add"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un modèle
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Modèle
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Utilisateurs
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Appels API
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Revenus
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date Publication
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredModels.map((model) => (
                        <tr key={model.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                <Bot className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <Link
                                    to={`/developer/models/${model.id}`}
                                    className="text-sm font-medium text-gray-900 hover:text-blue-600"
                                  >
                                    {model.name}
                                  </Link>
                                  {model.visibility == Visibility.PUBLIC ? (
                                    <Globe className="h-4 w-4 text-green-600 ml-2" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-red-400 ml-2" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {model.description.split(" ").slice(0, 10).join(" ") + " ..."}
                                </p>
                              </div>
                            </div>
                          </td>


                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatNumber(model.users)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatNumber(model.apiCalls)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(model.revenue)} TND
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(model.lastUpdated)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => toggleDropdown(model.id)}
                            >
                              <MoreVertical className="h-5 w-5" />
                            </button>
                            {showDropdown === model.id && (
                              <div aria-orientation="vertical"
                                className="absolute right-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                <Link
                                  to={`/developer/models/${model.id}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir les détails
                                </Link>
                                <Link
                                  to={`/developer/models/${model.id}/update`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </Link>
                                <Link
                                  to={`/developer/models/${model.id}/analytics`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <BarChart2 className="h-4 w-4 mr-2" />
                                  Analyses
                                </Link>
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                  onClick={() => openDeleteModal(model)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Supprimer
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {/* Help Box */}
            <div className="mt-6 bg-blue-50 rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">
                    Conseils pour optimiser vos modèles
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Assurez-vous que vos modèles disposent d'une documentation
                    complète, d'exemples d'utilisation et de plans tarifaires
                    adaptés pour maximiser leur adoption.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && modelToDelete && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeDeleteModal}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        Supprimer le modèle
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Êtes-vous sûr de vouloir supprimer le modèle{' '}
                          <span className="font-semibold">
                            {modelToDelete.name}
                          </span>{' '}
                          ? Cette action est irréversible et supprimera toutes les
                          données associées, y compris les statistiques
                          d'utilisation et les revenus générés.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={confirmDelete}
                  >
                    Supprimer
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeDeleteModal}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
