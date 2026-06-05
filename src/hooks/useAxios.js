import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

// Create base axios instance
const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Token storage key
const TOKEN_KEY = 'jwt_token';

// Helper functions
const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    baseAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};
const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete baseAxios.defaults.headers.common.Authorization;
};

// Request interceptor: add token to every request
baseAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 -> clear token and redirect
baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired
      clearToken();
      // Optional: redirect to login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Custom hook: useAxios
 * Provides methods for API calls with automatic JWT handling.
 */
export const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenSourceRef = useRef(null);

  // Cancel pending request on unmount
  useEffect(() => {
    return () => {
      if (cancelTokenSourceRef.current) {
        cancelTokenSourceRef.current.cancel('Component unmounted');
      }
    };
  }, []);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);

    if (cancelTokenSourceRef.current) {
      cancelTokenSourceRef.current.cancel('New request made, cancelling previous');
    }
    const source = axios.CancelToken.source();
    cancelTokenSourceRef.current = source;

    try {
      const response = await baseAxios({
        ...config,
        cancelToken: source.token,
      });
      return response.data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        throw err;
      }
      return null;
    } finally {
      setLoading(false);
      cancelTokenSourceRef.current = null;
    }
  }, []);

  // Convenience methods
  const get = useCallback((url, params = {}) => request({ method: 'GET', url, params }), [request]);
  const post = useCallback((url, data = {}) => request({ method: 'POST', url, data }), [request]);
  const put = useCallback((url, data = {}) => request({ method: 'PUT', url, data }), [request]);
  const patch = useCallback((url, data = {}) => request({ method: 'PATCH', url, data }), [request]);
  const del = useCallback((url) => request({ method: 'DELETE', url }), [request]);

  // Auth helpers
  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    clearToken();
  };

  const isAuthenticated = () => !!getToken();

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    login,
    logout,
    isAuthenticated,
    // Expose raw axios instance if needed
    axios: baseAxios,
  };
};

// Export raw instance for use outside React components
export { baseAxios };