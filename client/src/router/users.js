export default {
  path: '/users',
  name: 'usersRoot',
  meta: {
    isLoggedIn: true,
  },
  component: () => import(/* webpackChunkName: "dashboard" */ '../views/clientarea/Dashboard.vue'),
};
