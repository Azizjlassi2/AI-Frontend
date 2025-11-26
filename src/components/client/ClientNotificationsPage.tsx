import React, { useMemo, useState } from 'react'
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar'
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader'
import { Notification } from '../../types/shared'
import {
    Info,
    AlertTriangle,
    CheckCircle,
    AlertCircle,
    X,
    Check,
    Trash2,
    Filter,
} from 'lucide-react'

type FilterType =
    | 'all'
    | 'unread'
    | 'read'
    | 'info'
    | 'warning'
    | 'success'
    | 'error'
export function ClientNotificationsPage() {
    const [activeTab, setActiveTab] = useState('notifications')
    const [activeFilter, setActiveFilter] = useState<FilterType>('all')
    const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
        [],
    )
    // Mock notifications data
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: 1,
            title: 'Nouveau modèle disponible',
            message:
                'Le modèle ArabicBERT v2.0 est maintenant disponible avec des performances améliorées.',
            date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            type: 'INFO',
            read: false,
            link: '/models/1',
        },
        {
            id: 2,
            title: "Limite d'utilisation atteinte",
            message:
                'Vous avez atteint 80% de votre quota mensuel pour le modèle TunBERT.',
            date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            type: 'WARNING',
            read: false,
            link: '/user/usage',
        },
        {
            id: 3,
            title: 'Paiement confirmé',
            message: 'Votre paiement de 49.99€ a été traité avec succès.',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'SUCCESS',
            read: true,
            link: '/user/billing',
        },
        {
            id: 4,
            title: 'Échec de déploiement',
            message:
                "Le déploiement de l'instance inst-005 a échoué. Veuillez réessayer.",
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'ERROR',
            read: false,
            link: '/user/instances',
        },
        {
            id: 5,
            title: 'Mise à jour de sécurité',
            message:
                'Une mise à jour de sécurité importante est disponible pour vos clés API.',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'WARNING',
            read: true,
            link: '/user/api-keys',
        },
        {
            id: 6,
            title: 'Abonnement renouvelé',
            message: 'Votre abonnement Premium a été renouvelé automatiquement.',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'SUCCESS',
            read: true,
            link: '/user/subscriptions',
        },
        {
            id: 7,
            title: 'Nouveau dataset disponible',
            message:
                'Le dataset "Arabic News Corpus 2024" est maintenant disponible.',
            date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'INFO',
            read: true,
            link: '/datasets/15',
        },
        {
            id: 8,
            title: 'Maintenance programmée',
            message: 'Une maintenance est prévue le 15 janvier de 2h à 4h (UTC).',
            date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            type: 'INFO',
            read: true,
        },
    ])

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'INFO':
                return <Info className="h-5 w-5 text-blue-500" />
            case 'WARNING':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />
            case 'SUCCESS':
                return <CheckCircle className="h-5 w-5 text-green-500" />
            case 'ERROR':
                return <AlertCircle className="h-5 w-5 text-red-500" />
            default:
                return <Info className="h-5 w-5 text-blue-500" />
        }
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - date.getTime())
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        if (diffDays === 0) {
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
            if (diffHours === 0) {
                const diffMinutes = Math.floor(diffTime / (1000 * 60))
                return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
            }
            return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
        } else if (diffDays === 1) {
            return 'Hier'
        } else if (diffDays < 7) {
            return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
        } else {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            })
        }
    }
    const handleMarkAsRead = (notificationId: number) => {
        setNotifications((prev) =>
            prev.map((n) =>
                n.id === notificationId
                    ? {
                        ...n,
                        read: true,
                    }
                    : n,
            ),
        )
        setSelectedNotifications((prev) =>
            prev.filter((id) => id !== notificationId),
        )
    }
    const handleMarkAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((n) => ({
                ...n,
                read: true,
            })),
        )
        setSelectedNotifications([])
    }
    const handleDeleteNotification = (notificationId: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        setSelectedNotifications((prev) =>
            prev.filter((id) => id !== notificationId),
        )
    }
    const handleDeleteSelected = () => {
        setNotifications((prev) =>
            prev.filter((n) => !selectedNotifications.includes(n.id)),
        )
        setSelectedNotifications([])
    }
    const toggleSelectNotification = (notificationId: number) => {
        setSelectedNotifications((prev) =>
            prev.includes(notificationId)
                ? prev.filter((id) => id !== notificationId)
                : [...prev, notificationId],
        )
    }
    const filteredNotifications = useMemo(() => {
        return notifications.filter((n) => {
            switch (activeFilter) {
                case 'unread':
                    return !n.read
                case 'read':
                    return n.read
                case 'info':
                    return n.type === 'INFO'
                case 'warning':
                    return n.type === 'WARNING'
                case 'success':
                    return n.type === 'SUCCESS'
                case 'error':
                    return n.type === 'ERROR'
                default:
                    return true
            }
        })
    }, [notifications, activeFilter])
    const groupedNotifications = useMemo(() => {
        const groups: {
            [key: string]: Notification[]
        } = {
            today: [],
            yesterday: [],
            thisWeek: [],
            older: [],
        }
        const now = new Date()
        const todayStart = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
        )
        const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000)
        const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)
        filteredNotifications.forEach((notification) => {
            const notifDate = new Date(notification.date)
            if (notifDate >= todayStart) {
                groups.today.push(notification)
            } else if (notifDate >= yesterdayStart) {
                groups.yesterday.push(notification)
            } else if (notifDate >= weekStart) {
                groups.thisWeek.push(notification)
            } else {
                groups.older.push(notification)
            }
        })
        return groups
    }, [filteredNotifications])
    const filters = [
        {
            id: 'all',
            label: 'Toutes',
            count: notifications.length,
        },
        {
            id: 'unread',
            label: 'Non lues',
            count: notifications.filter((n) => !n.read).length,
        },
        {
            id: 'read',
            label: 'Lues',
            count: notifications.filter((n) => n.read).length,
        },
        {
            id: 'info',
            label: 'Info',
            count: notifications.filter((n) => n.type === 'INFO').length,
        },
        {
            id: 'warning',
            label: 'Alertes',
            count: notifications.filter((n) => n.type === 'WARNING').length,
        },
        {
            id: 'success',
            label: 'Succès',
            count: notifications.filter((n) => n.type === 'SUCCESS').length,
        },
        {
            id: 'error',
            label: 'Erreurs',
            count: notifications.filter((n) => n.type === 'ERROR').length,
        },
    ]
    const unreadCount = notifications.filter((n) => !n.read).length
    return (
        <div className="min-h-screen bg-gray-50">
            <UserDashboardHeader

            />
            <div className="flex">
                <UserDashboardSidebar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                <main className="flex-1 p-6 md:p-8">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Notifications
                            </h1>
                            <p className="text-gray-600">
                                Gérez toutes vos notifications en un seul endroit
                            </p>
                        </div>

                        {/* Filter Tabs */}
                        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
                            <div className="border-b border-gray-200 overflow-x-auto">
                                <div className="flex min-w-max">
                                    {filters.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => setActiveFilter(filter.id as FilterType)}
                                            className="relative px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap"
                                        >
                                            <span
                                                className={
                                                    activeFilter === filter.id
                                                        ? 'text-blue-600'
                                                        : 'text-gray-600 hover:text-gray-900'
                                                }
                                            >
                                                {filter.label}
                                                <span
                                                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                                                >
                                                    {filter.count}
                                                </span>
                                            </span>

                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Bulk Actions */}
                            {filteredNotifications.length > 0 && (
                                <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600">
                                            {selectedNotifications.length > 0
                                                ? `${selectedNotifications.length} sélectionnée${selectedNotifications.length > 1 ? 's' : ''}`
                                                : `${filteredNotifications.length} notification${filteredNotifications.length > 1 ? 's' : ''}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {selectedNotifications.length > 0 ? (
                                            <button
                                                onClick={handleDeleteSelected}
                                                className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1.5" />
                                                Supprimer
                                            </button>
                                        ) : (
                                            unreadCount > 0 && (
                                                <button
                                                    onClick={handleMarkAllAsRead}
                                                    className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
                                                >
                                                    <Check className="h-4 w-4 mr-1.5" />
                                                    Tout marquer comme lu
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="space-y-6">
                            {Object.entries(groupedNotifications).map(
                                ([group, notifs]) =>
                                    notifs.length > 0 && (
                                        <div key={group}>
                                            <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                                                {group === 'today'
                                                    ? "Aujourd'hui"
                                                    : group === 'yesterday'
                                                        ? 'Hier'
                                                        : group === 'thisWeek'
                                                            ? 'Cette semaine'
                                                            : 'Plus anciennes'}
                                            </h2>
                                            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200 overflow-hidden">
                                                {notifs.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-4 flex items-start space-x-4 ${!notification.read ? 'bg-blue-50' : ''
                                                            }`}>
                                                        <div>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedNotifications.includes(notification.id)}
                                                                onChange={() => toggleSelectNotification(notification.id)}
                                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div className="flex-shrink-0 mt-1">
                                                            {getNotificationIcon(notification.type)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <a href={notification.link || '#'} className="block">
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {notification.title}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {formatDate(notification.date)}
                                                                </p>
                                                            </a>
                                                        </div>
                                                        <div className="flex flex-col space-y-2 ml-4">
                                                            {!notification.read && (
                                                                <button
                                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                                    className="text-gray-400 hover:text-gray-600"
                                                                >
                                                                    <Check className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </main>
            </div >
        </div >
    )
}

