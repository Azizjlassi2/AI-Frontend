import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [{
  name: 'ArabicBERT',
  calls: 125000
}, {
  name: 'TunBERT',
  calls: 98000
}, {
  name: 'MedicalVision',
  calls: 76000
}, {
  name: 'SentimentAI',
  calls: 65000
}, {
  name: 'AgriPredict',
  calls: 45000
}];
export function TopModelsChart() {
  return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-6">Top 5 Modèles</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} />
            <YAxis type="category" dataKey="name" stroke="#9CA3AF" tick={{
            fill: '#9CA3AF'
          }} width={100} />
            <Tooltip contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151',
            borderRadius: '0.5rem'
          }} itemStyle={{
            color: '#9CA3AF'
          }} labelStyle={{
            color: '#F9FAFB'
          }} />
            <Bar dataKey="calls" fill="#3B82F6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>;
}