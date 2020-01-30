import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Post from '../views/Post.vue'
import CreateQuestion from '../views/CreateQuestion.vue'
import DetailQuestion from '../views/DetailQuestion.vue'
import UpdateQuestion from '../views/UpdateQuestion.vue'
import UpdateAnswer from '../views/UpdateAnswer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/create-question',
    name: 'create-question',
    component: CreateQuestion
  },
  {
    path: '/detail-question/:id',
    name: 'detail-question',
    component: DetailQuestion
  },
  {
    path: '/update-question/:id',
    name: 'update-question',
    component: UpdateQuestion
  },
  {
    path: '/update-answer/:id',
    name: 'update-answer',
    component: UpdateAnswer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
