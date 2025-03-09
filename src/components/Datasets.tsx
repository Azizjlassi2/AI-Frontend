import React from 'react';
import { DatabaseIcon, DownloadIcon, TagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Datasets() {
  const datasets = [{
    id: 1,
    name: 'Tunisian License Plates',
    creator: 'National Digital Certification Agency',
    description: "50,000 annotated images de plaques d'immatriculation tunisiennes",
    size: '12.4GB',
    type: 'Images'
  }, {
    id: 2,
    name: 'Olive Disease Detection',
    creator: 'INRAT',
    description: "Données multispectrales de plantations d'oliviers avec annotations de maladies",
    size: '7.8GB',
    type: 'Tabular'
  }, {
    id: 3,
    name: 'Tunisian Parliament Speeches',
    creator: 'Bawsala',
    description: 'Transcripts annotés des sessions parlementaires (2011-2023)',
    size: '650MB',
    type: 'Text'
  }, {
    id: 4,
    name: 'Tunisian Stock Market',
    creator: 'BVMT',
    description: 'Données historiques des transactions boursières (2000-2023)',
    size: '320MB',
    type: 'Time Series'
  }, {
    id: 5,
    name: 'JORT Legal Corpus',
    creator: 'Journal Officiel Tunisien',
    description: 'Corpus juridique structuré (lois, décrets, arrêtés)',
    size: '890MB',
    type: 'Text'
  }, {
    id: 6,
    name: 'Tunisian Road Accidents',
    creator: 'Ministry of Transport',
    description: 'Données géolocalisées des accidents routiers (2015-2022)',
    size: '150MB',
    type: 'Geospatial'
  }, {
    id: 7,
    name: 'Tunisian Dialect Speech',
    creator: 'Mozilla TN',
    description: '2,000 heures de speech en dialecte tunisien annoté',
    size: '45GB',
    type: 'Audio'
  }, {
    id: 8,
    name: 'Saharan Dust Monitoring',
    creator: 'National Institute of Meteorology',
    description: 'Données satellitaires et capteurs sol (2010-2023)',
    size: '23GB',
    type: 'Multimodal'
  }, {
    id: 9,
    name: 'Tunisian Student Performance',
    creator: 'Ministry of Education',
    description: 'Données anonymisées des résultats du bac (2015-2022)',
    size: '75MB',
    type: 'Tabular'
  }, {
    id: 10,
    name: 'COVID-19 Tunisia',
    creator: 'Pasteur Institute',
    description: 'Données épidémiologiques complètes (cas, variants, vaccins)',
    size: '45MB',
    type: 'Time Series'
  }, {
    id: 11,
    name: 'Tunisian E-Commerce',
    creator: 'Tunisian E-commerce Union',
    description: 'Transactions anonymisées de 10 sites marchands',
    size: '1.2GB',
    type: 'Tabular'
  }, {
    id: 12,
    name: 'Tunisian Bird Species',
    creator: 'Association Les Amis des Oiseaux',
    description: 'Enregistrements audio et images de 150 espèces',
    size: '8.3GB',
    type: 'Multimodal'
  }, {
    id: 13,
    name: 'Tunisian Social Media Sentiment',
    creator: 'Tunisia AI',
    description: '1M posts Facebook/Twitter annotés (sentiment, thèmes)',
    size: '4.7GB',
    type: 'Text'
  }, {
    id: 14,
    name: 'Phoenician Artefacts 3D',
    creator: 'INP',
    description: 'Scans 3D haute résolution de 500 artefacts',
    size: '67GB',
    type: '3D Models'
  }, {
    id: 15,
    name: 'Tunisian Diabetes Screening',
    creator: 'National Observatory of Health',
    description: 'Données médicales anonymisées de 50,000 patients',
    size: '230MB',
    type: 'Tabular'
  }];
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Jeux de données
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez des datasets annotés et de haute qualité pour entraîner
            vos modèles d'IA.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {datasets.slice(0, 8).map(dataset => <div key={dataset.id} className="bg-gray-50 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <DatabaseIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {dataset.name}
                    </h3>
                    <p className="text-sm text-gray-500">{dataset.creator}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{dataset.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <TagIcon className="h-4 w-4 mr-1" />
                    {dataset.type}
                  </div>
                  <div className="flex items-center">
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    {dataset.size}
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/datasets" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-2 text-base font-medium">
            Explorer tous les datasets
          </Link>
        </div>
      </div>
    </section>;
}