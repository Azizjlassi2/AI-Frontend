import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Database, Download, FileText, Globe, Calendar, BarChart, Tag, Star, Share2, MessageSquare, ThumbsUp, Send, CreditCard, Clock, ShoppingCart, Lock, ExternalLink, AlertTriangle, Check } from 'lucide-react';
// Dataset visibility options
enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
// Dataset format options
enum DatasetFormat {
  CSV = 'CSV',
  JSON = 'JSON',
  XML = 'XML',
  PARQUET = 'PARQUET',
  IMAGES = 'IMAGES',
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
}
// Dataset license options
enum LicenseType {
  CC_BY = 'CC_BY',
  CC_BY_SA = 'CC_BY_SA',
  CC_BY_NC = 'CC_BY_NC',
  CC_BY_ND = 'CC_BY_ND',
  CC_BY_NC_SA = 'CC_BY_NC_SA',
  CC_BY_NC_ND = 'CC_BY_NC_ND',
  CC0 = 'CC0',
  MIT = 'MIT',
  APACHE_2 = 'APACHE_2',
  GPL_3 = 'GPL_3',
  CUSTOM = 'CUSTOM',
}
// Billing period options
enum BillingPeriod {
  ONE_TIME = 'ONE_TIME',
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
}
interface Comment {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  userLiked: boolean;
}
interface PurchasePlan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: BillingPeriod;
  features: string[];
}
interface Dataset {
  id: number;
  name: string;
  creator: {
    id: number;
    name: string;
    avatar: string;
  };
  description: string;
  metadata: {
    size: string;
    format: DatasetFormat;
    lastUpdate: string;
    version: string;
    license: LicenseType;
    customLicenseUrl?: string;
    domain: string;
    language: string;
    samples: string;
  };
  stats: {
    downloads: string;
    stars: string;
    forks: string;
    comments: number;
  };
  preview: {
    text: string;
    label: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
  visibility: Visibility;
  purchasePlan?: PurchasePlan;
  userOwned: boolean;
  userPurchased: boolean;
}
export function DatasetDetailPage() {
  const {
    datasetId
  } = useParams<{
    datasetId: string;
  }>();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isStarred, setIsStarred] = useState(false);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  useEffect(() => {
    const fetchDataset = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock dataset data
        const mockDataset: Dataset = {
          id: parseInt(datasetId || '1'),
          name: 'Tunisian Dialect Corpus',
          creator: {
            id: 1,
            name: 'ANLP Lab',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AL'
          },
          description: "Un large corpus de textes en dialecte tunisien pour l'entraînement de modèles NLP, comprenant des conversations, des posts sur les réseaux sociaux et des textes journalistiques.",
          metadata: {
            size: '2.3GB',
            format: DatasetFormat.JSON,
            lastUpdate: '2023-12-01',
            version: '2.1.0',
            license: LicenseType.CC_BY_NC_SA,
            domain: 'Natural Language Processing',
            language: 'Tunisian Arabic',
            samples: '1.2M entrées'
          },
          stats: {
            downloads: '12.5K',
            stars: '234',
            forks: '45',
            comments: 8
          },
          preview: [{
            text: 'شنوة الأخبار؟',
            label: 'Question'
          }, {
            text: 'الحمد لله، كل شيء مليح',
            label: 'Response'
          }, {
            text: 'نحب نشري كتاب',
            label: 'Statement'
          }],
          tags: [{
            id: 1,
            name: 'NLP'
          }, {
            id: 2,
            name: 'Arabic'
          }, {
            id: 3,
            name: 'Dialect'
          }, {
            id: 4,
            name: 'Tunisia'
          }],
          visibility: Visibility.PUBLIC,
          purchasePlan: {
            id: 1,
            name: 'Standard Access',
            description: 'Accès complet au dataset avec documentation et support standard',
            price: 149.99,
            currency: 'TND',
            billingPeriod: BillingPeriod.ONE_TIME,
            features: ['Téléchargement complet du dataset', 'Documentation détaillée', 'Mises à jour pendant 1 an', 'Support par email']
          },
          userOwned: false,
          userPurchased: false
        };
        // Mock comments
        const mockComments: Comment[] = [{
          id: 1,
          author: {
            id: 2,
            name: 'Ahmed Ben Ali',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ABA'
          },
          content: "Excellent dataset pour travailler sur le dialecte tunisien. J'ai utilisé ce corpus pour entraîner un modèle de reconnaissance d'entités nommées avec de très bons résultats.",
          date: '2023-11-15T10:30:00Z',
          likes: 12,
          userLiked: false
        }, {
          id: 2,
          author: {
            id: 3,
            name: 'Sarra Mejri',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SM'
          },
          content: 'Est-ce que le dataset inclut des variantes régionales du dialecte tunisien?',
          date: '2023-11-20T14:15:00Z',
          likes: 5,
          userLiked: true
        }, {
          id: 3,
          author: {
            id: 1,
            name: 'ANLP Lab',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AL'
          },
          content: "Oui, le corpus inclut des variantes de plusieurs régions de Tunisie, notamment Tunis, Sousse, Sfax et le sud. Chaque entrée est annotée avec la région d'origine quand celle-ci est connue.",
          date: '2023-11-20T16:45:00Z',
          likes: 8,
          userLiked: false
        }];
        setDataset(mockDataset);
        setComments(mockComments);
      } catch (err) {
        console.error('Error fetching dataset:', err);
        setError('Une erreur est survenue lors du chargement des données du dataset');
      } finally {
        setLoading(false);
      }
    };
    fetchDataset();
  }, [datasetId]);
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const newCommentObj: Comment = {
      id: Date.now(),
      author: {
        id: 999,
        name: 'Mohamed Ben Salem',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MBS' // Current user avatar
      },
      content: newComment,
      date: new Date().toISOString(),
      likes: 0,
      userLiked: false
    };
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
          userLiked: !comment.userLiked
        };
      }
      return comment;
    }));
  };
  const handleToggleStar = () => {
    setIsStarred(!isStarred);
  };
  const handlePurchase = () => {
    if (!dataset?.purchasePlan) return;
    // In a real app, this would redirect to a checkout page
    // For demo purposes, we'll just show a success message
    setShowPurchaseSuccess(true);
    setTimeout(() => {
      setShowPurchaseSuccess(false);
      // Update dataset to show as purchased
      if (dataset) {
        setDataset({
          ...dataset,
          userPurchased: true
        });
      }
      // Navigate to checkout page using the navigate function
      navigate(`/dataset-checkout/${dataset.id}`);
    }, 1500);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      return formatDate(dateString);
    }
  };
  const getLicenseName = (license: LicenseType): string => {
    switch (license) {
      case LicenseType.CC_BY:
        return 'Creative Commons Attribution (CC BY)';
      case LicenseType.CC_BY_SA:
        return 'CC Attribution-ShareAlike (CC BY-SA)';
      case LicenseType.CC_BY_NC:
        return 'CC Attribution-NonCommercial (CC BY-NC)';
      case LicenseType.CC_BY_ND:
        return 'CC Attribution-NoDerivs (CC BY-ND)';
      case LicenseType.CC_BY_NC_SA:
        return 'CC Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)';
      case LicenseType.CC_BY_NC_ND:
        return 'CC Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)';
      case LicenseType.CC0:
        return 'Creative Commons Zero (CC0)';
      case LicenseType.MIT:
        return 'MIT License';
      case LicenseType.APACHE_2:
        return 'Apache License 2.0';
      case LicenseType.GPL_3:
        return 'GNU General Public License v3.0';
      case LicenseType.CUSTOM:
        return 'Licence personnalisée';
      default:
        return '';
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  if (error || !dataset) {
    return <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
            <p className="text-gray-600 mb-6">
              {error || 'Dataset non trouvé'}
            </p>
            <Link to="/datasets" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Retour aux datasets
            </Link>
          </div>
        </div>
      </div>
    </div>;
  }
  return <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Success notification */}
      {showPurchaseSuccess && <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg">
        <Check className="h-5 w-5 mr-2" />
        <span>
          Redirection vers la page de
          paiement...
        </span>
      </div>}
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {dataset.name}
              </h1>
              <div className="flex items-center">
                <img src={dataset.creator.avatar} alt={dataset.creator.name} className="h-5 w-5 rounded-full mr-2" />
                <Link to={`/creators/${dataset.creator.id}`} className="text-blue-600 hover:text-blue-800">
                  {dataset.creator.name}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleToggleStar} className={`flex items-center ${isStarred ? 'text-yellow-500' : 'text-gray-600 hover:text-yellow-500'}`}>
              <Star className={`h-5 w-5 mr-1 ${isStarred ? 'fill-current' : ''}`} />
              {parseInt(dataset.stats.stars) + (isStarred ? 1 : 0)}
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-6">{dataset.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {dataset.tags.map(tag => <Link key={tag.id} to={`/datasets?tag=${tag.name}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Tag className="h-3 w-3 mr-1" />
            {tag.name}
          </Link>)}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Download className="h-4 w-4 mr-1" />
            {dataset.stats.downloads} téléchargements
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Dernière mise à jour: {formatDate(dataset.metadata.lastUpdate)}
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            Version: {dataset.metadata.version}
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            {dataset.stats.comments} commentaires
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metadata */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Métadonnées</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  Taille: {dataset.metadata.size}
                </span>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  Format: {dataset.metadata.format}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  Dernière mise à jour:{' '}
                  {formatDate(dataset.metadata.lastUpdate)}
                </span>
              </div>
              <div className="flex items-center">
                <Tag className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  Version: {dataset.metadata.version}
                </span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  Langue: {dataset.metadata.language}
                </span>
              </div>
              <div className="flex items-center">
                <BarChart className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  Échantillons: {dataset.metadata.samples}
                </span>
              </div>
              <div className="flex items-start">
                <Lock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <span className="text-gray-600 block">
                    Licence: {getLicenseName(dataset.metadata.license)}
                  </span>
                  {dataset.metadata.customLicenseUrl && <a href={dataset.metadata.customLicenseUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center mt-1">
                    Voir la licence{' '}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>}
                </div>
              </div>
            </div>
          </div>
          {/* Pricing */}
          {dataset.purchasePlan && !dataset.userOwned && !dataset.userPurchased && <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Plan d'achat</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">
                {dataset.purchasePlan.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {dataset.purchasePlan.description}
              </p>
              <div className="flex items-baseline mb-4">
                <span className="text-2xl font-bold">
                  {dataset.purchasePlan.price}{' '}
                  {dataset.purchasePlan.currency}
                </span>
                {dataset.purchasePlan.billingPeriod !== BillingPeriod.ONE_TIME && <span className="text-gray-500 ml-1">
                  /
                  {dataset.purchasePlan.billingPeriod === BillingPeriod.MONTHLY ? 'mois' : 'an'}
                </span>}
              </div>
              <div className="space-y-2 mb-4">
                {dataset.purchasePlan.features.map((feature, index) => <div key={index} className="flex items-center text-sm">
                  <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <svg className="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  {feature}
                </div>)}
              </div>
              <button onClick={handlePurchase} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Acheter maintenant
              </button>
              <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                Accès immédiat après paiement
              </div>
            </div>
          </div>}
          {dataset.userPurchased && <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium text-green-800">
                  Accès complet
                </h3>
              </div>
              <p className="text-green-700 mb-4">
                Vous avez acheté ce dataset et avez un accès complet à son
                contenu.
              </p>
              <Link to={`/user/datasets/${dataset.id}/download`} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                Télécharger le dataset
              </Link>
            </div>
          </div>}
        </div>
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Preview */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Aperçu des données</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Texte
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Label
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataset.preview.map((item, index) => <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.text}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.label}
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            {!dataset.userPurchased && !dataset.userOwned && dataset.purchasePlan && <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center text-sm">
              <Lock className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-700">
                Achetez ce dataset pour accéder à toutes les données
              </span>
            </div>}
          </div>
          {/* Comments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Commentaires ({comments.length})
            </h2>
            {/* Comment form */}
            <div className="mb-6">
              <div className="flex space-x-4">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=MBS" alt="Your avatar" className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Ajouter un commentaire..." value={newComment} onChange={e => setNewComment(e.target.value)}></textarea>
                  <div className="mt-2 flex justify-end">
                    <button onClick={handleAddComment} disabled={!newComment.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Commenter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Comments list */}
            <div className="space-y-6">
              {comments.map(comment => <div key={comment.id} className="flex space-x-4">
                <img src={comment.author.avatar} alt={comment.author.name} className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">
                        {comment.author.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTimeAgo(comment.date)}
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <button onClick={() => handleLikeComment(comment.id)} className={`flex items-center text-sm ${comment.userLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}{' '}
                      {comment.likes === 1 ? 'like' : 'likes'}
                    </button>
                  </div>
                </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}