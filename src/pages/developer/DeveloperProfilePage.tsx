import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Edit, ChevronRight, Clock, DollarSign, Database, Globe, Award, Users, Star, Bot, AlertTriangle } from 'lucide-react';
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader';
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar';
import { useAuth } from '../../context/AuthContext';
import { DeveloperAccount } from '../../types/auth';

interface DeveloperProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
    position: string;
    bio: string;
    joinDate: string;
    avatar: string;
    website: string;
    socialLinks: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    stats: {
        totalModels: number;
        totalDatasets: number;
        totalSubscribers: number;
        totalRevenue: number;
        totalRatings: number;
        averageRating: number;
    };
}
interface Activity {
    id: number;
    type: 'model' | 'dataset' | 'revenue' | 'rating' | 'subscriber' | 'None';
    action: string;
    target: string;
    date: string;
}
export function DeveloperProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profile, setProfile] = useState<DeveloperProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
    const { username, email, account, createdAt, refreshAccount } = useAuth();


    const developer_account = account as DeveloperAccount;

    useEffect(() => {
        const fetchProfile = async () => {
            refreshAccount();
            setLoading(true);
            try {
                // Mock profile data
                const profile: DeveloperProfile = {
                    name: username,
                    email: email,
                    phone: developer_account?.phone_number != null
                        ? developer_account.phone_number.toString()
                        : 'None',
                    address: developer_account?.address ? developer_account?.address : "None",
                    company: "None",
                    position: "None",
                    bio: developer_account?.bio ?? '',
                    joinDate: createdAt,
                    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=' + username.charAt(0).toUpperCase(),
                    website: developer_account?.web_site ?? 'None',
                    socialLinks: {
                        linkedin: developer_account?.linkedin,
                        github: developer_account?.github
                    },
                    stats: {
                        totalModels: developer_account?.models?.length ?? 0,
                        totalDatasets: developer_account?.models?.length ?? 0,
                        totalSubscribers: developer_account?.models?.length ?? 0,
                        totalRevenue: developer_account?.models?.length ?? 0,
                        totalRatings: developer_account?.models?.length ?? 0,
                        averageRating: 0
                    }
                };
                // Mock activity data
                const mockActivity: Activity[] =
                    [{
                        id: 1,
                        type: 'None',
                        action: 'Aucune Activity Récente ! ',
                        target: '',
                        date: ''
                    }]
                /*
                 [{
                id: 1,
                    type: 'model',
                        action: 'Nouveau modèle publié',
                            target: 'ArabicBERT v2.1.0',
                                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }, {
                id: 2,
                    type: 'subscriber',
                        action: 'Nouvel abonné',
                            target: "Société Tunisienne IA s'est abonné à ArabicBERT",
                                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
            }, {
                id: 3,
                    type: 'revenue',
                        action: 'Paiement reçu',
                            target: '499.99 TND pour abonnement à TunBERT',
                                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            }, {
                id: 4,
                    type: 'dataset',
                        action: 'Nouveau dataset publié',
                            target: 'Medical Images 2024',
                                date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            }, {
                id: 5,
                    type: 'rating',
                        action: 'Nouvelle évaluation',
                            target: 'ArabicBERT a reçu une évaluation 5 étoiles',
                                date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            }]; */
                setProfile(profile);
                setRecentActivity(mockActivity);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Une erreur est survenue lors du chargement du profil');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [createdAt, developer_account?.address, developer_account?.bio, developer_account?.github, developer_account?.linkedin, developer_account?.models?.length, developer_account.phone_number, developer_account?.web_site, email, username]);
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const formatRelativeTime = (dateString: string) => {
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
            case 'model':
                return <Bot className="h-5 w-5 text-blue-500" />;
            case 'dataset':
                return <Database className="h-5 w-5 text-green-500" />;
            case 'revenue':
                return <DollarSign className="h-5 w-5 text-yellow-500" />;
            case 'rating':
                return <Award className="h-5 w-5 text-purple-500" />;
            case 'subscriber':
                return <Users className="h-5 w-5 text-indigo-500" />;
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
                        <Link to="/developer/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Retour au tableau de bord
                        </Link>
                    </div>
                </div>
            </div>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50">
        <DeveloperDashboardHeader />
        <div className="flex">
            <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto max-w-6xl">
                    {!developer_account?.docker_username && !developer_account?.docker_pat && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                            <p className="text-red-700">Configure your Docker Hub integration to start sharing models , datasets and more with the comunity . You can set it up in your Settings ! </p>
                        </div>
                    )}
                    {!developer_account?.phone_number && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                            <p className="text-red-700">Configure your phone number so you can send / receive money . You can set it up in your Settings ! </p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Profile Card */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6 bg-blue-600 text-white">
                                    <div className="flex flex-col items-center">
                                        <img src={profile.avatar} alt={profile.name} className="h-24 w-24 rounded-full border-4 border-white mb-4" />
                                        <h1 className="text-xl font-bold">{profile.name}</h1>
                                        <p className="text-blue-100">{profile.position}</p>
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
                                            <span className="text-gray-600">
                                                {profile.address}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Globe className="h-5 w-5 text-gray-400 mr-3" />
                                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                website
                                            </a>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                            <span className="text-gray-600">
                                                Membre depuis {formatDate(profile.joinDate)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                                            À propos
                                        </h3>
                                        <p className="text-gray-600 mb-4">{profile.bio}</p>

                                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                                            Réseaux sociaux
                                        </h3>
                                        <div className="flex space-x-3 mb-4">

                                            {profile.socialLinks.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>}
                                            {profile.socialLinks.github && <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                                </svg>
                                            </a>}
                                        </div>
                                        <Link to="/developer/settings" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
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
                                                    <Bot className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Modèles</p>
                                                    <p className="text-xl font-semibold">
                                                        {profile.stats.totalModels}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-green-100 p-3 rounded-full">
                                                    <Database className="h-6 w-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Datasets</p>
                                                    <p className="text-xl font-semibold">
                                                        {profile.stats.totalDatasets}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-indigo-100 p-3 rounded-full">
                                                    <Users className="h-6 w-6 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Abonnés</p>
                                                    <p className="text-xl font-semibold">
                                                        {profile.stats.totalSubscribers.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-purple-100 p-3 rounded-full">
                                                    <Award className="h-6 w-6 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Note moyenne
                                                    </p>
                                                    <div className="flex items-center">
                                                        <p className="text-xl font-semibold mr-2">
                                                            {profile.stats.averageRating}
                                                        </p>
                                                        <div className="flex">
                                                            {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`h-4 w-4 ${star <= Math.round(profile.stats.averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        ({profile.stats.totalRatings} évaluations)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="mr-4 bg-yellow-100 p-3 rounded-full">
                                                    <DollarSign className="h-6 w-6 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Revenu total
                                                    </p>
                                                    <p className="text-xl font-semibold">
                                                        {profile.stats.totalRevenue.toLocaleString('fr-FR', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })}{' '}
                                                        TND
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
                                            {recentActivity.map((activity, activityIdx) => <li key={activity.id}>
                                                <div className="relative pb-8">
                                                    {activityIdx !== recentActivity.length - 1 ? <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" /> : null}
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
                                                                    {activity.date ? formatRelativeTime(activity.date) : ''}
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 text-sm text-gray-700">
                                                                <p>{activity.target}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Ressources
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="mb-6">
                                        <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                                            <Bot className="h-5 w-5 text-blue-600 mr-2" />
                                            Votre modèles populaires
                                        </h3>
                                        {developer_account.models && developer_account.models.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {developer_account.models.map((model) => (
                                                    <Link to={`/developer/models/${model.id}`} key={model.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-sm transition-all">
                                                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                                                        <p className="text-sm text-gray-500 mb-2">{model.description.split(" ").slice(0, 10).join(" ") + " ..."}</p>

                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center text-sm text-gray-500 py-6 border border-dashed border-gray-300 rounded">
                                                Aucun modèle publié pour le moment.
                                            </div>
                                        )}

                                        <div className="mt-3">
                                            <Link to="/developer/models" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                                Voir tous les modèles
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                                            <Database className="h-5 w-5 text-green-600 mr-2" />
                                            Votre datasets populaires
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-sm transition-all">
                                                <h4 className="font-medium text-gray-900">
                                                    Tunisian Dialect Corpus
                                                </h4>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Corpus de textes en dialecte tunisien pour NLP
                                                </p>
                                                <div className="flex items-center justify-between">

                                                    <span className="text-xs text-gray-500">
                                                        450 téléchargements
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-sm transition-all">
                                                <h4 className="font-medium text-gray-900">
                                                    Medical Images 2024
                                                </h4>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Images médicales annotées de patients tunisiens
                                                </p>
                                                <div className="flex items-center justify-between">

                                                    <span className="text-xs text-gray-500">
                                                        320 téléchargements
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <Link to="/developer/datasets" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                                Voir tous les datasets
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </div>
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