import axios from "axios";
import { useState } from "react";

export function ClientSettingsPage() {
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState(true);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleNotificationToggle = () => setNotification(!notification);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/reset-password", {
                email: localStorage.getItem("email"),
                newPassword: password
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                alert("Mot de passe mis à jour avec succès");
            } else {
                alert("Erreur lors de la mise à jour du mot de passe");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe :", error);
            alert("Erreur lors de la mise à jour du mot de passe");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container mx-auto max-w-3xl bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-6">Paramètres du compte</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Adresse e-mail</label>
                        <input
                            type="email"
                            value={localStorage.getItem("email") || ""}
                            readOnly

                            className="w-full p-3 border rounded-lg mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Nouveau mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-3 border rounded-lg mt-1"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={notification}
                            onChange={handleNotificationToggle}
                            className="h-5 w-5"
                        />
                        <span>Recevoir des notifications par e-mail</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                    >
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
}
