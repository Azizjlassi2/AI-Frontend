import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Calendar, CreditCard, ChevronRight, Download, AlertCircle, Zap, FileText, Clock } from 'lucide-react';
import axios from 'axios';
import { SubscriptionDTO, BillingPeriod } from '../../types/shared';





export function ModelPaymentConfirmationPage() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const payment_ref = queryParams.get("payment_ref");
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState<SubscriptionDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // Format date to readable string
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    useEffect(() => {
        setIsLoading(true);

        const fetchSubscription = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/subscriptions/${payment_ref}`);
                const data = res.data.data;
                console.log(data)

                const mapped: SubscriptionDTO = {
                    id: data.id,
                    clientId: data.client.id,
                    clientWebsite: data.client.web_site,
                    clientBio: data.client.bio,
                    clientAddress: data.client.address,
                    clientCompany: data.client.company,


                    planId: data.plan.id,
                    planName: data.plan.name,
                    planDescription: data.plan.description,
                    planPrice: data.plan.price,
                    planCurrency: data.plan.currency,
                    billingPeriod: data.plan.billingPeriod,
                    apiCallsLimit: data.plan.apiCallsLimit,

                    modelId: data.plan.model.id,
                    modelName: data.plan.model.name,
                    modelDescription: data.plan.model.description,
                    modelCreatedAt: data.plan.model.createdAt,

                    paymentId: data.payment.id,
                    paymentTransactionId: data.payment.transactionId,
                    paymentOrderId: data.payment.orderId,
                    paymentAmount: data.payment.amount,
                    paymentCurrency: data.payment.currency,

                    startDate: data.startDate,
                    nextBillingDate: data.nextBillingDate,
                    status: data.status,
                    recurring: data.recurring,

                    message: res.data.message,
                    metadata: res.data.metadata,
                    success: res.data.success,
                    timestamp: res.data.timestamp,
                };

                setSubscription(mapped);
            } catch (err: any) {
                console.error(err);
                setError("Failed to load subscription");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubscription();
        localStorage.setItem("clientSubscriptions", JSON.stringify(subscription))
    }, [payment_ref]);



    // Get billing period text
    const getBillingPeriodText = (billingPeriod: BillingPeriod) => {
        switch (billingPeriod) {
            case BillingPeriod.MONTHLY:
                return 'Mensuel';
            case BillingPeriod.ANNUAL:
                return 'Annuel';

            default:
                return '';
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
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !subscription) {
        return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h1>
            <p className="text-gray-600 mb-6">
                {error || "Données d'abonnement introuvables"}
            </p>
            <button onClick={() => navigate('/models')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Explorer les modèles
            </button>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Success banner */}
                <div className="bg-green-500 p-6 text-white">
                    <div className="flex items-center">
                        <div className="bg-white rounded-full p-2 mr-4">
                            <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Paiement confirmé</h1>
                            <p className="text-green-100">
                                Votre abonnement est maintenant actif
                            </p>
                        </div>
                    </div>
                </div>
                {/* Confirmation details */}
                <div className="p-6">
                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Détails de l'abonnement
                        </h2>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-900">{subscription.modelName}</h3>

                                    <div className="mt-2 flex items-center">
                                        {getPlanIcon(subscription.billingPeriod)}
                                        <span className="ml-2 font-medium text-gray-800">
                                            {subscription.planName} ({getBillingPeriodText(subscription.billingPeriod)})
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-gray-900">
                                        {subscription.billingPeriod === BillingPeriod.PAY_AS_YOU_GO ? <>
                                            {subscription.apiCallsLimit} {subscription.planCurrency}
                                            <span className="text-sm font-normal text-gray-600">
                                                /appel
                                            </span>
                                        </> : <>
                                            {subscription.planPrice} {subscription.planCurrency}
                                            <span className="text-sm font-normal text-gray-600">
                                                /
                                                {subscription.billingPeriod === BillingPeriod.MONTHLY ? 'mois' : 'an'}
                                            </span>
                                        </>}
                                    </div>
                                    {subscription.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO && subscription.apiCallsLimit && <p className="text-sm text-gray-600 mt-1">
                                        {subscription.apiCallsLimit.toLocaleString()} appels API
                                        inclus
                                    </p>}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Informations de paiement
                                </h3>
                                <div className="space-y-1">
                                    <p className="flex items-center text-gray-800">
                                        <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                                        Carte se terminant par •••• 3456
                                    </p>
                                    <p className="flex items-center text-gray-800">
                                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                        Facture #{subscription.id}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">
                                    Détails de facturation
                                </h3>
                                <div className="space-y-1">
                                    <p className="flex items-center text-gray-800">
                                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                        Date de début: {formatDate(subscription.startDate)}
                                    </p>
                                    {subscription.nextBillingDate && subscription.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO && <p className="flex items-center text-gray-800">
                                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                        Prochaine facturation:{' '}
                                        {formatDate(subscription.nextBillingDate)}
                                    </p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-4">Prochaines étapes</h2>
                        <div className="space-y-4">
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                <h3 className="font-medium text-blue-800 mb-2">
                                    Accéder à votre modèle
                                </h3>
                                <p className="text-blue-700 mb-3">
                                    Vous pouvez maintenant utiliser {subscription.modelName} avec les
                                    limites et fonctionnalités de votre plan d'abonnement.
                                </p>
                                <Link to={`/client/models/${subscription.modelId}/usage`} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                                    Aller au modèle <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h3 className="font-medium text-gray-800 mb-2">
                                    Gérer vos abonnements
                                </h3>
                                <p className="text-gray-700 mb-3">
                                    Consultez et gérez tous vos abonnements actifs depuis votre
                                    tableau de bord.
                                </p>
                                <Link to="/client/subscriptions" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                                    Gérer les abonnements{' '}
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <Link to="/models" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-center">
                            Explorer d'autres modèles
                        </Link>
                        <button onClick={() => window.print()} className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center">
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger le reçu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}