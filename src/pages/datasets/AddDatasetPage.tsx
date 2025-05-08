import React, { useState } from 'react'
import {
    Upload,
    FileText,
    Package
} from 'lucide-react'
export function AddDatasetPage() {
    const [files, setFiles] = useState<FileList | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
        }, 2000)
    }
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Ajouter un Dataset
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Partagez vos données avec la communauté AI+
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                Informations générales
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Nom du dataset
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="type"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Type de données
                                        </label>
                                        <select
                                            id="type"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Sélectionner un type</option>
                                            <option value="text">Texte</option>
                                            <option value="image">Images</option>
                                            <option value="audio">Audio</option>
                                            <option value="video">Vidéo</option>
                                            <option value="tabular">Données tabulaires</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="language"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Langue
                                        </label>
                                        <select
                                            id="language"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">Sélectionner une langue</option>
                                            <option value="ar">Arabe</option>
                                            <option value="fr">Français</option>
                                            <option value="en">Anglais</option>
                                            <option value="tn">Dialecte tunisien</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* File Upload */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6">Fichiers</h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="mt-4">
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <span className="mt-2 block text-sm font-medium text-blue-600 hover:text-blue-500">
                                                Sélectionner des fichiers
                                            </span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                multiple
                                                className="sr-only"
                                                onChange={(e) => setFiles(e.target.files)}
                                            />
                                        </label>
                                        <p className="mt-1 text-sm text-gray-500">
                                            ZIP, CSV, JSON jusqu'à 50GB
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {files && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-medium text-gray-700">
                                        Fichiers sélectionnés:
                                    </h3>
                                    <ul className="mt-2 divide-y divide-gray-200">
                                        {Array.from(files).map((file, index) => (
                                            <li key={index} className="py-3 flex items-center">
                                                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                                <span className="text-sm text-gray-900">
                                                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{' '}
                                                    MB)
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/* License & Terms */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                Licence et conditions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="license"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Type de licence
                                    </label>
                                    <select
                                        id="license"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Sélectionner une licence</option>
                                        <option value="mit">MIT</option>
                                        <option value="apache">Apache 2.0</option>
                                        <option value="gpl">GPL 3.0</option>
                                        <option value="cc">Creative Commons</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            required
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            J'accepte les conditions d'utilisation et je confirme
                                            avoir les droits nécessaires pour partager ces données
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-gray-200">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                            >
                                <Package className="h-5 w-5 mr-2" />
                                Publier le dataset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
