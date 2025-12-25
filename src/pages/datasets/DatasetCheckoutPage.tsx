import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Database, CreditCard, Calendar, User, Mail, Lock, CheckCircle, AlertTriangle, ArrowLeft, MapPin, Phone } from 'lucide-react';
// Billing period options
enum BillingPeriod {
    ONE_TIME = 'ONE_TIME',
    MONTHLY = 'MONTHLY',
    ANNUAL = 'ANNUAL',
}
// Define payment method types
enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    PAYPAL = 'PAYPAL',
    FLOUCI = 'FLOUCI',
    KONNECT = 'KONNECT',
}
interface PurchasePlan {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    billingPeriod: BillingPeriod;
    features: string[];
}
interface Dataset {
    id: number;
    name: string;
    creator: {
        id: number;
        name: string;
    };
    description: string;
    purchasePlan: PurchasePlan;
}
export function DatasetCheckoutPage() {
    const {
        datasetId
    } = useParams<{
        datasetId: string;
    }>();
    const navigate = useNavigate();
    const [dataset, setDataset] = useState<Dataset | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [processingPayment, setProcessingPayment] = useState(false);
    // Payment method state
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'Tunisie',
        phone: '',
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        agreeToTerms: false
    });
    // Validation errors
    const [formErrors, setFormErrors] = useState<{
        [key: string]: string;
    }>({});
    useEffect(() => {
        const fetchDataset = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 800));
                // Mock dataset data
                const mockDataset: Dataset = {
                    id: parseInt(datasetId || '1'),
                    name: 'Tunisian Dialect Corpus',
                    creator: {
                        id: 1,
                        name: 'ANLP Lab'
                    },
                    description: "Un large corpus de textes en dialecte tunisien pour l'entraînement de modèles NLP.",
                    purchasePlan: {
                        id: 1,
                        name: 'Standard Access',
                        description: 'Accès complet au dataset avec documentation et support standard',
                        price: 149.99,
                        currency: 'TND',
                        billingPeriod: BillingPeriod.ONE_TIME,
                        features: ['Téléchargement complet du dataset', 'Documentation détaillée', 'Mises à jour pendant 1 an', 'Support par email']
                    }
                };
                setDataset(mockDataset);
                // Pre-fill form with user data if available
                const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                if (userData.name || userData.email) {
                    setFormData(prev => ({
                        ...prev,
                        firstName: userData.firstName || prev.firstName,
                        lastName: userData.lastName || prev.lastName,
                        email: userData.email || prev.email
                    }));
                }
            } catch (err) {
                console.error('Error fetching dataset:', err);
                setError('Une erreur est survenue lors du chargement des données du dataset');
            } finally {
                setLoading(false);
            }
        };
        fetchDataset();
    }, [datasetId]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            name,
            value,
            type,
            checked
        } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when field is edited
        if (formErrors[name]) {
            setFormErrors(prev => {
                const newErrors = {
                    ...prev
                };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    // Format card number with spaces
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };
    // Handle card number input
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCardNumber(e.target.value);
        setFormData({
            ...formData,
            cardNumber: formattedValue
        });
        if (formErrors.cardNumber) {
            setFormErrors({
                ...formErrors,
                cardNumber: ''
            });
        }
    };
    // Handle expiry date input formatting (MM/YY)
    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let {
            value
        } = e.target;
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        setFormData({
            ...formData,
            expiryDate: value
        });
        if (formErrors.expiryDate) {
            setFormErrors({
                ...formErrors,
                expiryDate: ''
            });
        }
    };
    // Handle payment method selection
    const handlePaymentMethodChange = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method);
        // Clear any payment-specific errors when changing payment method
        const paymentFieldErrors = ['cardName', 'cardNumber', 'expiryDate', 'cvv'];
        const filteredErrors = {
            ...formErrors
        };
        paymentFieldErrors.forEach(field => {
            delete filteredErrors[field];
        });
        setFormErrors(filteredErrors);
    };
    const validateForm = (): boolean => {
        const errors: {
            [key: string]: string;
        } = {};
        // Common validations for all payment methods
        if (!formData.firstName.trim()) {
            errors.firstName = 'Prénom requis';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Nom requis';
        }
        if (!formData.email.trim()) {
            errors.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email invalide';
        }
        if (!formData.address.trim()) {
            errors.address = "L'adresse est requise";
        }
        if (!formData.city.trim()) {
            errors.city = 'La ville est requise';
        }
        if (!formData.zipCode.trim()) {
            errors.zipCode = 'Le code postal est requis';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Le téléphone est requis';
        }
        // Credit card specific validations
        if (selectedPaymentMethod === PaymentMethod.CREDIT_CARD) {
            if (!formData.cardName.trim()) {
                errors.cardName = 'Nom sur la carte requis';
            }
            if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length < 16) {
                errors.cardNumber = 'Numéro de carte invalide';
            }
            if (!formData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
                errors.expiryDate = "Date d'expiration invalide (MM/YY)";
            }
            if (!formData.cvv.trim() || !/^\d{3,4}$/.test(formData.cvv)) {
                errors.cvv = 'CVV invalide';
            }
        }
        if (!formData.agreeToTerms) {
            errors.agreeToTerms = "Vous devez accepter les conditions d'utilisation";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setProcessingPayment(true);
        try {
            // In a real app, this would be an API call to process payment
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Save dataset purchase in localStorage
            const purchasedDatasets = JSON.parse(localStorage.getItem('purchasedDatasets') || '[]');
            purchasedDatasets.push({
                id: dataset?.id,
                name: dataset?.name,
                purchaseDate: new Date().toISOString(),
                price: dataset?.purchasePlan.price,
                currency: dataset?.purchasePlan.currency,
                invoiceId: `INV-DS-${Date.now()}`
            });
            localStorage.setItem('purchasedDatasets', JSON.stringify(purchasedDatasets));
            // Redirect to confirmation page
            navigate(`/dataset-payment-confirmation/${dataset?.id}`);
        } catch (err) {
            console.error('Payment error:', err);
            setError('Une erreur est survenue lors du traitement du paiement');
            setProcessingPayment(false);
        }
    };
    const getBillingPeriodName = (period: BillingPeriod): string => {
        switch (period) {
            case BillingPeriod.ONE_TIME:
                return 'Paiement unique';
            case BillingPeriod.MONTHLY:
                return 'Mensuel';
            case BillingPeriod.ANNUAL:
                return 'Annuel';
            default:
                return '';
        }
    };
    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !dataset) {
        return <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="flex flex-col items-center justify-center py-12">
                        <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
                        <p className="text-gray-600 mb-6">
                            {error || 'Dataset non trouvé'}
                        </p>
                        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="mb-6">
                <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour au dataset
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Récapitulatif</h2>
                        <div className="flex items-start mb-4">
                            <Database className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                            <div>
                                <h3 className="font-medium">{dataset.name}</h3>
                                <p className="text-sm text-gray-500">
                                    Par {dataset.creator.name}
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-4 mb-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Plan</span>
                                <span className="font-medium">
                                    {dataset.purchasePlan.name}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Type</span>
                                <span>
                                    {getBillingPeriodName(dataset.purchasePlan.billingPeriod)}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Prix</span>
                                <span>
                                    {dataset.purchasePlan.price} {dataset.purchasePlan.currency}
                                </span>
                            </div>
                            {dataset.purchasePlan.billingPeriod !== BillingPeriod.ONE_TIME && <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Période</span>
                                <span>
                                    {dataset.purchasePlan.billingPeriod === BillingPeriod.MONTHLY ? 'Mensuel' : 'Annuel'}
                                </span>
                            </div>}
                        </div>
                        <div className="border-t border-gray-200 pt-4 mb-4">
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>
                                    {dataset.purchasePlan.price} {dataset.purchasePlan.currency}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-medium text-sm mb-2">Ce qui est inclus:</h3>
                            {dataset.purchasePlan.features.map((feature, index) => <div key={index} className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span>{feature}</span>
                            </div>)}
                        </div>
                    </div>
                </div>
                {/* Payment Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Informations de paiement
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Payment Method Selection */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium mb-4 flex items-center">
                                        <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                                        Méthode de paiement
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPaymentMethod === PaymentMethod.CREDIT_CARD ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => handlePaymentMethodChange(PaymentMethod.CREDIT_CARD)}>
                                            <div className="flex justify-center mb-3">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Credit Card" className="h-8" />
                                            </div>
                                            <p className="text-center text-sm font-medium">
                                                Carte bancaire
                                            </p>
                                        </div>
                                        <div className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPaymentMethod === PaymentMethod.PAYPAL ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => handlePaymentMethodChange(PaymentMethod.PAYPAL)}>
                                            <div className="flex justify-center mb-3">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png" alt="PayPal" className="h-8" />
                                            </div>
                                            <p className="text-center text-sm font-medium">
                                                PayPal
                                            </p>
                                        </div>
                                        <div className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPaymentMethod === PaymentMethod.FLOUCI ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => handlePaymentMethodChange(PaymentMethod.FLOUCI)}>
                                            <div className="flex justify-center mb-3">
                                                <img src="https://flouci.com/assets/images/logo.png" alt="Flouci" className="h-8" />
                                            </div>
                                            <p className="text-center text-sm font-medium">
                                                Flouci
                                            </p>
                                        </div>
                                        <div className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPaymentMethod === PaymentMethod.KONNECT ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => handlePaymentMethodChange(PaymentMethod.KONNECT)}>
                                            <div className="flex justify-center mb-3">
                                                <img src="https://www.konnect.network/images/konnect.png" alt="Konnect" className="h-8" />
                                            </div>
                                            <p className="text-center text-sm font-medium">
                                                Konnect
                                            </p>
                                        </div>
                                    </div>
                                    {/* Payment method info alert */}
                                    <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertTriangle className="h-5 w-5 text-blue-500" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-blue-700">
                                                    {selectedPaymentMethod === PaymentMethod.CREDIT_CARD && 'Nous acceptons Visa, Mastercard et American Express. Vos informations de paiement sont sécurisées.'}
                                                    {selectedPaymentMethod === PaymentMethod.PAYPAL && 'Vous serez redirigé vers PayPal pour compléter votre paiement en toute sécurité.'}
                                                    {selectedPaymentMethod === PaymentMethod.FLOUCI && 'Flouci est une solution de paiement électronique tunisienne. Vous serez redirigé vers leur plateforme.'}
                                                    {selectedPaymentMethod === PaymentMethod.KONNECT && 'Konnect est un service de paiement mobile de la Banque Internationale Arabe de Tunisie (BIAT).'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Personal Information */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">
                                            Informations personnelles
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Prénom *
                                                    </label>
                                                    <input type="text" name="firstName" className={`w-full px-4 py-2 border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} value={formData.firstName} onChange={handleInputChange} />
                                                    {formErrors.firstName && <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.firstName}
                                                    </p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Nom *
                                                    </label>
                                                    <input type="text" name="lastName" className={`w-full px-4 py-2 border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} value={formData.lastName} onChange={handleInputChange} />
                                                    {formErrors.lastName && <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.lastName}
                                                    </p>}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email *
                                                </label>
                                                <div className={`flex items-center w-full px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500`}>
                                                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                                    <input type="email" name="email" className="flex-grow focus:outline-none" placeholder="votre@email.com" value={formData.email} onChange={handleInputChange} />
                                                </div>
                                                {formErrors.email && <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.email}
                                                </p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Adresse *
                                                </label>
                                                <input type="text" name="address" className={`w-full px-4 py-2 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} placeholder="Numéro et nom de rue" value={formData.address} onChange={handleInputChange} />
                                                {formErrors.address && <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.address}
                                                </p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Ville *
                                                    </label>
                                                    <input type="text" name="city" className={`w-full px-4 py-2 border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} value={formData.city} onChange={handleInputChange} />
                                                    {formErrors.city && <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.city}
                                                    </p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Code postal *
                                                    </label>
                                                    <input type="text" name="zipCode" className={`w-full px-4 py-2 border ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} value={formData.zipCode} onChange={handleInputChange} />
                                                    {formErrors.zipCode && <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.zipCode}
                                                    </p>}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Téléphone *
                                                </label>
                                                <div className={`flex items-center w-full px-4 py-2 border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500`}>
                                                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                                    <input type="tel" name="phone" className="flex-grow focus:outline-none" placeholder="+216 00 000 000" value={formData.phone} onChange={handleInputChange} />
                                                </div>
                                                {formErrors.phone && <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.phone}
                                                </p>}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Payment Information - Only show for credit card */}
                                    {selectedPaymentMethod === PaymentMethod.CREDIT_CARD && <div>
                                        <h3 className="text-lg font-medium mb-4">
                                            Détails de paiement
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nom sur la carte *
                                                </label>
                                                <input type="text" name="cardName" className={`w-full px-4 py-2 border ${formErrors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} placeholder="Nom complet tel qu'il apparaît sur la carte" value={formData.cardName} onChange={handleInputChange} />
                                                {formErrors.cardName && <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.cardName}
                                                </p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Numéro de carte *
                                                </label>
                                                <div className={`flex items-center w-full px-4 py-2 border ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500`}>
                                                    <input type="text" name="cardNumber" className="flex-grow focus:outline-none" placeholder="1234 5678 9012 3456" maxLength={19} value={formData.cardNumber} onChange={handleCardNumberChange} />
                                                    <div className="flex space-x-1">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                                                    </div>
                                                </div>
                                                {formErrors.cardNumber && <p className="mt-1 text-sm text-red-500">
                                                    {formErrors.cardNumber}
                                                </p>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Date d'expiration *
                                                    </label>
                                                    <input type="text" name="expiryDate" className={`w-full px-4 py-2 border ${formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} placeholder="MM/YY" maxLength={5} value={formData.expiryDate} onChange={handleExpiryDateChange} />
                                                    {formErrors.expiryDate && <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.expiryDate}
                                                    </p>}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        CVV *
                                                    </label>
                                                    <input type="text" name="cvv" className={`w-full px-4 py-2 border ${formErrors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} placeholder="123" maxLength={4} value={formData.cvv} onChange={e => {
                                                        const value = e.target.value.replace(/\D/g, '');
                                                        setFormData({
                                                            ...formData,
                                                            cvv: value
                                                        });
                                                        if (formErrors.cvv) {
                                                            setFormErrors({
                                                                ...formErrors,
                                                                cvv: ''
                                                            });
                                                        }
                                                    }} />
                                                    {formErrors.cvv && <p className="mt-1 text-sm text-red-500">
                                                        {formErrors.cvv}
                                                    </p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                {/* Terms and Conditions */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" name="agreeToTerms" type="checkbox" className={`h-4 w-4 text-blue-600 border rounded focus:ring-blue-500 ${formErrors.agreeToTerms ? 'border-red-500' : 'border-gray-300'}`} checked={formData.agreeToTerms} onChange={handleInputChange} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-medium text-gray-700">
                                            J'accepte les conditions d'utilisation et la politique
                                            de confidentialité
                                        </label>
                                        {formErrors.agreeToTerms && <p className="mt-1 text-sm text-red-500">
                                            {formErrors.agreeToTerms}
                                        </p>}
                                    </div>
                                </div>
                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-300 disabled:cursor-not-allowed" disabled={processingPayment}>
                                        {processingPayment ? <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                                            Traitement en cours...
                                        </> : <>
                                            <Lock className="h-4 w-4 mr-2" />
                                            Payer {dataset.purchasePlan.price}{' '}
                                            {dataset.purchasePlan.currency}
                                        </>}
                                    </button>
                                </div>
                                <div className="flex items-center justify-center text-sm text-gray-500">
                                    <Lock className="h-4 w-4 mr-2" />
                                    Paiement sécurisé
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}