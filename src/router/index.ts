import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'products' },
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
  ],
})

export default router
