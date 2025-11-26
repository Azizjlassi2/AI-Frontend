import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CreditCard, Zap } from 'lucide-react';

import { BillingPeriod, Subscription } from '../../types/shared';
interface ActiveSubscriptionsWidgetProps {
  subscriptions: Subscription[];
}
export function ActiveSubscriptionsWidget({
  subscriptions
}: ActiveSubscriptionsWidgetProps) {
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  // Get appropriate icon for plan
  const getPlanIcon = (billingPeriod: BillingPeriod) => {
    switch (billingPeriod) {
      case BillingPeriod.MONTHLY:
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case BillingPeriod.ANNUAL:
        return <Calendar className="h-5 w-5 text-green-600" />;
      case BillingPeriod.PAY_AS_YOU_GO:
        return <Zap className="h-5 w-5 text-purple-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-blue-600" />;
    }
  };
  // Get billing period text
  const getBillingPeriodText = (billingPeriod: BillingPeriod) => {
    switch (billingPeriod) {
      case BillingPeriod.MONTHLY:
        return 'Mensuel';
      case BillingPeriod.ANNUAL:
        return 'Annuel';
      case BillingPeriod.PAY_AS_YOU_GO:
        return 'Pay-as-you-go';
      default:
        return '';
    }
  };
  return <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Abonnements actifs
        </h2>
        <Link to="/client/subscriptions" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
          Voir tout
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
    {subscriptions.length === 0 ? <div className="p-6 text-center">
      <p className="text-gray-500">Aucun abonnement actif</p>
      <Link to="/models" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
        Explorer les modèles
      </Link>
    </div> : <div className="divide-y divide-gray-200">
      {subscriptions.map(subscription => <div key={subscription.id} className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <div className="mr-4">
              {getPlanIcon(subscription.billingPeriod)}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {subscription.modelName}
              </h3>
              <p className="text-sm text-gray-500">
                {subscription.planName} (
                {getBillingPeriodText(subscription.billingPeriod)})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Prochain paiement:{' '}
                {formatDate(subscription.nextBillingDate)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">
              {subscription.billingPeriod === BillingPeriod.PAY_AS_YOU_GO ? `${subscription.price} ${subscription.currency}/appel` : `${subscription.price} ${subscription.currency}`}
            </p>
            <p className="text-sm text-gray-500">
              {subscription.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO && (subscription.billingPeriod === BillingPeriod.MONTHLY ? 'par mois' : 'par an')}
            </p>
          </div>
        </div>
        {subscription.usageData && subscription.usageData.apiCallsLimit && <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Utilisation</span>
            <span>
              {subscription.usageData.apiCallsUsed.toLocaleString()} /{' '}
              {subscription.usageData.apiCallsLimit.toLocaleString()}{' '}
              appels
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${subscription.usageData.apiCallsUsed / subscription.usageData.apiCallsLimit > 0.8 ? 'bg-red-500' : 'bg-blue-500'}`} style={{
              width: `${Math.min(subscription.usageData.apiCallsUsed / subscription.usageData.apiCallsLimit * 100, 100)}%`
            }}></div>
          </div>
        </div>}
        <div className="mt-4 flex space-x-4">
          <Link to={`/client/models/${subscription.modelId}/usage`} className="text-sm text-blue-600 hover:text-blue-800">
            Statistiques
          </Link>
          <Link to={`/client/docs/models/${subscription.modelId}`} className="text-sm text-blue-600 hover:text-blue-800">
            Documentation API
          </Link>
        </div>
      </div>)}
    </div>}
  </div>;
}