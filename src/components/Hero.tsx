import { Link } from 'react-router-dom';
export function Hero() {
  return <section className="relative  bg-cover bg-center py-16 sm:py-24 min-h-screen"
    style={{
      backgroundPosition: 'center', backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
      backgroundImage: `url('/Background-image.jpg')`
    }}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">

      <div className="text-center max-w-4xl mx-auto ">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-6">
          La plateforme tunisienne d'intelligence artificielle
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Partagez, déployez et monétisez vos modèles d'IA.<br /> Rejoignez la
          communauté des développeurs et chercheurs tunisiens en IA.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-3 text-lg font-medium">
            Commencer gratuitement
          </Link>
          <Link to="/models" className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-8 py-3 text-lg font-medium">
            Explorer les modèles
          </Link>
        </div>
      </div>
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden"></div>
      </div>
    </div>
  </section >;
}