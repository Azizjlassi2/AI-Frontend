import { X } from 'lucide-react'
interface SubscriptionDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  subscription: any
}
export function SubscriptionDetailsDialog({
  isOpen,
  onClose,
  subscription,
}: SubscriptionDetailsDialogProps) {
  if (!isOpen || !subscription) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Détails de l'abonnement: {subscription?.modelName || 'Non spécifié'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Plan Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Plan {subscription?.plan || 'Non spécifié'}
                </h3>
                <p className="text-gray-500">
                  {subscription?.cost || '0'}/mois
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${subscription?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {subscription.status ? subscription.status : 'Non spécifié'}
              </span>
            </div>
          </div>
          {/* Usage Stats */}
          <div>
            <h3 className="text-lg font-medium mb-3">Utilisation</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Requêtes ce mois</span>
                  <span>
                    {subscription?.usage?.current || 0} /{' '}
                    {subscription?.usage?.limit || 0}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${(subscription?.usage?.current || 0) / (subscription?.usage?.limit || 1) > 0.9 ? 'bg-red-500' : (subscription?.usage?.current || 0) / (subscription?.usage?.limit || 1) > 0.7 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{
                      width: `${((subscription?.usage?.current || 0) / (subscription?.usage?.limit || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Billing Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">
              Informations de facturation
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Prochain paiement</span>
                <span className="font-medium">
                  {subscription?.endDate || 'Non spécifié'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Méthode de paiement</span>
                <span className="font-medium">Visa •••• 4242</span>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Mettre à niveau le plan
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Modifier le mode de paiement
            </button>
            <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
              Annuler l'abonnement
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
