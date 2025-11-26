import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Calendar, MapPin, Mail, Phone, Lock, CheckCircle, AlertCircle, Zap, ChevronLeft, CreditCard as CreditCardIcon, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { BillingPeriod } from '../../types/shared';
import { useAuth } from '../../context/AuthContext';
import { useSuccess } from '../../context/SuccessContext';

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
interface Model {
  id: number;
  name: string;
  developer: {
    username: string;
  };
}
// Define payment method types
enum PaymentMethod {
  KONNECT = 'KONNECT',
}
export function ModelCheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    id
  } = useParams<{ id: string }>();
  // Get selected plan from location state or fetch it based on planId query param
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanDto | null>(null);
  const [model, setModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username, token, account } = useAuth();
  // Form state
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Tunisie',
    phone: ''
  });
  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(PaymentMethod.KONNECT);
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { success, setSuccess, clearSuccess } = useSuccess();


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {


        const modelFromState = location.state?.model;

        // Get plan from location state if available
        const planFromState = location.state?.selectedPlan;

        // Fallback to mock data
        setSelectedPlan({
          id: planFromState?.id || 1,
          name: planFromState?.name || "",
          description: planFromState?.description || "",
          price: planFromState?.price || "",
          currency: 'TND',
          billingPeriod: planFromState?.billingPeriod || "",
          features: planFromState?.features || [],
          apiCallsLimit: planFromState?.apiCallsLimit || "",
        });

        setModel({
          id: modelFromState?.id || undefined,
          name: modelFromState?.name || "",
          developer: {
            username: modelFromState?.creator?.name || "",
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [location.state, id]);
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // Common validations for all payment methods
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Téléphone requis';
    }

    if (!agreeTerms) {
      newErrors.terms = 'Vous devez accepter les conditions';
    }
    /*

if (!formData.address.trim()) {
  newErrors.address = 'Adresse requise';
}
if (!formData.city.trim()) {
  newErrors.city = 'Ville requise';
}
if (!formData.zipCode.trim()) {
  newErrors.zipCode = 'Code postal requis';
}
  */

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/subscriptions/subscribe`, {
        modelId: model?.id,
        planId: selectedPlan?.id,
        paymentMethod: selectedPaymentMethod,
        modelName: model?.name,
        clientId: account?.id,
        planName: selectedPlan?.name,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        phone: formData.phone

      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log('Subscription response:', response.data);

      // Show success message and redirect to confirmation page
      //setPaymentSuccess(true);
      if (response.data.success === true) {
        setSuccess({
          type: 'SUBSCRIPTION_CREATED',
          message: "Abonnement créé avec succès. Vous allez être redirigé vers la page de confirmation.",
          redirect: response.data.data?.payUrl
        })
      }
      setIsLoading(true);



      /*
     // Simulate successful payment
     setPaymentSuccess(true);
     // Store subscription info in Client Account (localStorage for demo purposes)
     const subscriptionData = {
       modelName: model?.name,
       planId: selectedPlan?.id,
       planName: selectedPlan?.name,
       startDate: new Date().toISOString(),
       price: selectedPlan?.price,
       currency: selectedPlan?.currency,
       billingPeriod: selectedPlan?.billingPeriod,
       paymentMethod: selectedPaymentMethod,
       nextBillingDate: (() => {
         const date = new Date();
         if (selectedPlan?.billingPeriod === BillingPeriod.MONTHLY) {
           date.setMonth(date.getMonth() + 1);
         } else if (selectedPlan?.billingPeriod === BillingPeriod.ANNUAL) {
           date.setFullYear(date.getFullYear() + 1);
         }
         return date.toISOString();
       })()
     };
     const existingSubscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
     localStorage.setItem('userSubscriptions', JSON.stringify([...existingSubscriptions, subscriptionData]));
     // Redirect to confirmation page after short delay
    
     setTimeout(() => {
       navigate(`/payment-confirmation/${subscriptionData.id}`, {
         state: {
           subscription: subscriptionData,
           model: model,
           plan: selectedPlan
         }
       });
     }, 1000);
     */
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({
        ...errors,
        payment: 'Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.'
      });
      setIsSubmitting(false);
    }
  };
  // Get appropriate icon for plan
  const getPlanIcon = (billingPeriod: BillingPeriod) => {
    switch (billingPeriod) {
      case BillingPeriod.MONTHLY:
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case BillingPeriod.ANNUAL:
        return <Calendar className="h-5 w-5 text-green-600" />;
      case BillingPeriod.WEEKLY:
        return <Zap className="h-5 w-5 text-purple-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-blue-600" />;
    }
  };
  // Get billing period text
  const getBillingPeriodText = (billingPeriod: BillingPeriod) => {
    switch (billingPeriod) {
      case BillingPeriod.MONTHLY:
        return 'Mensuel';
      case BillingPeriod.ANNUAL:
        return 'Annuel';
      case BillingPeriod.WEEKLY:
        return 'Hebdomadaire';
      default:
        return '';
    }
  };
  // Handle payment method selection
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    // Clear any payment-specific errors when changing payment method
    const paymentFieldErrors = ['cardName', 'cardNumber', 'expiryDate', 'cvv'];
    const filteredErrors = {
      ...errors
    };
    paymentFieldErrors.forEach(field => {
      delete filteredErrors[field];
    });
    setErrors(filteredErrors);
  };
  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  if (!selectedPlan || !model) {
    return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Plan non trouvé
      </h1>
      <p className="text-gray-600 mb-6">
        Le plan que vous avez sélectionné n'est pas disponible.
      </p>
      <button onClick={() => navigate(`/models/${id}`)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Retour au modèle
      </button>
    </div>;
  }
  return <div className="min-h-screen bg-gray-50 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <button onClick={() => navigate(`/models/${id}`)} className="flex items-center text-gray-600 hover:text-blue-600 mb-6">
        <ChevronLeft className="h-5 w-5 mr-1" />
        Retour au modèle
      </button>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">Paiement et abonnement</h1>
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Récapitulatif de la commande
          </h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{model.name}</h3>
                <p className="text-sm text-gray-600">
                  par {model.developer.username}
                </p>
                <div className="mt-2 flex items-center">
                  {getPlanIcon(selectedPlan.billingPeriod)}
                  <span className="ml-2 font-medium text-gray-800">
                    {selectedPlan.name} (
                    {getBillingPeriodText(selectedPlan.billingPeriod)})
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {selectedPlan.billingPeriod === BillingPeriod.WEEKLY ? <>
                    {selectedPlan.apiCallsPrice} {selectedPlan.currency}
                    <span className="text-sm font-normal text-gray-600">
                      /appel
                    </span>
                  </> : <>
                    {selectedPlan.price} {selectedPlan.currency}
                    <span className="text-sm font-normal text-gray-600">
                      /
                      {selectedPlan.billingPeriod === BillingPeriod.MONTHLY ? 'mois' : 'an'}
                    </span>
                  </>}
                </div>
                {selectedPlan.billingPeriod !== BillingPeriod.WEEKLY && selectedPlan.apiCallsLimit && <p className="text-sm text-gray-600 mt-1">
                  {selectedPlan.apiCallsLimit.toLocaleString()} appels API
                  inclus
                </p>}
              </div>
            </div>
          </div>
        </div>
        {paymentSuccess ? <div className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-center">
          <CheckCircle className="h-8 w-8 text-green-500 mr-4" />
          <div>
            <h3 className="text-lg font-medium text-green-800">
              Paiement traité avec succès
            </h3>
            <p className="text-green-700">
              Redirection vers la page de confirmation...
            </p>
          </div>
        </div> : <form onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCardIcon className="h-5 w-5 mr-2 text-blue-600" />
              Méthode de paiement
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Payment Method Options */}
              {/*
              <div className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPaymentMethod === PaymentMethod.FLOUCI ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => handlePaymentMethodChange(PaymentMethod.FLOUCI)}>
                <div className="flex justify-center mb-3">
                  <img src="https://cdn.brandfetch.io/idZWBxd8fZ/w/1843/h/500/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1748973745923" alt="Flouci" className="h-8" />
                </div>
                <p className="text-center text-sm font-medium">Flouci</p>
              </div>
              */}
              <div className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedPaymentMethod === PaymentMethod.KONNECT ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`} onClick={() => handlePaymentMethodChange(PaymentMethod.KONNECT)}>
                <div className="flex justify-center mb-3">
                  <img src="https://s3.eu-west-3.amazonaws.com/konnect.network.public/logo_konnect_23a791d66b.svg" alt="Konnect" className="h-8" />
                </div>
                <p className="text-center text-sm font-medium">Konnect</p>
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

                    {/* {selectedPaymentMethod === PaymentMethod.FLOUCI && 'Flouci est une solution de paiement électronique tunisienne. Vous serez redirigé vers leur plateforme.'} */}
                    {selectedPaymentMethod === PaymentMethod.KONNECT && 'Konnect est un service de paiement mobile de la Banque Internationale Arabe de Tunisie (BIAT).'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Billing information - Always show */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Informations de facturation
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className={`flex items-center w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500`}>
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="flex-grow focus:outline-none" placeholder="votre@email.com" />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>}
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse *
                  </label>
                  <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} placeholder="Numéro et nom de rue" />
                  {errors.address && <p className="mt-1 text-sm text-red-600">
                    {errors.address}
                  </p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Ville *
                    </label>
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.city && <p className="mt-1 text-sm text-red-600">
                      {errors.city}
                    </p>}
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Code postal *
                    </label>
                    <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500`} />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-600">
                      {errors.zipCode}
                    </p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <div className={`flex items-center w-full px-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus-within:ring-blue-500 focus-within:border-blue-500`}>
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="flex-grow focus:outline-none" placeholder="+216 00 000 000" />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-start">
              <input type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={e => {
                setAgreeTerms(e.target.checked);
                if (errors.terms) {
                  setErrors({
                    ...errors,
                    terms: ''
                  });
                }
              }} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1" />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                J'accepte les{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  politique de confidentialité
                </a>
              </label>
            </div>
            {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
            {errors.payment && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {errors.payment}
              </p>
            </div>}
          </div>
          <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Lock className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-gray-600">
                Paiement sécurisé via une connexion chiffrée
              </span>
            </div>
            <button type="submit" disabled={isSubmitting} className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-medium ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'} flex items-center justify-center`}>
              {isSubmitting ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Traitement en cours...
              </> : <>
                Payer{' '}
                {`${selectedPlan.price} ${selectedPlan.currency}`}
              </>}
            </button>
          </div>
        </form>}
      </div>
    </div>
  </div>;
}