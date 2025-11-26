import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
interface FAQItem {
    question: string;
    answer: string;
    category: string;
}
export function FAQSubscriptionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedItem, setExpandedItem] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const faqItems: FAQItem[] = [{
        question: 'Comment fonctionnent les abonnements sur AI+ ?',
        answer: "Sur AI+, les abonnements sont gérés par les créateurs de modèles. Chaque créateur définit ses propres plans d'abonnement avec des fonctionnalités et des limites spécifiques. Vous pouvez vous abonner à différents modèles avec différents plans selon vos besoins. Les paiements sont récurrents (mensuels ou annuels) ou basés sur l'utilisation (pay-as-you-go).",
        category: 'Général'
    }, {
        question: 'Comment puis-je annuler mon abonnement ?',
        answer: "Vous pouvez annuler votre abonnement à tout moment en accédant à la page 'Mes Abonnements' dans votre compte. Trouvez l'abonnement que vous souhaitez annuler, cliquez sur 'Détails', puis sur 'Annuler l'abonnement'. Votre abonnement restera actif jusqu'à la fin de la période de facturation en cours, sauf indication contraire dans les conditions spécifiques du créateur.",
        category: 'Gestion'
    }, {
        question: "Que se passe-t-il si j'atteins ma limite d'appels API ?",
        answer: "Si vous atteignez la limite d'appels API définie dans votre plan d'abonnement, les appels supplémentaires seront soit refusés, soit facturés en supplément selon les conditions du plan. Vous recevrez une notification lorsque vous approcherez de votre limite. Vous pouvez suivre votre utilisation dans la section 'Statistiques d'utilisation' de votre compte.",
        category: 'Utilisation'
    }, {
        question: "Puis-je changer de plan d'abonnement ?",
        answer: "Oui, vous pouvez passer à un plan supérieur à tout moment. Le changement prendra effet immédiatement et la différence de prix sera calculée au prorata. Pour passer à un plan inférieur, le changement prendra généralement effet à la fin de votre période de facturation actuelle. Accédez à 'Mes Abonnements', sélectionnez l'abonnement concerné, puis cliquez sur 'Changer de plan'.",
        category: 'Gestion'
    }, {
        question: 'Comment obtenir une facture pour mon abonnement ?',
        answer: "Les factures sont automatiquement générées à chaque paiement et sont disponibles dans la section 'Mes Abonnements' de votre compte. Vous pouvez également les consulter dans la section 'Factures' de votre tableau de bord. Chaque facture peut être téléchargée au format PDF ou envoyée par email.",
        category: 'Facturation'
    }, {
        question: 'Quelles méthodes de paiement sont acceptées ?',
        answer: 'Nous acceptons plusieurs méthodes de paiement, notamment les cartes de crédit/débit (Visa, Mastercard), PayPal, ainsi que des solutions de paiement locales comme Flouci et Konnect pour les utilisateurs en Tunisie. Vous pouvez gérer vos méthodes de paiement dans les paramètres de votre compte.',
        category: 'Paiement'
    }, {
        question: 'Puis-je obtenir un remboursement ?',
        answer: "Les politiques de remboursement sont définies par chaque créateur de modèle. En général, vous pouvez demander un remboursement dans les 14 jours suivant votre abonnement si vous n'avez pas utilisé le service de manière significative. Contactez le support client ou le créateur directement pour toute demande de remboursement.",
        category: 'Facturation'
    }, {
        question: 'Comment sont protégées mes informations de paiement ?',
        answer: 'Nous ne stockons pas directement vos informations de carte de crédit. Toutes les transactions sont traitées par des fournisseurs de paiement sécurisés (Stripe, PayPal, etc.) utilisant un chiffrement SSL/TLS. Nos systèmes sont régulièrement audités pour garantir la conformité aux normes de sécurité PCI DSS.',
        category: 'Sécurité'
    }, {
        question: "Que faire en cas d'échec de paiement ?",
        answer: "En cas d'échec de paiement, nous essaierons de débiter votre compte à nouveau dans les jours suivants. Vous recevrez une notification par email vous informant du problème. Vous pouvez vous connecter à votre compte pour mettre à jour vos informations de paiement. Si le problème persiste, votre abonnement pourrait être suspendu après plusieurs tentatives infructueuses.",
        category: 'Paiement'
    }, {
        question: 'Les prix incluent-ils la TVA ?',
        answer: "Les prix affichés peuvent inclure ou non la TVA, selon votre pays de résidence et le statut fiscal du créateur. Le détail des taxes est toujours clairement indiqué sur vos factures. Pour les entreprises disposant d'un numéro de TVA valide dans l'UE, la TVA peut être déduite conformément aux règles fiscales en vigueur.",
        category: 'Facturation'
    }];
    const categories = Array.from(new Set(faqItems.map(item => item.category)));
    const toggleItem = (index: number) => {
        setExpandedItem(expandedItem === index ? null : index);
    };
    const filteredFAQs = faqItems.filter(item => {
        const matchesSearch = searchQuery === '' || item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === null || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });
    return <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex items-center mb-6">
                    <HelpCircle className="h-6 w-6 text-blue-600 mr-2" />
                    <h1 className="text-2xl font-bold">FAQ sur les abonnements</h1>
                </div>
                {/* Search */}
                <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Rechercher dans la FAQ..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button className={`px-3 py-1 text-sm rounded-full ${activeCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => setActiveCategory(null)}>
                        Tous
                    </button>
                    {categories.map(category => <button key={category} className={`px-3 py-1 text-sm rounded-full ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => setActiveCategory(category)}>
                        {category}
                    </button>)}
                </div>
                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFAQs.length > 0 ? filteredFAQs.map((item, index) => <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100" onClick={() => toggleItem(index)}>
                            <span className="font-medium text-gray-900">
                                {item.question}
                            </span>
                            {expandedItem === index ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                        </button>
                        {expandedItem === index && <div className="p-4 bg-white">
                            <p className="text-gray-700">{item.answer}</p>
                        </div>}
                    </div>) : <div className="text-center py-8">
                        <p className="text-gray-500">
                            Aucun résultat trouvé pour votre recherche.
                        </p>
                    </div>}
                </div>
            </div>
            <div className="bg-blue-50 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Vous n'avez pas trouvé de réponse ?
                </h2>
                <p className="text-gray-700 mb-4">
                    Notre équipe de support est disponible pour répondre à toutes vos
                    questions concernant les abonnements et les paiements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center">
                        Contacter le support
                    </Link>
                    <Link to="/docs/subscriptions" className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center">
                        Documentation détaillée
                    </Link>
                </div>
            </div>
        </div>
    </div>;
}