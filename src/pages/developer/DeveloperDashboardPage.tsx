import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Users, Database, DollarSign, TrendingUp, AlertCircle, Download, ArrowUpRight, ArrowDownRight, Star, MessageSquare, Share2, Bot, AlertTriangle } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
import { DeveloperStatCards } from '../../components/developer-dashboard/DeveloperStatCards';
import { DeveloperRevenueChart } from '../../components/developer-dashboard/DeveloperRevenueChart';
import { DeveloperTopModelsTable } from '../../components/developer-dashboard/DeveloperTopModelsTable';
import { DeveloperTopDatasetsTable } from '../../components/developer-dashboard/DeveloperTopDatasetsTable';
import { DeveloperRecentReviewsWidget } from '../../components/developer-dashboard/DeveloperRecentReviewsWidget';
import { DeveloperActivityFeed } from '../../components/developer-dashboard/DeveloperActivityFeed';
import { useAuth } from '../../context/AuthContext';
import { DeveloperAccount } from '../../types/auth';



interface DeveloperStats {

    totalModels: number;
    totalDatasets: number;
    totalUsers: number;
    totalRevenue: number;
    currency: string;
    modelUsage: number;
    modelUsageTrend: number;
    datasetDownloads: number;
    datasetDownloadsTrend: number;
}
interface Activity {
    id: number;
    type: 'MODEL_USAGE' | 'DATASET_DOWNLOAD' | 'SUBSCRIPTION' | 'REVIEW' | 'PAYMENT';
    title: string;
    description: string;
    date: string;
    metadata?: {
        modelId?: number;
        modelName?: string;
        datasetId?: number;
        datasetName?: string;
        userId?: number;
        userName?: string;
        amount?: number;
        currency?: string;
    };
}
interface Review {
    id: number;
    resourceType: 'MODEL' | 'DATASET';
    resourceId: number;
    resourceName: string;
    userName: string;
    userAvatar: string;
    rating: number;
    comment: string;
    date: string;
}
export function DeveloperDashboardPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
    const { username, account } = useAuth()
    const developer_account = account as DeveloperAccount;

    const [stats, setStats] = useState<DeveloperStats>({
        totalModels: developer_account?.models?.length || 0,
        totalDatasets: developer_account?.datasets?.length || 0,
        totalUsers: 0,
        totalRevenue: 0,
        currency: 'TND',
        modelUsage: 0,
        modelUsageTrend: 0,
        datasetDownloads: 0,
        datasetDownloadsTrend: 0
    });


    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockActivities: Activity[] = [{
                    id: 1,
                    type: 'MODEL_USAGE',
                    title: "Pic d'utilisation de modèle",
                    description: "ArabicBERT a connu un pic d'utilisation de 5000 appels API",
                    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    metadata: {
                        modelId: 1,
                        modelName: 'ArabicBERT'
                    }
                }, {
                    id: 2,
                    type: 'SUBSCRIPTION',
                    title: 'Nouvel abonnement',
                    description: "Un utilisateur s'est abonné au plan Pro pour TunBERT",
                    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                    metadata: {
                        modelId: 2,
                        modelName: 'TunBERT',
                        userId: 123,
                        userName: 'Ahmed Ben Ali'
                    }
                }, {
                    id: 3,
                    type: 'DATASET_DOWNLOAD',
                    title: 'Téléchargement de dataset',
                    description: 'Tunisian Dialect Corpus a été téléchargé',
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    metadata: {
                        datasetId: 1,
                        datasetName: 'Tunisian Dialect Corpus',
                        userId: 124,
                        userName: 'Sarra Mejri'
                    }
                }, {
                    id: 4,
                    type: 'PAYMENT',
                    title: 'Paiement reçu',
                    description: 'Paiement mensuel reçu pour les abonnements',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    metadata: {
                        amount: 1250.75,
                        currency: 'TND'
                    }
                }, {
                    id: 5,
                    type: 'REVIEW',
                    title: 'Nouvelle évaluation',
                    description: 'ArabicBERT a reçu une évaluation 5 étoiles',
                    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                    metadata: {
                        modelId: 1,
                        modelName: 'ArabicBERT',
                        userId: 125,
                        userName: 'Karim Malouli'
                    }
                }];
                const mockReviews: Review[] = [{
                    id: 1,
                    resourceType: 'MODEL',
                    resourceId: 1,
                    resourceName: 'ArabicBERT',
                    userName: 'Karim Malouli',
                    userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=KM',
                    rating: 5,
                    comment: "Excellent modèle pour l'analyse de sentiments en arabe. Les résultats sont très précis, même avec le dialecte tunisien.",
                    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
                }, {
                    id: 2,
                    resourceType: 'DATASET',
                    resourceId: 1,
                    resourceName: 'Tunisian Dialect Corpus',
                    userName: 'Sarra Mejri',
                    userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SM',
                    rating: 4,
                    comment: "Dataset très complet avec une bonne diversité régionale. J'aurais aimé plus d'annotations sémantiques.",
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
                }, {
                    id: 3,
                    resourceType: 'MODEL',
                    resourceId: 2,
                    resourceName: 'TunBERT',
                    userName: 'Ahmed Ben Ali',
                    userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ABA',
                    rating: 5,
                    comment: "Performance impressionnante sur les tâches de classification. L'intégration API est simple et bien documentée.",
                    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
                }];

                setActivities(mockActivities);
                setReviews(mockReviews);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Une erreur est survenue lors du chargement des données du tableau de bord.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, [dateRange]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    const handleDateRangeChange = (range: '7d' | '30d' | '90d' | 'all') => {
        setDateRange(range);
    };
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !stats) {
        return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h1>
            <p className="text-gray-600 mb-6">
                {error || 'Impossible de charger les données du tableau de bord.'}
            </p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Réessayer
            </button>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50">
        <DeveloperDashboardHeader />
        <div className="flex">
            <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto max-w-7xl">
                    {!developer_account?.docker_username && !developer_account?.docker_pat && (
                        <div
                            role="alert"
                            aria-live="polite"
                            className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 shadow-sm"
                        >
                            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-red-700 text-sm leading-5">
                                    Pour commencer à partager vos modèles, datasets et autres ressources avec la communauté, configurez votre intégration Docker Hub. Vous pouvez le faire dans vos{' '}
                                    <Link
                                        to="/developer/settings"
                                        className="font-medium text-red-600 hover:text-red-700 underline"
                                    >
                                        Paramètres
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                            Tableau de bord développeur
                        </h1>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center bg-white rounded-md border border-gray-200 shadow-sm">
                                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '7d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('7d')}>
                                    7 jours
                                </button>
                                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '30d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('30d')}>
                                    30 jours
                                </button>
                                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '90d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('90d')}>
                                    90 jours
                                </button>
                                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('all')}>
                                    Tout
                                </button>
                            </div>
                            <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 flex items-center">
                                <Download className="h-4 w-4 mr-1.5" />
                                Exporter
                            </button>
                        </div>
                    </div>
                    {/* Stats Overview */}
                    <DeveloperStatCards stats={stats} />
                    {/* Revenue Chart */}
                    <div className="mb-6">
                        <DeveloperRevenueChart dateRange={dateRange} />
                    </div>
                    {/* Top Models and Datasets */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <DeveloperTopModelsTable />
                        <DeveloperTopDatasetsTable />
                    </div>
                    {/* Reviews and Activity Feed */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <DeveloperRecentReviewsWidget reviews={reviews} />
                        <DeveloperActivityFeed activities={activities} />
                    </div>
                    {/* Quick Actions */}
                    <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Link to="/developer/models/add" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center text-center transition-colors">
                                <Bot className="h-8 w-8 text-blue-600 mb-2" />
                                <span className="font-medium text-blue-800">
                                    Ajouter un modèle
                                </span>
                            </Link>
                            <Link to="/developer/datasets/add" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center text-center transition-colors">
                                <Database className="h-8 w-8 text-green-600 mb-2" />
                                <span className="font-medium text-green-800">
                                    Ajouter un dataset
                                </span>
                            </Link>
                            <Link to="/developer/analytics" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center text-center transition-colors">
                                <BarChart2 className="h-8 w-8 text-purple-600 mb-2" />
                                <span className="font-medium text-purple-800">
                                    Voir les analyses
                                </span>
                            </Link>
                            <Link to="/developer/payments" className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg flex flex-col items-center text-center transition-colors">
                                <DollarSign className="h-8 w-8 text-yellow-600 mb-2" />
                                <span className="font-medium text-yellow-800">
                                    Gérer les paiements
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>;
}