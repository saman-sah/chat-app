import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user-page',
    name: 'user-page',
    // route level code-splitting
    // this generates a separate chunk (user-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user-page" */ '../views/UserPage.vue')
  },
  {
    path: '/chat-page',
    name: 'chat-page',
    // route level code-splitting
    // this generates a separate chunk (Chat-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Chat-page" */ '../views/ChatPage.vue')
  },
  {
    path: '/auth-page',
    name: 'auth-page',
    // route level code-splitting
    // this generates a separate chunk (auth-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "auth-page" */ '../views/AuthPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
