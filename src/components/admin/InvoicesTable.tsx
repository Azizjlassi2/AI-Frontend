import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
const invoices = [{
  id: 'INV-2023-001',
  client: 'Tech Solutions SA',
  amount: '2,500 DT',
  status: 'paid',
  date: '2023-12-10',
  type: 'Modèle API'
}, {
  id: 'INV-2023-002',
  client: 'Data Analytics Pro',
  amount: '1,800 DT',
  status: 'pending',
  date: '2023-12-09',
  type: 'Dataset License'
}, {
  id: 'INV-2023-003',
  client: 'AI Research Lab',
  amount: '3,200 DT',
  status: 'overdue',
  date: '2023-12-08',
  type: 'Custom Model'
}];
export function InvoicesTable() {
  return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Factures</h2>
          <p className="text-sm text-gray-400">Dernières transactions</p>
        </div>
        <button className="text-sm text-blue-500 hover:text-blue-400">
          Voir tout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-4">Facture</th>
              <th className="pb-4">Client</th>
              <th className="pb-4">Montant</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {invoices.map(invoice => <tr key={invoice.id} className="border-t border-gray-700">
                <td className="py-4 text-gray-300">{invoice.id}</td>
                <td className="py-4 text-gray-300">{invoice.client}</td>
                <td className="py-4 text-gray-300">{invoice.amount}</td>
                <td className="py-4 text-gray-300">{invoice.type}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4 text-gray-300">{invoice.date}</td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-300">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-300">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}