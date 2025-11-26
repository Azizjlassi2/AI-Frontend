import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Code, Copy, Server, Terminal, Key, Lock, Shield, BookOpen, Check, AlertCircle, Clock } from 'lucide-react';
import { HttpMethod, ModelApiDoc, ApiEndpoint } from '../../types/shared';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';


export function ModelAPIDocPage() {
    const {
        modelId
    } = useParams<{
        modelId: string;
    }>();
    const [apiDoc, setApiDoc] = useState<ModelApiDoc | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('endpoints');
    const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [activeSideBarTab, setActiveSideBarTab] = useState("overview");


    useEffect(() => {
        const fetchApiDoc = async () => {
            setIsLoading(true);
            try {
                // In a real app, fetch from an API
                // Simulating API call with timeout
                await new Promise(resolve => setTimeout(resolve, 800));
                // Mock data for ArabicBERT model API
                const mockApiDoc: ModelApiDoc = {
                    id: parseInt(modelId || '1'),
                    name: 'ArabicBERT',
                    version: 'v2.1',
                    baseUrl: 'https://api.aiplus.tn/v1/models/arabicbert',
                    description: "API pour le modèle ArabicBERT optimisé pour l'analyse de textes en arabe.",
                    authType: 'API_KEY',
                    endpoints: [{
                        id: 'predict',
                        method: HttpMethod.POST,
                        path: '/predict',
                        description: 'Endpoint principal pour les prédictions textuelles.',
                        authentication: true,
                        requestBody: JSON.stringify({
                            text: 'مرحبا بكم في تونس',
                            options: {
                                return_probabilities: true
                            }
                        }, null, 2),
                        responseBody: JSON.stringify({
                            prediction: 'positive',
                            probabilities: {
                                positive: 0.92,
                                neutral: 0.06,
                                negative: 0.02
                            },
                            processing_time: '120ms'
                        }, null, 2),
                        errorResponse: JSON.stringify({
                            error: 'Invalid input format',
                            code: 'INPUT_ERROR',
                            status: 400
                        }, null, 2),
                        rateLimit: '100 requêtes par minute',
                        parameters: [{
                            name: 'text',
                            type: 'string',
                            required: true,
                            description: 'Le texte en arabe à analyser'
                        }, {
                            name: 'options.return_probabilities',
                            type: 'boolean',
                            required: false,
                            description: 'Si true, renvoie les probabilités pour chaque classe'
                        }]
                    }, {
                        id: 'batch-predict',
                        method: HttpMethod.POST,
                        path: '/batch-predict',
                        description: 'Traitement par lots pour analyser plusieurs textes en une seule requête.',
                        authentication: true,
                        requestBody: JSON.stringify({
                            texts: ['مرحبا بكم في تونس', 'الطقس جميل اليوم'],
                            options: {
                                return_probabilities: true
                            }
                        }, null, 2),
                        responseBody: JSON.stringify({
                            predictions: [{
                                text: 'مرحبا بكم في تونس',
                                prediction: 'positive',
                                probabilities: {
                                    positive: 0.92,
                                    neutral: 0.06,
                                    negative: 0.02
                                }
                            }, {
                                text: 'الطقس جميل اليوم',
                                prediction: 'positive',
                                probabilities: {
                                    positive: 0.95,
                                    neutral: 0.04,
                                    negative: 0.01
                                }
                            }],
                            processing_time: '280ms'
                        }, null, 2),
                        errorResponse: JSON.stringify({
                            error: 'Batch size exceeds limit',
                            code: 'BATCH_SIZE_ERROR',
                            status: 400
                        }, null, 2),
                        rateLimit: '20 requêtes par minute',
                        parameters: [{
                            name: 'texts',
                            type: 'array',
                            required: true,
                            description: 'Liste de textes en arabe à analyser'
                        }, {
                            name: 'options.return_probabilities',
                            type: 'boolean',
                            required: false,
                            description: 'Si true, renvoie les probabilités pour chaque classe'
                        }]
                    }, {
                        id: 'info',
                        method: HttpMethod.GET,
                        path: '/info',
                        description: 'Récupère les informations sur le modèle et ses capacités.',
                        authentication: true,
                        responseBody: JSON.stringify({
                            model: 'ArabicBERT',
                            version: '2.1.0',
                            language: 'Arabic',
                            capabilities: ['classification', 'ner', 'sentiment'],
                            training_data: {
                                source: 'Tunisian Dialect Corpus + Arabic Wikipedia',
                                size: '850M tokens'
                            }
                        }, null, 2),
                        errorResponse: JSON.stringify({
                            error: 'Service unavailable',
                            code: 'SERVICE_ERROR',
                            status: 503
                        }, null, 2),
                        rateLimit: '200 requêtes par minute'
                    }, {
                        id: 'embeddings',
                        method: HttpMethod.POST,
                        path: '/embeddings',
                        description: 'Génère des embeddings vectoriels pour le texte fourni.',
                        authentication: true,
                        requestBody: JSON.stringify({
                            text: 'مرحبا بكم في تونس',
                            options: {
                                pooling: 'mean'
                            }
                        }, null, 2),
                        responseBody: JSON.stringify({
                            embedding: [0.023, -0.045, 0.076, 0.124, -0.062, '...'],
                            dimensions: 768,
                            processing_time: '95ms'
                        }, null, 2),
                        errorResponse: JSON.stringify({
                            error: 'Text too long',
                            code: 'INPUT_ERROR',
                            status: 400
                        }, null, 2),
                        rateLimit: '50 requêtes par minute',
                        parameters: [{
                            name: 'text',
                            type: 'string',
                            required: true,
                            description: 'Le texte en arabe pour générer des embeddings'
                        }, {
                            name: 'options.pooling',
                            type: 'string',
                            required: false,
                            description: "Méthode de pooling: 'mean', 'max', ou 'cls'"
                        }]
                    }],
                    sdkExamples: [{
                        language: 'Python',
                        code: `import requests
API_KEY = "votre_clé_api"
API_URL = "https://api.aiplus.tn/v1/models/arabicbert/predict"
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}
data = {
    "text": "مرحبا بكم في تونس",
    "options": {
        "return_probabilities": True
    }
}
response = requests.post(API_URL, headers=headers, json=data)
result = response.json()
print(result)`
                    }, {
                        language: 'JavaScript',
                        code: `const analyzeText = async () => {
  const API_KEY = "votre_clé_api";
  const API_URL = "https://api.aiplus.tn/v1/models/arabicbert/predict";
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: "مرحبا بكم في تونس",
      options: {
        return_probabilities: true
      }
    })
  });
  const result = await response.json();
  console.log(result);
};
analyzeText();`
                    }, {
                        language: 'cURL',
                        code: `curl -X POST https://api.aiplus.tn/v1/models/arabicbert/predict \\
  -H "Authorization: Bearer votre_clé_api" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "مرحبا بكم في تونس",
    "options": {
      "return_probabilities": true
    }
  }'`
                    }]
                };
                setApiDoc(mockApiDoc);
                if (mockApiDoc.endpoints.length > 0) {
                    setSelectedEndpoint(mockApiDoc.endpoints[0].id);
                }
            } catch (error) {
                console.error('Error fetching API documentation:', error);
                setError('Une erreur est survenue lors du chargement de la documentation API.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchApiDoc();
    }, [modelId]);
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(label);
        setTimeout(() => setCopiedText(null), 2000);
    };
    const getMethodColor = (method: HttpMethod) => {
        switch (method) {
            case HttpMethod.GET:
                return 'bg-green-100 text-green-800';
            case HttpMethod.POST:
                return 'bg-blue-100 text-blue-800';
            case HttpMethod.PUT:
                return 'bg-yellow-100 text-yellow-800';
            case HttpMethod.DELETE:
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const selectedEndpointData = apiDoc?.endpoints.find(e => e.id === selectedEndpoint);
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !apiDoc) {
        return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Documentation non disponible
            </h1>
            <p className="text-gray-600 mb-6">
                {error || "La documentation API pour ce modèle n'est pas disponible."}
            </p>
            <button onClick={() => window.history.back()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Retour
            </button>
        </div>;
    }
    const handleSideBarTabChange = (tab: string) => {
        setActiveSideBarTab(tab)
    }


    return <div className="min-h-screen bg-gray-50 ">
        <UserDashboardHeader />
        <div className="flex">
            <UserDashboardSidebar activeTab={activeSideBarTab} onTabChange={handleSideBarTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                        <div className="bg-blue-600 p-6 text-white">
                            <div className="flex items-center">
                                <Server className="h-8 w-8 mr-3" />
                                <div>
                                    <h1 className="text-2xl font-bold">{apiDoc.name} API</h1>
                                    <p className="text-blue-100">
                                        Documentation version {apiDoc.version}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold mb-2">Aperçu</h2>
                            <p className="text-gray-700">{apiDoc.description}</p>
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <Code className="h-5 w-5 text-gray-500 mr-2" />
                                    <span className="font-mono text-sm">
                                        Base URL: {apiDoc.baseUrl}
                                    </span>
                                    <button className="ml-2 text-blue-600 hover:text-blue-800" onClick={() => copyToClipboard(apiDoc.baseUrl, 'baseUrl')}>
                                        {copiedText === 'baseUrl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-gray-200">
                            <nav className="flex overflow-x-auto">
                                <button className={`px-4 py-3 font-medium text-sm ${activeTab === 'endpoints' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('endpoints')}>
                                    Endpoints
                                </button>
                                <button className={`px-4 py-3 font-medium text-sm ${activeTab === 'authentication' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('authentication')}>
                                    Authentification
                                </button>
                                <button className={`px-4 py-3 font-medium text-sm ${activeTab === 'sdks' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('sdks')}>
                                    Exemples de code
                                </button>

                            </nav>
                        </div>
                        {activeTab === 'endpoints' && <div className="grid grid-cols-1 md:grid-cols-4">
                            <div className="md:col-span-1 border-r border-gray-200 p-4">
                                <h3 className="font-medium text-gray-700 mb-3">Endpoints</h3>
                                <ul className="space-y-2">
                                    {apiDoc.endpoints.map(endpoint => <li key={endpoint.id}>
                                        <button className={`w-full text-left px-3 py-2 rounded text-sm ${selectedEndpoint === endpoint.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`} onClick={() => setSelectedEndpoint(endpoint.id)}>
                                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded mr-2 ${getMethodColor(endpoint.method)}`}>
                                                {endpoint.method}
                                            </span>
                                            {endpoint.path}
                                        </button>
                                    </li>)}
                                </ul>
                            </div>
                            <div className="md:col-span-3 p-6">
                                {selectedEndpointData && <div>
                                    <div className="flex items-center mb-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded mr-2 ${getMethodColor(selectedEndpointData.method)}`}>
                                            {selectedEndpointData.method}
                                        </span>
                                        <h3 className="font-mono text-lg font-semibold">
                                            {apiDoc.baseUrl}
                                            {selectedEndpointData.path}
                                        </h3>
                                        <button className="ml-2 text-blue-600 hover:text-blue-800" onClick={() => copyToClipboard(`${apiDoc.baseUrl}${selectedEndpointData.path}`, 'endpointUrl')}>
                                            {copiedText === 'endpointUrl' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <p className="text-gray-700 mb-6">
                                        {selectedEndpointData.description}
                                    </p>
                                    {selectedEndpointData.parameters && selectedEndpointData.parameters.length > 0 && <div className="mb-6">
                                        <h4 className="font-medium text-gray-800 mb-3">
                                            Paramètres
                                        </h4>
                                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Nom
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Type
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Requis
                                                        </th>
                                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Description
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {selectedEndpointData.parameters.map((param, index) => <tr key={index}>
                                                        <td className="px-4 py-3 text-sm font-mono text-gray-900">
                                                            {param.name}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-500">
                                                            {param.type}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-500">
                                                            {param.required ? <span className="text-red-600">
                                                                Oui
                                                            </span> : <span className="text-gray-500">
                                                                Non
                                                            </span>}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm text-gray-500">
                                                            {param.description}
                                                        </td>
                                                    </tr>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {selectedEndpointData.requestBody && <div>
                                            <h4 className="font-medium text-gray-800 mb-3">
                                                Requête
                                            </h4>
                                            <div className="relative">
                                                <div className="absolute top-2 right-2">
                                                    <button className="text-gray-500 hover:text-blue-600" onClick={() => copyToClipboard(selectedEndpointData.requestBody!, 'requestBody')}>
                                                        {copiedText === 'requestBody' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                    {selectedEndpointData.requestBody}
                                                </pre>
                                            </div>
                                        </div>}
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-3">
                                                Réponse
                                            </h4>
                                            <div className="relative">
                                                <div className="absolute top-2 right-2">
                                                    <button className="text-gray-500 hover:text-blue-600" onClick={() => copyToClipboard(selectedEndpointData.responseBody, 'responseBody')}>
                                                        {copiedText === 'responseBody' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                                <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                    {selectedEndpointData.responseBody}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="font-medium text-gray-800 mb-3">
                                            Erreurs possibles
                                        </h4>
                                        <div className="relative">
                                            <div className="absolute top-2 right-2">
                                                <button className="text-gray-500 hover:text-blue-600" onClick={() => copyToClipboard(selectedEndpointData.errorResponse, 'errorResponse')}>
                                                    {copiedText === 'errorResponse' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                </button>
                                            </div>
                                            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                {selectedEndpointData.errorResponse}
                                            </pre>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>}
                        {activeTab === 'authentication' && <div className="p-6">
                            <div className="flex items-center mb-4">
                                <Key className="h-5 w-5 text-blue-600 mr-2" />
                                <h3 className="text-lg font-medium">Authentification</h3>
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-700 mb-4">
                                    Toutes les requêtes API nécessitent une authentification. Ce
                                    modèle utilise
                                    {apiDoc.authType === 'API_KEY' && " une clé API pour l'authentification."}
                                    {apiDoc.authType === 'OAUTH2' && " OAuth2 pour l'authentification."}
                                    {apiDoc.authType === 'BEARER_TOKEN' && " un jeton Bearer pour l'authentification."}
                                </p>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <Lock className="h-5 w-5 text-yellow-400" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                Gardez votre clé API secrète ! Ne partagez jamais votre
                                                clé API dans du code public ou des dépôts GitHub.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <h4 className="font-medium text-gray-800 mb-3">
                                    Comment s'authentifier
                                </h4>
                                {apiDoc.authType === 'API_KEY' && <div className="space-y-4">
                                    <p className="text-gray-700">
                                        Incluez votre clé API dans l'en-tête de chaque requête :
                                    </p>
                                    <div className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                        <code className="text-sm">
                                            Authorization: Bearer votre_clé_api
                                        </code>
                                    </div>
                                    <p className="text-gray-700 mt-4">
                                        Vous pouvez trouver votre clé API dans les paramètres de
                                        votre compte. Chaque abonnement à un modèle génère une clé
                                        API unique.
                                    </p>
                                </div>}
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-3">Sécurité</h4>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                                        <div>
                                            <h5 className="font-medium text-gray-800">
                                                Chiffrement TLS
                                            </h5>
                                            <p className="text-gray-600">
                                                Toutes les requêtes API doivent utiliser HTTPS.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                                        <div>
                                            <h5 className="font-medium text-gray-800">
                                                Rotation des clés
                                            </h5>
                                            <p className="text-gray-600">
                                                Vous pouvez générer de nouvelles clés API à tout moment
                                                depuis votre tableau de bord.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Shield className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                                        <div>
                                            <h5 className="font-medium text-gray-800">
                                                Journalisation d'accès
                                            </h5>
                                            <p className="text-gray-600">
                                                Toutes les requêtes API sont journalisées pour des
                                                raisons de sécurité et de facturation.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {activeTab === 'sdks' && <div className="p-6">
                            <div className="flex items-center mb-6">
                                <Terminal className="h-5 w-5 text-blue-600 mr-2" />
                                <h3 className="text-lg font-medium">Exemples de code</h3>
                            </div>
                            <div className="space-y-8">
                                {apiDoc.sdkExamples.map((example, index) => <div key={index}>
                                    <h4 className="font-medium text-gray-800 mb-3">
                                        {example.language}
                                    </h4>
                                    <div className="relative">
                                        <div className="absolute top-2 right-2">
                                            <button className="text-gray-500 hover:text-blue-600" onClick={() => copyToClipboard(example.code, `code-${index}`)}>
                                                {copiedText === `code-${index}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                            {example.code}
                                        </pre>
                                    </div>
                                </div>)}
                            </div>
                        </div>}

                    </div>
                </div>
            </main>
        </div>
    </div>;
}