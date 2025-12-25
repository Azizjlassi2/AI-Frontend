import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { InfoIcon, Loader } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Adjust path as needed

interface RevenueDataPoint {
  date: string;
  modelsRevenue: number;
  datasetsRevenue: number;
  totalRevenue: number;
}

interface DeveloperRevenueChartProps {
  dateRange: '7d' | '30d' | '90d' | 'all';
}

export function DeveloperRevenueChart({
  dateRange
}: DeveloperRevenueChartProps) {
  const [revenueData, setRevenueData] = useState<RevenueDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Retrieve auth token for API calls

  useEffect(() => {
    const fetchRevenueData = async () => {
      if (!token) {
        setError('Authentication required.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/revenue`,
          {
            params: { dateRange },
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        // Assume API returns { data: RevenueDataPoint[] }
        const data: RevenueDataPoint[] = response.data?.data || [];
        setRevenueData(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch revenue data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenueData();
  }, [dateRange, token]);

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
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-gray-800">{formatDate(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="text-sm"
            >
              {entry.name}: {entry.value.toLocaleString()} TND
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-80">
        <Loader className="h-6 w-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading revenue data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center text-red-600">
          <p className="font-medium">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (revenueData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center text-gray-500">
          <p className="font-medium">No revenue data available</p>
          <p className="text-sm mt-1">for the selected date range.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
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
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis
              tickFormatter={(value) => `${value} TND`}
              tick={{ fontSize: 12 }}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="modelsRevenue"
              name="Modèles"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="datasetsRevenue"
              name="Datasets"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              name="Total"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
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
    </div>
  );
}