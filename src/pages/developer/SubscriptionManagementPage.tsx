import { Search, Tag, BadgeDollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export function SubscriptionManagementPage() {
    const subscriptions = [{
        id: 1,
        plan: "Pro",
        user: "MedTech Solutions",
        status: "active",
        startDate: "2024-03-15",
        revenue: "€49",
        usage: "2,340 appels/mois"
    }, {
        id: 2,
        plan: "Enterprise",
        user: "CHU Tunis",
        status: "pending",
        startDate: "2024-04-01",
        revenue: "€299",
        usage: "15,000 appels/mois"
    }];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center">
                            <BadgeDollarSign className="h-8 w-8 text-green-600 mr-3" />
                            Gestion des Abonnements
                        </h1>
                        <p className="text-gray-600 mt-2">MedTun-CXR - v2.1.0</p>
                    </div>
                    <Link
                        to="/subscriptions/new"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        + Nouveau Plan
                    </Link>
                </div>

                {/* Filtres */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher des abonnements..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <select className="border border-gray-300 rounded-lg px-4 py-2">
                            <option>Tous les statuts</option>
                            <option>Actif</option>
                            <option>En attente</option>
                            <option>Expiré</option>
                        </select>
                    </div>
                </div>

                {/* Liste des abonnements */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Plan</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Client</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Statut</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Utilisation</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Revenu</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {subscriptions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <Tag className="h-5 w-5 text-blue-600 mr-2" />
                                            {sub.plan}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{sub.user}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${sub.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{sub.usage}</td>
                                    <td className="px-6 py-4 font-medium">{sub.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}