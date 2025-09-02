import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';
import { UserDashboardOverview } from '../../components/client/UserDashboardOverview';
import { ActiveSubscriptionsWidget } from '../../components/client/ActiveSubscriptionsWidget';
import { RecentInvoicesWidget } from '../../components/client/RecentInvoicesWidget';
import { UsageStatsWidget } from '../../components/client/UsageStatsWidget';
import { NotificationsWidget } from '../../components/client/NotificationsWidget';
import { ActivityFeedWidget } from '../../components/client/ActivityFeedWidget';
import { AlertCircle } from 'lucide-react';
import { Key } from 'lucide-react';
import { Database } from 'lucide-react';

export enum BillingPeriod {
    MONTHLY = 'MONTHLY',
    ANNUAL = 'ANNUAL',
    PAY_AS_YOU_GO = 'PAY_AS_YOU_GO',
}
export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    CANCELED = 'CANCELED',
    EXPIRED = 'EXPIRED',
    PENDING = 'PENDING',
}
export interface Subscription {
    id: number;
    modelId: number;
    modelName: string;
    planId: number;
    planName: string;
    startDate: string;
    price: number;
    currency: string;
    billingPeriod: BillingPeriod;
    nextBillingDate: string;
    status?: SubscriptionStatus;
    usageData?: {
        apiCallsUsed: number;
        apiCallsLimit?: number;
        lastUsed?: string;
    };
}
export interface Invoice {
    id: string;
    subscriptionId: number;
    modelName: string;
    planName: string;
    date: string;
    amount: number;
    currency: string;
    status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
}
export interface Notification {
    id: number;
    type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
    title: string;
    message: string;
    date: string;
    read: boolean;
    link?: string;
}
export interface ActivityItem {
    id: number;
    type: 'MODEL_USAGE' | 'SUBSCRIPTION' | 'PAYMENT' | 'SYSTEM';
    action: string;
    target: string;
    date: string;
    details?: string;
}
export interface UserDashboardData {
    user: {
        id: number;
        name: string;
        email: string;
        avatar?: string;
    };
    subscriptions: Subscription[];
    invoices: Invoice[];
    notifications: Notification[];
    activity: ActivityItem[];
    stats: {
        totalApiCalls: number;
        activeSubscriptions: number;
        totalSpent: number;
        currency: string;
    };
}
export function ClientDashboardPage() {
    const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 800));
                // Mock data
                const mockSubscriptions: Subscription[] = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
                // If no subscriptions exist in localStorage, create mock data
                const subscriptions = mockSubscriptions.length > 0 ? mockSubscriptions : [{
                    id: 123456,
                    modelId: 1,
                    modelName: 'ArabicBERT',
                    planId: 2,
                    planName: 'Plan Standard',
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    price: 49.99,
                    currency: 'TND',
                    billingPeriod: BillingPeriod.MONTHLY,
                    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    status: SubscriptionStatus.ACTIVE,
                    usageData: {
                        apiCallsUsed: 23456,
                        apiCallsLimit: 50000,
                        lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                    }
                }, {
                    id: 123457,
                    modelId: 2,
                    modelName: 'TunBERT',
                    planId: 4,
                    planName: 'Pay-As-You-Go',
                    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    price: 0.001,
                    currency: 'TND',
                    billingPeriod: BillingPeriod.PAY_AS_YOU_GO,
                    nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                    status: SubscriptionStatus.ACTIVE,
                    usageData: {
                        apiCallsUsed: 3245,
                        lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
                    }
                }, {
                    id: 123458,
                    modelId: 3,
                    modelName: 'FrenchNLP',
                    planId: 3,
                    planName: 'Plan Pro',
                    startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
                    price: 499.99,
                    currency: 'TND',
                    billingPeriod: BillingPeriod.ANNUAL,
                    nextBillingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    status: SubscriptionStatus.EXPIRED,
                    usageData: {
                        apiCallsUsed: 950000,
                        apiCallsLimit: 1000000,
                        lastUsed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
                    }
                }];
                // Store subscriptions in localStorage if they don't exist
                if (mockSubscriptions.length === 0) {
                    localStorage.setItem('userSubscriptions', JSON.stringify(subscriptions));
                }
                // Create mock invoices
                const invoices: Invoice[] = [{
                    id: 'INV-2024-0001',
                    subscriptionId: subscriptions[0]?.id || 123456,
                    modelName: subscriptions[0]?.modelName || 'ArabicBERT',
                    planName: subscriptions[0]?.planName || 'Plan Standard',
                    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    amount: subscriptions[0]?.price || 49.99,
                    currency: subscriptions[0]?.currency || 'TND',
                    status: 'PAID'
                }, {
                    id: 'INV-2024-0002',
                    subscriptionId: subscriptions[1]?.id || 123457,
                    modelName: subscriptions[1]?.modelName || 'TunBERT',
                    planName: subscriptions[1]?.planName || 'Pay-As-You-Go',
                    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    amount: 3.25,
                    currency: subscriptions[1]?.currency || 'TND',
                    status: 'PAID'
                }, {
                    id: 'INV-2024-0003',
                    subscriptionId: subscriptions[0]?.id || 123456,
                    modelName: subscriptions[0]?.modelName || 'ArabicBERT',
                    planName: subscriptions[0]?.planName || 'Plan Standard',
                    date: new Date().toISOString(),
                    amount: subscriptions[0]?.price || 49.99,
                    currency: subscriptions[0]?.currency || 'TND',
                    status: 'PENDING'
                }];
                // Create mock notifications
                const notifications: Notification[] = [{
                    id: 1,
                    type: 'WARNING',
                    title: "Limite d'utilisation proche",
                    message: 'Vous avez utilisé 80% de votre quota mensuel pour ArabicBERT.',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    read: false,
                    link: `/usage/models/${subscriptions[0]?.modelId || 1}`
                }, {
                    id: 2,
                    type: 'SUCCESS',
                    title: 'Paiement réussi',
                    message: "Votre paiement pour l'abonnement à TunBERT a été traité avec succès.",
                    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    read: true,
                    link: `/billing/invoices/INV-2024-0002`
                }, {
                    id: 3,
                    type: 'INFO',
                    title: 'Nouvelle fonctionnalité disponible',
                    message: 'ArabicBERT a été mis à jour avec de nouvelles fonctionnalités.',
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                    read: false,
                    link: `/models/${subscriptions[0]?.modelId || 1}`
                }, {
                    id: 4,
                    type: 'ERROR',
                    title: 'Erreur API détectée',
                    message: 'Des erreurs ont été détectées dans vos appels API récents.',
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    read: false,
                    link: `/usage/models/${subscriptions[0]?.modelId || 1}`
                }];
                // Create mock activity feed
                const activity: ActivityItem[] = [{
                    id: 1,
                    type: 'MODEL_USAGE',
                    action: 'Utilisation',
                    target: 'ArabicBERT',
                    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    details: '250 appels API effectués'
                }, {
                    id: 2,
                    type: 'PAYMENT',
                    action: 'Paiement',
                    target: 'Facture INV-2024-0002',
                    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    details: 'Paiement de 3.25 TND effectué'
                }, {
                    id: 3,
                    type: 'SUBSCRIPTION',
                    action: 'Abonnement',
                    target: 'TunBERT',
                    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    details: 'Nouvel abonnement activé'
                }, {
                    id: 4,
                    type: 'SYSTEM',
                    action: 'Connexion',
                    target: 'Compte',
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    details: 'Connexion depuis un nouvel appareil'
                }, {
                    id: 5,
                    type: 'MODEL_USAGE',
                    action: 'Utilisation',
                    target: 'TunBERT',
                    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
                    details: '120 appels API effectués'
                }];
                // Calculate total stats
                const totalApiCalls = subscriptions.reduce((sum, sub) => sum + (sub.usageData?.apiCallsUsed || 0), 0);
                const activeSubscriptionsCount = subscriptions.filter(sub => sub.status === SubscriptionStatus.ACTIVE).length;
                const totalSpent = invoices.filter(inv => inv.status === 'PAID').reduce((sum, inv) => sum + inv.amount, 0);
                const data: UserDashboardData = {
                    user: {
                        id: 1,
                        name: 'Mohamed Ben Salem',
                        email: 'mohamed.bensalem@example.com',
                        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MBS'
                    },
                    subscriptions,
                    invoices,
                    notifications,
                    activity,
                    stats: {
                        totalApiCalls,
                        activeSubscriptions: activeSubscriptionsCount,
                        totalSpent,
                        currency: 'TND'
                    }
                };
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Une erreur est survenue lors du chargement des données du tableau de bord.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDashboardData();
    }, []);
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    const markNotificationAsRead = (notificationId: number) => {
        if (!dashboardData) return;
        const updatedNotifications = dashboardData.notifications.map(notification => notification.id === notificationId ? {
            ...notification,
            read: true
        } : notification);
        setDashboardData({
            ...dashboardData,
            notifications: updatedNotifications
        });
    };
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !dashboardData) {
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
        <UserDashboardHeader />
        <div className="flex">
            <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto max-w-7xl">
                    {activeTab === 'overview' && <div className="space-y-6">
                        <UserDashboardOverview stats={dashboardData.stats} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ActiveSubscriptionsWidget subscriptions={dashboardData.subscriptions.filter(sub => sub.status === SubscriptionStatus.ACTIVE)} />
                            <UsageStatsWidget subscriptions={dashboardData.subscriptions} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <RecentInvoicesWidget invoices={dashboardData.invoices} />
                            <ActivityFeedWidget activities={dashboardData.activity} />
                        </div>
                    </div>}
                    {activeTab === 'api-keys' && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <Key className="h-5 w-5 text-blue-600 mr-2" />
                            Gestion des clés API
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Gérez vos clés API pour accéder aux modèles auxquels vous êtes
                            abonné.
                        </p>
                        <div className="mt-4">
                            <Link to="/user/api-keys" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center">
                                Gérer mes clés API
                            </Link>
                        </div>
                    </div>}
                    {activeTab === 'subscriptions' && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6">Mes abonnements</h2>
                        <p className="text-gray-600 mb-4">
                            Gérez vos abonnements aux modèles AI+
                        </p>
                        <div className="mt-4">
                            <button onClick={() => navigate('/user/subscriptions')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Voir tous mes abonnements
                            </button>
                        </div>
                    </div>}
                    {activeTab === 'billing' && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6">Facturation</h2>
                        <p className="text-gray-600 mb-4">
                            Consultez vos factures et gérez vos méthodes de paiement
                        </p>
                        <div className="mt-4">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => navigate('/user/payment-methods')}>
                                Gérer mes méthodes de paiement
                            </button>
                        </div>
                    </div>}
                    {activeTab === 'usage' && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6">
                            Statistiques d'utilisation
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Consultez les statistiques d'utilisation de vos modèles
                        </p>
                        <div className="mt-4">
                            {dashboardData.subscriptions.map(subscription => <Link key={subscription.id} to={`/usage/models/${subscription.modelId}`} className="block mb-2 text-blue-600 hover:underline">
                                Statistiques pour {subscription.modelName}
                            </Link>)}
                        </div>
                    </div>}
                    {activeTab === 'notifications' && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6">Notifications</h2>
                        <NotificationsWidget notifications={dashboardData.notifications} onMarkAsRead={markNotificationAsRead} expanded={true} />
                    </div>}
                    {activeTab === 'settings' && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6">Paramètres du compte</h2>
                        <p className="text-gray-600 mb-4">
                            Gérez vos informations personnelles et les paramètres de
                            sécurité
                        </p>
                        <div className="mt-4">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Modifier mon profil
                            </button>
                        </div>
                    </div>}
                    {activeTab === 'datasets' && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6 flex items-center">
                            <Database className="h-5 w-5 text-blue-600 mr-2" />
                            Mes datasets
                        </h2>
                        <p className="text-gray-600 mb-4">Gérez vos datasets achetés</p>
                        <div className="mt-4">
                            <button onClick={() => navigate('/user/datasets')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Voir tous mes datasets
                            </button>
                        </div>
                    </div>}
                </div>
            </main>
        </div>
    </div>;
}