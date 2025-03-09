import { LockIcon, UserIcon, MailIcon, UserPlus, Key } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export function RegisterPage() {
    const [userType, setUserType] = useState("");
    const [showAdminCode, setShowAdminCode] = useState(false);

    interface HandleUserTypeSelect {
        (type: string): void;
    }

    const handleUserTypeSelect: HandleUserTypeSelect = (type) => {
        setUserType(type);
        setShowAdminCode(type === "admin");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
                    <p className="mt-2 text-gray-600">Rejoignez AI+ dès aujourd'hui</p>
                </div>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-8">
                    <form className="space-y-6">
                        {/* Sélection du type de compte */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                Type de compte *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleUserTypeSelect("client")}
                                    className={`p-4 border-2 rounded-lg flex flex-col items-center transition-colors ${userType === "client"
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <UserIcon className="h-6 w-6 text-blue-600 mb-2" />
                                    <span className="font-medium">Client</span>
                                    <span className="text-sm text-gray-600 mt-1 text-center">
                                        Accès aux modèles et API existants
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleUserTypeSelect("developpeur")}
                                    className={`p-4 border-2 rounded-lg flex flex-col items-center transition-colors ${userType === "developpeur"
                                        ? "border-purple-600 bg-purple-50"
                                        : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <UserPlus className="h-6 w-6 text-purple-600 mb-2" />
                                    <span className="font-medium">Développeur</span>
                                    <span className="text-sm text-gray-600 mt-1 text-center">
                                        Publication et monétisation de modèles IA
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleUserTypeSelect("admin")}
                                    className={`p-4 border-2 rounded-lg flex flex-col items-center transition-colors ${userType === "admin"
                                        ? "border-red-600 bg-red-50"
                                        : "border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    <Key className="h-6 w-6 text-red-600 mb-2" />
                                    <span className="font-medium">Administrateur</span>
                                    <span className="text-sm text-gray-600 mt-1 text-center">
                                        Gestion de la plateforme
                                    </span>
                                </button>
                            </div>
                            <input
                                type="hidden"
                                name="userType"
                                value={userType}
                                required
                            />
                        </div>

                        {/* Champs d'identification */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nom complet *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Votre nom complet"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Adresse email *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="vous@exemple.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Champ code admin conditionnel */}
                        {showAdminCode && (
                            <div>
                                <label
                                    htmlFor="adminCode"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Code d'administration *
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Key className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="adminCode"
                                        id="adminCode"
                                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Code fourni par l'équipe"
                                        required={showAdminCode}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Mot de passe */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Mot de passe *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                    minLength={8}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirmer le mot de passe *
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    name="confirm-password"
                                    id="confirm-password"
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="••••••••"
                                    minLength={8}
                                    required
                                />
                            </div>
                        </div>

                        {/* Conditions d'utilisation */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                required
                            />
                            <label
                                htmlFor="terms"
                                className="ml-2 block text-sm text-gray-600"
                            >
                                J'accepte les{" "}
                                <Link
                                    to="/terms"
                                    className="text-blue-600 hover:text-blue-500"
                                >
                                    conditions d'utilisation
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Créer mon compte
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Vous avez déjà un compte ?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}