import { User, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast, ToastContainer } from 'react-toastify';

type UserRole = "CLIENT" | "DEVELOPER";

interface FormData {
    username: string;
    email: string;
    password: string;
    role: UserRole;
}

export function RegisterPage() {
    const [userType, setUserType] = useState<UserRole>("CLIENT");
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        role: "CLIENT"
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleUserTypeSelect = (type: UserRole): void => {
        setUserType(type);
        setFormData(prev => ({ ...prev, role: type }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (formData.password !== confirmPassword) {
                toast.error("Les mots de passe ne correspondent pas");
            }

            if (!isValidEmail(formData.email)) {
                toast.error("Veuillez entrer une adresse email valide");
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_HOST}/api/v1/auth/register`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            toast.success("Compte créé avec succès");
            toast.info("Redirection ...");
            navigate("/login");
            console.log(response)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Check for 409 Conflict error
                if (error.response?.status === 409) {
                    toast.error("Email déjà utilisé !");
                } else if (error.response?.data?.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error("Erreur inconnue lors de l'inscription.");
                }
            } else if (error instanceof Error) {
                // JS logic errors like password mismatch
                toast.error(error.message);
            } else {
                toast.error("Une erreur inattendue est survenue.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Créer un compte</h1>
                    <p className="mt-2 text-gray-600">Rejoignez AI+ dès aujourd'hui</p>
                </div>



                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Sélection du type de compte */}
                        <ToastContainer
                            position="top-center"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                Type de compte *
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleUserTypeSelect("CLIENT")}
                                    className={`p-4 border-2 rounded-lg flex flex-col items-center transition-colors ${userType === "CLIENT"
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    aria-pressed={userType === "CLIENT"}
                                    aria-label="Sélectionner compte client"
                                >
                                    <User className="h-6 w-6 text-blue-600 mb-2" />
                                    <span className="font-medium">Client</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleUserTypeSelect("DEVELOPER")}
                                    className={`p-4 border-2 rounded-lg flex flex-col items-center transition-colors ${userType === "DEVELOPER"
                                        ? "border-purple-600 bg-purple-50"
                                        : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    aria-pressed={userType === "DEVELOPER"}
                                    aria-label="Sélectionner compte développeur"
                                >
                                    <UserPlus className="h-6 w-6 text-purple-600 mb-2" />
                                    <span className="font-medium">Développeur</span>
                                </button>
                            </div>
                        </div>

                        {/* Champs du formulaire */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Nom d'utilisateur *
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Adresse email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Mot de passe *
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirmer le mot de passe *
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSubmitting
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                                }`}
                        >
                            {isSubmitting ? "Création en cours..." : "Créer mon compte"}
                        </button>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Ou</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Se connecter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}