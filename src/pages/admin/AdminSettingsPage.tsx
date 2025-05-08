import React from 'react'
import { AdminCard } from '../../components/admin/AdminCard'
import {
    Bell,
    Shield,
    Database,
    Server,
    Mail,
    Globe,
    CreditCard,
    Users,
} from 'lucide-react'
export function AdminSettingsPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">Paramètres</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Paramètres Généraux */}
                <AdminCard title="Paramètres Généraux">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nom de la Plateforme
                            </label>
                            <input
                                type="text"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="AI+"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email de Contact
                            </label>
                            <input
                                type="email"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="contact@aiplus.tn"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Langue par Défaut
                            </label>
                            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100">
                                <option value="fr">Français</option>
                                <option value="ar">Arabe</option>
                                <option value="en">Anglais</option>
                            </select>
                        </div>
                    </div>
                </AdminCard>
                {/* Paramètres de Sécurité */}
                <AdminCard title="Paramètres de Sécurité">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Authentification à Deux Facteurs
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="bg-gray-700 border-gray-600 rounded"
                                    defaultChecked
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    Activer pour tous les administrateurs
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Session Timeout (minutes)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="30"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Politique de Mot de Passe
                            </label>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Minimum 8 caractères
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Au moins une majuscule
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Au moins un chiffre
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminCard>
                {/* Paramètres des Notifications */}
                <AdminCard title="Paramètres des Notifications">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Notifications Email
                            </label>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Nouveaux utilisateurs
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Nouveaux modèles
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Rapports de signalement
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Notifications Push
                            </label>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Activité suspecte
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="bg-gray-700 border-gray-600 rounded"
                                        defaultChecked
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Mises à jour système
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminCard>
                {/* Paramètres de Facturation */}
                <AdminCard title="Paramètres de Facturation">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Devise par Défaut
                            </label>
                            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100">
                                <option value="tnd">TND - Dinar Tunisien</option>
                                <option value="eur">EUR - Euro</option>
                                <option value="usd">USD - Dollar US</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                TVA (%)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="19"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Délai de Paiement (jours)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="30"
                            />
                        </div>
                    </div>
                </AdminCard>
                {/* Paramètres API */}
                <AdminCard title="Paramètres API">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Limite de Requêtes (/minute)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Taille Maximum de Requête (MB)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="10"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Timeout (secondes)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="30"
                            />
                        </div>
                    </div>
                </AdminCard>
                {/* Paramètres de Stockage */}
                <AdminCard title="Paramètres de Stockage">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Fournisseur de Stockage
                            </label>
                            <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100">
                                <option value="local">Stockage Local</option>
                                <option value="s3">Amazon S3</option>
                                <option value="gcs">Google Cloud Storage</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Politique de Rétention (jours)
                            </label>
                            <input
                                type="number"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100"
                                defaultValue="90"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Compression Automatique
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="bg-gray-700 border-gray-600 rounded"
                                    defaultChecked
                                />
                                <span className="ml-2 text-sm text-gray-300">
                                    Activer pour les fichiers supérieur à 100MB
                                </span>
                            </div>
                        </div>
                    </div>
                </AdminCard>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Sauvegarder les modifications
                </button>
            </div>
        </div>
    )
}
