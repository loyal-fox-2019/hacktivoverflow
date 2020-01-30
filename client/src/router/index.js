import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/register.vue'
import Login from '../views/login.vue'
import Askquestion from '../views/askquestion.vue'
import QuestionDetail from '../views/QuestionDetail.vue'
import MyQuestions from '../views/MyQuestions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path:'/login',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name: 'register',
    component: Register
  },{
    path: '/askquestion',
    name: 'askquestion',
    component: Askquestion
  },{
    path: '/detail/:id',
    name: 'questiondetail',
    component: QuestionDetail
  },{
    path: '/myquestion',
    name: 'myquestions',
    component: MyQuestions
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
