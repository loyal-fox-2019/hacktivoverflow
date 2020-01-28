export default {
  path: '/users',
  name: 'usersRoot',
  component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue'),
  children: [
    {
      path: '',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/clientarea/Dashboard.vue'),
    },
  ],
};
