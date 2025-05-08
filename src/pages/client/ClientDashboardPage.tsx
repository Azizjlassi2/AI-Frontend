import { Heart, Settings, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export function ClientDashboardPage() {
    const invoices = [
        { id: 1, model: "MedTun-CXR", subscription: "Pro", date: "2024-03-10", amount: "€49" },
        { id: 2, model: "VisionTun API", subscription: "Starter", date: "2024-03-05", amount: "€29" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord utilisateur</h1>
                        <p className="text-gray-600">Gérez vos achats, abonnements et paramètres.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <User className="h-6 w-6 text-blue-600 mr-3" />
                            <div>
                                <div className="text-2xl font-bold">John Doe</div>
                                <div className="text-sm text-gray-600">Utilisateur Premium</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Heart className="h-6 w-6 text-red-600 mr-3" />
                            <div>
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-sm text-gray-600">Modèles favoris</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <ShoppingCart className="h-6 w-6 text-green-600 mr-3" />
                            <div>
                                <div className="text-2xl font-bold">€78</div>
                                <div className="text-sm text-gray-600">Dépenses ce mois</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Settings className="h-6 w-6 text-gray-600 mr-3" />
                            <div>
                                <Link to="/settings" className="text-sm text-gray-600 hover:text-blue-600">Paramètres du compte</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Historique des achats</h2>
                    {invoices.map((invoice) => (
                        <div key={invoice.id} className="border-b py-4">
                            <div className="flex justify-between items-center">
                                <span>{invoice.model} ({invoice.subscription})</span>
                                <span>{invoice.date}</span>
                                <span className="text-green-600 font-medium">{invoice.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
