import React from 'react';
import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
interface ModelDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  model: any;
}
export function ModelDetailsDialog({
  isOpen,
  onClose,
  model
}: ModelDetailsDialogProps) {
  const usageData = [{
    date: '2024-01-15',
    requests: 5200,
    latency: 115
  }, {
    date: '2024-01-16',
    requests: 4800,
    latency: 120
  }, {
    date: '2024-01-17',
    requests: 6100,
    latency: 110
  }, {
    date: '2024-01-18',
    requests: 5600,
    latency: 125
  }, {
    date: '2024-01-19',
    requests: 7200,
    latency: 105
  }, {
    date: '2024-01-20',
    requests: 6800,
    latency: 118
  }, {
    date: '2024-01-21',
    requests: 5900,
    latency: 112
  }];
  if (!isOpen || !model) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Détails du modèle: {model?.name || 'Non spécifié'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Requêtes totales
              </h3>
              <p className="text-2xl font-semibold text-gray-900">41.6K</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Latence moyenne
              </h3>
              <p className="text-2xl font-semibold text-gray-900">115ms</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">
                Disponibilité
              </h3>
              <p className="text-2xl font-semibold text-gray-900">99.9%</p>
            </div>
          </div>
          {/* Usage Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Utilisation sur 7 jours
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="requests" stroke="#3B82F6" name="Requêtes" />
                  <Line yAxisId="right" type="monotone" dataKey="latency" stroke="#10B981" name="Latence (ms)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">
              Informations techniques
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Version</p>
                <p className="font-medium">2.1.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dernière mise à jour</p>
                <p className="font-medium">2024-01-15</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Endpoint</p>
                <p className="font-medium">
                  api.aiplus.tn/v1/models/{model?.name || ''}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${model?.status === 'running' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {model?.status || 'Non spécifié'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}