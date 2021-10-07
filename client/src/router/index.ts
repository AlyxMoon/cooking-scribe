import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import User from '@/views/Users.vue'
import Group from '@/views/Group.vue'
import Groups from '@/views/Groups.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    name: 'Users',
    component: User,
  },
  {
    path: '/groups',
    name: 'Groups',
    component: Groups,
  },
  {
    path: '/groups/:idGroup',
    name: 'Group',
    component: Group,
    props: true,
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
