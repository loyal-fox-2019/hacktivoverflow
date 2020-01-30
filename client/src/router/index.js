import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import LandingPage from '../views/LandingPage.vue'
import Home from '../views/Home.vue'
import PostPage from '../views/PostPage.vue'
import EditPage from '../views/EditPage.vue'
import DetailPage from '../views/DetailPage.vue'
import QuestionForm from '../components/QuestionForm.vue'
import QuestionCard from '../components/QuestionCard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: LandingPage,
    beforeEnter(to, from, next){
      if (store.state.isLogin){
        next('/home')
      }
      else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/post',
    name: 'post',
    component: PostPage
  },
  {
    path: '/edit',
    name: 'edit',
    component: EditPage,
    children: 
    [
      {
        path: ':id',
        component: QuestionForm
      }
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailPage,
    children: 
    [
      {
        path: ':id',
        component: QuestionCard
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
