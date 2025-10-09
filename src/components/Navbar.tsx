import { useState } from 'react';
import { MenuIcon, XIcon, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, username, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0" onClick={() => setIsDropdownOpen(false)}>
              <span className="text-2xl font-bold text-blue-600">
                AI<span className="text-2xl font-bold text-gray-900">+</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation et Connexion groupés */}
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-6">
              <Link to="/models" className="text-gray-700 hover:text-blue-600" onClick={() => setIsDropdownOpen(false)}>
                Models
              </Link>
              <Link to="/datasets" className="text-gray-700 hover:text-blue-600" onClick={() => setIsDropdownOpen(false)}>
                Datasets
              </Link>
              <Link to="/docs" className="text-gray-700 hover:text-blue-600" onClick={() => setIsDropdownOpen(false)}>
                Docs
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600" onClick={() => setIsDropdownOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600" onClick={() => setIsDropdownOpen(false)}>
                Contact
              </Link>
            </nav>

            {isAuthenticated === "true" ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-blue-700 text-blue-300 hover:text-blue-900 hover:text-blue"
                  onClick={() => { setIsDropdownOpen(!isDropdownOpen) }}
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 bg-blue-900/30 flex items-center justify-center text-blue-800 text-blue-300 font-medium" >
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline-block font-medium">
                    {username}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                    <Link
                      to={role === "CLIENT" ? "/client/dashboard" : "/developer/dashboard"}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to={role === "CLIENT" ? "/client/profile" : "/developer/profile"}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to={role === "CLIENT" ? "/client/settings" : "/developer/settings"}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Deconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium"
              >
                Connexion
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-gray-100 p-2 rounded-md"
            >
              {isMenuOpen ? <XIcon className="h-5 w-5 text-gray-600" /> : <MenuIcon className="h-5 w-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            <Link
              to="/models"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Models
            </Link>
            <Link
              to="/datasets"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Datasets
            </Link>
            <Link
              to="/docs"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="mt-3 block w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}