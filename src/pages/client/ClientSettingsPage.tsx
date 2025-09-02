import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    User,
    Lock,
    Bell,
    Globe,
    CreditCard,
    Key,
    Save,
    Check,
    AlertTriangle,
    Phone,
    Home,
    FileText,
} from 'lucide-react'
interface UserSettings {
    email: string
    language: string
    notifications: {
        email: boolean
        push: boolean
        billing: boolean
        usage: boolean
        marketing: boolean
    }
    security: {
        twoFactorAuth: boolean
        sessionTimeout: number
    }
    apiSettings: {
        defaultTimeout: number
        defaultFormat: string
    }
}
export function ClientSettingsPage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<string>('profile')
    const [settings, setSettings] = useState<UserSettings>({
        email: 'mohamed.bensalem@example.com',
        language: 'fr',
        notifications: {
            email: true,
            push: true,
            billing: true,
            usage: true,
            marketing: false,
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: 30,
        },
        apiSettings: {
            defaultTimeout: 60,
            defaultFormat: 'json',
        },
    })
    const [loading, setLoading] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // User profile data
    const [profile, setProfile] = useState({
        name: 'Mohamed Ben Salem',
        email: 'mohamed.bensalem@example.com',
        phone: '+216 55 123 456',
        company: 'Tech Solutions',
        jobTitle: 'Développeur Senior',
        address: '15 Rue de Carthage, Tunis',
        bio: "Développeur passionné par l'IA et les nouvelles technologies.",
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MBS',
    })
    // Password change fields
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    // Payment methods
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 'pm_1',
            type: 'card',
            brand: 'visa',
            last4: '4242',
            expMonth: 12,
            expYear: 2025,
            isDefault: true,
        },
    ])
    const handleSaveSettings = () => {
        setLoading(true)
        setError(null)
        // Simulate API call
        setTimeout(() => {
            try {
                // In a real app, this would be an API call to save settings
                localStorage.setItem('userSettings', JSON.stringify(settings))
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 3000)
            } catch (err) {
                setError(
                    "Une erreur est survenue lors de l'enregistrement des paramètres",
                )
            } finally {
                setLoading(false)
            }
        }, 800)
    }
    const handleSaveProfile = () => {
        setLoading(true)
        setError(null)
        // Simulate API call
        setTimeout(() => {
            try {
                // In a real app, this would be an API call to save profile
                localStorage.setItem('userProfile', JSON.stringify(profile))
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 3000)
            } catch (err) {
                setError("Une erreur est survenue lors de l'enregistrement du profil")
            } finally {
                setLoading(false)
            }
        }, 800)
    }
    const handleChangePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas')
            return
        }
        if (passwordData.newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères')
            return
        }
        setLoading(true)
        setError(null)
        // Simulate API call
        setTimeout(() => {
            try {
                // In a real app, this would be an API call to change password
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 3000)
                // Reset password fields
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                })
            } catch (err) {
                setError('Une erreur est survenue lors du changement de mot de passe')
            } finally {
                setLoading(false)
            }
        }, 800)
    }
    const handleAddPaymentMethod = () => {
        navigate('/user/payment-method/add')
    }
    const handleSetDefaultPaymentMethod = (id: string) => {
        setPaymentMethods(
            paymentMethods.map((method) => ({
                ...method,
                isDefault: method.id === id,
            })),
        )
    }
    const handleRemovePaymentMethod = (id: string) => {
        setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
    }
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-6xl">
                {saveSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <p className="text-green-700">
                            Modifications enregistrées avec succès
                        </p>
                    </div>
                )}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Sidebar */}
                        <div className="w-full md:w-64 bg-gray-50 p-6 border-r border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                Paramètres
                            </h2>
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <User className="h-5 w-5 mr-3" />
                                    Profil
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Lock className="h-5 w-5 mr-3" />
                                    Sécurité
                                </button>
                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Bell className="h-5 w-5 mr-3" />
                                    Notifications
                                </button>
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'preferences' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Globe className="h-5 w-5 mr-3" />
                                    Préférences
                                </button>
                                <button
                                    onClick={() => setActiveTab('billing')}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'billing' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <CreditCard className="h-5 w-5 mr-3" />
                                    Facturation
                                </button>
                                <button
                                    onClick={() => setActiveTab('api')}
                                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'api' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Key className="h-5 w-5 mr-3" />
                                    API
                                </button>
                            </nav>
                            <div className="mt-10">
                                <Link
                                    to="/user/dashboard"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    ← Retour au tableau de bord
                                </Link>
                            </div>
                        </div>
                        {/* Main content */}
                        <div className="flex-1 p-6">
                            {/* Profile Settings */}
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Informations personnelles
                                    </h2>
                                    <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center">
                                        <div className="relative mb-4 sm:mb-0 sm:mr-6">
                                            <img
                                                src={profile.avatar}
                                                alt={profile.name}
                                                className="h-24 w-24 rounded-full"
                                            />
                                            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                                                <User className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {profile.name}
                                            </h3>
                                            <p className="text-gray-500">{profile.email}</p>
                                            <p className="text-sm text-gray-500">
                                                {profile.jobTitle} chez {profile.company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nom complet
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                value={profile.name}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type="email"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                    value={profile.email}
                                                    onChange={(e) =>
                                                        setProfile({
                                                            ...profile,
                                                            email: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Téléphone
                                            </label>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                    <Phone className="h-4 w-4" />
                                                </span>
                                                <input
                                                    type="tel"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                    value={profile.phone}
                                                    onChange={(e) =>
                                                        setProfile({
                                                            ...profile,
                                                            phone: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Entreprise
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                value={profile.company}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        company: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Titre du poste
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                value={profile.jobTitle}
                                                onChange={(e) =>
                                                    setProfile({
                                                        ...profile,
                                                        jobTitle: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Adresse
                                            </label>
                                            <div className="flex">
                                                <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                    <Home className="h-4 w-4" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                    value={profile.address}
                                                    onChange={(e) =>
                                                        setProfile({
                                                            ...profile,
                                                            address: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bio
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                            value={profile.bio}
                                            onChange={(e) =>
                                                setProfile({
                                                    ...profile,
                                                    bio: e.target.value,
                                                })
                                            }
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Brève description pour votre profil.
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={handleSaveProfile}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <Save className="h-4 w-4 mr-2" />
                                            )}
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Security Settings */}
                            {activeTab === 'security' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Sécurité
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Changer le mot de passe
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Mot de passe actuel
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                    value={passwordData.currentPassword}
                                                    onChange={(e) =>
                                                        setPasswordData({
                                                            ...passwordData,
                                                            currentPassword: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nouveau mot de passe
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                    value={passwordData.newPassword}
                                                    onChange={(e) =>
                                                        setPasswordData({
                                                            ...passwordData,
                                                            newPassword: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Confirmer le nouveau mot de passe
                                                </label>
                                                <input
                                                    type="password"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) =>
                                                        setPasswordData({
                                                            ...passwordData,
                                                            confirmPassword: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    onClick={handleChangePassword}
                                                    disabled={loading}
                                                >
                                                    Mettre à jour le mot de passe
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Authentification à deux facteurs
                                        </h3>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="2fa"
                                                    type="checkbox"
                                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                    checked={settings.security.twoFactorAuth}
                                                    onChange={(e) =>
                                                        setSettings({
                                                            ...settings,
                                                            security: {
                                                                ...settings.security,
                                                                twoFactorAuth: e.target.checked,
                                                            },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label
                                                    htmlFor="2fa"
                                                    className="font-medium text-gray-700"
                                                >
                                                    Activer l'authentification à deux facteurs
                                                </label>
                                                <p className="text-gray-500">
                                                    Renforcez la sécurité de votre compte en exigeant à la
                                                    fois un mot de passe et un code d'authentification.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Expiration de session
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Déconnexion automatique après inactivité (minutes)
                                            </label>
                                            <select
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 sm:text-sm rounded-md"
                                                value={settings.security.sessionTimeout}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        security: {
                                                            ...settings.security,
                                                            sessionTimeout: parseInt(e.target.value),
                                                        },
                                                    })
                                                }
                                            >
                                                <option value={15}>15 minutes</option>
                                                <option value={30}>30 minutes</option>
                                                <option value={60}>1 heure</option>
                                                <option value={120}>2 heures</option>
                                                <option value={240}>4 heures</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={handleSaveSettings}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <Save className="h-4 w-4 mr-2" />
                                            )}
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Notification Settings */}
                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Notifications
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Canaux de notification
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="email-notifications"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        checked={settings.notifications.email}
                                                        onChange={(e) =>
                                                            setSettings({
                                                                ...settings,
                                                                notifications: {
                                                                    ...settings.notifications,
                                                                    email: e.target.checked,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        htmlFor="email-notifications"
                                                        className="font-medium text-gray-700"
                                                    >
                                                        Notifications par email
                                                    </label>
                                                    <p className="text-gray-500">
                                                        Recevez des notifications par email pour les
                                                        activités importantes.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="push-notifications"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        checked={settings.notifications.push}
                                                        onChange={(e) =>
                                                            setSettings({
                                                                ...settings,
                                                                notifications: {
                                                                    ...settings.notifications,
                                                                    push: e.target.checked,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        htmlFor="push-notifications"
                                                        className="font-medium text-gray-700"
                                                    >
                                                        Notifications push
                                                    </label>
                                                    <p className="text-gray-500">
                                                        Recevez des notifications push dans votre
                                                        navigateur.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Types de notification
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="billing-notifications"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        checked={settings.notifications.billing}
                                                        onChange={(e) =>
                                                            setSettings({
                                                                ...settings,
                                                                notifications: {
                                                                    ...settings.notifications,
                                                                    billing: e.target.checked,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        htmlFor="billing-notifications"
                                                        className="font-medium text-gray-700"
                                                    >
                                                        Facturation
                                                    </label>
                                                    <p className="text-gray-500">
                                                        Notifications concernant les factures, les paiements
                                                        et les reçus.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="usage-notifications"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        checked={settings.notifications.usage}
                                                        onChange={(e) =>
                                                            setSettings({
                                                                ...settings,
                                                                notifications: {
                                                                    ...settings.notifications,
                                                                    usage: e.target.checked,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        htmlFor="usage-notifications"
                                                        className="font-medium text-gray-700"
                                                    >
                                                        Utilisation
                                                    </label>
                                                    <p className="text-gray-500">
                                                        Alertes concernant l'utilisation de l'API et les
                                                        limites d'utilisation.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="marketing-notifications"
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        checked={settings.notifications.marketing}
                                                        onChange={(e) =>
                                                            setSettings({
                                                                ...settings,
                                                                notifications: {
                                                                    ...settings.notifications,
                                                                    marketing: e.target.checked,
                                                                },
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        htmlFor="marketing-notifications"
                                                        className="font-medium text-gray-700"
                                                    >
                                                        Marketing
                                                    </label>
                                                    <p className="text-gray-500">
                                                        Nouvelles fonctionnalités, mises à jour et offres
                                                        spéciales.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={handleSaveSettings}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <Save className="h-4 w-4 mr-2" />
                                            )}
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Preferences Settings */}
                            {activeTab === 'preferences' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Préférences
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Langue et région
                                        </h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Langue
                                            </label>
                                            <select
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 sm:text-sm rounded-md"
                                                value={settings.language}
                                                onChange={(e) =>
                                                    setSettings({
                                                        ...settings,
                                                        language: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="fr">Français</option>
                                                <option value="en">Anglais</option>
                                                <option value="ar">Arabe</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={handleSaveSettings}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <Save className="h-4 w-4 mr-2" />
                                            )}
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Billing Settings */}
                            {activeTab === 'billing' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Facturation
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Méthodes de paiement
                                        </h3>
                                        {paymentMethods.length === 0 ? (
                                            <div className="text-center py-4">
                                                <p className="text-gray-500 mb-4">
                                                    Aucune méthode de paiement enregistrée
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {paymentMethods.map((method) => (
                                                    <div
                                                        key={method.id}
                                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="mr-4">
                                                                <CreditCard className="h-8 w-8 text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {method.brand.charAt(0).toUpperCase() +
                                                                        method.brand.slice(1)}{' '}
                                                                    •••• {method.last4}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    Expire {method.expMonth}/{method.expYear}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            {method.isDefault ? (
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                    Par défaut
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                                    onClick={() =>
                                                                        handleSetDefaultPaymentMethod(method.id)
                                                                    }
                                                                >
                                                                    Définir par défaut
                                                                </button>
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="text-sm text-red-600 hover:text-red-800"
                                                                onClick={() =>
                                                                    handleRemovePaymentMethod(method.id)
                                                                }
                                                            >
                                                                Supprimer
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                onClick={handleAddPaymentMethod}
                                            >
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                Ajouter une méthode de paiement
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Historique de facturation
                                        </h3>
                                        <Link
                                            to="/user/invoices"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <FileText className="h-4 w-4 mr-2" />
                                            Voir toutes les factures
                                        </Link>
                                    </div>
                                </div>
                            )}
                            {/* API Settings */}
                            {activeTab === 'api' && (
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                                        Paramètres API
                                    </h2>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Clés API
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Gérez vos clés API pour accéder aux modèles auxquels vous
                                            êtes abonné.
                                        </p>
                                        <Link
                                            to="/user/api-keys"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <Key className="h-4 w-4 mr-2" />
                                            Gérer les clés API
                                        </Link>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                                            Paramètres par défaut
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Timeout par défaut (secondes)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 sm:text-sm rounded-md"
                                                    value={settings.apiSettings.defaultTimeout}
                                                    onChange={(e) =>
                                                        setSettings({
                                                            ...settings,
                                                            apiSettings: {
                                                                ...settings.apiSettings,
                                                                defaultTimeout: parseInt(e.target.value),
                                                            },
                                                        })
                                                    }
                                                    min={1}
                                                    max={300}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Format de réponse par défaut
                                                </label>
                                                <select
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 sm:text-sm rounded-md"
                                                    value={settings.apiSettings.defaultFormat}
                                                    onChange={(e) =>
                                                        setSettings({
                                                            ...settings,
                                                            apiSettings: {
                                                                ...settings.apiSettings,
                                                                defaultFormat: e.target.value,
                                                            },
                                                        })
                                                    }
                                                >
                                                    <option value="json">JSON</option>
                                                    <option value="xml">XML</option>
                                                    <option value="csv">CSV</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={handleSaveSettings}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <Save className="h-4 w-4 mr-2" />
                                            )}
                                            Enregistrer
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
