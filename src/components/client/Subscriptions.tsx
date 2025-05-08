import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { SubscriptionDetailsDialog } from './SubscriptionDetailsDialog';
export function Subscriptions() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const subscriptions = [{
    id: 1,
    modelName: 'TunBERT v2',
    plan: 'Pro',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    usage: {
      current: 45000,
      limit: 100000
    },
    cost: '299 DT'
  }, {
    id: 2,
    modelName: 'ImageClassifier-Med',
    plan: 'Basic',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    usage: {
      current: 8000,
      limit: 10000
    },
    cost: '99 DT'
  }];
  const handleManageSubscription = (subscription: any) => {
    setSelectedSubscription(subscription);
    setIsDetailsOpen(true);
  };
  return <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Abonnements actifs
      </h2>
      <div className="space-y-4">
        {subscriptions.map(subscription => <div key={subscription.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {subscription.modelName}
                </h3>
                <p className="text-sm text-gray-500">
                  Plan {subscription.plan} • {subscription.cost}/mois
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {subscription.status}
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Utilisation</span>
                <span>
                  {subscription.usage.current} / {subscription.usage.limit}{' '}
                  requêtes
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${subscription.usage.current / subscription.usage.limit > 0.9 ? 'bg-red-500' : subscription.usage.current / subscription.usage.limit > 0.7 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{
              width: `${subscription.usage.current / subscription.usage.limit * 100}%`
            }} />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {subscription.startDate} - {subscription.endDate}
              </div>
              <button onClick={() => handleManageSubscription(subscription)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Gérer l'abonnement
              </button>
            </div>
          </div>)}
      </div>
      <SubscriptionDetailsDialog isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} subscription={selectedSubscription} />
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              Optimisez vos coûts
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              Vous approchez de votre limite d'utilisation sur certains modèles.
              Envisagez de passer à un plan supérieur pour bénéficier de
              meilleurs tarifs.
            </p>
          </div>
        </div>
      </div>
    </div>;
}