import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import detailQuest from '../views/detailQuestion.vue'
import tag from '../views/tag.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tag/:id',
    name: 'tag',
    component: tag
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: detailQuest
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
