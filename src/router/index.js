import { createRouter, createWebHistory } from "vue-router";

const routes = [
  //登录
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/account/Login.vue"),
  },
  //注册
  {
    path: "/Register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/account/Register.vue"),
  },
  //忘记密码
  {
    path: "/Forget",
    name: "Forget",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/account/Forget.vue"),
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
