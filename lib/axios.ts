import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// Add a request interceptor to include the token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export default api 