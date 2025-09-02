// src/components/ErrorModal.tsx
import { useError } from "../context/ErrorContext";
import { useNavigate } from "react-router-dom";
import { AlertCircle, LogIn, XCircle } from "lucide-react";

export const ErrorModal = () => {
    const { error, clearError } = useError();
    const navigate = useNavigate();

    if (!error) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full shadow-sm">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Erreur
                </h2>
                <p className="text-gray-600 mb-6">{error.message}</p>

                <div className="flex justify-center space-x-3">
                    {error.redirect && (
                        <button
                            onClick={() => {
                                clearError();
                                navigate(error.redirect!);
                            }}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                        >
                            <LogIn className="w-5 h-5" /> Se connecter
                        </button>
                    )}

                    <button
                        onClick={clearError}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-xl"
                    >
                        <XCircle className="w-5 h-5" /> Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};
