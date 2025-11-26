import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Zap, CreditCard, RefreshCw, User } from 'lucide-react';
import { ActivityItem } from '../../types/shared';
interface ActivityFeedWidgetProps {
  activities: ActivityItem[];
}
export function ActivityFeedWidget({
  activities
}: ActivityFeedWidgetProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'MODEL_USAGE':
        return <Zap className="h-5 w-5 text-blue-500" />;
      case 'PAYMENT':
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case 'SUBSCRIPTION':
        return <RefreshCw className="h-5 w-5 text-purple-500" />;
      case 'SYSTEM':
        return <User className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  const formatDate = (dateString: string) => {
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
  return <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Activité récente
        </h2>

      </div>
    </div>
    {activities.length === 0 ? <div className="p-6 text-center">
      <p className="text-gray-500">Aucune activité récente</p>
    </div> : <div className="divide-y divide-gray-200">
      {activities.slice(0, 5).map(activity => <div key={activity.id} className="p-4">
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{activity.action}</span> -{' '}
              {activity.target}
            </p>
            {activity.details && <p className="text-sm text-gray-500">{activity.details}</p>}
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(activity.date)}
            </p>
          </div>
        </div>
      </div>)}
    </div>}
  </div>;
}