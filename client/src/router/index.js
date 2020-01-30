import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../components/Login.vue';
import Signup from '../components/SignUp.vue';

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
    path: '/signup',
    name: 'signup',
    component: Signup,
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
    path: '/questions/:id',
    name: 'question-detail',
    // route level code-splitting
    // this generates a separate chunk (ask.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "question-detail" */ '../views/QuestionDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
