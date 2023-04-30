import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import AppVue from '../App.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppVue
  },
  {
    path: '/user-page',
    name: 'user-page',
    // route level code-splitting
    // this generates a separate chunk (user-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "user-page" */ '../views/UserPage.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/chat-page/:otherUserId',
    name: 'chat-page',
    // route level code-splitting
    // this generates a separate chunk (Chat-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Chat-page" */ '../views/ChatPage.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/auth-page',
    name: 'auth-page',
    // route level code-splitting
    // this generates a separate chunk (auth-page.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "auth-page" */ '../views/AuthPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=> {
  if(to.matched.some((record)=> record.meta.requireAuth)) {
    if(getAuth().currentUser) {
      next();
    }else {
      alert("you have to login");
      next("/auth-page")
    }
  }else {
    next();
  }
})
export default router
