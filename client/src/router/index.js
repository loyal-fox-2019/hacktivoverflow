import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/form',
    name: 'form',
    component: () => import(/* webpackChunkName: "form" */ '../views/Form.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import(/* webpackChunkName: "update" */ '../views/Update.vue')
  },
  {
    path: '/filter',
    name: 'filter',
    component: () => import(/* webpackChunkName: "filter" */ '../views/Filtered.vue')
  },
  {
    path: '/user-question',
    name: 'user-question',
    component: () => import(/* webpackChunkName: "user-question" */ '../views/UserQuestions.vue')
  },
  {
    path:'/question/:id',
    name:'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Auth.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
