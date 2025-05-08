import { Code, FileText, GitBranch, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export function ModelDocumentationPage() {
    const versions = [
        { version: "v2.1.0", date: "2024-03-15", changes: "Ajout support ONNX" },
        { version: "v2.0.0", date: "2024-02-01", changes: "Optimisation mémoire" }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center">
                            <FileText className="h-8 w-8 text-blue-600 mr-3" />
                            Documentation Technique
                        </h1>
                        <p className="text-gray-600 mt-2">MedTun-CXR - v2.1.0</p>
                    </div>

                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <nav className="space-y-3">
                                <a href="#quickstart" className="flex items-center text-gray-600 hover:text-blue-600">
                                    <Code className="h-4 w-4 mr-2" />
                                    Démarrage rapide
                                </a>
                                <a href="#api-reference" className="flex items-center text-gray-600 hover:text-blue-600">
                                    <Terminal className="h-4 w-4 mr-2" />
                                    Référence API
                                </a>
                                <a href="#versions" className="flex items-center text-gray-600 hover:text-blue-600">
                                    <GitBranch className="h-4 w-4 mr-2" />
                                    Versions
                                </a>
                            </nav>
                        </div>
                    </div>

                    {/* Contenu */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <section id="quickstart">
                                <h2 className="text-xl font-semibold mb-4">Démarrage Rapide</h2>
                                <SyntaxHighlighter language="bash">
                                    {`pip install aiplus-sdk\nfrom aiplus import MedTunCXR\n\nmodel = MedTunCXR(api_key="VOTRE_CLE")\nresponse = model.predict("radiographie.jpg")`}
                                </SyntaxHighlighter>
                            </section>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <section id="versions">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <GitBranch className="h-5 w-5 mr-2" />
                                    Historique des Versions
                                </h2>
                                <div className="space-y-4">
                                    {versions.map((version) => (
                                        <div key={version.version} className="border-l-2 border-blue-600 pl-4">
                                            <div className="flex items-center">
                                                <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                                                    {version.version}
                                                </div>
                                                <span className="ml-2 text-gray-500 text-sm">{version.date}</span>
                                            </div>
                                            <p className="mt-1 text-gray-600">{version.changes}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}