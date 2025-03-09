import React from 'react';
export function Community() {
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connectez-vous avec des passionnés d'IA, des chercheurs et des
            développeurs en tunisie .
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">150K+</h3>
            <p className="text-gray-600">Membres de la communauté</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">75K+</h3>
            <p className="text-gray-600">Modèles partagés</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">25K+</h3>
            <p className="text-gray-600">Datasets disponibles</p>
          </div>
        </div>
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-12 md:py-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Prêt à commencer ?
            </h3>
            <p className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Rejoignez une communauté dynamique de développeurs, chercheurs et
              entreprises tunisiennes qui contribuent à l'essor de
              l'intelligence artificielle. Publiez vos modèles, partagez vos
              datasets et monétisez vos créations tout en participant à la
              croissance de l'écosystème technologique local.
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 rounded-lg px-8 py-3 text-lg font-medium">
              S'inscrire gratuitement
            </button>
          </div>
        </div>
      </div>
    </section>;
}