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
/**
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
*/

import { motion } from 'framer-motion'
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Sparkles,
    Loader2,
    CheckCircle2,
    Code,
    ShoppingBag,
} from 'lucide-react'
type AccountType = 'CLIENT' | 'DEVELOPER'
export function RegisterPage() {
    const [formData, setFormData] = useState({
        accountType: 'CLIENT' as AccountType,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{
        accountType?: string
        name?: string
        email?: string
        password?: string
        confirmPassword?: string
    }>({})
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const passwordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        if (/[^a-zA-Z\d]/.test(password)) strength++
        return strength
    }
    const getStrengthColor = (strength: number) => {
        if (strength === 0) return 'bg-gray-200'
        if (strength === 1) return 'bg-red-500'
        if (strength === 2) return 'bg-yellow-500'
        if (strength === 3) return 'bg-blue-500'
        return 'bg-green-500'
    }
    const getStrengthText = (strength: number) => {
        if (strength === 0) return ''
        if (strength === 1) return 'Faible'
        if (strength === 2) return 'Moyen'
        if (strength === 3) return 'Bon'
        return 'Excellent'
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})
        // Validation
        const newErrors: {
            accountType?: string
            name?: string
            email?: string
            password?: string
            confirmPassword?: string
        } = {}
        if (!formData.accountType)
            newErrors.accountType = 'Veuillez choisir un type de compte'
        if (!formData.name) newErrors.name = 'Nom requis'
        if (!formData.email) newErrors.email = 'Email requis'
        if (!formData.password) newErrors.password = 'Mot de passe requis'
        if (formData.password.length < 8)
            newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères'
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
        if (!agreedToTerms)
            newErrors.confirmPassword = 'Vous devez accepter les conditions'
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsLoading(false)
            return
        }


        try {


            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_HOST}/api/v1/auth/register`,
                {
                    username: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.accountType,
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
            setIsLoading(false);
        }
    }
    const strength = passwordStrength(formData.password)
    return (
        <div className="min-h-screen flex">
            {/* Left side - Branding */}
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-700 to-blue-600 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                />
                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.2,
                            duration: 0.6,
                        }}
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                            <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                            <span className="text-sm font-medium">
                                Rejoignez la communauté
                            </span>
                        </div>
                        <h1 className="text-5xl font-bold mb-6">
                            Créez votre compte
                            <span className="block mt-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                gratuitement
                            </span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-md">
                            Rejoignez des milliers de développeurs et chercheurs qui utilisent
                            AI+ pour leurs projets
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Accès gratuit</p>
                                    <p className="text-sm text-blue-100">
                                        Testez gratuitement nos modèles et datasets
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">API puissante</p>
                                    <p className="text-sm text-blue-100">
                                        Intégrez facilement nos modèles dans vos applications
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Support dédié</p>
                                    <p className="text-sm text-blue-100">
                                        Notre équipe vous accompagne dans vos projets
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            {/* Right side - Signup Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 py-12 overflow-y-auto">
                <motion.div
                    initial={{
                        opacity: 0,
                        x: 20,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <Link to="/" className="inline-block mb-6">
                                <span className="text-3xl font-bold text-blue-600">
                                    AI
                                    <span className="text-gray-900">+</span>
                                </span>
                            </Link>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                Inscription
                            </h2>
                            <p className="text-gray-600">
                                Créez votre compte en quelques secondes
                            </p>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Account Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Type de compte
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Client Card */}
                                    <motion.button
                                        type="button"
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                accountType: 'CLIENT',
                                            })
                                        }
                                        className={`relative p-4 rounded-lg border-2 transition-all ${formData.accountType === 'CLIENT' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div
                                                className={`mb-2 p-2 rounded-full ${formData.accountType === 'CLIENT' ? 'bg-blue-100' : 'bg-gray-100'}`}
                                            >
                                                <ShoppingBag
                                                    className={`h-6 w-6 ${formData.accountType === 'CLIENT' ? 'text-blue-600' : 'text-gray-600'}`}
                                                />
                                            </div>
                                            <span
                                                className={`font-medium ${formData.accountType === 'CLIENT' ? 'text-blue-900' : 'text-gray-900'}`}
                                            >
                                                Client
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">
                                                Utiliser des modèles
                                            </span>
                                        </div>
                                        {formData.accountType === 'CLIENT' && (
                                            <motion.div
                                                initial={{
                                                    scale: 0,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                }}
                                                className="absolute top-2 right-2"
                                            >
                                                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                    {/* Developer Card */}
                                    <motion.button
                                        type="button"
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                accountType: 'DEVELOPER',
                                            })
                                        }
                                        className={`relative p-4 rounded-lg border-2 transition-all ${formData.accountType === 'DEVELOPER' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div
                                                className={`mb-2 p-2 rounded-full ${formData.accountType === 'DEVELOPER' ? 'bg-purple-100' : 'bg-gray-100'}`}
                                            >
                                                <Code
                                                    className={`h-6 w-6 ${formData.accountType === 'DEVELOPER' ? 'text-purple-600' : 'text-gray-600'}`}
                                                />
                                            </div>
                                            <span
                                                className={`font-medium ${formData.accountType === 'DEVELOPER' ? 'text-purple-900' : 'text-gray-900'}`}
                                            >
                                                Développeur
                                            </span>
                                            <span className="text-xs text-gray-500 mt-1">
                                                Publier des modèles
                                            </span>
                                        </div>
                                        {formData.accountType === 'DEVELOPER' && (
                                            <motion.div
                                                initial={{
                                                    scale: 0,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                }}
                                                className="absolute top-2 right-2"
                                            >
                                                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                </div>
                                {errors.accountType && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="mt-2 text-sm text-red-600"
                                    >
                                        {errors.accountType}
                                    </motion.p>
                                )}
                            </div>
                            {/* Name Field */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Nom complet
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        placeholder="Ahmed Ben Ali"
                                    />
                                </div>
                                {errors.name && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </div>
                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Adresse email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        placeholder="vous@exemple.com"
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>
                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        className={`block w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[...Array(4)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? getStrengthColor(strength) : 'bg-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            Force du mot de passe: {getStrengthText(strength)}
                                        </p>
                                    </div>
                                )}
                                {errors.password && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {errors.password}
                                    </motion.p>
                                )}
                            </div>
                            {/* Confirm Password Field */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Confirmer le mot de passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className={`block w-full pl-10 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <motion.p
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="mt-1 text-sm text-red-600"
                                    >
                                        {errors.confirmPassword}
                                    </motion.p>
                                )}
                            </div>
                            {/* Terms checkbox */}
                            <div className="flex items-start">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                                />
                                <label
                                    htmlFor="terms"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    J'accepte les{' '}
                                    <Link
                                        to="/terms"
                                        className="text-blue-600 hover:text-blue-500"
                                    >
                                        Conditions d'utilisation
                                    </Link>{' '}
                                    et la{' '}
                                    <Link
                                        to="/privacy"
                                        className="text-blue-600 hover:text-blue-500"
                                    >
                                        Politique de confidentialité
                                    </Link>
                                </label>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !agreedToTerms}
                                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        Création du compte...
                                    </>
                                ) : (
                                    <>
                                        Créer mon compte
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </form>
                        {/* Divider */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Déjà un compte ?
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Login link */}
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                            >
                                Se connecter
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
