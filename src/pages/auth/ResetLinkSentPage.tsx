import { MailIcon } from "lucide-react";

export function ResetLinkSentPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Lien envoyé</h2>
                    <p className="mt-2 text-gray-600">
                        Si un compte avec cet email existe, un lien de réinitialisation a été envoyé.
                        <br />
                        Vérifiez votre boîte de réception.
                    </p>
                </div>
                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="flex flex-col items-center space-y-4">
                        <MailIcon className="h-12 w-12 text-blue-600" />
                        <p className="text-gray-700 text-center">
                            Un email contenant le lien de réinitialisation a été envoyé à votre adresse email.
                        </p>
                        <a
                            href="/login"
                            className="text-blue-600 hover:text-blue-500 font-medium"
                        >
                            Retour à la connexion
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
