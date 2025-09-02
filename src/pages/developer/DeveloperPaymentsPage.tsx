import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Download, Filter, Calendar, CreditCard, ArrowUpRight, ArrowDownRight, RefreshCw, ExternalLink, AlertTriangle, Check, Clock, FileText, ChevronDown, Database, BarChart2 } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}
enum PaymentType {
  MODEL_SUBSCRIPTION = 'MODEL_SUBSCRIPTION',
  DATASET_PURCHASE = 'DATASET_PURCHASE',
  API_USAGE = 'API_USAGE',
}
interface Payment {
  id: string;
  date: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  type: PaymentType;
  resourceId: number;
  resourceName: string;
  customerName: string;
  invoiceUrl: string;
}
interface RevenueData {
  totalRevenue: number;
  monthlyRevenue: number;
  monthlyGrowth: number;
  revenueByResource: {
    resourceId: number;
    resourceName: string;
    resourceType: 'MODEL' | 'DATASET';
    amount: number;
    percentage: number;
  }[];
  revenueByMonth: {
    month: string;
    models: number;
    datasets: number;
    total: number;
  }[];
  revenueByDay: {
    date: string;
    amount: number;
  }[];
}
interface PayoutMethod {
  id: string;
  type: 'bank_account' | 'paypal';
  details: {
    bankName?: string;
    accountNumber?: string;
    email?: string;
  };
  isDefault: boolean;
}
export function DeveloperPaymentsPage() {
  const [activeTab, setActiveTab] = useState('payments');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | null>(null);
  const [typeFilter, setTypeFilter] = useState<PaymentType | null>(null);
  const [selectedPayoutTab, setSelectedPayoutTab] = useState<'overview' | 'methods' | 'history'>('overview');
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  useEffect(() => {
    const fetchPaymentsData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock payments data
        const mockPayments: Payment[] = [{
          id: 'PAY-2024-001',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 199.99,
          currency: 'TND',
          status: PaymentStatus.PAID,
          type: PaymentType.MODEL_SUBSCRIPTION,
          resourceId: 1,
          resourceName: 'ArabicBERT',
          customerName: 'Société Tunisienne IA',
          invoiceUrl: '#'
        }, {
          id: 'PAY-2024-002',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 149.99,
          currency: 'TND',
          status: PaymentStatus.PAID,
          type: PaymentType.MODEL_SUBSCRIPTION,
          resourceId: 2,
          resourceName: 'TunBERT',
          customerName: 'Université de Tunis',
          invoiceUrl: '#'
        }, {
          id: 'PAY-2024-003',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 299.5,
          currency: 'TND',
          status: PaymentStatus.PAID,
          type: PaymentType.DATASET_PURCHASE,
          resourceId: 1,
          resourceName: 'Tunisian Dialect Corpus',
          customerName: 'Institut National des Langues',
          invoiceUrl: '#'
        }, {
          id: 'PAY-2024-004',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 78.25,
          currency: 'TND',
          status: PaymentStatus.PAID,
          type: PaymentType.API_USAGE,
          resourceId: 1,
          resourceName: 'ArabicBERT API',
          customerName: 'Tech Solutions SARL',
          invoiceUrl: '#'
        }, {
          id: 'PAY-2024-005',
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 450.0,
          currency: 'TND',
          status: PaymentStatus.PAID,
          type: PaymentType.DATASET_PURCHASE,
          resourceId: 2,
          resourceName: 'Medical Images 2024',
          customerName: 'Hôpital Universitaire de Tunis',
          invoiceUrl: '#'
        }, {
          id: 'PAY-2024-006',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 199.99,
          currency: 'TND',
          status: PaymentStatus.PENDING,
          type: PaymentType.MODEL_SUBSCRIPTION,
          resourceId: 3,
          resourceName: 'MedicalVision AI',
          customerName: 'Clinique Al Farabi',
          invoiceUrl: '#'
        }, {
          id: 'PAY-2024-007',
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 49.99,
          currency: 'TND',
          status: PaymentStatus.FAILED,
          type: PaymentType.MODEL_SUBSCRIPTION,
          resourceId: 4,
          resourceName: 'TunisianNER',
          customerName: 'Startup Innovation Hub',
          invoiceUrl: '#'
        }];
        // Generate mock revenue data
        const mockRevenueData: RevenueData = {
          totalRevenue: 12750.45,
          monthlyRevenue: 3250.75,
          monthlyGrowth: 12.5,
          revenueByResource: [{
            resourceId: 1,
            resourceName: 'ArabicBERT',
            resourceType: 'MODEL',
            amount: 5250.5,
            percentage: 41.2
          }, {
            resourceId: 2,
            resourceName: 'TunBERT',
            resourceType: 'MODEL',
            amount: 2800.25,
            percentage: 22.0
          }, {
            resourceId: 1,
            resourceName: 'Tunisian Dialect Corpus',
            resourceType: 'DATASET',
            amount: 1750.75,
            percentage: 13.7
          }, {
            resourceId: 2,
            resourceName: 'Medical Images 2024',
            resourceType: 'DATASET',
            amount: 1350.5,
            percentage: 10.6
          }, {
            resourceId: 3,
            resourceName: 'MedicalVision AI',
            resourceType: 'MODEL',
            amount: 950.25,
            percentage: 7.5
          }, {
            resourceId: 4,
            resourceName: 'TunisianNER',
            resourceType: 'MODEL',
            amount: 650.2,
            percentage: 5.0
          }],
          revenueByMonth: generateMonthlyRevenueData(),
          revenueByDay: generateDailyRevenueData()
        };
        // Mock payout methods
        const mockPayoutMethods: PayoutMethod[] = [{
          id: 'pm_1',
          type: 'bank_account',
          details: {
            bankName: 'Banque Nationale de Tunisie',
            accountNumber: '•••• 5678'
          },
          isDefault: true
        }, {
          id: 'pm_2',
          type: 'paypal',
          details: {
            email: 'ai.lab.tunisia@example.com'
          },
          isDefault: false
        }];
        setPayments(mockPayments);
        setRevenueData(mockRevenueData);
        setPayoutMethods(mockPayoutMethods);
      } catch (error) {
        console.error('Error fetching payments data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaymentsData();
  }, [dateRange]);
  function generateMonthlyRevenueData() {
    const data = [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    for (let i = 5; i >= 0; i--) {
      let month = currentMonth - i;
      let year = currentYear;
      if (month < 0) {
        month += 12;
        year -= 1;
      }
      const date = new Date(year, month, 1);
      const monthName = date.toLocaleString('fr-FR', {
        month: 'short'
      });
      // Generate some realistic looking data with randomness
      const modelsRevenue = 1000 + Math.random() * 1000 + i * 100; // Increasing trend
      const datasetsRevenue = 500 + Math.random() * 500 + i * 50; // Increasing trend
      data.push({
        month: `${monthName} ${year}`,
        models: Math.round(modelsRevenue),
        datasets: Math.round(datasetsRevenue),
        total: Math.round(modelsRevenue + datasetsRevenue)
      });
    }
    return data;
  }
  function generateDailyRevenueData() {
    const data = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      // Generate some realistic looking data with randomness
      // Weekends have less revenue
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const baseAmount = isWeekend ? 50 : 100;
      const randomFactor = Math.random() * 100;
      data.push({
        date: dateString,
        amount: Math.round(baseAmount + randomFactor)
      });
    }
    return data;
  }
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleDateRangeChange = (range: '7d' | '30d' | '90d' | 'all') => {
    setDateRange(range);
  };
  const handleStatusFilterChange = (status: PaymentStatus | null) => {
    setStatusFilter(status);
  };
  const handleTypeFilterChange = (type: PaymentType | null) => {
    setTypeFilter(type);
  };
  const handlePayoutTabChange = (tab: 'overview' | 'methods' | 'history') => {
    setSelectedPayoutTab(tab);
  };
  const togglePayoutModal = () => {
    setIsPayoutModalOpen(!isPayoutModalOpen);
  };
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <Check className="h-3 w-3 mr-1" />
          Payé
        </span>;
      case PaymentStatus.PENDING:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          En attente
        </span>;
      case PaymentStatus.FAILED:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Échoué
        </span>;
      default:
        return null;
    }
  };
  const getTypeIcon = (type: PaymentType) => {
    switch (type) {
      case PaymentType.MODEL_SUBSCRIPTION:
        return <div className="h-5 w-5 text-blue-600" />;
      case PaymentType.DATASET_PURCHASE:
        return <Database className="h-5 w-5 text-green-600" />;
      case PaymentType.API_USAGE:
        return <BarChart2 className="h-5 w-5 text-purple-600" />;
      default:
        return <DollarSign className="h-5 w-5 text-gray-600" />;
    }
  };
  const getTypeLabel = (type: PaymentType) => {
    switch (type) {
      case PaymentType.MODEL_SUBSCRIPTION:
        return 'Abonnement modèle';
      case PaymentType.DATASET_PURCHASE:
        return 'Achat dataset';
      case PaymentType.API_USAGE:
        return 'Utilisation API';
      default:
        return type;
    }
  };
  // Apply filters
  const filteredPayments = payments.filter(payment => {
    const matchesStatus = !statusFilter || payment.status === statusFilter;
    const matchesType = !typeFilter || payment.type === typeFilter;
    // Filter by date range
    const paymentDate = new Date(payment.date);
    const now = new Date();
    let startDate;
    switch (dateRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
      default:
        startDate = new Date(0); // Beginning of time
        break;
    }
    const matchesDateRange = paymentDate >= startDate;
    return matchesStatus && matchesType && matchesDateRange;
  });
  // Custom tooltip for charts
  const CustomTooltip = ({
    active,
    payload,
    label
  }: any) => {
    if (active && payload && payload.length) {
      return <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
        <p className="font-medium text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => <p key={index} style={{
          color: entry.color
        }} className="text-sm">
          {entry.name}: {formatCurrency(entry.value)} TND
        </p>)}
      </div>;
    }
    return null;
  };
  // Calculate total amount from filtered payments
  const totalFilteredAmount = filteredPayments.reduce((sum, payment) => payment.status === PaymentStatus.PAID ? sum + payment.amount : sum, 0);
  return <div className="min-h-screen bg-gray-50">
    <DeveloperDashboardHeader />
    <div className="flex">
      <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0 flex items-center">
              <DollarSign className="h-6 w-6 text-green-600 mr-2" />
              Paiements
            </h1>
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-white rounded-md border border-gray-200 shadow-sm">
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '7d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('7d')}>
                  7 jours
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '30d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('30d')}>
                  30 jours
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === '90d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('90d')}>
                  90 jours
                </button>
                <button className={`px-3 py-1.5 text-sm rounded-md ${dateRange === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => handleDateRangeChange('all')}>
                  Tout
                </button>
              </div>
              <button className="px-3 py-1.5 text-sm bg-white text-gray-700 rounded-md border border-gray-200 shadow-sm hover:bg-gray-100 flex items-center">
                <Download className="h-4 w-4 mr-1.5" />
                Exporter
              </button>
            </div>
          </div>
          {/* Revenue Overview */}
          {revenueData && <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Revenu total
              </h2>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(revenueData.totalRevenue)} TND
                </span>
              </div>
              <div className="mt-4">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{
                    width: '100%'
                  }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Total à vie</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Revenu mensuel
              </h2>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(revenueData.monthlyRevenue)} TND
                </span>
                <span className="ml-2 flex items-center text-sm font-medium text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {revenueData.monthlyGrowth}%
                </span>
              </div>
              <div className="mt-4">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{
                    width: `${revenueData.monthlyRevenue / (revenueData.totalRevenue / 12) * 100}%`
                  }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Ce mois-ci</span>
                  <span>vs moyenne mensuelle</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                Paiements filtrés
              </h2>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalFilteredAmount)} TND
                </span>
              </div>
              <div className="mt-4">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{
                    width: `${totalFilteredAmount / revenueData.totalRevenue * 100}%`
                  }}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Filtrés</span>
                  <span>du total</span>
                </div>
              </div>
            </div>
          </div>}
          {/* Revenue Charts */}
          {revenueData && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Revenus mensuels
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData.revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{
                      fontSize: 12
                    }} tickMargin={10} />
                    <YAxis tick={{
                      fontSize: 12
                    }} width={70} tickFormatter={value => `${value} TND`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="models" name="Modèles" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="datasets" name="Datasets" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Modèles</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Datasets</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Revenus quotidiens (30 jours)
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData.revenueByDay}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" tick={{
                      fontSize: 12
                    }} tickMargin={10} tickFormatter={value => {
                      const date = new Date(value);
                      return date.toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit'
                      });
                    }} />
                    <YAxis tick={{
                      fontSize: 12
                    }} width={70} tickFormatter={value => `${value} TND`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="amount" name="Revenu" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{
                      r: 6
                    }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>}
          {/* Payout Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button className={`px-6 py-4 text-sm font-medium ${selectedPayoutTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => handlePayoutTabChange('overview')}>
                  Aperçu des paiements
                </button>
                <button className={`px-6 py-4 text-sm font-medium ${selectedPayoutTab === 'methods' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => handlePayoutTabChange('methods')}>
                  Méthodes de paiement
                </button>
                <button className={`px-6 py-4 text-sm font-medium ${selectedPayoutTab === 'history' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} onClick={() => handlePayoutTabChange('history')}>
                  Historique des versements
                </button>
              </nav>
            </div>
            <div className="p-6">
              {selectedPayoutTab === 'overview' && <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Solde disponible
                    </h2>
                    <p className="text-sm text-gray-500">
                      Montant disponible pour le versement
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button onClick={togglePayoutModal} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Demander un versement
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Solde actuel
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        2,450.75 TND
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Mise à jour le{' '}
                        {formatDate(new Date().toISOString())}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 space-y-2">
                      <div className="flex items-center text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Prochain versement automatique le 15 juin 2024
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Seuil minimum de versement: 500 TND
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-4">
                    Revenus par ressource
                  </h3>
                  <div className="space-y-4">
                    {revenueData?.revenueByResource.map((resource, index) => <div key={index} className="flex items-center">
                      <div className="mr-4">
                        {resource.resourceType === 'MODEL' ? <div className="h-5 w-5 text-blue-600" /> : <Database className="h-5 w-5 text-green-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {resource.resourceName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatCurrency(resource.amount)} TND
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 rounded-full ${resource.resourceType === 'MODEL' ? 'bg-blue-500' : 'bg-green-500'}`} style={{
                            width: `${resource.percentage}%`
                          }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {resource.resourceType === 'MODEL' ? 'Modèle' : 'Dataset'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {resource.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>)}
                  </div>
                </div>
              </div>}
              {selectedPayoutTab === 'methods' && <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Méthodes de paiement
                    </h2>
                    <p className="text-sm text-gray-500">
                      Gérer vos méthodes de versement
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Ajouter une méthode
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {payoutMethods.map(method => <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {method.type === 'bank_account' ? <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div> : <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                          <DollarSign className="h-5 w-5 text-indigo-600" />
                        </div>}
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {method.type === 'bank_account' ? 'Compte bancaire' : 'PayPal'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {method.type === 'bank_account' ? `${method.details.bankName} - ${method.details.accountNumber}` : method.details.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {method.isDefault && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                          Par défaut
                        </span>}
                        <button className="text-gray-400 hover:text-gray-600">
                          <ChevronDown className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>)}
                </div>
              </div>}
              {selectedPayoutTab === 'history' && <div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Historique des versements
                    </h2>
                    <p className="text-sm text-gray-500">
                      Versements effectués sur votre compte
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter l'historique
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Montant
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Méthode
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          15 Mai 2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          1,850.25 TND
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Compte bancaire
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Complété
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Détails
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          15 Avril 2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          1,250.50 TND
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Compte bancaire
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Complété
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Détails
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          15 Mars 2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          950.75 TND
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Compte bancaire
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Complété
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Détails
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>}
            </div>
          </div>
          {/* Payments Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">
                  Transactions récentes
                </h2>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                      <Filter className="h-5 w-5 mr-2" />
                      {statusFilter ? getStatusBadge(statusFilter) : 'Tous les statuts'}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(null)}>
                        Tous les statuts
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(PaymentStatus.PAID)}>
                        Payé
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(PaymentStatus.PENDING)}>
                        En attente
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleStatusFilterChange(PaymentStatus.FAILED)}>
                        Échoué
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                      <Filter className="h-5 w-5 mr-2" />
                      {typeFilter ? getTypeLabel(typeFilter) : 'Tous les types'}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleTypeFilterChange(null)}>
                        Tous les types
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleTypeFilterChange(PaymentType.MODEL_SUBSCRIPTION)}>
                        Abonnement modèle
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleTypeFilterChange(PaymentType.DATASET_PURCHASE)}>
                        Achat dataset
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => handleTypeFilterChange(PaymentType.API_USAGE)}>
                        Utilisation API
                      </button>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Actualiser
                  </button>
                </div>
              </div>
            </div>
            {isLoading ? <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div> : filteredPayments.length === 0 ? <div className="p-8 text-center">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune transaction trouvée
              </h3>
              <p className="text-gray-500 mb-4">
                Aucune transaction ne correspond à vos critères de
                recherche.
              </p>
            </div> : <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ressource
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.map(payment => <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {payment.customerName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {getTypeIcon(payment.type)}
                        </div>
                        <div className="text-sm text-gray-900">
                          {payment.resourceName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTypeLabel(payment.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount)} {payment.currency}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <a href={payment.invoiceUrl} className="text-blue-600 hover:text-blue-900 flex items-center" target="_blank" rel="noopener noreferrer">
                          <FileText className="h-4 w-4 mr-1" />
                          Facture
                        </a>
                      </div>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>}
          </div>
          {/* Help Box */}
          <div className="mt-6 bg-green-50 rounded-xl shadow-sm p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-800 mb-1">
                  Besoin d'aide avec vos paiements ?
                </h3>
                <p className="text-green-700 mb-4">
                  Consultez notre documentation sur les paiements ou contactez
                  notre support pour toute question concernant vos revenus,
                  versements ou factures.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/developer/documentation/payments" className="inline-flex items-center px-4 py-2 bg-white border border-green-300 rounded-lg text-green-700 hover:bg-green-50">
                    Documentation
                  </Link>
                  <Link to="/developer/support" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Contacter le support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    {/* Payout Modal */}
    {isPayoutModalOpen && <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Demander un versement
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Vous êtes sur le point de demander un versement de votre
                    solde disponible. Ce processus peut prendre jusqu'à 7
                    jours ouvrables.
                  </p>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Méthode de versement
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>
                        Banque Nationale de Tunisie •••• 5678 (Par défaut)
                      </option>
                      <option>PayPal - ai.lab.tunisia@example.com</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Montant à verser
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">
                          TND
                        </span>
                      </div>
                      <input type="text" className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 py-2 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" defaultValue="2,450.75" />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Max
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Des frais de service de 1.5% s'appliquent à tous
                          les versements, avec un minimum de 5 TND.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={togglePayoutModal}>
              Confirmer le versement
            </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={togglePayoutModal}>
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>}
  </div>;
}