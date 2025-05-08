import { Scale, ShieldAlert, Lock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                {/* En-tête */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Scale className="h-12 w-12 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Conditions Générales d'Utilisation
                    </h1>
                    <p className="text-gray-600">Dernière mise à jour : 15 septembre 2024</p>
                </div>

                {/* Contenu */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="flex items-center mb-6">
                            <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
                            <h2 className="text-2xl font-semibold">1. Acceptation des Conditions</h2>
                        </div>
                        <p className="mb-8">
                            En utilisant la plateforme AI+ Tunisie , vous acceptez
                            pleinement et sans réserve les présentes Conditions Générales d'Utilisation
                            (CGU). Ces conditions régissent votre accès et votre utilisation des services
                            d'intelligence artificielle proposés.
                        </p>

                        <div className="flex items-center mb-6">
                            <ShieldAlert className="h-6 w-6 text-blue-600 mr-2" />
                            <h2 className="text-2xl font-semibold">2. Responsabilités des Utilisateurs</h2>
                        </div>
                        <ul className="list-disc pl-6 mb-8 space-y-4">
                            <li>Garantir l'exactitude des informations fournies</li>
                            <li>Respecter les lois tunisiennes en vigueur (Loi n°2004-63 sur la protection des données personnelles)</li>
                            <li>Ne pas utiliser la Plateforme à des fins illégales ou nuisibles</li>
                            <li>Maintenir la confidentialité de vos identifiants</li>
                        </ul>

                        <div className="flex items-center mb-6">
                            <Lock className="h-6 w-6 text-blue-600 mr-2" />
                            <h2 className="text-2xl font-semibold">3. Propriété Intellectuelle</h2>
                        </div>
                        <div className="mb-8 space-y-4">
                            <p>
                                Les modèles d'IA publiés restent la propriété de leurs créateurs respectifs.
                                La Plateforme agit comme hébergeur technique selon les dispositions de la
                                Loi tunisienne sur le commerce électronique (2000).
                            </p>
                            <p>
                                Les utilisateurs conservent les droits sur leurs données mais accordent
                                une licence non-exclusive à AI+ pour le fonctionnement des services.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">4. Modèles d'IA</h2>
                        <ul className="list-disc pl-6 mb-8 space-y-4">
                            <li>Les créateurs garantissent disposer des droits nécessaires</li>
                            <li>Conformité RGPD pour les utilisateurs européens</li>
                            <li>Transparence des algorithmes selon les normes NT 181.91</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mb-4">5. Paiements et Facturation</h2>
                        <div className="mb-8 space-y-4">
                            <p>
                                Les transactions sont soumises à la réglementation tunisienne des
                                services financiers (Loi 2016-48). Les taxes (TVA 19%) sont incluses.
                            </p>
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">6. Limitations de Responsabilité</h2>
                        <div className="mb-8 space-y-4">
                            <p>
                                AI+ décline toute responsabilité concernant :
                            </p>
                            <ul className="list-disc pl-6">
                                <li>L'usage détourné des modèles</li>
                                <li>Les préjudices découlant de décisions automatisées</li>
                                <li>Les interruptions techniques imprévues</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">7. Résiliation</h2>
                        <p className="mb-8">
                            AI+ se réserve le droit de suspendre tout compte en cas de violation
                            des CGU, conformément aux articles 84 et suivants du Code des Obligations
                            et des Contrats tunisien.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">8. Loi Applicable</h2>
                        <p className="mb-8">
                            Les présentes CGU sont régies par le droit tunisien. Tout litige relèvera
                            des tribunaux compétents de Tunis.
                        </p>

                        <div className="border-t pt-8">
                            <p className="text-sm text-gray-600">
                                Pour toute question :
                                <Link to="/contact" className="text-blue-600 ml-2">
                                    Contactez notre service juridique
                                </Link>
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Consultez également nos
                                <Link to="/privacy" className="text-blue-600 ml-2">
                                    Politiques de Confidentialité
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/register"
                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Retour à l'inscription
                    </Link>
                </div>
            </div>
        </div>
    );
}