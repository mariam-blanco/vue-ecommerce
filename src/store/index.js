import { createStore } from 'vuex'
import ProductService from '@/services/ProductService.js'
import router from '../router'

export default createStore({
  state: {
    products: [],
    product: {},
    initialQuantity: null /* product is not yet in the cart */,
    cart: [],
    total: 0,
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

    // INITIAL QUANTITY

    SET_QUANTITY(state, quantity) {
      state.initialQuantity = quantity
    },

    INCREASE_QUANTITY(state) {
      state.initialQuantity++
    },

    DECREASE_QUANTITY(state) {
      state.initialQuantity--
    },

    // CART

    ADD_PRODUCT(state, cartItem) {
      state.cart.push(cartItem)
    },

    SET_CART(state, cart) {
      state.cart = cart
    },

    // CART ITEM QUANTITY

    UPDATE_CART_ITEM_QUANTITY(state, found) {
      found.quantity = state.initialQuantity
    },

    INCREASE_CART_ITEM_QUANTITY(state, found) {
      found.quantity++
    },

    DECREASE_CART_ITEM_QUANTITY(state, found) {
      found.quantity--
    },

    // TOTAL PRICE

    SET_TOTAL(state) {
      state.total = state.cart.reduce(
        (acc, item) => item.price * item.quantity + acc,
        0
      )
    },

    // MODAL

    SET_IS_OPEN(state, isOpen) {
      state.isOpen = isOpen
    },

    SET_ACTIVE_MODAL_COMPONENT(state, component) {
      state.activeModalComponent = component
    },

    // LOADING

    SET_IS_LOADING(state, isLoading) {
      state.isLoading = isLoading
    },
  },

  getters: {
    cartNumItems: (state) => state.cart.length,

    found: (state) => (id) => {
      return state.cart.find((item) => id === item.id)
    },

    orderByModel: (state) => {
      /* Order by model name. New products go first */
      const products = state.products

      if (Object.keys(products).length > 1) {
        products.sort((a, b) => (a.slug < b.slug ? 1 : -1))
        products.forEach((product, i) => {
          product.new && products.splice(i, 1) && products.unshift(product)
        })
        return products
      } else {
        return state.products
      }
    },

    tax: (state) => Math.floor(state.total * 0.2),

    grandTotal: (state, getters) => state.total + getters.tax + 50,
  },

  actions: {
    
    fetchProducts({ commit }, category) {
      commit('SET_IS_LOADING', true)
      
      ProductService.getProductsByCategory(category)
        .then((response) => {
          
          if (response.data.length > 0) {
            commit('SET_PRODUCTS', response.data) 
            commit('SET_IS_LOADING', false)  
          } else {
            router.push({
              name: '404Resource',
              params: { resource: 'category' },
            })
          }
        })
        .catch((error) => {
          console.error(error.message, error.name)
          router.push({ name: 'NetworkError' })
        })
    },

    fetchProduct({ commit }, slug) {
      /* clear out previous 'product' before the API call. */
      commit('SET_PRODUCT', {}) 
      commit('SET_IS_LOADING', true) 
      
      ProductService.getDetails(slug)
        .then((response) => {
          
          if (response.data.length !== 0) {
            commit('SET_PRODUCT', response.data[0])
            commit('SET_IS_LOADING', false)   
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

    //
    // CART
    //

    /* Adds product to the cart */
    addProductToCart({ commit, state, getters, dispatch }, id) {
      const cartItem = {
        id: state.product.id,
        name: state.product.name,
        price: state.product.price,
        image: `${state.product.slug}.jpg`,
        quantity: state.initialQuantity,
      }

      if (!getters.found(id)) {
        commit('ADD_PRODUCT', cartItem)
        localStorage.setItem('cart', JSON.stringify(state.cart))
      } else {
        commit('UPDATE_CART_ITEM_QUANTITY', getters.found(id))
      }

      dispatch('calculatePrices')
    },

    // Clear cart
    removeAllCartItems({ commit }) {
      commit('SET_CART', [])
      //commit('SET_CART_NUM_ITEMS')

      localStorage.clear()
    },

    //
    //  INITIAL QUANTITY
    //

    setInitialQuantity({ commit, getters }, id) {
      !getters.found(id)
        ? commit('SET_QUANTITY', 1)
        : commit('SET_QUANTITY', getters.found(id).quantity)
    },

    //
    //  SHOPPING CART ITEMS QUANTITY
    //

    /* increaseCartQuantity() --> Updates quantity of items that already exist 
       in the cart. It also recalculate the price. */
    increaseCartQuantity({ commit, dispatch, state, getters }, id) {
      commit('INCREASE_CART_ITEM_QUANTITY', getters.found(id))
      dispatch('calculatePrices')

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    decreaseCartQuantity({ commit, dispatch, state, getters }, id) {
      getters.found(id).quantity > 1 &&
        commit('DECREASE_CART_ITEM_QUANTITY', getters.found(id))
      dispatch('calculatePrices')

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    calculatePrices({ commit }) {
      commit('SET_TOTAL')
    },

    //
    //  MODAL
    //

    openModalComponent({ commit }, component) {
      commit('SET_ACTIVE_MODAL_COMPONENT', component)
    },
  },
  modules: {},
})
