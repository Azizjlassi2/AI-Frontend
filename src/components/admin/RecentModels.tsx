import React from 'react';
import { Bot, Download, Star } from 'lucide-react';
const recentModels = [{
  name: 'TunBERT-Large',
  creator: 'AI Lab Tunisia',
  description: 'Modèle de langage pour le dialecte tunisien',
  downloads: '1.2K',
  stars: 45,
  date: '2023-12-10'
}, {
  name: 'MedVision-X',
  creator: 'CHU Tunis',
  description: "Analyse d'images médicales",
  downloads: '890',
  stars: 32,
  date: '2023-12-09'
}, {
  name: 'AgriSense',
  creator: 'INRAT',
  description: 'Détection des maladies des cultures',
  downloads: '567',
  stars: 28,
  date: '2023-12-08'
}];
export function RecentModels() {
  return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Modèles Récents</h2>
        <button className="text-sm text-blue-500 hover:text-blue-400">
          Voir tout
        </button>
      </div>
      <div className="space-y-4">
        {recentModels.map((model, index) => <div key={index} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/75 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Bot className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{model.name}</h3>
                  <p className="text-sm text-gray-400">{model.creator}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {model.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  {model.downloads}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {model.stars}
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}