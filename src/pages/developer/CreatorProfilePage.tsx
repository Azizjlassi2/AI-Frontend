import { MapPin, Calendar, Award, Star, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
export function CreatorProfilePage() {
  const creator = {
    name: "AI Lab Tunisia",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AI",
    description: "Laboratory for Arabic Natural Language Processing Research",
    location: "Tunis, Tunisia",
    joinedDate: "2022",
    stats: {
      models: 12,
      followers: 234,
      following: 56,
      totalDownloads: "45.2K"
    },
    models: [{
      id: 1,
      name: "ArabicBERT",
      description: "BERT pré-entraîné pour l'arabe",
      downloads: "15.2K",
      stars: 234
    }, {
      id: 2,
      name: "TunisianNER",
      description: "Reconnaissance d'entités nommées en dialecte tunisien",
      downloads: "8.7K",
      stars: 156
    }],
    achievements: ["Top Contributor 2023", "NLP Excellence Award", "100K Downloads Club"]
  };
  return <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img src={creator.avatar} alt={creator.name} className="h-24 w-24 rounded-xl" />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {creator.name}
              </h1>
              <div className="mt-2 flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                {creator.location}
              </div>
              <div className="mt-2 flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                Membre depuis {creator.joinedDate}
              </div>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Suivre
          </button>
        </div>
        <p className="mt-6 text-gray-600 max-w-3xl">{creator.description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {creator.stats.models}
                </div>
                <div className="text-sm text-gray-500">Modèles</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {creator.stats.followers}
                </div>
                <div className="text-sm text-gray-500">Abonnés</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {creator.stats.following}
                </div>
                <div className="text-sm text-gray-500">Abonnements</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {creator.stats.totalDownloads}
                </div>
                <div className="text-sm text-gray-500">Téléchargements</div>
              </div>
            </div>
          </div>
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Réalisations</h2>
            <div className="space-y-3">
              {creator.achievements.map((achievement, index) => <div key={index} className="flex items-center text-gray-600">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                {achievement}
              </div>)}
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">Modèles publiés</h2>
            <div className="space-y-6">
              {creator.models.map(model => <Link key={model.id} to={`/models/${model.id}`} className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {model.name}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {model.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-1" />
                      {model.stars}
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-5 w-5 mr-1" />
                      {model.downloads}
                    </div>
                  </div>
                </div>
              </Link>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}