import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AlertTriangle, XCircle, CreditCard, RefreshCw, ArrowLeft, HelpCircle, ChevronRight } from 'lucide-react';
import { PaymentErrorInfo, PaymentErrorType } from '../../types/shared'
export function ModelPaymentErrorPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [errorInfo, setErrorInfo] = useState<PaymentErrorInfo | null>(null);
    useEffect(() => {
        const errorType = location.state?.errorType || PaymentErrorType.GENERIC_ERROR;
        // Get detailed information based on error type
        const errorDetails = getErrorDetails(errorType);
        setErrorInfo(errorDetails);
    }, [location]);
    // Function to get error details based on error type
    const getErrorDetails = (errorType: PaymentErrorType): PaymentErrorInfo => {
        switch (errorType) {
            case PaymentErrorType.CARD_DECLINED:
                return {
                    type: PaymentErrorType.CARD_DECLINED,
                    title: 'Carte refusée',
                    message: 'Votre carte a été refusée par votre banque. Cela peut être dû à des restrictions sur votre carte ou à une activité inhabituelle.',
                    suggestion: "Veuillez contacter votre banque pour plus d'informations ou essayer une autre méthode de paiement.",
                    actionLabel: 'Essayer une autre carte',
                    actionPath: '/checkout'
                };
            case PaymentErrorType.INSUFFICIENT_FUNDS:
                return {
                    type: PaymentErrorType.INSUFFICIENT_FUNDS,
                    title: 'Fonds insuffisants',
                    message: "La transaction n'a pas pu être traitée en raison de fonds insuffisants sur votre carte.",
                    suggestion: 'Veuillez vérifier votre solde ou utiliser une autre méthode de paiement.',
                    actionLabel: 'Essayer une autre méthode',
                    actionPath: '/checkout'
                };
            case PaymentErrorType.EXPIRED_CARD:
                return {
                    type: PaymentErrorType.EXPIRED_CARD,
                    title: 'Carte expirée',
                    message: 'La carte que vous avez utilisée est expirée.',
                    suggestion: 'Veuillez mettre à jour les informations de votre carte ou utiliser une autre méthode de paiement.',
                    actionLabel: 'Mettre à jour les informations',
                    actionPath: '/checkout'
                };
            case PaymentErrorType.INCORRECT_CVC:
                return {
                    type: PaymentErrorType.INCORRECT_CVC,
                    title: 'Code de sécurité incorrect',
                    message: 'Le code de sécurité (CVC) que vous avez saisi est incorrect.',
                    suggestion: 'Veuillez vérifier le code à 3 ou 4 chiffres au dos de votre carte et réessayer.',
                    actionLabel: 'Réessayer',
                    actionPath: '/checkout'
                };
            case PaymentErrorType.INCORRECT_ZIP:
                return {
                    type: PaymentErrorType.INCORRECT_ZIP,
                    title: 'Code postal incorrect',
                    message: 'Le code postal que vous avez saisi ne correspond pas à celui associé à votre carte.',
                    suggestion: 'Veuillez vérifier le code postal associé à votre carte et réessayer.',
                    actionLabel: 'Corriger les informations',
                    actionPath: '/checkout'
                };
            case PaymentErrorType.PROCESSING_ERROR:
                return {
                    type: PaymentErrorType.PROCESSING_ERROR,
                    title: 'Erreur de traitement',
                    message: "Une erreur s'est produite lors du traitement de votre paiement.",
                    suggestion: "Il s'agit généralement d'une erreur temporaire. Veuillez réessayer dans quelques instants.",
                    actionLabel: 'Réessayer',
                    actionPath: '/checkout'
                };
            case PaymentErrorType.NETWORK_ERROR:
                return {
                    type: PaymentErrorType.NETWORK_ERROR,
                    title: 'Erreur de connexion',
                    message: "Une erreur de connexion s'est produite lors du traitement de votre paiement.",
                    suggestion: 'Veuillez vérifier votre connexion internet et réessayer.',
                    actionLabel: 'Réessayer',
                    actionPath: '/checkout'
                };
            case PaymentErrorType.AUTHENTICATION_REQUIRED:
                return {
                    type: PaymentErrorType.AUTHENTICATION_REQUIRED,
                    title: 'Authentification requise',
                    message: 'Votre banque exige une authentification supplémentaire pour cette transaction.',
                    suggestion: "Veuillez suivre les instructions de votre banque pour compléter l'authentification.",
                    actionLabel: 'Authentifier le paiement',
                    actionPath: '/checkout/authenticate'
                };
            default:
                return {
                    type: PaymentErrorType.GENERIC_ERROR,
                    title: 'Erreur de paiement',
                    message: "Une erreur s'est produite lors du traitement de votre paiement.",
                    suggestion: 'Veuillez réessayer ou contacter notre service client si le problème persiste.',
                    actionLabel: 'Réessayer',
                    actionPath: '/checkout'
                };
        }
    };
    // Handle retry button click
    const handleRetry = () => {
        if (errorInfo) {
            navigate(errorInfo.actionPath);
        } else {
            navigate('/checkout');
        }
    };
    // Handle go back button click
    const handleGoBack = () => {
        navigate(-1);
    };
    if (!errorInfo) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Error header */}
                <div className="bg-red-500 p-6 text-white">
                    <div className="flex items-center">
                        <div className="bg-white rounded-full p-2 mr-4">
                            <XCircle className="h-8 w-8 text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Échec du paiement</h1>
                            <p className="text-red-100">{errorInfo.title}</p>
                        </div>
                    </div>
                </div>
                {/* Error details */}
                <div className="p-6">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{errorInfo.message}</p>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-lg font-semibold mb-4">
                        Que faire maintenant ?
                    </h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700">{errorInfo.suggestion}</p>
                            </div>
                        </div>
                        {errorInfo.type === PaymentErrorType.CARD_DECLINED && <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                                <HelpCircle className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700">
                                    Les cartes peuvent être refusées pour plusieurs raisons,
                                    notamment des restrictions géographiques, des limites de
                                    dépenses ou des problèmes de sécurité.
                                </p>
                            </div>
                        </div>}
                        {(errorInfo.type === PaymentErrorType.PROCESSING_ERROR || errorInfo.type === PaymentErrorType.NETWORK_ERROR) && <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                                <RefreshCw className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-gray-700">
                                    Cette erreur est souvent temporaire. Attendez quelques
                                    minutes avant de réessayer.
                                </p>
                            </div>
                        </div>}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleRetry} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-center">
                            {errorInfo.actionLabel}
                        </button>
                        <button onClick={handleGoBack} className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </button>
                    </div>
                </div>
                {/* Help section */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <h3 className="font-medium text-gray-900 mb-3">Besoin d'aide ?</h3>
                    <p className="text-gray-600 mb-4">
                        Si vous continuez à rencontrer des problèmes avec votre paiement,
                        notre équipe de support est là pour vous aider.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/contact" className="text-blue-600 hover:text-blue-800 flex items-center">
                            Contacter le support
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                        <Link to="/faq/payments" className="text-blue-600 hover:text-blue-800 flex items-center">
                            Consulter la FAQ sur les paiements
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}