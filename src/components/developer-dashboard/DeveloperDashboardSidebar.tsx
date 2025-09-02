import { Link } from 'react-router-dom';
import { LayoutDashboard, Database, BarChart2, Users, DollarSign, Settings, HelpCircle, FileText, MessageSquare, Star, ChevronRight, Bot } from 'lucide-react';
interface DeveloperDashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export function DeveloperDashboardSidebar({
  activeTab,
  onTabChange
}: DeveloperDashboardSidebarProps) {
  const menuItems = [{
    id: 'overview',
    label: "Vue d'ensemble",
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/developer/dashboard'
  }, {
    id: 'models',
    label: 'Mes modèles',
    icon: <Bot className="h-5 w-5" />,
    path: '/developer/models'
  }, {
    id: 'datasets',
    label: 'Mes datasets',
    icon: <Database className="h-5 w-5" />,
    path: '/developer/datasets'
  }, {
    id: 'analytics',
    label: 'Analyses',
    icon: <BarChart2 className="h-5 w-5" />,
    path: '/developer/analytics'
  }, {
    id: 'subscribers',
    label: 'Abonnés',
    icon: <Users className="h-5 w-5" />,
    path: '/developer/subscribers'
  }, {
    id: 'reviews',
    label: 'Évaluations',
    icon: <Star className="h-5 w-5" />,
    path: '/developer/reviews'
  }, {
    id: 'payments',
    label: 'Paiements',
    icon: <DollarSign className="h-5 w-5" />,
    path: '/developer/payments'
  }, {
    id: 'documentation',
    label: 'Documentation',
    icon: <FileText className="h-5 w-5" />,
    path: '/developer/documentation'
  }, {
    id: 'support',
    label: 'Support',
    icon: <MessageSquare className="h-5 w-5" />,
    path: '/developer/support'
  }, {
    id: 'settings',
    label: 'Paramètres',
    icon: <Settings className="h-5 w-5" />,
    path: '/developer/settings'
  }];
  return <aside className="w-64 border-r border-gray-200 dark:border-gray-700 min-h-screen bg-white dark:bg-gray-900 hidden md:block">
    <nav className="p-4 space-y-1">
      {menuItems.map(item => <Link key={item.id} to={item.path} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`} onClick={() => onTabChange(item.id)}>
        <span className={activeTab === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>
          {item.icon}
        </span>
        <span className="font-medium">{item.label}</span>
        {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto" />}
      </Link>)}
    </nav>
    <div className="p-4 mt-8">
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-start">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
              Centre d'aide pour développeurs
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
              Consultez notre documentation et nos ressources pour tirer le
              meilleur parti de la plateforme.
            </p>
            <Link to="/developer/help-center" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
              Accéder au centre d'aide
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </aside>;
}