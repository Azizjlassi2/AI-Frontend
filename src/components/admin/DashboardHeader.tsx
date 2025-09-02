import { SearchIcon, UserIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export function DashboardHeader() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const navigate = useNavigate();

    const { logout, username } = useAuth();


    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
        if (showNotifications) setShowNotifications(false);
    };
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 border-b border-gray-700">
            <div className="h-16 px-8 flex items-center justify-between">
                <div className="flex items-center flex-1">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center"
                        onClick={() => setShowProfileMenu(false)}
                    >
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            AI<span className="text-gray-900 dark:text-white">+</span>
                        </span>
                        <span className="ml-4 text-xl font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded">
                            Admin
                        </span>
                    </Link>
                    <div className="ml-8 flex-1 max-w-2xl">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full bg-gray-700 text-gray-100 pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            onClick={toggleProfileMenu}
                        >
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-800 dark:text-blue-300 font-medium">
                                {username.charAt(0) || 'U'}
                            </div>
                            <span className="hidden md:inline-block font-medium">
                                {username || 'User'}
                            </span>
                        </button>
                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                <Link
                                    to="/admin/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                                    onClick={() => setShowProfileMenu(false)}
                                >
                                    <UserIcon className="h-4 w-4 mr-2" />
                                    Mon profil
                                </Link>
                                <Link
                                    to="/admin/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                                    onClick={() => setShowProfileMenu(false)}
                                >
                                    <SettingsIcon className="h-4 w-4 mr-2" />
                                    Paramètres
                                </Link>

                                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                                >
                                    <LogOutIcon className="h-4 w-4 mr-2" />
                                    Déconnexion
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </header >
    )
}
