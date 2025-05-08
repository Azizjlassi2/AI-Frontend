import { AdminCard } from '../../components/admin/AdminCard'
import {
    Download,
    Send,
    Printer,
    Clock,
    CreditCard,
    Building,
    Phone,
    Mail,
    MapPin,
} from 'lucide-react'
import { DashboardHeader } from '../../components/admin/DashboardHeader'
import { DashboardSidebar } from '../../components/admin/DashboardSidebar'
export function InvoiceDetailPage() {
    const invoice = {
        id: 'INV-001',
        date: '15 Janvier 2024',
        dueDate: '14 Février 2024',
        status: 'Payée',
        amount: '2,500.00',
        tax: '475.00',
        total: '2,975.00',
        client: {
            name: 'TechCorp Tunisie',
            address: '123 Rue de la République',
            city: 'Tunis',
            postal: '1002',
            country: 'Tunisie',
            email: 'contact@techcorp.tn',
            phone: '+216 71 234 567',
        },
        items: [
            {
                description: 'Abonnement Premium - Plan Entreprise',
                quantity: 1,
                unitPrice: '2,000.00',
                total: '2,000.00',
            },
            {
                description: 'API Calls - Pack 100K',
                quantity: 1,
                unitPrice: '500.00',
                total: '500.00',
            },
        ],
    }
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <DashboardHeader />
            <div className="flex">
                <DashboardSidebar />
                <main className="flex-1 p-8">
                    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Facture #{invoice.id}</h1>
                            <div className="flex space-x-4">
                                <button className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                                    <Printer className="h-5 w-5 mr-2" />
                                    Imprimer
                                </button>
                                <button className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                                    <Download className="h-5 w-5 mr-2" />
                                    Télécharger
                                </button>
                                <button className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
                                    <Send className="h-5 w-5 mr-2" />
                                    Envoyer
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <AdminCard title="Détails de la Facture">
                                    <div className="space-y-6">
                                        {/* En-tête de la facture */}
                                        <div className="flex justify-between items-start pb-6 border-b border-gray-700">
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2">AI+</h3>
                                                <p className="text-gray-400">Plateforme tunisienne d'IA</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-400">Facture #{invoice.id}</p>
                                                <p className="text-gray-400">Date: {invoice.date}</p>
                                            </div>
                                        </div>
                                        {/* Informations client */}
                                        <div className="grid grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-400 mb-2">
                                                    FACTURÉ À
                                                </h4>
                                                <div className="space-y-2">
                                                    <p className="font-medium">{invoice.client.name}</p>
                                                    <p className="text-gray-400">{invoice.client.address}</p>
                                                    <p className="text-gray-400">
                                                        {invoice.client.city}, {invoice.client.postal}
                                                    </p>
                                                    <p className="text-gray-400">{invoice.client.country}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-400 mb-2">
                                                    DÉTAILS DE PAIEMENT
                                                </h4>
                                                <div className="space-y-2">
                                                    <p className="text-gray-400">
                                                        Date d'échéance: {invoice.dueDate}
                                                    </p>
                                                    <p className="text-gray-400">Méthode: Carte bancaire</p>
                                                    <p
                                                        className={`inline-flex px-2 py-1 rounded-full text-xs ${invoice.status === 'Payée' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}
                                                    >
                                                        {invoice.status}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Articles */}
                                        <div className="mt-8">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-left text-gray-400">
                                                        <th className="pb-4">Description</th>
                                                        <th className="pb-4">Qté</th>
                                                        <th className="pb-4">Prix unitaire</th>
                                                        <th className="pb-4 text-right">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-gray-300">
                                                    {invoice.items.map((item, index) => (
                                                        <tr key={index} className="border-t border-gray-700">
                                                            <td className="py-4">{item.description}</td>
                                                            <td className="py-4">{item.quantity}</td>
                                                            <td className="py-4">{item.unitPrice} DT</td>
                                                            <td className="py-4 text-right">{item.total} DT</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                                <tfoot>
                                                    <tr className="border-t border-gray-700">
                                                        <td colSpan={3} className="py-4 text-right">
                                                            Sous-total
                                                        </td>
                                                        <td className="py-4 text-right">{invoice.amount} DT</td>
                                                    </tr>
                                                    <tr className="border-t border-gray-700">
                                                        <td colSpan={3} className="py-4 text-right">
                                                            TVA (19%)
                                                        </td>
                                                        <td className="py-4 text-right">{invoice.tax} DT</td>
                                                    </tr>
                                                    <tr className="border-t border-gray-700 font-semibold">
                                                        <td colSpan={3} className="py-4 text-right">
                                                            Total
                                                        </td>
                                                        <td className="py-4 text-right">{invoice.total} DT</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </AdminCard>
                            </div>
                            <div className="space-y-6">
                                <AdminCard title="Informations Client">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Building className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-300">{invoice.client.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-300">{invoice.client.address}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-300">{invoice.client.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-300">{invoice.client.phone}</span>
                                        </div>
                                    </div>
                                </AdminCard>
                                <AdminCard title="Historique">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <CreditCard className="h-5 w-5 text-green-500 mr-3" />
                                            <div>
                                                <p className="text-sm">Paiement reçu</p>
                                                <p className="text-xs text-gray-400">15 Jan 2024, 14:30</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Send className="h-5 w-5 text-blue-500 mr-3" />
                                            <div>
                                                <p className="text-sm">Facture envoyée</p>
                                                <p className="text-xs text-gray-400">15 Jan 2024, 10:00</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                                            <div>
                                                <p className="text-sm">Facture créée</p>
                                                <p className="text-xs text-gray-400">15 Jan 2024, 09:45</p>
                                            </div>
                                        </div>
                                    </div>
                                </AdminCard>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}
