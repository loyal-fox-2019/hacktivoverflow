import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/Login'
import Register from '../views/Register'

import Questions from '../components/main-page/Questions.vue'
import DetailQuestion from '../components/DetailQuestion'
import MyQuestions from '../components/main-page/MyQuestions'
import EditQuestion from '../components/EditQuestion'
import MyAnswers from '../components/main-page/MyAnswers'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'home',
        component: Questions
      },
      {
        path: 'my-questions',
        component: MyQuestions
      },
      {
        path: 'my-answers',
        component: MyAnswers
      }
    ]
  },
  {
    path: '/edit/:id',
    component: EditQuestion,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path: '/question/:id',
    component: DetailQuestion
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
