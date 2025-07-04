import { Code, Wallet, UploadCloud, BarChart, Settings, FileText, Share2, Clock, Tag, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function DeveloperDashboardPage() {
    // Données de démonstration
    const models = [{
        id: 1,
        name: "MedTun-CXR",
        status: "En production",
        version: "v2.1.0",
        endpoints: [
            { env: "Production", url: "https://api.aiplus.tn/v1/medtun-cxr" },
            { env: "Production", url: "https://api.aiplus.tn/v2/medtun-cxr" }
        ],
        stats: {
            calls: "45K/mois",
            revenue: "€1,240",
            successRate: "99.2%"
        },
        subscriptions: [
            { plan: "Starter", price: "Gratuit", users: "150" },
            { plan: "Pro", price: "€49/mois", users: "23" }
        ]
    }];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* En-tête */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord développeur</h1>
                        <p className="text-gray-600">Gérez vos modèles, API et revenus</p>
                    </div>

                    <div className="flex justify-between items-center mb-8 ">
                        <Link
                            to={"/datasets/add"}
                            className="bg-blue-600 text-white px-6 py-2 mx-4 rounded-lg flex items-center hover:bg-blue-700"
                        >
                            <UploadCloud className="h-5 w-5 mr-2" />
                            Nouveau dataset
                        </Link>
                        <Link
                            to={"/models/add"}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-blue-700"
                        >
                            <UploadCloud className="h-5 w-5 mr-2" />
                            Nouveau modèle
                        </Link>
                    </div>
                </div>

                {/* Statistiques globales */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Code className="h-6 w-6 text-blue-600 mr-3" />
                            <div>
                                <div className="text-2xl font-bold">3</div>
                                <div className="text-sm text-gray-600">Modèles actifs</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Wallet className="h-6 w-6 text-green-600 mr-3" />
                            <div>
                                <div className="text-2xl font-bold">€2,450</div>
                                <div className="text-sm text-gray-600">Revenus 30j</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <BarChart className="h-6 w-6 text-purple-600 mr-3" />
                            <div>
                                <div className="text-2xl font-bold">1.2M</div>
                                <div className="text-sm text-gray-600">Appels API</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-center">
                            <Users className="h-6 w-6 text-orange-600 mr-3" />
                            <div>
                                <div className="text-2xl font-bold">173</div>
                                <div className="text-sm text-gray-600">Abonnés actifs</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gestion des modèles */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Vos modèles déployés</h2>
                        <div className="flex gap-2">
                            <button className="flex items-center text-gray-600 hover:text-blue-600">
                                <Settings className="h-5 w-5 mr-1" />
                                Paramètres
                            </button>
                        </div>
                    </div>

                    {models.map((model) => (
                        <div key={model.id} className="border rounded-lg p-6 mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <h3 className="text-lg font-semibold mr-4">{model.name}</h3>
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                            {model.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <Tag className="h-4 w-4 mr-2" />
                                        Version: {model.version}
                                    </div>


                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold mb-2">{model.stats.revenue}</div>
                                    <div className="text-sm text-gray-600">Revenus 30j</div>
                                </div>
                            </div>

                            {/* Statistiques et actions */}
                            <div className="grid md:grid-cols-3 gap-6 mt-6">
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-600 mb-1">Appels API</div>
                                    <div className="font-medium">{model.stats.calls}</div>
                                    <div className="text-sm text-green-600">▲ 12%</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded">
                                    <div className="text-sm text-gray-600 mb-1">Taux de succès</div>
                                    <div className="font-medium">{model.stats.successRate}</div>
                                    <div className="text-sm text-red-600">▼ 0.8%</div>
                                </div>
                                <div className="space-y-4">
                                    <Link to={`/models/${model.id}/subscriptions`} >
                                        <div className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-3">Gérer les abonnements</div>
                                    </Link>
                                    <Link to={`/models/${model.id}/docs`} >
                                        <div className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">Voir la documentation</div>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Monétisation */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Plans d'abonnement</h2>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <div className="font-medium">Starter</div>
                                        <div className="text-gray-600">Gratuit</div>
                                    </div>
                                    <div className="text-sm text-gray-600">150 utilisateurs</div>
                                </div>
                                <div className="text-sm text-gray-600">100 requêtes/mois</div>
                            </div>
                            <Link to={`/subscriptions/new`} className=" flex items-center justify-center w-full border-2 border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 ">
                                <p>+ Ajouter un plan</p>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Revenus</h2>
                        <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                            <span className="text-gray-500">Graphique des revenus (intégrez votre solution de graphique)</span>
                        </div>
                    </div>
                </div>

                {/* Documentation */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Documentation technique</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="border rounded-lg p-4 hover:bg-gray-50">
                            <FileText className="h-6 w-6 text-blue-600 mb-2" />
                            <div className="font-medium mb-2">Guide d'intégration API</div>
                            <p className="text-sm text-gray-600">Dernière mise à jour : 2 jours</p>
                        </div>
                        <div className="border rounded-lg p-4 hover:bg-gray-50">
                            <Share2 className="h-6 w-6 text-blue-600 mb-2" />
                            <div className="font-medium mb-2">Clés API</div>
                            <p className="text-sm text-gray-600">3 clés actives</p>
                        </div>
                        <div className="border rounded-lg p-4 hover:bg-gray-50">
                            <Clock className="h-6 w-6 text-blue-600 mb-2" />
                            <div className="font-medium mb-2">Historique des versions</div>
                            <p className="text-sm text-gray-600">5 versions publiées</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}