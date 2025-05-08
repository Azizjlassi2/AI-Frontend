import React, { useState } from 'react'
import {
  Database,
  Calendar,
  BarChart,
  Tag,
  Star,
  Share2,
  GitBranch,
  Bot,
  Check,
  CreditCard,
  Calendar as CalendarIcon,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
export function ModelDetailPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedPlan, setSelectedPlan] = useState('monthly')
  const model = {
    name: 'ArabicBERT',
    creator: {
      name: 'AI Lab Tunisia',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AI',
      description: 'Laboratory for Arabic Natural Language Processing Research',
      location: 'Tunis, Tunisia',
      joinedDate: '2022',
      models: 12,
      followers: 234,
    },
    description:
      'Un modèle BERT pré-entraîné sur un large corpus de textes arabes, optimisé pour les tâches de traitement du langage naturel en arabe standard moderne et dialectal tunisien.',
    metadata: {
      framework: 'PyTorch',
      size: '1.2GB',
      parameters: '110M',
      lastUpdate: '2023-12-01',
      version: '2.1.0',
      license: 'MIT',
      architecture: 'BERT-base',
      inputType: 'Text',
      outputType: 'Embeddings, Classifications',
      batchSize: '32',
      trainingSamples: '850M tokens',
    },
    stats: {
      downloads: '15.2K',
      stars: '234',
      forks: '45',
      discussions: '23',
    },
    tasks: [
      'Text Classification',
      'Named Entity Recognition',
      'Sentiment Analysis',
      'Question Answering',
    ],
    performance: {
      accuracy: '94.2%',
      f1Score: '0.923',
      precision: '0.918',
      recall: '0.928',
    },
    requirements: {
      python: '>=3.8',
      cuda: '>=11.0',
      ram: '>=8GB',
      dependencies: [
        'torch>=1.9.0',
        'transformers>=4.12.0',
        'arabic-nltk>=0.2.0',
      ],
    },
    plans: {
      monthly: {
        id: 1,
        nom: 'Abonnement Mensuel',
        description: 'Accès complet au modèle avec facturation mensuelle',
        dateCreation: '2023-08-15',
        caracteristiques: [
          "Accès illimité à l'API",
          'Support technique par email',
          'Mises à jour incluses',
          "Jusqu'à 50 000 requêtes par mois",
        ],
        modeleIAId: 12345,
        estActif: true,
        prixMensuel: 29.99,
      },
      annual: {
        id: 2,
        nom: 'Abonnement Annuel',
        description: 'Économisez 20% avec un engagement annuel',
        dateCreation: '2023-08-15',
        caracteristiques: [
          'Tout ce qui est inclus dans le plan mensuel',
          "Jusqu'à 100 000 requêtes par mois",
          'Support technique prioritaire',
          'Accès aux fonctionnalités bêta',
        ],
        modeleIAId: 12345,
        estActif: true,
        prixAnnuel: 287.9,
        remise: 20,
      },
      payAsYouUse: {
        id: 3,
        nom: 'Pay As You Use',
        description: 'Payez uniquement pour ce que vous utilisez',
        dateCreation: '2023-08-15',
        caracteristiques: [
          "Pas d'abonnement fixe",
          "Facturation à l'utilisation",
          'Parfait pour les projets avec un volume variable',
          'Support technique standard',
        ],
        modeleIAId: 12345,
        estActif: true,
        coutParRequete: 0.0015,
      },
    },
  }
  const renderPlanFeatures = (features: any[]) => {
    return features.map((feature, index) => (
      <li key={index} className="flex items-center mb-2">
        <Check className="h-5 w-5 text-green-500 mr-2" />
        <span className="text-gray-700">{feature}</span>
      </li>
    ))
  }
  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans-section')
    plansSection?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  const handlePlanSelection = () => {
    navigate('payment')
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Bot className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {model.name}
                </h1>
                <p className="text-gray-600">par {model.creator.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-blue-600">
                <Star className="h-5 w-5 mr-1" />
                {model.stats.stars}
              </button>

              <button className="flex items-center text-gray-600 hover:text-blue-600">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-6">{model.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {model.tasks.map((task) => (
              <span
                key={task}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                <Tag className="h-3 w-3 mr-2" />
                {task}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToPlans}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Déployer
            </button>
          </div>
        </div>

        {/* Plans d'abonnement */}
        <div
          id="plans-section"
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Plans d'abonnement</h2>

          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-4 py-2 rounded-md ${selectedPlan === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setSelectedPlan('annual')}
                className={`px-4 py-2 rounded-md ${selectedPlan === 'annual' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
              >
                Annuel
              </button>
              <button
                onClick={() => setSelectedPlan('payAsYouUse')}
                className={`px-4 py-2 rounded-md ${selectedPlan === 'payAsYouUse' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
              >
                Pay As You Use
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan Mensuel */}
            <div
              className={`border rounded-xl p-6 ${selectedPlan === 'monthly' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}`}
            >
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">
                  {model.plans.monthly.nom}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {model.plans.monthly.description}
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold">
                  {model.plans.monthly.prixMensuel}€
                </span>
                <span className="text-gray-500"> /mois</span>
              </div>
              <ul className="mb-6">
                {renderPlanFeatures(model.plans.monthly.caracteristiques)}
              </ul>
              <button
                onClick={handlePlanSelection}
                className={`w-full py-2 rounded-lg ${selectedPlan === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Sélectionner
              </button>
            </div>

            {/* Plan Annuel */}
            <div
              className={`border rounded-xl p-6 ${selectedPlan === 'annual' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}`}
            >
              <div className="flex items-center mb-4">
                <CalendarIcon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">
                  {model.plans.annual.nom}
                </h3>
              </div>
              <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full inline-block mb-2">
                Économisez {model.plans.annual.remise}%
              </div>
              <p className="text-gray-600 mb-4">
                {model.plans.annual.description}
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold">
                  {model.plans.annual.prixAnnuel}€
                </span>
                <span className="text-gray-500"> /an</span>
                <div className="text-sm text-gray-500">
                  soit {(model.plans.annual.prixAnnuel / 12).toFixed(2)}€ /mois
                </div>
              </div>
              <ul className="mb-6">
                {renderPlanFeatures(model.plans.annual.caracteristiques)}
              </ul>
              <button
                onClick={handlePlanSelection}
                className={`w-full py-2 rounded-lg ${selectedPlan === 'annual' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Sélectionner
              </button>
            </div>

            {/* Plan Pay As You Use */}
            <div
              className={`border rounded-xl p-6 ${selectedPlan === 'payAsYouUse' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'}`}
            >
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">
                  {model.plans.payAsYouUse.nom}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {model.plans.payAsYouUse.description}
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold">
                  {model.plans.payAsYouUse.coutParRequete}€
                </span>
                <span className="text-gray-500"> /requête</span>
              </div>
              <ul className="mb-6">
                {renderPlanFeatures(model.plans.payAsYouUse.caracteristiques)}
              </ul>
              <button
                onClick={handlePlanSelection}
                className={`w-full py-2 rounded-lg ${selectedPlan === 'payAsYouUse' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Sélectionner
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <img
                  src={model.creator.avatar}
                  alt={model.creator.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-3">
                  <Link
                    to={`/creators/${model.creator.name}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {model.creator.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {model.creator.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {model.creator.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{model.creator.models} modèles</span>
                <span>{model.creator.followers} abonnés</span>
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Suivre
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {model.stats.downloads}
                  </div>
                  <div className="text-sm text-gray-500">Téléchargements</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    {model.stats.discussions}
                  </div>
                  <div className="text-sm text-gray-500">Discussions</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Métadonnées</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Informations générales
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">
                        Taille: {model.metadata.size}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">
                        Architecture: {model.metadata.architecture}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">
                        Mise à jour: {model.metadata.lastUpdate}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Performance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">
                        Précision: {model.performance.accuracy}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">
                        Score F1: {model.performance.f1Score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">
                Exemple d'utilisation
              </h2>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-gray-100">
                  <code>
                    {`from transformers import AutoTokenizer, AutoModel
# Charger le modèle et le tokenizer
tokenizer = AutoTokenizer.from_pretrained("ai-lab-tunisia/arabicbert")
model = AutoModel.from_pretrained("ai-lab-tunisia/arabicbert")
# Exemple d'utilisation
text = "مرحبا بكم في تونس"
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)`}
                  </code>
                </pre>
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
    </div>
  )
}
