import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/thread/:id',
    name: 'thread',
    component: () => import(/* webpackChunkName: "home" */ '../views/Thread.vue')
  },
  {
    path: '/edit/:cardType/:id',
    name: 'edit',
    component: () => import(/* webpackChunkName: "home" */ '../views/EditPage.vue')    
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
