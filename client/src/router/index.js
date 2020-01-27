import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        beforeEnter: (to, from, next) => {
            if (Vue.$cookies.get('token') === null) {
                next()
            } else {
                next("/")
            }
        }
    },
    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
        beforeEnter: (to, from, next) => {
            if (Vue.$cookies.get('token') === null) {
                next()
            } else {
                next("/")
            }
        }
    },
    {
        path: '/detail/:id',
        name: 'detail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
        beforeEnter: (to, from, next) => {
            if (Vue.$cookies.get('token')) {
                next()
            } else {
                next("/login")
            }
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
