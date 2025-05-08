import { Database, FileText, Globe, Calendar, BarChart, Tag, Star, Share2 } from 'lucide-react';
export function DatasetDetailPage() {
  const dataset = {
    name: 'Tunisian Dialect Corpus',
    creator: 'ANLP Lab',
    description: "Un large corpus de textes en dialecte tunisien pour l'entraînement de modèles NLP, comprenant des conversations, des posts sur les réseaux sociaux et des textes journalistiques.",
    metadata: {
      size: '2.3GB',
      format: 'JSON',
      lastUpdate: '2023-12-01',
      version: '2.1.0',
      license: 'CC BY-NC-SA 4.0',
      domain: 'Natural Language Processing',
      language: 'Tunisian Arabic',
      samples: '1.2M entrées'
    },
    stats: {
      downloads: '12.5K',
      stars: '234',
      forks: '45'
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
    }]
  };
  return <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {dataset.name}
              </h1>
              <p className="text-gray-600">{dataset.creator}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Star className="h-5 w-5 mr-1" />
              {dataset.stats.stars}
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-6">{dataset.description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metadata */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
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
                  Dernière mise à jour: {dataset.metadata.lastUpdate}
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
            </div>
          </div>

        </div>
        {/* Preview */}
        <div className="lg:col-span-2">
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
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Commentaires</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">
                  ✨ Excellent modèle pour l'analyse de sentiments en arabe !
                </p>
                <p className="text-sm text-gray-500">- Utilisateur1</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">
                  👍 Fonctionne bien, mais pourrait être amélioré pour les
                  dialectes !
                </p>
                <p className="text-sm text-gray-500">- Utilisateur2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}