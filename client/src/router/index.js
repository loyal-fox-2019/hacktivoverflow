import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue'
import Register from '../components/SignUp.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/ask',
    name: 'ask',
    // route level code-splitting
    // this generates a separate chunk (ask.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ask" */ '../views/Ask.vue'),
  },
  {
    path: '/question-detail/:id',
    name: 'question-detail',
    // route level code-splitting
    // this generates a separate chunk (ask.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "question-detail" */ '../views/QuestionDetail.vue'),
  },
  {
    path: '/myProfile',
    name: 'myProfile',
    // route level code-splitting
    // this generates a separate chunk (ask.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "myProfile" */ '../views/myProfile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
