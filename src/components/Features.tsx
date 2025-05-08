import { Share2, Server, Coins, UsersIcon } from 'lucide-react';
export function Features() {
  const features = [{
    icon: <Share2 className="h-10 w-10 text-blue-600" />,
    title: 'Partage & Collaboration',
    description: 'Publiez et partagez vos modèles avec la communauté tunisienne d’IA et recevez des retours constructifs.'
  }, {
    icon: <Server className="h-10 w-10 text-blue-600" />,
    title: 'Déploiement Facile',
    description: 'Transformez vos modèles en API sécurisées et évolutives, prêtes à être intégrées dans des applications.'
  }, {
    icon: <Coins className="h-10 w-10 text-blue-600" />,
    title: 'Monétisation',
    description: 'Proposez vos modèles via différents plans d’abonnement et suivez vos revenus en temps réel.'
  }, {
    icon: <UsersIcon className="h-10 w-10 text-blue-600" />,
    title: 'Écosystème IA Tunisien',
    description: 'Contribuer au développement de l\'écosystème de l\'IA en Tunisie en mettant en avant les talents locaux.'
  }];
  return <section className="py-16 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Tout ce dont vous avez besoin pour partager, déployer et monétiser
          vos modèles d'IA
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI+ fournit l'infrastructure et le support nécessaires pour aider
          les développeurs, chercheurs et entreprises à publier, utiliser et
          commercialiser leurs modèles d'intelligence artificielle en Tunisie.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>)}
      </div>
    </div>
  </section>;
}