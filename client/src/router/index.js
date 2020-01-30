import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'questions',
        component: () => import(/* webpackChunkName: "about" */ '../views/Questions.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/tag/:name',
        name: 'questions-in-tag',
        component: () => import(/* webpackChunkName: "about" */ '../views/Questions.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'questions/:id',
        name: 'question',
        component: () => import(/* webpackChunkName: "about" */ '../views/Question.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'questions/:id/edit',
        name: 'edit',
        component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/tags',
        name: 'tags',
        component: () => import(/* webpackChunkName: "about" */ '../views/Tags.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import(/* webpackChunkName: "about" */ '../views/Statistics.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/inbox',
        name: 'inbox',
        component: () => import(/* webpackChunkName: "about" */ '../views/Inbox.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/post',
        name: 'post',
        component: () => import(/* webpackChunkName: "about" */ '../views/Post.vue'),
        meta: { requiresAuth: true },
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
  if (to.meta.requiresAuth && to.path !== '/landing') {
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
