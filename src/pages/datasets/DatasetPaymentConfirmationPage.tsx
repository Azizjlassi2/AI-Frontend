import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Database, Download, FileText, Home, ArrowRight, Calendar } from 'lucide-react';
interface PurchasedDataset {
    id: number;
    name: string;
    purchaseDate: string;
    price: number;
    currency: string;
    invoiceId: string;
}
export function DatasetPaymentConfirmationPage() {
    const {
        datasetId
    } = useParams<{
        datasetId: string;
    }>();
    const [purchase, setPurchase] = useState<PurchasedDataset | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPurchaseDetails = async () => {
            setLoading(true);
            try {
                // In a real app, this would be an API call
                await new Promise(resolve => setTimeout(resolve, 800));
                // Get purchase details from localStorage
                const purchasedDatasets = JSON.parse(localStorage.getItem('purchasedDatasets') || '[]');
                const foundPurchase = purchasedDatasets.find((p: PurchasedDataset) => p.id === parseInt(datasetId || '0'));
                if (foundPurchase) {
                    setPurchase(foundPurchase);
                }
            } catch (err) {
                console.error('Error fetching purchase details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchaseDetails();
    }, [datasetId]);
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    if (loading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    return <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex flex-col items-center mb-8">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Paiement réussi !
                    </h1>
                    <p className="text-gray-600 text-center">
                        Merci pour votre achat. Vous avez maintenant accès complet au
                        dataset.
                    </p>
                </div>
                {purchase ? <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-start mb-4">
                            <Database className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                            <div>
                                <h2 className="text-lg font-semibold">{purchase.name}</h2>
                                <p className="text-sm text-gray-500">
                                    Acheté le {formatDate(purchase.purchaseDate)}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-500">Montant payé</p>
                                <p className="font-medium">
                                    {purchase.price} {purchase.currency}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Numéro de facture</p>
                                <p className="font-medium">{purchase.invoiceId}</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <Link to={`/client/datasets/${purchase.id}/download`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger le dataset
                            </Link>
                            <Link to={`/client/invoices/dataset/${purchase.invoiceId}`} className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50">
                                <FileText className="h-4 w-4 mr-2" />
                                Voir la facture
                            </Link>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-medium mb-4">
                            Que faire ensuite ?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link to="/client/datasets" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-start">
                                <Database className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Mes datasets</h4>
                                    <p className="text-sm text-gray-500">
                                        Gérer tous vos datasets achetés
                                    </p>
                                </div>
                            </Link>
                            <Link to="/datasets" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-start">
                                <ArrowRight className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                                <div>
                                    <h4 className="font-medium">Explorer plus</h4>
                                    <p className="text-sm text-gray-500">
                                        Découvrir d'autres datasets
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center pt-6">
                        <Link to="/" className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800">
                            <Home className="h-4 w-4 mr-2" />
                            Retour à l'accueil
                        </Link>
                    </div>
                </div> : <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                        Aucun détail d'achat trouvé pour ce dataset.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/datasets" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Explorer les datasets
                        </Link>
                        <Link to="/client/datasets" className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50">
                            Mes datasets
                        </Link>
                    </div>
                </div>}
            </div>
        </div>
    </div>;
}