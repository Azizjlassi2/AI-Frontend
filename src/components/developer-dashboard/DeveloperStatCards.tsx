import React from 'react';
import { Database, Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Bot } from 'lucide-react';
interface DeveloperStatsProps {
  stats: {
    totalModels: number;
    totalDatasets: number;
    totalUsers: number;
    totalRevenue: number;
    currency: string;
    modelUsage: number;
    modelUsageTrend: number;
    datasetDownloads: number;
    datasetDownloadsTrend: number;
  };
}
export function DeveloperStatCards({
  stats
}: DeveloperStatsProps) {
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };
  const formatCurrency = (amount: number, currency: string): string => {
    return `${amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} ${currency}`;
  };
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Modèles</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {stats.totalModels}
          </p>
        </div>
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      <div className="flex items-center">
        <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
        <span className="text-gray-500 text-sm">
          {formatNumber(stats.modelUsage)} appels API
        </span>
        {stats.modelUsageTrend !== 0 && <div className="flex items-center ml-2">
          {stats.modelUsageTrend > 0 ? <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" /> : <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />}
          <span className={stats.modelUsageTrend > 0 ? 'text-green-600' : 'text-red-600'}>
            {Math.abs(stats.modelUsageTrend)}%
          </span>
        </div>}
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Datasets</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {stats.totalDatasets}
          </p>
        </div>
        <div className="p-2 bg-green-100 rounded-lg">
          <Database className="h-5 w-5 text-green-600" />
        </div>
      </div>
      <div className="flex items-center">
        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
        <span className="text-gray-500 text-sm">
          {formatNumber(stats.datasetDownloads)} téléchargements
        </span>
        {stats.datasetDownloadsTrend !== 0 && <div className="flex items-center ml-2">
          {stats.datasetDownloadsTrend > 0 ? <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" /> : <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />}
          <span className={stats.datasetDownloadsTrend > 0 ? 'text-green-600' : 'text-red-600'}>
            {Math.abs(stats.datasetDownloadsTrend)}%
          </span>
        </div>}
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Utilisateurs</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatNumber(stats.totalUsers)}
          </p>
        </div>
        <div className="p-2 bg-purple-100 rounded-lg">
          <Users className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      <div className="flex items-center">
        <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
        <span className="text-gray-500 text-sm">125 nouveaux ce mois</span>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Revenus</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(stats.totalRevenue, stats.currency)}
          </p>
        </div>
        <div className="p-2 bg-yellow-100 rounded-lg">
          <DollarSign className="h-5 w-5 text-yellow-600" />
        </div>
      </div>
      <div className="flex items-center">
        <TrendingUp className="h-4 w-4 text-yellow-600 mr-1" />
        <span className="text-gray-500 text-sm">+18.2% ce mois</span>
      </div>
    </div>
  </div>;
}