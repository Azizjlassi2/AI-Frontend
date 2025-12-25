import { useState } from "react";
import { MailIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/*

export function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/auth/forgot-password`, email, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                navigate("/reset-password/send-link");
            } else {
                setError("Une erreur est survenue.");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Erreur lors de l'envoi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Mot de passe oublié</h2>
                    <p className="mt-2 text-gray-600">
                        Entrez votre email pour recevoir un lien de réinitialisation.
                    </p>
                </div>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="vous@exemple.com"
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                {loading ? "Envoi en cours..." : "Envoyer le lien"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <a
                            href="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Retour à la connexion
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
    */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Mail,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Loader2,
    CheckCircle2,
} from 'lucide-react'
export function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        // Validation simple
        if (!email) {
            setError('Email requis')
            setIsLoading(false)
            return
        }
        // Simuler l'appel API

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/auth/forgot-password`, email, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setIsSuccess(true)
            } else {
                setError("Une erreur est survenue.");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Erreur lors de l'envoi.");
            }
        } finally {
            setIsLoading(false);
        }
    }
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
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
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
                            <span className="text-sm font-medium">Sécurité renforcée</span>
                        </div>
                        <h1 className="text-5xl font-bold mb-6">
                            Récupération de
                            <span className="block mt-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                mot de passe
                            </span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-md">
                            Ne vous inquiétez pas, nous vous enverrons des instructions pour
                            réinitialiser votre mot de passe
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Processus sécurisé</p>
                                    <p className="text-sm text-blue-100">
                                        Lien de réinitialisation valide pendant 1 heure
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Email instantané</p>
                                    <p className="text-sm text-blue-100">
                                        Vous recevrez les instructions dans quelques minutes
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Support disponible</p>
                                    <p className="text-sm text-blue-100">
                                        Notre équipe est là pour vous aider si besoin
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
            {/* Right side - Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
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
                        {!isSuccess ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <Link to="/" className="inline-block mb-6">
                                        <span className="text-3xl font-bold text-blue-600">
                                            AI
                                            <span className="text-gray-900">+</span>
                                        </span>
                                    </Link>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Mot de passe oublié ?
                                    </h2>
                                    <p className="text-gray-600">
                                        Entrez votre email pour recevoir un lien de réinitialisation
                                    </p>
                                </div>
                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
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
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className={`block w-full pl-10 pr-3 py-3 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                                                placeholder="vous@exemple.com"
                                            />
                                        </div>
                                        {error && (
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
                                                {error}
                                            </motion.p>
                                        )}
                                    </div>
                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                Envoyer le lien
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                                {/* Back to login */}
                                <div className="mt-6">
                                    <Link
                                        to="/login"
                                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Retour à la connexion
                                    </Link>
                                </div>
                            </> /* Success State */
                        ) : (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Email envoyé !
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Nous avons envoyé un lien de réinitialisation à{' '}
                                    <span className="font-medium text-gray-900">{email}</span>.
                                    Vérifiez votre boîte de réception.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-blue-800">
                                        <strong>Astuce :</strong> Si vous ne voyez pas l'email,
                                        vérifiez vos spams ou courriers indésirables.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="w-full px-4 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        Renvoyer l'email
                                    </button>
                                    <Link
                                        to="/login"
                                        className="w-full flex items-center justify-center px-4 py-3 text-base font-medium rounded-lg text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Retour à la connexion
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                    {/* Help text */}
                    {!isSuccess && (
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Besoin d'aide ?{' '}
                            <Link to="/contact" className="text-blue-600 hover:text-blue-500">
                                Contactez notre support
                            </Link>
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

