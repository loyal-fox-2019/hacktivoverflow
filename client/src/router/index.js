import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/MainPage.vue')
  },
  {
    path: '/question',
    component: () => import(/* webpackChunkName: "main" */ '../views/Question.vue'),
    children: [
      {
        path: '',
        name: 'question',
        component: () => import(/* webpackChunkName: "main" */ '../components/Question.vue')
      },
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "main" */ '../components/Detail.vue')
      },
      {
        path: 'edit/:id',
        component: () => import(/* webpackChunkName: "main" */ '../components/Edit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
