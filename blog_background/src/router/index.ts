import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { message } from "ant-design-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/home.vue"),
    children:
    [
      {
        path:'/',
        name:'index',
        component:()=>import("../views/home/index.vue"),
      },
      {
        path:'/userList',
        name:'userList',
        component:()=>import("../views/user/userList.vue")
      }
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/login/register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "login" && to.name !== "register") {
    message.warning("请登录账号");
    next("/login");
  } else {
    next();
  }
});

export default router;
