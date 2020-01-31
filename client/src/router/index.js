import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AskQuestion from '../views/AskQuestion.vue' 
import QuestionList from '../views/QuestionList.vue'
import QuestionDetail from '../views/QuestionDetail.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home,
    children : [
      {
        name : 'questionlist',
        path : '',
        component : QuestionList,
      },
      {
        name : 'questiondetail',
        path : '/:_id',
        component : QuestionDetail,
      },
      {
        path: 'ask',
        component: AskQuestion
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
