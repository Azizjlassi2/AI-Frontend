import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, Code, Clock, BarChart2, CreditCard, CheckCircle, AlertTriangle, Terminal, Copy, Download, RotateCw, PlayCircle, Layers } from 'lucide-react';

interface ModelExample {
  id: number;
  name: string;
  input: string;
  output: string;
  description: string;
}

interface TaskDto {
  id: number;
  name: string;
}

interface EndpointDto {
  method: string;
  path: string;
  description: string;
  requestBody: string;
  successResponse: string;
  errorResponse: string;
}

interface CommentUser {
  username: string;
}

interface ModelComment {
  id: number;
  user: CommentUser;
  content: string;
  date: string;
}

interface SubscriptionPlanDto {
  id?: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: string; // Assuming BillingPeriod is a string enum
  features: string[];
  apiCallsLimit?: number;
  apiCallsPrice?: number;
}

interface ModelCreator {
  id: number;
  name: string;
  avatar: string;
  description: string;
}

interface ModelMetadata {
  framework: string;
  architecture: string;
  trainingDataset: string;
  lastUpdate: string;
}

interface ModelPerformance {
  accuracyScore: number;
  precisionScore: number;
  recallScore: number;
  f1Score: number;
}

interface ModelStats {
  used: string;
  stars: string;
  discussions: string;
}

enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

interface ModelTestingProps {
  id: string;
  name: string;
  description: string;
  examples: ModelExample[];
  creator: ModelCreator;
  metadata: ModelMetadata;
  performance: ModelPerformance;
  stats: ModelStats;
  tasks: TaskDto[];
  endpoints: EndpointDto[];
  subscriptionPlans: SubscriptionPlanDto[];
  comments: ModelComment[];
  visibility: Visibility;
}

/**
 * Page for testing a specific model with input and viewing output.
 * Allows users to enter text, select examples, and see results.
 * Also displays API documentation for the model.
 * @returns JSX.Element
 */
export function ModelTestingPage() {
  const {
    modelId
  } = useParams<{
    modelId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<ModelTestingProps | null>(null);
  // Testing state
  const [input, setInput] = useState('');
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointDto | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);
  const [testCount, setTestCount] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  const getTestCount = useCallback((path: string): number => {
    const safePath = path.replace(/\//g, '_');
    return parseInt(localStorage.getItem(`tests_${modelId}_${safePath}`) || '0', 10);
  }, [modelId]);

  const setTestCountLocal = useCallback((path: string, count: number): void => {
    const safePath = path.replace(/\//g, '_');
    localStorage.setItem(`tests_${modelId}_${safePath}`, count.toString());
  }, [modelId]);

  useEffect(() => {
    const fetchModelData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const modelFromState = (location.state as any)?.model;
        console.log('model from state:', modelFromState);
        if (!modelFromState || !modelFromState.endpoints || modelFromState.endpoints.length === 0) {
          throw new Error('No endpoints available for testing');
        }
        // Use real model data from state, ensuring examples are present (fallback if not)
        const fullModel: ModelTestingProps = {
          id: modelFromState.id || modelId || '',
          name: modelFromState.name || 'Unknown Model',
          description: modelFromState.description || 'No description available.',
          examples: modelFromState.examples || [], // Assume examples are passed or fetch if needed
          creator: modelFromState.creator,
          metadata: modelFromState.metadata,
          performance: modelFromState.performance,
          stats: modelFromState.stats,
          tasks: modelFromState.tasks || [],
          endpoints: modelFromState.endpoints,
          subscriptionPlans: modelFromState.subscriptionPlans || [],
          comments: modelFromState.comments || [],
          visibility: modelFromState.visibility || Visibility.PUBLIC,
        };
        setModel(fullModel);
        // Select first endpoint by default
        const firstEndpoint = fullModel.endpoints[0];
        setSelectedEndpoint(firstEndpoint);
        setTestCount(getTestCount(firstEndpoint.path));
        // Set default request format as input placeholder based on first endpoint
        if (firstEndpoint.requestBody) {
          try {
            const parsedBody = JSON.parse(firstEndpoint.requestBody);
            const placeholderKey = Object.keys(parsedBody).find(key => key.toLowerCase().includes('text') || key.toLowerCase().includes('input'));
            setInput(placeholderKey ? JSON.stringify({ [placeholderKey]: 'Votre texte ici' }, null, 2) : firstEndpoint.requestBody);
          } catch {
            setInput(firstEndpoint.requestBody);
          }
        }
        if (fullModel.examples.length > 0) {
          setInput(fullModel.examples[0].input);
          setSelectedExample(fullModel.examples[0].id);
        }
      } catch (err) {
        console.error('Error fetching model data:', err);
        setError('Une erreur est survenue lors du chargement des données du modèle');
      } finally {
        setLoading(false);
      }
    };
    fetchModelData();
  }, [modelId, location.state, getTestCount]);

  const handleExampleSelect = (exampleId: number) => {
    if (!model) return;
    const example = model.examples.find(ex => ex.id === exampleId);
    if (example) {
      setInput(example.input);
      setSelectedExample(exampleId);
      setResult(null);
      setProcessingTime(null);
      setValidationError(null);
      setBackendError(null);
    }
  };

  const handleEndpointSelect = (endpoint: EndpointDto) => {
    setSelectedEndpoint(endpoint);
    setTestCount(getTestCount(endpoint.path));
    setResult(null);
    setProcessingTime(null);
    setValidationError(null);
    setBackendError(null);
    // Update input based on requestBody placeholder
    if (endpoint.requestBody) {
      try {
        const parsedBody = JSON.parse(endpoint.requestBody);
        const placeholderKey = Object.keys(parsedBody).find(key => key.toLowerCase().includes('text') || key.toLowerCase().includes('input'));
        setInput(placeholderKey ? JSON.stringify({ [placeholderKey]: 'Votre texte ici' }, null, 2) : endpoint.requestBody);
      } catch {
        setInput(endpoint.requestBody);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedEndpoint || processing) return;

    // Input validation
    let requestBody: any;
    try {
      requestBody = JSON.parse(input);
    } catch (parseErr) {
      const trimmedInput = input.trim();
      if (trimmedInput.startsWith('{') || trimmedInput.startsWith('[')) {
        setValidationError('Format JSON invalide. Veuillez vérifier la syntaxe.');
        return;
      } else {
        // Assume simple text input if not JSON
        try {
          const parsedExampleBody = JSON.parse(selectedEndpoint.requestBody);
          const textKey = Object.keys(parsedExampleBody).find(key => key.toLowerCase().includes('text') || key.toLowerCase().includes('input'));
          requestBody = { [textKey || 'text']: input };
        } catch {
          requestBody = { text: input };
        }
      }
    }
    setValidationError(null);

    // Test limit check
    const currentCount = getTestCount(selectedEndpoint.path);
    if (currentCount >= 3) {
      setValidationError('Limite de 3 tests atteinte pour cet endpoint. Abonnez-vous pour plus d\'appels.');
      return;
    }

    setProcessing(true);
    setResult(null);
    setProcessingTime(null);
    setBackendError(null);
    try {
      const startTime = performance.now();
      // Make actual API call
      const response = await fetch(selectedEndpoint.path, {
        method: selectedEndpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const endTime = performance.now();
      setProcessingTime(endTime - startTime);
      if (response.ok) {
        const data = await response.json();
        const resultOutput = JSON.stringify(data, null, 2);
        setResult(resultOutput);
        // Increment test count only on success
        const newCount = currentCount + 1;
        setTestCountLocal(selectedEndpoint.path, newCount);
        setTestCount(newCount);
      } else {
        const status = response.status;
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = errorData.message || 'Une erreur est survenue lors du traitement de la requête';
        if (status >= 500) {
          setBackendError('Le backend rencontre un problème technique. La fonctionnalité de test n\'est pas disponible pour le moment. Veuillez réessayer plus tard.');
          errorMessage = 'Échec du backend (erreur serveur).';
        }
        const errorOutput = JSON.stringify({
          error: errorMessage,
          code: errorData.code || status,
          status: status,
        }, null, 2);
        setResult(errorOutput);
      }
    } catch (err) {
      console.error('Error processing request:', err);
      setBackendError('Le backend rencontre un problème technique. La fonctionnalité de test n\'est pas disponible pour le moment. Veuillez réessayer plus tard.');
      setResult(JSON.stringify({
        error: 'Échec de connexion au backend (erreur réseau).',
        code: 'NETWORK_ERROR',
        status: 0,
      }, null, 2));
      setProcessingTime(performance.now() - (performance.now() - 100)); // Minimal time
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
    navigate(`/models/checkout/${model?.id}`);
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
            {/* Examples and Endpoints panel */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                  <Layers className="h-5 w-5 text-blue-600 mr-2" />
                  Exemples
                </h3>
                <div className="space-y-3 mb-4">
                  {model.examples.map(example => <button key={example.id} onClick={() => handleExampleSelect(example.id)} className={`w-full text-left p-3 rounded-lg transition-colors ${selectedExample === example.id ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-gray-200 hover:bg-blue-50'}`}>
                    <div className="font-medium text-gray-900 mb-1">
                      {example.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {example.description}
                    </div>
                  </button>)}
                </div>
                {/* Endpoints selector */}
                <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                  <Code className="h-5 w-5 text-blue-600 mr-2" />
                  Endpoints
                </h3>
                <div className="space-y-2">
                  {model.endpoints.map((endpoint, index) => (
                    <button
                      key={index}
                      onClick={() => handleEndpointSelect(endpoint)}
                      className={`w-full text-left p-3 rounded-lg transition-colors text-xs ${selectedEndpoint?.path === endpoint.path ? 'bg-blue-100 border border-blue-300' : 'bg-white border border-gray-200 hover:bg-blue-50'}`}
                    >
                      <div className="font-medium text-gray-900 mb-1">{endpoint.method} {endpoint.path}</div>
                      <div className="text-gray-500">{endpoint.description}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div>Appels API effectués</div>
                    <div className="font-medium">{testCount}</div>
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
                      Entrée (JSON ou texte)
                    </label>
                    <button type="button" onClick={() => handleCopyToClipboard(input)} className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                      <Copy className="h-3 w-3 mr-1" />
                      Copier
                    </button>
                  </div>
                  <textarea id="input" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm" value={input} onChange={e => {
                    setInput(e.target.value);
                    setSelectedExample(null);
                    setValidationError(null);
                    setBackendError(null);
                  }} placeholder={selectedEndpoint ? `Exemple: ${selectedEndpoint.requestBody}` : "Sélectionnez un endpoint..."} />
                  {validationError && <div className="mt-1 text-red-500 text-sm">{validationError}</div>}
                </div>
                <div className="flex justify-between mb-6">
                  <button type="button" onClick={() => {
                    setInput('');
                    setSelectedExample(null);
                    setResult(null);
                    setProcessingTime(null);
                    setValidationError(null);
                    setBackendError(null);
                  }} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 text-sm" disabled={processing}>
                    Effacer
                  </button>
                  <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed" disabled={processing || !input.trim() || !selectedEndpoint || testCount >= 3}>
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
              {/* Backend Error Banner */}
              {backendError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-800 text-sm">{backendError}</span>
                  </div>
                </div>
              )}
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
              {selectedEndpoint && <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                  <Code className="h-5 w-5 text-blue-600 mr-2" />
                  Documentation API - {selectedEndpoint.method} {selectedEndpoint.path}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Format de requête
                    </h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs h-40">
                        {selectedEndpoint.requestBody}
                      </pre>
                      <button onClick={() => handleCopyToClipboard(selectedEndpoint.requestBody)} className="absolute top-2 right-2 p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600" title="Copier le format de requête">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Format de réponse (succès)
                    </h4>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs h-40">
                        {selectedEndpoint.successResponse}
                      </pre>
                      <button onClick={() => handleCopyToClipboard(selectedEndpoint.successResponse)} className="absolute top-2 right-2 p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600" title="Copier le format de réponse">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Réponse d'erreur
                  </h4>
                  <pre className="bg-red-900 text-red-100 p-4 rounded-lg overflow-x-auto text-xs">
                    {selectedEndpoint.errorResponse}
                  </pre>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    Description: {selectedEndpoint.description}
                  </div>

                </div>
              </div>}
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

          </div>
        </div>
      </div>
    </div>
  </div>;
}