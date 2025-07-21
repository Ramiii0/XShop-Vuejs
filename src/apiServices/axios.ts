import BASE_URL from '@/constants/baseURL'
import axios from 'axios'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
})
  
// response interceptor (e.g. global error handling)
api.interceptors.response.use(
  res => res,
  err => {
    // handle 401, show toast, etc.
    return Promise.reject(err)
  },
)

export default api
