import { createStore } from 'vuex'
import ProductService from '@/services/ProductService.js'
import router from '../router'

export default createStore({
  state: {
    products: null,
    product: {},
    initialQuantity: 1 /* product is not yet in the cart */,
    cart: [],
    cartNumItems: 0,
    total: 0,
    tax: 0,
    grandTotal: 0,
    isOpen: false,
    activeModalComponent: null,
    isLoading: false,
  },

  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },

    SET_PRODUCT(state, product) {
      state.product = product
    },

    // Initial quantity

    SET_QUANTITY(state, quantity) {
      state.initialQuantity = quantity
    },

    /* Increase & decrease initial quantity of the product 
       just before to get added to cart */
    INCREASE_QUANTITY(state) {
      state.initialQuantity++
    },

    DECREASE_QUANTITY(state) {
      state.initialQuantity >= 1 && state.initialQuantity--
    },

    // Cart

    SET_CART_NUM_ITEMS(state) {
      state.cartNumItems = state.cart.length
    },

    /* Adds product to the cart */
    ADD_PRODUCT(state, cartItem) {
      state.cart.push(cartItem)
    },

    SET_CART(state, cart) {
      state.cart = cart
    },

    /* Updates quantity of items that already exist in the cart */
    INCREASE_CART_ITEM_QUANTITY(state, id) {
      const found = state.cart.find((item) => item.id === id)
      found.quantity++
    },

    DECREASE_CART_ITEM_QUANTITY(state, id) {
      const found = state.cart.find((item) => item.id === id)
      found.quantity--
    },

    // Prices

    SET_TOTAL(state, total) {
      state.total = total
    },

    SET_TAX(state, tax) {
      state.tax = tax
    },

    SET_GRAND_TOTAL(state, grandTotal) {
      state.grandTotal = grandTotal
    },

    // Modal

    SET_IS_OPEN(state, isOpen) {
      state.isOpen = isOpen
    },

    SET_ACTIVE_MODAL_COMPONENT(state, component) {
      state.activeModalComponent = component
    },

    // Loading

    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
  },

  actions: {
    fetchProducts({ commit }, category) {
      ProductService.getProductsByCategory(category)
        .then((response) => {
          const results = response.data

          if (results.length === 0) {
            router.push({
              name: '404Resource',
              params: { resource: 'category' },
            })
          } else if (results.length > 1) {
            /* order by product model name */
            results.sort((a, b) => (a.slug < b.slug ? 1 : -1))
            /* place "New product" at the top of the list */
            results.forEach((product, i) => {
              if (product.new) {
                results.splice(i, 1)
                results.unshift(product)
              }
            })
          }
          commit('SET_PRODUCTS', response.data)
        })
        .catch((error) => {
          console.error(error.message, error.name)
          router.push({ name: 'NetworkError' })
        })
    },

    fetchProduct({ commit }, slug) {
      ProductService.getDetails(slug)
        .then((response) => {
          if (response.data.length !== 0) {
            commit('SET_PRODUCT', response.data[0])
          } else if (response.data.length === 0) {
            router.push({
              name: '404Resource',
              params: { resource: 'product' },
            })
          }
        })
        .catch((error) => {
          console.error(error.message, error.name)
          router.push({ name: 'NetworkError' })
        })
    },

    // Adds product to the cart
    addProductToCart({ commit, state }, cartItem) {
      const found = state.cart.find((item) => cartItem.id === item.id)

      if (!found) {
        commit('ADD_PRODUCT', cartItem)
        commit('SET_CART_NUM_ITEMS')
        localStorage.setItem('cart', JSON.stringify(state.cart))
        this.dispatch('calculatePrices')
      }
    },

    //updateCartNumItems({ commit, state }) {
    //  commit('SET_CART_NUM_ITEMS', state.cart.length)
    //},

    // Updates quantity of items that already exist in the cart
    increaseCartQuantity({ commit }, id) {
      commit('INCREASE_CART_ITEM_QUANTITY', id)
      this.dispatch('calculatePrices')
    },

    decreaseCartQuantity({ commit }, id) {
      commit('DECREASE_CART_ITEM_QUANTITY', id)
      this.dispatch('calculatePrices')
    },

    removeAllCartItems({ commit }) {
      commit('SET_CART', [])
      commit('SET_CART_NUM_ITEMS')
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
