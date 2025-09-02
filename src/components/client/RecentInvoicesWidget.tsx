import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Invoice } from '../../pages/client/ClientDashboardPage';
interface RecentInvoicesWidgetProps {
  invoices: Invoice[];
}
export function RecentInvoicesWidget({
  invoices
}: RecentInvoicesWidgetProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Payée
        </span>;
      case 'PENDING':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          En attente
        </span>;
      case 'FAILED':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Échouée
        </span>;
      case 'REFUNDED':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          Remboursée
        </span>;
      default:
        return null;
    }
  };
  // Handle sort toggle
  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  // Filter and sort invoices
  const filteredAndSortedInvoices = invoices.filter(invoice => invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.modelName.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
  });
  // Toggle invoice details
  const toggleInvoiceDetails = (invoiceId: string) => {
    setExpandedInvoice(expandedInvoice === invoiceId ? null : invoiceId);
  };
  // Calculate total amount
  const totalAmount = invoices.filter(invoice => invoice.status === 'PAID').reduce((sum, invoice) => sum + invoice.amount, 0);
  return <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Factures récentes
        </h2>
        <Link to="/user/invoices" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
          Voir tout
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 mb-3">
        <div className="relative flex-grow max-w-xs">
          <input type="text" placeholder="Rechercher une facture..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => toggleSort('date')} className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Date
            {sortField === 'date' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
          </button>
          <button onClick={() => toggleSort('amount')} className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Montant
            {sortField === 'amount' && (sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />)}
          </button>
        </div>
      </div>
    </div>
    {filteredAndSortedInvoices.length === 0 ? <div className="p-6 text-center">
      <p className="text-gray-500">Aucune facture disponible</p>
    </div> : <div>
      <div className="overflow-x-auto">
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
            {filteredAndSortedInvoices.slice(0, 5).map(invoice => <Fragment key={invoice.id}>
              <tr className={`hover:bg-gray-50 cursor-pointer ${expandedInvoice === invoice.id ? 'bg-gray-50' : ''}`} onClick={() => toggleInvoiceDetails(invoice.id)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice.modelName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(invoice.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.amount.toFixed(2)} {invoice.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(invoice.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {expandedInvoice === invoice.id ? <ChevronUp className="h-4 w-4 inline-block ml-auto" /> : <ChevronDown className="h-4 w-4 inline-block ml-auto" />}
                </td>
              </tr>
              {/* Expanded invoice details */}
              {expandedInvoice === invoice.id && <tr className="bg-gray-50">
                <td colSpan={5} className="px-6 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Détails de la facture
                      </h4>
                      <p>
                        <span className="text-gray-500">
                          Abonnement:
                        </span>{' '}
                        {invoice.planName}
                      </p>
                      <p>
                        <span className="text-gray-500">Modèle:</span>{' '}
                        {invoice.modelName}
                      </p>
                      <p>
                        <span className="text-gray-500">Période:</span>{' '}
                        {formatDate(invoice.date)}
                      </p>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <div className="flex gap-2 mb-2">
                        <Link to={`/billing/invoices/${invoice.id}`} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={e => e.stopPropagation()}>
                          Voir les détails
                        </Link>
                        <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 flex items-center" onClick={e => {
                          e.stopPropagation();
                          alert(`Téléchargement de la facture ${invoice.id}`);
                        }}>
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </button>
                      </div>
                      {invoice.status === 'PENDING' && <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700" onClick={e => {
                        e.stopPropagation();
                        alert(`Paiement de la facture ${invoice.id}`);
                      }}>
                        Payer maintenant
                      </button>}
                    </div>
                  </div>
                </td>
              </tr>}
            </Fragment>)}
          </tbody>
        </table>
      </div>
      {/* Summary footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {invoices.length} facture{invoices.length > 1 ? 's' : ''} au
            total
          </div>
          <div className="text-sm font-medium">
            Total payé:{' '}
            <span className="text-gray-900">
              {totalAmount.toFixed(2)} {invoices[0]?.currency}
            </span>
          </div>
        </div>
      </div>
    </div>}
  </div>;
}