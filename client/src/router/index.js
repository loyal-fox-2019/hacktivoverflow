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
    path: '/addcontent',
    name: 'addcontent',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AddContent.vue')
  },
  {
    path: '/contentdetail/:tagname',
    name: 'contentdetail',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ContentDetail.vue')
  },
  {
    path: '/contentDescription/:contentId',
    name: 'contentDescription',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ContentDesription.vue')
  },
  {
    path: '/usercontent',
    name: 'usercontent',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/UserPage.vue'),
    children: [
      {
        path: 'update',
        component: () => import('../components/updateQuestion.vue')
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
