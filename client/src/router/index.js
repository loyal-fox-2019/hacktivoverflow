import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/callback-github',
    name: 'callback-github',
    component: () =>
      import(
        /* webpackChunkName: "callback-github" */ '../views/GithubCallback.vue'
      ),
  },
  {
    path: '/callback-twitter',
    name: 'callback-twitter',
    component: () =>
      import(
        /* webpackChunkName: "callback-twitter" */ '../views/TwitterCallback.vue'
      ),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
