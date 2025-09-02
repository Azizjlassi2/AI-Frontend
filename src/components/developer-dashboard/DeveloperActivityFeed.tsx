import { Link } from 'react-router-dom';
import { Database, DollarSign, MessageSquare, CreditCard } from 'lucide-react';
interface Activity {
  id: number;
  type: 'MODEL_USAGE' | 'DATASET_DOWNLOAD' | 'SUBSCRIPTION' | 'REVIEW' | 'PAYMENT';
  title: string;
  description: string;
  date: string;
  metadata?: {
    modelId?: number;
    modelName?: string;
    datasetId?: number;
    datasetName?: string;
    userId?: number;
    userName?: string;
    amount?: number;
    currency?: string;
  };
}
interface DeveloperActivityFeedProps {
  activities: Activity[];
}
export function DeveloperActivityFeed({
  activities
}: DeveloperActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'MODEL_USAGE':
        return <div className="h-5 w-5 text-blue-600" />;
      case 'DATASET_DOWNLOAD':
        return <Database className="h-5 w-5 text-green-600" />;
      case 'SUBSCRIPTION':
        return <CreditCard className="h-5 w-5 text-purple-600" />;
      case 'REVIEW':
        return <MessageSquare className="h-5 w-5 text-yellow-600" />;
      case 'PAYMENT':
        return <DollarSign className="h-5 w-5 text-emerald-600" />;
      default:
        return <div className="h-5 w-5 text-gray-600" />;
    }
  };
  const getActivityLink = (activity: Activity) => {
    switch (activity.type) {
      case 'MODEL_USAGE':
        return activity.metadata?.modelId ? `/developer/models/${activity.metadata.modelId}` : '/developer/models';
      case 'DATASET_DOWNLOAD':
        return activity.metadata?.datasetId ? `/developer/datasets/${activity.metadata.datasetId}` : '/developer/datasets';
      case 'SUBSCRIPTION':
        return activity.metadata?.modelId ? `/developer/models/${activity.metadata.modelId}/subscriptions` : '/developer/subscriptions';
      case 'REVIEW':
        return '/developer/reviews';
      case 'PAYMENT':
        return '/developer/payments';
      default:
        return '/developer/dashboard';
    }
  };
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
      }
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short'
      });
    }
  };
  return <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Activités récentes
      </h2>
      <Link to="/developer/activities" className="text-sm text-blue-600 hover:text-blue-800">
        Voir toutes
      </Link>
    </div>
    <div className="space-y-4">
      {activities.map(activity => <div key={activity.id} className="flex space-x-4">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <Link to={getActivityLink(activity)} className="text-sm font-medium text-gray-900 hover:text-blue-600">
            {activity.title}
          </Link>
          <p className="text-sm text-gray-500">{activity.description}</p>
          <p className="text-xs text-gray-400 mt-1">
            {formatTimeAgo(activity.date)}
          </p>
        </div>
      </div>)}
      {activities.length === 0 && <div className="text-center py-6 text-gray-500">
        Aucune activité récente
      </div>}
    </div>
  </div>;
}