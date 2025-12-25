import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Save,
    AlertCircle,
    Bot,
    Globe,
    Lock,
    Info,

    BarChart2,
    Server,
    CreditCard,
    Plus,
    X,

    List,
    Cpu,
} from 'lucide-react'
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader'
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar'
import axios from 'axios'
import { useError } from '../../context/ErrorContext'
import { useSuccess } from '../../context/SuccessContext'
import { BillingPeriod, Visibility } from '../../types/shared'


interface ApiEndpoint {
    id?: number
    path: string
    endpoint: string
    description: string,
    successResponse: string,
    errorResponse: string,
    method: string,
    requestBody: string


}
interface ModelTask {
    id: number
    name: string
}
interface PricingTier {
    id: number
    name: string
    price: number
    currency: string
    billingPeriod: BillingPeriod
    description: string
    apiCallsLimit: number | null
    apiCallsPrice: number | null
    features: string[]
}
interface TechnicalDetail {
    architecture: string
    parameters: string
    trainingDataset: string
    framework: string
    inputFormat: string
    outputFormat: string
    inferenceTime: string
}
interface PerformanceMetric {
    f1Score: number,
    precisionScore: number,
    recallScore: number,
    accuracyScore: number
}

interface Model {
    id: number
    name: string
    description: string
    visibility: Visibility
    endpoints: ApiEndpoint[]
    tasks: ModelTask[]
    technicalDetails: TechnicalDetail
    performance: PerformanceMetric
    subscriptionPlans: PricingTier[]
}



export function DeveloperUpdateModelPage() {
    const { id } = useParams<{
        id: string
    }>()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('models')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const [model, setModel] = useState<Model | null>(null)
    const [formData, setFormData] = useState<Partial<Model>>({})

    const { error, setError, clearError } = useError()
    const { success, setSuccess, clearSuccess } = useSuccess()

    const [activeSection, setActiveSection] = useState('basic')
    const [newEndpoint, setNewEndpoint] = useState<ApiEndpoint>({
        path: '',
        endpoint: '',
        description: '',
        successResponse: '',
        errorResponse: '',
        method: 'GET',
        requestBody: '',
    })


    const [availableTasks, setAvailableTasks] = useState<ModelTask[]>([])
    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true)

    const [searchTask, setSearchTask] = useState<string>('')


    const [newPricingTier, setNewPricingTier] = useState<PricingTier>({
        id: Date.now(),
        name: '',
        price: 0,
        currency: 'TND',
        billingPeriod: BillingPeriod.MONTHLY,
        description: '',
        apiCallsLimit: null,
        apiCallsPrice: null,
        features: [],
    })
    const [newFeature, setNewFeature] = useState('')

    const [newTechnicalDetails, setTechnicalDetails] = useState<TechnicalDetail>({
        architecture: '',
        parameters: '',
        trainingDataset: '',
        framework: '',
        inputFormat: '',
        outputFormat: '',
        inferenceTime: '',
    })
    const [newPerformanceMetric, setNewPerformanceMetric] =
        useState<PerformanceMetric>({
            f1Score: 0,
            precisionScore: 0,
            recallScore: 0,
            accuracyScore: 0,
        })
    const convertDtoToModel = (data: any): Model => {

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            visibility: data.visibility,

            endpoints: data.endpoints ?? [],
            tasks: data.tasks ?? [],
            technicalDetails: {
                architecture:
                    data.architecture ?? "",
                parameters: data.parameters ?? "",
                trainingDataset:
                    data.trainingDataset ?? "",
                framework: data.framework ?? "",
                inputFormat: data.inputFormat ?? "",
                outputFormat: data.outputFormat ?? "",
                inferenceTime: data.inferenceTime ?? "",
            },
            performance:
            {
                f1Score: data.performance?.f1Score ?? 0,
                precisionScore: data.performance?.precisionScore ?? 0,
                recallScore: data.performance?.recallScore ?? 0,
                accuracyScore: data.performance?.accuracyScore ?? 0,
            }
            ,
            subscriptionPlans:
                data.subscriptionPlans.length === 0
                    ? []
                    : data.subscriptionPlans.map((plan: any) => ({
                        id: plan.id,
                        name: plan.name,
                        description: plan.description,
                        price: plan.price,
                        currency: plan.currency,
                        billingPeriod: plan.billingPeriod,
                        features: plan.features,
                        apiCallsLimit: plan.apiCallsLimit,

                    })),

        }
    }

    useEffect(() => {


        const fetchModel = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/models/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                })
                const data = response.data.data;

                // Mock data for a single model
                const mockModel: Model = convertDtoToModel(data)
                setModel(mockModel)
                setFormData(mockModel)
            } catch (err) {
                setError({
                    type: 'NETWORK',
                    message: 'Erreur lors du chargement des données du modèle',
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchModel()
    }, [id])


    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }
    const handleVisibilityChange = (visibility: Visibility) => {
        setFormData(prev => ({
            ...prev,
            visibility: visibility,
        }))
    }

    const handleTechnicalDetailChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            technicalDetails: {
                architecture: prev.technicalDetails?.architecture ?? "",
                parameters: prev.technicalDetails?.parameters ?? "",
                trainingDataset: prev.technicalDetails?.trainingDataset ?? "",
                framework: prev.technicalDetails?.framework ?? "",
                inputFormat: prev.technicalDetails?.inputFormat ?? "",
                outputFormat: prev.technicalDetails?.outputFormat ?? "",
                inferenceTime: prev.technicalDetails?.inferenceTime ?? "",
                [field]: value,
            },
        }));
    };

    const handleAddApiEndpoint = () => {
        if (!newEndpoint.description.trim() || !newEndpoint.path.trim()) return
        setFormData({
            ...formData,
            endpoints: [
                ...(formData.endpoints || []),
                {
                    ...newEndpoint,
                    id: Date.now(),
                },
            ],
        })
        setNewEndpoint({
            id: Date.now(),
            path: '',
            endpoint: '',
            description: '',
            successResponse: '',
            errorResponse: '',
            method: 'GET',
            requestBody: '',
        })
    }
    const handleRemoveApiEndpoint = (id: number) => {
        setFormData({
            ...formData,
            endpoints: formData.endpoints?.filter(
                (endpoint) => endpoint.id !== id,
            ),
        })
    }

    // Fetch available tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const resp = await axios.get(
                    `${import.meta.env.VITE_BACKEND_HOST}/api/v1/tasks`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        },
                        withCredentials: true,
                    }
                );

                const maybePage = resp.data?.data;
                const tasksArray: ModelTask[] = Array.isArray(maybePage?.content)
                    ? maybePage.content
                    : [];

                setAvailableTasks(tasksArray);
            } catch (err: any) {
                setError({
                    type: 'NETWORK',
                    message: "Une erreur s'est produite lors de la récupération des tâches."
                })
            } finally {
                setIsLoadingTasks(false);
            }
        };

        fetchTasks();
    }, []);

    // Handle task selection - CORRECTION: mettre à jour formData au lieu de model
    const addTask = (task: ModelTask) => {
        setFormData((prev) => {
            const existing = prev.tasks ?? []
            if (existing.some((t) => t.id === task.id)) {
                return prev
            }
            return {
                ...prev,
                tasks: [...existing, task],
            }
        })
        setSearchTask('')
    }
    const filteredTasks = searchTask
        ? availableTasks
            .filter((task) =>
                task.name.toLowerCase().includes(searchTask.toLowerCase()),
            )
            .filter((task) => !(formData.tasks || []).some((t) => t.id === task.id))
        : []

    const handleRemoveTask = (id: number) => {
        setFormData(prev => ({
            ...prev,
            tasks: (prev.tasks || []).filter((task) => task.id !== id),
        }))
    }
    const handleAddPricingTier = () => {
        if (!newPricingTier.name.trim()) return
        setFormData({
            ...formData,
            subscriptionPlans: [
                ...(formData.subscriptionPlans || []),
                { ...newPricingTier, id: Date.now() },
            ],
        })
        setNewPricingTier({
            id: Date.now(),
            name: '',
            price: 0,
            currency: 'TND',
            billingPeriod: BillingPeriod.MONTHLY,
            description: "",
            apiCallsLimit: 0,
            apiCallsPrice: 0,
            features: [],
        })
    }

    const handleRemovePricingTier = (id: number) => {
        setFormData({
            ...formData,
            subscriptionPlans: formData.subscriptionPlans?.filter((tier) => tier.id !== id) || [],
        })
    }

    const handleAddFeature = (tierId: number) => {
        if (!newFeature.trim()) return
        const updatedTiers = formData.subscriptionPlans?.map((tier) =>
            tier.id === tierId
                ? { ...tier, features: [...tier.features, newFeature] }
                : tier
        )
        setFormData({ ...formData, subscriptionPlans: updatedTiers || [] })
        setNewFeature('')
    }

    const handleRemoveFeature = (tierId: number, index: number) => {
        const updatedTiers = formData.subscriptionPlans?.map((tier) => {
            if (tier.id === tierId) {
                const updatedFeatures = [...tier.features]
                updatedFeatures.splice(index, 1)
                return { ...tier, features: updatedFeatures }
            }
            return tier
        })
        setFormData({ ...formData, subscriptionPlans: updatedTiers || [] })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        try {
            console.log('Submitting form data:', formData);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/models/${id}`,
                {
                    id: formData.id,

                    name: formData.name,
                    description: formData.description,
                    visibility: formData.visibility,

                    endpoints: formData.endpoints ?? [],
                    tasks: formData.tasks ?? [],
                    architecture:
                        formData.technicalDetails?.architecture ?? "",
                    parameters: formData.technicalDetails?.parameters ?? "",
                    trainingDataset:
                        formData.technicalDetails?.trainingDataset ?? "",
                    framework: formData.technicalDetails?.framework ?? "",
                    inputFormat: formData.technicalDetails?.inputFormat ?? "",
                    outputFormat: formData.technicalDetails?.outputFormat ?? "",
                    inferenceTime: formData.technicalDetails?.inferenceTime ?? "",

                    performance:
                    {
                        f1Score: formData.performance?.f1Score ?? 0,
                        precisionScore: formData.performance?.precisionScore ?? 0,
                        recallScore: formData.performance?.recallScore ?? 0,
                        accuracyScore: formData.performance?.accuracyScore ?? 0,
                    }
                    ,
                    subscriptionPlans:
                        (formData.subscriptionPlans ?? []).length === 0
                            ? []
                            : (formData.subscriptionPlans ?? []).map((plan: any) => ({
                                id: plan.id,
                                name: plan.name,
                                description: plan.description,
                                price: plan.price,
                                currency: plan.currency,
                                billingPeriod: plan.billingPeriod,
                                features: plan.features,
                                apiCallsLimit: plan.apiCallsLimit,

                            })),
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            })
            const data = response.data.data;
            console.log('Response data:', data);
            setFormData(convertDtoToModel(data));
            console.log('Form data submitted successfully');
            // Show success message
            setSuccess({
                type: 'MODEL_UPDATED',
                message: 'Modèle mis à jour avec succès',
                redirect: `/developer/models/${data.id}`

            })

        } catch (err) {
            setError({
                type: 'NETWORK',
                message: 'Erreur lors de la mise à jour du modèle',
            })
        } finally {
            setIsSaving(false)
        }
    }
    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DeveloperDashboardHeader />
                <div className="flex">
                    <DeveloperDashboardSidebar
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                    <main className="flex-1 p-6">
                        <div className="container mx-auto max-w-5xl">
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
    if (error && !model) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DeveloperDashboardHeader />
                <div className="flex">
                    <DeveloperDashboardSidebar
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                    <main className="flex-1 p-6">
                        <div className="container mx-auto max-w-5xl">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start">
                                <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                                <div>
                                    <h3 className="font-medium text-red-800 mb-1">Erreur</h3>
                                    <p className="text-red-700">{error.message}</p>
                                    <button
                                        onClick={() => navigate('/developer/models')}
                                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                    >
                                        Retour à la liste des modèles
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <DeveloperDashboardHeader />
            <div className="flex">
                <DeveloperDashboardSidebar
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
                <main className="flex-1 p-6">
                    <div className="container mx-auto max-w-5xl">
                        {/* Back button and title */}
                        <div className="mb-6">
                            <button
                                onClick={() => navigate('/developer/models')}
                                className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Retour à la liste des modèles
                            </button>
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                    <Bot className="h-5 w-5 text-blue-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Modifier le modèle: {model?.name}
                                </h1>
                            </div>
                        </div>

                        {/* Section Navigation */}
                        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveSection('basic')}
                                    className={`px-4 py-2 rounded-lg ${activeSection === 'basic' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                >
                                    <Bot className="h-4 w-4 inline mr-2" />
                                    Informations de base
                                </button>
                                <button
                                    onClick={() => setActiveSection('technical')}
                                    className={`px-4 py-2 rounded-lg ${activeSection === 'technical' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                >
                                    <Cpu className="h-4 w-4 inline mr-2" />
                                    Détails techniques
                                </button>
                                <button
                                    onClick={() => setActiveSection('performance')}
                                    className={`px-4 py-2 rounded-lg ${activeSection === 'performance' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                >
                                    <BarChart2 className="h-4 w-4 inline mr-2" />
                                    Performance
                                </button>
                                <button
                                    onClick={() => setActiveSection('api')}
                                    className={`px-4 py-2 rounded-lg ${activeSection === 'api' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                >
                                    <Server className="h-4 w-4 inline mr-2" />
                                    API Endpoints
                                </button>
                                <button
                                    onClick={() => setActiveSection('tasks')}
                                    className={`px-4 py-2 rounded-lg ${activeSection === 'tasks' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                >
                                    <List className="h-4 w-4 inline mr-2" />
                                    Tâches
                                </button>
                                <button
                                    onClick={() => setActiveSection('pricing')}
                                    className={`px-4 py-2 rounded-lg ${activeSection === 'pricing' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                                >
                                    <CreditCard className="h-4 w-4 inline mr-2" />
                                    Tarification
                                </button>

                            </div>
                        </div>
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information Card */}
                            {activeSection === 'basic' && (
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Informations de base
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Nom du modèle
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name || ''}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="description"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description || ''}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Visibilité
                                            </label>
                                            <div className="flex space-x-4">
                                                <button
                                                    type="button"
                                                    className={`flex items-center px-4 py-2 rounded-lg border ${formData.visibility === Visibility.PUBLIC ? 'bg-green-50 border-green-300 text-green-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() =>
                                                        handleVisibilityChange(Visibility.PUBLIC)
                                                    }
                                                >
                                                    <Globe className="h-4 w-4 mr-2" />
                                                    Public
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`flex items-center px-4 py-2 rounded-lg border ${formData.visibility === Visibility.PRIVATE ? 'bg-red-50 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() =>
                                                        handleVisibilityChange(Visibility.PRIVATE)
                                                    }
                                                >
                                                    <Lock className="h-4 w-4 mr-2" />
                                                    Privé
                                                </button>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {formData.visibility === Visibility.PUBLIC
                                                    ? 'Votre modèle sera visible et accessible par tous les utilisateurs'
                                                    : 'Votre modèle ne sera visible que par vous et les utilisateurs que vous autorisez'}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {/* Technical Details Card */}
                            {activeSection === 'technical' && (
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                                        <Cpu className="h-5 w-5 mr-2 text-blue-600" />
                                        Détails techniques
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Architecture
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.technicalDetails?.architecture || ''}
                                                    onChange={(e) =>
                                                        handleTechnicalDetailChange(
                                                            'architecture',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="ex: BERT, GPT, ResNet"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Paramètres
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.technicalDetails?.parameters || ''}
                                                    onChange={(e) =>
                                                        handleTechnicalDetailChange(
                                                            'parameters',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="ex: 110M, 1.5B"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Framework
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.technicalDetails?.framework || ''}
                                                    onChange={(e) =>
                                                        handleTechnicalDetailChange(
                                                            'framework',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="ex: PyTorch, TensorFlow"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Format d'entrée
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.technicalDetails?.inputFormat || ''}
                                                    onChange={(e) =>
                                                        handleTechnicalDetailChange(
                                                            'inputFormat',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="ex: Texte brut, Tokens encodés"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Format de sortie
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.technicalDetails?.outputFormat || ''}
                                                    onChange={(e) =>
                                                        handleTechnicalDetailChange(
                                                            'outputFormat',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="ex: Embeddings, Logits, JSON"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Temps d'inférence
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.technicalDetails?.inferenceTime || ''}
                                                    onChange={(e) =>
                                                        handleTechnicalDetailChange(
                                                            'inferenceTime',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="ex: 50ms, 1.2s"
                                                />
                                            </div>

                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Données d'entraînement
                                            </label>
                                            <textarea
                                                value={formData.technicalDetails?.trainingDataset || ''}
                                                onChange={(e) =>
                                                    handleTechnicalDetailChange(
                                                        'trainingDataset',
                                                        e.target.value,
                                                    )
                                                }
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="ex: 30GB de textes en arabe standard et dialectal tunisien"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Performance Metrics Card */}
                            {activeSection === 'performance' && (
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                                        <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                                        Métriques de performance
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                F1-Score
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.performance?.f1Score ?? 0}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        performance: {
                                                            ...(formData.performance || {
                                                                f1Score: 0,
                                                                precisionScore: 0,
                                                                recallScore: 0,
                                                                accuracyScore: 0,
                                                            }),
                                                            f1Score: parseFloat(e.target.value),
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="ex: 0.88"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Précision
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.performance?.precisionScore ?? 0}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        performance: {
                                                            ...(formData.performance || {
                                                                f1Score: 0,
                                                                precisionScore: 0,
                                                                recallScore: 0,
                                                                accuracyScore: 0,
                                                            }),
                                                            precisionScore: parseFloat(e.target.value),
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="ex: 0.92"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Rappel
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.performance?.recallScore ?? 0}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        performance: {
                                                            ...(formData.performance || {
                                                                f1Score: 0,
                                                                precisionScore: 0,
                                                                recallScore: 0,
                                                                accuracyScore: 0,
                                                            }),
                                                            recallScore: parseFloat(e.target.value),
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="ex: 0.85"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Exactitude (Accuracy)
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.performance?.accuracyScore ?? 0}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        performance: {
                                                            ...(formData.performance || {
                                                                f1Score: 0,
                                                                precisionScore: 0,
                                                                recallScore: 0,
                                                                accuracyScore: 0,
                                                            }),
                                                            accuracyScore: parseFloat(e.target.value),
                                                        },
                                                    })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="ex: 0.90"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* API Endpoints Card */}
                            {activeSection === 'api' && (
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                                        <Server className="h-5 w-5 mr-2 text-blue-600" />
                                        Points d'accès API
                                    </h2>
                                    <div className="space-y-6 mb-6">
                                        {formData.endpoints?.map((endpoint) => (
                                            <div
                                                key={endpoint.id}
                                                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-md font-medium">
                                                        {endpoint.description}
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (typeof endpoint.id === 'number') {
                                                                handleRemoveApiEndpoint(endpoint.id)
                                                            }
                                                        }}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <span className="block text-sm font-medium text-gray-700">
                                                                Méthode
                                                            </span>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                {endpoint.method}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="block text-sm font-medium text-gray-700">
                                                                Endpoint URL
                                                            </span>
                                                            <code className="block mt-1 p-2 bg-gray-100 rounded font-mono text-sm">
                                                                {endpoint.path}
                                                            </code>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <span className="block text-sm font-medium text-gray-700">
                                                            Corps de la requête
                                                        </span>
                                                        <pre className="mt-1 p-2 bg-gray-100 rounded font-mono text-sm overflow-x-auto">
                                                            {endpoint.requestBody || 'Aucun corps de requête'}
                                                        </pre>
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-medium text-gray-700">
                                                            Réponse en cas de succès
                                                        </span>
                                                        <pre className="mt-1 p-2 bg-gray-100 rounded font-mono text-sm overflow-x-auto">
                                                            {endpoint.successResponse}
                                                        </pre>
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-medium text-gray-700">
                                                            Réponse en cas d'erreur
                                                        </span>
                                                        <pre className="mt-1 p-2 bg-gray-100 rounded font-mono text-sm overflow-x-auto">
                                                            {endpoint.errorResponse}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-md font-medium mb-4">
                                            Ajouter un nouveau point d'accès API
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Chemin
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newEndpoint.path}
                                                        onChange={(e) =>
                                                            setNewEndpoint({
                                                                ...newEndpoint,
                                                                path: e.target.value,
                                                            })

                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="ex: /sentiment"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Méthode
                                                    </label>
                                                    <select
                                                        value={newEndpoint.method}
                                                        onChange={(e) =>
                                                            setNewEndpoint({
                                                                ...newEndpoint,
                                                                method: e.target.value,
                                                            })
                                                        }

                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="GET">GET</option>
                                                        <option value="POST">POST</option>
                                                        <option value="PUT">PUT</option>
                                                        <option value="DELETE">DELETE</option>
                                                        <option value="PATCH">PATCH</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <textarea

                                                    value={newEndpoint.description}
                                                    onChange={(e) =>
                                                        setNewEndpoint({
                                                            ...newEndpoint,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                    rows={2}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="ex: Analyse le sentiment d'un texte en arabe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Corps de la requête (JSON)
                                                </label>
                                                <textarea
                                                    value={newEndpoint.requestBody}
                                                    onChange={(e) =>
                                                        setNewEndpoint({
                                                            ...newEndpoint,
                                                            requestBody: e.target.value,
                                                        })
                                                    }
                                                    rows={3}

                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                                    placeholder='ex: {"text": "Exemple de texte à analyser"}'
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Réponse en cas de succès (JSON)
                                                </label>
                                                <textarea
                                                    value={newEndpoint.successResponse}
                                                    onChange={(e) =>
                                                        setNewEndpoint({
                                                            ...newEndpoint,
                                                            successResponse: e.target.value,
                                                        })
                                                    }
                                                    rows={3}

                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                                    placeholder='ex: {"sentiment": "positive", "score": 0.92}'
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Réponse en cas d'erreur (JSON)
                                                </label>
                                                <textarea
                                                    value={newEndpoint.errorResponse}
                                                    onChange={(e) =>
                                                        setNewEndpoint({
                                                            ...newEndpoint,
                                                            errorResponse: e.target.value,
                                                        })
                                                    }
                                                    rows={3}

                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                                    placeholder='ex: {"error": "Invalid input", "code": 400}'
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={handleAddApiEndpoint}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Ajouter l'endpoint
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Tasks Card */}
                            {activeSection === 'tasks' && (
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                                        <List className="h-5 w-5 mr-2 text-blue-600" />
                                        Tâches prises en charge
                                    </h2>
                                    <div className="space-y-4 mb-6">
                                        {formData.tasks?.map((task) => (
                                            <div
                                                key={task.id}
                                                className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between"
                                            >
                                                <div>
                                                    <h3 className="font-medium">{task.name}</h3>

                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTask(task.id)}
                                                    className="text-red-500 hover:text-red-700 self-start"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h3 className="text-md font-medium mb-3">
                                            Ajouter une nouvelle tâche
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nom de la tâche
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Rechercher des tâches..."
                                                    value={searchTask}
                                                    onChange={(e) => setSearchTask(e.target.value)}
                                                />
                                                {/* Dropdown for search results */}
                                                {searchTask && filteredTasks.length > 0 && (
                                                    <div className=" z-10 w-full  px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                        {filteredTasks.map((task) => (
                                                            <div
                                                                key={task.id}
                                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                                onClick={() => addTask(task)}
                                                            >
                                                                {task.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Pricing Card */}
                            {activeSection === 'pricing' && (
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                                        Plans de tarification
                                    </h2>
                                    <div className="mb-6">
                                        <h3 className="text-md font-medium mb-3">
                                            Plans d'abonnement
                                        </h3>
                                        <div className="space-y-6 mb-6">
                                            {formData.subscriptionPlans?.map((tier) => (
                                                <div
                                                    key={tier.id}
                                                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                                                >
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h4 className="font-medium">{tier.name}</h4>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {tier.description}
                                                            </p>
                                                            <div className="mt-1 flex items-baseline">
                                                                <span className="text-xl font-bold text-gray-900">
                                                                    {tier.price} {tier.currency}
                                                                </span>
                                                                <span className="ml-1 text-sm text-gray-500">
                                                                    /
                                                                    {tier.billingPeriod === BillingPeriod.MONTHLY
                                                                        ? 'mois'
                                                                        : 'an'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemovePricingTier(tier.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <span className="block text-sm font-medium text-gray-700 mb-1">
                                                                Limite d'appels API
                                                            </span>
                                                            <span className="block font-medium">
                                                                {tier.apiCallsLimit
                                                                    ? tier.apiCallsLimit.toLocaleString()
                                                                    : 'Illimité'}
                                                            </span>
                                                        </div>
                                                        {tier.apiCallsPrice && (
                                                            <div>
                                                                <span className="block text-sm font-medium text-gray-700 mb-1">
                                                                    Prix par appel API
                                                                </span>
                                                                <span className="block font-medium">
                                                                    {tier.apiCallsPrice} {tier.currency}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <span className="block text-sm font-medium text-gray-700 mb-1">
                                                                Fonctionnalités incluses
                                                            </span>
                                                            <div className="space-y-2">
                                                                {tier.features.map((feature: string, index: number) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-200"
                                                                    >
                                                                        <span>{feature}</span>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleRemoveFeature(tier.id, index)
                                                                            }
                                                                            className="text-red-500 hover:text-red-700"
                                                                        >
                                                                            <X className="h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className="flex mt-3">
                                                                <input
                                                                    type="text"
                                                                    value={newFeature}
                                                                    onChange={(e) =>
                                                                        setNewFeature(e.target.value)
                                                                    }
                                                                    placeholder="Ajouter une fonctionnalité..."
                                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleAddFeature(tier.id)}
                                                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h3 className="text-md font-medium mb-3">
                                                Ajouter un nouveau plan
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nom du plan
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPricingTier.name}
                                                        onChange={(e) =>
                                                            setNewPricingTier({
                                                                ...newPricingTier,
                                                                name: e.target.value,
                                                            })
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="ex: Standard, Premium, Entreprise"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPricingTier.description}
                                                        onChange={(e) =>
                                                            setNewPricingTier({
                                                                ...newPricingTier,
                                                                description: e.target.value,
                                                            })
                                                        }

                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="ex: Pour les projets de recherche et les tests"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Période de facturation
                                                    </label>
                                                    <select
                                                        value={newPricingTier.billingPeriod}
                                                        onChange={(e) =>
                                                            setNewPricingTier({
                                                                ...newPricingTier,
                                                                billingPeriod: e.target.value as BillingPeriod,
                                                            })
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value={BillingPeriod.MONTHLY}>
                                                            Mensuel
                                                        </option>
                                                        <option value={BillingPeriod.ANNUAL}>Annuel</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Prix
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={newPricingTier.price}
                                                        onChange={(e) =>
                                                            setNewPricingTier({
                                                                ...newPricingTier,
                                                                price: parseFloat(e.target.value),
                                                            })
                                                        }

                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Devise
                                                    </label>
                                                    <select
                                                        value={newPricingTier.currency}
                                                        onChange={(e) =>
                                                            setNewPricingTier({
                                                                ...newPricingTier,
                                                                currency: e.target.value,
                                                            })
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="TND">TND - Dinar Tunisien</option>

                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Limite d'appels API
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={newPricingTier.apiCallsLimit ?? ''}
                                                        onChange={(e) =>
                                                            setNewPricingTier({
                                                                ...newPricingTier,
                                                                apiCallsLimit: e.target.value
                                                                    ? parseInt(e.target.value)
                                                                    : null,
                                                            })
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="ex: 10000"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Prix par appel API (optionnel)
                                                    </label>
                                                    {/* if the price is not null then this input should be diseabled */}
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        value={newPricingTier.apiCallsPrice || ""}
                                                        onChange={(e) =>
                                                            setNewPricingTier({
                                                                ...newPricingTier,
                                                                apiCallsPrice: e.target.value
                                                                    ? parseFloat(e.target.value)
                                                                    : null,
                                                            })
                                                        }

                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="ex: 0.001 par appel"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={handleAddPricingTier}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                                >
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Ajouter le plan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Info Box */}
                            <div className="bg-blue-50 rounded-xl shadow-sm p-6">
                                <div className="flex items-start">
                                    <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                                    <div>
                                        <h3 className="font-medium text-blue-800 mb-1">
                                            Mise à jour du modèle
                                        </h3>
                                        <p className="text-blue-700">
                                            La mise à jour des métadonnées de votre modèle n'affecte
                                            pas les versions déployées ou les abonnements existants.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Enregistrer les modifications
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}
