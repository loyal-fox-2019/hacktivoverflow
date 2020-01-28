export default {
  path: '/',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ '../views/home/Index.vue'),
  children: [
    {
      path: '',
      name: 'home-page',
      component: () => import(/* webpackChunkName: "HomePage" */ '../views/home/HomePage.vue'),
    },
    {
      path: 'auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ '../views/home/Auth.vue'),
    },
    {
      path: '/questions/details',
      name: 'QuestionDetail',
      component: () => import(/* webpackChunkName: "QuestionDetail" */ '../views/home/QuestionDetail.vue'),
    },
    {
      path: '/questions/ask',
      name: 'askQuestion',
      component: () => import(/* webpackChunkName: "askQuestion" */ '../views/clientarea/askQuestion.vue'),
    },
  ],
};
