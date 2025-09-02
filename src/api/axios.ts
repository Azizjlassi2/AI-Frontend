import axios from "axios";
import { ApiResponse, LoginData } from "../types/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise: Promise<ApiResponse<LoginData>> | null = null;

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Use existing refresh promise to prevent multiple refresh calls
      refreshPromise = refreshPromise || refreshAuthToken();

      try {
        const newTokens = (await refreshPromise).data;
        refreshPromise = null;

        // Update tokens in storage
        localStorage.setItem("authToken", newTokens.token);
        localStorage.setItem("refreshToken", newTokens.refresh_token);
        localStorage.setItem("expiresAt", newTokens.expiresAt);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newTokens.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle refresh error (logout user)
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Refresh token function
const refreshAuthToken = async (): Promise<ApiResponse<LoginData>> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_HOST}/api/v1/auth/refresh-token`,
    { refresh_token: refreshToken }
  );

  return response.data.data;
};

export default axiosInstance;
