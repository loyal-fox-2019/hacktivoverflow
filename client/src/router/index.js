import Vue from 'vue';
import VueRouter from 'vue-router';
import home from './home';
import questions from './questions';
import users from './users';

Vue.use(VueRouter);

const routes = [...home, ...questions, users];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  to.matched.some((route) => {
    const token = localStorage.getItem('stuckoverlow.token');
    if (route.meta.isLoggedIn) {
      if (token) {
        next();
        return true;
      }
      next('/');
      return true;
    }
    if (route.meta.authPage) {
      if (token) {
        next('/');
        return true;
      }
      next();
      return true;
    }
    next();
    return true;
  });
  next();
});

export default router;
