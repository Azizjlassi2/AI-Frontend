import { Link } from 'react-router-dom';
import { LayoutDashboard, CreditCard, FileText, BarChart2, Bell, Settings, HelpCircle, ChevronRight, Key, Database } from 'lucide-react';
interface UserDashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export function UserDashboardSidebar({
  activeTab,
  onTabChange,
}: UserDashboardSidebarProps) {
  const menuItems = [
    {
      id: 'overview',
      label: "Vue d'ensemble",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      id: 'subscriptions',
      label: 'Abonnements',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: 'datasets',
      label: 'Mes Datasets',
      icon: <Database className="h-5 w-5" />,
    },
    {
      id: 'api-keys',
      label: 'Clés API',
      icon: <Key className="h-5 w-5" />,
    },
    {
      id: 'billing',
      label: 'Facturation',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      id: 'usage',
      label: "Statistiques d'utilisation",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-5 w-5" />,
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: <Settings className="h-5 w-5" />,
    },
  ]
  return (
    <aside className="w-64 border-r border-gray-200 min-h-screen bg-white hidden md:block">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span
              className={
                activeTab === item.id ? 'text-blue-600' : 'text-gray-500'
              }
            >
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <ChevronRight className="h-4 w-4 ml-auto" />
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 mt-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start">
            <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">
                Besoin d'aide ?
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                Notre équipe de support est là pour vous aider avec toutes vos
                questions.
              </p>
              <Link
                to="/contact"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
              >
                Contacter le support
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
