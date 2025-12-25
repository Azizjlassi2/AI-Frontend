import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Trash2, Download, Eye, Users, TrendingUp, Database, Calendar, FileText, BarChart2 } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
export function DeveloperDatasetDetailPage() {
  const {
    datasetId
  } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('datasets');
  const [dataset, setDataset] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDataset = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setDataset({
        id: datasetId || '1',
        name: 'Tunisian Dialect Corpus',
        description: "Large corpus de textes en dialecte tunisien pour l'entraînement de modèles NLP",
        category: 'NLP',
        size: '2.3GB',
        format: 'JSON',
        license: 'CC BY-NC-SA 4.0',
        version: '3.0.0',
        downloads: 12500,
        revenue: 1750.75,
        purchasers: 89,
        rating: 4.8,
        reviews: 45,
        lastUpdate: '2024-05-15',
        status: 'published'
      });
      setIsLoading(false);
    };
    fetchDataset();
  }, [datasetId]);
  if (isLoading || !dataset) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  return <div className="min-h-screen bg-gray-50">
    <DeveloperDashboardHeader />
    <div className="flex">
      <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/developer/datasets')} className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux datasets
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Database className="h-6 w-6 text-green-600 mr-3" />
                      <h1 className="text-2xl font-bold text-gray-900">
                        {dataset.name}
                      </h1>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {dataset.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Mis à jour le{' '}
                        {new Date(dataset.lastUpdate).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {dataset.status === 'published' ? 'Publié' : 'Brouillon'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/developer/datasets/${datasetId}/update`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[{
                  label: 'Téléchargements',
                  value: dataset.downloads.toLocaleString(),
                  icon: Download,
                  color: 'blue'
                }, {
                  label: 'Acheteurs',
                  value: dataset.purchasers,
                  icon: Users,
                  color: 'green'
                }, {
                  label: 'Revenus',
                  value: `${dataset.revenue.toLocaleString()} TND`,
                  icon: TrendingUp,
                  color: 'purple'
                }, {
                  label: 'Note moyenne',
                  value: dataset.rating,
                  icon: BarChart2,
                  color: 'yellow'
                }].map((stat, index) => {
                  const Icon = stat.icon;
                  return <motion.div key={index} initial={{
                    opacity: 0,
                    y: 20
                  }} animate={{
                    opacity: 1,
                    y: 0
                  }} transition={{
                    delay: index * 0.1
                  }} className="bg-white rounded-xl shadow-sm p-4">
                    <div className={`inline-flex p-2 bg-${stat.color}-100 rounded-lg mb-2`}>
                      <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>;
                })}
              </div>

              {/* Details Card */}
              <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Détails du dataset
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Catégorie</p>
                    <p className="font-medium text-gray-900">
                      {dataset.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Taille</p>
                    <p className="font-medium text-gray-900">
                      {dataset.size}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Format</p>
                    <p className="font-medium text-gray-900">
                      {dataset.format}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Version</p>
                    <p className="font-medium text-gray-900">
                      {dataset.version}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Licence</p>
                    <p className="font-medium text-gray-900">
                      {dataset.license}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions rapides
                </h2>
                <div className="space-y-2">
                  <Link to={`/datasets/${datasetId}`} className="w-full flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir la page publique
                  </Link>
                  <Link to={`/developer/datasets/${datasetId}/update`} className="w-full flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier le dataset
                  </Link>
                  <button className="w-full flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Voir les statistiques
                  </button>
                </div>
              </motion.div>

              {/* Revenue Info */}
              <motion.div initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.1
              }} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-2">
                  Revenus générés
                </h3>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {dataset.revenue.toLocaleString()} TND
                </p>
                <p className="text-sm text-green-700">
                  {dataset.purchasers} acheteurs au total
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>;
}