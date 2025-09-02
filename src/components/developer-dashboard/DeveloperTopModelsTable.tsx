import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Bot } from 'lucide-react';
interface Model {
  id: number;
  name: string;
  users: number;
  usersTrend: number;
  apiCalls: number;
  apiCallsTrend: number;
  revenue: number;
  revenueTrend: number;
}
export function DeveloperTopModelsTable() {
  const [models, setModels] = useState<Model[]>([]);
  useEffect(() => {
    // In a real app, this would be an API call
    const mockModels: Model[] = [{
      id: 1,
      name: 'ArabicBERT',
      users: 1250,
      usersTrend: 12.5,
      apiCalls: 78500,
      apiCallsTrend: 8.3,
      revenue: 15250.75,
      revenueTrend: 10.2
    }, {
      id: 2,
      name: 'TunBERT',
      users: 850,
      usersTrend: 5.8,
      apiCalls: 42300,
      apiCallsTrend: -2.1,
      revenue: 8750.5,
      revenueTrend: 3.7
    }, {
      id: 3,
      name: 'MedicalVision AI',
      users: 320,
      usersTrend: 15.2,
      apiCalls: 18200,
      apiCallsTrend: 22.5,
      revenue: 4250.25,
      revenueTrend: 18.5
    }, {
      id: 4,
      name: 'TunisianNER',
      users: 180,
      usersTrend: -1.2,
      apiCalls: 9800,
      apiCallsTrend: -3.8,
      revenue: 2100.0,
      revenueTrend: -2.1
    }, {
      id: 5,
      name: 'SentimentAI',
      users: 145,
      usersTrend: 7.5,
      apiCalls: 7200,
      apiCallsTrend: 4.2,
      revenue: 1850.5,
      revenueTrend: 5.8
    }];
    setModels(mockModels);
  }, []);
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  return <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-900">Top Modèles</h2>
      <Link to="/developer/models" className="text-sm text-blue-600 hover:text-blue-800">
        Voir tous les modèles
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Modèle
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Utilisateurs
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Appels API
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenus
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {models.map(model => <tr key={model.id} className="hover:bg-gray-50">
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <Link to={`/developer/models/${model.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                    {model.name}
                  </Link>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {formatNumber(model.users)}
              </div>
              <div className="flex items-center text-xs">
                {model.usersTrend > 0 ? <>
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">
                    +{model.usersTrend}%
                  </span>
                </> : <>
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-600">
                    {model.usersTrend}%
                  </span>
                </>}
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {formatNumber(model.apiCalls)}
              </div>
              <div className="flex items-center text-xs">
                {model.apiCallsTrend > 0 ? <>
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">
                    +{model.apiCallsTrend}%
                  </span>
                </> : <>
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-600">
                    {model.apiCallsTrend}%
                  </span>
                </>}
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {formatCurrency(model.revenue)} TND
              </div>
              <div className="flex items-center text-xs">
                {model.revenueTrend > 0 ? <>
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">
                    +{model.revenueTrend}%
                  </span>
                </> : <>
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-600">
                    {model.revenueTrend}%
                  </span>
                </>}
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}