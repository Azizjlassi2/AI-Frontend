import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function UserDashboardHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { logout, username, email } = useAuth();

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/client/dashboard"
            className="flex items-center"
            onClick={() => setShowProfileMenu(false)}
          >
            <span className="text-2xl font-bold text-blue-600">
              AI<span className="text-gray-900">+</span>
            </span>
            <span className="ml-2 text-md font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              Client
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              onClick={toggleProfileMenu}
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                {username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:inline-block font-medium">
                {username || 'User'}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {username}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {email}
                  </p>
                </div>
                <Link
                  to="/client/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <UserIcon className="h-4 w-4 mr-2" />
                  Mon profil
                </Link>
                <Link
                  to="/client/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => setShowProfileMenu(false)}
                >
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Paramètres
                </Link>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                >
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
