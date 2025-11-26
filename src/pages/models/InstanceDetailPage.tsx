import React, { useEffect, useState, memo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Server,
    Play,
    Square,
    RefreshCw,
    AlertCircle,
    CheckCircle,
    Clock,
    Activity,
    Cpu,
    HardDrive,
    BarChart2,
    Trash2,
    Settings,
    Calendar,
    MapPin,
} from 'lucide-react'
import { DeployedInstance, InstanceStatus } from '../../components/client/DeployedInstancesWidget'
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader'
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar'

export function InstanceDetailPage() {
    const { instanceId } = useParams<{
        instanceId: string
    }>()
    const navigate = useNavigate()
    const [instance, setInstance] = useState<DeployedInstance | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [actionLoading, setActionLoading] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [activeTab, setActiveTab] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchInstance = async () => {
            setIsLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 500))
                // Mock data - in a real app, this would be an API call
                const mockInstances: DeployedInstance[] = [
                    {
                        id: 'inst-001',
                        modelId: 1,
                        modelName: 'ArabicBERT',
                        subscriptionId: 123456,
                        status: InstanceStatus.RUNNING,
                        deployedAt: new Date(
                            Date.now() - 15 * 24 * 60 * 60 * 1000,
                        ).toISOString(),
                        lastActivity: new Date(
                            Date.now() - 2 * 60 * 60 * 1000,
                        ).toISOString(),
                        region: 'eu-central-1',
                        instanceType: 't3.medium',
                        resources: {
                            cpu: '2 vCPU',
                            memory: '4 GB',
                            storage: '50 GB SSD',
                        },
                        metrics: {
                            cpuUsage: 45,
                            memoryUsage: 62,
                            requestsPerMinute: 120,
                        },
                    },
                    {
                        id: 'inst-002',
                        modelId: 2,
                        modelName: 'TunBERT',
                        subscriptionId: 123457,
                        status: InstanceStatus.STOPPED,
                        deployedAt: new Date(
                            Date.now() - 8 * 24 * 60 * 60 * 1000,
                        ).toISOString(),
                        lastActivity: new Date(
                            Date.now() - 3 * 24 * 60 * 60 * 1000,
                        ).toISOString(),
                        region: 'eu-west-1',
                        instanceType: 't3.small',
                        resources: {
                            cpu: '1 vCPU',
                            memory: '2 GB',
                            storage: '30 GB SSD',
                        },
                    },
                    {
                        id: 'inst-003',
                        modelId: 1,
                        modelName: 'ArabicBERT',
                        subscriptionId: 123456,
                        status: InstanceStatus.RUNNING,
                        deployedAt: new Date(
                            Date.now() - 5 * 24 * 60 * 60 * 1000,
                        ).toISOString(),
                        lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                        region: 'us-east-1',
                        instanceType: 't3.large',
                        resources: {
                            cpu: '4 vCPU',
                            memory: '8 GB',
                            storage: '100 GB SSD',
                        },
                        metrics: {
                            cpuUsage: 78,
                            memoryUsage: 85,
                            requestsPerMinute: 340,
                        },
                    },
                ]
                const foundInstance = mockInstances.find((i) => i.id === instanceId)
                if (!foundInstance) {
                    setError('Instance non trouvée')
                    return
                }
                setInstance(foundInstance)
            } catch (error) {
                console.error('Error fetching instance:', error)
                setError("Une erreur est survenue lors du chargement de l'instance")
            } finally {
                setIsLoading(false)
            }
        }
        if (instanceId) {
            fetchInstance()
        }
    }, [instanceId])
    const getStatusColor = (status: InstanceStatus) => {
        switch (status) {
            case InstanceStatus.RUNNING:
                return 'bg-green-100 text-green-800 border-green-200'
            case InstanceStatus.STOPPED:
            case InstanceStatus.SUSPENDED:
                return 'bg-gray-100 text-gray-800 border-gray-200'
            case InstanceStatus.STARTING:
            case InstanceStatus.STOPPING:
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case InstanceStatus.ERROR:
                return 'bg-red-100 text-red-800 border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }
    const getStatusIcon = (status: InstanceStatus) => {
        switch (status) {
            case InstanceStatus.RUNNING:
                return <CheckCircle className="h-5 w-5" />
            case InstanceStatus.STOPPED:
            case InstanceStatus.SUSPENDED:
                return <Square className="h-5 w-5" />
            case InstanceStatus.STARTING:
            case InstanceStatus.STOPPING:
                return <Clock className="h-5 w-5 animate-pulse" />
            case InstanceStatus.ERROR:
                return <AlertCircle className="h-5 w-5" />
            default:
                return <Activity className="h-5 w-5" />
        }
    }
    const getStatusLabel = (status: InstanceStatus) => {
        switch (status) {
            case InstanceStatus.RUNNING:
                return "En cours d'exécution"
            case InstanceStatus.STOPPED:
                return 'Arrêté'
            case InstanceStatus.SUSPENDED:
                return 'Suspendu'
            case InstanceStatus.STARTING:
                return 'Démarrage...'
            case InstanceStatus.STOPPING:
                return 'Arrêt en cours...'
            case InstanceStatus.ERROR:
                return 'Erreur'
            default:
                return status
        }
    }
    const handleAction = async (action: 'stop' | 'start' | 'restart') => {
        if (!instance) return
        setActionLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            switch (action) {
                case 'stop':
                    setInstance({
                        ...instance,
                        status: InstanceStatus.STOPPING,
                    })
                    setTimeout(() => {
                        setInstance((prev: any) =>
                            prev
                                ? {
                                    ...prev,
                                    status: InstanceStatus.STOPPED,
                                }
                                : prev,
                        )
                    }, 2000)
                    break
                case 'start':
                    setInstance({
                        ...instance,
                        status: InstanceStatus.STARTING,
                    })
                    setTimeout(() => {
                        setInstance((prev: any) =>
                            prev
                                ? {
                                    ...prev,
                                    status: InstanceStatus.RUNNING,
                                    lastActivity: new Date().toISOString(),
                                }
                                : prev,
                        )
                    }, 2000)
                    break
                case 'restart':
                    setInstance({
                        ...instance,
                        status: InstanceStatus.STOPPING,
                    })
                    setTimeout(() => {
                        setInstance((prev: any) =>
                            prev
                                ? {
                                    ...prev,
                                    status: InstanceStatus.STARTING,
                                }
                                : prev,
                        )
                        setTimeout(() => {
                            setInstance((prev: any) =>
                                prev
                                    ? {
                                        ...prev,
                                        status: InstanceStatus.RUNNING,
                                        lastActivity: new Date().toISOString(),
                                    }
                                    : prev,
                            )
                        }, 2000)
                    }, 1500)
                    break
            }
        } catch (error) {
            console.error(`Error ${action}ing instance:`, error)
        } finally {
            setActionLoading(false)
        }
    }
    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true)
            return
        }
        setActionLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            navigate('/client/subscriptions')
        } catch (error) {
            console.error('Error deleting instance:', error)
        } finally {
            setActionLoading(false)
            setConfirmDelete(false)
        }
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }
    if (error || !instance) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <div className="flex flex-col items-center justify-center py-12">
                            <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
                            <p className="text-gray-600 mb-6">
                                {error || 'Instance non trouvée'}
                            </p>
                            <Link
                                to="/client/subscriptions"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour aux abonnements
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50 ">
            <UserDashboardHeader />
            <div className="flex">
                <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
                <main className="flex-1 p-6">
                    <div className="container mx-auto max-w-4xl">
                        <div className="mb-6">
                            <Link
                                to="/client/subscriptions"
                                className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour aux abonnements
                            </Link>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start">
                                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                                            <Server className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                                Instance {instance.id}
                                            </h1>
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    to={`/models/${instance.modelId}`}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    {instance.modelName}
                                                </Link>
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(instance.status)}`}
                                                >
                                                    {getStatusIcon(instance.status)}
                                                    <span className="ml-2">
                                                        {getStatusLabel(instance.status)}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Instance Details */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {/* General Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Informations générales
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Server className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Type d'instance</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {instance.instanceType}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Région</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {instance.region}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Date de déploiement
                                                    </p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {formatDate(instance.deployedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            {instance.lastActivity && (
                                                <div className="flex items-center">
                                                    <Activity className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Dernière activité
                                                        </p>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {formatDate(instance.lastActivity)}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Resources */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Ressources allouées
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Cpu className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">CPU</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {instance.resources.cpu}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <HardDrive className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Mémoire</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {instance.resources.memory}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <HardDrive className="h-5 w-5 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Stockage</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {instance.resources.storage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Metrics */}
                                {instance.metrics && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                            Métriques en temps réel
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-blue-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-blue-900">
                                                        Utilisation CPU
                                                    </span>
                                                    <BarChart2 className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <p className="text-2xl font-bold text-blue-900">
                                                    {instance.metrics.cpuUsage}%
                                                </p>
                                                <div className="mt-2 h-2 bg-blue-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-600"
                                                        style={{
                                                            width: `${instance.metrics.cpuUsage}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-purple-900">
                                                        Utilisation Mémoire
                                                    </span>
                                                    <HardDrive className="h-5 w-5 text-purple-600" />
                                                </div>
                                                <p className="text-2xl font-bold text-purple-900">
                                                    {instance.metrics.memoryUsage}%
                                                </p>
                                                <div className="mt-2 h-2 bg-purple-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-purple-600"
                                                        style={{
                                                            width: `${instance.metrics.memoryUsage}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="bg-green-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-green-900">
                                                        Requêtes/min
                                                    </span>
                                                    <Activity className="h-5 w-5 text-green-600" />
                                                </div>
                                                <p className="text-2xl font-bold text-green-900">
                                                    {instance.metrics.requestsPerMinute}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Actions */}
                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-3">
                                        {instance.status === InstanceStatus.RUNNING && (
                                            <>
                                                <button
                                                    onClick={() => handleAction('stop')}
                                                    disabled={actionLoading}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {actionLoading ? (
                                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <Square className="h-4 w-4 mr-2" />
                                                    )}
                                                    Arrêter
                                                </button>
                                                <button
                                                    onClick={() => handleAction('restart')}
                                                    disabled={actionLoading}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <RefreshCw className="h-4 w-4 mr-2" />
                                                    Redémarrer
                                                </button>
                                            </>
                                        )}
                                        {(instance.status === InstanceStatus.STOPPED ||
                                            instance.status === InstanceStatus.SUSPENDED) && (
                                                <button
                                                    onClick={() => handleAction('start')}
                                                    disabled={actionLoading}
                                                    className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {actionLoading ? (
                                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                                    ) : (
                                                        <Play className="h-4 w-4 mr-2" />
                                                    )}
                                                    Démarrer
                                                </button>
                                            )}
                                        {/* Stop / Suspend 
                                        <button
                                            onClick={handleDelete}
                                            disabled={actionLoading}
                                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${confirmDelete ? 'border border-red-600 text-white bg-red-600 hover:bg-red-700' : 'border border-gray-300 text-red-600 bg-white hover:bg-red-50'}`}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            {confirmDelete ? 'Confirmer la suppression ?' : 'Supprimer'}
                                        </button>
                                        */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
