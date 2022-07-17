import { RouteRecordRaw } from "vue-router";
import { Layout } from "/@/layout";

/**
 * 首页
 */
export const HomeRouter: RouteRecordRaw = {
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
