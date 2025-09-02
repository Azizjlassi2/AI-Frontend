import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Database, MoreHorizontal } from 'lucide-react';
interface Dataset {
  id: number;
  name: string;
  purchases: number;
  purchasesTrend: number;
  downloads: number;
  downloadsTrend: number;
  revenue: number;
  revenueTrend: number;
}
export function DeveloperTopDatasetsTable() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  useEffect(() => {
    // In a real app, this would be an API call
    const mockDatasets: Dataset[] = [{
      id: 1,
      name: 'Tunisian Dialect Corpus',
      purchases: 450,
      purchasesTrend: 8.2,
      downloads: 2350,
      downloadsTrend: 5.7,
      revenue: 6750.25,
      revenueTrend: 7.8
    }, {
      id: 2,
      name: 'Medical Images 2024',
      purchases: 320,
      purchasesTrend: 15.3,
      downloads: 1850,
      downloadsTrend: 12.1,
      revenue: 4800.5,
      revenueTrend: 14.2
    }, {
      id: 3,
      name: 'StreetViews Tunis',
      purchases: 180,
      purchasesTrend: -2.1,
      downloads: 950,
      downloadsTrend: -1.5,
      revenue: 2700.0,
      revenueTrend: -1.8
    }, {
      id: 4,
      name: 'Tunisian Agricultural Drone Imagery',
      purchases: 120,
      purchasesTrend: 3.5,
      downloads: 580,
      downloadsTrend: 2.8,
      revenue: 1800.75,
      revenueTrend: 3.2
    }, {
      id: 5,
      name: 'Tunisian Speech Commands',
      purchases: 85,
      purchasesTrend: 5.8,
      downloads: 420,
      downloadsTrend: 4.2,
      revenue: 1275.0,
      revenueTrend: 5.5
    }];
    setDatasets(mockDatasets);
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
        <h2 className="text-lg font-semibold text-gray-900">Top Datasets</h2>
        <Link to="/developer/datasets" className="text-sm text-blue-600 hover:text-blue-800">
          Voir tous les datasets
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dataset
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Achats
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléchargements
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
            {datasets.map(dataset => <tr key={dataset.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                      <Database className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <Link to={`/developer/datasets/${dataset.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                        {dataset.name}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatNumber(dataset.purchases)}
                  </div>
                  <div className="flex items-center text-xs">
                    {dataset.purchasesTrend > 0 ? <>
                        <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-green-600">
                          +{dataset.purchasesTrend}%
                        </span>
                      </> : <>
                        <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-red-600">
                          {dataset.purchasesTrend}%
                        </span>
                      </>}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatNumber(dataset.downloads)}
                  </div>
                  <div className="flex items-center text-xs">
                    {dataset.downloadsTrend > 0 ? <>
                        <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-green-600">
                          +{dataset.downloadsTrend}%
                        </span>
                      </> : <>
                        <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-red-600">
                          {dataset.downloadsTrend}%
                        </span>
                      </>}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatCurrency(dataset.revenue)} TND
                  </div>
                  <div className="flex items-center text-xs">
                    {dataset.revenueTrend > 0 ? <>
                        <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-green-600">
                          +{dataset.revenueTrend}%
                        </span>
                      </> : <>
                        <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-red-600">
                          {dataset.revenueTrend}%
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