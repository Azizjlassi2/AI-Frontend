import React, { useState } from 'react';
import { BookOpen, Code, Zap, Shield, Terminal, FileText, CheckCircle, Copy, ChevronRight, Search, Book, Rocket, Settings, HelpCircle, Key, Database, Globe } from 'lucide-react';
export function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };
  const sections = [{
    id: 'getting-started',
    title: 'Démarrage rapide',
    icon: <Rocket className="h-5 w-5" />
  }, {
    id: 'authentication',
    title: 'Authentification',
    icon: <Key className="h-5 w-5" />
  }, {
    id: 'models',
    title: 'Utiliser les modèles',
    icon: <Code className="h-5 w-5" />
  }, {
    id: 'datasets',
    title: 'Accéder aux datasets',
    icon: <Database className="h-5 w-5" />
  }, {
    id: 'best-practices',
    title: 'Bonnes pratiques',
    icon: <CheckCircle className="h-5 w-5" />
  }, {
    id: 'faq',
    title: 'FAQ',
    icon: <HelpCircle className="h-5 w-5" />
  }];
  return <div className="min-h-screen bg-white">
    {/* Header */}
    <div className="pt-20 pb-12 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4">
          <BookOpen className="h-8 w-8 text-white mr-3" />
          <h1 className="text-4xl font-bold text-white">Documentation</h1>
        </div>
        <p className="text-xl text-blue-100 mb-6">
          Guides complets et ressources pour utiliser la plateforme AI+
        </p>
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Rechercher dans la documentation..." className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-4">
            <nav className="space-y-1">
              {sections.map(section => <button key={section.id} onClick={() => setActiveSection(section.id)} className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${activeSection === section.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                <span className={activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}>
                  {section.icon}
                </span>
                <span className="ml-3">{section.title}</span>
                {activeSection === section.id && <ChevronRight className="ml-auto h-4 w-4" />}
              </button>)}
            </nav>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          {/* Getting Started */}
          {activeSection === 'getting-started' && <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Démarrage rapide
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Commencez à utiliser AI+ en quelques minutes
              </p>
            </div>
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                  1
                </div>
                <h3 className="text-xl font-semibold">Créer un compte</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Inscrivez-vous gratuitement sur AI+ pour accéder à notre
                catalogue de modèles et datasets.
              </p>
              <a href="/login" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                Créer un compte
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                  2
                </div>
                <h3 className="text-xl font-semibold">
                  Obtenir une clé API
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Générez votre clé API depuis votre tableau de bord pour
                authentifier vos requêtes.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Exemple de clé API
                  </span>
                  <button onClick={() => copyToClipboard('ai_plus_sk_1234567890abcdef', 'api-key-example')} className="text-blue-600 hover:text-blue-800">
                    {copiedCode === 'api-key-example' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <code className="text-sm text-gray-800 font-mono">
                  ai_plus_sk_1234567890abcdef
                </code>
              </div>
            </div>
            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                  3
                </div>
                <h3 className="text-xl font-semibold">
                  Faire votre premier appel API
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Utilisez votre clé API pour effectuer votre première
                requête.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    Python
                  </span>
                  <button onClick={() => copyToClipboard(`import requests
url = "https://api.ai-tunisia.com/v1/models/arabicbert/predict"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "text": "مرحبا بكم في تونس"
}
response = requests.post(url, headers=headers, json=data)
print(response.json())`, 'first-call')} className="text-gray-400 hover:text-white">
                    {copiedCode === 'first-call' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="text-sm text-gray-100 font-mono">
                  {`import requests
url = "https://api.ai-tunisia.com/v1/models/arabicbert/predict"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "text": "مرحبا بكم في تونس"
}
response = requests.post(url, headers=headers, json=data)
print(response.json())`}
                </pre>
              </div>
            </div>
            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/api" className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <Code className="h-8 w-8 text-blue-600 mb-3" />
                <h4 className="font-semibold mb-2">API Reference</h4>
                <p className="text-sm text-gray-600">
                  Documentation complète de l'API
                </p>
              </a>
              <a href="/models" className="bg-green-50 border border-green-200 rounded-lg p-6 hover:border-green-300 transition-colors">
                <Zap className="h-8 w-8 text-green-600 mb-3" />
                <h4 className="font-semibold mb-2">Explorer les modèles</h4>
                <p className="text-sm text-gray-600">
                  Découvrez nos modèles d'IA
                </p>
              </a>
              <a href="/datasets" className="bg-purple-50 border border-purple-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                <Database className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold mb-2">Datasets</h4>
                <p className="text-sm text-gray-600">
                  Accédez à nos datasets
                </p>
              </a>
            </div>
          </div>}
          {/* Authentication */}
          {activeSection === 'authentication' && <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Authentification
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sécurisez vos requêtes avec notre système d'authentification
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Sécurité des clés API
                  </h3>
                  <p className="text-blue-800">
                    Ne partagez jamais vos clés API publiquement.
                    Stockez-les de manière sécurisée dans vos variables
                    d'environnement.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Obtenir une clé API
              </h3>
              <ol className="space-y-4">
                <li className="flex">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </span>
                  <div>
                    <p className="text-gray-800">
                      Connectez-vous à votre compte AI+
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </span>
                  <div>
                    <p className="text-gray-800">
                      Accédez à votre tableau de bord
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </span>
                  <div>
                    <p className="text-gray-800">
                      Cliquez sur "Clés API" dans le menu
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">
                    4
                  </span>
                  <div>
                    <p className="text-gray-800">
                      Cliquez sur "Générer une nouvelle clé"
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Utiliser votre clé API
              </h3>
              <p className="text-gray-600 mb-4">
                Incluez votre clé API dans l'en-tête Authorization de chaque
                requête:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    cURL
                  </span>
                  <button onClick={() => copyToClipboard(`curl -X POST https://api.ai-tunisia.com/v1/models/arabicbert/predict \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "مرحبا بكم"}'`, 'auth-curl')} className="text-gray-400 hover:text-white">
                    {copiedCode === 'auth-curl' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="text-sm text-gray-100 font-mono">
                  {`curl -X POST https://api.ai-tunisia.com/v1/models/arabicbert/predict \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "مرحبا بكم"}'`}
                </pre>
              </div>
            </div>
          </div>}
          {/* Models */}
          {activeSection === 'models' && <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Utiliser les modèles
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Intégrez nos modèles d'IA dans vos applications
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Structure de base d'une requête
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    JavaScript
                  </span>
                  <button onClick={() => copyToClipboard(`const response = await fetch('https://api.ai-tunisia.com/v1/models/MODEL_ID/predict', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Votre texte ici',
    options: {
      return_confidence: true
    }
  })
});
const data = await response.json();
console.log(data);`, 'model-request')} className="text-gray-400 hover:text-white">
                    {copiedCode === 'model-request' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="text-sm text-gray-100 font-mono">
                  {`const response = await fetch('https://api.ai-tunisia.com/v1/models/MODEL_ID/predict', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Votre texte ici',
    options: {
      return_confidence: true
    }
  })
});
const data = await response.json();
console.log(data);`}
                </pre>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Exemple: Analyse de sentiment
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    Python
                  </span>
                  <button onClick={() => copyToClipboard(`import requests
def analyze_sentiment(text):
    url = "https://api.ai-tunisia.com/v1/models/arabicbert/sentiment"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    data = {"text": text}
    response = requests.post(url, headers=headers, json=data)
    return response.json()
# Utilisation
result = analyze_sentiment("مرحبا بكم في تونس الخضراء")
print(f"Sentiment: {result['sentiment']}")
print(f"Confiance: {result['confidence']}")`, 'sentiment-example')} className="text-gray-400 hover:text-white">
                    {copiedCode === 'sentiment-example' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="text-sm text-gray-100 font-mono">
                  {`import requests
def analyze_sentiment(text):
    url = "https://api.ai-tunisia.com/v1/models/arabicbert/sentiment"
    headers = {
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
    data = {"text": text}
    response = requests.post(url, headers=headers, json=data)
    return response.json()
# Utilisation
result = analyze_sentiment("مرحبا بكم في تونس الخضراء")
print(f"Sentiment: {result['sentiment']}")
print(f"Confiance: {result['confidence']}")`}
                </pre>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Gestion des erreurs
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100 font-mono">
                  {`try:
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()
except requests.exceptions.HTTPError as e:
    if response.status_code == 401:
        print("Erreur d'authentification")
    elif response.status_code == 429:
        print("Limite de requêtes dépassée")
    else:
        print(f"Erreur HTTP: {e}")
except Exception as e:
    print(f"Erreur: {e}")`}
                </pre>
              </div>
            </div>
          </div>}
          {/* Datasets */}
          {activeSection === 'datasets' && <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Accéder aux datasets
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Téléchargez et utilisez nos datasets pour vos projets
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Télécharger un dataset
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100 font-mono">
                  {`import requests
def download_dataset(dataset_id, output_path):
    url = f"https://api.ai-tunisia.com/v1/datasets/{dataset_id}/download"
    headers = {"Authorization": "Bearer YOUR_API_KEY"}
    response = requests.get(url, headers=headers, stream=True)
    with open(output_path, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    print(f"Dataset téléchargé: {output_path}")
# Utilisation
download_dataset("tunisian-dialect-corpus", "dataset.zip")`}
                </pre>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Charger un dataset
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100 font-mono">
                  {`import pandas as pd
import json
# Charger un dataset JSON
with open('dataset.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
# Ou charger avec pandas
df = pd.read_json('dataset.json')
print(df.head())
# Pour les datasets CSV
df = pd.read_csv('dataset.csv')
print(df.info())`}
                </pre>
              </div>
            </div>
          </div>}
          {/* Best Practices */}
          {activeSection === 'best-practices' && <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bonnes pratiques
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Optimisez l'utilisation de la plateforme AI+
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Sécurité des clés
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Stockez les clés dans des variables d'environnement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Ne commitez jamais les clés dans Git</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Régénérez les clés compromises immédiatement
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Performance</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Utilisez le cache pour les requêtes répétitives
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Implémentez le traitement par batch</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Surveillez vos quotas d'API</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    Gestion des erreurs
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Implémentez des retry avec backoff exponentiel
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Loggez les erreurs pour le debugging</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Gérez les timeouts appropriés</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center mr-3">
                    <Settings className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Optimisation</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Prétraitez vos données avant l'envoi</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>
                      Utilisez la compression pour les gros payloads
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Choisissez le bon plan selon vos besoins</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>}
          {/* FAQ */}
          {activeSection === 'faq' && <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Réponses aux questions les plus courantes
              </p>
            </div>
            <div className="space-y-4">
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  Comment obtenir une clé API ?
                  <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Connectez-vous à votre compte, accédez à votre tableau de
                  bord, puis cliquez sur "Clés API" dans le menu. Vous
                  pourrez générer une nouvelle clé en quelques clics.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  Quelles sont les limites de l'offre gratuite ?
                  <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  L'offre gratuite inclut 1000 appels API par mois avec un
                  accès limité aux fonctionnalités. Pour des besoins plus
                  importants, consultez nos plans payants.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  Comment puis-je surveiller mon utilisation ?
                  <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Votre tableau de bord affiche en temps réel votre
                  utilisation des API, le nombre d'appels restants et vos
                  statistiques d'utilisation mensuelles.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  Les modèles sont-ils disponibles pour un usage commercial
                  ?
                  <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Oui, tous nos modèles peuvent être utilisés dans des
                  applications commerciales selon les termes de votre plan
                  d'abonnement. Consultez les conditions d'utilisation de
                  chaque modèle pour plus de détails.
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  Comment gérer les erreurs d'API ?
                  <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Implémentez toujours une gestion d'erreurs appropriée dans
                  votre code. Les codes d'erreur HTTP standards sont
                  utilisés (401 pour authentification, 429 pour limite
                  dépassée, etc.).
                </p>
              </details>
              <details className="bg-white border border-gray-200 rounded-xl p-6 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  Puis-je utiliser plusieurs modèles simultanément ?
                  <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-600">
                  Oui, vous pouvez souscrire à plusieurs modèles en même
                  temps. Chaque modèle a ses propres limites et tarifs selon
                  votre plan d'abonnement.
                </p>
              </details>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Besoin d'aide supplémentaire ?
              </h3>
              <p className="text-blue-800 mb-4">
                Notre équipe de support est là pour vous aider.
              </p>
              <a href="/contact" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                Contacter le support
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>}
        </main>
      </div>
    </div>
  </div>;
}