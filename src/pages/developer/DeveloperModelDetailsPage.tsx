import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader'
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar'
import {
    ArrowUpRight,
    ArrowDownRight,
    Edit,
    Trash2,

    Users,
    Tag,
    Globe,
    Lock,
    Server,
    Code,
    Database,
    Calendar,
    Cpu,
    DollarSign,
    AlertTriangle,

    ExternalLink,
    Terminal,
    User,
} from 'lucide-react'
import axios from 'axios'
import { useError } from '../../context/ErrorContext'
import { BillingPeriod, Visibility } from '../../types/shared'

interface SubscriptionPlan {
    id: number
    name: string
    description: string
    price: number
    currency: string
    billingPeriod: BillingPeriod
    features: string[]
    apiCallsLimit?: number
    subscribersCount: number
    revenue: number
}
interface ModelTask {
    id: number
    name: string
}
interface ModelEndpoint {
    method: string
    path: string
    description: string
    requestBody: string
    successResponse: string
    errorResponse: string
    callsCount: number
    avgResponseTime: string
    errorRate: number
}
interface ModelPerformance {
    accuracy: string
    f1Score: string
    precision: string
    recall: string
}
interface UsageStats {
    totalCalls: number
    callsTrend: number
    uniqueUsers: number
    usersTrend: number
    averageResponseTime: string
    responseTimeTrend: number
    errorRate: number
    errorRateTrend: number
}
interface RevenueStats {
    totalRevenue: number
    revenueTrend: number
    subscriptions: number
    subscriptionsTrend: number
    averageRevenuePerUser: number
    arpuTrend: number
}
interface Model {
    id: number
    name: string
    description: string
    visibility: Visibility
    status: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    tasks: ModelTask[]
    endpoints: ModelEndpoint[]
    performance: ModelPerformance
    image: string
    framework: string
    architecture: string
    trainingDataset: string
    subscriptionPlans: SubscriptionPlan[]
    usage: UsageStats
    revenue: RevenueStats
}
export function DeveloperModelDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [activeTab, setActiveTab] = useState('models')
    const [model, setModel] = useState<Model | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedTab, setSelectedTab] = useState<
        'overview' | 'usage' | 'subscribers' | 'endpoints' | 'settings'
    >('overview')
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>(
        '30d',
    )
    const { error, setError } = useError();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [modelToDelete, setModelToDelete] = useState<Model | null>(null)
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchModel = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/models/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                })
                const data = response.data.data;

                // Mock model data
                const mockModel: Model = {
                    id: parseInt(data.id),
                    name: data.name,
                    description: data.description,
                    visibility: data.visibility,
                    status: data.status,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    publishedAt: data.createdAt,
                    tasks: [ // check the length first
                        ...(data.tasks.length > 0 ? (
                            data.tasks.map((task: any) => ({
                                id: task.id,
                                name: task.name,
                            }))
                        ) : (
                            [{ id: 0, name: "Aucune tâche disponible" }]
                        )),
                    ],
                    endpoints:
                        data.endpoints.length === 0 ? [] :

                            data.endpoints.map((endpoint: any) => ({
                                id: endpoint.id,
                                name: endpoint.name,
                                description: endpoint.description,
                                method: endpoint.method,
                                path: endpoint.path,
                                requestBody: endpoint.requestBody,
                                successResponse: endpoint.successResponse,
                                errorResponse: endpoint.errorResponse,
                                callsCount: endpoint.callsCount ?? 0,
                                avgResponseTime: endpoint.avgResponseTime ?? "N/A",
                                errorRate: endpoint.errorRate ?? "N/A",
                            })),

                    performance: {
                        accuracy: data.performance.accuracyScore ?? null,
                        f1Score: data.performance.f1Score ?? null,
                        precision: data.performance.precisionScore ?? null,
                        recall: data.performance.recallScore ?? null,
                    },
                    image: data.image ?? null,
                    framework: data.framework ?? null,
                    architecture: data.architecture ?? null,
                    trainingDataset: data.trainingDataset ?? null,
                    subscriptionPlans:
                        data.subscriptionPlans.length === 0
                            ? []
                            : data.subscriptionPlans.map((plan: any) => ({
                                id: plan.id,
                                name: plan.name,
                                description: plan.description,
                                price: plan.price,
                                currency: plan.currency,
                                billingPeriod: plan.billingPeriod,
                                features: plan.features,
                                apiCallsLimit: plan.apiCallsLimit,
                                subscribersCount: plan.subscribersCount,
                                revenue: plan.revenue,
                            })),

                    usage: {
                        totalCalls: data?.usage?.totalCalls ?? 0,
                        callsTrend: data?.usage?.callsTrend ?? 0,
                        uniqueUsers: data?.usage?.uniqueUsers ?? 0,
                        usersTrend: data?.usage?.usersTrend ?? 0,
                        averageResponseTime: data?.usage?.averageResponseTime ?? '0ms',
                        responseTimeTrend: data?.usage?.responseTimeTrend ?? 0,
                        errorRate: data?.usage?.errorRate ?? 0,
                        errorRateTrend: data?.usage?.errorRateTrend ?? 0,
                    },
                    revenue: {
                        totalRevenue: data?.revenue?.totalRevenue ?? 0,
                        revenueTrend: data?.revenue?.revenueTrend ?? 0,
                        subscriptions: data?.revenue?.subscriptions ?? 0,
                        subscriptionsTrend: data?.revenue?.subscriptionsTrend ?? 0,
                        averageRevenuePerUser: data?.revenue?.averageRevenuePerUser ?? 0,
                        arpuTrend: data?.revenue?.arpuTrend ?? 0,
                    },
                }
                setModel(mockModel)
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 404) {
                        return setError({
                            type: "NOT_FOUND",
                            message: 'Modèle non trouvé'
                        })
                    }
                }
                setError({
                    type: "SERVER",
                    message: 'Une erreur est survenue lors du chargement des données du modèle'
                })
            } finally {
                setIsLoading(false)

            }
        }
        fetchModel()
    }, [id])

    const openDeleteModal = (model: Model) => {
        setModelToDelete(model)
        setIsDeleteModalOpen(true)
    }
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false)
        setModelToDelete(null)
    }
    const confirmDelete = () => {
        if (modelToDelete) {
            const response = axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/models/${modelToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },

            })
                .then(() => {
                    closeDeleteModal()
                    setDeleteSuccess(true);
                    navigate('/developer/models');
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
    const formatNumber = (num?: number): string => {
        return (num ?? 0).toLocaleString('fr-FR')
    }
    const formatCurrency = (amount?: number): string => {
        const val = amount ?? 0;
        return val.toLocaleString('fr-FR', { style: 'currency', currency: 'TND' });
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }
    const formatJson = (json: string): string => {
        try {
            return JSON.stringify(JSON.parse(json), null, 2)
        } catch (e) {
            return json
        }
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }
    if (error || !model) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h1>
                <p className="text-gray-600 mb-6">
                    {error?.message || 'Impossible de charger les données du modèle.'}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Réessayer
                </button>
            </div>
        )
    }
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
                        {/* Header with model name and actions */}
                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="flex items-center">
                                    <Link
                                        to="/developer/models"
                                        className="text-sm text-gray-500 hover:text-blue-600 mr-2"
                                    >
                                        Modèles
                                    </Link>
                                    <span className="text-gray-500 mx-2">/</span>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {model.name}
                                    </h1>
                                    {model.visibility === Visibility.PUBLIC ? (
                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <Globe className="h-3 w-3 mr-1" />
                                            Public
                                        </span>
                                    ) : (
                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <Lock className="h-3 w-3 mr-1" />
                                            Privé
                                        </span>
                                    )}

                                </div>

                            </div>
                            <div className="flex gap-3 mt-4 md:mt-0">
                                <Link
                                    to={`/developer/models/${model.id}/update`}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Modifier
                                </Link>
                                <Link
                                    to={`/models/${model.id}`}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Vue publique
                                </Link>
                                <button onClick={() => openDeleteModal(model)} className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                        {/* Tabs */}
                        <div className="bg-white rounded-t-xl shadow-sm mb-6">
                            <div className="border-b border-gray-200">
                                <nav className="flex -mb-px">
                                    <button
                                        onClick={() => setSelectedTab('overview')}
                                        className={`py-4 px-6 text-sm font-medium ${selectedTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Vue d'ensemble
                                    </button>
                                    <button
                                        onClick={() => setSelectedTab('usage')}
                                        className={`py-4 px-6 text-sm font-medium ${selectedTab === 'usage' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Utilisation
                                    </button>
                                    <button
                                        onClick={() => setSelectedTab('subscribers')}
                                        className={`py-4 px-6 text-sm font-medium ${selectedTab === 'subscribers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Abonnés
                                    </button>
                                    <button
                                        onClick={() => setSelectedTab('endpoints')}
                                        className={`py-4 px-6 text-sm font-medium ${selectedTab === 'endpoints' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Endpoints
                                    </button>

                                    <button
                                        onClick={() => setSelectedTab('settings')}
                                        className={`py-4 px-6 text-sm font-medium ${selectedTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        Paramètres
                                    </button>
                                </nav>
                            </div>
                        </div>
                        {/* Tab Content */}
                        {selectedTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Key metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-blue-100 mr-4">
                                                <Users className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Utilisateurs</p>
                                                <div className="flex items-center">
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {formatNumber(model.usage.uniqueUsers)}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-green-100 mr-4">
                                                <Server className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Appels API</p>
                                                <div className="flex items-center">
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {formatNumber(model.usage.totalCalls)}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-purple-100 mr-4">
                                                <DollarSign className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Revenus</p>
                                                <div className="flex items-center">
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {model.revenue.totalRevenue} TND
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-yellow-100 mr-4">
                                                <User className="h-6 w-6 text-yellow-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Abonnements</p>
                                                <div className="flex items-center">
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        {formatNumber(model.revenue.subscriptions)}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Model description and metadata */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                                        <h2 className="text-lg font-semibold mb-4">Description</h2>
                                        <p className="text-gray-700 mb-6">{model.description}</p>
                                        <h3 className="text-md font-semibold mb-3">Tâches</h3>
                                        {/** if there is no tasks attached to the model  display a message */}
                                        {model.tasks.length === 0 ? (
                                            <span className="text-gray-500">Aucune tâche disponible</span>
                                        ) : (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {model.tasks.map((task) => (
                                                    <span
                                                        key={task.id}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        <Tag className="h-3 w-3 mr-2" />
                                                        {task.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <h3 className="text-md font-semibold mb-3">Performance</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-500 mb-1">
                                                    Accuracy
                                                </div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    {/** check if accuracy is available */}

                                                    {typeof model.performance.accuracy === "string" && model.performance.accuracy.length > 0 ? model.performance.accuracy : "N/A"}
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-500 mb-1">
                                                    Precision
                                                </div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    {typeof model.performance.precision === "string" && model.performance.precision.length > 0 ? model.performance.precision : "N/A"}
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-500 mb-1">Recall</div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    {typeof model.performance.recall === "string" && model.performance.recall.length > 0 ? model.performance.recall : "N/A"}
                                                </div>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-500 mb-1">
                                                    F1 Score
                                                </div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    {typeof model.performance.f1Score === "string" && model.performance.f1Score.length > 0 ? model.performance.f1Score : "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-md font-semibold mb-3">
                                            Statistiques d'utilisation
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-500 mb-1">
                                                    Temps de réponse moyen
                                                </div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    {model.usage.averageResponseTime}
                                                </div>

                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-500 mb-1">
                                                    Taux d'erreur
                                                </div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    {model.usage.errorRate}%
                                                </div>

                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <div className="text-sm text-gray-500 mb-1">
                                                    Revenu moyen par utilisateur
                                                </div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    {model.revenue.averageRevenuePerUser}{' '}
                                                    TND
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm p-6">
                                        <h2 className="text-lg font-semibold mb-4">Métadonnées</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <Code className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        Framework
                                                    </span>
                                                    <p className="font-medium text-gray-900">
                                                        {model.framework ?? "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Cpu className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        Architecture
                                                    </span>
                                                    <p className="font-medium text-gray-900">
                                                        {model.architecture ?? "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Database className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        Dataset d'entraînement
                                                    </span>
                                                    <p className="font-medium text-gray-900">
                                                        {model.trainingDataset ?? "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Terminal className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        Image Docker
                                                    </span>
                                                    <p className="font-medium text-gray-900">
                                                        {model.image ?? "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        Date de création
                                                    </span>
                                                    <p className="font-medium text-gray-900">
                                                        {formatDate(model.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <span className="text-sm text-gray-500">
                                                        Date de publication
                                                    </span>
                                                    <p className="font-medium text-gray-900">
                                                        {formatDate(model.publishedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <h3 className="text-md font-semibold mb-3">
                                                Actions rapides
                                            </h3>
                                            <div className="space-y-2">

                                                <Link
                                                    to={`/developer/models/${model.id}/update`}
                                                    className="flex items-center p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                                >
                                                    <Edit className="h-5 w-5 mr-2" />
                                                    <span>Mettre à jour le modèle</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Subscription Plans */}
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Plans d'abonnement
                                    </h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Plan
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Prix
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Facturation
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Abonnés
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Revenus
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
                                                {model.subscriptionPlans.length < 1 ? (
                                                    <tr>
                                                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                            Aucun plan d'abonnement disponible.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    model.subscriptionPlans.map((plan) => (
                                                        <tr key={plan.id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {plan.name}
                                                                    </div>
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {plan.description.split(" ").slice(0, 10).join(" ") + " ..."}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {
                                                                    <div className="text-sm text-gray-900">
                                                                        {formatCurrency(plan.price)}
                                                                    </div>
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {plan.billingPeriod === BillingPeriod.MONTHLY
                                                                        ? 'Mensuelle'
                                                                        : plan.billingPeriod === BillingPeriod.ANNUAL
                                                                            ? 'Annuelle'
                                                                            : 'Pay-as-you-go'}
                                                                </div>
                                                                {plan.apiCallsLimit && (
                                                                    <div className="text-sm text-gray-500">
                                                                        {formatNumber(plan.apiCallsLimit)} appels API
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {formatNumber(plan.subscribersCount)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                {formatCurrency(plan.revenue)}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button className="text-blue-600 hover:text-blue-900">
                                                                    Modifier
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                        {selectedTab === 'usage' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    Statistiques d'utilisation
                                </h2>
                                <div className="mb-6 flex justify-end">
                                    <div className="flex items-center bg-white rounded-md border border-gray-200 shadow-sm">
                                        <button
                                            className={`px-3 py-1.5 text-sm rounded-md ${timeRange === '7d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => setTimeRange('7d')}
                                        >
                                            7 jours
                                        </button>
                                        <button
                                            className={`px-3 py-1.5 text-sm rounded-md ${timeRange === '30d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => setTimeRange('30d')}
                                        >
                                            30 jours
                                        </button>
                                        <button
                                            className={`px-3 py-1.5 text-sm rounded-md ${timeRange === '90d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => setTimeRange('90d')}
                                        >
                                            90 jours
                                        </button>
                                        <button
                                            className={`px-3 py-1.5 text-sm rounded-md ${timeRange === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            onClick={() => setTimeRange('all')}
                                        >
                                            Tout
                                        </button>
                                    </div>
                                </div>
                                <div className="h-64 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                                    <p className="text-gray-500">
                                        Graphique d'utilisation (simulé)
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                                            Appels API par jour
                                        </h3>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {formatNumber(Math.round(model.usage.totalCalls / 30))}
                                        </p>
                                        <div className="flex items-center mt-1">
                                            {model.usage.callsTrend > 0 ? (
                                                <div className="flex items-center text-green-600 text-xs">
                                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                                    <span>
                                                        +{model.usage.callsTrend}% vs période précédente
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-600 text-xs">
                                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                                    <span>
                                                        {model.usage.callsTrend}% vs période précédente
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                                            Utilisateurs actifs
                                        </h3>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {formatNumber(model.usage.uniqueUsers)}
                                        </p>
                                        <div className="flex items-center mt-1">
                                            {model.usage.usersTrend > 0 ? (
                                                <div className="flex items-center text-green-600 text-xs">
                                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                                    <span>
                                                        +{model.usage.usersTrend}% vs période précédente
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-600 text-xs">
                                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                                    <span>
                                                        {model.usage.usersTrend}% vs période précédente
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                                            Taux d'erreur
                                        </h3>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {model.usage.errorRate}%
                                        </p>
                                        <div className="flex items-center mt-1">
                                            {model.usage.errorRateTrend < 0 ? (
                                                <div className="flex items-center text-green-600 text-xs">
                                                    <ArrowDownRight className="h-3 w-3 mr-1" />
                                                    <span>
                                                        {Math.abs(model.usage.errorRateTrend)}%
                                                        d'amélioration
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center text-red-600 text-xs">
                                                    <ArrowUpRight className="h-3 w-3 mr-1" />
                                                    <span>
                                                        +{model.usage.errorRateTrend}% de dégradation
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-md font-semibold mb-3">
                                    Utilisation par endpoint
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Endpoint
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Appels
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Temps de réponse
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Taux d'erreur
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {model.endpoints.map((endpoint, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span
                                                                className={`px-2 py-1 text-xs font-medium rounded mr-2 ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' : endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}`}
                                                            >
                                                                {endpoint.method}
                                                            </span>
                                                            <span className="font-medium text-gray-900">
                                                                {endpoint.path}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatNumber(endpoint.callsCount)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {endpoint.avgResponseTime}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {endpoint.errorRate}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {selectedTab === 'subscribers' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4">Abonnés</h2>
                                <div className="h-64 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                                    <p className="text-gray-500">Tableau des abonnés (simulé)</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    {model.subscriptionPlans.map((plan) => (
                                        <div key={plan.id} className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                                {plan.name}
                                            </h3>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {formatNumber(plan.subscribersCount)}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {formatCurrency(plan.revenue)} de
                                                revenus
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {selectedTab === 'endpoints' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4">Endpoints API</h2>
                                <div className="space-y-6">
                                    {model.endpoints.map((endpoint, index) => (

                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center">
                                                    <span
                                                        className={`px-2 py-1 text-xs font-medium rounded mr-2 ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' : endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}`}
                                                    >
                                                        {endpoint.method}
                                                    </span>
                                                    <span className="font-medium text-blue-600">
                                                        {endpoint.path}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button className="text-gray-500 hover:text-blue-600">
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            {endpoint.description && (
                                                <div className="mb-3 text-sm text-gray-600">
                                                    {endpoint.description}
                                                </div>
                                            )}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="text-xs font-medium text-gray-500 mb-1">
                                                        APPELS TOTAUX
                                                    </div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {formatNumber(endpoint.callsCount)}
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="text-xs font-medium text-gray-500 mb-1">
                                                        TEMPS DE RÉPONSE
                                                    </div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {endpoint.avgResponseTime}
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded-lg">
                                                    <div className="text-xs font-medium text-gray-500 mb-1">
                                                        TAUX D'ERREUR
                                                    </div>
                                                    <div className="text-lg font-bold text-gray-900">
                                                        {endpoint.errorRate}%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {endpoint.requestBody &&
                                                    endpoint.requestBody !== '{}' && (
                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                            <h4 className="text-xs font-semibold text-gray-500 mb-2">
                                                                REQUÊTE
                                                            </h4>
                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                                                {formatJson(endpoint.requestBody)}
                                                            </pre>
                                                        </div>
                                                    )}
                                                {endpoint.successResponse &&
                                                    endpoint.successResponse !== '{}' && (
                                                        <div className="bg-green-50 p-3 rounded-lg">
                                                            <h4 className="text-xs font-semibold text-green-600 mb-2">
                                                                SUCCÈS
                                                            </h4>
                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                                                {formatJson(endpoint.successResponse)}
                                                            </pre>
                                                        </div>
                                                    )}
                                                {endpoint.errorResponse &&
                                                    endpoint.errorResponse !== '{}' && (
                                                        <div className="bg-red-50 p-3 rounded-lg">
                                                            <h4 className="text-xs font-semibold text-red-600 mb-2">
                                                                ERREUR
                                                            </h4>
                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                                                {formatJson(endpoint.errorResponse)}
                                                            </pre>
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedTab === 'settings' && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    Paramètres du modèle
                                </h2>
                                <div className="space-y-6">


                                    <div className="pt-6 border-t border-gray-200">
                                        <h3 className="text-md font-medium mb-3 text-red-600">
                                            Zone de danger
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <button onClick={() => openDeleteModal(model)} className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                                    Supprimer définitivement le modèle
                                                </button>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Cette action est irréversible. Toutes les données
                                                    associées à ce modèle seront supprimées.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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
