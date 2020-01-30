export default [
  {
    path: '/questions/ask',
    name: 'askQuestion',
    meta: {
      isLoggedIn: true,
    },
    component: () => import(/* webpackChunkName: "askQuestion" */ '../views/clientarea/askQuestion.vue'),
  },
  {
    path: '/questions/update/:slug',
    name: 'updateQuestion',
    meta: {
      isLoggedIn: true,
    },
    component: () => import(/* webpackChunkName: "askQuestion" */ '../views/clientarea/askQuestion.vue'),
  },
  {
    path: '/questions/:slug',
    name: 'QuestionDetail',
    component: () => import(/* webpackChunkName: "QuestionDetail" */ '../views/home/QuestionDetail.vue'),
  },
];
