import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Search, Filter, ChevronDown, ChevronUp, Calendar, ArrowLeft, CheckCircle, AlertCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { Invoice } from '../../types/shared';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';


export function ClientInvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    // Filters and sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<string>('all');
    const [sortField, setSortField] = useState<'date' | 'amount'>('date');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 800));
                // Get subscriptions from localStorage to generate invoices
                const subscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
                // Generate mock invoices based on subscriptions
                const mockInvoices: Invoice[] = [];
                // Current date for reference
                const now = new Date();
                // For each subscription, generate multiple invoices
                subscriptions.forEach((subscription: any) => {
                    // Get subscription start date
                    const startDate = new Date(subscription.startDate);
                    // Generate monthly invoices from start date until now
                    const currentDate = new Date(startDate);
                    let invoiceNumber = 1;
                    while (currentDate <= now) {
                        // Create a paid invoice
                        mockInvoices.push({
                            id: `INV-${subscription.id}-${invoiceNumber.toString().padStart(3, '0')}`,
                            subscriptionId: subscription.id,
                            modelName: subscription.modelName,
                            planName: subscription.planName,
                            date: currentDate.toISOString(),
                            amount: subscription.price,
                            currency: subscription.currency,
                            status: 'PAID'
                        });
                        // Move to next month
                        currentDate.setMonth(currentDate.getMonth() + 1);
                        invoiceNumber++;
                    }
                    // Add a pending invoice for the next month
                    if (subscription.status === 'ACTIVE') {
                        mockInvoices.push({
                            id: `INV-${subscription.id}-${invoiceNumber.toString().padStart(3, '0')}`,
                            subscriptionId: subscription.id,
                            modelName: subscription.modelName,
                            planName: subscription.planName,
                            date: currentDate.toISOString(),
                            amount: subscription.price,
                            currency: subscription.currency,
                            status: 'PENDING'
                        });
                    }
                });
                // Add some random failed and refunded invoices for variety
                if (mockInvoices.length > 5) {
                    mockInvoices[2].status = 'FAILED';
                    mockInvoices[4].status = 'REFUNDED';
                }
                setInvoices(mockInvoices);
                setFilteredInvoices(mockInvoices);
            } catch (err) {
                console.error('Error fetching invoices:', err);
                setError('Une erreur est survenue lors du chargement des factures');
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);
    useEffect(() => {
        // Apply filters and sorting
        let result = [...invoices];
        // Apply search filter
        if (searchTerm) {
            result = result.filter(invoice => invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.modelName.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.planName.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        // Apply status filter
        if (statusFilter !== 'all') {
            result = result.filter(invoice => invoice.status === statusFilter);
        }
        // Apply date filter
        if (dateFilter !== 'all') {
            const now = new Date();
            const filterDate = new Date();
            switch (dateFilter) {
                case 'last30days':
                    filterDate.setDate(now.getDate() - 30);
                    result = result.filter(invoice => new Date(invoice.date) >= filterDate);
                    break;
                case 'last3months':
                    filterDate.setMonth(now.getMonth() - 3);
                    result = result.filter(invoice => new Date(invoice.date) >= filterDate);
                    break;
                case 'last6months':
                    filterDate.setMonth(now.getMonth() - 6);
                    result = result.filter(invoice => new Date(invoice.date) >= filterDate);
                    break;
                case 'lastyear':
                    filterDate.setFullYear(now.getFullYear() - 1);
                    result = result.filter(invoice => new Date(invoice.date) >= filterDate);
                    break;
            }
        }
        // Apply sorting
        result.sort((a, b) => {
            if (sortField === 'date') {
                return sortDirection === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
            } else {
                return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            }
        });
        setFilteredInvoices(result);
    }, [invoices, searchTerm, statusFilter, dateFilter, sortField, sortDirection]);
    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    // Toggle sort
    const toggleSort = (field: 'date' | 'amount') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };
    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PAID':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Payée
                </span>;
            case 'PENDING':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="h-3 w-3 mr-1" />
                    En attente
                </span>;
            case 'FAILED':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Échouée
                </span>;
            case 'REFUNDED':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Remboursée
                </span>;
            default:
                return null;
        }
    };
    // Handle invoice download
    const handleDownloadInvoice = (invoiceId: string) => {
        // In a real app, this would download the invoice
        alert(`Téléchargement de la facture ${invoiceId}`);
    };
    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error) {
        return <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex flex-col items-center justify-center py-12">
                        <AlertCircle className="h-16 w-16 text-red-500 mb-6" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link to="/user/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Retour au tableau de bord
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
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-6">
                        <Link to="/client/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour au tableau de bord
                        </Link>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center">
                                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                                <h1 className="text-2xl font-bold text-gray-900">Mes factures</h1>
                            </div>
                        </div>
                        <div className="p-6">
                            {/* Filters and search */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <div className="w-full md:w-auto relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input type="text" placeholder="Rechercher une facture..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-80" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <div>
                                        <select className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                                            <option value="all">Tous les statuts</option>
                                            <option value="PAID">Payées</option>
                                            <option value="PENDING">En attente</option>
                                            <option value="FAILED">Échouées</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg bg-white" value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
                                            <option value="all">Toutes les dates</option>
                                            <option value="last30days">30 derniers jours</option>
                                            <option value="last3months">3 derniers mois</option>
                                            <option value="last6months">6 derniers mois</option>
                                            <option value="lastyear">Année dernière</option>
                                        </select>
                                    </div>
                                    <button onClick={() => toggleSort('date')} className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Date
                                        {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
                                    </button>
                                </div>
                            </div>
                            {/* Invoices list */}
                            {filteredInvoices.length === 0 ? <div className="text-center py-12">
                                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                    Aucune facture trouvée
                                </h2>
                                <p className="text-gray-500 mb-6">
                                    Aucune facture ne correspond à vos critères de recherche.
                                </p>
                                <button onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                    setDateFilter('all');
                                }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Réinitialiser les filtres
                                </button>
                            </div> : <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Facture
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Montant
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Statut
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredInvoices.map(invoice => <tr key={invoice.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {invoice.id}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {invoice.modelName} - {invoice.planName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(invoice.date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {invoice.amount.toFixed(2)} {invoice.currency}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(invoice.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-3">
                                                    <Link to={`/client/invoices/${invoice.id}`} className="text-blue-600 hover:text-blue-900">
                                                        Voir
                                                    </Link>
                                                    <button onClick={() => handleDownloadInvoice(invoice.id)} className="text-blue-600 hover:text-blue-900 flex items-center" disabled={invoice.status === 'PENDING' || invoice.status === 'FAILED'}>
                                                        <Download className="h-4 w-4 mr-1" />
                                                        PDF
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>}
                            {/* Summary */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div className="text-sm text-gray-500 mb-4 md:mb-0">
                                        {filteredInvoices.length} facture
                                        {filteredInvoices.length > 1 ? 's' : ''} au total
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                                        <div className="text-sm font-medium">
                                            Total payé:{' '}
                                            <span className="text-gray-900">
                                                {filteredInvoices.filter(invoice => invoice.status === 'PAID').reduce((sum, invoice) => sum + invoice.amount, 0).toFixed(2)}{' '}
                                                {filteredInvoices[0]?.currency || 'TND'}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium">
                                            En attente:{' '}
                                            <span className="text-gray-900">
                                                {filteredInvoices.filter(invoice => invoice.status === 'PENDING').reduce((sum, invoice) => sum + invoice.amount, 0).toFixed(2)}{' '}
                                                {filteredInvoices[0]?.currency || 'TND'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>;
}