import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Database, FileText, Settings, Key, CreditCard, BarChart2, BoxIcon } from 'lucide-react';
export function ClientSidebar() {
  const location = useLocation();
  const menuItems = [{
    path: '/dashboard',
    icon: Home,
    label: 'Tableau de bord'
  }, {
    path: '/dashboard/models',
    icon: BoxIcon,
    label: 'Mes Modèles'
  }, {
    path: '/dashboard/datasets',
    icon: Database,
    label: 'Mes Datasets'
  }, {
    path: '/dashboard/usage',
    icon: BarChart2,
    label: 'Utilisation'
  }, {
    path: '/dashboard/api-keys',
    icon: Key,
    label: 'Clés API'
  }, {
    path: '/dashboard/invoices',
    icon: FileText,
    label: 'Factures'
  }, {
    path: '/dashboard/billing',
    icon: CreditCard,
    label: 'Facturation'
  }, {
    path: '/dashboard/settings',
    icon: Settings,
    label: 'Paramètres'
  }];
  return <aside className="w-64 bg-gray-800 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map(item => {
        const Icon = item.icon;
        return <Link key={item.path} to={item.path} className={`flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-300'}`}>
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>;
      })}
      </nav>
    </aside>;
}