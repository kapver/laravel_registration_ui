import axios from 'axios'
import store from '../store'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

instance.interceptors.request.use(async function(config) {
  return config
}, function(error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(async function(response) {
  return response
}, async function(error) {
  error = await store.dispatch('set_errors', error)
  return Promise.reject(error)
})

export default instance

