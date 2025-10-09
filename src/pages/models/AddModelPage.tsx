import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'sonner'

import {
    UploadCloud,

    Lock,
    Globe,
    BookOpen,
    Package,
    Tag,
    X,
    Server,
    Cpu,
    BarChart,

    Plus,
    Trash2,
    AlertCircle,
    Calendar,
    Zap,
    CreditCard,
    Loader,
    AlertTriangle,
} from 'lucide-react'
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader'
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar'
import { useError } from '../../context/ErrorContext'
import { useSuccess } from '../../context/SuccessContext'
import { useAuth } from '../../context/AuthContext'
import { DeveloperAccount } from '../../types/auth'
// Define types to match the Spring DTO
interface TaskDto {
    id: number
    name: string
}
// Enhanced endpoint interface with request and response details
interface EndpointDto {
    method: string
    path: string
    description: string
    requestBody: string
    successResponse: string
    errorResponse: string
}
enum Visibility {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}
// Define subscription plan types
enum BillingPeriod {
    MONTHLY = 'MONTHLY',
    ANNUAL = 'ANNUAL',
    WEEKLY = 'WEEKLY',

}
// Interface for subscription plans
interface SubscriptionPlanDto {
    id?: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    billingPeriod: BillingPeriod;
    features: string[];
    apiCallsLimit?: number;
    apiCallsPrice?: number;
}
// Updated AiModelDto to include endpoints as an array
interface AiModelDto {
    id?: number
    name: string
    description: string
    developerId?: number
    image: string
    visibility: Visibility
    tasks: TaskDto[]
    endpoints: EndpointDto[]
    framework?: string
    architecture?: string
    performance?: {
        accuracyScore?: string
        precisionScore?: string
        recallScore?: string
        f1Score?: string
    }
    trainingDataset?: string
    subscriptionPlans?: SubscriptionPlanDto[];

}
export function AddModelPage() {

    const [activeTab, setActiveTab] = useState('models');
    const [availableTasks, setAvailableTasks] = useState<TaskDto[]>([])
    const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true)
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [tasksError, setTasksError] = useState<string>('')
    const [searchTask, setSearchTask] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newFeature, setNewFeature] = useState<string>('');


    const { error, setError, clearError } = useError();
    const { success, setSuccess, clearSuccess } = useSuccess();


    const { account, token } = useAuth();
    const developer_account = account as DeveloperAccount;

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    // Updated model data to use endpoints array
    const [modelData, setModelData] = useState<AiModelDto>({
        name: '',
        description: '',
        image: '',
        visibility: Visibility.PUBLIC,
        tasks: [],
        endpoints: [],
        framework: '',
        architecture: '',
        performance: {
            accuracyScore: '',
            precisionScore: '',
            recallScore: '',
            f1Score: '',
        },
        trainingDataset: '',
        subscriptionPlans: []

    })
    // New state for the endpoint being added with enhanced fields
    const [newEndpoint, setNewEndpoint] = useState<EndpointDto>({
        method: 'GET',
        path: '',
        description: '',
        requestBody: '{}',
        successResponse: '{}',
        errorResponse: '{}',
    })
    // New state for subscription plan being added
    const [newPlan, setNewPlan] = useState<SubscriptionPlanDto>({
        name: '',
        description: '',
        price: 0,
        currency: 'TND',
        billingPeriod: BillingPeriod.MONTHLY,
        features: [],
        apiCallsLimit: undefined,
        apiCallsPrice: undefined
    });
    // State for new feature being added to a plan
    // JSON validation errors
    const [jsonErrors, setJsonErrors] = useState({
        requestBody: false,
        successResponse: false,
        errorResponse: false,
    })

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
                const tasksArray: TaskDto[] = Array.isArray(maybePage?.content)
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
    // Handle task selection
    const addTask = (task: TaskDto) => {
        if (!modelData.tasks.some((t) => t.id === task.id)) {
            setModelData({
                ...modelData,
                tasks: [...modelData.tasks, task],
            })
        }
        setSearchTask('')
    }
    const removeTask = (taskId: number) => {
        setModelData({
            ...modelData,
            tasks: modelData.tasks.filter((task) => task.id !== taskId),
        })
    }
    // Helper function to update performance metrics
    const updatePerformance = (field: string, value: string) => {
        setModelData({
            ...modelData,
            performance: {
                ...modelData.performance,
                [field]: value,
            },
        })
    }
    // Validate JSON string
    const validateJson = (json: string): boolean => {
        try {
            JSON.parse(json)
            return true
        } catch (e) {
            return false
        }
    }
    // Update JSON field with validation
    const updateJsonField = (field: keyof typeof jsonErrors, value: string) => {
        setNewEndpoint({
            ...newEndpoint,
            [field]: value,
        })
        setJsonErrors({
            ...jsonErrors,
            [field]: value.trim() !== '' && !validateJson(value),
        })
    }
    // Format JSON for display
    const formatJson = (json: string): string => {
        try {
            return JSON.stringify(JSON.parse(json), null, 2)
        } catch (e) {
            return json
        }
    }
    // Handler for adding a new endpoint
    const addEndpoint = (e: React.FormEvent) => {
        e.preventDefault()
        // Validate all JSON fields
        const requestBodyValid = validateJson(newEndpoint.requestBody)
        const successResponseValid = validateJson(newEndpoint.successResponse)
        const errorResponseValid = validateJson(newEndpoint.errorResponse)
        // Update error states
        setJsonErrors({
            requestBody: !requestBodyValid && newEndpoint.requestBody.trim() !== '',
            successResponse:
                !successResponseValid && newEndpoint.successResponse.trim() !== '',
            errorResponse:
                !errorResponseValid && newEndpoint.errorResponse.trim() !== '',
        })
        // Only add if path is provided and all JSON is valid
        if (
            newEndpoint.path.trim() !== '' &&
            (requestBodyValid || newEndpoint.requestBody.trim() === '') &&
            (successResponseValid || newEndpoint.successResponse.trim() === '') &&
            (errorResponseValid || newEndpoint.errorResponse.trim() === '')
        ) {
            setModelData({
                ...modelData,
                endpoints: [
                    ...modelData.endpoints,
                    {
                        ...newEndpoint,
                    },
                ],
            })
            // Reset the form after adding
            setNewEndpoint({
                method: 'GET',
                path: '',
                description: '',
                requestBody: '{}',
                successResponse: '{}',
                errorResponse: '{}',
            })
        }
    }
    // Handler for removing an endpoint
    const removeEndpoint = (index: number) => {

        const updatedEndpoints = [...modelData.endpoints]
        updatedEndpoints.splice(index, 1)
        setModelData({
            ...modelData,
            endpoints: updatedEndpoints,
        })
    }

    // Handler for adding a feature to a subscription plan
    const addFeature = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFeature.trim() !== '') {
            setNewPlan({
                ...newPlan,
                features: [...newPlan.features, newFeature.trim()]
            });
            setNewFeature('');
        }
    };
    // Handler for removing a feature from a subscription plan
    const removeFeature = (index: number) => {
        const updatedFeatures = [...newPlan.features];
        updatedFeatures.splice(index, 1);
        setNewPlan({
            ...newPlan,
            features: updatedFeatures
        });
    };
    // Handler for adding a new subscription plan
    const addSubscriptionPlan = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPlan.name.trim() !== '') {
            // For pay-as-you-go plans, ensure apiCallsPrice is set
            const planToAdd = {
                ...newPlan,

            };
            setModelData({
                ...modelData,
                subscriptionPlans: [...(modelData.subscriptionPlans || []), planToAdd]
            });
            // Reset the form after adding
            setNewPlan({
                name: '',
                description: '',
                price: 0,
                currency: 'TND',
                billingPeriod: BillingPeriod.MONTHLY,
                features: [],
                apiCallsLimit: undefined,
                apiCallsPrice: undefined
            });
        }
    };
    // Handler for removing a subscription plan
    const removeSubscriptionPlan = (index: number) => {
        const updatedPlans = [...(modelData.subscriptionPlans || [])];
        updatedPlans.splice(index, 1);
        setModelData({
            ...modelData,
            subscriptionPlans: updatedPlans
        });
    };
    // Filter tasks based on search input
    const filteredTasks = searchTask
        ? availableTasks.filter((task) =>
            task.name.toLowerCase().includes(searchTask.toLowerCase()),
        )
        : []
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        let response;
        try {
            response = await axios.post(
                `${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/models/publish`,
                modelData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                    withCredentials: true,
                },
            )
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                setModelData({
                    name: '',
                    description: '',
                    image: '',
                    visibility: Visibility.PUBLIC,
                    tasks: [],
                    endpoints: [],
                    framework: '',
                    architecture: '',
                    performance: {
                        accuracyScore: '',
                        precisionScore: '',
                        recallScore: '',
                        f1Score: '',
                    },
                    trainingDataset: '',
                    subscriptionPlans: []

                })
                setSuccess({
                    type: 'MODEL_ADDED',
                    message: "Modèle ajouté avec succès.",
                    redirect: `/developer/models/${response.data.data.id}`
                })
            } else {
                setError({
                    type: 'NETWORK',
                    message: response?.data?.message || "Une erreur s'est produite lors de l'ajout du modèle."

                })
            }
        } catch (error: any) {
            console.error(error)
            setError({
                type: 'NETWORK',
                message: "Une erreur s'est produite lors de l'ajout du modèle."
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DeveloperDashboardHeader />
            <div className="flex">
                <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
                <main className="flex-1 p-6">
                    <div className="min-h-screen bg-gray-50 py-8">
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
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                            <div className="bg-white rounded-xl shadow-sm p-8">
                                <h1 className="text-3xl font-bold flex items-center mb-8">
                                    <UploadCloud className="h-8 w-8 text-blue-600 mr-3" />
                                    Publier un nouveau modèle
                                </h1>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Section Informations de base */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                                            <h2 className="text-xl font-semibold">
                                                Informations du modèle
                                            </h2>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nom du modèle *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.name}
                                                    onChange={(e) =>
                                                        setModelData({
                                                            ...modelData,
                                                            name: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Image Docker Hub *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.image}
                                                    onChange={(e) =>
                                                        setModelData({
                                                            ...modelData,
                                                            image: e.target.value,
                                                        })
                                                    }
                                                    placeholder="exemple: repository:tag"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Description *
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    required
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.description}
                                                    onChange={(e) =>
                                                        setModelData({
                                                            ...modelData,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Section Technical Details */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <Cpu className="h-5 w-5 text-blue-600 mr-2" />
                                            <h2 className="text-xl font-semibold">Détails techniques</h2>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Framework
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.framework}
                                                    onChange={(e) =>
                                                        setModelData({
                                                            ...modelData,
                                                            framework: e.target.value,
                                                        })
                                                    }
                                                    placeholder="ex: PyTorch, TensorFlow, Hugging Face"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Architecture
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.architecture}
                                                    onChange={(e) =>
                                                        setModelData({
                                                            ...modelData,
                                                            architecture: e.target.value,
                                                        })
                                                    }
                                                    placeholder="ex: BERT, ResNet, Transformer"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Dataset utilisé pour l'entraînement
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.trainingDataset}
                                                    onChange={(e) =>
                                                        setModelData({
                                                            ...modelData,
                                                            trainingDataset: e.target.value,
                                                        })
                                                    }
                                                    placeholder="ex: Tunisian Dialect Corpus, COCO Dataset"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Section Performance */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <BarChart className="h-5 w-5 text-blue-600 mr-2" />
                                            <h2 className="text-xl font-semibold">Performance</h2>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Précision (Accuracy)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.performance?.accuracyScore}
                                                    onChange={(e) =>
                                                        updatePerformance('accuracyScore', e.target.value)
                                                    }
                                                    placeholder="ex: 0.92"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Précision (Precision)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.performance?.precisionScore}
                                                    onChange={(e) =>
                                                        updatePerformance('precisionScore', e.target.value)
                                                    }
                                                    placeholder="ex: 0.92"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Rappel (Recall)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.performance?.recallScore}
                                                    onChange={(e) =>
                                                        updatePerformance('recallScore', e.target.value)
                                                    }
                                                    placeholder="ex: 0.89"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Score F1
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    value={modelData.performance?.f1Score}
                                                    onChange={(e) =>
                                                        updatePerformance('f1Score', e.target.value)
                                                    }
                                                    placeholder="ex: 0.90"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Section API - Enhanced to support comprehensive endpoint documentation */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <Server className="h-5 w-5 text-blue-600 mr-2" />
                                            <h2 className="text-xl font-semibold">Endpoints API</h2>
                                        </div>
                                        {/* Enhanced form to add new endpoints */}
                                        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                            <h3 className="text-md font-medium mb-4">
                                                Ajouter un endpoint
                                            </h3>
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Méthode HTTP
                                                        </label>
                                                        <select
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={newEndpoint.method}
                                                            onChange={(e) =>
                                                                setNewEndpoint({
                                                                    ...newEndpoint,
                                                                    method: e.target.value,
                                                                })
                                                            }
                                                        >
                                                            <option value="GET">GET</option>
                                                            <option value="POST">POST</option>
                                                            <option value="PUT">PUT</option>
                                                            <option value="DELETE">DELETE</option>
                                                            <option value="PATCH">PATCH</option>
                                                        </select>
                                                    </div>
                                                    <div className="md:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Chemin de l'endpoint
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={newEndpoint.path}
                                                            onChange={(e) =>
                                                                setNewEndpoint({
                                                                    ...newEndpoint,
                                                                    path: e.target.value,
                                                                })
                                                            }
                                                            placeholder="ex: /api/v1/predict"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        value={newEndpoint.description}
                                                        onChange={(e) =>
                                                            setNewEndpoint({
                                                                ...newEndpoint,
                                                                description: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Expliquez ce que fait cet endpoint, ses paramètres, etc."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                        Structure de la requête (JSON)
                                                        {jsonErrors.requestBody && (
                                                            <span className="ml-2 text-red-500 flex items-center text-xs">
                                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                                Format JSON invalide
                                                            </span>
                                                        )}
                                                    </label>
                                                    <textarea
                                                        rows={4}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${jsonErrors.requestBody ? 'border-red-500' : 'border-gray-300'}`}
                                                        value={newEndpoint.requestBody}
                                                        onChange={(e) =>
                                                            updateJsonField('requestBody', e.target.value)
                                                        }
                                                        placeholder={`{\n  "input": "Exemple de texte",\n  "options": {\n    "param1": "valeur1"\n  }\n}`}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Format JSON attendu pour la requête. Laissez vide ou si
                                                        aucun corps de requête.
                                                    </p>
                                                </div>
                                                <div>
                                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                        Réponse en cas de succès (JSON)
                                                        {jsonErrors.successResponse && (
                                                            <span className="ml-2 text-red-500 flex items-center text-xs">
                                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                                Format JSON invalide
                                                            </span>
                                                        )}
                                                    </label>
                                                    <textarea
                                                        rows={4}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${jsonErrors.successResponse ? 'border-red-500' : 'border-gray-300'}`}
                                                        value={newEndpoint.successResponse}
                                                        onChange={(e) =>
                                                            updateJsonField('successResponse', e.target.value)
                                                        }
                                                        placeholder={`{\n  "result": "Résultat prédit",\n  "confidence": 0.95,\n  "processingTime": "120ms"\n}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                                        Réponse en cas d'erreur (JSON)
                                                        {jsonErrors.errorResponse && (
                                                            <span className="ml-2 text-red-500 flex items-center text-xs">
                                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                                Format JSON invalide
                                                            </span>
                                                        )}
                                                    </label>
                                                    <textarea
                                                        rows={4}
                                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${jsonErrors.errorResponse ? 'border-red-500' : 'border-gray-300'}`}
                                                        value={newEndpoint.errorResponse}
                                                        onChange={(e) =>
                                                            updateJsonField('errorResponse', e.target.value)
                                                        }
                                                        placeholder={`{\n  "error": "Description de l'erreur",\n  "code": "ERROR_CODE",\n  "status": 400\n}`}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                                        onClick={addEndpoint}
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Ajouter l'endpoint
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Enhanced list of added endpoints */}
                                        <div className="space-y-4">
                                            <h3 className="text-md font-medium">
                                                Endpoints configurés ({modelData.endpoints.length})
                                            </h3>
                                            {modelData.endpoints.length === 0 ? (
                                                <p className="text-sm text-gray-500 italic">
                                                    Aucun endpoint configuré. Ajoutez des endpoints pour décrire
                                                    comment utiliser l'API de votre modèle.
                                                </p>
                                            ) : (
                                                <div className="space-y-4">
                                                    {modelData.endpoints.map((endpoint, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-4 border border-gray-200 rounded-lg"
                                                        >
                                                            <div className="flex justify-between items-start mb-3">
                                                                <div className="flex items-center">
                                                                    <span
                                                                        className={`px-2 py-1 text-xs font-medium rounded mr-2 ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' : endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}`}
                                                                    >
                                                                        {endpoint.method}
                                                                    </span>
                                                                    <span className="font-medium text-blue-600">
                                                                        {endpoint.path}
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeEndpoint(index)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            {endpoint.description && (
                                                                <div className="mb-3 text-sm text-gray-600">
                                                                    {endpoint.description}
                                                                </div>
                                                            )}
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                                {endpoint.requestBody &&
                                                                    endpoint.requestBody !== '{}' && (
                                                                        <div className="bg-gray-50 p-3 rounded-lg">
                                                                            <h4 className="text-xs font-semibold text-gray-500 mb-2">
                                                                                REQUÊTE
                                                                            </h4>
                                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                                                                {formatJson(endpoint.requestBody)}
                                                                            </pre>
                                                                        </div>
                                                                    )}
                                                                {endpoint.successResponse &&
                                                                    endpoint.successResponse !== '{}' && (
                                                                        <div className="bg-green-50 p-3 rounded-lg">
                                                                            <h4 className="text-xs font-semibold text-green-600 mb-2">
                                                                                SUCCÈS
                                                                            </h4>
                                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                                                                {formatJson(endpoint.successResponse)}
                                                                            </pre>
                                                                        </div>
                                                                    )}
                                                                {endpoint.errorResponse &&
                                                                    endpoint.errorResponse !== '{}' && (
                                                                        <div className="bg-red-50 p-3 rounded-lg">
                                                                            <h4 className="text-xs font-semibold text-red-600 mb-2">
                                                                                ERREUR
                                                                            </h4>
                                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                                                                                {formatJson(endpoint.errorResponse)}
                                                                            </pre>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* New Section: Subscription Plans */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                                            <h2 className="text-xl font-semibold">Plans d'abonnement</h2>
                                        </div>
                                        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                                            <h3 className="text-md font-medium mb-4">
                                                Ajouter un plan d'abonnement
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Nom du plan
                                                        </label>
                                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={newPlan.name} onChange={e => setNewPlan({
                                                            ...newPlan,
                                                            name: e.target.value
                                                        })} placeholder="ex: Basique, Premium, Entreprise" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Type de facturation
                                                        </label>
                                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={newPlan.billingPeriod} onChange={e => setNewPlan({
                                                            ...newPlan,
                                                            billingPeriod: e.target.value as BillingPeriod
                                                        })}>
                                                            <option value={BillingPeriod.MONTHLY}>Mensuel</option>
                                                            <option value={BillingPeriod.ANNUAL}>Annuel</option>
                                                            <option value={BillingPeriod.WEEKLY}>Hebdomadaire</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Description
                                                    </label>
                                                    <textarea rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={newPlan.description} onChange={e => setNewPlan({
                                                        ...newPlan,
                                                        description: e.target.value
                                                    })} placeholder="Décrivez ce que ce plan offre aux utilisateurs..." />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Prix
                                                        </label>
                                                        <input type="number" step="0.01" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={newPlan.price} onChange={e => setNewPlan({
                                                            ...newPlan,
                                                            price: parseFloat(e.target.value)
                                                        })} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Devise
                                                        </label>
                                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={newPlan.currency} onChange={e => setNewPlan({
                                                            ...newPlan,
                                                            currency: e.target.value
                                                        })}>
                                                            <option value="TND">TND - Dinar Tunisien</option>
                                                            <option value="EUR">EUR - Euro</option>
                                                            <option value="USD">USD - Dollar US</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Limite d'appels API
                                                        </label>
                                                        <input type="number" step="1" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" value={newPlan.apiCallsLimit} onChange={e => setNewPlan({
                                                            ...newPlan,
                                                            apiCallsLimit: parseInt(e.target.value)
                                                        })} placeholder="ex: 10000" />
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Nombre maximum d'appels API inclus dans le plan
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Features section */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Fonctionnalités incluses
                                                    </label>
                                                    <div className="flex items-center mb-2">
                                                        <input type="text" className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500" value={newFeature} onChange={e => setNewFeature(e.target.value)} placeholder="ex: Support prioritaire" />
                                                        <button type="button" onClick={addFeature} className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="space-y-2 mt-2">
                                                        {newPlan.features.map((feature, index) => <div key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg">
                                                            <span>{feature}</span>
                                                            <button type="button" onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-700">
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <button onClick={addSubscriptionPlan} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Ajouter le plan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Display added subscription plans */}
                                        <div className="space-y-4">
                                            <h3 className="text-md font-medium">
                                                Plans configurés ({(modelData.subscriptionPlans || []).length}
                                                )
                                            </h3>
                                            {!modelData.subscriptionPlans || modelData.subscriptionPlans.length === 0 ? <p className="text-sm text-gray-500 italic">
                                                Aucun plan configuré. Ajoutez des plans d'abonnement pour
                                                monétiser votre modèle.
                                            </p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {modelData.subscriptionPlans.map((plan, index) => <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-semibold text-lg">
                                                                    {plan.name}
                                                                </h4>
                                                                <div className="flex items-center mt-1">
                                                                    {plan.billingPeriod === BillingPeriod.WEEKLY ? <div className="flex items-center text-gray-600 text-sm">
                                                                        <Zap className="h-3 w-3 mr-1" />
                                                                        Hebdomadaire
                                                                    </div> : <div className="flex items-center text-gray-600 text-sm">
                                                                        <Calendar className="h-3 w-3 mr-1" />
                                                                        {plan.billingPeriod === BillingPeriod.MONTHLY ? 'Mensuel' : 'Annuel'}
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                            <button type="button" onClick={() => removeSubscriptionPlan(index)} className="text-red-500 hover:text-red-700">
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="mb-4">
                                                            <div className="flex items-baseline">
                                                                <span className="text-2xl font-bold">
                                                                    {plan.price}{' '}
                                                                    <span className="text-lg">{plan.currency}</span>
                                                                </span>
                                                                {plan.billingPeriod !== BillingPeriod.WEEKLY && <span className="text-gray-500 text-sm ml-1">
                                                                    /
                                                                    {plan.billingPeriod === BillingPeriod.MONTHLY ? 'mois' : 'an'}
                                                                </span>}
                                                            </div>
                                                            {plan.billingPeriod === BillingPeriod.WEEKLY && <div className="text-sm text-gray-600 mt-1">
                                                                {plan.apiCallsPrice} {plan.currency} par appel
                                                                API
                                                            </div>}
                                                            {plan.billingPeriod !== BillingPeriod.WEEKLY && plan.apiCallsLimit && <div className="text-sm text-gray-600 mt-1">
                                                                {plan.apiCallsLimit.toLocaleString()} appels
                                                                API inclus
                                                            </div>}
                                                        </div>
                                                        <p className="text-sm text-gray-600 mb-4">
                                                            {plan.description}
                                                        </p>
                                                        <div className="space-y-2">
                                                            {plan.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center text-sm">
                                                                <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                                                    <svg className="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                                    </svg>
                                                                </div>
                                                                {feature}
                                                            </div>)}
                                                        </div>
                                                    </div>
                                                </div>)}
                                            </div>}
                                        </div>
                                    </div>
                                    {/* Section Tasks */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <Tag className="h-5 w-5 text-blue-600 mr-2" />
                                            <h2 className="text-xl font-semibold">Tâches</h2>
                                        </div>
                                        <div className="space-y-4">
                                            {/* Selected tasks */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {modelData.tasks.map((task) => (
                                                    <div
                                                        key={task.id}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                    >
                                                        {task.name}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTask(task.id)}
                                                            className="ml-1 text-blue-600 hover:text-blue-800"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Task search input */}
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Rechercher des tâches..."
                                                    value={searchTask}
                                                    onChange={(e) => setSearchTask(e.target.value)}
                                                />
                                                {/* Dropdown for search results */}
                                                {searchTask && filteredTasks.length > 0 && (
                                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
                                            {isLoadingTasks && <p>Chargement des tâches...</p>}
                                            {tasksError && <p className="text-red-500">{tasksError}</p>}
                                            <p className="text-sm text-gray-500">
                                                Sélectionnez les tâches que votre modèle peut effectuer.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Section Visibilité */}
                                    <div>
                                        <div className="flex items-center mb-4">
                                            {modelData.visibility === Visibility.PUBLIC ? (
                                                <Globe className="h-5 w-5 text-green-600 mr-2" />
                                            ) : (
                                                <Lock className="h-5 w-5 text-red-600 mr-2" />
                                            )}
                                            <h2 className="text-xl font-semibold">Visibilité</h2>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                className={`p-4 rounded-lg border-2 ${modelData.visibility === Visibility.PUBLIC ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                                                onClick={() =>
                                                    setModelData({
                                                        ...modelData,
                                                        visibility: Visibility.PUBLIC,
                                                    })
                                                }
                                            >
                                                <div className="font-medium">Public</div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Visible par tous les utilisateurs
                                                </p>
                                            </button>
                                            <button
                                                type="button"
                                                className={`p-4 rounded-lg border-2 ${modelData.visibility === Visibility.PRIVATE ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                                                onClick={() =>
                                                    setModelData({
                                                        ...modelData,
                                                        visibility: Visibility.PRIVATE,
                                                    })
                                                }
                                            >
                                                <div className="font-medium">Privé</div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Visible uniquement par vous
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Bouton de soumission */}
                                    <div className="pt-8 border-t border-gray-200">
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                                                    Publication en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <Package className="h-5 w-5 mr-2" />
                                                    Publier le modèle
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </div>)
}
