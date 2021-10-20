import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Category from '@/views/Category.vue'
import Product from '@/views/Product.vue'
import Checkout from '@/views/Checkout.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category/:category',
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
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  },
})

export default router
