import React, { useState } from 'react';
import { PlayCircle, StopCircle, BarChart2, Trash2 } from 'lucide-react';
import { ModelSearchDialog } from './ModelSearchDialog';
import { ModelDetailsDialog } from './ModelDetailsDialog';
export function ModelsList() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const models = [{
    id: 1,
    name: 'TunBERT v2',
    status: 'running',
    type: 'Language Model',
    lastDeployed: '2024-01-15',
    requests: '45K',
    latency: '120ms'
  }, {
    id: 2,
    name: 'ImageClassifier-Med',
    status: 'stopped',
    type: 'Computer Vision',
    lastDeployed: '2024-01-10',
    requests: '12K',
    latency: '200ms'
  }];
  const handleModelSelect = (model: any) => {
    // Handle model deployment logic here
    setIsSearchOpen(false);
  };
  const handleShowDetails = (model: any) => {
    setSelectedModel(model);
    setIsDetailsOpen(true);
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Modèles déployés
        </h2>
        <button onClick={() => setIsSearchOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Déployer un nouveau modèle
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dernier déploiement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requêtes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Latence
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {models.map(model => <tr key={model.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {model.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${model.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {model.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {model.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {model.lastDeployed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {model.requests}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {model.latency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {model.status === 'running' ? <button className="text-red-600 hover:text-red-900">
                        <StopCircle className="h-5 w-5" />
                      </button> : <button className="text-green-600 hover:text-green-900">
                        <PlayCircle className="h-5 w-5" />
                      </button>}
                    <button onClick={() => handleShowDetails(model)} className="text-blue-600 hover:text-blue-900">
                      <BarChart2 className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <ModelSearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onModelSelect={handleModelSelect} />
      <ModelDetailsDialog isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} model={selectedModel} />
    </div>;
}