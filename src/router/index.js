import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Product from '../views/Product.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:category',
    name: 'Category',
    props: true,
    component: Category,
  },
  {
    path: '/product/:slug',
    name: 'Product',
    props: true,
    component: Product,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    props: true,
    component: Checkout,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
