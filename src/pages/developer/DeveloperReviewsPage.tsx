import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, Filter, MessageSquare, Database, ChevronDown, ChevronUp, MessageCircle, ThumbsUp, Flag, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
enum ResourceType {
  MODEL = 'MODEL',
  DATASET = 'DATASET',
}
interface Review {
  id: number;
  resourceId: number;
  resourceType: ResourceType;
  resourceName: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  replied: boolean;
  helpful: number;
  flagged: boolean;
}
export function DeveloperReviewsPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceFilter, setResourceFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [ratingStats, setRatingStats] = useState<{
    [key: number]: number;
  }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock data
        const mockReviews: Review[] = [{
          id: 1,
          resourceId: 1,
          resourceType: ResourceType.MODEL,
          resourceName: 'ArabicBERT',
          userName: 'Karim Malouli',
          userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=KM',
          rating: 5,
          comment: "Excellent modèle pour l'analyse de sentiments en arabe. Les résultats sont très précis, même avec le dialecte tunisien.",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          replied: true,
          helpful: 12,
          flagged: false
        }, {
          id: 2,
          resourceId: 2,
          resourceType: ResourceType.MODEL,
          resourceName: 'TunBERT',
          userName: 'Ahmed Ben Ali',
          userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ABA',
          rating: 5,
          comment: "Performance impressionnante sur les tâches de classification. L'intégration API est simple et bien documentée.",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          replied: false,
          helpful: 8,
          flagged: false
        }, {
          id: 3,
          resourceId: 1,
          resourceType: ResourceType.DATASET,
          resourceName: 'Tunisian Dialect Corpus',
          userName: 'Sarra Mejri',
          userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SM',
          rating: 4,
          comment: "Dataset très complet avec une bonne diversité régionale. J'aurais aimé plus d'annotations sémantiques.",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          replied: false,
          helpful: 5,
          flagged: false
        }, {
          id: 4,
          resourceId: 3,
          resourceType: ResourceType.MODEL,
          resourceName: 'MedicalVision AI',
          userName: 'Nadia Bouzid',
          userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NB',
          rating: 3,
          comment: 'Le modèle fonctionne bien pour les images radiographiques standards, mais a des difficultés avec les IRM complexes. La documentation pourrait être améliorée.',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          replied: true,
          helpful: 3,
          flagged: false
        }, {
          id: 5,
          resourceId: 4,
          resourceType: ResourceType.MODEL,
          resourceName: 'TunisianNER',
          userName: 'Mehdi Trabelsi',
          userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT',
          rating: 2,
          comment: "Précision insuffisante pour les entités nommées spécifiques à la Tunisie. Beaucoup d'erreurs avec les noms de lieux.",
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          replied: true,
          helpful: 7,
          flagged: false
        }, {
          id: 6,
          resourceId: 2,
          resourceType: ResourceType.DATASET,
          resourceName: 'Medical Images 2024',
          userName: 'Leila Ben Salah',
          userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=LBS',
          rating: 5,
          comment: "Dataset de très haute qualité avec des annotations précises. Parfait pour l'entraînement de modèles de diagnostic médical.",
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          replied: false,
          helpful: 15,
          flagged: false
        }, {
          id: 7,
          resourceId: 5,
          resourceType: ResourceType.MODEL,
          resourceName: 'SentimentAI',
          userName: 'Amine Khelifi',
          userAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AK',
          rating: 1,
          comment: "Performances très décevantes. Le modèle ne comprend pas bien les nuances du dialecte tunisien et fait beaucoup d'erreurs.",
          date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          replied: true,
          helpful: 4,
          flagged: true
        }];
        setReviews(mockReviews);
        // Calculate average rating and stats
        const total = mockReviews.reduce((sum, review) => sum + review.rating, 0);
        const avg = total / mockReviews.length;
        setAverageRating(parseFloat(avg.toFixed(1)));
        // Calculate rating distribution
        const stats: { [key: number]: number } = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        };
        mockReviews.forEach(review => {
          stats[review.rating] += 1;
        });
        setRatingStats(stats);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleResourceFilterChange = (type: string | null) => {
    setResourceFilter(type);
  };
  const handleRatingFilterChange = (rating: number | null) => {
    setRatingFilter(rating);
  };
  const toggleExpandReview = (reviewId: number) => {
    if (expandedReview === reviewId) {
      setExpandedReview(null);
    } else {
      setExpandedReview(reviewId);
    }
  };
  const handleSortChange = (order: 'newest' | 'oldest' | 'highest' | 'lowest') => {
    setSortOrder(order);
  };
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const handleMarkAsHelpful = (reviewId: number) => {
    setReviews(reviews.map(review => review.id === reviewId ? {
      ...review,
      helpful: review.helpful + 1
    } : review));
  };
  const handleFlagReview = (reviewId: number) => {
    setReviews(reviews.map(review => review.id === reviewId ? {
      ...review,
      flagged: !review.flagged
    } : review));
  };
  const handleReplyToReview = (reviewId: number) => {
    // In a real app, this would open a reply form or modal
    alert(`Répondre à l'évaluation #${reviewId}`);
    // For demo purposes, just mark it as replied
    setReviews(reviews.map(review => review.id === reviewId ? {
      ...review,
      replied: true
    } : review));
  };
  // Apply filters and sorting
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchQuery.toLowerCase()) || review.userName.toLowerCase().includes(searchQuery.toLowerCase()) || review.resourceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesResource = !resourceFilter || review.resourceType === resourceFilter;
    const matchesRating = !ratingFilter || review.rating === ratingFilter;
    return matchesSearch && matchesResource && matchesRating;
  });
  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortOrder) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });
  // Calculate rating percentage for the progress bars
  const calculateRatingPercentage = (rating: number): number => {
    const count = ratingStats[rating];
    return reviews.length > 0 ? count / reviews.length * 100 : 0;
  };
  return <div className="min-h-screen bg-gray-50">
    <DeveloperDashboardHeader />
    <div className="flex">
      <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Évaluations
            </h1>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="text" placeholder="Rechercher dans les évaluations..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={searchQuery} onChange={handleSearchChange} />
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="relative">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <Filter className="h-5 w-5 mr-2" />
                    {resourceFilter ? resourceFilter === ResourceType.MODEL ? 'Modèles' : 'Datasets' : 'Tous les types'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleResourceFilterChange(null)}>
                      Tous les types
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleResourceFilterChange(ResourceType.MODEL)}>
                      Modèles
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleResourceFilterChange(ResourceType.DATASET)}>
                      Datasets
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    {ratingFilter ? `${ratingFilter} étoiles` : 'Toutes les notes'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleRatingFilterChange(null)}>
                      Toutes les notes
                    </button>
                    {[5, 4, 3, 2, 1].map(rating => <button key={rating} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => handleRatingFilterChange(rating)}>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                      </div>
                      <span className="ml-2">({ratingStats[rating]})</span>
                    </button>)}
                  </div>
                </div>
                <div className="relative">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    {sortOrder === 'newest' ? <ArrowDownRight className="h-5 w-5 mr-2" /> : sortOrder === 'oldest' ? <ArrowUpRight className="h-5 w-5 mr-2" /> : sortOrder === 'highest' ? <ChevronUp className="h-5 w-5 mr-2" /> : <ChevronDown className="h-5 w-5 mr-2" />}
                    {sortOrder === 'newest' ? 'Plus récentes' : sortOrder === 'oldest' ? 'Plus anciennes' : sortOrder === 'highest' ? 'Meilleures notes' : 'Moins bonnes notes'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => handleSortChange('newest')}>
                      <ArrowDownRight className="h-4 w-4 mr-2" />
                      Plus récentes
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => handleSortChange('oldest')}>
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Plus anciennes
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => handleSortChange('highest')}>
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Meilleures notes
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => handleSortChange('lowest')}>
                      <ChevronDown className="h-4 w-4 mr-2" />
                      Moins bonnes notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Reviews List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {isLoading ? <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div> : sortedReviews.length === 0 ? <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune évaluation trouvée
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || resourceFilter || ratingFilter ? 'Aucune évaluation ne correspond à vos critères de recherche.' : "Vous n'avez pas encore reçu d'évaluations pour vos modèles ou datasets."}
              </p>
            </div> : <div className="divide-y divide-gray-200">
              {sortedReviews.map(review => <div key={review.id} className={`p-6 ${review.flagged ? 'bg-red-50' : ''}`}>
                <div className="flex items-start">
                  <img src={review.userAvatar} alt={review.userName} className="h-10 w-10 rounded-full mr-4" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.userName}
                      </h3>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {formatDate(review.date)}
                    </p>
                    <div className="flex items-center mb-2">
                      {review.resourceType === ResourceType.MODEL ? <div className="h-4 w-4 text-blue-600 mr-1" /> : <Database className="h-4 w-4 text-green-600 mr-1" />}
                      <Link to={`/developer/${review.resourceType === ResourceType.MODEL ? 'models' : 'datasets'}/${review.resourceId}`} className="text-sm text-blue-600 hover:text-blue-800">
                        {review.resourceName}
                      </Link>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <div className="mt-4 flex items-center flex-wrap gap-2">
                      <button onClick={() => handleMarkAsHelpful(review.id)} className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs rounded hover:bg-gray-50">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Utile ({review.helpful})
                      </button>
                      <button onClick={() => handleFlagReview(review.id)} className={`inline-flex items-center px-2 py-1 border text-xs rounded ${review.flagged ? 'border-red-300 bg-red-50 text-red-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                        <Flag className="h-3 w-3 mr-1" />
                        {review.flagged ? 'Signalé' : 'Signaler'}
                      </button>
                      {!review.replied && <button onClick={() => handleReplyToReview(review.id)} className="inline-flex items-center px-2 py-1 border border-blue-300 text-xs rounded text-blue-700 hover:bg-blue-50">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Répondre
                      </button>}
                      {review.replied && <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Répondu
                      </span>}
                      <button onClick={() => toggleExpandReview(review.id)} className="inline-flex items-center ml-auto text-sm text-gray-500 hover:text-gray-700">
                        {expandedReview === review.id ? <>
                          Moins <ChevronUp className="h-4 w-4 ml-1" />
                        </> : <>
                          Plus <ChevronDown className="h-4 w-4 ml-1" />
                        </>}
                      </button>
                    </div>
                    {expandedReview === review.id && <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Détails supplémentaires
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">
                            ID de l'évaluation:
                          </span>{' '}
                          {review.id}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">
                            Ressource:
                          </span>{' '}
                          {review.resourceName} (
                          {review.resourceType === ResourceType.MODEL ? 'Modèle' : 'Dataset'}
                          )
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">
                            Utilisateur:
                          </span>{' '}
                          {review.userName}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Date:</span>{' '}
                          {formatDate(review.date)}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Note:</span>{' '}
                          {review.rating}/5
                        </p>
                      </div>
                      {review.replied ? <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Votre réponse
                        </h4>
                        <div className="p-3 bg-white rounded border border-gray-200">
                          <p className="text-sm text-gray-700">
                            Merci pour votre évaluation. Nous
                            apprécions vos commentaires et nous
                            travaillons constamment à améliorer nos
                            modèles.
                          </p>
                        </div>
                      </div> : <div className="mt-4">
                        <button onClick={() => handleReplyToReview(review.id)} className="inline-flex items-center px-3 py-2 border border-blue-300 text-sm rounded text-blue-700 hover:bg-blue-50">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Répondre à cette évaluation
                        </button>
                      </div>}
                    </div>}
                  </div>
                </div>
              </div>)}
            </div>}
          </div>
          {/* Help Box */}
          <div className="mt-6 bg-yellow-50 rounded-xl shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-800 mb-1">
                  Conseils pour gérer les évaluations
                </h3>
                <p className="text-yellow-700 mb-4">
                  Répondez rapidement aux évaluations, surtout celles
                  négatives. Montrez que vous êtes à l'écoute des retours et
                  que vous travaillez à améliorer vos modèles et datasets.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/developer/documentation/review-guidelines" className="inline-flex items-center px-4 py-2 bg-white border border-yellow-300 rounded-lg text-yellow-700 hover:bg-yellow-50">
                    Guide des évaluations
                  </Link>
                  <Link to="/developer/support" className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
                    Signaler un problème
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>;
}