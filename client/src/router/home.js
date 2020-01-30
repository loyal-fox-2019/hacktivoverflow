export default [
  {
    path: '/',
    name: 'home-page',
    component: () => import(/* webpackChunkName: "HomePage" */ '../views/home/HomePage.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      authPage: true,
    },
    component: () => import(/* webpackChunkName: "auth" */ '../views/home/Auth.vue'),
  },
];
