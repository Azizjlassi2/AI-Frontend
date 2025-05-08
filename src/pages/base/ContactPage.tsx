import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function ContactPage() {


  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post('http://localhost:8080/api/v1/contact/us', {
        username,
        email,
        subject,
        message
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        withCredentials: true,
      });
      if (response.status === 201) {
        setSuccess("Message Envoyé avec success !")
        setLoading(false)
        setSubject('')
        setMessage('')
      }

    }
    catch (err) {
      navigate("/500");
    }
  }

  return <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Contactez-nous
      </h1>
      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <MailIcon className="h-6 w-6 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-gray-600">contact@aiplus.tn</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <PhoneIcon className="h-6 w-6 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Téléphone</h3>
          <p className="text-gray-600">+216 XX XXX XXX</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <MapPinIcon className="h-6 w-6 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">Adresse</h3>
          <p className="text-gray-600">Tunis, Tunisie</p>
        </div>
      </div>
      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        {success && (
          <div className="mb-6 p-4 text-green-700 bg-green-100 rounded-lg flex justify-between items-center">
            <span>{success}</span>
            <button
              onClick={() => setSuccess('')}
              className="text-green-700 font-bold hover:underline"
            >
              X
            </button>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6">
          Envoyez-nous un message
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input type="text"
                required
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input type="email" id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sujet
            </label>
            <input type="text" id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea rows={6} id="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="pt-8 border-t border-gray-200">
            {/* set a loadingicon (lucide-react) while sending message and getting 201 response */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <MailIcon className="h-5 w-5 mr-2" />
              )}
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

}
