import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Download, Calendar, Search, Filter, ArrowLeft, FileText, ExternalLink, Trash2, AlertTriangle, Info } from 'lucide-react';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';
interface PurchasedDataset {
    id: number;
    name: string;
    description: string;
    purchaseDate: string;
    expiryDate?: string;
    size: string;
    downloadCount: number;
    lastDownloaded?: string;
    price: number;
    currency: string;
    invoiceId: string;
}
export function ClientDatasetsPage() {
    const [datasets, setDatasets] = useState<PurchasedDataset[]>([]);
    const [filteredDatasets, setFilteredDatasets] = useState<PurchasedDataset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    useEffect(() => {
        const fetchDatasets = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 800));
                // Get purchased datasets from localStorage or create mock data
                let purchasedDatasets = JSON.parse(localStorage.getItem('purchasedDatasets') || '[]');
                // If no datasets exist in localStorage, create mock data
                if (purchasedDatasets.length === 0) {
                    purchasedDatasets = [{
                        id: 1,
                        name: 'Tunisian Dialect Corpus',
                        description: "Un large corpus de textes en dialecte tunisien pour l'entraînement de modèles NLP.",
                        purchaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                        size: '2.3GB',
                        downloadCount: 3,
                        lastDownloaded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                        price: 149.99,
                        currency: 'TND',
                        invoiceId: 'INV-DS-123456'
                    }, {
                        id: 2,
                        name: 'Tunisian News Articles',
                        description: "Collection d'articles de presse tunisienne annotés par thème et sentiment.",
                        purchaseDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                        size: '850MB',
                        downloadCount: 5,
                        lastDownloaded: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                        price: 99.99,
                        currency: 'TND',
                        invoiceId: 'INV-DS-123457'
                    }, {
                        id: 3,
                        name: 'Arabic Named Entity Recognition Dataset',
                        description: "Dataset pour la reconnaissance d'entités nommées en arabe standard et dialectal.",
                        purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                        expiryDate: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000).toISOString(),
                        size: '1.1GB',
                        downloadCount: 2,
                        lastDownloaded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                        price: 199.99,
                        currency: 'TND',
                        invoiceId: 'INV-DS-123458'
                    }];
                    localStorage.setItem('purchasedDatasets', JSON.stringify(purchasedDatasets));
                }
                setDatasets(purchasedDatasets);
                setFilteredDatasets(purchasedDatasets);
            } catch (err) {
                console.error('Error fetching datasets:', err);
                setError('Une erreur est survenue lors du chargement de vos datasets');
            } finally {
                setLoading(false);
            }
        };
        fetchDatasets();
    }, []);
    useEffect(() => {
        // Apply filters and sorting
        let result = [...datasets];
        // Apply search filter
        if (searchTerm) {
            result = result.filter(dataset => dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) || dataset.description.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // Apply sorting
        result.sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'asc' ? new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime() : new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
            } else if (sortBy === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (sortBy === 'size') {
                // Simple size comparison (not accurate for real file sizes)
                const sizeA = parseFloat(a.size.replace(/[^0-9.]/g, ''));
                const sizeB = parseFloat(b.size.replace(/[^0-9.]/g, ''));
                return sortOrder === 'asc' ? sizeA - sizeB : sizeB - sizeA;
            }
            return 0;
        });
        setFilteredDatasets(result);
    }, [datasets, searchTerm, sortBy, sortOrder]);
    const handleDownload = (datasetId: number) => {
        // In a real app, this would trigger a download
        alert(`Téléchargement du dataset ${datasetId}`);
        // Update download count
        setDatasets(datasets.map(dataset => {
            if (dataset.id === datasetId) {
                return {
                    ...dataset,
                    downloadCount: dataset.downloadCount + 1,
                    lastDownloaded: new Date().toISOString()
                };
            }
            return dataset;
        }));
    };
    const handleDeleteDataset = (datasetId: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce dataset de votre liste ? Vous ne pourrez plus y accéder après cette action.')) {
            const updatedDatasets = datasets.filter(dataset => dataset.id !== datasetId);
            setDatasets(updatedDatasets);
            localStorage.setItem('purchasedDatasets', JSON.stringify(updatedDatasets));
        }
    };
    const toggleSort = (field: 'date' | 'name' | 'size') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const formatFileSize = (size: string) => {
        return size;
    };
    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error) {
        return <div className="min-h-screen bg-gray-50 ">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex flex-col items-center justify-center py-12">
                        <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link to="/client/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Retour au tableau de bord
                        </Link>
                    </div>
                </div>
            </div>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 ">
        <UserDashboardHeader />
        <div className="flex">
            <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="mb-6">
                        <Link to="/client/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour au tableau de bord
                        </Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h1 className="text-2xl font-bold mb-6 flex items-center">
                            <Database className="h-6 w-6 text-blue-600 mr-2" />
                            Mes datasets
                        </h1>
                        {/* Filters and search */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                            <div className="w-full md:w-auto relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input type="text" placeholder="Rechercher un dataset..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={() => toggleSort('date')} className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button onClick={() => toggleSort('name')} className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Nom {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button onClick={() => toggleSort('size')} className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    <Database className="h-4 w-4 mr-2" />
                                    Taille {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                            </div>
                        </div>
                        {/* Datasets list */}
                        {filteredDatasets.length === 0 ? <div className="text-center py-12">
                            <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Aucun dataset trouvé
                            </h2>
                            <p className="text-gray-500 mb-6">
                                {searchTerm ? 'Aucun dataset ne correspond à votre recherche.' : "Vous n'avez pas encore acheté de datasets."}
                            </p>
                            <Link to="/datasets" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Explorer les datasets
                            </Link>
                        </div> : <div className="space-y-6">
                            {filteredDatasets.map(dataset => <div key={dataset.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start">
                                                <Database className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                                                <div>
                                                    <h2 className="text-lg font-semibold">
                                                        {dataset.name}
                                                    </h2>
                                                    <p className="text-gray-600 mb-2">
                                                        {dataset.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                                                        <div className="flex items-center">
                                                            <Calendar className="h-4 w-4 mr-1" />
                                                            Acheté le {formatDate(dataset.purchaseDate)}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Database className="h-4 w-4 mr-1" />
                                                            {formatFileSize(dataset.size)}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Download className="h-4 w-4 mr-1" />
                                                            {dataset.downloadCount} téléchargement
                                                            {dataset.downloadCount !== 1 ? 's' : ''}
                                                        </div>
                                                        {dataset.lastDownloaded && <div className="flex items-center">
                                                            <Calendar className="h-4 w-4 mr-1" />
                                                            Dernier téléchargement:{' '}
                                                            {formatDate(dataset.lastDownloaded)}
                                                        </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => handleDownload(dataset.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
                                                <Download className="h-4 w-4 mr-2" />
                                                Télécharger
                                            </button>
                                            <Link to={`/datasets/${dataset.id}`} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                Voir les détails
                                            </Link>
                                            <button onClick={() => handleDeleteDataset(dataset.id)} className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center justify-center">
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex flex-wrap justify-between items-center">
                                    <div className="flex items-center">
                                        <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                        <Link to={`/user/invoices/dataset/${dataset.invoiceId}`} className="text-blue-600 hover:text-blue-800">
                                            Facture: {dataset.invoiceId}
                                        </Link>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Prix: {dataset.price} {dataset.currency}
                                    </div>
                                </div>
                            </div>)}
                        </div>}
                    </div>
                    {/* Help section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-start">
                            <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                            <div>
                                <h2 className="text-lg font-medium mb-2">Besoin d'aide?</h2>
                                <p className="text-gray-600 mb-4">
                                    Si vous rencontrez des problèmes avec vos datasets ou si vous
                                    avez des questions, n'hésitez pas à contacter notre équipe de
                                    support.
                                </p>
                                <Link to="/contact" className="text-blue-600 hover:text-blue-800">
                                    Contacter le support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    </div>;
}