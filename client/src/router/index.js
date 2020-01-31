import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'questions',
        component: () => import(/* webpackChunkName: "about" */ '../views/Questions.vue'),
      },
      {
        path: '/tag/:name',
        name: 'questions-in-tag',
        component: () => import(/* webpackChunkName: "about" */ '../views/Questions.vue'),
      },
      {
        path: 'questions/:id',
        name: 'question',
        component: () => import(/* webpackChunkName: "about" */ '../views/Question.vue'),
      },
      {
        path: 'questions/:id/edit',
        name: 'edit',
        component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue'),
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import(/* webpackChunkName: "about" */ '../views/Tags.vue'),
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue'),
      },
      {
        path: '/post',
        name: 'post',
        component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue'),
      }
    ]
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import(/* webpackChunkName: "about" */ '../views/Landing.vue'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path != '/landing') {
    if (!localStorage.getItem('access_token') || !localStorage.getItem('name') || !localStorage.getItem('image')) {
      next({name: 'landing'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
