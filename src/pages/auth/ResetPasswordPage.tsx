import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    Sparkles,
    Loader2,
    CheckCircle2,
    Shield,
} from 'lucide-react'
import axios from 'axios'

export function ResetPasswordPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const navigate = useNavigate()

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
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.')
            return
        }

        if (password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères.')
            return
        }

        try {
            setIsLoading(true)
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_HOST}/api/v1/auth/reset-password`,
                {
                    token: token,
                    newPassword: password,
                }
            )

            if (response.status === 200) {
                setSuccess('Mot de passe mis à jour avec succès !')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setError(response.data.message || 'Une erreur est survenue.')
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data?.message || 'Erreur réseau.')
            } else {
                console.error(err)
                setError('Erreur lors de la réinitialisation du mot de passe.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const strength = passwordStrength(password)

    return (
        <div className="min-h-screen flex">
            {/* Left side - Branding */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
                />

                <div className="relative z-10 flex flex-col justify-center px-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                            <Sparkles className="h-4 w-4 text-yellow-400 mr-2" />
                            <span className="text-sm font-medium">Sécurité renforcée</span>
                        </div>
                        <h1 className="text-5xl font-bold mb-6">
                            Nouveau
                            <span className="block mt-2 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
                                mot de passe
                            </span>
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-md">
                            Créez un mot de passe fort et sécurisé pour protéger votre compte
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Minimum 8 caractères</p>
                                    <p className="text-sm text-blue-100">
                                        Utilisez une combinaison de lettres et chiffres
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Caractères spéciaux</p>
                                    <p className="text-sm text-blue-100">
                                        Ajoutez des symboles pour plus de sécurité
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <CheckCircle2 className="h-6 w-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Cryptage sécurisé</p>
                                    <p className="text-sm text-blue-100">
                                        Votre mot de passe est chiffré et protégé
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {!success ? (
                            <>
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <Link to="/" className="inline-block mb-6">
                                        <span className="text-3xl font-bold text-blue-600">
                                            AI
                                            <span className="text-gray-900">+</span>
                                        </span>
                                    </Link>
                                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                                        <Shield className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                        Réinitialiser le mot de passe
                                    </h2>
                                    <p className="text-gray-600">
                                        Créez un nouveau mot de passe sécurisé
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-5">
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
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                placeholder="vous@exemple.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Nouveau mot de passe
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                placeholder="••••••••"
                                                required
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
                                        {password && (
                                            <div className="mt-2">
                                                <div className="flex gap-1 mb-1">
                                                    {[...Array(4)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-1 flex-1 rounded-full transition-colors ${i < strength
                                                                ? getStrengthColor(strength)
                                                                : 'bg-gray-200'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-600">
                                                    Force du mot de passe: {getStrengthText(strength)}
                                                </p>
                                            </div>
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
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-50 border border-red-200 rounded-lg p-3"
                                        >
                                            <p className="text-sm text-red-600">{error}</p>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                Réinitialisation...
                                            </>
                                        ) : (
                                            <>
                                                Réinitialiser le mot de passe
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
                            </>
                        ) : (
                            /* Success State */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Mot de passe mis à jour !
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Votre mot de passe a été réinitialisé avec succès. Vous allez
                                    être redirigé vers la page de connexion.
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <p className="text-sm text-green-800">
                                        <strong>Succès :</strong> Vous pouvez maintenant vous
                                        connecter avec votre nouveau mot de passe.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Help text */}
                    {!success && (
                        <p className="mt-8 text-center text-sm text-gray-600">
                            Besoin d'aide ?{' '}
                            <Link
                                to="/contact"
                                className="text-blue-600 hover:text-blue-500"
                            >
                                Contactez notre support
                            </Link>
                        </p>
                    )}
                </motion.div>
            </div>
        </div>
    )
}