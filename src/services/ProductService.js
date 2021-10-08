import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://fake-server-app-01.herokuapp.com',
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
}
