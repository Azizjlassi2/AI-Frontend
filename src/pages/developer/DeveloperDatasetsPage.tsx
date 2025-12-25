import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Search, Filter, Plus, Download, MoreVertical, Edit, Trash2, Eye, BarChart2, Globe, Lock, AlertTriangle, HardDrive, Check } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
import axios from 'axios';
import { useError } from '../../context/ErrorContext';
import { useAuth } from '../../context/AuthContext';
enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
enum DatasetFormat {
  CSV = 'CSV',
  JSON = 'JSON',
  XML = 'XML',
  PARQUET = 'PARQUET',
  IMAGES = 'IMAGES',
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
  MIXED = 'MIXED',
}
interface Dataset {
  id: number;
  name: string;
  description: string;
  version: string;
  visibility: Visibility;
  format: DatasetFormat;
  size: string;
  purchases: number;
  downloads: number;
  revenue: number;
  lastUpdated: string;
}
export function DeveloperDatasetsPage() {
  const [activeTab, setActiveTab] = useState('datasets');
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [datasetToDelete, setDatasetToDelete] = useState<Dataset | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { error, setError, clearError } = useError();
  const { token } = useAuth();

  const fetchDatasets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/datasets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      console.log('Fetched datasets:', data);

      const mappedDatasets: Dataset[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        version: item.version,
        visibility: item.visibility,
        format: item.format,
        size: item.size,
        status: item.status,
        purchases: item.purchases,
        downloads: item.downloads,
        revenue: item.revenue,
        lastUpdated: item.createdAt,
      }));
      setDatasets(mappedDatasets);
    } catch (error) {
      setError({
        type: "UNKNOWN",
        message: "Une erreur est survenue lors de la récupération des datasets.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const openDeleteModal = (dataset: Dataset) => {
    setDatasetToDelete(dataset);
    setIsDeleteModalOpen(true);
    setShowDropdown(null); // Close dropdown when opening modal
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDatasetToDelete(null);
  };

  const confirmDelete = () => {
    if (datasetToDelete) {
      const response = axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/datasets/${datasetToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
        .then(() => {
          setDatasets(datasets.filter((dataset) => dataset.id !== datasetToDelete.id));
          fetchDatasets();
          closeDeleteModal();
          setDeleteSuccess(true);
        })
        .catch((error) => {
          closeDeleteModal();
          console.error('Error deleting dataset:', error);
          setError({
            type: "UNKNOWN",
            message: "Une erreur est survenue lors de la suppression du dataset.",
          });
        }).finally(() => {
          setTimeout(() => setDeleteSuccess(false), 3000);
        });
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  const toggleDropdown = (datasetId: number | null) => {
    setShowDropdown(showDropdown === datasetId ? null : datasetId);
  };

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
    });
  };

  const getStatusBadgeClass = (status: string): string => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'UNDER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'PUBLISHED':
        return 'Publié';
      case 'DRAFT':
        return 'Brouillon';
      case 'UNDER_REVIEW':
        return 'En révision';
      case 'REJECTED':
        return 'Rejeté';
      default:
        return status;
    }
  };

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch =
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                <p className="text-green-700">Dataset supprimé avec succès</p>
              </div>
            )}

            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                Mes datasets
              </h1>
              <Link
                to="/developer/datasets/add"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un dataset
              </Link>
            </div>
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher des datasets..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    >
                      <Filter className="h-5 w-5 mr-2" />
                      {statusFilter ? getStatusLabel(statusFilter) : 'Tous les statuts'}
                    </button>
                    {showFilterDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            handleStatusFilterChange(null);
                            setShowFilterDropdown(false);
                          }}
                        >
                          Tous les statuts
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            handleStatusFilterChange('PUBLISHED');
                            setShowFilterDropdown(false);
                          }}
                        >
                          Publié
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            handleStatusFilterChange('DRAFT');
                            setShowFilterDropdown(false);
                          }}
                        >
                          Brouillon
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            handleStatusFilterChange('UNDER_REVIEW');
                            setShowFilterDropdown(false);
                          }}
                        >
                          En révision
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            handleStatusFilterChange('REJECTED');
                            setShowFilterDropdown(false);
                          }}
                        >
                          Rejeté
                        </button>
                      </div>
                    )}
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <Download className="h-5 w-5 mr-2" />
                    Exporter
                  </button>
                </div>
              </div>
            </div>
            {/* Datasets Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {isLoading ? (
                <div className="p-8 flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
                </div>
              ) : filteredDatasets.length === 0 ? (
                <div className="p-8 text-center">
                  <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun dataset trouvé
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchQuery
                      ? `Aucun résultat pour "${searchQuery}"`
                      : "Vous n'avez pas encore de datasets ou aucun dataset ne correspond aux filtres sélectionnés."}
                  </p>
                  <Link
                    to="/developer/datasets/add"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un dataset
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
                          Dataset
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Format
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Taille
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Achats
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Téléchargements
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
                          Mise à jour
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
                      {filteredDatasets.map((dataset) => (
                        <tr key={dataset.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                                <Database className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <Link
                                    to={`/developer/datasets/${dataset.id}`}
                                    className="text-sm font-medium text-gray-900 hover:text-green-600"
                                  >
                                    {dataset.name}
                                  </Link>
                                  {dataset.visibility === Visibility.PUBLIC ? (
                                    <Globe className="h-4 w-4 text-green-600 ml-2" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-red-400 ml-2" />
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {dataset.description.split(" ").slice(0, 10).join(" ") + " ..."}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dataset.format}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dataset.size}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatNumber(dataset.purchases)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatNumber(dataset.downloads)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(dataset.revenue)} TND
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(dataset.lastUpdated)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => toggleDropdown(dataset.id)}
                            >
                              <MoreVertical className="h-5 w-5" />
                            </button>
                            {showDropdown === dataset.id && (
                              <div
                                className="absolute right-10 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                                aria-orientation="vertical"
                              >
                                <Link
                                  to={`/developer/datasets/${dataset.id}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir les détails
                                </Link>
                                <Link
                                  to={`/developer/datasets/${dataset.id}/edit`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </Link>
                                <Link
                                  to={`/developer/datasets/${dataset.id}/analytics`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                  <BarChart2 className="h-4 w-4 mr-2" />
                                  Analyses
                                </Link>
                                <button
                                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                  onClick={() => openDeleteModal(dataset)}
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
            <div className="mt-6 bg-green-50 rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <HardDrive className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800 mb-1">
                    Optimisez vos datasets pour une meilleure visibilité
                  </h3>
                  <p className="text-green-700 mb-4">
                    Incluez des métadonnées détaillées, des exemples
                    d'utilisation et assurez-vous que vos datasets respectent
                    les normes de qualité pour maximiser leur adoption.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && datasetToDelete && (
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
                        Supprimer le dataset
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Êtes-vous sûr de vouloir supprimer le dataset{' '}
                          <span className="font-semibold">
                            {datasetToDelete.name}
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
  );
}