import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '',
    name: 'toolbar',
    component: () => import('../views/ShopToolbar.vue'),
    children: [
      {
        path: '/shop',
        name: 'shop',
        component: () => import('../views/ShopHome.vue')
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/ShopCart.vue')
      },
      {
        path: '/profile/:id',
        name: 'profile',
        component: () => import('../views/ShopProfile')
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/ShopProduct.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/ShopOrder.vue')
      },
    ]
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/Me.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/simple',
    name: 'simple',
    component: () => import('../views/Simple.vue')
  },
  {
    path: '/grade',
    name: 'grade',
    component: () => import('../views/Grade.vue')
  },
  {
    path: '/api',
    name: 'api',
    component: () => import('../views/Apicon.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
