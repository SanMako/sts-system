import { RouteRecordRaw } from "vue-router";

/**
 * 首页
 */
export const RootRouter: RouteRecordRaw = {
  path: "/",
  name: "Index",
  redirect: "/system",
  meta: {
    title: "首页",
    hidden: true,
  },
};

export const HomeRouter: RouteRecordRaw = {
  path: "/system",
  name: "DefaultHome",
  component: () => import("../views/Home.vue"),
};

/**
 * 静态路由
 */
export const routes: RouteRecordRaw[] = [RootRouter, HomeRouter];
