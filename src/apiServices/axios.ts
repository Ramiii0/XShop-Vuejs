import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
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
