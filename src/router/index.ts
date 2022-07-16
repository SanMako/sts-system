import { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/layout";

/**
 * 首页
 */
export const RootRouter: RouteRecordRaw = {
  path: "/",
  name: "Index",
  redirect: "/index",
  meta: {
    title: "首页",
    hidden: true,
  },
};

// export const HomeRouter: RouteRecordRaw = {
//   path: "/system",
//   name: "DefaultHome",
//   component: () => import("/@/views/Home.vue"),
// };

const HomeRouter: RouteRecordRaw = {
  path: "/index",
  name: "DefaultHome",
  component: Layout,
  redirect: "/home",
  meta: {
    title: "首页",
  },
  children: [
    {
      path: "/home",
      name: "DefaultHome",
      component: () => import("/@/views/Home.vue"),
      meta: {
        title: "首页",
      },
    },
  ],
};

/**
 * 静态路由
 */
export const routes: RouteRecordRaw[] = [RootRouter, HomeRouter];
