import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
export function ContactPage() {
  return <div className="min-h-screen bg-gray-50 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-2xl font-semibold mb-6">
            Envoyez-nous un message
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sujet
              </label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea rows={6} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <button type="submit" className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>;
}