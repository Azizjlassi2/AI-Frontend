import React, { useState } from 'react';
import { Key, RefreshCw, Trash2, Copy, EyeOff, Eye } from 'lucide-react';
export function APIKeys() {
  const [showKey, setShowKey] = useState(false);
  const apiKeys = [{
    id: 1,
    name: 'Production',
    key: 'sk_live_123456789',
    created: '2024-01-15',
    lastUsed: '2024-01-20'
  }, {
    id: 2,
    name: 'Development',
    key: 'sk_test_987654321',
    created: '2024-01-10',
    lastUsed: '2024-01-19'
  }];
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Clés API</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
          <Key className="h-4 w-4 mr-2" />
          Générer une nouvelle clé
        </button>
      </div>
      <div className="space-y-4">
        {apiKeys.map(apiKey => <div key={apiKey.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{apiKey.name}</h3>
                <div className="mt-1 flex items-center space-x-2">
                  <code className={`text-sm ${showKey ? 'text-gray-700' : 'text-gray-400'}`}>
                    {showKey ? apiKey.key : '••••••••••••••••'}
                  </code>
                  <button onClick={() => setShowKey(!showKey)} className="text-gray-400 hover:text-gray-600">
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button onClick={() => copyToClipboard(apiKey.key)} className="text-gray-400 hover:text-gray-600">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Créée le {apiKey.created} • Dernière utilisation{' '}
                  {apiKey.lastUsed}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600" title="Régénérer">
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600" title="Révoquer">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>)}
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          Sécurité des clés API
        </h4>
        <p className="text-sm text-blue-600">
          Ne partagez jamais vos clés API. En cas de compromission, révoquez
          immédiatement la clé concernée et générez-en une nouvelle.
        </p>
      </div>
    </div>;
}