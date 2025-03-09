import { useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600">
              AI<span className="text-2xl font-bold text-gray-900">+</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation et Connexion groupés */}
        <div className="flex items-center space-x-8">
          <nav className="hidden md:flex space-x-6">
            <Link to={"/models"} className="text-gray-700 hover:text-blue-600">
              Modèles
            </Link>
            <Link to={"/datasets"} className="text-gray-700 hover:text-blue-600">
              Datasets
            </Link>
            <Link to={"/docs"} className="text-gray-700 hover:text-blue-600">
              Docs
            </Link>
            <Link to={"/about"} className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link to={"/contact"} className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>

          </nav>

          <a href="/login" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium">
            Connexion
          </a>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden bg-gray-100 p-2 rounded-md">
            {isMenuOpen ? <XIcon className="h-5 w-5 text-gray-600" /> : <MenuIcon className="h-5 w-5 text-gray-600" />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
        <a href="/models" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          Modèles
        </a>
        <a href="/datasets" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          Datasets
        </a>

        <a href="/docs" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
          Docs
        </a>

        <a href="/login" className="mt-3 block w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium text-center">
          Connexion
        </a>
      </div>
    </div>}
  </header>;
}