import React, { useState, memo } from 'react'
import {
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
} from 'lucide-react'
export enum InstanceStatus {
    RUNNING = 'RUNNING',
    STOPPED = 'STOPPED',
    STARTING = 'STARTING',
    STOPPING = 'STOPPING',
    ERROR = 'ERROR',
    SUSPENDED = 'SUSPENDED',
}
export interface DeployedInstance {
    id: string
    modelId: number
    modelName: string
    subscriptionId: number
    status: InstanceStatus
    deployedAt: string
    lastActivity?: string
    region: string
    instanceType: string
    resources: {
        cpu: string
        memory: string
        storage: string
    }
    metrics?: {
        cpuUsage: number
        memoryUsage: number
        requestsPerMinute: number
    }
}
interface DeployedInstancesWidgetProps {
    instances: DeployedInstance[]
    onStop: (instanceId: string) => void
    onStart: (instanceId: string) => void
    onRestart: (instanceId: string) => void
    onDelete?: (instanceId: string) => void
    expanded?: boolean
}
export function DeployedInstancesWidget({
    instances,
    onStop,
    onStart,
    onRestart,
    onDelete,
    expanded = false,
}: DeployedInstancesWidgetProps) {
    const [actionLoading, setActionLoading] = useState<{
        [key: string]: boolean
    }>({})
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
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
                return <CheckCircle className="h-4 w-4" />
            case InstanceStatus.STOPPED:
            case InstanceStatus.SUSPENDED:
                return <Square className="h-4 w-4" />
            case InstanceStatus.STARTING:
            case InstanceStatus.STOPPING:
                return <Clock className="h-4 w-4 animate-pulse" />
            case InstanceStatus.ERROR:
                return <AlertCircle className="h-4 w-4" />
            default:
                return <Activity className="h-4 w-4" />
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
    const handleAction = async (
        action: 'stop' | 'start' | 'restart',
        instanceId: string,
    ) => {
        setActionLoading({
            ...actionLoading,
            [instanceId]: true,
        })
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            switch (action) {
                case 'stop':
                    onStop(instanceId)
                    break
                case 'start':
                    onStart(instanceId)
                    break
                case 'restart':
                    onRestart(instanceId)
                    break
            }
        } catch (error) {
            console.error(`Error ${action}ing instance:`, error)
        } finally {
            setActionLoading({
                ...actionLoading,
                [instanceId]: false,
            })
        }
    }
    const handleDelete = async (instanceId: string) => {
        if (confirmDelete !== instanceId) {
            setConfirmDelete(instanceId)
            return
        }
        setActionLoading({
            ...actionLoading,
            [instanceId]: true,
        })
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            if (onDelete) {
                onDelete(instanceId)
            }
        } catch (error) {
            console.error('Error deleting instance:', error)
        } finally {
            setActionLoading({
                ...actionLoading,
                [instanceId]: false,
            })
            setConfirmDelete(null)
        }
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }
    if (instances.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                    <Server className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold">Instances déployées</h2>
                </div>
                <div className="text-center py-8">
                    <Server className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Aucune instance déployée</p>
                    <p className="text-sm text-gray-400 mt-1">
                        Vos instances de modèles apparaîtront ici
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Server className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold">Instances déployées</h2>
                    <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {instances.length}
                    </span>
                </div>
            </div>
            <div className="space-y-4">
                {instances.map((instance) => (
                    <div
                        key={instance.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <h3 className="font-semibold text-gray-900 mr-3">
                                        {instance.modelName}
                                    </h3>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(instance.status)}`}
                                    >
                                        {getStatusIcon(instance.status)}
                                        <span className="ml-1">
                                            {getStatusLabel(instance.status)}
                                        </span>
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <span className="flex items-center">
                                        <Server className="h-3 w-3 mr-1" />
                                        {instance.instanceType}
                                    </span>
                                    <span className="flex items-center">
                                        <Activity className="h-3 w-3 mr-1" />
                                        {instance.region}
                                    </span>
                                    <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        Déployé le {formatDate(instance.deployedAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {expanded && (
                            <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <Cpu className="h-4 w-4 text-gray-400 mr-2" />
                                    <div>
                                        <p className="text-xs text-gray-500">CPU</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {instance.resources.cpu}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <HardDrive className="h-4 w-4 text-gray-400 mr-2" />
                                    <div>
                                        <p className="text-xs text-gray-500">Mémoire</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {instance.resources.memory}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <HardDrive className="h-4 w-4 text-gray-400 mr-2" />
                                    <div>
                                        <p className="text-xs text-gray-500">Stockage</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {instance.resources.storage}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {expanded && instance.metrics && (
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="flex items-center p-2 bg-blue-50 rounded">
                                    <BarChart2 className="h-4 w-4 text-blue-600 mr-2" />
                                    <div>
                                        <p className="text-xs text-blue-600">CPU</p>
                                        <p className="text-sm font-medium text-blue-900">
                                            {instance.metrics.cpuUsage}%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center p-2 bg-purple-50 rounded">
                                    <HardDrive className="h-4 w-4 text-purple-600 mr-2" />
                                    <div>
                                        <p className="text-xs text-purple-600">Mémoire</p>
                                        <p className="text-sm font-medium text-purple-900">
                                            {instance.metrics.memoryUsage}%
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center p-2 bg-green-50 rounded">
                                    <Activity className="h-4 w-4 text-green-600 mr-2" />
                                    <div>
                                        <p className="text-xs text-green-600">Requêtes/min</p>
                                        <p className="text-sm font-medium text-green-900">
                                            {instance.metrics.requestsPerMinute}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                {instance.status === InstanceStatus.RUNNING && (
                                    <>
                                        <button
                                            onClick={() => handleAction('stop', instance.id)}
                                            disabled={actionLoading[instance.id]}
                                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {actionLoading[instance.id] ? (
                                                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                            ) : (
                                                <Square className="h-4 w-4 mr-1" />
                                            )}
                                            Arrêter
                                        </button>
                                        <button
                                            onClick={() => handleAction('restart', instance.id)}
                                            disabled={actionLoading[instance.id]}
                                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <RefreshCw className="h-4 w-4 mr-1" />
                                            Redémarrer
                                        </button>
                                    </>
                                )}
                                {(instance.status === InstanceStatus.STOPPED ||
                                    instance.status === InstanceStatus.SUSPENDED) && (
                                        <button
                                            onClick={() => handleAction('start', instance.id)}
                                            disabled={actionLoading[instance.id]}
                                            className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {actionLoading[instance.id] ? (
                                                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                                            ) : (
                                                <Play className="h-4 w-4 mr-1" />
                                            )}
                                            Démarrer
                                        </button>
                                    )}
                                {instance.status === InstanceStatus.ERROR && (
                                    <button
                                        onClick={() => handleAction('restart', instance.id)}
                                        disabled={actionLoading[instance.id]}
                                        className="inline-flex items-center px-3 py-1.5 border border-yellow-600 text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <RefreshCw className="h-4 w-4 mr-1" />
                                        Réessayer
                                    </button>
                                )}
                            </div>
                            {onDelete && (
                                <button
                                    onClick={() => handleDelete(instance.id)}
                                    disabled={actionLoading[instance.id]}
                                    className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${confirmDelete === instance.id ? 'border border-red-600 text-white bg-red-600 hover:bg-red-700' : 'border border-gray-300 text-red-600 bg-white hover:bg-red-50'}`}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    {confirmDelete === instance.id ? 'Confirmer ?' : 'Supprimer'}
                                </button>
                            )}
                        </div>
                        {instance.lastActivity && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-500">
                                    Dernière activité : {formatDate(instance.lastActivity)}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
