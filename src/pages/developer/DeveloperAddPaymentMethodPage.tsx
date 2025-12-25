import React, { useState, Component } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Building2,
    CreditCard,
    Mail,
    User,
    MapPin,
    ArrowLeft,
    Check,
    AlertCircle,
    Loader2,
    Info,
    Clock,
    DollarSign,
    Phone,
    Hash,
    Calendar,
} from 'lucide-react'
import { DeveloperDashboardHeader } from '../../components/developer-dashboard/DeveloperDashboardHeader'
import { DeveloperDashboardSidebar } from '../../components/developer-dashboard/DeveloperDashboardSidebar'
import { BankTransferData, D17CardData, PaymentMethodType, PostalCheckData, TUNISIAN_BANKS, PaymentMethod } from '../../types/shared'

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
    paymentMethods?: PaymentMethod[];
}

export function DeveloperAddPaymentMethodPage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('payments')
    const [selectedMethod, setSelectedMethod] =
        useState<PaymentMethodType | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [bankTransferData, setBankTransferData] = useState<BankTransferData>({
        accountHolderName: '',
        bankName: '',
        iban: '',
        rib: '',
        accountNumber: '',
        address: '',
        city: '',
        postalCode: '',
    })
    const [d17CardData, setD17CardData] = useState<D17CardData>({
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        phoneNumber: '',
    })
    const [postalCheckData, setPostalCheckData] = useState<PostalCheckData>({
        accountHolderName: '',
        ccpNumber: '',
        phoneNumber: '',
        address: '',
        city: '',
        postalCode: '',
    })
    const paymentMethods = [
        {
            type: 'bank_transfer' as PaymentMethodType,
            name: 'Virement Bancaire',
            description:
                'Recevez vos versements directement sur votre compte bancaire tunisien',
            icon: Building2,
            color: 'blue',
            processingTime: '1-3 jours ouvrables',
            fees: 'Gratuit',
            badge: 'Recommandé',
        },
        {
            type: 'd17_card' as PaymentMethodType,
            name: 'Carte D17',
            description: 'Versements instantanés sur votre carte de débit tunisienne',
            icon: CreditCard,
            color: 'green',
            processingTime: 'Instantané',
            fees: '1.5% par transaction',
            badge: 'Rapide',
        },
        {
            type: 'postal_check' as PaymentMethodType,
            name: 'Chèque Postal (CCP)',
            description: 'Recevez vos versements sur votre compte postal',
            icon: Mail,
            color: 'orange',
            processingTime: '3-5 jours ouvrables',
            fees: 'Gratuit',
            badge: null,
        },
    ]
    const formatIBAN = (value: string) => {
        const cleaned = value.replace(/\s/g, '').toUpperCase()
        const matches = cleaned.match(/.{1,4}/g)
        return matches ? matches.join(' ') : cleaned
    }
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, '')
        const matches = cleaned.match(/.{1,4}/g)
        return matches ? matches.join(' ') : cleaned
    }
    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '')
        if (cleaned.length >= 2) {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4)
        }
        return cleaned
    }
    const handleBankTransferChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target
        if (name === 'iban') {
            setBankTransferData({
                ...bankTransferData,
                [name]: formatIBAN(value),
            })
        } else {
            setBankTransferData({
                ...bankTransferData,
                [name]: value,
            })
        }
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            })
        }
    }
    const handleD17CardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'cardNumber') {
            setD17CardData({
                ...d17CardData,
                [name]: formatCardNumber(value),
            })
        } else if (name === 'expiryDate') {
            setD17CardData({
                ...d17CardData,
                [name]: formatExpiryDate(value),
            })
        } else {
            setD17CardData({
                ...d17CardData,
                [name]: value,
            })
        }
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            })
        }
    }
    const handlePostalCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPostalCheckData({
            ...postalCheckData,
            [name]: value,
        })
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            })
        }
    }
    const validateBankTransfer = () => {
        const newErrors: Record<string, string> = {}
        if (!bankTransferData.accountHolderName.trim())
            newErrors.accountHolderName = 'Nom du titulaire requis'
        if (!bankTransferData.bankName)
            newErrors.bankName = 'Veuillez sélectionner une banque'
        if (!bankTransferData.iban.trim()) newErrors.iban = 'IBAN requis'
        else if (!bankTransferData.iban.startsWith('TN'))
            newErrors.iban = "L'IBAN doit commencer par TN"
        else if (bankTransferData.iban.replace(/\s/g, '').length !== 24)
            newErrors.iban = 'IBAN invalide (format: TN59 1234 5678 9012 3456 7890)'
        if (!bankTransferData.rib.trim()) newErrors.rib = 'RIB requis'
        if (!bankTransferData.accountNumber.trim())
            newErrors.accountNumber = 'Numéro de compte requis'
        if (!bankTransferData.address.trim()) newErrors.address = 'Adresse requise'
        if (!bankTransferData.city.trim()) newErrors.city = 'Ville requise'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const validateD17Card = () => {
        const newErrors: Record<string, string> = {}
        if (!d17CardData.cardHolderName.trim())
            newErrors.cardHolderName = 'Nom du titulaire requis'
        if (
            !d17CardData.cardNumber.trim() ||
            d17CardData.cardNumber.replace(/\s/g, '').length !== 16
        )
            newErrors.cardNumber = 'Numéro de carte invalide (16 chiffres)'
        if (
            !d17CardData.expiryDate.trim() ||
            !/^\d{2}\/\d{2}$/.test(d17CardData.expiryDate)
        )
            newErrors.expiryDate = "Date d'expiration invalide (MM/AA)"
        if (
            !d17CardData.phoneNumber.trim() ||
            !/^\d{8}$/.test(d17CardData.phoneNumber.replace(/\s/g, ''))
        )
            newErrors.phoneNumber = 'Numéro de téléphone invalide (8 chiffres)'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const validatePostalCheck = () => {
        const newErrors: Record<string, string> = {}
        if (!postalCheckData.accountHolderName.trim())
            newErrors.accountHolderName = 'Nom du titulaire requis'
        if (
            !postalCheckData.ccpNumber.trim() ||
            !/^\d{7,10}$/.test(postalCheckData.ccpNumber)
        )
            newErrors.ccpNumber = 'Numéro CCP invalide (7-10 chiffres)'
        if (
            !postalCheckData.phoneNumber.trim() ||
            !/^\d{8}$/.test(postalCheckData.phoneNumber.replace(/\s/g, ''))
        )
            newErrors.phoneNumber = 'Numéro de téléphone invalide (8 chiffres)'
        if (!postalCheckData.address.trim()) newErrors.address = 'Adresse requise'
        if (!postalCheckData.city.trim()) newErrors.city = 'Ville requise'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let isValid = false
        if (selectedMethod === 'bank_transfer') isValid = validateBankTransfer()
        else if (selectedMethod === 'd17_card') isValid = validateD17Card()
        else if (selectedMethod === 'postal_check') isValid = validatePostalCheck()
        if (!isValid) return
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Retrieve current developerSettings from localStorage
            const currentSettingsStr = localStorage.getItem('developerSettings')
            const currentSettings: DeveloperSettings = currentSettingsStr ? JSON.parse(currentSettingsStr) : {
                language: 'fr',
                notifications: {
                    email: true,
                    push: true,
                    subscribers: true,
                    revenue: true,
                    ratings: true,
                    marketing: true
                },
                security: {
                    twoFactorAuth: false,
                    sessionTimeout: 30
                },
                apiSettings: {
                    defaultTimeout: 30,
                    defaultFormat: 'json',
                    rateLimit: 100
                },
                resourceDefaults: {
                    modelVisibility: 'public',
                    datasetVisibility: 'public',
                    requireCitation: true,
                    defaultLicense: 'mit'
                },
                payoutSettings: {
                    autoPayout: false,
                    minPayoutAmount: 50,
                    payoutDay: 1
                },
                paymentMethods: []
            }

            // Prepare the new payment method
            let newMethod: PaymentMethod
            const isFirstMethod = !currentSettings.paymentMethods || currentSettings.paymentMethods.length === 0


            switch (selectedMethod) {
                case 'bank_transfer':
                    newMethod = {
                        id: `pm_${Date.now()}`,
                        type: 'bank_transfer',
                        details: bankTransferData,
                        isDefault: isFirstMethod
                    }
                    break
                case 'd17_card':
                    newMethod = {
                        id: `pm_${Date.now() + 1}`,
                        type: 'd17_card',
                        details: d17CardData,
                        isDefault: isFirstMethod
                    }
                    break
                case 'postal_check':
                    newMethod = {
                        id: `pm_${Date.now() + 2}`,
                        type: 'postal_check',
                        details: postalCheckData,
                        isDefault: isFirstMethod
                    }
                    break
                default:
                    throw new Error('Méthode de paiement invalide')
            }

            const updatedPaymentMethods = [...(currentSettings.paymentMethods || []), newMethod];

            // Update settings
            const updatedSettings: DeveloperSettings = {
                ...currentSettings,
                paymentMethods: updatedPaymentMethods
            };
            // Save to localStorage
            localStorage.setItem('developerSettings', JSON.stringify(updatedSettings));
            window.dispatchEvent(new Event('storage'));
            navigate('/developer/payments')
        } catch (error) {
            console.error('Error adding payment method:', error)
            setErrors({
                submit: 'Une erreur est survenue. Veuillez réessayer.',
            })
        } finally {
            setIsLoading(false)
        }
    }
    const getColorClasses = (color: string) => {
        const colors = {
            blue: {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-600',
                icon: 'text-blue-500',
                hover: 'hover:border-blue-300',
                selected: 'border-blue-500 bg-blue-50',
                badge: 'bg-blue-100 text-blue-700',
            },
            green: {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-600',
                icon: 'text-green-500',
                hover: 'hover:border-green-300',
                selected: 'border-green-500 bg-green-50',
                badge: 'bg-green-100 text-green-700',
            },
            orange: {
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                text: 'text-orange-600',
                icon: 'text-orange-500',
                hover: 'hover:border-orange-300',
                selected: 'border-orange-500 bg-orange-50',
                badge: 'bg-orange-100 text-orange-700',
            },
        }
        return colors[color as keyof typeof colors] || colors.blue
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <DeveloperDashboardHeader />
            <div className="flex">
                <DeveloperDashboardSidebar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
                <main className="flex-1 p-6">
                    <div className="container mx-auto max-w-5xl">
                        {/* Header */}
                        <div className="mb-8">
                            <button
                                onClick={() => navigate('/developer/payments')}
                                className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors group"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Retour aux paiements
                            </button>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Ajouter une méthode de versement
                            </h1>
                            <p className="text-gray-600">
                                Configurez votre méthode de versement tunisienne pour recevoir
                                vos revenus
                            </p>
                        </div>

                        {/* Info Banner */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start"
                        >
                            <Info className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">
                                    Méthodes de paiement tunisiennes uniquement
                                </p>
                                <p>
                                    Pour des raisons de conformité et de réglementation, nous
                                    acceptons uniquement les méthodes de paiement tunisiennes pour
                                    les versements aux développeurs.
                                </p>
                            </div>
                        </motion.div>

                        {/* Method Selection Cards */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="mb-8"
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Choisissez votre méthode de versement
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {paymentMethods.map((method, index) => {
                                    const IconComponent = method.icon
                                    const colors = getColorClasses(method.color)
                                    const isSelected = selectedMethod === method.type
                                    return (
                                        <motion.button
                                            key={method.type}
                                            type="button"
                                            initial={{
                                                opacity: 0,
                                                y: 20,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay: index * 0.1,
                                            }}
                                            whileHover={{
                                                scale: 1.02,
                                            }}
                                            whileTap={{
                                                scale: 0.98,
                                            }}
                                            onClick={() => setSelectedMethod(method.type)}
                                            className={`relative p-6 rounded-xl border-2 transition-all text-left ${isSelected ? colors.selected : `border-gray-200 bg-white ${colors.hover}`}`}
                                        >
                                            {/* Badge */}
                                            {method.badge && (
                                                <div className="absolute top-4 right-4">
                                                    <span
                                                        className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge}`}
                                                    >
                                                        {method.badge}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Icon */}
                                            <div
                                                className={`p-3 rounded-lg mb-4 inline-block ${colors.bg}`}
                                            >
                                                <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                                            </div>

                                            {/* Content */}
                                            <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                                                {method.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                                {method.description}
                                            </p>

                                            {/* Details */}
                                            <div className="space-y-2 pt-4 border-t border-gray-100">
                                                <div className="flex items-center text-sm">
                                                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-600">
                                                        {method.processingTime}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-gray-600">{method.fees}</span>
                                                </div>
                                            </div>

                                            {/* Selection Indicator */}
                                            {isSelected && (
                                                <motion.div
                                                    initial={{
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                    }}
                                                    className="absolute top-4 left-4"
                                                >
                                                    <div
                                                        className={`h-6 w-6 rounded-full ${colors.bg} flex items-center justify-center`}
                                                    >
                                                        <Check className={`h-4 w-4 ${colors.text}`} />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    )
                                })}
                            </div>
                        </motion.div>

                        {/* Form */}
                        <AnimatePresence mode="wait">
                            {selectedMethod && (
                                <motion.form
                                    key={selectedMethod}
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -20,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                    onSubmit={handleSubmit}
                                    className="bg-white rounded-xl shadow-sm p-8"
                                >
                                    {/* Bank Transfer Form */}
                                    {selectedMethod === 'bank_transfer' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center mb-6">
                                                <Building2 className="h-6 w-6 text-blue-600 mr-3" />
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    Informations du compte bancaire
                                                </h2>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Account Holder Name */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nom du titulaire du compte *
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="accountHolderName"
                                                            value={bankTransferData.accountHolderName}
                                                            onChange={handleBankTransferChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.accountHolderName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                            placeholder="Nom complet"
                                                        />
                                                    </div>
                                                    {errors.accountHolderName && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.accountHolderName}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Bank Name */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Banque *
                                                    </label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                                        <select
                                                            name="bankName"
                                                            value={bankTransferData.bankName}
                                                            onChange={handleBankTransferChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.bankName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white`}
                                                        >
                                                            <option value="">
                                                                Sélectionnez votre banque
                                                            </option>
                                                            {TUNISIAN_BANKS.map((bank) => (
                                                                <option key={bank} value={bank}>
                                                                    {bank}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {errors.bankName && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.bankName}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* IBAN */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        IBAN *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="iban"
                                                        value={bankTransferData.iban}
                                                        onChange={handleBankTransferChange}
                                                        className={`block w-full px-3 py-3 border ${errors.iban ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono`}
                                                        placeholder="TN59 1234 5678 9012 3456 7890"
                                                        maxLength={29}
                                                    />
                                                    {errors.iban && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.iban}
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        Format: TN suivi de 20 chiffres
                                                    </p>
                                                </div>

                                                {/* RIB */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        RIB *
                                                    </label>
                                                    <div className="relative">
                                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="rib"
                                                            value={bankTransferData.rib}
                                                            onChange={handleBankTransferChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.rib ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                            placeholder="20 chiffres"
                                                        />
                                                    </div>
                                                    {errors.rib && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.rib}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Account Number */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Numéro de compte *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="accountNumber"
                                                        value={bankTransferData.accountNumber}
                                                        onChange={handleBankTransferChange}
                                                        className={`block w-full px-3 py-3 border ${errors.accountNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                        placeholder="Numéro de compte"
                                                    />
                                                    {errors.accountNumber && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.accountNumber}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Address */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Adresse *
                                                    </label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={bankTransferData.address}
                                                            onChange={handleBankTransferChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                            placeholder="Numéro et nom de rue"
                                                        />
                                                    </div>
                                                    {errors.address && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.address}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* City & Postal Code */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Ville *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={bankTransferData.city}
                                                        onChange={handleBankTransferChange}
                                                        className={`block w-full px-3 py-3 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                                        placeholder="Tunis"
                                                    />
                                                    {errors.city && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.city}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Code postal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        value={bankTransferData.postalCode}
                                                        onChange={handleBankTransferChange}
                                                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                        placeholder="1000"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* D17 Card Form */}
                                    {selectedMethod === 'd17_card' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center mb-6">
                                                <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    Informations de la carte D17
                                                </h2>
                                            </div>

                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                                <div className="flex">
                                                    <Info className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                                    <div className="text-sm text-green-800">
                                                        <p className="font-medium mb-1">
                                                            Carte D17 uniquement
                                                        </p>
                                                        <p>
                                                            Seules les cartes de débit D17 émises par les
                                                            banques tunisiennes sont acceptées. Les versements
                                                            sont instantanés.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Card Holder Name */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nom du titulaire *
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="cardHolderName"
                                                            value={d17CardData.cardHolderName}
                                                            onChange={handleD17CardChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.cardHolderName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                                            placeholder="Nom tel qu'il apparaît sur la carte"
                                                        />
                                                    </div>
                                                    {errors.cardHolderName && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.cardHolderName}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Card Number */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Numéro de carte *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        value={d17CardData.cardNumber}
                                                        onChange={handleD17CardChange}
                                                        className={`block w-full px-3 py-3 border ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-lg`}
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength={19}
                                                    />
                                                    {errors.cardNumber && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.cardNumber}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Expiry Date */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Date d'expiration *
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="expiryDate"
                                                            value={d17CardData.expiryDate}
                                                            onChange={handleD17CardChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                                            placeholder="MM/AA"
                                                            maxLength={5}
                                                        />
                                                    </div>
                                                    {errors.expiryDate && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.expiryDate}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Phone Number */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Numéro de téléphone *
                                                    </label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            name="phoneNumber"
                                                            value={d17CardData.phoneNumber}
                                                            onChange={handleD17CardChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                                                            placeholder="12 345 678"
                                                            maxLength={8}
                                                        />
                                                    </div>
                                                    {errors.phoneNumber && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.phoneNumber}
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        8 chiffres sans indicatif
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Postal Check Form */}
                                    {selectedMethod === 'postal_check' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center mb-6">
                                                <Mail className="h-6 w-6 text-orange-600 mr-3" />
                                                <h2 className="text-xl font-semibold text-gray-900">
                                                    Informations du compte postal (CCP)
                                                </h2>
                                            </div>

                                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                                                <div className="flex">
                                                    <Info className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0 mt-0.5" />
                                                    <div className="text-sm text-orange-800">
                                                        <p className="font-medium mb-1">
                                                            Compte Chèques Postaux
                                                        </p>
                                                        <p>
                                                            Les versements sur compte CCP prennent 3 à 5 jours
                                                            ouvrables. Assurez-vous que votre compte est actif
                                                            et vérifié.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Account Holder Name */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nom du titulaire *
                                                    </label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="accountHolderName"
                                                            value={postalCheckData.accountHolderName}
                                                            onChange={handlePostalCheckChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.accountHolderName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                            placeholder="Nom complet"
                                                        />
                                                    </div>
                                                    {errors.accountHolderName && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.accountHolderName}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* CCP Number */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Numéro CCP *
                                                    </label>
                                                    <div className="relative">
                                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="ccpNumber"
                                                            value={postalCheckData.ccpNumber}
                                                            onChange={handlePostalCheckChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.ccpNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-lg`}
                                                            placeholder="1234567890"
                                                            maxLength={10}
                                                        />
                                                    </div>
                                                    {errors.ccpNumber && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.ccpNumber}
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        7 à 10 chiffres
                                                    </p>
                                                </div>

                                                {/* Phone Number */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Numéro de téléphone *
                                                    </label>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            name="phoneNumber"
                                                            value={postalCheckData.phoneNumber}
                                                            onChange={handlePostalCheckChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                            placeholder="12 345 678"
                                                            maxLength={8}
                                                        />
                                                    </div>
                                                    {errors.phoneNumber && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.phoneNumber}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Address */}
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Adresse *
                                                    </label>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={postalCheckData.address}
                                                            onChange={handlePostalCheckChange}
                                                            className={`block w-full pl-10 pr-3 py-3 border ${errors.address ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                            placeholder="Numéro et nom de rue"
                                                        />
                                                    </div>
                                                    {errors.address && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.address}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* City & Postal Code */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Ville *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={postalCheckData.city}
                                                        onChange={handlePostalCheckChange}
                                                        className={`block w-full px-3 py-3 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
                                                        placeholder="Tunis"
                                                    />
                                                    {errors.city && (
                                                        <p className="mt-1 text-sm text-red-600">
                                                            {errors.city}
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Code postal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        value={postalCheckData.postalCode}
                                                        onChange={handlePostalCheckChange}
                                                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                        placeholder="1000"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {errors.submit && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                                            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                                            <p className="text-sm text-red-600">{errors.submit}</p>
                                        </div>
                                    )}

                                    {/* Submit Buttons */}
                                    <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/developer/payments')}
                                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium shadow-sm"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                                    Enregistrement...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-5 w-5 mr-2" />
                                                    Ajouter la méthode
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    )
}