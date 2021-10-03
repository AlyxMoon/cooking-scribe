import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/auth/signin',
    name: 'SignIn',
    component: SignIn,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
