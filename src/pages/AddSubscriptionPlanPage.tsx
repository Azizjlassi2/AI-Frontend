import { BadgeDollarSign, Infinity, Hash, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function AddSubscriptionPlanPage() {
    const [plan, setPlan] = useState({
        name: '',
        price: '',
        type: 'recurring',
        requests: '',
        visibility: 'public'
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <h1 className="text-3xl font-bold flex items-center mb-8">
                        <BadgeDollarSign className="h-8 w-8 text-green-600 mr-3" />
                        Nouveau Plan d'Abonnement
                    </h1>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nom du Plan *</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                                value={plan.name}
                                onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Prix *</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2">€</span>
                                    <input
                                        type="number"
                                        required
                                        className="w-full pl-8 pr-4 py-2 border rounded-lg"
                                        value={plan.price}
                                        onChange={(e) => setPlan({ ...plan, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Type de Facturation</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={plan.type}
                                    onChange={(e) => setPlan({ ...plan, type: e.target.value })}
                                >
                                    <option value="recurring">Abonnement récurrent</option>
                                    <option value="one-time">Paiement unique</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Limite d'Appels *</label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="mr-2 p-2 border rounded-lg hover:bg-gray-50"
                                    onClick={() => setPlan({ ...plan, requests: 'unlimited' })}
                                >
                                    <Infinity className="h-5 w-5" />
                                </button>
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        required
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                                        placeholder="5000"
                                        value={plan.requests}
                                        onChange={(e) => setPlan({ ...plan, requests: e.target.value })}
                                    />
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Visibilité</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className={`p-4 rounded-lg border-2 flex items-center justify-center ${plan.visibility === 'public'
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    onClick={() => setPlan({ ...plan, visibility: 'public' })}
                                >
                                    <Eye className="h-5 w-5 mr-2" />
                                    Public
                                </button>
                                <button
                                    type="button"
                                    className={`p-4 rounded-lg border-2 flex items-center justify-center ${plan.visibility === 'private'
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    onClick={() => setPlan({ ...plan, visibility: 'private' })}
                                >
                                    <EyeOff className="h-5 w-5 mr-2" />
                                    Privé
                                </button>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                            >
                                Créer le Plan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}