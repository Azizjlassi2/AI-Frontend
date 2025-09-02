import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Filter, Download, MoreVertical, Mail, BarChart2, Calendar, Clock, CheckCircle, XCircle, AlertTriangle, ChevronDown, Database, ArrowUpRight, ArrowDownRight, Star, DollarSign } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL',
}
enum ResourceType {
  MODEL = 'MODEL',
  DATASET = 'DATASET',
}
interface Subscriber {
  id: number;
  name: string;
  email: string;
  avatar: string;
  subscriptionType: ResourceType;
  resourceId: number;
  resourceName: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  plan: string;
  revenue: number;
  usage: number;
  country: string;
}
export function DeveloperSubscribersPage() {
  const [activeTab, setActiveTab] = useState('subscribers');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | null>(null);
  const [typeFilter, setTypeFilter] = useState<ResourceType | null>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
  const [subscriberStats, setSubscriberStats] = useState({
    total: 0,
    active: 0,
    canceled: 0,
    expired: 0,
    trial: 0,
    growthRate: 0,
    averageRevenue: 0,
    retentionRate: 0
  });
  useEffect(() => {
    const fetchSubscribers = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock data
        const mockSubscribers: Subscriber[] = [{
          id: 1,
          name: 'Société Tunisienne IA',
          email: 'contact@stia.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=STIA',
          subscriptionType: ResourceType.MODEL,
          resourceId: 1,
          resourceName: 'ArabicBERT',
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Enterprise',
          revenue: 499.99,
          usage: 45280,
          country: 'Tunisie'
        }, {
          id: 2,
          name: 'Université de Tunis',
          email: 'recherche@utunis.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=UT',
          subscriptionType: ResourceType.MODEL,
          resourceId: 2,
          resourceName: 'TunBERT',
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Academic',
          revenue: 199.99,
          usage: 28750,
          country: 'Tunisie'
        }, {
          id: 3,
          name: 'Institut National des Langues',
          email: 'contact@inl.org.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=INL',
          subscriptionType: ResourceType.DATASET,
          resourceId: 1,
          resourceName: 'Tunisian Dialect Corpus',
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Standard',
          revenue: 299.5,
          usage: 1,
          country: 'Tunisie'
        }, {
          id: 4,
          name: 'Tech Solutions SARL',
          email: 'info@techsolutions.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TS',
          subscriptionType: ResourceType.MODEL,
          resourceId: 1,
          resourceName: 'ArabicBERT',
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Professional',
          revenue: 299.99,
          usage: 18200,
          country: 'Tunisie'
        }, {
          id: 5,
          name: 'Hôpital Universitaire de Tunis',
          email: 'medical@hopital-tunis.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HUT',
          subscriptionType: ResourceType.DATASET,
          resourceId: 2,
          resourceName: 'Medical Images 2024',
          status: SubscriptionStatus.ACTIVE,
          startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Healthcare',
          revenue: 450.0,
          usage: 1,
          country: 'Tunisie'
        }, {
          id: 6,
          name: 'Clinique Al Farabi',
          email: 'tech@alfarabi.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CAF',
          subscriptionType: ResourceType.MODEL,
          resourceId: 3,
          resourceName: 'MedicalVision AI',
          status: SubscriptionStatus.TRIAL,
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Trial',
          revenue: 0,
          usage: 2450,
          country: 'Tunisie'
        }, {
          id: 7,
          name: 'Startup Innovation Hub',
          email: 'contact@innovhub.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SIH',
          subscriptionType: ResourceType.MODEL,
          resourceId: 4,
          resourceName: 'TunisianNER',
          status: SubscriptionStatus.CANCELED,
          startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Startup',
          revenue: 149.99,
          usage: 8750,
          country: 'Tunisie'
        }, {
          id: 8,
          name: "Ministère de l'Éducation",
          email: 'digital@education.gov.tn',
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=ME',
          subscriptionType: ResourceType.MODEL,
          resourceId: 1,
          resourceName: 'ArabicBERT',
          status: SubscriptionStatus.EXPIRED,
          startDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          plan: 'Government',
          revenue: 799.99,
          usage: 52800,
          country: 'Tunisie'
        }];
        setSubscribers(mockSubscribers);
        // Calculate subscriber stats
        const total = mockSubscribers.length;
        const active = mockSubscribers.filter(s => s.status === SubscriptionStatus.ACTIVE).length;
        const canceled = mockSubscribers.filter(s => s.status === SubscriptionStatus.CANCELED).length;
        const expired = mockSubscribers.filter(s => s.status === SubscriptionStatus.EXPIRED).length;
        const trial = mockSubscribers.filter(s => s.status === SubscriptionStatus.TRIAL).length;
        const totalRevenue = mockSubscribers.reduce((sum, s) => sum + s.revenue, 0);
        const averageRevenue = totalRevenue / total;
        setSubscriberStats({
          total,
          active,
          canceled,
          expired,
          trial,
          growthRate: 15.3,
          averageRevenue,
          retentionRate: 82.5 // Mock retention rate
        });
      } catch (error) {
        console.error('Error fetching subscribers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubscribers();
  }, []);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleStatusFilterChange = (status: SubscriptionStatus | null) => {
    setStatusFilter(status);
  };
  const handleTypeFilterChange = (type: ResourceType | null) => {
    setTypeFilter(type);
  };
  const toggleDropdown = (subscriberId: number | null) => {
    setShowDropdown(showDropdown === subscriberId ? null : subscriberId);
  };
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };
  const getStatusBadge = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Actif
        </span>;
      case SubscriptionStatus.CANCELED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />
          Annulé
        </span>;
      case SubscriptionStatus.EXPIRED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <Clock className="h-3 w-3 mr-1" />
          Expiré
        </span>;
      case SubscriptionStatus.TRIAL:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Calendar className="h-3 w-3 mr-1" />
          Essai
        </span>;
      default:
        return null;
    }
  };
  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case ResourceType.MODEL:
        return <div className="h-5 w-5 text-blue-600" />;
      case ResourceType.DATASET:
        return <Database className="h-5 w-5 text-green-600" />;
      default:
        return null;
    }
  };
  // Apply filters
  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) || subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) || subscriber.resourceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || subscriber.status === statusFilter;
    const matchesType = !typeFilter || subscriber.subscriptionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });
  return <div className="min-h-screen bg-gray-50">
    <DeveloperDashboardHeader />
    <div className="flex">
      <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              Abonnés
            </h1>
            <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 flex items-center">
              <Download className="h-4 w-4 mr-1.5" />
              Exporter
            </button>
          </div>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total des abonnés
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {subscriberStats.total}
                  </p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">
                  {subscriberStats.growthRate}%
                </span>
                <span className="text-gray-500 text-sm ml-1">ce mois-ci</span>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Abonnés actifs
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {subscriberStats.active}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">
                  {Math.round(subscriberStats.active / subscriberStats.total * 100)}
                  % du total
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Revenu moyen
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatCurrency(subscriberStats.averageRevenue)} TND
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm">Par abonné</span>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Taux de rétention
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {subscriberStats.retentionRate}%
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center">
                <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">2.5%</span>
                <span className="text-gray-500 text-sm ml-1">
                  vs mois dernier
                </span>
              </div>
            </div>
          </div>
          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="text" placeholder="Rechercher des abonnés..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={searchQuery} onChange={handleSearchChange} />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <Filter className="h-5 w-5 mr-2" />
                    {statusFilter ? <>
                      {statusFilter === SubscriptionStatus.ACTIVE && 'Actifs'}
                      {statusFilter === SubscriptionStatus.CANCELED && 'Annulés'}
                      {statusFilter === SubscriptionStatus.EXPIRED && 'Expirés'}
                      {statusFilter === SubscriptionStatus.TRIAL && 'En essai'}
                    </> : 'Tous les statuts'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(null)}>
                      Tous les statuts
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(SubscriptionStatus.ACTIVE)}>
                      Actifs
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(SubscriptionStatus.TRIAL)}>
                      En essai
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(SubscriptionStatus.CANCELED)}>
                      Annulés
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(SubscriptionStatus.EXPIRED)}>
                      Expirés
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <Filter className="h-5 w-5 mr-2" />
                    {typeFilter ? <>
                      {typeFilter === ResourceType.MODEL && 'Modèles'}
                      {typeFilter === ResourceType.DATASET && 'Datasets'}
                    </> : 'Tous les types'}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleTypeFilterChange(null)}>
                      Tous les types
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleTypeFilterChange(ResourceType.MODEL)}>
                      Modèles
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleTypeFilterChange(ResourceType.DATASET)}>
                      Datasets
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Subscribers Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {isLoading ? <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div> : filteredSubscribers.length === 0 ? <div className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun abonné trouvé
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || statusFilter || typeFilter ? 'Aucun abonné ne correspond à vos critères de recherche.' : "Vous n'avez pas encore d'abonnés."}
              </p>
            </div> : <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abonné
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ressource
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de début
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenu
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisation
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscribers.map(subscriber => <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={subscriber.avatar} alt={subscriber.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {subscriber.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {subscriber.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {getTypeIcon(subscriber.subscriptionType)}
                        </div>
                        <div className="text-sm text-gray-900">
                          {subscriber.resourceName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {subscriber.plan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(subscriber.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(subscriber.startDate)}
                      </div>
                      {subscriber.endDate && <div className="text-xs text-gray-500">
                        Fin: {formatDate(subscriber.endDate)}
                      </div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(subscriber.revenue)} TND
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {subscriber.subscriptionType === ResourceType.MODEL ? `${formatNumber(subscriber.usage)} appels` : `${formatNumber(subscriber.usage)} téléchargement${subscriber.usage > 1 ? 's' : ''}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                      <button className="text-gray-400 hover:text-gray-600" onClick={() => toggleDropdown(subscriber.id)}>
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {showDropdown === subscriber.id && <div className="absolute right-6 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <BarChart2 className="h-4 w-4 mr-2" />
                          Voir les statistiques
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Contacter
                        </button>
                        {subscriber.status === SubscriptionStatus.ACTIVE && <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                          <XCircle className="h-4 w-4 mr-2" />
                          Désactiver l'accès
                        </button>}
                      </div>}
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>}
          </div>
          {/* Help Box */}
          <div className="mt-6 bg-blue-50 rounded-xl shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">
                  Conseils pour fidéliser vos abonnés
                </h3>
                <p className="text-blue-700 mb-4">
                  Maintenez un taux de rétention élevé en communiquant
                  régulièrement avec vos abonnés, en améliorant constamment
                  vos modèles et datasets, et en offrant un support de
                  qualité.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/developer/documentation/retention" className="inline-flex items-center px-4 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50">
                    Guide de rétention
                  </Link>
                  <Link to="/developer/analytics" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Analyser les tendances
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