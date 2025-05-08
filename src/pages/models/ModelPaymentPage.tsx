import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CreditCard,
    Calendar,
    Lock,
    Building2,
    Smartphone,
    CreditCardIcon,
} from 'lucide-react'
type PaymentProvider = 'card' | 'flouci' | 'konnect' | 'bank'
export function ModelPaymentPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [selectedProvider, setSelectedProvider] =
        useState<PaymentProvider>('card')
    const providers = [
        {
            id: 'card',
            name: 'Carte Bancaire',
            icon: <CreditCardIcon className="h-6 w-6" />,
            description: 'Payer avec votre carte bancaire tunisienne',
            logo: '',
        },
        {
            id: 'flouci',
            name: 'Flouci',
            icon: <Smartphone className="h-6 w-6" />,
            description: 'Payer avec votre compte Flouci',
            logo: '',
        },
        {
            id: 'konnect',
            name: 'Konnect',
            icon: <Smartphone className="h-6 w-6" />,
            description: 'Payer avec votre compte Konnect de la Poste Tunisienne',
            logo: '',
        },
        {
            id: 'bank',
            name: 'Virement Bancaire',
            icon: <Building2 className="h-6 w-6" />,
            description: 'Payer par virement bancaire direct',
            logo: 'https://www.bct.gov.tn/bct/siteprod/images/logo.png',
        },
    ]
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        navigate('/models')
    }
    const renderPaymentForm = () => {
        switch (selectedProvider) {
            case 'card':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Titulaire de la carte
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nom complet"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Numéro de carte
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="1234 5678 9012 3456"
                                />
                                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date d'expiration
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="MM/AA"
                                    />
                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CVC
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="123"
                                />
                            </div>
                        </div>
                    </div>
                )
            case 'flouci':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Numéro de téléphone Flouci
                            </label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="+216 XX XXX XXX"
                            />
                        </div>
                    </div>
                )
            case 'konnect':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Identifiant Konnect
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Votre identifiant Konnect"
                            />
                        </div>
                    </div>
                )
            case 'bank':
                return (
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="font-medium text-gray-900 mb-2">
                                Informations de virement
                            </h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>Banque: Banque Nationale Agricole</p>
                                <p>IBAN: TN59 01234567890123456789</p>
                                <p>BIC/SWIFT: BNTETNTT</p>
                                <p>Référence: AIPP-{Math.random().toString(36).substr(2, 9)}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Preuve de paiement
                            </label>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                )
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <div className="flex items-center justify-center mb-6">
                            <Lock className="h-8 w-8 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
                            Paiement sécurisé
                        </h1>
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Choisissez votre moyen de paiement
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {providers.map((provider) => (
                                    <button
                                        key={provider.id}
                                        onClick={() =>
                                            setSelectedProvider(provider.id as PaymentProvider)
                                        }
                                        className={`p-4 border rounded-lg text-left transition-colors ${selectedProvider === provider.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
                                    >
                                        <div className="flex items-center mb-2">
                                            {provider.icon}
                                            <span className="ml-2 font-medium">{provider.name}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {provider.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {renderPaymentForm()}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Traitement en cours...' : 'Payer maintenant'}
                            </button>
                        </form>
                        <div className="mt-6">

                            <div className="flex justify-center items-center space-x-6">

                                <img

                                    src={'https://www.bct.gov.tn/bct/siteprod/images/logo.png'}

                                    className="h-8 object-contain grayscale opacity-75"
                                />

                            </div>
                        </div>
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <Lock className="inline-block h-4 w-4 mr-1" />
                            Paiement sécurisé avec cryptage SSL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
