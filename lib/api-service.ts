import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("token")
    //   window.location.href = "/login"
    }
    return Promise.reject(error)
  }
) 