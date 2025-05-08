import React from 'react';
import { Database, Download, Star } from 'lucide-react';
const recentDatasets = [{
  name: 'TunisianCorpus-2023',
  creator: 'ANLP Lab',
  description: 'Large corpus de textes en dialecte tunisien',
  downloads: '2.3K',
  stars: 67,
  date: '2023-12-10'
}, {
  name: 'MedicalImages-X',
  creator: 'CHU Sfax',
  description: 'Images médicales annotées',
  downloads: '1.1K',
  stars: 41,
  date: '2023-12-09'
}, {
  name: 'ClimateData-TN',
  creator: 'INM',
  description: 'Données climatiques historiques',
  downloads: '890',
  stars: 34,
  date: '2023-12-08'
}];
export function RecentDatasets() {
  return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Datasets Récents</h2>
        <button className="text-sm text-blue-500 hover:text-blue-400">
          Voir tout
        </button>
      </div>
      <div className="space-y-4">
        {recentDatasets.map((dataset, index) => <div key={index} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/75 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Database className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{dataset.name}</h3>
                  <p className="text-sm text-gray-400">{dataset.creator}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {dataset.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  {dataset.downloads}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {dataset.stars}
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
}