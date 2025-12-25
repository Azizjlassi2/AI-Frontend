import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, CheckCircle, Clock, DollarSign, Calendar, CreditCard, FileText, AlertCircle } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
interface PayoutDetail {
    id: string;
    amount: number;
    currency: string;
    status: 'completed' | 'pending' | 'failed';
    requestedDate: string;
    completedDate?: string;
    method: {
        type: 'bank_account' | 'paypal';
        details: string;
    };
    fee: number;
    netAmount: number;
    transactionId?: string;
    description: string;
}
export function DeveloperPayoutDetailPage() {
    const {
        payoutId
    } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('payments');
    const [payout, setPayout] = useState<PayoutDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchPayoutDetail = async () => {
            setIsLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                // Mock data
                const mockPayout: PayoutDetail = {
                    id: payoutId || 'PAYOUT-2024-001',
                    amount: 1850.25,
                    currency: 'TND',
                    status: 'completed',
                    requestedDate: '2024-05-15T10:30:00Z',
                    completedDate: '2024-05-18T14:20:00Z',
                    method: {
                        type: 'bank_account',
                        details: 'Banque Nationale de Tunisie •••• 5678'
                    },
                    fee: 27.75,
                    netAmount: 1822.5,
                    transactionId: 'TXN-2024-ABC123',
                    description: 'Versement mensuel - Mai 2024'
                };
                setPayout(mockPayout);
            } catch (error) {
                console.error('Error fetching payout:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPayoutDetail();
    }, [payoutId]);
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Complété
                </span>;
            case 'pending':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="h-4 w-4 mr-1.5" />
                    En cours
                </span>;
            case 'failed':
                return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <AlertCircle className="h-4 w-4 mr-1.5" />
                    Échoué
                </span>;
            default:
                return null;
        }
    };
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('fr-FR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (!payout) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Versement introuvable
                </h2>
                <button onClick={() => navigate('/developer/payments')} className="text-blue-600 hover:text-blue-700">
                    Retour aux paiements
                </button>
            </div>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50">
        <DeveloperDashboardHeader />
        <div className="flex">
            <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <main className="flex-1 p-6">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-6">
                        <button onClick={() => navigate('/developer/payments')} className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors">
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Retour aux paiements
                        </button>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    Détails du versement
                                </h1>
                                <p className="text-gray-600">ID: {payout.id}</p>
                            </div>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger le reçu
                            </button>
                        </div>
                    </div>

                    {/* Status Card */}
                    <motion.div initial={{
                        opacity: 0,
                        y: 20
                    }} animate={{
                        opacity: 1,
                        y: 0
                    }} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Statut</h2>
                            {getStatusBadge(payout.status)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Montant brut</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {formatCurrency(payout.amount)} {payout.currency}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Frais</p>
                                <p className="text-xl font-semibold text-red-600">
                                    -{formatCurrency(payout.fee)} {payout.currency}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Montant net</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(payout.netAmount)} {payout.currency}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Details Card */}
                    <motion.div initial={{
                        opacity: 0,
                        y: 20
                    }} animate={{
                        opacity: 1,
                        y: 0
                    }} transition={{
                        delay: 0.1
                    }} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Informations du versement
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Date de demande</p>
                                    <p className="font-medium text-gray-900">
                                        {formatDate(payout.requestedDate)}
                                    </p>
                                </div>
                            </div>

                            {payout.completedDate && <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">
                                        Date de completion
                                    </p>
                                    <p className="font-medium text-gray-900">
                                        {formatDate(payout.completedDate)}
                                    </p>
                                </div>
                            </div>}

                            <div className="flex items-start">
                                <CreditCard className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Méthode de paiement</p>
                                    <p className="font-medium text-gray-900">
                                        {payout.method.type === 'bank_account' ? 'Compte bancaire' : 'PayPal'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {payout.method.details}
                                    </p>
                                </div>
                            </div>

                            {payout.transactionId && <div className="flex items-start">
                                <FileText className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">ID de transaction</p>
                                    <p className="font-medium text-gray-900 font-mono text-sm">
                                        {payout.transactionId}
                                    </p>
                                </div>
                            </div>}

                            <div className="flex items-start">
                                <DollarSign className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Description</p>
                                    <p className="font-medium text-gray-900">
                                        {payout.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <motion.div initial={{
                        opacity: 0,
                        y: 20
                    }} animate={{
                        opacity: 1,
                        y: 0
                    }} transition={{
                        delay: 0.2
                    }} className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Historique
                        </h2>

                        <div className="space-y-4">
                            <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                    {payout.status === 'completed' && <div className="w-0.5 h-full bg-green-200 mt-2"></div>}
                                </div>
                                <div className="flex-1 pb-4">
                                    <p className="font-medium text-gray-900">
                                        Versement demandé
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(payout.requestedDate)}
                                    </p>
                                </div>
                            </div>

                            {payout.status === 'completed' && payout.completedDate && <div className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        Versement complété
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(payout.completedDate)}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Le montant a été transféré sur votre compte
                                    </p>
                                </div>
                            </div>}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    </div>;
}