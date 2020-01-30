import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import perQuestion from "../views/perQuestion.vue"
import askQuestion from "../views/askQuestion.vue"
import loginReg from "../views/loginReg.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: "/perQuestion/:id",
    name: "perQuestion",
    component: perQuestion
  },
  {
    path: "/askQuestion",
    name: "askQuestion",
    component: askQuestion
  },
  {
    path: "/loginReg",
    name: "loginReg",
    component: loginReg
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
