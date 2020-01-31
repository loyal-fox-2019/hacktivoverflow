import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/account.vue'
import AskQuestion from '../views/askQuestion.vue'
import Question from '../views/question.vue'
import User from '../views/user.vue'
import EditQuestion from '../views/editQuest.vue'
import MyAnswer from '../views/myAnswers.vue'
import EditAnswer from '../views/editAnsw.vue'

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
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/askQuestion',
    name: 'askQuestion',
    component: AskQuestion
  },
  {
    path: '/question/:id',
    name: 'question',
    component: Question
  },
  {
    path: '/myQuestion',
    name: 'user',
    component: User
  },
  {
    path: '/editQuestion/:id',
    name: 'editQuestion',
    component: EditQuestion
  },
  {
    path: '/myAnswer',
    name: 'myAnswer',
    component: MyAnswer
  },
  {
    path: '/editAnswer/:id',
    name: 'editAnswer',
    component: EditAnswer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
