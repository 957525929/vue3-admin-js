import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  //登录
  {
    path: "/",
    name: "Login",
    hidden: true,
    meta: {
      title: "登录"
    },
    component: () => import("../views/account/Login.vue"),
  },

  //注册
  {
    path: "/Register",
    name: "Register",
    hidden: true,
    meta: {
      title: "注册"
    },
    component: () => import("../views/account/Register.vue"),
  },
  //忘记密码
  {
    path: "/Forget",
    name: "Forget",
    hidden: true,
    meta: {
      title: "忘记密码"
    },
    component: () => import("../views/account/Forget.vue"),
  },
  //管理后台-首页
  {
    path: "/index",
    name: "Index",
    meta: {
      title: "首页",
      icon: "home"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        // hidden: true,
        meta: {
          title: "首页"
        },
        component: () => import("../views/home/Index.vue"),
      }
    ]
  },
  //管理后台-管理总台
  {
    path: "/adminIndex",
    name: "AdminIndex",
    meta: {
      title: "管理总台",
      icon: "console"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/role",
        name: "Role",
        meta: {
          title: "角色管理"
        },
        component: () => import("../views/admin/Role.vue"),
      },
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理"
        },
        component: () => import("../views/admin/User.vue"),
      },
      {
        path: "/menu",
        name: "Mneu",
        meta: {
          title: "菜单列表"
        },
        component: () => import("../views/admin/Menu.vue"),
      },
    ]
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "信息管理",
      icon: "informtion"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
    ]
  },
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员管理",
      icon: "member"
    },
    component: () => import("../views/layout/Index.vue"),
    children: []
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "产品管理",
      icon: "product"
    },
    component: () => import("../views/layout/Index.vue"),
    children: []
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
