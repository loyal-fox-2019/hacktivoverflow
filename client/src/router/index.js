import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/callback-github',
    name: 'callback-github',
    component: () =>
      import(
        /* webpackChunkName: "callback-github" */ '@/views/GithubCallback.vue'
      ),
  },
  {
    path: '/callback-twitter',
    name: 'callback-twitter',
    component: () =>
      import(
        /* webpackChunkName: "callback-twitter" */ '@/views/TwitterCallback.vue'
      ),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '@/views/Register.vue'),
  },
  {
    path: '/questions',
    name: 'questions',
    component: () =>
      import(/* webpackChunkName: "questions" */ '@/views/Questions.vue'),
  },
  {
    path: '/question',
    name: 'question',
    component: () =>
      import(/* webpackChunkName: "question" */ '@/views/Question.vue'),
    children: [
      {
        path: ':questionId',
        component: () =>
          import(
            /* webpackChunkName: "question-detail" */ '@/components/QuestionDetail.vue'
          ),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
