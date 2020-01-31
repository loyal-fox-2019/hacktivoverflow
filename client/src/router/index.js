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
import EditAnswer from '../components/EditAnswer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        component: Questions
      },
      {
        path: 'my-questions',
        component: MyQuestions,
        beforeEnter(to, from, next) {
          if (localStorage.token) {
            next()
          } else {
            next('/')
          }
        }
      },
      {
        path: 'my-answers',
        component: MyAnswers,
        beforeEnter(to, from, next) {
          if (localStorage.token) {
            next()
          } else {
            next('/')
          }
        }
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
        next('/')
      }
    }
  },
  {
    path: '/answer/:id',
    component: EditAnswer,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next()
      } else {
        next('/')
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
    component: Login,
    beforeEnter(to, from, next) {
      if (!localStorage.token) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter(to, from, next) {
      if (!localStorage.token) {
        next()
      } else {
        next('/')
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
