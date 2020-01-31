import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterPage.vue')
  },
  {
    path: '/newquestion',
    name: 'newquestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewQuestionFormPage.vue')
  },
  {
    path: '/question/:id',
    name: 'viewquestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewQuestionPage.vue')
  },
  {
    path: '/editquestion/:id',
    name: 'editquestion',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditQuestionFormPage.vue')
  },
  {
    path: '/editanswer/:id',
    name: 'editanswer',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditAnswerFormPage.vue')
  },
  {
    path: '/account',
    name: 'manageaccount',
    component: () => import(/* webpackChunkName: "about" */ '../views/AccountPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
