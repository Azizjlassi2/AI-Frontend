import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export function UsageStats() {
  const data = [{
    date: '01/01',
    requests: 2400,
    latency: 100
  }, {
    date: '02/01',
    requests: 1398,
    latency: 120
  }, {
    date: '03/01',
    requests: 9800,
    latency: 90
  }, {
    date: '04/01',
    requests: 3908,
    latency: 95
  }, {
    date: '05/01',
    requests: 4800,
    latency: 110
  }, {
    date: '06/01',
    requests: 3800,
    latency: 100
  }, {
    date: '07/01',
    requests: 4300,
    latency: 105
  }];
  return <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Requêtes par jour
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Latence moyenne (ms)
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="latency" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>;
}