import React from "react";
import { useNavigate } from "react-router-dom";
import { useSuccess } from "../context/SuccessContext";
import { CheckCircle, XCircle } from "lucide-react";

/**
 * A modal component to display success messages.
 * It shows a success icon, message, and buttons to continue or close the modal.
 * The modal is displayed when there is a success state in the SuccessContext.
 * The "Continue" button redirects to a specified link if provided.
 */
export const SuccessModal: React.FC = () => {
    const { success, clearSuccess } = useSuccess();
    const navigate = useNavigate();

    if (!success) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-green-100 text-green-600 p-3 rounded-full shadow-sm">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Succès
                </h2>
                <p className="text-gray-600 mb-6">{success.message}</p>

                <div className="flex justify-center space-x-3">
                    {success.redirect && (
                        <button
                            onClick={() => {
                                clearSuccess();
                                // check if the redirect link is external link and not internal link
                                if (success.redirect!.startsWith("http")) {
                                    window.location.href = success.redirect!;
                                    return;
                                } else {
                                    navigate(success.redirect!);
                                }
                            }}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all shadow-md"
                        >
                            Continuer
                        </button>
                    )}

                    <button
                        onClick={clearSuccess}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 border rounded-xl transition-all"
                    >
                        <XCircle className="w-5 h-5" /> Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};
