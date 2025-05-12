// API Configuration
const API_URL = import.meta.env.VITE_API_URL || ''
const API_TOKEN = import.meta.env.VITE_API_TOKEN

// Import monitoring service and axios
import monitoring from './monitoring'
import axios from 'axios'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor for auth token
api.interceptors.request.use(config => {
  if (API_TOKEN) {
    config.headers['Authorization'] = `Bearer ${API_TOKEN}`
  }
  
  // Add language parameter to all requests
  if (config.method === 'get' && config.params) {
    config.params.lang = currentLanguage.value
  } else if (config.method === 'get') {
    config.params = { lang: currentLanguage.value }
  }
  
  return config
})

// Helper function to track API calls
const trackApiCall = async (name, apiCall) => {
  const startTime = performance.now()
  let success = true
  let result

  try {
    result = await apiCall()
    return result
  } catch (error) {
    success = false
    monitoring.trackException(error, { apiCall: name })
    throw error
  } finally {
    const duration = performance.now() - startTime
    monitoring.trackApiCall(name, success, duration)
  }
}

// API Service
export const apiService = {
  // Case Status
  healthcheck: async () => {
  // Generic GET request
  get: async (endpoint, params = {}) => {
    return trackApiCall(`get_${endpoint}`, async () => {
      const response = await api.get(endpoint, { params })
      return response.data
    })
  },

  // Generic POST request
  post: async (endpoint, data) => {
    return trackApiCall(`post_${endpoint}`, async () => {
      const response = await api.post(endpoint, data)
      return response.data
    })
  },

  // Generic PUT request
  put: async (endpoint, data) => {
    return trackApiCall(`put_${endpoint}`, async () => {
      const response = await api.put(endpoint, data)
      return response.data
    })
  },

  // Generic DELETE request
  delete: async (endpoint) => {
    return trackApiCall(`delete_${endpoint}`, async () => {
      const response = await api.delete(endpoint)
      return response.data
    })
  }
}

export default apiService 