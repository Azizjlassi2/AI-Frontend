import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, AlertTriangle, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Notification } from '../../pages/client/ClientDashboardPage';
interface NotificationsWidgetProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => void;
  expanded?: boolean;
}
export function NotificationsWidget({
  notifications,
  onMarkAsRead,
  expanded = false
}: NotificationsWidgetProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'INFO':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'WARNING':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'SUCCESS':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'ERROR':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
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
  // Show all notifications if expanded, otherwise just show the unread ones or the first 3
  const displayNotifications = expanded ? notifications : notifications.filter(n => !n.read).slice(0, 3);
  const unreadCount = notifications.filter(n => !n.read).length;
  return <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        {!expanded && <Link to="/user/notifications" className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
          Voir tout
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>}
      </div>
    </div>
    {displayNotifications.length === 0 ? <div className="p-6 text-center">
      <p className="text-gray-500">Aucune notification non lue</p>
    </div> : <div className="divide-y divide-gray-200">
      {displayNotifications.map(notification => <div key={notification.id} className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
        <div className="flex">
          <div className="flex-shrink-0 mr-3">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <Link to={notification.link || '#'} className="block" onClick={() => onMarkAsRead(notification.id)}>
              <p className="text-sm font-medium text-gray-900">
                {notification.title}
              </p>
              <p className="text-sm text-gray-500">
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(notification.date)}
              </p>
            </Link>
          </div>
          {!notification.read && <button className="ml-2 text-gray-400 hover:text-gray-600" onClick={() => onMarkAsRead(notification.id)}>
            <X className="h-4 w-4" />
          </button>}
        </div>
      </div>)}
    </div>}
    {!expanded && unreadCount > 3 && <div className="p-4 text-center border-t border-gray-200">
      <Link to="/user/notifications" className="text-sm text-blue-600 hover:text-blue-800">
        {unreadCount - 3} autre{unreadCount - 3 > 1 ? 's' : ''} notification
        {unreadCount - 3 > 1 ? 's' : ''} non lue
        {unreadCount - 3 > 1 ? 's' : ''}
      </Link>
    </div>}
  </div>;
}