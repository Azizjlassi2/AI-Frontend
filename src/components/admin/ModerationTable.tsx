import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
const moderationItems = [{
  id: 'MOD-001',
  content: 'Modèle de classification inapproprié',
  reporter: 'user123',
  status: 'pending',
  date: '2023-12-10',
  type: 'model'
}, {
  id: 'MOD-002',
  content: 'Dataset contenant des données sensibles',
  reporter: 'user456',
  status: 'resolved',
  date: '2023-12-09',
  type: 'dataset'
}, {
  id: 'MOD-003',
  content: 'Commentaire offensant sur le modèle',
  reporter: 'user789',
  status: 'investigating',
  date: '2023-12-08',
  type: 'comment'
}];
export function ModerationTable() {
  return <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          Modération de Contenu
        </h2>
        <button className="text-sm text-blue-500 hover:text-blue-400">
          Voir tout
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-4">ID</th>
              <th className="pb-4">Contenu</th>
              <th className="pb-4">Signalé par</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {moderationItems.map(item => <tr key={item.id} className="border-t border-gray-700">
                <td className="py-4 text-gray-300">{item.id}</td>
                <td className="py-4 text-gray-300">{item.content}</td>
                <td className="py-4 text-gray-300">{item.reporter}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'resolved' ? 'bg-green-100 text-green-800' : item.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 text-gray-300">{item.date}</td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-green-400 hover:text-green-300">
                      <CheckCircle className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-red-400 hover:text-red-300">
                      <XCircle className="h-5 w-5" />
                    </button>
                    <button className="p-1 text-yellow-400 hover:text-yellow-300">
                      <AlertTriangle className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}