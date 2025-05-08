import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [{
  date: '01/12',
  visitors: 2100,
  previousPeriod: 1800
}, {
  date: '02/12',
  visitors: 2400,
  previousPeriod: 1900
}, {
  date: '03/12',
  visitors: 2200,
  previousPeriod: 2100
}, {
  date: '04/12',
  visitors: 2800,
  previousPeriod: 2300
}, {
  date: '05/12',
  visitors: 3100,
  previousPeriod: 2500
}, {
  date: '06/12',
  visitors: 2900,
  previousPeriod: 2700
}, {
  date: '07/12',
  visitors: 3300,
  previousPeriod: 2800
}, {
  date: '08/12',
  visitors: 3200,
  previousPeriod: 2900
}, {
  date: '09/12',
  visitors: 3500,
  previousPeriod: 3100
}, {
  date: '10/12',
  visitors: 3700,
  previousPeriod: 3200
}];
export function VisitorsChart() {
  const currentTotal = data.reduce((sum, item) => sum + item.visitors, 0);
  const previousTotal = data.reduce((sum, item) => sum + item.previousPeriod, 0);
  const percentageChange = ((currentTotal - previousTotal) / previousTotal * 100).toFixed(1);
  return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Visiteurs</h2>
          <p className="text-gray-400">Comparaison sur 10 jours</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{currentTotal}</div>
          <div className={`text-sm ${Number(percentageChange) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {percentageChange}% vs période précédente
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} />
            <YAxis stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} />
            <Tooltip contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            borderRadius: '0.5rem'
          }} itemStyle={{
            color: '#9CA3AF'
          }} labelStyle={{
            color: '#F9FAFB'
          }} />
            <Line type="monotone" dataKey="previousPeriod" stroke="#6B7280" strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>;
}