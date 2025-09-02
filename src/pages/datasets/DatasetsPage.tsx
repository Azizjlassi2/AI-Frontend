import { SearchIcon, FilterIcon, SortAscIcon, TagIcon, DatabaseIcon, DownloadIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export function DatasetsPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const datasets = [{
    id: 2,
    name: "Tunisian Agricultural Drone Imagery",
    creator: "INRAT",
    description: "Images aériennes de cultures tunisiennes (oliviers, céréales)",
    size: "32GB",
    downloads: "1.8K",
    type: "Satellite Images",
    language: "N/A",
    lastUpdate: "2 semaines"
  }, {
    id: 3,
    name: "Tunisian Speech Commands",
    creator: "ANLP Lab",
    description: "Enregistrements vocaux de commandes en dialecte tunisien",
    size: "8.2GB",
    downloads: "3.1K",
    type: "Audio",
    language: "Tunisian Arabic",
    lastUpdate: "1 jour"
  }, {
    id: 4,
    name: "Tunisian Olive Oil Quality",
    creator: "CERTE",
    description: "Données chimiques et sensoriels de 500 échantillons d'huile d'olive",
    size: "120MB",
    downloads: "950",
    type: "CSV",
    language: "French/Arabic",
    lastUpdate: "3 semaines"
  }, {
    id: 5,
    name: "Tunis Traffic Cameras Dataset",
    creator: "Municipalité de Tunis",
    description: "Images de circulation annotées (véhicules, piétons)",
    size: "45GB",
    downloads: "4.2K",
    type: "Video",
    language: "N/A",
    lastUpdate: "6 jours"
  }, {
    id: 6,
    name: "Tunisian Social Media Sentiment",
    creator: "INS",
    description: "1M de posts Facebook/Twitter annotés en sentiment (positif/négatif)",
    size: "850MB",
    downloads: "6.7K",
    type: "Text",
    language: "Tunisian Arabic",
    lastUpdate: "4 jours"
  }, {
    id: 7,
    name: "Tunisian Archaeological Artifacts",
    creator: "INP",
    description: "Scans 3D d'artefacts historiques de Carthage et Dougga",
    size: "78GB",
    downloads: "890",
    type: "3D Models",
    language: "N/A",
    lastUpdate: "1 mois"
  }, {
    id: 8,
    name: "Tunisian E-Commerce Products",
    creator: "Tunisian AI Startups",
    description: "Base de données de 50k produits e-commerce avec images",
    size: "12GB",
    downloads: "3.9K",
    type: "Images+Metadata",
    language: "French/Arabic",
    lastUpdate: "1 semaine"
  }, {
    id: 9,
    name: "Tunisian Solar Energy Production",
    creator: "STEG",
    description: "Données temporelles de production solaire (2015-2023)",
    size: "320MB",
    downloads: "1.2K",
    type: "Time Series",
    language: "French",
    lastUpdate: "2 jours"
  }, {
    id: 10,
    name: "Tunisian Bird Species Recognition",
    creator: "Association Les Amis des Oiseaux",
    description: "Images d'oiseaux migrateurs des zones humides tunisiennes",
    size: "6.5GB",
    downloads: "670",
    type: "Images",
    language: "N/A",
    lastUpdate: "3 semaines"
  }, {
    id: 11,
    name: "Tunisian Handwritten Arabic Digits",
    creator: "ENSI",
    description: "50k échantillons de chiffres manuscrits arabes",
    size: "2.1GB",
    downloads: "5.4K",
    type: "Images",
    language: "N/A",
    lastUpdate: "1 semaine"
  }, {
    id: 12,
    name: "Tunisian Air Quality Sensors",
    creator: "APAL",
    description: "Données de pollution de l'air (PM2.5, NO2) de 20 capteurs",
    size: "85MB",
    downloads: "1.5K",
    type: "CSV",
    language: "French",
    lastUpdate: "9 jours"
  }, {
    id: 13,
    name: "Tunisian Diabetes Screening",
    creator: "Ministère de la Santé",
    description: "Données anonymisées de 10k patients diabétiques",
    size: "45MB",
    downloads: "2.1K",
    type: "CSV",
    language: "French",
    lastUpdate: "5 jours"
  }, {
    id: 14,
    name: "Tunisian Marine Life Dataset",
    creator: "INSTM",
    description: "Images sous-marines annotées de la faune méditerranéenne",
    size: "24GB",
    downloads: "430",
    type: "Images",
    language: "N/A",
    lastUpdate: "2 semaines"
  }, {
    id: 15,
    name: "Tunisian Road Conditions",
    creator: "Ministère de l'Équipement",
    description: "Images de routes tunisiennes avec annotations de dégradation",
    size: "33GB",
    downloads: "2.8K",
    type: "Images",
    language: "N/A",
    lastUpdate: "3 jours"
  }];
  const types = ["Text", "Images", "Audio", "Video", "Tabular"];
  const languages = [
    "Modern Standard Arabic", "Tunisian Arabic (Darija)", "English", "Mandarin Chinese", "Hindi", "Spanish", "French", "Standard Arabic", "Bengali",
    "Portuguese", "Russian", "Urdu", "Japanese", "German", "Swahili", "Marathi", "Telugu", "Turkish",
    "Korean", "Tamil", "Vietnamese", "Italian", "Yoruba", "Thai", "Filipino", "Ukrainian", "Malayalam",
    "Indonesian", "Sindhi", "Punjabi", "Farsi", "Polish", "Romanian", "Dutch", "Amharic", "Oromo",
    "Hausa", "Igbo", "Akan", "Somali", "Tigrinya", "Swedish", "Norwegian", "Danish", "Finnish",
    "Greek", "Czech", "Slovak", "Hungarian", "Bulgarian", "Serbian", "Croatian", "Bosnian", "Albanian",
    "Macedonian", "Slovenian", "Latvian", "Lithuanian", "Estonian", "Belarusian", "Georgian", "Armenian",
    "Azerbaijani", "Kazakh", "Kyrgyz", "Turkmen", "Uzbek", "Tajik", "Pashto", "Dari", "Kurdish",
    "Tibetan", "Mongolian", "Uighur", "Kannada", "Gujarati", "Malay", "Burmese", "Khmer", "Lao",];
  return <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Jeux de données</h1>
        <p className="mt-2 text-gray-600">
          Explorez des datasets de haute qualité pour l'entraînement de vos
          modèles
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Types
              </h3>
              <div className="space-y-2">
                {types.map(type => <label key={type} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={selectedTypes.includes(type)} onChange={e => {
                    if (e.target.checked) {
                      setSelectedTypes([...selectedTypes, type]);
                    } else {
                      setSelectedTypes(selectedTypes.filter((t: string) => t !== type));
                    }
                  }} />
                  <span className="ml-2 text-gray-700">{type}</span>
                </label>)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Langues
              </h3>
              <div className="space-y-2">
                {languages.map(language => <label key={language} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={selectedLanguages.includes(language)} onChange={e => {
                    if (e.target.checked) {
                      setSelectedLanguages([...selectedLanguages, language]);
                    } else {
                      setSelectedLanguages(selectedLanguages.filter((l: string) => l !== language));
                    }
                  }} />
                  <span className="ml-2 text-gray-700">{language}</span>
                </label>)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input type="text" placeholder="Rechercher des datasets..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                  <FilterIcon className="h-5 w-5 mr-2" />
                  Filtrer
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                  <SortAscIcon className="h-5 w-5 mr-2" />
                  Trier
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datasets.map((dataset, index) => (
              <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header row with top-right star */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                        <DatabaseIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <Link
                          to={`/datasets/${dataset.id}`}
                          className="text-xl font-semibold text-gray-900 block"
                        >
                          {dataset.name}
                        </Link>
                        <Link
                          to={`/creator/${dataset.creator}`}
                          className="text-sm text-gray-500 block mt-1"
                        >
                          by {dataset.creator}
                        </Link>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-blue-500">
                      <StarIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{dataset.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <TagIcon className="h-3 w-3 mr-1" />
                      {dataset.type}
                    </span>
                    {dataset.language !== "N/A" && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {dataset.language}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <DownloadIcon className="h-4 w-4 mr-1" />
                      {dataset.downloads} • {dataset.size}
                    </div>
                    <span>Mis à jour il y a {dataset.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  </div >;
}

