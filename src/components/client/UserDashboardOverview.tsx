import { BarChart2, CreditCard, Zap, DollarSign } from 'lucide-react';
interface UserDashboardOverviewProps {
  stats: {
    totalApiCalls: number;
    activeSubscriptions: number;
    totalSpent: number;
    currency: string;
  };
}
export function UserDashboardOverview({ stats }: UserDashboardOverviewProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Appels API</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalApiCalls.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Total des appels API ce mois-ci
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Abonnements actifs
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.activeSubscriptions}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Modèles auxquels vous êtes abonné
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Consommation</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalApiCalls > 0
                  ? `${((stats.totalApiCalls / 1000) * 100).toFixed(2)} %`
                  : '0 %'}
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">De votre quota mensuel</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Dépenses totales
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalSpent.toFixed(2)} {stats.currency}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Depuis la création du compte
          </p>
        </div>
      </div>
    </div>
  )
}
