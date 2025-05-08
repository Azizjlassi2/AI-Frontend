import React, { useState } from 'react';
import { Search, X, Tag } from 'lucide-react';
interface ModelSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onModelSelect: (model: any) => void;
}
export function ModelSearchDialog({
  isOpen,
  onClose,
  onModelSelect
}: ModelSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const availableModels = [{
    id: 1,
    name: 'ArabicBERT',
    creator: 'AI Lab Tunisia',
    description: "Modèle BERT pour l'arabe",
    type: 'NLP',
    pricing: 'À partir de 99 DT/mois'
  }, {
    id: 2,
    name: 'TunVision',
    creator: 'Digital Tunisia',
    description: "Classification d'images",
    type: 'Computer Vision',
    pricing: 'À partir de 149 DT/mois'
  }, {
    id: 3,
    name: 'DialogFlow-TN',
    creator: 'TunAI Labs',
    description: 'Chatbot en dialecte tunisien',
    type: 'Conversation',
    pricing: 'À partir de 199 DT/mois'
  }];
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Déployer un nouveau modèle</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="text" placeholder="Rechercher un modèle..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {availableModels.map(model => <div key={model.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer" onClick={() => onModelSelect(model)}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {model.name}
                    </h3>
                    <p className="text-sm text-gray-500">{model.creator}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Tag className="h-3 w-3 mr-1" />
                    {model.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{model.description}</p>
                <p className="text-sm text-gray-500">{model.pricing}</p>
              </div>)}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Annuler
          </button>
        </div>
      </div>
    </div>;
}