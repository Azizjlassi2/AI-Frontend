import React from 'react';
import { Bot, Database, Users, CreditCard } from 'lucide-react';
const stats = [{
  name: 'Modèles Actifs',
  value: '2,451',
  change: '+12.5%',
  changeType: 'positive',
  icon: Bot
}, {
  name: 'Datasets',
  value: '1,834',
  change: '+8.2%',
  changeType: 'positive',
  icon: Database
}, {
  name: 'Utilisateurs Actifs',
  value: '45.2K',
  change: '+23.1%',
  changeType: 'positive',
  icon: Users
}, {
  name: 'Revenus Mensuels',
  value: '38.4K DT',
  change: '+15.3%',
  changeType: 'positive',
  icon: CreditCard
}];
export function StatCards() {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => <div key={stat.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <stat.icon className="h-8 w-8 text-blue-500" />
            <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
              {stat.change}
            </span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            {stat.value}
          </h3>
          <p className="text-sm text-gray-400">{stat.name}</p>
        </div>)}
    </div>;
}