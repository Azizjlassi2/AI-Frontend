import axios from "axios";
import { useState, useEffect } from "react";

export function DeveloperSettingsPage() {
    const [password, setPassword] = useState("");
    const [developerInfo, setDeveloperInfo] = useState({
        githubUrl: "",
        linkedInUrl: "",
        portfolioUrl: "",
        bio: "",
        websiteUrl: ""
    });

    // Charger les données existantes au montage du composant
    useEffect(() => {
        const fetchDeveloperData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/developer", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                });

                setDeveloperInfo({
                    githubUrl: response.data.githubUrl || "",
                    linkedInUrl: response.data.linkedInUrl || "",
                    portfolioUrl: response.data.portfolioUrl || "",
                    bio: response.data.bio || "",
                    websiteUrl: response.data.websiteUrl || ""
                });
            } catch (error) {
                console.error("Error fetching developer data:", error);
            }
        };

        fetchDeveloperData();
    }, []);

    const handleProfileSave = async () => {
        try {
            const response = await axios.put(
                "http://localhost:8080/api/developer",
                developerInfo,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                alert("Profil développeur mis à jour avec succès");
            }
        } catch (error) {
            alert("Erreur lors de la mise à jour du profil");
        }
    };

    const handlePasswordSave = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/reset-password",
                {
                    email: localStorage.getItem("email"),
                    newPassword: password
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                alert("Mot de passe mis à jour avec succès");
                setPassword("");
            }
        } catch (error) {
            alert("Erreur lors de la mise à jour du mot de passe");
        }
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        setDeveloperInfo({
            ...developerInfo,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold mb-8">Paramètres du Développeur</h1>

            {/* Section Profil Développeur */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Profil Développeur</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">GitHub</label>
                        <input
                            type="url"
                            name="githubUrl"
                            value={developerInfo.githubUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">LinkedIn</label>
                        <input
                            type="url"
                            name="linkedInUrl"
                            value={developerInfo.linkedInUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Portfolio</label>
                        <input
                            type="url"
                            name="portfolioUrl"
                            value={developerInfo.portfolioUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://votreportfolio.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Site Web</label>
                        <input
                            type="url"
                            name="websiteUrl"
                            value={developerInfo.websiteUrl}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://votresite.com"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={developerInfo.bio}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg h-32"
                        placeholder="Décrivez votre expérience et vos compétences..."
                    />
                </div>

                <button
                    onClick={handleProfileSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Sauvegarder le profil
                </button>
            </div>

            {/* Section Sécurité */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Sécurité du Compte</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Adresse e-mail</label>
                    <input
                        type="email"
                        value={localStorage.getItem("email") || ""}
                        readOnly
                        className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nouveau mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>

                <button
                    onClick={handlePasswordSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Changer le mot de passe
                </button>
            </div>
        </div>
    );
}