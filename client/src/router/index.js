import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    children: [
      {
        path: ":id",
        name: "confirm",
        component: () =>
          import(/* webpackChunkName: "register" */ "../views/Register.vue")
      }
    ]
  },
  {
    path: "/try",
    name: "try",
    component: () => import(/* webpackChunkName: "try" */ "../views/AddTry.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // klo udah ada token dan mau masuk login, register, atau confirm maka dibalikin ke home (nanti ke dashboard)
  if (
    localStorage.token &&
    (to.name === "login" || to.name === "register" || to.name === "confirm")
  ) {
    next("/");
  } else if (!localStorage.token && to.name === "try") {
    next("/");
  } else {
    next();
  }
});

export default router;
