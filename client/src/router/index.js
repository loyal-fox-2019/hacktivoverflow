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
    component: () => import(/* webpackChunkName: "thread" */ '../views/Thread.vue')
  },
  {
    path: '/edit/:cardType/:id',
    name: 'editPage',
    component: () => import(/* webpackChunkName: "editPage" */ '../views/EditPage.vue')    
  },
  {
    path: '/searchResult',
    name: 'searchResultPage',
    component: () => import(/* webpackChunkName: "searchResultPage" */ '../views/searchResultPage.vue')    
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
