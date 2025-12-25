import React, { useState } from 'react'
import {
    UploadCloud,
    Database,
    FileText,
    Tag,
    Globe,
    Package,
    X,
    AlertCircle,
    CreditCard,
    Lock,
    Plus,
    Save,
    Trash2,
    Info,
    AlertTriangle,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader'
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar'
import { DeveloperAccount } from '../../types/auth'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

// Dataset visibility options
enum Visibility {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

// Dataset format options
enum DatasetFormat {
    CSV = 'CSV',
    JSON = 'JSON',
    XML = 'XML',
    PARQUET = 'PARQUET',
    IMAGES = 'IMAGES',
    AUDIO = 'AUDIO',
    TEXT = 'TEXT',
    MIXED = 'MIXED',
}

// Dataset license options
enum LicenseType {
    CC_BY = 'CC_BY',
    CC_BY_SA = 'CC_BY_SA',
    CC_BY_NC = 'CC_BY_NC',
    CC_BY_ND = 'CC_BY_ND',
    CC_BY_NC_SA = 'CC_BY_NC_SA',
    CC_BY_NC_ND = 'CC_BY_NC_ND',
    CC0 = 'CC0',
    MIT = 'MIT',
    APACHE_2 = 'APACHE_2',
    GPL_3 = 'GPL_3',
    CUSTOM = 'CUSTOM',
}

// Billing period options
enum BillingPeriod {
    ONE_TIME = 'ONE_TIME',
}

// Interface for dataset tags (local only)
interface LocalTag {
    id: number
    name: string
}

// Interface for dataset sample (local only)
interface LocalDatasetSample {
    id?: number
    content: string
    label?: string
    metadata?: Record<string, string>
    url?: string
    mimeType?: string
}

// Interface for dataset purchasing plan
interface PurchasePlan {
    name: string
    description: string
    price: number
    currency: string
    billingPeriod: BillingPeriod
    features: string[]
}

// Main dataset interface (local state)
interface Dataset {
    name: string
    description: string
    visibility: Visibility
    format: DatasetFormat
    size: string
    sampleCount: number
    license: LicenseType
    customLicenseUrl?: string
    tags: LocalTag[]
    samples: LocalDatasetSample[]
    purchasePlan: PurchasePlan | null
    uploadedFiles?: File[]
}

// API DTO interfaces (for submission)
interface TagDto {
    name: string
}

interface SampleDto {
    content: string
    label?: string
    metadata?: Record<string, string>
    url?: string
    mimeType?: string
}

interface PurchasePlanDto {
    name: string
    description: string
    price: number
    currency: string
    billingPeriod: BillingPeriod
    features: string[]
}

interface CreateDatasetRequest {
    name: string
    description: string
    visibility: Visibility
    format: DatasetFormat
    sampleCount: number
    license: LicenseType
    customLicenseUrl?: string
    tags: TagDto[]
    samples: SampleDto[]
    purchasePlan?: PurchasePlanDto
}

export function AddDatasetPage() {
    // Initial dataset state
    const [dataset, setDataset] = useState<Dataset>({
        name: '',
        description: '',
        visibility: Visibility.PUBLIC,
        format: DatasetFormat.CSV,
        size: 'Calculée automatiquement',
        sampleCount: 0,
        license: LicenseType.CC_BY,
        customLicenseUrl: '',
        tags: [],
        samples: [],
        purchasePlan: null,
        uploadedFiles: [],
    })
    // State for tag input
    const [tagInput, setTagInput] = useState('')
    // State for sample inputs based on format
    const [textSampleInput, setTextSampleInput] = useState({
        content: '',
        label: '',
    })
    const [jsonSampleInput, setJsonSampleInput] = useState({
        content: '{}',
        label: '',
    })
    const [csvSampleInput, setCsvSampleInput] = useState({
        content: '',
        label: '',
    })
    const [mediaSampleInput, setMediaSampleInput] = useState({
        url: '',
        mimeType: '',
        description: '',
        label: '',
    })
    const { account, token } = useAuth()
    const developer_account = account as DeveloperAccount
    const [activeTab, setActiveTab] = useState('datasets')
    const navigate = useNavigate()
    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }
    // State for purchase plan
    const [purchasePlan, setPurchasePlan] = useState<PurchasePlan>({
        name: 'Standard Access',
        description: 'Full access to the dataset with standard support',
        price: 0,
        currency: 'TND',
        billingPeriod: BillingPeriod.ONE_TIME,
        features: ['Full dataset download', 'Documentation access'],
    })
    // State for new feature in purchase plan
    const [newFeature, setNewFeature] = useState('')
    // State for validation errors
    const [errors, setErrors] = useState<{
        [key: string]: string
    }>({})
    // State for file upload
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    // Loading state for submission
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files)
            setSelectedFiles((prev) => [...prev, ...files])
            setDataset({
                ...dataset,
                uploadedFiles: [...(dataset.uploadedFiles || []), ...files],
            })
        }
    }
    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles]
        newFiles.splice(index, 1)
        setSelectedFiles(newFiles)
        setDataset({
            ...dataset,
            uploadedFiles: newFiles,
        })
    }
    // Handle adding a new tag
    const handleAddTag = () => {
        if (tagInput.trim()) {
            const newTag: LocalTag = {
                id: Date.now(),
                name: tagInput.trim(),
            }
            setDataset({
                ...dataset,
                tags: [...dataset.tags, newTag],
            })
            setTagInput('')
        }
    }
    // Handle removing a tag
    const handleRemoveTag = (tagId: number) => {
        setDataset({
            ...dataset,
            tags: dataset.tags.filter((tag) => tag.id !== tagId),
        })
    }
    // Handle adding a new sample based on format
    const handleAddSample = () => {
        let newSample: LocalDatasetSample | null = null
        switch (dataset.format) {
            case DatasetFormat.TEXT:
                if (textSampleInput.content.trim()) {
                    newSample = {
                        id: Date.now(),
                        content: textSampleInput.content,
                        label: textSampleInput.label,
                    }
                    setTextSampleInput({
                        content: '',
                        label: '',
                    })
                }
                break
            case DatasetFormat.JSON:
                try {
                    // Validate JSON
                    JSON.parse(jsonSampleInput.content)
                    newSample = {
                        id: Date.now(),
                        content: jsonSampleInput.content,
                        label: jsonSampleInput.label,
                    }
                    setJsonSampleInput({
                        content: '{}',
                        label: '',
                    })
                    // Clear JSON-specific error
                    setErrors((prev) => {
                        const { jsonSample, ...rest } = prev
                        return rest
                    })
                } catch (e) {
                    setErrors({
                        ...errors,
                        jsonSample: 'Format JSON invalide',
                    })
                    return
                }
                break
            case DatasetFormat.CSV:
                if (csvSampleInput.content.trim()) {
                    newSample = {
                        id: Date.now(),
                        content: csvSampleInput.content,
                        label: csvSampleInput.label,
                    }
                    setCsvSampleInput({
                        content: '',
                        label: '',
                    })
                }
                break
            case DatasetFormat.IMAGES:
            case DatasetFormat.AUDIO:
                if (mediaSampleInput.url.trim()) {
                    newSample = {
                        id: Date.now(),
                        content: mediaSampleInput.description,
                        label: mediaSampleInput.label,
                        url: mediaSampleInput.url,
                        mimeType: mediaSampleInput.mimeType,
                    }
                    setMediaSampleInput({
                        url: '',
                        mimeType: '',
                        description: '',
                        label: '',
                    })
                }
                break
            case DatasetFormat.XML:
                if (textSampleInput.content.trim()) {
                    newSample = {
                        id: Date.now(),
                        content: textSampleInput.content,
                        label: textSampleInput.label,
                    }
                    setTextSampleInput({
                        content: '',
                        label: '',
                    })
                }
                break
            default:
                if (textSampleInput.content.trim()) {
                    newSample = {
                        id: Date.now(),
                        content: textSampleInput.content,
                        label: textSampleInput.label,
                    }
                    setTextSampleInput({
                        content: '',
                        label: '',
                    })
                }
        }
        if (newSample) {
            setDataset({
                ...dataset,
                samples: [...dataset.samples, newSample],
            })
        }
    }
    // Handle removing a sample
    const handleRemoveSample = (sampleId: number) => {
        setDataset({
            ...dataset,
            samples: dataset.samples.filter((sample) => sample.id !== sampleId),
        })
    }
    // Handle adding a feature to the purchase plan
    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setPurchasePlan({
                ...purchasePlan,
                features: [...purchasePlan.features, newFeature.trim()],
            })
            setNewFeature('')
        }
    }
    // Handle removing a feature from the purchase plan
    const handleRemoveFeature = (index: number) => {
        const updatedFeatures = [...purchasePlan.features]
        updatedFeatures.splice(index, 1)
        setPurchasePlan({
            ...purchasePlan,
            features: updatedFeatures,
        })
    }
    // Handle saving the purchase plan
    const handleSavePurchasePlan = () => {
        setDataset({
            ...dataset,
            purchasePlan: { ...purchasePlan },
        })
    }
    // Handle removing the purchase plan
    const handleRemovePurchasePlan = () => {
        setDataset({
            ...dataset,
            purchasePlan: null,
        })
    }
    // Validate the form (frontend)
    const validateForm = (): boolean => {
        const newErrors: {
            [key: string]: string
        } = {}
        if (!dataset.name.trim()) {
            newErrors.name = 'Le nom du dataset est requis'
        }
        if (!dataset.description.trim()) {
            newErrors.description = 'La description est requise'
        }
        if (
            dataset.license === LicenseType.CUSTOM &&
            !dataset.customLicenseUrl?.trim()
        ) {
            newErrors.customLicenseUrl =
                "L'URL de la licence personnalisée est requise"
        }
        if (dataset.samples.length === 0) {
            newErrors.samples = 'Au moins un exemple est requis'
        }
        if (!dataset.uploadedFiles || dataset.uploadedFiles.length === 0) {
            newErrors.files =
                'Veuillez télécharger au moins un fichier pour votre dataset'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    // Build API request object
    const buildApiRequest = (): CreateDatasetRequest => {
        const apiTags: TagDto[] = dataset.tags.map((tag) => ({ name: tag.name }))
        const apiSamples: SampleDto[] = dataset.samples.map((sample) => ({
            content: sample.content,
            label: sample.label,
            metadata: sample.metadata,
            url: sample.url,
            mimeType: sample.mimeType,
        }))
        const request: CreateDatasetRequest = {
            name: dataset.name.trim(),
            description: dataset.description.trim(),
            visibility: dataset.visibility,
            format: dataset.format,
            sampleCount: dataset.sampleCount,
            license: dataset.license,
            customLicenseUrl: dataset.customLicenseUrl?.trim() || undefined,
            tags: apiTags,
            samples: apiSamples,
        }
        if (dataset.purchasePlan) {
            request.purchasePlan = {
                name: dataset.purchasePlan.name,
                description: dataset.purchasePlan.description,
                price: dataset.purchasePlan.price,
                currency: dataset.purchasePlan.currency,
                billingPeriod: dataset.purchasePlan.billingPeriod,
                features: [...dataset.purchasePlan.features],
            }
        }
        return request
    }
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm() || !token) {
            return
        }
        setIsSubmitting(true)
        const formData = new FormData()
        const metadata = buildApiRequest()
        formData.append('metadata', JSON.stringify(metadata))  // Ensure JSON string
        selectedFiles.forEach((file) => {
            formData.append('files', file)
        })
        try {
            console.log('Submitting dataset with metadata:', metadata)  // Log metadata for verification
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/developer/datasets/publish`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',

                },
            })
            if (res.status === 200 || res.status === 201) {  // Accept 201 Created as well
                alert('Dataset publié avec succès!')
                // Reset form (unchanged)
                setDataset({
                    name: '',
                    description: '',
                    visibility: Visibility.PUBLIC,
                    format: DatasetFormat.CSV,
                    size: 'Calculée automatiquement',
                    sampleCount: 0,
                    license: LicenseType.CC_BY,
                    customLicenseUrl: '',
                    tags: [],
                    samples: [],
                    purchasePlan: null,
                    uploadedFiles: [],
                })
                setSelectedFiles([])
                setTextSampleInput({ content: '', label: '' })
                setJsonSampleInput({ content: '{}', label: '' })
                setCsvSampleInput({ content: '', label: '' })
                setMediaSampleInput({ url: '', mimeType: '', description: '', label: '' })
                setPurchasePlan({
                    name: 'Standard Access',
                    description: 'Full access to the dataset with standard support',
                    price: 0,
                    currency: 'TND',
                    billingPeriod: BillingPeriod.ONE_TIME,
                    features: ['Full dataset download', 'Documentation access'],
                })
                setNewFeature('')
                setErrors({})
                // Optionally navigate to datasets list
                // navigate('/developer/datasets')
            } else {
                const errorData = res.data?.message || 'Échec de la publication du dataset.'
                console.error('Server response error:', res)  // Enhanced logging
                setErrors({ general: errorData })  // Use general error for display
            }
        } catch (error: any) {
            console.error('Submission error:', error)
            const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de la soumission. Veuillez réessayer.'
            setErrors({ general: errorMessage })
        } finally {
            setIsSubmitting(false)
        }
    }
    // Get license display name
    const getLicenseName = (license: LicenseType): string => {
        switch (license) {
            case LicenseType.CC_BY:
                return 'Creative Commons Attribution (CC BY)'
            case LicenseType.CC_BY_SA:
                return 'CC Attribution-ShareAlike (CC BY-SA)'
            case LicenseType.CC_BY_NC:
                return 'CC Attribution-NonCommercial (CC BY-NC)'
            case LicenseType.CC_BY_ND:
                return 'CC Attribution-NoDerivs (CC BY-ND)'
            case LicenseType.CC_BY_NC_SA:
                return 'CC Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)'
            case LicenseType.CC_BY_NC_ND:
                return 'CC Attribution-NonCommercial-NoDerivs (CC BY-NC-ND)'
            case LicenseType.CC0:
                return 'Creative Commons Zero (CC0)'
            case LicenseType.MIT:
                return 'MIT License'
            case LicenseType.APACHE_2:
                return 'Apache License 2.0'
            case LicenseType.GPL_3:
                return 'GNU General Public License v3.0'
            case LicenseType.CUSTOM:
                return 'Licence personnalisée'
            default:
                return ''
        }
    }
    // Get billing period display name
    const getBillingPeriodName = (period: BillingPeriod): string => {
        switch (period) {
            case BillingPeriod.ONE_TIME:
                return 'Paiement unique'
            default:
                return ''
        }
    }
    // Render sample input based on format
    const renderSampleInput = () => {
        switch (dataset.format) {
            case DatasetFormat.JSON:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contenu JSON
                            </label>
                            <textarea
                                rows={5}
                                className={`w-full px-4 py-2 border ${errors.jsonSample ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm`}
                                value={jsonSampleInput.content}
                                onChange={(e) =>
                                    setJsonSampleInput({
                                        ...jsonSampleInput,
                                        content: e.target.value,
                                    })
                                }
                                placeholder='{"key": "value", "array": [1, 2, 3]}'
                            />
                            {errors.jsonSample && (
                                <p className="mt-1 text-sm text-red-500">{errors.jsonSample}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Label (optionnel)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={jsonSampleInput.label}
                                onChange={(e) =>
                                    setJsonSampleInput({
                                        ...jsonSampleInput,
                                        label: e.target.value,
                                    })
                                }
                                placeholder="ex: Exemple d'entité"
                            />
                        </div>
                    </div>
                )
            case DatasetFormat.CSV:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contenu CSV
                            </label>
                            <textarea
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                value={csvSampleInput.content}
                                onChange={(e) =>
                                    setCsvSampleInput({
                                        ...csvSampleInput,
                                        content: e.target.value,
                                    })
                                }
                                placeholder="id,name,value\n1,example,100\n2,sample,200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Label (optionnel)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={csvSampleInput.label}
                                onChange={(e) =>
                                    setCsvSampleInput({
                                        ...csvSampleInput,
                                        label: e.target.value,
                                    })
                                }
                                placeholder="ex: Données démographiques"
                            />
                        </div>
                    </div>
                )
            case DatasetFormat.IMAGES:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL de l'image
                            </label>
                            <input
                                type="url"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.url}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        url: e.target.value,
                                    })
                                }
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type MIME
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.mimeType}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        mimeType: e.target.value,
                                    })
                                }
                                placeholder="ex: image/jpeg, image/png"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.description}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Description de l'image"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Label (optionnel)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.label}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        label: e.target.value,
                                    })
                                }
                                placeholder="ex: Chat, Chien, Paysage"
                            />
                        </div>
                    </div>
                )
            case DatasetFormat.AUDIO:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL de l'audio
                            </label>
                            <input
                                type="url"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.url}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        url: e.target.value,
                                    })
                                }
                                placeholder="https://example.com/audio.mp3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type MIME
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.mimeType}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        mimeType: e.target.value,
                                    })
                                }
                                placeholder="ex: audio/mp3, audio/wav"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Transcription/Description
                            </label>
                            <textarea
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.description}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Transcription ou description de l'audio"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Label (optionnel)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={mediaSampleInput.label}
                                onChange={(e) =>
                                    setMediaSampleInput({
                                        ...mediaSampleInput,
                                        label: e.target.value,
                                    })
                                }
                                placeholder="ex: Parole, Musique, Bruit"
                            />
                        </div>
                    </div>
                )
            case DatasetFormat.XML:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contenu XML
                            </label>
                            <textarea
                                rows={5}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                                value={textSampleInput.content}
                                onChange={(e) =>
                                    setTextSampleInput({
                                        ...textSampleInput,
                                        content: e.target.value,
                                    })
                                }
                                placeholder="<root>\n <element>value</element>\n</root>"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Label (optionnel)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={textSampleInput.label}
                                onChange={(e) =>
                                    setTextSampleInput({
                                        ...textSampleInput,
                                        label: e.target.value,
                                    })
                                }
                                placeholder="ex: Configuration"
                            />
                        </div>
                    </div>
                )
            // Default case for TEXT, MIXED, PARQUET and others
            default:
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contenu
                            </label>
                            <textarea
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={textSampleInput.content}
                                onChange={(e) =>
                                    setTextSampleInput({
                                        ...textSampleInput,
                                        content: e.target.value,
                                    })
                                }
                                placeholder="Exemple de contenu de votre dataset..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Label (optionnel)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={textSampleInput.label}
                                onChange={(e) =>
                                    setTextSampleInput({
                                        ...textSampleInput,
                                        label: e.target.value,
                                    })
                                }
                                placeholder="ex: Positif, Question, Classe 1"
                            />
                        </div>
                    </div>
                )
        }
    }
    // Render sample display based on format and sample
    const renderSampleDisplay = (sample: LocalDatasetSample) => {
        switch (dataset.format) {
            case DatasetFormat.IMAGES:
            case DatasetFormat.AUDIO:
                return (
                    <>
                        {sample.url && (
                            <div className="mb-2">
                                <span className="font-medium">URL:</span> {sample.url}
                            </div>
                        )}
                        {sample.mimeType && (
                            <div className="mb-2">
                                <span className="font-medium">Type MIME:</span>{' '}
                                {sample.mimeType}
                            </div>
                        )}
                        <div className="bg-gray-50 p-3 rounded-lg mb-2">
                            {sample.content}
                        </div>
                    </>
                )
            case DatasetFormat.JSON:
                return (
                    <div className="bg-gray-50 p-3 rounded-lg mb-2 font-mono text-sm overflow-auto max-h-40">
                        {sample.content}
                    </div>
                )
            case DatasetFormat.CSV:
                return (
                    <div className="bg-gray-50 p-3 rounded-lg mb-2 font-mono text-sm overflow-auto max-h-40 whitespace-pre">
                        {sample.content}
                    </div>
                )
            default:
                return (
                    <div className="bg-gray-50 p-3 rounded-lg mb-2 font-mono text-sm">
                        {sample.content}
                    </div>
                )
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 ">
            <DeveloperDashboardHeader />
            <div className="flex">
                <DeveloperDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
                <main className="flex-1 p-6">
                    {!developer_account?.docker_username && !developer_account?.docker_pat && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                            <p className="text-red-700">Configure your Docker Hub integration to start sharing models , datasets and more with the comunity . You can set it up in your Settings ! </p>
                        </div>
                    )}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h1 className="text-3xl font-bold flex items-center mb-8">
                                <UploadCloud className="h-8 w-8 text-blue-600 mr-3" />
                                Publier un nouveau dataset
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Basic Information */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <Database className="h-5 w-5 text-blue-600 mr-2" />
                                        <h2 className="text-xl font-semibold">Informations de base</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nom du dataset *
                                            </label>
                                            <input
                                                type="text"
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                                value={dataset.name}
                                                onChange={(e) =>
                                                    setDataset({
                                                        ...dataset,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="ex: Tunisian Dialect Corpus"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description *
                                            </label>
                                            <textarea
                                                rows={4}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                                value={dataset.description}
                                                onChange={(e) =>
                                                    setDataset({
                                                        ...dataset,
                                                        description: e.target.value,
                                                    })
                                                }
                                                placeholder="Décrivez votre dataset, son contenu, ses cas d'utilisation..."
                                            />
                                            {errors.description && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* File Upload */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <UploadCloud className="h-5 w-5 text-blue-600 mr-2" />
                                        <h2 className="text-xl font-semibold">Fichiers du dataset</h2>
                                    </div>
                                    <div
                                        className={`bg-gray-50 p-6 rounded-lg border-2 border-dashed ${errors.files ? 'border-red-300' : 'border-gray-300'}`}
                                    >
                                        <div className="text-center">
                                            <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                Télécharger les fichiers du dataset
                                            </h3>
                                            <p className="text-gray-500 mb-4">
                                                Glissez-déposez vos fichiers ici, ou cliquez pour
                                                sélectionner des fichiers
                                            </p>
                                            <input
                                                type="file"
                                                id="file-upload"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                multiple
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                                            >
                                                <UploadCloud className="h-4 w-4 mr-2" />
                                                Sélectionner des fichiers
                                            </label>
                                        </div>
                                        {errors.files && (
                                            <p className="mt-2 text-center text-sm text-red-500">
                                                {errors.files}
                                            </p>
                                        )}
                                        {selectedFiles.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                    Fichiers sélectionnés:
                                                </h4>
                                                <ul className="space-y-2">
                                                    {selectedFiles.map((file, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200"
                                                        >
                                                            <div className="flex items-center">
                                                                <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                                                <span className="text-sm">{file.name}</span>
                                                                <span className="ml-2 text-xs text-gray-500">
                                                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                                </span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(index)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="mt-2 text-xs text-gray-500">
                                                    La taille totale du dataset sera calculée automatiquement
                                                    par le système.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    {errors.general && (
                                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                            <p className="text-sm text-red-700">{errors.general}</p>
                                        </div>
                                    )}
                                </div>
                                {/* Dataset Metadata */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <FileText className="h-5 w-5 text-blue-600 mr-2" />
                                        <h2 className="text-xl font-semibold">Métadonnées</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Format
                                            </label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                value={dataset.format}
                                                onChange={(e) => {
                                                    setDataset({
                                                        ...dataset,
                                                        format: e.target.value as DatasetFormat,
                                                    })
                                                    // Reset sample inputs and errors for new format
                                                    setTextSampleInput({ content: '', label: '' })
                                                    setJsonSampleInput({ content: '{}', label: '' })
                                                    setCsvSampleInput({ content: '', label: '' })
                                                    setMediaSampleInput({ url: '', mimeType: '', description: '', label: '' })
                                                    setErrors((prev) => {
                                                        const { jsonSample, ...rest } = prev
                                                        return rest
                                                    })
                                                }}
                                            >
                                                <option value={DatasetFormat.CSV}>CSV</option>
                                                <option value={DatasetFormat.JSON}>JSON</option>
                                                <option value={DatasetFormat.XML}>XML</option>
                                                <option value={DatasetFormat.PARQUET}>Parquet</option>
                                                <option value={DatasetFormat.IMAGES}>Images</option>
                                                <option value={DatasetFormat.AUDIO}>Audio</option>
                                                <option value={DatasetFormat.TEXT}>Texte</option>
                                                <option value={DatasetFormat.MIXED}>Format mixte</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Taille du dataset
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                                                value={dataset.size}
                                                disabled
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                La taille sera calculée automatiquement lors du
                                                téléchargement
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nombre d'échantillons
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                value={dataset.sampleCount}
                                                onChange={(e) =>
                                                    setDataset({
                                                        ...dataset,
                                                        sampleCount: parseInt(e.target.value) || 0,
                                                    })
                                                }
                                                placeholder="ex: 10000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Licence
                                            </label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                value={dataset.license}
                                                onChange={(e) =>
                                                    setDataset({
                                                        ...dataset,
                                                        license: e.target.value as LicenseType,
                                                    })
                                                }
                                            >
                                                <option value={LicenseType.CC_BY}>
                                                    {getLicenseName(LicenseType.CC_BY)}
                                                </option>
                                                <option value={LicenseType.CC_BY_SA}>
                                                    {getLicenseName(LicenseType.CC_BY_SA)}
                                                </option>
                                                <option value={LicenseType.CC_BY_NC}>
                                                    {getLicenseName(LicenseType.CC_BY_NC)}
                                                </option>
                                                <option value={LicenseType.CC_BY_ND}>
                                                    {getLicenseName(LicenseType.CC_BY_ND)}
                                                </option>
                                                <option value={LicenseType.CC_BY_NC_SA}>
                                                    {getLicenseName(LicenseType.CC_BY_NC_SA)}
                                                </option>
                                                <option value={LicenseType.CC_BY_NC_ND}>
                                                    {getLicenseName(LicenseType.CC_BY_NC_ND)}
                                                </option>
                                                <option value={LicenseType.CC0}>
                                                    {getLicenseName(LicenseType.CC0)}
                                                </option>
                                                <option value={LicenseType.MIT}>{getLicenseName(LicenseType.MIT)}</option>
                                                <option value={LicenseType.APACHE_2}>
                                                    {getLicenseName(LicenseType.APACHE_2)}
                                                </option>
                                                <option value={LicenseType.GPL_3}>
                                                    {getLicenseName(LicenseType.GPL_3)}
                                                </option>
                                                <option value={LicenseType.CUSTOM}>
                                                    {getLicenseName(LicenseType.CUSTOM)}
                                                </option>
                                            </select>
                                        </div>
                                        {dataset.license === LicenseType.CUSTOM && (
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    URL de la licence personnalisée *
                                                </label>
                                                <input
                                                    type="url"
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.customLicenseUrl ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={dataset.customLicenseUrl || ''}
                                                    onChange={(e) =>
                                                        setDataset({
                                                            ...dataset,
                                                            customLicenseUrl: e.target.value,
                                                        })
                                                    }
                                                    placeholder="https://example.com/license"
                                                />
                                                {errors.customLicenseUrl && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {errors.customLicenseUrl}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Tags */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <Tag className="h-5 w-5 text-blue-600 mr-2" />
                                        <h2 className="text-xl font-semibold">Tags</h2>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {dataset.tags.map((tag) => (
                                            <div
                                                key={tag.id}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                            >
                                                {tag.name}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag.id)}
                                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            placeholder="Ajouter un tag..."
                                            onKeyPress={(e) =>
                                                e.key === 'Enter' && (e.preventDefault(), handleAddTag())
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTag}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Ajoutez des tags pour aider les utilisateurs à trouver votre
                                        dataset (ex: nlp, images, tunisie)
                                    </p>
                                </div>
                                {/* Dataset Samples */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <Database className="h-5 w-5 text-blue-600 mr-2" />
                                        <h2 className="text-xl font-semibold">Exemples de données</h2>
                                    </div>
                                    {errors.samples && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                                            <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                                            <p className="text-sm text-red-700">{errors.samples}</p>
                                        </div>
                                    )}
                                    <div className="space-y-4 mb-4">
                                        {dataset.samples.map((sample) => (
                                            <div
                                                key={sample.id}
                                                className="p-4 border border-gray-200 rounded-lg"
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-medium">Exemple</div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSample(sample.id!)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                {renderSampleDisplay(sample)}
                                                {sample.label && (
                                                    <div className="text-sm text-gray-600">
                                                        <span className="font-medium">Label:</span>{' '}
                                                        {sample.label}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-md font-medium mb-3">
                                            Ajouter un exemple de {dataset.format.toLowerCase()}
                                        </h3>
                                        {renderSampleInput()}
                                        <div className="mt-3">
                                            <button
                                                type="button"
                                                onClick={handleAddSample}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                                disabled={!textSampleInput.content.trim() && !jsonSampleInput.content.trim() && !csvSampleInput.content.trim() && !mediaSampleInput.url.trim()}
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Ajouter l'exemple
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Purchase Plan */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                                        <h2 className="text-xl font-semibold">Plan d'achat</h2>
                                    </div>
                                    {dataset.purchasePlan ? (
                                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        {dataset.purchasePlan.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {dataset.purchasePlan.description}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setPurchasePlan(dataset.purchasePlan!)
                                                            setDataset({
                                                                ...dataset,
                                                                purchasePlan: null,
                                                            })
                                                        }}
                                                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={handleRemovePurchasePlan}
                                                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-baseline mb-3">
                                                <span className="text-2xl font-bold">
                                                    {dataset.purchasePlan.price}{' '}
                                                    {dataset.purchasePlan.currency}
                                                </span>
                                                <span className="text-gray-500 ml-1">
                                                    {getBillingPeriodName(dataset.purchasePlan.billingPeriod)}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                {dataset.purchasePlan.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center text-sm">
                                                        <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                                            <svg
                                                                className="h-3 w-3 text-green-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M5 13l4 4L19 7"
                                                                ></path>
                                                            </svg>
                                                        </div>
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                            <h3 className="text-md font-medium mb-4">
                                                Configurer un plan d'achat
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Nom du plan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={purchasePlan.name}
                                                            onChange={(e) =>
                                                                setPurchasePlan({
                                                                    ...purchasePlan,
                                                                    name: e.target.value,
                                                                })
                                                            }
                                                            placeholder="ex: Standard, Premium, Entreprise"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Type de facturation
                                                        </label>
                                                        <select
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={purchasePlan.billingPeriod}
                                                            onChange={(e) =>
                                                                setPurchasePlan({
                                                                    ...purchasePlan,
                                                                    billingPeriod: e.target.value as BillingPeriod,
                                                                })
                                                            }
                                                        >
                                                            <option value={BillingPeriod.ONE_TIME}>
                                                                {getBillingPeriodName(BillingPeriod.ONE_TIME)}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        rows={2}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                        value={purchasePlan.description}
                                                        onChange={(e) =>
                                                            setPurchasePlan({
                                                                ...purchasePlan,
                                                                description: e.target.value,
                                                            })
                                                        }
                                                        placeholder="Décrivez ce que ce plan offre aux utilisateurs..."
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Prix
                                                        </label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            min="0"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={purchasePlan.price}
                                                            onChange={(e) =>
                                                                setPurchasePlan({
                                                                    ...purchasePlan,
                                                                    price: parseFloat(e.target.value) || 0,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Devise
                                                        </label>
                                                        <select
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={purchasePlan.currency}
                                                            onChange={(e) =>
                                                                setPurchasePlan({
                                                                    ...purchasePlan,
                                                                    currency: e.target.value,
                                                                })
                                                            }
                                                        >
                                                            <option value="TND">TND - Dinar Tunisien</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                {/* Features */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Fonctionnalités incluses
                                                    </label>
                                                    <div className="space-y-2 mb-3">
                                                        {purchasePlan.features.map((feature, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg"
                                                            >
                                                                <span>{feature}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFeature(index)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex">
                                                        <input
                                                            type="text"
                                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                                                            value={newFeature}
                                                            onChange={(e) => setNewFeature(e.target.value)}
                                                            placeholder="ex: Support prioritaire, Mises à jour..."
                                                            onKeyPress={(e) =>
                                                                e.key === 'Enter' &&
                                                                (e.preventDefault(), handleAddFeature())
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleAddFeature}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={handleSavePurchasePlan}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                                                    >
                                                        <Save className="h-4 w-4 mr-2" />
                                                        Enregistrer le plan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                                        <Info className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                                        <p className="text-sm text-blue-700">
                                            {dataset.purchasePlan
                                                ? "Votre dataset sera disponible à l'achat selon le plan configuré ci-dessus."
                                                : "Si vous ne configurez pas de plan d'achat, votre dataset sera disponible gratuitement."}
                                        </p>
                                    </div>
                                </div>
                                {/* Visibility */}
                                <div>
                                    <div className="flex items-center mb-4">
                                        {dataset.visibility === Visibility.PUBLIC ? <Globe className="h-5 w-5 text-green-600 mr-2" /> : <Lock className="h-5 w-5 text-red-600 mr-2" />}
                                        <h2 className="text-xl font-semibold">Visibilité</h2>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button type="button" className={`p-4 rounded-lg border-2 ${dataset.visibility === Visibility.PUBLIC ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => setDataset({
                                            ...dataset,
                                            visibility: Visibility.PUBLIC
                                        })}>
                                            <div className="font-medium">Public</div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Visible par tous les utilisateurs
                                            </p>
                                        </button>
                                        <button type="button" className={`p-4 rounded-lg border-2 ${dataset.visibility === Visibility.PRIVATE ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => setDataset({
                                            ...dataset,
                                            visibility: Visibility.PRIVATE
                                        })}>
                                            <div className="font-medium">Privé</div>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Visible uniquement par vous
                                            </p>
                                        </button>
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="pt-8 border-t border-gray-200">
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                        <Package className="h-5 w-5 mr-2" />
                                        {isSubmitting ? 'Publication en cours...' : 'Publier le dataset'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}