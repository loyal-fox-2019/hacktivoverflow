import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './home';
import users from './users';

Vue.use(VueRouter);

const routes = [home, users];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
