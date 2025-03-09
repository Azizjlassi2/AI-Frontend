import { UploadCloud, Code, FileText, Lock, Globe, BookOpen, Package } from "lucide-react";
import { useState } from "react";

export function AddModelPage() {
    const [modelData, setModelData] = useState({
        name: '',
        description: '',
        category: '',
        framework: 'PyTorch',
        license: 'MIT',
        version: '1.0.0',
        visibility: 'public',
        documentation: null as File | null
    });

    const categories = [
        'Vision par ordinateur',
        'Traitement du langage naturel',
        'Reconnaissance vocale',
        'Recommandation',
        'Séries temporelles',
        'Génération de contenu'
    ];

    const licenses = [
        'MIT',
        'Apache 2.0',
        'GPL-3.0',
        'Propriétaire',
        'CC BY-NC-SA 4.0'
    ];

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Logique de soumission
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
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
                                <h2 className="text-xl font-semibold">Informations du modèle</h2>
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
                                        onChange={(e) => setModelData({ ...modelData, name: e.target.value })}
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
                                        onChange={(e) => setModelData({ ...modelData, description: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catégorie *
                                        </label>
                                        <select
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            value={modelData.category}
                                            onChange={(e) => setModelData({ ...modelData, category: e.target.value })}
                                        >
                                            <option value="">Sélectionner une catégorie</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Framework *
                                        </label>
                                        <select
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            value={modelData.framework}
                                            onChange={(e) => setModelData({ ...modelData, framework: e.target.value })}
                                        >
                                            <option value="PyTorch">PyTorch</option>
                                            <option value="TensorFlow">TensorFlow</option>
                                            <option value="Keras">Keras</option>
                                            <option value="ONNX">ONNX</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section Configuration technique */}
                        <div>
                            <div className="flex items-center mb-4">
                                <Code className="h-5 w-5 text-blue-600 mr-2" />
                                <h2 className="text-xl font-semibold">Configuration technique</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Version *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        value={modelData.version}
                                        onChange={(e) => setModelData({ ...modelData, version: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Licence *
                                    </label>
                                    <select
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        value={modelData.license}
                                        onChange={(e) => setModelData({ ...modelData, license: e.target.value })}
                                    >
                                        {licenses.map((license) => (
                                            <option key={license} value={license}>{license}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section Documentation */}
                        <div>
                            <div className="flex items-center mb-4">
                                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                                <h2 className="text-xl font-semibold">Documentation</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg border-2 border-dashed border-blue-600 cursor-pointer hover:bg-blue-50 transition-colors">
                                        <UploadCloud className="h-8 w-8" />
                                        <span className="mt-2 text-sm">Ajouter une documentation</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.md,.txt"
                                            onChange={(e) => setModelData({ ...modelData, documentation: e.target.files?.[0] || null })}
                                        />
                                    </label>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Formats acceptés : PDF, Markdown (max 10MB)
                                </p>
                            </div>
                        </div>

                        {/* Section Visibilité */}
                        <div>
                            <div className="flex items-center mb-4">
                                {modelData.visibility === 'public' ? (
                                    <Globe className="h-5 w-5 text-green-600 mr-2" />
                                ) : (
                                    <Lock className="h-5 w-5 text-red-600 mr-2" />
                                )}
                                <h2 className="text-xl font-semibold">Visibilité</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    className={`p-4 rounded-lg border-2 ${modelData.visibility === 'public'
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    onClick={() => setModelData({ ...modelData, visibility: 'public' })}
                                >
                                    <div className="font-medium">Public</div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Visible par tous les utilisateurs
                                    </p>
                                </button>

                                <button
                                    type="button"
                                    className={`p-4 rounded-lg border-2 ${modelData.visibility === 'private'
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    onClick={() => setModelData({ ...modelData, visibility: 'private' })}
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
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                            >
                                <Package className="h-5 w-5 mr-2" />
                                Publier le modèle
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}