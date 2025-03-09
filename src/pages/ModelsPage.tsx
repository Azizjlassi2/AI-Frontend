import { SearchIcon, FilterIcon, SortAscIcon, TagIcon, DownloadIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import { Link } from 'react-router-dom';
export function ModelsPage() {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const models = [{
    id: 1,
    name: "MedTun-CXR",
    creator: "CHU Tunis",
    description: "Modèle de détection d'anomalies pulmonaires sur radiographies",
    downloads: "9.3K",
    likes: "421",
    tasks: ["Computer Vision", "Diagnostic Médical"],
    language: "N/A",
    lastUpdate: "1 jour"
  }, {
    id: 2,
    name: "AgriGrowth Predictor",
    creator: "INRAT",
    description: "Prédiction du rendement agricole par analyse d'images drones",
    downloads: "3.8K",
    likes: "89",
    tasks: ["Time Series", "Image Analysis"],
    language: "French",
    lastUpdate: "1 semaine"
  }, {
    id: 3,
    name: "Tunisian Speech2Text",
    creator: "ANLP Lab",
    description: "Reconnaissance vocale pour dialecte tunisien",
    downloads: "12.1K",
    likes: "567",
    tasks: ["Speech Recognition", "NLP"],
    language: "Tunisian Arabic",
    lastUpdate: "3 jours"
  }, {
    id: 4,
    name: "OliveOil Quality AI",
    creator: "CERTE",
    description: "Classification de la qualité de l'huile d'olive par spectrométrie",
    downloads: "2.4K",
    likes: "134",
    tasks: ["Classification", "Chemometrics"],
    language: "French",
    lastUpdate: "5 jours"
  }, {
    id: 5,
    name: "Tunis Traffic Flow",
    creator: "Municipalité de Tunis",
    description: "Optimisation du trafic urbain par analyse vidéo temps réel",
    downloads: "6.7K",
    likes: "278",
    tasks: ["Object Detection", "Time Series"],
    language: "N/A",
    lastUpdate: "2 jours"
  }, {
    id: 6,
    name: "Darija Sentiment",
    creator: "INS",
    description: "Analyse de sentiment pour textes en dialecte tunisien",
    downloads: "14.9K",
    likes: "689",
    tasks: ["NLP", "Sentiment Analysis"],
    language: "Tunisian Arabic",
    lastUpdate: "4 jours"
  }, {
    id: 7,
    name: "ArchiTun-3D",
    creator: "INP",
    description: "Reconnaissance d'architecture historique tunisienne",
    downloads: "1.2K",
    likes: "45",
    tasks: ["3D Recognition", "Cultural Heritage"],
    language: "N/A",
    lastUpdate: "3 semaines"
  }, {
    id: 8,
    name: "E-Commerce TunClassifier",
    creator: "Tunisian AI Startups",
    description: "Classification automatique de produits e-commerce",
    downloads: "7.5K",
    likes: "324",
    tasks: ["Image Classification", "NLP"],
    language: "French/Arabic",
    lastUpdate: "6 jours"
  }, {
    id: 9,
    name: "SolarTun Forecast",
    creator: "STEG",
    description: "Prédiction de production énergétique solaire",
    downloads: "4.6K",
    likes: "157",
    tasks: ["Time Series", "Energy Forecasting"],
    language: "French",
    lastUpdate: "2 jours"
  }, {
    id: 10,
    name: "Tunisian BirdID",
    creator: "AAO Tunisie",
    description: "Identification d'espèces d'oiseaux par image",
    downloads: "3.1K",
    likes: "92",
    tasks: ["Image Recognition", "Ecology"],
    language: "N/A",
    lastUpdate: "1 semaine"
  }];
  const tasks = [
  // NLP
  "Text Classification", "Named Entity Recognition", "Question Answering", "Translation", "Summarization", "Sentiment Analysis", "Text Generation", "Dialogue Systems", "Speech Recognition", "Speech Synthesis",
  // Computer Vision
  "Object Detection", "Image Segmentation", "Image Classification", "OCR (Reconnaissance de texte)", "Face Recognition", "3D Reconstruction",
  // Audio
  "Sound Classification", "Audio Denoising", "Music Generation",
  // Multimodal
  "Text-to-Image", "Image Captioning", "Video Analysis",
  // Time Series
  "Forecasting", "Anomaly Detection", "Predictive Maintenance",
  // Spécialisé
  "Recommendation Systems", "Fraud Detection", "Biomedical Signal Processing",
  // Génération
  "Code Generation", "Data Augmentation",
  // MLOps
  "Model Optimization", "Data Labeling"];
  const languages = [
  // Langues officielles
  "Modern Standard Arabic", "Tunisian Arabic (Darija)", "French", "English",
  // Dialectes régionaux
  "Sfaxi Dialect", "Djerbian Dialect", "Tataouine Dialect",
  // Langues africaines
  "Amazigh (Berber)", "Swahili", "Hausa",
  // Langues de spécialité
  "Medical Arabic", "Legal French", "Technical English",
  // Langues historiques
  "Punic", "Latin (Ancient)",
  // Sign Languages
  "Tunisian Sign Language",
  // Autres langues d'usage
  "Italian", "German", "Spanish",
  // Formats spéciaux
  "Code (Programming Languages)", "Mixed Language (Arabizi)"];
  return <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Modèles</h1>
          <p className="mt-2 text-gray-600">
            Découvrez des modèles d'IA état de l'art pour vos projets
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tâches
                </h3>
                <div className="space-y-2">
                  {tasks.map(task => <label key={task} className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={selectedTasks.includes(task)} onChange={e => {
                    if (e.target.checked) {
                      setSelectedTasks([...selectedTasks, task]);
                    } else {
                      setSelectedTasks(selectedTasks.filter(t => t !== task));
                    }
                  }} />
                      <span className="ml-2 text-gray-700">{task}</span>
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
                      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
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
                  <input type="text" placeholder="Rechercher des modèles..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
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
              {models.map((model, index) => <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Link to="/models/1" className="text-xl font-semibold text-gray-900">
                          {model.name}
                        </Link>
                        <p className="text-sm text-gray-500">{model.creator}</p>
                      </div>
                      <button className="text-gray-400 hover:text-blue-500">
                        <StarIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4">{model.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {model.tasks.map(task => <span key={task} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <TagIcon className="h-3 w-3 mr-1" />
                          {task}
                        </span>)}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <DownloadIcon className="h-4 w-4 mr-1" />
                        {model.downloads} téléchargements
                      </div>
                      <span>Mis à jour il y a {model.lastUpdate}</span>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
}