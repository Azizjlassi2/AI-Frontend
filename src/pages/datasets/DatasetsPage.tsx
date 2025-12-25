import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Download, Database, Clock, HardDrive, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useError } from '../../context/ErrorContext';
import { useSuccess } from '../../context/SuccessContext';
import axios from 'axios';

export function DatasetsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [datasets, setDatasets] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const { isAuthenticated, token } = useAuth();
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();

  const types = ['Text', 'Images', 'Audio', 'Video', 'Tabular', 'Medical Images', 'Satellite Images'];
  const languages = ['Arabic', 'French', 'English', 'Tunisian Arabic'];

  const formatToType = (fmt: string): string => {
    if (!fmt) return 'Unknown';
    const lower = fmt.toLowerCase();
    if (lower === 'csv' || lower === 'tabular') return 'Tabular';
    if (lower === 'text') return 'Text';
    if (lower === 'image') return 'Images';
    if (lower === 'audio') return 'Audio';
    if (lower === 'video') return 'Video';
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const getColorFromType = (type: string): string => {
    if (type.includes('Image')) return 'blue';
    if (type === 'Audio') return 'purple';
    if (type === 'Video') return 'red';
    if (type === 'Tabular') return 'orange';
    if (type === 'Text') return 'indigo';
    return 'green';
  };

  const formatRelativeTime = (dateString: string): string => {
    if (!dateString) return 'Inconnu';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) return 'Aujourd’hui';
    if (days === 1) return '1 jour';
    if (days < 7) return `${days} jours`;
    if (days < 14) return '1 semaine';
    return `${Math.floor(days / 7)} semaines`;
  };

  const getSortParams = (sortByValue: string) => {
    switch (sortByValue) {
      case 'recent':
        return { sort: 'updatedAt', dir: 'desc' };
      case 'popular':
        return { sort: 'createdAt', dir: 'desc' };
      case 'downloads':
        return { sort: 'id', dir: 'desc' };
      case 'size':
        return { sort: 'size', dir: 'desc' };
      default:
        return { sort: 'id', dir: 'asc' };
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const params = {
      page: currentPage - 1,
      size: itemsPerPage,
      ...getSortParams(sortBy),
    };

    const config = isAuthenticated ? { headers: { Authorization: `Bearer ${token}` } } : {};

    axios
      .get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/datasets`, { params, ...config })
      .then((res) => {
        const response = res.data?.data;
        console.log("Fetched datasets:", response);

        const formattedDatasets = (response?.content || []).map((dto) => {
          const type = formatToType(dto.format);
          const langTags = dto.tags ? dto.tags.filter((tag: any) => languages.includes(tag.name)).map((tag: any) => tag.name) : [];
          const language = langTags.length > 0 ? langTags.join(', ') : 'N/A';
          const color = getColorFromType(type);
          return {
            id: dto.id ?? 0,
            name: dto.name ?? "Dataset sans nom",
            description: dto.description ?? "",
            creator: dto.developer?.username ?? "Inconnu",
            size: dto.size ?? "Inconnu",
            downloads: "0",
            type,
            language,
            lastUpdate: formatRelativeTime(dto.updatedAt),
            samples: `${dto.sampleCount || 0} échantillons`,
            color,
          };
        });

        setDatasets(formattedDatasets);
        setTotalPages(response.totalPages || 0);
        setTotalElements(response.totalElements || 0);
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        setError({
          message:
            error?.response?.data?.message ||
            "Impossible de charger les datasets. Affichage des datasets mockés.",
          type: "NETWORK",
        });

        setIsLoading(false);
      });
  }, [currentPage, itemsPerPage, sortBy, isAuthenticated, token, setError]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedLanguages([]);
  };

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) || dataset.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTypes = selectedTypes.length === 0 || selectedTypes.includes(dataset.type);
    const matchesLanguages = selectedLanguages.length === 0 || selectedLanguages.some((lang) => dataset.language.includes(lang));
    return matchesSearch && matchesTypes && matchesLanguages;
  });

  const getColorClasses = (color: string) => {
    const colors: Record<string, {
      border: string;
      bg: string;
      text: string;
    }> = {
      blue: {
        border: 'border-blue-200',
        bg: 'bg-blue-50',
        text: 'text-blue-700'
      },
      green: {
        border: 'border-green-200',
        bg: 'bg-green-50',
        text: 'text-green-700'
      },
      purple: {
        border: 'border-purple-200',
        bg: 'bg-purple-50',
        text: 'text-purple-700'
      },
      orange: {
        border: 'border-orange-200',
        bg: 'bg-orange-50',
        text: 'text-orange-700'
      },
      red: {
        border: 'border-red-200',
        bg: 'bg-red-50',
        text: 'text-red-700'
      },
      indigo: {
        border: 'border-indigo-200',
        bg: 'bg-indigo-50',
        text: 'text-indigo-700'
      }
    };
    return colors[color] || colors.green;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des datasets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center mb-4">
            <Database className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Datasets</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explorez des jeux de données de haute qualité pour entraîner vos
            modèles
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher des datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filtres
                {(selectedTypes.length > 0 || selectedLanguages.length > 0) && (
                  <span className="ml-2 px-2 py-0.5 bg-green-600 text-white rounded-full text-xs font-medium">
                    {selectedTypes.length + selectedLanguages.length}
                  </span>
                )}
              </button>
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="popular">Plus populaires</option>
                <option value="recent">Plus récents</option>
                <option value="downloads">Plus téléchargés</option>
                <option value="size">Par taille</option>
              </select>
            </div>
            {/* Active Filters */}
            <AnimatePresence>
              {(selectedTypes.length > 0 || selectedLanguages.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200"
                >
                  {selectedTypes.map((type) => (
                    <motion.span
                      key={type}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium border border-green-200"
                    >
                      {type}
                      <button onClick={() => toggleType(type)} className="ml-2 hover:text-green-900">
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                  {selectedLanguages.map((lang) => (
                    <motion.span
                      key={lang}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-md text-sm font-medium border border-green-200"
                    >
                      {lang}
                      <button onClick={() => toggleLanguage(lang)} className="ml-2 hover:text-green-900">
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-3 py-1.5 text-gray-600 hover:text-gray-900 text-sm font-medium"
                  >
                    Tout effacer
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Types */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Types</h3>
                    <div className="space-y-2">
                      {types.map((type) => (
                        <label key={type} className="flex items-center group cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Languages */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Langues</h3>
                    <div className="space-y-2">
                      {languages.map((language) => (
                        <label key={language} className="flex items-center group cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(language)}
                            onChange={() => toggleLanguage(language)}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{language}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-gray-600"
        >
          {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? 's' : ''} trouvé{filteredDatasets.length !== 1 ? 's' : ''} (page {currentPage} sur {totalPages})
        </motion.div>

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((dataset, index) => {
            const colorClasses = getColorClasses(dataset.color);
            return (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/datasets/${dataset.id}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 overflow-hidden h-full"
                  >
                    {/* Header with color accent */}
                    <div className={`h-2 ${colorClasses.bg}`}></div>
                    <div className="p-6">
                      {/* Stats badges at top */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="px-3 py-1 bg-gray-100 rounded-md border border-gray-200">
                          <div className="flex items-center text-gray-700">
                            <HardDrive className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">{dataset.size}</span>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-gray-100 rounded-md border border-gray-200">
                          <div className="flex items-center text-gray-700">
                            <FileText className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">{dataset.samples}</span>
                          </div>
                        </div>
                      </div>
                      {/* Title and Creator */}
                      <div className="mb-3">
                        <div className="flex items-center mb-1">
                          <Database className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            {dataset.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 ml-7">{dataset.creator}</p>
                      </div>
                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dataset.description}</p>
                      {/* Type Badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium border border-gray-200">
                          {dataset.type}
                        </span>
                      </div>
                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="h-4 w-4 mr-1" />
                          {dataset.downloads}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {dataset.lastUpdate}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredDatasets.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 border-2 border-gray-200">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun dataset trouvé</h3>
            <p className="text-gray-600 mb-6">Essayez de modifier vos filtres ou votre recherche</p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors border border-green-700"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-4 mt-12"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}