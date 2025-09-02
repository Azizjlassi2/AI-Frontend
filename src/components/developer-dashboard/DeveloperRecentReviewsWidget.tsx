import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, Database } from 'lucide-react';
interface Review {
  id: number;
  resourceType: 'MODEL' | 'DATASET';
  resourceId: number;
  resourceName: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}
interface DeveloperRecentReviewsWidgetProps {
  reviews: Review[];
}
export function DeveloperRecentReviewsWidget({
  reviews
}: DeveloperRecentReviewsWidgetProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  return <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
          Évaluations récentes
        </h2>
        <Link to="/developer/reviews" className="text-sm text-blue-600 hover:text-blue-800">
          Voir toutes
        </Link>
      </div>
      <div className="space-y-4">
        {reviews.map(review => <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <img src={review.userAvatar} alt={review.userName} className="h-8 w-8 rounded-full mr-2" />
                <div>
                  <div className="font-medium text-gray-900">
                    {review.userName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(review.date)}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <div className="flex items-center">
                {review.resourceType === 'MODEL' ? <div className="h-4 w-4 text-blue-600 mr-1" /> : <Database className="h-4 w-4 text-green-600 mr-1" />}
                <Link to={`/developer/${review.resourceType === 'MODEL' ? 'models' : 'datasets'}/${review.resourceId}`} className="text-blue-600 hover:text-blue-800">
                  {review.resourceName}
                </Link>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
            <div className="mt-3 flex justify-end">
              <button className="text-xs text-blue-600 hover:text-blue-800">
                Répondre
              </button>
            </div>
          </div>)}
        {reviews.length === 0 && <div className="text-center py-6 text-gray-500">
            Aucune évaluation récente
          </div>}
      </div>
    </div>;
}