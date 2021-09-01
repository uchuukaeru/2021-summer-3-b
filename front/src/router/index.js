import { createRouter, createWebHistory } from "vue-router";

import store from "../store";
import Home from "../views/Home.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import ActiveUsers from "../views/ActiveUsers.vue";
import MyAccount from "../views/MyAccount.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/log-in",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/active-users",
    name: "ActiveUsers",
    component: ActiveUsers,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/my-account",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "LogIn", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
