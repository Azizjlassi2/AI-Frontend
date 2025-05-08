import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [{
  month: 'Jan',
  models: 4500,
  datasets: 2300
}, {
  month: 'Fév',
  models: 5200,
  datasets: 2800
}, {
  month: 'Mar',
  models: 4900,
  datasets: 2600
}, {
  month: 'Avr',
  models: 6200,
  datasets: 3100
}, {
  month: 'Mai',
  models: 5800,
  datasets: 3400
}, {
  month: 'Jun',
  models: 7100,
  datasets: 3800
}, {
  month: 'Jul',
  models: 8400,
  datasets: 4200
}, {
  month: 'Aoû',
  models: 9200,
  datasets: 4600
}, {
  month: 'Sep',
  models: 8900,
  datasets: 4400
}, {
  month: 'Oct',
  models: 11200,
  datasets: 5100
}, {
  month: 'Nov',
  models: 12500,
  datasets: 5600
}, {
  month: 'Déc',
  models: 14200,
  datasets: 6200
}];
export function RevenueChart() {
  return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Revenus</h2>
          <p className="text-gray-400">
            Revenus mensuels des modèles et datasets
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <span className="text-sm text-gray-400">Modèles</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
            <span className="text-sm text-gray-400">Datasets</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} />
            <YAxis stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} tickFormatter={value => `${value} DT`} />
            <Tooltip contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            borderRadius: '0.5rem'
          }} itemStyle={{
            color: '#9CA3AF'
          }} labelStyle={{
            color: '#F9FAFB'
          }} />
            <Area type="monotone" dataKey="models" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            <Area type="monotone" dataKey="datasets" stroke="#A855F7" fill="#A855F7" fillOpacity={0.1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>;
}