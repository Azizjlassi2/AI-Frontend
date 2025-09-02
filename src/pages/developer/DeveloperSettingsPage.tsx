import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Bell, Globe, CreditCard, Key, Save, Check, AlertTriangle, Phone, Home, Settings as SettingsIcon, Boxes, Shield, EyeOff, Eye } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { DeveloperAccount } from '../../types/auth';

// Interfaces based on API response
interface Task {
    id: number;
    name: string;
}

interface ModelStats {
    used: number;
    stars: number;
    discussions: number;
}

interface DeveloperReference {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface AIModel {
    id: number;
    name: string;
    description: string;
    developer: DeveloperReference;
    tasks: Task[];
    stats: ModelStats;
}



interface UserData {
    email: string;
    username: string;
    role: string;
    account: DeveloperAccount;
    createdAt: string;
}




interface DeveloperSettings {
    language: string;
    notifications: {
        email: boolean;
        push: boolean;
        subscribers: boolean;
        revenue: boolean;
        ratings: boolean;
        marketing: boolean;
    };
    security: {
        twoFactorAuth: boolean;
        sessionTimeout: number;
    };
    apiSettings: {
        defaultTimeout: number;
        defaultFormat: string;
        rateLimit: number;
    };
    resourceDefaults: {
        modelVisibility: 'public' | 'private';
        datasetVisibility: 'public' | 'private';
        requireCitation: boolean;
        defaultLicense: string;
    };
    payoutSettings: {
        autoPayout: boolean;
        minPayoutAmount: number;
        payoutDay: number;
    };
}

export function DeveloperSettingsPage() {
    const [activeTab, setActiveTab] = useState('settings');
    const [settingsTab, setSettingsTab] = useState<string>('profile');
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showToken, setShowToken] = useState(false)
    const dockerPatRef = useRef<string>('');


    const navigate = useNavigate()

    const { username, email, role, account, createdAt } = useAuth();

    const developer_account = account as DeveloperAccount;
    const [userData, setUserData] = useState<UserData | null>({
        email: email,
        username: username,
        role: role.toString(),
        account: developer_account,
        createdAt: createdAt

    });


    // Initialize settings with default values
    const [settings, setSettings] = useState<DeveloperSettings>({
        language: 'fr',
        notifications: {
            email: true,
            push: true,
            subscribers: true,
            revenue: true,
            ratings: true,
            marketing: false
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: 30
        },
        apiSettings: {
            defaultTimeout: 60,
            defaultFormat: 'json',
            rateLimit: 100
        },
        resourceDefaults: {
            modelVisibility: 'public',
            datasetVisibility: 'public',
            requireCitation: true,
            defaultLicense: 'CC BY-NC-SA 4.0'
        },
        payoutSettings: {
            autoPayout: true,
            minPayoutAmount: 500,
            payoutDay: 15
        }
    });

    // Password change fields
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Payment methods
    const [paymentMethods, setPaymentMethods] = useState([{
        id: 'pm_1',
        type: 'bank_account',
        details: {
            bankName: 'Banque Nationale de Tunisie',
            accountNumber: '•••• 5678'
        },
        isDefault: true
    }, {
        id: 'pm_2',
        type: 'paypal',
        details: {
            email: 'ai.lab.tunisia@example.com'
        },
        isDefault: false
    }]);



    const handleTabChange = (tab: string) => setActiveTab(tab);
    const handleSettingsTabChange = (tab: string) => setSettingsTab(tab);

    const handleSaveSettings = () => {
        setLoading(true);
        setError(null);
        setTimeout(() => {
            try {
                localStorage.setItem('developerSettings', JSON.stringify(settings));
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
                navigate("/developer/profile")
            } catch (err) {
                setError("Une erreur est survenue lors de l'enregistrement des paramètres");
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    const handleSaveProfile = async () => {
        if (!userData) return;

        setLoading(true);
        setError(null);

        try {
            // Prepare the payload according to backend requirements
            const payloadAccount = {
                type: "developer",
                web_site: userData.account.web_site,
                bio: userData.account.bio,
                phone_number: userData.account.phone_number,
                address: userData.account.address,
                linkedin: userData.account.linkedin,
                github: userData.account.github,
                docker_username: userData.account.docker_username,
                docker_pat: dockerPatRef.current
            };

            const payloadUser = {
                username: userData.username
            }



            console.log(payloadAccount)
            // Send PUT request to backend API
            const responseAccount = await axios.put(
                `${import.meta.env.VITE_BACKEND_HOST}/api/v1/account`,
                payloadAccount,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log(responseAccount)
            const responseUser = await axios.put(
                `${import.meta.env.VITE_BACKEND_HOST}/api/v1/users`,
                payloadUser,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );


            // Handle success
            if (responseAccount.status >= 200 && responseAccount.status < 300 && responseUser.status >= 200 && responseUser.status < 300) {

                // Update local storage with fresh data
                localStorage.setItem('account', JSON.stringify(responseAccount.data.data));
                localStorage.setItem('username', responseUser.data.data.username.toString());

                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);

                location.reload()
            } else {
                throw new Error(responseAccount.data?.message || "Erreur inconnue du serveur");
            }
        } catch (err) {
            let errorMessage = "Une erreur est survenue lors de l'enregistrement du profil";

            if (axios.isAxiosError(err)) {
                if (err.response) {
                    // Server responded with error status
                    errorMessage = err.response.data?.message || err.response.data?.error || errorMessage;
                } else if (err.request) {
                    // Request made but no response
                    errorMessage = "Pas de réponse du serveur";
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
            // purge token from memory & UI
            dockerPatRef.current = '';
            setUserData(prev => prev ? { ...prev, account: { ...prev.account, docker_pat: '' } } : prev);
        }
    };

    const handleChangePassword = async () => {
        // Validation checks
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        if (passwordData.newPassword.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Prepare the payload according to backend requirements
            const payload = {
                oldPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            };

            // Send PUT request to backend API
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_HOST}/api/v1/auth/update-password`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log(response)

            // Handle success
            if (response.status >= 200 && response.status < 300) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);

                // Reset password fields
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                throw new Error(response.data?.message || "Erreur inconnue du serveur");
            }
        } catch (err) {
            let errorMessage = 'Une erreur est survenue lors du changement de mot de passe';

            if (axios.isAxiosError(err)) {
                if (err.response) {
                    // Server responded with error status
                    errorMessage = err.response.data?.message ||
                        err.response.data?.error ||
                        errorMessage;
                } else if (err.request) {
                    // Request made but no response
                    errorMessage = "Pas de réponse du serveur";
                }
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    const handleSetDefaultPaymentMethod = (id: string) => {
        setPaymentMethods(paymentMethods.map(method => ({
            ...method,
            isDefault: method.id === id
        })));
    };

    const handleRemovePaymentMethod = (id: string) => {
        setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    };

    // Update account details handler
    const handleAccountUpdate = (field: keyof DeveloperAccount, value: string) => {
        if (!userData) return;

        setUserData({
            ...userData,
            account: {
                ...userData.account,
                [field]: value
            }
        });
    };

    // Update social links handler
    const handleSocialLinkUpdate = (platform: 'linkedin' | 'github', value: string) => {
        if (!userData) return;

        setUserData({
            ...userData,
            account: {
                ...userData.account,
                [platform]: value
            }
        });
    };

    // Generate avatar URL based on username
    const getAvatarUrl = (username: string) => {
        return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username.charAt(0))}`;
    };

    if (!userData) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des données du profil...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DeveloperDashboardHeader />
            <div className="flex">
                <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
                <main className="flex-1 p-6">
                    <div className="container mx-auto max-w-6xl">
                        {saveSuccess && (
                            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                                <Check className="h-5 w-5 text-green-500 mr-3" />
                                <p className="text-green-700">Modifications enregistrées avec succès</p>
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
                                {/* Settings Sidebar */}
                                <div className="w-full md:w-64 bg-gray-50 p-6 border-r border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Paramètres</h2>
                                    <nav className="space-y-1">
                                        {['profile', 'security', 'notifications', 'preferences', 'billing', 'api', 'docker', 'resources'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => handleSettingsTabChange(tab)}
                                                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${settingsTab === tab
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {tab === 'profile' && <User className="h-5 w-5 mr-3" />}
                                                {tab === 'security' && <Lock className="h-5 w-5 mr-3" />}
                                                {tab === 'notifications' && <Bell className="h-5 w-5 mr-3" />}
                                                {tab === 'preferences' && <Globe className="h-5 w-5 mr-3" />}
                                                {tab === 'billing' && <CreditCard className="h-5 w-5 mr-3" />}
                                                {tab === 'docker' && <Boxes className="h-5 w-5 mr-3" />}
                                                {tab === 'api' && <Key className="h-5 w-5 mr-3" />}
                                                {tab === 'resources' && <SettingsIcon className="h-5 w-5 mr-3" />}

                                                {tab === 'profile' && 'Profil'}
                                                {tab === 'security' && 'Sécurité'}
                                                {tab === 'notifications' && 'Notifications'}
                                                {tab === 'preferences' && 'Préférences'}
                                                {tab === 'billing' && 'Paiements'}
                                                {tab === 'docker' && 'Docker Hub'}
                                                {tab === 'api' && 'API'}
                                                {tab === 'resources' && 'Ressources'}
                                            </button>
                                        ))}
                                    </nav>
                                    <div className="mt-10">
                                        <Link to="/developer/dashboard" className="text-sm text-blue-600 hover:text-blue-800">
                                            ← Retour au tableau de bord
                                        </Link>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 p-6">
                                    {/* Profile Settings */}
                                    {settingsTab === 'profile' && (
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-6">Profil développeur</h2>
                                            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center">
                                                <div className="relative mb-4 sm:mb-0 sm:mr-6">
                                                    <img
                                                        src={getAvatarUrl(userData.username)}
                                                        alt={userData.username}
                                                        className="h-24 w-24 rounded-full"
                                                    />
                                                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full">
                                                        <User className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-medium">{userData.username}</h3>
                                                    <p className="text-gray-500">{userData.email}</p>

                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        value={userData.username}
                                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        value={userData.email}
                                                        readOnly={true}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                                    <div className="flex">
                                                        <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                            <Phone className="h-4 w-4" />
                                                        </span>
                                                        <input
                                                            type="tel"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                            value={userData.account.phone_number}
                                                            onChange={(e) => handleAccountUpdate('phone_number', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                                                    <div className="flex">
                                                        <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                            <Globe className="h-4 w-4" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                            value={userData.account.web_site}
                                                            onChange={(e) => handleAccountUpdate('web_site', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                                                    <div className="flex">
                                                        <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                                            <Home className="h-4 w-4" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                            value={userData.account.address}
                                                            onChange={(e) => handleAccountUpdate('address', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                                <textarea
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    value={userData.account.bio}
                                                    onChange={(e) => handleAccountUpdate('bio', e.target.value)}
                                                />
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Brève description qui sera affichée sur votre profil public.
                                                </p>
                                            </div>

                                            <div className="mb-6">
                                                <h3 className="text-sm font-medium text-gray-700 mb-3">Réseaux sociaux</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                                                        <input
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                            value={userData.account.linkedin}
                                                            onChange={(e) => handleSocialLinkUpdate('linkedin', e.target.value)}
                                                            placeholder="https://linkedin.com/in/yourprofile"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                                                        <input
                                                            type="text"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                            value={userData.account.github}
                                                            onChange={(e) => handleSocialLinkUpdate('github', e.target.value)}
                                                            placeholder="https://github.com/yourusername"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    onClick={handleSaveProfile}
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    ) : <Save className="h-4 w-4 mr-2" />}
                                                    Enregistrer
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {/* Docker Hub Settings */}
                                    {settingsTab === 'docker' && (<div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                                            Identifiants Docker Hub
                                        </h2>
                                        <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                            <div className="flex items-start mb-6">
                                                <div className="h-8 w-8 text-blue-600 mr-4 mt-1" />
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        Configuration Docker Hub
                                                    </h3>
                                                    <p className="text-gray-600 mt-1">
                                                        Configurez vos identifiants Docker Hub pour
                                                        accéder à vos images privées et automatiser les
                                                        déploiements.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nom d'utilisateur Docker Hub
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                        value={userData?.account?.docker_username ?? ''}
                                                        onChange={(e) => handleAccountUpdate('docker_username', e.target.value)}
                                                        placeholder="votre-nom-utilisateur"
                                                        autoComplete="new-password"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Token d'accès personnel (PAT)
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showToken ? 'text' : 'password'}
                                                            placeholder="dckr_pat_***********************" autoComplete="new-password"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
                                                            value={undefined} // controlled uniquement via ref; avoids storing in state
                                                            onChange={(e) => dockerPatRef.current = e.target.value}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                            onClick={() => setShowToken(!showToken)}
                                                        >
                                                            {showToken ? (
                                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                                            ) : (
                                                                <Eye className="h-5 w-5 text-gray-400" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Votre PAT sera chiffré et utilisé uniquement pour
                                                        vérifier vos images privées.
                                                    </p>
                                                </div>
                                                <div className="bg-blue-50 p-4 rounded-md">
                                                    <div className="flex">
                                                        <Shield className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                                                        <div>
                                                            <h4 className="text-sm font-medium text-blue-800">
                                                                Bonnes pratiques de sécurité
                                                            </h4>
                                                            <ul className="mt-2 text-sm text-blue-700 space-y-1 list-disc list-inside">
                                                                <li>
                                                                    Créez un token avec des permissions limitées
                                                                    (lecture seule)
                                                                </li>
                                                                <li>
                                                                    Utilisez un token avec une date d'expiration
                                                                </li>
                                                                <li>
                                                                    Ne partagez jamais votre token avec d'autres
                                                                    personnes
                                                                </li>
                                                            </ul>
                                                            <p className="mt-2 text-sm text-blue-700">
                                                                <a
                                                                    href="https://docs.docker.com/docker-hub/access-tokens/"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="font-medium underline"
                                                                >
                                                                    En savoir plus sur les tokens Docker Hub
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                // remplace handleSaveSettings par handleSaveProfile
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
                                    {settingsTab === 'security' && (
                                        <SecuritySettings
                                            settings={settings}
                                            setSettings={setSettings}
                                            passwordData={passwordData}
                                            setPasswordData={setPasswordData}
                                            handleChangePassword={handleChangePassword}
                                            handleSaveSettings={handleSaveSettings}
                                            loading={loading}
                                        />
                                    )}

                                    {/* Other settings sections (Notifications, Preferences, etc.) */}
                                    {/* They would follow a similar pattern to the profile section */}
                                    {/* For brevity, I've omitted them here but would implement similarly */}

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


// Extracted Security Settings Component
interface SecuritySettingsProps {
    settings: DeveloperSettings;
    setSettings: React.Dispatch<React.SetStateAction<DeveloperSettings>>;
    passwordData: { currentPassword: string; newPassword: string; confirmPassword: string };
    setPasswordData: React.Dispatch<React.SetStateAction<{ currentPassword: string; newPassword: string; confirmPassword: string }>>;
    handleChangePassword: () => void;
    handleSaveSettings: () => void;
    loading: boolean;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
    settings,
    setSettings,
    passwordData,
    setPasswordData,
    handleChangePassword,
    handleSaveSettings,
    loading
}) => (
    <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Sécurité</h2>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Changer le mot de passe</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe actuel
                    </label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={passwordData.currentPassword}
                        onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={passwordData.newPassword}
                        onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le nouveau mot de passe
                    </label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={passwordData.confirmPassword}
                        onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        disabled={loading}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                        onClick={handleChangePassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Traitement...
                            </>
                        ) : "Mettre à jour le mot de passe"}
                    </button>
                </div>
            </div>
        </div>
        {/**
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Authentification à deux facteurs</h3>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="2fa"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={settings.security.twoFactorAuth}
                        onChange={e => setSettings({
                            ...settings,
                            security: {
                                ...settings.security,
                                twoFactorAuth: e.target.checked
                            }
                        })}
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="2fa" className="font-medium text-gray-700">
                        Activer l'authentification à deux facteurs
                    </label>
                    <p className="text-gray-500">
                        Renforcez la sécurité de votre compte en exigeant un mot de passe et un code d'authentification.
                    </p>
                </div>
            </div>
        </div>
*/}

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Expiration de session</h3>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Déconnexion automatique après inactivité (minutes)
                </label>
                <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md disabled:opacity-75"
                    value={settings.security.sessionTimeout}
                    onChange={e => setSettings({
                        ...settings,
                        security: {
                            ...settings.security,
                            sessionTimeout: parseInt(e.target.value)
                        }
                    })}
                    disabled={loading}
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
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                onClick={handleSaveSettings}
                disabled={loading}
            >
                {loading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : <Save className="h-4 w-4 mr-2" />}
                Enregistrer
            </button>
        </div>
    </div>

);