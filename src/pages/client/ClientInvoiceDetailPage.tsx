import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Download, Printer, ChevronLeft, Calendar, CreditCard, User, Building, CheckCircle, AlertCircle } from 'lucide-react';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';
enum BillingPeriod {
    MONTHLY = 'MONTHLY',
    ANNUAL = 'ANNUAL',
    PAY_AS_YOU_GO = 'PAY_AS_YOU_GO',
}
enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    PAYPAL = 'PAYPAL',
    FLOUCI = 'FLOUCI',
    KONNECT = 'KONNECT',
    BANK_TRANSFER = 'BANK_TRANSFER',
}
enum PaymentStatus {
    PAID = 'PAID',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}
interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
}
interface Invoice {
    id: string;
    number: string;
    date: string;
    dueDate: string;
    status: PaymentStatus;
    customerName: string;
    customerEmail: string;
    customerAddress: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    companyName: string;
    companyAddress: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    companyVatNumber?: string;
    items: InvoiceItem[];
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    total: number;
    currency: string;
    paymentMethod: PaymentMethod;
    notes?: string;
    modelName: string;
    planName: string;
    billingPeriod: BillingPeriod;
    subscriptionId: string;
}
export function ClientInvoiceDetailPage() {
    const {
        invoiceId
    } = useParams<{
        invoiceId: string;
    }>();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchInvoice = async () => {
            setIsLoading(true);
            try {
                // In a real app, fetch from an API
                // Simulating API call with timeout
                await new Promise(resolve => setTimeout(resolve, 800));
                // Mock data for invoice
                const mockInvoice: Invoice = {
                    id: invoiceId || 'INV-2024-0001',
                    number: 'INV-2024-0001',
                    date: '2024-01-15',
                    dueDate: '2024-01-15',
                    status: PaymentStatus.PAID,
                    customerName: 'Mohamed Ben Salem',
                    customerEmail: 'mohamed.bensalem@example.com',
                    customerAddress: {
                        street: '123 Rue de la République',
                        city: 'Tunis',
                        postalCode: '1002',
                        country: 'Tunisie'
                    },
                    companyName: 'AI+ Technologies',
                    companyAddress: {
                        street: '45 Avenue Habib Bourguiba',
                        city: 'Tunis',
                        postalCode: '1000',
                        country: 'Tunisie'
                    },
                    companyVatNumber: 'TN1234567890',
                    items: [{
                        description: 'Abonnement au modèle ArabicBERT - Plan Standard (Mensuel)',
                        quantity: 1,
                        unitPrice: 49.99,
                        amount: 49.99
                    }],
                    subtotal: 49.99,
                    taxRate: 19,
                    taxAmount: 9.5,
                    total: 59.49,
                    currency: 'TND',
                    paymentMethod: PaymentMethod.CREDIT_CARD,
                    notes: "Merci pour votre confiance. Votre abonnement est valable jusqu'au 15/02/2024.",
                    modelName: 'ArabicBERT',
                    planName: 'Plan Standard',
                    billingPeriod: BillingPeriod.MONTHLY,
                    subscriptionId: 'SUB-2024-0001'
                };
                setInvoice(mockInvoice);
            } catch (error) {
                console.error('Error fetching invoice:', error);
                setError('Une erreur est survenue lors du chargement de la facture.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchInvoice();
    }, [invoiceId]);

    const [activeTab, setActiveTab] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const formatCurrency = (amount: number, currency: string): string => {
        return `${amount.toFixed(2)} ${currency}`;
    };
    const getPaymentMethodLabel = (method: PaymentMethod): string => {
        switch (method) {
            case PaymentMethod.CREDIT_CARD:
                return 'Carte de crédit';
            case PaymentMethod.PAYPAL:
                return 'PayPal';
            case PaymentMethod.FLOUCI:
                return 'Flouci';
            case PaymentMethod.KONNECT:
                return 'Konnect';
            case PaymentMethod.BANK_TRANSFER:
                return 'Virement bancaire';
            default:
                return 'Autre';
        }
    };
    const getPaymentStatusLabel = (status: PaymentStatus): string => {
        switch (status) {
            case PaymentStatus.PAID:
                return 'Payée';
            case PaymentStatus.PENDING:
                return 'En attente';
            case PaymentStatus.FAILED:
                return 'Échouée';
            case PaymentStatus.REFUNDED:
                return 'Remboursée';
            default:
                return 'Inconnue';
        }
    };
    const getPaymentStatusColor = (status: PaymentStatus): string => {
        switch (status) {
            case PaymentStatus.PAID:
                return 'bg-green-100 text-green-800';
            case PaymentStatus.PENDING:
                return 'bg-yellow-100 text-yellow-800';
            case PaymentStatus.FAILED:
                return 'bg-red-100 text-red-800';
            case PaymentStatus.REFUNDED:
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getBillingPeriodLabel = (period: BillingPeriod): string => {
        switch (period) {
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
    const handlePrint = () => {
        window.print();
    };
    const handleDownloadPDF = () => {
        // In a real app, this would generate and download a PDF
        alert('Téléchargement de la facture en PDF...');
    };
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !invoice) {
        return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Facture non disponible
            </h1>
            <p className="text-gray-600 mb-6">
                {error || "La facture demandée n'est pas disponible."}
            </p>
            <Link to="/user/subscriptions" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Retour aux abonnements
            </Link>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 ">
        <UserDashboardHeader />
        <div className="flex">
            <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Actions bar */}
                    <div className="flex flex-wrap items-center justify-between mb-6 print:hidden">
                        <Link to="/client/subscriptions" className="flex items-center text-gray-600 hover:text-blue-600">
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            Retour aux abonnements
                        </Link>
                        <div className="flex space-x-3 mt-3 sm:mt-0">
                            <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                <Printer className="h-4 w-4 mr-2" />
                                Imprimer
                            </button>
                            <button onClick={handleDownloadPDF} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger PDF
                            </button>
                        </div>
                    </div>
                    {/* Invoice card */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden print:shadow-none">
                        {/* Invoice header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-wrap justify-between items-start">
                                <div>
                                    <div className="flex items-center mb-4">
                                        <FileText className="h-6 w-6 text-blue-600 mr-2" />
                                        <h1 className="text-2xl font-bold text-gray-900">Facture</h1>
                                    </div>
                                    <p className="text-gray-600 mb-1">
                                        Numéro:{' '}
                                        <span className="font-medium text-gray-900">
                                            {invoice.number}
                                        </span>
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        Date:{' '}
                                        <span className="font-medium text-gray-900">
                                            {formatDate(invoice.date)}
                                        </span>
                                    </p>
                                    <div className="mt-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(invoice.status)}`}>
                                            {invoice.status === PaymentStatus.PAID && <CheckCircle className="h-3 w-3 mr-1" />}
                                            {getPaymentStatusLabel(invoice.status)}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-0 text-right">
                                    <h2 className="text-xl font-bold text-blue-600">
                                        AI+ Technologies
                                    </h2>
                                    <p className="text-gray-600">{invoice.companyAddress.street}</p>
                                    <p className="text-gray-600">
                                        {invoice.companyAddress.postalCode}{' '}
                                        {invoice.companyAddress.city}
                                    </p>
                                    <p className="text-gray-600">
                                        {invoice.companyAddress.country}
                                    </p>
                                    {invoice.companyVatNumber && <p className="text-gray-600 mt-1">
                                        TVA: {invoice.companyVatNumber}
                                    </p>}
                                </div>
                            </div>
                        </div>
                        {/* Customer and subscription info */}
                        <div className="p-6 bg-gray-50 border-b border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                                        <User className="h-4 w-4 mr-1.5 text-gray-400" />
                                        Client
                                    </h3>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <p className="font-medium text-gray-900">
                                            {invoice.customerName}
                                        </p>
                                        <p className="text-gray-600">{invoice.customerEmail}</p>
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                            <p className="text-gray-600">
                                                {invoice.customerAddress.street}
                                            </p>
                                            <p className="text-gray-600">
                                                {invoice.customerAddress.postalCode}{' '}
                                                {invoice.customerAddress.city}
                                            </p>
                                            <p className="text-gray-600">
                                                {invoice.customerAddress.country}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                                        <CreditCard className="h-4 w-4 mr-1.5 text-gray-400" />
                                        Détails de l'abonnement
                                    </h3>
                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                        <p className="font-medium text-gray-900">
                                            {invoice.modelName}
                                        </p>
                                        <p className="text-gray-600">
                                            {invoice.planName} (
                                            {getBillingPeriodLabel(invoice.billingPeriod)})
                                        </p>
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                            <p className="text-gray-600 flex items-center">
                                                <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                                                Période: {formatDate(invoice.date)}
                                            </p>
                                            <p className="text-gray-600 flex items-center mt-1">
                                                <CreditCard className="h-4 w-4 mr-1.5 text-gray-400" />
                                                Méthode: {getPaymentMethodLabel(invoice.paymentMethod)}
                                            </p>
                                            <p className="text-gray-600 flex items-center mt-1">
                                                <Building className="h-4 w-4 mr-1.5 text-gray-400" />
                                                ID Abonnement: {invoice.subscriptionId}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Invoice items */}
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Détails de la facture
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                                                Description
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                                                Quantité
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                                                Prix unitaire
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                                                Montant
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {invoice.items.map((item, index) => <tr key={index}>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {item.description}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 text-right">
                                                {formatCurrency(item.unitPrice, invoice.currency)}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900 text-right">
                                                {formatCurrency(item.amount, invoice.currency)}
                                            </td>
                                        </tr>)}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={2} className="px-4 py-3"></td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right bg-gray-50">
                                                Sous-total
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right bg-gray-50">
                                                {formatCurrency(invoice.subtotal, invoice.currency)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className="px-4 py-3"></td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right bg-gray-50">
                                                TVA ({invoice.taxRate}%)
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right bg-gray-50">
                                                {formatCurrency(invoice.taxAmount, invoice.currency)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className="px-4 py-3"></td>
                                            <td className="px-4 py-3 text-base font-bold text-gray-900 text-right bg-gray-50">
                                                Total
                                            </td>
                                            <td className="px-4 py-3 text-base font-bold text-gray-900 text-right bg-gray-50">
                                                {formatCurrency(invoice.total, invoice.currency)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            {invoice.notes && <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Notes
                                </h4>
                                <p className="text-sm text-gray-600">{invoice.notes}</p>
                            </div>}
                        </div>
                        {/* Invoice footer */}
                        <div className="p-6 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
                            <p>Merci pour votre confiance.</p>
                            <p className="mt-1">
                                Pour toute question concernant cette facture, veuillez contacter{' '}
                                <a href="mailto:support@aiplus.tn" className="text-blue-600 hover:underline">
                                    support@aiplus.tn
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>;
}