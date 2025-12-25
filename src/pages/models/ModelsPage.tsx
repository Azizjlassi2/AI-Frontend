import axios from "axios";
import { SearchIcon, SortAscIcon, TagIcon, StarIcon, Bot, ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { PaginatedResponse } from "../utils/PaginatedResponse";
import { useAuth } from "../../context/AuthContext";
import { useError } from "../../context/ErrorContext";
import { useSuccess } from "../../context/SuccessContext";
import { ClientAccount, DeveloperAccount } from "../../types/auth";


interface Task {
  id: number;
  name: string;
}
interface Stats {
  used: number;
  stars: number;
  discussions: number;
}

interface Developer {
  id: number,
  username: string,
}

interface Model {
  id: number;
  name: string;
  description: string;
  developer: Developer;
  tasks: Task[];
  stats: Stats;
  createdAt: string
}

export function ModelsPage() {
  const [models, setModels] = useState<Model[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated, token, account, role } = useAuth();
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();




  const checkFavorite = (id: number): boolean => {

    let isFavorite = false;
    switch (role) {
      case "DEVELOPER":
        isFavorite = (account as DeveloperAccount)?.favoriteModels?.some(model => model.id === id) ?? false;
        break;
      case "CLIENT":
        isFavorite = (account as ClientAccount)?.favoriteModels?.some(model => model.id === id) ?? false;
        break;

    }
    return isFavorite;
  }

  function FavoriteIcon({ isFavorite }: { isFavorite: boolean }) {
    return isFavorite
      ? <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
      : <StarIcon className="h-5 w-5 text-gray-400 hover:text-blue-500" />;
  }


  const MOCK_TASKS: Task[] = [
    { id: 1, name: "Image Classification" },
    { id: 2, name: "Object Detection" },
    { id: 3, name: "Sentiment Analysis" },
    { id: 4, name: "Named Entity Recognition" },
    { id: 5, name: "Machine Translation" },
    { id: 6, name: "Speech-to-Text" },
    { id: 7, name: "Text-to-Speech" },
    { id: 8, name: "Face Recognition" },
    { id: 9, name: "OCR Extraction" },
    { id: 10, name: "Pose Estimation" },
    { id: 11, name: "Anomaly Detection" },
    { id: 12, name: "Time Series Forecasting" },
    { id: 13, name: "Image Segmentation" },
    { id: 14, name: "Recommendation System" },
    { id: 15, name: "Document Summarization" },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<PaginatedResponse<Task>>(
          `${import.meta.env.VITE_BACKEND_HOST}/api/v1/tasks`
        );

        const tasks = response.data?.data?.content || [];

        // Fallback si vide
        if (!tasks.length) {
          setAllTasks(MOCK_TASKS);
          return;
        }

        setAllTasks(tasks);
      } catch (error: any) {

        //  setAllTasks(MOCK_TASKS);

        setError({
          message:
            error.response?.data?.message ||
            "Impossible de récupérer les tâches. Chargement des tâches par défaut.",
          type: "NETWORK",
        });

      }
    };

    fetchTasks();
  }, []);


  // ==== FETCH MODELS LOGIC ==== //
  useEffect(() => {
    setIsLoading(true);


    const params = {
      page: currentPage - 1,
      size: itemsPerPage,
      ...(selectedTasks.length > 0 && { taskIds: selectedTasks.join(",") }),
      ...(search && { search }),
    };

    axios
      .get<PaginatedResponse<Model>>(
        `${import.meta.env.VITE_BACKEND_HOST}/api/v1/models`,
      )
      .then((res) => {
        const response = res.data?.data;
        console.log("Fetched models:", response);

        const formattedModels = (response?.content || []).map((model) => ({
          id: model.id ?? 0,
          name: model.name ?? "Modèle sans nom",
          description: model.description ?? "",
          developer: model.developer ?? { id: 0, username: "Inconnu" },
          tasks: Array.isArray(model.tasks) ? model.tasks : [],
          stats: model.stats ?? { used: 0, stars: 0, discussions: 0 },
          createdAt: model.createdAt ?? "",
        }));



        setModels(formattedModels);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        setError({
          message:
            error?.response?.data?.message ||
            "Impossible de charger les modèles. Affichage des modèles mockés.",
          type: "NETWORK",
        });


        setIsLoading(false);
      });

  }, [currentPage, itemsPerPage, selectedTasks, search, setError]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTasks, search, itemsPerPage]);

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate displayed range
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalElements);

  function handleFavorite(id: number): void {
    if (!isAuthenticated) {
      setError({
        message: "Vous devez être connecté pour ajouter un modèle aux favoris.",
        type: "AUTH",
      });
      return;
    }

    // Optimistically update the UI
    setModels((prevModels) =>
      prevModels.map((model) =>
        model.id === id
          ? {
            ...model,
            stats: {
              ...model.stats,
              stars: model.stats.stars + (checkFavorite(id) ? -1 : 1),
            },
          }
          : model
      )
    );

    // Make the API request
    const response = axios
      .post(
        `${import.meta.env.VITE_BACKEND_HOST}/api/v1/favorites/models/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {



        setSuccess({
          type: "MODEL_FAVORITED",
          message: "Modèle ajouté aux favoris.",
        });
      })
      .catch((error) => {
        setError({
          message: error.response?.data?.message || "Une erreur est survenue.",
          type: "NETWORK",
        });
      });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Modèles</h1>
          <p className="mt-2 text-gray-600">
            Découvrez des modèles d'IA état de l'art pour vos projets
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Tasks Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tâches
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allTasks.map(task => (
                    <label key={task.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedTasks.includes(task.id)}
                        onChange={e => {
                          setSelectedTasks(prev =>
                            e.target.checked
                              ? [...prev, task.id]
                              : prev.filter(id => id !== task.id)
                          );
                        }}
                      />
                      <span className="ml-2 text-gray-700">{task.name}</span>
                    </label>
                  ))}
                </div>

                {/* Reset filters button */}
                {selectedTasks.length > 0 && (
                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedTasks([])}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main area */}
          <div className="flex-1">
            {/* Search & sort */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Rechercher des modèles..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value="6">6 par page</option>
                    <option value="12">12 par page</option>
                    <option value="24">24 par page</option>
                  </select>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50">
                    <SortAscIcon className="h-5 w-5 mr-2" />
                    Trier
                  </button>
                </div>
              </div>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {/* Empty state */}
            {!isLoading && models.length === 0 && (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500 text-lg">
                  Aucun modèle ne correspond à vos critères de recherche.
                </p>
                <button
                  onClick={() => {
                    setSelectedTasks([]);
                    setSearch("");
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
            )}

            {/* Models Grid */}
            {!isLoading && models.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {models.map(model => (
                    <div key={model.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <Bot className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <Link to={`/models/${model.id}`} className="text-xl font-semibold text-gray-900">
                                {model.name}
                              </Link>
                              <p className="text-sm text-gray-500">Créateur <Link to={`/creators/${model.developer.id}`}> <b>@{model.developer.username}</b> </Link></p>
                            </div>
                          </div>
                          <button onClick={() => handleFavorite(model.id)}>
                            <FavoriteIcon isFavorite={checkFavorite(model.id)} />
                          </button>

                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-4">{model.description.split(" ").slice(0, 10).join(" ") + " ..."}</p>

                        {model.tasks.length > 0 ? (
                          model.tasks.map(t => (
                            <span key={t.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <TagIcon className="h-3 w-3 mr-1" />
                              {t.name}
                            </span>
                          ))
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Pas de tâches associées</span>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <DownloadIcon className="h-4 w-4 mr-1" />
                            {model.stats.used} utilisations
                          </div>
                          <span>Ajouté le {model.createdAt ?? ''}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination controls */}
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show limited page numbers with ellipsis
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`px-4 py-2 rounded-md ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        (pageNumber === currentPage - 2 && pageNumber > 1) ||
                        (pageNumber === currentPage + 2 && pageNumber < totalPages)
                      ) {
                        return (
                          <span key={pageNumber} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </nav>
                </div>

                {/* Results count */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  Affichage de {indexOfFirstItem + 1} à {indexOfLastItem} sur {totalElements} modèles
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}