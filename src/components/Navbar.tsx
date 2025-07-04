import { useState } from 'react';
import { MenuIcon, XIcon, UserCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found. Cannot log out.");
        return;
      }

      const response = await axios.post("http://localhost:8080/api/v1/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response.data);
        console.log("Logout successful");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
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
              <Link to="/models" className="text-gray-700 hover:text-blue-600">
                Models
              </Link>
              <Link to="/datasets" className="text-gray-700 hover:text-blue-600">
                Datasets
              </Link>
              <Link to="/docs" className="text-gray-700 hover:text-blue-600">
                Docs
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600">
                Contact
              </Link>
            </nav>

            {username ? (
              <div className="relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                  <UserCircle className="h-8 w-8 text-gray-600" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <Link to={role === "CLIENT" ? "/client/dashboard" : "/dev/dashboard"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to={role === "CLIENT" ? "/client/settings" : "/dev/settings"} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Deconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium">
                Connexion
              </Link>
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden bg-gray-100 p-2 rounded-md">
              {isMenuOpen ? <XIcon className="h-5 w-5 text-gray-600" /> : <MenuIcon className="h-5 w-5 text-gray-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            <Link to="/models" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Models
            </Link>
            <Link to="/datasets" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Datasets
            </Link>
            <Link to="/docs" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Docs
            </Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              About
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Contact
            </Link>
            <Link to="/login" className="mt-3 block w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium text-center">
              Connexion
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
