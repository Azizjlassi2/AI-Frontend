import React, { useEffect, useState } from 'react';
import { BarChart2, Calendar, Download, Filter, RefreshCw, Info, Users, DollarSign, TrendingUp, MapPin, Globe, Database } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
interface AnalyticsData {
  revenue: {
    daily: {
      date: string;
      models: number;
      datasets: number;
      total: number;
    }[];
    byModel: {
      name: string;
      value: number;
      percentage: number;
    }[];
    byDataset: {
      name: string;
      value: number;
      percentage: number;
    }[];
  };
  users: {
    total: number;
    trend: number;
    daily: {
      date: string;
      value: number;
    }[];
    byCountry: {
      country: string;
      value: number;
      percentage: number;
    }[];
  };
  usage: {
    apiCalls: {
      total: number;
      trend: number;
      daily: {
        date: string;
        value: number;
      }[];
      byModel: {
        name: string;
        value: number;
        percentage: number;
      }[];
    };
    downloads: {
      total: number;
      trend: number;
      daily: {
        date: string;
        value: number;
      }[];
      byDataset: {
        name: string;
        value: number;
        percentage: number;
      }[];
    };
  };
}
export function DeveloperAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'users' | 'apiCalls' | 'downloads'>('revenue');
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Generate mock data based on date range
        const mockData = generateMockAnalyticsData(dateRange);
        setAnalyticsData(mockData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalyticsData();
  }, [dateRange]);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleDateRangeChange = (range: '7d' | '30d' | '90d' | 'all') => {
    setDateRange(range);
  };
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // In a real app, this would re-fetch the data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = generateMockAnalyticsData(dateRange);
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };
  // Generate mock analytics data
  const generateMockAnalyticsData = (range: '7d' | '30d' | '90d' | 'all'): AnalyticsData => {
    const daysToGenerate = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 180;
    const dailyRevenue = [];
    const dailyUsers = [];
    const dailyApiCalls = [];
    const dailyDownloads = [];
    const now = new Date();
    let totalRevenue = 0;
    let totalApiCalls = 0;
    let totalDownloads = 0;
    for (let i = daysToGenerate - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      // Generate revenue data with some randomness
      const modelsRevenue = Math.round(200 + Math.random() * 300);
      const datasetsRevenue = Math.round(50 + Math.random() * 150);
      const totalDailyRevenue = modelsRevenue + datasetsRevenue;
      totalRevenue += totalDailyRevenue;
      dailyRevenue.push({
        date: dateString,
        models: modelsRevenue,
        datasets: datasetsRevenue,
        total: totalDailyRevenue
      });
      // Generate users data
      const usersValue = Math.round(50 + Math.random() * 100);
      dailyUsers.push({
        date: dateString,
        value: usersValue
      });
      // Generate API calls data
      const apiCallsValue = Math.round(1000 + Math.random() * 2000);
      totalApiCalls += apiCallsValue;
      dailyApiCalls.push({
        date: dateString,
        value: apiCallsValue
      });
      // Generate downloads data
      const downloadsValue = Math.round(20 + Math.random() * 50);
      totalDownloads += downloadsValue;
      dailyDownloads.push({
        date: dateString,
        value: downloadsValue
      });
    }
    return {
      revenue: {
        daily: dailyRevenue,
        byModel: [{
          name: 'ArabicBERT',
          value: Math.round(totalRevenue * 0.35),
          percentage: 35
        }, {
          name: 'TunBERT',
          value: Math.round(totalRevenue * 0.25),
          percentage: 25
        }, {
          name: 'MedicalVision AI',
          value: Math.round(totalRevenue * 0.15),
          percentage: 15
        }, {
          name: 'TunisianNER',
          value: Math.round(totalRevenue * 0.1),
          percentage: 10
        }, {
          name: 'SentimentAI',
          value: Math.round(totalRevenue * 0.08),
          percentage: 8
        }, {
          name: 'Autres',
          value: Math.round(totalRevenue * 0.07),
          percentage: 7
        }],
        byDataset: [{
          name: 'Tunisian Dialect Corpus',
          value: Math.round(totalRevenue * 0.18),
          percentage: 18
        }, {
          name: 'Medical Images 2024',
          value: Math.round(totalRevenue * 0.12),
          percentage: 12
        }, {
          name: 'StreetViews Tunis',
          value: Math.round(totalRevenue * 0.08),
          percentage: 8
        }, {
          name: 'Tunisian Agricultural Drone Imagery',
          value: Math.round(totalRevenue * 0.05),
          percentage: 5
        }, {
          name: 'Tunisian Speech Commands',
          value: Math.round(totalRevenue * 0.04),
          percentage: 4
        }, {
          name: 'Autres',
          value: Math.round(totalRevenue * 0.03),
          percentage: 3
        }]
      },
      users: {
        total: dailyUsers.reduce((sum, day) => sum + day.value, 0),
        trend: 12.5,
        daily: dailyUsers,
        byCountry: [{
          country: 'Tunisie',
          value: 1250,
          percentage: 45
        }, {
          country: 'Algérie',
          value: 580,
          percentage: 21
        }, {
          country: 'Maroc',
          value: 420,
          percentage: 15
        }, {
          country: 'France',
          value: 250,
          percentage: 9
        }, {
          country: 'Égypte',
          value: 180,
          percentage: 6
        }, {
          country: 'Autres',
          value: 120,
          percentage: 4
        }]
      },
      usage: {
        apiCalls: {
          total: totalApiCalls,
          trend: 8.3,
          daily: dailyApiCalls,
          byModel: [{
            name: 'ArabicBERT',
            value: Math.round(totalApiCalls * 0.4),
            percentage: 40
          }, {
            name: 'TunBERT',
            value: Math.round(totalApiCalls * 0.3),
            percentage: 30
          }, {
            name: 'MedicalVision AI',
            value: Math.round(totalApiCalls * 0.15),
            percentage: 15
          }, {
            name: 'TunisianNER',
            value: Math.round(totalApiCalls * 0.08),
            percentage: 8
          }, {
            name: 'SentimentAI',
            value: Math.round(totalApiCalls * 0.05),
            percentage: 5
          }, {
            name: 'Autres',
            value: Math.round(totalApiCalls * 0.02),
            percentage: 2
          }]
        },
        downloads: {
          total: totalDownloads,
          trend: 5.7,
          daily: dailyDownloads,
          byDataset: [{
            name: 'Tunisian Dialect Corpus',
            value: Math.round(totalDownloads * 0.35),
            percentage: 35
          }, {
            name: 'Medical Images 2024',
            value: Math.round(totalDownloads * 0.25),
            percentage: 25
          }, {
            name: 'StreetViews Tunis',
            value: Math.round(totalDownloads * 0.2),
            percentage: 20
          }, {
            name: 'Tunisian Agricultural Drone Imagery',
            value: Math.round(totalDownloads * 0.1),
            percentage: 10
          }, {
            name: 'Tunisian Speech Commands',
            value: Math.round(totalDownloads * 0.08),
            percentage: 8
          }, {
            name: 'Autres',
            value: Math.round(totalDownloads * 0.02),
            percentage: 2
          }]
        }
      }
    };
  };
  // Custom tooltip for charts
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium text-gray-800">{formatDate(label)}</p>
        {payload.map((entry: any, index: number) => <p key={index} style={{
          color: entry.color
        }} className="text-sm">
          {entry.name}:{' '}
          {entry.dataKey === 'total' || entry.dataKey === 'models' || entry.dataKey === 'datasets' ? `${formatCurrency(entry.value)} TND` : formatNumber(entry.value)}
        </p>)}
      </div>;
    }
    return null;
  };
  // Colors for charts
  const COLORS = {
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    yellow: '#f59e0b',
    red: '#ef4444',
    pieColors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6b7280']
  };
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  if (!analyticsData) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <BarChart2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Données non disponibles
        </h2>
        <p className="text-gray-600">
          Impossible de charger les données d'analyse.
        </p>
      </div>
    </div>;
  }
  return <div className="min-h-screen bg-gray-50">
    <DeveloperDashboardHeader />
    <div className="flex">
      <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center">
              <BarChart2 className="h-6 w-6 text-blue-600 mr-2" />
              Analyses
            </h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white rounded-md border border-gray-200 shadow-sm">
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '7d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('7d')}>
                  7 jours
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '30d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('30d')}>
                  30 jours
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '90d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('90d')}>
                  90 jours
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('all')}>
                  Tout
                </button>
              </div>
              <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 flex items-center" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </button>
              <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 flex items-center">
                <Download className="h-4 w-4 mr-1.5" />
                Exporter
              </button>
            </div>
          </div>
          {/* Metric Selector */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className={`p-4 rounded-lg flex items-center justify-between ${selectedMetric === 'revenue' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => setSelectedMetric('revenue')}>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Revenus
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(analyticsData.revenue.daily.reduce((sum, day) => sum + day.total, 0))}{' '}
                      TND
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+14.2%</span>
                </div>
              </button>
              <button className={`p-4 rounded-lg flex items-center justify-between ${selectedMetric === 'users' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => setSelectedMetric('users')}>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Utilisateurs
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatNumber(analyticsData.users.total)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{analyticsData.users.trend}%</span>
                </div>
              </button>
              <button className={`p-4 rounded-lg flex items-center justify-between ${selectedMetric === 'apiCalls' ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => setSelectedMetric('apiCalls')}>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <div className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Appels API
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatNumber(analyticsData.usage.apiCalls.total)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{analyticsData.usage.apiCalls.trend}%</span>
                </div>
              </button>
              <button className={`p-4 rounded-lg flex items-center justify-between ${selectedMetric === 'downloads' ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => setSelectedMetric('downloads')}>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <Database className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Téléchargements
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatNumber(analyticsData.usage.downloads.total)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{analyticsData.usage.downloads.trend}%</span>
                </div>
              </button>
            </div>
          </div>
          {/* Main Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedMetric === 'revenue' && 'Revenus'}
                {selectedMetric === 'users' && 'Utilisateurs'}
                {selectedMetric === 'apiCalls' && 'Appels API'}
                {selectedMetric === 'downloads' && 'Téléchargements'}
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <Info className="h-4 w-4 mr-1" />
                <span>
                  {selectedMetric === 'revenue' && 'Revenus totaux par jour'}
                  {selectedMetric === 'users' && 'Nouveaux utilisateurs par jour'}
                  {selectedMetric === 'apiCalls' && 'Appels API par jour'}
                  {selectedMetric === 'downloads' && 'Téléchargements par jour'}
                </span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedMetric === 'revenue' ? <AreaChart data={analyticsData.revenue.daily}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatDate} tick={{
                    fontSize: 12
                  }} tickMargin={10} />
                  <YAxis tickFormatter={value => `${value} TND`} tick={{
                    fontSize: 12
                  }} width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="models" name="Modèles" stackId="1" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="datasets" name="Datasets" stackId="1" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.6} />
                </AreaChart> : selectedMetric === 'users' ? <LineChart data={analyticsData.users.daily}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatDate} tick={{
                    fontSize: 12
                  }} tickMargin={10} />
                  <YAxis tick={{
                    fontSize: 12
                  }} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" name="Utilisateurs" stroke={COLORS.green} strokeWidth={2} dot={false} activeDot={{
                    r: 6
                  }} />
                </LineChart> : selectedMetric === 'apiCalls' ? <BarChart data={analyticsData.usage.apiCalls.daily}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatDate} tick={{
                    fontSize: 12
                  }} tickMargin={10} />
                  <YAxis tick={{
                    fontSize: 12
                  }} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Appels API" fill={COLORS.purple} radius={[4, 4, 0, 0]} />
                </BarChart> : <BarChart data={analyticsData.usage.downloads.daily}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatDate} tick={{
                    fontSize: 12
                  }} tickMargin={10} />
                  <YAxis tick={{
                    fontSize: 12
                  }} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Téléchargements" fill={COLORS.yellow} radius={[4, 4, 0, 0]} />
                </BarChart>}
              </ResponsiveContainer>
            </div>
          </div>
          {/* Distribution Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedMetric === 'revenue' && 'Répartition des revenus'}
                  {selectedMetric === 'users' && 'Répartition par pays'}
                  {selectedMetric === 'apiCalls' && 'Répartition par modèle'}
                  {selectedMetric === 'downloads' && 'Répartition par dataset'}
                </h2>
              </div>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={selectedMetric === 'revenue' ? analyticsData.revenue.byModel : selectedMetric === 'users' ? analyticsData.users.byCountry : selectedMetric === 'apiCalls' ? analyticsData.usage.apiCalls.byModel : analyticsData.usage.downloads.byDataset} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey={selectedMetric === 'users' ? 'country' : 'name'} label={({
                      name,
                      percent
                    }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {(selectedMetric === 'revenue' ? analyticsData.revenue.byModel : selectedMetric === 'users' ? analyticsData.users.byCountry : selectedMetric === 'apiCalls' ? analyticsData.usage.apiCalls.byModel : analyticsData.usage.downloads.byDataset).map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS.pieColors[index % COLORS.pieColors.length]} />)}
                    </Pie>
                    <Tooltip formatter={value => selectedMetric === 'revenue' ? `${formatCurrency(Number(value))} TND` : formatNumber(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedMetric === 'revenue' && 'Top contributeurs aux revenus'}
                  {selectedMetric === 'users' && 'Top pays utilisateurs'}
                  {selectedMetric === 'apiCalls' && 'Top modèles utilisés'}
                  {selectedMetric === 'downloads' && 'Top datasets téléchargés'}
                </h2>
              </div>
              <div className="space-y-4">
                {(selectedMetric === 'revenue' ? analyticsData.revenue.byModel : selectedMetric === 'users' ? analyticsData.users.byCountry : selectedMetric === 'apiCalls' ? analyticsData.usage.apiCalls.byModel : analyticsData.usage.downloads.byDataset).map((item, index) => <div key={index} className="flex items-center">
                  <div className="h-4 w-4 rounded-full mr-3" style={{
                    backgroundColor: COLORS.pieColors[index % COLORS.pieColors.length]
                  }}></div>
                  <div className="flex-1">

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{
                        width: `${item.percentage}%`,
                        backgroundColor: COLORS.pieColors[index % COLORS.pieColors.length]
                      }}></div>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
          {/* Additional Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Insights
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">
                      Croissance des revenus
                    </h3>
                    <p className="text-sm text-blue-700">
                      Vos revenus ont augmenté de 14.2% par rapport à la
                      période précédente.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800 mb-1">
                      Nouveaux utilisateurs
                    </h3>
                    <p className="text-sm text-green-700">
                      125 nouveaux utilisateurs ont rejoint ce mois-ci,
                      principalement de Tunisie et d'Algérie.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <div className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-purple-800 mb-1">
                      Performance des modèles
                    </h3>
                    <p className="text-sm text-purple-700">
                      ArabicBERT continue d'être votre modèle le plus
                      performant avec 40% des appels API.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>;
}