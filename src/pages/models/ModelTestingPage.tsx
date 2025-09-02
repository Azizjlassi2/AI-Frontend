import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Code, Clock, BarChart2, CreditCard, CheckCircle, AlertTriangle, Terminal, Copy, Download, RotateCw, PlayCircle, Layers } from 'lucide-react';
interface ModelExample {
  id: number;
  name: string;
  input: string;
  output: string;
  description: string;
}
interface ModelTestingProps {
  id: string;
  name: string;
  description: string;
  examples: ModelExample[];
  apiEndpoint: string;
  requestFormat: string;
  responseFormat: string;
}
export function ModelTestingPage() {
  const {
    modelId
  } = useParams<{
    modelId: string;
  }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<ModelTestingProps | null>(null);
  // Testing state
  const [input, setInput] = useState('');
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const [apiCallCount, setApiCallCount] = useState(0);
  useEffect(() => {
    const fetchModelData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mock model data
        const mockModel: ModelTestingProps = {
          id: modelId || '1',
          name: 'ArabicBERT',
          description: 'Un modèle BERT pré-entraîné sur un large corpus de textes arabes, optimisé pour les tâches de traitement du langage naturel en arabe standard moderne et dialectal tunisien.',
          examples: [{
            id: 1,
            name: 'Analyse de sentiment',
            input: 'مرحبا بكم في تونس الخضراء. نحن سعداء بزيارتكم.',
            output: JSON.stringify({
              prediction: 'positive',
              confidence: 0.92,
              analysis: {
                positive: 0.92,
                neutral: 0.06,
                negative: 0.02
              }
            }, null, 2),
            description: "Analyse le sentiment d'un texte en arabe"
          }, {
            id: 2,
            name: 'Classification de texte',
            input: 'أعلنت وزارة الصحة عن تسجيل 150 إصابة جديدة بفيروس كورونا',
            output: JSON.stringify({
              prediction: 'news',
              confidence: 0.87,
              categories: {
                news: 0.87,
                social: 0.08,
                sports: 0.03,
                politics: 0.02
              }
            }, null, 2),
            description: 'Classifie un texte en arabe selon sa catégorie'
          }, {
            id: 3,
            name: "Extraction d'entités nommées",
            input: 'زار الرئيس قيس سعيد مدينة سوسة يوم الأحد للقاء المواطنين.',
            output: JSON.stringify({
              entities: [{
                text: 'قيس سعيد',
                type: 'PERSON',
                start: 10,
                end: 18
              }, {
                text: 'سوسة',
                type: 'LOCATION',
                start: 25,
                end: 29
              }, {
                text: 'الأحد',
                type: 'DATE',
                start: 34,
                end: 39
              }]
            }, null, 2),
            description: "Extrait les entités nommées d'un texte en arabe"
          }],
          apiEndpoint: '/api/v1/models/arabicbert/predict',
          requestFormat: JSON.stringify({
            text: 'Votre texte en arabe ici',
            options: {
              return_confidence: true,
              return_details: true
            }
          }, null, 2),
          responseFormat: JSON.stringify({
            prediction: 'positive/negative/neutral',
            confidence: 0.95,
            processing_time: '120ms'
          }, null, 2)
        };
        setModel(mockModel);
        if (mockModel.examples.length > 0) {
          setInput(mockModel.examples[0].input);
          setSelectedExample(mockModel.examples[0].id);
        }
      } catch (err) {
        console.error('Error fetching model data:', err);
        setError('Une erreur est survenue lors du chargement des données du modèle');
      } finally {
        setLoading(false);
      }
    };
    fetchModelData();
  }, [modelId]);
  const handleExampleSelect = (exampleId: number) => {
    if (!model) return;
    const example = model.examples.find(ex => ex.id === exampleId);
    if (example) {
      setInput(example.input);
      setSelectedExample(exampleId);
      setResult(null);
      setProcessingTime(null);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || processing) return;
    setProcessing(true);
    setResult(null);
    setProcessingTime(null);
    try {
      // Simulate API call
      const startTime = performance.now();
      // Add random delay to simulate processing
      const delay = 800 + Math.random() * 1200;
      await new Promise(resolve => setTimeout(resolve, delay));
      // Get result based on selected example or input
      let resultOutput = '';
      if (selectedExample) {
        const example = model?.examples.find(ex => ex.id === selectedExample);
        if (example) {
          resultOutput = example.output;
        }
      } else {
        // Generate a mock result
        resultOutput = JSON.stringify({
          prediction: Math.random() > 0.5 ? 'positive' : 'negative',
          confidence: (0.7 + Math.random() * 0.25).toFixed(2),
          processing_time: `${Math.floor(delay)}ms`
        }, null, 2);
      }
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
      setResult(resultOutput);
      setApiCallCount(prev => prev + 1);
    } catch (err) {
      console.error('Error processing request:', err);
      setResult(JSON.stringify({
        error: 'Une erreur est survenue lors du traitement de la requête',
        code: 'PROCESSING_ERROR',
        status: 500
      }, null, 2));
    } finally {
      setProcessing(false);
    }
  };
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copié dans le presse-papiers');
    }).catch(err => {
      console.error('Erreur lors de la copie:', err);
    });
  };
  const handleSubscribe = () => {
    navigate(`/models/checkout/${modelId}`);
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }
  if (error || !model) {
    return <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h1>
            <p className="text-gray-600 mb-6">
              {error || 'Modèle non trouvé'}
            </p>
            <Link to="/models" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Retour aux modèles
            </Link>
          </div>
        </div>
      </div>
    </div>;
  }
  return <div className="min-h-screen bg-gray-50 p-8">
    <div className="container mx-auto max-w-6xl">
      <div className="mb-6">
        <Link to={`/models/${model.id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux détails du modèle
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Terminal className="h-6 w-6 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Tester {model.name}
              </h1>
            </div>
            <div>
              <button onClick={handleSubscribe} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <CreditCard className="h-4 w-4 mr-2" />
                S'abonner à ce modèle
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-gray-600">{model.description}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Examples panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                  <Layers className="h-5 w-5 text-blue-600 mr-2" />
                  Exemples
                </h3>
                <div className="space-y-3">
                  {model.examples.map(example => <button key={example.id} onClick={() => handleExampleSelect(example.id)} className={`w-full text-left p-3 rounded-lg transition-colors ${selectedExample === example.id ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-gray-200 hover:bg-blue-50'}`}>
                    <div className="font-medium text-gray-900 mb-1">
                      {example.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {example.description}
                    </div>
                  </button>)}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div>Appels API effectués</div>
                    <div className="font-medium">{apiCallCount}</div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Les appels effectués pendant la période d'essai sont
                    limités
                  </div>
                </div>
              </div>
            </div>
            {/* Testing panel */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="input" className="block text-sm font-medium text-gray-700">
                      Entrée
                    </label>
                    <button type="button" onClick={() => handleCopyToClipboard(input)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                      <Copy className="h-3 w-3 mr-1" />
                      Copier
                    </button>
                  </div>
                  <textarea id="input" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" value={input} onChange={e => {
                    setInput(e.target.value);
                    setSelectedExample(null);
                  }} placeholder="Entrez du texte en arabe pour tester le modèle..." dir="rtl" />
                </div>
                <div className="flex justify-between mb-6">
                  <button type="button" onClick={() => {
                    setInput('');
                    setSelectedExample(null);
                    setResult(null);
                    setProcessingTime(null);
                  }} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 text-sm" disabled={processing}>
                    Effacer
                  </button>
                  <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed" disabled={processing || !input.trim()}>
                    {processing ? <>
                      <RotateCw className="animate-spin h-4 w-4 mr-2" />
                      Traitement...
                    </> : <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Exécuter
                    </>}
                  </button>
                </div>
              </form>
              {/* Results */}
              {result && <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-md font-semibold text-gray-900 flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    Résultat
                  </h3>
                  {processingTime && <div className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Temps de traitement: {Math.round(processingTime)}ms
                  </div>}
                </div>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    {result}
                  </pre>
                  <button onClick={() => handleCopyToClipboard(result)} className="absolute top-2 right-2 p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600" title="Copier le résultat">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>}
              {/* API Documentation */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                  <Code className="h-5 w-5 text-blue-600 mr-2" />
                  Documentation API
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Format de requête
                    </h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs h-40">
                        {model.requestFormat}
                      </pre>
                      <button onClick={() => handleCopyToClipboard(model.requestFormat)} className="absolute top-2 right-2 p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600" title="Copier le format de requête">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Format de réponse
                    </h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs h-40">
                        {model.responseFormat}
                      </pre>
                      <button onClick={() => handleCopyToClipboard(model.responseFormat)} className="absolute top-2 right-2 p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600" title="Copier le format de réponse">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Point d'accès:{' '}
                    <code className="bg-gray-100 px-2 py-1 rounded text-blue-600">
                      {model.apiEndpoint}
                    </code>
                  </div>
                  <Link to={`/api/models/${model.id}`} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                    Documentation complète
                    <ArrowLeft className="h-4 w-4 ml-1 transform rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Prêt à utiliser {model.name} dans votre application ?
            </h2>
            <p className="text-blue-700">
              Abonnez-vous pour accéder à l'API complète avec des limites
              d'utilisation plus élevées et un support prioritaire.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link to={`/models/${model.id}`} className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100">
              Voir les plans
            </Link>
            <button onClick={handleSubscribe} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              S'abonner maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}