import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Edit, Settings, ChevronRight, Clock, BarChart2, CreditCard, FileText, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ClientAccount } from '../../types/auth';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    location: string;

    bio: string;
    joinDate: string;
    avatar: string;
    stats: {
        totalApiCalls: number;
        activeSubscriptions: number;
        totalSpent: number;
    };
}

interface Activity {
    id: number;
    type: 'subscription' | 'api' | 'payment' | 'account' | 'None';
    action: string;
    target: string;
    date: string;
}

export function ClientProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

    const { username, email, account, createdAt } = useAuth();
    const client_account = account as ClientAccount;

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                // Utilisation des données d'authentification
                const userProfile: UserProfile = {
                    name: username,
                    email: email,
                    phone: client_account?.phone_number?.toString() || 'Non spécifié',
                    location: client_account?.address || 'Non spécifié',

                    bio: client_account?.bio || '',
                    joinDate: createdAt,
                    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${username.charAt(0).toUpperCase()}`,
                    stats: {
                        totalApiCalls: 0,
                        activeSubscriptions: 0,
                        totalSpent: 0
                    }
                };

                // Mock activity data (à remplacer par des données réelles)
                const mockActivity: Activity[] =
                    [{
                        id: 1,
                        type: 'None',
                        action: 'Aucune Activity Récente ! ',
                        target: '',
                        date: ''
                    }];

                setProfile(userProfile);
                setRecentActivity(mockActivity);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Une erreur est survenue lors du chargement du profil');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [client_account, username, email, createdAt]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const formatRelativeTime = (dateString: string) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
            if (diffHours === 0) {
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
            }
            return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
        } else if (diffDays === 1) {
            return 'Hier';
        } else if (diffDays < 7) {
            return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
        } else {
            return formatDate(dateString);
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'subscription':
                return <CreditCard className="h-5 w-5 text-blue-500" />;
            case 'api':
                return <Key className="h-5 w-5 text-green-500" />;
            case 'payment':
                return <FileText className="h-5 w-5 text-purple-500" />;
            case 'account':
                return <User className="h-5 w-5 text-orange-500" />;
            default:
                return <Clock className="h-5 w-5 text-gray-500" />;
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }

    if (error || !profile) {
        return <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                            <User className="h-8 w-8 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
                        <p className="text-gray-600 mb-6">
                            {error || 'Impossible de charger le profil'}
                        </p>
                        <Link to="/user/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Retour au tableau de bord
                        </Link>
                    </div>
                </div>
            </div>
        </div>;
    }

    return <div className="min-h-screen bg-gray-50 ">
        <UserDashboardHeader />
        <div className="flex">

            <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">

                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6 bg-blue-600 text-white">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={profile.avatar}
                                            alt={profile.name}
                                            className="h-24 w-24 rounded-full border-4 border-white mb-4"
                                        />
                                        <h1 className="text-xl font-bold">{profile.name}</h1>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-600">{profile.email}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-600">{profile.phone}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-600">{profile.location}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-600">
                                                Membre depuis {formatDate(profile.joinDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <p className="text-gray-600 mb-4">{profile.bio}</p>
                                        <Link
                                            to="/client/settings"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Modifier le profil
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-6">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Statistiques
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-blue-100 p-3 rounded-full">
                                                    <BarChart2 className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Total des appels API
                                                    </p>
                                                    <p className="text-xl font-semibold">
                                                        {profile.stats.totalApiCalls.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-green-100 p-3 rounded-full">
                                                    <div className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Abonnements actifs
                                                    </p>
                                                    <p className="text-xl font-semibold">
                                                        {profile.stats.activeSubscriptions}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-purple-100 p-3 rounded-full">
                                                    <CreditCard className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Total dépensé</p>
                                                    <p className="text-xl font-semibold">
                                                        {profile.stats.totalSpent.toFixed(2)} TND
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Activité récente
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="flow-root">
                                        <ul className="-mb-8">
                                            {recentActivity.map((activity, activityIdx) => (
                                                <li key={activity.id}>
                                                    <div className="relative pb-8">
                                                        {activityIdx !== recentActivity.length - 1 && (
                                                            <span
                                                                className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                        <div className="relative flex items-start space-x-3">
                                                            <div className="relative">
                                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                                    {getActivityIcon(activity.type)}
                                                                </div>
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-900">
                                                                        {activity.action}
                                                                    </div>
                                                                    <p className="mt-0.5 text-sm text-gray-500">
                                                                        {formatRelativeTime(activity.date)}
                                                                    </p>
                                                                </div>
                                                                <div className="mt-2 text-sm text-gray-700">
                                                                    <p>{activity.target}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Raccourcis
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Link
                                            to="/user/subscriptions"
                                            className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-blue-100 p-3 rounded-full group-hover:bg-blue-200">
                                                    <CreditCard className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                                                        Mes abonnements
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Gérer vos abonnements actifs
                                                    </p>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                            </div>
                                        </Link>

                                        <Link
                                            to="/user/api-keys"
                                            className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-green-100 p-3 rounded-full group-hover:bg-green-200">
                                                    <Key className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                                                        Clés API
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Gérer vos clés API
                                                    </p>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                            </div>
                                        </Link>

                                        <Link
                                            to="/user/invoices"
                                            className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-purple-100 p-3 rounded-full group-hover:bg-purple-200">
                                                    <FileText className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                                                        Factures
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Consulter votre historique de facturation
                                                    </p>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                            </div>
                                        </Link>

                                        <Link
                                            to="/user/settings"
                                            className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-orange-100 p-3 rounded-full group-hover:bg-orange-200">
                                                    <Settings className="h-6 w-6 text-orange-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                                                        Paramètres
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        Configurer votre compte
                                                    </p>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>;
}