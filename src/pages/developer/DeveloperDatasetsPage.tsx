import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Search, Filter, Plus, Download, MoreVertical, Edit, Trash2, Eye, BarChart2, Globe, Lock, AlertTriangle, HardDrive } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
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
  status: 'PUBLISHED' | 'DRAFT' | 'UNDER_REVIEW' | 'REJECTED';
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
  useEffect(() => {
    const fetchDatasets = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock data
        const mockDatasets: Dataset[] = [{
          id: 1,
          name: 'Tunisian Dialect Corpus',
          description: 'Corpus de textes en dialecte tunisien pour NLP',
          version: '2.3.0',
          visibility: Visibility.PUBLIC,
          format: DatasetFormat.JSON,
          size: '2.3GB',
          status: 'PUBLISHED',
          purchases: 450,
          downloads: 2350,
          revenue: 6750.25,
          lastUpdated: '2023-12-15'
        }, {
          id: 2,
          name: 'Medical Images 2024',
          description: 'Images médicales annotées de patients tunisiens',
          version: '1.0.1',
          visibility: Visibility.PUBLIC,
          format: DatasetFormat.IMAGES,
          size: '15GB',
          status: 'PUBLISHED',
          purchases: 320,
          downloads: 1850,
          revenue: 4800.5,
          lastUpdated: '2024-01-10'
        }, {
          id: 3,
          name: 'StreetViews Tunis',
          description: 'Images de rues de Tunis pour la vision par ordinateur',
          version: '1.2.0',
          visibility: Visibility.PUBLIC,
          format: DatasetFormat.IMAGES,
          size: '8.7GB',
          status: 'PUBLISHED',
          purchases: 180,
          downloads: 950,
          revenue: 2700.0,
          lastUpdated: '2023-11-20'
        }, {
          id: 4,
          name: 'Tunisian Agricultural Drone Imagery',
          description: 'Images aériennes de cultures tunisiennes',
          version: '1.1.0',
          visibility: Visibility.PUBLIC,
          format: DatasetFormat.IMAGES,
          size: '32GB',
          status: 'PUBLISHED',
          purchases: 120,
          downloads: 580,
          revenue: 1800.75,
          lastUpdated: '2023-12-05'
        }, {
          id: 5,
          name: 'Tunisian Speech Commands',
          description: 'Enregistrements vocaux de commandes en dialecte tunisien',
          version: '0.9.0',
          visibility: Visibility.PUBLIC,
          format: DatasetFormat.AUDIO,
          size: '8.2GB',
          status: 'UNDER_REVIEW',
          purchases: 85,
          downloads: 420,
          revenue: 1275.0,
          lastUpdated: '2024-01-18'
        }, {
          id: 6,
          name: 'Tunisian Financial News',
          description: 'Articles financiers tunisiens annotés',
          version: '0.7.0',
          visibility: Visibility.PRIVATE,
          format: DatasetFormat.TEXT,
          size: '1.2GB',
          status: 'DRAFT',
          purchases: 0,
          downloads: 15,
          revenue: 0,
          lastUpdated: '2024-01-20'
        }];
        setDatasets(mockDatasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDatasets();
  }, []);
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
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) || dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || dataset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  return <div className="min-h-screen bg-gray-50">
    <DeveloperDashboardHeader />
    <div className="flex">
      <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Mes datasets
            </h1>
            <Link to="/developer/datasets/add" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un dataset
            </Link>
          </div>
          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="text" placeholder="Rechercher des datasets..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={searchQuery} onChange={handleSearchChange} />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50" onClick={() => setStatusFilter(null)}>
                    <Filter className="h-5 w-5 mr-2" />
                    {statusFilter ? getStatusLabel(statusFilter) : 'Tous les statuts'}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(null)}>
                      Tous les statuts
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange('PUBLISHED')}>
                      Publié
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange('DRAFT')}>
                      Brouillon
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange('UNDER_REVIEW')}>
                      En révision
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange('REJECTED')}>
                      Rejeté
                    </button>
                  </div>
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
            {isLoading ? <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
            </div> : filteredDatasets.length === 0 ? <div className="p-8 text-center">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun dataset trouvé
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? `Aucun résultat pour "${searchQuery}"` : "Vous n'avez pas encore de datasets ou aucun dataset ne correspond aux filtres sélectionnés."}
              </p>
              <Link to="/developer/datasets/add" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un dataset
              </Link>
            </div> : <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dataset
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Taille
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Achats
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Téléchargements
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenus
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mise à jour
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDatasets.map(dataset => <tr key={dataset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                          <Database className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <Link to={`/developer/datasets/${dataset.id}`} className="text-sm font-medium text-gray-900 hover:text-green-600">
                              {dataset.name}
                            </Link>
                            {dataset.visibility === Visibility.PUBLIC ? <Globe className="h-4 w-4 text-green-600 ml-2" /> : <Lock className="h-4 w-4 text-gray-400 ml-2" />}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {dataset.description}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(dataset.status)}`}>
                        {getStatusLabel(dataset.status)}
                      </span>
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
                      <button className="text-gray-400 hover:text-gray-600" onClick={() => toggleDropdown(dataset.id)}>
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {showDropdown === dataset.id && <div className="absolute right-6 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <Link to={`/developer/datasets/${dataset.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir les détails
                        </Link>
                        <Link to={`/developer/datasets/${dataset.id}/edit`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Link>
                        <Link to={`/developer/datasets/${dataset.id}/analytics`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2" />
                          Analyses
                        </Link>
                        <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </button>
                      </div>}
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>}
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
                <div className="flex flex-wrap gap-3">
                  <Link to="/developer/documentation/dataset-guidelines" className="inline-flex items-center px-4 py-2 bg-white border border-green-300 rounded-lg text-green-700 hover:bg-green-50">
                    Guide des datasets
                  </Link>
                  <Link to="/developer/datasets/storage" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Gérer le stockage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>;
}