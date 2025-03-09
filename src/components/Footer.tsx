import { GithubIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Footer() {
  return <footer className="bg-gray-900 text-gray-300">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-blue-500">AI</span>
            <span className="text-2xl font-bold text-white">+</span>
          </div>
          <p className="text-gray-400 mb-4">
            La plateforme tunisienne d'intelligence artificielle.
            <br /> Partagez et découvrez des modèles, des jeux de données et
            des applications pour contribuer à l'essor de l'IA en Tunisie.
          </p>
        </div>
        <div>
          <h3 className="text-white font-medium mb-4">Nos Produits</h3>
          <ul className="space-y-2">
            <li>
              <Link to={"/models"} className="text-gray-400 hover:text-blue-500 transition-colors">
                Modèles
              </Link>
            </li>
            <li>
              <Link to={"/datasets"} className="text-gray-400 hover:text-blue-500 transition-colors">
                Datasets
              </Link>
            </li>
            <li>
              <Link to={"/docs"} className="text-gray-400 hover:text-blue-500 transition-colors">
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-4">À propos de AI+</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/terms"
                className="text-blue-600 hover:text-blue-500"
              >
                Conditions d'utilisation
              </Link>
            </li>
            <li>
              <Link to={"/about"} className="text-gray-400 hover:text-blue-500 transition-colors">
                À propos
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="text-gray-400 hover:text-blue-500 transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to={"/support"} className="text-gray-400 hover:text-blue-500 transition-colors">
                FAQ
              </Link>
            </li>

          </ul>
        </div>
        <div>
          <h3 className="text-white font-medium mb-4">Suivez-nous</h3>
          <div className="flex space-x-4">
            <Link to={""} className="text-gray-400 hover:text-blue-500 transition-colors">
              <GithubIcon className="h-5 w-5" />
            </Link>
            <Link to={""} className="text-gray-400 hover:text-blue-500 transition-colors">
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link to={""} className="text-gray-400 hover:text-blue-500 transition-colors">
              <LinkedinIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} AI+. Tous droits réservés.</p>
      </div>
    </div>
  </footer>;
}