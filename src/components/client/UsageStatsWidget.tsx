import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Calendar, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { Subscription } from '../../pages/client/ClientDashboardPage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
interface UsageStatsWidgetProps {
  subscriptions: Subscription[];
}
export function UsageStatsWidget({
  subscriptions
}: UsageStatsWidgetProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');
  const [selectedModel, setSelectedModel] = useState<number | 'all'>('all');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  // Generate mock usage data
  const generateMockUsageData = (days: number, modelId?: number) => {
    const data = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      // Generate random usage data, weighted towards active subscriptions
      let totalCalls = 0;
      if (modelId) {
        // For a specific model
        const subscription = subscriptions.find(sub => sub.modelId === modelId);
        if (subscription?.usageData) {
          // Distribute the usage over days with some randomness
          const avgDailyUsage = subscription.usageData.apiCallsUsed / 30; // Assuming monthly data
          const randomFactor = 0.5 + Math.random();
          totalCalls = Math.floor(avgDailyUsage * randomFactor);
          // Add weekend pattern (less usage on weekends)
          const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            totalCalls = Math.floor(totalCalls * 0.5);
          }
        }
      } else {
        // For all models
        subscriptions.forEach(sub => {
          if (sub.usageData) {
            // Distribute the usage over days with some randomness
            const avgDailyUsage = sub.usageData.apiCallsUsed / 30; // Assuming monthly data
            const randomFactor = 0.5 + Math.random();
            const dailyUsage = Math.floor(avgDailyUsage * randomFactor);
            // Add weekend pattern (less usage on weekends)
            const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
            if (dayOfWeek === 0 || dayOfWeek === 6) {
              totalCalls += Math.floor(dailyUsage * 0.5);
            } else {
              totalCalls += dailyUsage;
            }
          }
        });
      }
      // Add some randomness
      totalCalls = Math.max(0, totalCalls + Math.floor(Math.random() * 200 - 100));
      data.push({
        date: date.toISOString().split('T')[0],
        calls: totalCalls
      });
    }
    return data;
  };
  const usageData = generateMockUsageData(timeRange === '7d' ? 7 : 30, selectedModel === 'all' ? undefined : selectedModel);
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: timeRange === '7d' ? 'short' : undefined,
      day: 'numeric',
      month: timeRange === '30d' ? 'short' : undefined
    });
  };
  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium">{formatDate(label)}</p>
        <p className="text-blue-600">{`${payload[0].value.toLocaleString()} appels API`}</p>
      </div>;
    }
    return null;
  };
  // Calculate trend (comparing current period with previous period)
  const calculateTrend = () => {
    const currentTotal = usageData.reduce((sum, day) => sum + day.calls, 0);
    // Generate data for previous period
    const previousPeriod = timeRange === '7d' ? 7 : 30;
    const previousData = generateMockUsageData(previousPeriod, selectedModel === 'all' ? undefined : selectedModel);
    const previousTotal = previousData.reduce((sum, day) => sum + day.calls, 0);
    if (previousTotal === 0) return 0;
    return (currentTotal - previousTotal) / previousTotal * 100;
  };
  const trend = calculateTrend();
  // Get model options
  const modelOptions = [{
    id: 'all',
    name: 'Tous les modèles'
  }, ...subscriptions.map(sub => ({
    id: sub.modelId,
    name: sub.modelName
  }))];
  return <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Utilisation API
        </h2>
        <Link to="/user/usage" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
          Détails
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="font-medium text-gray-900">
            Appels API{' '}
            {timeRange === '7d' ? 'des 7 derniers jours' : 'des 30 derniers jours'}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Time range selector */}
          <div className="flex items-center bg-gray-100 rounded-md">
            <button className={`px-3 py-1 text-sm rounded-md ${timeRange === '7d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setTimeRange('7d')}>
              7 jours
            </button>
            <button className={`px-3 py-1 text-sm rounded-md ${timeRange === '30d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setTimeRange('30d')}>
              30 jours
            </button>
          </div>
          {/* Chart type selector */}
          <div className="flex items-center bg-gray-100 rounded-md">
            <button className={`px-3 py-1 text-sm rounded-md ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setChartType('bar')}>
              Bar
            </button>
            <button className={`px-3 py-1 text-sm rounded-md ${chartType === 'line' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setChartType('line')}>
              Ligne
            </button>
          </div>
        </div>
      </div>
      {/* Model selector */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-500">Filtrer par modèle:</span>
        </div>
        <select value={selectedModel === 'all' ? 'all' : selectedModel.toString()} onChange={e => setSelectedModel(e.target.value === 'all' ? 'all' : parseInt(e.target.value))} className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
          {modelOptions.map(option => <option key={option.id} value={option.id}>
            {option.name}
          </option>)}
        </select>
      </div>
      {/* Stats summary */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-sm text-blue-700">Total des appels</div>
          <div className="text-xl font-bold text-blue-900 mt-1">
            {usageData.reduce((sum, day) => sum + day.calls, 0).toLocaleString()}
          </div>
          <div className="flex items-center mt-1 text-xs">
            {trend !== 0 && <>
              {trend > 0 ? <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" /> : <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />}
              <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(Math.round(trend))}%
              </span>
            </>}
            <span className="text-gray-500 ml-1">vs période précédente</span>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-sm text-blue-700">Moyenne journalière</div>
          <div className="text-xl font-bold text-blue-900 mt-1">
            {Math.round(usageData.reduce((sum, day) => sum + day.calls, 0) / usageData.length).toLocaleString()}
          </div>
          <div className="flex items-center mt-1 text-xs">
            <Calendar className="h-3 w-3 text-blue-500 mr-1" />
            <span className="text-gray-500">appels par jour</span>
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? <BarChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="date" tickFormatter={formatDate} tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
            <YAxis tickFormatter={value => value.toLocaleString()} tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="calls" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Appels API" />
          </BarChart> : <LineChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="date" tickFormatter={formatDate} tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
            <YAxis tickFormatter={value => value.toLocaleString()} tick={{
              fontSize: 12,
              fill: '#6B7280'
            }} axisLine={{
              stroke: '#E5E7EB'
            }} tickLine={{
              stroke: '#E5E7EB'
            }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="calls" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{
              r: 6
            }} name="Appels API" />
          </LineChart>}
        </ResponsiveContainer>
      </div>
      {/* Model-specific stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">
          Utilisation par modèle
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subscriptions.filter(sub => sub.usageData).map(subscription => {
            // Calculate percentage of usage against limit
            const usagePercentage = subscription.usageData?.apiCallsLimit ? Math.min(100, subscription.usageData.apiCallsUsed / subscription.usageData.apiCallsLimit * 100) : 0;
            return <Link key={subscription.id} to={`/usage/models/${subscription.modelId}`} className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">
                  {subscription.modelName}
                </h4>
                <span className="text-sm text-gray-500">
                  {subscription.usageData?.apiCallsUsed.toLocaleString()}{' '}
                  appels
                </span>
              </div>
              {subscription.usageData?.apiCallsLimit && <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Utilisation</span>
                  <span>{Math.round(usagePercentage)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${usagePercentage > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{
                    width: `${usagePercentage}%`
                  }}></div>
                </div>
              </div>}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  Dernière utilisation:{' '}
                  {subscription.usageData?.lastUsed ? new Date(subscription.usageData.lastUsed).toLocaleDateString('fr-FR') : 'Jamais'}
                </span>
                <span className="text-sm text-blue-600">Détails →</span>
              </div>
            </Link>;
          })}
        </div>
      </div>
    </div>
  </div>;
}