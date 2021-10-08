import { createStore } from 'vuex'
import ProductService from '@/services/ProductService.js'

export default createStore({
  state: {
    products: null,
    product: {},
    isLoading: false,
    isOpen: false,
    activeModalComponent: '',
    cart: [],
    total: 0,
    tax: null,
    grandTotal: null,
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },

    SET_PRODUCT(state, product) {
      state.product = product
    },

    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },

    SET_IS_OPEN(state, isOpen) {
      state.isOpen = isOpen
    },

    SET_ACTIVE_MODAL_COMPONENT(state, component) {
      state.activeModalComponent = component
    },

    SET_CART(state, cart) {
      state.cart = cart
    },

    ADD_PRODUCT(state, cartItem) {
      state.cart.push(cartItem)
    },

    SET_TOTAL(state, total) {
      state.total = total
    },

    SET_TAX(state, tax) {
      state.tax = tax
    },

    SET_GRAND_TOTAL(state, grandTotal) {
      state.grandTotal = grandTotal
    },
  },

  actions: {
    fetchProducts({ commit }, category) {
      ProductService.getProductsByCategory(category).then((response) => {
        const results = response.data

        if (results.length > 1) {
          /* order by name product model */
          results.sort((a, b) => (a.slug < b.slug ? 1 : -1))
          /* place "New product" in firts place of the list */
          results.forEach((product, i) => {
            if (product.new) {
              results.splice(i, 1)
              results.unshift(product)
            }
          })
        }
        commit('SET_PRODUCTS', response.data)
      })
    },

    fetchProduct({ commit }, slug) {

      ProductService.getDetails(slug).then((response) => {
        commit('SET_PRODUCT', response.data[0])
      })
    },

    addProductToCart({ commit, state }, cartItem) {
      const found = state.cart.find((item) => {
        return cartItem.id === item.id
      })

      if (!found) {
        commit('ADD_PRODUCT', cartItem)
        localStorage.setItem('cart', JSON.stringify(state.cart))
        this.dispatch('calculatePrices')
      }
    },

    removeAllCartItems({ commit }) {
      commit('SET_CART', [])
      commit('SET_TOTAL', null)
      commit('SET_TAX', null)
      commit('SET_GRAND_TOTAL', null)
      localStorage.clear()
    },

    calculatePrices({ commit, state }) {
      const total = state.cart.reduce((acc, item) => {
        return item.price * item.quantity + acc
      }, 0)
      commit('SET_TOTAL', total)
      localStorage.setItem('total', JSON.stringify(total))

      const tax = Math.floor(total * 0.2)
      commit('SET_TAX', tax)

      const grandTotal = total + tax + 50
      commit('SET_GRAND_TOTAL', grandTotal)

      localStorage.setItem('summary', JSON.stringify({ tax, grandTotal }))
    },

    openModalComponent({ commit }, component) {
      
      commit('SET_ACTIVE_MODAL_COMPONENT', component)
    },
  },
  modules: {},
})
