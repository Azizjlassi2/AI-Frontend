import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { InfoIcon } from 'lucide-react';
interface DeveloperRevenueChartProps {
  dateRange: '7d' | '30d' | '90d' | 'all';
}
export function DeveloperRevenueChart({
  dateRange
}: DeveloperRevenueChartProps) {
  const [revenueData, setRevenueData] = useState<any[]>([]);
  useEffect(() => {
    // In a real app, this would fetch data from an API based on the date range
    const generateMockData = () => {
      const data = [];
      const now = new Date();
      const daysToGenerate = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : dateRange === '90d' ? 90 : 180;
      for (let i = daysToGenerate - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        // Generate realistic looking data with some randomness
        // Base values that increase slightly over time with weekend dips
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        // Models revenue (higher base, more variance)
        const modelsBase = 200 + (daysToGenerate - i) * 0.5;
        const modelsNoise = Math.random() * 100 - 50;
        const modelsWeekendFactor = isWeekend ? 0.7 : 1;
        const modelsRevenue = Math.max(0, (modelsBase + modelsNoise) * modelsWeekendFactor);
        // Datasets revenue (lower base, less variance)
        const datasetsBase = 50 + (daysToGenerate - i) * 0.2;
        const datasetsNoise = Math.random() * 30 - 15;
        const datasetsWeekendFactor = isWeekend ? 0.8 : 1;
        const datasetsRevenue = Math.max(0, (datasetsBase + datasetsNoise) * datasetsWeekendFactor);
        data.push({
          date: date.toISOString().split('T')[0],
          modelsRevenue: Math.round(modelsRevenue),
          datasetsRevenue: Math.round(datasetsRevenue),
          totalRevenue: Math.round(modelsRevenue + datasetsRevenue)
        });
      }
      return data;
    };
    setRevenueData(generateMockData());
  }, [dateRange]);
  // Format date for display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
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
          <p className="font-medium text-gray-800">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => <p key={index} style={{
          color: entry.color
        }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()} TND
            </p>)}
        </div>;
    }
    return null;
  };
  return <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Revenus</h2>
        <div className="flex items-center text-sm text-gray-500">
          <InfoIcon className="h-4 w-4 mr-1" />
          <span>Revenus des modèles et datasets</span>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickFormatter={formatDate} tick={{
            fontSize: 12
          }} tickMargin={10} />
            <YAxis tickFormatter={value => `${value} TND`} tick={{
            fontSize: 12
          }} width={70} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="modelsRevenue" name="Modèles" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{
            r: 6
          }} />
            <Line type="monotone" dataKey="datasetsRevenue" name="Datasets" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{
            r: 6
          }} />
            <Line type="monotone" dataKey="totalRevenue" name="Total" stroke="#6366f1" strokeWidth={2} dot={false} activeDot={{
            r: 6
          }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600">Modèles</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-gray-600">Datasets</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
          <span className="text-sm text-gray-600">Total</span>
        </div>
      </div>
    </div>;
}