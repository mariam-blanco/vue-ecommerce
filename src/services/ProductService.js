import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://fake-server-production.up.railway.app',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getProductsByCategory(category) {
    return apiClient.get(`/products?category=${category}`)
  },
  getDetails(slug) {
    return apiClient.get(`/products?slug=${slug}`)
  },
  sendShoppingDetails(clientDetails) {
    return apiClient.post('/clients', clientDetails)
  },
}
