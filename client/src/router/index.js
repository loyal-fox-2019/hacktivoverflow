import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Authscreen from  '../views/Authscreen'
import QuestionDetail from '../views/QuestionDetail'
import CreateQuestion from '../views/CreateQuestion'
import CreateAnswer from '../views/CreateAnswer'
import EditQuestion from '../views/EditQuestion'
import EditAnswer from '../views/EditAnswer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Authscreen
  },
  {
    path: '/login',
    name: 'login',
    component: Authscreen
  },
  {
    path: '/question/:questionId',
    name: 'questionDetail',
    component: QuestionDetail
  },
  {
    path: '/ask',
    name: 'CreateQuestion',
    component: CreateQuestion
  },
  {
    path: '/answer/:questionId',
    name: 'createAnswer',
    component: CreateAnswer
  },
  {
    path: '/question/:questionId/edit',
    name: 'editQuestion',
    component: EditQuestion
  },
  {
    path: '/answer/:answerId/edit',
    name: 'editAnswer',
    component: EditAnswer
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:tag',
    name: 'homeByTag',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const blacklistedRouteName = [
  'editQuestion',
  'editAnswer',
  'CreateQuestion',
  'createAnswer'
]

router.beforeEach((to, from, next) => {
  if(blacklistedRouteName.includes(to.name)) {
    if(localStorage.getItem('token') === null) {
      next(`${from.path}`)
    }
    else next()
  }
  else next()
})

export default router
