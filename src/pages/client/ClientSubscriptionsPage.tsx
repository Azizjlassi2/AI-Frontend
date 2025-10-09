import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Calendar, Zap, Clock, AlertCircle, CheckCircle, XCircle, Settings, ArrowRight, BarChart, RefreshCw, Download, ChevronDown } from 'lucide-react';
import { BillingPeriod, SubscriptionStatus, Subscription } from '../../types/shared';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';

















export function ClientSubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedSubscription, setExpandedSubscription] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<string>('overview');


    // Format date to readable string
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
    // Format currency
    const formatCurrency = (amount: number, currency: string) => {
        return `${amount} ${currency}`;
    };
    // Toggle subscription details expansion
    const toggleSubscriptionDetails = (subscriptionId: number) => {
        if (expandedSubscription === subscriptionId) {
            setExpandedSubscription(null);
        } else {
            setExpandedSubscription(subscriptionId);
        }
    };
    // Get appropriate icon for plan
    const getPlanIcon = (billingPeriod: BillingPeriod) => {
        switch (billingPeriod) {
            case BillingPeriod.MONTHLY:
                return <Calendar className="h-5 w-5 text-blue-600" />;
            case BillingPeriod.ANNUAL:
                return <Calendar className="h-5 w-5 text-green-600" />;
            case BillingPeriod.PAY_AS_YOU_GO:
                return <Zap className="h-5 w-5 text-purple-600" />;
            default:
                return <CreditCard className="h-5 w-5 text-blue-600" />;
        }
    };
    // Get billing period text
    const getBillingPeriodText = (billingPeriod: BillingPeriod) => {
        switch (billingPeriod) {
            case BillingPeriod.MONTHLY:
                return 'Mensuel';
            case BillingPeriod.ANNUAL:
                return 'Annuel';
            case BillingPeriod.PAY_AS_YOU_GO:
                return 'Pay-as-you-use';
            default:
                return '';
        }
    };
    // Get status badge
    const getStatusBadge = (status: SubscriptionStatus) => {
        switch (status) {
            case SubscriptionStatus.ACTIVE:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Actif
                </span>;
            case SubscriptionStatus.CANCELED:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <XCircle className="h-3 w-3 mr-1" />
                    Annulé
                </span>;
            case SubscriptionStatus.EXPIRED:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <XCircle className="h-3 w-3 mr-1" />
                    Expiré
                </span>;
            case SubscriptionStatus.PENDING:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Clock className="h-3 w-3 mr-1" />
                    En attente
                </span>;
            default:
                return null;
        }
    };
    // Handle subscription cancellation
    const handleCancelSubscription = (subscriptionId: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir annuler cet abonnement ?')) {
            // In a real app, you would make an API call to cancel the subscription
            const updatedSubscriptions = subscriptions.map(sub => sub.id === subscriptionId ? {
                ...sub,
                status: SubscriptionStatus.CANCELED
            } : sub);
            setSubscriptions(updatedSubscriptions);
            localStorage.setItem('userSubscriptions', JSON.stringify(updatedSubscriptions));
        }
    };
    // Handle subscription renewal
    const handleRenewSubscription = (subscriptionId: number) => {
        // In a real app, you would make an API call to renew the subscription
        const updatedSubscriptions = subscriptions.map(sub => {
            if (sub.id === subscriptionId) {
                const nextBillingDate = new Date();
                if (sub.billingPeriod === BillingPeriod.MONTHLY) {
                    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
                } else if (sub.billingPeriod === BillingPeriod.ANNUAL) {
                    nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
                }
                return {
                    ...sub,
                    status: SubscriptionStatus.ACTIVE,
                    nextBillingDate: nextBillingDate.toISOString()
                };
            }
            return sub;
        });
        setSubscriptions(updatedSubscriptions);
        localStorage.setItem('userSubscriptions', JSON.stringify(updatedSubscriptions));
    };
    // Calculate usage percentage
    const calculateUsagePercentage = (used: number, limit?: number) => {
        if (!limit) return 0;
        const percentage = used / limit * 100;
        return Math.min(percentage, 100); // Cap at 100%
    };
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    useEffect(() => {
        const fetchSubscriptions = async () => {
            setIsLoading(true);
            try {
                // In a real app, you would fetch subscriptions from your API
                // Here we're getting them from localStorage
                const storedSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
                // Add mock data if none exists
                if (storedSubscriptions.length === 0) {
                    const mockSubscriptions: Subscription[] = [{
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
                            lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
                        }
                    }, {
                        id: 123457,
                        modelId: 2,
                        modelName: 'TunBERT',
                        planId: 4,
                        planName: 'Pay-As-You-Go',
                        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                        price: 0,
                        currency: 'TND',
                        billingPeriod: BillingPeriod.PAY_AS_YOU_GO,
                        nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                        status: SubscriptionStatus.ACTIVE,
                        usageData: {
                            apiCallsUsed: 3245,
                            lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
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
                            lastUsed: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() // 45 days ago
                        }
                    }];
                    setSubscriptions(mockSubscriptions);
                    localStorage.setItem('userSubscriptions', JSON.stringify(mockSubscriptions));
                } else {
                    // Add status and usage data if not present (for backward compatibility)
                    const enhancedSubscriptions = storedSubscriptions.map((sub: Subscription) => {
                        if (!sub.status) {
                            const now = new Date();
                            const nextBillingDate = new Date(sub.nextBillingDate);
                            let status = SubscriptionStatus.ACTIVE;
                            if (nextBillingDate < now) {
                                status = SubscriptionStatus.EXPIRED;
                            }
                            return {
                                ...sub,
                                status,
                                usageData: {
                                    apiCallsUsed: Math.floor(Math.random() * (sub.billingPeriod === BillingPeriod.PAY_AS_YOU_GO ? 5000 : 50000)),
                                    apiCallsLimit: sub.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO ? sub.billingPeriod === BillingPeriod.MONTHLY ? 50000 : 1000000 : undefined,
                                    lastUsed: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString()
                                }
                            };
                        }
                        return sub;
                    });
                    setSubscriptions(enhancedSubscriptions);
                }
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
                setError('Une erreur est survenue lors du chargement de vos abonnements');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSubscriptions();
    }, []);
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error) {
        return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Réessayer
            </button>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 ">
        <UserDashboardHeader />
        <div className="flex">
            <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h1 className="text-2xl font-bold mb-6 flex items-center">
                            <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                            Mes abonnements
                        </h1>
                        {subscriptions.length === 0 ? <div className="text-center py-12">
                            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                                <CreditCard className="h-16 w-16" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Aucun abonnement actif
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Vous n'avez pas encore souscrit à un abonnement pour un modèle
                                AI.
                            </p>
                            <Link to="/models" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center">
                                Explorer les modèles <ArrowRight className="h-4 w-4 ml-2" />
                            </Link>
                        </div> : <div className="space-y-6">
                            {subscriptions.map(subscription => <div key={subscription.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                {/* Subscription header */}
                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                    <div className="flex flex-wrap items-center justify-between">
                                        <div className="flex items-center mb-2 md:mb-0">
                                            <div className="mr-4">
                                                {getPlanIcon(subscription.billingPeriod)}
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold">
                                                    {subscription.modelName}
                                                </h2>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <span>{subscription.planName}</span>
                                                    <span className="mx-1">•</span>
                                                    <span>
                                                        {getBillingPeriodText(subscription.billingPeriod)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {getStatusBadge(subscription.status!)}
                                            <button onClick={() => toggleSubscriptionDetails(subscription.id)} className="ml-4 text-gray-500 hover:text-gray-700">
                                                <ChevronDown className={`h-5 w-5 transition-transform ${expandedSubscription === subscription.id ? 'transform rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Expanded details */}
                                {expandedSubscription === subscription.id && <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        {/* Billing information */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-3">
                                                Informations de facturation
                                            </h3>
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">
                                                        Date de début:
                                                    </span>{' '}
                                                    {formatDate(subscription.startDate)}
                                                </p>
                                                {subscription.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO && <p className="text-sm text-gray-700">
                                                    <span className="font-medium">
                                                        Prochain paiement:
                                                    </span>{' '}
                                                    {subscription.status === SubscriptionStatus.EXPIRED ? 'Abonnement expiré' : formatDate(subscription.nextBillingDate)}
                                                </p>}
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">Prix:</span>{' '}
                                                    {subscription.billingPeriod === BillingPeriod.PAY_AS_YOU_GO ? `${subscription.price} ${subscription.currency}/appel` : `${formatCurrency(subscription.price, subscription.currency)}/${subscription.billingPeriod === BillingPeriod.MONTHLY ? 'mois' : 'an'}`}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Usage information */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-3">
                                                Utilisation
                                            </h3>
                                            {subscription.usageData && <div className="space-y-3">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-medium">
                                                        Appels API utilisés:
                                                    </span>{' '}
                                                    {subscription.usageData.apiCallsUsed.toLocaleString()}
                                                    {subscription.usageData.apiCallsLimit && <span>
                                                        {' '}
                                                        sur{' '}
                                                        {subscription.usageData.apiCallsLimit.toLocaleString()}
                                                    </span>}
                                                </p>
                                                {subscription.usageData.apiCallsLimit && <div>
                                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div className={`h-full ${calculateUsagePercentage(subscription.usageData.apiCallsUsed, subscription.usageData.apiCallsLimit) > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{
                                                            width: `${calculateUsagePercentage(subscription.usageData.apiCallsUsed, subscription.usageData.apiCallsLimit)}%`
                                                        }}></div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {calculateUsagePercentage(subscription.usageData.apiCallsUsed, subscription.usageData.apiCallsLimit).toFixed(0)}
                                                        % utilisé
                                                    </p>
                                                </div>}
                                                {subscription.usageData.lastUsed && <p className="text-sm text-gray-700">
                                                    <span className="font-medium">
                                                        Dernière utilisation:
                                                    </span>{' '}
                                                    {formatDate(subscription.usageData.lastUsed)}
                                                </p>}
                                            </div>}
                                        </div>
                                        {/* Actions */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-3">
                                                Actions
                                            </h3>
                                            <div className="space-y-2">
                                                <Link to={`/models/${subscription.modelId}`} className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                                                    <ArrowRight className="h-4 w-4 mr-2" />
                                                    Accéder au modèle
                                                </Link>
                                                <Link to={`/docs/models/${subscription.modelId}`} className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                                                    <ArrowRight className="h-4 w-4 mr-2" />
                                                    Documentation API
                                                </Link>
                                                <Link to={`/client/models/${subscription.modelId}/usage`} className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                                                    <BarChart className="h-4 w-4 mr-2" />
                                                    Voir les statistiques d'utilisation
                                                </Link>
                                                {subscription.status === SubscriptionStatus.ACTIVE && <button onClick={() => handleCancelSubscription(subscription.id)} className="flex items-center text-red-600 hover:text-red-800 text-sm">
                                                    <XCircle className="h-4 w-4 mr-2" />
                                                    Annuler l'abonnement
                                                </button>}
                                                {(subscription.status === SubscriptionStatus.EXPIRED || subscription.status === SubscriptionStatus.CANCELED) && <button onClick={() => handleRenewSubscription(subscription.id)} className="flex items-center text-green-600 hover:text-green-800 text-sm">
                                                    <RefreshCw className="h-4 w-4 mr-2" />
                                                    Renouveler l'abonnement
                                                </button>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                        <Link to={`/billing/invoices/${subscription.id}`} className="px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                                            <Download className="h-3 w-3 mr-2" />
                                            Télécharger la facture
                                        </Link>
                                        <Link to={`/user/subscription/${subscription.id}/settings`} className="px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
                                            <Settings className="h-3 w-3 mr-2" />
                                            Paramètres
                                        </Link>
                                    </div>
                                </div>}
                            </div>)}
                        </div>}
                    </div>
                    {subscriptions.length > 0 && <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">Besoin d'aide ?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link to="/faq/subscriptions" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <h3 className="font-medium text-gray-800 mb-1">
                                    FAQ sur les abonnements
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Consultez nos questions fréquentes sur la gestion des
                                    abonnements.
                                </p>
                            </Link>
                            <Link to="/contact" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <h3 className="font-medium text-gray-800 mb-1">
                                    Contacter le support
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Besoin d'aide ? Notre équipe de support est là pour vous
                                    aider.
                                </p>
                            </Link>
                        </div>
                    </div>}
                </div>
            </main>
        </div>
    </div>;

}