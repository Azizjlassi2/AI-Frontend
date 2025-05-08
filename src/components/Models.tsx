import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Models() {
  const models = [{
    name: 'BERT',
    creator: 'Google',
    description: 'Bidirectional Encoder Representations from Transformers',
    downloads: '2.3M',
    image: 'https://huggingface.co/front/assets/huggingface_logo.svg'
  }, {
    name: 'GPT-2',
    creator: 'OpenAI',
    description: 'Language model for text generation',
    downloads: '1.8M',
    image: 'https://huggingface.co/front/assets/huggingface_logo.svg'
  }, {
    name: 'T5',
    creator: 'Google',
    description: 'Text-to-Text Transfer Transformer',
    downloads: '1.2M',
    image: 'https://huggingface.co/front/assets/huggingface_logo.svg'
  }, {
    name: 'CLIP',
    creator: 'OpenAI',
    description: 'Connects text and images',
    downloads: '950K',
    image: 'https://huggingface.co/front/assets/huggingface_logo.svg'
  }];
  return <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Modèles populaires
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez des milliers de modèles open-source pour différentes
          tâches.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map((model, index) => <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <Link to="/models/1" className="text-lg font-semibold text-gray-900">
                  {model.name}
                </Link>
                <p className="text-sm text-gray-500">{model.creator}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{model.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {model.downloads} téléchargements
              </span>
              <Link to="/models/1" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir le modèle →
              </Link>
            </div>
          </div>
        </div>)}
      </div>
      <div className="mt-12 text-center">
        <Link to="/models" className="inline-block bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-2 text-base font-medium">
          Explorer tous les modèles
        </Link>
      </div>
    </div>
  </section>;
}