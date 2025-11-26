import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, AlertTriangle, CheckCircle, XCircle, Download, BarChart2, Settings, Trash2, Save, Zap } from 'lucide-react';
import { BillingPeriod, Subscription, SubscriptionStatus } from '../../types/shared';
import { UserDashboardHeader } from './UserDashboardHeader';
import { UserDashboardSidebar } from './UserDashboardSidebar';
export function ClientSubscriptionSettingsPage() {
    const {
        subscriptionId
    } = useParams<{
        subscriptionId: string;
    }>();
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [autoRenew, setAutoRenew] = useState(true);
    const [usageAlerts, setUsageAlerts] = useState(true);
    const [usageAlertThreshold, setUsageAlertThreshold] = useState(80);
    const [billingEmails, setBillingEmails] = useState(true);
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);
    const [confirmCancel, setConfirmCancel] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchSubscription = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 500));
                // Get subscriptions from localStorage
                const subscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
                // const foundSubscription = subscriptions.find((sub: Subscription) => sub.id === parseInt(subscriptionId || '0'));

                setSubscription(subscriptions[0]);
                //setAutoRenew(foundSubscription.status === SubscriptionStatus.ACTIVE);
            } catch (error) {
                console.error('Error fetching subscription:', error);
                setError("Une erreur est survenue lors du chargement de l'abonnement");
            } finally {
                setLoading(false);
            }
        };
        if (subscriptionId) {
            fetchSubscription();
        }
    }, [subscriptionId]);
    const handleSaveSettings = () => {
        if (!subscription) return;
        // In a real app, this would be an API call
        setTimeout(() => {
            // Update subscription in localStorage
            const subscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
            const updatedSubscriptions = subscriptions.map((sub: Subscription) => {
                if (sub.id === subscription.id) {
                    return {
                        ...sub,
                        status: autoRenew ? SubscriptionStatus.ACTIVE : SubscriptionStatus.CANCELED
                    };
                }
                return sub;
            });
            localStorage.setItem('userSubscriptions', JSON.stringify(updatedSubscriptions));
            setSubscription({
                ...subscription,
                status: autoRenew ? SubscriptionStatus.ACTIVE : SubscriptionStatus.CANCELED
            });
            setSavedSuccessfully(true);
            setTimeout(() => setSavedSuccessfully(false), 3000);
        }, 600);
    };
    const handleCancelSubscription = () => {
        if (!subscription) return;
        // In a real app, this would be an API call
        setTimeout(() => {
            // Update subscription in localStorage
            const subscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
            const updatedSubscriptions = subscriptions.map((sub: Subscription) => {
                if (sub.id === subscription.id) {
                    return {
                        ...sub,
                        status: SubscriptionStatus.CANCELED
                    };
                }
                return sub;
            });
            localStorage.setItem('userSubscriptions', JSON.stringify(updatedSubscriptions));
            setSubscription({
                ...subscription,
                status: SubscriptionStatus.CANCELED
            });
            setAutoRenew(false);
            setConfirmCancel(false);
        }, 600);
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
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
    const getBillingPeriodText = (billingPeriod: BillingPeriod) => {
        switch (billingPeriod) {
            case BillingPeriod.MONTHLY:
                return 'Mensuel';
            case BillingPeriod.ANNUAL:
                return 'Annuel';
            case BillingPeriod.PAY_AS_YOU_GO:
                return 'Pay-as-you-go';
            default:
                return '';
        }
    };
    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !subscription) {
        return <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-3xl">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex flex-col items-center justify-center py-12">
                        <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
                        <p className="text-gray-600 mb-6">
                            {error || 'Abonnement non trouvé'}
                        </p>
                        <Link to="/user/subscriptions" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour aux abonnements
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
                <div className="container mx-auto max-w-3xl">
                    {savedSuccessfully && <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <p className="text-green-700">Paramètres enregistrés avec succès</p>
                    </div>}
                    <div className="mb-6">
                        <Link to="/client/subscriptions" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour aux abonnements
                        </Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center">
                                <Settings className="h-6 w-6 text-blue-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Paramètres d'abonnement
                                </h1>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-gray-200">
                                <div className="flex items-start mb-4 md:mb-0">
                                    <div className="mr-4">
                                        {getPlanIcon(subscription.billingPeriod)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {subscription.modelName}
                                        </h2>
                                        <p className="text-gray-600">
                                            {subscription.planName} (
                                            {getBillingPeriodText(subscription.billingPeriod)})
                                        </p>
                                        <div className="flex items-center mt-1">
                                            {subscription.status === SubscriptionStatus.ACTIVE ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Actif
                                            </span> : subscription.status === SubscriptionStatus.CANCELED ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <XCircle className="h-3 w-3 mr-1" />
                                                Annulé
                                            </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <XCircle className="h-3 w-3 mr-1" />
                                                Expiré
                                            </span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-gray-900">
                                        {subscription.billingPeriod === BillingPeriod.PAY_AS_YOU_GO ? `${subscription.price} ${subscription.currency}/appel` : `${subscription.price} ${subscription.currency}`}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {subscription.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO && (subscription.billingPeriod === BillingPeriod.MONTHLY ? 'par mois' : 'par an')}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Date de début: {formatDate(subscription.startDate)}
                                    </p>
                                    {subscription.status === SubscriptionStatus.ACTIVE && <p className="text-sm text-gray-500">
                                        Prochain paiement:{' '}
                                        {formatDate(subscription.nextBillingDate)}
                                    </p>}
                                </div>
                            </div>
                            <div className="space-y-6">
                                {subscription.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO && <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Paramètres de renouvellement
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="auto-renew" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" checked={autoRenew} onChange={e => setAutoRenew(e.target.checked)} disabled={subscription.status === SubscriptionStatus.EXPIRED} />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="auto-renew" className="font-medium text-gray-700">
                                                    Renouvellement automatique
                                                </label>
                                                <p className="text-gray-500">
                                                    Votre abonnement sera automatiquement renouvelé à la
                                                    fin de la période en cours.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Alertes d'utilisation
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-start mb-4">
                                            <div className="flex items-center h-5">
                                                <input id="usage-alerts" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" checked={usageAlerts} onChange={e => setUsageAlerts(e.target.checked)} />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="usage-alerts" className="font-medium text-gray-700">
                                                    Alertes d'utilisation
                                                </label>
                                                <p className="text-gray-500">
                                                    Recevez des notifications lorsque votre utilisation
                                                    atteint un certain seuil.
                                                </p>
                                            </div>
                                        </div>
                                        {usageAlerts && <div className="mt-4 pl-7">
                                            <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mb-1">
                                                Seuil d'alerte (%)
                                            </label>
                                            <select id="threshold" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" value={usageAlertThreshold} onChange={e => setUsageAlertThreshold(parseInt(e.target.value))}>
                                                <option value={50}>50%</option>
                                                <option value={70}>70%</option>
                                                <option value={80}>80%</option>
                                                <option value={90}>90%</option>
                                            </select>
                                        </div>}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Paramètres de notification
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="billing-emails" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" checked={billingEmails} onChange={e => setBillingEmails(e.target.checked)} />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="billing-emails" className="font-medium text-gray-700">
                                                    Emails de facturation
                                                </label>
                                                <p className="text-gray-500">
                                                    Recevez des emails concernant les factures, les
                                                    paiements et les reçus.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap justify-between items-center">
                                        <div className="flex space-x-4 mb-4 sm:mb-0">
                                            <Link to={`/usage/models/${subscription.modelId}`} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                                <BarChart2 className="h-4 w-4 mr-2" />
                                                Statistiques
                                            </Link>
                                            <Link to={`/billing/invoices/${subscription.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                                <Download className="h-4 w-4 mr-2" />
                                                Factures
                                            </Link>
                                        </div>
                                        <div className="flex space-x-4">
                                            <button type="button" onClick={() => setConfirmCancel(true)} className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50" disabled={subscription.status !== SubscriptionStatus.ACTIVE}>
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Annuler l'abonnement
                                            </button>
                                            <button type="button" onClick={handleSaveSettings} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                                <Save className="h-4 w-4 mr-2" />
                                                Enregistrer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cancel Confirmation Modal */}
                    {confirmCancel && <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setConfirmCancel(false)}></div>
                        <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
                            <div className="flex items-center justify-center mb-4">
                                <AlertTriangle className="h-12 w-12 text-red-500" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
                                Annuler l'abonnement ?
                            </h3>
                            <p className="text-sm text-gray-500 text-center mb-6">
                                Êtes-vous sûr de vouloir annuler votre abonnement à{' '}
                                {subscription.modelName} ? Vous aurez toujours accès jusqu'à la
                                fin de la période de facturation en cours.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => setConfirmCancel(false)}>
                                    Annuler
                                </button>
                                <button type="button" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700" onClick={handleCancelSubscription}>
                                    Confirmer l'annulation
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>
            </main>
        </div>
    </div>;
}