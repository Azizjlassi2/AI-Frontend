import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Key, Copy, RefreshCw, Eye, EyeOff, AlertCircle, Shield, Clock, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { BillingPeriod, Subscription, SubscriptionStatus, ApiKey } from '../../types/shared';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export function ClientApiKeysManagementPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
    const [regeneratingKey, setRegeneratingKey] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const { token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // In a real app, fetch from an API
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/client/api-keys`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                const data = response.data.data;
                console.log(data)



                // Generate mock API keys based on subscriptions
                const mockApiKeys: ApiKey[] = data.map((key: any) => {


                    return {
                        id: `key_${key.id}`,
                        name: `${key?.subscription?.plan?.model?.name} API Key`,
                        key: key.key,
                        subscriptionId: key?.subscription.id,
                        modelId: key?.subscription?.plan?.model?.id,
                        modelName: key?.subscription?.plan?.model?.name,
                        planName: key?.subscription?.plan?.name,
                        created: key.createdAt,
                        status: key?.subscription?.status === SubscriptionStatus.ACTIVE ? 'active' : SubscriptionStatus.PENDING ? 'inactive' : 'revoked'
                    };
                });
                setApiKeys(mockApiKeys);
            } catch (error) {
                console.error('Error fetching API keys:', error);
                setError('Une erreur est survenue lors du chargement de vos clés API.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    const toggleKeyVisibility = (keyId: string) => {
        setVisibleKeys(prev => ({
            ...prev,
            [keyId]: !prev[keyId]
        }));
    };
    const copyToClipboard = (text: string, keyId: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setSuccessMessage(`Clé API copiée dans le presse-papiers`);
            setTimeout(() => setSuccessMessage(null), 3000);
        }).catch(err => {
            console.error('Erreur lors de la copie:', err);
        });
    };
    const regenerateApiKey = (keyId: string) => {
        setRegeneratingKey(keyId);
        // Simulate API call delay
        setTimeout(() => {
            const newRandomKey = `ai_${Array.from({
                length: 32
            }, () => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 62)]).join('')}`;
            setApiKeys(prevKeys => prevKeys.map(key => key.id === keyId ? {
                ...key,
                key: newRandomKey,
                created: new Date().toISOString()
            } : key));
            setRegeneratingKey(null);
            setSuccessMessage('Clé API régénérée avec succès');
            setTimeout(() => setSuccessMessage(null), 3000);
            // Ensure the new key is hidden by default
            setVisibleKeys(prev => ({
                ...prev,
                [keyId]: false
            }));
        }, 1000);
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    const formatRelativeTime = (dateString: string | null) => {
        if (!dateString) return 'Jamais';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 0) {
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            if (diffHours === 0) {
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
            }
            return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
        } else if (diffDays === 1) {
            return 'Hier';
        } else if (diffDays < 7) {
            return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
        } else {
            return formatDate(dateString);
        }
    };
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error) {
        return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Réessayer
            </button>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 ">
        <UserDashboardHeader />
        <div className="flex">
            <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    {successMessage && <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <p className="text-green-700">{successMessage}</p>
                    </div>}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <div className="flex items-center mb-6">
                            <Key className="h-6 w-6 text-blue-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">Clés API</h1>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                            <div className="flex">
                                <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-blue-800 mb-2">
                                        Informations sur les clés API
                                    </h3>
                                    <p className="text-blue-700 text-sm mb-2">
                                        Chaque modèle auquel vous êtes abonné possède sa propre clé
                                        API. Utilisez ces clés pour authentifier vos requêtes API.
                                    </p>
                                    <p className="text-blue-700 text-sm">
                                        <strong>Important :</strong> Traitez vos clés API comme des
                                        mots de passe. Ne les partagez pas publiquement et ne les
                                        exposez pas dans le code côté client.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {apiKeys.length === 0 ? <div className="text-center py-12">
                            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                                <Key className="h-16 w-16" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                Aucune clé API disponible
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Vous n'avez pas encore d'abonnements actifs pour générer des
                                clés API.
                            </p>
                            <Link to="/models" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center">
                                Explorer les modèles <ExternalLink className="h-4 w-4 ml-2" />
                            </Link>
                        </div> : <div className="space-y-6">
                            {apiKeys.map(apiKey => <div key={apiKey.id} className={`border ${apiKey.status === 'active' ? 'border-gray-200' : 'border-gray-200 bg-gray-50'} rounded-lg overflow-hidden`}>
                                <div className="p-6">
                                    <div className="flex flex-wrap items-center justify-between mb-4">
                                        <div className="flex items-center mb-2 md:mb-0">
                                            <div className="mr-3">
                                                <Key className={`h-5 w-5 ${apiKey.status === 'active' ? 'text-green-600' : 'text-gray-400'}`} />
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    {apiKey.name}
                                                </h2>
                                                <div className="flex flex-wrap items-center text-sm text-gray-600">
                                                    <span>{apiKey.modelName}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{apiKey.planName}</span>
                                                    {apiKey.status !== 'active' && <>
                                                        <span className="mx-2">•</span>
                                                        <span className="text-red-600 font-medium">
                                                            Inactive
                                                        </span>
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {apiKey.status === 'active' && <>
                                                <button onClick={() => copyToClipboard(apiKey.key, apiKey.id)} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center" title="Copier la clé API">
                                                    <Copy className="h-4 w-4 mr-1.5" />
                                                    Copier
                                                </button>
                                                <button onClick={() => regenerateApiKey(apiKey.id)} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center" disabled={regeneratingKey === apiKey.id} title="Régénérer la clé API">
                                                    <RefreshCw className={`h-4 w-4 mr-1.5 ${regeneratingKey === apiKey.id ? 'animate-spin' : ''}`} />
                                                    Régénérer
                                                </button>
                                            </>}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-md p-4 mb-4 font-mono text-sm relative">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 overflow-x-auto whitespace-nowrap">
                                                {visibleKeys[apiKey.id] ? apiKey.key : '•'.repeat(Math.min(40, apiKey.key.length))}
                                            </div>
                                            <button onClick={() => toggleKeyVisibility(apiKey.id)} className="ml-2 text-gray-500 hover:text-gray-700" title={visibleKeys[apiKey.id] ? 'Masquer la clé' : 'Afficher la clé'}>
                                                {visibleKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center">
                                            <Shield className="h-4 w-4 text-gray-500 mr-2" />
                                            <div>
                                                <span className="text-gray-500">Statut:</span>{' '}
                                                <span className={`font-medium ${apiKey.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {apiKey.status === 'active' ? 'Actif' : apiKey.status === 'inactive' ? 'Inactive' : 'Révoqué'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                                            <div>
                                                <span className="text-gray-500">Créée le:</span>{' '}
                                                <span className="font-medium">
                                                    {formatDate(apiKey.created)}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex flex-wrap gap-3">
                                            <Link to={`/client/docs/models/${apiKey.modelId}`} className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 flex items-center">
                                                Documentation API
                                            </Link>
                                            <Link to={`/client/models/${apiKey.modelId}/usage`} className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 flex items-center">
                                                Statistiques d'utilisation
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>)}
                        </div>}
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold mb-4">
                            Utilisation sécurisée des clés API
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                                    <Shield className="h-5 w-5 text-blue-600 mr-2" />
                                    Bonnes pratiques de sécurité
                                </h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>
                                        Ne partagez jamais vos clés API publiquement ou dans du code
                                        côté client
                                    </li>
                                    <li>Stockez vos clés API dans des variables d'environnement</li>
                                    <li>Régénérez vos clés API régulièrement</li>
                                    <li>Utilisez des restrictions d'IP lorsque c'est possible</li>
                                    <li>
                                        Surveillez l'utilisation de vos clés API pour détecter toute
                                        activité suspecte
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                                    <Info className="h-5 w-5 text-blue-600 mr-2" />
                                    Exemple d'utilisation
                                </h3>
                                <div className="bg-gray-900 text-gray-300 p-4 rounded-md font-mono text-sm overflow-x-auto">
                                    <pre>{`# Exemple avec Python
import requests
url = "https://api.aiplus.tn/v1/models/${apiKeys[0]?.modelId || 'model_id'}/predict"
headers = {
    "Authorization": "Bearer ${apiKeys[0]?.key || 'YOUR_API_KEY'}"
}
data = {
    "text": "Votre texte à analyser"
}
response = requests.post(url, headers=headers, json=data)
print(response.json())`}</pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div >;
}