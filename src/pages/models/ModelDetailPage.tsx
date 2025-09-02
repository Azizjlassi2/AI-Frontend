import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  Download, Globe, Calendar, Tag, Star, Share2, MessageSquare,
  Cpu, HardDrive, Code, Server, Lock, Send, CheckCircle, CreditCard, BarChart, Database,
  Telescope,
  Bot,
  LogIn,
  XCircle
} from 'lucide-react'
import { useError } from '../../context/ErrorContext'
import { useAuth } from '../../context/AuthContext'
import { useSuccess } from '../../context/SuccessContext'

// ===== ENUMS & INTERFACES =====
enum BillingPeriod {
  MONTHLY = 'MONTHLY',
  ANNUAL = 'ANNUAL',
  PAY_AS_YOU_GO = 'PAY_AS_YOU_GO',
}
enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
interface TaskDto {
  id: number
  name: string
}
interface EndpointDto {
  method: string
  path: string
  description: string
  requestBody: string
  successResponse: string
  errorResponse: string
}
interface Comment {
  [x: string]: any
  id: number
  username: string
  content: string
  date: string
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
  billingPeriod: BillingPeriod;
  features: string[];
  apiCallsLimit?: number;
  apiCallsPrice?: number;
}

// ===== MAIN COMPONENT =====
export function ModelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [model, setModel] = useState<any>(null)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([])

  const { isAuthenticated, token } = useAuth();
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();


  function handleFavorite(id: number): void {
    // check if user is authenticated if not display the useError modal and redirect to login
    if (!isAuthenticated) {
      setError(
        {
          message: "Vous devez être connecté pour ajouter un modèle aux favoris.",
          type: "AUTH"
        }
      );
      return;
    }

    // send a  post request using axios
    axios.post(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/models/${id}/favorite`, {
      Authorization: `Bearer ${token}`
    })
      .then(() => {
        setSuccess({
          type: "MODEL_FAVORITED",
          message: "Modèle ajouté aux favoris."
        });
      })
      .catch(error => {
        setError({
          message: error.response?.data?.message || "Une erreur est survenue.",
          type: "NETWORK"
        });
      });
  }


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_HOST}/api/v1/models/${id}`)
      .then(res => {
        const data = res.data.data
        setModel({
          name: data.name,
          description: data.description,
          visibility: Visibility.PUBLIC,
          creator: {
            id: data.developer.id,
            name: data.developer.username,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${data.developer.username}`,
            description: data.developer.email,

          },
          metadata: {
            framework: data.framework,
            architecture: data.architecture,
            trainingDataset: data.trainingDataset,
            lastUpdate: data.createdAt,
          },
          performance: {
            accuracyScore: data.performance.accuracyScore,
            precisionScore: data.performance.precisionScore,
            recallScore: data.performance.recallScore,
            f1Score: data.performance.f1Score,
          },
          stats: {
            used: data?.stats?.used ?? 'N/A',
            stars: data?.stats?.stars ?? 'N/A',
            discussions: data?.stats?.discussions ?? 'N/A',
          },
          tasks: data.tasks,
          endpoints: data.endpoints,
          subscriptionPlans: data.subscriptionPlans || [],
          comments: data.comments || [],
        })


      })
      .catch(error => {
        setError({
          type: "UNKNOWN",
          message: "Une erreur est survenue lors de la récupération des détails du modèle.",
        })
      })
  }, [id])

  const handleSelectPlan = (planId: number) => setSelectedPlan(planId)

  const handleSubscribe = () => {
    const selectedPlanData = model.subscriptionPlans.find((plan: SubscriptionPlanDto) => plan.id === selectedPlan)
    if (selectedPlanData) {
      navigate(`/models/checkout/${model.id}`, {
        state: { selectedPlan: selectedPlanData }
      })
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim()) return

    const token = localStorage.getItem("authToken")
    if (!token) {
      setError({
        type: "AUTH",
        message: "Vous devez être connecté pour commenter.",
        redirect: "/login",
      })
      return
    }

    const payload = { content: newComment }

    axios.post(
      `${import.meta.env.VITE_BACKEND_HOST}/api/v1/models/${id}/comments`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    )
    setNewComment("")
    location.reload()
  }

  const getPlanIcon = (billing: BillingPeriod) => {
    switch (billing) {
      case BillingPeriod.MONTHLY: return <Calendar className="h-5 w-5 text-blue-500" />
      case BillingPeriod.ANNUAL: return <BarChart className="h-5 w-5 text-blue-500" />
      case BillingPeriod.PAY_AS_YOU_GO: return <Database className="h-5 w-5 text-blue-500" />
      default: return null
    }
  }

  const formatJson = (json: string) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2)
    } catch {
      return json
    }
  }

  if (!model) return <div className="text-center py-20 text-gray-600">Chargement du modèle...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* === HEADER === */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold text-gray-900 mr-3">
                    {model.name}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Globe className="h-3 w-3 mr-1" />
                    Public
                  </span>
                </div>
                <p className="text-gray-600">par {model.creator.name}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-600 hover:text-blue-600 flex items-center">
                <Star className="h-5 w-5 mr-1" /> {model.stats.stars}
              </button>

            </div>
          </div>
          <p className="text-gray-600 mb-6">{model.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {model.tasks.map((task: TaskDto) => (
              <span key={task.id} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full flex items-center">
                <Tag className="h-3 w-3 mr-2" /> {task.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">

            <Link to={`/models/test/${id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Telescope className="h-5 w-5 mr-2" />Tester le modèle
            </Link>
          </div>
        </div>
        {/* Modal si pas authentifié */}


        {/* === GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === LEFT PANEL === */}
          <div className="space-y-6">
            {/* Creator */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <img src={model.creator.avatar} alt={model.creator.name} className="h-12 w-12 rounded-full" />
                <div className="ml-3">
                  <Link to={`/creators/${model.creator.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                    {model.creator.name}
                  </Link>
                  <p className="text-sm text-gray-500">{model.creator.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{model.creator.description}</p>
            </div>

            {/* Metadata */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Métadonnées</h2>
              {[
                { icon: Cpu, label: 'Framework', value: model.metadata.framework },
                { icon: Code, label: 'Architecture', value: model.metadata.architecture },
                { icon: Calendar, label: 'Mise à jour', value: model.metadata.lastUpdate },
                { icon: HardDrive, label: 'Dataset', value: model.metadata.trainingDataset },
              ].map(({ icon: Icon, label, value }, i) => (
                <div className="flex items-center mb-2" key={i}>
                  <Icon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600"><strong>{label}:</strong> {value}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div><div className="text-xl font-bold">{model.stats.stars}</div><div className="text-sm text-gray-500">Stars</div></div>
                <div><div className="text-xl font-bold">{model.stats.discussions}</div><div className="text-sm text-gray-500">Discussions</div></div>
              </div>
            </div>
          </div>

          {/* === RIGHT PANEL === */}
          <div className="lg:col-span-2 space-y-6">

            {/* Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Performance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['accuracyScore', 'precisionScore', 'recallScore', 'f1Score'].map((metric) => (
                  <div key={metric} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">{metric.replace('Score', '')}</div>
                    <div className="text-xl font-bold text-gray-900">
                      {model.performance[metric] ?? 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Plans */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Plans d'abonnement</h2>
              </div>

              {model.subscriptionPlans && model.subscriptionPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {model.subscriptionPlans.map((plan: SubscriptionPlanDto) => (
                    <div
                      key={plan.id}
                      className={`border-2 rounded-lg ${selectedPlan === plan.id ? "border-blue-500 shadow-md" : "border-gray-200"
                        }`}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          {getPlanIcon(plan.billingPeriod)}
                          <h3 className="text-xl font-semibold ml-2">{plan.name}</h3>
                        </div>

                        <div className="mb-2 text-2xl font-bold">
                          {plan.billingPeriod === BillingPeriod.PAY_AS_YOU_GO
                            ? `${plan.apiCallsPrice} ${plan.currency}/appel`
                            : `${plan.price} ${plan.currency}/${plan.billingPeriod === BillingPeriod.MONTHLY ? "mois" : "an"
                            }`}
                        </div>

                        <p className="text-gray-600 mb-4">{plan.description}</p>

                        <ul className="mb-4 space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-gray-600">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> {feature}
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleSelectPlan(plan.id!)}
                          className={`w-full py-2 px-4 rounded-lg ${selectedPlan === plan.id
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                          {selectedPlan === plan.id ? "Sélectionné" : "Sélectionner ce plan"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Aucun plan d’abonnement disponible.</p>
              )}

              {selectedPlan && (
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSubscribe}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    S'abonner au plan sélectionné
                  </button>
                </div>
              )}
            </div>

            {/* API Endpoints */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Server className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">API Endpoints</h2>
              </div>
              <div className="space-y-4">
                {model.endpoints.length > 0 ? (
                  model.endpoints.map((endpoint: EndpointDto, index: number) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded mr-2 ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                              endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                                  'bg-purple-100 text-purple-800'
                            }`}>
                            {endpoint.method}
                          </span>
                          <span className="font-medium text-blue-600">{endpoint.path}</span>
                        </div>
                      </div>

                      {endpoint.description && (
                        <div className="mb-3 text-sm text-gray-600">{endpoint.description}</div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {endpoint.requestBody && endpoint.requestBody !== '{}' && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="text-xs font-semibold text-gray-500 mb-2">REQUÊTE</h4>
                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                              {formatJson(endpoint.requestBody)}
                            </pre>
                          </div>
                        )}
                        {endpoint.successResponse && endpoint.successResponse !== '{}' && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <h4 className="text-xs font-semibold text-green-600 mb-2">SUCCÈS</h4>
                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                              {formatJson(endpoint.successResponse)}
                            </pre>
                          </div>
                        )}
                        {endpoint.errorResponse && endpoint.errorResponse !== '{}' && (
                          <div className="bg-red-50 p-3 rounded-lg">
                            <h4 className="text-xs font-semibold text-red-600 mb-2">ERREUR</h4>
                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                              {formatJson(endpoint.errorResponse)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Aucun endpoint disponible.</p>
                )}
              </div>
            </div>


            {/* Comments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Commentaires</h2>
              </div>
              <div className="space-y-4 mb-6">


                {(model.comments as ModelComment[]).map((comment: ModelComment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.user.username}`} className="h-8 w-8 rounded-full mr-2" />
                      <div>
                        <p className="font-medium">{comment.user.username}</p>
                        <p className="text-xs text-gray-500">{comment.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <textarea
                  rows={3}
                  className="w-full border px-4 py-2 rounded-lg"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Partagez votre expérience..."
                />
                <div className="flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <Send className="h-4 w-4 mr-2" /> Publier
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
